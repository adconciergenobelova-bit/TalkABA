import { Award, BadgeCheck, GraduationCap } from "lucide-react";
import type { Course } from "../lib/data";

export function Certificate({ course, name, creds, certId, date }: { course: Course; name: string; creds: string; certId: string; date: string }) {
  return (
    <div className="print-full relative mx-auto w-full max-w-3xl overflow-hidden rounded-[2rem] border-8 border-double border-[#E0A81A] bg-white shadow-2xl">
      <div className="dot-grid absolute inset-0 opacity-40" />
      <div className="absolute left-0 top-0 h-28 w-28 rounded-br-[3rem] bg-[#FF6B5B]" />
      <div className="absolute right-0 top-0 h-28 w-28 rounded-bl-[3rem] bg-[#0EA58C]" />
      <div className="absolute bottom-0 left-0 h-24 w-24 rounded-tr-[2.5rem] bg-[#7C6FF0]" />
      <div className="absolute bottom-0 right-0 h-24 w-24 rounded-tl-[2.5rem] bg-[#FFC93C]" />
      <div className="relative px-8 py-10 text-center sm:px-14">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#2E2A3B] text-white"><GraduationCap size={30} /></span>
        <p className="mt-3 text-xs font-black uppercase tracking-[0.3em] text-[#5B5570]">Talk ABA Academy · BACB ACE Provider OP-24-1107</p>
        <h3 className="font-display mt-2 text-4xl font-semibold text-[#2E2A3B] sm:text-5xl">Certificate of Completion</h3>
        <p className="mt-3 text-sm font-bold text-[#5B5570]">This certifies that</p>
        <p className="font-display mt-1 text-3xl font-semibold text-[#E14E40] sm:text-4xl">{name}{creds ? `, ${creds}` : ""}</p>
        <p className="mt-3 text-sm font-bold text-[#5B5570]">has successfully completed</p>
        <p className="mx-auto mt-1 max-w-xl text-xl font-black leading-snug text-[#2E2A3B]">{course.title}</p>
        <div className="mx-auto mt-5 flex max-w-md items-center justify-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#2E2A3B] px-4 py-2 text-sm font-black text-white"><Award size={15} /> {course.ceus} CEUs · {course.ceuTypes.join(" + ")}</span>
        </div>
        <div className="mx-auto mt-6 grid max-w-xl grid-cols-3 gap-4 border-t-2 border-dashed border-[#2E2A3B]/15 pt-6 text-left">
          <div><p className="text-[10px] font-black uppercase tracking-widest text-[#5B5570]">Date</p><p className="text-sm font-black text-[#2E2A3B]">{date}</p></div>
          <div><p className="text-[10px] font-black uppercase tracking-widest text-[#5B5570]">Verification ID</p><p className="text-sm font-black text-[#2E2A3B]">{certId}</p></div>
          <div><p className="text-[10px] font-black uppercase tracking-widest text-[#5B5570]">{course.bacbEvent?.split("·")[1]?.trim() ?? "BACB Event"}</p><p className="text-sm font-black text-[#2E2A3B]">Score ≥ 80%</p></div>
        </div>
        <div className="mx-auto mt-4 flex max-w-xl items-end justify-between">
          <div className="text-left"><p className="font-display text-lg italic text-[#2E2A3B]">Maya Ross</p><p className="text-[10px] font-black uppercase tracking-widest text-[#5B5570]">Director, Talk ABA Academy</p></div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0EA58C]/10 px-3 py-1.5 text-xs font-black text-[#0B7C69]"><BadgeCheck size={14} /> Verified CEUs</span>
          <div className="text-right"><p className="font-display text-lg italic text-[#2E2A3B]">D. Okafor</p><p className="text-[10px] font-black uppercase tracking-widest text-[#5B5570]">ACE Coordinator</p></div>
        </div>
      </div>
    </div>
  );
}
