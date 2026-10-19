module.exports = {
  "pub-rounds": {
    sections: [
      ["Why pub rounds with friends go wrong", [
        "Tracking pub rounds with friends sounds trivial until you are ten minutes into the third round and four people are quietly certain it is not their turn. Nobody is lying. Memory just does not survive a noisy room, a few drinks and a conversation about something else entirely.",
        "The usual failure modes are familiar. One generous person buys more than their share because they are always first to the bar. One quiet person slips through the gaps for months. Someone pops out for a phone call and returns to find a round has been bought without them. Each of these is small, but they add up to a mild resentment that spoils a good tradition.",
        "The tradition itself is worth protecting. If you want the background, our guide to [pub round etiquette in the UK](blog/pub-round-etiquette-uk.html) covers the unwritten rules. The practical problem is only that a round is a promise about the future, and promises need a record."
      ]],
      ["How to keep track of whose round it is", [
        "The simplest system is one shared list that everyone trusts. It has to be quick, because nobody will fill in a form at the bar, and it has to be neutral, because the moment the record belongs to one person it becomes that person's opinion.",
        "With RoundFair the routine is short:",
        "- Start a session when the first person arrives and add whoever is there.",
        "- Log a round the moment it is bought, so the count never runs behind.",
        "- Glance at the [turn order](features/turn-order.html) before anyone stands up, and the next buyer is obvious.",
        "That is all. If you want a wider look at the problem of who should go next, see [whose turn to buy the next round](blog/whose-turn-to-buy-the-next-round.html) and [how to decide who buys the next round](blog/how-to-decide-who-buys-the-next-round.html)."
      ]],
      ["A worked example: five friends, one long evening", [
        "Say Ana, Ben, Cat, Dev and Eli meet at seven. Ana arrives first and buys the opening round. Ben buys the second, Cat the third, Dev the fourth and Eli the fifth. By nine everyone has bought once, and the sixth round falls back to Ana.",
        "Now add a wrinkle. Cat leaves after round four. She has bought, so she has paid her way, and the rotation simply carries on among the remaining four. If Cat had left before her turn, she would owe the group a round, and that is the moment a written record earns its keep: she can settle it in money instead of pretending she will make it up next time.",
        "Suppose rounds cost roughly 24 pounds each. Over six rounds that is 144 pounds, or 28.80 per person if there were five drinkers throughout. If Cat drank four rounds and paid for one, the arithmetic is different, and it is far easier to see that in a list than to reconstruct it from memory."
      ]],
      ["Etiquette for late arrivals, early leavers and skipped rounds", [
        "Late arrivals join the rotation at the back. They should not be asked to buy immediately, but a good newcomer offers the next round they are due. Early leavers should try to buy before they go, or pay their share of any round they drank from. Saying so out loud before leaving is much better than hoping nobody notices.",
        "If someone leaves early, remove them from the session and the rest of the group keeps its turn order. There is no need to start again or renegotiate who is next.",
        "Skipped rounds happen. Someone is at the bar when it is their turn, or the group splits into two conversations. Log the round anyway and note who actually bought, so the count reflects reality rather than intention."
      ]],
      ["Rounds versus splitting the bill at the end", [
        "Rounds and bill splitting solve different problems. Rounds are fast and sociable and work well when everyone drinks at a similar pace. Splitting at the end is fairer when tastes and speeds vary a lot. Our comparison of [round buying versus splitting the bill](blog/round-buying-vs-splitting-the-bill.html) goes into when each one wins.",
        "You do not have to pick one for the whole night. Use rounds while the group is together and the drinks are similar, then even out the difference at the end. RoundFair lets you split the bill at the end to settle up in money, so a lopsided round count does not linger."
      ]],
      ["Group chats and spreadsheets versus a shared count", [
        "A group chat is fine for saying where you are meeting, but it is a poor ledger. The record is buried under jokes, nobody wants to scroll back, and the person who types \"my round\" has no way to prove they did it two weeks ago. Spreadsheets are more accurate but nobody opens one at a bar.",
        "A tool made for rounds keeps the count where the round happens. Sessions can be shared live through iCloud, so everyone sees the same numbers as they change, and it works offline for the pubs with terrible reception. There are no accounts to create. That matters at closing time when nobody wants to sign up for anything."
      ]],
      ["Practical tips for a smoother night", [
        "- Agree the rule at the start: strict rotation, or whoever is closest to the bar.",
        "- Log each round straight away while everyone remembers.",
        "- Be honest about your own pace. If you drink slowly, say you would rather skip a round than end up subsidising it.",
        "- For non-drinkers, see [splitting a bill when some friends do not drink](blog/split-a-bill-when-some-friends-dont-drink.html).",
        "- For a longer sitting with people drifting in and out, [running a bar tab with friends](blog/how-to-run-a-bar-tab-with-friends.html) has more ideas.",
        "The point is not to police anyone. It is to make sure generosity gets noticed and nobody has to be the one who counts."
      ]]
    ],
    faq: [
      ["What if two people think it is their turn?", "Check the record. If it is genuinely a tie, the person who has bought fewer rounds in total goes, and the other takes the next. A visible count settles most disputes in seconds."],
      ["Does everyone need the app installed?", "No. One person can keep the record and read out who is next. If you want everyone to see the count live, share the session through iCloud."],
      ["What about rounds of different sizes?", "A round of pints is not a round of cocktails. If one person always orders expensive drinks, use the bill split at the end to even out the difference in money."],
      ["How do we handle a friend who never buys a round?", "Gently, and with the record in hand. Showing a neutral count is much easier than making an accusation, and most people simply had not noticed."],
      ["Can I use it for a one-off night?", "Yes. Start a session, log the rounds, and finish it when you go home. There is nothing to set up beforehand."]
    ]
  },

  "bachelor-hen-party": {
    sections: [
      ["Why bachelor and hen party costs get messy", [
        "Bachelor and hen party cost splitting is one of the most common causes of friction between friends. A weekend has a dozen kinds of spending: accommodation, travel, a group dinner, activities, taxis, rounds, a cake, a bottle of something for the morning after. Different people pay for different things, and the guest of honour is not meant to pay for any of it.",
        "The result is usually one organiser who is out of pocket by hundreds of pounds and a group chat full of vague promises. The fix is not more goodwill. It is a single shared record, kept as things happen, that shows exactly who has paid for what."
      ]],
      ["Deciding the budget and who pays for the guest of honour", [
        "Talk about money before the weekend, not during it. Agree an approximate budget and be honest that some people will find it stretching. A friend who quietly drops out because of cost is a worse outcome than a modest plan everyone can afford.",
        "The convention is that the rest of the group shares the guest of honour's costs. That means the total cost of the weekend is divided among everyone except them. For example, if ten people attend and the shared costs come to 2,700 pounds, and one is the guest of honour, the nine paying guests each owe 300. If you had divided by ten you would have been 270 each and 270 short.",
        "For a deeper look at the arithmetic, read our guide to [bachelor party cost splitting](blog/bachelor-party-cost-splitting.html)."
      ]],
      ["How to run the weekend in RoundFair, step by step", [
        "Set it up on the first evening and it will save you a difficult conversation on Sunday.",
        "- Start a session and add the whole group, with the guest of honour included.",
        "- Log rounds as they are bought, so the [turn order](features/turn-order.html) stays fair.",
        "- For shared costs such as taxis, dinners and accommodation, use the [bill split](features/split-the-bill.html) and choose the people who share each cost, leaving the guest of honour out.",
        "- At the end, export a summary and post it in the group chat.",
        "Because you choose the people for each cost, someone who skipped the Saturday dinner does not pay for it, and someone who arrived on Saturday does not share Friday's taxi."
      ]],
      ["A worked example: a two-night hen weekend", [
        "Eight friends go away and one is the bride-to-be. The seven others share her costs. Friday's takeaway comes to 84 pounds, paid by Jo: 84 divided by eight would be wrong, because the bride is not paying, so the seven share it at 12 each. Saturday's dinner is 320 pounds for all eight, paid by Priya: seven paying guests owe 320 divided by seven, or 45.71 each.",
        "Add a 60 pound taxi that only five people took, split among the four of those who are paying plus the bride's share covered by them, and you can see how quickly this becomes unmanageable in a group chat. Logged as it happens, each of these takes a few seconds, and the totals are ready at the end."
      ]],
      ["Late arrivals, early leavers and people who skip things", [
        "Not everyone will do everything. Someone will join on Saturday, someone will skip the expensive activity, someone will leave before the last dinner. The fair rule is simple: you pay only for the costs you shared. That is exactly what choosing people per cost gives you.",
        "The awkward one is a shared cost booked in advance, such as a house. Agree in advance whether people who arrive late still pay a full share. Most groups say yes, because the house cost the same either way, but the important thing is that it is agreed rather than assumed.",
        "For drinks, remember that non-drinkers should not be subsidising rounds. Our advice on [splitting a bill when some friends do not drink](blog/split-a-bill-when-some-friends-dont-drink.html) applies just as well here."
      ]],
      ["Settling up after the weekend", [
        "Do it within a few days. Every day after the weekend makes chasing money slightly more awkward. Export the summary as plain text from the app and post it in the chat, so everyone sees the same numbers at the same time. See the [export summary](features/export-summary.html) feature for how it looks.",
        "If you are the organiser and are owed the most, it helps to let the group settle with you in whatever way is easiest. For gentle wording, see [how to remind friends to pay you back](blog/how-to-remind-friends-to-pay-you-back.html), and if you use payment apps, [how to split and charge friends on Venmo](blog/how-to-split-and-charge-friends-on-venmo.html)."
      ]],
      ["Group chat, spreadsheet or app?", [
        "A spreadsheet works if one person is prepared to maintain it and everyone trusts them. In practice, the organiser is already busy and the spreadsheet is updated on Monday from memory. A group chat has no structure at all.",
        "A shared session records costs as they occur, works offline when you are abroad or in a rural house with no signal, and needs no accounts. You are not signing up an entire stag party to a service."
      ]]
    ],
    faq: [
      ["Do we need to include the guest of honour in the session?", "Yes, add them so the group is complete and rounds are tracked correctly, then simply leave them out of the people who share each cost."],
      ["What about a surprise party?", "Keep the session on the organisers' phones only. The export is plain text, so the guest of honour sees nothing until you choose to share it."],
      ["Can we track deposits paid in advance?", "Log them as a cost at the point they are paid and choose who shares it, just like any other expense."],
      ["How do we handle people who cancel late?", "Agree the rule before booking. If a non-refundable cost was already paid, most groups split it among those still going, and the record makes the resulting share clear."],
      ["Is there a limit on the number of people?", "Weekend groups of ten to fifteen are common. Add everyone to the session and choose the relevant people for each cost."]
    ]
  },

  "group-trips": {
    sections: [
      ["Why splitting costs on a group trip is harder than it looks", [
        "When you split costs on a group trip, the difficulty is not the maths, it is the volume and the variety. Someone books the flights, someone else the apartment, a third person pays for the hire car deposit, and every day brings taxis, coffees, tickets and dinners paid by whoever had their card out.",
        "Left alone, these payments end up very uneven. By the end of the week two people are hundreds out of pocket while others have paid almost nothing. If you have ever come home and spent an evening reconstructing the holiday from bank statements, you know the problem."
      ]],
      ["Choose your approach before you leave", [
        "There are three broad ways to run a trip. You can pool money in advance into a shared kitty, you can let people pay as they go and settle at the end, or you can mix both. Our detailed guide to [splitting costs on a group trip](blog/splitting-costs-on-a-group-trip.html) compares them.",
        "For most friend groups, pay as you go with a running record is the least stressful. Nobody has to hand over money upfront, and the record makes the final settlement a single conversation."
      ]],
      ["How to record trip costs with RoundFair", [
        "Start a session for the trip and add everyone. Then:",
        "- Log each shared cost when it happens and note who paid.",
        "- Choose only the people who shared it, so a taxi taken by three is split among three.",
        "- Use the [bill split](features/split-the-bill.html) for anything with different shares, such as a dinner where some ordered more.",
        "- Track evening rounds with the [turn order](features/turn-order.html) if you still like that tradition.",
        "Because sessions can be [shared live through iCloud](features/live-sharing.html), everyone can see the same list, and because the app works offline you can log costs on a mountain or in a taxi with no signal."
      ]],
      ["A worked example: six friends, a week in the mountains", [
        "Six friends rent a chalet for 1,260 pounds, paid by Sam. Everyone shares that: 210 each. Sam also pays 96 for ski passes for himself and two others: the three of them owe 32 each. Mia pays 180 for a group supermarket shop shared by all six: 30 each. Luca pays 45 for a taxi taken by four: 11.25 each.",
        "After a week of this, the raw list is dozens of lines. What matters is the balance per person: how much they have paid in total against how much they owe. Someone who paid 400 and owes 320 is owed 80. Someone who paid 0 and owes 320 owes 320. The record does that netting so that the end of the trip is a short list of payments rather than a full replay."
      ]],
      ["Foreign currencies and travelling abroad", [
        "Trips abroad add a wrinkle: the same costs appear in different currencies, and card rates differ from cash rates. Keep it simple by agreeing a single currency for the group and recording each cost in that. Our guide to [splitting expenses in a foreign currency](blog/how-to-split-expenses-in-a-foreign-currency.html) explains how to pick a rate fairly.",
        "Do not aim for perfection. A difference of a few pence in the conversion is not worth a debate. Agree the method once and stick to it."
      ]],
      ["Etiquette: who pays when things are uneven", [
        "Not everyone on a trip has the same budget or the same appetite. One person wants the fancy restaurant, another wants a picnic. The fairest rule is that people only share costs they chose to take part in. A record with per-cost participants supports that directly.",
        "Be careful with shared costs you cannot avoid, like accommodation. Agree up front whether the room split is equal or based on the size of each room. Do this before booking, not after."
      ]],
      ["Settling up at the end", [
        "Do it as the trip ends, while everyone is still together, or within a couple of days. Export the summary as plain text and post it in the group chat. The [export summary](features/export-summary.html) is designed for this.",
        "Once you have the balances, you can reduce the number of payments. Read [settle up without tracking debts](blog/settle-up-without-tracking-debts.html) for a simple method, and see [how to remind friends to pay you back](blog/how-to-remind-friends-to-pay-you-back.html) if someone drags their feet."
      ]]
    ],
    faq: [
      ["Should we use a shared kitty instead?", "A kitty works well for small predictable costs. For larger or uneven ones, a running record is more flexible. Many groups use both."],
      ["What if someone forgets to log a cost?", "Log it later with a note. The total is what matters, and any group member can add it once they remember."],
      ["Can I use it for a trip where we split into smaller groups?", "Yes. Choose only the people involved in each cost, so sub-groups pay for their own activities."],
      ["Does everyone need the same phone?", "One person can keep the record and share the summary in any messaging app, so nobody else needs to install anything."],
      ["Is my trip data private?", "Yes. RoundFair has no accounts, no analytics and no servers. Data stays on your device and in your personal iCloud."]
    ]
  },

  "restaurant-dinners": {
    sections: [
      ["The problem with splitting a restaurant bill", [
        "Everyone has been at the end of a dinner when the bill arrives and the table goes quiet. To split a restaurant dinner bill fairly, you need to balance speed against fairness. One person had a salad and water, another had three courses and a cocktail, and somebody ordered the bottle of wine everyone shared.",
        "An even split is quick but can feel unfair to the lightest eater. An itemised split is fair but slow, especially if you are doing it by phone calculator while the waiter hovers. The goal is to get to something fair in a couple of minutes."
      ]],
      ["Even split, item by item, or a mix?", [
        "The right method depends on the table. If everyone ordered similar amounts, even is fine. If the orders differ by more than a third or so, itemise. Our guide to [bill split methods explained](blog/bill-split-methods-explained.html) walks through the options, and [splitting a dinner bill with friends](blog/split-dinner-bill-with-friends.html) covers the social side.",
        "A common hybrid works well: split shared items such as starters and bottles evenly, and itemise the individual mains and drinks. You get most of the fairness in a fraction of the effort."
      ]],
      ["How to split a dinner in RoundFair", [
        "- Start a restaurant session and add the table. See [restaurant mode](features/restaurant-mode.html).",
        "- Enter the items and who had them using the [bill split](features/split-the-bill.html).",
        "- Add the tip and tax. The tip is spread in proportion to each person's items.",
        "- Read out each person's total, and check that they add up to the bill.",
        "For a longer explanation of the item-level method see [how to split a receipt item by item](blog/how-to-split-a-receipt-item-by-item.html)."
      ]],
      ["A worked example: a table of five", [
        "Five friends eat out. The bill is 190 pounds for food and drink before tip. Two shared starters cost 18 in total, so 3.60 each. Alice had a main at 22 and a soft drink at 4. Ben had a main at 24 and two beers at 12. Chloe had a main at 20 and a glass of wine at 8. Dan had a main at 26 and a cocktail at 11. Eva had a main at 21 and water.",
        "Even split would be 38 each. Itemised, Eva pays much less than Dan, and if you add a 10 per cent tip in proportion to their items, it stays fair. Alice pays roughly 3.60 plus 22 plus 4 plus tip. The totals sum to the bill, which is the check that matters."
      ]],
      ["Tip, tax and service charge", [
        "Tip is where itemised splits often break down. If you tip on the total and split it evenly, the person who ordered the least pays more than their share. Spreading it in proportion to each person's items is the fairer approach. Our guides to [splitting tax and tip on a bill](blog/how-to-split-tax-and-tip-on-a-bill.html) and [how much to tip when splitting the bill](blog/how-much-to-tip-when-splitting-the-bill.html) explain the reasoning.",
        "Check whether a service charge is already on the bill before adding a tip. Adding both is a common accident."
      ]],
      ["Etiquette: non-drinkers, birthdays and shared bottles", [
        "Non-drinkers should not fund the wine. If one person has no alcohol, itemise the drinks and split the rest of the meal evenly. It removes any awkwardness and everyone pays for what they had.",
        "Birthdays are traditionally covered by the group, so add the birthday person to the session and leave them out of the people sharing the meal. If it is a large group, agree in advance whether the birthday person's costs are split among all or just those who are close friends.",
        "For shared bottles, treat them as a shared item among those who drank, not among the whole table."
      ]],
      ["Calculators versus a tool built for the job", [
        "A phone calculator is fine for two people. For six it is slow, easy to mistype, and forces someone to shout numbers across the table. A tool that keeps items and people together lets you correct a mistake without starting again. You can also share the finished totals with the group as plain text if someone is settling later."
      ]]
    ],
    faq: [
      ["Can we still split evenly if we prefer?", "Yes. The standard split divides the bill equally. Use it when orders are similar."],
      ["What if the restaurant will not split the bill?", "That is common. One person pays and the rest settle with them. Logging the items makes the follow-up payments clear."],
      ["How do I handle a service charge already on the bill?", "Enter it as part of the total, and skip adding a further tip unless you want to leave more."],
      ["Can I split by percentage instead?", "For groups where one person earns more or is treating others, see [split a bill by percentage](blog/split-a-bill-by-percentage.html) for how that works."],
      ["Do I need the app to be online at the restaurant?", "No. RoundFair works offline, so poor reception is not a problem."]
    ]
  },

  "work-drinks": {
    sections: [
      ["Why work drinks are harder than drinks with friends", [
        "Team nights out and work drinks come with an extra layer of social pressure. There is a hierarchy, some people are new, others are senior, and money conversations are more awkward than with close friends. Nobody wants to be seen counting pennies in front of their manager, and equally nobody wants to be the person who quietly never buys.",
        "This is exactly where a neutral record helps. When the count lives in a shared place and not in one person's head, nobody has to be the person who asks."
      ]],
      ["Set expectations for team drinks", [
        "Different teams have different cultures. Some companies pay for a first round or a fixed budget, others expect everyone to cover their own. Find out before the night so nobody guesses. Our guide to [round buying etiquette around the world](blog/round-buying-etiquette-around-the-world.html) shows how much the norms vary, which is worth remembering in an international team.",
        "If a manager is paying, say so clearly at the start. If it is rounds among colleagues, agree whether managers join the rotation. In most teams they do, and it is a small gesture that goes a long way."
      ]],
      ["How to run a team night with RoundFair", [
        "- Add the team to a session at the start of the evening.",
        "- Log rounds as they are bought, and use the [turn order](features/turn-order.html) to see who is next.",
        "- If someone is expensing part of it, use the [export summary](features/export-summary.html) to produce a plain text overview.",
        "- Split the final bill for anyone who prefers to settle in money.",
        "It is private by design: no accounts, no analytics and no servers, so your team's data stays with you. Nobody has to install anything either. One person can keep the record and share the summary."
      ]],
      ["A worked example: eight colleagues after work", [
        "Eight colleagues go for drinks on a Thursday. Five stay for three rounds, three stay for one. Each round of eight costs about 48 pounds and the smaller ones cost about 30. The first round of eight is bought by Sam, a second round of five by Priya and a third by Tom.",
        "The three who left after one round drank a single drink each, so it would be unfair to ask them to fund the rest. Recording who was there for each round keeps the count sensible. If Sam bought the first round for eight, the leavers are effectively covered and the remaining five owe each other for the second and third."
      ]],
      ["Etiquette: seniority, new starters and people who do not drink", [
        "New starters should not be expected to buy rounds in their first week, and most people are happy to cover them. Senior colleagues who buy a round are seen as generous, but a rotation that quietly always lands on the junior person is the opposite.",
        "Not everyone drinks, for health, religion or preference. They should never feel pressured. See [splitting a bill when some friends do not drink](blog/split-a-bill-when-some-friends-dont-drink.html) for practical ways to keep it fair."
      ]],
      ["Expenses and receipts", [
        "If your company reimburses part of a night out, you will normally need a receipt and sometimes a list of attendees. A plain text overview of rounds and balances is a useful supporting note, but check your company's policy since some require the original itemised receipt.",
        "For dinners after work, our guide to [splitting a dinner bill with friends](blog/split-dinner-bill-with-friends.html) and the [bill split](features/split-the-bill.html) help you divide the meal item by item."
      ]],
      ["Why not just use a group chat?", [
        "A work group chat is full of people you may not want to discuss money with. A separate shared record keeps drinks tallies out of the channel and avoids awkward public reminders. It also does not require anyone to hand over a personal account. See our take on [round buying apps](features/turn-order.html#what-to-look-for-in-a-round-tracker-app) for more."
      ]]
    ],
    faq: [
      ["Do managers have to join the rounds?", "That is a team decision. Many teams include them, because it treats everyone equally. Others agree that the company covers the first round."],
      ["Can I use it for a leaving do?", "Yes. Add the group, cover the guest of honour by leaving them out of the shared costs, and share the summary afterwards."],
      ["What if someone wants to pay by card only?", "Log the round and split the bill at the end. They can settle up in whichever way they prefer."],
      ["Will my colleagues see anything private?", "Only what you share. RoundFair has no accounts or servers, and data stays on your device and in your personal iCloud."],
      ["Is it appropriate to track rounds at work at all?", "A light touch works best. Keeping a quiet, neutral tally is kinder than letting resentment build, and it does not need to be announced."]
    ]
  }
};

