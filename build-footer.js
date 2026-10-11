// Single source for the site footer, used on every page. Edit FOOTER below, then run: node build-footer.js
// (also runs on git commit via .githooks, before build-langs so /<lang>/ pages inherit it).
// Pages carry <!-- footer:start --><!-- footer:end -->; a legacy <footer class="footer"> is converted on first run.
// Never edit the footer inside a page: it is overwritten.
const fs = require("fs");
const APP = "https://apps.apple.com/app/id6763799194";
// No raw email address in the footer: Cloudflare email obfuscation rewrites it into a broken /cdn-cgi/ link.
// Support goes to contact.html, which reveals the address with script.js (a.js-mail).
const APPLE = "M17.05 12.54c-.03-2.89 2.36-4.28 2.47-4.35-1.35-1.97-3.44-2.24-4.18-2.27-1.78-.18-3.47 1.05-4.37 1.05-.9 0-2.29-1.02-3.77-.99-1.94.03-3.73 1.13-4.73 2.86-2.02 3.5-.52 8.68 1.45 11.52.96 1.39 2.1 2.95 3.6 2.9 1.45-.06 1.99-.94 3.74-.94 1.75 0 2.24.94 3.77.91 1.56-.03 2.54-1.41 3.49-2.81 1.1-1.61 1.55-3.17 1.58-3.25-.04-.02-3.02-1.16-3.05-4.63zM14.17 4.04c.8-.97 1.34-2.32 1.19-3.66-1.15.05-2.55.77-3.38 1.73-.74.86-1.39 2.23-1.22 3.55 1.29.1 2.6-.65 3.41-1.62z";

// plain links to every homepage translation, labelled in their own language
const LANGS = [["en", "English"], ["nl", "Nederlands"], ["fr", "Français"], ["de", "Deutsch"], ["es", "Español"], ["it", "Italiano"], ["pt", "Português"]];

// up = path prefix to the site root; home = the page is the English home page (in-page anchors work there)
const FOOTER = (up, home) => {
  const a = (href, label, key) => `<a href="${href}"${key ? ` data-i18n="${key}"` : ""}>${label}</a>`;
  const h = home ? "" : "/";
  const col = (key, title, links) => `<nav class="footer-col" data-i18n-attr="aria-label:footer.${key}">
          <h3 data-i18n="footer.${key}">${title}</h3>
          ${links.join("\n          ")}
        </nav>`;
  return `<footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a class="nav-brand" href="${home ? "#" : "/"}">
            <img src="${up}assets/roundfair-logo.png" alt="" width="30" height="30" />
            RoundFair
          </a>
          <p class="footer-tagline" data-i18n="footer.tagline">Whose turn, and settle fair.</p>
          <a class="appstore-badge footer-badge" href="${APP}" aria-label="Download RoundFair on the App Store" data-i18n-attr="aria-label:hero.badgeAria">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="${APPLE}"/></svg>
            <span class="badge-text">
              <span class="badge-small" data-i18n="hero.badgeSmall">Download on the</span>
              <span class="badge-big" data-i18n="hero.badgeBig">App Store</span>
            </span>
          </a>
        </div>
        ${col("product", "Product", [
          a(`${h}#how`, "How it works", "nav.how"),
          a(`${up}features.html`, "Features", "nav.features"),
          a(`${up}use-cases.html`, "Use cases", "nav.useCases"),
          a(`${up}tools.html`, "Free tools", "footer.tools"),
          a(`${up}compare.html`, "Compare apps", "footer.compare"),
          a(`${h}#faq`, "FAQ", "nav.faq"),
        ])}
        ${col("company", "Company", [
          a(`${up}about.html`, "About", "footer.about"),
          a(`${up}blog.html`, "Blog", "footer.blog"),
          a(`${up}press.html`, "Press", "footer.press"),
          a(`${up}contact.html`, "Contact", "footer.contact"),
        ])}
        ${col("help", "Help", [
          a(`${up}help.html`, "Help center", "footer.helpCenter"),
          a(`${up}contact.html`, "Support", "footer.support"),
          a(`${up}privacy.html`, "Privacy Policy", "footer.privacy"),
          a(`${up}terms.html`, "Terms", "footer.terms"),
        ])}
      </div>
      <nav class="footer-langs" aria-label="Languages" data-i18n-attr="aria-label:footer.languages">
        ${LANGS.map(([l, name]) => `<a href="${l === "en" ? "/" : `/${l}/`}" hreflang="${l}" lang="${l}"${home && l === "en" ? ' aria-current="page"' : ""}>${name}</a>`).join("\n        ")}
      </nav>
      <div class="footer-bottom">
        <p class="copyright"><span data-i18n="footer.copyright">© 2026 FairLead</span><span class="footer-dot" aria-hidden="true">·</span><span data-i18n="footer.updated">Last updated: September 2026</span></p>
        <a class="footer-appstore" href="${APP}" data-i18n="footer.appStore">App Store</a>
      </div>
    </div>
  </footer>`;
};

const dirs = ["blog", "features", "use-cases", "compare", "tools", "help"];
const files = [...fs.readdirSync(".").filter((f) => f.endsWith(".html")),
  ...dirs.flatMap((d) => fs.readdirSync(d).filter((f) => f.endsWith(".html")).map((f) => `${d}/${f}`))];
const M = (b) => `<!-- footer:start -->\n  ${b}\n  <!-- footer:end -->`;
let n = 0;
for (const f of files) {
  const s = fs.readFileSync(f, "utf8");
  if (s.includes('http-equiv="refresh"')) continue; // redirect stubs for merged pages
  const up = f === "404.html" ? "/" : f.includes("/") ? "../" : "";
  const block = M(FOOTER(up, f === "index.html"));
  const re = /<!-- footer:start -->[\s\S]*?<!-- footer:end -->|<footer class="footer">[\s\S]*?<\/footer>/;
  const out = re.test(s) ? s.replace(re, () => block) : s.replace(/\n?<\/body>/, () => `\n  ${block}\n</body>`);
  if (out === s) continue;
  if (!out.includes("footer:start")) throw new Error(`${f}: could not place footer`);
  fs.writeFileSync(f, out); n++;
}
console.log(`footer: ${n} page(s) updated`);
