// Sets every <lastmod> in sitemap.xml from git: the date of the last commit that changed the page's file,
// or today if the file has changes that are not committed yet (new or edited in this commit).
// Run after the other build scripts: node build-sitemap.js  (also runs on git commit via .githooks)
const fs = require("fs");
const { execFileSync } = require("child_process");
const SITE = "https://roundfair.support/";
const today = new Date().toISOString().slice(0, 10);
const git = (...args) => execFileSync("git", args, { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();

function lastmod(file) {
  try {
    git("ls-files", "--error-unmatch", file);
    if (git("diff", "HEAD", "--name-only", "--", file)) return today;
    return git("log", "-1", "--format=%cs", "--", file) || today;
  } catch (e) {
    return today; // untracked, or not a git checkout
  }
}

const sm = fs.readFileSync("sitemap.xml", "utf8");
let missing = [];
const out = sm.replace(/<url>\s*<loc>([^<]+)<\/loc>(?:\s*<lastmod>[^<]*<\/lastmod>)?\s*<\/url>/g, (_, loc) => {
  const rel = loc.replace(SITE, "");
  const file = rel === "" || rel.endsWith("/") ? rel + "index.html" : rel;
  if (!fs.existsSync(file)) missing.push(loc);
  return `<url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod(file)}</lastmod>\n  </url>`;
});
if (missing.length) throw new Error("sitemap.xml lists URLs with no file: " + missing.join(", "));
fs.writeFileSync("sitemap.xml", out);
console.log("sitemap lastmod dates set from git");
