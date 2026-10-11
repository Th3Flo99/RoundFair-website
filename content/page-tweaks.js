// Per-page adjustments for the feature and use-case pages built by build-pages.js:
// - items: overrides merged onto PAGES items by slug (titles, varied section headings, "Related guides" links)
// - newUseCases: extra use-case pages (occasions), appended to PAGES["use-cases"].items
// - content: long-form copy for the new pages, merged into page-content.js
// - append: extra sections appended to an existing page's long-form copy
// Links are relative to the site root, as in page-content.js.
module.exports = {
  items: {
    // features
    "turn-order": { stepsTitle: "Three steps to a fair rotation", whyTitle: "Why a running count beats memory",
      guides: [["blog/whose-turn-to-buy-the-next-round.html", "Whose turn is it to buy the next round? Round etiquette explained"],
        ["blog/how-to-decide-who-buys-the-next-round.html", "Six fair ways to decide who buys the next round"],
        ["tools/who-pays-wheel.html", "Who pays? Free online spin wheel"],
        ["compare/roundfair-vs-whoseround.html", "RoundFair vs WhoseRound?: two round trackers compared"]] },
    "saved-spots": { stepsTitle: "Save a place once, reuse it every time", whyTitle: "Why less setup matters at the bar",
      guides: [["tools/round-cost-calculator.html", "Round cost calculator: what a round costs your group"],
        ["blog/how-to-run-a-bar-tab-with-friends.html", "How to run a bar tab with friends"],
        ["blog/round-buying-etiquette-around-the-world.html", "Round buying etiquette around the world"]] },
    "restaurant-mode": { stepsTitle: "Split a restaurant bill in three steps", whyTitle: "Why itemising is fairer at a mixed table",
      guides: [["blog/split-dinner-bill-with-friends.html", "How to split a dinner bill with friends"],
        ["blog/how-to-split-a-receipt-item-by-item.html", "How to split a receipt item by item"],
        ["blog/how-to-split-tax-and-tip-on-a-bill.html", "How to split tax and tip on a bill"],
        ["tools/receipt-splitter.html", "Free receipt splitter: split shared dishes, tax and tip"],
        ["tools/tip-calculator-by-country.html", "Tip calculator with typical tipping by country"]] },
    "split-the-bill": { stepsTitle: "Split one cost between the right people", whyTitle: "Why choosing who shared it matters",
      guides: [["blog/bill-split-methods-explained.html", "Bill split methods explained: equal, itemised, shares"],
        ["blog/split-a-bill-by-percentage.html", "How to split a bill by percentage"],
        ["calculators.html", "Bill split calculator"],
        ["compare/roundfair-vs-tricount.html", "RoundFair vs Tricount: rounds or a shared ledger?"]] },
    "who-drank-what": { stepsTitle: "From rounds to a consumption overview", whyTitle: "Why the numbers end the debate",
      guides: [["blog/split-a-bill-when-some-friends-dont-drink.html", "How to split a bill when some friends don't drink"],
        ["blog/how-to-split-a-bar-bill-fairly.html", "How to split a bar bill fairly between friends"],
        ["blog/round-buying-vs-splitting-the-bill.html", "Round buying vs splitting the bill"]] },
    "export-summary": { stepsTitle: "Export and share in three taps", whyTitle: "Why plain text works for every group",
      guides: [["blog/how-to-remind-friends-to-pay-you-back.html", "How to remind friends to pay you back"],
        ["blog/how-to-split-and-charge-friends-on-venmo.html", "How to split a bill and charge friends on Venmo"],
        ["blog/settle-up-without-tracking-debts.html", "How to settle up without tracking debts"]] },
    "live-sharing": { stepsTitle: "Share a session with the group", whyTitle: "Why offline-first suits nights out",
      guides: [["help/icloud-sharing.html", "Help: sharing a session through iCloud"],
        ["blog/roundfair-vs-splitwise.html", "RoundFair vs Splitwise"],
        ["compare/roundfair-vs-splid.html", "RoundFair vs Splid"]] },
    // use cases: overlapping pages get a distinct role (the app in that situation), the blog keeps the how-to guide
    "pub-rounds": { stepsTitle: "Running a pub night in RoundFair", whyTitle: "Why a shared count keeps the tradition alive",
      guides: [["blog/pub-round-etiquette-uk.html", "Pub round etiquette: the unwritten UK rules"],
        ["blog/whose-turn-to-buy-the-next-round.html", "Whose turn is it to buy the next round?"],
        ["tools/who-pays-wheel.html", "Who pays? Free online spin wheel"],
        ["compare/roundfair-vs-whoseround.html", "RoundFair vs WhoseRound?"]] },
    "bachelor-hen-party": { title: "Bachelor and Hen Party App for Rounds and Shared Costs",
      desc: "Run the bachelor or hen party in RoundFair: track rounds, split taxis and dinners between the right people and cover the guest of honour. Free iOS app.",
      stepsTitle: "Running the weekend in RoundFair", whyTitle: "Why one record beats a weekend of IOUs",
      guides: [["blog/bachelor-party-cost-splitting.html", "Planning guide: how to split costs on a bachelor or hen party"],
        ["blog/how-to-remind-friends-to-pay-you-back.html", "How to remind friends to pay you back"],
        ["tools/round-cost-calculator.html", "Round cost calculator"]] },
    "group-trips": { title: "Group Trip App for Shared Costs and Nights Out",
      desc: "Use RoundFair on a group trip: split taxis, dinners and hotel nights between the people who shared them, keep the evening rounds fair, export one summary.",
      stepsTitle: "Using RoundFair on the trip", whyTitle: "Why per-cost splits suit trips",
      guides: [["blog/splitting-costs-on-a-group-trip.html", "Planning guide: splitting group trip costs without falling out"],
        ["blog/how-to-split-expenses-in-a-foreign-currency.html", "How to split expenses in a foreign currency"],
        ["compare/tricount-alternatives.html", "Tricount alternatives for trips and nights out"],
        ["compare/roundfair-vs-settle-up.html", "RoundFair vs Settle Up"]] },
    "restaurant-dinners": { title: "Group Dinners Out: Split the Meal, Then the Rounds",
      desc: "For group dinners that carry on at the bar: split the meal by item with tip and tax, then keep the rounds fair afterwards, all in one RoundFair session.",
      stepsTitle: "Dinner, then drinks, in one session", whyTitle: "Why one session for the whole evening",
      guides: [["features/restaurant-mode.html", "Restaurant mode: the itemised bill splitter in RoundFair"],
        ["blog/split-dinner-bill-with-friends.html", "How to split a dinner bill with friends"],
        ["blog/how-much-to-tip-when-splitting-the-bill.html", "How much to tip when splitting the bill"],
        ["tools/receipt-splitter.html", "Free receipt splitter"]] },
    "work-drinks": { stepsTitle: "Running a team night in RoundFair", whyTitle: "Why a neutral record helps with colleagues",
      guides: [["blog/split-a-bill-when-some-friends-dont-drink.html", "Splitting a bill when some people don't drink"],
        ["blog/how-to-run-a-bar-tab-with-friends.html", "How to run a bar tab without drama"],
        ["use-cases/coffee-and-lunch-rounds.html", "Coffee and lunch rotations at work"]] },
  },

  newUseCases: [
    { slug: "festivals", name: "Festivals", title: "Festival Drinks with Friends: Track Rounds Offline",
      desc: "Keep festival rounds fair with RoundFair: log who bought each round, see who is up next and settle up after the weekend, even with no signal on site.",
      lead: "A festival is one long round of drinks spread over a weekend, in fields where the phone signal gives up. RoundFair keeps the count on your iPhone.",
      stepsTitle: "Using RoundFair at a festival",
      steps: ["Start a session for the festival and add your group.", "Log each round as it is bought, with who paid and who joined it.", "Check who is up next at the bar, and settle up when you are home."],
      whyTitle: "Why offline matters on a festival site",
      why: "Festival sites are where mobile data is at its worst. RoundFair is offline-first: rounds are stored on your iPhone and sync through iCloud once you are connected again, so the count never depends on the network.",
      faq: [["Does RoundFair work without a signal at a festival?", "Yes. You can add rounds, see whose turn it is and settle without a connection. Shared sessions sync through iCloud when your phone is back online."], ["Can I track a whole weekend in one session?", "Yes. A session is not limited to one evening, so you can keep the rounds of a festival weekend together and settle once at the end."]],
      uses: ["turn-order", "live-sharing"],
      guides: [["blog/whose-turn-to-buy-the-next-round.html", "Whose turn is it to buy the next round?"], ["tools/round-cost-calculator.html", "Round cost calculator"], ["help/icloud-sharing.html", "Help: sharing a session through iCloud"]] },
    { slug: "student-nights", name: "Student nights out", title: "Student Nights Out: Fair Rounds on a Budget",
      desc: "Student nights out on a budget: RoundFair tracks whose round it is, who is behind and what everyone had, so nobody pays for someone else's night. Free on iOS.",
      lead: "On a student budget, an extra round you did not drink is not a rounding error. RoundFair keeps the count fair without anyone having to play accountant.",
      stepsTitle: "Running a student night in RoundFair",
      steps: ["Start a session and add whoever is out tonight.", "Log rounds as they are bought, and who joined each one.", "Settle up at the end, or keep the balance and even it out next time."],
      whyTitle: "Why fairness matters more on a budget",
      why: "When money is tight, the friend who skips a round or orders the cheapest drink should not end up paying for everyone else. RoundFair records who joined each round, so the balance reflects what people actually had.",
      faq: [["Is RoundFair free?", "Yes. RoundFair is free on the App Store, with no account needed."], ["What if someone only joins a few rounds?", "Record who joined each round. The balance then reflects what each person took part in, not just how many people were at the table."]],
      uses: ["who-drank-what", "split-the-bill"],
      guides: [["blog/split-a-bill-when-some-friends-dont-drink.html", "How to split a bill when some friends don't drink"], ["blog/how-to-decide-who-buys-the-next-round.html", "Six fair ways to decide who buys the next round"], ["tools/who-pays-wheel.html", "Who pays? Free online spin wheel"]] },
    { slug: "coffee-and-lunch-rounds", name: "Coffee and lunch rounds", title: "Coffee and Lunch Rounds at Work: Whose Turn to Pay?",
      desc: "Take turns paying for coffee or lunch with colleagues? RoundFair tracks whose turn it is and who is behind, so the rotation stays fair week after week.",
      lead: "Rounds are not only for the pub. Teams that take turns buying coffee or lunch have the same question every day: whose turn is it?",
      stepsTitle: "Running a coffee rotation in RoundFair",
      steps: ["Create a session for the coffee or lunch group and add everyone.", "Log each round when someone pays, and who it was for.", "Check who is up next before the next coffee run."],
      whyTitle: "Why a record keeps daily rotations friendly",
      why: "Small rotations go wrong quietly: holidays, sick days and people who only join on Fridays. A running record shows who is behind without anyone having to keep score in their head.",
      faq: [["Can I use RoundFair for coffee instead of drinks?", "Yes. A round is any shared purchase one person pays for, so coffee runs and lunch rotations work the same way as rounds at the bar."], ["What if someone is away for a week?", "Only the people who joined a round are part of it, so someone on holiday does not fall behind for coffees they did not have."]],
      uses: ["turn-order", "saved-spots"],
      guides: [["compare/roundfair-vs-next-ones-on-me.html", "RoundFair vs Next One's On Me"], ["use-cases/work-drinks.html", "Work drinks and team nights"], ["blog/settle-up-without-tracking-debts.html", "How to settle up without tracking debts"]] },
  ],

  content: {
    "festivals": { sections: [
      ["Rounds over a whole weekend", [
        "At a festival, rounds are spread out: someone grabs drinks between two sets, someone else on the way back from the toilets, and by Saturday night nobody remembers who paid for what on Friday. Logging each round as it is bought keeps the record honest, and the turn order shows who should go to the bar next.",
        "Because RoundFair records who joined each round, the friend who went to a different stage for the afternoon is not charged for the rounds they missed."
      ]],
      ["Settling up after the festival", [
        "When the weekend is over, [split the bill](features/split-the-bill.html) to even out the differences and [export the summary](features/export-summary.html) to the group chat. One person can keep the record for everyone, or the group can follow the session on their own iPhones through [live sharing](features/live-sharing.html)."
      ]],
      ["A few practical tips", [
        "- Start the session before you arrive, while you still have a connection, so everyone is added.",
        "- Use the [round cost calculator](tools/round-cost-calculator.html) beforehand to agree on a rough drinks budget.",
        "- Keep one person in charge of logging if the group splits up; a shared session catches up when phones reconnect."
      ]]], faq: [] },
    "student-nights": { sections: [
      ["Big groups, small budgets", [
        "Student nights tend to be large and fluid: people join after a lecture, leave for another party, and the group at midnight looks nothing like the group at eight. Strict rotation breaks down quickly in that setting. A record of who paid and who joined each round keeps the balance fair even when the group keeps changing.",
        "If nobody wants to decide who goes next, the app's spin wheel can pick someone at random. There is also a [free online version](tools/who-pays-wheel.html) for groups who have not installed the app."
      ]],
      ["Settling up without awkward conversations", [
        "At the end of the night, RoundFair shows everyone's balance and who should pay whom. Sharing a plain-text [summary](features/export-summary.html) in the group chat means nobody has to chase anyone in person. For tips on asking for money back without souring a friendship, see [how to remind friends to pay you back](blog/how-to-remind-friends-to-pay-you-back.html)."
      ]]], faq: [] },
    "coffee-and-lunch-rounds": { sections: [
      ["How a coffee rotation drifts", [
        "A coffee rotation starts simple: one person buys for the group, the next day someone else does. Within a few weeks, holidays, meetings and the colleague who only drinks tea have made the order unclear. Nobody wants to be the one asking whether it is really their turn.",
        "RoundFair treats each coffee run as a round: who paid, and who it was for. The turn order then shows who is furthest behind, so the next person to pay is obvious."
      ]],
      ["Saving your usual places", [
        "Most coffee and lunch rotations use the same few places. [Saved spots](features/saved-spots.html) remember them, including drink prices, so logging the next run takes a few taps. RoundFair can also repeat a previous round without entering everything again."
      ]],
      ["Do you need an app at all?", [
        "For two or three people who see each other every day, memory may be enough. For a bigger team, a shared record avoids the slow build-up of resentment. If your team prefers to keep the rotation in iMessage, a simpler tool may suit you; see [RoundFair vs Next One's On Me](compare/roundfair-vs-next-ones-on-me.html)."
      ]]], faq: [] },
  },

  append: {
    // merged from the retired blog post "Round Buying App: Track Whose Turn It Is"
    "turn-order": [["What to look for in a round tracker app", [
      "If you are comparing apps for tracking rounds, a few things matter more than any feature list:",
      "- Logging a round should take seconds. If it takes more than a few taps, people stop using it by round three.",
      "- It should show whose turn it is at a glance, so nobody has to ask.",
      "- It should track who is behind, not just who has bought the fewest times, because rounds are not all the same size.",
      "- It should work without a signal, because bars and festivals often have poor reception.",
      "- It should not force every friend to create an account before the first drink.",
      "RoundFair is built around those points: one-tap rounds, an Up now view, balances per person, offline-first storage and no accounts. To see how other apps approach the same problem, read [RoundFair vs WhoseRound?](compare/roundfair-vs-whoseround.html) and [RoundFair vs Next One's On Me](compare/roundfair-vs-next-ones-on-me.html)."
    ]]],
    "restaurant-dinners": [["When dinner turns into drinks", [
      "Many group dinners do not end at the restaurant. The meal is split by item, then the group moves to a bar and the rounds begin. In RoundFair both happen in the same session: [restaurant mode](features/restaurant-mode.html) handles the itemised bill with tip and tax, and [turn order](features/turn-order.html) keeps the rounds fair afterwards. At the end, one settlement covers the whole evening instead of two separate reckonings."
    ]]],
    "group-trips": [["Trips: what RoundFair is and is not for", [
      "RoundFair is built around sessions and rounds, which suits the evenings of a trip and costs that a few people share, like a taxi or a hotel room. For long trips with dozens of expenses, several currencies and payments spread over weeks, a dedicated ledger app may suit you better; our [Tricount alternatives](compare/tricount-alternatives.html) page compares the options honestly. Many groups use a ledger for the trip and RoundFair for the nights out."
    ]]],
    "bachelor-hen-party": [["Planning the weekend", [
      "This page covers running the weekend in the app. For the planning side, such as setting a budget, collecting money early and deciding who covers the guest of honour, read our guide on [how to split costs on a bachelor or hen party](blog/bachelor-party-cost-splitting.html)."
    ]]],
  },
};
