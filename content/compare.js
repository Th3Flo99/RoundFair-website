// Comparison pages (compare/*.html), built by build-extra.js.
// Facts about other apps come only from their official App Store listings and websites, checked on CHECKED.
// Keep claims conservative and re-check before editing; app features and prices change.
const CHECKED = "11 October 2026";
const SRC = {
  roundfair: ["RoundFair on the App Store", "https://apps.apple.com/app/id6763799194"],
  tricount: ["tricount on the App Store", "https://apps.apple.com/app/id349866256"],
  tricountSite: ["tricount.com", "https://www.tricount.com"],
  splid: ["Splid on the App Store", "https://apps.apple.com/app/id991473495"],
  settleup: ["Settle Up on the App Store", "https://apps.apple.com/app/id737534985"],
  settleupSite: ["settleup.io", "https://settleup.io"],
  whoseround: ["WhoseRound? on the App Store", "https://apps.apple.com/app/id6769898756"],
  nextone: ["Next One's On Me on the App Store", "https://apps.apple.com/app/id6756637210"],
  splitwise: ["Splitwise on the App Store", "https://apps.apple.com/app/id458023433"],
};
// RoundFair facts (App Store listing and this site)
const RF = {
  job: "Track rounds on a night out: who paid, who joined, whose turn it is, then settle",
  price: "Free",
  platforms: "iPhone and iPad (iOS 17 or later)",
  account: "No account; sharing uses your own iCloud",
  offline: "Yes, offline-first; shared sessions sync through iCloud",
};
const table = (other, rows) => `<div class="tbl"><table><thead><tr><th></th><th>RoundFair</th><th>${other}</th></tr></thead><tbody>${rows.map(([k, a, b]) => `<tr><td>${k}</td><td>${a}</td><td>${b}</td></tr>`).join("")}</tbody></table></div><p><em>Checked against each app's official App Store listing and website on ${CHECKED}. Features and prices change, so check the listing before you decide.</em></p>`;

