// Builds translated feature pages at /<lang>/features/<slug>.html from content/features-i18n/<lang>/<english-slug>.html
// (same header format as content/blog-i18n: slug, title, description; body from <h1> on, links relative to /features/).
// The English page (features/<slug>.html, built by build-pages.js) is the template for head, nav, CTA and footer.
// Also writes hreflang into the English pages, points links on /<lang>/ pages at the translated features,
// and adds the URLs to sitemap.xml. Run after build-langs.js: node build-features-i18n.js
const fs = require("fs");
const path = require("path");
const { escT, escA, translator, translate, LOCALE } = require("./i18n-fill.js");
const SITE = "https://roundfair.support/";
const SRC = "content/features-i18n";
const LANGS = fs.existsSync(SRC) ? fs.readdirSync(SRC).filter((l) => /^[a-z]{2}$/.test(l)).sort() : [];
const decode = (s) => s.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
const text = (s) => decode(s.replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim();
const marker = (s, name, body) => s.replace(new RegExp(`(<!-- ${name}:start -->)[\\s\\S]*?(<!-- ${name}:end -->)`), (_, a, b) => `${a}\n${body}\n  ${b}`);
const ensureMarker = (s, name) => s.includes(`<!-- ${name}:start -->`) ? s
  : s.replace(/(<link rel="canonical"[^>]*>)/, `$1\n  <!-- ${name}:start -->\n  <!-- ${name}:end -->`);
const header = (raw, file) => {
  const head = (raw.match(/^\s*<!--([\s\S]*?)-->/) || [])[1];
  if (!head) throw new Error(`${file}: missing header comment`);
  return Object.fromEntries(head.split("\n").map((l) => l.match(/^\s*(\w+):\s*(.+?)\s*$/)).filter(Boolean).map((m) => [m[1], m[2]]));
};

const pages = [];
for (const lang of LANGS) for (const f of fs.readdirSync(`${SRC}/${lang}`).filter((f) => f.endsWith(".html"))) {
  const file = `${SRC}/${lang}/${f}`, raw = fs.readFileSync(file, "utf8"), meta = header(raw, file), en = f.replace(/\.html$/, "");
  if (!fs.existsSync(`features/${f}`)) throw new Error(`${file}: no English page features/${f}`);
  for (const k of ["slug", "title", "description"]) if (!meta[k]) throw new Error(`${file}: header has no ${k}`);
  pages.push({ en, lang, slug: meta.slug, title: meta.title, desc: meta.description, body: raw.slice(raw.indexOf("-->") + 3).trim() });
}
// translated blog posts (content/blog-i18n) so links can prefer the reader's language
const posts = {};
for (const lang of fs.existsSync("content/blog-i18n") ? fs.readdirSync("content/blog-i18n").filter((l) => /^[a-z]{2}$/.test(l)) : [])
  for (const f of fs.readdirSync(`content/blog-i18n/${lang}`).filter((f) => f.endsWith(".html")))
    posts[`${lang}:/blog/${f}`] = `/${lang}/blog/${header(fs.readFileSync(`content/blog-i18n/${lang}/${f}`, "utf8"), f).slug}.html`;
const find = (lang, en) => pages.find((p) => p.lang === lang && p.en === en);
const url = (p) => `${SITE}${p.lang}/features/${p.slug}.html`;
const translated = (lang, abs) => {
  const m = abs.match(/^\/features\/([^/]+)\.html$/), p = m && find(lang, m[1]);
  return p ? `/${lang}/features/${p.slug}.html` : posts[`${lang}:${abs}`] || null;
};
function link(href, lang) {
  if (/^(https?:|mailto:|#|data:)/.test(href)) return href;
  if (href.startsWith("/")) { if (/^\/#/.test(href)) return href.replace(/^\/#/, `/${lang}/#`); if (href === "/") return `/${lang}/`; return href; }
  const [p, hash = ""] = href.split("#");
  const abs = path.posix.normalize(path.posix.join("/features/", p));
  const t = translated(lang, abs);
  return t || (abs === "/blog.html" && fs.existsSync(`${lang}/blog.html`) ? `/${lang}/blog.html` : abs + (hash ? "#" + hash : ""));
}
const altsFor = (en) => [["en", `${SITE}features/${en}.html`], ...LANGS.map((l) => find(l, en)).filter(Boolean).map((p) => [p.lang, url(p)])];
const hreflangBlock = (alts) => alts.map(([l, u]) => `  <link rel="alternate" hreflang="${l}" href="${u}" />`).join("\n") +
  `\n  <link rel="alternate" hreflang="x-default" href="${alts[0][1]}" />`;
const LD = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;

for (const p of pages) {
  const t = translator(p.lang), src = fs.readFileSync(`features/${p.en}.html`, "utf8"), u = url(p);
  const title = p.title.length <= 48 ? `${p.title} – RoundFair` : p.title;
  const set = (h, re, v) => h.replace(re, (_, a) => `${a}${escA(v)}"`);
  let h = src.replace(/<html lang="en">/, `<html lang="${p.lang}">`).replace(/<title>[\s\S]*?<\/title>/, `<title>${escT(title)}</title>`);
  for (const [re, v] of [[/(<meta name="description" content=")[^"]*"/, p.desc], [/(<meta property="og:title" content=")[^"]*"/, title],
    [/(<meta property="og:description" content=")[^"]*"/, p.desc], [/(<meta name="twitter:title" content=")[^"]*"/, title],
    [/(<meta name="twitter:description" content=")[^"]*"/, p.desc], [/(<meta property="og:url" content=")[^"]*"/, u], [/(<link rel="canonical" href=")[^"]*"/, u]]) h = set(h, re, v);
  h = h.replace(/\n\s*<meta property="og:locale"[^>]*>/, "").replace(/(<meta property="og:type"[^>]*>)/, `$1\n  <meta property="og:locale" content="${LOCALE[p.lang]}" />`);
  h = marker(ensureMarker(h, "hreflang"), "hreflang", hreflangBlock(altsFor(p.en)));
  const h1 = text((p.body.match(/<h1>([\s\S]*?)<\/h1>/) || [])[1] || "");
  if (!h1) throw new Error(`${p.lang}/${p.en}: no <h1>`);
  const faqHtml = (p.body.match(/<h2 id="faq">[\s\S]*?(?=<h2|$)/) || [""])[0];
  const faq = [...faqHtml.matchAll(/<h3>([\s\S]*?)<\/h3>\s*<p>([\s\S]*?)<\/p>/g)].map(([, q, a]) => [text(q), text(a)]);
  h = h.replace(LD, (all, json) => {
    const d = JSON.parse(json);
    if (d["@type"] === "WebPage") Object.assign(d, { name: title, description: p.desc, url: u, inLanguage: p.lang, isBasedOn: `${SITE}features/${p.en}.html` });
    else if (d["@type"] === "BreadcrumbList") d.itemListElement = [["RoundFair", `${SITE}${p.lang}/`], [t("nav.features"), `${SITE}features.html`], [h1, u]]
      .map(([name, item], i) => ({ "@type": "ListItem", position: i + 1, name, item }));
    else if (d["@type"] === "FAQPage") { d.mainEntity = faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })); d.inLanguage = p.lang; }
    return `<script type="application/ld+json">${JSON.stringify(d)}</script>`;
  });
  const enLabel = { nl: "Engelse versie", fr: "Version anglaise" }[p.lang] || "English";
  const kind = { nl: "RoundFair-functie", fr: "Fonctionnalité RoundFair" }[p.lang] || "RoundFair feature";
  const back = { nl: "← Alle functies (Engels)", fr: "← Toutes les fonctionnalités (en anglais)" }[p.lang] || "← All features";
  const main = `<main class="privacy-page">
    <a class="back-link" href="../features.html">${escT(back)}</a>
    ${p.body.match(/<h1>[\s\S]*?<\/h1>/)[0]}
    <p class="updated">${escT(kind)} · ${escT(t("blog.by"))} · <a href="/features/${p.en}.html" hreflang="en" lang="en">${escT(enLabel)}</a></p>
    ${p.body.replace(/^[\s\S]*?<\/h1>\s*/, "")}
    `;
  h = h.replace(/<main class="privacy-page">[\s\S]*?(?=<!-- cta:start -->)/, () => main);
  h = h.replace(/(href|src)="([^"]*)"/g, (_, a, v) => `${a}="${link(v, p.lang)}"`)
    .replace(/(<a class="nav-brand" href=")[^"]*"/g, `$1/${p.lang}/"`);
  h = h.replace(/<!-- cta:start -->[\s\S]*?<!-- cta:end -->/, (cta) => cta
    .replace('aria-label="Download RoundFair"', `aria-label="${escA(t("blog.ctaAria"))}"`)
    .replace("Your next round is on the app.", escT(t("blog.ctaTitle")))
    .replace("Free on the App Store. No account needed.", escT(t("blog.ctaSub")))
    .replace('aria-label="Download RoundFair on the App Store"', `aria-label="${escA(t("hero.badgeAria"))}"`)
    .replace(">Download on the<", `>${escT(t("hero.badgeSmall"))}<`));
  h = translate(h, t)
    .replace(/<button class="theme-toggle" type="button" aria-label="[^"]*"/, `<button class="theme-toggle" type="button" aria-label="${escA(t("theme.toDark"))}"`)
    .replace(' aria-current="page">English', ">English")
    .replace(`hreflang="${p.lang}" lang="${p.lang}">`, `hreflang="${p.lang}" lang="${p.lang}" aria-current="page">`);
  fs.mkdirSync(`${p.lang}/features`, { recursive: true });
  fs.writeFileSync(`${p.lang}/features/${p.slug}.html`, h);
}

// hreflang on the English originals
for (const en of new Set(pages.map((p) => p.en))) {
  const f = `features/${en}.html`;
  fs.writeFileSync(f, marker(ensureMarker(fs.readFileSync(f, "utf8"), "hreflang"), "hreflang", hreflangBlock(altsFor(en))));
}
// on the other /<lang>/ pages, link features to their translation
for (const lang of LANGS) {
  const files = [`${lang}/index.html`, `${lang}/blog.html`, ...(fs.existsSync(`${lang}/blog`) ? fs.readdirSync(`${lang}/blog`).map((f) => `${lang}/blog/${f}`) : [])].filter((f) => fs.existsSync(f));
  for (const f of files) {
    const s = fs.readFileSync(f, "utf8");
    const out = s.replace(/href="\/features\/([a-z0-9-]+)\.html(#[^"]*)?"/g, (all, en) => { const p = find(lang, en); return p ? `href="/${lang}/features/${p.slug}.html"` : all; });
    if (out !== s) fs.writeFileSync(f, out);
  }
}
const sm = fs.readFileSync("sitemap.xml", "utf8");
const entries = pages.map(url).map((u) => `  <url>\n    <loc>${u}</loc>\n  </url>`).join("\n");
fs.writeFileSync("sitemap.xml", sm.includes("<!-- features-i18n:start -->") ? marker(sm, "features-i18n", entries)
  : sm.replace("</urlset>", `  <!-- features-i18n:start -->\n${entries}\n  <!-- features-i18n:end -->\n</urlset>`));
console.log(`${pages.length} translated feature page(s) in ${LANGS.length} language(s)`);
