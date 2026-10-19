// Free browser tools on /tools/*.html. Each tool initialises only if its form is on the page. No data leaves the browser.
(function () {
  var $ = function (id) { return document.getElementById(id); };
  var money = function (n) { return (Math.round(n * 100) / 100).toFixed(2); };
  var num = function (el) { return Math.max(0, parseFloat(el.value) || 0); };
  var esc = function (s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); };
  var rand = function (n) { // unbiased random integer in [0, n)
    if (window.crypto && crypto.getRandomValues) { var a = new Uint32Array(1), lim = Math.floor(4294967296 / n) * n; do { crypto.getRandomValues(a); } while (a[0] >= lim); return a[0] % n; }
    return Math.floor(Math.random() * n);
  };
  var names = function (el) { return el.value.split(/\n|,/).map(function (s) { return s.trim(); }).filter(Boolean).slice(0, 24); };

  // --- Who pays wheel
  var wheel = $("tool-wheel");
  if (wheel) {
    var disc = wheel.querySelector(".wheel-disc"), out = wheel.querySelector(".calc-out"), list = wheel.elements.names, turn = 0;
    var COLORS = ["#2bb491", "#1f8a70", "#f2b134", "#e4572e", "#4c6ef5", "#9c36b5", "#0b7285", "#e8590c"];
    var draw = function () {
      var n = names(list), k = n.length || 1, step = 360 / k;
      disc.style.background = "conic-gradient(" + (n.length ? n.map(function (_, i) { return COLORS[i % COLORS.length] + " " + i * step + "deg " + (i + 1) * step + "deg"; }).join(",") : "#ccc 0deg 360deg") + ")";
      disc.innerHTML = n.map(function (name, i) { return '<span style="transform:rotate(' + (i * step + step / 2) + 'deg)"><b>' + esc(name) + "</b></span>"; }).join("");
    };
    list.oninput = draw; draw();
    wheel.onsubmit = function (e) {
      e.preventDefault();
      var n = names(list);
      if (n.length < 2) { out.textContent = "Add at least two names."; return; }
      var i = rand(n.length), step = 360 / n.length;
      turn += 5 * 360 + (360 - (turn % 360)) + (360 - (i * step + step / 2)); // land segment i under the pointer at the top
      disc.style.transform = "rotate(" + turn + "deg)";
      out.textContent = "Spinning…";
      var done = function () { out.innerHTML = "<strong>" + esc(n[i]) + "</strong> buys the next round."; };
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) done(); else setTimeout(done, 3200);
    };
  }

  // --- Round cost calculator
  var rc = $("tool-rounds");
  if (rc) {
    var calcRounds = function () {
      var f = rc.elements, people = Math.max(1, Math.floor(num(f.people)) || 1), price = num(f.price), rounds = Math.max(0, Math.floor(num(f.rounds)));
      var round = people * price, total = round * rounds, full = Math.floor(rounds / people), extra = rounds % people;
      rc.querySelector(".calc-out").innerHTML =
        "<p>One round costs <strong>" + money(round) + "</strong>. " + rounds + " rounds cost <strong>" + money(total) + "</strong>, or " + money(total / people) + " per person if everyone drinks every round.</p>" +
        "<p>" + (extra === 0
          ? "Every person buys " + full + " round" + (full === 1 ? "" : "s") + ", so the night evens out."
          : extra + " of " + people + " people buy one round more than the others (" + money(round) + " extra each). Stop after " + (full + 1) * people + " rounds, or settle the difference at the end.") + "</p>";
    };
    rc.oninput = calcRounds; calcRounds();
  }

  // --- Tip calculator by country
  var tip = $("tool-tip");
  if (tip) {
    var sel = tip.elements.country, note = tip.querySelector(".tip-note");
    var pick = function () {
      var o = sel.options[sel.selectedIndex];
      note.textContent = o.dataset.note || "";
      tip.elements.tip.value = o.dataset.tip;
      calcTip();
    };
    var calcTip = function () {
      var f = tip.elements, bill = num(f.bill), pct = num(f.tip), n = Math.max(1, Math.floor(num(f.people)) || 1), t = bill * pct / 100;
      tip.querySelector(".calc-out").innerHTML = "<p>Tip <strong>" + money(t) + "</strong>, total <strong>" + money(bill + t) + "</strong>.</p><p>Split " + n + " way" + (n === 1 ? "" : "s") + ": <strong>" + money((bill + t) / n) + "</strong> each.</p>";
    };
    sel.onchange = pick; tip.oninput = function (e) { if (e.target !== sel) calcTip(); }; pick();
  }

  // --- Receipt splitter
  var rs = $("tool-receipt");
  if (rs) {
    var pBox = rs.querySelector(".rs-people"), iBox = rs.querySelector(".rs-items"), out2 = rs.querySelector(".calc-out");
    var people = function () { return [].map.call(pBox.querySelectorAll("input"), function (el, i) { return el.value.trim() || "Person " + (i + 1); }); };
    var addPerson = function (name) {
      var row = document.createElement("div"); row.className = "calc-row rs-person";
      row.innerHTML = '<input type="text" maxlength="30" aria-label="Name" /><span></span><button type="button" class="calc-remove" aria-label="Remove person">×</button>';
      row.children[0].value = name;
      row.children[2].onclick = function () { if (pBox.children.length > 2) { var idx = [].indexOf.call(pBox.children, row); row.remove(); [].forEach.call(iBox.children, function (it) { var c = it.querySelectorAll(".rs-who label")[idx]; if (c) c.remove(); }); render(); } };
      pBox.appendChild(row);
      [].forEach.call(iBox.children, function (it) { it.querySelector(".rs-who").appendChild(check(name, true)); });
    };
    var check = function (name, on) { var l = document.createElement("label"); l.className = "rs-check"; l.innerHTML = '<input type="checkbox" /> <span></span>'; l.children[0].checked = on; l.children[1].textContent = name; return l; };
    var addItem = function (label, price, who) {
      var it = document.createElement("div"); it.className = "rs-item";
      it.innerHTML = '<div class="calc-row"><input type="text" maxlength="40" aria-label="Item" /><input type="number" min="0" step="0.01" inputmode="decimal" aria-label="Price" /><button type="button" class="calc-remove" aria-label="Remove item">×</button></div><div class="rs-who" role="group" aria-label="Shared by"></div>';
      it.querySelector('input[type="text"]').value = label; it.querySelector('input[type="number"]').value = price;
      it.querySelector(".calc-remove").onclick = function () { if (iBox.children.length > 1) { it.remove(); render(); } };
      people().forEach(function (n, i) { it.querySelector(".rs-who").appendChild(check(n, !who || who.indexOf(i) > -1)); });
      iBox.appendChild(it);
    };
    var render = function () {
      var ps = people(), sub = ps.map(function () { return 0; }), total = 0;
      [].forEach.call(pBox.children, function (row, i) { row.children[1].textContent = ""; });
      [].forEach.call(iBox.children, function (it) {
        var price = num(it.querySelector('input[type="number"]')), boxes = it.querySelectorAll(".rs-who input");
        boxes.forEach(function (b, i) { b.nextElementSibling.textContent = ps[i]; });
        var on = [].filter.call(boxes, function (b) { return b.checked; }).map(function (b) { return [].indexOf.call(boxes, b); });
        if (!on.length) return;
        on.forEach(function (i) { sub[i] += price / on.length; }); total += price;
      });
      var k = 1 + num(rs.elements.tax) / 100 + num(rs.elements.tip) / 100;
      out2.innerHTML = total ? "<ul>" + ps.map(function (n, i) { return "<li>" + esc(n) + " pays <strong>" + money(sub[i] * k) + "</strong> (items " + money(sub[i]) + ")</li>"; }).join("") + "</ul><p>Total " + money(total * k) + "</p>" : "<p>Add items and tick who shared each one.</p>";
    };
    ["Alex", "Jordan", "Sam"].forEach(addPerson);
    addItem("Pizza", 16, [0]); addItem("Pasta", 14, [1]); addItem("Salad", 11, [2]); addItem("Bottle of wine", 27); addItem("Starter to share", 9, [0, 1]);
    rs.querySelector(".rs-add-person").onclick = function () { addPerson("Person " + (pBox.children.length + 1)); render(); };
    rs.querySelector(".rs-add-item").onclick = function () { addItem("Item", 0); render(); };
    rs.addEventListener("input", render); rs.addEventListener("change", render); rs.onsubmit = function (e) { e.preventDefault(); };
    render();
  }
})();
