import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Blocks, Ear, HeartHandshake, Quote, ShieldCheck, Sprout, Tv, Users } from "lucide-react";
import { courses } from "../lib/data";
import { CourseCard, PageHero, SectionHead } from "../components/ui";

const journey = [
  { icon: Ear, c: "#3EA6FF", s: "#DCEEFF", t: "1 · Learn by Listening", d: "Ask the autistic person — and those who know and love them — about loves, hates, and what behavior communicates. Start with questions, not clipboards.", quote: "Today's ABA starts with asking questions, listening, and learning." },
  { icon: Blocks, c: "#FF6B5B", s: "#FFE3DC", t: "2 · Learn by Creating Joy", d: "Enrich a space until the learner is Happy, Relaxed & Engaged. Follow their lead, remove all pressure, and let them vote with their feet.", quote: "Teach the learner: I know you, I see you, I hear you, I'm here for you." },
  { icon: HeartHandshake, c: "#0EA58C", s: "#D7F3E5", t: "3 · Learn by Empowering", d: "Signal change kindly — and relent the moment distress appears. Build trust by proving escalation is never required to be heard.", quote: "Ours is not to coerce, but to listen, learn, guide, and coach." },
  { icon: Sprout, c: "#7C6FF0", s: "#E4E0FF", t: "4 · Learn While Teaching", d: "Pave the path with communication, toleration, and cooperation — paced by performance in the moment, never by pushing through tears.", quote: "There is no obligation to teach while children are upset in any way." },
];

const commitments = [
  { icon: ShieldCheck, t: "Trauma-informed, always", d: "We assume learners carry adverse histories — so safety, choice, and trust are universal, not conditional." },
  { icon: Tv, t: "Televisible practice", d: "If you wouldn't be proud for a family to watch it, don't do it. Every procedure we teach passes the TV test." },
  { icon: Users, t: "Nothing about them, without them", d: "Autistic voices shape our curricula. We cite, credit, and compensate lived-experience collaborators." },
];

const thenNow = [
  { then: "Compliance as the goal", now: "Cooperation as the relationship" },
  { then: "Work through problem behavior", now: "Listen to behavior as communication" },
  { then: "Escape extinction by default", now: "Honor assent withdrawal instantly" },
  { then: "Deficit-based assessment", now: "Joy-based, interview-informed PFA" },
  { then: "Therapist-led drills", now: "Learner-led play with embedded teaching" },
  { then: "Restraint & seclusion plans", now: "Prevention, de-escalation & trust" },
];

export default function Philosophy() {
  const picks = courses.filter((c) => ["todays-aba-foundations", "pfa-interview-informed", "sbt-skills-based-treatment"].includes(c.id));
  return (
    <div>
      <PageHero eyebrow="Our philosophy" color="#0EA58C" title={<>From compliance to compassion: the story of Today's ABA.</>} blurb="Inspired by Dr. Greg Hanley's landmark essay 'A Perspective on Today's ABA' — the ideas that rebuilt our field, and our Academy." image="/images/family-coaching.jpg">
        <Link to="/courses" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-black text-[#0B7C69] hover:scale-[1.03]">Learn it live in a course <ArrowRight size={16} strokeWidth={3} /></Link>
      </PageHero>
      <section className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6">
        <Quote size={36} className="mx-auto text-[#FF6B5B]" />
        <motion.blockquote initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-display mt-4 text-2xl font-medium leading-snug text-[#2E2A3B] sm:text-3xl">
          “Today's ABA is about continually learning about the predilections of the autistic person being served — so that preferred learning contexts can be developed en route to skills that can be appreciated by the autistic person as well as others.”
        </motion.blockquote>
        <p className="mt-4 text-xs font-black uppercase tracking-[0.2em] text-[#5B5570]">Dr. Greg Hanley · A Perspective on Today's ABA (2020)</p>
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <SectionHead eyebrow="The four movements" color="#0EA58C" title={<>How Today's ABA <span className="text-[#0B7C69]">actually works</span></>} blurb="Hanley's framework, in plain language — and exactly how we teach each movement inside the Academy." />
        <div className="grid gap-6 md:grid-cols-2">
          {journey.map((j, i) => (
            <motion.div key={j.t} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 2) * 0.08 }} className="rounded-[2rem] border-2 border-[#2E2A3B]/10 bg-white p-7">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl text-white" style={{ background: j.c }}><j.icon size={26} strokeWidth={2.5} /></span>
              <h3 className="font-display mt-4 text-2xl font-semibold text-[#2E2A3B]">{j.t}</h3>
              <p className="mt-2 font-medium leading-relaxed text-[#5B5570]">{j.d}</p>
              <p className="mt-4 rounded-2xl p-4 font-display text-[15px] font-medium italic" style={{ background: j.s, color: "#2E2A3B" }}>“{j.quote}”</p>
            </motion.div>
          ))}
        </div>
      </section>
      <section className="bg-[#2E2A3B] py-16 text-white sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <SectionHead eyebrow="Then → Now" color="#FF6B5B" title={<>What changed in <span className="text-[#FF6B5B]">our field</span></>} />
          <div className="overflow-hidden rounded-[2rem] border border-white/10">
            <div className="grid grid-cols-2 bg-white/10 text-xs font-black uppercase tracking-[0.16em] text-white/60"><span className="p-4">Yesterday's ABA</span><span className="p-4">Today's ABA ✓</span></div>
            {thenNow.map((r, i) => (
              <motion.div key={r.now} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="grid grid-cols-2 border-t border-white/10 text-sm font-bold sm:text-base">
                <span className="p-4 text-white/45 line-through decoration-[#FF6B5B]/60 decoration-2">{r.then}</span>
                <span className="bg-[#0EA58C]/10 p-4 text-[#7BF0D4]">{r.now}</span>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {commitments.map((c) => (
              <div key={c.t} className="rounded-3xl bg-white/[0.07] p-5">
                <c.icon size={24} className="text-[#FFC93C]" />
                <p className="font-display mt-2 text-lg font-semibold">{c.t}</p>
                <p className="mt-1 text-sm font-medium text-white/65">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHead eyebrow="Learn the framework" color="#FF6B5B" title={<>Courses that teach <span className="text-[#E14E40]">this philosophy</span></>} blurb="Don't just read about Today's ABA — practice it with coaching, video, and CEUs attached." />
        <div className="grid gap-6 md:grid-cols-3">
          {picks.map((c, i) => <CourseCard key={c.id} course={c} index={i} />)}
        </div>
        <div className="mt-10 rounded-[2rem] border-2 border-[#2E2A3B]/10 bg-white p-6 text-center sm:p-8">
          <p className="text-sm font-bold text-[#5B5570]">With gratitude to Dr. Greg Hanley and the PFA/SBT community whose research and courage made this Academy possible. We encourage every learner to read the original essay and explore practicalfunctionalassessment.com.</p>
          <p className="mt-2 text-xs font-black uppercase tracking-widest text-[#5B5570]/60">Talk ABA Academy is an independent CEU provider inspired by — but not affiliated with — FTF Behavioral Consulting.</p>
        </div>
      </section>
    </div>
  );
}
