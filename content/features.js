module.exports = {
"turn-order": {
sections: [
["What is a round turn order tracker?", [
"A turn order tracker answers one small question that causes surprisingly big arguments: whose round is it? RoundFair keeps a running count of the rounds each person has bought and uses it to show who is up now and who is furthest behind. Nobody has to hold the tally in their head, and nobody has to trust the person who is suspiciously sure it is not their turn.",
"The idea is simple, but the details are where groups fall out. Someone pops out for a cigarette, someone arrives an hour late, someone buys a round for two tables at once. A mental tally copes badly with all of that. A tracker that counts what was actually bought copes fine, because it only ever looks at the record.",
"If you want the etiquette behind the maths, our guide to [whose turn it is to buy the next round](blog/whose-turn-to-buy-the-next-round.html) covers the unwritten rules, and [how to decide who buys the next round](blog/how-to-decide-who-buys-the-next-round.html) covers the fair-minded ways of settling it when nobody remembers."]],
["How to track whose round it is, step by step", [
"The routine takes about ten seconds per round, which is the whole point. Anything slower and people stop doing it by the second pint.",
"- Start a session when the group sits down and add everyone who is there. You can add latecomers when they arrive.",
"- When someone buys a round, log it in one tap against their name. Do it at the bar or when the drinks land on the table, before the moment is forgotten.",
"- Look at the turn order before anyone stands up. The person who is most behind is next, and everyone can see why.",
"- Repeat until closing time. At the end, the history shows how many rounds each person bought.",
"One habit makes the biggest difference: nominate whoever is nearest their phone as the logger, and swap the job now and then. The app is far more accurate when one person owns the tap than when everyone assumes someone else did it."]],
["A worked example with real numbers", [
"Take five friends, Amira, Ben, Chloe, Dev and Ella, over an evening. Amira buys round one, Ben buys round two, Chloe round three. Dev arrives after round three and Ella has to leave after round six.",
"After three rounds the tally is Amira 1, Ben 1, Chloe 1, Dev 0. Dev walks in having bought nothing, so he is furthest behind and the app puts him next. That is fair: he has drunk in rounds he did not join, but he has also just arrived, and buying the next one is the friendly way to join in.",
"By round six, suppose Dev has bought round four, Amira round five and Ben round six. The tally is Amira 2, Ben 2, Chloe 1, Dev 1, Ella 0. Ella is leaving, so she stays at zero, and the group can decide whether she buys a farewell drink or whether her absence is simply written off. The tracker does not make that call for you, but it makes the choice visible, which is half the battle.",
"Counting rounds, not money, is a deliberate simplification. Round buying works on the assumption that it evens out over time, and a round of beer and a round of cocktails count as one turn each. If the price gap matters to your group, see [round buying vs splitting the bill](blog/round-buying-vs-splitting-the-bill.html) for when to switch approach."]],
["Common problems and edge cases", [
"Most disputes come from a handful of situations, and each has a sensible answer.",
"- Someone joins late. Add them when they arrive. Because they have bought nothing, they will show as behind and come up soon, which most groups regard as a friendly welcome rather than a penalty.",
"- Someone leaves early. Remove them from the order or leave them in with a lower count. What you agree matters less than agreeing it aloud, so the group is not surprised later.",
"- Two people buy at once. Log both rounds. The count is what matters, not the order they were bought in.",
"- Someone forgot to log a round. Log it as soon as you remember. Adding a missed round afterwards fixes the count.",
"- A round is a single drink for one person. Decide as a group whether that counts. Most groups say no, only rounds for the whole table count.",
"None of this needs a rule book. The value of a tracker is that it removes the need for one, because the record is there to consult and the argument shrinks to a glance."]],
["Turn order tracker vs keeping score in your head or a spreadsheet", [
"Memory is the default method and it works surprisingly well for two people over two pints. It fails for larger groups because human recall is biased: everyone remembers their own rounds vividly and other people's vaguely. That is not dishonesty, just how memory works.",
"A spreadsheet or a notes app fixes accuracy but adds friction. Somebody has to open it, find the right row, and type the name correctly with a pint in one hand. Tabs get stale, the person who owns the sheet becomes the group's accountant, and the whole thing dies by the third outing.",
"A general expense splitter is a different tool for a different job. Apps built for shared costs track money owed, which is right for a holiday and heavy for a round of beers. If you are weighing them up, our comparison of the [best apps for tracking whose turn it is](features/turn-order.html#what-to-look-for-in-a-round-tracker-app) sets out what each approach is good at, and [best bill splitting apps](blog/best-bill-splitting-apps.html) covers the money side.",
"RoundFair sits in the gap: it counts rounds rather than pounds, works in a couple of taps, needs no accounts, and stores data on your device and your personal iCloud."]],
["Tips for keeping the round order fair", [
"- Agree the rules before the first drink. Two minutes at the start prevents twenty minutes of debate later.",
"- Log the round when it lands, not at the end of the night. Rounds logged from memory are the ones that get argued about.",
"- Let the person furthest behind volunteer. It is nicer than being told, and most people do.",
"- Treat the tally as a guide, not a court. A tracker is there to stop arguments, not to start them.",
"- Look at the history occasionally. Seeing that the same person has bought most rounds for a month is useful and usually leads to a friendly correction.",
"For the cultural side, [pub round etiquette in the UK](blog/pub-round-etiquette-uk.html) and [round buying etiquette around the world](blog/round-buying-etiquette-around-the-world.html) are worth a read if your group crosses borders."]],
["Who a turn order tracker is for", [
"It suits any group of three or more who take turns paying: a regular Friday pub crowd, colleagues at [work drinks](use-cases/work-drinks.html), a stag or hen party where the group is large and the rounds are frequent, or a group holiday. The bigger and looser the group, the more useful an objective record becomes.",
"It is less useful when the group already splits everything equally at the end, or when one person is happy to pay for everything. In that case the better tool is [Split the bill](features/split-the-bill.html), which divides one total among chosen people.",
"For the full story of how groups use it night to night, see [pub rounds with friends](use-cases/pub-rounds.html)."]]
],
faq: [
["Does it track how much each round cost?", "Turn order is based on rounds bought, so it answers who is next. If you also want to see what people drank and what it cost, the [consumption overview](features/who-drank-what.html) shows that."],
["What happens if two people are equally behind?", "They are tied, so either can go next. Groups usually let whoever is nearest the bar volunteer, or the person who bought least recently."],
["Can I fix a round I logged by mistake?", "Yes, rounds can be corrected. It is best to fix a mistake straight away, while everyone remembers what happened."],
["Do all my friends need RoundFair installed?", "No. One person can keep the record for the group. If you want everyone to see the same live order, [live sharing](features/live-sharing.html) does that through iCloud."],
["Is turn order fair if people drink at different speeds?", "Turn order tracks rounds, not drinks. If some people are slower, that is a social call for the group. Many groups simply buy a round when most glasses are nearly empty."]
]
},
"saved-spots": {
sections: [
["What are saved spots for bars and restaurants?", [
"Saved spots are a short list of the places your group actually goes: the local, the pizza place, the bar near the office. Instead of entering a venue from scratch every time you start a night out, you pick it from your list. RoundFair then records rounds with that location, so you can look back at where the night went.",
"That is the whole idea, and it earns its place because most groups are creatures of habit. If you drink at the same three places most months, typing a venue name each time is friction you do not need. Saved spots make starting a session a few taps rather than a small form."]],
["How to save and use your favourite spots", [
"There are two natural moments to save a place, and both are quick.",
"- The first time you visit, save the place from the session you are already running.",
"- Later, when you plan a night, pick it from your list as you start the session.",
"Once a place is in the list, choosing it is all that is needed. Rounds you log during the session carry the location with them, so the history builds up on its own without extra work.",
"If you move on halfway through the evening, rounds can be recorded with a different location, which is exactly what you want on a bar crawl. See below for how that works in practice."]],
["A worked example: one bar crawl, three spots", [
"Imagine a Saturday with four friends and three stops: the Crown for the first two rounds, a cocktail bar for three rounds, and a late-night place for one last round. That is six rounds across three venues.",
"With saved spots, the Crown, the cocktail bar and the late-night place are already in the list from previous weekends. When you arrive at each, you choose it and log the rounds there. At the end of the night the history reads: Crown, 2 rounds; cocktail bar, 3 rounds; late-night place, 1 round.",
"The value shows up the following week. A friend says the cocktail bar was where the trouble started, and you can look at the record instead of arguing. It also helps with planning: if the cocktail bar accounts for half the rounds, that is worth knowing before you suggest going back."]],
["Common problems with saved places", [
"Nothing here is complicated, but a few situations come up.",
"- Two venues with the same name. Chains and generic pub names cause confusion. Give each a name you will recognise, such as the branch or street.",
"- A place closes or you stop going. Tidy the list occasionally so the ones you use are easy to find.",
"- A one-off venue you will never visit again. You do not have to save it. It is fine to log rounds for a single night without adding a permanent entry.",
"- Different groups, same places. If you go to the same pub with work friends and old friends, the venue is the same but the session is separate. The list stores places, not groups.",
"These are the sort of small tidy-ups that keep any list useful, and none of them is urgent."]],
["Saved spots vs notes apps, maps and bookmarks", [
"You could keep a list of favourite bars in a notes app, star them in a maps app, or bookmark them in a browser. All of those work as memory aids, and if you already have a starred list you like, there is no need to abandon it.",
"The difference is what happens after you arrive. A maps list tells you where a place is, but it does not know you have started a night out there. A saved spot in RoundFair is connected to the rounds, so the place and the drinks live in one record. You do not have to remember to match them up later.",
"There is also a privacy angle. Location history in general-purpose apps often lives on someone else's servers. RoundFair has no accounts and no servers, and your saved spots stay on your device and in your personal iCloud."]],
["Tips for getting more out of your saved spots", [
"- Save the place the first time you enjoy it, while you are already there and thinking about it.",
"- Use short, obvious names. If you have to think about which entry is which, the list is not saving you time.",
"- Keep the list short. Ten places you actually use beat fifty you visited once.",
"- Use the location history when planning. If you want to try somewhere new, the history shows you what you have been doing lately.",
"- Pair spots with the [turn order tracker](features/turn-order.html), so each place has a clear record of whose round it was.",
"For a wider look at running a night with several stops, see our guide to [how to run a bar tab with friends](blog/how-to-run-a-bar-tab-with-friends.html)."]],
["Who saved spots are for", [
"Saved spots suit regular groups: the Friday crowd, the after-work regulars, the friends who always end up at the same two places. If you go out often, the time saved per session is small but adds up, and the location history becomes an interesting record over months.",
"They also help groups planning [a bachelor or hen party](use-cases/bachelor-hen-party.html), where there are several venues in one night and a lot of rounds to keep track of. Every stop can be picked from the list rather than typed while everyone is already thirsty.",
"If you go somewhere new every time, or only go out a few times a year, saved spots matter less. You can simply log the venue for that night and move on."]]
],
faq: [
["Is there a limit to how many spots I can save?", "The site does not set a limit, but a short list is more useful than a long one. Keep the places you actually visit."],
["Can I look back at where I logged rounds?", "Yes. Rounds are recorded with their location, so your history shows where each round was bought."],
["Do saved spots work offline?", "Yes. RoundFair works offline and keeps your data on your device, so your list is available in a bar with no signal. See [live sharing and offline](features/live-sharing.html)."],
["Can I use saved spots for restaurants as well as bars?", "Yes. Bars and restaurants are both places, so you can save either. For a restaurant meal, [restaurant mode](features/restaurant-mode.html) handles the bill."],
["Will my friends see my saved spots?", "Not unless you share a session with them. Your list stays on your device and in your personal iCloud."]
]
},
"restaurant-mode": {
sections: [
["What is a restaurant bill splitter with tip and tax?", [
"A restaurant bill splitter lets you divide a meal by what each person actually ordered, instead of dividing the total by the number of people. Restaurant mode in RoundFair does exactly that: you add the items, say who had each one, and add tip and tax so that each person's share adds up to the final bill.",
"It exists because splitting evenly is only fair when everyone ordered similar things. If one person has a salad and water and another has steak, two glasses of wine and a dessert, an equal split quietly transfers money from one to the other. Most groups tolerate that for a while, and then someone stops coming to dinners."]],
["How to split a restaurant bill by item", [
"The process mirrors the way you would do it on paper, but faster and without the calculator.",
"- Start a restaurant session and add the people at the table.",
"- Enter each item from the bill and choose who had it. Shared starters or a bottle of wine can be split across the people who had them.",
"- Add tip and tax. RoundFair spreads them in proportion to what each person ordered.",
"- Check the totals against the bill. Each person's share includes their portion of tip and tax, and together they match what the restaurant is charging.",
"For the method behind it, [how to split a receipt item by item](blog/how-to-split-a-receipt-item-by-item.html) walks through the same idea in more detail."]],
["A worked example: four people, one bill", [
"Say four friends eat out. The items are: Priya, pasta 14 and water 3; Tom, steak 26 and two beers 10; Nadia, salad 11 and a glass of wine 7; Sam, burger 15 and one beer 5. They also share a bottle of house wine at 24, which Priya does not drink, and a starter at 12 shared by all four.",
"Start with the shared items. The wine at 24 splits three ways among Tom, Nadia and Sam, so 8 each. The starter at 12 splits four ways, so 3 each.",
"Now the individual totals before tip and tax: Priya 14 + 3 + 3 = 20. Tom 26 + 10 + 8 + 3 = 47. Nadia 11 + 7 + 8 + 3 = 29. Sam 15 + 5 + 8 + 3 = 31. That adds up to 127.",
"Add a 10 percent tip, 12.70, in proportion. Priya pays 20 percent of 127, so she adds 2.00 and pays 22.00. Tom adds 4.70 and pays 51.70. Nadia adds 2.90 and pays 31.90. Sam adds 3.10 and pays 34.10. The total is 139.70, which is exactly the bill plus tip. An even split would have charged everyone 34.93 and left Priya paying almost 13 more than her own meal.",
"The gap is the reason to do it. The workings are quick with the tool, and the result is one the whole table can see and agree with."]],
["Common problems with itemised restaurant bills", [
"- Tax and tip already on the bill. Check whether the restaurant has added a service charge before adding tip. Adding one on top of another is a common and expensive mistake. See [how to split tax and tip on a bill](blog/how-to-split-tax-and-tip-on-a-bill.html).",
"- Shared dishes. Split them across only the people who ate them. The bottle nobody else touched is not a shared cost.",
"- Someone ordered for everyone. If one person ordered a round of drinks for the table, treat it as a shared item and split it among the drinkers.",
"- The bill does not match. If your totals differ by a few pence, check for missed items or rounding. Restaurant mode keeps the totals matching the final bill, so a difference usually means an item was entered wrongly.",
"- Different tipping customs. Tipping norms vary by country, and our guide to [how much to tip when splitting the bill](blog/how-much-to-tip-when-splitting-the-bill.html) helps you pick a figure everyone is comfortable with."]],
["Restaurant mode vs an equal split, a calculator or another app", [
"An equal split is the fastest method and often the right one. If everyone had a main and a drink and the difference is a couple of pounds, dividing evenly saves time and avoids the awkwardness of counting pennies. We cover when that is sensible in [bill split methods explained](blog/bill-split-methods-explained.html).",
"A calculator handles the maths but not the bookkeeping: you still have to track who ordered what and spread tax and tip in proportion by hand, which is where mistakes creep in. A spreadsheet does the same with more setup.",
"Full expense apps are a good choice if you also want to track debts across trips and months. Restaurant mode is narrower: it solves one dinner properly and then it is done. If you are comparing, [best bill splitting apps](blog/best-bill-splitting-apps.html) sets out the trade-offs, and [RoundFair vs Splitwise](blog/roundfair-vs-splitwise.html) covers the difference between the two approaches."]],
["Tips for a smoother dinner bill", [
"- Decide the method before the bill arrives. Saying we will split by item at the start of the meal is much easier than proposing it when the card machine is on the table.",
"- Enter items while the waiter is bringing the bill, not afterwards. Memory of who had what fades quickly.",
"- Agree tip at the start. A shared percentage avoids the awkward moment where one person adds more than others.",
"- Round up the final figures if you like. Paying in whole numbers is fine so long as the group agrees.",
"- Use [Split the bill](features/split-the-bill.html) for costs that are not itemised, like the taxi home afterwards."]],
["Who restaurant mode is for", [
"It suits any table where orders differ: friends at a birthday dinner, colleagues at a team lunch, or families with a mix of children and adults. It is most valuable when the group is larger than four, when there is a mix of drinkers and non-drinkers, or when someone has ordered a lot more than the rest.",
"For more on this kind of night, see [restaurant dinners](use-cases/restaurant-dinners.html), [how to split a dinner bill with friends](blog/split-dinner-bill-with-friends.html), and [what to do when some friends do not drink](blog/split-a-bill-when-some-friends-dont-drink.html)."]]
],
faq: [
["Does restaurant mode work in any currency?", "The mode divides amounts in proportion, so the arithmetic works the same whatever the currency. For notes on paying in another currency, see [how to split expenses in a foreign currency](blog/how-to-split-expenses-in-a-foreign-currency.html)."],
["What if a shared dish is eaten by only some people?", "Choose just those people for that item. The cost is divided among them and nobody else is charged for it."],
["Can I split by percentage instead of items?", "Sometimes a percentage split suits better, for example when one person is paying more of a family bill. Our guide to [splitting a bill by percentage](blog/split-a-bill-by-percentage.html) explains when."],
["How do I share the result with the table?", "You can export a plain text summary and paste it into a group chat. See [export the summary](features/export-summary.html)."],
["Is restaurant mode free?", "RoundFair is a free iOS app, and restaurant mode is one of its features."]
]
},
"split-the-bill": {
sections: [
["What does it mean to split the bill fairly?", [
"Splitting the bill fairly means dividing one shared cost among exactly the people who shared it. It sounds obvious, but many arguments come from the reverse: a taxi split across the whole group when only four people rode in it, or a hotel room split by headcount when two people arrived a day later.",
"RoundFair's Split the bill feature handles the straightforward case. You enter a total, choose who shared it, and the app divides it evenly among those people and shows who owes whom. It suits costs that are naturally a single amount: a taxi, a hotel night, a takeaway, a rented house, a round of tickets.",
"If the costs differ by person, such as a restaurant meal, [restaurant mode](features/restaurant-mode.html) is the better tool. The standard split is deliberately simple."]],
["How to split a taxi, dinner or hotel step by step", [
"- Enter the total. Use the amount actually paid, including any tip.",
"- Choose who shared it. This is the key step: only pick the people who took part in the cost.",
"- Let RoundFair divide it evenly and show who owes whom.",
"- Repeat for the next cost. Everything for the night settles in one place at the end.",
"The order of those steps matters less than the choice of people. If you are unsure who should be in, ask before the money changes hands. It is easier to agree who shared a cost than to agree on the amount afterwards."]],
["A worked example: a weekend away", [
"Five friends spend a Saturday in a city. The evening includes a 30 taxi from the station shared by three of them, a 160 hotel room for the two who stayed over, a 45 takeaway everyone ate, and a 20 taxi home shared by four.",
"The taxi at 30 among three people is 10 each. The hotel at 160 for two is 80 each. The takeaway at 45 among five is 9 each. The last taxi at 20 among four is 5 each.",
"Now add it up per person. If person A rode in both taxis, stayed in the hotel and ate the takeaway, they are down for 10 + 80 + 9 + 5 = 104. Person B, who skipped the first taxi and the hotel, is down for 9 + 5 = 14.",
"Trying to do that by rounding up and dividing the lot by five gives 51 each, which is wrong for everybody. The person who paid for the hotel would be out of pocket, and the person who only ate takeaway would be overpaying by 37. Choosing the people for each cost is what makes the split fair."]],
["Common problems and awkward situations", [
"- Someone pays and someone else gets left out. If a cost was shared, include everyone who benefited. Leaving out a friend to be nice can create a resentful gap later.",
"- Rounding. Costs rarely divide neatly. It is normal for one person to cover a penny or two. If it bothers your group, round to the nearest whole amount and agree it once.",
"- A person joins part way. Include them in the costs they shared and leave them out of the ones they did not.",
"- Splitting between couples. Decide whether a couple counts as one or two. Many groups treat a couple as two people for shared costs like a house and one for a single taxi. Agree it upfront.",
"- Chasing payment. If you are the one owed money, [how to remind friends to pay you back](blog/how-to-remind-friends-to-pay-you-back.html) has polite ways to do it."]],
["Split the bill vs calculators, spreadsheets and other apps", [
"For a single cost between two people, a mental sum is faster than any app. The tool earns its keep once several costs and several groups of people are involved, because that is when the mental sums fall apart.",
"Spreadsheets are flexible but slow to set up on a phone at midnight. Payment apps are convenient for sending money but usually do not work out who owes what. Full expense trackers are excellent for long trips and ongoing households, and we cover several in [free bill splitting apps](blog/best-bill-splitting-apps.html#free-bill-splitting-apps-what-free-really-means) and [best Splitwise alternatives](blog/best-splitwise-alternatives.html).",
"RoundFair's angle is to keep it light: no accounts, no servers, and a night's costs settled in one place. If you want to keep the debts running across months, a heavier tool suits better, and our guide to [settling up without tracking debts](blog/settle-up-without-tracking-debts.html) explains the lighter approach we prefer."]],
["Tips for splitting costs with friends", [
"- Agree the split before you spend, not after. A quick who is in for the taxi takes five seconds.",
"- Enter costs as they happen. A receipt in your pocket is easy to forget by the next morning.",
"- Settle the same day if you can. Small debts that linger become awkward faster than large ones settled quickly. See [how to split and charge friends on Venmo](blog/how-to-split-and-charge-friends-on-venmo.html) if you use a payment app.",
"- Use one person as the keeper of the record. The rest can read the export from [Export the summary](features/export-summary.html).",
"- For bigger trips, [splitting costs on a group trip](blog/splitting-costs-on-a-group-trip.html) is worth reading in advance."]],
["Who the standard split is for", [
"It suits groups on a night out, a weekend away or a trip, anywhere costs come in lumps rather than itemised lists. It is particularly handy at [bachelor and hen parties](use-cases/bachelor-hen-party.html), where hotel rooms, taxis and activities are shared by different subsets of people, and on [group trips](use-cases/group-trips.html).",
"It works well alongside round tracking: use [turn order](features/turn-order.html) for the drinks and Split the bill for everything else."]]
],
faq: [
["Can I split a bill unevenly with this feature?", "The standard split divides one total evenly among the people you choose. For uneven splits by item, use [restaurant mode](features/restaurant-mode.html)."],
["What if only some people used the service, like a taxi?", "Choose only the people who shared it. That is the reason for picking people per cost."],
["How do I show the group what everyone owes?", "Export a plain text overview and paste it into your group chat. See [export the summary](features/export-summary.html)."],
["Can I include tip in the total?", "Yes. Enter the amount you actually paid, tip included, so the split matches reality."],
["Does everyone need to enter costs?", "No. One person can keep the record, or everyone can see it live through [iCloud sharing](features/live-sharing.html)."]
]
},
"who-drank-what": {
sections: [
["What is a who drank what consumption overview?", [
"A consumption overview shows what each person had and what it cost. In RoundFair you choose a category for each round, such as beer, wine or a soft drink, and the app records what each person had. Opening the overview then gives you the picture in numbers rather than impressions.",
"It matters because splitting by headcount assumes everyone drank about the same, and that is often untrue. One person nurses a soft drink while another goes through cocktails at three times the price. Nobody wants to be the one who raises it, and an overview lets the group see the facts without anyone having to accuse anyone."]],
["How to see who drank what, step by step", [
"- Choose a category for each round as you log it: beer, wine, soft drink or whatever fits.",
"- RoundFair records what each person had in that round.",
"- At any point open the overview to see consumption and cost per person.",
"Categories are optional. Rounds work without them, but the overview is much more useful with them, since it can only show what you told it. If you are short of time, a quick category per round is enough."]],
["A worked example: five friends, one evening", [
"Five friends have four rounds. Round one: five pints at 6 each. Round two: four pints and one soft drink, which is 4 for the driver, so 28. Round three: three cocktails at 11, one pint and one soft drink, so 33 + 6 + 4 = 43. Round four: two pints, two glasses of wine at 7 and one soft drink, so 12 + 14 + 4 = 30.",
"The total is 30 + 28 + 43 + 30 = 131. Split evenly, that is 26.20 each.",
"Now look at the driver, who had only soft drinks: 4 + 4 + 4 = 12 in cost. An even split has the driver paying more than double their consumption. Meanwhile the cocktail drinkers pay well below their share.",
"The overview does not force an answer. A group of close friends might look at it, say the driver's being generous, and split evenly anyway. Another might charge each person for what they drank. The difference is that the choice is made with the numbers on the table, rather than by default. For more on the options, see [how to split a bar bill fairly](blog/how-to-split-a-bar-bill-fairly.html)."]],
["Common problems when tracking drinks", [
"- Rounds where people have different things. Log the category that best describes the round, and use the categories to reflect what people actually had.",
"- Missing a drink. If someone orders an extra drink between rounds, decide whether it matters. For small amounts it usually does not.",
"- Sharing a bottle. A bottle of wine among several people is best treated as a shared item. For itemised bills, see [restaurant mode](features/restaurant-mode.html).",
"- Non-drinkers. It is the most common source of friction, and we cover it in detail in [splitting a bill when some friends do not drink](blog/split-a-bill-when-some-friends-dont-drink.html).",
"- Guilt about the numbers. The overview can make people feel watched. Present it as helpful information rather than a scoreboard."]],
["Consumption overview vs guessing, receipts and spreadsheets", [
"Guessing is the default and it is free. It works when the group is small and the drinks are similar in cost, and it breaks down when they are not. Bar receipts show the total but rarely the breakdown per person unless you were on a tab. Our guide to [running a bar tab with friends](blog/how-to-run-a-bar-tab-with-friends.html) covers that case.",
"A spreadsheet can record everything, but you have to set it up and type quickly in a noisy pub. With RoundFair the recording happens as you log rounds, so the overview is a by-product of something you were doing anyway.",
"The overview is not a replacement for good judgement. If your group prefers to keep things simple, the summary can still be useful as a sanity check. For a detailed look at the choices, [bill split methods explained](blog/bill-split-methods-explained.html) sets out the main options."]],
["Tips for using drink categories well", [
"- Keep categories broad. Beer, wine, spirits, soft drink and cocktails are usually enough.",
"- Log the category at the same moment as the round, so nothing is reconstructed later.",
"- Look at the overview before the final round, not just at closing. It is easier to adjust when the night is not over.",
"- Use it to be kind. It can show that the designated driver has paid heavily for a night of soft drinks, and lead to a fair adjustment.",
"- Combine it with [turn order](features/turn-order.html): turn order keeps the buying fair, and the overview keeps the money fair."]],
["Who this is for", [
"It is for mixed groups: drinkers and non-drinkers, cheap pints and expensive cocktails, big spenders and light ones. It is especially useful for [work drinks](use-cases/work-drinks.html), where the group is varied and nobody wants a fuss, and for bigger events like [stag and hen parties](use-cases/bachelor-hen-party.html).",
"It is less necessary for a pair of friends who drink alike and settle up casually. In that case rounds and a shrug work fine. For a wider view of the two approaches, read [round buying vs splitting the bill](blog/round-buying-vs-splitting-the-bill.html)."]]
],
faq: [
["Does the overview show money as well as drinks?", "Yes. It shows what each person consumed and its cost."],
["Do I need to use categories?", "No, but they make the overview more useful, so it is worth the extra tap."],
["Can I use it to charge people exactly for what they had?", "You can use the overview as the basis for that, or agree to keep the split simple. The app gives you the facts and the group decides."],
["Will other people see my consumption?", "Only if you share the session or export the summary. Your data stays on your device and in your personal iCloud."],
["Does it work for restaurants too?", "For itemised meals, [restaurant mode](features/restaurant-mode.html) is designed for the job. The overview is aimed at rounds of drinks."]
]
},
"export-summary": {
sections: [
["What is an export of a round and balance summary?", [
"An export turns your night into a short block of plain text: the rounds that were bought and where everyone stands. You create it in RoundFair, then paste it into any messaging app or note. It is the last step of the evening, and the one that stops the next-day question of who owes what from turning into a group discussion.",
"Plain text is a deliberate choice. It reads the same in WhatsApp, iMessage, email or a shared note, and nobody needs to install anything to see it. The person who kept track can settle with everyone in one message."]],
["How to export and share a summary, step by step", [
"- Finish the session and settle the bill.",
"- Tap export to create an overview of rounds and balances.",
"- Share it as plain text in the messaging app of your choice.",
"The export only leaves your device when you share it. RoundFair has no servers and no analytics, so there is no upload step and nothing kept on our side."]],
["A worked example: from night out to group chat", [
"Suppose six colleagues had drinks after work. The keeper has logged eight rounds. Jamie bought two, Priya two, Marcus one, Lena two, Ollie one and Sasha none. A separate taxi cost 36 shared by three people, so 12 each.",
"When the keeper exports, the message lists the rounds bought by each person and the balances. It might read as a short list: who bought how many rounds, who is ahead, who is behind, and who owes whom for the taxi. Sasha, who bought none, sees straight away that a round is owed.",
"The keeper pastes it into the group chat with a line such as Thanks all, this is where we ended up, and people reply with a thumbs up or a correction. Any correction is easy to handle because the numbers are in front of everyone. Compare that with three separate conversations, each starting with what did I owe again."]],
["Common problems and how to avoid them", [
"- Sending too early. Export after the last round and the last taxi, otherwise you end up sending two versions.",
"- Someone disagrees. Correct the entry in the app and export again. Everyone then sees the same corrected version.",
"- Very large groups. A long message is harder to read. If the group is big, share it in a thread or note rather than a busy chat.",
"- Chasing payments. A summary states balances but does not collect them. For nudging, see [how to remind friends to pay you back](blog/how-to-remind-friends-to-pay-you-back.html), and for payment apps [how to split and charge friends on Venmo](blog/how-to-split-and-charge-friends-on-venmo.html).",
"- Privacy. Consider who is in the chat. A summary of balances is fine among friends, less so in a large work group."]],
["Exporting vs screenshots, spreadsheets and app-only sharing", [
"A screenshot is quick, but the text cannot be copied, searched or edited, and images get compressed until the small print is unreadable. A spreadsheet can be shared, but the recipient needs the right app and you need to tidy it up first.",
"Apps that require everyone to sign up have the opposite problem: they work well once everyone is in, but getting people in is the hard part, and a friend who does not want another account can stall the whole group. Plain text sidesteps that.",
"If you do want everyone to watch the numbers change as the night goes on, [live sharing](features/live-sharing.html) does that through iCloud. The two are complementary: live sharing during the night, the export afterwards. For an idea of how other tools handle sharing, see [best bill splitting apps](blog/best-bill-splitting-apps.html)."]],
["Tips for a clear and friendly summary", [
"- Add a line of context before pasting: which night it was and what is included.",
"- Say what you want people to do, such as Please send your share by Friday.",
"- Keep the tone light. The summary is a fact sheet, not a demand notice.",
"- Save a copy in your own notes if you want a record of the night.",
"- For a large trip, export more than once: at the end of each day or leg, rather than one long list at the end. It is easier to check and settle in stages, as [splitting costs on a group trip](blog/splitting-costs-on-a-group-trip.html) suggests."]],
["Who the export is for", [
"It is for the keeper of the record: the person who always ends up organising, on a night out, a [stag or hen party](use-cases/bachelor-hen-party.html), or a [group trip](use-cases/group-trips.html). It saves them from repeating the same answer to six people.",
"It also suits people who do not want to install anything. The export is readable by anyone who can read a message. If you are the one owed money, pair it with [Split the bill](features/split-the-bill.html) so the balances are calculated for you."]]
],
faq: [
["Can I export as a PDF or spreadsheet?", "The export is plain text, so it can be pasted anywhere. Other formats are not described on this site."],
["Can I edit the text before sending?", "Yes. Because it is plain text, you can add a greeting or a payment deadline before you send it."],
["Does exporting share my data with RoundFair?", "No. RoundFair has no servers and no analytics. The summary goes only where you send it."],
["Do the people who receive it need RoundFair?", "No. Anyone who can read a message can read the summary."],
["When is the best time to export?", "After the final round and the final shared cost, so the summary is complete. You can export again if something changes."]
]
},
"live-sharing": {
sections: [
["What is live sharing with iCloud that works offline?", [
"Live sharing means everyone in the group sees the same session: the same rounds, the same balances, updated as things change. RoundFair does this through iCloud, so there is no account to create and no separate service to trust. You start a session, invite the group, and the record stays in sync.",
"It also works offline. Bars, basements and rural pubs have poor reception, and a tool that needs a signal is a tool that fails at the worst moment. RoundFair lets you log rounds without internet, and the changes sync when you are back online."]],
["How to share a session live, step by step", [
"- Start a session and invite the group through iCloud.",
"- Everyone sees rounds and balances as they change.",
"- If you lose signal, keep logging. Changes sync when you are back online.",
"There is no sign-up flow. Sharing uses iCloud, and RoundFair has no accounts of its own. The data stays on your device and in your personal iCloud, with no analytics and no servers on our side."]],
["A worked example: a busy night with patchy signal", [
"Four friends go to a bar in a basement. Alex starts a session and invites the rest through iCloud before going in. Downstairs, nobody has signal.",
"Alex logs the first round, Sam logs the second when he buys it, and Jo logs the third. Each phone has the rounds it recorded. There is nothing to type and nothing to wait for. When the group climbs back to street level, the phones reconnect and the changes sync, so all four phones show the same three rounds and the same tally.",
"Suppose Sam and Jo both log the same round because each thought the other had not. That is a normal human mistake, and it is easy to spot in a shared view because the same round appears twice. Someone deletes the duplicate. Without a shared view, the discrepancy would only show up in an argument at the end of the night."]],
["Common problems and how to handle them", [
"- Not everyone uses iCloud. Sharing uses iCloud, so it suits groups where people have iPhones. If someone is not on iOS, one person can still keep the record and share the [exported summary](features/export-summary.html).",
"- Two people editing at once. Agree that one person is the primary logger, or agree that anyone can log and everyone checks for duplicates.",
"- Delayed sync. If you are offline, other people will not see your changes until you are back online. Give it a minute after you reconnect.",
"- Someone wants to see it but not edit it. The simplest answer is to share the exported summary rather than the live session.",
"- Battery. A dead phone is the real enemy of any app. Keep a second person as backup logger."]],
["Live sharing vs group chats, shared spreadsheets and account-based apps", [
"A group chat is where most groups end up, with messages such as Ben bought the last one. It works, but the data is buried in conversation and nobody has the total. A shared spreadsheet gives you a single source, but needs a signal, an account, and someone who can type quickly.",
"Account-based expense apps sync well, but every member has to sign up, and your data lives on their servers. That is a fair trade-off for many groups, and we compare several in [best Splitwise alternatives](blog/best-splitwise-alternatives.html) and [RoundFair vs Splitwise](blog/roundfair-vs-splitwise.html).",
"RoundFair takes a different route: use iCloud, which you already have, keep everything on your devices, and work without a signal. The trade-off is that it is designed for iOS and for lighter, night-by-night use."]],
["Tips for smooth live sharing", [
"- Invite people before you go out, while you still have signal.",
"- Choose one main logger and one backup. It reduces duplicates.",
"- Check the shared view at the halfway point to catch mistakes early.",
"- At the end, wait for sync before you close the app, then [export the summary](features/export-summary.html) as a fixed record.",
"- If the group is big, consider having sub-groups keep their own sessions, as suggested in [how to run a bar tab with friends](blog/how-to-run-a-bar-tab-with-friends.html)."]],
["Who live sharing is for", [
"It is for groups where more than one person cares about the numbers: a regular pub crowd, a team at [work drinks](use-cases/work-drinks.html), or a [group trip](use-cases/group-trips.html) where different people pay at different times. When everyone can see the same record, the argument about whose turn it is disappears.",
"It is less useful when a single person is happy to be the keeper. In that case, keep the record alone and share the export at the end. If you are curious how the tracking itself works, start with [turn order](features/turn-order.html), or read about [tracking whose turn it is](features/turn-order.html#what-to-look-for-in-a-round-tracker-app)."]]
],
faq: [
["Do I need an internet connection to log a round?", "No. RoundFair works offline and syncs when you are back online."],
["Does RoundFair store my data on a server?", "No. RoundFair has no servers. Your data stays on your device and in your personal iCloud."],
["Do my friends need to create an account?", "No. Sharing uses iCloud, and RoundFair has no accounts of its own."],
["Is there tracking or analytics?", "No. RoundFair has no analytics, as described on our [privacy page](privacy.html)."],
["What if a friend does not have an iPhone?", "One person can keep the session and share the plain text summary. See [export the summary](features/export-summary.html)."]
]
}
};

