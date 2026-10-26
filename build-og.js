// Renders a 1200×630 social share image for each blog post, feature, use case and hub page into
// assets/og/<name>.png, then points the page's og:image, twitter:image and Article image at it.
// build-pages.js picks the images up for the pages it generates. The homepage and company pages keep
// the app screenshot (assets/og-image.png).
// Needs Playwright (Chromium). Run after adding or renaming a page:
//   node build-og.js           only renders images that are missing
//   node build-og.js --force   re-renders every image
const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");
const SITE = "https://roundfair.support/";
const force = process.argv.includes("--force");

const pages = [
  ...["blog", "features", "use-cases"].flatMap((d) => fs.readdirSync(d).filter((f) => f.endsWith(".html")).map((f) => `${d}/${f}`)),
  "blog.html", "features.html", "use-cases.html", "calculators.html", "compare.html", "tools.html",
  ...["compare", "tools"].flatMap((d) => fs.readdirSync(d).filter((f) => f.endsWith(".html")).map((f) => `${d}/${f}`)),
  // translated blog (built by build-blog-i18n.js, which picks the images up)
  ...fs.readdirSync(".").filter((d) => /^[a-z]{2}$/.test(d) && fs.existsSync(`${d}/blog.html`))
    .flatMap((d) => [`${d}/blog.html`, ...fs.readdirSync(`${d}/blog`).map((f) => `${d}/blog/${f}`)]),
];
// blog/<slug>.html → <slug>.png (the original naming), features/<slug>.html → features-<slug>.png,
// nl/blog/<slug>.html → nl-blog-<slug>.png
const imageName = (p) => (p.startsWith("blog/") ? path.basename(p, ".html") : p.replace(/\.html$/, "").replace(/\//g, "-")) + ".png";
const section = (p) => "roundfair.support/" + p.replace(/\.html$/, "").split("/").slice(0, /^[a-z]{2}\//.test(p) ? 2 : 1).join("/");
const decode = (s) => s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<");
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const title = (h) => decode(h.match(/<title>([^<]+)<\/title>/)[1]).replace(/\s*[–|]\s*RoundFair$/, "");

const fontUrl = (f) => "data:font/woff2;base64," + fs.readFileSync(`assets/fonts/${f}`).toString("base64");
const icon = "data:image/png;base64," + fs.readFileSync("assets/app-icon-512.png").toString("base64");
const card = (t, label) => `<!doctype html><meta charset="utf-8"><style>
  @font-face { font-family: Outfit; src: url(${fontUrl("outfit.woff2")}); font-weight: 100 900; }
  @font-face { font-family: Outfit; src: url(${fontUrl("outfit-ext.woff2")}); font-weight: 100 900; unicode-range: U+0100-02BA, U+1E00-1EFF; }
  * { margin: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; background: #0f2f28; border-left: 20px solid #2bb491; font-family: Outfit, sans-serif;
         display: flex; flex-direction: column; justify-content: space-between; padding: 0 120px 38px 62px; }
  h1 { flex: 1; display: flex; align-items: center; color: #fff; font-weight: 700; letter-spacing: -0.5px;
       font-size: ${t.length > 48 ? 62 : 70}px; line-height: 1.15; max-width: 960px; }
  footer { display: flex; align-items: center; justify-content: space-between; }
  .brand { display: flex; align-items: center; gap: 20px; color: #2bb491; font-size: 40px; font-weight: 700; }
  .brand img { width: 72px; height: 72px; border-radius: 16px; }
  .url { color: #9fd8c8; font-size: 30px; }
</style><h1>${esc(t)}</h1><footer><div class="brand"><img src="${icon}">RoundFair</div><div class="url">${esc(label)}</div></footer>`;

const isStub = (p) => fs.readFileSync(p, "utf8").includes('http-equiv="refresh"'); // merged-post redirect stubs
(async () => {
  fs.mkdirSync("assets/og", { recursive: true });
  const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  let rendered = 0;
  for (const p of pages) {
    if (isStub(p)) continue;
    const out = `assets/og/${imageName(p)}`;
    if (force || !fs.existsSync(out)) {
      await page.setContent(card(title(fs.readFileSync(p, "utf8")), section(p)));
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({ path: out });
      rendered++;
    }
    // generated pages get their image from build-pages.js on the next build
    if (/^(features|use-cases|compare|tools|[a-z]{2})\//.test(p) || ["features.html", "use-cases.html", "compare.html", "tools.html"].includes(p)) continue;
    const img = SITE + out;
    let h = fs.readFileSync(p, "utf8");
    h = h.replace(/\n\s*<meta name="twitter:image" content="[^"]*" \/>/g, "") // drop duplicates, re-added once below
      .replace(/(<meta property="og:image" content=")[^"]*"/, `$1${img}"`)
      .replace(/(<meta name="twitter:card"[^>]*>)/, `$1\n  <meta name="twitter:image" content="${img}" />`)
      .replace(/("@type":\s*"Article"[\s\S]*?"image":\s*")[^"]*"/, `$1${img}"`);
    fs.writeFileSync(p, h);
  }
  await browser.close();
  console.log(`${rendered} share image(s) rendered, ${pages.length} pages checked`);
})();
