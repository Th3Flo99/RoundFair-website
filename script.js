// Theme: follow the system by default, let the toggle override (persisted).
(function () {
  const stored = localStorage.getItem("roundfair-theme");
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)");

  function themeLabel(theme) {
    const i18n = window.RoundFairI18n;
    if (i18n && typeof i18n.t === "function") {
      const key = theme === "dark" ? "theme.toLight" : "theme.toDark";
      const label = i18n.t(key);
      if (label) return label;
    }
    return theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
  }

  function apply(theme) {
    document.documentElement.dataset.theme = theme;
    const btn = document.querySelector(".theme-toggle");
    if (btn) btn.setAttribute("aria-label", themeLabel(theme));
  }

  function current() {
    return (
      localStorage.getItem("roundfair-theme") ||
      (systemDark.matches ? "dark" : "light")
    );
  }

  apply(stored || (systemDark.matches ? "dark" : "light"));

  systemDark.addEventListener("change", () => {
    if (!localStorage.getItem("roundfair-theme")) apply(current());
  });

  window.applyThemeLabel = function () {
    apply(current());
  };
  document.addEventListener("rf:lang", () => apply(current()));

  document.addEventListener("DOMContentLoaded", () => {
    apply(current());
    const btn = document.querySelector(".theme-toggle");
    if (btn) {
      btn.addEventListener("click", () => {
        const next = current() === "dark" ? "light" : "dark";
        localStorage.setItem("roundfair-theme", next);
        apply(next);
        document.dispatchEvent(new CustomEvent("roundfair:themechange"));
      });
    }

    const nav = document.querySelector(".nav");
    const menuBtn = document.querySelector(".nav-menu-toggle");
    if (nav && menuBtn) {
      const setOpen = (open) => {
        nav.classList.toggle("nav-open", open);
        menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      };
      menuBtn.addEventListener("click", () => setOpen(!nav.classList.contains("nav-open")));
      nav.querySelectorAll(".nav-menu a").forEach((a) => a.addEventListener("click", () => setOpen(false)));
      document.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });
    }

    // Nav dropdowns: click to open, one at a time; outside click or Escape closes
    const dds = [...document.querySelectorAll(".nav-dd")];
    const closeDds = (except) => dds.forEach((d) => { if (d !== except) { d.classList.remove("open"); d.querySelector(".nav-dd-btn").setAttribute("aria-expanded", "false"); } });
    dds.forEach((d) => d.querySelector(".nav-dd-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      const open = d.classList.toggle("open");
      d.querySelector(".nav-dd-btn").setAttribute("aria-expanded", open);
      closeDds(d);
    }));
    document.addEventListener("click", () => closeDds());
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeDds(); });

    // Nav: shadow once scrolled, highlight the section in view
    const onScroll = () => nav && nav.classList.toggle("is-scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const navLinks = [...document.querySelectorAll(".nav-menu a[href^='#']")];
    const sections = navLinks.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);
    if (sections.length && "IntersectionObserver" in window) {
      const visible = new Map();
      const sectionIO = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => visible.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0));
          let best = null;
          visible.forEach((ratio, id) => { if (ratio > 0 && (!best || ratio > best.ratio)) best = { id, ratio }; });
          navLinks.forEach((a) => a.classList.toggle("is-active", Boolean(best) && a.getAttribute("href") === "#" + best.id));
        },
        { rootMargin: "-30% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] }
      );
      sections.forEach((sec) => sectionIO.observe(sec));
    }

    // FAQ: animate open and close
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const faqItems = document.querySelectorAll(".faq-item");
    // accordion: opening one closes the others
    let expandingAll = false;
    const faqToggle = document.getElementById("faq-toggle");
    const syncToggle = () => faqToggle && faqToggle.setAttribute("aria-pressed", [...faqItems].every((o) => o.open));
    faqItems.forEach((item) =>
      item.addEventListener("toggle", () => {
        syncToggle();
        if (item.open && !expandingAll) faqItems.forEach((o) => o !== item && o.open && o.querySelector("summary").click());
      })
    );
    if (faqToggle)
      faqToggle.addEventListener("click", () => {
        const open = faqToggle.getAttribute("aria-pressed") !== "true";
        expandingAll = true;
        faqItems.forEach((o) => o.open !== open && o.querySelector("summary").click());
        setTimeout(() => (expandingAll = false), 400);
      });
    faqItems.forEach((item) => {
      const summary = item.querySelector("summary");
      const body = item.querySelector(".faq-body");
      if (!summary || !body || reduceMotion || typeof body.animate !== "function") return;
      let running = null;
      summary.addEventListener("click", (e) => {
        e.preventDefault();
        if (running) running.cancel();
        const opening = !item.open;
        if (opening) item.open = true;
        const full = body.scrollHeight;
        body.style.overflow = "hidden";
        running = body.animate(
          { height: opening ? ["0px", full + "px"] : [full + "px", "0px"], opacity: opening ? [0, 1] : [1, 0] },
          { duration: 260, easing: "cubic-bezier(0.22, 1, 0.36, 1)" }
        );
        running.onfinish = () => {
          if (!opening) item.open = false;
          body.style.height = "";
          body.style.overflow = "";
          running = null;
        };
      });
    });

    const revealed = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 }
      );
      revealed.forEach((el) => io.observe(el));
    } else {
      revealed.forEach((el) => el.classList.add("in"));
    }
  });
})();

// Email links are written without a raw address (so Cloudflare's email obfuscation has nothing to rewrite):
// <a class="js-mail" href="/contact.html" data-u="user" data-d="domain" data-s="subject">user [at] domain</a>
(function () {
  function mail() {
    document.querySelectorAll("a.js-mail[data-u][data-d]").forEach(function (a) {
      var addr = a.dataset.u + "@" + a.dataset.d;
      a.href = "mailto:" + addr + (a.dataset.s ? "?subject=" + encodeURIComponent(a.dataset.s) : "");
      if (a.dataset.keep === undefined) a.textContent = addr;
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mail); else mail();
})();
