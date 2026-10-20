import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, Check, Compass, PiggyBank, Route, ShoppingCart, Sprout } from "lucide-react";
import { courses, paths } from "../lib/data";
import { PageHero, Stars } from "../components/ui";
import { useStore } from "../lib/store";

const iconMap: Record<string, typeof Sprout> = { Sprout, Compass, BadgeCheck };

export default function Paths() {
  const { addToCart, enrollments } = useStore();
  return (
    <div>
      <PageHero eyebrow="Bundles & learning paths" color="#7C6FF0" title={<>Stop collecting random CEUs.<br />Start building mastery.</>} blurb="Curated course journeys with one checkout, one transcript line, and up to 20% off. The smart way to renew." image="/images/play-home.jpg" />
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">
        {paths.map((p, pi) => {
          const Icon = iconMap[p.icon] ?? Route;
          const owned = p.courseIds.filter((id) => enrollments[id]).length;
          return (
            <motion.div key={p.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} className="overflow-hidden rounded-[2.5rem] border-[3px] bg-white" style={{ borderColor: p.color }}>
              <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
                <div className="p-7 sm:p-10" style={{ background: `linear-gradient(150deg, ${p.soft}, #fff)` }}>
                  <span className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-black text-white" style={{ background: p.color }}><Icon size={14} /> PATH {pi + 1} · {p.level.toUpperCase()}</span>
                  <h2 className="font-display mt-4 text-3xl font-semibold text-[#2E2A3B] sm:text-4xl">{p.title}</h2>
                  <p className="mt-3 font-medium text-[#5B5570]">{p.blurb}</p>
                  <div className="mt-5 flex items-center gap-3">
                    <span className="font-display text-5xl font-semibold text-[#2E2A3B]">${p.price}</span>
                    <span className="text-lg font-bold text-[#5B5570]/50 line-through">${p.compareAt}</span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#0EA58C] px-3 py-1.5 text-xs font-black text-white"><PiggyBank size={13} /> SAVE ${p.compareAt - p.price}</span>
                  </div>
                  <p className="mt-1 text-sm font-black" style={{ color: p.deep }}>{p.totalCeus} total CEUs · {p.courseIds.length} courses · Lifetime access</p>
                  {owned > 0 && <p className="mt-2 text-xs font-black text-[#0B7C69]">✓ You already own {owned} of {p.courseIds.length} — you'll only be charged for the rest at checkout.</p>}
                  <div className="mt-5 flex flex-wrap gap-2.5">
                    <button onClick={() => p.courseIds.filter((id) => !enrollments[id]).forEach((id) => addToCart(id))} className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-black text-white transition hover:brightness-105" style={{ background: p.color }}><ShoppingCart size={16} /> Add bundle to cart</button>
                  </div>
                </div>
                <div className="space-y-3 p-6 sm:p-8">
                  {p.courseIds.map((id, i) => {
                    const c = courses.find((x) => x.id === id)!;
                    const own = Boolean(enrollments[id]);
                    return (
                      <div key={id} className="relative flex gap-4 rounded-3xl border-2 border-[#2E2A3B]/8 bg-[#FFF9F1] p-3">
                        {i < p.courseIds.length - 1 && <span className="absolute -bottom-[14px] left-[52px] z-10 h-[14px] w-[3px]" style={{ background: p.color }} />}
                        <span className="font-display absolute -left-1 -top-1 inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold text-white shadow" style={{ background: p.color }}>{i + 1}</span>
                        <img src={c.image} alt="" className="h-24 w-24 shrink-0 rounded-2xl object-cover sm:h-28 sm:w-32" />
                        <div className="min-w-0 flex-1">
                          <p className="line-clamp-1 text-sm font-black text-[#2E2A3B]">{c.title}</p>
                          <p className="mt-0.5 text-xs font-bold text-[#5B5570]">{c.ceus} CEUs · {c.hours}h · {c.level}</p>
                          <div className="mt-1"><Stars rating={c.rating} size={12} /></div>
                          <div className="mt-1.5 flex items-center gap-2">
                            <Link to={`/courses/${c.slug}`} className="inline-flex items-center gap-1 text-xs font-black hover:underline" style={{ color: p.deep }}>View course <ArrowRight size={12} strokeWidth={3} /></Link>
                            {own && <span className="inline-flex items-center gap-1 rounded-full bg-[#D7F3E5] px-2 py-0.5 text-[10px] font-black text-[#0B7C69]"><Check size={10} strokeWidth={4} /> OWNED</span>}
                          </div>
                        </div>
                        <span className="font-display self-center text-xl font-semibold text-[#2E2A3B]">${c.price}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          );
        })}
        <div className="rounded-[2.5rem] bg-[#2E2A3B] p-8 text-center text-white sm:p-10">
          <h2 className="font-display text-3xl font-semibold">Enrolling your whole team?</h2>
          <p className="mx-auto mt-2 max-w-xl font-medium text-white/70">Clinics & districts save 20% on 5+ seats and 30% on 15+, with a shared dashboard to track every clinician's CEUs.</p>
          <Link to="/checkout" className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#FFC93C] px-7 py-3.5 text-sm font-black text-[#2E2A3B] hover:brightness-105">Get a group quote <ArrowRight size={16} strokeWidth={3} /></Link>
        </div>
      </div>
    </div>
  );
}
