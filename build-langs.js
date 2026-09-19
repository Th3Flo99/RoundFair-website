// Generates static, crawlable translations of index.html at /<lang>/index.html from assets/i18n/*.json,
// plus the hreflang block in index.html and the /<lang>/ entries in sitemap.xml.
// Run: node build-langs.js  (also runs on git commit via .githooks). English stays at the root.
const fs = require("fs");
const { execSync } = require("child_process");
const SITE = "https://roundfair.support/";
const LANGS = ["nl", "fr", "de", "es", "it", "pt"];
const url = (l) => SITE + (l === "en" ? "" : l + "/");
const pack = (l) => JSON.parse(fs.readFileSync(`assets/i18n/${l}.json`, "utf8"));
const get = (o, k) => k.split(".").reduce((a, p) => (a == null ? undefined : a[p]), o);
const escT = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const escA = (s) => escT(s).replace(/"/g, "&quot;");
const flat = (o, p = "") => Object.entries(o).flatMap(([k, v]) => (typeof v === "object" ? flat(v, p + k + ".") : [[p + k, v]]));

const en = pack("en");
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

// replaces the content of every element carrying data-i18n (nesting-safe for same-tag children)
function fillContent(html, t) {
  const open = /<([a-z0-9]+)\b[^>]*\sdata-i18n="([^"]+)"[^>]*>/g;
  let out = "", last = 0, m;
  while ((m = open.exec(html))) {
    const tag = m[1], start = m.index + m[0].length;
    const re = new RegExp(`<${tag}\\b|</${tag}>`, "g");
    re.lastIndex = start;
    let depth = 1, c;
    while ((c = re.exec(html)) && (depth += c[0][1] === "/" ? -1 : 1)) ;
    if (!c) continue;
    out += html.slice(last, start) + escT(t(m[2]));
    last = c.index;
    open.lastIndex = c.index;
  }
  return out + html.slice(last);
}

function build(lang) {
  const T = pack(lang);
  const t = (k) => get(T, k) ?? get(en, k) ?? k;
  let h = src;
  h = h.replace(/<[a-z0-9]+\b[^>]*\sdata-i18n-attr="([^"]+)"[^>]*>/g, (tag, spec) => {
    for (const pair of spec.split(";")) {
      const [attr, key] = pair.split(":").map((s) => s.trim());
      const val = ` ${attr}="${escA(t(key))}"`;
      const re = new RegExp(`\\s${attr}="[^"]*"`);
      tag = re.test(tag) ? tag.replace(re, () => val) : tag.replace(/\s*\/?>$/, (e) => val + e);
    }
    return tag;
  });
  h = fillContent(h, t);
  const meta = (sel, key) => { h = h.replace(new RegExp(`(<meta ${sel} content=")[^"]*"`), (_, a) => `${a}${escA(t(key))}"`); };
  h = h.replace(/<title>[\s\S]*?<\/title>/, `<title>${escT(t("meta.title"))}</title>`);
  meta('name="description"', "meta.description");
  meta('property="og:title"', "meta.ogTitle");
  meta('property="og:description"', "meta.ogDescription");
  meta('name="twitter:title"', "meta.twitterTitle");
  meta('name="twitter:description"', "meta.twitterDescription");
  h = h.replace(/(rel="canonical" href=")[^"]*"/, `$1${url(lang)}"`)
       .replace(/(property="og:url" content=")[^"]*"/, `$1${url(lang)}"`)
       .replace(/(property="og:type" content="website" \/>)/, `$1\n  <meta property="og:locale" content="${lang}" />`)
       .replace('<html lang="en">', `<html lang="${lang}" data-fixed-lang>`)
       .replace(/\s*if \(l !== "en"\) d\.classList\.add\("i18n-loading"\);/, "")
       .replace(/<option value="en" selected>/, '<option value="en">')
       .replace(`<option value="${lang}">`, `<option value="${lang}" selected>`)
       .replace(/(href|src)="(?!https?:|mailto:|#|\/|data:)/g, '$1="/');
  h = h.replace(/(<script type="application\/ld\+json">)([\s\S]*?)(<\/script>)/g, (_, a, json, b) => {
    const walk = (v) => Array.isArray(v) ? v.map(walk) : v && typeof v === "object"
      ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, k === "url" ? url(lang) : walk(x)]))
      : typeof v === "string" && enByText.has(v) ? t(enByText.get(v)) : v;
    const data = JSON.parse(json);
    if (data.mainEntity) data.mainEntity = data.mainEntity.filter((q) => enByText.has(q.name)); // drop Q&As with no translation
    return a + "\n  " + JSON.stringify(walk(data)) + "\n  " + b;
  });
  fs.mkdirSync(lang, { recursive: true });
  fs.writeFileSync(`${lang}/index.html`, h);
}
LANGS.forEach(build);

let lastmod;
try { lastmod = execSync("git log -1 --format=%cs -- index.html assets/i18n build-langs.js", { encoding: "utf8" }).trim(); } catch (e) {}
lastmod ||= new Date().toISOString().slice(0, 10);
const sm = fs.readFileSync("sitemap.xml", "utf8");
fs.writeFileSync("sitemap.xml", marker(sm, "lang", LANGS.map((l) => `  <url>\n    <loc>${url(l)}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`).join("\n")));
console.log(`${LANGS.length} language pages built`);
