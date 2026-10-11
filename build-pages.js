// Generates the Features and Use cases pages (features/*.html, use-cases/*.html), their two hub pages
// (features.html, use-cases.html) and the sitemap entries. Edit the PAGES data below, then run:
// node build-pages.js  (also runs on git commit via .githooks)
const fs = require("fs");
const path = require("path");
const SITE = "https://roundfair.support/";
const APP = "https://apps.apple.com/app/id6763799194";
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
// Long-form copy lives in page-content.js: { "<slug>": { sections: [[h2, [paragraph | "- list item", ...]], ...], faq: [[q, a], ...] } }
// Paragraphs may contain [text](url) links (urls relative to the site root; they are prefixed for the page depth).
const EXTRA = require("./page-content.js");
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const rich = (s, up) => esc(s).replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, t, u) => `<a href="${/^https?:/.test(u) ? u : up + u}">${t}</a>`);
const renderSections = (secs, up) => secs.map(([h, ps]) => {
  const out = []; let li = [];
  const flush = () => { if (li.length) out.push(`    <ul>\n${li.map((x) => `      <li>${rich(x, up)}</li>`).join("\n")}\n    </ul>`); li = []; };
  for (const p of ps) { if (p.startsWith("- ")) li.push(p.slice(2)); else { flush(); out.push(`    <p>${rich(p, up)}</p>`); } }
  flush();
  return `    <h2 id="${slugify(h)}">${esc(h)}</h2>\n${out.join("\n")}`;
}).join("\n");

