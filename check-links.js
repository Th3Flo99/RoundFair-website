// Fails (exit 1) if any internal href in any .html file points to a missing file.
// Run: node check-links.js  (also runs on git commit via .githooks)
const fs = require("fs"), p = require("path");
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) =>
  e.name === "node_modules" || e.name === "content" || e.name[0] === "." ? [] : e.isDirectory() ? walk(p.join(d, e.name)) : e.name.endsWith(".html") ? [p.join(d, e.name)] : []);
let bad = 0;
for (const f of walk(".")) {
  for (const m of fs.readFileSync(f, "utf8").matchAll(/href="([^"#?]+)[^"]*"/g)) {
    const u = m[1];
    if (/^(https?:|mailto:)/.test(u)) continue;
    const t = u.startsWith("/") ? u.slice(1) || "index.html" : p.join(p.dirname(f), u);
    if (!fs.existsSync(t) || (fs.statSync(t).isDirectory() && !fs.existsSync(p.join(t, "index.html")))) { console.error(`${f} -> ${u}`); bad++; }
  }
}
if (bad) { console.error(`${bad} broken internal link(s)`); process.exit(1); }
console.log("internal links ok");
