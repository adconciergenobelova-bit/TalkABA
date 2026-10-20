import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, BadgeCheck, Building2, Check, CreditCard, PartyPopper, ShieldCheck, Trash2, Users } from "lucide-react";
import { courses } from "../lib/data";
import { useStore } from "../lib/store";

export default function Checkout() {
  const { cart, removeFromCart, user, setAuthOpen, enroll, clearCart } = useStore();
  const nav = useNavigate();
  const [seats, setSeats] = useState(1);
  const [org, setOrg] = useState("");
  const [done, setDone] = useState(false);
  const [pay, setPay] = useState({ name: "", card: "", exp: "", cvc: "" });
  const items = cart.map((id) => courses.find((c) => c.id === id)!).filter(Boolean);
  const subtotal = items.reduce((s, c) => s + c.price, 0) * seats;
  const discount = seats >= 15 ? 0.3 : seats >= 5 ? 0.2 : 0;
  const total = Math.round(subtotal * (1 - discount));
  const ceus = items.reduce((s, c) => s + c.ceus, 0);

  if (done) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", damping: 12 }}>
          <span className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-[#D7F3E5]"><PartyPopper size={42} className="text-[#0B7C69]" /></span>
        </motion.div>
        <h1 className="font-display mt-5 text-4xl font-semibold text-[#2E2A3B]">You're enrolled! 🎉</h1>
        <p className="mt-2 font-medium text-[#5B5570]">Receipt sent to {user?.email}. {seats > 1 ? `${seats} team seats are ready — invite links are in your dashboard.` : "Your courses are unlocked and waiting in your dashboard."}</p>
        <div className="mx-auto mt-6 max-w-md rounded-3xl border-2 border-[#2E2A3B]/10 bg-white p-5 text-left">
          {items.map((c) => <p key={c.id} className="flex items-center gap-2 py-1 text-sm font-black text-[#2E2A3B]"><Check size={15} strokeWidth={3.5} className="text-[#0EA58C]" /> {c.title}</p>)}
          <p className="mt-2 border-t-2 border-dashed border-[#2E2A3B]/10 pt-2 text-sm font-black text-[#0B7C69]">{ceus} CEUs on the way · ${total} paid</p>
        </div>
        <button onClick={() => nav("/dashboard")} className="mt-6 rounded-full bg-[#0EA58C] px-8 py-4 text-base font-black text-white shadow-[0_5px_0_#0B7C69]">Start learning now →</button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <Link to="/courses" className="inline-flex items-center gap-1.5 rounded-full bg-[#2E2A3B]/6 px-4 py-2 text-xs font-black text-[#2E2A3B] hover:bg-[#2E2A3B] hover:text-white"><ArrowLeft size={14} /> Keep browsing</Link>
      <h1 className="font-display mt-4 text-4xl font-semibold text-[#2E2A3B]">Checkout</h1>
      {items.length === 0 ? (
        <div className="mt-6 rounded-[2rem] border-2 border-dashed border-[#2E2A3B]/20 bg-white p-12 text-center">
          <p className="font-display text-2xl font-semibold text-[#2E2A3B]">Your cart is empty</p>
          <Link to="/courses" className="mt-4 inline-block rounded-full bg-[#FF6B5B] px-6 py-3 text-sm font-black text-white">Browse courses</Link>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-5">
            <section className="rounded-[2rem] border-2 border-[#2E2A3B]/10 bg-white p-6">
              <h2 className="font-display flex items-center gap-2 text-xl font-semibold text-[#2E2A3B]"><Users size={20} className="text-[#7C6FF0]" /> How many seats?</h2>
              <p className="mt-1 text-sm font-semibold text-[#5B5570]">Buying for your team? 5+ seats save 20%, 15+ save 30% — automatically.</p>
              <div className="mt-4 flex items-center gap-3">
                {[1, 5, 10, 15, 25].map((n) => (
                  <button key={n} onClick={() => setSeats(n)} className={`h-12 w-12 rounded-2xl font-display text-lg font-semibold transition ${seats === n ? "bg-[#7C6FF0] text-white shadow-[0_4px_0_#5B4ED6]" : "bg-[#2E2A3B]/6 text-[#2E2A3B] hover:bg-[#2E2A3B]/10"}`}>{n}</button>
                ))}
                <input type="number" min={1} max={200} value={seats} onChange={(e) => setSeats(Math.max(1, Math.min(200, Number(e.target.value) || 1)))} className="h-12 w-20 rounded-2xl border-2 border-[#2E2A3B]/12 bg-[#FFF9F1] text-center font-black focus:border-[#7C6FF0] focus:outline-none" />
              </div>
              {seats >= 5 && (
                <div className="mt-4">
                  <label className="text-xs font-black uppercase tracking-widest text-[#5B5570]">Organization name (for team dashboard)</label>
                  <div className="mt-1.5 flex items-center gap-2 rounded-2xl border-2 border-[#2E2A3B]/12 bg-[#FFF9F1] px-4 py-3">
                    <Building2 size={17} className="text-[#5B5570]" />
                    <input value={org} onChange={(e) => setOrg(e.target.value)} placeholder="Sunshine ABA Clinic" className="w-full bg-transparent text-sm font-bold focus:outline-none" />
                  </div>
                </div>
              )}
              {discount > 0 && <p className="mt-3 rounded-2xl bg-[#D7F3E5] p-3 text-sm font-black text-[#0B7C69]">🎉 Team discount applied: {discount * 100}% off!</p>}
            </section>
            <section className="rounded-[2rem] border-2 border-[#2E2A3B]/10 bg-white p-6">
              <h2 className="font-display flex items-center gap-2 text-xl font-semibold text-[#2E2A3B]"><CreditCard size={20} className="text-[#0EA58C]" /> Payment</h2>
              {!user ? (
                <div className="mt-3 rounded-2xl bg-[#FFF0C4] p-4 text-sm font-bold text-[#7A5B00]">You'll sign in (free) before paying, so certificates land in the right account. <button onClick={() => setAuthOpen(true)} className="font-black underline">Sign in now</button></div>
              ) : <p className="mt-1 text-sm font-bold text-[#5B5570]">Paying as <span className="text-[#2E2A3B] font-black">{user.name} ({user.email})</span></p>}
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <input value={pay.name} onChange={(e) => setPay({ ...pay, name: e.target.value })} placeholder="Name on card" className="rounded-2xl border-2 border-[#2E2A3B]/12 bg-[#FFF9F1] px-4 py-3 text-sm font-bold focus:border-[#0EA58C] focus:outline-none sm:col-span-2" />
                <input value={pay.card} onChange={(e) => setPay({ ...pay, card: e.target.value.replace(/[^0-9]/g, "").slice(0, 16) })} inputMode="numeric" placeholder="Card number  ····  ····  ····  ····" className="rounded-2xl border-2 border-[#2E2A3B]/12 bg-[#FFF9F1] px-4 py-3 text-sm font-bold focus:border-[#0EA58C] focus:outline-none sm:col-span-2" />
                <input value={pay.exp} onChange={(e) => setPay({ ...pay, exp: e.target.value })} placeholder="MM / YY" className="rounded-2xl border-2 border-[#2E2A3B]/12 bg-[#FFF9F1] px-4 py-3 text-sm font-bold focus:border-[#0EA58C] focus:outline-none" />
                <input value={pay.cvc} onChange={(e) => setPay({ ...pay, cvc: e.target.value.replace(/[^0-9]/g, "").slice(0, 4) })} inputMode="numeric" placeholder="CVC" className="rounded-2xl border-2 border-[#2E2A3B]/12 bg-[#FFF9F1] px-4 py-3 text-sm font-bold focus:border-[#0EA58C] focus:outline-none" />
              </div>
              <p className="mt-3 flex items-center gap-1.5 text-xs font-bold text-[#5B5570]"><ShieldCheck size={14} className="text-[#0EA58C]" /> Demo checkout — no real charge. 256-bit encrypted in production.</p>
            </section>
          </div>
          <div>
            <div className="rounded-[2rem] bg-[#2E2A3B] p-6 text-white lg:sticky lg:top-24">
              <h2 className="font-display text-xl font-semibold">Order summary</h2>
              <ul className="mt-4 space-y-3">
                {items.map((c) => (
                  <li key={c.id} className="flex gap-3 rounded-2xl bg-white/10 p-3">
                    <img src={c.image} alt="" className="h-14 w-14 shrink-0 rounded-xl object-cover" />
                    <div className="min-w-0 flex-1"><p className="truncate text-sm font-black">{c.title}</p><p className="text-xs font-bold text-white/60">{c.ceus} CEUs × {seats} seat{seats > 1 ? "s" : ""}</p></div>
                    <span className="font-display font-semibold">${c.price * seats}</span>
                    <button onClick={() => removeFromCart(c.id)} aria-label="Remove" className="self-start text-white/50 hover:text-[#FF6B5B]"><Trash2 size={15} /></button>
                  </li>
                ))}
              </ul>
              <div className="mt-4 space-y-1.5 border-t border-white/10 pt-4 text-sm font-bold text-white/70">
                <div className="flex justify-between"><span>Subtotal</span><span>${subtotal}</span></div>
                {discount > 0 && <div className="flex justify-between text-[#7BF0D4]"><span>Team discount ({discount * 100}%)</span><span>−${subtotal - total}</span></div>}
                <div className="flex justify-between text-base font-black text-white"><span>Total</span><span className="font-display text-2xl">${total}</span></div>
                <p className="text-xs text-[#7BF0D4]">{ceus} CEUs per learner · Lifetime access</p>
              </div>
              <button
                onClick={() => { if (!user) { setAuthOpen(true); return; } enroll(cart); clearCart(); setDone(true); window.scrollTo({ top: 0 }); }}
                className="mt-5 w-full rounded-full bg-[#FF6B5B] px-6 py-4 text-base font-black text-white shadow-[0_5px_0_#E14E40] transition hover:brightness-105"
              >{user ? `Pay $${total} & enroll` : "Sign in to complete purchase"}</button>
              <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs font-bold text-white/50"><BadgeCheck size={14} /> 30-day guarantee · Instant access · Secure checkout</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