const PAGES = {
  features: {
    label: "Features",
    hubTitle: "RoundFair Features – Round Tracker and Bill Splitter for iOS",
    hubDesc: "Every RoundFair feature explained: turn order, one-tap rounds, saved spots, restaurant mode, bill splitting, who drank what, export and live iCloud sharing.",
    hubLead: "RoundFair is a free iOS app that keeps a night out fair. Here is what each feature does and when you will use it.",
    hubSections: [["How the features fit together", ["A night with RoundFair has three stages. At the start, you create a session, add the group and pick a [saved spot](features/saved-spots.html) if it is somewhere you go often. During the night, you log each round in one tap, and [turn order](features/turn-order.html) keeps track of who is up next and who is behind. At the end, you [split the bill](features/split-the-bill.html), check [who drank what](features/who-drank-what.html) if anyone asks, and [export the summary](features/export-summary.html) to the group chat.", "For a sit-down meal, [restaurant mode](features/restaurant-mode.html) works with items instead of rounds, so each person pays for what they ordered plus a fair share of tip and tax. [Live sharing](features/live-sharing.html) keeps everyone's iPhone in sync through iCloud, and the app keeps working when the bar has no signal."]], ["Built for nights out, not shared ledgers", ["Most bill splitting apps are ledgers: they record who paid for what over weeks or months and keep a running balance. That suits housemates and long trips. RoundFair is built for the night itself: whose round it is right now, who is behind, and a clean settlement before everyone goes home. To compare the two approaches, see our guide to the [best bill splitting apps](blog/best-bill-splitting-apps.html)."]], ["Private by design", ["RoundFair has no accounts, no analytics and no servers. Sessions are stored on your device and in your personal iCloud, and sharing uses Apple's CloudKit, so your group's data never passes through a RoundFair account. Read the [privacy policy](privacy.html)."]]],
    hubFaq: [["Is RoundFair free?", "Yes. RoundFair is free to download on the App Store. Open it, create a session and start tracking rounds straight away."], ["Does everyone in the group need the app?", "No. One person can track the whole night and export the summary for the group. Friends who also have the app can follow the session live on their own iPhone."], ["Is RoundFair available on Android?", "No. RoundFair is available for iPhone only."], ["Does RoundFair work without internet?", "Yes. RoundFair works offline, so you can add rounds, see whose turn it is and settle up without a connection. iCloud sharing syncs when your phone is back online."]],
    items: [
      { slug: "turn-order", name: "Turn order", title: "Whose Round Is It? Turn Order Tracker",
        desc: "RoundFair tracks whose turn it is to buy the next round and who is behind, so the group never argues about it again. Free on iOS.",
        lead: "Every group has the same argument: whose round is it? RoundFair keeps the count so nobody has to remember.",
        steps: ["Add everyone in the group to a session.", "Log each round in one tap as it is bought.", "RoundFair shows who is up now and who is furthest behind."],
        why: "Turn order is calculated from the rounds actually bought, not from memory. Someone who skipped a round, joined late or left early is handled correctly, so the next round always goes to the person who owes one.",
        faq: [["How does RoundFair decide whose turn it is?", "It counts the rounds each person has bought and puts the person who is most behind next. You can see the whole order at any time."], ["Does it work for a group that changes during the night?", "Yes. People can join or leave a session and the order adjusts."]] },
      { slug: "saved-spots", name: "Saved spots", title: "Saved Spots for Your Favourite Bars",
        desc: "Save the bars and restaurants you visit often in RoundFair so starting the next night out takes a few taps. Free iOS app.",
        lead: "Most groups go to the same handful of places. Save them once and start the next session in seconds.",
        steps: ["Save a place the first time you go, or add it from the session.", "Pick it from your list when you start the next night.", "Rounds are logged with their location, so you can look back at where the night went."],
        why: "Less setup means the app stays out of the way. You spend the time with friends, not filling in forms, and your history of rounds and locations builds up by itself.",
        faq: [["Can I log rounds at more than one place in a night?", "Yes. Rounds are recorded with a location, so a bar crawl is tracked bar by bar."], ["Are my saved spots shared with anyone?", "No. They stay on your device and in your personal iCloud. RoundFair has no accounts or servers."]] },
      { slug: "restaurant-mode", name: "Restaurant mode", title: "Restaurant Bill Splitter with Tip and Tax",
        desc: "Split a restaurant bill by item with tip and tax in RoundFair. Itemized rounds make sure everyone pays for what they ordered. Free on iOS.",
        lead: "Splitting evenly is not always fair at a restaurant. Restaurant mode lets you add items and split the tip and tax on top.",
        steps: ["Start a restaurant session and add the people at the table.", "Enter each item and who had it, or share it across several people.", "Add tip and tax and see what each person owes."],
        why: "The person who had a salad and water does not subsidise the person who had steak and cocktails. Tip and tax are spread in proportion, so the total always adds up to the bill.",
        faq: [["Can I share a dish between some of the people?", "Yes. An item can be split across the people who ate it."], ["Is tip included in each person's total?", "Yes. Tip and tax are added to each person's share so the totals match the final bill."]] },
      { slug: "split-the-bill", name: "Split the bill", title: "Split the Bill Fairly – Taxi, Dinner, Hotel",
        desc: "Split one total evenly among the people you choose with RoundFair: a taxi, dinner or hotel room, in a few taps. Free iOS app.",
        lead: "Not every cost is a round of drinks. Enter one total and split it among exactly the people who shared it.",
        steps: ["Enter the total, such as a taxi home or a hotel night.", "Choose who shared it.", "RoundFair splits it evenly and shows who owes whom."],
        why: "You pick the people for each cost, so the taxi is shared by the four who rode in it and not the whole group. Everything settles in one place at the end of the night.",
        faq: [["Can I split a bill unevenly?", "For uneven splits by item, use restaurant mode. The standard split divides one total evenly among the chosen people."], ["Does everyone need the app?", "No. One person can keep track and export the overview for the group."]] },
      { slug: "who-drank-what", name: "Who drank what", title: "Who Drank What – Consumption Overview",
        desc: "See who had what and the cost per person with RoundFair's drink categories and consumption overview, so every round is easy to check. Free iOS app.",
        lead: "A round split by headcount is rarely fair when some people drink cocktails and others drink water. The consumption overview shows the real picture.",
        steps: ["Choose a category for each round, such as beer, wine or soft drink.", "RoundFair records what each person had.", "Open the overview to see consumption and cost per person."],
        why: "Seeing the numbers ends the debate. The overview shows who had what and what it cost, so the group can settle on a fair split, or agree to keep it simple, with facts in hand.",
        faq: [["Can I see the cost per person?", "Yes. The overview shows what each person consumed and its cost."], ["Do I have to use categories?", "No. Rounds work without them, but categories make the overview more useful."]] },
      { slug: "export-summary", name: "Export the summary", title: "Export a Round and Balance Summary",
        desc: "Share a clear plain text overview of rounds and balances with your group using RoundFair's export, ready to paste anywhere. Free iOS app.",
        lead: "When the night is over, everyone wants to know where they stand. Export a clear summary and post it in the group chat.",
        steps: ["Finish the session and settle the bill.", "Tap export to create an overview of rounds and balances.", "Share it as plain text in any messaging app."],
        why: "Plain text works everywhere. Nobody needs to install anything to read it, so the person who kept track can settle with everyone without a long conversation.",
        faq: [["What format is the export?", "Plain text, so it can be pasted into any chat or note."], ["Does the export leave my device?", "Only when you share it. RoundFair has no servers and no analytics."]] },
      { slug: "live-sharing", name: "Live sharing and offline", title: "Live Sharing with iCloud, Works Offline",
        desc: "Share a RoundFair session live with your group through iCloud. It works offline too, with no accounts and no servers to set up.",
        lead: "One session, everyone up to date. RoundFair shares through iCloud, so the whole group sees the same rounds and balances.",
        steps: ["Start a session and invite the group through iCloud.", "Everyone sees rounds and balances as they change.", "Keep going without signal. Changes sync when you are back online."],
        why: "Bars have poor reception, and nobody wants to create an account at midnight. RoundFair works offline and keeps data on your device and in your personal iCloud, with no accounts, no analytics and no servers.",
        faq: [["Do I need an account?", "No. Sharing uses iCloud, and RoundFair has no accounts of its own."], ["Does it work without internet?", "Yes. You can log rounds offline and they sync later."]] },
    ],
  },
  "use-cases": {
    label: "Use cases",
    hubTitle: "RoundFair Use Cases – Nights Out, Trips, Dinners and More",
    hubDesc: "See how groups use RoundFair to keep rounds and bills fair: pub nights, bachelor and hen parties, group trips, restaurant dinners and work drinks.",
    hubLead: "Wherever a group shares costs, someone ends up keeping score. Here is how RoundFair helps in the situations that come up most.",
    hubSections: [["Which use case fits your group?", ["- [Pub rounds](use-cases/pub-rounds.html): friends taking turns to buy drinks, where the question all night is whose round it is.", "- [Work drinks](use-cases/work-drinks.html): people arrive and leave at different times, and nobody wants to talk money with colleagues.", "- [Restaurant dinners](use-cases/restaurant-dinners.html): one bill, very different orders, and tip and tax on top.", "- [Group trips](use-cases/group-trips.html): taxis, dinners and hotel rooms shared between different people over several days.", "- [Bachelor and hen parties](use-cases/bachelor-hen-party.html): a big group, a full schedule and a guest of honour whose share the others cover."]], ["One app for the whole night", ["Real nights out mix these situations. Dinner turns into rounds at a bar, and a taxi home is shared by only half the group. RoundFair handles all of it in one session: rounds for the bar, [restaurant mode](features/restaurant-mode.html) for the meal and [split the bill](features/split-the-bill.html) for anything else, with a single settlement at the end.", "Not sure how to split fairly in the first place? Our guide to [bill split methods](blog/bill-split-methods-explained.html) explains when an even split works and when it does not, and the [bill split calculator](calculators.html) handles one-off bills in the browser."]]],
    hubFaq: [["Can I use RoundFair for things other than drinks?", "Yes. Restaurant mode splits itemised meals with tip and tax, and split the bill divides any total, such as a taxi or hotel room, between the people who shared it."], ["Can the group change during the night?", "Yes. People can join or leave a session and the turn order adjusts."], ["What if only some people shared a cost?", "Choose who shared it when you add it. A taxi split by the four people who rode in it is not charged to the rest of the group."]],
    items: [
      { slug: "pub-rounds", name: "Pub rounds with friends", title: "Track Pub Rounds with Friends",
        desc: "Never argue over whose round it is again. RoundFair tracks pub rounds and shows who is next and who is behind. Free on iOS.",
        lead: "The classic use: a group of friends, a pub, and a rotation of rounds that nobody can quite remember.",
        steps: ["Start a session at the pub and add the group.", "Log each round when it is bought.", "Check who is up next before anyone heads to the bar."],
        why: "Rounds only work if everyone trusts the count. A shared record takes the guesswork out, so the person who always seems to buy a round gets credit and the one who keeps missing theirs is easy to spot, kindly.",
        faq: [["What if someone leaves early?", "Remove them from the session. The remaining group keeps its turn order."], ["Can we settle up in money instead of rounds?", "Yes. Split the bill at the end to even out the difference."]],
        uses: ["turn-order", "who-drank-what"] },
      { slug: "bachelor-hen-party", name: "Bachelor and hen parties", title: "Bachelor and Hen Party Cost Splitting",
        desc: "Keep the weekend fair on a bachelor or hen party. Track rounds, share costs and cover the guest of honour with RoundFair.",
        lead: "A party weekend has many shared costs and a guest of honour who should not be paying. Keep the count in one place.",
        steps: ["Add the group to a session, with the guest of honour included.", "Log rounds and split shared costs such as taxis and dinners.", "Settle up at the end, with the guest of honour's share covered by the others."],
        why: "Money is the most common source of friction on group weekends. When every cost is logged as it happens, nobody has to reconstruct the weekend afterwards or chase anyone.",
        faq: [["Who pays for the guest of honour?", "Usually the rest of the group shares it. Choose the people when you split each cost."], ["Can we split more than drinks?", "Yes. Use the standard split for taxis, food and accommodation."]],
        uses: ["split-the-bill", "export-summary"] },
      { slug: "group-trips", name: "Group trips", title: "Split Costs on a Group Trip",
        desc: "Track shared costs on a group trip with RoundFair: hotel, taxis, dinners and rounds, with a clear summary at the end. Free iOS app.",
        lead: "Trips mean lots of small payments by different people. RoundFair keeps them in one place and works out who owes whom.",
        steps: ["Start a session for the trip and add everyone.", "Log each shared cost and pick who shared it.", "Export the summary and settle up."],
        why: "Because each cost is split among just the people who shared it, nobody pays for the taxi they did not take. The record works offline, which helps when you are abroad without data.",
        faq: [["Does it work abroad?", "Yes. RoundFair works offline and syncs through iCloud when you are connected."], ["Can I share the total with the group?", "Yes. Export a plain text summary and post it in the group chat."]],
        uses: ["split-the-bill", "live-sharing"] },
      { slug: "restaurant-dinners", name: "Restaurant dinners", title: "Split a Restaurant Dinner Bill",
        desc: "Split a dinner bill by item with tip and tax so everyone pays for what they ordered. Try RoundFair, free on iOS, at your next dinner.",
        lead: "Big table, one bill, very different orders. Split it by item and skip the awkward maths at the end of the meal.",
        steps: ["Start a restaurant session and add the table.", "Enter the items and who had them.", "Add tip and tax and read out each person's total."],
        why: "Even splits feel unfair when orders differ a lot, and calculators at the table are slow. Itemizing takes a minute and the totals add up to the bill.",
        faq: [["Can we still split evenly?", "Yes. Use the standard split for an even share."], ["How is tip handled?", "It is spread in proportion to each person's items."]],
        uses: ["restaurant-mode", "who-drank-what"] },
      { slug: "work-drinks", name: "Work drinks and team nights", title: "Team Nights Out and Work Drinks",
        desc: "Keep team drinks and work nights out fair with RoundFair. Track rounds and split the bill without awkward conversations.",
        lead: "With colleagues, money conversations are extra awkward. A neutral record keeps team nights easy and fair.",
        steps: ["Add the team to a session.", "Log rounds as they happen.", "Split the bill at the end, or export the overview if someone is expensing it."],
        why: "A shared, neutral record means nobody has to be the person who asks for money. It is private by design: no account, no analytics, no servers, so your team's data stays with you.",
        faq: [["Can I export it for expenses?", "Yes. Export a plain text overview of rounds and balances."], ["Does everyone need to install the app?", "No. One person can keep the record and share the summary."]],
        uses: ["turn-order", "export-summary"] },
    ],
  },
};

