/* Safety net: if a page script failed, show a helpful panel instead of a blank page. */
(function () {
  var main = document.getElementById("page");
  function broken() { return !main || main.querySelector("[data-boot]") || main.innerHTML.replace(/<noscript[\s\S]*?<\/noscript>/g, "").trim() === ""; }
  function show() {
    var errs = (window.__taaErrors || []).slice(0, 5).join("\n");
    var base = /\/(api|js)\//.test(location.pathname) ? "/" : "";
    main.innerHTML = '<div style="max-width:640px;margin:0 auto;padding:64px 20px;text-align:center;font-family:Nunito,system-ui,sans-serif;color:#2E2A3B">' +
      '<h1 style="font-size:28px;margin:0 0 8px">Talk ABA</h1>' +
      '<p style="margin:0 0 20px;color:#5B5570">This page didn\'t load fully. Please reload, or use one of the links below.</p>' +
      '<button onclick="location.reload()" style="background:#FF6B5B;color:#fff;border:0;border-radius:999px;padding:12px 28px;font-weight:800;cursor:pointer">Reload page</button>' +
      '<p style="margin:24px 0 0;font-weight:700"><a href="' + base + 'index.html">Home</a> · <a href="' + base + 'courses.html">Courses</a> · <a href="' + base + 'faq.html">FAQ</a> · <a href="' + base + 'verify.html">Verify certificate</a></p>' +
      (errs ? '<details style="margin-top:24px;text-align:left;color:#5B5570"><summary>Technical details</summary><pre style="white-space:pre-wrap;font-size:12px">' + errs.replace(/</g, "&lt;") + "</pre></details>" : "") + "</div>";
  }
  if (broken()) show();
  /* catch async failures too */
  window.addEventListener("load", function () { setTimeout(function () { if (broken()) show(); }, 1500); });
})();
