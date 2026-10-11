// Single source for the closing download card on blog, features and use-case pages.
// Edit CTA below, then run: node build-cta.js  (also runs on git commit via .githooks)
// Pages carry <!-- cta:start --><!-- cta:end -->; a legacy <p class="cta-box"> is converted on first run.
const fs = require("fs");
const APP = "https://apps.apple.com/app/id6763799194";
const APPLE = "M17.05 12.54c-.03-2.89 2.36-4.28 2.47-4.35-1.35-1.97-3.44-2.24-4.18-2.27-1.78-.18-3.47 1.05-4.37 1.05-.9 0-2.29-1.02-3.77-.99-1.94.03-3.73 1.13-4.73 2.86-2.02 3.5-.52 8.68 1.45 11.52.96 1.39 2.1 2.95 3.6 2.9 1.45-.06 1.99-.94 3.74-.94 1.75 0 2.24.94 3.77.91 1.56-.03 2.54-1.41 3.49-2.81 1.1-1.61 1.55-3.17 1.58-3.25-.04-.02-3.02-1.16-3.05-4.63zM14.17 4.04c.8-.97 1.34-2.32 1.19-3.66-1.15.05-2.55.77-3.38 1.73-.74.86-1.39 2.23-1.22 3.55 1.29.1 2.6-.65 3.41-1.62z";

const cta = (up) => `<aside class="cta-box" aria-label="Download RoundFair">
      <img class="cta-icon" src="${up}assets/app-icon.png" alt="" width="72" height="72" loading="lazy" />
      <div class="cta-copy">
        <p class="cta-title">Your next round is on the app.</p>
        <p class="cta-sub">Free on the App Store. No account needed.</p>
      </div>
      <a class="appstore-badge" href="${APP}" aria-label="Download RoundFair on the App Store">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="${APPLE}"/></svg>
        <span class="badge-text"><span class="badge-small">Download on the</span><span class="badge-big">App Store</span></span>
      </a>
    </aside>`;

const dirs = ["blog", "features", "use-cases"];
const files = ["features.html", "use-cases.html", "calculators.html", ...dirs.flatMap((d) => fs.readdirSync(d).filter((f) => f.endsWith(".html")).map((f) => `${d}/${f}`))];
const M = (b) => `<!-- cta:start -->\n    ${b}\n    <!-- cta:end -->`;
let n = 0;
for (const f of files) {
  const s = fs.readFileSync(f, "utf8"), block = M(cta(f.includes("/") ? "../" : ""));
  const re = /<!-- cta:start -->[\s\S]*?<!-- cta:end -->|<p class="cta-box">[\s\S]*?<\/p>/;
  if (!re.test(s)) throw new Error(`${f}: no CTA found`);
  const out = s.replace(re, () => block);
  if (out !== s) { fs.writeFileSync(f, out); n++; }
}
console.log(`cta synced on ${n}/${files.length} pages`);
