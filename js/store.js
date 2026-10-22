/* Talk ABA - app state (user, cart, enrollments, wishlist) + API client.
   State persists in localStorage under the same keys the React demo used,
   so existing browser data keeps working. */
(function () {
  var KEYS = { user: "taa_user", cart: "taa_cart", enroll: "taa_enroll", wish: "taa_wish" };
  var courses = window.TAA.courses;

  function load(key, fallback) {
    try { var raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; }
    catch (e) { return fallback; }
  }
  function save(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) { /* storage full / blocked */ } }

  var state = {
    user: load(KEYS.user, null),
    cart: load(KEYS.cart, []),
    enrollments: load(KEYS.enroll, {}),
    wishlist: load(KEYS.wish, []),
    cartOpen: false,
    authOpen: false
  };

  var subs = [];
  function subscribe(fn) { subs.push(fn); return function () { subs = subs.filter(function (f) { return f !== fn; }); }; }
  function emit() { subs.slice().forEach(function (f) { f(state); }); }

  function persist(which) {
    if (!which || which === "user") save(KEYS.user, state.user);
    if (!which || which === "cart") save(KEYS.cart, state.cart);
    if (!which || which === "enroll") save(KEYS.enroll, state.enrollments);
    if (!which || which === "wish") save(KEYS.wish, state.wishlist);
  }

  /* Keep several open tabs in sync */
  window.addEventListener("storage", function (e) {
    if (!e.key || Object.keys(KEYS).map(function (k) { return KEYS[k]; }).indexOf(e.key) === -1) return;
    state.user = load(KEYS.user, null);
    state.cart = load(KEYS.cart, []);
    state.enrollments = load(KEYS.enroll, {});
    state.wishlist = load(KEYS.wish, []);
    emit();
  });

  var CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  function rand(n) {
    var out = "", buf = new Uint32Array(n);
    (window.crypto || window.msCrypto).getRandomValues(buf);
    for (var i = 0; i < n; i++) out += CHARS[buf[i] % CHARS.length];
    return out;
  }
  function newCertId() { return "TAA-" + rand(6) + "-" + rand(4); }

  function courseById(id) { return courses.filter(function (c) { return c.id === id; })[0]; }

  var store = {
    state: state,
    subscribe: subscribe,
    emit: emit,

    signIn: function (u) { state.user = u; persist("user"); emit(); },
    signOut: function () { state.user = null; persist("user"); emit(); },

    addToCart: function (id) {
      if (state.cart.indexOf(id) === -1) state.cart.push(id);
      state.cartOpen = true; persist("cart"); emit();
    },
    removeFromCart: function (id) { state.cart = state.cart.filter(function (x) { return x !== id; }); persist("cart"); emit(); },
    clearCart: function () { state.cart = []; persist("cart"); emit(); },

    enroll: function (ids) {
      ids.forEach(function (id) {
        if (!state.enrollments[id]) {
          state.enrollments[id] = { courseId: id, enrolledAt: new Date().toISOString(), progress: {}, quizBest: null, quizPassed: false, certId: null };
        }
      });
      persist("enroll"); emit();
    },
    isEnrolled: function (id) { return Boolean(state.enrollments[id]); },

    toggleLesson: function (courseId, lessonId) {
      var e = state.enrollments[courseId]; if (!e) return;
      e.progress[lessonId] = !e.progress[lessonId];
      persist("enroll"); emit();
    },

    /* Record a quiz attempt. certId is supplied by the server when server grading is on. */
    recordQuiz: function (courseId, score, nameOnCert, serverCertId) {
      var e = state.enrollments[courseId]; if (!e) return null;
      var passed = score >= 80;
      var best = e.quizBest == null ? score : Math.max(e.quizBest, score);
      var cert = e.certId;
      if (passed && !cert) cert = serverCertId || newCertId();
      e.quizBest = Math.round(best);
      e.quizPassed = e.quizPassed || passed;
      e.certId = cert;
      e.nameOnCert = nameOnCert;
      if (passed && !e.certDate) e.certDate = new Date().toISOString();
      persist("enroll"); emit();
      return cert;
    },

    toggleWishlist: function (id) {
      state.wishlist = state.wishlist.indexOf(id) > -1 ? state.wishlist.filter(function (x) { return x !== id; }) : state.wishlist.concat(id);
      persist("wish"); emit();
    },

    openCart: function () { state.cartOpen = true; emit(); },
    closeCart: function () { state.cartOpen = false; emit(); },
    openAuth: function () { state.authOpen = true; emit(); },
    closeAuth: function () { state.authOpen = false; emit(); },

    totalCeus: function () {
      var sum = 0;
      Object.keys(state.enrollments).forEach(function (k) {
        var e = state.enrollments[k]; if (!e.quizPassed) return;
        var c = courseById(e.courseId); sum += c ? c.ceus : 0;
      });
      return Math.round(sum * 100) / 100;
    },

    courseProgress: function (courseId, e) {
      var c = courseById(courseId); if (!c) return 0;
      var ids = [];
      c.modules.forEach(function (m) { m.lessons.forEach(function (l) { ids.push(l.id); }); });
      if (!e || ids.length === 0) return 0;
      var done = ids.filter(function (id) { return e.progress[id]; }).length;
      return Math.round((done / ids.length) * 100);
    },

    newCertId: newCertId
  };

  /* ---------------- API client (optional PHP backend) ---------------- */
  var api = {
    _probe: null,
    base: function () { return (window.TAA_CONFIG && window.TAA_CONFIG.apiBase) || null; },
    /* Resolves true when the PHP backend answers; false on static hosting / file:// */
    available: function () {
      if (!api.base() || location.protocol === "file:") return Promise.resolve(false);
      if (!api._probe) {
        api._probe = fetch(api.base() + "/health.php", { cache: "no-store" })
          .then(function (r) { return r.ok ? r.json() : null; })
          .then(function (j) { return Boolean(j && j.ok); })
          .catch(function () { return false; });
      }
      return api._probe;
    },
    post: function (path, body) {
      return fetch(api.base() + "/" + path, {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body)
      }).then(function (r) { return r.json().then(function (j) { return { status: r.status, body: j }; }); });
    },
    get: function (path) {
      return fetch(api.base() + "/" + path, { cache: "no-store" }).then(function (r) { return r.json().then(function (j) { return { status: r.status, body: j }; }); });
    }
  };

  window.store = store;
  window.api = api;
})();
