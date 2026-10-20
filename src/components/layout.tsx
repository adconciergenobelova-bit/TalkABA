import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { GraduationCap, ShoppingCart, Menu, X, User, Trash2, ArrowRight, LogOut, LayoutDashboard, Award, Check, Sparkles, BadgeCheck } from "lucide-react";
import { courses } from "../lib/data";
import { useStore } from "../lib/store";

const links = [
  { to: "/courses", label: "Courses" },
  { to: "/paths", label: "Learning Paths" },
  { to: "/philosophy", label: "Our Philosophy" },
  { to: "/instructors", label: "Instructors" },
  { to: "/faq", label: "FAQ" },
];

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <span className="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FF6B5B] shadow-[0_6px_0_#E14E40] transition-transform hover:-rotate-6">
        <GraduationCap size={24} className="text-white" strokeWidth={2.5} />
        <span className="absolute -right-1.5 -top-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#FFC93C] text-[10px] font-black text-[#2E2A3B] ring-2 ring-[#FFF9F1]">+</span>
      </span>
      <span className="leading-none">
        <span className={`font-display block text-xl font-semibold tracking-tight ${light ? "text-white" : "text-[#2E2A3B]"}`}>Talk ABA<span className="text-[#FF6B5B]"> Academy</span></span>
        <span className={`block text-[10px] font-black uppercase tracking-[0.22em] ${light ? "text-white/70" : "text-[#5B5570]"}`}>CEUs · Today's ABA</span>
      </span>
    </Link>
  );
}

