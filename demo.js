// Interactive "How it works" demo: the RoundFair session screen, running in the phone mockup.
// Mirrors the app: round-robin turn order (Accounting.currentPayer), the "Round" menu with
// same round / another round / split the bill, the spin wheel, per-person shares and the
// settlement sheet.
(function () {
  const screen = document.getElementById("demo-screen");
  if (!screen) return;

  const PEOPLE = [
    { name: "Alex", color: "#7c5cff" },
    { name: "Jordan", color: "#2d7be5" },
    { name: "Sam", color: "#e0891f" },
    { name: "Taylor", color: "#f0a02c" },
  ];
  const DRINKS = [
    { key: "beer", price: 4, emoji: "🍺" },
    { key: "wine", price: 5, emoji: "🍷" },
    { key: "cocktail", price: 9, emoji: "🍹" },
    { key: "soda", price: 3, emoji: "🥤" },
  ];
  const BILLS = [
    { key: "restaurant", emoji: "🍽️" },
    { key: "taxi", emoji: "🚕" },
  ];
  const LOCALES = { nl: "nl-BE", en: "en-IE", fr: "fr-BE", de: "de-DE", es: "es-ES", it: "it-IT", pt: "pt-PT" };
  const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ----- state
  let rounds; // [{ payer, item: { kind: "drink"|"bill", key, price, mode: "perPerson"|"shared", consumers: [i] } }]
  let selected; // Set of participant indexes for the quick repeat
  let overridePayer; // wheel winner, valid for one quick round
  let view; // session | menu | settlement | wheel | newRound | splitBill
  let form; // state for the newRound / splitBill forms
  let wheel; // { rotation, spinning, winner }
  let toastTimer = null;

  function reset() {
    rounds = [
      { payer: 0, item: { kind: "drink", key: "beer", price: 4, mode: "perPerson", consumers: [0, 1, 2, 3] } },
      { payer: 1, item: { kind: "drink", key: "beer", price: 4, mode: "perPerson", consumers: [0, 1, 2, 3] } },
    ];
    selected = new Set([0, 1, 2, 3]);
    overridePayer = null;
    view = "session";
    form = null;
    wheel = { rotation: 0, spinning: false, winner: null };
  }

  // ----- i18n helpers
  function t(key, vars) {
    const i18n = window.RoundFairI18n;
    let str = i18n && typeof i18n.t === "function" ? i18n.t(key) : key;
    if (vars) Object.keys(vars).forEach((k) => { str = str.split("{" + k + "}").join(vars[k]); });
    return str;
  }
  function lang() {
    const i18n = window.RoundFairI18n;
    return (i18n && i18n.lang) || document.documentElement.lang || "en";
  }
  function money(n) {
    try {
      return new Intl.NumberFormat(LOCALES[lang()] || "en-IE", { style: "currency", currency: "EUR" }).format(n);
    } catch (e) {
      return "€ " + n.toFixed(2);
    }
  }
  function esc(str) {
    return String(str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  const itemLabel = (item) => t("demo." + item.key);

  // ----- accounting (same rules as the app)
  function roundTotal(r) {
    return r.item.mode === "perPerson" ? r.item.price * r.item.consumers.length : r.item.price;
  }
  function roundShares(r) {
    const out = {};
    const n = r.item.consumers.length;
    if (r.item.mode === "perPerson") {
      r.item.consumers.forEach((i) => { out[i] = r.item.price; });
    } else {
      // Split the total to the cent; the first consumers carry any remaining cent.
      const cents = Math.round(r.item.price * 100);
      const base = Math.floor(cents / n);
      let rest = cents - base * n;
      r.item.consumers.forEach((i) => { out[i] = (base + (rest-- > 0 ? 1 : 0)) / 100; });
    }
    return out;
  }
  function balances() {
    const paid = PEOPLE.map(() => 0);
    const share = PEOPLE.map(() => 0);
    rounds.forEach((r) => {
      paid[r.payer] += roundTotal(r);
      const s = roundShares(r);
      Object.keys(s).forEach((i) => { share[i] += s[i]; });
    });
    return PEOPLE.map((_, i) => ({ paid: paid[i], share: share[i], net: Math.round((paid[i] - share[i]) * 100) / 100 }));
  }
  function currentPayer() { return rounds.length % PEOPLE.length; }
  function nextPayer() { return (rounds.length + 1) % PEOPLE.length; }
  function quickPayer() { return overridePayer == null ? currentPayer() : overridePayer; }
  function totalOwed(b) { return b.reduce((s, x) => s + Math.max(x.net, 0), 0); }

  function transfers(b) {
    const creditors = b.map((x, i) => ({ i, v: x.net })).filter((x) => x.v > 0.005).sort((a, c) => c.v - a.v);
    const debtors = b.map((x, i) => ({ i, v: -x.net })).filter((x) => x.v > 0.005).sort((a, c) => c.v - a.v);
    const out = [];
    let ci = 0;
    debtors.forEach((d) => {
      let left = d.v;
      while (left > 0.005 && ci < creditors.length) {
        const c = creditors[ci];
        const amt = Math.min(left, c.v);
        out.push({ from: d.i, to: c.i, amount: amt });
        left -= amt; c.v -= amt;
        if (c.v <= 0.005) ci += 1;
      }
    });
    return out;
  }

  // ----- shared partials
  function avatar(i, size) {
    const p = PEOPLE[i];
    return `<span class="ds-avatar${size ? " ds-avatar-" + size : ""}" style="--c:${p.color}" aria-hidden="true">${p.name[0]}</span>`;
  }
  function personChips(action, isOn, extra) {
    return `<div class="ds-chips" role="group">${PEOPLE.map((p, i) => `
      <button type="button" class="ds-chip${isOn(i) ? " is-in" : ""}" data-action="${action}" data-i="${i}" aria-pressed="${isOn(i) ? "true" : "false"}"${extra ? " " + extra : ""}>
        ${avatar(i)}<span>${esc(p.name)}</span>
      </button>`).join("")}</div>`;
  }
  const closeBtn = (action) => `<button type="button" class="ds-close" data-action="${action}" aria-label="${esc(t("demo.close"))}">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
    </button>`;
  function sheetHead(title, sub, action) {
    return `<div class="ds-grabber" aria-hidden="true"></div>
      <div class="ds-sheet-head">
        <div><div class="ds-title ds-title-sm">${esc(title)}</div>${sub ? `<div class="ds-sub">${esc(sub)}</div>` : ""}</div>
        ${closeBtn(action)}
      </div>`;
  }

  // ----- session screen
  function renderSession() {
    const b = balances();
    const owed = totalOwed(b);
    const up = currentPayer();
    const next = nextPayer();
    const lastTwo = rounds.slice(-2).reverse();
    return `
      <div class="ds-nav">
        <span class="ds-back"><span class="ds-chevron">‹</span>${esc(t("demo.sessions"))}</span>
        <span class="ds-nav-icons" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7" /><path d="M12 3v13" /><path d="m7 8 5-5 5 5" /></svg>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9" /><path d="M8 12h.01M12 12h.01M16 12h.01" /></svg>
        </span>
      </div>
      <div class="ds-title">${esc(t("demo.session"))}</div>
      <div class="ds-hero">
        <div class="ds-amount${owed > 0 ? "" : " ds-amount-neutral"}">${money(owed)}</div>
        <div class="ds-caption">${esc(owed > 0 ? t("demo.open") : t("demo.fullySettled"))}</div>
        <div class="ds-meta"><b>${PEOPLE.length}</b> ${esc(t("demo.participantsLower"))} <span>·</span> ${esc(t("demo.rounds", { n: rounds.length })).replace(/^(\d+)/, "<b>$1</b>")}</div>
      </div>

      <div class="ds-h">${esc(t("demo.upNow"))}</div>
      <div class="ds-card ds-upnow">
        ${avatar(up, "lg")}
        <div class="ds-upnow-text">
          <strong>${esc(PEOPLE[up].name)}</strong>
          <small>${esc(t("demo.upThen", { name: PEOPLE[next].name }))}</small>
        </div>
        <button type="button" class="ds-wheel" data-action="openWheel" aria-label="${esc(t("demo.spinWheel"))}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="5" /><path d="M12 7v5l2.5 1.5" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
        </button>
      </div>

      <div class="ds-h ds-h-row"><span>${esc(t("demo.participants"))}</span><span class="ds-count">${PEOPLE.length}</span></div>
      <ul class="ds-card ds-list">
        ${PEOPLE.map((p, i) => `
          <li class="ds-row">
            ${avatar(i)}
            <span class="ds-name">${esc(p.name)}</span>
            <span class="ds-share"><span class="ds-share-amt">${money(b[i].share)}</span><small>${esc(t("demo.share"))}</small></span>
          </li>`).join("")}
      </ul>

      <div class="ds-h ds-h-row"><span>${esc(t("demo.roundsLabel"))}</span><span class="ds-count">${rounds.length}</span></div>
      <ul class="ds-card ds-list ds-rounds">
        ${lastTwo.map((r, k) => `
          <li class="ds-row">
            <span class="ds-num" aria-hidden="true">${rounds.length - k}</span>
            <span class="ds-name">${esc(PEOPLE[r.payer].name)}<small>${r.item.mode === "perPerson"
              ? `${r.item.consumers.length} × ${money(r.item.price)} ${esc(itemLabel(r.item))}`
              : `${esc(itemLabel(r.item))} · ${esc(t("demo.splitBy", { amount: money(r.item.price), n: r.item.consumers.length }))}`}</small></span>
            <span class="ds-share-amt">${money(roundTotal(r))}</span>
          </li>`).join("")}
      </ul>

      <div class="ds-bar">
        ${personChips("chip", (i) => selected.has(i))}
        <div class="ds-actions">
          <button type="button" class="ds-primary" data-action="openMenu" aria-haspopup="menu" aria-expanded="${view === "menu" ? "true" : "false"}">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="12" r="10" /><path d="M12 8v8M8 12h8" stroke="#06231a" stroke-width="2.2" stroke-linecap="round" fill="none" /></svg>
            <span>${esc(t("demo.roundBtn"))}</span>
            <svg class="ds-updown" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m8 9 4-4 4 4M8 15l4 4 4-4" /></svg>
          </button>
          <button type="button" class="ds-secondary" data-action="settle">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 8h14l-3-3" /><path d="M20 16H6l3 3" /></svg>
            <span>${esc(t("demo.settle"))}</span>
          </button>
        </div>
      </div>
      ${view === "menu" ? renderMenu() : ""}
      <div class="ds-toast" aria-live="polite"></div>`;
  }

  // ----- "Round" menu (mirrors the app's Menu on the primary button)
  function renderMenu() {
    const payer = quickPayer();
    const item = (action, icon, label, disabled) => `
      <button type="button" class="ds-menu-item" data-action="${action}"${disabled ? " disabled" : ""}>
        <span>${esc(label)}</span>${icon}
      </button>`;
    return `
      <div class="ds-scrim" data-action="closeMenu"></div>
      <div class="ds-menu" role="menu">
        ${item("round", '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a9 9 0 1 1-9-9" /><path d="M21 3v6h-6" /></svg>', t("demo.sameRound", { name: PEOPLE[payer].name }), !selected.size)}
        ${item("openNewRound", '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="8" y="8" width="13" height="13" rx="2" /><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" /><path d="M14.5 12v5M12 14.5h5" /></svg>', t("demo.anotherRound"))}
        ${item("openSplit", '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 3h14v18l-3-2-2 2-2-2-2 2-2-2-3 2z" /><path d="M9 9h6M9 13h6" /></svg>', t("demo.splitBill"))}
      </div>`;
  }

  // ----- wheel screen (mirrors SpinWheelView)
  function wheelSvg() {
    const n = PEOPLE.length;
    const R = 100, cx = 100, cy = 100;
    const segs = PEOPLE.map((p, i) => {
      const a0 = (i * 360 / n - 90) * Math.PI / 180;
      const a1 = ((i + 1) * 360 / n - 90) * Math.PI / 180;
      const x0 = cx + R * Math.cos(a0), y0 = cy + R * Math.sin(a0);
      const x1 = cx + R * Math.cos(a1), y1 = cy + R * Math.sin(a1);
      const mid = (a0 + a1) / 2;
      const tx = cx + R * 0.62 * Math.cos(mid), ty = cy + R * 0.62 * Math.sin(mid);
      const win = wheel.winner === i;
      return `<path d="M${cx} ${cy} L${x0.toFixed(2)} ${y0.toFixed(2)} A${R} ${R} 0 0 1 ${x1.toFixed(2)} ${y1.toFixed(2)} Z" class="ds-seg${i % 2 ? " ds-seg-alt" : ""}${win ? " ds-seg-win" : ""}" />
        <text x="${tx.toFixed(2)}" y="${ty.toFixed(2)}" class="ds-seg-label${win ? " ds-seg-label-win" : ""}" transform="rotate(${(mid * 180 / Math.PI + 90).toFixed(1)} ${tx.toFixed(2)} ${ty.toFixed(2)})">${esc(p.name)}</text>`;
    }).join("");
    return `<svg class="ds-wheel-svg" viewBox="0 0 200 200" aria-hidden="true"><g class="ds-wheel-rotor" style="transform: rotate(${wheel.rotation}deg)">${segs}<circle cx="100" cy="100" r="99" class="ds-wheel-ring" /></g><circle cx="100" cy="100" r="17" class="ds-wheel-hub" /></svg>
      <span class="ds-pointer" aria-hidden="true"></span>`;
  }
  function renderWheel() {
    const w = wheel.winner;
    return `
      <div class="ds-nav ds-nav-modal">
        <button type="button" class="ds-link" data-action="back">${esc(t("demo.close"))}</button>
        <span class="ds-nav-title">${esc(t("demo.whoPays"))}</span>
        <span class="ds-nav-spacer"></span>
      </div>
      <p class="ds-hint">${esc(t("demo.wheelHint"))}</p>
      <div class="ds-wheel-wrap${wheel.spinning ? " is-spinning" : ""}">${wheelSvg()}</div>
      ${w == null ? `
        <div class="ds-actions ds-actions-col">
          <button type="button" class="ds-primary" data-action="spin"${wheel.spinning ? " disabled" : ""}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a9 9 0 1 1-9-9" /><path d="M21 3v6h-6" /></svg>
            <span>${esc(wheel.spinning ? t("demo.spinning") : t("demo.spin"))}</span>
          </button>
        </div>` : `
        <div class="ds-winner">
          <span class="ds-party" aria-hidden="true">🎉</span>
          <strong>${esc(PEOPLE[w].name)}</strong>
          <small>${esc(t("demo.paysNext"))}</small>
          <div class="ds-actions ds-actions-col">
            <button type="button" class="ds-primary" data-action="wheelAddRound"><span>${esc(t("demo.addRoundFor", { name: PEOPLE[w].name }))}</span></button>
            <button type="button" class="ds-tertiary" data-action="spinAgain">${esc(t("demo.spinAgain"))}</button>
          </div>
        </div>`}`;
  }

  // ----- new round form (mirrors AddItemizedRoundView, simplified to one item)
  function renderNewRound() {
    const f = form;
    const drink = DRINKS.find((d) => d.key === f.drink);
    const total = drink.price * f.consumers.size;
    return `
      ${sheetHead(t("demo.newRound"), null, "back")}
      <div class="ds-form">
        <div class="ds-h">${esc(t("demo.whoPaid"))}</div>
        ${personChips("formPayer", (i) => f.payer === i)}
        <div class="ds-h ds-h-row"><span>${esc(t("demo.items"))}</span><span class="ds-count">${esc(t("demo.whatOrdered"))}</span></div>
        <div class="ds-drinks" role="group">
          ${DRINKS.map((d) => `
            <button type="button" class="ds-drink${f.drink === d.key ? " is-on" : ""}" data-action="formDrink" data-key="${d.key}" aria-pressed="${f.drink === d.key ? "true" : "false"}">
              <span class="ds-drink-emoji" aria-hidden="true">${d.emoji}</span>
              <span class="ds-drink-name">${esc(t("demo." + d.key))}</span>
              <span class="ds-drink-price">${money(d.price)} <small>${esc(t("demo.perPerson").toLowerCase())}</small></span>
            </button>`).join("")}
        </div>
        <div class="ds-h">${esc(t("demo.whoJoins"))}</div>
        ${personChips("formConsumer", (i) => f.consumers.has(i))}
      </div>
      <div class="ds-form-foot">
        <div class="ds-form-total"><small>${esc(t("demo.total"))}</small><strong>${money(total)}</strong></div>
        <button type="button" class="ds-primary" data-action="saveNewRound"${f.consumers.size ? "" : " disabled"}><span>${esc(t("demo.save"))}</span></button>
      </div>`;
  }

  // ----- split bill form (mirrors SplitBillView)
  function renderSplitBill() {
    const f = form;
    const n = f.consumers.size;
    const per = n ? f.amount / n : 0;
    return `
      ${sheetHead(t("demo.splitBill"), null, "back")}
      <div class="ds-form">
        <div class="ds-h">${esc(t("demo.totalBill"))}</div>
        <div class="ds-card ds-amount-row">
          <button type="button" class="ds-step" data-action="billMinus" aria-label="-5"${f.amount <= 5 ? " disabled" : ""}>−</button>
          <span class="ds-amount-input">${money(f.amount)}</span>
          <button type="button" class="ds-step" data-action="billPlus" aria-label="+5">+</button>
        </div>
        <div class="ds-drinks ds-bills" role="group">
          ${BILLS.map((b) => `
            <button type="button" class="ds-drink${f.name === b.key ? " is-on" : ""}" data-action="billName" data-key="${b.key}" aria-pressed="${f.name === b.key ? "true" : "false"}">
              <span class="ds-drink-emoji" aria-hidden="true">${b.emoji}</span>
              <span class="ds-drink-name">${esc(t("demo." + b.key))}</span>
            </button>`).join("")}
        </div>
        <div class="ds-h">${esc(t("demo.whoPaid"))}</div>
        ${personChips("formPayer", (i) => f.payer === i)}
        <div class="ds-h">${esc(t("demo.whoShares"))}</div>
        ${personChips("formConsumer", (i) => f.consumers.has(i))}
      </div>
      <div class="ds-form-foot">
        <div class="ds-form-total"><small>${esc(t("demo.split"))}</small><strong>${n ? esc(t("demo.splitBy", { amount: money(f.amount), n })) : "–"}</strong>${n ? `<small>${money(per)} ${esc(t("demo.perPerson").toLowerCase())}</small>` : ""}</div>
        <button type="button" class="ds-primary" data-action="saveSplit"${n ? "" : " disabled"}><span>${esc(t("demo.save"))}</span></button>
      </div>`;
  }

  // ----- settlement sheet
  function renderSettlement() {
    const b = balances();
    const owed = totalOwed(b);
    const tr = transfers(b);
    const creditors = b.map((x, i) => ({ i, v: x.net })).filter((x) => x.v > 0.005).sort((a, c) => c.v - a.v);
    const debtors = b.map((x, i) => ({ i, v: x.net })).filter((x) => x.v < -0.005).sort((a, c) => a.v - c.v);
    const settled = owed < 0.005;
    const debtorSub = (i) => {
      const out = tr.filter((x) => x.from === i);
      return out.length === 1 ? t("demo.paysTo", { name: PEOPLE[out[0].to].name }) : t("demo.pays");
    };
    const section = (label, cls, icon, rows) => rows.length ? `
      <div class="ds-h ds-h-icon ${cls}">${icon}<span>${esc(label)}</span></div>
      <ul class="ds-card ds-list">${rows.join("")}</ul>` : "";
    const downIcon = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="12" r="10" /><path d="M12 7v8m0 0-3.5-3.5M12 15l3.5-3.5" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" /></svg>';
    const upIcon = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="12" r="10" /><path d="M12 17V9m0 0-3.5 3.5M12 9l3.5 3.5" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" /></svg>';
    return `
      ${sheetHead(t("demo.settle"), t("demo.session"), "back")}
      <div class="ds-hero">
        <div class="ds-caption">${esc(settled ? t("demo.allSettled") : t("demo.stillToSettle"))}</div>
        <div class="ds-amount${settled ? " ds-amount-pos" : ""}">${money(owed)}</div>
        <div class="ds-dots">
          <span><i class="ds-dot ds-dot-pos"></i>${esc(t("demo.nReceives", { n: creditors.length }))}</span>
          <span><i class="ds-dot ds-dot-neg"></i>${esc(t("demo.nPays", { n: debtors.length }))}</span>
        </div>
      </div>
      ${settled ? `
        <div class="ds-card ds-settled">
          <span class="ds-seal" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5" /></svg></span>
          <strong>${esc(t("demo.allSquare"))}</strong>
          <small>${esc(t("demo.allSquareSub"))}</small>
        </div>` : ""}
      ${section(t("demo.receives"), "ds-h-pos", downIcon, creditors.map((x) => `
        <li class="ds-row ds-row-lg">
          ${avatar(x.i, "lg")}
          <span class="ds-name"><strong>${esc(PEOPLE[x.i].name)}</strong><small>${esc(t("demo.getsBack"))}</small></span>
          <span class="ds-bal ds-pos">+ ${money(x.v)}</span>
          <span class="ds-row-chevron" aria-hidden="true">⌄</span>
        </li>`))}
      ${section(t("demo.mustPay"), "ds-h-neg", upIcon, debtors.map((x) => `
        <li class="ds-row ds-row-lg">
          ${avatar(x.i, "lg")}
          <span class="ds-name"><strong>${esc(PEOPLE[x.i].name)}</strong><small>${esc(debtorSub(x.i))}</small></span>
          <span class="ds-bal ds-neg">- ${money(-x.v)}</span>
        </li>`))}`;
  }

  function render() {
    const body = view === "settlement" ? renderSettlement()
      : view === "wheel" ? renderWheel()
      : view === "newRound" ? renderNewRound()
      : view === "splitBill" ? renderSplitBill()
      : renderSession();
    screen.innerHTML = `<div class="ds ds-view-${view}">${body}</div>`;
  }

  function toast(msg) {
    const el = screen.querySelector(".ds-toast");
    if (!el) return;
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 1600);
  }

  function afterRoundAdded(msg) {
    view = "session";
    form = null;
    render();
    const up = screen.querySelector(".ds-upnow");
    if (up) up.classList.add("ds-swap");
    screen.querySelectorAll(".ds-share-amt, .ds-amount").forEach((el) => el.classList.add("ds-bump"));
    toast(msg);
  }

  // ----- actions
  function quickRound() {
    if (!selected.size) return;
    const last = rounds[rounds.length - 1];
    const item = last.item.kind === "drink"
      ? { ...last.item, consumers: [...selected].sort() }
      : { kind: "drink", key: "beer", price: 4, mode: "perPerson", consumers: [...selected].sort() };
    rounds.push({ payer: quickPayer(), item });
    overridePayer = null;
    afterRoundAdded(t("demo.roundSaved"));
  }

  function openNewRound(payer) {
    const last = rounds[rounds.length - 1];
    form = { payer: payer == null ? quickPayer() : payer, drink: last.item.kind === "drink" ? last.item.key : "beer", consumers: new Set(selected.size ? selected : [0, 1, 2, 3]) };
    view = "newRound";
    render();
  }
  function saveNewRound() {
    const f = form;
    if (!f.consumers.size) return;
    const drink = DRINKS.find((d) => d.key === f.drink);
    rounds.push({ payer: f.payer, item: { kind: "drink", key: drink.key, price: drink.price, mode: "perPerson", consumers: [...f.consumers].sort() } });
    overridePayer = null;
    afterRoundAdded(t("demo.roundAdded"));
  }

  function openSplit() {
    form = { payer: quickPayer(), name: "restaurant", amount: 60, consumers: new Set([0, 1, 2, 3]) };
    view = "splitBill";
    render();
  }
  function saveSplit() {
    const f = form;
    if (!f.consumers.size) return;
    rounds.push({ payer: f.payer, item: { kind: "bill", key: f.name, price: f.amount, mode: "shared", consumers: [...f.consumers].sort() } });
    overridePayer = null;
    afterRoundAdded(t("demo.billSplit"));
  }

  function spin() {
    if (wheel.spinning) return;
    const n = PEOPLE.length;
    const winner = Math.floor(Math.random() * n);
    // Segment i sits at [i*360/n, (i+1)*360/n) clockwise from the pointer (12 o'clock).
    // Rotate so its centre (plus a little jitter) lands under the pointer.
    const jitter = (Math.random() - 0.5) * (360 / n) * 0.6;
    const target = -(winner * 360 / n + 180 / n + jitter);
    const turns = 5 * 360;
    const current = ((wheel.rotation % 360) + 360) % 360;
    const next = wheel.rotation - current + turns + target;
    wheel.spinning = true;
    wheel.winner = null;
    render(); // rotor is drawn at the old angle, then transitions to the new one
    const rotor = screen.querySelector(".ds-wheel-rotor");
    requestAnimationFrame(() => requestAnimationFrame(() => {
      if (rotor) rotor.style.transform = `rotate(${next}deg)`;
    }));
    wheel.rotation = next;
    const duration = reduceMotion() ? 0 : 4500;
    setTimeout(() => {
      wheel.spinning = false;
      wheel.winner = winner;
      overridePayer = winner;
      render();
    }, duration);
  }

  screen.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action]");
    if (!btn || btn.disabled) return;
    const action = btn.getAttribute("data-action");
    const idx = Number(btn.getAttribute("data-i"));
    switch (action) {
      case "openMenu": view = view === "menu" ? "session" : "menu"; render(); break;
      case "closeMenu": view = "session"; render(); break;
      case "round": quickRound(); break;
      case "openNewRound": openNewRound(null); break;
      case "openSplit": openSplit(); break;
      case "settle": view = "settlement"; render(); break;
      case "back": view = "session"; form = null; render(); break;
      case "chip": if (selected.has(idx)) selected.delete(idx); else selected.add(idx); render(); break;
      case "openWheel": wheel.winner = null; view = "wheel"; render(); break;
      case "spin": spin(); break;
      case "spinAgain": wheel.winner = null; render(); break;
      case "wheelAddRound": openNewRound(wheel.winner); break;
      case "formPayer": form.payer = idx; render(); break;
      case "formConsumer": if (form.consumers.has(idx)) form.consumers.delete(idx); else form.consumers.add(idx); render(); break;
      case "formDrink": form.drink = btn.getAttribute("data-key"); render(); break;
      case "billName": form.name = btn.getAttribute("data-key"); render(); break;
      case "billMinus": form.amount = Math.max(5, form.amount - 5); render(); break;
      case "billPlus": form.amount = Math.min(500, form.amount + 5); render(); break;
      case "saveNewRound": saveNewRound(); break;
      case "saveSplit": saveSplit(); break;
      default: break;
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && view === "menu") { view = "session"; render(); }
  });

  const resetBtn = document.getElementById("demo-reset");
  if (resetBtn) {
    resetBtn.hidden = false;
    resetBtn.addEventListener("click", () => { reset(); render(); });
  }

  document.addEventListener("rf:lang", render);

  reset();
  screen.classList.add("is-live");
  render();
})();