// Extra depth sections appended per slug.
const extra = {
  "pub-rounds": [
    ["Big groups, small groups and the two-person round", [
      "Group size changes how rounds feel. With two or three people, rounds barely need tracking because the rotation is obvious and evens out quickly. With four to six, a round every twenty minutes is easy to lose track of. Past eight, most groups quietly split into sub-rounds, where a few people near the bar buy for the whole table and everyone else assumes it will balance out. It rarely does.",
      "For large groups, agree one rule for the whole table rather than several informal ones. Either one strict rotation through everyone, or two or three smaller circles that each keep their own count. Keeping a single shared session for the night, with everyone added, makes the first option straightforward because the next buyer is never in doubt.",
      "A useful habit for any size: the buyer announces the round as they stand up, and someone else logs it. That way the record does not depend on the person carrying six glasses."
    ]],
    ["Handling the friend who is always at the bar first", [
      "Every group has one. They mean well, they are quick on their feet, and they end up buying more than their share because nobody else moves. The kind thing to do is not to let it continue. When the count shows one person is several rounds ahead, others should pick up the next turns, or at least offer the difference back in cash at the end of the night.",
      "This is another reason a visible record helps. Generosity should be noticed, not taken for granted, and a number on a screen makes it easy to say thank you and take the next one."
    ]]
  ],
  "bachelor-hen-party": [
    ["Planning ahead: what to agree before anyone pays", [
      "Most disputes on a party weekend are not about the money itself but about surprise. A few decisions made early prevent nearly all of them. Decide who is the organiser and who is the backup. Decide the approximate per-head budget and whether it includes travel. Decide what the group will cover for the guest of honour and what they will pay for themselves, such as their own flights if they are travelling from elsewhere.",
      "Send the plan in writing before people commit. It should say what is included, what is optional and roughly when payments are due. That is not being formal for the sake of it. It gives a nervous friend a chance to say the cost is too high before they have booked anything.",
      "Finally, agree how you will settle. If the organiser has already paid the deposit for a villa, everyone's share is due to them, and it is far easier to send one summary than to chase eight separate small payments over several weeks."
    ]],
    ["Keeping the drinks fair without policing anyone", [
      "Drinks are the most volatile cost on a party weekend. Rounds work well early in the evening when everyone is together and drinking at a similar pace. Later on, groups fragment and rounds become uneven. Someone is still on their first pint while another is on a fourth cocktail.",
      "A sensible pattern is to use the turn order for the first few rounds, then move to splitting the bar bill by who drank what if the night stretches on. Our advice on [how to split a bar bill fairly](blog/how-to-split-a-bar-bill-fairly.html) sets this out. Do not be embarrassed about switching methods. Most groups are relieved when someone suggests it.",
      "Remember that the guest of honour typically does not buy rounds, but they should be in the rotation as a matter of courtesy, with others buying on their behalf."
    ]]
  ],
  "group-trips": [
    ["Who should keep the record, and how often to update it", [
      "On a trip, one person often becomes the unofficial treasurer. That is fine, provided the rest of the group can see what is being recorded. A record that only one person can see invites doubt, even if nobody says so out loud.",
      "The best habit is to log costs the same day they happen, ideally at the table or in the taxi. A cost logged three days later is one you have to reconstruct, and the details are always a little different from what you remember. If someone forgets, add the cost later with a note rather than dropping it.",
      "Make it a small ritual. At the end of each evening, one person spends two minutes checking that the day's costs are in. It is far less painful than a two-hour audit on the flight home."
    ]],
    ["Rounding, small costs and knowing when to let it go", [
      "Perfection is not the goal. If a coffee costs 2.80 and three people shared it, nobody needs to argue over 93 pence. Agree a threshold, such as costs under five pounds not needing to be logged unless someone wants them to, and stick to it. Small costs tend to even out over a week anyway.",
      "It is the large items that need care: accommodation, transport, activities and big dinners. Get those right and the rest is noise. If you are still a few pounds off at the end, round in the group's favour and move on. A trip is meant to leave you with good memories, not a small ledger of grudges."
    ]]
  ],
  "restaurant-dinners": [
    ["When the whole table is on different budgets", [
      "Not every friend at a dinner has the same money to spend, and the awkward part is that nobody wants to say so. A student, a new parent and a senior manager may all be at the same table. An even split quietly punishes the person with the least, who often orders the least too.",
      "Itemising removes the problem gracefully. Nobody needs to explain why they only had a starter and a glass of water. It also allows for generous gestures. If one person wants to treat the table to a bottle, it is easy to record it separately and keep everything else fair.",
      "If the group has a big income gap and one person wants to contribute more, that is a personal decision, not something an app should decide. A simple percentage split is an option for those cases, as described in [splitting a bill by percentage](blog/split-a-bill-by-percentage.html)."
    ]],
    ["Handling mistakes, late orders and things that arrive after the bill", [
      "Bills get complicated when people order dessert after the bill was first requested, or when the kitchen forgets a dish and it is taken off. The easiest way to deal with this is to wait until the last order before you enter anything, or to enter items as they come and edit if needed.",
      "If a mistake is spotted on the bill itself, raise it with the restaurant before paying, not afterwards. Splitting a wrong total accurately does not make it right. Once the total is agreed, enter the items and check that the totals from your split match the amount on the receipt. If they are a few pence off, someone rounds up and the table moves on.",
      "Finally, if one person pays the whole bill on their card, give them the totals immediately while everyone is still at the table. Waiting until the next day is when things get forgotten."
    ]]
  ],
  "work-drinks": [
    ["Remote and hybrid teams meeting in person", [
      "Team nights out have changed. Many teams now meet in person only a few times a year, so a night out carries more weight and the group is often made up of people who barely know each other. That makes clear, low-drama money handling even more valuable, because you cannot rely on years of familiarity to smooth things over.",
      "Agree the plan by message beforehand: where you are going, whether the company is covering anything, and how long people are staying. Then keep a light record on the night. Because RoundFair works offline and needs no accounts, it is easy to use in a venue with poor reception and with colleagues who do not share a phone platform."
    ]],
    ["Inclusive team nights: keeping everyone comfortable", [
      "A good team night is one that everybody can enjoy, including people who do not drink, have to leave early for childcare, or are watching their budget. Avoid making the round the centre of the evening. Offer non-alcoholic options as a matter of course and never comment on what someone is drinking.",
      "For budgets, a fair rule is that nobody should feel obliged to buy a round of expensive drinks. Agree a cap or an alternative, such as splitting the bill at the end by what each person actually had. That protects the junior colleague on a tight salary and stops the round tradition from becoming a hidden cost of belonging to the team.",
      "Finally, finish on time. The people who stay latest tend to spend the most, and the tally should reflect that rather than spreading the cost over those who went home."
    ]]
  ]
};
for (const k in extra) module.exports[k].sections.push(...extra[k]);

