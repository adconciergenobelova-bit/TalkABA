/* Learning paths & bundles */
(function () {
  var T = window.TAA, S = window.store, U = window.UI, icon = window.icon, esc = U.esc;
  Layout.mount();
  var iconMap = { Sprout: "sprout", Compass: "compass", BadgeCheck: "badge-check" };
  var root = document.getElementById("page");

  function paths() {
    var enr = S.state.enrollments;
    return T.paths.map(function (p, pi) {
      var owned = p.courseIds.filter(function (id) { return enr[id]; }).length;
      var rows = p.courseIds.map(function (id, i) {
        var c = T.courses.filter(function (x) { return x.id === id; })[0], own = Boolean(enr[id]);
        return '<div class="relative flex gap-4 rounded-3xl border-2 border-[#2E2A3B]/8 bg-[#FFF9F1] p-3">' +
          (i < p.courseIds.length - 1 ? '<span class="absolute -bottom-[14px] left-[52px] z-10 h-[14px] w-[3px]" style="background:' + p.color + '"></span>' : "") +
          '<span class="font-display absolute -left-1 -top-1 inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold text-white shadow" style="background:' + p.color + '">' + (i + 1) + "</span>" +
          '<img src="' + c.image + '" alt="" class="h-24 w-24 shrink-0 rounded-2xl object-cover sm:h-28 sm:w-32" loading="lazy"><div class="min-w-0 flex-1"><p class="line-clamp-1 text-sm font-black text-[#2E2A3B]">' + esc(c.title) + '</p>' +
          '<p class="mt-0.5 text-xs font-bold text-[#5B5570]">' + c.ceus + " CEUs · " + c.hours + "h · " + esc(c.level) + '</p><div class="mt-1">' + U.stars(c.rating, 12) + "</div>" +
          '<div class="mt-1.5 flex items-center gap-2"><a href="' + U.courseUrl(c) + '" class="inline-flex items-center gap-1 text-xs font-black hover:underline" style="color:' + p.deep + '">View course ' + icon("arrow-right", 12, "", 3) + "</a>" +
          (own ? '<span class="inline-flex items-center gap-1 rounded-full bg-[#D7F3E5] px-2 py-0.5 text-[10px] font-black text-[#0B7C69]">' + icon("check", 10, "", 4) + " OWNED</span>" : "") + "</div></div>" +
          '<span class="font-display self-center text-xl font-semibold text-[#2E2A3B]">' + U.money(c.price) + "</span></div>";
      }).join("");
      return '<div class="reveal overflow-hidden rounded-[2.5rem] border-[3px] bg-white" style="border-color:' + p.color + '"><div class="grid lg:grid-cols-[0.9fr_1.1fr]"><div class="p-7 sm:p-10" style="background:linear-gradient(150deg,' + p.soft + ',#fff)">' +
        '<span class="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-black text-white" style="background:' + p.color + '">' + icon(iconMap[p.icon] || "route", 14) + " PATH " + (pi + 1) + " · " + esc(p.level.toUpperCase()) + "</span>" +
        '<h2 class="font-display mt-4 text-3xl font-semibold text-[#2E2A3B] sm:text-4xl">' + esc(p.title) + '</h2><p class="mt-3 font-medium text-[#5B5570]">' + esc(p.blurb) + "</p>" +
        '<div class="mt-5 flex flex-wrap items-center gap-3"><span class="font-display text-5xl font-semibold text-[#2E2A3B]">' + U.money(p.price) + '</span><span class="text-lg font-bold text-[#5B5570]/50 line-through">' + U.money(p.compareAt) + '</span><span class="inline-flex items-center gap-1 rounded-full bg-[#0EA58C] px-3 py-1.5 text-xs font-black text-white">' + icon("piggy-bank", 13) + " SAVE " + U.money(p.compareAt - p.price) + "</span></div>" +
        '<p class="mt-1 text-sm font-black" style="color:' + p.deep + '">' + p.totalCeus + " total CEUs · " + p.courseIds.length + " courses · Lifetime access</p>" +
        (owned > 0 ? '<p class="mt-2 text-xs font-black text-[#0B7C69]">✓ You already own ' + owned + " of " + p.courseIds.length + " — only the rest are added to your cart.</p>" : "") +
        '<div class="mt-5 flex flex-wrap gap-2.5"><button data-act="add-bundle" data-p="' + p.id + '" class="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-black text-white transition hover:brightness-105" style="background:' + p.color + '">' + icon("shopping-cart", 16) + " Add bundle to cart</button></div></div>" +
        '<div class="space-y-3 p-6 sm:p-8">' + rows + "</div></div></div>";
    }).join("");
  }

  function view() {
    return U.pageHero({ eyebrow: "Bundles &amp; learning paths", color: "#7C6FF0", title: "Stop collecting random CEUs.<br>Start building mastery.", blurb: "Curated course journeys with one checkout, one transcript line, and up to 20% off. The smart way to renew.", image: "images/play-home.jpg" }) +
      '<div class="mx-auto max-w-7xl space-y-8 px-4 py-12 sm:px-6 lg:px-8"><div id="paths" class="space-y-8"></div>' +
      '<div class="reveal rounded-[2.5rem] bg-[#2E2A3B] p-8 text-center text-white sm:p-10"><h2 class="font-display text-3xl font-semibold">Enrolling your whole team?</h2><p class="mx-auto mt-2 max-w-xl font-medium text-white/70">Clinics &amp; districts save 20% on 5+ seats and 30% on 15+, with a shared dashboard to track every clinician\'s CEUs.</p>' +
      '<a href="checkout.html" class="mt-5 inline-flex items-center gap-2 rounded-full bg-[#FFC93C] px-7 py-3.5 text-sm font-black text-[#2E2A3B] hover:brightness-105">Get a group quote ' + icon("arrow-right", 16, "", 3) + "</a></div></div>";
  }
  root.innerHTML = view();
  var box = document.getElementById("paths");
  var first = true;
  function renderPaths() { box.innerHTML = paths(); if (first) { first = false; } else { box.querySelectorAll(".reveal").forEach(function (n) { n.classList.add("is-in"); }); } Layout.observeReveals(root); }
  renderPaths(); S.subscribe(renderPaths); Layout.observeReveals(root);

  Actions.on("add-bundle", function (el) {
    var p = T.paths.filter(function (x) { return x.id === el.getAttribute("data-p"); })[0];
    p.courseIds.filter(function (id) { return !S.state.enrollments[id]; }).forEach(function (id) { S.addToCart(id); });
  });
})();