const M = module.exports;
M["saved-spots"].sections.push(
["Why the venue matters for a fair night out", [
"It is easy to think of a venue as background, but the place shapes the night. Prices differ from bar to bar, some places run tabs and some do not, and some are cash-only or have a minimum card spend. Knowing that you were at the cocktail bar rather than the local explains why a round felt so much more expensive than the last.",
"A location attached to each round turns a vague memory (we were out on Saturday) into a usable record (two rounds at the Crown, three at the cocktail bar). When the group looks back at where the money and the rounds went, the answer is concrete, and it helps if you are ever trying to work out how a night got away from you.",
"It also supports fairness over time. Groups often rotate who chooses the venue, and the chooser can drift towards places they like. A history of where rounds happened gives you an easy, non-confrontational way to notice that, and to vary the plan."],
],
["How saved spots fit with the rest of RoundFair", [
"Saved spots are the starting point of a session rather than a feature on their own. Once you have picked a place, the rest of the tools follow: [turn order](features/turn-order.html) tells you who buys next, [who drank what](features/who-drank-what.html) shows consumption, and [Split the bill](features/split-the-bill.html) handles shared costs such as the taxi home.",
"If your evening is a dinner rather than a pub stop, pick the restaurant and switch to [restaurant mode](features/restaurant-mode.html), where you can add items and share tip and tax. Because both bars and restaurants are places, your list can hold both, and the session type decides how the money is worked out.",
"Because RoundFair has no accounts and no servers, your list belongs to you. It lives on your device and in your personal iCloud, which means it is there when you open the app in a place with no signal, and it is not something a company can mine for advertising."],
],
["Planning questions for regular groups", [
"Regular groups often ask how to keep things tidy over months. A good rule is to save a place once you have been twice, not once, so the list reflects real habits rather than one-off experiments. If a favourite closes, drop it from your own habits, so you do not scroll past ghosts.",
"Another common question is whether to name places by area or by name. If your group refers to the pub by a nickname, use it. The list is for you, and the name that comes to your mind fastest is the right one.",
"For groups who travel, saving the venues you liked on a trip is optional. Many people prefer to log the rounds for that night only. If you are planning a longer stay, our guide to [splitting costs on a group trip](blog/splitting-costs-on-a-group-trip.html) is a useful companion, and [group trips](use-cases/group-trips.html) shows how RoundFair is used away from home."],
]);
M["saved-spots"].faq.push(["Should I save every place I visit?", "Not necessarily. Save the places you go back to. A short list of real regulars is quicker to use than a long one, and one-off venues can simply be logged for that night."]);

