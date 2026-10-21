import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Award, BadgeCheck, Blocks, CalendarDays, Check, Ear, HeartHandshake, Infinity as InfinityIcon, MonitorPlay, PartyPopper, Printer, Quote, ShieldCheck, Sparkles, Sprout, Star, Users } from "lucide-react";
import { courses, faqs, instructors, instructorOf, liveEvents, paths, testimonials } from "../lib/data";
import { CourseCard, SectionHead, Stars } from "../components/ui";
import { useStore } from "../lib/store";

const stats = [
  { v: "32.5", l: "Total CEUs available", c: "#FF6B5B" },
  { v: "24k+", l: "Clinicians learning", c: "#0EA58C" },
  { v: "4.9★", l: "Average rating", c: "#E0A81A" },
  { v: "100%", l: "Joy-first, assent-based", c: "#7C6FF0" },
];

const steps = [
  { icon: MonitorPlay, t: "Pick your CEUs", d: "On-demand courses, live cohorts, and bundles — BACB + ASHA credit clearly labeled on every card.", c: "#FF6B5B", s: "#FFE3DC" },
  { icon: PartyPopper, t: "Learn through play", d: "Short videos, real session footage, practice labs, and quizzes with explanations — never gotchas.", c: "#0EA58C", s: "#D7F3E5" },
  { icon: Printer, t: "Print your certificate", d: "Pass at 80% (unlimited retakes) and get an instant, verifiable PDF for your BACB/ASHA transcript.", c: "#7C6FF0", s: "#E4E0FF" },
];

const pillars = [
  { icon: Ear, t: "Learn by Listening", d: "Ask those who know and love the learner about loves, hates, and the story behind behavior.", c: "#3EA6FF" },
  { icon: Blocks, t: "Learn by Creating Joy", d: "Build enriched, child-led spaces where learners are Happy, Relaxed & Engaged — before any demand.", c: "#FF6B5B" },
  { icon: HeartHandshake, t: "Learn by Empowering", d: "Honor every protest instantly. Teach learners they never need to escalate to be heard.", c: "#0EA58C" },
  { icon: Sprout, t: "Learn While Teaching", d: "Grow communication, toleration, and cooperation at the learner's pace — never through tears.", c: "#7C6FF0" },
];

const assurances = [
  { icon: BadgeCheck, t: "BACB ACE Provider", d: "Learning, Ethics & Supervision CEUs with event numbers on every certificate." },
  { icon: ShieldCheck, t: "30-Day Guarantee", d: "Love your course or get a full refund. Keep the downloadable resources." },
  { icon: InfinityIcon, t: "Lifetime Access", d: "Learn at 2am between sessions. Courses + all future updates, forever." },
  { icon: Users, t: "Team Dashboards", d: "20–30% group discounts with CEU tracking for clinics & districts." },
];

