import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Clock, BarChart3, Award, Heart, ShoppingCart, Play, Check } from "lucide-react";
import type { Course } from "../lib/data";
import { instructorOf } from "../lib/data";
import { useStore } from "../lib/store";

export function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={size} className={i <= Math.round(rating) ? "fill-[#FFC93C] text-[#E0A81A]" : "text-[#D8D2C4]"} strokeWidth={2.5} />
      ))}
    </span>
  );
}

export function CeuBadge({ ceus, types, dark = false }: { ceus: number; types: string[]; dark?: boolean }) {
  const label = types.includes("BACB Ethics") ? "Ethics CEUs" : types.includes("BACB Supervision") ? "Supervision CEUs" : "CEUs";
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-extrabold ${dark ? "bg-white/20 text-white" : "bg-[#2E2A3B] text-white"}`}>
      <Award size={13} strokeWidth={2.75} />
      {ceus} {label}
      {types.includes("ASHA") ? " · ASHA" : ""}
    </span>
  );
}

export function CourseCard({ course, index = 0 }: { course: Course; index?: number }) {
  const { addToCart, isEnrolled, wishlist, toggleWishlist } = useStore();
  const inst = instructorOf(course.instructorId);
  const enrolled = isEnrolled(course.id);
  const wished = wishlist.includes(course.id);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border-2 border-[#2E2A3B]/10 bg-white shadow-[0_10px_30px_-12px_rgba(46,42,59,0.25)] transition-transform duration-300 hover:-translate-y-1.5"
    >
      <Link to={`/courses/${course.slug}`} className="relative block overflow-hidden">
        <img src={course.image} alt={course.title} className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2E2A3B]/55 via-transparent to-transparent" />
        <div className="absolute left-3 top-3 flex gap-2">
          {course.bestseller && <span className="rounded-full bg-[#FFC93C] px-3 py-1 text-[11px] font-black uppercase tracking-wide text-[#2E2A3B]">Bestseller</span>}
          {course.new && <span className="rounded-full bg-[#0EA58C] px-3 py-1 text-[11px] font-black uppercase tracking-wide text-white">New</span>}
          {course.format === "Live Cohort" && <span className="rounded-full bg-[#FF6B5B] px-3 py-1 text-[11px] font-black uppercase tracking-wide text-white">Live</span>}
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
          <CeuBadge ceus={course.ceus} types={course.ceuTypes} dark />
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-[#2E2A3B] opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100">
            <Play size={18} className="ml-0.5 fill-current" />
          </span>
        </div>
      </Link>
      <button
        onClick={() => toggleWishlist(course.id)}
        aria-label="Save to wishlist"
        className={`absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full shadow-md transition ${wished ? "bg-[#FF6B5B] text-white" : "bg-white/95 text-[#2E2A3B] hover:text-[#FF6B5B]"}`}
      >
        <Heart size={16} className={wished ? "fill-current" : ""} />
      </button>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <p className="text-[11px] font-black uppercase tracking-[0.14em]" style={{ color: course.color === "#FFC93C" ? "#B8860B" : course.color }}>{course.category}</p>
        <Link to={`/courses/${course.slug}`} className="font-display text-lg font-semibold leading-snug text-[#2E2A3B] hover:underline decoration-2 underline-offset-4" style={{ textDecorationColor: course.color }}>
          {course.title}
        </Link>
        <p className="text-sm font-medium text-[#5B5570]">{inst.name}, {inst.creds}</p>
        <div className="flex items-center gap-2 text-sm">
          <span className="font-black text-[#2E2A3B]">{course.rating.toFixed(1)}</span>
          <Stars rating={course.rating} />
          <span className="font-semibold text-[#5B5570]">({course.reviews.toLocaleString()})</span>
        </div>
        <div className="flex items-center gap-4 text-xs font-bold text-[#5B5570]">
          <span className="inline-flex items-center gap-1"><Clock size={13} /> {course.hours}h</span>
          <span className="inline-flex items-center gap-1"><BarChart3 size={13} /> {course.level}</span>
          <span className="inline-flex items-center gap-1"><Play size={13} /> {course.lessonsCount} lessons</span>
        </div>
        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-2xl font-semibold text-[#2E2A3B]">${course.price}</span>
            {course.compareAt && <span className="text-sm font-bold text-[#5B5570]/60 line-through">${course.compareAt}</span>}
          </div>
          {enrolled ? (
            <Link to={`/learn/${course.slug}`} className="inline-flex items-center gap-1.5 rounded-full bg-[#0EA58C] px-4 py-2.5 text-sm font-extrabold text-white hover:bg-[#0B7C69]">
              <Check size={15} strokeWidth={3} /> Continue
            </Link>
          ) : (
            <button onClick={() => addToCart(course.id)} className="inline-flex items-center gap-1.5 rounded-full bg-[#2E2A3B] px-4 py-2.5 text-sm font-extrabold text-white transition hover:bg-[#FF6B5B]">
              <ShoppingCart size={15} strokeWidth={2.75} /> Enroll
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function SectionHead({ eyebrow, title, blurb, color = "#FF6B5B", align = "center" }: { eyebrow: string; title: React.ReactNode; blurb?: string; color?: string; align?: "center" | "left" }) {
  const centered = align === "center";
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className={`mb-10 max-w-2xl ${centered ? "mx-auto text-center" : "text-left"}`}
    >
      <span className="inline-block rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-white" style={{ background: color }}>{eyebrow}</span>
      <h2 className="font-display mt-4 text-3xl font-semibold leading-tight text-[#2E2A3B] sm:text-4xl">{title}</h2>
      {blurb && <p className="mt-3 text-base font-medium leading-relaxed text-[#5B5570] sm:text-lg">{blurb}</p>}
    </motion.div>
  );
}

export function PageHero({ eyebrow, title, blurb, color, children, image }: { eyebrow: string; title: React.ReactNode; blurb?: string; color: string; children?: React.ReactNode; image?: string }) {
  return (
    <div className="relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${color} 0%, ${color}DD 55%, ${color}B3 100%)` }}>
      <div className="dot-grid-light absolute inset-0 opacity-60" />
      <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10" />
      <div className="absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-black/10" />
      <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:px-8">
        <div>
          <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="inline-block rounded-full bg-white/20 px-4 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-white backdrop-blur">{eyebrow}</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="font-display mt-4 text-4xl font-semibold leading-[1.05] text-white sm:text-5xl">{title}</motion.h1>
          {blurb && <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }} className="mt-4 max-w-xl text-lg font-medium text-white/90">{blurb}</motion.p>}
          {children && <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }} className="mt-6 flex flex-wrap gap-3">{children}</motion.div>}
        </div>
        {image && (
          <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="relative hidden lg:block">
            <img src={image} alt="" className="h-72 w-full rotate-2 rounded-[2rem] border-4 border-white/60 object-cover shadow-2xl" />
            <div className="absolute -bottom-4 -left-4 -rotate-3 rounded-2xl bg-white px-4 py-2 shadow-xl">
              <Stars rating={5} /> <span className="ml-1 text-sm font-black text-[#2E2A3B]">4.9 · 6,000+ reviews</span>
            </div>
          </motion.div>
        )}
      </div>
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="relative block h-10 w-full sm:h-14" style={{ color: "#FFF9F1" }}><path d="M0,32 C240,60 480,0 720,24 C960,48 1200,8 1440,32 L1440,60 L0,60 Z" fill="currentColor" /></svg>
    </div>
  );
}