M["restaurant-mode"].sections.push(
["How tip and tax are shared in proportion", [
"The trickiest part of a restaurant bill is not the food, it is the extras. Tip and tax are usually a percentage of the whole bill, so the fair way to share them is in proportion to what each person ordered. Someone whose meal is 20 percent of the food bill should carry 20 percent of the tip and tax.",
"Sharing extras equally instead is a common shortcut and it is unfair in the same way an equal split is. The person with the 14 pasta pays the same tip as the person with the 45 steak and wine. Proportional sharing fixes that automatically, and since the shares always add up to the whole, nothing is left over and nothing is missing.",
"One check is worth doing yourself: read the receipt for a service charge. If the restaurant has already added 12.5 percent, adding a further tip is optional, and many groups add nothing. Our article on [splitting tax and tip on a bill](blog/how-to-split-tax-and-tip-on-a-bill.html) covers the customs, and [how much to tip when splitting](blog/how-much-to-tip-when-splitting-the-bill.html) helps with the amount."],
],
["A second example: a family lunch with a shared platter", [
"Consider six people, two of them children, at a family lunch. The adults order mains at 16, 18, 15 and 17, while the children share one 9 kids meal and one 8 pasta. The table also orders a 30 sharing platter that everyone except the children eats, and juice for the children at 3 each.",
"The platter at 30 is split four ways, so 7.50 each for the adults. The adults' subtotals are 23.50, 25.50, 22.50 and 24.50, or 96 in all. The children's food is 9 + 8 + 6 = 23. The food total is 119.",
"If one adult is paying for the children, that adult covers their own 23.50 plus the children's 23, which is 46.50, and the others pay their own. Add a 10 percent tip in proportion and the paying adult adds 4.65. The point is not the sums, it is that everyone can see where the figures came from, and that nobody is quietly covering a stranger's dessert.",
"That is the situation itemised splitting handles best: a mixed table with different appetites and some people covering others."],
],
["When an even split is still the right call", [
"Restaurant mode is a tool, not a rule. If a table has ordered similar meals, or you are out with people who never count pennies, an equal split is quicker and warmer. It also avoids the slightly awkward feeling of the group scrutinising each other's orders.",
"A good approach is a threshold. If the gap between the biggest and smallest order is a few pounds, split evenly. If the gap is bigger, or if someone has been quiet about a large order, itemise. Having the tool to hand means you choose rather than default, and if someone asks for the item-by-item view you can give it in a minute.",
"For a broader view of the choices, read [bill split methods explained](blog/bill-split-methods-explained.html) and our overview of [splitting a dinner bill with friends](blog/split-dinner-bill-with-friends.html)."],
]);

