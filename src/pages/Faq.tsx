import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, Mail, MessageCircle, Phone } from "lucide-react";
import { faqs } from "../lib/data";
import { PageHero } from "../components/ui";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const [msg, setMsg] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <div>
      <PageHero eyebrow="Help center" color="#FFC93C" title={<><span className="text-[#2E2A3B]">Questions? We've got answers.</span></>} blurb="CEU approvals, certificates, refunds, group rates — everything clinicians ask us, answered honestly." />
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className={`overflow-hidden rounded-3xl border-2 transition ${isOpen ? "border-[#FFC93C] bg-white shadow-lg" : "border-[#2E2A3B]/10 bg-white"}`}>
                <button onClick={() => setOpen(isOpen ? null : i)} className="flex w-full items-center gap-3 p-5 text-left sm:p-6">
                  <span className={`font-display inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white ${isOpen ? "bg-[#E0A81A]" : "bg-[#2E2A3B]"}`}>{i + 1}</span>
                  <span className="flex-1 font-black text-[#2E2A3B]">{f.q}</span>
                  <ChevronDown size={19} className={`shrink-0 transition ${isOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden"><p className="px-6 pb-6 pl-[68px] font-medium leading-relaxed text-[#5B5570] sm:px-6">{f.a}</p></motion.div>}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
        <div className="mt-10 grid gap-6 rounded-[2.5rem] bg-[#2E2A3B] p-7 text-white sm:p-10 lg:grid-cols-2">
          <div>
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FF6B5B]"><MessageCircle size={22} /></span>
            <h2 className="font-display mt-3 text-2xl font-semibold">Still stuck? Talk to a human.</h2>
            <p className="mt-2 text-sm font-medium text-white/70">Real clinicians on support, 7 days a week. Median reply time: under 3 hours.</p>
            <div className="mt-4 space-y-2 text-sm font-bold">
              <p className="flex items-center gap-2"><Mail size={16} className="text-[#FFC93C]" /> hello@talkaba.academy</p>
              <p className="flex items-center gap-2"><Phone size={16} className="text-[#FFC93C]" /> (559) 555-0134 · Fresno, CA</p>
            </div>
          </div>
          {sent ? <p className="flex items-center justify-center rounded-3xl bg-[#0EA58C]/20 p-6 text-center font-black text-[#7BF0D4]">Message received! We'll reply within 3 hours. 💌</p> : (
            <form onSubmit={(e) => { e.preventDefault(); if (msg.trim()) setSent(true); }} className="space-y-3">
              <input required placeholder="Your name" className="w-full rounded-2xl border-2 border-white/15 bg-white/10 px-4 py-3 text-sm font-bold placeholder:text-white/40 focus:border-[#FFC93C] focus:outline-none" />
              <input required type="email" placeholder="Email" className="w-full rounded-2xl border-2 border-white/15 bg-white/10 px-4 py-3 text-sm font-bold placeholder:text-white/40 focus:border-[#FFC93C] focus:outline-none" />
              <textarea value={msg} onChange={(e) => setMsg(e.target.value)} required placeholder="How can we help?" rows={3} className="w-full rounded-2xl border-2 border-white/15 bg-white/10 px-4 py-3 text-sm font-bold placeholder:text-white/40 focus:border-[#FFC93C] focus:outline-none" />
              <button className="w-full rounded-full bg-[#FFC93C] px-6 py-3 text-sm font-black text-[#2E2A3B] hover:brightness-105">Send message</button>
            </form>
          )}
        </div>
        <div className="mt-8 text-center">
          <Link to="/courses" className="inline-flex items-center gap-2 rounded-full bg-[#FF6B5B] px-7 py-3.5 text-sm font-black text-white shadow-[0_4px_0_#E14E40]">Ready? Browse CEU courses <ArrowRight size={16} strokeWidth={3} /></Link>
        </div>
      </div>
    </div>
  );
}
