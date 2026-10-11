// Generates the comparison pages (compare.html, compare/*.html), the free browser tools (tools.html, tools/*.html)
// and the help center (help.html, help/*.html), plus their sitemap entries.
// Content: content/compare.js and content/tools-help.js. Layout: build-pages.js.
// Run: node build-extra.js  (also runs on git commit via .githooks, after build-pages.js)
const fs = require("fs");
const { SITE, APP, esc, rich, slugify, layout, crumbs, write, FOUNDER } = require("./build-pages.js");
const C = require("./content/compare.js");
const { tools, help } = require("./content/tools-help.js");
const today = new Date().toISOString().slice(0, 10);
const ORG = { "@type": "Organization", "@id": SITE + "#org", name: "FairLead", url: SITE, logo: SITE + "assets/app-icon-512.png" };
const faqLd = (faq) => ({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) });
const faqHtml = (faq) => faq.length ? `    <h2 id="faq">Frequently asked questions</h2>\n${faq.map(([q, a]) => `    <h3>${esc(q)}</h3><p>${esc(a)}</p>`).join("\n")}\n` : "";
// sections: [h2, [paragraph | "- list item" | raw "<html>"]]
const sections = (secs, up) => secs.map(([h, ps]) => {
  const out = []; let li = [];
  const flush = () => { if (li.length) out.push(`    <ul>\n${li.map((x) => `      <li>${rich(x, up)}</li>`).join("\n")}\n    </ul>`); li = []; };
  for (const p of ps) { if (p.startsWith("- ")) li.push(p.slice(2)); else { flush(); out.push(p.startsWith("<") ? `    ${p}` : `    <p>${rich(p, up)}</p>`); } }
  flush();
  return `    <h2 id="${slugify(h)}">${esc(h)}</h2>\n${out.join("\n")}`;
}).join("\n");
const list = (items, dir, up) => `    <ul>\n${items.map((i) => `      <li><a href="${up}${dir}/${i.slug}.html">${esc(i.name)}</a>: ${esc(i.desc)}</li>`).join("\n")}\n    </ul>`;
const urls = [];
const page = (url, args) => { write(url, layout({ up: url.includes("/") ? "../" : "", url, ...args })); urls.push(url); };
const byline = (up, extra = "") => `    <p class="updated">${extra}By <a href="${up}about.html#founder">Florian Ronsse</a>, founder of FairLead</p>`;

