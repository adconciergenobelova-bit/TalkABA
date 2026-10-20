import { useState } from "react";
import { BadgeCheck, Search, ShieldAlert } from "lucide-react";
import { courses } from "../lib/data";
import { PageHero } from "../components/ui";

export default function Verify() {
  const [id, setId] = useState("");
  const [result, setResult] = useState<"none" | "found-local" | "notfound">("none");
  const [foundCourse, setFoundCourse] = useState("");
  const check = () => {
    try {
      const raw = localStorage.getItem("taa_enroll");
      const enr = raw ? (JSON.parse(raw) as Record<string, { certId?: string; courseId: string }>) : {};
      const hit = Object.values(enr).find((e) => e.certId?.toLowerCase() === id.trim().toLowerCase());
      if (hit) {
        const c = courses.find((x) => x.id === hit.courseId);
        setFoundCourse(c ? `${c.title} · ${c.ceus} CEUs (${c.ceuTypes.join(" + ")})` : "");
        setResult("found-local");
      } else setResult("notfound");
    } catch { setResult("notfound"); }
  };
  return (
    <div>
      <PageHero eyebrow="Credential verification" color="#0EA58C" title={<>Verify a Talk ABA Academy certificate.</>} blurb="Employers, funders & licensing boards: confirm any CEU certificate instantly with its Verification ID." />
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
        <div className="rounded-[2rem] border-2 border-[#2E2A3B]/10 bg-white p-6 sm:p-8">
          <label className="text-xs font-black uppercase tracking-widest text-[#5B5570]">Certificate Verification ID</label>
          <div className="mt-2 flex gap-2">
            <input value={id} onChange={(e) => setId(e.target.value)} placeholder="TAA-XXXXXX-XXXX" className="w-full rounded-2xl border-2 border-[#2E2A3B]/12 bg-[#FFF9F1] px-4 py-3 font-mono text-sm font-bold uppercase focus:border-[#0EA58C] focus:outline-none" />
            <button onClick={check} className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#0EA58C] px-6 py-3 text-sm font-black text-white hover:bg-[#0B7C69]"><Search size={15} /> Verify</button>
          </div>
          {result === "found-local" && (
            <div className="animate-pop-in mt-5 rounded-2xl bg-[#D7F3E5] p-5">
              <p className="flex items-center gap-2 font-black text-[#0B7C69]"><BadgeCheck size={20} /> ✓ Valid certificate</p>
              <p className="mt-1 text-sm font-bold text-[#0B7C69]/80">{foundCourse}</p>
              <p className="mt-1 font-mono text-xs font-bold text-[#0B7C69]/70">ID: {id.trim().toUpperCase()} · Issued by Talk ABA Academy, BACB ACE Provider OP-24-1107</p>
            </div>
          )}
          {result === "notfound" && (
            <div className="animate-pop-in mt-5 rounded-2xl bg-[#FFE3DC] p-5">
              <p className="flex items-center gap-2 font-black text-[#E14E40]"><ShieldAlert size={20} /> No match on this device</p>
              <p className="mt-1 text-sm font-bold text-[#E14E40]/80">We couldn't find that ID in this browser's records. Certificates are stored per-device in this demo — email verify@talkaba.academy and we'll confirm any certificate within one business day.</p>
            </div>
          )}
          <p className="mt-4 text-xs font-semibold text-[#5B5570]">Tip: complete any course quiz on this device to generate a real certificate ID, then paste it here to see verification in action.</p>
        </div>
      </div>
    </div>
  );
}
