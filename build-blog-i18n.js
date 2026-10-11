// Builds translated blog posts at /<lang>/blog/<slug>.html and a blog index per language at /<lang>/blog.html.
// Source: content/blog-i18n/<lang>/<english-slug>.html, a header comment plus the translated body:
//   <!--
//   slug: <translated-url-slug>
//   title: <SEO title, no brand suffix>
//   description: <meta description>
//   date: <YYYY-MM-DD the translation was published>   (optional, defaults to the English post's date)
//   -->
//   <h1>…</h1> …translated body, from the lead paragraph to the "keep reading" list, hrefs as in the English post…
// The English post is the template: head, nav, CTA and footer come from it (so run after build-footer.js and
// build-cta.js), with interface strings from assets/i18n/<lang>.json. Also writes hreflang links into the
// English posts and blog.html, and the translated URLs into sitemap.xml.
// Run: node build-blog-i18n.js  (also runs on git commit via .githooks)
const fs = require("fs");
const path = require("path");
const { escT, escA, translator, translate, LOCALE } = require("./i18n-fill.js");
const SITE = "https://roundfair.support/";
const SRC = "content/blog-i18n";

const LANGS = fs.existsSync(SRC) ? fs.readdirSync(SRC).filter((l) => /^[a-z]{2}$/.test(l)).sort() : [];
const decode = (s) => s.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
const text = (s) => decode(s.replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim();
const marker = (s, name, body, ind = "  ") => s.replace(new RegExp(`(<!-- ${name}:start -->)[\\s\\S]*?(<!-- ${name}:end -->)`), (_, a, b) => `${a}\n${body}\n${ind}${b}`);
const ensureMarker = (s, name) => s.includes(`<!-- ${name}:start -->`) ? s
  : s.replace(/(<link rel="canonical"[^>]*>)/, `$1\n  <!-- ${name}:start -->\n  <!-- ${name}:end -->`);
const LD = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
const ldJson = (o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`;

// every translation, keyed by English slug: { en, lang, slug, title, desc, date, body }
const posts = [];
for (const lang of LANGS) {
  for (const f of fs.readdirSync(`${SRC}/${lang}`).filter((f) => f.endsWith(".html"))) {
    const raw = fs.readFileSync(`${SRC}/${lang}/${f}`, "utf8");
    const head = (raw.match(/^\s*<!--([\s\S]*?)-->/) || [])[1];
    if (!head) throw new Error(`${SRC}/${lang}/${f}: missing header comment`);
    const meta = Object.fromEntries(head.split("\n").map((l) => l.match(/^\s*(\w+):\s*(.+?)\s*$/)).filter(Boolean).map((m) => [m[1], m[2]]));
    const en = f.replace(/\.html$/, "");
    if (!fs.existsSync(`blog/${f}`)) throw new Error(`${SRC}/${lang}/${f}: no English post blog/${f}`);
    for (const k of ["slug", "title", "description"]) if (!meta[k]) throw new Error(`${SRC}/${lang}/${f}: header has no ${k}`);
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(meta.slug)) throw new Error(`${SRC}/${lang}/${f}: bad slug ${meta.slug}`);
    const enDate = (fs.readFileSync(`blog/${f}`, "utf8").match(/<meta name="date" content="([^"]+)"/) || [])[1];
    posts.push({ en, lang, slug: meta.slug, title: meta.title, desc: meta.description, date: meta.date || enDate, body: raw.slice(raw.indexOf("-->") + 3).trim() });
  }
}
const find = (lang, en) => posts.find((p) => p.lang === lang && p.en === en);
const postUrl = (p) => `${SITE}${p.lang}/blog/${p.slug}.html`;
const indexUrl = (lang) => `${SITE}${lang === "en" ? "" : lang + "/"}blog.html`;

// resolve a link written relative to /blog/ (as in the English post) to an absolute path, preferring this language
function link(href, lang) {
  if (/^(https?:|mailto:|#|\/)/.test(href)) return href.replace(/^\/#/, `/${lang}/#`); // home anchors (#how, #faq) exist per language
  const [p, hash = ""] = href.split("#");
  const abs = path.posix.normalize(path.posix.join("/blog/", p));
  const m = abs.match(/^\/blog\/([^/]+)\.html$/);
  const t = m && find(lang, m[1]);
  const target = t ? `/${lang}/blog/${t.slug}.html` : abs === "/blog.html" && LANGS.includes(lang) ? `/${lang}/blog.html` : abs;
  return target + (hash ? "#" + hash : "");
}
const relink = (html, lang) => html.replace(/(href|src)="([^"]*)"/g, (_, a, v) => `${a}="${link(v, lang)}"`);