const extra2 = {
  "bachelor-hen-party": [
    ["Small touches that keep the peace", [
      "Thank the organiser publicly, and offer to take a job off them. Organising is unpaid work, and the person doing it is often carrying the stress of the whole weekend. Offering to keep the shared record on the night is a simple way to help."
    ]]
  ],
  "group-trips": [
    ["Trips with couples, families and singles", [
      "Mixed groups create the trickiest splits. A couple sharing a room is one unit for accommodation but two people at dinner. A family with children eats less per head but may use more of the shared space. Singles often feel they subsidise everyone else.",
      "The cleanest approach is to decide per cost, not per person. Accommodation may be split by room, groceries by head, and activities only among those who joined in. Choosing who shares each cost lets you express all of that without a complicated rule the whole group has to remember.",
      "Say the rule out loud early in the trip. It is much easier to agree that rooms are split by room before the first payment than to renegotiate at the airport on the way home."
    ]],
    ["What to do if someone pays for something on behalf of the group", [
      "Sometimes one person puts a big cost on their card, such as a rental car or a group activity. Record it with them as the payer and choose everyone who shares it. The balance then reflects that they are owed money, so there is no need to pay them back on the spot in cash. Everything is settled together at the end, which avoids a dozen small transfers during the trip."
    ]]
  ],
  "restaurant-dinners": [
    ["A quick routine for the end of the meal", [
      "Speed matters, because the longer the bill sits on the table the more awkward it becomes. A routine helps. Ask for the bill, and while it is coming, one person opens the app and adds everyone at the table. When the bill lands, call out items in the order they appear on the receipt and ask who had them.",
      "Read out the totals one by one and let each person confirm theirs. Most people simply nod. Then whoever pays the bill collects the rest. In practice the whole thing takes a few minutes, which is often quicker than the awkward silence of trying to work it out by eye.",
      "For big celebrations such as a birthday or a leaving meal, do this before the dessert menu comes round, so nobody feels rushed into ordering just because the bill is on the way."
    ]]
  ],
  "work-drinks": [
    ["Recurring team nights and building a habit", [
      "If your team goes out every month or every Friday, a repeating pattern helps. Start a fresh session each time so old balances do not carry over into a new evening. Keep the rules the same: rotation among those present, managers included, and a bill split at the end if the group prefers.",
      "The gain over time is trust. When people can see the count is honest, nobody feels they are being taken advantage of, and quieter colleagues are more likely to come along. It becomes a small part of team culture rather than a source of grumbling.",
      "If a team member is often absent, do not tally their absence against them. The point is fairness on the nights people are there, not a ledger of attendance."
    ]],
    ["Leaving dos, promotions and celebrations", [
      "When the group is celebrating someone, the guest of honour normally does not pay. Add them to the session but leave them out of the people who share the bill, so everyone else covers the difference. The maths is simple, but it is much easier when the tool handles it rather than someone dividing by seven on a napkin.",
      "If the company is contributing a set amount, say so up front and note it separately. That way the remaining costs are clearly the team's own, and the export shows exactly what was covered by whom."
    ]]
  ]
};
for (const k in extra2) module.exports[k].sections.push(...extra2[k]);