// --- comparisons
for (const p of C.pages) {
  const url = `compare/${p.slug}.html`, up = "../", title = `${p.title}`.length <= 48 ? `${p.title} – RoundFair` : p.title;
  page(url, { title, desc: p.desc, ogType: "article",
    ld: [crumbs([["RoundFair", ""], ["Compare", "compare.html"], [p.name, url]]),
      { "@context": "https://schema.org", "@type": "Article", headline: p.title, description: p.desc, datePublished: "2026-10-11", dateModified: today,
        mainEntityOfPage: SITE + url, author: FOUNDER, publisher: ORG, inLanguage: "en",
        about: { "@type": "SoftwareApplication", name: "RoundFair", operatingSystem: "iOS", applicationCategory: "FinanceApplication", url: APP } },
      faqLd(p.faq)],
    body: `    <a class="back-link" href="../compare.html">← All comparisons</a>
    <h1>${esc(p.title)}</h1>
${byline(up, `Checked against official listings on ${C.CHECKED} · `)}
    <p>${esc(p.lead)}</p>
${sections(p.sections, up)}
${faqHtml(p.faq)}    <h2 id="sources">Sources</h2>
    <ul>
${p.sources.map((k) => `      <li><a href="${C.SRC[k][1]}" rel="nofollow">${esc(C.SRC[k][0])}</a></li>`).join("\n")}
    </ul>
    <p><em>RoundFair is made by FairLead, so we are not neutral. We have tried to describe other apps only by what their own listings say. Spotted something out of date? <a href="../contact.html">Let us know</a>.</em></p>
    <h2 id="more-comparisons">More comparisons</h2>
    <ul>
${C.pages.filter((x) => x !== p).map((x) => `      <li><a href="${x.slug}.html">${esc(x.name)}</a></li>`).join("\n")}
      <li><a href="../blog/roundfair-vs-splitwise.html">RoundFair vs Splitwise</a></li>
      <li><a href="../blog/best-bill-splitting-apps.html">The best bill splitting apps</a></li>
    </ul>
    <!-- cta:start --><!-- cta:end -->` });
}
page("compare.html", { title: "Compare RoundFair with Tricount, Splid and More", desc: "Honest comparisons of RoundFair with Tricount, Splid, Settle Up, WhoseRound?, Next One's On Me and Splitwise, based on each app's official listing.",
  ld: [crumbs([["RoundFair", ""], ["Compare", "compare.html"]]), { "@context": "https://schema.org", "@type": "CollectionPage", name: "Compare RoundFair", url: SITE + "compare.html",
    hasPart: C.pages.map((p) => ({ "@type": "Article", name: p.title, url: `${SITE}compare/${p.slug}.html` })) }],
  body: `    <a class="back-link" href="/">← Back to RoundFair</a>
    <h1>Compare RoundFair</h1>
    <p>RoundFair is a round tracker for nights out, not a shared expense ledger. These pages compare it with other apps people use to split costs and take turns, based only on what each app's official App Store listing and website say. We make RoundFair, so read them with that in mind.</p>
${list(C.pages, "compare", "")}
    <h2>More reading</h2>
    <ul>
      <li><a href="blog/roundfair-vs-splitwise.html">RoundFair vs Splitwise: rounds or a ledger?</a></li>
      <li><a href="blog/best-bill-splitting-apps.html">The best bill splitting apps</a></li>
      <li><a href="blog/best-splitwise-alternatives.html">Best Splitwise alternatives</a></li>
    </ul>
    <!-- cta:start --><!-- cta:end -->` });

