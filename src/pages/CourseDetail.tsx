import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Award, BadgeCheck, BarChart3, Check, Clock, FileText, Heart, Infinity as InfinityIcon, ListVideo, MonitorPlay, PenLine, Play, ShieldCheck, ShoppingCart, Users } from "lucide-react";
import { courseBySlug, courses, instructorOf, testimonials } from "../lib/data";
import { CeuBadge, Stars } from "../components/ui";
import { useStore } from "../lib/store";

const kindIcon = (k: string) => (k === "video" ? MonitorPlay : k === "reading" ? FileText : k === "activity" ? PenLine : ListVideo);

export default function CourseDetail() {
  const { slug } = useParams();
  const nav = useNavigate();
  const course = courseBySlug(slug ?? "");
  const { addToCart, isEnrolled, wishlist, toggleWishlist, enroll, user, setAuthOpen } = useStore();
  if (!course) return <div className="mx-auto max-w-3xl px-4 py-24 text-center"><p className="font-display text-3xl font-semibold">Course not found</p><Link to="/courses" className="mt-4 inline-block rounded-full bg-[#2E2A3B] px-6 py-3 text-sm font-black text-white">Back to catalog</Link></div>;
  const inst = instructorOf(course.instructorId);
  const enrolled = isEnrolled(course.id);
  const wished = wishlist.includes(course.id);
  const related = courses.filter((c) => c.id !== course.id && c.category === course.category).slice(0, 3);
  const relFallback = related.length > 0 ? related : courses.filter((c) => c.id !== course.id).slice(0, 3);
  const totalMin = course.modules.flatMap((m) => m.lessons).reduce((s, l) => s + l.minutes, 0);
  const courseReviews = testimonials.slice(0, 2);

  return (
    <div>
      <div className="relative overflow-hidden" style={{ background: `linear-gradient(135deg, #2E2A3B 0%, ${course.color}55 130%)` }}>
        <div className="dot-grid-light absolute inset-0 opacity-40" />
        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <button onClick={() => nav(-1)} className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-xs font-black text-white backdrop-blur hover:bg-white/20"><ArrowLeft size={14} /> Back</button>
          <div className="mt-5 grid gap-8 lg:grid-cols-[1.4fr_0.9fr]">
            <div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full px-3 py-1.5 text-xs font-black text-white" style={{ background: course.color }}>{course.category}</span>
                <CeuBadge ceus={course.ceus} types={course.ceuTypes} dark />
                <span className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-black text-white">{course.format}</span>
              </div>
              <h1 className="font-display mt-4 text-3xl font-semibold leading-tight text-white sm:text-5xl">{course.title}</h1>
              <p className="mt-3 max-w-2xl text-lg font-medium text-white/85">{course.tagline}</p>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm font-bold text-white/85">
                <span className="flex items-center gap-1.5"><span className="font-black text-white">{course.rating.toFixed(1)}</span><Stars rating={course.rating} /> <span>({course.reviews.toLocaleString()} reviews)</span></span>
                <span className="flex items-center gap-1.5"><Users size={15} /> {course.learners.toLocaleString()} learners</span>
              </div>
              <div className="mt-4 flex items-center gap-3">
                {inst.image ? <img src={inst.image} alt={inst.name} className="h-12 w-12 rounded-full border-2 border-white/50 object-cover" /> : <span className="font-display inline-flex h-12 w-12 items-center justify-center rounded-full text-white" style={{ background: inst.color }}>{inst.initials}</span>}
                <div><p className="text-sm font-black text-white">Created by {inst.name}, {inst.creds}</p><p className="text-xs font-bold text-white/70">{inst.role}</p></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.9fr]">
          <div className="space-y-8">
            <div className="relative -mt-24 overflow-hidden rounded-[2rem] border-4 border-white shadow-2xl lg:hidden">
              <img src={course.image} alt={course.title} className="h-56 w-full object-cover" />
            </div>
            <section className="rounded-[2rem] border-2 border-[#2E2A3B]/10 bg-white p-6 sm:p-8">
              <h2 className="font-display text-2xl font-semibold text-[#2E2A3B]">What you'll be able to do</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {course.outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-2.5 rounded-2xl bg-[#FFF9F1] p-3.5 text-sm font-bold text-[#2E2A3B]"><span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white" style={{ background: course.color }}><Check size={13} strokeWidth={3.5} /></span>{o}</li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-2">
                {course.tags.map((t) => <span key={t} className="rounded-full bg-[#2E2A3B]/6 px-3 py-1.5 text-xs font-black text-[#5B5570]">#{t}</span>)}
              </div>
            </section>
            <section className="rounded-[2rem] border-2 border-[#2E2A3B]/10 bg-white p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-2xl font-semibold text-[#2E2A3B]">Course content</h2>
                <span className="text-xs font-black text-[#5B5570]">{course.modules.length} modules · {totalMin} min total</span>
              </div>
              <div className="mt-4 space-y-4">
                {course.modules.map((m, mi) => (
                  <div key={m.id} className="overflow-hidden rounded-3xl border-2 border-[#2E2A3B]/8">
                    <div className="flex items-center gap-3 px-5 py-4" style={{ background: course.soft }}>
                      <span className="font-display inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white" style={{ background: course.color }}>{mi + 1}</span>
                      <div><p className="font-black text-[#2E2A3B]">{m.title}</p><p className="text-xs font-bold text-[#5B5570]">{m.blurb}</p></div>
                    </div>
                    <ul className="divide-y divide-[#2E2A3B]/6 bg-white">
                      {m.lessons.map((l) => { const Icon = kindIcon(l.kind); return (
                        <li key={l.id} className="flex items-center gap-3 px-5 py-3.5">
                          <Icon size={17} className="shrink-0 text-[#5B5570]" />
                          <p className="flex-1 text-sm font-bold text-[#2E2A3B]">{l.title}</p>
                          {l.free && <span className="rounded-full bg-[#0EA58C]/10 px-2.5 py-1 text-[11px] font-black text-[#0B7C69]">FREE PREVIEW</span>}
                          <span className="text-xs font-bold text-[#5B5570]">{l.minutes} min</span>
                        </li>
                      ); })}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
            <section className="rounded-[2rem] bg-[#2E2A3B] p-6 text-white sm:p-8">
              <h2 className="font-display text-2xl font-semibold">Meet your instructor</h2>
              <div className="mt-4 flex flex-col gap-4 sm:flex-row">
                {inst.image ? <img src={inst.image} alt={inst.name} className="h-28 w-28 shrink-0 rounded-3xl border-4 object-cover" style={{ borderColor: inst.color }} /> : <span className="font-display flex h-28 w-28 shrink-0 items-center justify-center rounded-3xl text-4xl font-semibold text-white" style={{ background: inst.color }}>{inst.initials}</span>}
                <div>
                  <p className="font-display text-xl font-semibold">{inst.name} <span className="text-base" style={{ color: course.color === "#FFC93C" ? "#FFC93C" : course.color }}>{inst.creds}</span></p>
                  <p className="text-xs font-black uppercase tracking-widest text-white/50">{inst.role}</p>
                  <p className="mt-2 text-sm font-medium leading-relaxed text-white/75">{inst.bio}</p>
                  <div className="mt-3 flex flex-wrap gap-2">{inst.specialties.map((s) => <span key={s} className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white/80">{s}</span>)}</div>
                </div>
              </div>
            </section>
            <section className="rounded-[2rem] border-2 border-[#2E2A3B]/10 bg-white p-6 sm:p-8">
              <h2 className="font-display text-2xl font-semibold text-[#2E2A3B]">Learner love</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {courseReviews.map((t) => (
                  <figure key={t.name} className="rounded-3xl bg-[#FFF9F1] p-5">
                    <Stars rating={5} />
                    <blockquote className="mt-2 text-sm font-medium text-[#2E2A3B]">“{t.quote}”</blockquote>
                    <figcaption className="mt-3 text-xs font-black text-[#5B5570]">{t.name} · {t.creds}</figcaption>
                  </figure>
                ))}
              </div>
            </section>
            {relFallback.length > 0 && (
              <section>
                <h2 className="font-display text-2xl font-semibold text-[#2E2A3B]">Keep the streak going</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  {relFallback.map((c) => (
                    <Link key={c.id} to={`/courses/${c.slug}`} className="group overflow-hidden rounded-3xl border-2 border-[#2E2A3B]/10 bg-white">
                      <img src={c.image} alt="" className="h-28 w-full object-cover transition group-hover:scale-105" />
                      <div className="p-4"><p className="line-clamp-2 text-sm font-black text-[#2E2A3B]">{c.title}</p><p className="mt-1 text-xs font-bold text-[#5B5570]">{c.ceus} CEUs · ${c.price}</p></div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:sticky lg:top-24">
              <div className="hidden overflow-hidden rounded-[2rem] border-4 border-white shadow-2xl lg:block">
                <div className="relative">
                  <img src={course.image} alt={course.title} className="h-56 w-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-[#2E2A3B]/30">
                    <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#2E2A3B] shadow-xl transition hover:scale-110"><Play size={24} className="ml-1 fill-current" /></span>
                  </div>
                </div>
              </div>
              <div className="mt-0 overflow-hidden rounded-[2rem] border-2 border-[#2E2A3B]/10 bg-white shadow-xl lg:-mt-10 lg:rounded-t-[2rem]">
                <div className="p-6">
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-4xl font-semibold text-[#2E2A3B]">${course.price}</span>
                    {course.compareAt && <><span className="text-lg font-bold text-[#5B5570]/50 line-through">${course.compareAt}</span><span className="rounded-full bg-[#E14E40]/10 px-2.5 py-1 text-xs font-black text-[#E14E40]">SAVE ${course.compareAt - course.price}</span></>}
                  </div>
                  <div className="mt-3 flex items-center gap-2 rounded-2xl bg-[#D7F3E5] p-3 text-sm font-extrabold text-[#0B7C69]"><Award size={17} /> Earns {course.ceus} CEUs · {course.ceuTypes.join(" + ")}</div>
                  {enrolled ? (
                    <Link to={`/learn/${course.slug}`} className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#0EA58C] px-6 py-4 text-base font-black text-white shadow-[0_5px_0_#0B7C69] transition hover:brightness-105"><Play size={18} /> Continue learning</Link>
                  ) : (
                    <div className="mt-4 space-y-2.5">
                      <button onClick={() => { if (!user) { setAuthOpen(true); return; } enroll([course.id]); nav(`/learn/${course.slug}`); }} className="w-full rounded-full px-6 py-4 text-base font-black text-white shadow-[0_5px_0_rgba(0,0,0,0.25)] transition hover:brightness-105" style={{ background: course.color === "#FFC93C" ? "#E0A81A" : course.color }}>Enroll now — instant access</button>
                      <div className="flex gap-2.5">
                        <button onClick={() => addToCart(course.id)} className="flex flex-1 items-center justify-center gap-2 rounded-full border-[3px] border-[#2E2A3B] px-4 py-2.5 text-sm font-black text-[#2E2A3B] transition hover:bg-[#2E2A3B] hover:text-white"><ShoppingCart size={16} /> Add to cart</button>
                        <button onClick={() => toggleWishlist(course.id)} aria-label="Wishlist" className={`inline-flex w-12 items-center justify-center rounded-full border-[3px] transition ${wished ? "border-[#FF6B5B] bg-[#FF6B5B] text-white" : "border-[#2E2A3B]/15 text-[#5B5570] hover:border-[#FF6B5B] hover:text-[#FF6B5B]"}`}><Heart size={17} className={wished ? "fill-current" : ""} /></button>
                      </div>
                    </div>
                  )}
                  <div className="mt-5 space-y-2.5 border-t-2 border-dashed border-[#2E2A3B]/10 pt-5 text-sm font-bold text-[#5B5570]">
                    <p className="flex items-center gap-2.5"><Clock size={16} /> {course.hours} hours on-demand video + resources</p>
                    <p className="flex items-center gap-2.5"><BarChart3 size={16} /> {course.level} level · {course.lessonsCount} lessons</p>
                    <p className="flex items-center gap-2.5"><InfinityIcon size={16} /> Lifetime access + free updates</p>
                    <p className="flex items-center gap-2.5"><BadgeCheck size={16} /> {course.bacbEvent}</p>
                    <p className="flex items-center gap-2.5"><ShieldCheck size={16} /> 30-day happiness guarantee</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