M["split-the-bill"].sections.push(
["Split the bill for taxis, hotels and trips", [
"Each type of shared cost has its own quirks. A taxi has a fixed price whatever the number of passengers, so more riders means a smaller share each, and the total should include any tip. A hotel is usually paid in advance by one person, so the split is about reimbursing them, and the number of nights each person stayed can matter.",
"Holiday houses are different again. If some people arrive later or leave earlier, an even split treats the stay as one lump. Many groups solve that by splitting the total per night and giving each person their nights. Where that is too fiddly, a simple even split among everyone in the house is normally accepted.",
"For a longer look at the practical side, [splitting costs on a group trip](blog/splitting-costs-on-a-group-trip.html) describes how groups handle deposits, transport and meals, and [group trips](use-cases/group-trips.html) shows where RoundFair fits."],
],
["Splitting evenly vs by item, by percentage or by drinks", [
"An even split among chosen people is one of several methods. It is the right one when the cost is a single lump, like a taxi, and it is the simplest to explain. When people consumed different amounts, an itemised split is fairer, which is what [restaurant mode](features/restaurant-mode.html) does.",
"Percentage splits suit situations where people have agreed to pay different shares, for example a couple paying twice as much as a single friend. Our guide to [splitting a bill by percentage](blog/split-a-bill-by-percentage.html) sets out when that works. Meanwhile [who drank what](features/who-drank-what.html) helps when the disagreement is about drinks.",
"There is no universally correct method, only the one your group agrees is fair. The value of having several options is being able to move from one to another without losing your record."],
],
["Settling up at the end of the night", [
"Once the costs are entered, the last step is settling. The app shows who owes whom, so you know exactly what to pay and to whom. Then people can pay by bank transfer, cash or a payment app.",
"A calm approach helps. Send the summary once, say when you would like payment, and thank people as they do. If you would like a lighter way of thinking about balances at all, [settling up without tracking debts](blog/settle-up-without-tracking-debts.html) suggests letting things even out over time, which works well for close friends who go out regularly.",
"If you are the one owed money and people are slow, [how to remind friends to pay you back](blog/how-to-remind-friends-to-pay-you-back.html) is a good read. The kindest reminders are short, specific and free of accusation."],
]);

