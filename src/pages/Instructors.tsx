import { Link } from "react-router-dom";
import { ArrowRight, Award, Star, Users } from "lucide-react";
import { motion } from "framer-motion";
import { courses, instructors } from "../lib/data";
import { PageHero, SectionHead, Stars } from "../components/ui";

export default function Instructors() {
  return (
    <div>
      <PageHero eyebrow="Meet the faculty" color="#3EA6FF" title={<>Practitioners first.<br />Presenters second.</>} blurb="Every instructor carries an active caseload. They teach what they did this week — with real video, real data, and real honesty about what flopped." />
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">
        {instructors.map((ins, i) => {
          const mine = courses.filter((c) => c.instructorId === ins.id);
          const flip = i % 2 === 1;
          return (
            <motion.div key={ins.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} className={`grid items-center gap-8 rounded-[2.5rem] border-2 border-[#2E2A3B]/10 bg-white p-7 sm:p-10 lg:grid-cols-[0.8fr_1.2fr] ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <div className="text-center">
                {ins.image ? <img src={ins.image} alt={ins.name} className="mx-auto h-56 w-56 rounded-[2.5rem] border-4 object-cover shadow-xl" style={{ borderColor: ins.color }} /> : <span className="font-display mx-auto flex h-56 w-56 items-center justify-center rounded-[2.5rem] text-7xl font-semibold text-white shadow-xl" style={{ background: ins.color }}>{ins.initials}</span>}
                <div className="mx-auto mt-4 flex w-fit items-center gap-4 rounded-2xl bg-[#FFF9F1] px-5 py-3 text-center">
                  <span><span className="font-display block text-xl font-semibold text-[#2E2A3B]">{ins.courses}</span><span className="text-[10px] font-black uppercase tracking-widest text-[#5B5570]">Courses</span></span>
                  <span className="h-8 w-px bg-[#2E2A3B]/10" />
                  <span><span className="font-display block text-xl font-semibold text-[#2E2A3B]">{(ins.learners / 1000).toFixed(1)}k</span><span className="text-[10px] font-black uppercase tracking-widest text-[#5B5570]">Learners</span></span>
                  <span className="h-8 w-px bg-[#2E2A3B]/10" />
                  <span><span className="font-display flex items-center gap-1 text-xl font-semibold text-[#2E2A3B]">{ins.rating.toFixed(1)}<Star size={14} className="fill-[#FFC93C] text-[#E0A81A]" /></span><span className="text-[10px] font-black uppercase tracking-widest text-[#5B5570]">Rating</span></span>
                </div>
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: ins.color }}>{ins.creds}</p>
                <h2 className="font-display mt-1 text-3xl font-semibold text-[#2E2A3B] sm:text-4xl">{ins.name}</h2>
                <p className="mt-1 text-sm font-black text-[#5B5570]">{ins.role}</p>
                <p className="mt-3 font-medium leading-relaxed text-[#5B5570]">{ins.bio}</p>
                <div className="mt-4 flex flex-wrap gap-2">{ins.specialties.map((s) => <span key={s} className="rounded-full px-3 py-1.5 text-xs font-black text-white" style={{ background: ins.color }}>{s}</span>)}</div>
                <div className="mt-5 space-y-2">
                  {mine.map((c) => (
                    <Link key={c.id} to={`/courses/${c.slug}`} className="group flex items-center gap-3 rounded-2xl border-2 border-[#2E2A3B]/8 p-2.5 transition hover:border-[#2E2A3B]/20">
                      <img src={c.image} alt="" className="h-14 w-16 rounded-xl object-cover" />
                      <span className="min-w-0 flex-1"><span className="block truncate text-sm font-black text-[#2E2A3B]">{c.title}</span><span className="mt-0.5 flex items-center gap-2 text-xs font-bold text-[#5B5570]"><Stars rating={c.rating} size={11} /> {c.ceus} CEUs · ${c.price}</span></span>
                      <ArrowRight size={16} className="mr-2 shrink-0 transition group-hover:translate-x-1" />
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
        <div className="confetti-card rounded-[2.5rem] bg-[#0EA58C] p-8 text-center text-white sm:p-12">
          <Award size={36} className="mx-auto" />
          <h2 className="font-display mt-3 text-3xl font-semibold">Want to teach with us?</h2>
          <p className="mx-auto mt-2 max-w-xl font-medium text-white/85">We're always looking for assent-based clinicians with a story to tell and video to share. Faculty earn revenue share + full production support.</p>
          <a href="mailto:faculty@talkaba.academy" className="mt-5 inline-block rounded-full bg-white px-7 py-3.5 text-sm font-black text-[#0B7C69] hover:scale-[1.03]">Become an instructor →</a>
          <p className="mt-3 flex items-center justify-center gap-1.5 text-xs font-bold text-white/70"><Users size={14} /> faculty@talkaba.academy</p>
        </div>
      </div>
    </div>
  );
}
