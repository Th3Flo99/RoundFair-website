// Free tools (tools/*.html) and help pages (help/*.html), built by build-extra.js.
// body: raw HTML (links relative to the site root are prefixed for the page depth by build-extra.js: write them as root-relative "@/path").
// Tipping customs are general guidance, deliberately given as ranges; they are not legal or official rates.
const TIPS = [
  ["us", "United States", 18, "Tipping is expected at restaurants; 15 to 20 percent of the pre-tax bill is common."],
  ["ca", "Canada", 15, "Tipping is expected; 15 to 20 percent is common."],
  ["gb", "United Kingdom", 10, "10 to 12.5 percent is usual, and a service charge is often already on the bill. Check before tipping twice."],
  ["ie", "Ireland", 10, "Around 10 percent at restaurants is common; check for a service charge on the bill."],
  ["be", "Belgium", 5, "Service is normally included in the price. Rounding up or leaving 5 to 10 percent for good service is a kind extra, not an obligation."],
  ["nl", "Netherlands", 5, "Service is included. Rounding up or around 5 to 10 percent for good service is common but optional."],
  ["fr", "France", 5, "Service is included by law (service compris). Leaving small change or rounding up is a courtesy."],
  ["de", "Germany", 10, "Rounding up or about 5 to 10 percent is customary; you usually tell the server the total you want to pay."],
  ["es", "Spain", 5, "Tipping is modest: rounding up or up to about 10 percent for good restaurant service."],
  ["it", "Italy", 0, "Tipping is not expected; a cover charge (coperto) or service charge may be on the bill. Rounding up is a courtesy."],
  ["pt", "Portugal", 5, "Optional: rounding up or about 5 to 10 percent for good service."],
  ["au", "Australia", 0, "Tipping is not expected; around 10 percent for exceptional service is a kind extra."],
  ["jp", "Japan", 0, "Tipping is not expected and can cause confusion."],
  ["other", "Somewhere else / custom", 10, "Customs vary. Check whether service is included before adding a tip."],
];

const tipOptions = TIPS.map(([v, n, p, note]) => `<option value="${v}" data-tip="${p}" data-note="${note.replace(/"/g, "&quot;")}"${v === "be" ? " selected" : ""}>${n}</option>`).join("");
const tipTable = `<div class="tbl"><table><thead><tr><th>Country</th><th>Starting point in the calculator</th><th>Custom</th></tr></thead><tbody>${TIPS.filter((t) => t[0] !== "other").map(([, n, p, note]) => `<tr><td>${n}</td><td>${p}%</td><td>${note}</td></tr>`).join("")}</tbody></table></div>`;

