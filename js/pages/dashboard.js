/* Learner dashboard */
(function () {
  var T = window.TAA, S = window.store, U = window.UI, icon = window.icon, esc = U.esc;
  Layout.mount();
  var ETHICS_REQ = 4, SUP_REQ = 4;
  var root = document.getElementById("page");

  function course(id) { return T.courses.filter(function (c) { return c.id === id; })[0]; }
  function sumCeus(list, type) {
    var s = 0; list.forEach(function (e) { var c = course(e.courseId); if (c && c.ceuTypes.indexOf(type) > -1) s += c.ceus; });
    return Math.round(s * 100) / 100;
  }

  function view() {
    var st = S.state, user = st.user;
    if (!user) {
      return '<div class="mx-auto max-w-2xl px-4 py-20 text-center"><span class="inline-flex h-20 w-20 items-center justify-center rounded-full bg-[#E4E0FF]">' + icon("book-open", 30, "text-[#5B4ED6]") + "</span>" +
        '<h1 class="font-display mt-5 text-3xl font-semibold text-[#2E2A3B]">Your CEU dashboard awaits</h1><p class="mt-2 font-medium text-[#5B5570]">Sign in to track progress, store certificates, and watch your CEU totals grow.</p>' +
        '<button data-act="open-auth" class="mt-6 rounded-full bg-[#7C6FF0] px-8 py-3.5 text-sm font-black text-white shadow-[0_5px_0_#5B4ED6]">Sign in / Create free account</button></div>';
    }
    var enrolled = Object.keys(st.enrollments).map(function (k) { return st.enrollments[k]; }).filter(function (e) { return course(e.courseId); });
    var completed = enrolled.filter(function (e) { return e.quizPassed; });
    var inProgress = enrolled.filter(function (e) { return !e.quizPassed; });
    var ethics = sumCeus(completed, "BACB Ethics"), sup = sumCeus(completed, "BACB Supervision");
    var wished = st.wishlist.map(course).filter(Boolean);
    var nextUp = inProgress.map(function (e) { return { e: e, c: course(e.courseId) }; }).sort(function (a, b) { return S.courseProgress(b.c.id, b.e) - S.courseProgress(a.c.id, a.e); })[0];

    var rows = enrolled.length === 0
      ? '<div class="mt-4 rounded-[2rem] border-2 border-dashed border-[#2E2A3B]/20 bg-white p-10 text-center">' + icon("sparkles", 32, "mx-auto text-[#FFC93C]") + '<p class="font-display mt-3 text-xl font-semibold text-[#2E2A3B]">No enrollments yet — let\'s change that!</p><a href="courses.html" class="mt-4 inline-block rounded-full bg-[#2E2A3B] px-6 py-3 text-sm font-black text-white">Browse the catalog</a></div>'
      : '<div class="mt-4 space-y-4">' + enrolled.map(function (e) {
          var c = course(e.courseId), p = S.courseProgress(c.id, e), inst = T.instructorOf(c.instructorId);
          return '<div class="animate-rise-in flex flex-col gap-4 rounded-[1.75rem] border-2 border-[#2E2A3B]/10 bg-white p-4 sm:flex-row sm:p-5"><img src="' + c.image + '" alt="" class="h-36 w-full rounded-2xl object-cover sm:h-32 sm:w-44 sm:shrink-0"><div class="min-w-0 flex-1">' +
            '<div class="flex flex-wrap items-center gap-2"><span class="rounded-full px-2.5 py-1 text-[11px] font-black text-white" style="background:' + c.color + '">' + c.ceus + " CEUs</span>" +
            (e.quizPassed ? '<span class="inline-flex items-center gap-1 rounded-full bg-[#D7F3E5] px-2.5 py-1 text-[11px] font-black text-[#0B7C69]">' + icon("check", 12, "", 4) + " COMPLETED</span>" : '<span class="rounded-full bg-[#FFF0C4] px-2.5 py-1 text-[11px] font-black text-[#7A5B00]">' + p + "% COMPLETE</span>") + "</div>" +
            '<p class="mt-1.5 truncate font-black text-[#2E2A3B]">' + esc(c.title) + '</p><p class="text-xs font-bold text-[#5B5570]">' + esc(inst.name) + " · " + (e.quizBest != null ? "Best quiz " + e.quizBest + "%" : "Quiz not taken yet") + "</p>" +
            '<div class="mt-2 h-2.5 overflow-hidden rounded-full bg-[#2E2A3B]/8" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + (e.quizPassed ? 100 : p) + '"><div class="h-full rounded-full transition-all" style="width:' + (e.quizPassed ? 100 : p) + "%;background:" + U.accent(c.color) + '"></div></div>' +
            '<div class="mt-3 flex flex-wrap gap-2"><a href="' + U.learnUrl(c) + '" class="inline-flex items-center gap-1.5 rounded-full bg-[#2E2A3B] px-4 py-2 text-xs font-black text-white hover:bg-[#FF6B5B]">' + icon("play", 13) + " " + (e.quizPassed ? "Review course" : "Continue") + "</a>" +
            (e.quizPassed && e.certId ? '<a href="' + U.learnUrl(c) + '#certificate" class="inline-flex items-center gap-1.5 rounded-full bg-[#0EA58C] px-4 py-2 text-xs font-black text-white hover:bg-[#0B7C69]">' + icon("award", 13) + " Certificate</a>" : "") + "</div></div></div>";
        }).join("") + "</div>";

    var certs = completed.length === 0
      ? '<p class="mt-2 text-sm font-medium text-white/60">Pass a final quiz at 80%+ and your verifiable certificate lands here instantly.</p>'
      : '<ul class="mt-4 space-y-3">' + completed.map(function (e) {
          var c = course(e.courseId);
          return '<li class="rounded-2xl bg-white/10 p-3.5"><p class="line-clamp-1 text-sm font-black">' + esc(c.title) + '</p><p class="mt-0.5 text-xs font-bold text-white/60">' + c.ceus + " CEUs · ID " + esc(e.certId) + '</p><div class="mt-2 flex gap-2"><a href="' + U.learnUrl(c) + '#certificate" class="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-[11px] font-black text-[#2E2A3B]">' + icon("printer", 11) + " View / Print</a></div></li>";
        }).join("") + "</ul>";

    var wish = wished.length === 0
      ? '<p class="mt-2 text-sm font-medium text-[#5B5570]">Tap the heart on any course to save it here.</p>'
      : '<ul class="mt-4 space-y-3">' + wished.map(function (c) {
          return '<li class="flex items-center gap-3"><img src="' + c.image + '" alt="" class="h-12 w-12 rounded-xl object-cover"><div class="min-w-0 flex-1"><p class="truncate text-sm font-black text-[#2E2A3B]">' + esc(c.title) + '</p><p class="flex items-center gap-1 text-xs font-bold text-[#5B5570]">' + U.money(c.price) + " · " + c.ceus + " CEUs · " + U.stars(c.rating, 11) + "</p></div>" +
            '<a href="' + U.courseUrl(c) + '" class="shrink-0 rounded-full bg-[#2E2A3B] px-3 py-1.5 text-[11px] font-black text-white">View</a><button data-act="toggle-wish" data-id="' + c.id + '" aria-label="Remove ' + esc(c.title) + ' from wishlist" class="text-[#E14E40]">' + icon("trash-2", 15) + "</button></li>";
        }).join("") + "</ul>";

    return '<div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"><div class="flex flex-wrap items-end justify-between gap-4"><div><p class="text-xs font-black uppercase tracking-[0.2em] text-[#5B5570]">Welcome back, ' + esc(user.name.split(" ")[0]) + '! 🎈</p><h1 class="font-display mt-1 text-4xl font-semibold text-[#2E2A3B]">My Learning Dashboard</h1></div>' +
      '<a href="courses.html" class="rounded-full bg-[#FF6B5B] px-6 py-3 text-sm font-black text-white shadow-[0_4px_0_#E14E40]">+ Earn more CEUs</a></div>' +
      '<div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">' +
        '<div class="confetti-card rounded-[1.75rem] bg-[#2E2A3B] p-6 text-white"><p class="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-white/60">' + icon("trophy", 14, "text-[#FFC93C]") + ' Total CEUs earned</p><p class="font-display mt-1 text-5xl font-semibold">' + S.totalCeus() + '</p><p class="mt-1 text-xs font-bold text-white/60">' + completed.length + " course" + (completed.length === 1 ? "" : "s") + " completed</p></div>" +
        '<div class="rounded-[1.75rem] border-2 border-[#2E2A3B]/10 bg-white p-6"><p class="text-xs font-black uppercase tracking-widest text-[#5B5570]">Ethics CEUs (need ' + ETHICS_REQ + ')</p><p class="font-display mt-1 text-4xl font-semibold text-[#0B7C69]">' + ethics + '<span class="text-lg text-[#5B5570]">/' + ETHICS_REQ + '</span></p><div class="mt-2 h-2.5 overflow-hidden rounded-full bg-[#2E2A3B]/8"><div class="h-full rounded-full bg-[#0EA58C]" style="width:' + Math.min(100, (ethics / ETHICS_REQ) * 100) + '%"></div></div>' + (ethics < ETHICS_REQ ? '<a href="course.html?slug=assent-dignity-ethics" class="mt-2 inline-block text-xs font-black text-[#0B7C69] hover:underline">Get Ethics CEUs →</a>' : "") + "</div>" +
        '<div class="rounded-[1.75rem] border-2 border-[#2E2A3B]/10 bg-white p-6"><p class="text-xs font-black uppercase tracking-widest text-[#5B5570]">Supervision CEUs (need ' + SUP_REQ + ')</p><p class="font-display mt-1 text-4xl font-semibold text-[#5B4ED6]">' + sup + '<span class="text-lg text-[#5B5570]">/' + SUP_REQ + '</span></p><div class="mt-2 h-2.5 overflow-hidden rounded-full bg-[#2E2A3B]/8"><div class="h-full rounded-full bg-[#7C6FF0]" style="width:' + Math.min(100, (sup / SUP_REQ) * 100) + '%"></div></div>' + (sup < SUP_REQ ? '<a href="course.html?slug=supervising-with-heart" class="mt-2 inline-block text-xs font-black text-[#5B4ED6] hover:underline">Get Supervision CEUs →</a>' : "") + "</div>" +
        '<div class="rounded-[1.75rem] border-2 border-[#2E2A3B]/10 bg-white p-6"><p class="text-xs font-black uppercase tracking-widest text-[#5B5570]">In progress</p><p class="font-display mt-1 text-4xl font-semibold text-[#E14E40]">' + inProgress.length + '</p><p class="mt-1 text-xs font-bold text-[#5B5570]">' + enrolled.length + " total enrollments</p>" + (nextUp ? '<a href="' + U.learnUrl(nextUp.c) + '" class="mt-2 inline-block text-xs font-black text-[#E14E40] hover:underline">Resume ' + esc(nextUp.c.title.slice(0, 28)) + "… →</a>" : "") + "</div></div>" +
      '<div class="mt-8 grid gap-8 lg:grid-cols-[1.3fr_0.7fr]"><div><h2 class="font-display text-2xl font-semibold text-[#2E2A3B]">Continue learning</h2>' + rows + "</div>" +
      '<div class="space-y-6"><div id="certificates" class="scroll-mt-28 rounded-[2rem] bg-[#2E2A3B] p-6 text-white"><h3 class="font-display flex items-center gap-2 text-xl font-semibold">' + icon("award", 20, "text-[#FFC93C]") + " My certificates</h3>" + certs +
        '<button data-act="print" class="mt-4 flex w-full items-center justify-center gap-2 rounded-full border-2 border-white/20 px-4 py-2.5 text-xs font-black text-white/80 hover:bg-white/10">' + icon("download", 14) + " Print full transcript</button></div>" +
      '<div class="rounded-[2rem] border-2 border-[#2E2A3B]/10 bg-white p-6"><h3 class="font-display flex items-center gap-2 text-xl font-semibold text-[#2E2A3B]">' + icon("heart", 19, "text-[#FF6B5B]") + " Wishlist (" + wished.length + ")</h3>" + wish + "</div></div></div></div>";
  }

  UI.bind(root, view);
  Actions.on("print", function () { window.print(); });
})();
