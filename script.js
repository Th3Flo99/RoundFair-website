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
    document.querySelectorAll(".faq-item").forEach((item) => {
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
