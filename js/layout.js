/* Site chrome: header, footer, cart drawer, sign-in modal + global click handling. */
(function () {
  var T = window.TAA, S = window.store, U = window.UI, icon = window.icon, esc = U.esc;

  var LINKS = [
    { href: "courses.html", label: "Courses", match: ["courses.html", "course.html"] },
    { href: "paths.html", label: "Learning Paths", match: ["paths.html"] },
    { href: "philosophy.html", label: "Our Philosophy", match: ["philosophy.html"] },
    { href: "instructors.html", label: "Instructors", match: ["instructors.html"] },
    { href: "faq.html", label: "FAQ", match: ["faq.html"] }
  ];
  var here = (location.pathname.split("/").pop() || "index.html").toLowerCase();

  /* ---------- Action registry (event delegation) ---------- */
  var actions = {};
  var Actions = { on: function (name, fn) { actions[name] = fn; }, many: function (map) { for (var k in map) actions[k] = map[k]; } };

  document.addEventListener("click", function (e) {
    var el = e.target.closest("[data-act]");
    if (el && actions[el.getAttribute("data-act")]) { actions[el.getAttribute("data-act")](el, e); return; }
    if (ui.menuOpen && !e.target.closest("#user-menu-wrap")) { ui.menuOpen = false; renderHeader(); }
  });
  document.addEventListener("submit", function (e) {
    var f = e.target.closest("[data-form]");
    if (f && actions[f.getAttribute("data-form")]) { e.preventDefault(); actions[f.getAttribute("data-form")](f, e); }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    if (S.state.authOpen) S.closeAuth();
    else if (S.state.cartOpen) S.closeCart();
    else if (ui.menuOpen) { ui.menuOpen = false; renderHeader(); }
  });

  /* ---------- Scroll reveal ---------- */
  var io = null;
  if ("IntersectionObserver" in window) {
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -40px 0px", threshold: 0.05 });
  }
  function observeReveals(root) {
    (root || document).querySelectorAll(".reveal:not(.is-in)").forEach(function (el) { io ? io.observe(el) : el.classList.add("is-in"); });
  }

  var ui = { mobileOpen: false, menuOpen: false, authCreds: "BCBA" };

  /* ---------- Pieces ---------- */
  function logo(light) {
    return '<a href="index.html" class="flex items-center gap-2.5" aria-label="Talk ABA home">' +
      '<span class="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FF6B5B] shadow-[0_6px_0_#E14E40] transition-transform hover:-rotate-6">' + icon("graduation-cap", 24, "text-white", 2.5) +
      '<span class="absolute -right-1.5 -top-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#FFC93C] text-[10px] font-black text-[#2E2A3B] ring-2 ring-[#FFF9F1]">+</span></span>' +
      '<span class="leading-none"><span class="font-display block text-xl font-semibold tracking-tight ' + (light ? "text-white" : "text-[#2E2A3B]") + '">Talk ABA</span>' +
      '<span class="block text-[10px] font-black uppercase tracking-[0.22em] ' + (light ? "text-white/70" : "text-[#5B5570]") + '">CEUs · Today\'s ABA</span></span></a>';
  }

  function navLink(l, mobile) {
    var active = l.match.indexOf(here) > -1;
    var cls = mobile
      ? "block rounded-2xl px-4 py-3 text-sm font-extrabold " + (active ? "bg-[#2E2A3B] text-white" : "text-[#2E2A3B] hover:bg-[#FFF3E4]")
      : "rounded-full px-4 py-2 text-sm font-extrabold transition " + (active ? "bg-[#2E2A3B] text-white" : "text-[#5B5570] hover:bg-[#2E2A3B]/6 hover:text-[#2E2A3B]");
    return '<a href="' + l.href + '" class="' + cls + '"' + (active ? ' aria-current="page"' : "") + ">" + l.label + "</a>";
  }

  function headerHtml() {
    var st = S.state, user = st.user;
    var acct = user
      ? '<div class="relative" id="user-menu-wrap">' +
          '<button data-act="toggle-menu" aria-haspopup="menu" aria-expanded="' + ui.menuOpen + '" class="inline-flex items-center gap-2 rounded-full bg-[#0EA58C] py-1.5 pl-1.5 pr-4 text-sm font-extrabold text-white shadow-[0_4px_0_#0B7C69] transition hover:brightness-105">' +
            '<span class="font-display inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/25">' + esc(user.name.charAt(0).toUpperCase()) + "</span>" +
            '<span class="hidden max-w-[120px] truncate sm:block">' + esc(user.name.split(" ")[0]) + "</span></button>" +
          '<div role="menu" class="menu-pop absolute right-0 mt-2 w-56 overflow-hidden rounded-2xl border-2 border-[#2E2A3B]/10 bg-white shadow-xl ' + (ui.menuOpen ? "open" : "") + '">' +
            '<div class="border-b border-[#2E2A3B]/8 px-4 py-3"><p class="truncate text-sm font-extrabold text-[#2E2A3B]">' + esc(user.name) + '</p><p class="truncate text-xs font-semibold text-[#5B5570]">' + esc(user.email) + "</p></div>" +
            '<a role="menuitem" href="dashboard.html" class="flex w-full items-center gap-2 px-4 py-3 text-sm font-extrabold text-[#2E2A3B] hover:bg-[#FFF3E4]">' + icon("layout-dashboard", 16) + " My Dashboard</a>" +
            '<a role="menuitem" href="dashboard.html#certificates" class="flex w-full items-center gap-2 px-4 py-3 text-sm font-extrabold text-[#2E2A3B] hover:bg-[#FFF3E4]">' + icon("award", 16) + " My Certificates</a>" +
            '<button role="menuitem" data-act="signout" class="flex w-full items-center gap-2 border-t border-[#2E2A3B]/8 px-4 py-3 text-sm font-extrabold text-[#E14E40] hover:bg-[#FFE3DC]">' + icon("log-out", 16) + " Sign out</button>" +
          "</div></div>"
      : '<button data-act="open-auth" class="hidden items-center gap-2 rounded-full bg-[#2E2A3B] px-5 py-2.5 text-sm font-extrabold text-white shadow-[0_4px_0_rgba(46,42,59,0.35)] transition hover:bg-[#FF6B5B] hover:shadow-[0_4px_0_#E14E40] sm:inline-flex">' + icon("user", 16) + " Sign in</button>";

    return '<div class="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">' + logo(false) +
      '<nav class="hidden items-center gap-1 lg:flex" aria-label="Main">' + LINKS.map(function (l) { return navLink(l, false); }).join("") + "</nav>" +
      '<div class="flex items-center gap-2">' +
        '<button data-act="open-cart" class="relative inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#2E2A3B]/6 text-[#2E2A3B] transition hover:bg-[#2E2A3B] hover:text-white" aria-label="Open cart (' + st.cart.length + ' items)">' + icon("shopping-cart", 19) +
          (st.cart.length > 0 ? '<span class="absolute -right-1 -top-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#FF6B5B] text-[11px] font-black text-white ring-2 ring-[#FFF9F1]">' + st.cart.length + "</span>" : "") + "</button>" +
        acct +
        '<button data-act="toggle-mobile" aria-expanded="' + ui.mobileOpen + '" class="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#2E2A3B]/6 text-[#2E2A3B] lg:hidden" aria-label="Menu">' + icon(ui.mobileOpen ? "x" : "menu", 20) + "</button>" +
      "</div></div>" +
      '<nav class="mnav border-t border-[#2E2A3B]/8 bg-[#FFF9F1] lg:hidden ' + (ui.mobileOpen ? "open" : "") + '" aria-label="Mobile"><div><div class="space-y-1 px-4 py-4">' +
        LINKS.map(function (l) { return navLink(l, true); }).join("") +
        (!user ? '<button data-act="open-auth" class="block w-full rounded-2xl bg-[#FF6B5B] px-4 py-3 text-center text-sm font-extrabold text-white">Sign in / Create account</button>' : "") +
      "</div></div></nav>";
  }

  function footerHtml() {
    var col = function (title, items) {
      return "<div><p class=\"text-xs font-black uppercase tracking-[0.18em] text-white/50\">" + title + '</p><ul class="mt-3 space-y-2 text-sm font-bold text-white/85">' +
        items.map(function (i) { return '<li><a href="' + i[0] + '" class="hover:text-[#FFC93C]">' + i[1] + "</a></li>"; }).join("") + "</ul></div>";
    };
    return '<svg viewBox="0 0 1440 60" preserveAspectRatio="none" class="block h-10 w-full rotate-180" style="color:#FFF9F1" aria-hidden="true"><path d="M0,32 C240,60 480,0 720,24 C960,48 1200,8 1440,32 L1440,60 L0,60 Z" fill="currentColor"/></svg>' +
      '<div class="mx-auto max-w-7xl px-4 pb-10 pt-4 sm:px-6 lg:px-8"><div class="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr_1fr]">' +
        "<div>" + logo(true) + '<p class="mt-4 max-w-xs text-sm font-medium leading-relaxed text-white/70">Joy-first continuing education for BCBAs, BCaBAs, RBTs &amp; SLPs. Today\'s ABA, PFA &amp; SBT — taught the way we practice: with play, dignity, and heart.</p>' +
          '<div class="mt-4 flex items-center gap-2 rounded-2xl bg-white/10 p-3 text-xs font-bold text-white/80">' + icon("badge-check", 18, "shrink-0 text-[#0EA58C]") + " BACB ACE Provider OP-24-1107 · ASHA Approved CE Provider</div></div>" +
        col("Learn", [["courses.html", "All CEU Courses"], ["paths.html", "Learning Paths &amp; Bundles"], ["courses.html?ceu=BACB%20Ethics", "Ethics CEUs"], ["courses.html?ceu=BACB%20Supervision", "Supervision CEUs"], ["dashboard.html", "My Dashboard"]]) +
        col("Talk ABA", [["philosophy.html", "Our Philosophy"], ["instructors.html", "Instructors"], ["faq.html", "FAQ &amp; Support"], ["verify.html", "Verify a Certificate"], ["checkout.html", "Group Enrollment"]]) +
        '<div><p class="text-xs font-black uppercase tracking-[0.18em] text-white/50">Get 1 Free CEU</p><p class="mt-3 text-sm font-medium text-white/70">Join 24,000+ clinicians. First workshop free.</p>' +
          '<div id="newsletter"><form data-form="newsletter" class="mt-3 flex gap-2"><label for="nl-email" class="sr-only">Email address</label><input id="nl-email" name="email" type="email" required autocomplete="email" placeholder="you@clinic.com" class="w-full min-w-0 rounded-full border-2 border-white/15 bg-white/10 px-4 py-2.5 text-sm font-bold text-white placeholder:text-white/40 focus:border-[#FFC93C] focus:outline-none">' +
          '<button class="shrink-0 rounded-full bg-[#FFC93C] px-4 py-2.5 text-sm font-black text-[#2E2A3B] transition hover:brightness-105" aria-label="Subscribe">' + icon("arrow-right", 16) + "</button></form></div></div>" +
      '</div><div class="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs font-bold text-white/50 sm:flex-row">' +
        "<p>© " + new Date().getFullYear() + " Talk ABA · A division of Talk ABA, Inc., Fresno &amp; Visalia CA</p>" +
        '<p class="flex items-center gap-1.5">' + icon("sparkles", 13) + " Inspired by Dr. Greg Hanley’s “A Perspective on Today’s ABA”</p></div></div>";
  }

  function cartHtml() {
    var st = S.state;
    var items = st.cart.map(function (id) { return T.courses.filter(function (c) { return c.id === id; })[0]; }).filter(Boolean);
    var total = 0, savings = 0, ceus = 0;
    items.forEach(function (c) { total += c.price; savings += c.compareAt ? c.compareAt - c.price : 0; ceus += c.ceus; });
    ceus = Math.round(ceus * 100) / 100;
    var body = items.length === 0
      ? '<div class="flex h-full flex-col items-center justify-center text-center"><span class="inline-flex h-20 w-20 items-center justify-center rounded-full bg-[#2E2A3B]/6">' + icon("shopping-cart", 30, "text-[#5B5570]") + '</span>' +
        '<p class="font-display mt-4 text-xl font-semibold text-[#2E2A3B]">Your cart is empty</p><p class="mt-1 text-sm font-semibold text-[#5B5570]">Let’s fix that — your CEUs won’t earn themselves.</p>' +
        '<a href="courses.html" class="mt-5 rounded-full bg-[#FF6B5B] px-6 py-3 text-sm font-extrabold text-white shadow-[0_4px_0_#E14E40]">Browse courses</a></div>'
      : '<ul class="space-y-4">' + items.map(function (c) {
          return '<li class="flex gap-3 rounded-2xl border-2 border-[#2E2A3B]/8 bg-white p-3"><img src="' + c.image + '" alt="" class="h-20 w-20 shrink-0 rounded-xl object-cover"><div class="min-w-0 flex-1">' +
            '<p class="truncate text-sm font-extrabold text-[#2E2A3B]">' + esc(c.title) + '</p><p class="mt-0.5 text-xs font-bold text-[#5B5570]">' + c.ceus + " CEUs · " + esc(c.format) + "</p>" +
            '<div class="mt-1 flex items-center justify-between"><p class="font-display text-lg font-semibold">' + U.money(c.price) + '</p><button data-act="remove-cart" data-id="' + c.id + '" class="inline-flex items-center gap-1 text-xs font-extrabold text-[#E14E40] hover:underline">' + icon("trash-2", 13) + " Remove</button></div></div></li>";
        }).join("") + "</ul>";
    var foot = items.length === 0 ? "" :
      '<div class="border-t-2 border-[#2E2A3B]/8 bg-white px-6 py-5">' +
        '<div class="flex justify-between text-sm font-bold text-[#5B5570]"><span>Total CEUs</span><span class="font-black text-[#0EA58C]">' + ceus + " CEUs</span></div>" +
        (savings > 0 ? '<div class="mt-1 flex justify-between text-sm font-bold text-[#5B5570]"><span>You’re saving</span><span class="font-black text-[#0EA58C]">' + U.money(savings) + "</span></div>" : "") +
        '<div class="mt-1 flex justify-between text-base font-black text-[#2E2A3B]"><span>Total</span><span class="font-display text-2xl">' + U.money(total) + "</span></div>" +
        '<button data-act="cart-enroll" class="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#FF6B5B] px-6 py-3.5 text-sm font-black text-white shadow-[0_5px_0_#E14E40] transition hover:brightness-105 active:translate-y-0.5 active:shadow-none">' + (st.user ? "Enroll now — start learning" : "Sign in to enroll") + " " + icon("arrow-right", 16) + "</button>" +
        '<a href="checkout.html" class="mt-3 block text-center text-xs font-extrabold text-[#5B5570] underline">Buying for a team? Go to checkout</a>' +
        '<p class="mt-2 text-center text-xs font-bold text-[#5B5570]">30-day happiness guarantee · Instant certificates · Lifetime access</p></div>';
    return '<div class="flex items-center justify-between border-b-2 border-[#2E2A3B]/8 px-6 py-5"><h2 id="cart-title" class="font-display text-xl font-semibold text-[#2E2A3B]">Your Cart (' + items.length + ')</h2>' +
      '<button data-act="close-cart" id="cart-close" class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#2E2A3B]/6 hover:bg-[#2E2A3B] hover:text-white" aria-label="Close cart">' + icon("x", 18) + "</button></div>" +
      '<div class="flex-1 overflow-y-auto px-6 py-4">' + body + "</div>" + foot;
  }

  var CREDS = ["BCBA", "BCaBA", "RBT", "SLP-CCC", "Student", "Other"];
  function credChips() {
    return CREDS.map(function (c) {
      return '<button type="button" data-act="pick-cred" data-cred="' + c + '" aria-pressed="' + (ui.authCreds === c) + '" class="rounded-full px-4 py-2 text-xs font-black transition ' + (ui.authCreds === c ? "bg-[#2E2A3B] text-white" : "bg-[#2E2A3B]/6 text-[#5B5570] hover:bg-[#2E2A3B]/10") + '">' + c + "</button>";
    }).join("");
  }
  var INPUT = "mt-1.5 w-full rounded-2xl border-2 border-[#2E2A3B]/12 bg-[#FFF9F1] px-4 py-3 text-sm font-bold text-[#2E2A3B] focus:border-[#7C6FF0] focus:outline-none";
  function authHtml() {
    return '<div class="confetti-card bg-[#7C6FF0] px-6 py-6 text-white"><div class="flex items-start justify-between"><div>' +
      '<p class="text-xs font-black uppercase tracking-[0.18em] text-white/70">Welcome to Talk ABA</p><h2 id="auth-title" class="font-display mt-1 text-2xl font-semibold">Sign in to earn CEUs</h2></div>' +
      '<button data-act="close-auth" class="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/20 hover:bg-white/30" aria-label="Close">' + icon("x", 17) + "</button></div></div>" +
      '<form data-form="signin" class="space-y-4 px-6 py-6">' +
        '<div><label for="au-name" class="text-xs font-black uppercase tracking-widest text-[#5B5570]">Full name (for certificates)</label><input id="au-name" name="name" required autocomplete="name" placeholder="Jordan Taylor" class="' + INPUT + '"></div>' +
        '<div><label for="au-email" class="text-xs font-black uppercase tracking-widest text-[#5B5570]">Email</label><input id="au-email" name="email" required type="email" autocomplete="email" placeholder="you@clinic.com" class="' + INPUT + '"></div>' +
        '<div><span class="text-xs font-black uppercase tracking-widest text-[#5B5570]">Credential</span><div id="cred-chips" class="mt-1.5 flex flex-wrap gap-2">' + credChips() + "</div></div>" +
        '<button class="w-full rounded-full bg-[#7C6FF0] px-6 py-3.5 text-sm font-black text-white shadow-[0_5px_0_#5B4ED6] transition hover:brightness-105 active:translate-y-0.5 active:shadow-none">Create my free account</button>' +
        '<p class="text-center text-xs font-semibold text-[#5B5570]">Free forever · No card required · Your CEU transcript lives here</p></form>';
  }

  /* ---------- Mount ---------- */
  var els = {};
  function renderHeader() { els.header.innerHTML = headerHtml(); }
  function renderOverlays() {
    var st = S.state;
    els.cart.innerHTML = cartHtml();
    els.cartDrawer.classList.toggle("open", st.cartOpen);
    els.cartDrawer.setAttribute("aria-hidden", String(!st.cartOpen));
    els.cartOverlay.classList.toggle("open", st.cartOpen);
    els.authOverlay.classList.toggle("open", st.authOpen);
    els.authModal.classList.toggle("open", st.authOpen);
    els.authModal.setAttribute("aria-hidden", String(!st.authOpen));
    document.documentElement.classList.toggle("overflow-hidden", st.cartOpen || st.authOpen);
  }
  var lastOpen = { cart: false, auth: false };
  function onStore() {
    renderHeader(); renderOverlays();
    var st = S.state;
    if (st.cartOpen && !lastOpen.cart) setTimeout(function () { var b = document.getElementById("cart-close"); b && b.focus(); }, 50);
    if (st.authOpen && !lastOpen.auth) setTimeout(function () { var i = document.getElementById("au-name"); i && i.focus(); }, 80);
    lastOpen.cart = st.cartOpen; lastOpen.auth = st.authOpen;
  }

  function mount() {
    var main = document.getElementById("page");
    var skip = document.createElement("a"); skip.href = "#page"; skip.className = "skip-link"; skip.textContent = "Skip to content";
    document.body.insertBefore(skip, document.body.firstChild);
    els.header = document.createElement("header");
    els.header.className = "sticky top-0 z-40 border-b-2 border-[#2E2A3B]/8 bg-[#FFF9F1]/95 backdrop-blur-md print-hidden";
    main.parentNode.insertBefore(els.header, main);
    els.footer = document.createElement("footer");
    els.footer.className = "bg-[#2E2A3B] text-white print-hidden";
    els.footer.innerHTML = footerHtml();
    main.parentNode.insertBefore(els.footer, main.nextSibling);

    els.cartOverlay = document.createElement("div"); els.cartOverlay.className = "overlay print-hidden"; els.cartOverlay.setAttribute("data-act", "close-cart");
    els.cartDrawer = document.createElement("aside"); els.cartDrawer.className = "drawer flex flex-col bg-[#FFF9F1] shadow-2xl print-hidden"; els.cartDrawer.setAttribute("role", "dialog"); els.cartDrawer.setAttribute("aria-modal", "true"); els.cartDrawer.setAttribute("aria-labelledby", "cart-title");
    els.cart = els.cartDrawer; // content container
    els.authOverlay = document.createElement("div"); els.authOverlay.className = "overlay print-hidden"; els.authOverlay.setAttribute("data-act", "close-auth");
    var wrap = document.createElement("div"); wrap.className = "pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4 print-hidden";
    els.authModal = document.createElement("div"); els.authModal.className = "modal w-full max-w-md overflow-hidden rounded-[2rem] bg-white shadow-2xl"; els.authModal.setAttribute("role", "dialog"); els.authModal.setAttribute("aria-modal", "true"); els.authModal.setAttribute("aria-labelledby", "auth-title");
    els.authModal.innerHTML = authHtml();
    wrap.appendChild(els.authModal);
    [els.cartOverlay, els.cartDrawer, els.authOverlay, wrap].forEach(function (n) { document.body.appendChild(n); });
    els.authWrap = wrap;

    renderHeader(); renderOverlays();
    S.subscribe(onStore);
    observeReveals(document);
  }

  /* ---------- Shared actions ---------- */
  function submitEmail(source, email, extra) {
    return window.api.available().then(function (ok) {
      if (ok) return window.api.post("subscribe.php", Object.assign({ email: email, source: source }, extra || {})).then(function (r) { return r.status < 300 ? true : Promise.reject(new Error((r.body && r.body.error) || "Could not save your email.")); });
      /* Static hosting: keep a local record so the demo still behaves */
      try { var k = "taa_leads", list = JSON.parse(localStorage.getItem(k) || "[]"); list.push({ email: email, source: source, at: new Date().toISOString() }); localStorage.setItem(k, JSON.stringify(list)); } catch (e) { /* ignore */ }
      return true;
    });
  }

  Actions.many({
    "open-cart": function () { ui.mobileOpen = false; S.openCart(); },
    "close-cart": function () { S.closeCart(); },
    "open-auth": function () { ui.mobileOpen = false; S.openAuth(); },
    "close-auth": function () { S.closeAuth(); },
    "toggle-menu": function () { ui.menuOpen = !ui.menuOpen; renderHeader(); },
    "toggle-mobile": function () { ui.mobileOpen = !ui.mobileOpen; renderHeader(); },
    "signout": function () { ui.menuOpen = false; S.signOut(); location.href = "index.html"; },
    "add-cart": function (el) { S.addToCart(el.getAttribute("data-id")); },
    "remove-cart": function (el) { S.removeFromCart(el.getAttribute("data-id")); },
    "toggle-wish": function (el) { S.toggleWishlist(el.getAttribute("data-id")); },
    "cart-enroll": function () {
      var st = S.state;
      if (!st.user) { S.closeCart(); S.openAuth(); return; }
      S.enroll(st.cart.slice()); S.clearCart(); S.closeCart(); location.href = "dashboard.html";
    },
    "pick-cred": function (el) { ui.authCreds = el.getAttribute("data-cred"); document.getElementById("cred-chips").innerHTML = credChips(); },
    "signin": function (form) {
      var name = form.elements.name.value.trim(), email = form.elements.email.value.trim();
      if (!name || email.indexOf("@") < 0) return;
      S.signIn({ name: name, email: email, creds: ui.authCreds });
      S.closeAuth(); form.reset();
    },
    "newsletter": function (form) {
      var email = form.elements.email.value.trim(); if (!email) return;
      var box = document.getElementById("newsletter"), btn = form.querySelector("button"); btn.disabled = true;
      submitEmail("newsletter", email).then(function () {
        box.innerHTML = '<p class="mt-3 flex items-center gap-2 rounded-2xl bg-[#0EA58C]/20 p-3 text-sm font-extrabold text-[#7BF0D4]" role="status">' + icon("check", 16) + " You’re in! Check your inbox for your free CEU.</p>";
      }).catch(function (err) { btn.disabled = false; alert(err.message); });
    }
  });

  window.Layout = { mount: mount, observeReveals: observeReveals, submitEmail: submitEmail, logo: logo };
  window.Actions = Actions;
})();