function Hero() {
  return (
    <div className="relative overflow-hidden" style={{ background: `linear-gradient(135deg, #0B4A8E 0%, #0B4A8EDD 55%, #0B4A8EB3 100%)` }}>
      <div className="dot-grid-light absolute inset-0 opacity-60" />
      <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10" />
      <div className="absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-black/10" />
      <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:px-8" style={{ color: "#FFF9F1" }}>
        <div>
          <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="inline-block rounded-full bg-white/20 px-4 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-white backdrop-blur">LEARN</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="font-display mt-4 text-4xl font-semibold leading-[1.05] text-white sm:text-5xl">CONNECT</motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }} className="mt-4 max-w-xl text-lg font-medium text-white/90">GROW</motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }} className="mt-6 flex flex-wrap gap-3" style={{ color: "#FFF9F1" }}>
            <span>MAKE A</span>
            <span>BIGGER IMPACT</span>
          </motion.div>
        </div>
        <div className="absolute -bottom-20 -left-10 h-20 w-20 rounded-full bg-[#0B4A8E]/20" />
        <div className="relative" style={{ color: "#FFF9F1" }}>
          <div className="flex items-center gap-3" style={{ marginBottom: "2rem" }}>
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/20" style={{ background: "#E14E40" }}>
              <span className="text-xs font-bold text-white">N</span>
            </div>
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/20" style={{ background: "#7C6FF0" }}>
              <span className="text-xs font-bold text-white">H</span>
            </div>
          </div>
          <h2 className="font-display text-3xl font-semibold text-white" style={{ marginBottom: "1.5rem" }}>TALK ABA WITH NENE AND HELEN</h2>
          <p className="text-base font-medium text-white/80" style={{ marginBottom: "2rem" }}>A MONTHLY ABA LEARNING SERIES</p>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }} className="mt-4 max-w-xl text-lg font-medium text-white/90">
            We're excited to announce our first FREE CEU SESSION this November!
            Join us monthly as we host ABA specialists from around the globe for
            meaningful learning, professional development, and shared expertise.
          </motion.p>
          <div className="grid gap-2 md:grid-cols-4" style={{ marginBottom: "2rem", maxWidth: "clamp(200px, 90vw, 400px)" }}>
            <div className="flex flex-col items-center gap-1.5" style={{ color: "#FFF9F1" }}>
              <div className="relative h-8 w-8 rounded-full bg-[#0B4A8E] flex items-center justify-center" style={{ flexShrink: 0 }}>
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-white" fill="none" stroke="currentColor" strokeWidth={2}>
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                </svg>
              </div>
              <span className="text-xs font-black">EXPERT SPEAKERS<br/>FROM AROUND THE GLOBE</span>
            </div>
            <div className="flex flex-col items-center gap-1.5" style={{ color: "#FFF9F1" }}>
              <div className="relative h-8 w-8 rounded-full bg-[#D4A853] flex items-center justify-center" style={{ flexShrink: 0 }}>
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-white" fill="none" stroke="currentColor" strokeWidth={2}>
                  <circle cx="12" cy="12" r="10" /><path d="M8 16l4-5 8 5" />
                </svg>
              </div>
              <span className="text-xs font-black">PRACTICAL INSIGHTS</span>
            </div>
            <div className="flex flex-col items-center gap-1.5" style={{ color: "#FFF9F1" }}>
              <div className="relative h-8 w-8 rounded-full bg-[#0B4A8E] flex items-center justify-center" style={{ flexShrink: 0 }}>
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-white" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <span className="text-xs font-black">PROFESSIONAL<br/>DEVELOPMENT</span>
            </div>
            <div className="flex flex-col items-center gap-1.5" style={{ color: "#D4A853" }}>
              <div className="relative h-8 w-8 rounded-full bg-[#D4A853] flex items-center justify-center" style={{ flexShrink: 0 }}>
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-white" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M17 3h5v4h-4v6h-2v-4H7v-4h-2v4H4v6h2v4H2v-4h6v4h2v-4z" />
                </svg>
              </div>
              <span className="text-xs font-black">SHARED<br/>EXPERTISE</span>
            </div>
          </div>
          <div className="flex items-center gap-3" style={{ background: "rgba(255,255,255,0.1)", borderRadius: "1rem", padding: "0.75rem 1.5rem" }}>
            <span className="flex items-center gap-2" style={{ color: "#E14E40" }}>
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={3}>
                <path d="M12 2v4l10 6-10 6v-4" /><circle cx="3" cy="11" r="4" /><path d="M21 11c0 7-9 13-9 13L3 11c0-7 9-13 9-13z" />
              </svg>
            </span>
            <span>LISTEN IN — ABSOLUTELY FREE!</span>
            <span className="flex items-center gap-2" style={{ color: "#7C6FF0" }}>
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={3}>
                <rect x="2" y="6" width="20" height="14" rx="2" ry="2" /><path d="M6 2l3 6 5-5" />
              </svg>
            </span>
            <span>CERTIFICATE OPTION:<br/>QABA or IBAO Certificate<br/>available for ₦2,500.</span>
          </div>
          <div className="flex items-center gap-3" style={{ marginTop: "2rem", color: "#7BF0D4" }}>
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={3}>
              <path d="M12 2v4l10 6-10 6v-4" /><circle cx="3" cy="11" r="4" /><path d="M21 11c0 7-9 13-9 13L3 11c0-7 9-13 9-13z" />
            </svg>
            <span>THIS NOVEMBER, WE WILL BE KICKING OFF WITH Dr. Michael Mueller<br/>CEO OF IBAO, AS OUR FIRST PRESENTER.</span>
          </div>
          <p className="mt-8 text-center" style={{ color: "#FFF9F1" }}>
            <span className="inline-block rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-[0.16em]" style={{ background: "#E14E40" }}>Stay tuned for more exciting learning</span>
            <span className="inline-block rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-[0.16em]" style={{ background: "#E14E40" }}>with Nene and Helen!</span>
          </p>
        </div>
        <div className="absolute -bottom-5 left-8 -rotate-2 rounded-2xl bg-[#0B4A8E] px-5 py-3 text-white shadow-xl" style={{ bottom: "-60px" }}>
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth={3}>
            <path d="M12 2v4l10 6-10 6v-4" /><circle cx="3" cy="11" r="4" /><path d="M21 11c0 7-9 13-9 13L3 11c0-7 9-13 9-13z" />
          </svg>
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth={3}>
            <circle cx="12" cy="12" r="5" /><path d="M3 6h6l6 6 6-6h-6L3 6z M3 14h6l6 6 6-6h-6L3 14z" />
          </svg>
          <span className="text-xs font-black" style={{ color: "#E14E40" }}>International Behavior Analysis Organization<br/>Approved Content Provider</span>
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth={3}>
            <circle cx="12" cy="12" r="5" /><path d="M3 6h6l6 6 6-6h-6L3 6z M3 14h6l6 6 6-6h-6L3 14z" /></svg>
          <span className="text-xs font-black" style={{ color: "#0B7C69" }}>QABA APPROVED TRAINING PROGRAM</span>
        </div>
      </div>
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="relative block h-10 w-full sm:h-14" style={{ color: "#FFF9F1" }}><path d="M0,32 C240,60 480,0 720,24 C960,48 1200,8 1440,32 L1440,60 L0,60 Z" fill="currentColor" /></svg>
    </div>
  );
}
export default function Home() {
  const featured = courses.filter((c) => c.featured);
  const [evEmail, setEvEmail] = useState("");
  const [evDone, setEvDone] = useState<string | null>(null);
  return (
    <div>
      <Hero />
      {/* Stats */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div key={s.l} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="rounded-3xl border-2 border-[#2E2A3B]/10 bg-white p-6 text-center shadow-sm">
              <p className="font-display text-4xl font-semibold" style={{ color: s.c }}>{s.v}</p>
              <p className="mt-1 text-sm font-extrabold text-[#5B5570]">{s.l}</p>
            </motion.div>
          ))}
        </div>
      </section>
      {/* Featured courses */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <SectionHead eyebrow="Start earning today" color="#FF6B5B" title={<>Featured <span className="text-[#E14E40]">CEU courses</span></>} blurb="Our most-loved courses — on-demand, instantly accessible, certificates the moment you pass." />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.slice(0, 6).map((c, i) => <CourseCard key={c.id} course={c} index={i} />)}
        </div>
        <div className="mt-8 text-center">
          <Link to="/courses" className="inline-flex items-center gap-2 rounded-full bg-[#2E2A3B] px-7 py-3.5 text-sm font-black text-white transition hover:bg-[#FF6B5B]">View all {courses.length} courses & bundles <ArrowRight size={16} strokeWidth={3} /></Link>
        </div>
      </section>
      {/* How it works */}
      <section className="mt-14 bg-[#2E2A3B] py-16 text-white sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHead eyebrow="Ridiculously easy" color="#FFC93C" title={<>CEUs in <span className="text-[#FFC93C]">3 joyful steps</span></>} blurb="No webinars-at-midnight. No 6-week waits for certificates. Just great learning, on your schedule." />
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <motion.div key={s.t} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative rounded-[2rem] bg-white/[0.07] p-7 backdrop-blur">
                <span className="font-display absolute right-6 top-4 text-6xl font-semibold text-white/10">0{i + 1}</span>
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: s.c }}><s.icon size={26} className="text-white" strokeWidth={2.5} /></span>
                <h3 className="font-display mt-4 text-2xl font-semibold">{s.t}</h3>
                <p className="mt-2 text-sm font-medium leading-relaxed text-white/70">{s.d}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {assurances.map((a) => (
              <div key={a.t} className="flex gap-3 rounded-2xl border border-white/10 p-4">
                <a.icon size={22} className="shrink-0 text-[#FFC93C]" />
                <div><p className="text-sm font-black">{a.t}</p><p className="mt-0.5 text-xs font-medium text-white/60">{a.d}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Philosophy */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHead align="left" eyebrow="Why we're different" color="#0EA58C" title={<>We teach <span className="text-[#0B7C69]">Today's ABA</span> — because kids deserve it</>} blurb="Inspired by Dr. Greg Hanley's 'A Perspective on Today's ABA,' every Academy course is built on safety, dignity, assent, and joy. Compliance is out. Cooperation is in." />
            <div className="grid gap-4 sm:grid-cols-2">
              {pillars.map((p, i) => (
                <motion.div key={p.t} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="rounded-3xl border-2 border-[#2E2A3B]/10 bg-white p-5">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-white" style={{ background: p.c }}><p.icon size={22} strokeWidth={2.5} /></span>
                  <p className="font-display mt-3 text-lg font-semibold text-[#2E2A3B]">{p.t}</p>
                  <p className="mt-1 text-sm font-medium text-[#5B5570]">{p.d}</p>
                </motion.div>
              ))}
            </div>
            <Link to="/philosophy" className="mt-6 inline-flex items-center gap-2 font-black text-[#0B7C69] hover:underline">Read our full philosophy <ArrowRight size={16} strokeWidth={3} /></Link>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative">
            <img src="/images/joy-learning.jpg" alt="Children playing and learning together" className="h-[520px] w-full rounded-[2.5rem] object-cover shadow-2xl" />
            <div className="absolute bottom-6 left-6 right-6 rounded-3xl bg-white/95 p-5 shadow-xl backdrop-blur">
              <Quote size={22} className="text-[#FF6B5B]" />
              <p className="mt-2 font-display text-lg font-medium leading-snug text-[#2E2A3B]">“Ours is not to coerce, but to listen, learn, guide, and coach.”</p>
              <p className="mt-1 text-xs font-black uppercase tracking-widest text-[#5B5570]">Dr. Greg Hanley · A Perspective on Today's ABA</p>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Paths */}
      <section className="bg-[#FFF3E4] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHead eyebrow="Save with bundles" color="#7C6FF0" title={<>Learning paths, <span className="text-[#5B4ED6]">not random CEUs</span></>} blurb="Curated journeys that build real competence — and save you up to 20% versus buying courses solo." />
          <div className="grid gap-6 lg:grid-cols-3">
            {paths.map((p, i) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex flex-col rounded-[2rem] border-[3px] bg-white p-7" style={{ borderColor: p.color }}>
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-black text-white" style={{ background: p.color }}><Sparkles size={13} /> {p.level}</span>
                <h3 className="font-display mt-3 text-2xl font-semibold text-[#2E2A3B]">{p.title}</h3>
                <p className="mt-2 text-sm font-medium text-[#5B5570]">{p.blurb}</p>
                <ul className="mt-4 space-y-2">
                  {p.courseIds.map((id) => { const c = courses.find((x) => x.id === id)!; return (
                    <li key={id} className="flex items-start gap-2 text-sm font-bold text-[#2E2A3B]"><Check size={16} strokeWidth={3} className="mt-0.5 shrink-0" style={{ color: p.color }} /> {c.title} <span className="ml-auto shrink-0 text-xs text-[#5B5570]">{c.ceus} CEUs</span></li>
                  ); })}
                </ul>
                <div className="mt-5 flex items-baseline gap-2 border-t-2 border-dashed border-[#2E2A3B]/10 pt-4">
                  <span className="font-display text-3xl font-semibold">${p.price}</span>
                  <span className="text-sm font-bold text-[#5B5570]/60 line-through">${p.compareAt}</span>
                  <span className="ml-auto rounded-full px-3 py-1 text-xs font-black text-white" style={{ background: p.color }}>{p.totalCeus} CEUs</span>
                </div>
                <Link to="/paths" className="mt-4 rounded-full py-3 text-center text-sm font-black text-white transition hover:brightness-105" style={{ background: p.color }}>Explore this path</Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <SectionHead eyebrow="6,000+ five-star reviews" color="#FFC93C" title={<>Clinicians are <span className="squiggle-underline">raving</span></>} />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.figure key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 3) * 0.08 }} className="flex flex-col rounded-[2rem] border-2 border-[#2E2A3B]/10 bg-white p-6 shadow-sm">
              <Stars rating={t.rating} size={15} />
              <blockquote className="mt-3 flex-1 text-[15px] font-medium leading-relaxed text-[#2E2A3B]">“{t.quote}”</blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t-2 border-dashed border-[#2E2A3B]/10 pt-4">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full font-display text-sm font-semibold text-white" style={{ background: t.color }}>{t.name.split(" ").map((w) => w[0]).join("")}</span>
                <div><p className="text-sm font-black text-[#2E2A3B]">{t.name}</p><p className="text-xs font-bold text-[#5B5570]">{t.creds} · {t.course}</p></div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </section>
      {/* Live events */}
      <section className="bg-[#0EA58C] py-16 text-white sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <span className="inline-block rounded-full bg-white/20 px-4 py-1.5 text-xs font-black uppercase tracking-[0.16em]">Live & upcoming</span>
              <h2 className="font-display mt-4 text-3xl font-semibold sm:text-4xl">Don't just watch — join us live.</h2>
              <p className="mt-3 font-medium text-white/85">Free monthly workshops, journal clubs, and our flagship 6-week Immersion Cohort. Reserve your seat — free CEUs go fast.</p>
              <img src="/images/family-coaching.jpg" alt="Clinicians coaching a family" className="mt-6 hidden h-56 w-full rounded-[2rem] border-4 border-white/40 object-cover lg:block" />
            </div>
            <div className="space-y-4">
              {liveEvents.map((e) => (
                <div key={e.title} className="rounded-[1.75rem] bg-white p-6 text-[#2E2A3B] shadow-xl">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-black text-white" style={{ background: e.color }}><CalendarDays size={13} /> {e.date}</span>
                    <span className="text-xs font-black text-[#E14E40]">{e.seats} seats left</span>
                  </div>
                  <h3 className="font-display mt-2 text-xl font-semibold">{e.title}</h3>
                  <p className="text-sm font-bold text-[#5B5570]">{e.time}</p>
                  {evDone === e.title ? (
                    <p className="mt-3 flex items-center gap-2 rounded-2xl bg-[#D7F3E5] p-3 text-sm font-extrabold text-[#0B7C69]"><Check size={16} /> You're registered! Invite sent to {evEmail || "your inbox"}.</p>
                  ) : (
                    <form onSubmit={(ev) => { ev.preventDefault(); setEvDone(e.title); }} className="mt-3 flex gap-2">
                      <input type="email" required value={evEmail} onChange={(x) => setEvEmail(x.target.value)} placeholder="you@clinic.com" className="w-full min-w-0 rounded-full border-2 border-[#2E2A3B]/12 bg-[#FFF9F1] px-4 py-2.5 text-sm font-bold focus:border-[#0EA58C] focus:outline-none" />
                      <button className="shrink-0 rounded-full bg-[#2E2A3B] px-5 py-2.5 text-sm font-black text-white hover:bg-[#0EA58C]">Reserve free seat</button>
                    </form>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Instructors teaser */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <SectionHead eyebrow="Learn from practitioners" color="#3EA6FF" title={<>Instructors who still <span className="text-[#2B7FD4]">see clients</span></>} blurb="No talking heads reading slides. Our faculty run cases, coach families, and bring fresh session video to every course." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {instructors.map((i, idx) => (
            <motion.div key={i.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.07 }} className="rounded-[2rem] border-2 border-[#2E2A3B]/10 bg-white p-6 text-center">
              {i.image ? <img src={i.image} alt={i.name} className="mx-auto h-24 w-24 rounded-full border-4 object-cover" style={{ borderColor: i.color }} /> : <span className="font-display mx-auto flex h-24 w-24 items-center justify-center rounded-full text-3xl font-semibold text-white" style={{ background: i.color }}>{i.initials}</span>}
              <p className="font-display mt-3 text-lg font-semibold text-[#2E2A3B]">{i.name}</p>
              <p className="text-xs font-black" style={{ color: i.color }}>{i.creds}</p>
              <p className="mt-2 text-xs font-bold text-[#5B5570]">{i.learners.toLocaleString()} learners · ★ {i.rating.toFixed(1)}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-8 text-center"><Link to="/instructors" className="inline-flex items-center gap-2 rounded-full border-[3px] border-[#2E2A3B] px-7 py-3 text-sm font-black text-[#2E2A3B] transition hover:bg-[#2E2A3B] hover:text-white">Meet the faculty <ArrowRight size={16} strokeWidth={3} /></Link></div>
      </section>
      {/* FAQ teaser + CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="confetti-card rounded-[2.5rem] bg-[#FF6B5B] p-8 text-white sm:p-12">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-3xl font-semibold sm:text-4xl">Your next renewal cycle called — it wants to be joyful.</h2>
              <p className="mt-3 font-medium text-white/90">Join 24,000+ clinicians earning BACB + ASHA CEUs the play-first way. Start with a free workshop or dive into a bestseller today.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/courses" className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-black text-[#E14E40] shadow-lg transition hover:scale-[1.03]">Start earning CEUs <ArrowRight size={16} strokeWidth={3} /></Link>
                <Link to="/faq" className="inline-flex items-center gap-2 rounded-full border-[3px] border-white px-7 py-3 text-sm font-black text-white transition hover:bg-white hover:text-[#E14E40]">Questions? Read FAQ</Link>
              </div>
            </div>
            <div className="space-y-3">
              {faqs.slice(0, 3).map((f) => (
                <div key={f.q} className="rounded-2xl bg-white/15 p-4 backdrop-blur">
                  <p className="text-sm font-black">{f.q}</p>
                  <p className="mt-1 line-clamp-2 text-sm font-medium text-white/80">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
