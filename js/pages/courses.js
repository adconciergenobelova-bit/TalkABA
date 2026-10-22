/* Course catalog: search, filters, sort. URL params (?ceu=, ?cat=, ?q=) pre-select filters. */
(function () {
  var T = window.TAA, U = window.UI, icon = window.icon, esc = U.esc;
  Layout.mount();

  var cats = ["All", "Today's ABA Core", "PFA & SBT", "Ethics & Assent", "Communication & Play", "Supervision & Leadership"];
  var ceuFilters = ["All", "BACB Learning", "BACB Ethics", "BACB Supervision", "ASHA"];
  var levels = ["All", "Foundations", "Intermediate", "Advanced"];

  var params = new URLSearchParams(location.search);
  function pick(name, list) { var v = params.get(name); return v && list.indexOf(v) > -1 ? v : "All"; }
  var f = { q: params.get("q") || "", cat: pick("cat", cats), ceu: pick("ceu", ceuFilters), lvl: pick("lvl", levels), sort: "popular" };

  var chip = function (act, val, current, label, on, off) {
    return '<button data-act="' + act + '" data-v="' + esc(val) + '" aria-pressed="' + (current === val) + '" class="rounded-full px-4 py-2 text-xs font-black transition ' + (current === val ? on[0] : off) + '">' + esc(label) + "</button>";
  };

  function chipsHtml() {
    var catOn = ["bg-[#2E2A3B] text-white"], catOff = "bg-[#2E2A3B]/6 text-[#5B5570] hover:bg-[#2E2A3B]/10";
    return '<div class="mt-4 flex flex-wrap gap-2">' + cats.map(function (c) { return chip("f-cat", c, f.cat, c, catOn, catOff); }).join("") + "</div>" +
      '<div class="mt-2 flex flex-wrap gap-2">' +
        ceuFilters.map(function (c) { return chip("f-ceu", c, f.ceu, c === "All" ? "All credit types" : c, ["bg-[#0EA58C] text-white"], "bg-[#0EA58C]/10 text-[#0B7C69] hover:bg-[#0EA58C]/20"); }).join("") +
        '<span class="mx-1 hidden h-6 w-px bg-[#2E2A3B]/10 sm:block"></span>' +
        levels.map(function (l) { return chip("f-lvl", l, f.lvl, l === "All" ? "All levels" : l, ["bg-[#7C6FF0] text-white"], "bg-[#7C6FF0]/10 text-[#5B4ED6] hover:bg-[#7C6FF0]/20"); }).join("") + "</div>";
  }

  function filtered() {
    var q = f.q.trim().toLowerCase();
    var out = T.courses.filter(function (c) {
      return (f.cat === "All" || c.category === f.cat) &&
        (f.ceu === "All" || c.ceuTypes.indexOf(f.ceu) > -1) &&
        (f.lvl === "All" || c.level === f.lvl) &&
        (q === "" || (c.title + c.tagline + c.tags.join(" ")).toLowerCase().indexOf(q) > -1);
    });
    var by = { popular: function (a, b) { return b.learners - a.learners; }, rating: function (a, b) { return b.rating - a.rating; }, "price-low": function (a, b) { return a.price - b.price; }, ceus: function (a, b) { return b.ceus - a.ceus; } }[f.sort];
    return out.slice().sort(by);
  }

  function resultsHtml() {
    var list = filtered();
    var total = Math.round(list.reduce(function (s, c) { return s + c.ceus; }, 0) * 100) / 100;
    var head = '<p class="mt-6 text-sm font-extrabold text-[#5B5570]" aria-live="polite">Showing <span class="text-[#2E2A3B]">' + list.length + " course" + (list.length === 1 ? "" : "s") + '</span> · <span class="text-[#0B7C69]">' + total + " total CEUs</span></p>";
    if (!list.length) {
      return head + '<div class="mt-6 rounded-[2rem] border-2 border-dashed border-[#2E2A3B]/20 bg-white p-12 text-center"><p class="font-display text-2xl font-semibold text-[#2E2A3B]">No courses match those filters</p>' +
        '<p class="mt-1 text-sm font-semibold text-[#5B5570]">Try clearing a filter or two — great CEUs await.</p><button data-act="f-clear" class="mt-5 rounded-full bg-[#2E2A3B] px-6 py-3 text-sm font-extrabold text-white">Clear all filters</button></div>';
    }
    return head + '<div class="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">' + list.map(function (c, i) { return U.courseCard(c, i, { animate: false }); }).join("") + "</div>";
  }

  document.getElementById("page").innerHTML =
    U.pageHero({ eyebrow: "Course catalog", color: "#FF6B5B", title: "Every CEU you need.<br>Zero boredom guaranteed.", blurb: "Filter by credit type, level, or topic. Every course lists its BACB event number and earns an instant certificate.", image: "images/course-speech.jpg" }) +
    '<div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"><div class="rounded-[2rem] border-2 border-[#2E2A3B]/10 bg-white p-5 shadow-sm sm:p-6">' +
      '<div class="flex flex-col gap-4 lg:flex-row lg:items-center">' +
        '<label class="flex flex-1 items-center gap-2 rounded-full border-2 border-[#2E2A3B]/12 bg-[#FFF9F1] px-5 py-3">' + icon("search", 18, "shrink-0 text-[#5B5570]") + '<span class="sr-only">Search courses</span>' +
          '<input id="q" type="search" value="' + esc(f.q) + '" placeholder="Search courses, topics, tags… (try \'ethics\' or \'play\')" class="w-full bg-transparent text-sm font-bold text-[#2E2A3B] placeholder:text-[#5B5570]/60 focus:outline-none"></label>' +
        '<label class="flex items-center gap-2 rounded-full border-2 border-[#2E2A3B]/12 bg-[#FFF9F1] px-5 py-3 text-sm font-extrabold text-[#2E2A3B]">' + icon("sliders-horizontal", 16) + '<span class="sr-only">Sort by</span>' +
          '<select id="sort" class="bg-transparent focus:outline-none"><option value="popular">Most popular</option><option value="rating">Highest rated</option><option value="ceus">Most CEUs</option><option value="price-low">Price: low to high</option></select></label></div>' +
      '<div id="chips"></div></div><div id="results"></div></div>';

  function renderChips() { document.getElementById("chips").innerHTML = chipsHtml(); }
  var renderResults = function () { document.getElementById("results").innerHTML = resultsHtml(); };
  renderChips(); renderResults();
  /* cards depend on cart/enrolled/wishlist state */
  window.store.subscribe(renderResults);

  document.getElementById("q").addEventListener("input", function (e) { f.q = e.target.value; renderResults(); });
  document.getElementById("sort").addEventListener("change", function (e) { f.sort = e.target.value; renderResults(); });

  function setter(key) { return function (el) { f[key] = el.getAttribute("data-v"); renderChips(); renderResults(); }; }
  Actions.many({
    "f-cat": setter("cat"), "f-ceu": setter("ceu"), "f-lvl": setter("lvl"),
    "f-clear": function () { f.q = ""; f.cat = f.ceu = f.lvl = "All"; document.getElementById("q").value = ""; renderChips(); renderResults(); }
  });
})();
