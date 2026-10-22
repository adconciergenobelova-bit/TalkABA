/* Instructors page */
(function () {
  var T = window.TAA, U = window.UI, icon = window.icon, esc = U.esc;
  Layout.mount();

  var cards = T.instructors.map(function (ins, i) {
    var mine = T.courses.filter(function (c) { return c.instructorId === ins.id; });
    var flip = i % 2 === 1;
    return '<div class="reveal grid items-center gap-8 rounded-[2.5rem] border-2 border-[#2E2A3B]/10 bg-white p-7 sm:p-10 lg:grid-cols-[0.8fr_1.2fr]"><div class="text-center ' + (flip ? "lg:order-2" : "") + '">' +
      '<div class="mx-auto w-fit shadow-xl rounded-[2.5rem]">' + U.avatar(ins, "h-56 w-56 rounded-[2.5rem] border-4", "text-7xl font-semibold", "border-color:" + ins.color) + "</div>" +
      '<div class="mx-auto mt-4 flex w-fit items-center gap-4 rounded-2xl bg-[#FFF9F1] px-5 py-3 text-center">' +
        '<span><span class="font-display block text-xl font-semibold text-[#2E2A3B]">' + mine.length + '</span><span class="text-[10px] font-black uppercase tracking-widest text-[#5B5570]">Courses</span></span><span class="h-8 w-px bg-[#2E2A3B]/10"></span>' +
        '<span><span class="font-display block text-xl font-semibold text-[#2E2A3B]">' + (ins.learners / 1000).toFixed(1) + 'k</span><span class="text-[10px] font-black uppercase tracking-widest text-[#5B5570]">Learners</span></span><span class="h-8 w-px bg-[#2E2A3B]/10"></span>' +
        '<span><span class="font-display flex items-center justify-center gap-1 text-xl font-semibold text-[#2E2A3B]">' + ins.rating.toFixed(1) + icon("star", 14, "fill-[#FFC93C] text-[#E0A81A]") + '</span><span class="text-[10px] font-black uppercase tracking-widest text-[#5B5570]">Rating</span></span></div></div>' +
      '<div class="' + (flip ? "lg:order-1" : "") + '"><p class="text-xs font-black uppercase tracking-[0.2em]" style="color:' + ins.color + '">' + esc(ins.creds) + '</p><h2 class="font-display mt-1 text-3xl font-semibold text-[#2E2A3B] sm:text-4xl">' + esc(ins.name) + '</h2><p class="mt-1 text-sm font-black text-[#5B5570]">' + esc(ins.role) + '</p><p class="mt-3 font-medium leading-relaxed text-[#5B5570]">' + esc(ins.bio) + "</p>" +
      '<div class="mt-4 flex flex-wrap gap-2">' + ins.specialties.map(function (s) { return '<span class="rounded-full px-3 py-1.5 text-xs font-black text-white" style="background:' + ins.color + '">' + esc(s) + "</span>"; }).join("") + "</div>" +
      '<div class="mt-5 space-y-2">' + mine.map(function (c) {
        return '<a href="' + U.courseUrl(c) + '" class="group flex items-center gap-3 rounded-2xl border-2 border-[#2E2A3B]/8 p-2.5 transition hover:border-[#2E2A3B]/20"><img src="' + c.image + '" alt="" class="h-14 w-16 rounded-xl object-cover" loading="lazy"><span class="min-w-0 flex-1"><span class="block truncate text-sm font-black text-[#2E2A3B]">' + esc(c.title) + '</span><span class="mt-0.5 flex items-center gap-2 text-xs font-bold text-[#5B5570]">' + U.stars(c.rating, 11) + " " + c.ceus + " CEUs · " + U.money(c.price) + "</span></span>" + icon("arrow-right", 16, "mr-2 shrink-0 transition group-hover:translate-x-1") + "</a>";
      }).join("") + "</div></div></div>";
  }).join("");

  document.getElementById("page").innerHTML =
    U.pageHero({ eyebrow: "Meet the faculty", color: "#3EA6FF", title: "Practitioners first.<br>Presenters second.", blurb: "Every instructor carries an active caseload. They teach what they did this week — with real video, real data, and real honesty about what flopped." }) +
    '<div class="mx-auto max-w-7xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">' + cards +
    '<div class="confetti-card rounded-[2.5rem] bg-[#0EA58C] p-8 text-center text-white sm:p-12">' + icon("award", 36, "mx-auto") + '<h2 class="font-display mt-3 text-3xl font-semibold">Want to teach with us?</h2><p class="mx-auto mt-2 max-w-xl font-medium text-white/85">We\'re always looking for assent-based clinicians with a story to tell and video to share. Faculty earn revenue share + full production support.</p>' +
    '<a href="mailto:faculty@talkaba.academy" class="mt-5 inline-block rounded-full bg-white px-7 py-3.5 text-sm font-black text-[#0B7C69] hover:scale-[1.03]">Become an instructor →</a><p class="mt-3 flex items-center justify-center gap-1.5 text-xs font-bold text-white/70">' + icon("users", 14) + " faculty@talkaba.academy</p></div></div>";
  Layout.observeReveals(document);
})();