M["who-drank-what"].sections.push(
["How the overview supports a fair conversation", [
"Money and friendship are an awkward mix, and most groups avoid the subject until someone is quietly upset. An overview gives the conversation somewhere neutral to start. Instead of you always get cocktails, the observation becomes the numbers show a big difference between the cocktail rounds and the rest.",
"That shift matters. It moves the talk from personality to arithmetic, and arithmetic is easier to accept. A friend who sees that they had six drinks at 11 each, while another had four at 6, is more likely to say fair enough and adjust than to feel accused.",
"It also protects the generous. In many groups there is someone who never wants to make a fuss and quietly overpays. The overview gives that person a way to be treated fairly without having to ask."],
],
["A second example: mixed rounds and a fair compromise", [
"Imagine eight colleagues at a leaving do. Five drank beer at about 6 a time, four drinks each, which is 24 each or 120 in all. Two drank wine at 8 a glass, three glasses each, for 48. One person drank soft drinks costing 12. On top of that there was a round of shots for the whole table at 60, which is 7.50 each. The bar total is 120 + 48 + 12 + 60 = 240.",
"An even split of 240 is 30 each. The soft drink drinker consumed 12 plus their 7.50 share of shots, or 19.50, so an even split has them overpaying by 10.50. The beer drinkers consumed 24 + 7.50, which is 31.50, so they pay slightly less than their share.",
"A sensible compromise is to split the shots equally, since they were a group round, and charge the rest by consumption. That gives each person a figure close to what they actually had. It is the kind of hybrid a group can reach in a couple of minutes when the numbers are on screen.",
"The hybrid works because it separates shared rounds from personal drinks. See [split a bill when some friends do not drink](blog/split-a-bill-when-some-friends-dont-drink.html) for more ways to think about it."],
],
["Turning the overview into a bill", [
"Once the group has agreed how to treat the numbers, you need to convert them into who pays what. One route is to use the per-person costs as they are and add anything shared, like a round for the table. Another is to use them to decide on a percentage split, which our article on [splitting by percentage](blog/split-a-bill-by-percentage.html) describes.",
"If you are dealing with one large total, such as a bar tab paid on a single card, the overview also gives you a sanity check on the tab. If the card total is well above the consumption figures, look for extras such as service charge or a round nobody logged. Our guide to [running a bar tab with friends](blog/how-to-run-a-bar-tab-with-friends.html) covers how to reconcile the two.",
"Finally, remember to [export the summary](features/export-summary.html) so that the agreed figures are written down, and nobody has to rely on memory the following week."],
]);

