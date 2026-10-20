import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Award, BookOpen, Check, Download, Heart, Play, Printer, Sparkles, Trash2, Trophy } from "lucide-react";
import { courses, instructorOf } from "../lib/data";
import { courseProgress, useStore } from "../lib/store";
import { Stars } from "../components/ui";

const ETHICS_REQ = 4;
const SUP_REQ = 4;

export default function Dashboard() {
  const { user, setAuthOpen, enrollments, totalCeus, wishlist, toggleWishlist } = useStore();
  if (!user) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <span className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-[#E4E0FF]"><BookOpen size={30} className="text-[#5B4ED6]" /></span>
        <h1 className="font-display mt-5 text-3xl font-semibold text-[#2E2A3B]">Your CEU dashboard awaits</h1>
        <p className="mt-2 font-medium text-[#5B5570]">Sign in to track progress, store certificates, and watch your CEU totals grow.</p>
        <button onClick={() => setAuthOpen(true)} className="mt-6 rounded-full bg-[#7C6FF0] px-8 py-3.5 text-sm font-black text-white shadow-[0_5px_0_#5B4ED6]">Sign in / Create free account</button>
      </div>
    );
  }
  const enrolled = Object.values(enrollments);
  const completed = enrolled.filter((e) => e.quizPassed);
  const ethicsCeus = completed.reduce((s, e) => s + (courses.find((c) => c.id === e.courseId)?.ceuTypes.includes("BACB Ethics") ? courses.find((c) => c.id === e.courseId)!.ceus : 0), 0);
  const supCeus = completed.reduce((s, e) => s + (courses.find((c) => c.id === e.courseId)?.ceuTypes.includes("BACB Supervision") ? courses.find((c) => c.id === e.courseId)!.ceus : 0), 0);
  const inProgress = enrolled.filter((e) => !e.quizPassed);
  const wished = wishlist.map((id) => courses.find((c) => c.id === id)!).filter(Boolean);
  const nextUp = inProgress.map((e) => ({ e, c: courses.find((x) => x.id === e.courseId)! })).sort((a, b) => courseProgress(b.c.id, b.e) - courseProgress(a.c.id, a.e))[0];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#5B5570]">Welcome back, {user.name.split(" ")[0]}! 🎈</p>
          <h1 className="font-display mt-1 text-4xl font-semibold text-[#2E2A3B]">My Learning Dashboard</h1>
        </div>
        <Link to="/courses" className="rounded-full bg-[#FF6B5B] px-6 py-3 text-sm font-black text-white shadow-[0_4px_0_#E14E40]">+ Earn more CEUs</Link>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="confetti-card rounded-[1.75rem] bg-[#2E2A3B] p-6 text-white">
          <p className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-white/60"><Trophy size={14} className="text-[#FFC93C]" /> Total CEUs earned</p>
          <p className="font-display mt-1 text-5xl font-semibold">{totalCeus}</p>
          <p className="mt-1 text-xs font-bold text-white/60">{completed.length} course{completed.length === 1 ? "" : "s"} completed</p>
        </div>
        <div className="rounded-[1.75rem] border-2 border-[#2E2A3B]/10 bg-white p-6">
          <p className="text-xs font-black uppercase tracking-widest text-[#5B5570]">Ethics CEUs (need {ETHICS_REQ})</p>
          <p className="font-display mt-1 text-4xl font-semibold text-[#0B7C69]">{ethicsCeus}<span className="text-lg text-[#5B5570]">/{ETHICS_REQ}</span></p>
          <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-[#2E2A3B]/8"><div className="h-full rounded-full bg-[#0EA58C]" style={{ width: `${Math.min(100, (ethicsCeus / ETHICS_REQ) * 100)}%` }} /></div>
          {ethicsCeus < ETHICS_REQ && <Link to="/courses/assent-dignity-ethics" className="mt-2 inline-block text-xs font-black text-[#0B7C69] hover:underline">Get Ethics CEUs →</Link>}
        </div>
        <div className="rounded-[1.75rem] border-2 border-[#2E2A3B]/10 bg-white p-6">
          <p className="text-xs font-black uppercase tracking-widest text-[#5B5570]">Supervision CEUs (need {SUP_REQ})</p>
          <p className="font-display mt-1 text-4xl font-semibold text-[#5B4ED6]">{supCeus}<span className="text-lg text-[#5B5570]">/{SUP_REQ}</span></p>
          <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-[#2E2A3B]/8"><div className="h-full rounded-full bg-[#7C6FF0]" style={{ width: `${Math.min(100, (supCeus / SUP_REQ) * 100)}%` }} /></div>
          {supCeus < SUP_REQ && <Link to="/courses/supervising-with-heart" className="mt-2 inline-block text-xs font-black text-[#5B4ED6] hover:underline">Get Supervision CEUs →</Link>}
        </div>
        <div className="rounded-[1.75rem] border-2 border-[#2E2A3B]/10 bg-white p-6">
          <p className="text-xs font-black uppercase tracking-widest text-[#5B5570]">In progress</p>
          <p className="font-display mt-1 text-4xl font-semibold text-[#E14E40]">{inProgress.length}</p>
          <p className="mt-1 text-xs font-bold text-[#5B5570]">{enrolled.length} total enrollments</p>
          {nextUp && <Link to={`/learn/${nextUp.c.slug}`} className="mt-2 inline-block text-xs font-black text-[#E14E40] hover:underline">Resume {nextUp.c.title.slice(0, 28)}… →</Link>}
        </div>
      </div>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
        <div>
          <h2 className="font-display text-2xl font-semibold text-[#2E2A3B]">Continue learning</h2>
          {enrolled.length === 0 ? (
            <div className="mt-4 rounded-[2rem] border-2 border-dashed border-[#2E2A3B]/20 bg-white p-10 text-center">
              <Sparkles size={32} className="mx-auto text-[#FFC93C]" />
              <p className="font-display mt-3 text-xl font-semibold text-[#2E2A3B]">No enrollments yet — let's change that!</p>
              <Link to="/courses" className="mt-4 inline-block rounded-full bg-[#2E2A3B] px-6 py-3 text-sm font-black text-white">Browse the catalog</Link>
            </div>
          ) : (
            <div className="mt-4 space-y-4">
              {enrolled.map((e) => {
                const c = courses.find((x) => x.id === e.courseId)!;
                const p = courseProgress(c.id, e);
                const inst = instructorOf(c.instructorId);
                return (
                  <motion.div key={e.courseId} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4 rounded-[1.75rem] border-2 border-[#2E2A3B]/10 bg-white p-4 sm:flex-row sm:p-5">
                    <img src={c.image} alt="" className="h-36 w-full rounded-2xl object-cover sm:h-32 sm:w-44 sm:shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full px-2.5 py-1 text-[11px] font-black text-white" style={{ background: c.color }}>{c.ceus} CEUs</span>
                        {e.quizPassed ? <span className="inline-flex items-center gap-1 rounded-full bg-[#D7F3E5] px-2.5 py-1 text-[11px] font-black text-[#0B7C69]"><Check size={12} strokeWidth={4} /> COMPLETED</span> : <span className="rounded-full bg-[#FFF0C4] px-2.5 py-1 text-[11px] font-black text-[#7A5B00]">{p}% COMPLETE</span>}
                      </div>
                      <p className="mt-1.5 truncate font-black text-[#2E2A3B]">{c.title}</p>
                      <p className="text-xs font-bold text-[#5B5570]">{inst.name} · {e.quizBest != null ? `Best quiz ${e.quizBest}%` : "Quiz not taken yet"}</p>
                      <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-[#2E2A3B]/8"><div className="h-full rounded-full transition-all" style={{ width: `${e.quizPassed ? 100 : p}%`, background: c.color === "#FFC93C" ? "#E0A81A" : c.color }} /></div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <Link to={`/learn/${c.slug}`} className="inline-flex items-center gap-1.5 rounded-full bg-[#2E2A3B] px-4 py-2 text-xs font-black text-white hover:bg-[#FF6B5B]"><Play size={13} /> {e.quizPassed ? "Review course" : "Continue"}</Link>
                        {e.quizPassed && e.certId && <Link to={`/learn/${c.slug}`} className="inline-flex items-center gap-1.5 rounded-full bg-[#0EA58C] px-4 py-2 text-xs font-black text-white hover:bg-[#0B7C69]"><Award size={13} /> Certificate</Link>}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
        <div className="space-y-6">
          <div className="rounded-[2rem] bg-[#2E2A3B] p-6 text-white">
            <h3 className="font-display flex items-center gap-2 text-xl font-semibold"><Award size={20} className="text-[#FFC93C]" /> My certificates</h3>
            {completed.length === 0 ? (
              <p className="mt-2 text-sm font-medium text-white/60">Pass a final quiz at 80%+ and your verifiable certificate lands here instantly.</p>
            ) : (
              <ul className="mt-4 space-y-3">
                {completed.map((e) => {
                  const c = courses.find((x) => x.id === e.courseId)!;
                  return (
                    <li key={e.courseId} className="rounded-2xl bg-white/10 p-3.5">
                      <p className="line-clamp-1 text-sm font-black">{c.title}</p>
                      <p className="mt-0.5 text-xs font-bold text-white/60">{c.ceus} CEUs · ID {e.certId}</p>
                      <div className="mt-2 flex gap-2">
                        <Link to={`/learn/${c.slug}`} className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-[11px] font-black text-[#2E2A3B]"><Printer size={11} /> View / Print</Link>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
            <button onClick={() => window.print()} className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border-2 border-white/20 px-4 py-2.5 text-xs font-black text-white/80 hover:bg-white/10"><Download size={14} /> Print full transcript</button>
          </div>
          <div className="rounded-[2rem] border-2 border-[#2E2A3B]/10 bg-white p-6">
            <h3 className="font-display flex items-center gap-2 text-xl font-semibold text-[#2E2A3B]"><Heart size={19} className="text-[#FF6B5B]" /> Wishlist ({wished.length})</h3>
            {wished.length === 0 ? <p className="mt-2 text-sm font-medium text-[#5B5570]">Tap the heart on any course to save it here.</p> : (
              <ul className="mt-4 space-y-3">
                {wished.map((c) => (
                  <li key={c.id} className="flex items-center gap-3">
                    <img src={c.image} alt="" className="h-12 w-12 rounded-xl object-cover" />
                    <div className="min-w-0 flex-1"><p className="truncate text-sm font-black text-[#2E2A3B]">{c.title}</p><p className="text-xs font-bold text-[#5B5570]">${c.price} · {c.ceus} CEUs · <Stars rating={c.rating} size={11} /></p></div>
                    <Link to={`/courses/${c.slug}`} className="shrink-0 rounded-full bg-[#2E2A3B] px-3 py-1.5 text-[11px] font-black text-white">View</Link>
                    <button onClick={() => toggleWishlist(c.id)} aria-label="Remove" className="text-[#E14E40]"><Trash2 size={15} /></button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
