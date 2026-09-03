(function () {
  const LANGS = ["nl", "en", "fr", "de", "es", "it", "pt"];
  const STORAGE_KEY = "roundfair-lang";
  const cache = Object.create(null);
  let current = "en";
  let enPack = null;

  function detectLang() {
    const q = new URLSearchParams(location.search).get("lang");
    if (q && LANGS.includes(q.toLowerCase())) return q.toLowerCase();
    const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem("rf-lang");
    if (saved && LANGS.includes(saved)) return saved;
    const nav = (navigator.language || "en").toLowerCase();
    const short = nav.slice(0, 2);
    return LANGS.includes(short) ? short : "en";
  }

  function lookup(pack, key) {
    if (!pack || !key) return undefined;
    return key.split(".").reduce((acc, part) => (acc == null ? undefined : acc[part]), pack);
  }

  function t(key) {
    const v = lookup(cache[current], key);
    if (v != null) return v;
    const fallback = lookup(enPack || cache.en, key);
    return fallback != null ? fallback : key;
  }

  async function load(lang) {
    if (cache[lang]) return cache[lang];
    const res = await fetch(`assets/i18n/${lang}.json`, { cache: "no-cache" });
    if (!res.ok) throw new Error(`i18n ${lang}: ${res.status}`);
    cache[lang] = await res.json();
    return cache[lang];
  }

  function applyAttrs(el) {
    const specs = [];
    el.getAttributeNames().forEach((name) => {
      if (name === "data-i18n-attr") specs.push(el.getAttribute(name));
    });
    // support duplicate attributes poorly serialized — read last only; clean duplicates in HTML separately
    const spec = el.getAttribute("data-i18n-attr");
    if (!spec) return;
    spec.split(";").forEach((pair) => {
      const [attr, key] = pair.split(":").map((s) => s && s.trim());
      if (attr && key) el.setAttribute(attr, t(key));
    });
  }

  function apply() {
    document.documentElement.lang = current;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (key) el.textContent = t(key);
    });

    document.querySelectorAll("[data-i18n-attr]").forEach(applyAttrs);

    const isPrivacy = Boolean(document.querySelector(".privacy-page"));
    document.title = isPrivacy ? t("privacy.title") : t("meta.title");
    const setMeta = (sel, key) => {
      const node = document.querySelector(sel);
      if (node) node.setAttribute("content", t(key));
    };
    if (isPrivacy) {
      setMeta('meta[name="description"]', "privacy.description");
      setMeta('meta[property="og:title"]', "privacy.ogTitle");
      setMeta('meta[property="og:description"]', "privacy.ogDescription");
      setMeta('meta[name="twitter:title"]', "privacy.ogTitle");
      setMeta('meta[name="twitter:description"]', "privacy.ogDescription");
    } else {
      setMeta('meta[name="description"]', "meta.description");
      setMeta('meta[property="og:title"]', "meta.ogTitle");
      setMeta('meta[property="og:description"]', "meta.ogDescription");
      setMeta('meta[name="twitter:title"]', "meta.twitterTitle");
      setMeta('meta[name="twitter:description"]', "meta.twitterDescription");
    }

    const select = document.getElementById("lang-select");
    if (select && select.value !== current) select.value = current;

    document.querySelectorAll("[data-lang]").forEach((btn) => {
      btn.setAttribute("aria-pressed", btn.getAttribute("data-lang") === current ? "true" : "false");
      btn.classList.toggle("is-active", btn.getAttribute("data-lang") === current);
    });

    localStorage.setItem(STORAGE_KEY, current);
    // refresh theme toggle label if present
    document.dispatchEvent(new CustomEvent("rf:lang", { detail: { lang: current } }));
    if (window.applyThemeLabel) window.applyThemeLabel();
  }

  async function setLang(lang) {
    if (!LANGS.includes(lang)) lang = "en";
    if (!enPack) enPack = await load("en");
    await load(lang);
    current = lang;
    apply();
    const url = new URL(location.href);
    url.searchParams.set("lang", lang);
    history.replaceState(null, "", url);
  }

  async function init() {
    try {
      enPack = await load("en");
      const lang = detectLang();
      await setLang(lang);
    } catch (err) {
      console.warn("i18n init failed", err);
    }

    const select = document.getElementById("lang-select");
    if (select) select.addEventListener("change", () => setLang(select.value));

    document.querySelectorAll("[data-lang]").forEach((btn) => {
      btn.addEventListener("click", () => setLang(btn.getAttribute("data-lang")));
    });
  }

  window.RoundFairI18n = {
    t: (key) => t(key),
    setLang,
    get lang() { return current; },
    LANGS,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
