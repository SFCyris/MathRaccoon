/*!
 * Math Raccoon Arcade — © 2026 S. F. Cyris
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Math Raccoon™, Reading Raccoon™, Art Raccoon™, Painter Raccoon™,
 * and Ava's Hidden Valley™ are unregistered common-law trademarks
 * of the author. See NOTICE.md — these marks are NOT licensed under Apache 2.0.
 *
 * Source: https://github.com/SFCyris/MathRaccoon
 */

/**
 * teach.js — Teaching Corner.
 *
 * A no-stakes, exploration-only "how to do math" section. Each operation
 * has 4 strategies; each strategy has three small screens:
 *   1. The Idea       — story hook + visual metaphor (concrete/pictorial)
 *   2. Watch Me       — step-by-step worked example (child-paced, replayable)
 *   3. Your Turn      — 1–2 scaffolded practice problems; hint always available
 *
 * Pedagogy: CPA sequence (Bruner), worked-example-before-practice (Sweller),
 * no timers, no failure penalty, gentle metacognitive prompts. Saves last-visited
 * lesson + completion markers to localStorage so the child can pick up where
 * they left off.
 */
(function () {
  const { Storage, Raccoon, Voice, Music, Animations } = window.MR;
  const screenEl = document.getElementById("screen");

  const TEACH_KEY = "mathRaccoon::v1:teach";

  // ---------- state ----------
  function readState() {
    try { return JSON.parse(localStorage.getItem(TEACH_KEY)) || { completed: [], lastKey: null }; }
    catch (e) { return { completed: [], lastKey: null }; }
  }
  function writeState(patch) {
    const next = { ...readState(), ...patch };
    try { localStorage.setItem(TEACH_KEY, JSON.stringify(next)); } catch (e) {}
    return next;
  }
  function markCompleted(key) {
    const s = readState();
    if (!s.completed.includes(key)) s.completed.push(key);
    writeState({ completed: s.completed, lastKey: key });
  }

  // ---------- DOM helper ----------
  function h(tag, attrs = {}, children = []) {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === "class") el.className = v;
      else if (k === "style") el.setAttribute("style", v);
      else if (k.startsWith("on") && typeof v === "function") el.addEventListener(k.slice(2), v);
      else if (k === "html") el.innerHTML = v;
      else if (v !== false && v != null) el.setAttribute(k, v);
    }
    for (const c of [].concat(children)) {
      if (c == null) continue;
      el.append(typeof c === "string" ? document.createTextNode(c) : c);
    }
    return el;
  }

  function speak(text) {
    if (Voice && Voice.isOn()) Voice.speak(text, { replace: true });
  }

  function clearScreen() { screenEl.innerHTML = ""; }

  // ========================================================================
  // VISUAL WIDGETS
  // ------------------------------------------------------------------------
  // Each widget returns an element (or HTML string wrapped in a div) that
  // visualises part of a lesson. They're deliberately small, pastel, and
  // styled via .teach-viz classes in teach.css.
  // ========================================================================

  // Row of circles/acorns with some optionally highlighted.
  // `marked` is an object: { 0..a-1: 'a', a..a+b-1: 'b', currentIdx: N for hop-highlight }
  function vizCountingBeads({ count, split = null, highlightIdx = -1, emoji = "🌰" }) {
    const items = [];
    for (let i = 0; i < count; i++) {
      let cls = "bead";
      if (split != null) cls += i < split ? " bead-a" : " bead-b";
      if (highlightIdx === i) cls += " bead-pop";
      items.push(`<span class="${cls}">${emoji}</span>`);
    }
    return h("div", {
      class: "teach-viz teach-beads",
      html: items.join(""),
    });
  }

  // Number line from `min` to `max`, with a raccoon token at `at`.
  // `hops` is an array of numbers (where the arrows point). `visited` is
  // the set of numbers already hopped through.
  function vizNumberLine({ min, max, at, hops = [], visited = [], label = null, dir = "up" }) {
    const width = 520;
    const pad = 28;
    const step = (width - pad * 2) / (max - min);
    const ticks = [];
    for (let v = min; v <= max; v++) {
      const x = pad + (v - min) * step;
      const isCur = v === at;
      const isVisited = visited.includes(v);
      ticks.push(`<g transform="translate(${x} 0)">
        <line x1="0" y1="44" x2="0" y2="58" stroke="${isCur ? "#a78bfa" : "#c4b5fd"}" stroke-width="${isCur ? 3 : 2}"/>
        <text x="0" y="76" text-anchor="middle" font-family="Fredoka, sans-serif"
              font-size="14" font-weight="700"
              fill="${isCur ? "#a78bfa" : isVisited ? "#6b5b95" : "#9a8bbf"}">${v}</text>
      </g>`);
    }
    const hopArcs = hops.map((hopTo) => {
      const fromIdx = Math.max(0, hops.indexOf(hopTo) - 1 >= 0 ? hops[hops.indexOf(hopTo) - 1] : at - (dir === "up" ? hops.length : -hops.length));
      // Simpler: draw an arc from (hopTo-1) or (hopTo+1) to hopTo depending on direction
      const from = dir === "up" ? hopTo - 1 : hopTo + 1;
      const fx = pad + (from - min) * step;
      const tx = pad + (hopTo - min) * step;
      const mx = (fx + tx) / 2;
      return `<path d="M${fx} 44 Q ${mx} 4 ${tx} 44" stroke="#ff7a93" stroke-width="2.5"
               fill="none" stroke-dasharray="4 4" stroke-linecap="round"/>
               <polygon points="${tx - 4},44 ${tx + 4},44 ${tx},52" fill="#ff7a93"/>`;
    }).join("");
    const marker = at != null ? `<g transform="translate(${pad + (at - min) * step} 22)">
       <circle r="16" fill="#fff" stroke="#a78bfa" stroke-width="3"/>
       <text y="6" text-anchor="middle" font-size="18">🦝</text>
     </g>` : "";
    return h("div", {
      class: "teach-viz teach-numline",
      html: `<svg viewBox="0 0 ${width} 92" role="img" aria-label="Number line">
        <line x1="${pad}" y1="44" x2="${width - pad}" y2="44" stroke="#c4b5fd" stroke-width="2"/>
        ${ticks.join("")}
        ${hopArcs}
        ${marker}
        ${label ? `<text x="${width / 2}" y="92" text-anchor="middle" font-family="Nunito, sans-serif"
                    font-size="13" fill="#6b5b95" font-weight="700">${label}</text>` : ""}
      </svg>`,
    });
  }

  // Ten-frame (5x2 grid) with N cells filled.
  function vizTenFrame({ filled, fillColor = "#a78bfa", label = null, overflow = 0 }) {
    const cells = [];
    const cell = 38, gap = 4;
    for (let r = 0; r < 2; r++) {
      for (let c = 0; c < 5; c++) {
        const idx = r * 5 + c;
        const isFilled = idx < filled;
        const x = c * (cell + gap), y = r * (cell + gap);
        cells.push(`<rect x="${x}" y="${y}" width="${cell}" height="${cell}" rx="6"
          fill="${isFilled ? fillColor : "#fff"}" stroke="#c4b5fd" stroke-width="2"/>`);
        if (isFilled) cells.push(`<circle cx="${x + cell / 2}" cy="${y + cell / 2}" r="8" fill="#fff" opacity="0.4"/>`);
      }
    }
    const extras = [];
    for (let i = 0; i < overflow; i++) {
      extras.push(`<circle cx="${5 * (cell + gap) + 20 + i * 22}" cy="${cell}" r="10" fill="#ff7a93"/>`);
    }
    const w = 5 * (cell + gap) + (overflow ? 20 + overflow * 22 : 0);
    return h("div", {
      class: "teach-viz teach-tenframe",
      html: `<svg viewBox="0 0 ${w} ${2 * (cell + gap) + 20}" role="img" aria-label="Ten frame with ${filled} filled">
        ${cells.join("")}
        ${extras.join("")}
        ${label ? `<text x="${w / 2}" y="${2 * (cell + gap) + 16}" text-anchor="middle"
                    font-family="Fredoka, sans-serif" font-size="14" font-weight="700"
                    fill="#6b5b95">${label}</text>` : ""}
      </svg>`,
    });
  }

  // Two ten-frames side by side (for "make a ten" lessons).
  function vizTwoTenFrames({ aFilled, bFilled, flowAmount = 0, aLabel = "", bLabel = "" }) {
    return h("div", { class: "teach-viz teach-tenframes-pair" }, [
      vizTenFrame({ filled: aFilled, fillColor: "#a78bfa", label: aLabel }),
      h("span", { class: "teach-plus-sign" }, "+"),
      vizTenFrame({ filled: bFilled, fillColor: "#ff7a93", label: bLabel }),
    ]);
  }

  // Place-value blocks: tens (tall rods) and ones (small cubes).
  function vizPlaceValueBlocks({ tens, ones, label = null, accent = "#a78bfa" }) {
    const rod = `<rect width="14" height="80" rx="3" fill="${accent}" stroke="#6b5b95" stroke-width="1.5"/>`;
    const cube = `<rect width="14" height="14" rx="2" fill="#ff7a93" stroke="#6b5b95" stroke-width="1"/>`;
    const rods = [];
    for (let i = 0; i < tens; i++) {
      rods.push(`<g transform="translate(${i * 20} 0)">${rod}</g>`);
    }
    const cubes = [];
    for (let i = 0; i < ones; i++) {
      const col = i % 5, row = Math.floor(i / 5);
      cubes.push(`<g transform="translate(${tens * 20 + 16 + col * 18} ${row * 18 + 51})">${cube}</g>`);
    }
    const w = tens * 20 + (ones ? 16 + Math.min(ones, 5) * 18 : 0) + 10;
    const h_ = 110;
    return h("div", {
      class: "teach-viz teach-place-blocks",
      html: `<svg viewBox="0 0 ${Math.max(w, 100)} ${h_}" role="img" aria-label="${tens} tens and ${ones} ones">
        ${rods.join("")}
        ${cubes.join("")}
        ${label ? `<text x="${Math.max(w, 100) / 2}" y="${h_ - 2}" text-anchor="middle"
                    font-family="Fredoka, sans-serif" font-size="14" font-weight="700"
                    fill="#6b5b95">${label}</text>` : ""}
      </svg>`,
    });
  }

  // Dot array (rows × cols) — for multiplication as an array.
  function vizArray({ rows, cols, highlightRow = -1, highlightCol = -1, label = null }) {
    const r = 10, gap = 22;
    const dots = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const isHilite = row === highlightRow || col === highlightCol;
        dots.push(`<circle cx="${col * gap + 14}" cy="${row * gap + 14}" r="${r}"
          fill="${isHilite ? "#ff7a93" : "#a78bfa"}"
          stroke="${isHilite ? "#6b5b95" : "none"}" stroke-width="1.5"/>`);
      }
    }
    const w = cols * gap + 10, h_ = rows * gap + 28;
    return h("div", {
      class: "teach-viz teach-array",
      html: `<svg viewBox="0 0 ${w} ${h_}" role="img" aria-label="${rows} by ${cols} array">
        ${dots.join("")}
        ${label ? `<text x="${w / 2}" y="${h_ - 2}" text-anchor="middle"
                    font-family="Fredoka, sans-serif" font-size="14" font-weight="700"
                    fill="#6b5b95">${label}</text>` : ""}
      </svg>`,
    });
  }

  // Grouped items (N baskets × M items each).
  function vizGroups({ groups, perGroup, emoji = "🫐", container = "🧺", label = null }) {
    const cards = [];
    for (let g = 0; g < groups; g++) {
      const items = Array(perGroup).fill(emoji).join("");
      cards.push(`<div class="teach-group-card">
        <div class="teach-group-basket">${container}</div>
        <div class="teach-group-items">${items}</div>
      </div>`);
    }
    return h("div", {
      class: "teach-viz teach-groups",
      html: cards.join("") + (label ? `<div class="teach-viz-caption">${label}</div>` : ""),
    });
  }

  // Sharing visualization — N friends, items distributed to each.
  function vizSharing({ friends, itemsPerFriend, inProgress = null, emoji = "🍪" }) {
    // inProgress: number of items dealt so far (one at a time)
    const total = friends * itemsPerFriend;
    const dealt = inProgress != null ? inProgress : total;
    const cols = [];
    for (let f = 0; f < friends; f++) {
      const owned = [];
      for (let i = 0; i < itemsPerFriend; i++) {
        const globalIdx = i * friends + f; // deal in round-robin
        if (globalIdx < dealt) owned.push(emoji);
      }
      cols.push(`<div class="teach-share-col">
        <div class="teach-share-friend">🦝</div>
        <div class="teach-share-items">${owned.join("")}</div>
        <div class="teach-share-count">${owned.length}</div>
      </div>`);
    }
    // Pile of undealt items at the bottom
    const remaining = total - dealt;
    const pile = Array(remaining).fill(emoji).join("");
    return h("div", {
      class: "teach-viz teach-sharing",
      html: `<div class="teach-share-row">${cols.join("")}</div>
        ${remaining > 0 ? `<div class="teach-share-pile"><span class="teach-share-pile-label">Still to share:</span> ${pile}</div>` : `<div class="teach-share-done">All shared!</div>`}`,
    });
  }

  // Column-stack addition/subtraction visual, optionally showing a carry/borrow.
  function vizColumnStack({ a, b, op = "+", step = 0, answer = null }) {
    // Pads numbers to 2 digits for Grade 3-4 examples.
    const aS = String(a).padStart(2, " ");
    const bS = String(b).padStart(2, " ");

    const ansT = answer != null ? String(answer).padStart(2, " ") : "  ";
    const carry = step >= 1 && op === "+" && (a % 10 + b % 10) >= 10 ? "1" : "";
    const borrow = step >= 1 && op === "-" && (a % 10) < (b % 10);

    // Build a simple table of digit cells
    const td = (t, extra = "") => `<td class="teach-col-digit ${extra}">${t}</td>`;
    const empty = `<td class="teach-col-digit"></td>`;

    const carryRow = `<tr class="teach-col-carry">
      ${empty}
      <td class="teach-col-digit teach-col-small">${carry || (borrow ? "✱" : "")}</td>
      ${empty}
    </tr>`;

    const rowA = `<tr>${empty}${td(aS[0] === " " ? "" : aS[0])}${td(aS[1])}</tr>`;
    const rowB = `<tr>${td(op)}${td(bS[0] === " " ? "" : bS[0])}${td(bS[1])}</tr>`;
    const bar  = `<tr><td colspan="3"><div class="teach-col-bar"></div></td></tr>`;
    const rowAns = `<tr>${empty}${td(ansT[0] === " " ? "" : ansT[0])}${td(ansT[1])}</tr>`;

    return h("div", {
      class: "teach-viz teach-column",
      html: `<table class="teach-col-table">
        ${carryRow}${rowA}${rowB}${bar}${rowAns}
      </table>`,
    });
  }

  // Repeated addition: "4 + 4 + 4"
  function vizRepeatedAddition({ value, times, accumulator = null }) {
    const parts = [];
    for (let i = 0; i < times; i++) {
      parts.push(`<span class="teach-rep-term">${value}</span>`);
      if (i < times - 1) parts.push(`<span class="teach-rep-plus">+</span>`);
    }
    const eq = accumulator != null
      ? `<span class="teach-rep-eq">=</span><span class="teach-rep-total">${accumulator}</span>`
      : "";
    return h("div", { class: "teach-viz teach-repeated", html: parts.join("") + eq });
  }

  // Fact-family diamond: 3 × 4 = 12 with the three paired facts.
  function vizFactFamily({ a, b, product, op = "×" }) {
    const isAdd = op === "+";
    const fwd = isAdd ? "+" : "×";
    const inv = isAdd ? "−" : "÷";
    return h("div", { class: "teach-viz teach-factfamily" }, [
      h("div", { class: "teach-ff-sun" }, String(product)),
      h("div", { class: "teach-ff-rays" }, [
        h("div", { class: "teach-ff-ray" }, `${a} ${fwd} ${b} = ${product}`),
        h("div", { class: "teach-ff-ray" }, `${b} ${fwd} ${a} = ${product}`),
        h("div", { class: "teach-ff-ray" }, `${product} ${inv} ${a} = ${b}`),
        h("div", { class: "teach-ff-ray" }, `${product} ${inv} ${b} = ${a}`),
      ]),
    ]);
  }

  // Equation line that highlights a specific part (e.g., step focus).
  function vizEquationLine(parts) {
    // parts: [{text, cls?}]
    return h("div", { class: "teach-viz teach-equation" },
      parts.map((p) => h("span", { class: "teach-eq-part " + (p.cls || "") }, p.text)),
    );
  }

  function vizFractionBar({ num, den, label = null, color = "#ff9fb3", mark = null, showNumLabel = true }) {
    const W = 320, H = 52, PAD = 2;
    const partW = (W - PAD * 2) / den;
    const parts = [];
    for (let i = 0; i < den; i++) {
      const x = PAD + i * partW;
      parts.push(`<rect x="${x}" y="0" width="${partW - 1}" height="${H}" rx="3"
        fill="${i < num ? color : "#fff"}" stroke="#6b5b95" stroke-width="2"/>`);
    }
    let markLine = "";
    if (mark === "half") {
      const hx = PAD + (den / 2) * partW;
      markLine = `<line x1="${hx}" y1="-6" x2="${hx}" y2="${H + 6}" stroke="#a78bfa"
        stroke-width="2.5" stroke-dasharray="5,3" stroke-linecap="round"/>
        <text x="${hx}" y="-10" text-anchor="middle" font-family="Fredoka, sans-serif"
              font-size="12" font-weight="700" fill="#a78bfa">½</text>`;
    }
    const labelY = H + 22;
    const leftLabel = showNumLabel ? `<text x="-8" y="${H / 2 + 6}" text-anchor="end"
      font-family="Fredoka, sans-serif" font-size="22" font-weight="700" fill="#3a2e5f">${num}/${den}</text>` : "";
    const bottomLabel = label ? `<text x="${W / 2}" y="${labelY}" text-anchor="middle"
      font-family="Nunito, sans-serif" font-size="13" fill="#6b5b95" font-weight="700">${label}</text>` : "";
    const leftPad = showNumLabel ? 64 : 4;
    return h("div", {
      class: "teach-viz teach-fracbar",
      html: `<svg viewBox="${-leftPad} -24 ${W + leftPad + 8} ${H + (label ? 36 : 12) + 24}"
        role="img" aria-label="${num} out of ${den}">
        ${leftLabel}
        ${parts.join("")}
        ${markLine}
        ${bottomLabel}
      </svg>`,
    });
  }

  function vizFractionCompare({ a, b, relation = null, labels = null, colorA = "#ff9fb3", colorB = "#7dd3fc", mark = null }) {
    // relation: "<", ">", "=", or null to hide
    const rel = relation
      ? h("div", { class: "teach-fc-rel" }, relation)
      : null;
    return h("div", { class: "teach-viz teach-fraccompare" }, [
      vizFractionBar({ num: a.num, den: a.den, color: colorA, label: labels ? labels[0] : null, mark }),
      rel || h("div", { class: "teach-fc-rel teach-fc-rel-blank" }, "?"),
      vizFractionBar({ num: b.num, den: b.den, color: colorB, label: labels ? labels[1] : null, mark }),
    ]);
  }

  // ========================================================================
  // LESSON DATA
  // ------------------------------------------------------------------------
  // Pedagogy notes in the structure:
  //  - hook: a story/context sentence (concrete)
  //  - metaphor: the "mental picture" that makes the strategy click
  //  - why: why this strategy works (metacognition)
  //  - watch[]: steps of a single worked example; each step has text + viz
  //  - practice[]: 1–2 scaffolded problems with answer options + hint
  // ========================================================================

  const LESSONS = {
    addition: {
      id: "addition",
      title: "Addition",
      verb: "add",
      emoji: "➕",
      accent: "#6ee7b7",
      intro: "Addition means putting groups together. Math Raccoon knows lots of ways to do it — pick one to try!",
      raccoonHook: "Let's add!",
      strategies: [
        {
          id: "count-on",
          title: "Count On",
          emoji: "🔢",
          tagline: "Start from the biggest — then count up.",
          grade: "Warm-up",
          idea: {
            story: "Rocky has 8 acorns in his basket. Ricky drops in 3 more.",
            question: "How many acorns now?",
            metaphor: "You don't have to count all of them again. Start at 8 — then say the next numbers: 9… 10… 11!",
            why: "Counting what you already know is a waste of time. Start where you are.",
            viz: () => vizCountingBeads({ count: 11, split: 8, emoji: "🌰" }),
          },
          watch: {
            equation: "8 + 3 = ?",
            steps: [
              { say: "Start with the bigger number: 8.",
                viz: () => vizNumberLine({ min: 5, max: 13, at: 8, label: "We start at 8" }) },
              { say: "Count up one: 9.",
                viz: () => vizNumberLine({ min: 5, max: 13, at: 9, visited: [8], hops: [9], label: "Hop! 9" }) },
              { say: "Count up one more: 10.",
                viz: () => vizNumberLine({ min: 5, max: 13, at: 10, visited: [8, 9], hops: [9, 10], label: "Hop! 10" }) },
              { say: "And one more: 11.",
                viz: () => vizNumberLine({ min: 5, max: 13, at: 11, visited: [8, 9, 10], hops: [9, 10, 11], label: "Hop! 11" }) },
              { say: "So 8 + 3 = 11. We counted on!",
                viz: () => vizEquationLine([
                  { text: "8" }, { text: " + " }, { text: "3" }, { text: " = " }, { text: "11", cls: "teach-eq-answer" },
                ]) },
            ],
          },
          practice: [
            {
              prompt: "Try it! 7 + 4 = ?",
              a: 7, b: 4, op: "+", answer: 11,
              options: [10, 11, 12, 13],
              hint: "Start at 7. Count up four times: 8… 9… 10… 11!",
              viz: () => vizNumberLine({ min: 5, max: 13, at: 7 }),
            },
            {
              prompt: "Your turn! 6 + 5 = ?",
              a: 6, b: 5, op: "+", answer: 11,
              options: [10, 11, 12, 14],
              hint: "Start at 6. Count up five times: 7, 8, 9, 10, 11.",
              viz: () => vizNumberLine({ min: 4, max: 13, at: 6 }),
            },
          ],
        },

        {
          id: "make-ten",
          title: "Make a Ten",
          emoji: "🔟",
          tagline: "Fill up to ten first — then add what's left.",
          grade: "Grade 3",
          idea: {
            story: "Math Raccoon loves groups of 10. It's like filling a little box.",
            question: "8 + 5 = ?",
            metaphor: "Split the 5 into two pieces: 2 fills the box up to 10, and 3 is left over. Then you have 10 + 3 — easy!",
            why: "Tens are the friendliest numbers to add. If you can make a ten, the rest is just extra.",
            viz: () => vizTwoTenFrames({ aFilled: 8, bFilled: 5, aLabel: "8", bLabel: "5" }),
          },
          watch: {
            equation: "8 + 5 = ?",
            steps: [
              { say: "Start with 8 and 5 in two boxes.",
                viz: () => vizTwoTenFrames({ aFilled: 8, bFilled: 5, aLabel: "8", bLabel: "5" }) },
              { say: "How many more does the first box need to be full? 2!",
                viz: () => vizTwoTenFrames({ aFilled: 8, bFilled: 5, aLabel: "8 (+2 to fill)", bLabel: "5" }) },
              { say: "Move 2 over — now the first box is 10, and we have 3 left.",
                viz: () => vizTwoTenFrames({ aFilled: 10, bFilled: 3, aLabel: "10", bLabel: "3" }) },
              { say: "10 + 3 is easy: 13!",
                viz: () => vizEquationLine([
                  { text: "10" }, { text: " + " }, { text: "3" }, { text: " = " }, { text: "13", cls: "teach-eq-answer" },
                ]) },
              { say: "So 8 + 5 = 13. Make a ten!",
                viz: () => vizEquationLine([
                  { text: "8" }, { text: " + " }, { text: "5" }, { text: " = " }, { text: "13", cls: "teach-eq-answer" },
                ]) },
            ],
          },
          practice: [
            {
              prompt: "Try it! 9 + 4 = ?",
              a: 9, b: 4, op: "+", answer: 13,
              options: [11, 12, 13, 14],
              hint: "9 needs 1 more to make 10. So 9 + 4 = 10 + 3 = 13.",
              viz: () => vizTwoTenFrames({ aFilled: 9, bFilled: 4, aLabel: "9", bLabel: "4" }),
            },
            {
              prompt: "Your turn! 7 + 6 = ?",
              a: 7, b: 6, op: "+", answer: 13,
              options: [12, 13, 14, 15],
              hint: "7 needs 3 to make 10. Break the 6 into 3 and 3. So 7 + 6 = 10 + 3 = 13.",
              viz: () => vizTwoTenFrames({ aFilled: 7, bFilled: 6, aLabel: "7", bLabel: "6" }),
            },
          ],
        },

        {
          id: "break-apart",
          title: "Break Apart",
          emoji: "🧩",
          tagline: "Split each number into tens and ones. Add each part.",
          grade: "Grade 3",
          idea: {
            story: "24 + 35 feels big. But you can chop each number into tens and ones.",
            question: "24 + 35 = ?",
            metaphor: "24 is 2 rods of 10 and 4 little cubes. 35 is 3 rods and 5 cubes. Add rods together, cubes together, then put them back.",
            why: "Little numbers are easier to add in your head than big ones.",
            viz: () => vizPlaceValueBlocks({ tens: 2, ones: 4, label: "24" }),
          },
          watch: {
            equation: "24 + 35 = ?",
            steps: [
              { say: "24 is 2 tens and 4 ones.",
                viz: () => vizPlaceValueBlocks({ tens: 2, ones: 4, label: "24 = 20 + 4" }) },
              { say: "35 is 3 tens and 5 ones.",
                viz: () => vizPlaceValueBlocks({ tens: 3, ones: 5, label: "35 = 30 + 5" }) },
              { say: "Add the tens: 20 + 30 = 50.",
                viz: () => vizPlaceValueBlocks({ tens: 5, ones: 0, label: "20 + 30 = 50" }) },
              { say: "Add the ones: 4 + 5 = 9.",
                viz: () => vizPlaceValueBlocks({ tens: 0, ones: 9, label: "4 + 5 = 9", accent: "#ff7a93" }) },
              { say: "Put them back together: 50 + 9 = 59.",
                viz: () => vizPlaceValueBlocks({ tens: 5, ones: 9, label: "50 + 9 = 59" }) },
              { say: "So 24 + 35 = 59!",
                viz: () => vizEquationLine([
                  { text: "24" }, { text: " + " }, { text: "35" }, { text: " = " }, { text: "59", cls: "teach-eq-answer" },
                ]) },
            ],
          },
          practice: [
            {
              prompt: "Try it! 13 + 25 = ?",
              a: 13, b: 25, op: "+", answer: 38,
              options: [37, 38, 39, 48],
              hint: "Tens: 10 + 20 = 30. Ones: 3 + 5 = 8. Together: 30 + 8 = 38.",
              viz: () => vizPlaceValueBlocks({ tens: 1, ones: 3, label: "13" }),
            },
            {
              prompt: "Your turn! 42 + 36 = ?",
              a: 42, b: 36, op: "+", answer: 78,
              options: [68, 78, 88, 76],
              hint: "Tens: 40 + 30 = 70. Ones: 2 + 6 = 8. Together: 70 + 8 = 78.",
              viz: () => vizPlaceValueBlocks({ tens: 4, ones: 2, label: "42" }),
            },
          ],
        },

        {
          id: "column-regroup",
          title: "Column Method",
          emoji: "📊",
          tagline: "Stack them up. Add ones, then tens — carry if needed.",
          grade: "Grade 3–4",
          idea: {
            story: "When the numbers get bigger, we write them one above the other, like a tower.",
            question: "27 + 18 = ?",
            metaphor: "Line up the ones above ones, tens above tens. Add the ones column first. If it's 10 or more, carry a 1 to the tens column.",
            why: "Stacking keeps place values tidy — you won't mix up tens and ones.",
            viz: () => vizColumnStack({ a: 27, b: 18, op: "+", step: 0 }),
          },
          watch: {
            equation: "27 + 18 = ?",
            steps: [
              { say: "Stack them: 27 on top, 18 below. Ones over ones, tens over tens.",
                viz: () => vizColumnStack({ a: 27, b: 18, op: "+", step: 0 }) },
              { say: "Add the ones column: 7 + 8 = 15. That's more than 9, so we carry a 1.",
                viz: () => vizColumnStack({ a: 27, b: 18, op: "+", step: 1, answer: 5 }) },
              { say: "Write the 5, carry the 1 to the tens column.",
                viz: () => vizColumnStack({ a: 27, b: 18, op: "+", step: 1, answer: 5 }) },
              { say: "Add the tens: 1 (carried) + 2 + 1 = 4.",
                viz: () => vizColumnStack({ a: 27, b: 18, op: "+", step: 1, answer: 45 }) },
              { say: "So 27 + 18 = 45!",
                viz: () => vizEquationLine([
                  { text: "27" }, { text: " + " }, { text: "18" }, { text: " = " }, { text: "45", cls: "teach-eq-answer" },
                ]) },
            ],
          },
          practice: [
            {
              prompt: "Try it! 37 + 15 = ?",
              a: 37, b: 15, op: "+", answer: 52,
              options: [42, 52, 62, 51],
              hint: "Ones: 7 + 5 = 12. Write 2, carry 1. Tens: 1 + 3 + 1 = 5. Answer: 52.",
              viz: () => vizColumnStack({ a: 37, b: 15, op: "+" }),
            },
            {
              prompt: "Your turn! 48 + 26 = ?",
              a: 48, b: 26, op: "+", answer: 74,
              options: [64, 74, 84, 72],
              hint: "Ones: 8 + 6 = 14. Write 4, carry 1. Tens: 1 + 4 + 2 = 7. Answer: 74.",
              viz: () => vizColumnStack({ a: 48, b: 26, op: "+" }),
            },
          ],
        },
      ],
    },

    subtraction: {
      id: "subtraction",
      title: "Subtraction",
      verb: "subtract",
      emoji: "➖",
      accent: "#7dd3fc",
      intro: "Subtraction means taking some away — or finding the difference between two numbers. Let's learn different ways!",
      raccoonHook: "Let's take apart!",
      strategies: [
        {
          id: "count-back",
          title: "Count Back",
          emoji: "⏪",
          tagline: "Start at the total — hop backwards.",
          grade: "Warm-up",
          idea: {
            story: "Tuck the hedgehog has 9 coins. He spends 4 at the market.",
            question: "How many coins are left?",
            metaphor: "Start at 9 and hop backward: 8, 7, 6, 5. Each hop is one coin spent.",
            why: "You already know where you started. Walking back is easier than starting over.",
            viz: () => vizNumberLine({ min: 0, max: 10, at: 9 }),
          },
          watch: {
            equation: "9 − 4 = ?",
            steps: [
              { say: "Start at 9 — that's the total.",
                viz: () => vizNumberLine({ min: 0, max: 10, at: 9, label: "Start: 9" }) },
              { say: "Hop back one: 8.",
                viz: () => vizNumberLine({ min: 0, max: 10, at: 8, visited: [9], hops: [8], dir: "down" }) },
              { say: "Back again: 7.",
                viz: () => vizNumberLine({ min: 0, max: 10, at: 7, visited: [9, 8], hops: [8, 7], dir: "down" }) },
              { say: "Back: 6.",
                viz: () => vizNumberLine({ min: 0, max: 10, at: 6, visited: [9, 8, 7], hops: [8, 7, 6], dir: "down" }) },
              { say: "Last hop: 5.",
                viz: () => vizNumberLine({ min: 0, max: 10, at: 5, visited: [9, 8, 7, 6], hops: [8, 7, 6, 5], dir: "down", label: "We hopped back 4 times" }) },
              { say: "So 9 − 4 = 5!",
                viz: () => vizEquationLine([
                  { text: "9" }, { text: " − " }, { text: "4" }, { text: " = " }, { text: "5", cls: "teach-eq-answer" },
                ]) },
            ],
          },
          practice: [
            {
              prompt: "Try it! 10 − 3 = ?",
              a: 10, b: 3, op: "−", answer: 7,
              options: [6, 7, 8, 13],
              hint: "Start at 10. Hop back 3: 9, 8, 7.",
              viz: () => vizNumberLine({ min: 4, max: 11, at: 10 }),
            },
            {
              prompt: "Your turn! 12 − 5 = ?",
              a: 12, b: 5, op: "−", answer: 7,
              options: [5, 7, 8, 9],
              hint: "Start at 12. Hop back 5 times: 11, 10, 9, 8, 7.",
              viz: () => vizNumberLine({ min: 5, max: 13, at: 12 }),
            },
          ],
        },

        {
          id: "count-up",
          title: "Count Up (Find the Gap)",
          emoji: "🪜",
          tagline: "Count UP from the smaller to the bigger. The jumps are your answer.",
          grade: "Grade 3",
          idea: {
            story: "You're on step 6 of a tall ladder. The top is step 14.",
            question: "How many steps until you're at the top?",
            metaphor: "Don't count back from 14. Count UP from 6: 7, 8, 9, 10, 11, 12, 13, 14. That's 8 steps!",
            why: "Sometimes counting up is easier than counting down — especially when the gap is small.",
            viz: () => vizNumberLine({ min: 4, max: 16, at: 6, label: "Going up to 14" }),
          },
          watch: {
            equation: "14 − 6 = ?",
            steps: [
              { say: "Start at the smaller number: 6.",
                viz: () => vizNumberLine({ min: 4, max: 16, at: 6, label: "Start: 6" }) },
              { say: "Hop up: 7, 8, 9, 10. That's 4 jumps so far.",
                viz: () => vizNumberLine({ min: 4, max: 16, at: 10, visited: [6, 7, 8, 9], hops: [7, 8, 9, 10], label: "4 hops" }) },
              { say: "Keep hopping: 11, 12, 13, 14. That's 4 more.",
                viz: () => vizNumberLine({ min: 4, max: 16, at: 14, visited: [6, 7, 8, 9, 10, 11, 12, 13], hops: [11, 12, 13, 14], label: "8 hops total" }) },
              { say: "We hopped 8 times. So the gap is 8.",
                viz: () => vizEquationLine([
                  { text: "14" }, { text: " − " }, { text: "6" }, { text: " = " }, { text: "8", cls: "teach-eq-answer" },
                ]) },
            ],
          },
          practice: [
            {
              prompt: "Try it! 15 − 7 = ?",
              a: 15, b: 7, op: "−", answer: 8,
              options: [7, 8, 9, 22],
              hint: "From 7 to 15: 8, 9, 10, 11, 12, 13, 14, 15. Eight hops.",
              viz: () => vizNumberLine({ min: 5, max: 16, at: 7 }),
            },
            {
              prompt: "Your turn! 20 − 13 = ?",
              a: 20, b: 13, op: "−", answer: 7,
              options: [5, 6, 7, 8],
              hint: "From 13 to 20: 14, 15, 16, 17, 18, 19, 20. Seven hops.",
              viz: () => vizNumberLine({ min: 11, max: 21, at: 13 }),
            },
          ],
        },

        {
          id: "break-apart-sub",
          title: "Break Apart",
          emoji: "🧩",
          tagline: "Subtract tens first, then ones.",
          grade: "Grade 3",
          idea: {
            story: "46 − 23 looks tricky — but you can split it into smaller steps.",
            question: "46 − 23 = ?",
            metaphor: "Take away 2 tens first (46 − 20 = 26). Then take away 3 ones (26 − 3 = 23). Easy!",
            why: "You're never dealing with more than one part at a time.",
            viz: () => vizPlaceValueBlocks({ tens: 4, ones: 6, label: "46" }),
          },
          watch: {
            equation: "46 − 23 = ?",
            steps: [
              { say: "Start with 46.",
                viz: () => vizPlaceValueBlocks({ tens: 4, ones: 6, label: "46" }) },
              { say: "Take away 2 tens first: 46 − 20 = 26.",
                viz: () => vizPlaceValueBlocks({ tens: 2, ones: 6, label: "46 − 20 = 26" }) },
              { say: "Now take away 3 ones: 26 − 3 = 23.",
                viz: () => vizPlaceValueBlocks({ tens: 2, ones: 3, label: "26 − 3 = 23" }) },
              { say: "So 46 − 23 = 23!",
                viz: () => vizEquationLine([
                  { text: "46" }, { text: " − " }, { text: "23" }, { text: " = " }, { text: "23", cls: "teach-eq-answer" },
                ]) },
            ],
          },
          practice: [
            {
              prompt: "Try it! 58 − 24 = ?",
              a: 58, b: 24, op: "−", answer: 34,
              options: [24, 34, 44, 32],
              hint: "58 − 20 = 38. Then 38 − 4 = 34.",
              viz: () => vizPlaceValueBlocks({ tens: 5, ones: 8, label: "58" }),
            },
            {
              prompt: "Your turn! 67 − 35 = ?",
              a: 67, b: 35, op: "−", answer: 32,
              options: [22, 32, 42, 30],
              hint: "67 − 30 = 37. Then 37 − 5 = 32.",
              viz: () => vizPlaceValueBlocks({ tens: 6, ones: 7, label: "67" }),
            },
          ],
        },

        {
          id: "regroup-borrow",
          title: "Regrouping (Borrowing)",
          emoji: "🔄",
          tagline: "Ones too small? Borrow 10 from the tens column.",
          grade: "Grade 3–4",
          idea: {
            story: "32 − 18. Line them up and… uh oh — the top ones (2) are smaller than the bottom ones (8).",
            question: "32 − 18 = ?",
            metaphor: "Trade one of the tens for 10 ones. Now you have 2 tens and 12 ones. Now 12 − 8 is easy!",
            why: "Every ten is just 10 ones in disguise. We can always trade.",
            viz: () => vizColumnStack({ a: 32, b: 18, op: "−", step: 0 }),
          },
          watch: {
            equation: "32 − 18 = ?",
            steps: [
              { say: "Stack them: 32 on top, 18 below.",
                viz: () => vizColumnStack({ a: 32, b: 18, op: "−", step: 0 }) },
              { say: "Ones column: 2 − 8 won't work. 2 is too small. Time to borrow!",
                viz: () => vizColumnStack({ a: 32, b: 18, op: "−", step: 1 }) },
              { say: "Trade 1 ten for 10 ones. Now the top is 2 tens and 12 ones.",
                viz: () => vizPlaceValueBlocks({ tens: 2, ones: 12, label: "32 → 2 tens + 12 ones" }) },
              { say: "Now 12 − 8 = 4 in the ones column.",
                viz: () => vizColumnStack({ a: 32, b: 18, op: "−", step: 1, answer: 4 }) },
              { say: "Tens column: we have 2 tens left. 2 − 1 = 1.",
                viz: () => vizColumnStack({ a: 32, b: 18, op: "−", step: 1, answer: 14 }) },
              { say: "So 32 − 18 = 14!",
                viz: () => vizEquationLine([
                  { text: "32" }, { text: " − " }, { text: "18" }, { text: " = " }, { text: "14", cls: "teach-eq-answer" },
                ]) },
            ],
          },
          practice: [
            {
              prompt: "Try it! 43 − 17 = ?",
              a: 43, b: 17, op: "−", answer: 26,
              options: [24, 26, 36, 34],
              hint: "3 is smaller than 7. Borrow! 13 − 7 = 6. Then 3 − 1 = 2. Answer: 26.",
              viz: () => vizColumnStack({ a: 43, b: 17, op: "−" }),
            },
            {
              prompt: "Your turn! 61 − 25 = ?",
              a: 61, b: 25, op: "−", answer: 36,
              options: [34, 36, 46, 44],
              hint: "1 is smaller than 5. Borrow! 11 − 5 = 6. Then 5 − 2 = 3. Answer: 36.",
              viz: () => vizColumnStack({ a: 61, b: 25, op: "−" }),
            },
          ],
        },
      ],
    },

    multiplication: {
      id: "multiplication",
      title: "Multiplication",
      verb: "multiply",
      emoji: "✖️",
      accent: "#ff7a93",
      intro: "Multiplication is a speedy way to add the same number over and over. There's more than one way to picture it!",
      raccoonHook: "Let's count by groups!",
      strategies: [
        {
          id: "equal-groups",
          title: "Equal Groups",
          emoji: "🧺",
          tagline: "Same-sized groups, counted fast.",
          grade: "Grade 3",
          idea: {
            story: "The beavers packed 3 baskets of blueberries. Each basket has 4 berries.",
            question: "How many blueberries altogether?",
            metaphor: "Three equal groups of four. Instead of counting one by one, count by groups.",
            why: "When groups are all the same size, multiplication is just counting super fast.",
            viz: () => vizGroups({ groups: 3, perGroup: 4, emoji: "🫐" }),
          },
          watch: {
            equation: "3 × 4 = ?",
            steps: [
              { say: "We have 3 baskets. Each has 4 berries.",
                viz: () => vizGroups({ groups: 3, perGroup: 4, emoji: "🫐" }) },
              { say: "First basket: 4 berries.",
                viz: () => vizRepeatedAddition({ value: 4, times: 1 }) },
              { say: "Plus the second: 4 + 4 = 8 berries so far.",
                viz: () => vizRepeatedAddition({ value: 4, times: 2, accumulator: 8 }) },
              { say: "Plus the third: 8 + 4 = 12 berries.",
                viz: () => vizRepeatedAddition({ value: 4, times: 3, accumulator: 12 }) },
              { say: "So 3 × 4 = 12. Three groups of four.",
                viz: () => vizEquationLine([
                  { text: "3" }, { text: " × " }, { text: "4" }, { text: " = " }, { text: "12", cls: "teach-eq-answer" },
                ]) },
            ],
          },
          practice: [
            {
              prompt: "Try it! 2 × 5 = ?",
              a: 2, b: 5, op: "×", answer: 10,
              options: [7, 10, 12, 25],
              hint: "Two groups of five. 5 + 5 = 10.",
              viz: () => vizGroups({ groups: 2, perGroup: 5, emoji: "🍎", container: "🧺" }),
            },
            {
              prompt: "Your turn! 4 × 3 = ?",
              a: 4, b: 3, op: "×", answer: 12,
              options: [7, 9, 12, 15],
              hint: "Four groups of three. 3 + 3 + 3 + 3 = 12.",
              viz: () => vizGroups({ groups: 4, perGroup: 3, emoji: "🫐", container: "🧺" }),
            },
          ],
        },

        {
          id: "arrays",
          title: "Arrays",
          emoji: "🔢",
          tagline: "Rows × columns. A neat grid of dots.",
          grade: "Grade 3",
          idea: {
            story: "The garden has 3 rows of tulips. Each row has 5 tulips.",
            question: "How many tulips?",
            metaphor: "An array is a tidy rectangle of things. Count the rows, count the columns, multiply.",
            why: "Arrays show why multiplication doesn't care about order: 3 × 5 looks the same from either side.",
            viz: () => vizArray({ rows: 3, cols: 5 }),
          },
          watch: {
            equation: "3 × 5 = ?",
            steps: [
              { say: "Here are 3 rows and 5 columns of tulips.",
                viz: () => vizArray({ rows: 3, cols: 5 }) },
              { say: "First row: 5 tulips.",
                viz: () => vizArray({ rows: 3, cols: 5, highlightRow: 0, label: "Row 1: 5" }) },
              { say: "Second row: 5 more. That's 10.",
                viz: () => vizArray({ rows: 3, cols: 5, highlightRow: 1, label: "Rows 1+2: 10" }) },
              { say: "Third row: 5 more. That's 15.",
                viz: () => vizArray({ rows: 3, cols: 5, highlightRow: 2, label: "All 3 rows: 15" }) },
              { say: "So 3 × 5 = 15!",
                viz: () => vizEquationLine([
                  { text: "3" }, { text: " × " }, { text: "5" }, { text: " = " }, { text: "15", cls: "teach-eq-answer" },
                ]) },
            ],
          },
          practice: [
            {
              prompt: "Try it! 2 × 6 = ?",
              a: 2, b: 6, op: "×", answer: 12,
              options: [8, 10, 12, 14],
              hint: "Two rows of six dots. 6 + 6 = 12.",
              viz: () => vizArray({ rows: 2, cols: 6 }),
            },
            {
              prompt: "Your turn! 4 × 4 = ?",
              a: 4, b: 4, op: "×", answer: 16,
              options: [8, 12, 16, 20],
              hint: "Four rows of four. 4 + 4 + 4 + 4 = 16.",
              viz: () => vizArray({ rows: 4, cols: 4 }),
            },
          ],
        },

        {
          id: "repeated-add",
          title: "Repeated Addition",
          emoji: "➕",
          tagline: "Multiplication = adding the same number over and over.",
          grade: "Grade 3",
          idea: {
            story: "4 + 4 + 4. That's three fours, all added up.",
            question: "So… 3 × 4 = ?",
            metaphor: "The × sign means 'groups of'. Every multiplication problem hides an addition problem inside.",
            why: "If you ever forget a multiplication fact, you can always add the number again and again to find it.",
            viz: () => vizRepeatedAddition({ value: 4, times: 3 }),
          },
          watch: {
            equation: "3 × 4 = ?",
            steps: [
              { say: "3 × 4 means 'three groups of four'. Let's write it as addition.",
                viz: () => vizRepeatedAddition({ value: 4, times: 3 }) },
              { say: "4 + 4 = 8.",
                viz: () => vizRepeatedAddition({ value: 4, times: 2, accumulator: 8 }) },
              { say: "Add one more 4: 8 + 4 = 12.",
                viz: () => vizRepeatedAddition({ value: 4, times: 3, accumulator: 12 }) },
              { say: "So 3 × 4 = 4 + 4 + 4 = 12.",
                viz: () => vizEquationLine([
                  { text: "3" }, { text: " × " }, { text: "4" }, { text: " = " }, { text: "12", cls: "teach-eq-answer" },
                ]) },
            ],
          },
          practice: [
            {
              prompt: "Try it! 5 × 3 = ?",
              a: 5, b: 3, op: "×", answer: 15,
              options: [8, 10, 15, 18],
              hint: "Five groups of three: 3 + 3 + 3 + 3 + 3 = 15.",
              viz: () => vizRepeatedAddition({ value: 3, times: 5 }),
            },
            {
              prompt: "Your turn! 2 × 7 = ?",
              a: 2, b: 7, op: "×", answer: 14,
              options: [9, 12, 14, 16],
              hint: "Two groups of seven: 7 + 7 = 14.",
              viz: () => vizRepeatedAddition({ value: 7, times: 2 }),
            },
          ],
        },

        {
          id: "skip-count",
          title: "Skip Counting",
          emoji: "🦘",
          tagline: "Jump the number line by the same amount.",
          grade: "Grade 3",
          idea: {
            story: "Instead of counting 1, 2, 3, 4, 5… let's count by 5s: 5, 10, 15, 20!",
            question: "How far can you go in 4 hops of 5?",
            metaphor: "Skip counting is the raccoon's favorite shortcut — big jumps of the same size.",
            why: "Each hop is one group. Count the hops, and you know how many groups you made.",
            viz: () => vizNumberLine({ min: 0, max: 25, at: 0 }),
          },
          watch: {
            equation: "4 × 5 = ?",
            steps: [
              { say: "Start at 0.",
                viz: () => vizNumberLine({ min: 0, max: 25, at: 0, label: "0" }) },
              { say: "Hop by 5: land on 5.",
                viz: () => vizNumberLine({ min: 0, max: 25, at: 5, visited: [0], hops: [5], label: "1 hop" }) },
              { say: "Hop by 5 again: land on 10.",
                viz: () => vizNumberLine({ min: 0, max: 25, at: 10, visited: [0, 5], hops: [5, 10], label: "2 hops" }) },
              { say: "Again: 15.",
                viz: () => vizNumberLine({ min: 0, max: 25, at: 15, visited: [0, 5, 10], hops: [5, 10, 15], label: "3 hops" }) },
              { say: "Last hop: 20!",
                viz: () => vizNumberLine({ min: 0, max: 25, at: 20, visited: [0, 5, 10, 15], hops: [5, 10, 15, 20], label: "4 hops of 5" }) },
              { say: "4 hops of 5 lands at 20. So 4 × 5 = 20!",
                viz: () => vizEquationLine([
                  { text: "4" }, { text: " × " }, { text: "5" }, { text: " = " }, { text: "20", cls: "teach-eq-answer" },
                ]) },
            ],
          },
          practice: [
            {
              prompt: "Try it! 3 × 5 = ?",
              a: 3, b: 5, op: "×", answer: 15,
              options: [8, 12, 15, 20],
              hint: "Three hops of 5: 5, 10, 15.",
              viz: () => vizNumberLine({ min: 0, max: 20, at: 0 }),
            },
            {
              prompt: "Your turn! 6 × 2 = ?",
              a: 6, b: 2, op: "×", answer: 12,
              options: [8, 10, 12, 14],
              hint: "Six hops of 2: 2, 4, 6, 8, 10, 12.",
              viz: () => vizNumberLine({ min: 0, max: 14, at: 0 }),
            },
          ],
        },
      ],
    },

    division: {
      id: "division",
      title: "Division",
      verb: "divide",
      emoji: "➗",
      accent: "#ffb077",
      intro: "Division is the opposite of multiplication. It's about sharing fairly or splitting into equal groups. Pick a way to try!",
      raccoonHook: "Let's share!",
      strategies: [
        {
          id: "equal-sharing",
          title: "Equal Sharing",
          emoji: "🤝",
          tagline: "One for you, one for you, one for you…",
          grade: "Grade 3",
          idea: {
            story: "Math Raccoon baked 12 cookies. Three friends want to share them equally.",
            question: "How many cookies does each friend get?",
            metaphor: "Deal them out one at a time, like cards. Every friend gets one, then everyone gets another, until the plate is empty.",
            why: "Sharing one-at-a-time always comes out fair. It's how toddlers and math geniuses both solve division.",
            viz: () => vizSharing({ friends: 3, itemsPerFriend: 4, inProgress: 0 }),
          },
          watch: {
            equation: "12 ÷ 3 = ?",
            steps: [
              { say: "Three friends, 12 cookies to share.",
                viz: () => vizSharing({ friends: 3, itemsPerFriend: 4, inProgress: 0 }) },
              { say: "First round: one cookie each. 3 cookies dealt.",
                viz: () => vizSharing({ friends: 3, itemsPerFriend: 4, inProgress: 3 }) },
              { say: "Second round: one cookie each. 6 total.",
                viz: () => vizSharing({ friends: 3, itemsPerFriend: 4, inProgress: 6 }) },
              { say: "Third round: one cookie each. 9 total.",
                viz: () => vizSharing({ friends: 3, itemsPerFriend: 4, inProgress: 9 }) },
              { say: "Last round: 12 total. Everyone has 4 cookies!",
                viz: () => vizSharing({ friends: 3, itemsPerFriend: 4, inProgress: 12 }) },
              { say: "So 12 ÷ 3 = 4.",
                viz: () => vizEquationLine([
                  { text: "12" }, { text: " ÷ " }, { text: "3" }, { text: " = " }, { text: "4", cls: "teach-eq-answer" },
                ]) },
            ],
          },
          practice: [
            {
              prompt: "Try it! 8 ÷ 2 = ?",
              a: 8, b: 2, op: "÷", answer: 4,
              options: [2, 4, 6, 10],
              hint: "Two friends share 8. Deal: 1-1, 2-2, 3-3, 4-4. Each gets 4.",
              viz: () => vizSharing({ friends: 2, itemsPerFriend: 4, inProgress: 0 }),
            },
            {
              prompt: "Your turn! 10 ÷ 5 = ?",
              a: 10, b: 5, op: "÷", answer: 2,
              options: [1, 2, 3, 5],
              hint: "Five friends share 10. First round: 5 given. Second round: 10 given. Each gets 2.",
              viz: () => vizSharing({ friends: 5, itemsPerFriend: 2, inProgress: 0 }),
            },
          ],
        },

        {
          id: "equal-grouping",
          title: "Equal Grouping",
          emoji: "📦",
          tagline: "How many groups of the same size can you make?",
          grade: "Grade 3",
          idea: {
            story: "Math Raccoon has 12 cookies. They go into bags of 4.",
            question: "How many bags will he need?",
            metaphor: "Pack 4 cookies per bag. Keep packing until the plate is empty. Count your bags.",
            why: "This is just a different question than sharing. Here we know the group size; we're finding the number of groups.",
            viz: () => vizGroups({ groups: 3, perGroup: 4, emoji: "🍪", container: "🛍️" }),
          },
          watch: {
            equation: "12 ÷ 4 = ?",
            steps: [
              { say: "12 cookies on the plate. Pack them into bags of 4.",
                viz: () => vizGroups({ groups: 0, perGroup: 4, emoji: "🍪", container: "🛍️" }) },
              { say: "First bag: 4 cookies. 8 left.",
                viz: () => vizGroups({ groups: 1, perGroup: 4, emoji: "🍪", container: "🛍️" }) },
              { say: "Second bag: 4 cookies. 4 left.",
                viz: () => vizGroups({ groups: 2, perGroup: 4, emoji: "🍪", container: "🛍️" }) },
              { say: "Third bag: 4 cookies. 0 left.",
                viz: () => vizGroups({ groups: 3, perGroup: 4, emoji: "🍪", container: "🛍️" }) },
              { say: "We made 3 bags. So 12 ÷ 4 = 3!",
                viz: () => vizEquationLine([
                  { text: "12" }, { text: " ÷ " }, { text: "4" }, { text: " = " }, { text: "3", cls: "teach-eq-answer" },
                ]) },
            ],
          },
          practice: [
            {
              prompt: "Try it! 15 ÷ 5 = ?",
              a: 15, b: 5, op: "÷", answer: 3,
              options: [2, 3, 4, 5],
              hint: "Bags of 5 from 15. First bag: 5 used. Second: 10 used. Third: 15 used. Three bags.",
              viz: () => vizGroups({ groups: 3, perGroup: 5, emoji: "🍪", container: "🛍️" }),
            },
            {
              prompt: "Your turn! 8 ÷ 4 = ?",
              a: 8, b: 4, op: "÷", answer: 2,
              options: [1, 2, 3, 4],
              hint: "Bags of 4 from 8. First: 4 used. Second: 8 used. Two bags.",
              viz: () => vizGroups({ groups: 2, perGroup: 4, emoji: "🍪", container: "🛍️" }),
            },
          ],
        },

        {
          id: "repeated-sub",
          title: "Repeated Subtraction",
          emoji: "➖",
          tagline: "Keep taking the same chunk away. Count the takeaways.",
          grade: "Grade 3–4",
          idea: {
            story: "12 cookies. Take away 4 at a time. How many takeaways before the plate is empty?",
            question: "12 ÷ 4 = ?",
            metaphor: "Division as 'how many times can I subtract?'. Each subtraction is one group.",
            why: "Multiplication is repeated addition, so division is repeated subtraction. They're mirror opposites.",
            viz: () => vizEquationLine([
              { text: "12" }, { text: " − " }, { text: "4" }, { text: " = " }, { text: "8", cls: "teach-eq-answer" },
            ]),
          },
          watch: {
            equation: "12 ÷ 4 = ?",
            steps: [
              { say: "Start with 12.",
                viz: () => vizEquationLine([{ text: "Start: 12", cls: "teach-eq-answer" }]) },
              { say: "Take away 4. That's 1 takeaway. Left: 8.",
                viz: () => vizEquationLine([
                  { text: "12" }, { text: " − " }, { text: "4" }, { text: " = " }, { text: "8", cls: "teach-eq-answer" },
                ]) },
              { say: "Take away 4 again. That's 2 takeaways. Left: 4.",
                viz: () => vizEquationLine([
                  { text: "8" }, { text: " − " }, { text: "4" }, { text: " = " }, { text: "4", cls: "teach-eq-answer" },
                ]) },
              { say: "Take away 4 again. That's 3 takeaways. Left: 0.",
                viz: () => vizEquationLine([
                  { text: "4" }, { text: " − " }, { text: "4" }, { text: " = " }, { text: "0", cls: "teach-eq-answer" },
                ]) },
              { say: "We subtracted 4 three times. So 12 ÷ 4 = 3!",
                viz: () => vizEquationLine([
                  { text: "12" }, { text: " ÷ " }, { text: "4" }, { text: " = " }, { text: "3", cls: "teach-eq-answer" },
                ]) },
            ],
          },
          practice: [
            {
              prompt: "Try it! 10 ÷ 2 = ?",
              a: 10, b: 2, op: "÷", answer: 5,
              options: [3, 4, 5, 6],
              hint: "Keep subtracting 2 from 10: 8, 6, 4, 2, 0. That's 5 takeaways.",
              viz: () => vizEquationLine([
                { text: "10" }, { text: " − " }, { text: "2" }, { text: " − " }, { text: "2" }, { text: "..." },
              ]),
            },
            {
              prompt: "Your turn! 15 ÷ 5 = ?",
              a: 15, b: 5, op: "÷", answer: 3,
              options: [2, 3, 4, 5],
              hint: "Subtract 5 from 15 → 10. Subtract 5 → 5. Subtract 5 → 0. Three takeaways.",
              viz: () => vizEquationLine([
                { text: "15" }, { text: " − " }, { text: "5" }, { text: " − " }, { text: "5" }, { text: "..." },
              ]),
            },
          ],
        },

        {
          id: "fact-family",
          title: "Fact Family",
          emoji: "🌟",
          tagline: "If 3 × 4 = 12, what's 12 ÷ 4? Use multiplication to solve division.",
          grade: "Grade 4",
          idea: {
            story: "Every multiplication fact has a twin — actually, it has three siblings.",
            question: "If 3 × 4 = 12, what else do you know?",
            metaphor: "The four facts 3×4, 4×3, 12÷3, 12÷4 are a family. Learn one — you get three free!",
            why: "Multiplication and division are the same idea, seen from two sides. Knowing your times tables gives you division for free.",
            viz: () => vizFactFamily({ a: 3, b: 4, product: 12 }),
          },
          watch: {
            equation: "12 ÷ 4 = ?  (using 3 × 4 = 12)",
            steps: [
              { say: "Here's the fact family for 3, 4, and 12.",
                viz: () => vizFactFamily({ a: 3, b: 4, product: 12 }) },
              { say: "We know 3 × 4 = 12. So 4 × 3 = 12 too. (Order doesn't change the answer.)",
                viz: () => vizEquationLine([
                  { text: "3 × 4 = 12" }, { text: "  " }, { text: "4 × 3 = 12", cls: "teach-eq-answer" },
                ]) },
              { say: "The division facts come free: 12 ÷ 3 = 4, and 12 ÷ 4 = 3.",
                viz: () => vizEquationLine([
                  { text: "12 ÷ 3 = 4" }, { text: "  " }, { text: "12 ÷ 4 = 3", cls: "teach-eq-answer" },
                ]) },
              { say: "So 12 ÷ 4 = 3. We got it straight from our times tables!",
                viz: () => vizEquationLine([
                  { text: "12" }, { text: " ÷ " }, { text: "4" }, { text: " = " }, { text: "3", cls: "teach-eq-answer" },
                ]) },
            ],
          },
          practice: [
            {
              prompt: "If 5 × 6 = 30, what is 30 ÷ 6?",
              a: 30, b: 6, op: "÷", answer: 5,
              options: [4, 5, 6, 10],
              hint: "The fact family is 5, 6, and 30. If 5 × 6 = 30, then 30 ÷ 6 must be 5.",
              viz: () => vizFactFamily({ a: 5, b: 6, product: 30 }),
            },
            {
              prompt: "If 7 × 8 = 56, what is 56 ÷ 7?",
              a: 56, b: 7, op: "÷", answer: 8,
              options: [6, 7, 8, 9],
              hint: "Family: 7, 8, 56. If 7 × 8 = 56, then 56 ÷ 7 must be 8.",
              viz: () => vizFactFamily({ a: 7, b: 8, product: 56 }),
            },
          ],
        },
      ],
    },

    compareFractions: {
      id: "compareFractions",
      title: "Compare Fractions",
      verb: "compare",
      emoji: "⚖️",
      accent: "#c084fc",
      arcadeGameId: "fraction",
      intro: "When slices are different sizes, how do we know which fraction is bigger? Math Raccoon has four slick ways to find out — and when to use each one.",
      raccoonHook: "Let's compare!",
      strategies: [
        {
          id: "same-bottom",
          title: "Same Bottom",
          emoji: "🍕",
          tagline: "Same-size slices? Just count them.",
          grade: "Grade 3",
          idea: {
            story: "The Beaver Bakers sliced two pies the same way — both into 6 pieces. One pie has 3 pieces left. The other has 5. Which pie has more left?",
            question: "When the bottom numbers match, what's the shortcut?",
            metaphor: "When slices are the same size, just count who has more.",
            why: "The bottom of a fraction tells you how big each slice is. When both fractions have the same bottom, every slice is exactly the same size — so the one with more slices has more pie. Easy!",
            viz: () => vizFractionCompare({ a: { num: 3, den: 6 }, b: { num: 5, den: 6 } }),
          },
          watch: {
            equation: "3/6 vs 5/6",
            steps: [
              { say: "Two pies, both cut into 6 equal slices. So every slice is exactly the same size.",
                viz: () => vizFractionCompare({ a: { num: 3, den: 6 }, b: { num: 5, den: 6 } }) },
              { say: "First pie: 3 slices shaded.",
                viz: () => vizFractionBar({ num: 3, den: 6, label: "3 slices" }) },
              { say: "Second pie: 5 slices shaded.",
                viz: () => vizFractionBar({ num: 5, den: 6, label: "5 slices", color: "#7dd3fc" }) },
              { say: "Bottoms match — just count the tops. 5 is more than 3, so 5/6 is bigger.",
                viz: () => vizFractionCompare({ a: { num: 3, den: 6 }, b: { num: 5, den: 6 }, relation: "<" }) },
            ],
          },
          practice: [
            {
              prompt: "Which is bigger? 2/8 or 6/8",
              answer: "6/8",
              options: ["2/8", "6/8", "They're equal", "Can't tell"],
              hint: "Bottoms match (both 8). Count the tops — 6 beats 2.",
              viz: () => vizFractionCompare({ a: { num: 2, den: 8 }, b: { num: 6, den: 8 } }),
            },
            {
              prompt: "Which is bigger? 4/5 or 3/5",
              answer: "4/5",
              options: ["4/5", "3/5", "They're equal", "Can't tell"],
              hint: "Same bottom (5). 4 is more than 3, so 4/5 wins.",
              viz: () => vizFractionCompare({ a: { num: 4, den: 5 }, b: { num: 3, den: 5 } }),
            },
            {
              prompt: "Which is bigger? 7/10 or 7/10",
              answer: "They're equal",
              options: ["7/10 (first)", "7/10 (second)", "They're equal", "Can't tell"],
              hint: "Same bottom AND same top — they're exactly the same fraction.",
              viz: () => vizFractionCompare({ a: { num: 7, den: 10 }, b: { num: 7, den: 10 }, relation: "=" }),
            },
          ],
        },

        {
          id: "same-top",
          title: "Same Top",
          emoji: "🍰",
          tagline: "Same count — whose slices are bigger?",
          grade: "Grade 3–4",
          idea: {
            story: "Tuck has 1 slice from a cake cut into 4 pieces. Reading Raccoon has 1 slice from a cake cut into 8 pieces. Same number of slices — but who ate more cake?",
            question: "When the tops match, what's the rule?",
            metaphor: "Fewer pieces on the bottom means each piece is BIGGER.",
            why: "A pizza cut into 4 pieces has big slices. A pizza cut into 8 pieces has smaller slices. When you have the same number of slices, the one with bigger slices wins — so the smaller denominator wins.",
            viz: () => vizFractionCompare({ a: { num: 1, den: 4 }, b: { num: 1, den: 8 } }),
          },
          watch: {
            equation: "3/4 vs 3/8",
            steps: [
              { say: "Both fractions have 3 slices. But the slices are different sizes.",
                viz: () => vizFractionCompare({ a: { num: 3, den: 4 }, b: { num: 3, den: 8 } }) },
              { say: "3/4 — the pie is cut into just 4 big slices.",
                viz: () => vizFractionBar({ num: 3, den: 4, label: "big slices" }) },
              { say: "3/8 — the pie is cut into 8 smaller slices.",
                viz: () => vizFractionBar({ num: 3, den: 8, label: "smaller slices", color: "#7dd3fc" }) },
              { say: "Same 3 slices, but quarters are bigger than eighths. So 3/4 is bigger!",
                viz: () => vizFractionCompare({ a: { num: 3, den: 4 }, b: { num: 3, den: 8 }, relation: ">" }) },
            ],
          },
          practice: [
            {
              prompt: "Which is bigger? 2/3 or 2/6",
              answer: "2/3",
              options: ["2/3", "2/6", "They're equal", "Can't tell"],
              hint: "Same top (2). Thirds are bigger chunks than sixths, so 2/3 wins.",
              viz: () => vizFractionCompare({ a: { num: 2, den: 3 }, b: { num: 2, den: 6 } }),
            },
            {
              prompt: "Which is bigger? 1/2 or 1/5",
              answer: "1/2",
              options: ["1/2", "1/5", "They're equal", "Can't tell"],
              hint: "One slice — but halves are huge, fifths are tiny. 1/2 is bigger.",
              viz: () => vizFractionCompare({ a: { num: 1, den: 2 }, b: { num: 1, den: 5 } }),
            },
            {
              prompt: "Which is bigger? 5/6 or 5/10",
              answer: "5/6",
              options: ["5/6", "5/10", "They're equal", "Can't tell"],
              hint: "Same top (5). Sixths are bigger slices than tenths — 5/6 wins.",
              viz: () => vizFractionCompare({ a: { num: 5, den: 6 }, b: { num: 5, den: 10 } }),
            },
          ],
        },

        {
          id: "half-check",
          title: "Half-way Check",
          emoji: "🎯",
          tagline: "Use ½ as a quick ruler.",
          grade: "Grade 4",
          idea: {
            story: "Sometimes nothing matches — different tops, different bottoms! Professor Owl whispers a shortcut: just check each one against 1/2. The 'more than half' one wins.",
            question: "What if we use ½ as our ruler?",
            metaphor: "½ is the referee. More-than-half beats less-than-half every time.",
            why: "Half is an easy benchmark kids already know. To check if a fraction is more than half, double the top — if it's bigger than the bottom, you're over ½. This trick compares tricky fractions without any common-denominator gymnastics.",
            viz: () => vizFractionBar({ num: 3, den: 5, label: "3/5 — past the half line", mark: "half" }),
          },
          watch: {
            equation: "5/8 vs 3/7",
            steps: [
              { say: "5/8 — is this more or less than half? Double the top: 5 + 5 = 10. That's bigger than 8. So 5/8 is MORE than ½.",
                viz: () => vizFractionBar({ num: 5, den: 8, label: "5/8 — past ½", mark: "half" }) },
              { say: "3/7 — double the top: 3 + 3 = 6. That's smaller than 7. So 3/7 is LESS than ½.",
                viz: () => vizFractionBar({ num: 3, den: 7, label: "3/7 — below ½", color: "#7dd3fc", mark: "half" }) },
              { say: "One is past half, the other isn't. Put them next to each other.",
                viz: () => vizFractionCompare({ a: { num: 5, den: 8 }, b: { num: 3, den: 7 }, mark: "half" }) },
              { say: "More-than-half always wins. So 5/8 is bigger than 3/7!",
                viz: () => vizFractionCompare({ a: { num: 5, den: 8 }, b: { num: 3, den: 7 }, relation: ">", mark: "half" }) },
            ],
          },
          practice: [
            {
              prompt: "Which is bigger? 4/6 or 2/9",
              answer: "4/6",
              options: ["4/6", "2/9", "They're equal", "Can't tell"],
              hint: "4/6 — double top = 8, bigger than 6, so more than ½. 2/9 — double top = 4, smaller than 9, so less than ½.",
              viz: () => vizFractionCompare({ a: { num: 4, den: 6 }, b: { num: 2, den: 9 }, mark: "half" }),
            },
            {
              prompt: "Which is bigger? 3/10 or 5/6",
              answer: "5/6",
              options: ["3/10", "5/6", "They're equal", "Can't tell"],
              hint: "3/10 is below ½ (double = 6, under 10). 5/6 is above ½ (double = 10, over 6). More-than-half wins.",
              viz: () => vizFractionCompare({ a: { num: 3, den: 10 }, b: { num: 5, den: 6 }, mark: "half" }),
            },
          ],
        },

        {
          id: "picture-it",
          title: "Picture It",
          emoji: "🎨",
          tagline: "When in doubt — draw it out.",
          grade: "Grade 3",
          idea: {
            story: "Not sure which is bigger? Art Raccoon's trick: draw both as colored bars the same length, and see which color stretches farther.",
            question: "What do our eyes notice faster than math rules?",
            metaphor: "Longer colored bar = bigger fraction. Done!",
            why: "Pictures turn abstract fractions into something you can SEE. Two bars of the same total length, shaded by their fractions, make the difference obvious. This works when no other rule jumps out — and it builds the mental image kids carry into harder math later.",
            viz: () => vizFractionCompare({ a: { num: 2, den: 3 }, b: { num: 3, den: 5 } }),
          },
          watch: {
            equation: "2/3 vs 3/5",
            steps: [
              { say: "Let's draw both fractions. First, 2/3 — cut the bar into 3 parts and shade 2.",
                viz: () => vizFractionBar({ num: 2, den: 3, label: "2/3" }) },
              { say: "Now 3/5 — cut the bar into 5 parts and shade 3.",
                viz: () => vizFractionBar({ num: 3, den: 5, label: "3/5", color: "#7dd3fc" }) },
              { say: "Line them up. Which colored region stretches farther?",
                viz: () => vizFractionCompare({ a: { num: 2, den: 3 }, b: { num: 3, den: 5 } }) },
              { say: "2/3 reaches a bit farther! So 2/3 is just a smidge bigger than 3/5.",
                viz: () => vizFractionCompare({ a: { num: 2, den: 3 }, b: { num: 3, den: 5 }, relation: ">" }) },
            ],
          },
          practice: [
            {
              prompt: "Which is bigger? 3/4 or 2/5",
              answer: "3/4",
              options: ["3/4", "2/5", "They're equal", "Can't tell"],
              hint: "3/4 fills most of the bar. 2/5 is less than half. 3/4 wins easily.",
              viz: () => vizFractionCompare({ a: { num: 3, den: 4 }, b: { num: 2, den: 5 } }),
            },
            {
              prompt: "Which is bigger? 1/2 or 2/4",
              answer: "They're equal",
              options: ["1/2", "2/4", "They're equal", "Can't tell"],
              hint: "Draw them — both bars fill exactly halfway. These are equivalent fractions: they look the same!",
              viz: () => vizFractionCompare({ a: { num: 1, den: 2 }, b: { num: 2, den: 4 }, relation: "=" }),
            },
            {
              prompt: "Which is bigger? 4/5 or 2/3",
              answer: "4/5",
              options: ["4/5", "2/3", "They're equal", "Can't tell"],
              hint: "Picture it — 4/5 is almost the whole bar. 2/3 is about two-thirds. 4/5 is longer.",
              viz: () => vizFractionCompare({ a: { num: 4, den: 5 }, b: { num: 2, den: 3 } }),
            },
          ],
        },
      ],
    },

    additionSubtraction: {
      id: "additionSubtraction",
      title: "+ and −",
      verb: "connect + and −",
      emoji: "🤝",
      accent: "#fbbf24",
      arcadeGameId: "addition",
      intro: "Addition and subtraction are best friends — they undo each other. Once you see how they're connected, both get much easier!",
      raccoonHook: "Two sides of one coin!",
      strategies: [
        {
          id: "add-sub-family",
          title: "Fact Family",
          emoji: "👪",
          tagline: "Three numbers, four facts.",
          grade: "Grade 3",
          idea: {
            story: "Rocky and Ricky both count the same 7 acorns. Rocky says '3 plus 4.' Ricky says '4 plus 3.' Professor Owl adds: 'also 7 minus 3, and 7 minus 4.' Same trio — four different facts!",
            question: "How can ONE trio of numbers make FOUR facts?",
            metaphor: "Three numbers in a family — they visit each other as + and −.",
            why: "When you know 3 + 4 = 7, you already know 4 + 3 = 7 (turnaround), 7 − 3 = 4, and 7 − 4 = 3. That's 4 facts for the price of 1. This works because addition and subtraction are inverse operations — they undo each other.",
            viz: () => vizFactFamily({ a: 3, b: 4, product: 7, op: "+" }),
          },
          watch: {
            equation: "3, 4, 7",
            steps: [
              { say: "Three numbers: 3, 4, and 7. They form a fact family.",
                viz: () => vizFactFamily({ a: 3, b: 4, product: 7, op: "+" }) },
              { say: "First fact: 3 + 4 = 7.",
                viz: () => vizEquationLine([{text:"3"},{text:"+"},{text:"4"},{text:"="},{text:"7",cls:"teach-eq-answer"}]) },
              { say: "Turn it around: 4 + 3 = 7. Same family.",
                viz: () => vizEquationLine([{text:"4"},{text:"+"},{text:"3"},{text:"="},{text:"7",cls:"teach-eq-answer"}]) },
              { say: "Flip to subtraction: 7 − 3 = 4.",
                viz: () => vizEquationLine([{text:"7"},{text:"−"},{text:"3"},{text:"="},{text:"4",cls:"teach-eq-answer"}]) },
              { say: "And one more: 7 − 4 = 3. Four facts from one family!",
                viz: () => vizEquationLine([{text:"7"},{text:"−"},{text:"4"},{text:"="},{text:"3",cls:"teach-eq-answer"}]) },
            ],
          },
          practice: [
            {
              prompt: "Family (5, 8, 13). What is 13 − 5?",
              answer: 8,
              options: [6, 7, 8, 9],
              hint: "Family: 5 + 8 = 13. So 13 − 5 brings you back to 8.",
              viz: () => vizFactFamily({ a: 5, b: 8, product: 13, op: "+" }),
            },
            {
              prompt: "Family (6, 7, 13). What is 13 − 7?",
              answer: 6,
              options: [5, 6, 7, 8],
              hint: "6 + 7 = 13, so 13 − 7 = 6.",
              viz: () => vizFactFamily({ a: 6, b: 7, product: 13, op: "+" }),
            },
            {
              prompt: "If 9 + 5 = 14, what is 14 − 9?",
              answer: 5,
              options: [3, 4, 5, 6],
              hint: "Same family. Take the 9 back out — what's left is 5.",
              viz: () => vizFactFamily({ a: 9, b: 5, product: 14, op: "+" }),
            },
          ],
        },

        {
          id: "find-difference",
          title: "Find the Difference",
          emoji: "📏",
          tagline: "Subtraction = the gap between numbers.",
          grade: "Grade 3",
          idea: {
            story: "Tuck has 12 berries. Reading Raccoon has 8. Nobody's taking any away — we just want to know: how much MORE does Tuck have? That 'more' is the difference.",
            question: "Is subtraction always 'take away' — or can it be something else?",
            metaphor: "Subtraction is the DISTANCE between two numbers.",
            why: "Subtraction has two flavors: 'take away' (12 cookies, eat 4, have 8 left) and 'find the gap' (how much more is 12 than 8?). The second is often easier with big numbers — count UP from the smaller to the bigger. Both give the same answer; the link between + and − makes it work.",
            viz: () => vizNumberLine({ min: 7, max: 13, at: 8, hops: [9, 10, 11, 12], label: "8 to 12 — four hops" }),
          },
          watch: {
            equation: "12 − 8 = ?",
            steps: [
              { say: "Instead of taking 8 away from 12, find the gap. Start at 8.",
                viz: () => vizNumberLine({ min: 7, max: 13, at: 8, label: "Start at 8" }) },
              { say: "Hop up to 9. That's one hop.",
                viz: () => vizNumberLine({ min: 7, max: 13, at: 9, hops: [9], label: "1 hop" }) },
              { say: "Keep hopping to 12. That's 9, 10, 11, 12 — four hops total.",
                viz: () => vizNumberLine({ min: 7, max: 13, at: 12, hops: [9,10,11,12], label: "4 hops from 8 to 12" }) },
              { say: "The gap is 4. So 12 − 8 = 4!",
                viz: () => vizEquationLine([{text:"12"},{text:"−"},{text:"8"},{text:"="},{text:"4",cls:"teach-eq-answer"}]) },
            ],
          },
          practice: [
            {
              prompt: "How far from 5 to 11?",
              answer: 6,
              options: [5, 6, 7, 8],
              hint: "Hop from 5: 6, 7, 8, 9, 10, 11 — that's 6 hops.",
              viz: () => vizNumberLine({ min: 4, max: 12, at: 5, hops: [6,7,8,9,10,11], label: "5 → 11" }),
            },
            {
              prompt: "What is 15 − 9?",
              answer: 6,
              options: [4, 5, 6, 7],
              hint: "Count up from 9: 10, 11, 12, 13, 14, 15 — 6 hops.",
              viz: () => vizNumberLine({ min: 8, max: 16, at: 9, hops: [10,11,12,13,14,15], label: "9 → 15" }),
            },
          ],
        },

        {
          id: "add-sub-check",
          title: "Check with the Opposite",
          emoji: "🔁",
          tagline: "Addition undoes subtraction — and back.",
          grade: "Grade 3–4",
          idea: {
            story: "Rocky says 15 − 7 = 8. Is he right? Put the 7 back: 8 + 7. If we land on 15 again, yes! If not, something's off.",
            question: "How do we CHECK if an answer is right?",
            metaphor: "Subtract then add back = you're home.",
            why: "Because + and − undo each other, any subtraction can be checked with addition. If 15 − 7 = 8, then 8 + 7 must be 15. This 'there-and-back' catches slips and builds the mental link between the two operations — a huge step toward algebra later.",
            viz: () => vizEquationLine([{text:"15"},{text:"−"},{text:"7"},{text:"="},{text:"8",cls:"teach-eq-answer"}]),
          },
          watch: {
            equation: "Check 15 − 7 = 8",
            steps: [
              { say: "We claim 15 − 7 = 8. How do we know?",
                viz: () => vizEquationLine([{text:"15"},{text:"−"},{text:"7"},{text:"="},{text:"8",cls:"teach-eq-answer"}]) },
              { say: "Put the 7 back. Add it to our answer: 8 + 7.",
                viz: () => vizEquationLine([{text:"8"},{text:"+"},{text:"7"},{text:"="},{text:"?"}]) },
              { say: "Count up: 8, then 9, 10, 11, 12, 13, 14, 15. Yes — 15!",
                viz: () => vizNumberLine({ min: 7, max: 16, at: 15, hops: [9,10,11,12,13,14,15], label: "8 + 7 = 15 ✓" }) },
              { say: "We got back to 15. So 15 − 7 = 8 is correct!",
                viz: () => vizEquationLine([{text:"8"},{text:"+"},{text:"7"},{text:"="},{text:"15",cls:"teach-eq-answer"}]) },
            ],
          },
          practice: [
            {
              prompt: "If 20 − 6 = 14, what must 14 + 6 be?",
              answer: 20,
              options: [18, 19, 20, 21],
              hint: "Inverse operations always bring you home. 14 + 6 = 20.",
              viz: () => vizEquationLine([{text:"20"},{text:"−"},{text:"6"},{text:"="},{text:"14",cls:"teach-eq-answer"}]),
            },
            {
              prompt: "Rocky says 11 − 4 = 8. Check: what is 8 + 4?",
              answer: 12,
              options: [10, 11, 12, 13],
              hint: "8 + 4 = 12, not 11. So Rocky was off — 11 − 4 is actually 7.",
              viz: () => vizEquationLine([{text:"8"},{text:"+"},{text:"4"},{text:"="},{text:"?"}]),
            },
          ],
        },

        {
          id: "add-sub-missing",
          title: "Find the Missing Number",
          emoji: "🧩",
          tagline: "Use the opposite to fill the blank.",
          grade: "Grade 4",
          idea: {
            story: "The Market Mice are counting cheese. '? + 6 = 14,' they squeak. 'We forgot how many we started with!' Professor Owl whispers: 'Subtract. 14 − 6 will tell you.'",
            question: "When there's a ? in + or −, how do you find it?",
            metaphor: "If + is the question, − is the answer-finder. And vice versa.",
            why: "Every equation with a missing number can be rewritten using the inverse operation. '? + 6 = 14' means '14 minus 6 is what?' → 8. '15 − ? = 9' means 'the gap from 9 to 15 is what?' → 6. This is the first step toward algebra: use what you DO know to find what you don't.",
            viz: () => vizEquationLine([{text:"?"},{text:"+"},{text:"6"},{text:"="},{text:"14"}]),
          },
          watch: {
            equation: "? + 8 = 17",
            steps: [
              { say: "'Something plus 8 is 17.' Find the something.",
                viz: () => vizEquationLine([{text:"?"},{text:"+"},{text:"8"},{text:"="},{text:"17"}]) },
              { say: "Flip with subtraction. If ? + 8 = 17, then ? = 17 − 8.",
                viz: () => vizEquationLine([{text:"?"},{text:"="},{text:"17"},{text:"−"},{text:"8"}]) },
              { say: "Count up from 8 to 17: 9, 10, 11, 12, 13, 14, 15, 16, 17 — nine hops.",
                viz: () => vizNumberLine({ min: 7, max: 18, at: 17, hops: [9,10,11,12,13,14,15,16,17], label: "8 → 17" }) },
              { say: "The missing number is 9. Check: 9 + 8 = 17 ✓",
                viz: () => vizEquationLine([{text:"9",cls:"teach-eq-answer"},{text:"+"},{text:"8"},{text:"="},{text:"17"}]) },
            ],
          },
          practice: [
            {
              prompt: "Solve: ? + 7 = 12",
              answer: 5,
              options: [3, 4, 5, 6],
              hint: "Flip with subtraction: 12 − 7 = 5.",
              viz: () => vizEquationLine([{text:"?"},{text:"+"},{text:"7"},{text:"="},{text:"12"}]),
            },
            {
              prompt: "Solve: 14 − ? = 9",
              answer: 5,
              options: [4, 5, 6, 7],
              hint: "Gap from 9 to 14 is 5. So we took away 5.",
              viz: () => vizEquationLine([{text:"14"},{text:"−"},{text:"?"},{text:"="},{text:"9"}]),
            },
            {
              prompt: "Solve: 8 + ? = 20",
              answer: 12,
              options: [10, 11, 12, 13],
              hint: "Flip: 20 − 8 = 12.",
              viz: () => vizEquationLine([{text:"8"},{text:"+"},{text:"?"},{text:"="},{text:"20"}]),
            },
          ],
        },
      ],
    },

    multiplicationDivision: {
      id: "multiplicationDivision",
      title: "× and ÷",
      verb: "connect × and ÷",
      emoji: "🔗",
      accent: "#f472b6",
      arcadeGameId: "multiplication",
      intro: "Multiplication and division are partners. Every multiplication fact hides two division facts — and knowing one helps you find the other.",
      raccoonHook: "Partners in math!",
      strategies: [
        {
          id: "mul-div-family",
          title: "Fact Family",
          emoji: "👪",
          tagline: "One array, four facts.",
          grade: "Grade 3",
          idea: {
            story: "Fair Fox lined up 4 rows of 6 cookies. 'That's 4 × 6 = 24 cookies,' she said. 'Or 6 × 4 = 24.' The Market Mice chimed in: 'What about sharing? 24 ÷ 4 = 6 per row, or 24 ÷ 6 = 4 rows!' One array — four facts.",
            question: "How can one array tell FOUR stories?",
            metaphor: "Every array reads 4 ways — two × and two ÷.",
            why: "If 4 × 6 = 24, you also know 6 × 4 = 24, 24 ÷ 6 = 4, and 24 ÷ 4 = 6. One trio makes four facts because × and ÷ are inverses — they undo each other.",
            viz: () => vizFactFamily({ a: 4, b: 6, product: 24 }),
          },
          watch: {
            equation: "4, 6, 24",
            steps: [
              { say: "Trio: 4, 6, and 24. The array is 4 rows of 6.",
                viz: () => vizArray({ rows: 4, cols: 6, label: "4 × 6 = 24" }) },
              { say: "First × fact: 4 × 6 = 24.",
                viz: () => vizEquationLine([{text:"4"},{text:"×"},{text:"6"},{text:"="},{text:"24",cls:"teach-eq-answer"}]) },
              { say: "Turn around: 6 × 4 = 24. Same array, viewed sideways.",
                viz: () => vizEquationLine([{text:"6"},{text:"×"},{text:"4"},{text:"="},{text:"24",cls:"teach-eq-answer"}]) },
              { say: "Split the 24 into rows: 24 ÷ 4 = 6.",
                viz: () => vizEquationLine([{text:"24"},{text:"÷"},{text:"4"},{text:"="},{text:"6",cls:"teach-eq-answer"}]) },
              { say: "Or into columns: 24 ÷ 6 = 4. One family, four facts!",
                viz: () => vizEquationLine([{text:"24"},{text:"÷"},{text:"6"},{text:"="},{text:"4",cls:"teach-eq-answer"}]) },
            ],
          },
          practice: [
            {
              prompt: "Family (3, 8, 24). What is 24 ÷ 3?",
              answer: 8,
              options: [6, 7, 8, 9],
              hint: "3 × 8 = 24, so 24 ÷ 3 = 8.",
              viz: () => vizFactFamily({ a: 3, b: 8, product: 24 }),
            },
            {
              prompt: "Family (5, 7, 35). What is 35 ÷ 7?",
              answer: 5,
              options: [4, 5, 6, 7],
              hint: "5 × 7 = 35, so 35 ÷ 7 = 5.",
              viz: () => vizFactFamily({ a: 5, b: 7, product: 35 }),
            },
            {
              prompt: "If 9 × 6 = 54, what is 54 ÷ 9?",
              answer: 6,
              options: [5, 6, 7, 8],
              hint: "Same family. 9 × 6 = 54, so 54 ÷ 9 must be 6.",
              viz: () => vizFactFamily({ a: 9, b: 6, product: 54 }),
            },
          ],
        },

        {
          id: "div-via-mul",
          title: "Division = Reverse Multiplication",
          emoji: "⏪",
          tagline: "Ask 'how many times?' instead.",
          grade: "Grade 3",
          idea: {
            story: "'15 ÷ 3 = ?' sounds tricky. But it's the same as 'how many 3's fit into 15?' Rocky skip-counts: 3, 6, 9, 12, 15 — that's 5 threes. Division solved with multiplication!",
            question: "What if division is a multiplication question in disguise?",
            metaphor: "15 ÷ 3 = how many 3's fit in 15?",
            why: "Division can always be rewritten as multiplication with a missing factor. '15 ÷ 3' becomes '3 times what equals 15?' Use your times-tables knowledge instead of learning division facts separately — they're the same facts, viewed differently.",
            viz: () => vizEquationLine([{text:"15"},{text:"÷"},{text:"3"},{text:"="},{text:"?"}]),
          },
          watch: {
            equation: "20 ÷ 4 = ?",
            steps: [
              { say: "Rewrite: 20 ÷ 4 means '4 times what equals 20?'",
                viz: () => vizEquationLine([{text:"4"},{text:"×"},{text:"?"},{text:"="},{text:"20"}]) },
              { say: "Skip-count by 4: 4, 8, 12, 16, 20. Count the steps.",
                viz: () => vizRepeatedAddition({ value: 4, times: 5, accumulator: 20 }) },
              { say: "Five steps of 4 got us to 20. So 4 × 5 = 20.",
                viz: () => vizEquationLine([{text:"4"},{text:"×"},{text:"5"},{text:"="},{text:"20",cls:"teach-eq-answer"}]) },
              { say: "That means 20 ÷ 4 = 5. Division done through multiplication!",
                viz: () => vizEquationLine([{text:"20"},{text:"÷"},{text:"4"},{text:"="},{text:"5",cls:"teach-eq-answer"}]) },
            ],
          },
          practice: [
            {
              prompt: "28 ÷ 7 = ? (Hint: 7 × ? = 28)",
              answer: 4,
              options: [3, 4, 5, 6],
              hint: "Skip-count by 7: 7, 14, 21, 28 — four sevens.",
              viz: () => vizRepeatedAddition({ value: 7, times: 4, accumulator: 28 }),
            },
            {
              prompt: "36 ÷ 6 = ? (Hint: 6 × ? = 36)",
              answer: 6,
              options: [5, 6, 7, 8],
              hint: "Skip-count by 6: 6, 12, 18, 24, 30, 36 — six sixes.",
              viz: () => vizRepeatedAddition({ value: 6, times: 6, accumulator: 36 }),
            },
          ],
        },

        {
          id: "mul-div-check",
          title: "Check with the Opposite",
          emoji: "🔁",
          tagline: "Multiplication undoes division.",
          grade: "Grade 3–4",
          idea: {
            story: "Share Shack shared 42 cookies among 6 friends: 42 ÷ 6 = 7 each. Is that right? Put them back together: if each of 6 friends has 7, then 6 × 7 should be 42.",
            question: "How do we CHECK a division answer?",
            metaphor: "Division and multiplication = there-and-back. Same road, opposite way.",
            why: "Division splits into groups; multiplication puts them back. If 42 ÷ 6 = 7, then 6 × 7 must equal 42 to be correct. This check catches mistakes and cements the inverse — once you see it, you can skip memorizing division and lean on what you know about multiplication.",
            viz: () => vizEquationLine([{text:"42"},{text:"÷"},{text:"6"},{text:"="},{text:"7",cls:"teach-eq-answer"}]),
          },
          watch: {
            equation: "Check 54 ÷ 9 = 6",
            steps: [
              { say: "We claim 54 ÷ 9 = 6. How do we know?",
                viz: () => vizEquationLine([{text:"54"},{text:"÷"},{text:"9"},{text:"="},{text:"6",cls:"teach-eq-answer"}]) },
              { say: "Put the groups back together. Multiply: 9 × 6.",
                viz: () => vizEquationLine([{text:"9"},{text:"×"},{text:"6"},{text:"="},{text:"?"}]) },
              { say: "Array of 9 rows × 6 cols = 54 dots. Yes!",
                viz: () => vizArray({ rows: 9, cols: 6, label: "9 × 6 = 54" }) },
              { say: "We got back to 54. So 54 ÷ 9 = 6 is correct!",
                viz: () => vizEquationLine([{text:"9"},{text:"×"},{text:"6"},{text:"="},{text:"54",cls:"teach-eq-answer"}]) },
            ],
          },
          practice: [
            {
              prompt: "If 40 ÷ 5 = 8, what is 5 × 8?",
              answer: 40,
              options: [36, 38, 40, 42],
              hint: "The inverse brings you home. 5 × 8 = 40.",
              viz: () => vizEquationLine([{text:"40"},{text:"÷"},{text:"5"},{text:"="},{text:"8",cls:"teach-eq-answer"}]),
            },
            {
              prompt: "Share Shack says 48 ÷ 6 = 7. Check: what is 6 × 7?",
              answer: 42,
              options: [40, 41, 42, 48],
              hint: "6 × 7 = 42, not 48. So 48 ÷ 6 is NOT 7 — it's 8!",
              viz: () => vizEquationLine([{text:"6"},{text:"×"},{text:"7"},{text:"="},{text:"?"}]),
            },
          ],
        },

        {
          id: "missing-factor",
          title: "Find the Missing Factor",
          emoji: "🧩",
          tagline: "Flip to the opposite to find it.",
          grade: "Grade 4",
          idea: {
            story: "Fair Fox asks: '? × 7 = 42. How many sevens?' Don't guess — use division. 42 ÷ 7 will hand you the answer.",
            question: "When there's a ? in × or ÷, how do you find it?",
            metaphor: "If × is the question, ÷ is the answer-finder — and vice versa.",
            why: "'? × 7 = 42' means 'how many 7's make 42?' → 42 ÷ 7 = 6. '48 ÷ ? = 8' means 'what splits 48 into groups of 8?' → 48 ÷ 8 = 6. Always flip to the inverse. This is the start of algebraic thinking.",
            viz: () => vizEquationLine([{text:"?"},{text:"×"},{text:"7"},{text:"="},{text:"42"}]),
          },
          watch: {
            equation: "? × 8 = 56",
            steps: [
              { say: "'Something times 8 is 56.' Find the something.",
                viz: () => vizEquationLine([{text:"?"},{text:"×"},{text:"8"},{text:"="},{text:"56"}]) },
              { say: "Flip with division: ? = 56 ÷ 8.",
                viz: () => vizEquationLine([{text:"?"},{text:"="},{text:"56"},{text:"÷"},{text:"8"}]) },
              { say: "How many 8's fit in 56? Skip-count: 8, 16, 24, 32, 40, 48, 56 — seven 8's.",
                viz: () => vizRepeatedAddition({ value: 8, times: 7, accumulator: 56 }) },
              { say: "The missing factor is 7. Check: 7 × 8 = 56 ✓",
                viz: () => vizEquationLine([{text:"7",cls:"teach-eq-answer"},{text:"×"},{text:"8"},{text:"="},{text:"56"}]) },
            ],
          },
          practice: [
            {
              prompt: "Solve: ? × 6 = 30",
              answer: 5,
              options: [4, 5, 6, 7],
              hint: "Flip with division: 30 ÷ 6 = 5.",
              viz: () => vizEquationLine([{text:"?"},{text:"×"},{text:"6"},{text:"="},{text:"30"}]),
            },
            {
              prompt: "Solve: 45 ÷ ? = 9",
              answer: 5,
              options: [4, 5, 6, 7],
              hint: "Ask: what times 9 is 45? 5 × 9 = 45.",
              viz: () => vizEquationLine([{text:"45"},{text:"÷"},{text:"?"},{text:"="},{text:"9"}]),
            },
            {
              prompt: "Solve: 4 × ? = 32",
              answer: 8,
              options: [6, 7, 8, 9],
              hint: "Flip: 32 ÷ 4 = 8.",
              viz: () => vizEquationLine([{text:"4"},{text:"×"},{text:"?"},{text:"="},{text:"32"}]),
            },
          ],
        },
      ],
    },
  };

  // ========================================================================
  // RENDERING
  // ========================================================================

  // Shared page shell for all Teach screens — header with back button + title.
  function teachShell(titleText, emoji, onBack) {
    return h("header", { class: "teach-header" }, [
      h("button", {
        class: "teach-back-btn",
        onclick: onBack,
        "aria-label": "Go back",
      }, [h("span", { class: "teach-back-arrow" }, "⟵"), h("span", {}, "Back")]),
      h("div", { class: "teach-header-title" }, [
        h("span", { class: "teach-header-emoji" }, emoji),
        h("h1", { class: "teach-header-h" }, titleText),
      ]),
      h("div", { class: "teach-header-spacer" }),
    ]);
  }

  function lessonKey(opId, stratId) { return `${opId}:${stratId}`; }

  // --- Teach HOME: four operation cards ---
  function renderHome() {
    clearScreen();
    const state = readState();
    const ops = Object.values(LESSONS);

    const cards = ops.map((op) => {
      const opCompleted = op.strategies.filter((s) => state.completed.includes(lessonKey(op.id, s.id))).length;
      return h("button", {
        class: "teach-op-card",
        style: `--card-accent: ${op.accent};`,
        onclick: () => renderOp(op.id),
      }, [
        h("span", { class: "teach-op-emoji" }, op.emoji),
        h("h3", { class: "teach-op-title" }, op.title),
        h("p", { class: "teach-op-tagline" }, op.raccoonHook),
        h("div", { class: "teach-op-meta" }, [
          h("span", { class: "teach-op-count" }, `${op.strategies.length} ways`),
          h("span", { class: "teach-op-progress" },
            opCompleted === 0 ? "Not started" :
            opCompleted === op.strategies.length ? "✨ All done" :
            `${opCompleted}/${op.strategies.length} tried`,
          ),
        ]),
      ]);
    });

    const section = h("section", { class: "teach-page teach-home" }, [
      teachShell("Teaching Corner", "📚", () => {
        if (window.MR.App && window.MR.App.renderHome) window.MR.App.renderHome();
        else location.hash = "";
      }),
      h("div", { class: "teach-raccoon-intro" }, [
        h("div", { class: "teach-raccoon", id: "teach-home-raccoon" }),
        h("div", { class: "teach-raccoon-bubble" }, [
          h("strong", {}, "Math Raccoon's learning spot!"),
          h("br"),
          h("span", {}, "No scores here — just different ways to do math. Pick a topic and I'll walk you through it."),
        ]),
      ]),
      h("h2", { class: "teach-section-title" }, "Pick an operation"),
      h("div", { class: "teach-op-grid" }, cards),
      h("p", { class: "teach-footnote" }, "💜 Every path is the right path. Try any way — the one that clicks is the right one for you."),
    ]);

    screenEl.append(section);
    Raccoon.mount("#teach-home-raccoon", "wave", { size: 130 });
    speak("Welcome to the Teaching Corner! Pick an operation and I'll show you different ways to do it.");
  }

  // --- Operation page: list of strategies ---
  function renderOp(opId) {
    clearScreen();
    const op = LESSONS[opId];
    if (!op) return renderHome();
    const state = readState();

    const strategyCards = op.strategies.map((s, i) => {
      const done = state.completed.includes(lessonKey(op.id, s.id));
      return h("button", {
        class: "teach-strat-card" + (done ? " done" : ""),
        style: `--card-accent: ${op.accent};`,
        onclick: () => renderLesson(op.id, s.id),
      }, [
        h("div", { class: "teach-strat-num" }, `Way ${i + 1}`),
        h("div", { class: "teach-strat-emoji" }, s.emoji),
        h("h3", { class: "teach-strat-title" }, s.title),
        h("p", { class: "teach-strat-tagline" }, s.tagline),
        h("div", { class: "teach-strat-meta" }, [
          h("span", { class: "teach-strat-grade" }, s.grade),
          h("span", { class: "teach-strat-badge" }, done ? "✓ Done" : "Try it"),
        ]),
      ]);
    });

    const section = h("section", { class: "teach-page teach-op-page" }, [
      teachShell(op.title, op.emoji, () => renderHome()),
      h("p", { class: "teach-op-intro" }, op.intro),
      h("h2", { class: "teach-section-title" }, `Ways to ${op.verb || op.title.toLowerCase()}`),
      h("div", { class: "teach-strat-grid" }, strategyCards),
    ]);

    screenEl.append(section);
    speak(op.intro);
  }

  // --- Lesson: three sub-screens (idea → watch → your turn) ---
  function renderLesson(opId, stratId) {
    const op = LESSONS[opId];
    if (!op) return renderHome();
    const strat = op.strategies.find((s) => s.id === stratId);
    if (!strat) return renderOp(opId);

    writeState({ lastKey: lessonKey(opId, stratId) });

    let phase = 0; // 0 = idea, 1 = watch, 2 = your turn
    const phaseLabels = ["The Idea", "Watch Me", "Your Turn"];
    const phaseEmoji  = ["💡", "👀", "✋"];

    function renderPhase() {
      clearScreen();
      const progressDots = h("div", { class: "teach-progress" },
        phaseLabels.map((label, i) =>
          h("div", {
            class: "teach-progress-dot " + (i === phase ? "active" : i < phase ? "done" : ""),
            title: label,
          }, [
            h("span", { class: "teach-progress-emoji" }, phaseEmoji[i]),
            h("span", { class: "teach-progress-label" }, label),
          ]),
        ),
      );

      const header = teachShell(
        `${strat.title}`,
        strat.emoji,
        () => phase === 0 ? renderOp(opId) : (phase = Math.max(0, phase - 1), renderPhase()),
      );

      const body = h("div", { class: "teach-lesson-body" });

      if (phase === 0)      body.append(renderIdeaPhase(strat, op, goNext));
      else if (phase === 1) body.append(renderWatchPhase(strat, op, goNext));
      else                  body.append(renderYourTurnPhase(strat, op, goNext));

      const section = h("section", {
        class: "teach-page teach-lesson-page",
        style: `--card-accent: ${op.accent};`,
      }, [header, progressDots, body]);
      screenEl.append(section);
    }

    function goNext() {
      if (phase < 2) { phase += 1; renderPhase(); }
      else { markCompleted(lessonKey(opId, stratId)); renderOp(opId); }
    }

    renderPhase();
  }

  // ----- Phase 1: The Idea -----
  function renderIdeaPhase(strat, op, onNext) {
    const idea = strat.idea;
    const wrap = h("div", { class: "teach-phase teach-phase-idea" });

    const card = h("div", { class: "teach-idea-card" }, [
      h("div", { class: "teach-idea-raccoon", id: "teach-idea-raccoon" }),
      h("div", { class: "teach-idea-text" }, [
        h("span", { class: "teach-idea-label" }, "💡 The Idea"),
        h("p", { class: "teach-idea-story" }, idea.story),
        h("p", { class: "teach-idea-question" }, idea.question),
      ]),
    ]);

    const viz = h("div", { class: "teach-viz-frame" }, [idea.viz()]);

    const metaphor = h("div", { class: "teach-metaphor" }, [
      h("span", { class: "teach-metaphor-label" }, "Picture it like this"),
      h("p", { class: "teach-metaphor-text" }, idea.metaphor),
    ]);

    const why = h("details", { class: "teach-why" }, [
      h("summary", {}, "🤔 Why does this work?"),
      h("p", {}, idea.why),
    ]);

    const nav = h("div", { class: "teach-lesson-nav" }, [
      h("button", { class: "btn btn-primary", onclick: onNext }, "Show me how →"),
    ]);

    wrap.append(card, viz, metaphor, why, nav);
    setTimeout(() => Raccoon.mount("#teach-idea-raccoon", "think", { size: 110 }), 0);
    speak(`${idea.story} ${idea.question} ${idea.metaphor}`);
    return wrap;
  }

  // ----- Phase 2: Watch Me -----
  function renderWatchPhase(strat, op, onNext) {
    const watch = strat.watch;
    const wrap = h("div", { class: "teach-phase teach-phase-watch" });
    let stepIdx = 0;
    let done = false;

    const title = h("div", { class: "teach-watch-title" }, [
      h("span", { class: "teach-watch-label" }, "👀 Watch Me"),
      h("p", { class: "teach-watch-equation" }, watch.equation),
    ]);

    const stepBox = h("div", { class: "teach-watch-step" });
    const vizBox  = h("div", { class: "teach-viz-frame teach-watch-viz" });
    const captionBox = h("div", { class: "teach-watch-caption" });
    const stepCounter = h("div", { class: "teach-watch-counter" });

    const nav = h("div", { class: "teach-lesson-nav" });

    function renderStep() {
      const step = watch.steps[stepIdx];
      vizBox.innerHTML = "";
      vizBox.append(step.viz());
      captionBox.textContent = step.say;
      stepCounter.textContent = `Step ${stepIdx + 1} of ${watch.steps.length}`;

      nav.innerHTML = "";
      nav.append(
        h("button", {
          class: "btn btn-ghost teach-watch-replay",
          onclick: () => { stepIdx = 0; done = false; renderStep(); },
          disabled: stepIdx === 0 ? "disabled" : null,
        }, "🔁 Replay"),
        stepIdx < watch.steps.length - 1
          ? h("button", {
              class: "btn btn-primary",
              onclick: () => { stepIdx += 1; renderStep(); },
            }, "Next step →")
          : h("button", {
              class: "btn btn-primary",
              onclick: onNext,
            }, "I'm ready to try! →"),
      );

      speak(step.say);
    }

    stepBox.append(vizBox, captionBox, stepCounter);
    wrap.append(title, stepBox, nav);
    renderStep();
    return wrap;
  }

  // ----- Phase 3: Your Turn -----
  function renderStrugglePanel(op) {
    const gameId = op.arcadeGameId || op.id;
    const Games = window.MR.Games;
    const def = Games && Games.get ? Games.get(gameId) : null;
    if (!def) return null;
    const verb = op.verb || op.title.toLowerCase();
    return h("div", { class: "teach-struggle-panel" }, [
      h("span", { class: "teach-struggle-emoji" }, "💭"),
      h("div", { class: "teach-struggle-body" }, [
        h("p", { class: "teach-struggle-msg" }, [
          h("strong", {}, "Want some extra practice? "),
          h("span", {}, `Math Raccoon's arcade has `),
          h("strong", {}, def.title),
          h("span", {}, ` — another fun way to ${verb}. Try it whenever you like.`),
        ]),
        h("button", {
          class: "btn btn-primary teach-struggle-btn",
          onclick: () => {
            if (Storage && Storage.forceUnlock) Storage.forceUnlock(gameId, true);
            if (window.MR.App && window.MR.App.openGame) window.MR.App.openGame(gameId);
          },
        }, `🎮 Open ${def.title}`),
      ]),
    ]);
  }

  function renderYourTurnPhase(strat, op, onNext) {
    const wrap = h("div", { class: "teach-phase teach-phase-practice" });
    let problemIdx = 0;
    let wrongCount = 0;
    const STRUGGLE_THRESHOLD = 2;

    const title = h("div", { class: "teach-practice-title" }, [
      h("span", { class: "teach-practice-label" }, "✋ Your Turn"),
      h("p", { class: "teach-practice-intro" }, "No rush, no grades — just you and Math Raccoon. Hints are always ready."),
    ]);

    const slot = h("div", { class: "teach-practice-slot" });
    wrap.append(title, slot);

    function renderProblem() {
      const p = strat.practice[problemIdx];
      slot.innerHTML = "";
      let hintShown = false;
      let settled = false;

      function render() {
        slot.innerHTML = "";

        const prompt = h("div", { class: "teach-practice-prompt" }, [
          h("div", { class: "teach-practice-raccoon", id: "teach-prac-raccoon" }),
          h("p", { class: "teach-practice-q" }, p.prompt),
        ]);

        const viz = p.viz ? h("div", { class: "teach-viz-frame" }, [p.viz()]) : null;

        const answers = h("div", { class: "teach-answer-row" },
          p.options.map((opt) =>
            h("button", {
              class: "teach-answer-btn",
              "data-value": String(opt),
              onclick: () => pick(opt),
            }, String(opt)),
          ),
        );

        const hintPanel = hintShown
          ? h("div", { class: "teach-hint-panel" }, [
              h("span", { class: "teach-hint-icon" }, "💡"),
              h("p", { class: "teach-hint-text" }, p.hint),
            ])
          : h("button", {
              class: "btn btn-ghost teach-hint-btn",
              onclick: () => { hintShown = true; speak(p.hint); render(); },
            }, "💡 Need a hint?");

        slot.append(prompt, viz, answers, hintPanel);

        if (wrongCount >= STRUGGLE_THRESHOLD) {
          const panel = renderStrugglePanel(op);
          if (panel) slot.append(panel);
        }

        setTimeout(() => Raccoon.mount("#teach-prac-raccoon", hintShown ? "think" : "happy", { size: 100 }), 0);
      }

      function pick(val) {
        if (settled) return;
        const btns = slot.querySelectorAll(".teach-answer-btn");
        if (val === p.answer) {
          settled = true;
          btns.forEach((b) => {
            if (b.getAttribute("data-value") === String(val)) b.classList.add("correct");
            else b.classList.add("dimmed");
          });
          if (Music && Music.playCorrectSfx) Music.playCorrectSfx();
          if (!Storage.getSettings().calmMode && Animations && Animations.confetti) Animations.confetti(26);

          const isLast = problemIdx + 1 >= strat.practice.length;
          const msg = isLast ? "Amazing! You've got this strategy down." : "Nice! Ready for one more?";
          speak(msg);

          const celebrate = h("div", { class: "teach-correct-panel" }, [
            h("span", { class: "teach-correct-emoji" }, "🎉"),
            h("p", { class: "teach-correct-msg" }, msg),
            h("button", {
              class: "btn btn-primary",
              onclick: () => {
                if (!isLast) { problemIdx += 1; renderProblem(); }
                else onNext();
              },
            }, isLast ? "Finish lesson ✓" : "One more! →"),
          ]);
          slot.append(celebrate);

          if (isLast && wrongCount >= STRUGGLE_THRESHOLD) {
            const panel = renderStrugglePanel(op);
            if (panel) slot.append(panel);
          }
        } else {
          wrongCount += 1;
          btns.forEach((b) => {
            if (b.getAttribute("data-value") === String(val)) {
              b.classList.add("shake");
              setTimeout(() => b.classList.remove("shake"), 500);
            }
          });
          if (Music && Music.playWrongSfx) Music.playWrongSfx();
          const willShowStruggle = wrongCount === STRUGGLE_THRESHOLD;
          if (!hintShown) { hintShown = true; render(); }
          else if (willShowStruggle) { render(); }
          speak("Not quite. Let's look at the hint and try again.");
        }
      }

      render();
    }

    renderProblem();
    return wrap;
  }

  // --- Embedded pane (for home tab) ---
  // When used as a tab on the home page, we render just the op-card grid
  // without clearing the whole screen or showing the back button.
  function renderHomePane() {
    const state = readState();
    const ops = Object.values(LESSONS);

    const cards = ops.map((op) => {
      const opCompleted = op.strategies.filter((s) => state.completed.includes(lessonKey(op.id, s.id))).length;
      return h("button", {
        class: "teach-op-card",
        style: `--card-accent: ${op.accent};`,
        onclick: () => renderOp(op.id),
      }, [
        h("span", { class: "teach-op-emoji" }, op.emoji),
        h("h3", { class: "teach-op-title" }, op.title),
        h("p", { class: "teach-op-tagline" }, op.raccoonHook),
        h("div", { class: "teach-op-meta" }, [
          h("span", { class: "teach-op-count" }, `${op.strategies.length} ways`),
          h("span", { class: "teach-op-progress" },
            opCompleted === 0 ? "Not started" :
            opCompleted === op.strategies.length ? "✨ All done" :
            `${opCompleted}/${op.strategies.length} tried`,
          ),
        ]),
      ]);
    });

    return h("div", { class: "teach-home-pane" }, [
      h("p", { class: "pane-hint" },
        "No scores, no timer — just Math Raccoon walking you through different ways to think about math. Pick a topic to explore."),
      h("div", { class: "teach-op-grid" }, cards),
      h("p", { class: "teach-footnote" }, "💜 Every path is the right path. Try any way — the one that clicks is the right one for you."),
    ]);
  }

  window.MR = window.MR || {};
  window.MR.Teach = {
    renderHome,       // full-screen teach home (with back button)
    renderOp,         // operation strategy list
    renderLesson,     // single 3-phase lesson
    renderHomePane,   // embeddable pane for the home tab-bar
  };
})();
