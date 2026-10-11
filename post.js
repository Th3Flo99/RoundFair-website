// Blog post enhancements: progress bar, reading time, section reveal, keep-reading cards.
(function () {
  var m = document.querySelector("main.privacy-page");
  if (!m) return;
  var art = !!document.querySelector('meta[property="og:type"][content="article"]');
  var L = {
    en: { min: "min read", toc: "In this article", share: "Share this article", copy: "Copy link", copied: "Copied ✓", prompt: "Copy this link" },
    nl: { min: "min lezen", toc: "In dit artikel", share: "Deel dit artikel", copy: "Link kopiëren", copied: "Gekopieerd ✓", prompt: "Kopieer deze link" },
    fr: { min: "min de lecture", toc: "Dans cet article", share: "Partager cet article", copy: "Copier le lien", copied: "Copié ✓", prompt: "Copiez ce lien" },
    de: { min: "Min. Lesezeit", toc: "In diesem Artikel", share: "Artikel teilen", copy: "Link kopieren", copied: "Kopiert ✓", prompt: "Diesen Link kopieren" }
  };
  L = L[document.documentElement.lang] || L.en;
  var isMore = function (h) { return h.id === "keep-reading" || /keep reading/i.test(h.textContent); };
  var isFaq = function (h) { return h.id === "faq" || /frequently asked/i.test(h.textContent); };
  m.classList.add("post");
  // blog index: just stagger the list in
  if (m.querySelector(".blog-item")) {
    m.querySelectorAll(".blog-item").forEach(function (el, i) { el.classList.add("reveal"); el.style.transitionDelay = Math.min(i, 6) * 60 + "ms"; });
    return;
  }

  var bar = document.createElement("div");
  bar.className = "read-progress";
  if (art) document.body.prepend(bar);
  var tick = function () {
    var h = document.documentElement;
    bar.style.transform = "scaleX(" + Math.min(1, h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight)) + ")";
  };
  addEventListener("scroll", tick, { passive: true });
  tick();

  var meta = m.querySelector(".updated");
  var mins = Math.max(1, Math.round(m.textContent.trim().split(/\s+/).length / 210));
  if (art && meta) meta.insertAdjacentHTML("beforeend", ' · <span class="read-time">' + mins + " " + L.min + "</span>");

  // wrap each h2 block in a section so it fades up as it scrolls in
  var h2s = m.querySelectorAll("h2");
  h2s.forEach(function (h) {
    var s = document.createElement("section");
    s.className = "post-sec reveal";
    h.before(s);
    var n = h;
    while (n && !(n !== h && n.tagName === "H2") && !n.classList.contains("cta-box")) {
      var next = n.nextElementSibling;
      s.appendChild(n);
      n = next;
    }
    if (isMore(h)) {
      s.classList.add("more");
      var ul = s.querySelector("ul");
      if (ul) {
        [].slice.call(ul.children, 3).forEach(function (li) { li.remove(); }); // max 3 cards
        ul.classList.add("carousel");
      }
    }
  });
  // FAQ: turn each h3 + answer into an animated accordion item (styled in styles.css, driven by script.js)
  m.querySelectorAll("h2").forEach(function (h) {
    if (!isFaq(h)) return;
    var list = document.createElement("div");
    list.className = "faq-list";
    var q;
    while ((q = h.parentNode.querySelector("h3"))) {
      var d = document.createElement("details");
      d.className = "faq-item";
      var s = document.createElement("summary");
      s.textContent = q.textContent;
      var inner = document.createElement("div");
      inner.className = "faq-body-inner";
      var a = q.nextElementSibling;
      while (a && a.tagName === "P") { var nx = a.nextElementSibling; inner.appendChild(a); a = nx; }
      var body = document.createElement("div");
      body.className = "faq-body";
      body.appendChild(inner);
      d.append(s, body);
      list.appendChild(d);
      q.remove();
    }
    h.after(list);
  });

  var cta = m.querySelector(".cta-box");
  if (cta) cta.classList.add("reveal");
  var lead = m.querySelector(".updated + p") || m.querySelector("h1 + p");
  if (lead) lead.classList.add("lead");

  // table of contents with scroll-spy (skips the "keep reading" block)
  var heads = [].filter.call(h2s, function (h) { return !isMore(h); });
  if (art && lead && heads.length > 2) {
    var toc = document.createElement("nav");
    toc.className = "toc reveal";
    toc.setAttribute("aria-label", L.toc);
    toc.innerHTML = "<strong>" + L.toc + "</strong><ol>" + heads.map(function (h, i) {
      h.id = h.id || "s" + (i + 1);
      return '<li><a href="#' + h.id + '">' + h.textContent + "</a></li>";
    }).join("") + "</ol>";
    lead.after(toc);
    if ("IntersectionObserver" in window) {
      var links = toc.querySelectorAll("a");
      var spy = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) links.forEach(function (a) { a.classList.toggle("on", a.getAttribute("href") === "#" + e.target.id); });
        });
      }, { rootMargin: "-20% 0px -70% 0px" });
      heads.forEach(function (h) { spy.observe(h); });
    }
  }

  // share buttons
  var url = location.href.split("#")[0], t = encodeURIComponent(document.title), u = encodeURIComponent(url);
  var share = document.createElement("div");
  share.className = "share reveal";
  share.innerHTML = "<strong>" + L.share + "</strong>" +
    '<a target="_blank" rel="noopener" href="https://wa.me/?text=' + t + "%20" + u + '">WhatsApp</a>' +
    '<a target="_blank" rel="noopener" href="https://twitter.com/intent/tweet?text=' + t + "&url=" + u + '">X</a>' +
    '<a target="_blank" rel="noopener" href="https://www.linkedin.com/sharing/share-offsite/?url=' + u + '">LinkedIn</a>' +
    '<button type="button">' + L.copy + "</button>";
  if (art) (cta || m).before(share);
  share.querySelector("button").onclick = function () {
    var b = this;
    (navigator.clipboard ? navigator.clipboard.writeText(url) : Promise.reject()).then(function () {
      b.textContent = L.copied;
      setTimeout(function () { b.textContent = L.copy; }, 1800);
    }, function () { prompt(L.prompt, url); });
  };
})();
