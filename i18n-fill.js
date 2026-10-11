// Shared helpers for the static translation builders (build-langs.js, build-blog-i18n.js):
// fill every data-i18n / data-i18n-attr element of an HTML string from a language pack.
const fs = require("fs");
const pack = (l) => JSON.parse(fs.readFileSync(`assets/i18n/${l}.json`, "utf8"));
const get = (o, k) => k.split(".").reduce((a, p) => (a == null ? undefined : a[p]), o);
const escT = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const escA = (s) => escT(s).replace(/"/g, "&quot;");
const en = pack("en");
// t(key) for a language, falling back to English, then to the key itself
const translator = (lang) => { const T = pack(lang); return (k) => get(T, k) ?? get(en, k) ?? k; };
const LOCALE = { en: "en_GB", nl: "nl_NL", fr: "fr_FR", de: "de_DE", es: "es_ES", it: "it_IT", pt: "pt_PT" };

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

// sets every attribute named in data-i18n-attr="attr:key;attr:key"
const fillAttrs = (html, t) => html.replace(/<[a-z0-9]+\b[^>]*\sdata-i18n-attr="([^"]+)"[^>]*>/g, (tag, spec) => {
  for (const pair of spec.split(";")) {
    const [attr, key] = pair.split(":").map((s) => s.trim());
    const val = ` ${attr}="${escA(t(key))}"`;
    const re = new RegExp(`\\s${attr}="[^"]*"`);
    tag = re.test(tag) ? tag.replace(re, () => val) : tag.replace(/\s*\/?>$/, (e) => val + e);
  }
  return tag;
});

const translate = (html, t) => fillContent(fillAttrs(html, t), t);

module.exports = { pack, get, escT, escA, en, translator, LOCALE, fillContent, fillAttrs, translate };
