/* Certificate verification: verify.html?id=TAA-XXXXXX-XXXX */
(function () {
  var T = window.TAA, U = window.UI, icon = window.icon, esc = U.esc;
  Layout.mount();

  document.getElementById("page").innerHTML =
    U.pageHero({ eyebrow: "Credential verification", color: "#0EA58C", title: "Verify a Talk ABA certificate.", blurb: "Employers, funders & licensing boards: confirm any CEU certificate instantly with its Verification ID." }) +
    '<div class="mx-auto max-w-2xl px-4 py-12 sm:px-6"><div class="rounded-[2rem] border-2 border-[#2E2A3B]/10 bg-white p-6 sm:p-8"><form data-form="verify"><label for="vid" class="text-xs font-black uppercase tracking-widest text-[#5B5570]">Certificate Verification ID</label>' +
    '<div class="mt-2 flex gap-2"><input id="vid" name="id" required placeholder="TAA-XXXXXX-XXXX" autocomplete="off" class="w-full rounded-2xl border-2 border-[#2E2A3B]/12 bg-[#FFF9F1] px-4 py-3 font-mono text-sm font-bold uppercase focus:border-[#0EA58C] focus:outline-none">' +
    '<button class="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#0EA58C] px-6 py-3 text-sm font-black text-white hover:bg-[#0B7C69]">' + icon("search", 15) + " Verify</button></div></form>" +
    '<div id="result" aria-live="polite"></div><p id="tip" class="mt-4 text-xs font-semibold text-[#5B5570]"></p></div></div>';

  var out = document.getElementById("result");
  function show(kind, body) { out.innerHTML = body; }
  function valid(id, title, extra) {
    show("ok", '<div class="animate-pop-in mt-5 rounded-2xl bg-[#D7F3E5] p-5"><p class="flex items-center gap-2 font-black text-[#0B7C69]">' + icon("badge-check", 20) + " ✓ Valid certificate</p>" +
      '<p class="mt-1 text-sm font-bold text-[#0B7C69]/80">' + esc(title) + "</p>" + (extra ? '<p class="mt-1 text-sm font-bold text-[#0B7C69]/80">' + esc(extra) + "</p>" : "") +
      '<p class="mt-1 font-mono text-xs font-bold text-[#0B7C69]/70">ID: ' + esc(id) + " · Issued by Talk ABA, BACB ACE Provider OP-24-1107</p></div>");
  }
  function missing(msg, head) {
    show("no", '<div class="animate-pop-in mt-5 rounded-2xl bg-[#FFE3DC] p-5"><p class="flex items-center gap-2 font-black text-[#E14E40]">' + icon("shield-check", 20) + " " + head + '</p><p class="mt-1 text-sm font-bold text-[#E14E40]/80">' + msg + "</p></div>");
  }

  function localCheck(id) {
    try {
      var enr = JSON.parse(localStorage.getItem("taa_enroll") || "{}");
      var hit = Object.keys(enr).map(function (k) { return enr[k]; }).filter(function (e) { return e.certId && e.certId.toLowerCase() === id.toLowerCase(); })[0];
      if (hit) { var c = T.courses.filter(function (x) { return x.id === hit.courseId; })[0]; return valid(id, c ? c.title + " · " + c.ceus + " CEUs (" + c.ceuTypes.join(" + ") + ")" : "Course completion"); }
    } catch (e) { /* fall through */ }
    missing("We couldn't find that ID in this browser's records. Certificates are stored per-device on this site version — email verify@talkaba.academy and we'll confirm any certificate within one business day.", "No match on this device");
  }

  function check(id) {
    id = id.trim().toUpperCase(); if (!id) return;
    show("", '<p class="mt-5 text-sm font-bold text-[#5B5570]">Checking…</p>');
    api.available().then(function (on) {
      if (!on) return localCheck(id);
      return api.get("certificates.php?id=" + encodeURIComponent(id)).then(function (r) {
        var b = r.body;
        if (r.status === 200 && b && b.valid) valid(id, b.title + " · " + b.ceus + " CEUs (" + b.ceuTypes.join(" + ") + ")", "Awarded to " + b.holder + " on " + b.date);
        else missing("No certificate with that ID exists. Check for typos, or email verify@talkaba.academy.", "Not found");
      });
    }).catch(function () { localCheck(id); });
  }

  api.available().then(function (on) {
    document.getElementById("tip").textContent = on ? "IDs look like TAA-XXXXXX-XXXX and appear on every certificate." : "Tip: complete any course quiz on this device to generate a certificate ID, then paste it here to see verification in action.";
  });
  Actions.on("verify", function (f) { check(f.elements.id.value); });
  var pre = new URLSearchParams(location.search).get("id");
  if (pre) { document.getElementById("vid").value = pre; check(pre); }
})();