// --- tools
for (const t of tools) {
  const url = `tools/${t.slug}.html`, up = "../", title = t.title.length <= 48 ? `${t.title} – RoundFair` : t.title;
  page(url, { title, desc: t.desc, scripts: `  <script src="${up}tools.js?v=1" defer></script>\n`,
    ld: [crumbs([["RoundFair", ""], ["Free tools", "tools.html"], [t.name, url]]),
      { "@context": "https://schema.org", "@type": "WebApplication", name: t.name, description: t.desc, url: SITE + url, applicationCategory: "FinanceApplication",
        operatingSystem: "Any", browserRequirements: "Requires JavaScript", isAccessibleForFree: true, offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" }, publisher: ORG },
      faqLd(t.faq)],
    body: `    <a class="back-link" href="../tools.html">← All free tools</a>
    <h1>${esc(t.title)}</h1>
    <p>${esc(t.lead)}</p>
    ${t.body.replace(/@\//g, up)}
${faqHtml(t.faq)}    <h2 id="more-tools">More free tools</h2>
    <ul>
${tools.filter((x) => x !== t).map((x) => `      <li><a href="${x.slug}.html">${esc(x.name)}</a></li>`).join("\n")}
      <li><a href="../calculators.html">Bill split calculator</a></li>
    </ul>
    <!-- cta:start --><!-- cta:end -->` });
}
page("tools.html", { title: "Free Bill Splitting and Round Tools – RoundFair", desc: "Free browser tools for nights out: who pays spin wheel, round cost calculator, tip calculator by country, receipt splitter and bill split calculator.",
  ld: [crumbs([["RoundFair", ""], ["Free tools", "tools.html"]]), { "@context": "https://schema.org", "@type": "CollectionPage", name: "Free tools", url: SITE + "tools.html",
    hasPart: [...tools.map((t) => ({ "@type": "WebApplication", name: t.name, url: `${SITE}tools/${t.slug}.html` })), { "@type": "WebApplication", name: "Bill split calculator", url: SITE + "calculators.html" }] }],
  body: `    <a class="back-link" href="/">← Back to RoundFair</a>
    <h1>Free tools</h1>
    <p>Quick tools for splitting bills and buying rounds. They run in your browser on any phone, need no account and save nothing.</p>
${list(tools, "tools", "")}
    <ul>
      <li><a href="calculators.html">Bill split calculator</a>: split a bill evenly or unevenly with tax and tip, or work out who owes whom after rounds.</li>
    </ul>
    <h2>For a whole night out</h2>
    <p>The tools handle one decision or one bill. The RoundFair app keeps track of a whole night: <a href="features/turn-order.html">whose turn it is</a>, <a href="features/who-drank-what.html">who drank what</a> and <a href="features/split-the-bill.html">who owes whom</a> at the end.</p>
    <!-- cta:start --><!-- cta:end -->` });

// --- help
for (const h of help) {
  const url = `help/${h.slug}.html`, up = "../";
  page(url, { title: h.title, desc: h.desc,
    ld: [crumbs([["RoundFair", ""], ["Help", "help.html"], [h.name, url]]),
      { "@context": "https://schema.org", "@type": "WebPage", name: h.title, description: h.desc, url: SITE + url, publisher: ORG, dateModified: today,
        about: { "@type": "SoftwareApplication", name: "RoundFair", operatingSystem: "iOS", applicationCategory: "FinanceApplication", url: APP } },
      faqLd(h.faq)],
    body: `    <a class="back-link" href="../help.html">← Help center</a>
    <h1>${esc(h.title.replace(/: Help$/, "").replace(/ Help$/, ""))}</h1>
    <p>${esc(h.lead)}</p>
${sections(h.sections, up)}
${faqHtml(h.faq)}    <h2 id="still-stuck">Still stuck?</h2>
    <p>See the <a href="../help.html">help center</a>, the <a href="/#faq">FAQ</a> or <a href="../contact.html">contact us</a>.</p>` });
}
page("help.html", { title: "RoundFair Help Center: Sharing, Devices and Support", desc: "Help for RoundFair: sharing sessions through iCloud, supported devices and Android, privacy and data, and how to contact support.",
  ld: [crumbs([["RoundFair", ""], ["Help", "help.html"]]), { "@context": "https://schema.org", "@type": "CollectionPage", name: "RoundFair Help Center", url: SITE + "help.html",
    hasPart: help.map((h) => ({ "@type": "WebPage", name: h.title, url: `${SITE}help/${h.slug}.html` })) }],
  body: `    <a class="back-link" href="/">← Back to RoundFair</a>
    <h1>Help center</h1>
    <p>Answers to common questions about using RoundFair. For anything else, <a href="contact.html">contact us</a>.</p>
${list(help, "help", "")}
    <h2>Common questions</h2>
    <ul>
      <li><a href="/#faq">Frequently asked questions</a> about RoundFair</li>
      <li><a href="privacy.html">Where your data is stored, and how to delete it</a></li>
      <li><a href="features/live-sharing.html">Live sharing and offline use</a></li>
      <li><a href="features/export-summary.html">Exporting a summary for the group</a></li>
    </ul>` });

const sm = fs.readFileSync("sitemap.xml", "utf8");
const block = `<!-- extra:start -->\n${urls.map((u) => `  <url>\n    <loc>${SITE}${u}</loc>\n  </url>`).join("\n")}\n  <!-- extra:end -->`; // lastmod: build-sitemap.js
fs.writeFileSync("sitemap.xml", sm.includes("<!-- extra:start -->") ? sm.replace(/<!-- extra:start -->[\s\S]*?<!-- extra:end -->/, () => block)
  : sm.replace("<!-- blog:start -->", () => block + "\n  <!-- blog:start -->"));
console.log(`${urls.length} comparison, tool and help pages built`);
