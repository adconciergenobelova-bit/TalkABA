/* Home page */
(function () {
  var T = window.TAA, U = window.UI, icon = window.icon, esc = U.esc;
  Layout.mount();

  var stats = [
    { v: String(Math.round(T.courses.reduce(function (n, c) { return n + c.ceus; }, 0) * 10) / 10), l: "Total CEUs available", c: "#FF6B5B" },
    { v: "24k+", l: "Clinicians learning", c: "#0EA58C" },
    { v: "4.9★", l: "Average rating", c: "#E0A81A" },
    { v: "100%", l: "Joy-first, assent-based", c: "#7C6FF0" }
  ];
  var steps = [
    { icon: "monitor-play", t: "Pick your CEUs", d: "On-demand courses, live cohorts, and bundles — BACB + ASHA credit clearly labeled on every card.", c: "#FF6B5B" },
    { icon: "party-popper", t: "Learn through play", d: "Short videos, real session footage, practice labs, and quizzes with explanations — never gotchas.", c: "#0EA58C" },
    { icon: "printer", t: "Print your certificate", d: "Pass at 80% (unlimited retakes) and get an instant, verifiable PDF for your BACB/ASHA transcript.", c: "#7C6FF0" }
  ];
  var pillars = [
    { icon: "ear", t: "Learn by Listening", d: "Ask those who know and love the learner about loves, hates, and the story behind behavior.", c: "#3EA6FF" },
    { icon: "blocks", t: "Learn by Creating Joy", d: "Build enriched, child-led spaces where learners are Happy, Relaxed & Engaged — before any demand.", c: "#FF6B5B" },
    { icon: "heart-handshake", t: "Learn by Empowering", d: "Honor every protest instantly. Teach learners they never need to escalate to be heard.", c: "#0EA58C" },
    { icon: "sprout", t: "Learn While Teaching", d: "Grow communication, toleration, and cooperation at the learner's pace — never through tears.", c: "#7C6FF0" }
  ];
  var assurances = [
    { icon: "badge-check", t: "BACB ACE Provider", d: "Learning, Ethics & Supervision CEUs with event numbers on every certificate." },
    { icon: "shield-check", t: "30-Day Guarantee", d: "Love your course or get a full refund. Keep the downloadable resources." },
    { icon: "infinity", t: "Lifetime Access", d: "Learn at 2am between sessions. Courses + all future updates, forever." },
    { icon: "users", t: "Team Dashboards", d: "20–30% group discounts with CEU tracking for clinics & districts." }
  ];

  var features = [
    ["users", "Expert speakers from around the globe"],
    ["sparkles", "Practical insights"],
    ["badge-check", "Professional development"],
    ["heart-handshake", "Shared expertise"]
  ];

  function hero() {
    return '<div class="relative overflow-hidden" style="background:linear-gradient(135deg,#0B4A8E 0%,#0B4A8EDD 55%,#0B4A8EB3 100%)">' +
      '<div class="dot-grid-light absolute inset-0 opacity-60"></div>' +
      '<div class="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10"></div>' +
      '<div class="absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-black/10"></div>' +
      '<div class="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">' +
        '<div style="color:#FFF9F1">' +
          '<span class="animate-rise-in inline-block rounded-full bg-white/20 px-4 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-white backdrop-blur">Learn</span>' +
          '<h1 class="animate-rise-in font-display mt-4 text-5xl font-semibold uppercase leading-[1.05] text-white sm:text-6xl" style="animation-delay:.08s">Connect</h1>' +
          '<p class="animate-rise-in font-display mt-2 text-3xl font-medium uppercase text-white/90 sm:text-4xl" style="animation-delay:.16s">Grow</p>' +
          '<p class="animate-rise-in mt-6 inline-block rounded-full bg-white/15 px-5 py-2 text-sm font-black uppercase tracking-[0.14em] text-white" style="animation-delay:.24s">Make a bigger impact</p>' +
          '<div class="animate-rise-in mt-8 flex flex-wrap gap-3" style="animation-delay:.32s">' +
            '<a href="courses.html" class="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-black text-[#0B4A8E] shadow-lg transition hover:scale-[1.03]">Browse CEU courses ' + icon("arrow-right", 16, "", 3) + "</a>" +
            '<a href="#free-session" class="inline-flex items-center gap-2 rounded-full border-[3px] border-white px-7 py-3 text-sm font-black text-white transition hover:bg-white hover:text-[#0B4A8E]">Free November session</a></div>' +
        "</div>" +
        '<div id="free-session" class="animate-rise-in rounded-[2rem] border border-white/20 bg-white/10 p-6 text-white backdrop-blur sm:p-8" style="animation-delay:.2s">' +
          '<div class="flex items-center gap-3"><span class="font-display inline-flex h-12 w-12 items-center justify-center rounded-full text-lg font-semibold text-white" style="background:#E14E40">N</span>' +
            '<span class="font-display inline-flex h-12 w-12 items-center justify-center rounded-full text-lg font-semibold text-white" style="background:#7C6FF0">H</span></div>' +
          '<h2 class="font-display mt-4 text-2xl font-semibold uppercase leading-tight text-white sm:text-3xl">Talk ABA with Nene and Helen</h2>' +
          '<p class="mt-1 text-sm font-black uppercase tracking-[0.16em] text-white/70">A monthly ABA learning series</p>' +
          '<p class="mt-4 text-base font-medium leading-relaxed text-white/90">We\'re excited to announce our first <strong>FREE CEU session</strong> this November! Join us monthly as we host ABA specialists from around the globe for meaningful learning, professional development, and shared expertise.</p>' +
          '<ul class="mt-5 grid gap-3 sm:grid-cols-2">' + features.map(function (f) {
            return '<li class="flex items-center gap-3 rounded-2xl bg-white/10 p-3"><span class="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#D4A853] text-white">' + icon(f[0], 17, "", 2.5) + '</span><span class="text-xs font-black uppercase leading-snug">' + f[1] + "</span></li>";
          }).join("") + "</ul>" +
          '<div class="mt-5 grid gap-3 sm:grid-cols-2"><div class="flex items-start gap-3 rounded-2xl bg-white/10 p-4"><span class="mt-0.5 text-[#FF8A7D]">' + icon("play", 18, "fill-current") + '</span><p class="text-sm font-black uppercase">Listen in — absolutely free!</p></div>' +
            '<div class="flex items-start gap-3 rounded-2xl bg-white/10 p-4"><span class="mt-0.5 text-[#B9B1FF]">' + icon("award", 18) + '</span><p class="text-sm font-black uppercase">Certificate option: QABA or IBAO certificate available for ₦2,500.</p></div></div>' +
          '<div class="mt-4 flex items-start gap-3 rounded-2xl border border-[#7BF0D4]/40 p-4" style="color:#7BF0D4">' + icon("calendar-days", 20, "mt-0.5 shrink-0") + '<p class="text-sm font-black uppercase leading-snug">This November, we will be kicking off with Dr. Michael Mueller, CEO of IBAO, as our first presenter.</p></div>' +
          '<div class="mt-5 flex flex-wrap gap-2"><span class="rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-[0.12em] text-white" style="background:#E14E40">Stay tuned for more exciting learning with Nene and Helen!</span></div>' +
          '<div class="mt-5 flex flex-wrap gap-3 border-t border-white/15 pt-5 text-xs font-black uppercase">' +
            '<span class="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2" style="color:#FFB4AB">' + icon("badge-check", 15) + " International Behavior Analysis Organization approved content provider</span>" +
            '<span class="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2" style="color:#7BF0D4">' + icon("shield-check", 15) + " QABA approved training program</span></div>" +
        "</div></div>" + U.WAVE + "</div>";
  }

  var featured = T.courses.filter(function (c) { return c.featured; }).slice(0, 6);

  function page() {
    return hero() +
      /* Stats */
      '<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"><div class="grid grid-cols-2 gap-4 lg:grid-cols-4">' + stats.map(function (s, i) {
        return '<div class="reveal rounded-3xl border-2 border-[#2E2A3B]/10 bg-white p-6 text-center shadow-sm" style="--d:' + i * 0.07 + 's"><p class="font-display text-4xl font-semibold" style="color:' + s.c + '">' + s.v + '</p><p class="mt-1 text-sm font-extrabold text-[#5B5570]">' + s.l + "</p></div>";
      }).join("") + "</div></section>" +
      /* Featured */
      '<section class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">' +
        U.sectionHead({ eyebrow: "Start earning today", color: "#FF6B5B", title: 'Featured <span class="text-[#E14E40]">CEU courses</span>', blurb: "Our most-loved courses — on-demand, instantly accessible, certificates the moment you pass." }) +
        '<div id="featured" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3"></div>' +
        '<div class="reveal mt-8 text-center"><a href="courses.html" class="inline-flex items-center gap-2 rounded-full bg-[#2E2A3B] px-7 py-3.5 text-sm font-black text-white transition hover:bg-[#FF6B5B]">View all ' + T.courses.length + " courses &amp; bundles " + icon("arrow-right", 16, "", 3) + "</a></div></section>" +
      /* How it works */
      '<section class="mt-14 bg-[#2E2A3B] py-16 text-white sm:py-20"><div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">' +
        U.sectionHead({ eyebrow: "Ridiculously easy", color: "#FFC93C", title: 'CEUs in <span class="text-[#FFC93C]">3 joyful steps</span>', blurb: "No webinars-at-midnight. No 6-week waits for certificates. Just great learning, on your schedule.", dark: true }) +
        '<div class="grid gap-6 md:grid-cols-3">' + steps.map(function (s, i) {
          return '<div class="reveal relative rounded-[2rem] bg-white/[0.07] p-7 backdrop-blur" style="--d:' + i * 0.1 + 's"><span class="font-display absolute right-6 top-4 text-6xl font-semibold text-white/10">0' + (i + 1) + "</span>" +
            '<span class="inline-flex h-14 w-14 items-center justify-center rounded-2xl" style="background:' + s.c + '">' + icon(s.icon, 26, "text-white", 2.5) + '</span><h3 class="font-display mt-4 text-2xl font-semibold">' + s.t + '</h3><p class="mt-2 text-sm font-medium leading-relaxed text-white/70">' + s.d + "</p></div>";
        }).join("") + "</div>" +
        '<div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">' + assurances.map(function (a) {
          return '<div class="flex gap-3 rounded-2xl border border-white/10 p-4">' + icon(a.icon, 22, "shrink-0 text-[#FFC93C]") + '<div><p class="text-sm font-black">' + a.t + '</p><p class="mt-0.5 text-xs font-medium text-white/60">' + a.d + "</p></div></div>";
        }).join("") + "</div></div></section>" +
      /* Philosophy */
      '<section class="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8"><div class="grid items-center gap-10 lg:grid-cols-2"><div>' +
        U.sectionHead({ align: "left", eyebrow: "Why we're different", color: "#0EA58C", title: 'We teach <span class="text-[#0B7C69]">Today\'s ABA</span> — because kids deserve it', blurb: "Inspired by Dr. Greg Hanley's 'A Perspective on Today's ABA,' every Talk ABA course is built on safety, dignity, assent, and joy. Compliance is out. Cooperation is in." }) +
        '<div class="grid gap-4 sm:grid-cols-2">' + pillars.map(function (p, i) {
          return '<div class="reveal rounded-3xl border-2 border-[#2E2A3B]/10 bg-white p-5" style="--d:' + i * 0.07 + 's"><span class="inline-flex h-11 w-11 items-center justify-center rounded-xl text-white" style="background:' + p.c + '">' + icon(p.icon, 22, "", 2.5) + '</span><p class="font-display mt-3 text-lg font-semibold text-[#2E2A3B]">' + p.t + '</p><p class="mt-1 text-sm font-medium text-[#5B5570]">' + p.d + "</p></div>";
        }).join("") + "</div>" +
        '<a href="philosophy.html" class="mt-6 inline-flex items-center gap-2 font-black text-[#0B7C69] hover:underline">Read our full philosophy ' + icon("arrow-right", 16, "", 3) + "</a></div>" +
        '<div class="reveal relative"><img src="images/joy-learning.jpg" alt="Children playing and learning together" class="h-[520px] w-full rounded-[2.5rem] object-cover shadow-2xl" loading="lazy">' +
          '<div class="absolute bottom-6 left-6 right-6 rounded-3xl bg-white/95 p-5 shadow-xl backdrop-blur">' + icon("quote", 22, "text-[#FF6B5B]") +
          '<p class="font-display mt-2 text-lg font-medium leading-snug text-[#2E2A3B]">“Ours is not to coerce, but to listen, learn, guide, and coach.”</p><p class="mt-1 text-xs font-black uppercase tracking-widest text-[#5B5570]">Dr. Greg Hanley · A Perspective on Today\'s ABA</p></div></div>' +
      "</div></section>" +
      /* Paths */
      '<section class="bg-[#FFF3E4] py-16 sm:py-20"><div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">' +
        U.sectionHead({ eyebrow: "Save with bundles", color: "#7C6FF0", title: 'Learning paths, <span class="text-[#5B4ED6]">not random CEUs</span>', blurb: "Curated journeys that build real competence — and save you up to 20% versus buying courses solo." }) +
        '<div class="grid gap-6 lg:grid-cols-3">' + T.paths.map(function (p, i) {
          return '<div class="reveal flex flex-col rounded-[2rem] border-[3px] bg-white p-7" style="border-color:' + p.color + ";--d:" + i * 0.08 + 's">' +
            '<span class="inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-black text-white" style="background:' + p.color + '">' + icon("sparkles", 13) + " " + esc(p.level) + "</span>" +
            '<h3 class="font-display mt-3 text-2xl font-semibold text-[#2E2A3B]">' + esc(p.title) + '</h3><p class="mt-2 text-sm font-medium text-[#5B5570]">' + esc(p.blurb) + "</p>" +
            '<ul class="mt-4 space-y-2">' + p.courseIds.map(function (id) {
              var c = T.courses.filter(function (x) { return x.id === id; })[0];
              return '<li class="flex items-start gap-2 text-sm font-bold text-[#2E2A3B]">' + icon("check", 16, "mt-0.5 shrink-0", 3).replace("<svg ", '<svg style="color:' + p.color + '" ') + " " + esc(c.title) + '<span class="ml-auto shrink-0 text-xs text-[#5B5570]">' + c.ceus + " CEUs</span></li>";
            }).join("") + "</ul>" +
            '<div class="mt-5 flex items-baseline gap-2 border-t-2 border-dashed border-[#2E2A3B]/10 pt-4"><span class="font-display text-3xl font-semibold">' + U.money(p.price) + '</span><span class="text-sm font-bold text-[#5B5570]/60 line-through">' + U.money(p.compareAt) + '</span><span class="ml-auto rounded-full px-3 py-1 text-xs font-black text-white" style="background:' + p.color + '">' + p.totalCeus + " CEUs</span></div>" +
            '<a href="paths.html" class="mt-4 rounded-full py-3 text-center text-sm font-black text-white transition hover:brightness-105" style="background:' + p.color + '">Explore this path</a></div>';
        }).join("") + "</div></div></section>" +
      /* Testimonials */
      '<section class="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">' +
        U.sectionHead({ eyebrow: "6,000+ five-star reviews", color: "#FFC93C", title: 'Clinicians are <span class="squiggle-underline">raving</span>' }) +
        '<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">' + T.testimonials.map(function (t, i) {
          return '<figure class="reveal flex flex-col rounded-[2rem] border-2 border-[#2E2A3B]/10 bg-white p-6 shadow-sm" style="--d:' + (i % 3) * 0.08 + 's">' + U.stars(t.rating, 15) +
            '<blockquote class="mt-3 flex-1 text-[15px] font-medium leading-relaxed text-[#2E2A3B]">“' + esc(t.quote) + "”</blockquote>" +
            '<figcaption class="mt-5 flex items-center gap-3 border-t-2 border-dashed border-[#2E2A3B]/10 pt-4"><span class="font-display inline-flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold text-white" style="background:' + t.color + '">' + esc(t.name.split(" ").map(function (w) { return w[0]; }).join("")) + "</span>" +
            '<div><p class="text-sm font-black text-[#2E2A3B]">' + esc(t.name) + '</p><p class="text-xs font-bold text-[#5B5570]">' + esc(t.creds) + " · " + esc(t.course) + "</p></div></figcaption></figure>";
        }).join("") + "</div></section>" +
      /* Live events */
      '<section class="bg-[#0EA58C] py-16 text-white sm:py-20"><div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div class="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]"><div>' +
        '<span class="inline-block rounded-full bg-white/20 px-4 py-1.5 text-xs font-black uppercase tracking-[0.16em]">Live &amp; upcoming</span>' +
        '<h2 class="font-display mt-4 text-3xl font-semibold sm:text-4xl">Don\'t just watch — join us live.</h2>' +
        '<p class="mt-3 font-medium text-white/85">Free monthly workshops, journal clubs, and our flagship 6-week Immersion Cohort. Reserve your seat — free CEUs go fast.</p>' +
        '<img src="images/family-coaching.jpg" alt="Clinicians coaching a family" class="mt-6 hidden h-56 w-full rounded-[2rem] border-4 border-white/40 object-cover lg:block" loading="lazy"></div>' +
        '<div class="space-y-4">' + T.liveEvents.map(function (e, i) {
          return '<div class="rounded-[1.75rem] bg-white p-6 text-[#2E2A3B] shadow-xl"><div class="flex flex-wrap items-center gap-3"><span class="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-black text-white" style="background:' + e.color + '">' + icon("calendar-days", 13) + " " + esc(e.date) + '</span><span class="text-xs font-black text-[#E14E40]">' + e.seats + " seats left</span></div>" +
            '<h3 class="font-display mt-2 text-xl font-semibold">' + esc(e.title) + '</h3><p class="text-sm font-bold text-[#5B5570]">' + esc(e.time) + "</p>" +
            '<div id="ev-' + i + '"><form data-form="event-reg" data-index="' + i + '" class="mt-3 flex gap-2"><label for="ev-email-' + i + '" class="sr-only">Email for ' + esc(e.title) + '</label>' +
            '<input id="ev-email-' + i + '" name="email" type="email" required autocomplete="email" placeholder="you@clinic.com" class="w-full min-w-0 rounded-full border-2 border-[#2E2A3B]/12 bg-[#FFF9F1] px-4 py-2.5 text-sm font-bold focus:border-[#0EA58C] focus:outline-none">' +
            '<button class="shrink-0 rounded-full bg-[#2E2A3B] px-5 py-2.5 text-sm font-black text-white hover:bg-[#0EA58C]">Reserve free seat</button></form></div></div>';
        }).join("") + "</div></div></div></section>" +
      /* Instructors */
      '<section class="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">' +
        U.sectionHead({ eyebrow: "Learn from practitioners", color: "#3EA6FF", title: 'Instructors who still <span class="text-[#2B7FD4]">see clients</span>', blurb: "No talking heads reading slides. Our faculty run cases, coach families, and bring fresh session video to every course." }) +
        '<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">' + T.instructors.map(function (i, idx) {
          return '<div class="reveal rounded-[2rem] border-2 border-[#2E2A3B]/10 bg-white p-6 text-center" style="--d:' + idx * 0.07 + 's"><div class="mx-auto w-fit">' + U.avatar(i, "h-24 w-24 rounded-full border-4", "text-3xl font-semibold", "border-color:" + i.color) + "</div>" +
            '<p class="font-display mt-3 text-lg font-semibold text-[#2E2A3B]">' + esc(i.name) + '</p><p class="text-xs font-black" style="color:' + i.color + '">' + esc(i.creds) + '</p><p class="mt-2 text-xs font-bold text-[#5B5570]">' + U.num(i.learners) + " learners · ★ " + i.rating.toFixed(1) + "</p></div>";
        }).join("") + "</div>" +
        '<div class="reveal mt-8 text-center"><a href="instructors.html" class="inline-flex items-center gap-2 rounded-full border-[3px] border-[#2E2A3B] px-7 py-3 text-sm font-black text-[#2E2A3B] transition hover:bg-[#2E2A3B] hover:text-white">Meet the faculty ' + icon("arrow-right", 16, "", 3) + "</a></div></section>" +
      /* CTA */
      '<section class="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8"><div class="confetti-card rounded-[2.5rem] bg-[#FF6B5B] p-8 text-white sm:p-12"><div class="grid items-center gap-8 lg:grid-cols-2"><div>' +
        '<h2 class="font-display text-3xl font-semibold sm:text-4xl">Your next renewal cycle called — it wants to be joyful.</h2>' +
        '<p class="mt-3 font-medium text-white/90">Join 24,000+ clinicians earning BACB + ASHA CEUs the play-first way. Start with a free workshop or dive into a bestseller today.</p>' +
        '<div class="mt-6 flex flex-wrap gap-3"><a href="courses.html" class="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-black text-[#E14E40] shadow-lg transition hover:scale-[1.03]">Start earning CEUs ' + icon("arrow-right", 16, "", 3) + "</a>" +
        '<a href="faq.html" class="inline-flex items-center gap-2 rounded-full border-[3px] border-white px-7 py-3 text-sm font-black text-white transition hover:bg-white hover:text-[#E14E40]">Questions? Read FAQ</a></div></div>' +
        '<div class="space-y-3">' + T.faqs.slice(0, 3).map(function (f) {
          return '<div class="rounded-2xl bg-white/15 p-4 backdrop-blur"><p class="text-sm font-black">' + esc(f.q) + '</p><p class="mt-1 line-clamp-2 text-sm font-medium text-white/80">' + esc(f.a) + "</p></div>";
        }).join("") + "</div></div></div></section>";
  }

  document.getElementById("page").innerHTML = page();
  UI.bind(document.getElementById("featured"), function () {
    return featured.map(function (c, i) { return UI.courseCard(c, i, { animate: false }); }).join("");
  });
  Layout.observeReveals(document);

  Actions.on("event-reg", function (form) {
    var i = form.getAttribute("data-index"), ev = T.liveEvents[i], email = form.elements.email.value.trim();
    var btn = form.querySelector("button"); btn.disabled = true;
    Layout.submitEmail("event: " + ev.title, email).then(function () {
      document.getElementById("ev-" + i).innerHTML = '<p class="mt-3 flex items-center gap-2 rounded-2xl bg-[#D7F3E5] p-3 text-sm font-extrabold text-[#0B7C69]" role="status">' + icon("check", 16) + " You’re registered! Invite sent to " + esc(email) + ".</p>";
    }).catch(function (err) { btn.disabled = false; alert(err.message); });
  });
})();