const hreflangBlock = (alts) => alts.map(([l, u]) => `  <link rel="alternate" hreflang="${l}" href="${u}" />`).join("\n") +
  `\n  <link rel="alternate" hreflang="x-default" href="${alts[0][1]}" />`;

// head fields shared by posts and index pages
function retitle(h, { lang, title, desc, url, image, alts }) {
  const set = (re, v) => { h = h.replace(re, (_, a) => `${a}${escA(v)}"`); };
  h = h.replace(/<html lang="en">/, `<html lang="${lang}">`)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escT(title)}</title>`);
  set(/(<meta name="description" content=")[^"]*"/, desc);
  set(/(<meta property="og:title" content=")[^"]*"/, title);
  set(/(<meta property="og:description" content=")[^"]*"/, desc);
  set(/(<meta name="twitter:title" content=")[^"]*"/, title);
  set(/(<meta name="twitter:description" content=")[^"]*"/, desc);
  set(/(<meta property="og:url" content=")[^"]*"/, url);
  set(/(<link rel="canonical" href=")[^"]*"/, url);
  if (image) { set(/(<meta property="og:image" content=")[^"]*"/, image); set(/(<meta name="twitter:image" content=")[^"]*"/, image); }
  h = h.replace(/\n\s*<meta property="og:locale"[^>]*>/, "")
    .replace(/(<meta property="og:type"[^>]*>)/, `$1\n  <meta property="og:locale" content="${LOCALE[lang] || lang}" />`);
  return marker(ensureMarker(h, "hreflang"), "hreflang", hreflangBlock(alts));
}

const write = (file, html) => { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, html); };
const ogImage = (lang, slug, fallback) => fs.existsSync(`assets/og/${lang}-blog-${slug}.png`) ? `${SITE}assets/og/${lang}-blog-${slug}.png` : fallback;
const altsFor = (en) => [["en", `${SITE}blog/${en}.html`], ...LANGS.map((l) => find(l, en)).filter(Boolean).map((p) => [p.lang, postUrl(p)])];
const indexAlts = () => [["en", indexUrl("en")], ...LANGS.map((l) => [l, indexUrl(l)])];

// --- translated posts
for (const p of posts) {
  const t = translator(p.lang);
  const src = fs.readFileSync(`blog/${p.en}.html`, "utf8");
  const url = postUrl(p), title = p.title.length <= 48 ? `${p.title} – RoundFair` : p.title; // brand only if it fits in 60 characters
  const enImage = (src.match(/<meta property="og:image" content="([^"]+)"/) || [])[1];
  const image = ogImage(p.lang, p.slug, enImage);
  let h = retitle(src, { lang: p.lang, title, desc: p.desc, url, image, alts: altsFor(p.en) });
  h = h.replace(/(<meta name="date" content=")[^"]*"/, `$1${p.date}"`).replace(/(<meta property="article:published_time" content=")[^"]*"/, `$1${p.date}"`);

  const h1 = (p.body.match(/<h1>([\s\S]*?)<\/h1>/) || [])[1];
  if (!h1) throw new Error(`${SRC}/${p.lang}/${p.en}.html: no <h1>`);
  const faqHtml = (p.body.match(/<h2 id="faq">[\s\S]*?(?=<h2|$)/) || [""])[0];
  const faq = [...faqHtml.matchAll(/<h3>([\s\S]*?)<\/h3>\s*<p>([\s\S]*?)<\/p>/g)].map(([, q, a]) => [text(q), text(a)]);

  h = h.replace(LD, (all, json) => {
    const d = JSON.parse(json);
    if (d["@type"] === "Article") Object.assign(d, { headline: text(h1), description: p.desc, datePublished: p.date, dateModified: p.date, image, mainEntityOfPage: url, inLanguage: p.lang, isBasedOn: `${SITE}blog/${p.en}.html` });
    else if (d["@type"] === "BreadcrumbList") d.itemListElement = [["RoundFair", `${SITE}${p.lang}/`], ["Blog", indexUrl(p.lang)], [text(h1), url]]
      .map(([name, item], i) => ({ "@type": "ListItem", position: i + 1, name, item }));
    else if (d["@type"] === "FAQPage") { d.mainEntity = faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })); d.inLanguage = p.lang; }
    return ldJson(d);
  });

  const main = `<main class="privacy-page">
    <a class="back-link" href="../blog.html">${escT(t("blog.back"))}</a>
    <h1>${h1}</h1>
    <p class="updated"><time datetime="${p.date}">${p.date}</time> · ${escT(t("blog.by"))} · <a href="/blog/${p.en}.html" hreflang="en" lang="en">${escT(t("blog.readEnglish"))}</a></p>
    ${p.body.replace(/^[\s\S]*?<\/h1>\s*/, "")}
    `;
  h = h.replace(/<main class="privacy-page">[\s\S]*?(?=<!-- cta:start -->)/, () => main);
  // the English links are relative to /blog/; relink everything, then translate the CTA, nav and footer
  h = relink(h, p.lang)
    .replace(/(<a class="back-link" href=")[^"]*"/, `$1/${p.lang}/blog.html"`)
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
  write(`${p.lang}/blog/${p.slug}.html`, h);
}

// --- one blog index per language, from blog.html
const enIndex = fs.readFileSync("blog.html", "utf8");
for (const lang of LANGS) {
  const t = translator(lang);
  const list = posts.filter((p) => p.lang === lang).sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
  const url = indexUrl(lang);
  let h = retitle(enIndex, { lang, title: t("blog.indexTitle"), desc: t("blog.indexDescription"), url,
    image: fs.existsSync(`assets/og/${lang}-blog.png`) ? `${SITE}assets/og/${lang}-blog.png` : null, alts: indexAlts() });
  h = h.replace(LD, (all, json) => {
    const d = JSON.parse(json);
    if (d["@type"] !== "Blog") return all;
    return ldJson({ ...d, name: t("blog.indexTitle"), description: t("blog.indexDescription"), url, inLanguage: lang,
      blogPost: list.map((p) => ({ "@type": "BlogPosting", headline: p.title, url: postUrl(p), datePublished: p.date })) });
  });
  h = h.replace(/<h1>[\s\S]*?<\/h1>/, `<h1>${escT(t("blog.indexH1"))}</h1>`)
    .replace(/(<h1>[\s\S]*?<\/h1>\s*<p class="updated">)[\s\S]*?(<\/p>)/, `$1${escT(t("blog.indexLead"))}$2`)
    .replace(/<!-- posts:start -->[\s\S]*?<!-- posts:end -->/, () => `<!-- posts:start -->\n${list.map((p) => `    <article class="blog-item">
      <time datetime="${p.date}">${p.date}</time>
      <h2><a href="/${lang}/blog/${p.slug}.html">${escT(p.title)}</a></h2>
      <p>${escT(p.desc)}</p>
    </article>`).join("\n")}\n    <!-- posts:end -->`);
  h = relink(h.replace(/(href|src)="(?!https?:|mailto:|#|\/|data:)/g, '$1="/'), lang) // blog.html links are root-relative
    .replace(/(<a class="back-link" href=")[^"]*"/, `$1/${lang}/"`);
  h = translate(h, t)
    .replace(/<button class="theme-toggle" type="button" aria-label="[^"]*"/, `<button class="theme-toggle" type="button" aria-label="${escA(t("theme.toDark"))}"`)
    .replace(' aria-current="page">English', ">English")
    .replace(`hreflang="${lang}" lang="${lang}">`, `hreflang="${lang}" lang="${lang}" aria-current="page">`);
  write(`${lang}/blog.html`, h);
}

