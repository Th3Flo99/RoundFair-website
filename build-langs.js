// Generates static, crawlable translations of index.html at /<lang>/index.html from assets/i18n/*.json,
// plus the hreflang block in index.html and the /<lang>/ entries in sitemap.xml.
// Run: node build-langs.js  (also runs on git commit via .githooks). English stays at the root.
const fs = require("fs");
const SITE = "https://roundfair.support/";
const LANGS = ["nl", "fr", "de", "es", "it", "pt"];
const url = (l) => SITE + (l === "en" ? "" : l + "/");
const { pack, get, escT, escA, en, translator, LOCALE, translate } = require("./i18n-fill.js");
const flat = (o, p = "") => Object.entries(o).flatMap(([k, v]) => (typeof v === "object" ? flat(v, p + k + ".") : [[p + k, v]]));

const enByText = new Map(flat(en).map(([k, v]) => [v, k]));

const marker = (s, name, body) => s.replace(new RegExp(`(<!-- ${name}:start -->)[\\s\\S]*?(<!-- ${name}:end -->)`), (_, a, b) => `${a}\n${body}\n  ${b}`);
const hreflang = ["en", ...LANGS].map((l) => `  <link rel="alternate" hreflang="${l}" href="${url(l)}" />`).join("\n") +
  `\n  <link rel="alternate" hreflang="x-default" href="${SITE}" />`;

let src = fs.readFileSync("index.html", "utf8");
if (!src.includes("<!-- hreflang:start -->")) {
  src = src.replace(/(<link rel="canonical"[^>]*>)/, "$1\n  <!-- hreflang:start -->\n  <!-- hreflang:end -->");
}
src = marker(src, "hreflang", hreflang);
fs.writeFileSync("index.html", src);

function build(lang) {
  const t = translator(lang);
  let h = src;
  h = translate(h, t)
    .replace(' aria-current="page">English', ">English")
    .replace(`hreflang="${lang}" lang="${lang}">`, `hreflang="${lang}" lang="${lang}" aria-current="page">`);
  const meta = (sel, key) => { h = h.replace(new RegExp(`(<meta ${sel} content=")[^"]*"`), (_, a) => `${a}${escA(t(key))}"`); };
  h = h.replace(/<title>[\s\S]*?<\/title>/, `<title>${escT(t("meta.title"))}</title>`);
  meta('name="description"', "meta.description");
  meta('property="og:title"', "meta.ogTitle");
  meta('property="og:description"', "meta.ogDescription");
  meta('name="twitter:title"', "meta.twitterTitle");
  meta('name="twitter:description"', "meta.twitterDescription");
  h = h.replace(/(rel="canonical" href=")[^"]*"/, `$1${url(lang)}"`)
       .replace(/(property="og:url" content=")[^"]*"/, `$1${url(lang)}"`)
       .replace(/(property="og:type" content="website" \/>)/, `$1\n  <meta property="og:locale" content="${LOCALE[lang]}" />`)
       .replace('<html lang="en">', `<html lang="${lang}" data-fixed-lang>`)
       .replace(/\s*if \(l !== "en"\) d\.classList\.add\("i18n-loading"\);/, "")
       .replace(/<option value="en" selected>/, '<option value="en">')
       .replace(`<option value="${lang}">`, `<option value="${lang}" selected>`)
       .replace(/(href|src)="(?!https?:|mailto:|#|\/|data:)/g, '$1="/');
  h = h.replace(/(<script type="application\/ld\+json">)([\s\S]*?)(<\/script>)/g, (_, a, json, b) => {
    // entities with an @id (Organization, WebSite) are site-wide, so their url stays the root
    const walk = (v) => Array.isArray(v) ? v.map(walk) : v && typeof v === "object"
      ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, k === "url" && !v["@id"] ? url(lang) : walk(x)]))
      : typeof v === "string" && enByText.has(v) ? t(enByText.get(v)) : v;
    const data = JSON.parse(json);
    if (data.mainEntity) {
      data.mainEntity = data.mainEntity.filter((q) => enByText.has(q.name)); // drop Q&As with no translation
      data.inLanguage = lang;
    }
    return a + "\n  " + JSON.stringify(walk(data)) + "\n  " + b;
  });
  if (fs.existsSync(`${lang}/blog.html`)) h = h.replace(/href="\/blog\.html"/g, `href="/${lang}/blog.html"`); // translated blog, built by build-blog-i18n.js
  fs.mkdirSync(lang, { recursive: true });
  fs.writeFileSync(`${lang}/index.html`, h);
}
LANGS.forEach(build);

const sm = fs.readFileSync("sitemap.xml", "utf8"); // lastmod: build-sitemap.js
fs.writeFileSync("sitemap.xml", marker(sm, "lang", LANGS.map((l) => `  <url>\n    <loc>${url(l)}</loc>\n  </url>`).join("\n")));
console.log(`${LANGS.length} language pages built`);
