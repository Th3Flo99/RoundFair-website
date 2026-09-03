// Interactive "How it works" demo: a tiny RoundFair session running in the phone mockup.
(function () {
  const screen = document.getElementById("demo-screen");
  if (!screen) return;

  const PEOPLE = [
    { name: "Alex", color: "#2D5BB8" },
    { name: "Jordan", color: "#8B3DA8" },
    { name: "Sam", color: "#B16A2E" },
    { name: "Taylor", color: "#1B7A55" },
  ];
  const DRINK = 4; // price per drink
  const ROUND = DRINK * PEOPLE.length;
  const LOCALES = { nl: "nl-BE", en: "en-IE", fr: "fr-BE", de: "de-DE", es: "es-ES", it: "it-IT", pt: "pt-PT" };

  let state;
  let view = "session"; // "session" | "settlement"
  let toastTimer = null;

  function reset() {
    // Two rounds already logged: Alex and Jordan paid, so Sam is up.
    state = { rounds: 2, paid: [ROUND, ROUND, 0, 0], share: [DRINK * 2, DRINK * 2, DRINK * 2, DRINK * 2] };
  }

  function t(key, vars) {
    const i18n = window.RoundFairI18n;
    let str = i18n && typeof i18n.t === "function" ? i18n.t(key) : key;
    if (vars) Object.keys(vars).forEach((k) => { str = str.replace("{" + k + "}", vars[k]); });
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

  function balances() {
    return PEOPLE.map((_, i) => state.paid[i] - state.share[i]);
  }

  // Whoever has paid the least relative to their share is up; ties go to list order.
  function order() {
    const b = balances();
    return PEOPLE.map((_, i) => i).sort((a, c) => b[a] - b[c] || a - c);
  }

  function esc(str) {
    return String(str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  function avatar(i, size) {
    const p = PEOPLE[i];
    return `<span class="ds-avatar${size ? " ds-avatar-" + size : ""}" style="--c:${p.color}" aria-hidden="true">${p.name[0]}</span>`;
  }

  function signed(n) {
    if (Math.abs(n) < 0.005) return `<span class="ds-bal ds-zero">${money(0)}</span>`;
    const cls = n > 0 ? "ds-pos" : "ds-neg";
    return `<span class="ds-bal ${cls}">${n > 0 ? "+" : "-"} ${money(Math.abs(n))}</span>`;
  }

  function renderSession() {
    const ord = order();
    const up = ord[0];
    const next = ord[1];
    const total = state.paid.reduce((a, b) => a + b, 0);
    const b = balances();
    return `
      <div class="ds-top"><span class="ds-chevron">‹</span> ${esc(t("demo.sessions"))}</div>
      <div class="ds-header">
        <div class="ds-title">${esc(t("demo.session"))}</div>
        <div class="ds-total">${money(total)}</div>
        <div class="ds-meta">${PEOPLE.length} ${esc(t("demo.participants").toLowerCase())} · ${esc(t("demo.rounds", { n: state.rounds }))}</div>
      </div>
      <div class="ds-label">${esc(t("demo.upNow"))}</div>
      <div class="ds-upnow" data-up="${up}">
        ${avatar(up, "lg")}
        <div class="ds-upnow-text">
          <strong>${esc(PEOPLE[up].name)}</strong>
          <small>${esc(t("demo.then", { name: PEOPLE[next].name }))}</small>
        </div>
        <span class="ds-upnow-dot" aria-hidden="true"></span>
      </div>
      <div class="ds-label">${esc(t("demo.participants"))}</div>
      <ul class="ds-list">
        ${PEOPLE.map((p, i) => `
          <li class="ds-row${i === up ? " ds-row-up" : ""}">
            ${avatar(i)}
            <span class="ds-name">${esc(p.name)}<small>${esc(t("demo.paid", { amount: money(state.paid[i]) }))}</small></span>
            ${signed(b[i])}
          </li>`).join("")}
      </ul>
      <div class="ds-actions">
        <button type="button" class="ds-primary" data-action="round">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a9 9 0 1 1-9-9" /><path d="M21 3v6h-6" /></svg>
          ${esc(t("demo.sameRound"))} · ${esc(PEOPLE[up].name)}
        </button>
        <button type="button" class="ds-secondary" data-action="settle">${esc(t("demo.settle"))}</button>
      </div>
      <div class="ds-toast" aria-live="polite"></div>`;
  }

  function renderSettlement() {
    const b = balances();
    const receives = PEOPLE.map((p, i) => ({ p, i, v: b[i] })).filter((x) => x.v > 0.005);
    const pays = PEOPLE.map((p, i) => ({ p, i, v: b[i] })).filter((x) => x.v < -0.005);
    const open = receives.reduce((a, x) => a + x.v, 0);
    const group = (label, cls, items, word) => items.length ? `
      <div class="ds-label ${cls}">${esc(label)}</div>
      <ul class="ds-list">
        ${items.map((x) => `
          <li class="ds-row">
            ${avatar(x.i)}
            <span class="ds-name">${esc(x.p.name)}<small>${esc(word)}</small></span>
            ${signed(x.v)}
          </li>`).join("")}
      </ul>` : "";
    return `
      <div class="ds-top"><button type="button" class="ds-link" data-action="back"><span class="ds-chevron">‹</span> ${esc(t("demo.back"))}</button></div>
      <div class="ds-header">
        <div class="ds-title">${esc(t("demo.settle"))}</div>
        <div class="ds-sub">${esc(t("demo.session"))}</div>
        <div class="ds-meta">${esc(t("demo.stillToSettle"))}</div>
        <div class="ds-total">${money(open)}</div>
      </div>
      ${open < 0.005 ? `<div class="ds-square">${esc(t("demo.allSquare"))}</div>` : ""}
      ${group(t("demo.receives"), "ds-label-pos", receives, t("demo.getsBack"))}
      ${group(t("demo.mustPay"), "ds-label-neg", pays, t("demo.pays"))}
      <div class="ds-actions">
        <button type="button" class="ds-primary" data-action="back">${esc(t("demo.sameRound"))}</button>
        <button type="button" class="ds-secondary" data-action="reset">${esc(t("demo.reset"))}</button>
      </div>`;
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
    toastTimer = setTimeout(() => el.classList.remove("show"), 1800);
  }

  function logRound() {
    const before = order()[0];
    state.rounds += 1;
    state.paid[before] += ROUND;
    state.share = state.share.map((v) => v + DRINK);
    render();
    const up = screen.querySelector(".ds-upnow");
    if (up) up.classList.add("ds-swap");
    screen.querySelectorAll(".ds-bal").forEach((el) => el.classList.add("ds-bump"));
    toast(t("demo.toast", { n: state.rounds, name: PEOPLE[before].name, amount: money(ROUND) }));
  }

  screen.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;
    const action = btn.getAttribute("data-action");
    if (action === "round") logRound();
    else if (action === "settle") { view = "settlement"; render(); }
    else if (action === "back") { view = "session"; render(); }
    else if (action === "reset") { reset(); view = "session"; render(); }
  });

  document.addEventListener("rf:lang", render);

  reset();
  screen.classList.add("is-live");
  render();
})();
