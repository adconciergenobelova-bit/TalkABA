/* FAQ + contact form */
(function () {
  var T = window.TAA, U = window.UI, icon = window.icon, esc = U.esc;
  Layout.mount();
  var open = 0;

  function items() {
    return T.faqs.map(function (f, i) {
      var o = open === i;
      return '<div class="overflow-hidden rounded-3xl border-2 bg-white transition ' + (o ? "border-[#FFC93C] shadow-lg" : "border-[#2E2A3B]/10") + '">' +
        '<h2><button data-act="faq-toggle" data-i="' + i + '" id="faq-b' + i + '" aria-expanded="' + o + '" aria-controls="faq-p' + i + '" class="flex w-full items-center gap-3 p-5 text-left sm:p-6"><span class="font-display inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white ' + (o ? "bg-[#E0A81A]" : "bg-[#2E2A3B]") + '">' + (i + 1) + '</span><span class="flex-1 font-black text-[#2E2A3B]">' + esc(f.q) + '</span><span class="chev shrink-0 transition ' + (o ? "rotate-180" : "") + '">' + icon("chevron-down", 19) + "</span></button></h2>" +
        '<div id="faq-p' + i + '" role="region" aria-labelledby="faq-b' + i + '" class="acc ' + (o ? "open" : "") + '"><div class="acc-inner"><p class="px-6 pb-6 font-medium leading-relaxed text-[#5B5570] sm:pl-[68px]">' + esc(f.a) + "</p></div></div></div>";
    }).join("");
  }

  var field = "w-full rounded-2xl border-2 border-white/15 bg-white/10 px-4 py-3 text-sm font-bold placeholder:text-white/40 focus:border-[#FFC93C] focus:outline-none";
  document.getElementById("page").innerHTML =
    U.pageHero({ eyebrow: "Help center", color: "#FFC93C", title: '<span class="text-[#2E2A3B]">Questions? We\'ve got answers.</span>', blurb: "CEU approvals, certificates, refunds, group rates — everything clinicians ask us, answered honestly." }) +
    '<div class="mx-auto max-w-4xl px-4 py-12 sm:px-6"><div id="faq-list" class="space-y-3">' + items() + "</div>" +
    '<div class="mt-10 grid gap-6 rounded-[2.5rem] bg-[#2E2A3B] p-7 text-white sm:p-10 lg:grid-cols-2"><div><span class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FF6B5B]">' + icon("message-circle", 22) + "</span>" +
      '<h2 class="font-display mt-3 text-2xl font-semibold">Still stuck? Talk to a human.</h2><p class="mt-2 text-sm font-medium text-white/70">Real clinicians on support, 7 days a week. Median reply time: under 3 hours.</p>' +
      '<div class="mt-4 space-y-2 text-sm font-bold"><p class="flex items-center gap-2">' + icon("mail", 16, "text-[#FFC93C]") + ' hello@talkaba.academy</p><p class="flex items-center gap-2">' + icon("phone", 16, "text-[#FFC93C]") + " (559) 555-0134 · Fresno, CA</p></div></div>" +
      '<div id="contact"><form data-form="contact" class="space-y-3"><label class="sr-only" for="c-name">Your name</label><input id="c-name" name="name" required autocomplete="name" placeholder="Your name" class="' + field + '"><label class="sr-only" for="c-email">Email</label><input id="c-email" name="email" required type="email" autocomplete="email" placeholder="Email" class="' + field + '">' +
      '<label class="sr-only" for="c-msg">Message</label><textarea id="c-msg" name="message" required placeholder="How can we help?" rows="3" class="' + field + '"></textarea><p id="c-err" class="hidden text-sm font-bold text-[#FFB4AB]" role="alert"></p>' +
      '<button class="w-full rounded-full bg-[#FFC93C] px-6 py-3 text-sm font-black text-[#2E2A3B] hover:brightness-105">Send message</button></form></div></div>' +
    '<div class="mt-8 text-center"><a href="courses.html" class="inline-flex items-center gap-2 rounded-full bg-[#FF6B5B] px-7 py-3.5 text-sm font-black text-white shadow-[0_4px_0_#E14E40]">Ready? Browse CEU courses ' + icon("arrow-right", 16, "", 3) + "</a></div></div>";

  Actions.on("faq-toggle", function (el) {
    var i = Number(el.getAttribute("data-i")); open = open === i ? null : i;
    document.getElementById("faq-list").innerHTML = items();
    var b = document.getElementById("faq-b" + i); if (b) b.focus();
  });

  Actions.on("contact", function (form) {
    var data = { name: form.elements.name.value.trim(), email: form.elements.email.value.trim(), message: form.elements.message.value.trim() };
    var btn = form.querySelector("button"), err = document.getElementById("c-err"); btn.disabled = true; err.classList.add("hidden");
    function ok() { document.getElementById("contact").innerHTML = '<p class="flex h-full items-center justify-center rounded-3xl bg-[#0EA58C]/20 p-6 text-center font-black text-[#7BF0D4]" role="status">Message received! We\'ll reply within 3 hours. 💌</p>'; }
    api.available().then(function (on) {
      if (!on) { try { var l = JSON.parse(localStorage.getItem("taa_messages") || "[]"); l.push(Object.assign({ at: new Date().toISOString() }, data)); localStorage.setItem("taa_messages", JSON.stringify(l)); } catch (e) {} return ok(); }
      return api.post("contact.php", data).then(function (r) { if (r.status < 300) ok(); else throw new Error((r.body && r.body.error) || "Could not send."); });
    }).catch(function (e) { btn.disabled = false; err.textContent = e.message; err.classList.remove("hidden"); });
  });
})();