module.exports = { CHECKED, SRC, pages: [
  { slug: "roundfair-vs-tricount", name: "RoundFair vs Tricount", competitor: "tricount",
    title: "RoundFair vs Tricount: Rounds or a Shared Ledger?",
    desc: "RoundFair vs Tricount compared honestly: Tricount is a shared expense ledger for trips and households, RoundFair tracks rounds on a night out. Which fits your group?",
    lead: "Tricount is one of the best-known bill splitting apps in Belgium and beyond. RoundFair does something narrower. This page explains the difference so you can pick the right tool, or use both.",
    sources: ["roundfair", "tricount", "tricountSite"],
    sections: [
      ["The short answer", ["Tricount is a shared expense ledger: a group adds expenses over days or weeks and the app keeps everyone's balance. RoundFair is built for the night itself: it records each round, shows whose turn it is to buy the next one and settles up at the end. For a holiday, a shared flat or a long trip, a ledger like Tricount is the natural choice. For a night at the café or the pub, RoundFair answers the question a ledger does not: whose round is it?"]],
      ["Side by side", [table("Tricount", [
        ["Main job", RF.job, "Shared expense ledger for groups: trips, rent, groceries, dinners"],
        ["Price", RF.price, "Free; the App Store listing says free and unlimited, with no subscription"],
        ["Platforms", RF.platforms, "iOS and Android, according to tricount.com"],
        ["Account", RF.account, "tricount.com says you can try it without signing up"],
        ["Offline", RF.offline, "The App Store listing says you can track everything even offline"],
        ["Turn order for rounds", "Yes: Up now shows who buys next and who is behind", "Not described in its listing"],
        ["Currencies", "Amounts in any currency, no conversion", "Multiple currencies, according to its listing"],
        ["Payments", "No payments; settle with your usual payment app", "Payment requests in the app; a bunq card connection is offered on tricount.com"],
      ])]],
      ["When Tricount is the better choice", ["- A trip or holiday with many expenses paid by different people over several days.", "- Shared costs at home: rent, utilities and groceries with flatmates or a partner.", "- Groups that want payment requests and multi-currency support built in.", "- Friends on Android: RoundFair is only available on iPhone and iPad."]],
      ["When RoundFair is the better choice", ["- A night out where friends take turns buying rounds and nobody remembers whose turn it is.", "- Rounds that differ in size, where you want to see who is genuinely behind, not just who bought last.", "- Groups that want to log a round in one tap at the bar, with a spin wheel when nobody wants to decide.", "- People who prefer no account at all: RoundFair keeps data on your device and in your personal iCloud, with no analytics."]],
      ["Using both", ["Many groups use a ledger for the trip and RoundFair for the evenings out. Track the drinks in RoundFair, settle the night, and if needed add the result to your ledger as one expense. For more options, see our list of [Tricount alternatives](compare/tricount-alternatives.html)."]],
    ],
    faq: [["Is RoundFair a replacement for Tricount?", "Not for everything. Tricount is a ledger for shared expenses over time. RoundFair is built for rounds and bills on a night out. Many groups use both."], ["Is RoundFair available on Android like Tricount?", "No. RoundFair is available on iPhone and iPad only."], ["Do I need an account for RoundFair?", "No. RoundFair has no accounts. Sharing a session uses your own iCloud."]] },

  { slug: "roundfair-vs-splid", name: "RoundFair vs Splid", competitor: "splid",
    title: "RoundFair vs Splid: Night-Out Rounds or Group Expenses?",
    desc: "RoundFair vs Splid: Splid is an expense splitter for holidays and housemates, RoundFair tracks rounds and whose turn it is on a night out. An honest comparison.",
    lead: "Splid and RoundFair both work without sign-up and both work offline, so they are easy to confuse. They solve different problems.",
    sources: ["roundfair", "splid"],
    sections: [
      ["The short answer", ["Splid is an expense splitter: you enter the expenses of a holiday, a household or a relationship and it shows who owes how much to whom. RoundFair tracks rounds as they happen on a night out, shows whose turn it is and settles the evening. If your group shares costs over weeks, Splid fits. If your group takes turns at the bar, RoundFair fits."]],
      ["Side by side", [table("Splid", [
        ["Main job", RF.job, "Split expenses for holidays, housemates or couples"],
        ["Price", RF.price, "Free to download; Excel export is an in-app purchase, according to its listing"],
        ["Platforms", RF.platforms, "iOS (we only checked the App Store listing)"],
        ["Account", RF.account, "Groups can be shared online with no sign-up, according to its listing"],
        ["Offline", RF.offline, "Works offline, according to its listing"],
        ["Turn order for rounds", "Yes", "Not described in its listing"],
        ["Currencies", "Amounts in any currency, no conversion", "More than 150 currencies with automatic conversion, according to its listing"],
        ["Export", "Plain text summary", "PDF, and Excel via in-app purchase"],
      ])]],
      ["When Splid is the better choice", ["- Holidays where costs are in several currencies.", "- Households and couples who log expenses over a long period.", "- Groups that want PDF or spreadsheet exports."]],
      ["When RoundFair is the better choice", ["- Nights out where the question is whose round it is right now.", "- Itemised restaurant bills with tip and tax, followed by drinks, in one session.", "- Groups that want a spin wheel to pick the next buyer, and saved venues with remembered drink prices."]],
    ],
    faq: [["Do Splid and RoundFair both work without an account?", "Yes, according to Splid's App Store listing it needs no sign-up, and RoundFair has no accounts at all."], ["Which one handles foreign currencies?", "Splid's listing describes automatic currency conversion. RoundFair records amounts without converting them."]] },

  { slug: "roundfair-vs-settle-up", name: "RoundFair vs Settle Up", competitor: "settleup",
    title: "RoundFair vs Settle Up: Which Fits Your Group?",
    desc: "RoundFair vs Settle Up: Settle Up tracks group expenses across iOS, Android and the web; RoundFair tracks rounds and whose turn it is on iPhone. Honest comparison.",
    lead: "Settle Up is a cross-platform group expense app with a free tier and a Premium upgrade. RoundFair is a free iPhone app for rounds and nights out. Here is how they differ.",
    sources: ["roundfair", "settleup", "settleupSite"],
    sections: [
      ["The short answer", ["Settle Up keeps track of a group's expenses and calculates the fewest transfers to settle them, on iOS, Android and the web. RoundFair focuses on rounds: who paid, who joined, whose turn is next. If your group is mixed iPhone and Android and shares costs over time, Settle Up is the practical choice. If you mainly need to keep a night of rounds fair, RoundFair is simpler."]],
      ["Side by side", [table("Settle Up", [
        ["Main job", RF.job, "Track group expenses and settle with the fewest transfers"],
        ["Price", RF.price, "Free, with a paid Premium upgrade (ad-free, receipt photos, recurring expenses, Excel export, statistics), according to its listing"],
        ["Platforms", RF.platforms, "iOS, Android and a web app, according to settleup.io"],
        ["Account", RF.account, "Friends can view a group in the browser through a link, according to its listing"],
        ["Offline", RF.offline, "Works offline and syncs later, according to its listing"],
        ["Turn order for rounds", "Yes", "Not described in its listing"],
        ["Currencies", "Amounts in any currency, no conversion", "All currencies with exchange rates, according to its listing"],
      ])]],
      ["When Settle Up is the better choice", ["- Groups with Android users: RoundFair is iPhone and iPad only.", "- Long-running groups such as flatmates, with recurring expenses.", "- Groups that want reminders and nudges to settle debts."]],
      ["When RoundFair is the better choice", ["- A night out where rounds rotate and the question is who buys next.", "- People who want no accounts, no ads and no analytics: RoundFair keeps data on your device and in your personal iCloud.", "- A quick, one-evening session rather than an ongoing group."]],
    ],
    faq: [["Is Settle Up free?", "Its App Store listing describes a free app with an optional Premium upgrade that removes ads and adds features."], ["Can Android users join RoundFair?", "No. RoundFair is only available on iPhone and iPad. One person can still track the night and share the plain text summary with everyone."]] },

  { slug: "roundfair-vs-whoseround", name: "RoundFair vs WhoseRound?", competitor: "whoseround",
    title: "RoundFair vs WhoseRound?: Two Round Trackers Compared",
    desc: "RoundFair vs WhoseRound?: both track whose round it is at the pub. Compare pricing, features and settling up, based on each app's App Store listing.",
    lead: "WhoseRound? and RoundFair answer the same question at the pub: whose round is it? They take different approaches to pricing, platform features and settling up.",
    sources: ["roundfair", "whoseround"],
    sections: [
      ["The short answer", ["Both apps track the buying rotation, handle people who join late or skip rounds, need no account and show no ads. WhoseRound? leans into Apple platform features such as Apple Watch, widgets and Live Activities, and full access needs an annual subscription. RoundFair is free, adds money on top of turns (balances, itemised bills with tip and tax, who pays whom) and is available in seven languages."]],
      ["Side by side", [table("WhoseRound?", [
        ["Main job", RF.job, "Track whose round it is at the pub"],
        ["Price", RF.price, "Free to download; full access needs an auto-renewable annual subscription, with a 7-day free trial for eligible new customers, according to its listing"],
        ["Platforms", RF.platforms, "iPhone, with Apple Watch, widgets, Lock Screen, Live Activities and Dynamic Island support, according to its listing"],
        ["Account", "No account", "No accounts, according to its listing"],
        ["Late arrivals and skipped rounds", "Yes: record who joined each round", "Yes: join from now, catch up, or skip rounds, according to its listing"],
        ["Balances and settling up", "Yes: balances, who pays whom, itemised bills with tip and tax", "Not described in its listing"],
        ["Sharing with the group", "Live through iCloud", "Not described in its listing"],
        ["Languages", "7, including Dutch and French", "English only, according to its listing"],
      ])]],
      ["When WhoseRound? may suit you better", ["- You want to glance at the rotation on an Apple Watch, a widget or the Lock Screen.", "- Your group only cares about the order of rounds, not the amounts."]],
      ["When RoundFair may suit you better", ["- Rounds vary in price and you want to see who is genuinely behind in money, not just in turns.", "- The night includes a restaurant bill, a taxi or other shared costs to split.", "- You want a free app with no subscription, or an app in Dutch, French, German, Spanish, Italian or Portuguese."]],
    ],
    faq: [["Is WhoseRound? free?", "It is free to download, but its App Store listing says full access for new customers needs an annual subscription, with a free trial for eligible customers."], ["Does RoundFair have an Apple Watch app?", "No Apple Watch app is listed for RoundFair. It runs on iPhone and iPad."]] },

  { slug: "roundfair-vs-next-ones-on-me", name: "RoundFair vs Next One's On Me", competitor: "nextone",
    title: "RoundFair vs Next One's On Me: Rotations Compared",
    desc: "RoundFair vs Next One's On Me: an iMessage rotation for coffee and lunch, or a full round tracker with balances and bill splitting? A short, honest comparison.",
    lead: "Next One's On Me keeps a simple paying rotation inside an iMessage conversation. RoundFair is a standalone app that also handles amounts and bills.",
    sources: ["roundfair", "nextone"],
    sections: [
      ["The short answer", ["Next One's On Me lives in iMessage: you tap that you paid, and everyone in the conversation sees who is up next. It is deliberately minimal, with no accounts and no syncing. RoundFair tracks who paid and who joined each round, shows balances in money and splits bills at the end. For a daily coffee rotation in an iMessage group, the simpler tool may be enough. For nights out with rounds of different sizes, RoundFair gives a fairer picture."]],
      ["Side by side", [table("Next One's On Me", [
        ["Main job", RF.job, "A simple paying rotation inside an iMessage conversation"],
        ["Price", RF.price, "Free, according to its listing"],
        ["Where it runs", "A standalone app on iPhone and iPad", "An iMessage app, according to its listing"],
        ["Account", "No account", "No accounts and no syncing, according to its listing"],
        ["Amounts and balances", "Yes", "Counts how many rounds each person covered, according to its version notes"],
        ["Bill splitting", "Even and itemised splits with tip and tax", "Not described in its listing"],
      ])]],
      ["Which should you use?", ["- Daily coffee for two or three colleagues in one iMessage chat: the iMessage rotation is hard to beat for simplicity.", "- Rounds that cost different amounts, or nights that end with a bill to split: RoundFair. See also [coffee and lunch rounds at work](use-cases/coffee-and-lunch-rounds.html)."]],
    ],
    faq: [["Does RoundFair work inside iMessage?", "No. RoundFair is a standalone app. You can share its plain text summary in any chat, including iMessage."]] },

  { slug: "tricount-alternatives", name: "Tricount alternatives", competitor: null,
    title: "Tricount Alternatives: Which App for Which Group?",
    desc: "Looking for a Tricount alternative? Compare Splitwise, Splid, Settle Up and RoundFair by what each is built for, based on their official App Store listings.",
    lead: "Tricount is a popular, free expense ledger. If it does not fit your group, these are the alternatives worth a look, grouped by what they are built for. We make RoundFair, so we have tried to keep this list factual.",
    sources: ["tricount", "splitwise", "splid", "settleup", "roundfair"],
    sections: [
      ["First: do you need an alternative?", ["Tricount's App Store listing describes a free, unlimited app with multiple currencies, offline use and payment requests, and tricount.com says it runs on iOS and Android. For trips and shared homes that covers most needs. The alternatives below make sense when your group needs something specific."]],
      ["The alternatives at a glance", [`<div class="tbl"><table><thead><tr><th>App</th><th>Built for</th><th>Platforms</th><th>Price model</th></tr></thead><tbody><tr><td>Splitwise</td><td>Shared expenses and IOUs over time</td><td>Smartphones and web, according to its listing</td><td>Free to download</td></tr><tr><td>Splid</td><td>Holidays, housemates and couples; no sign-up</td><td>iOS (App Store listing checked)</td><td>Free; Excel export as an in-app purchase</td></tr><tr><td>Settle Up</td><td>Group expenses with the fewest transfers</td><td>iOS, Android and web</td><td>Free, with a Premium upgrade</td></tr><tr><td>RoundFair</td><td>Rounds and bills on a night out</td><td>iPhone and iPad</td><td>Free</td></tr></tbody></table></div><p><em>Based on each app's official App Store listing and website, checked on 11 October 2026.</em></p>`]],
      ["Splitwise", ["Its App Store listing describes groups and friendships, unequal splits by percentage, shares or exact amounts, recurring bills, 100+ currencies and a web version. It suits long-running groups. See our [RoundFair vs Splitwise](blog/roundfair-vs-splitwise.html) comparison."]],
      ["Splid", ["Splid's listing highlights working offline, sharing groups with no sign-up, more than 150 currencies with automatic conversion, and PDF or Excel summaries. See [RoundFair vs Splid](compare/roundfair-vs-splid.html)."]],
      ["Settle Up", ["Settle Up runs on iOS, Android and the web, works offline, and lets friends view a group through a link. Premium removes ads and adds receipt photos, recurring expenses and statistics. See [RoundFair vs Settle Up](compare/roundfair-vs-settle-up.html)."]],
      ["RoundFair", ["RoundFair is not a ledger. It is built for nights out: it records each round, shows whose turn it is and who is behind, splits itemised bills with tip and tax, and settles the evening. It is free, needs no account and keeps data on your device and in your iCloud. If your Tricount groups are mostly nights out, it may be the simpler tool; for trips and households, keep a ledger. See [RoundFair vs Tricount](compare/roundfair-vs-tricount.html)."]],
    ],
    faq: [["What is the best free alternative to Tricount?", "It depends on the job. For shared expenses over time, Splid and Settle Up are close alternatives. For rounds on a night out, RoundFair is built for that specific job."], ["Is there a Tricount alternative without an account?", "Splid's listing says no sign-up is needed, and RoundFair has no accounts at all."]] },
] };
