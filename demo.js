// Interactive "How it works" demo: the RoundFair session screen, running in the phone mockup.
// Mirrors the app: round-robin turn order (Accounting.currentPayer), quick "same round"
// repeat with a per-round payer override, share-per-person rows, and the settlement sheet.
(function () {
  const screen = document.getElementById("demo-screen");
  if (!screen) return;

  const PEOPLE = [
    { name: "Alex", color: "#7c5cff" },
    { name: "Jordan", color: "#2d7be5" },
    { name: "Sam", color: "#e0891f" },
    { name: "Taylor", color: "#f0a02c" },
  ];
  const DRINK = 8; // price per drink, matches the App Store screenshots
  const LOCALES = { nl: "nl-BE", en: "en-IE", fr: "fr-BE", de: "de-DE", es: "es-ES", it: "it-IT", pt: "pt-PT" };

  let rounds; // [{ payer: index, consumers: [index] }]
  let selected; // Set of participant indexes for the next quick round
  let overridePayer; // index or null (wheel result, valid for one round)
  let view = "session"; // "session" | "settlement"
  let toastTimer = null;
  let spinning = false;

  function reset() {
    rounds = [
      { payer: 0, consumers: [0, 1, 2, 3] },
      { payer: 1, consumers: [0, 1, 2, 3] },
    ];
    selected = new Set([0, 1, 2, 3]);
    overridePayer = null;
    view = "session";
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

  // ----- accounting (same rules as the app)
  function balances() {
    const paid = PEOPLE.map(() => 0);
    const share = PEOPLE.map(() => 0);
    rounds.forEach((r) => {
      const total = DRINK * r.consumers.length;
      paid[r.payer] += total;
      r.consumers.forEach((i) => { share[i] += DRINK; });
    });
    return PEOPLE.map((_, i) => ({ paid: paid[i], share: share[i], net: paid[i] - share[i] }));
  }
  function currentPayer() { return rounds.length % PEOPLE.length; }
  function nextPayer() { return (rounds.length + 1) % PEOPLE.length; }
  function quickPayer() { return overridePayer == null ? currentPayer() : overridePayer; }
  function totalOwed(b) { return b.reduce((s, x) => s + Math.max(x.net, 0), 0); }

  // Greedy bilateral transfers, enough to label "must pay {name}" like the app does.
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

  // ----- rendering
  function avatar(i, size) {
    const p = PEOPLE[i];
    return `<span class="ds-avatar${size ? " ds-avatar-" + size : ""}" style="--c:${p.color}" aria-hidden="true">${p.name[0]}</span>`;
  }

  function renderSession() {
    const b = balances();
    const owed = totalOwed(b);
    const up = currentPayer();
    const next = nextPayer();
    const payer = quickPayer();
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
        <button type="button" class="ds-wheel${spinning ? " is-spinning" : ""}" data-action="wheel" aria-label="${esc(t("demo.spinWheel"))}">
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
        ${rounds.slice(-2).reverse().map((r, k) => `
          <li class="ds-row">
            <span class="ds-num" aria-hidden="true">${rounds.length - k}</span>
            <span class="ds-name">${esc(PEOPLE[r.payer].name)}<small>${r.consumers.length} × ${money(DRINK)}</small></span>
            <span class="ds-share-amt">${money(DRINK * r.consumers.length)}</span>
          </li>`).join("")}
      </ul>

      <div class="ds-bar">
        <div class="ds-chips" role="group">
          ${PEOPLE.map((p, i) => `
            <button type="button" class="ds-chip${selected.has(i) ? " is-in" : ""}" data-action="chip" data-i="${i}" aria-pressed="${selected.has(i) ? "true" : "false"}">
              ${avatar(i)}<span>${esc(p.name)}</span>
            </button>`).join("")}
        </div>
        <div class="ds-actions">
          <button type="button" class="ds-primary" data-action="round"${selected.size ? "" : " disabled"}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a9 9 0 1 1-9-9" /><path d="M21 3v6h-6" /></svg>
            <span>${esc(t("demo.sameRound", { name: PEOPLE[payer].name }))}</span>
          </button>
          <button type="button" class="ds-secondary" data-action="settle">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 8h14l-3-3" /><path d="M20 16H6l3 3" /></svg>
            <span>${esc(t("demo.settle"))}</span>
          </button>
        </div>
      </div>
      <div class="ds-toast" aria-live="polite"></div>`;
  }

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
      <div class="ds-grabber" aria-hidden="true"></div>
      <div class="ds-sheet-head">
        <div>
          <div class="ds-title ds-title-sm">${esc(t("demo.settle"))}</div>
          <div class="ds-sub">${esc(t("demo.session"))}</div>
        </div>
        <button type="button" class="ds-close" data-action="back" aria-label="${esc(t("demo.close"))}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
        </button>
      </div>
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
    screen.innerHTML = `<div class="ds ds-${view}">${view === "session" ? renderSession() : renderSettlement()}</div>`;
  }

  function toast(msg) {
    const el = screen.querySelector(".ds-toast");
    if (!el) return;
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 1600);
  }

  function logRound() {
    if (!selected.size) return;
    const payer = quickPayer();
    rounds.push({ payer, consumers: [...selected].sort() });
    overridePayer = null; // an override only counts for one round, like the app
    render();
    const up = screen.querySelector(".ds-upnow");
    if (up) up.classList.add("ds-swap");
    screen.querySelectorAll(".ds-share-amt, .ds-amount").forEach((el) => el.classList.add("ds-bump"));
    toast(t("demo.roundSaved"));
  }

  function spinWheel() {
    if (spinning) return;
    spinning = true;
    const btn = screen.querySelector(".ds-wheel");
    if (btn) btn.classList.add("is-spinning");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setTimeout(() => {
      const others = PEOPLE.map((_, i) => i).filter((i) => i !== quickPayer());
      overridePayer = others[Math.floor(Math.random() * others.length)];
      spinning = false;
      render();
      const primary = screen.querySelector(".ds-primary");
      if (primary) primary.classList.add("ds-swap");
    }, reduce ? 0 : 700);
  }

  screen.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;
    const action = btn.getAttribute("data-action");
    if (action === "round") logRound();
    else if (action === "settle") { view = "settlement"; render(); }
    else if (action === "back") { view = "session"; render(); }
    else if (action === "wheel") spinWheel();
    else if (action === "chip") {
      const i = Number(btn.getAttribute("data-i"));
      if (selected.has(i)) selected.delete(i); else selected.add(i);
      render();
    }
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