const extra3 = {
  "bachelor-hen-party": [["Before you head home", [
    "Do a last check of the record on the final morning, while everyone is still in one place. Confirm that the taxi to the airport, the last breakfast and any breakages or top-ups are in. Ten minutes at the kitchen table beats a fortnight of messages afterwards."]]],
  "group-trips": [["Before you fly home", [
    "Check the record once more on the last day. Add the airport transfer, the final lunch and anything paid in cash that nobody logged. Then agree a date for payments, ideally within a week, and post the summary so the deadline is visible to everyone. A date turns a vague intention into an action, and people generally respond well to a clear, friendly request."]]],
  "restaurant-dinners": [["Splitting at home: takeaways and dinner parties", [
    "The same approach works away from restaurants. For a takeaway ordered together, enter each person's dishes and share the delivery fee evenly, since everyone benefits from it. For a dinner party, the host can keep a simple record of groceries and split them among the guests who ate, leaving out anyone who only came for dessert. The principle is identical: pay for what you had, share what you all used, and check that the total matches the real bill.",
    "It is also worth remembering that not every dinner needs a precise split. Among close friends who eat out often, one person paying this time and another next time works well, and a light record makes sure it stays balanced."]]],
  "work-drinks": [["Quick answers for the awkward moments", [
    "If someone asks whose round it is and nobody knows, check the record rather than guessing. If someone objects to the count, show it without comment. If a colleague is leaving early, tell the group before they go so their share is settled and nobody is left to chase them on Monday morning.",
    "Most of all, keep it light. A shared tally exists to prevent awkwardness, not to create it, and the best team nights are the ones where nobody notices the money at all."]]]
};
for (const k in extra3) module.exports[k].sections.push(...extra3[k]);
