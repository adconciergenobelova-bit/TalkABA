import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { courses } from "../lib/data";
import { CourseCard, PageHero } from "../components/ui";

const cats = ["All", "Today's ABA Core", "PFA & SBT", "Ethics & Assent", "Communication & Play", "Supervision & Leadership"];
const ceuFilters = ["All", "BACB Learning", "BACB Ethics", "BACB Supervision", "ASHA"];
const levels = ["All", "Foundations", "Intermediate", "Advanced"];

export default function Courses() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [ceu, setCeu] = useState("All");
  const [lvl, setLvl] = useState("All");
  const [sort, setSort] = useState("popular");

  const list = useMemo(() => {
    let out = courses.filter(
      (c) =>
        (cat === "All" || c.category === cat) &&
        (ceu === "All" || c.ceuTypes.includes(ceu as never)) &&
        (lvl === "All" || c.level === lvl) &&
        (q === "" || (c.title + c.tagline + c.tags.join(" ")).toLowerCase().includes(q.toLowerCase()))
    );
    if (sort === "popular") out = [...out].sort((a, b) => b.learners - a.learners);
    if (sort === "rating") out = [...out].sort((a, b) => b.rating - a.rating);
    if (sort === "price-low") out = [...out].sort((a, b) => a.price - b.price);
    if (sort === "ceus") out = [...out].sort((a, b) => b.ceus - a.ceus);
    return out;
  }, [q, cat, ceu, lvl, sort]);

  const totalCeus = list.reduce((s, c) => s + c.ceus, 0);

  return (
    <div>
      <PageHero eyebrow="Course catalog" color="#FF6B5B" title={<>Every CEU you need.<br />Zero boredom guaranteed.</>} blurb="Filter by credit type, level, or topic. Every course lists its BACB event number and earns an instant certificate." image="/images/course-speech.jpg" />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border-2 border-[#2E2A3B]/10 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <label className="flex flex-1 items-center gap-2 rounded-full border-2 border-[#2E2A3B]/12 bg-[#FFF9F1] px-5 py-3">
              <Search size={18} className="shrink-0 text-[#5B5570]" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search courses, topics, tags… (try 'ethics' or 'play')" className="w-full bg-transparent text-sm font-bold text-[#2E2A3B] placeholder:text-[#5B5570]/60 focus:outline-none" />
            </label>
            <label className="flex items-center gap-2 rounded-full border-2 border-[#2E2A3B]/12 bg-[#FFF9F1] px-5 py-3 text-sm font-extrabold text-[#2E2A3B]">
              <SlidersHorizontal size={16} />
              <select value={sort} onChange={(e) => setSort(e.target.value)} className="bg-transparent focus:outline-none">
                <option value="popular">Most popular</option>
                <option value="rating">Highest rated</option>
                <option value="ceus">Most CEUs</option>
                <option value="price-low">Price: low to high</option>
              </select>
            </label>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {cats.map((c) => (
              <button key={c} onClick={() => setCat(c)} className={`rounded-full px-4 py-2 text-xs font-black transition ${cat === c ? "bg-[#2E2A3B] text-white" : "bg-[#2E2A3B]/6 text-[#5B5570] hover:bg-[#2E2A3B]/10"}`}>{c}</button>
            ))}
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {ceuFilters.map((c) => (
              <button key={c} onClick={() => setCeu(c)} className={`rounded-full px-4 py-2 text-xs font-black transition ${ceu === c ? "bg-[#0EA58C] text-white" : "bg-[#0EA58C]/10 text-[#0B7C69] hover:bg-[#0EA58C]/20"}`}>{c === "All" ? "All credit types" : c}</button>
            ))}
            <span className="mx-1 hidden h-6 w-px bg-[#2E2A3B]/10 sm:block" />
            {levels.map((l) => (
              <button key={l} onClick={() => setLvl(l)} className={`rounded-full px-4 py-2 text-xs font-black transition ${lvl === l ? "bg-[#7C6FF0] text-white" : "bg-[#7C6FF0]/10 text-[#5B4ED6] hover:bg-[#7C6FF0]/20"}`}>{l === "All" ? "All levels" : l}</button>
            ))}
          </div>
        </div>
        <p className="mt-6 text-sm font-extrabold text-[#5B5570]">Showing <span className="text-[#2E2A3B]">{list.length} courses</span> · <span className="text-[#0B7C69]">{totalCeus} total CEUs</span></p>
        {list.length === 0 ? (
          <div className="mt-6 rounded-[2rem] border-2 border-dashed border-[#2E2A3B]/20 bg-white p-12 text-center">
            <p className="font-display text-2xl font-semibold text-[#2E2A3B]">No courses match those filters</p>
            <p className="mt-1 text-sm font-semibold text-[#5B5570]">Try clearing a filter or two — great CEUs await.</p>
            <button onClick={() => { setQ(""); setCat("All"); setCeu("All"); setLvl("All"); }} className="mt-5 rounded-full bg-[#2E2A3B] px-6 py-3 text-sm font-extrabold text-white">Clear all filters</button>
          </div>
        ) : (
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {list.map((c, i) => <CourseCard key={c.id} course={c} index={i} />)}
          </div>
        )}
      </div>
    </div>
  );
}
