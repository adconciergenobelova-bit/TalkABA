/* Checkout (demo payment - nothing is charged) with automatic team discounts */
(function () {
  var T = window.TAA, S = window.store, U = window.UI, icon = window.icon, esc = U.esc;
  Layout.mount();
  var root = document.getElementById("page");
  var seats = 1, done = null;

  var INP = "rounded-2xl border-2 border-[#2E2A3B]/12 bg-[#FFF9F1] px-4 py-3 text-sm font-bold focus:border-[#0EA58C] focus:outline-none";
  function items() { return S.state.cart.map(function (id) { return T.courses.filter(function (c) { return c.id === id; })[0]; }).filter(Boolean); }
  function calc() {
    var it = items(), sub = it.reduce(function (s, c) { return s + c.price; }, 0) * seats;
    var disc = seats >= 15 ? 0.3 : seats >= 5 ? 0.2 : 0;
    return { it: it, sub: sub, disc: disc, total: Math.round(sub * (1 - disc)), ceus: Math.round(it.reduce(function (s, c) { return s + c.ceus; }, 0) * 100) / 100 };
  }

  function shell() {
    root.innerHTML = '<div class="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8"><a href="courses.html" class="inline-flex items-center gap-1.5 rounded-full bg-[#2E2A3B]/6 px-4 py-2 text-xs font-black text-[#2E2A3B] hover:bg-[#2E2A3B] hover:text-white">' + icon("arrow-left", 14) + ' Keep browsing</a><h1 class="font-display mt-4 text-4xl font-semibold text-[#2E2A3B]">Checkout</h1><div id="co"></div></div>';
  }

  function main() {
    var c = calc();
    if (!c.it.length) return '<div class="mt-6 rounded-[2rem] border-2 border-dashed border-[#2E2A3B]/20 bg-white p-12 text-center"><p class="font-display text-2xl font-semibold text-[#2E2A3B]">Your cart is empty</p><a href="courses.html" class="mt-4 inline-block rounded-full bg-[#FF6B5B] px-6 py-3 text-sm font-black text-white">Browse courses</a></div>';
    return '<div class="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]"><div class="space-y-5">' +
      '<section class="rounded-[2rem] border-2 border-[#2E2A3B]/10 bg-white p-6"><h2 class="font-display flex items-center gap-2 text-xl font-semibold text-[#2E2A3B]">' + icon("users", 20, "text-[#7C6FF0]") + ' How many seats?</h2><p class="mt-1 text-sm font-semibold text-[#5B5570]">Buying for your team? 5+ seats save 20%, 15+ save 30% — automatically.</p>' +
      '<div class="mt-4 flex flex-wrap items-center gap-3"><div id="seat-btns" class="flex flex-wrap gap-3"></div><label class="sr-only" for="seats">Number of seats</label><input id="seats" type="number" min="1" max="200" value="' + seats + '" class="h-12 w-20 rounded-2xl border-2 border-[#2E2A3B]/12 bg-[#FFF9F1] text-center font-black focus:border-[#7C6FF0] focus:outline-none"></div>' +
      '<div id="org" class="mt-4"></div><div id="disc"></div></section>' +
      '<section class="rounded-[2rem] border-2 border-[#2E2A3B]/10 bg-white p-6"><h2 class="font-display flex items-center gap-2 text-xl font-semibold text-[#2E2A3B]">' + icon("credit-card", 20, "text-[#0EA58C]") + ' Payment</h2><div id="payas"></div>' +
      '<div class="mt-4 grid gap-3 sm:grid-cols-2"><input id="p-name" autocomplete="cc-name" placeholder="Name on card" aria-label="Name on card" class="' + INP + ' sm:col-span-2"><input id="p-card" inputmode="numeric" autocomplete="cc-number" placeholder="Card number" aria-label="Card number" class="' + INP + ' sm:col-span-2"><input id="p-exp" autocomplete="cc-exp" placeholder="MM / YY" aria-label="Expiry" class="' + INP + '"><input id="p-cvc" inputmode="numeric" autocomplete="cc-csc" placeholder="CVC" aria-label="CVC" class="' + INP + '"></div>' +
      '<p class="mt-3 flex items-center gap-1.5 text-xs font-bold text-[#5B5570]">' + icon("shield-check", 14, "text-[#0EA58C]") + " Demo checkout — no real charge. Connect a payment provider before going live.</p></section></div>" +
      '<div><div id="summary" class="rounded-[2rem] bg-[#2E2A3B] p-6 text-white lg:sticky lg:top-24"></div></div></div>';
  }

  function seatBtns() {
    document.getElementById("seat-btns").innerHTML = [1, 5, 10, 15, 25].map(function (n) {
      return '<button data-act="seats" data-n="' + n + '" aria-pressed="' + (seats === n) + '" class="font-display h-12 w-12 rounded-2xl text-lg font-semibold transition ' + (seats === n ? "bg-[#7C6FF0] text-white shadow-[0_4px_0_#5B4ED6]" : "bg-[#2E2A3B]/6 text-[#2E2A3B] hover:bg-[#2E2A3B]/10") + '">' + n + "</button>";
    }).join("");
  }

  function parts() {
    var c = calc(), user = S.state.user;
    if (!c.it.length) { if (document.getElementById("seats")) { document.getElementById("co").innerHTML = main(); } return; }
    if (!document.getElementById("seats")) { document.getElementById("co").innerHTML = main(); }
    seatBtns();
    var org = document.getElementById("org"), val = document.getElementById("org-in") ? document.getElementById("org-in").value : "";
    if (seats >= 5 && !document.getElementById("org-in")) org.innerHTML = '<label for="org-in" class="text-xs font-black uppercase tracking-widest text-[#5B5570]">Organization name (for team dashboard)</label><div class="mt-1.5 flex items-center gap-2 rounded-2xl border-2 border-[#2E2A3B]/12 bg-[#FFF9F1] px-4 py-3">' + icon("building-2", 17, "text-[#5B5570]") + '<input id="org-in" placeholder="Sunshine ABA Clinic" class="w-full bg-transparent text-sm font-bold focus:outline-none"></div>';
    else if (seats < 5) org.innerHTML = "";
    document.getElementById("disc").innerHTML = c.disc > 0 ? '<p class="mt-3 rounded-2xl bg-[#D7F3E5] p-3 text-sm font-black text-[#0B7C69]">🎉 Team discount applied: ' + c.disc * 100 + "% off!</p>" : "";
    document.getElementById("payas").innerHTML = !user
      ? '<div class="mt-3 rounded-2xl bg-[#FFF0C4] p-4 text-sm font-bold text-[#7A5B00]">You\'ll sign in (free) before paying, so certificates land in the right account. <button data-act="open-auth" class="font-black underline">Sign in now</button></div>'
      : '<p class="mt-1 text-sm font-bold text-[#5B5570]">Paying as <span class="font-black text-[#2E2A3B]">' + esc(user.name) + " (" + esc(user.email) + ")</span></p>";
    document.getElementById("summary").innerHTML = '<h2 class="font-display text-xl font-semibold">Order summary</h2><ul class="mt-4 space-y-3">' + c.it.map(function (x) {
      return '<li class="flex gap-3 rounded-2xl bg-white/10 p-3"><img src="' + x.image + '" alt="" class="h-14 w-14 shrink-0 rounded-xl object-cover"><div class="min-w-0 flex-1"><p class="truncate text-sm font-black">' + esc(x.title) + '</p><p class="text-xs font-bold text-white/60">' + x.ceus + " CEUs × " + seats + " seat" + (seats > 1 ? "s" : "") + '</p></div><span class="font-display font-semibold">' + U.money(x.price * seats) + '</span><button data-act="remove-cart" data-id="' + x.id + '" aria-label="Remove ' + esc(x.title) + '" class="self-start text-white/50 hover:text-[#FF6B5B]">' + icon("trash-2", 15) + "</button></li>";
    }).join("") + '</ul><div class="mt-4 space-y-1.5 border-t border-white/10 pt-4 text-sm font-bold text-white/70"><div class="flex justify-between"><span>Subtotal</span><span>' + U.money(c.sub) + "</span></div>" +
      (c.disc > 0 ? '<div class="flex justify-between text-[#7BF0D4]"><span>Team discount (' + c.disc * 100 + "%)</span><span>−" + U.money(c.sub - c.total) + "</span></div>" : "") +
      '<div class="flex justify-between text-base font-black text-white"><span>Total</span><span class="font-display text-2xl">' + U.money(c.total) + '</span></div><p class="text-xs text-[#7BF0D4]">' + c.ceus + ' CEUs per learner · Lifetime access</p></div>' +
      '<button data-act="pay" class="mt-5 w-full rounded-full bg-[#FF6B5B] px-6 py-4 text-base font-black text-white shadow-[0_5px_0_#E14E40] transition hover:brightness-105">' + (user ? "Pay " + U.money(c.total) + " &amp; enroll" : "Sign in to complete purchase") + '</button><p class="mt-3 flex items-center justify-center gap-1.5 text-center text-xs font-bold text-white/50">' + icon("badge-check", 14) + " 30-day guarantee · Instant access · Secure checkout</p>";
    if (val && document.getElementById("org-in")) document.getElementById("org-in").value = val;
  }

  function success() {
    var d = done;
    root.innerHTML = '<div class="mx-auto max-w-2xl px-4 py-20 text-center"><div class="animate-pop-in"><span class="inline-flex h-24 w-24 items-center justify-center rounded-full bg-[#D7F3E5]">' + icon("party-popper", 42, "text-[#0B7C69]") + '</span></div><h1 class="font-display mt-5 text-4xl font-semibold text-[#2E2A3B]">You\'re enrolled! 🎉</h1>' +
      '<p class="mt-2 font-medium text-[#5B5570]">Receipt sent to ' + esc(d.email) + ". " + (d.seats > 1 ? d.seats + " team seats are ready — invite links are in your dashboard." : "Your courses are unlocked and waiting in your dashboard.") + "</p>" +
      '<div class="mx-auto mt-6 max-w-md rounded-3xl border-2 border-[#2E2A3B]/10 bg-white p-5 text-left">' + d.items.map(function (c) { return '<p class="flex items-center gap-2 py-1 text-sm font-black text-[#2E2A3B]">' + icon("check", 15, "text-[#0EA58C]", 3.5) + " " + esc(c.title) + "</p>"; }).join("") +
      '<p class="mt-2 border-t-2 border-dashed border-[#2E2A3B]/10 pt-2 text-sm font-black text-[#0B7C69]">' + d.ceus + " CEUs on the way · " + U.money(d.total) + ' paid</p></div><a href="dashboard.html" class="mt-6 inline-block rounded-full bg-[#0EA58C] px-8 py-4 text-base font-black text-white shadow-[0_5px_0_#0B7C69]">Start learning now →</a></div>';
    window.scrollTo(0, 0);
  }

  shell();
  document.getElementById("co").innerHTML = main();
  parts();
  S.subscribe(function () { if (!done) parts(); });

  function setSeats(n) { seats = Math.max(1, Math.min(200, Number(n) || 1)); var i = document.getElementById("seats"); if (i && Number(i.value) !== seats && document.activeElement !== i) i.value = seats; parts(); }
  root.addEventListener("input", function (e) {
    if (e.target.id === "seats") { seats = Math.max(1, Math.min(200, Number(e.target.value) || 1)); parts(); }
    if (e.target.id === "p-card" || e.target.id === "p-cvc") e.target.value = e.target.value.replace(/[^0-9]/g, "").slice(0, e.target.id === "p-card" ? 16 : 4);
  });
  Actions.many({
    "seats": function (el) { setSeats(el.getAttribute("data-n")); },
    "pay": function () {
      var st = S.state; if (!st.user) { S.openAuth(); return; }
      var c = calc(); done = { items: c.it, ceus: c.ceus, total: c.total, seats: seats, email: st.user.email };
      S.enroll(st.cart.slice()); S.clearCart(); success();
    }
  });
})();