M["export-summary"].sections.push(
["What a good summary contains and how to read it", [
"A summary works best when it answers three questions quickly: what happened, where does each person stand, and what happens next. The export gives you the first two, rounds and balances, and you add the third in your own words when you paste it.",
"Reading it is straightforward. Look for your own name, check the rounds you bought against your memory, and see whether the balance is in your favour or not. If something looks wrong, reply to the group straight away. Errors caught the same evening are easy to fix, while those raised a week later become disputes.",
"For the keeper, the discipline is to treat the summary as the single source of truth. Once it is posted, later corrections should be made at the source and shared again, rather than patched in chat replies. That keeps one version of the record in circulation."],
],
["Using the export for different kinds of night", [
"After a pub night the export is a quick tally of rounds. After a [bachelor or hen party](use-cases/bachelor-hen-party.html) it is a record of a long weekend, worth posting in stages so people can settle as they go. After a [work do](use-cases/work-drinks.html) it can be a short, neutral note to the team.",
"On a [group trip](use-cases/group-trips.html), the export becomes a running statement. Posting it at the end of each day means nobody faces a huge number at the end, and disagreements are small and early. Our guide to [splitting costs on a group trip](blog/splitting-costs-on-a-group-trip.html) explains why this works better than one big reckoning.",
"For expenses in another currency, agree the exchange rate you will use before you post, and say which one you used. [Splitting expenses in a foreign currency](blog/how-to-split-expenses-in-a-foreign-currency.html) covers the pitfalls."],
],
["Keeping records without keeping accounts", [
"Because the export is text, you can keep it wherever you already keep notes. Some people paste each summary into a dated note, which gives a light history without any extra software. Others simply rely on the chat thread.",
"This suits RoundFair's approach. There is no account, no server and no analytics, so nothing about your nights out is stored anywhere you did not put it. The trade-off is that the record is only as durable as the place you paste it, so if you want to keep it for months, copy it somewhere you will find it.",
"If you would rather not carry debts at all, [settling up without tracking debts](blog/settle-up-without-tracking-debts.html) describes a gentler way to keep things even, and [round buying vs splitting the bill](blog/round-buying-vs-splitting-the-bill.html) explains when each approach fits."],
]);