export function Navbar() {
  const { cart, setCartOpen, user, setAuthOpen, signOut } = useStore();
  const [mobile, setMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const nav = useNavigate();
  return (
    <header className="sticky top-0 z-40 border-b-2 border-[#2E2A3B]/8 bg-[#FFF9F1]/95 backdrop-blur-md print-hidden">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={({ isActive }) => `rounded-full px-4 py-2 text-sm font-extrabold transition ${isActive ? "bg-[#2E2A3B] text-white" : "text-[#5B5570] hover:bg-[#2E2A3B]/6 hover:text-[#2E2A3B]"}`}>{l.label}</NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={() => setCartOpen(true)} className="relative inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#2E2A3B]/6 text-[#2E2A3B] transition hover:bg-[#2E2A3B] hover:text-white" aria-label="Open cart">
            <ShoppingCart size={19} />
            {(cart?.length ?? 0) > 0 && <span className="absolute -right-1 -top-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#FF6B5B] text-[11px] font-black text-white ring-2 ring-[#FFF9F1]">{cart.length}</span>}
          </button>
          {user ? (
            <div className="relative">
              <button onClick={() => setMenuOpen((v) => !v)} className="inline-flex items-center gap-2 rounded-full bg-[#0EA58C] py-1.5 pl-1.5 pr-4 text-sm font-extrabold text-white shadow-[0_4px_0_#0B7C69] transition hover:brightness-105">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/25 font-display">{user.name.charAt(0).toUpperCase()}</span>
                <span className="hidden max-w-[120px] truncate sm:block">{user.name.split(" ")[0]}</span>
              </button>
              <AnimatePresence>
                {menuOpen && (
                  <motion.div initial={{ opacity: 0, y: 6, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 6, scale: 0.97 }} className="absolute right-0 mt-2 w-56 overflow-hidden rounded-2xl border-2 border-[#2E2A3B]/10 bg-white shadow-xl">
                    <div className="border-b border-[#2E2A3B]/8 px-4 py-3">
                      <p className="truncate text-sm font-extrabold text-[#2E2A3B]">{user.name}</p>
                      <p className="truncate text-xs font-semibold text-[#5B5570]">{user.email}</p>
                    </div>
                    <button onClick={() => { setMenuOpen(false); nav("/dashboard"); }} className="flex w-full items-center gap-2 px-4 py-3 text-sm font-extrabold text-[#2E2A3B] hover:bg-[#FFF3E4]"><LayoutDashboard size={16} /> My Dashboard</button>
                    <button onClick={() => { setMenuOpen(false); nav("/dashboard"); }} className="flex w-full items-center gap-2 px-4 py-3 text-sm font-extrabold text-[#2E2A3B] hover:bg-[#FFF3E4]"><Award size={16} /> My Certificates</button>
                    <button onClick={() => { setMenuOpen(false); signOut(); nav("/"); }} className="flex w-full items-center gap-2 border-t border-[#2E2A3B]/8 px-4 py-3 text-sm font-extrabold text-[#E14E40] hover:bg-[#FFE3DC]"><LogOut size={16} /> Sign out</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <button onClick={() => setAuthOpen(true)} className="hidden items-center gap-2 rounded-full bg-[#2E2A3B] px-5 py-2.5 text-sm font-extrabold text-white shadow-[0_4px_0_rgba(46,42,59,0.35)] transition hover:bg-[#FF6B5B] hover:shadow-[0_4px_0_#E14E40] sm:inline-flex">
              <User size={16} /> Sign in
            </button>
          )}
          <button onClick={() => setMobile((v) => !v)} className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#2E2A3B]/6 text-[#2E2A3B] lg:hidden" aria-label="Menu">
            {mobile ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {mobile && (
          <motion.nav initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-[#2E2A3B]/8 bg-[#FFF9F1] lg:hidden">
            <div className="space-y-1 px-4 py-4">
              {links.map((l) => (
                <NavLink key={l.to} to={l.to} onClick={() => setMobile(false)} className={({ isActive }) => `block rounded-2xl px-4 py-3 text-sm font-extrabold ${isActive ? "bg-[#2E2A3B] text-white" : "text-[#2E2A3B] hover:bg-[#FFF3E4]"}`}>{l.label}</NavLink>
              ))}
              {!user && <button onClick={() => { setMobile(false); setAuthOpen(true); }} className="block w-full rounded-2xl bg-[#FF6B5B] px-4 py-3 text-center text-sm font-extrabold text-white">Sign in / Create account</button>}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#2E2A3B] text-white print-hidden">
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="block h-10 w-full rotate-180" style={{ color: "#FFF9F1" }}><path d="M0,32 C240,60 480,0 720,24 C960,48 1200,8 1440,32 L1440,60 L0,60 Z" fill="currentColor" /></svg>
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Logo light />
            <p className="mt-4 max-w-xs text-sm font-medium leading-relaxed text-white/70">Joy-first continuing education for BCBAs, BCaBAs, RBTs & SLPs. Today's ABA, PFA & SBT — taught the way we practice: with play, dignity, and heart.</p>
            <div className="mt-4 flex items-center gap-2 rounded-2xl bg-white/10 p-3 text-xs font-bold text-white/80">
              <BadgeCheck size={18} className="shrink-0 text-[#0EA58C]" /> BACB ACE Provider OP-24-1107 · ASHA Approved CE Provider
            </div>
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-white/50">Learn</p>
            <ul className="mt-3 space-y-2 text-sm font-bold text-white/85">
              <li><Link to="/courses" className="hover:text-[#FFC93C]">All CEU Courses</Link></li>
              <li><Link to="/paths" className="hover:text-[#FFC93C]">Learning Paths & Bundles</Link></li>
              <li><Link to="/courses" className="hover:text-[#FFC93C]">Ethics CEUs</Link></li>
              <li><Link to="/courses" className="hover:text-[#FFC93C]">Supervision CEUs</Link></li>
              <li><Link to="/dashboard" className="hover:text-[#FFC93C]">My Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-white/50">Academy</p>
            <ul className="mt-3 space-y-2 text-sm font-bold text-white/85">
              <li><Link to="/philosophy" className="hover:text-[#FFC93C]">Our Philosophy</Link></li>
              <li><Link to="/instructors" className="hover:text-[#FFC93C]">Instructors</Link></li>
              <li><Link to="/faq" className="hover:text-[#FFC93C]">FAQ & Support</Link></li>
              <li><Link to="/verify" className="hover:text-[#FFC93C]">Verify a Certificate</Link></li>
              <li><Link to="/checkout" className="hover:text-[#FFC93C]">Group Enrollment</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-white/50">Get 1 Free CEU</p>
            <p className="mt-3 text-sm font-medium text-white/70">Join 24,000+ clinicians. First workshop free.</p>
            <NewsletterForm />
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs font-bold text-white/50 sm:flex-row">
          <p>© 2026 Talk ABA Academy · A division of Talk ABA, Inc., Fresno & Visalia CA</p>
          <p className="flex items-center gap-1.5"><Sparkles size={13} /> Inspired by Dr. Greg Hanley's “A Perspective on Today's ABA”</p>
        </div>
      </div>
    </footer>
  );
}

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return done ? (
    <p className="mt-3 flex items-center gap-2 rounded-2xl bg-[#0EA58C]/20 p-3 text-sm font-extrabold text-[#7BF0D4]"><Check size={16} /> You're in! Check your inbox for your free CEU.</p>
  ) : (
    <form onSubmit={(e) => { e.preventDefault(); if (email.includes("@")) setDone(true); }} className="mt-3 flex gap-2">
      <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required placeholder="you@clinic.com" className="w-full min-w-0 rounded-full border-2 border-white/15 bg-white/10 px-4 py-2.5 text-sm font-bold text-white placeholder:text-white/40 focus:border-[#FFC93C] focus:outline-none" />
      <button className="shrink-0 rounded-full bg-[#FFC93C] px-4 py-2.5 text-sm font-black text-[#2E2A3B] transition hover:brightness-105" aria-label="Subscribe"><ArrowRight size={16} /></button>
    </form>
  );
}

export function CartDrawer() {
  const { cartOpen, setCartOpen, cart, removeFromCart, user, setAuthOpen, enroll, clearCart } = useStore();
  const nav = useNavigate();
  const items = (cart || []).map((id) => courses.find((c) => c.id === id)!).filter(Boolean);
  const total = items.reduce((s, c) => s + c.price, 0);
  const savings = items.reduce((s, c) => s + (c.compareAt ? c.compareAt - c.price : 0), 0);
  const ceus = items.reduce((s, c) => s + c.ceus, 0);
  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setCartOpen(false)} className="fixed inset-0 z-50 bg-[#2E2A3B]/60 backdrop-blur-sm" />
          <motion.aside initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 30, stiffness: 300 }} className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-[#FFF9F1] shadow-2xl">
            <div className="flex items-center justify-between border-b-2 border-[#2E2A3B]/8 px-6 py-5">
              <h3 className="font-display text-xl font-semibold text-[#2E2A3B]">Your Cart ({items.length})</h3>
              <button onClick={() => setCartOpen(false)} className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#2E2A3B]/6 hover:bg-[#2E2A3B] hover:text-white" aria-label="Close cart"><X size={18} /></button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <span className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-[#2E2A3B]/6"><ShoppingCart size={30} className="text-[#5B5570]" /></span>
                  <p className="font-display mt-4 text-xl font-semibold text-[#2E2A3B]">Your cart is empty</p>
                  <p className="mt-1 text-sm font-semibold text-[#5B5570]">Let's fix that — your CEUs won't earn themselves.</p>
                  <button onClick={() => { setCartOpen(false); nav("/courses"); }} className="mt-5 rounded-full bg-[#FF6B5B] px-6 py-3 text-sm font-extrabold text-white shadow-[0_4px_0_#E14E40]">Browse courses</button>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map((c) => (
                    <li key={c.id} className="flex gap-3 rounded-2xl border-2 border-[#2E2A3B]/8 bg-white p-3">
                      <img src={c.image} alt="" className="h-20 w-20 shrink-0 rounded-xl object-cover" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-extrabold text-[#2E2A3B]">{c.title}</p>
                        <p className="mt-0.5 text-xs font-bold text-[#5B5570]">{c.ceus} CEUs · {c.format}</p>
                        <div className="mt-1 flex items-center justify-between">
                          <p className="font-display text-lg font-semibold">${c.price}</p>
                          <button onClick={() => removeFromCart(c.id)} className="inline-flex items-center gap-1 text-xs font-extrabold text-[#E14E40] hover:underline"><Trash2 size={13} /> Remove</button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {items.length > 0 && (
              <div className="border-t-2 border-[#2E2A3B]/8 bg-white px-6 py-5">
                <div className="flex justify-between text-sm font-bold text-[#5B5570]"><span>Total CEUs</span><span className="font-black text-[#0EA58C]">{ceus} CEUs</span></div>
                {savings > 0 && <div className="mt-1 flex justify-between text-sm font-bold text-[#5B5570]"><span>You're saving</span><span className="font-black text-[#0EA58C]">${savings}</span></div>}
                <div className="mt-1 flex justify-between text-base font-black text-[#2E2A3B]"><span>Total</span><span className="font-display text-2xl">${total}</span></div>
                <button
                  onClick={() => {
                    if (!user) { setCartOpen(false); setAuthOpen(true); return; }
                    enroll(cart); clearCart(); setCartOpen(false); nav("/dashboard");
                  }}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#FF6B5B] px-6 py-3.5 text-sm font-black text-white shadow-[0_5px_0_#E14E40] transition hover:brightness-105 active:translate-y-0.5 active:shadow-none"
                >{user ? "Enroll now — start learning" : "Sign in to enroll"} <ArrowRight size={16} /></button>
                <p className="mt-3 text-center text-xs font-bold text-[#5B5570]">30-day happiness guarantee · Instant certificates · Lifetime access</p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export function AuthModal() {
  const { authOpen, setAuthOpen, signIn } = useStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [creds, setCreds] = useState("BCBA");
  return (
    <AnimatePresence>
      {authOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setAuthOpen(false)} className="fixed inset-0 z-50 bg-[#2E2A3B]/60 backdrop-blur-sm" />
          <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0, scale: 0.92, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.92, y: 20 }} className="pointer-events-auto w-full max-w-md overflow-hidden rounded-[2rem] bg-white shadow-2xl">
              <div className="confetti-card bg-[#7C6FF0] px-6 py-6 text-white">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-white/70">Welcome to the Academy</p>
                    <h3 className="font-display mt-1 text-2xl font-semibold">Sign in to earn CEUs</h3>
                  </div>
                  <button onClick={() => setAuthOpen(false)} className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/20 hover:bg-white/30" aria-label="Close"><X size={17} /></button>
                </div>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!name.trim() || !email.includes("@")) return;
                  signIn({ name: name.trim(), email: email.trim(), creds });
                  setAuthOpen(false);
                }}
                className="space-y-4 px-6 py-6"
              >
                <div>
                  <label className="text-xs font-black uppercase tracking-widest text-[#5B5570]">Full name (for certificates)</label>
                  <input value={name} onChange={(e) => setName(e.target.value)} required placeholder="Jordan Taylor" className="mt-1.5 w-full rounded-2xl border-2 border-[#2E2A3B]/12 bg-[#FFF9F1] px-4 py-3 text-sm font-bold text-[#2E2A3B] focus:border-[#7C6FF0] focus:outline-none" />
                </div>
                <div>
                  <label className="text-xs font-black uppercase tracking-widest text-[#5B5570]">Email</label>
                  <input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" placeholder="you@clinic.com" className="mt-1.5 w-full rounded-2xl border-2 border-[#2E2A3B]/12 bg-[#FFF9F1] px-4 py-3 text-sm font-bold text-[#2E2A3B] focus:border-[#7C6FF0] focus:outline-none" />
                </div>
                <div>
                  <label className="text-xs font-black uppercase tracking-widest text-[#5B5570]">Credential</label>
                  <div className="mt-1.5 flex flex-wrap gap-2">
                    {["BCBA", "BCaBA", "RBT", "SLP-CCC", "Student", "Other"].map((c) => (
                      <button type="button" key={c} onClick={() => setCreds(c)} className={`rounded-full px-4 py-2 text-xs font-black transition ${creds === c ? "bg-[#2E2A3B] text-white" : "bg-[#2E2A3B]/6 text-[#5B5570] hover:bg-[#2E2A3B]/10"}`}>{c}</button>
                    ))}
                  </div>
                </div>
                <button className="w-full rounded-full bg-[#7C6FF0] px-6 py-3.5 text-sm font-black text-white shadow-[0_5px_0_#5B4ED6] transition hover:brightness-105 active:translate-y-0.5 active:shadow-none">Create my free account</button>
                <p className="text-center text-xs font-semibold text-[#5B5570]">Free forever · No card required · Your CEU transcript lives here</p>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
