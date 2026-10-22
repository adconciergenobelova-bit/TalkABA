/* Shared UI helpers. Each function returns an HTML string. */
(function () {
  var T = window.TAA;

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function money(n) { return "$" + n; }
  function num(n) { return Number(n).toLocaleString("en-US"); }
  function accent(color) { return color === "#FFC93C" ? "#E0A81A" : color; }
  function link(href, cls, inner, extra) { return '<a href="' + href + '" class="' + cls + '"' + (extra || "") + ">" + inner + "</a>"; }
  function courseUrl(c) { return "course.html?slug=" + encodeURIComponent(c.slug); }
  function learnUrl(c) { return "learn.html?slug=" + encodeURIComponent(c.slug); }

  /* Instructor avatar with graceful fallback to initials when the photo is missing */
  function avatar(inst, sizeCls, textCls, borderStyle) {
    var initials = '<span class="font-display ' + sizeCls + ' flex shrink-0 items-center justify-center ' + textCls + ' text-white" style="background:' + inst.color + '">' + esc(inst.initials) + "</span>";
    if (!inst.image) return initials;
    return '<img src="' + inst.image + '" alt="' + esc(inst.name) + '" class="' + sizeCls + ' object-cover" style="' + (borderStyle || "") + '" onerror="this.outerHTML=this.getAttribute(\'data-fb\')" data-fb="' + esc(initials) + '">';
  }

  function stars(rating, size) {
    size = size || 14; var out = "";
    for (var i = 1; i <= 5; i++) {
      out += window.icon("star", size, i <= Math.round(rating) ? "fill-[#FFC93C] text-[#E0A81A]" : "text-[#D8D2C4]", 2.5);
    }
    return '<span class="inline-flex items-center gap-0.5" role="img" aria-label="' + rating + ' out of 5 stars">' + out + "</span>";
  }

  function ceuBadge(ceus, types, dark) {
    var label = types.indexOf("BACB Ethics") > -1 ? "Ethics CEUs" : types.indexOf("BACB Supervision") > -1 ? "Supervision CEUs" : "CEUs";
    return '<span class="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-extrabold ' + (dark ? "bg-white/20 text-white" : "bg-[#2E2A3B] text-white") + '">' +
      window.icon("award", 13, "", 2.75) + " " + ceus + " " + label + (types.indexOf("ASHA") > -1 ? " · ASHA" : "") + "</span>";
  }

  /* opts.animate (default true): fade-up on scroll */
  function courseCard(course, index, opts) {
    opts = opts || {};
    var st = window.store.state;
    var inst = T.instructorOf(course.instructorId);
    var enrolled = Boolean(st.enrollments[course.id]);
    var wished = st.wishlist.indexOf(course.id) > -1;
    var anim = opts.animate === false ? "" : " reveal";
    var delay = opts.animate === false ? "" : ' style="--d:' + ((index || 0) % 3) * 0.08 + 's"';
    var catColor = course.color === "#FFC93C" ? "#B8860B" : course.color;
    var badges = "";
    if (course.bestseller) badges += '<span class="rounded-full bg-[#FFC93C] px-3 py-1 text-[11px] font-black uppercase tracking-wide text-[#2E2A3B]">Bestseller</span>';
    if (course.new) badges += '<span class="rounded-full bg-[#0EA58C] px-3 py-1 text-[11px] font-black uppercase tracking-wide text-white">New</span>';
    if (course.format === "Live Cohort") badges += '<span class="rounded-full bg-[#FF6B5B] px-3 py-1 text-[11px] font-black uppercase tracking-wide text-white">Live</span>';
    var action = enrolled
      ? link(learnUrl(course), "inline-flex items-center gap-1.5 rounded-full bg-[#0EA58C] px-4 py-2.5 text-sm font-extrabold text-white hover:bg-[#0B7C69]", window.icon("check", 15, "", 3) + " Continue")
      : '<button data-act="add-cart" data-id="' + course.id + '" class="inline-flex items-center gap-1.5 rounded-full bg-[#2E2A3B] px-4 py-2.5 text-sm font-extrabold text-white transition hover:bg-[#FF6B5B]">' + window.icon("shopping-cart", 15, "", 2.75) + " Enroll</button>";
    return '<div class="group relative flex flex-col overflow-hidden rounded-3xl border-2 border-[#2E2A3B]/10 bg-white shadow-[0_10px_30px_-12px_rgba(46,42,59,0.25)] transition-transform duration-300 hover:-translate-y-1.5' + anim + '"' + delay + ">" +
      '<a href="' + courseUrl(course) + '" class="relative block overflow-hidden">' +
        '<img src="' + course.image + '" alt="' + esc(course.title) + '" class="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy">' +
        '<div class="absolute inset-0 bg-gradient-to-t from-[#2E2A3B]/55 via-transparent to-transparent"></div>' +
        '<div class="absolute left-3 top-3 flex gap-2">' + badges + "</div>" +
        '<div class="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">' + ceuBadge(course.ceus, course.ceuTypes, true) +
          '<span class="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-[#2E2A3B] opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100">' + window.icon("play", 18, "ml-0.5 fill-current") + "</span></div>" +
      "</a>" +
      '<button data-act="toggle-wish" data-id="' + course.id + '" aria-label="' + (wished ? "Remove from wishlist" : "Save to wishlist") + '" aria-pressed="' + wished + '" class="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full shadow-md transition ' + (wished ? "bg-[#FF6B5B] text-white" : "bg-white/95 text-[#2E2A3B] hover:text-[#FF6B5B]") + '">' + window.icon("heart", 16, wished ? "fill-current" : "") + "</button>" +
      '<div class="flex flex-1 flex-col gap-3 p-5">' +
        '<p class="text-[11px] font-black uppercase tracking-[0.14em]" style="color:' + catColor + '">' + esc(course.category) + "</p>" +
        '<a href="' + courseUrl(course) + '" class="font-display text-lg font-semibold leading-snug text-[#2E2A3B] decoration-2 underline-offset-4 hover:underline" style="text-decoration-color:' + course.color + '">' + esc(course.title) + "</a>" +
        '<p class="text-sm font-medium text-[#5B5570]">' + esc(inst.name) + ", " + esc(inst.creds) + "</p>" +
        '<div class="flex items-center gap-2 text-sm"><span class="font-black text-[#2E2A3B]">' + course.rating.toFixed(1) + "</span>" + stars(course.rating) + '<span class="font-semibold text-[#5B5570]">(' + num(course.reviews) + ")</span></div>" +
        '<div class="flex items-center gap-4 text-xs font-bold text-[#5B5570]">' +
          '<span class="inline-flex items-center gap-1">' + window.icon("clock", 13) + " " + course.hours + "h</span>" +
          '<span class="inline-flex items-center gap-1">' + window.icon("chart-column", 13) + " " + esc(course.level) + "</span>" +
          '<span class="inline-flex items-center gap-1">' + window.icon("play", 13) + " " + course.lessonsCount + " lessons</span></div>" +
        '<div class="mt-auto flex items-center justify-between gap-3 pt-2"><div class="flex items-baseline gap-2"><span class="font-display text-2xl font-semibold text-[#2E2A3B]">' + money(course.price) + "</span>" +
          (course.compareAt ? '<span class="text-sm font-bold text-[#5B5570]/60 line-through">' + money(course.compareAt) + "</span>" : "") + "</div>" + action + "</div>" +
      "</div></div>";
  }

  function sectionHead(o) {
    var centered = (o.align || "center") === "center";
    return '<div class="reveal mb-10 max-w-2xl ' + (centered ? "mx-auto text-center" : "text-left") + '">' +
      '<span class="inline-block rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-white" style="background:' + (o.color || "#FF6B5B") + '">' + o.eyebrow + "</span>" +
      '<h2 class="font-display mt-4 text-3xl font-semibold leading-tight ' + (o.dark ? "text-white" : "text-[#2E2A3B]") + ' sm:text-4xl">' + o.title + "</h2>" +
      (o.blurb ? '<p class="mt-3 text-base font-medium leading-relaxed ' + (o.dark ? "text-white/70" : "text-[#5B5570]") + ' sm:text-lg">' + o.blurb + "</p>" : "") + "</div>";
  }

  var WAVE = '<svg viewBox="0 0 1440 60" preserveAspectRatio="none" class="relative block h-10 w-full sm:h-14" style="color:#FFF9F1" aria-hidden="true"><path d="M0,32 C240,60 480,0 720,24 C960,48 1200,8 1440,32 L1440,60 L0,60 Z" fill="currentColor"/></svg>';

  function pageHero(o) {
    return '<div class="relative overflow-hidden" style="background:linear-gradient(135deg,' + o.color + " 0%," + o.color + "DD 55%," + o.color + 'B3 100%)">' +
      '<div class="dot-grid-light absolute inset-0 opacity-60"></div>' +
      '<div class="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10"></div>' +
      '<div class="absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-black/10"></div>' +
      '<div class="relative mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:px-8">' +
        "<div>" +
          '<span class="animate-rise-in inline-block rounded-full bg-white/20 px-4 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-white backdrop-blur">' + o.eyebrow + "</span>" +
          '<h1 class="animate-rise-in font-display mt-4 text-4xl font-semibold leading-[1.05] text-white sm:text-5xl" style="animation-delay:.08s">' + o.title + "</h1>" +
          (o.blurb ? '<p class="animate-rise-in mt-4 max-w-xl text-lg font-medium text-white/90" style="animation-delay:.16s">' + o.blurb + "</p>" : "") +
          (o.children ? '<div class="animate-rise-in mt-6 flex flex-wrap gap-3" style="animation-delay:.24s">' + o.children + "</div>" : "") +
        "</div>" +
        (o.image ? '<div class="animate-rise-in relative hidden lg:block" style="animation-delay:.2s"><img src="' + o.image + '" alt="" class="h-72 w-full rotate-2 rounded-[2rem] border-4 border-white/60 object-cover shadow-2xl">' +
          '<div class="absolute -bottom-4 -left-4 -rotate-3 rounded-2xl bg-white px-4 py-2 shadow-xl">' + stars(5) + ' <span class="ml-1 text-sm font-black text-[#2E2A3B]">4.9 · 6,000+ reviews</span></div></div>' : "") +
      "</div>" + WAVE + "</div>";
  }

  /* Re-render a region whenever the store changes; returns the render function */
  function bind(el, fn) {
    function r() { el.innerHTML = fn(); window.Layout && window.Layout.observeReveals(el); }
    r(); window.store.subscribe(r); return r;
  }

  window.UI = { esc: esc, money: money, num: num, accent: accent, link: link, courseUrl: courseUrl, learnUrl: learnUrl, avatar: avatar, stars: stars, ceuBadge: ceuBadge, courseCard: courseCard, sectionHead: sectionHead, pageHero: pageHero, WAVE: WAVE, bind: bind };
})();