// --- hreflang on the English originals and blog.html
for (const f of fs.readdirSync("blog").filter((f) => f.endsWith(".html"))) {
  const en = f.replace(/\.html$/, ""), alts = altsFor(en), file = `blog/${f}`;
  const s = fs.readFileSync(file, "utf8");
  const out = alts.length > 1 ? marker(ensureMarker(s, "hreflang"), "hreflang", hreflangBlock(alts))
    : s.replace(/\n\s*<!-- hreflang:start -->[\s\S]*?<!-- hreflang:end -->/, "");
  if (out !== s) fs.writeFileSync(file, out);
}
if (LANGS.length) fs.writeFileSync("blog.html", marker(ensureMarker(enIndex, "hreflang"), "hreflang", hreflangBlock(indexAlts())));

// --- sitemap
const sm = fs.readFileSync("sitemap.xml", "utf8");
const entries = [...LANGS.map(indexUrl), ...posts.map(postUrl)].map((u) => `  <url>\n    <loc>${u}</loc>\n  </url>`).join("\n"); // lastmod: build-sitemap.js
fs.writeFileSync("sitemap.xml", sm.includes("<!-- blog-i18n:start -->") ? marker(sm, "blog-i18n", entries)
  : sm.replace("</urlset>", `  <!-- blog-i18n:start -->\n${entries}\n  <!-- blog-i18n:end -->\n</urlset>`));
console.log(`${posts.length} translated post(s) in ${LANGS.length} language(s)`);
