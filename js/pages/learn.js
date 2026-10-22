/* Course player, final CEU quiz and certificate: learn.html?slug=... (add #certificate to open the certificate) */
(function () {
  var T = window.TAA, S = window.store, U = window.UI, icon = window.icon, esc = U.esc;
  Layout.mount();

  var root = document.getElementById("page");
  var slug = new URLSearchParams(location.search).get("slug") || "";
  var course = T.courseBySlug(slug);

  if (!course) {
    root.innerHTML = '<div class="mx-auto max-w-3xl px-4 py-24 text-center"><p class="font-display text-3xl font-semibold">Course not found</p><a href="courses.html" class="mt-4 inline-block rounded-full bg-[#2E2A3B] px-6 py-3 text-sm font-black text-white">Back to catalog</a></div>';
    return;
  }
  document.title = course.title + " | Talk ABA";

  var inst = T.instructorOf(course.instructorId);
  var allLessons = [];
  course.modules.forEach(function (m) { m.lessons.forEach(function (l) { allLessons.push(Object.assign({}, l, { modTitle: m.title })); }); });
  var kindIcon = { video: "monitor-play", reading: "file-text", activity: "pen-line", quiz: "list-video" };

  /* ---- local UI state ---- */
  var v = { activeLesson: null, quizMode: false, answers: {}, result: null, submitting: false, showCert: location.hash === "#certificate", openMods: {}, note: "" };
  var NOTES_KEY = "taa_notes_" + course.id;
  function loadNotes() { try { return JSON.parse(localStorage.getItem(NOTES_KEY) || "{}"); } catch (e) { return {}; } }
  function saveNotes(n) { try { localStorage.setItem(NOTES_KEY, JSON.stringify(n)); } catch (e) { /* ignore */ } }

  var LESSON_TEXT = {
    "todays-aba-foundations": [
      "In Today's ABA, we never start with demands — we start with curiosity. Your first job is to learn what this person loves, hates, and needs from the people who know them best.",
      "Picture the opening conversation: no clipboards between you, no jargon. Just genuine questions — 'What makes them light up? What ruins their day? How do they tell you no?' — and deep listening.",
      "Your action step: before your next new client, prepare three open-ended questions that have nothing to do with deficits and everything to do with joy. Bring them to the family like gifts, not forms."
    ],
    "pfa-interview-informed": [
      "The open-ended interview is the most underrated skill in behavior analysis. Done well, families cry (happy tears) because someone finally asked the right questions.",
      "Listen for the synthesized story: it's rarely just escape or just access. It's the combination — demands + denied iPad + mom on the phone — that creates the storm.",
      "Practice today: take one current case and rewrite its 'function' as a synthesized contingency in plain family language. Notice how much more useful it becomes."
    ],
    "sbt-skills-based-treatment": [
      "The FCR must work every single time at first. Imagine finally finding your voice only to be ignored — that's what an unreliable FCR feels like to a learner.",
      "Progress is paced by performance, not calendars. Today's data decides tomorrow's challenge — and the learner's affect is the most important datum.",
      "Try this lens on your toughest case: if problem behavior returned, what is it telling you about your pacing? Adjust the challenge, not the child."
    ]
  };
  function lessonBody(l) {
    var paras = LESSON_TEXT[course.id] || [
      'Welcome to "' + l.title + '" with ' + inst.name + ". This " + l.kind + " walks you through one core skill with real session examples and a practice prompt you can use this week.",
      "The Talk ABA way: learn a concept in minutes, see it in action on video, then try a micro-practice before moving on. Small steps, big change.",
      "When you're done, mark the lesson complete and keep your streak going — your future certified self is cheering."
    ];
    return '<div class="mt-3 space-y-3">' + paras.map(function (p) { return '<p class="text-[15px] font-medium leading-relaxed text-[#5B5570]">' + esc(p) + "</p>"; }).join("") +
      '<div class="flex items-center gap-2 rounded-2xl bg-[#E4E0FF] p-3.5 text-sm font-extrabold text-[#5B4ED6]">' + icon("pen-line", 16) + " Practice prompt: write one sentence on how you'll use this idea within 48 hours.</div></div>";
  }

  var BTN_BACK = "inline-flex items-center gap-1.5 rounded-full bg-[#2E2A3B]/6 px-4 py-2 text-xs font-black text-[#2E2A3B] hover:bg-[#2E2A3B] hover:text-white";

  /* ---------- Certificate ---------- */
  function certificate(e, user) {
    var name = e.nameOnCert || (user && user.name) || "Learner", creds = (user && user.creds) || "";
    var date = new Date(e.certDate || Date.now()).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
    var evt = course.bacbEvent && course.bacbEvent.split("·")[1];
    return '<div class="print-full relative mx-auto w-full max-w-3xl overflow-hidden rounded-[2rem] border-8 border-double border-[#E0A81A] bg-white shadow-2xl">' +
      '<div class="dot-grid absolute inset-0 opacity-40"></div><div class="absolute left-0 top-0 h-28 w-28 rounded-br-[3rem] bg-[#FF6B5B]"></div><div class="absolute right-0 top-0 h-28 w-28 rounded-bl-[3rem] bg-[#0EA58C]"></div>' +
      '<div class="absolute bottom-0 left-0 h-24 w-24 rounded-tr-[2.5rem] bg-[#7C6FF0]"></div><div class="absolute bottom-0 right-0 h-24 w-24 rounded-tl-[2.5rem] bg-[#FFC93C]"></div>' +
      '<div class="relative px-8 py-10 text-center sm:px-14"><span class="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#2E2A3B] text-white">' + icon("graduation-cap", 30) + "</span>" +
      '<p class="mt-3 text-xs font-black uppercase tracking-[0.3em] text-[#5B5570]">Talk ABA · BACB ACE Provider OP-24-1107</p>' +
      '<h2 class="font-display mt-2 text-4xl font-semibold text-[#2E2A3B] sm:text-5xl">Certificate of Completion</h2>' +
      '<p class="mt-3 text-sm font-bold text-[#5B5570]">This certifies that</p><p class="font-display mt-1 text-3xl font-semibold text-[#E14E40] sm:text-4xl">' + esc(name) + (creds ? ", " + esc(creds) : "") + "</p>" +
      '<p class="mt-3 text-sm font-bold text-[#5B5570]">has successfully completed</p><p class="mx-auto mt-1 max-w-xl text-xl font-black leading-snug text-[#2E2A3B]">' + esc(course.title) + "</p>" +
      '<div class="mx-auto mt-5 flex max-w-md items-center justify-center gap-3"><span class="inline-flex items-center gap-1.5 rounded-full bg-[#2E2A3B] px-4 py-2 text-sm font-black text-white">' + icon("award", 15) + " " + course.ceus + " CEUs · " + esc(course.ceuTypes.join(" + ")) + "</span></div>" +
      '<div class="mx-auto mt-6 grid max-w-xl grid-cols-3 gap-4 border-t-2 border-dashed border-[#2E2A3B]/15 pt-6 text-left">' +
        '<div><p class="text-[10px] font-black uppercase tracking-widest text-[#5B5570]">Date</p><p class="text-sm font-black text-[#2E2A3B]">' + date + "</p></div>" +
        '<div><p class="text-[10px] font-black uppercase tracking-widest text-[#5B5570]">Verification ID</p><p class="text-sm font-black text-[#2E2A3B]">' + esc(e.certId) + "</p></div>" +
        '<div><p class="text-[10px] font-black uppercase tracking-widest text-[#5B5570]">' + esc(evt ? evt.trim() : "BACB Event") + '</p><p class="text-sm font-black text-[#2E2A3B]">Score ≥ 80%</p></div></div>' +
      '<div class="mx-auto mt-4 flex max-w-xl items-end justify-between"><div class="text-left"><p class="font-display text-lg italic text-[#2E2A3B]">Maya Ross</p><p class="text-[10px] font-black uppercase tracking-widest text-[#5B5570]">Director, Talk ABA</p></div>' +
      '<span class="inline-flex items-center gap-1.5 rounded-full bg-[#0EA58C]/10 px-3 py-1.5 text-xs font-black text-[#0B7C69]">' + icon("badge-check", 14) + ' Verified CEUs</span><div class="text-right"><p class="font-display text-lg italic text-[#2E2A3B]">D. Okafor</p><p class="text-[10px] font-black uppercase tracking-widest text-[#5B5570]">ACE Coordinator</p></div></div></div></div>';
  }

  /* ---------- Views ---------- */
  function locked() {
    return '<div class="mx-auto max-w-2xl px-4 py-20 text-center"><span class="inline-flex h-20 w-20 items-center justify-center rounded-full bg-[#FFE3DC]">' + icon("lock", 30, "text-[#E14E40]") + "</span>" +
      '<h1 class="font-display mt-5 text-3xl font-semibold text-[#2E2A3B]">You\'re previewing ' + esc(course.title) + '</h1><p class="mt-2 font-medium text-[#5B5570]">Enroll to unlock all lessons, track progress, take the CEU quiz, and earn your instant certificate.</p>' +
      '<div class="mt-6 flex flex-wrap justify-center gap-3"><button data-act="enroll-here" class="rounded-full bg-[#FF6B5B] px-7 py-3.5 text-sm font-black text-white shadow-[0_5px_0_#E14E40]">Enroll now — ' + U.money(course.price) + '</button><a href="' + U.courseUrl(course) + '" class="rounded-full border-[3px] border-[#2E2A3B] px-7 py-3 text-sm font-black text-[#2E2A3B]">View details</a></div></div>';
  }

  function certView(e, user) {
    var origin = location.host ? location.host + location.pathname.replace(/[^/]*$/, "") : "talkaba.academy/";
    return '<div class="mx-auto max-w-4xl px-4 py-10 sm:px-6"><div class="print-hidden mb-6 flex flex-wrap items-center justify-between gap-3"><button data-act="cert-close" class="' + BTN_BACK + '">' + icon("arrow-left", 14) + " Back to course</button>" +
      '<div class="flex gap-2"><button data-act="print" class="inline-flex items-center gap-1.5 rounded-full bg-[#2E2A3B] px-5 py-2.5 text-xs font-black text-white hover:bg-[#FF6B5B]">' + icon("printer", 14) + ' Print / Save PDF</button><a href="dashboard.html" class="inline-flex items-center gap-1.5 rounded-full bg-[#0EA58C] px-5 py-2.5 text-xs font-black text-white hover:bg-[#0B7C69]">' + icon("download", 14) + " My transcript</a></div></div>" +
      '<div class="animate-rise-in">' + certificate(e, user) + '</div><p class="print-hidden mt-6 text-center text-sm font-bold text-[#5B5570]">Verification ID <span class="font-black text-[#2E2A3B]">' + esc(e.certId) + "</span> · Verify anytime at " + esc(origin) + "verify.html</p></div>";
  }

  function quizView(e) {
    var n = course.quiz.length, answered = Object.keys(v.answers).length, res = v.result;
    var head = '<button data-act="quiz-close" class="' + BTN_BACK + '">' + icon("arrow-left", 14) + " Back to lessons</button>" +
      '<div class="mt-4 overflow-hidden rounded-[2rem] bg-[#2E2A3B] p-6 text-white sm:p-8"><p class="text-xs font-black uppercase tracking-[0.2em] text-[#FFC93C]">Final CEU Quiz · ' + esc(course.title) + '</p>' +
      '<h1 class="font-display mt-2 text-3xl font-semibold">Show what you know — earn ' + course.ceus + ' CEUs</h1><p class="mt-2 text-sm font-medium text-white/70">Pass at 80% or higher · Unlimited free retakes · Every answer explained</p>' +
      (!res ? '<div class="mt-4 h-3 overflow-hidden rounded-full bg-white/15" role="progressbar" aria-valuemin="0" aria-valuemax="' + n + '" aria-valuenow="' + answered + '"><div class="h-full rounded-full bg-[#FFC93C] transition-all" style="width:' + (answered / n) * 100 + '%"></div></div>' : "") + "</div>";
    var banner = "";
    if (res) {
      banner = res.score >= 80
        ? '<div class="animate-pop-in mt-6 rounded-[2rem] bg-[#D7F3E5] p-6 text-center sm:p-8" role="status">' + icon("party-popper", 40, "mx-auto text-[#0B7C69]") + '<h2 class="font-display mt-2 text-3xl font-semibold text-[#0B7C69]">You passed with ' + res.score + '%! 🎉</h2>' +
          '<p class="mt-1 font-bold text-[#0B7C69]/80">' + course.ceus + " CEUs (" + esc(course.ceuTypes.join(" + ")) + ') added to your transcript.</p><div class="mt-4 flex flex-wrap justify-center gap-2.5">' +
          '<button data-act="cert-open" class="inline-flex items-center gap-2 rounded-full bg-[#0EA58C] px-6 py-3 text-sm font-black text-white shadow-[0_4px_0_#0B7C69]">' + icon("award", 16) + ' View my certificate</button><a href="dashboard.html" class="rounded-full border-[3px] border-[#0B7C69] px-6 py-2.5 text-sm font-black text-[#0B7C69]">Go to dashboard</a></div></div>'
        : '<div class="animate-pop-in mt-6 rounded-[2rem] bg-[#FFE3DC] p-6 text-center sm:p-8" role="status">' + icon("rotate-ccw", 36, "mx-auto text-[#E14E40]") + '<h2 class="font-display mt-2 text-3xl font-semibold text-[#E14E40]">' + res.score + '% — so close!</h2>' +
          '<p class="mt-1 font-bold text-[#E14E40]/80">You need 80% to pass. Review the explanations below and retake free — you\'ve got this.</p><button data-act="quiz-start" class="mt-4 rounded-full bg-[#E14E40] px-6 py-3 text-sm font-black text-white shadow-[0_4px_0_#B23A30]">Retake quiz</button></div>';
    }
    var qs = course.quiz.map(function (q, qi) {
      var picked = v.answers[qi], r = res && res.review[qi];
      var opts = q.options.map(function (op, oi) {
        var isAns = r && r.answer === oi, isPick = picked === oi, cls = "border-[#2E2A3B]/12 bg-[#FFF9F1] hover:border-[#7C6FF0]";
        if (res && isAns) cls = "border-[#0EA58C] bg-[#D7F3E5]"; else if (res && isPick && !isAns) cls = "border-[#E14E40] bg-[#FFE3DC]"; else if (!res && isPick) cls = "border-[#7C6FF0] bg-[#E4E0FF]";
        var dot = res && isAns ? "border-[#0EA58C] bg-[#0EA58C] text-white" : isPick ? "border-current" : "border-[#2E2A3B]/20";
        var mark = res && isAns ? icon("check", 12, "", 4) : res && isPick ? icon("x", 12, "", 4) : String.fromCharCode(65 + oi);
        return '<button ' + (res ? "disabled " : "") + 'data-act="answer" data-q="' + qi + '" data-o="' + oi + '" data-fk="q' + qi + "o" + oi + '" aria-pressed="' + isPick + '" class="flex w-full items-center gap-3 rounded-2xl border-2 p-3.5 text-left text-sm font-bold text-[#2E2A3B] transition ' + cls + '"><span class="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 text-[11px] font-black ' + dot + '">' + mark + "</span>" + esc(op) + "</button>";
      }).join("");
      var why = r ? '<div class="mt-3 rounded-2xl p-4 text-sm font-semibold ' + (r.correct ? "bg-[#D7F3E5] text-[#0B7C69]" : "bg-[#FFF0C4] text-[#7A5B00]") + '"><span class="font-black">' + (r.correct ? "✓ Correct! " : "✎ Let's learn: ") + "</span>" + esc(r.explain) + "</div>" : "";
      return '<div class="rounded-[1.75rem] border-2 border-[#2E2A3B]/10 bg-white p-5 sm:p-6"><p class="font-black text-[#2E2A3B]"><span class="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#2E2A3B] text-xs text-white">' + (qi + 1) + "</span>" + esc(q.q) + '</p><div class="mt-3 space-y-2">' + opts + "</div>" + why + "</div>";
    }).join("");
    var submit = res ? "" : '<button ' + (answered < n || v.submitting ? "disabled " : "") + 'data-act="quiz-submit" class="mt-6 w-full rounded-full bg-[#7C6FF0] px-6 py-4 text-base font-black text-white shadow-[0_5px_0_#5B4ED6] transition enabled:hover:brightness-105 disabled:opacity-40">' + (v.submitting ? "Grading…" : "Submit quiz (" + answered + "/" + n + " answered)") + "</button>";
    return '<div class="mx-auto max-w-3xl px-4 py-10 sm:px-6">' + head + banner + '<div class="mt-6 space-y-5">' + qs + "</div>" + submit + "</div>";
  }

  function playerView(e, user) {
    var progress = S.courseProgress(course.id, e), doneCount = allLessons.filter(function (l) { return e.progress[l.id]; }).length;
    var current = allLessons.filter(function (l) { return l.id === v.activeLesson; })[0] || null;
    var modules = course.modules.map(function (m, mi) {
      var open = v.openMods[m.id] != null ? v.openMods[m.id] : mi === 0;
      var done = m.lessons.filter(function (l) { return e.progress[l.id]; }).length;
      var rows = m.lessons.map(function (l) {
        var d = e.progress[l.id], active = v.activeLesson === l.id;
        return '<li class="flex items-center gap-1 pl-4 transition ' + (active ? "bg-[#E4E0FF]/60" : "hover:bg-[#FFF9F1]") + '">' +
          '<button data-act="toggle-lesson" data-l="' + l.id + '" data-fk="chk-' + l.id + '" role="checkbox" aria-checked="' + Boolean(d) + '" aria-label="Mark “' + esc(l.title) + '” complete" class="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-[2.5px] transition ' + (d ? "border-[#0EA58C] bg-[#0EA58C] text-white" : "border-[#2E2A3B]/20 text-transparent hover:border-[#0EA58C]") + '">' + icon("check", 14, "", 4) + "</button>" +
          '<button data-act="open-lesson" data-l="' + l.id + '" data-fk="les-' + l.id + '" class="flex min-w-0 flex-1 items-center gap-3 py-3.5 pl-2 pr-4 text-left">' + icon(kindIcon[l.kind] || "list-video", 17, "shrink-0 text-[#5B5570]") +
          '<span class="min-w-0 flex-1"><span class="block text-sm font-extrabold ' + (d ? "text-[#5B5570] line-through decoration-2" : "text-[#2E2A3B]") + '">' + esc(l.title) + '</span><span class="block text-xs font-bold capitalize text-[#5B5570]">' + l.kind + " · " + l.minutes + " min</span></span>" +
          (l.kind === "quiz" ? '<span class="rounded-full bg-[#7C6FF0] px-3 py-1 text-[11px] font-black text-white">QUIZ</span>' : active ? '<span class="rounded-full bg-[#2E2A3B] px-3 py-1 text-[11px] font-black text-white">NOW</span>' : "") + "</button></li>";
      }).join("");
      return '<div class="overflow-hidden rounded-3xl border-2 border-[#2E2A3B]/10 bg-white"><button data-act="toggle-mod" data-m="' + m.id + '" aria-expanded="' + open + '" class="flex w-full items-center gap-3 p-4 text-left" style="background:' + course.soft + '"><span class="font-display inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white" style="background:' + course.color + '">' + (mi + 1) + "</span>" +
        '<span class="flex-1"><span class="block text-sm font-black text-[#2E2A3B]">' + esc(m.title) + '</span><span class="block text-xs font-bold text-[#5B5570]">' + done + "/" + m.lessons.length + ' complete</span></span><span class="chev transition ' + (open ? "rotate-180" : "") + '">' + icon("chevron-down", 18) + "</span></button>" +
        '<div class="acc ' + (open ? "open" : "") + '"><div class="acc-inner"><ul class="divide-y divide-[#2E2A3B]/6">' + rows + "</ul></div></div></div>";
    }).join("");

    var notes = loadNotes(), my = (current && notes[current.id]) || [];
    var right;
    if (!current) {
      right = '<div class="animate-rise-in mt-3 overflow-hidden rounded-[2rem] border-2 border-[#2E2A3B]/10 bg-white"><img src="' + course.image + '" alt="" class="h-64 w-full object-cover"><div class="p-6"><h3 class="font-display text-2xl font-semibold text-[#2E2A3B]">Let\'s learn the play-first way 🎈</h3>' +
        '<p class="mt-2 text-sm font-medium leading-relaxed text-[#5B5570]">Pick any lesson on the left to begin. Each lesson simulates real Talk ABA content — video walkthroughs, readings, and practice activities. Mark lessons complete as you go, then take the final quiz to earn your <strong>' + course.ceus + ' CEUs</strong>.</p>' +
        '<button data-act="resume" class="mt-4 rounded-full bg-[#2E2A3B] px-6 py-3 text-sm font-black text-white hover:bg-[#FF6B5B]">' + (doneCount > 0 ? "Resume where I left off" : "Start lesson 1") + "</button></div></div>";
    } else {
      right = '<div class="animate-rise-in mt-3 overflow-hidden rounded-[2rem] border-2 border-[#2E2A3B]/10 bg-white"><div class="relative"><img src="' + course.image + '" alt="" class="h-60 w-full object-cover"><div class="absolute inset-0 flex items-center justify-center bg-[#2E2A3B]/45"><span class="flex flex-col items-center gap-2 text-white"><span class="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#2E2A3B] shadow-xl">' + icon("monitor-play", 26) + '</span><span class="rounded-full bg-black/50 px-3 py-1 text-xs font-black">' + current.kind.toUpperCase() + " · " + current.minutes + " MIN</span></span></div></div>" +
        '<div class="p-6"><h3 class="font-display text-2xl font-semibold text-[#2E2A3B]">' + esc(current.title) + "</h3>" + lessonBody(current) +
        '<div class="mt-5"><label for="note" class="text-xs font-black uppercase tracking-widest text-[#5B5570]">My notes (saved to this device)</label><div class="mt-2 flex gap-2"><input id="note" value="' + esc(v.note) + '" placeholder="Jot a takeaway…" class="w-full rounded-2xl border-2 border-[#2E2A3B]/12 bg-[#FFF9F1] px-4 py-2.5 text-sm font-bold focus:border-[#7C6FF0] focus:outline-none"><button data-act="note-save" class="shrink-0 rounded-full bg-[#2E2A3B] px-5 py-2.5 text-xs font-black text-white hover:bg-[#7C6FF0]">Save</button></div>' +
        (my.length ? '<ul class="mt-2 space-y-1.5">' + my.map(function (n) { return '<li class="rounded-xl bg-[#FFF0C4] p-2.5 text-xs font-bold text-[#7A5B00]">✎ ' + esc(n) + "</li>"; }).join("") + "</ul>" : "") + "</div>" +
        '<div class="mt-5 flex flex-wrap gap-2.5 border-t-2 border-dashed border-[#2E2A3B]/10 pt-5"><button data-act="lesson-next" class="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#0EA58C] px-6 py-3 text-sm font-black text-white hover:bg-[#0B7C69]">' + icon("check", 16, "", 3) + " " + (e.progress[current.id] ? "Next lesson" : "Mark complete & continue") + "</button>" +
        (current.kind === "quiz" ? '<button data-act="quiz-start" class="inline-flex items-center gap-2 rounded-full bg-[#7C6FF0] px-6 py-3 text-sm font-black text-white hover:brightness-105">' + icon("list-video", 16) + " Open final quiz</button>" : "") + "</div></div></div>";
    }

    return '<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"><div class="flex flex-wrap items-center justify-between gap-3"><a href="dashboard.html" class="' + BTN_BACK + '">' + icon("arrow-left", 14) + " Dashboard</a>" +
      (e.quizPassed && e.certId ? '<button data-act="cert-open" class="inline-flex items-center gap-1.5 rounded-full bg-[#0EA58C] px-5 py-2.5 text-xs font-black text-white hover:bg-[#0B7C69]">' + icon("award", 14) + " View certificate</button>" : "") + "</div>" +
      '<div class="mt-4 overflow-hidden rounded-[2rem] p-6 text-white sm:p-8" style="background:linear-gradient(135deg,#2E2A3B,' + course.color + '88)"><p class="text-xs font-black uppercase tracking-[0.2em] text-white/60">' + esc(course.category) + " · with " + esc(inst.name) + "</p>" +
      '<h1 class="font-display mt-1 text-2xl font-semibold sm:text-3xl">' + esc(course.title) + '</h1><div class="mt-4 flex flex-wrap items-center gap-4"><div class="h-3 min-w-[180px] flex-1 overflow-hidden rounded-full bg-white/15" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + progress + '"><div class="h-full rounded-full bg-gradient-to-r from-[#FFC93C] to-[#FF6B5B] transition-all" style="width:' + progress + '%"></div></div>' +
      '<span class="text-sm font-black">' + progress + "% · " + doneCount + "/" + allLessons.length + " lessons</span>" + (e.quizBest != null ? '<span class="rounded-full px-3 py-1 text-xs font-black ' + (e.quizPassed ? "bg-[#0EA58C]" : "bg-white/20") + '">Best quiz: ' + e.quizBest + "%</span>" : "") + "</div></div>" +
      '<div class="mt-6 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]"><div class="space-y-4"><h2 class="font-display text-xl font-semibold text-[#2E2A3B]">Course player</h2>' + modules +
      '<button data-act="quiz-start" class="font-display flex w-full items-center justify-center gap-2 rounded-[1.75rem] bg-[#7C6FF0] px-6 py-5 text-lg font-semibold text-white shadow-[0_6px_0_#5B4ED6] transition hover:brightness-105">' + (e.quizPassed ? "Retake final quiz" : "Take the final CEU quiz") + " " + icon("arrow-right", 19) + "</button>" +
      '<p class="text-center text-xs font-bold text-[#5B5570]">80% to pass · Unlimited retakes · Instant certificate</p></div>' +
      '<div><h2 class="font-display text-xl font-semibold text-[#2E2A3B]">' + (current ? esc(current.modTitle) : "Welcome to your course") + "</h2>" + right + "</div></div></div>";
  }

  /* ---------- Render (keeps keyboard focus across re-renders) ---------- */
  function render() {
    var st = S.state, e = st.enrollments[course.id];
    var fk = document.activeElement && document.activeElement.getAttribute && document.activeElement.getAttribute("data-fk");
    var noteFocus = document.activeElement && document.activeElement.id === "note";
    var html;
    if (!e) html = locked();
    else if (v.showCert && e.certId) html = certView(e, st.user);
    else if (v.quizMode) html = quizView(e);
    else html = playerView(e, st.user);
    root.innerHTML = html;
    Layout.observeReveals(root);
    if (fk) { var t = root.querySelector('[data-fk="' + fk + '"]'); if (t) t.focus({ preventScroll: true }); }
    else if (noteFocus) { var n = document.getElementById("note"); if (n) n.focus(); }
  }
  S.subscribe(render);
  render();

  function top() { window.scrollTo({ top: 0, behavior: "smooth" }); }
  function gradeLocal() {
    var correct = 0, review = course.quiz.map(function (q, i) {
      var ok = v.answers[i] === q.answer; if (ok) correct++;
      return { correct: ok, answer: q.answer, explain: q.explain };
    });
    return { score: Math.round((correct / course.quiz.length) * 100), review: review, certId: null };
  }
  function submitQuiz() {
    var user = S.state.user, name = (user && user.name) || "Learner";
    v.submitting = true; render();
    var answers = course.quiz.map(function (q, i) { return v.answers[i]; });
    api.available().then(function (ok) {
      if (!ok) return gradeLocal();
      return api.post("quiz.php", { courseId: course.id, answers: answers, name: name, email: user && user.email, creds: user && user.creds })
        .then(function (r) { if (r.status === 200 && r.body && r.body.review) return r.body; throw new Error((r.body && r.body.error) || "grading failed"); })
        .catch(function () { return gradeLocal(); }); /* server hiccup: fall back to in-browser grading */
    }).then(function (res) {
      v.submitting = false; v.result = res;
      S.recordQuiz(course.id, res.score, name, res.certId); /* emits -> render */
      top();
    });
  }

  Actions.many({
    "enroll-here": function () { if (!S.state.user) { S.openAuth(); return; } S.enroll([course.id]); },
    "toggle-lesson": function (el) { S.toggleLesson(course.id, el.getAttribute("data-l")); },
    "open-lesson": function (el) { v.activeLesson = el.getAttribute("data-l"); render(); },
    "toggle-mod": function (el) {
      var id = el.getAttribute("data-m"), panel = el.nextElementSibling, open = !panel.classList.contains("open");
      v.openMods[id] = open; panel.classList.toggle("open", open); el.setAttribute("aria-expanded", String(open));
      el.querySelector(".chev").classList.toggle("rotate-180", open);
    },
    "resume": function () {
      var e = S.state.enrollments[course.id];
      var first = allLessons.filter(function (l) { return !e.progress[l.id]; })[0] || allLessons[0];
      v.activeLesson = first.id; render();
    },
    "lesson-next": function () {
      var e = S.state.enrollments[course.id], id = v.activeLesson;
      var idx = allLessons.map(function (l) { return l.id; }).indexOf(id), next = allLessons[idx + 1];
      if (next) v.activeLesson = next.id;
      v.note = "";
      if (!e.progress[id]) S.toggleLesson(course.id, id); else render();
      if (next) top();
    },
    "note-save": function () {
      var input = document.getElementById("note"), text = input.value.trim(); if (!text || !v.activeLesson) return;
      var n = loadNotes(); (n[v.activeLesson] = n[v.activeLesson] || []).push(text); saveNotes(n); v.note = ""; render();
    },
    "quiz-start": function () { v.quizMode = true; v.answers = {}; v.result = null; v.submitting = false; render(); top(); },
    "quiz-close": function () { v.quizMode = false; v.result = null; render(); },
    "answer": function (el) { if (v.result) return; v.answers[el.getAttribute("data-q")] = Number(el.getAttribute("data-o")); render(); },
    "quiz-submit": submitQuiz,
    "cert-open": function () { v.showCert = true; render(); top(); },
    "cert-close": function () { v.showCert = false; v.quizMode = false; v.result = null; if (location.hash) history.replaceState(null, "", location.pathname + location.search); render(); },
    "print": function () { window.print(); }
  });
  root.addEventListener("input", function (e) { if (e.target.id === "note") v.note = e.target.value; });
})();