const key = (g, s) => `${g}/${s}.html`;
const dd = (g, up, i18n = "") => `<div class="nav-dd">
            <button class="nav-dd-btn" type="button" aria-expanded="false" aria-haspopup="true"${i18n}>${PAGES[g].label}</button>
            <div class="nav-dd-panel">
${PAGES[g].items.map((i) => `              <a href="${up}${key(g, i.slug)}">${i.name}</a>`).join("\n")}
              <a class="nav-dd-all" href="${up}${g}.html">All ${PAGES[g].label.toLowerCase()} →</a>
            </div>
          </div>`;

// share image rendered by build-og.js (features/x.html → assets/og/features-x.png), else the app screenshot
const ogImage = (url) => { const f = `assets/og/${url.replace(/\.html$/, "").replace("/", "-")}.png`; return SITE + (fs.existsSync(f) ? f : "assets/og-image.png"); };
const layout = ({ up, url, title, desc, body, ld }) => `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(desc)}" />
  <link rel="canonical" href="${SITE}${url}" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${SITE}${url}" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(desc)}" />
  <meta property="og:image" content="${ogImage(url)}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${esc(title)}" />
  <meta name="twitter:description" content="${esc(desc)}" />
  <meta name="twitter:image" content="${ogImage(url)}" />
  <meta name="theme-color" content="#2bb491" />
  <meta name="apple-itunes-app" content="app-id=6763799194" />
  <link rel="manifest" href="/site.webmanifest" />
${ld.map((o) => `  <script type="application/ld+json">${JSON.stringify(o)}</script>`).join("\n")}
  <link rel="icon" type="image/png" href="${up}assets/roundfair-logo.png" />
  <link rel="apple-touch-icon" href="${up}assets/app-icon.png" />
  <script>
    (function () {
      var d = document.documentElement;
      d.classList.add("js");
      try {
        d.dataset.theme = localStorage.getItem("roundfair-theme") ||
          (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      } catch (e) {}
    })();
  </script>
  <link rel="stylesheet" href="${up}styles.css?v=seo2" />
  <script src="${up}post.js?v=3" defer></script>
  <script src="${up}script.js?v=dd1" defer></script>
</head>
<body>

  <nav class="nav" aria-label="Main">
    <div class="container nav-inner">
      <a class="nav-brand" href="/">
        <img src="${up}assets/roundfair-logo.png" alt="" width="30" height="30" />
        RoundFair
      </a>
      <div class="nav-links">
        <div class="nav-menu" id="nav-menu">
          <a href="/#how">How it works</a>
          ${dd("features", up)}
          ${dd("use-cases", up)}
          <a href="/#faq">FAQ</a>
          <a href="${up}blog.html">Blog</a>
        </div>
        <a class="nav-cta" href="${APP}">Download</a>
        <button class="theme-toggle" type="button" aria-label="Toggle theme">
          <svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
          <svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
        </button>
        <button class="nav-menu-toggle" type="button" aria-expanded="false" aria-controls="nav-menu" aria-label="Menu">
          <span aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span>
        </button>
      </div>
    </div>
  </nav>

  <main class="privacy-page">
${body}
  </main>

  <!-- footer:start --><!-- footer:end -->

</body>
</html>
`;

