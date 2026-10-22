/* Course detail page: course.html?slug=... */
(function () {
  var T = window.TAA, S = window.store, U = window.UI, icon = window.icon, esc = U.esc;
  Layout.mount();

  var slug = new URLSearchParams(location.search).get("slug") || "";
  var course = T.courseBySlug(slug);
  var root = document.getElementById("page");

  if (!course) {
    document.title = "Course not found | Talk ABA";
    root.innerHTML = '<div class="mx-auto max-w-3xl px-4 py-24 text-center"><p class="font-display text-3xl font-semibold">Course not found</p><a href="courses.html" class="mt-4 inline-block rounded-full bg-[#2E2A3B] px-6 py-3 text-sm font-black text-white">Back to catalog</a></div>';
    return;
  }

  document.title = course.title + " | Talk ABA";
  var md = document.querySelector('meta[name="description"]'); if (md) md.setAttribute("content", course.tagline);

  var inst = T.instructorOf(course.instructorId);
  var related = T.courses.filter(function (c) { return c.id !== course.id && c.category === course.category; }).slice(0, 3);
  if (!related.length) related = T.courses.filter(function (c) { return c.id !== course.id; }).slice(0, 3);
  var allLessons = []; course.modules.forEach(function (m) { m.lessons.forEach(function (l) { allLessons.push(l); }); });
  var totalMin = allLessons.reduce(function (s, l) { return s + l.minutes; }, 0);
  var kindIcon = { video: "monitor-play", reading: "file-text", activity: "pen-line", quiz: "list-video" };
  var reviews = T.testimonials.slice(0, 2);
  var accent = U.accent(course.color);

  function sidebar() {
    var st = S.state, enrolled = Boolean(st.enrollments[course.id]), wished = st.wishlist.indexOf(course.id) > -1;
    var cta = enrolled
      ? '<a href="' + U.learnUrl(course) + '" class="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#0EA58C] px-6 py-4 text-base font-black text-white shadow-[0_5px_0_#0B7C69] transition hover:brightness-105">' + icon("play", 18) + " Continue learning</a>"
      : '<div class="mt-4 space-y-2.5"><button data-act="enroll-now" class="w-full rounded-full px-6 py-4 text-base font-black text-white shadow-[0_5px_0_rgba(0,0,0,0.25)] transition hover:brightness-105" style="background:' + accent + '">Enroll now — instant access</button>' +
        '<div class="flex gap-2.5"><button data-act="add-cart" data-id="' + course.id + '" class="flex flex-1 items-center justify-center gap-2 rounded-full border-[3px] border-[#2E2A3B] px-4 py-2.5 text-sm font-black text-[#2E2A3B] transition hover:bg-[#2E2A3B] hover:text-white">' + icon("shopping-cart", 16) + " Add to cart</button>" +
        '<button data-act="toggle-wish" data-id="' + course.id + '" aria-label="' + (wished ? "Remove from wishlist" : "Save to wishlist") + '" aria-pressed="' + wished + '" class="inline-flex w-12 items-center justify-center rounded-full border-[3px] transition ' + (wished ? "border-[#FF6B5B] bg-[#FF6B5B] text-white" : "border-[#2E2A3B]/15 text-[#5B5570] hover:border-[#FF6B5B] hover:text-[#FF6B5B]") + '">' + icon("heart", 17, wished ? "fill-current" : "") + "</button></div></div>";
    return '<div class="p-6"><div class="flex flex-wrap items-baseline gap-2"><span class="font-display text-4xl font-semibold text-[#2E2A3B]">' + U.money(course.price) + "</span>" +
      (course.compareAt ? '<span class="text-lg font-bold text-[#5B5570]/50 line-through">' + U.money(course.compareAt) + '</span><span class="rounded-full bg-[#E14E40]/10 px-2.5 py-1 text-xs font-black text-[#E14E40]">SAVE ' + U.money(course.compareAt - course.price) + "</span>" : "") + "</div>" +
      '<div class="mt-3 flex items-center gap-2 rounded-2xl bg-[#D7F3E5] p-3 text-sm font-extrabold text-[#0B7C69]">' + icon("award", 17) + " Earns " + course.ceus + " CEUs · " + esc(course.ceuTypes.join(" + ")) + "</div>" + cta +
      '<div class="mt-5 space-y-2.5 border-t-2 border-dashed border-[#2E2A3B]/10 pt-5 text-sm font-bold text-[#5B5570]">' +
        '<p class="flex items-center gap-2.5">' + icon("clock", 16) + " " + course.hours + " hours on-demand video + resources</p>" +
        '<p class="flex items-center gap-2.5">' + icon("chart-column", 16) + " " + esc(course.level) + " level · " + course.lessonsCount + " lessons</p>" +
        '<p class="flex items-center gap-2.5">' + icon("infinity", 16) + " Lifetime access + free updates</p>" +
        '<p class="flex items-center gap-2.5">' + icon("badge-check", 16) + " " + esc(course.bacbEvent || "") + "</p>" +
        '<p class="flex items-center gap-2.5">' + icon("shield-check", 16) + " 30-day happiness guarantee</p></div></div>";
  }

  root.innerHTML =
    '<div class="relative overflow-hidden" style="background:linear-gradient(135deg,#2E2A3B 0%,' + course.color + '55 130%)"><div class="dot-grid-light absolute inset-0 opacity-40"></div>' +
      '<div class="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"><button data-act="go-back" class="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-xs font-black text-white backdrop-blur hover:bg-white/20">' + icon("arrow-left", 14) + " Back</button>" +
      '<div class="mt-5 grid gap-8 lg:grid-cols-[1.4fr_0.9fr]"><div><div class="flex flex-wrap gap-2"><span class="rounded-full px-3 py-1.5 text-xs font-black text-white" style="background:' + course.color + '">' + esc(course.category) + "</span>" + U.ceuBadge(course.ceus, course.ceuTypes, true) + '<span class="rounded-full bg-white/15 px-3 py-1.5 text-xs font-black text-white">' + esc(course.format) + "</span></div>" +
        '<h1 class="font-display mt-4 text-3xl font-semibold leading-tight text-white sm:text-5xl">' + esc(course.title) + '</h1><p class="mt-3 max-w-2xl text-lg font-medium text-white/85">' + esc(course.tagline) + "</p>" +
        '<div class="mt-4 flex flex-wrap items-center gap-4 text-sm font-bold text-white/85"><span class="flex items-center gap-1.5"><span class="font-black text-white">' + course.rating.toFixed(1) + "</span>" + U.stars(course.rating) + " <span>(" + U.num(course.reviews) + ' reviews)</span></span><span class="flex items-center gap-1.5">' + icon("users", 15) + " " + U.num(course.learners) + " learners</span></div>" +
        '<div class="mt-4 flex items-center gap-3">' + U.avatar(inst, "h-12 w-12 rounded-full border-2", "", "border-color:rgba(255,255,255,.5)") + '<div><p class="text-sm font-black text-white">Created by ' + esc(inst.name) + ", " + esc(inst.creds) + '</p><p class="text-xs font-bold text-white/70">' + esc(inst.role) + "</p></div></div></div></div></div></div>" +
    '<div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"><div class="grid gap-8 lg:grid-cols-[1.4fr_0.9fr]"><div class="space-y-8">' +
      '<div class="relative -mt-24 overflow-hidden rounded-[2rem] border-4 border-white shadow-2xl lg:hidden"><img src="' + course.image + '" alt="' + esc(course.title) + '" class="h-56 w-full object-cover"></div>' +
      '<section class="rounded-[2rem] border-2 border-[#2E2A3B]/10 bg-white p-6 sm:p-8"><h2 class="font-display text-2xl font-semibold text-[#2E2A3B]">What you\'ll be able to do</h2><ul class="mt-4 grid gap-3 sm:grid-cols-2">' +
        course.outcomes.map(function (o) { return '<li class="flex items-start gap-2.5 rounded-2xl bg-[#FFF9F1] p-3.5 text-sm font-bold text-[#2E2A3B]"><span class="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white" style="background:' + course.color + '">' + icon("check", 13, "", 3.5) + "</span>" + esc(o) + "</li>"; }).join("") + "</ul>" +
        '<div class="mt-5 flex flex-wrap gap-2">' + course.tags.map(function (t) { return '<span class="rounded-full bg-[#2E2A3B]/6 px-3 py-1.5 text-xs font-black text-[#5B5570]">#' + esc(t) + "</span>"; }).join("") + "</div></section>" +
      '<section class="rounded-[2rem] border-2 border-[#2E2A3B]/10 bg-white p-6 sm:p-8"><div class="flex flex-wrap items-center justify-between gap-2"><h2 class="font-display text-2xl font-semibold text-[#2E2A3B]">Course content</h2><span class="text-xs font-black text-[#5B5570]">' + course.modules.length + " modules · " + totalMin + ' min total</span></div><div class="mt-4 space-y-4">' +
        course.modules.map(function (m, mi) {
          return '<div class="overflow-hidden rounded-3xl border-2 border-[#2E2A3B]/8"><div class="flex items-center gap-3 px-5 py-4" style="background:' + course.soft + '"><span class="font-display inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white" style="background:' + course.color + '">' + (mi + 1) + '</span><div><p class="font-black text-[#2E2A3B]">' + esc(m.title) + '</p><p class="text-xs font-bold text-[#5B5570]">' + esc(m.blurb) + "</p></div></div>" +
            '<ul class="divide-y divide-[#2E2A3B]/6 bg-white">' + m.lessons.map(function (l) {
              return '<li class="flex items-center gap-3 px-5 py-3.5">' + icon(kindIcon[l.kind] || "list-video", 17, "shrink-0 text-[#5B5570]") + '<p class="flex-1 text-sm font-bold text-[#2E2A3B]">' + esc(l.title) + "</p>" + (l.free ? '<span class="rounded-full bg-[#0EA58C]/10 px-2.5 py-1 text-[11px] font-black text-[#0B7C69]">FREE PREVIEW</span>' : "") + '<span class="text-xs font-bold text-[#5B5570]">' + l.minutes + " min</span></li>";
            }).join("") + "</ul></div>";
        }).join("") + "</div></section>" +
      '<section class="rounded-[2rem] bg-[#2E2A3B] p-6 text-white sm:p-8"><h2 class="font-display text-2xl font-semibold">Meet your instructor</h2><div class="mt-4 flex flex-col gap-4 sm:flex-row">' +
        U.avatar(inst, "h-28 w-28 rounded-3xl border-4", "text-4xl font-semibold", "border-color:" + inst.color) +
        '<div><p class="font-display text-xl font-semibold">' + esc(inst.name) + ' <span class="text-base" style="color:' + course.color + '">' + esc(inst.creds) + '</span></p><p class="text-xs font-black uppercase tracking-widest text-white/50">' + esc(inst.role) + '</p><p class="mt-2 text-sm font-medium leading-relaxed text-white/75">' + esc(inst.bio) + "</p>" +
        '<div class="mt-3 flex flex-wrap gap-2">' + inst.specialties.map(function (s) { return '<span class="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white/80">' + esc(s) + "</span>"; }).join("") + "</div></div></div></section>" +
      '<section class="rounded-[2rem] border-2 border-[#2E2A3B]/10 bg-white p-6 sm:p-8"><h2 class="font-display text-2xl font-semibold text-[#2E2A3B]">Learner love</h2><div class="mt-4 grid gap-4 sm:grid-cols-2">' +
        reviews.map(function (t) { return '<figure class="rounded-3xl bg-[#FFF9F1] p-5">' + U.stars(5) + '<blockquote class="mt-2 text-sm font-medium text-[#2E2A3B]">“' + esc(t.quote) + '”</blockquote><figcaption class="mt-3 text-xs font-black text-[#5B5570]">' + esc(t.name) + " · " + esc(t.creds) + "</figcaption></figure>"; }).join("") + "</div></section>" +
      (related.length ? '<section><h2 class="font-display text-2xl font-semibold text-[#2E2A3B]">Keep the streak going</h2><div class="mt-4 grid gap-4 sm:grid-cols-3">' +
        related.map(function (c) { return '<a href="' + U.courseUrl(c) + '" class="group overflow-hidden rounded-3xl border-2 border-[#2E2A3B]/10 bg-white"><div class="overflow-hidden"><img src="' + c.image + '" alt="" class="h-28 w-full object-cover transition group-hover:scale-105" loading="lazy"></div><div class="p-4"><p class="line-clamp-2 text-sm font-black text-[#2E2A3B]">' + esc(c.title) + '</p><p class="mt-1 text-xs font-bold text-[#5B5570]">' + c.ceus + " CEUs · " + U.money(c.price) + "</p></div></a>"; }).join("") + "</div></section>" : "") +
    '</div><div><div class="animate-rise-in lg:sticky lg:top-24"><div class="hidden overflow-hidden rounded-[2rem] border-4 border-white shadow-2xl lg:block"><div class="relative"><img src="' + course.image + '" alt="' + esc(course.title) + '" class="h-56 w-full object-cover"><div class="absolute inset-0 flex items-center justify-center bg-[#2E2A3B]/30"><span class="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#2E2A3B] shadow-xl">' + icon("play", 24, "ml-1 fill-current") + "</span></div></div></div>" +
      '<div id="buybox" class="mt-0 overflow-hidden rounded-[2rem] border-2 border-[#2E2A3B]/10 bg-white shadow-xl lg:-mt-10"></div></div></div></div></div>';

  UI.bind(document.getElementById("buybox"), sidebar);

  Actions.many({
    "go-back": function () { if (history.length > 1) history.back(); else location.href = "courses.html"; },
    "enroll-now": function () {
      if (!S.state.user) { S.openAuth(); return; }
      S.enroll([course.id]); location.href = U.learnUrl(course);
    }
  });
})();
