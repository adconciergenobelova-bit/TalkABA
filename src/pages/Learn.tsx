import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Award, Check, ChevronDown, Download, FileText, ListVideo, Lock, MonitorPlay, PartyPopper, PenLine, Printer, RotateCcw, X } from "lucide-react";
import { courseBySlug, instructorOf } from "../lib/data";
import { courseProgress, useStore } from "../lib/store";
import { Certificate } from "../components/certificate";

const kindIcon = (k: string) => (k === "video" ? MonitorPlay : k === "reading" ? FileText : k === "activity" ? PenLine : ListVideo);

export default function Learn() {
  const { slug } = useParams();
  const nav = useNavigate();
  const course = courseBySlug(slug ?? "");
  const { enrollments, toggleLesson, recordQuiz, user, setAuthOpen, enroll } = useStore();
  const [activeLesson, setActiveLesson] = useState<string | null>(null);
  const [quizMode, setQuizMode] = useState(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [showCert, setShowCert] = useState(false);
  const [openMods, setOpenMods] = useState<Record<string, boolean>>({});
  const [note, setNote] = useState("");
  const [savedNotes, setSavedNotes] = useState<string[]>([]);

  const enrollment = course ? enrollments[course.id] : undefined;
  const progress = useMemo(() => (course ? courseProgress(course.id, enrollment) : 0), [course, enrollment]);
  const allLessons = useMemo(() => (course ? course.modules.flatMap((m) => m.lessons.map((l) => ({ ...l, modTitle: m.title }))) : []), [course]);
  const current = allLessons.find((l) => l.id === activeLesson) ?? null;
  const inst = course ? instructorOf(course.instructorId) : null;

  if (!course) return <div className="mx-auto max-w-3xl px-4 py-24 text-center"><p className="font-display text-3xl font-semibold">Course not found</p></div>;
  if (!enrollment) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <span className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-[#FFE3DC]"><Lock size={30} className="text-[#E14E40]" /></span>
        <h1 className="font-display mt-5 text-3xl font-semibold text-[#2E2A3B]">You're previewing {course.title}</h1>
        <p className="mt-2 font-medium text-[#5B5570]">Enroll to unlock all lessons, track progress, take the CEU quiz, and earn your instant certificate.</p>
        <div className="mt-6 flex justify-center gap-3">
          <button onClick={() => { if (!user) { setAuthOpen(true); return; } enroll([course.id]); }} className="rounded-full bg-[#FF6B5B] px-7 py-3.5 text-sm font-black text-white shadow-[0_5px_0_#E14E40]">Enroll now — ${course.price}</button>
          <Link to={`/courses/${course.slug}`} className="rounded-full border-[3px] border-[#2E2A3B] px-7 py-3 text-sm font-black text-[#2E2A3B]">View details</Link>
        </div>
      </div>
    );
  }

  const score = submitted ? Math.round((course.quiz.filter((q, i) => answers[i] === q.answer).length / course.quiz.length) * 100) : null;
  const doneCount = allLessons.filter((l) => enrollment.progress[l.id]).length;

  const startQuiz = () => { setQuizMode(true); setAnswers({}); setSubmitted(false); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const submitQuiz = () => {
    setSubmitted(true);
    const s = Math.round((course.quiz.filter((q, i) => answers[i] === q.answer).length / course.quiz.length) * 100);
    recordQuiz(course.id, s, user?.name ?? "Learner");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const certDate = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  if (showCert && enrollment.certId) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <div className="print-hidden mb-6 flex flex-wrap items-center justify-between gap-3">
          <button onClick={() => setShowCert(false)} className="inline-flex items-center gap-1.5 rounded-full bg-[#2E2A3B]/6 px-4 py-2 text-xs font-black text-[#2E2A3B] hover:bg-[#2E2A3B] hover:text-white"><ArrowLeft size={14} /> Back to course</button>
          <div className="flex gap-2">
            <button onClick={() => window.print()} className="inline-flex items-center gap-1.5 rounded-full bg-[#2E2A3B] px-5 py-2.5 text-xs font-black text-white hover:bg-[#FF6B5B]"><Printer size={14} /> Print / Save PDF</button>
            <button onClick={() => nav("/dashboard")} className="inline-flex items-center gap-1.5 rounded-full bg-[#0EA58C] px-5 py-2.5 text-xs font-black text-white hover:bg-[#0B7C69]"><Download size={14} /> My transcript</button>
          </div>
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Certificate course={course} name={enrollment.nameOnCert ?? user?.name ?? "Learner"} creds={user?.creds ?? ""} certId={enrollment.certId} date={certDate} />
        </motion.div>
        <p className="print-hidden mt-6 text-center text-sm font-bold text-[#5B5570]">Verification ID <span className="font-black text-[#2E2A3B]">{enrollment.certId}</span> · Verify anytime at talkaba.academy/verify</p>
      </div>
    );
  }

  if (quizMode) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <button onClick={() => setQuizMode(false)} className="inline-flex items-center gap-1.5 rounded-full bg-[#2E2A3B]/6 px-4 py-2 text-xs font-black text-[#2E2A3B] hover:bg-[#2E2A3B] hover:text-white"><ArrowLeft size={14} /> Back to lessons</button>
        <div className="mt-4 overflow-hidden rounded-[2rem] bg-[#2E2A3B] p-6 text-white sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#FFC93C]">Final CEU Quiz · {course.title}</p>
          <h1 className="font-display mt-2 text-3xl font-semibold">Show what you know — earn {course.ceus} CEUs</h1>
          <p className="mt-2 text-sm font-medium text-white/70">Pass at 80% or higher · Unlimited free retakes · Every answer explained</p>
          {!submitted && <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/15"><div className="h-full rounded-full bg-[#FFC93C] transition-all" style={{ width: `${(Object.keys(answers).length / course.quiz.length) * 100}%` }} /></div>}
        </div>
        {submitted && score != null && (
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className={`mt-6 rounded-[2rem] p-6 text-center sm:p-8 ${score >= 80 ? "bg-[#D7F3E5]" : "bg-[#FFE3DC]"}`}>
            {score >= 80 ? (
              <><PartyPopper size={40} className="mx-auto text-[#0B7C69]" /><h2 className="font-display mt-2 text-3xl font-semibold text-[#0B7C69]">You passed with {score}%! 🎉</h2>
              <p className="mt-1 font-bold text-[#0B7C69]/80">{course.ceus} CEUs ({course.ceuTypes.join(" + ")}) added to your transcript.</p>
              <div className="mt-4 flex justify-center gap-2.5">
                <button onClick={() => setShowCert(true)} className="inline-flex items-center gap-2 rounded-full bg-[#0EA58C] px-6 py-3 text-sm font-black text-white shadow-[0_4px_0_#0B7C69]"><Award size={16} /> View my certificate</button>
                <button onClick={() => nav("/dashboard")} className="rounded-full border-[3px] border-[#0B7C69] px-6 py-2.5 text-sm font-black text-[#0B7C69]">Go to dashboard</button>
              </div></>
            ) : (
              <><RotateCcw size={36} className="mx-auto text-[#E14E40]" /><h2 className="font-display mt-2 text-3xl font-semibold text-[#E14E40]">{score}% — so close!</h2>
              <p className="mt-1 font-bold text-[#E14E40]/80">You need 80% to pass. Review the explanations below and retake free — you've got this.</p>
              <button onClick={startQuiz} className="mt-4 rounded-full bg-[#E14E40] px-6 py-3 text-sm font-black text-white shadow-[0_4px_0_#B23A30]">Retake quiz</button></>
            )}
          </motion.div>
        )}
        <div className="mt-6 space-y-5">
          {course.quiz.map((q, qi) => {
            const picked = answers[qi];
            return (
              <div key={qi} className="rounded-[1.75rem] border-2 border-[#2E2A3B]/10 bg-white p-5 sm:p-6">
                <p className="font-black text-[#2E2A3B]"><span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#2E2A3B] text-xs text-white">{qi + 1}</span>{q.q}</p>
                <div className="mt-3 space-y-2">
                  {q.options.map((op, oi) => {
                    const isAns = oi === q.answer;
                    const isPick = picked === oi;
                    let cls = "border-[#2E2A3B]/12 bg-[#FFF9F1] hover:border-[#7C6FF0]";
                    if (submitted && isAns) cls = "border-[#0EA58C] bg-[#D7F3E5]";
                    else if (submitted && isPick && !isAns) cls = "border-[#E14E40] bg-[#FFE3DC]";
                    else if (!submitted && isPick) cls = "border-[#7C6FF0] bg-[#E4E0FF]";
                    return (
                      <button key={oi} disabled={submitted} onClick={() => setAnswers((a) => ({ ...a, [qi]: oi }))} className={`flex w-full items-center gap-3 rounded-2xl border-2 p-3.5 text-left text-sm font-bold text-[#2E2A3B] transition ${cls}`}>
                        <span className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 text-[11px] font-black ${submitted && isAns ? "border-[#0EA58C] bg-[#0EA58C] text-white" : isPick ? "border-current" : "border-[#2E2A3B]/20"}`}>{submitted && isAns ? <Check size={12} strokeWidth={4} /> : submitted && isPick ? <X size={12} strokeWidth={4} /> : String.fromCharCode(65 + oi)}</span>
                        {op}
                      </button>
                    );
                  })}
                </div>
                {submitted && (
                  <div className={`mt-3 rounded-2xl p-4 text-sm font-semibold ${picked === q.answer ? "bg-[#D7F3E5] text-[#0B7C69]" : "bg-[#FFF0C4] text-[#7A5B00]"}`}>
                    <span className="font-black">{picked === q.answer ? "✓ Correct! " : "✎ Let's learn: "}</span>{q.explain}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {!submitted && (
          <button disabled={Object.keys(answers).length < course.quiz.length} onClick={submitQuiz} className="mt-6 w-full rounded-full bg-[#7C6FF0] px-6 py-4 text-base font-black text-white shadow-[0_5px_0_#5B4ED6] transition enabled:hover:brightness-105 disabled:opacity-40">
            Submit quiz ({Object.keys(answers).length}/{course.quiz.length} answered)
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link to="/dashboard" className="inline-flex items-center gap-1.5 rounded-full bg-[#2E2A3B]/6 px-4 py-2 text-xs font-black text-[#2E2A3B] hover:bg-[#2E2A3B] hover:text-white"><ArrowLeft size={14} /> Dashboard</Link>
        {enrollment.quizPassed && enrollment.certId && <button onClick={() => setShowCert(true)} className="inline-flex items-center gap-1.5 rounded-full bg-[#0EA58C] px-5 py-2.5 text-xs font-black text-white hover:bg-[#0B7C69]"><Award size={14} /> View certificate</button>}
      </div>
      <div className="mt-4 overflow-hidden rounded-[2rem] p-6 text-white sm:p-8" style={{ background: `linear-gradient(135deg, #2E2A3B, ${course.color}88)` }}>
        <p className="text-xs font-black uppercase tracking-[0.2em] text-white/60">{course.category} · with {inst?.name}</p>
        <h1 className="font-display mt-1 text-2xl font-semibold sm:text-3xl">{course.title}</h1>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <div className="h-3 min-w-[180px] flex-1 overflow-hidden rounded-full bg-white/15"><div className="h-full rounded-full bg-gradient-to-r from-[#FFC93C] to-[#FF6B5B] transition-all" style={{ width: `${progress}%` }} /></div>
          <span className="text-sm font-black">{progress}% · {doneCount}/{allLessons.length} lessons</span>
          {enrollment.quizBest != null && <span className={`rounded-full px-3 py-1 text-xs font-black ${enrollment.quizPassed ? "bg-[#0EA58C]" : "bg-white/20"}`}>Best quiz: {enrollment.quizBest}%</span>}
        </div>
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-4">
          <h2 className="font-display text-xl font-semibold text-[#2E2A3B]">Course player</h2>
          {course.modules.map((m, mi) => {
            const open = openMods[m.id] ?? mi === 0;
            return (
              <div key={m.id} className="overflow-hidden rounded-3xl border-2 border-[#2E2A3B]/10 bg-white">
                <button onClick={() => setOpenMods((o) => ({ ...o, [m.id]: !open }))} className="flex w-full items-center gap-3 p-4 text-left" style={{ background: course.soft }}>
                  <span className="font-display inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white" style={{ background: course.color }}>{mi + 1}</span>
                  <span className="flex-1"><span className="block text-sm font-black text-[#2E2A3B]">{m.title}</span><span className="block text-xs font-bold text-[#5B5570]">{m.lessons.filter((l) => enrollment.progress[l.id]).length}/{m.lessons.length} complete</span></span>
                  <ChevronDown size={18} className={`transition ${open ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.ul initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden divide-y divide-[#2E2A3B]/6">
                      {m.lessons.map((l) => {
                        const done = enrollment.progress[l.id];
                        const Icon = kindIcon(l.kind);
                        const active = activeLesson === l.id;
                        return (
                          <li key={l.id}>
                            <button onClick={() => { setActiveLesson(l.id); }} className={`flex w-full items-center gap-3 px-4 py-3.5 text-left transition ${active ? "bg-[#E4E0FF]/60" : "hover:bg-[#FFF9F1]"}`}>
                              <span onClick={(e) => { e.stopPropagation(); toggleLesson(course.id, l.id); }} className={`inline-flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-full border-[2.5px] transition ${done ? "border-[#0EA58C] bg-[#0EA58C] text-white" : "border-[#2E2A3B]/20 text-transparent hover:border-[#0EA58C]"}`} role="checkbox" aria-checked={done} aria-label="Mark complete"><Check size={14} strokeWidth={4} /></span>
                              <Icon size={17} className="shrink-0 text-[#5B5570]" />
                              <span className="flex-1"><span className={`block text-sm font-extrabold ${done ? "text-[#5B5570] line-through decoration-2" : "text-[#2E2A3B]"}`}>{l.title}</span><span className="block text-xs font-bold capitalize text-[#5B5570]">{l.kind} · {l.minutes} min</span></span>
                              {l.kind === "quiz" ? <span className="rounded-full bg-[#7C6FF0] px-3 py-1 text-[11px] font-black text-white">QUIZ</span> : active ? <span className="rounded-full bg-[#2E2A3B] px-3 py-1 text-[11px] font-black text-white">NOW</span> : null}
                            </button>
                          </li>
                        );
                      })}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
          <button onClick={startQuiz} className="flex w-full items-center justify-center gap-2 rounded-[1.75rem] bg-[#7C6FF0] px-6 py-5 font-display text-lg font-semibold text-white shadow-[0_6px_0_#5B4ED6] transition hover:brightness-105">
            {enrollment.quizPassed ? "Retake final quiz" : "Take the final CEU quiz"} <ArrowRight size={19} />
          </button>
          <p className="text-center text-xs font-bold text-[#5B5570]">80% to pass · Unlimited retakes · Instant certificate</p>
        </div>
        <div>
          <h2 className="font-display text-xl font-semibold text-[#2E2A3B]">{current ? current.modTitle : "Welcome to your course"}</h2>
          <AnimatePresence mode="wait">
            {!current ? (
              <motion.div key="welcome" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="mt-3 overflow-hidden rounded-[2rem] border-2 border-[#2E2A3B]/10 bg-white">
                <img src={course.image} alt="" className="h-64 w-full object-cover" />
                <div className="p-6">
                  <h3 className="font-display text-2xl font-semibold text-[#2E2A3B]">Let's learn the play-first way 🎈</h3>
                  <p className="mt-2 text-sm font-medium leading-relaxed text-[#5B5570]">Pick any lesson on the left to begin. Each lesson simulates real Academy content — video walkthroughs, readings, and practice activities. Mark lessons complete as you go, then take the final quiz to earn your <strong>{course.ceus} CEUs</strong>.</p>
                  <button onClick={() => { const first = allLessons.find((l) => !enrollment.progress[l.id]) ?? allLessons[0]; setActiveLesson(first.id); }} className="mt-4 rounded-full bg-[#2E2A3B] px-6 py-3 text-sm font-black text-white hover:bg-[#FF6B5B]">{doneCount > 0 ? "Resume where I left off" : "Start lesson 1"}</button>
                </div>
              </motion.div>
            ) : (
              <motion.div key={current.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="mt-3 overflow-hidden rounded-[2rem] border-2 border-[#2E2A3B]/10 bg-white">
                <div className="relative">
                  <img src={course.image} alt="" className="h-60 w-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-[#2E2A3B]/45">
                    <span className="flex flex-col items-center gap-2 text-white"><span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#2E2A3B] shadow-xl"><MonitorPlay size={26} /></span><span className="rounded-full bg-black/50 px-3 py-1 text-xs font-black">{current.kind.toUpperCase()} · {current.minutes} MIN</span></span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-2xl font-semibold text-[#2E2A3B]">{current.title}</h3>
                  <LessonBody courseId={course.id} lessonTitle={current.title} kind={current.kind} instructor={inst?.name ?? "Your instructor"} />
                  <div className="mt-5">
                    <p className="text-xs font-black uppercase tracking-widest text-[#5B5570]">My notes (saved to this device)</p>
                    <div className="mt-2 flex gap-2">
                      <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Jot a takeaway…" className="w-full rounded-2xl border-2 border-[#2E2A3B]/12 bg-[#FFF9F1] px-4 py-2.5 text-sm font-bold focus:border-[#7C6FF0] focus:outline-none" />
                      <button onClick={() => { if (note.trim()) { setSavedNotes((n) => [...n, note.trim()]); setNote(""); } }} className="shrink-0 rounded-full bg-[#2E2A3B] px-5 py-2.5 text-xs font-black text-white hover:bg-[#7C6FF0]">Save</button>
                    </div>
                    {savedNotes.length > 0 && <ul className="mt-2 space-y-1.5">{savedNotes.map((n, i) => <li key={i} className="rounded-xl bg-[#FFF0C4] p-2.5 text-xs font-bold text-[#7A5B00]">✎ {n}</li>)}</ul>}
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2.5 border-t-2 border-dashed border-[#2E2A3B]/10 pt-5">
                    <button onClick={() => { if (!enrollment.progress[current.id]) toggleLesson(course.id, current.id); const idx = allLessons.findIndex((l) => l.id === current.id); const next = allLessons[idx + 1]; if (next) { setActiveLesson(next.id); window.scrollTo({ top: 0, behavior: "smooth" }); } }} className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#0EA58C] px-6 py-3 text-sm font-black text-white hover:bg-[#0B7C69]"><Check size={16} strokeWidth={3} /> {enrollment.progress[current.id] ? "Next lesson" : "Mark complete & continue"}</button>
                    {current.kind === "quiz" && <button onClick={startQuiz} className="inline-flex items-center gap-2 rounded-full bg-[#7C6FF0] px-6 py-3 text-sm font-black text-white hover:brightness-105"><ListVideo size={16} /> Open final quiz</button>}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function LessonBody({ courseId, lessonTitle, kind, instructor }: { courseId: string; lessonTitle: string; kind: string; instructor: string }) {
  const bodies: Record<string, string[]> = {
    "todays-aba-foundations": [
      "In Today's ABA, we never start with demands — we start with curiosity. Your first job is to learn what this person loves, hates, and needs from the people who know them best.",
      "Picture the opening conversation: no clipboards between you, no jargon. Just genuine questions — 'What makes them light up? What ruins their day? How do they tell you no?' — and deep listening.",
      "Your action step: before your next new client, prepare three open-ended questions that have nothing to do with deficits and everything to do with joy. Bring them to the family like gifts, not forms.",
    ],
    "pfa-interview-informed": [
      "The open-ended interview is the most underrated skill in behavior analysis. Done well, families cry (happy tears) because someone finally asked the right questions.",
      "Listen for the synthesized story: it's rarely just escape or just access. It's the combination — demands + denied iPad + mom on the phone — that creates the storm.",
      "Practice today: take one current case and rewrite its 'function' as a synthesized contingency in plain family language. Notice how much more useful it becomes.",
    ],
    "sbt-skills-based-treatment": [
      "The FCR must work every single time at first. Imagine finally finding your voice only to be ignored — that's what an unreliable FCR feels like to a learner.",
      "Progress is paced by performance, not calendars. Today's data decides tomorrow's challenge — and the learner's affect is the most important datum.",
      "Try this lens on your toughest case: if problem behavior returned, what is it telling you about your pacing? Adjust the challenge, not the child.",
    ],
  };
  const generic = [
    `Welcome to "${lessonTitle}" with ${instructor}. This ${kind} walks you through one core skill with real session examples and a practice prompt you can use this week.`,
    "The Academy way: learn a concept in minutes, see it in action on video, then try a micro-practice before moving on. Small steps, big change.",
    "When you're done, mark the lesson complete and keep your streak going — your future certified self is cheering.",
  ];
  const paras = bodies[courseId] ?? generic;
  return (
    <div className="mt-3 space-y-3">
      {paras.map((p, i) => <p key={i} className="text-[15px] font-medium leading-relaxed text-[#5B5570]">{p}</p>)}
      <div className="flex items-center gap-2 rounded-2xl bg-[#E4E0FF] p-3.5 text-sm font-extrabold text-[#5B4ED6]"><PenLine size={16} /> Practice prompt: write one sentence on how you'll use this idea within 48 hours.</div>
    </div>
  );
}