const crumbs = (list) => ({ "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: list.map(([name, p], i) => ({ "@type": "ListItem", position: i + 1, name, item: SITE + p })) });
const write = (file, html) => { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, html); };
const featureName = Object.fromEntries(PAGES.features.items.map((i) => [i.slug, i.name]));
const urls = [];

for (const [g, grp] of Object.entries(PAGES)) {
  const other = g === "features" ? "use-cases" : "features";
  write(`${g}.html`, layout({
    up: "", url: `${g}.html`, title: grp.hubTitle, desc: grp.hubDesc,
    ld: [crumbs([["RoundFair", ""], [grp.label, `${g}.html`]]),
      { "@context": "https://schema.org", "@type": "CollectionPage", name: grp.hubTitle, description: grp.hubDesc, url: `${SITE}${g}.html`,
        hasPart: grp.items.map((i) => ({ "@type": "WebPage", name: i.title, url: SITE + key(g, i.slug) })) },
      { "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: grp.hubFaq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) }],
    body: `    <a class="back-link" href="/">← Back to RoundFair</a>
    <h1>RoundFair ${grp.label.toLowerCase()}</h1>
    <p class="updated">Made by FairLead</p>
    <p>${esc(grp.hubLead)}</p>
${grp.items.map((i) => `    <article class="blog-item">
      <h2><a href="${key(g, i.slug)}">${esc(i.name)}</a></h2>
      <p>${esc(i.desc)}</p>
    </article>`).join("\n")}
${renderSections(grp.hubSections, "")}
    <h2>Frequently asked questions</h2>
${grp.hubFaq.map(([q, a]) => `    <h3>${esc(q)}</h3><p>${esc(a)}</p>`).join("\n")}
    <!-- cta:start --><!-- cta:end -->`,
  }));
  urls.push(`${g}.html`);

  for (const i of grp.items) {
    const url = key(g, i.slug), title = `${i.title} – RoundFair`;
    const x = EXTRA[i.slug] || { sections: [], faq: [] };
    const faq = [...i.faq, ...x.faq];
    const toc = x.sections.length ? `    <nav class="toc" aria-label="In this guide"><strong>In this guide</strong>\n    <ul>\n${x.sections.map(([h]) => `      <li><a href="#${slugify(h)}">${esc(h)}</a></li>`).join("\n")}\n    </ul></nav>\n` : "";
    const related = g === "features"
      ? grp.items.filter((x) => x !== i).slice(0, 3).map((x) => [key(g, x.slug), x.name])
      : i.uses.map((s) => [key("features", s), featureName[s]]);
    write(url, layout({
      up: "../", url, title, desc: i.desc,
      ld: [crumbs([["RoundFair", ""], [grp.label, `${g}.html`], [i.name, url]]),
        { "@context": "https://schema.org", "@type": "WebPage", name: title, description: i.desc, url: SITE + url,
          isPartOf: { "@type": "WebSite", name: "RoundFair", url: SITE },
          about: { "@type": "SoftwareApplication", name: "RoundFair", operatingSystem: "iOS", applicationCategory: "LifestyleApplication", url: APP } },
        { "@context": "https://schema.org", "@type": "FAQPage",
          mainEntity: faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) }],
      body: `    <a class="back-link" href="../${g}.html">← All ${grp.label.toLowerCase()}</a>
    <h1>${esc(i.title)}</h1>
    <p class="updated">${g === "features" ? "RoundFair feature" : "RoundFair use case"} · By FairLead</p>
    <p>${esc(i.lead)}</p>
${toc}    <h2>How it works</h2>
    <ol>
${i.steps.map((s) => `      <li>${esc(s)}</li>`).join("\n")}
    </ol>
${renderSections(x.sections, "../")}
    <h2>${g === "features" ? "Why it helps" : "Why it works"}</h2>
    <p>${esc(i.why)}</p>
    <h2>Frequently asked questions</h2>
${faq.map(([q, a]) => `    <h3>${esc(q)}</h3><p>${esc(a)}</p>`).join("\n")}
    <h2>${g === "features" ? "More features" : "Features that help"}</h2>
    <ul>
${related.map(([p, n]) => `      <li><a href="../${p}">${esc(n)}</a></li>`).join("\n")}
      <li><a href="../${other}.html">Browse all ${PAGES[other].label.toLowerCase()}</a></li>
    </ul>
    <!-- cta:start --><!-- cta:end -->`,
    }));
    urls.push(url);
  }
}

// Homepage nav dropdowns (button labels are translated by i18n, so they carry data-i18n)
const home = fs.readFileSync("index.html", "utf8");
fs.writeFileSync("index.html", home.replace(/(<!-- dd:start -->)[\s\S]*?(<!-- dd:end -->)/, (_, a, b) =>
  `${a}
          ${dd("features", "", ' data-i18n="nav.features"')}
          ${dd("use-cases", "", ' data-i18n="nav.useCases"')}
          ${b}`));

const sm = fs.readFileSync("sitemap.xml", "utf8");
const entries = urls.map((u) => `  <url>\n    <loc>${SITE}${u}</loc>\n  </url>`).join("\n"); // lastmod: build-sitemap.js
const block = `<!-- pages:start -->\n${entries}\n  <!-- pages:end -->`;
fs.writeFileSync("sitemap.xml", sm.includes("<!-- pages:start -->")
  ? sm.replace(/<!-- pages:start -->[\s\S]*?<!-- pages:end -->/, () => block)
  : sm.replace("<!-- blog:start -->", () => block + "\n  <!-- blog:start -->"));
console.log(`${urls.length} feature and use-case pages built`);