M["live-sharing"].sections.push(
["Privacy: what stays on your device", [
"Sharing a night out does not need to mean sharing your life with a company. RoundFair does not have accounts, servers or analytics. Sessions live on your device and in your personal iCloud, and when you share, it is through iCloud rather than through us.",
"That has practical effects. There is no password to forget and no email to confirm at closing time. There is no profile that builds up a picture of where you drink. Nobody at RoundFair can read your sessions, because they are never sent to us. For the formal detail, see the [privacy page](privacy.html).",
"It is worth being straightforward about the trade-off. Because everything is on your devices and iCloud, the app is designed for iOS and for casual, night-by-night use, not for a shared company ledger. For many groups that is exactly the right level of weight."],
],
["Why offline matters more than you think", [
"Most apps quietly assume a good connection. Pubs, basements, festivals, ski lodges and trains disprove that assumption every weekend. If a tool fails when the signal drops, people stop trusting it and go back to memory, which is the very thing they installed it to avoid.",
"Offline use is also about speed. An app that logs a round instantly, without waiting for a server, is one you will actually use with a drink in your hand. The sync happens quietly afterwards, so you only think about it when you notice all the phones agree.",
"That is one reason turn tracking works well with it. Logging a round through [turn order](features/turn-order.html) should take a second, whatever the signal, and the shared view catches up when it can."],
],
["Choosing between live sharing and a single keeper", [
"There are two good ways to run a night, and the right one depends on the group. With live sharing, everyone can see the record, anyone can log a round, and mistakes are caught quickly by many eyes. It suits groups who like transparency and who all have iPhones.",
"With a single keeper, one person does the logging and shares the [exported summary](features/export-summary.html) at the end. It suits large or mixed groups, and people who simply do not want to be involved. There is less chance of duplicates, but more depends on one person.",
"Some groups use both: a shared session during the night, and one person exporting the final version for anyone not in the session. Try whichever feels natural, and change if it is not working. For more on how groups organise a night, see [pub rounds with friends](use-cases/pub-rounds.html) and [how to run a bar tab with friends](blog/how-to-run-a-bar-tab-with-friends.html)."],
]);

M["export-summary"].sections[0][1].push("Think of it as the receipt for the evening. A receipt is short, factual and easy to file, and it stops small uncertainties from growing into grudges. That is all the export is meant to do, and doing it well means most groups never need a longer conversation about money at all.");
M["export-summary"].faq.push(["Can I export more than once for the same night?", "Yes. You can share a summary whenever you like, for example at the end of each day of a trip, and share a fresh one if anything changes."]);
M["live-sharing"].sections[0][1].push("The result is a tool that fits the way nights actually go: patchy, noisy and a little chaotic. You do not need to plan around it, sign anybody up or wait for a connection before you can write down who bought what. You just keep going, and the record keeps up.");
M["live-sharing"].faq.push(["Will everyone see the same numbers?", "That is the aim of sharing a session through iCloud. Everyone invited sees the same rounds and balances, and changes made offline appear once the device is back online."]);
M["turn-order"].faq[2] = ["What if I log a round against the wrong person?", "Sort it out straight away, while everyone remembers what happened, and check the order afterwards to make sure it looks right to the whole group."];
