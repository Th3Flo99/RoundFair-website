// Regenerates the post list in blog.html and the blog/ entries in sitemap.xml
// from every blog/*.html. Run: node build-blog.js  (also runs on git commit via .githooks)
// A post needs <title>, <meta name="description"> and <meta name="date" content="YYYY-MM-DD">.
const fs = require("fs");
const SITE = "https://roundfair.support/";
const meta = (h, re) => (h.match(re) || [])[1];

const posts = fs.readdirSync("blog").filter((f) => f.endsWith(".html")).map((f) => {
  const h = fs.readFileSync("blog/" + f, "utf8");
  const date = meta(h, /<meta name="date" content="([^"]+)"/);
  const title = meta(h, /<title>([^<]+?)(?: – RoundFair)?<\/title>/);
  const desc = meta(h, /<meta name="description" content="([^"]+)"/);
  if (!date || !title || !desc) throw new Error(`blog/${f}: missing title, description or date meta`);
  return { f, date, title, desc };
}).sort((a, b) => b.date.localeCompare(a.date));

const list = posts.map((p) => `    <article class="blog-item">
      <time datetime="${p.date}">${p.date}</time>
      <h2><a href="blog/${p.f}">${p.title}</a></h2>
      <p>${p.desc}</p>
    </article>`).join("\n");

const swap = (file, start, end, body, ind = "  ") => {
  const s = fs.readFileSync(file, "utf8");
  const re = new RegExp(`(${start})[\\s\\S]*?\\s*(${end})`);
  if (!re.test(s)) throw new Error(`${file}: markers missing`);
  fs.writeFileSync(file, s.replace(re, (_, a, b) => `${a}\n${body}\n${ind}${b}`));
};

swap("blog.html", "<!-- posts:start -->", "<!-- posts:end -->", list, "    ");
const urls = posts.map((p) => `  <url>
    <loc>${SITE}blog/${p.f}</loc>
  </url>`).join("\n"); // lastmod: build-sitemap.js
swap("sitemap.xml", "<!-- blog:start -->", "<!-- blog:end -->", urls);
console.log(`${posts.length} posts synced`);

// Every post gets the article layout script (post.js), even if the generator forgot it.
for (const p of posts) {
  const file = "blog/" + p.f, h = fs.readFileSync(file, "utf8");
  if (!h.includes("post.js")) fs.writeFileSync(file, h.replace(/(\s*)(<script src="\.\.\/script\.js[^>]*><\/script>)/, '$1<script src="../post.js?v=1" defer></script>$1$2'));
}