const tools = [
  { slug: "who-pays-wheel", name: "Who pays? Spin the wheel",
    title: "Who Pays? Spin the Wheel to Pick Who Buys the Round",
    desc: "Free online spin wheel to decide who pays or who buys the next round. Enter your friends' names, spin, and let chance decide. Works on any phone.",
    lead: "Nobody wants to decide who goes to the bar next? Type the names, spin the wheel and let chance pick. It runs in your browser and nothing is saved.",
    body: `<form class="calc" id="tool-wheel">
      <label>Names, one per line <textarea name="names" rows="5">Alex
Jordan
Sam
Taylor</textarea></label>
      <div class="wheel" aria-hidden="true"><div class="wheel-disc"></div></div>
      <button class="calc-go" type="submit">Spin the wheel</button>
      <p class="calc-out" aria-live="polite">Press spin to pick who pays.</p>
    </form>
    <h2 id="is-it-fair">Is a spin wheel fair?</h2>
    <p>Every name has the same chance on every spin: the wheel uses your browser's cryptographic random number generator. That is fair for a single decision, but over a whole night chance can pick the same person twice while someone else never buys. A spin is best as a tie-breaker, not as the whole system.</p>
    <h2 id="fairer-over-a-night">Fairer over a whole night</h2>
    <p>For a night of rounds, a rotation based on who is furthest behind is fairer than pure chance. Our guide to <a href="@/blog/how-to-decide-who-buys-the-next-round.html">six fair ways to decide who buys the next round</a> compares rotation, the spin wheel and other methods. The RoundFair app combines both: it tracks <a href="@/features/turn-order.html">whose turn it is</a> and who is behind, and has a spin wheel built in for when nobody wants to decide.</p>`,
    faq: [["How do I decide who pays for the next round?", "The fairest way over a night is a rotation where the person who is furthest behind buys next. For a single decision, a random pick such as this wheel is quick and neutral."], ["Is the result random?", "Yes. Each name has an equal chance on each spin. Nothing is stored or sent anywhere."]] },
  { slug: "round-cost-calculator", name: "Round cost calculator",
    title: "Round Cost Calculator: What a Round of Drinks Costs",
    desc: "Free round cost calculator: enter the group size, the price of a drink and the number of rounds to see what a round costs and whether everyone buys the same.",
    lead: "Planning a night of rounds? Work out what one round costs your group, what the whole night adds up to, and whether everyone ends up buying the same number of rounds.",
    body: `<form class="calc" id="tool-rounds" onsubmit="return false">
      <label>People in the round <input name="people" type="number" min="1" step="1" inputmode="numeric" value="5" /></label>
      <label>Average price of one drink <input name="price" type="number" min="0" step="0.1" inputmode="decimal" value="4.50" /></label>
      <label>Number of rounds <input name="rounds" type="number" min="0" step="1" inputmode="numeric" value="5" /></label>
      <div class="calc-out" aria-live="polite"></div>
    </form>
    <h2 id="why-rounds-drift">Why rounds drift out of balance</h2>
    <p>Rounds are only even when the number of rounds is a multiple of the number of people. Five friends and seven rounds means two people buy twice. Bigger groups make the gap bigger: in a group of eight, buying a round costs eight drinks, so stopping early leaves the last buyers well ahead of the rest.</p>
    <p><strong>Example:</strong> five friends drinking €4.50 beers. One round costs €22.50. If the night stops after seven rounds, two people have spent €45 and three have spent €22.50, a €22.50 gap that someone usually forgets.</p>
    <h2 id="keeping-it-fair">Keeping it fair</h2>
    <ul>
      <li>Agree to stop when everyone has bought the same number of rounds, or settle the difference in money at the end.</li>
      <li>In a big group, split into smaller rounds of three or four people.</li>
      <li>If some people drink less or not at all, a <a href="@/blog/split-a-bill-when-some-friends-dont-drink.html">split by what each person had</a> is fairer than rounds.</li>
    </ul>
    <p>RoundFair does this bookkeeping during the night: it records who paid and who joined each round, shows who is behind, and works out who should pay whom. See <a href="@/features/turn-order.html">turn order</a> and the <a href="@/calculators.html">bill split calculator</a> for one-off bills.</p>`,
    faq: [["How much does a round of drinks cost?", "Multiply the number of people by the average price of a drink. Five people with €4.50 drinks means a €22.50 round."], ["How do you keep rounds fair in a big group?", "Stop when everyone has bought the same number of rounds, split into smaller groups, or settle the difference at the end of the night."]] },
  { slug: "tip-calculator-by-country", name: "Tip calculator by country",
    title: "Tip Calculator by Country: Split the Bill and the Tip",
    desc: "Free tip calculator with typical tipping customs by country, from Belgium to the US. Pick a country, adjust the tip and split the total between friends.",
    lead: "How much to tip depends on where you are. Pick a country to start from its usual custom, adjust the percentage if you like, and split the total between the group.",
    body: `<form class="calc" id="tool-tip" onsubmit="return false">
      <label>Country <select name="country">${tipOptions}</select></label>
      <p class="tip-note"></p>
      <label>Bill <input name="bill" type="number" min="0" step="0.01" inputmode="decimal" value="80" /></label>
      <label>Tip (%) <input name="tip" type="number" min="0" step="1" inputmode="decimal" value="5" /></label>
      <label>People <input name="people" type="number" min="1" step="1" inputmode="numeric" value="4" /></label>
      <div class="calc-out" aria-live="polite"></div>
    </form>
    <p><em>These are general customs to start from, not rules. Service charges, local habits and how good the service was all matter, so check the bill first.</em></p>
    <h2 id="tipping-customs">Typical tipping customs</h2>
    ${tipTable}
    <h2 id="tip-then-split">Tip first, then split</h2>
    <p>Add the tip to the bill, then divide. If people ordered very different amounts, share the tip in proportion to what each person had instead of evenly; our guide to <a href="@/blog/how-to-split-tax-and-tip-on-a-bill.html">splitting tax and tip</a> shows the formula, and <a href="@/blog/how-much-to-tip-when-splitting-the-bill.html">how much to tip when splitting the bill</a> covers the etiquette. For itemised bills, use the <a href="@/tools/receipt-splitter.html">receipt splitter</a>.</p>`,
    faq: [["Do you tip in Belgium?", "Service is normally included in Belgian restaurant prices, so a tip is not required. Rounding up or leaving 5 to 10 percent for good service is a common courtesy."], ["Should the tip be split evenly?", "If everyone ordered about the same, yes. If orders differ a lot, share the tip in proportion to what each person ordered."]] },
  { slug: "receipt-splitter", name: "Receipt splitter",
    title: "Receipt Splitter: Split a Bill by Item, Tax and Tip",
    desc: "Free receipt splitter: add each item, tick who shared it, and add tax and tip. See exactly what each person owes, with shared dishes split fairly.",
    lead: "Split a restaurant receipt item by item. Add the people and the items, tick who shared each dish, and the splitter adds tax and tip in proportion.",
    body: `<form class="calc" id="tool-receipt">
      <strong>People</strong>
      <div class="rs-people"></div>
      <button class="calc-add rs-add-person" type="button">+ Add person</button>
      <strong>Items (tick who shared each one)</strong>
      <div class="rs-items"></div>
      <button class="calc-add rs-add-item" type="button">+ Add item</button>
      <label>Tax (%) <input name="tax" type="number" min="0" step="0.1" inputmode="decimal" value="0" /></label>
      <label>Tip (%) <input name="tip" type="number" min="0" step="1" inputmode="decimal" value="10" /></label>
      <div class="calc-out" aria-live="polite"></div>
    </form>
    <p>Use 0% tax where menu prices already include VAT, as in most of Europe. Tax and tip are added in proportion to each person's items, so the totals add up to the bill.</p>
    <h2 id="how-it-works">How the split works</h2>
    <ol>
      <li>Each item is divided evenly between the people ticked for it. A shared bottle of wine ticked for three people costs each of them a third.</li>
      <li>Each person's items are added up.</li>
      <li>Tax and tip are added as a percentage of each person's items, so a bigger order pays a bigger share of both.</li>
    </ol>
    <p>For the method step by step, read <a href="@/blog/how-to-split-a-receipt-item-by-item.html">how to split a receipt item by item</a>. If the dinner turns into drinks, <a href="@/features/restaurant-mode.html">restaurant mode</a> in RoundFair handles the itemised bill and keeps the rest of the night in the same session.</p>`,
    faq: [["How do I split a shared dish?", "Tick everyone who shared it. The splitter divides its price evenly between them."], ["Is my data saved?", "No. Everything runs in your browser and disappears when you close the page."]] },
];

