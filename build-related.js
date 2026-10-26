// Writes a "Related features and tools" block into each English blog post, from content/related.js,
// between <!-- related:start --> and <!-- related:end --> (placed before "Keep reading" on first run).
// Also sets the named author (Florian Ronsse) in the Article schema and the byline.
// Run: node build-related.js  (also runs on git commit via .githooks, after build-blog.js)
const fs = require("fs");
const MAP = require("./content/related.js");
const SITE = "https://roundfair.support/";
const FOUNDER = { "@type": "Person", "@id": SITE + "about.html#founder", name: "Florian Ronsse", jobTitle: "Founder", url: SITE + "about.html#founder", worksFor: { "@id": SITE + "#org" } };
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
let n = 0;
for (const f of fs.readdirSync("blog").filter((f) => f.endsWith(".html"))) {
  const file = "blog/" + f, slug = f.replace(/\.html$/, "");
  let s = fs.readFileSync(file, "utf8");
  if (s.includes('http-equiv="refresh"')) continue;
  const o = s;
  const links = MAP[slug];
  if (links) {
    const block = `<!-- related:start --><h2 id="related">Related features and tools</h2><ul>${links.map(([u, t]) => `<li><a href="../${u}">${esc(t)}</a></li>`).join("")}</ul><!-- related:end -->`;
    if (s.includes("<!-- related:start -->")) s = s.replace(/<!-- related:start -->[\s\S]*?<!-- related:end -->/, () => block);
    else if (s.includes("<h2>Keep reading</h2>")) s = s.replace("<h2>Keep reading</h2>", () => block + "\n    <h2>Keep reading</h2>");
    else s = s.replace("<!-- cta:start -->", () => block + "\n    <!-- cta:start -->");
  }
  s = s.replace(/("author":)\{"@type":"Organization"[^}]*\}/, (_, a) => a + JSON.stringify(FOUNDER))
    .replace(/(<p class="updated"><time[^>]*>[^<]*<\/time> · )By FairLead/, '$1By <a href="../about.html#founder">Florian Ronsse</a>');
  if (s !== o) { fs.writeFileSync(file, s); n++; }
}
console.log(`related blocks and author: ${n} post(s) updated`);
