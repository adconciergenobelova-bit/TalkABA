/* Philosophy page */
(function () {
  var T = window.TAA, U = window.UI, icon = window.icon;
  Layout.mount();

  var journey = [
    { icon: "ear", c: "#3EA6FF", s: "#DCEEFF", t: "1 · Learn by Listening", d: "Ask the autistic person — and those who know and love them — about loves, hates, and what behavior communicates. Start with questions, not clipboards.", quote: "Today's ABA starts with asking questions, listening, and learning." },
    { icon: "blocks", c: "#FF6B5B", s: "#FFE3DC", t: "2 · Learn by Creating Joy", d: "Enrich a space until the learner is Happy, Relaxed & Engaged. Follow their lead, remove all pressure, and let them vote with their feet.", quote: "Teach the learner: I know you, I see you, I hear you, I'm here for you." },
    { icon: "heart-handshake", c: "#0EA58C", s: "#D7F3E5", t: "3 · Learn by Empowering", d: "Signal change kindly — and relent the moment distress appears. Build trust by proving escalation is never required to be heard.", quote: "Ours is not to coerce, but to listen, learn, guide, and coach." },
    { icon: "sprout", c: "#7C6FF0", s: "#E4E0FF", t: "4 · Learn While Teaching", d: "Pave the path with communication, toleration, and cooperation — paced by performance in the moment, never by pushing through tears.", quote: "There is no obligation to teach while children are upset in any way." }
  ];
  var commitments = [
    { icon: "shield-check", t: "Trauma-informed, always", d: "We assume learners carry adverse histories — so safety, choice, and trust are universal, not conditional." },
    { icon: "tv", t: "Televisible practice", d: "If you wouldn't be proud for a family to watch it, don't do it. Every procedure we teach passes the TV test." },
    { icon: "users", t: "Nothing about them, without them", d: "Autistic voices shape our curricula. We cite, credit, and compensate lived-experience collaborators." }
  ];
  var thenNow = [
    ["Compliance as the goal", "Cooperation as the relationship"],
    ["Work through problem behavior", "Listen to behavior as communication"],
    ["Escape extinction by default", "Honor assent withdrawal instantly"],
    ["Deficit-based assessment", "Joy-based, interview-informed PFA"],
    ["Therapist-led drills", "Learner-led play with embedded teaching"],
    ["Restraint & seclusion plans", "Prevention, de-escalation & trust"]
  ];
  var picks = T.courses.filter(function (c) { return ["todays-aba-foundations", "pfa-interview-informed", "sbt-skills-based-treatment"].indexOf(c.id) > -1; });

  document.getElementById("page").innerHTML =
    U.pageHero({ eyebrow: "Our philosophy", color: "#0EA58C", title: "From compliance to compassion: the story of Today's ABA.", blurb: "Inspired by Dr. Greg Hanley's landmark essay 'A Perspective on Today's ABA' — the ideas that rebuilt our field, and Talk ABA.", image: "images/family-coaching.jpg",
      children: '<a href="courses.html" class="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-black text-[#0B7C69] hover:scale-[1.03]">Learn it live in a course ' + icon("arrow-right", 16, "", 3) + "</a>" }) +
    '<section class="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6">' + icon("quote", 36, "mx-auto text-[#FF6B5B]") +
      '<blockquote class="reveal font-display mt-4 text-2xl font-medium leading-snug text-[#2E2A3B] sm:text-3xl">“Today\'s ABA is about continually learning about the predilections of the autistic person being served — so that preferred learning contexts can be developed en route to skills that can be appreciated by the autistic person as well as others.”</blockquote>' +
      '<p class="mt-4 text-xs font-black uppercase tracking-[0.2em] text-[#5B5570]">Dr. Greg Hanley · A Perspective on Today\'s ABA (2020)</p></section>' +
    '<section class="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">' + U.sectionHead({ eyebrow: "The four movements", color: "#0EA58C", title: 'How Today\'s ABA <span class="text-[#0B7C69]">actually works</span>', blurb: "Hanley's framework, in plain language — and exactly how we teach each movement inside Talk ABA." }) +
      '<div class="grid gap-6 md:grid-cols-2">' + journey.map(function (j, i) {
        return '<div class="reveal rounded-[2rem] border-2 border-[#2E2A3B]/10 bg-white p-7" style="--d:' + (i % 2) * 0.08 + 's"><span class="inline-flex h-14 w-14 items-center justify-center rounded-2xl text-white" style="background:' + j.c + '">' + icon(j.icon, 26, "", 2.5) + '</span><h3 class="font-display mt-4 text-2xl font-semibold text-[#2E2A3B]">' + j.t + '</h3><p class="mt-2 font-medium leading-relaxed text-[#5B5570]">' + j.d + '</p><p class="font-display mt-4 rounded-2xl p-4 text-[15px] font-medium italic text-[#2E2A3B]" style="background:' + j.s + '">“' + j.quote + "”</p></div>";
      }).join("") + "</div></section>" +
    '<section class="bg-[#2E2A3B] py-16 text-white sm:py-20"><div class="mx-auto max-w-5xl px-4 sm:px-6">' + U.sectionHead({ eyebrow: "Then → Now", color: "#FF6B5B", title: 'What changed in <span class="text-[#FF6B5B]">our field</span>', dark: true }) +
      '<div class="overflow-hidden rounded-[2rem] border border-white/10"><div class="grid grid-cols-2 bg-white/10 text-xs font-black uppercase tracking-[0.16em] text-white/60"><span class="p-4">Yesterday\'s ABA</span><span class="p-4">Today\'s ABA ✓</span></div>' +
      thenNow.map(function (r, i) { return '<div class="reveal grid grid-cols-2 border-t border-white/10 text-sm font-bold sm:text-base" style="--d:' + i * 0.05 + 's"><span class="p-4 text-white/45 line-through decoration-[#FF6B5B]/60 decoration-2">' + U.esc(r[0]) + '</span><span class="bg-[#0EA58C]/10 p-4 text-[#7BF0D4]">' + U.esc(r[1]) + "</span></div>"; }).join("") + "</div>" +
      '<div class="mt-8 grid gap-4 sm:grid-cols-3">' + commitments.map(function (c) { return '<div class="rounded-3xl bg-white/[0.07] p-5">' + icon(c.icon, 24, "text-[#FFC93C]") + '<p class="font-display mt-2 text-lg font-semibold">' + c.t + '</p><p class="mt-1 text-sm font-medium text-white/65">' + c.d + "</p></div>"; }).join("") + "</div></div></section>" +
    '<section class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">' + U.sectionHead({ eyebrow: "Learn the framework", color: "#FF6B5B", title: 'Courses that teach <span class="text-[#E14E40]">this philosophy</span>', blurb: "Don't just read about Today's ABA — practice it with coaching, video, and CEUs attached." }) +
      '<div id="picks" class="grid gap-6 md:grid-cols-3"></div>' +
      '<div class="reveal mt-10 rounded-[2rem] border-2 border-[#2E2A3B]/10 bg-white p-6 text-center sm:p-8"><p class="text-sm font-bold text-[#5B5570]">With gratitude to Dr. Greg Hanley and the PFA/SBT community whose research and courage made Talk ABA possible. We encourage every learner to read the original essay and explore practicalfunctionalassessment.com.</p>' +
      '<p class="mt-2 text-xs font-black uppercase tracking-widest text-[#5B5570]/60">Talk ABA is an independent CEU provider inspired by — but not affiliated with — FTF Behavioral Consulting.</p></div></section>';

  UI.bind(document.getElementById("picks"), function () { return picks.map(function (c, i) { return U.courseCard(c, i, { animate: false }); }).join(""); });
  Layout.observeReveals(document);
})();