const help = [
  { slug: "icloud-sharing", name: "Sharing a session through iCloud",
    title: "Sharing a RoundFair Session Through iCloud: Help",
    desc: "How live sharing works in RoundFair: sessions are shared through Apple's iCloud (CloudKit), work offline and sync later. What you need and what to check.",
    lead: "RoundFair shares sessions through Apple's iCloud, so your group sees the same rounds and balances on their own iPhones without a RoundFair account.",
    sections: [
      ["How sharing works", ["RoundFair has no servers of its own. When you share a session, it is shared between the participants' iCloud accounts through Apple's CloudKit. Everyone who joins sees rounds and balances update as they change. Sharing is optional: you can also run a session on your own phone and share a plain text summary at the end."]],
      ["What you need", ["- RoundFair installed on each iPhone that should follow the session live.", "- Each participant signed in to an iCloud account on their device. Nobody needs a separate RoundFair account.", "- A connection when the session is first shared. After that, you can keep logging rounds offline."]],
      ["Working offline", ["RoundFair is offline-first. Rounds you add without a signal are stored on your device and sync through iCloud when your phone is back online, so a bar with no reception never blocks the night."]],
      ["If changes do not appear", ["- Check that the device is online, then give iCloud a moment to sync.", "- Check that you are signed in to iCloud in the iOS Settings app, and that iCloud is allowed for RoundFair there.", "- Make sure everyone is on the latest version of RoundFair from the App Store; version 2.2 improved iCloud synchronisation for shared sessions.", "- If it still does not work, [contact us](contact.html) and tell us your iOS version and what you see."]],
      ["Privacy", ["Shared session data stays inside Apple's iCloud and never passes through a RoundFair account or server. See the [privacy policy](privacy.html) and the [live sharing feature](features/live-sharing.html)."]],
    ],
    faq: [["Does everyone need the app to see a shared session?", "To follow live, yes. Friends without the app can read the plain text summary you export."], ["Do I need a RoundFair account to share?", "No. Sharing uses each person's own iCloud account."], ["Does sharing work without internet?", "You can keep adding rounds offline. Changes sync when the device is back online."]] },
  { slug: "android", name: "Is RoundFair on Android?",
    title: "Is RoundFair Available on Android? Help",
    desc: "RoundFair is available on the App Store for iPhone only. There is no Android or web version. Here is how mixed iPhone and Android groups can still use it.",
    lead: "RoundFair is available on the App Store only. There is no Android app and no web version of the app.",
    sections: [
      ["Which devices are supported?", ["RoundFair is designed for iPhone and needs iOS 17 or later. It is an iPhone-only app. Live sharing uses Apple's iCloud, which is one reason the app is built for Apple devices."]],
      ["Using RoundFair in a group with Android phones", ["You do not need everyone to have the app. One person with an iPhone can log the rounds for the whole group, read out whose turn it is, and [export a plain text summary](features/export-summary.html) to any group chat at the end. Friends on Android see exactly who owes what."]],
      ["Free tools that work on any phone", ["The browser tools on this site work on Android too: the [who pays wheel](tools/who-pays-wheel.html), the [round cost calculator](tools/round-cost-calculator.html), the [receipt splitter](tools/receipt-splitter.html) and the [bill split calculator](calculators.html)."]],
      ["Cross-platform alternatives", ["If your group needs an app on both iPhone and Android, a shared expense ledger may suit you better. Our [Tricount alternatives](compare/tricount-alternatives.html) page lists options, including apps available on Android."]],
    ],
    faq: [["Is there an Android version of RoundFair?", "No. RoundFair is available for iPhone only, on the App Store."], ["Can friends with Android phones still see the results?", "Yes. Export the plain text summary and share it in your group chat."]] },
];

module.exports = { tools, help };
