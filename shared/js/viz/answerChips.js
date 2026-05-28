/*!
 * MR.AnswerChips — shared answer-option visual chip renderer.
 *
 * Why this exists
 * ---------------
 * For autism-spectrum and challenged learners, "match the picture" beats
 * "match the digits". When an answer option can be visualized concretely
 * (coin amount, shape name, time-of-day), the runner attaches a compact
 * visual chip alongside the text via formatOption(). The kid can then
 * pattern-match the answer against the question's own viz without first
 * parsing numerals.
 *
 * This module is loaded BEFORE both wordProblem.js and teach.js so the
 * two render surfaces stay consistent — same chips, same colors, same
 * shape glyphs. Anything keyed by the option type goes here.
 *
 * Contract
 * --------
 *   MR.AnswerChips.format(opt, problem) → HTML string
 *     Returns the chip+text HTML for the given option, falling back to
 *     plain text when no chip type matches. The caller assigns this to
 *     `button.innerHTML`. The underlying value used for equality checks
 *     must remain `opt` itself, NOT button.textContent — see the teach.js
 *     handler which stores __opt on the button for this reason.
 *
 * To add a new chip type: add a *ChipHtml() helper below and call it from
 * format(). Keep new types narrow (a clear visual mapping) — chips that
 * decorate every option add noise; chips that decorate the obviously-
 * visual options add clarity.
 */
(function () {
  // ---- Coin chips ------------------------------------------------------
  // Greedy decomposition into Q (25¢), D (10¢), N (5¢), P (1¢). Returns
  // [{ count, value }] so each denomination appears at most once — this
  // caps chip count at 4 regardless of amount, keeping option cards
  // visually consistent.
  function coinSummary(cents) {
    const denoms = [25, 10, 5, 1];
    const out = [];
    let r = cents;
    for (const v of denoms) {
      const n = Math.floor(r / v);
      if (n > 0) { out.push({ count: n, value: v }); r -= n * v; }
    }
    return out;
  }
  function coinChipsHtml(cents) {
    if (!Number.isFinite(cents) || cents <= 0 || cents > 999) return "";
    const summary = coinSummary(cents);
    if (!summary.length) return "";
    const chips = summary.map(({ count, value }) =>
      `<span class="ans-coin-chip ans-coin-${value}">${count}×${value}¢</span>`
    ).join("");
    return `<span class="ans-chips ans-chips-coins">${chips}</span>`;
  }

  // ---- Shape glyphs ----------------------------------------------------
  // Small SVG icons (24×24 viewBox). currentColor lets us tint based on
  // .answer-btn.correct / .answer-btn.wrong state.
  const SHAPE_GLYPHS = {
    triangle:      `<svg class="ans-shape" viewBox="0 0 24 24" aria-hidden="true"><polygon points="12,3 22,21 2,21" fill="currentColor"/></svg>`,
    square:        `<svg class="ans-shape" viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" fill="currentColor"/></svg>`,
    rectangle:     `<svg class="ans-shape" viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="7" width="20" height="10" fill="currentColor"/></svg>`,
    pentagon:      `<svg class="ans-shape" viewBox="0 0 24 24" aria-hidden="true"><polygon points="12,3 22,10 18,21 6,21 2,10" fill="currentColor"/></svg>`,
    hexagon:       `<svg class="ans-shape" viewBox="0 0 24 24" aria-hidden="true"><polygon points="7,3 17,3 22,12 17,21 7,21 2,12" fill="currentColor"/></svg>`,
    rhombus:       `<svg class="ans-shape" viewBox="0 0 24 24" aria-hidden="true"><polygon points="12,2 22,12 12,22 2,12" fill="currentColor"/></svg>`,
    trapezoid:     `<svg class="ans-shape" viewBox="0 0 24 24" aria-hidden="true"><polygon points="6,5 18,5 22,19 2,19" fill="currentColor"/></svg>`,
    parallelogram: `<svg class="ans-shape" viewBox="0 0 24 24" aria-hidden="true"><polygon points="7,5 22,5 17,19 2,19" fill="currentColor"/></svg>`,
    circle:        `<svg class="ans-shape" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="currentColor"/></svg>`,
    quadrilateral: `<svg class="ans-shape" viewBox="0 0 24 24" aria-hidden="true"><polygon points="3,7 21,4 19,20 5,17" fill="currentColor"/></svg>`,
  };
  function shapeChipHtml(name) {
    if (typeof name !== "string") return "";
    const k = name.trim().toLowerCase();
    const glyph = SHAPE_GLYPHS[k];
    if (!glyph) return "";
    return `<span class="ans-chips ans-chips-shape">${glyph}</span>`;
  }

  // ---- Time-of-day mini clock -----------------------------------------
  // A stripped-down 28×28 clock for options like "3:15", "8:05". Hand
  // angles match the full clock viz formula (hour = hour*30 + minute/2,
  // minute = minute*6) so the kid can pattern-match against the question's
  // own clockPair viz.
  function timeChipHtml(text) {
    if (typeof text !== "string") return "";
    const m = text.match(/^\s*(\d{1,2}):(\d{2})\s*(?:a\.?m\.?|p\.?m\.?)?\s*$/i);
    if (!m) return "";
    const hr = parseInt(m[1], 10) % 12;
    const mn = parseInt(m[2], 10);
    if (mn > 59) return "";
    const hourDeg = hr * 30 + (mn / 60) * 30;
    const minDeg  = mn * 6;
    const hx = 14 + 5 * Math.sin(hourDeg * Math.PI / 180);
    const hy = 14 - 5 * Math.cos(hourDeg * Math.PI / 180);
    const mx = 14 + 8 * Math.sin(minDeg  * Math.PI / 180);
    const my = 14 - 8 * Math.cos(minDeg  * Math.PI / 180);
    return `<span class="ans-chips ans-chips-time"><svg class="ans-clock" viewBox="0 0 28 28" aria-hidden="true">
      <circle cx="14" cy="14" r="12" fill="#fff8ed" stroke="#6b5b95" stroke-width="1.5"/>
      <line x1="14" y1="14" x2="${hx.toFixed(2)}" y2="${hy.toFixed(2)}" stroke="#3a2e5f" stroke-width="2" stroke-linecap="round"/>
      <line x1="14" y1="14" x2="${mx.toFixed(2)}" y2="${my.toFixed(2)}" stroke="#a78bfa" stroke-width="1.5" stroke-linecap="round"/>
      <circle cx="14" cy="14" r="1.2" fill="#3a2e5f"/>
    </svg></span>`;
  }

  // ---- Number dots (for small whole-number counts) --------------------
  // For answer options that are small whole numbers (≤ 12), show a tally
  // of dots so pre-readers and kids with number-symbol weakness can
  // pattern-match against a counted quantity. Capped at 12 because higher
  // counts crowd the button.
  //
  // CONSISTENCY RULE: we only emit dots if EVERY option in the set
  // qualifies. If some options are dottable and others aren't, the row
  // looks lopsided — exactly the inconsistency autistic learners find
  // hard to parse. The caller passes the full options array (problem.options)
  // and we check upfront.
  function dotsChipHtml(n) {
    if (!Number.isFinite(n) || n < 1 || n > 12 || !Number.isInteger(n)) return "";
    const dots = Array.from({ length: n }).map(() =>
      `<span class="ans-dot"></span>`
    ).join("");
    return `<span class="ans-chips ans-chips-dots">${dots}</span>`;
  }
  function allOptionsDottable(opts) {
    if (!Array.isArray(opts) || opts.length === 0) return false;
    return opts.every((o) =>
      Number.isInteger(o) && o >= 1 && o <= 12
    );
  }

  // ---- Bill chips (dollar amounts) ------------------------------------
  // For options with `$` prefix. Greedy decomposition into $20, $10, $5, $1.
  function billSummary(dollars) {
    const denoms = [20, 10, 5, 1];
    const out = [];
    let r = dollars;
    for (const v of denoms) {
      const n = Math.floor(r / v);
      if (n > 0) { out.push({ count: n, value: v }); r -= n * v; }
    }
    return out;
  }
  function billChipsHtml(dollars) {
    if (!Number.isFinite(dollars) || dollars <= 0 || dollars > 100) return "";
    const summary = billSummary(dollars);
    if (!summary.length) return "";
    const chips = summary.map(({ count, value }) =>
      `<span class="ans-bill-chip ans-bill-${value}">${count}×$${value}</span>`
    ).join("");
    return `<span class="ans-chips ans-chips-bills">${chips}</span>`;
  }

  // ---- Public entry point ---------------------------------------------
  function format(opt, problem) {
    const suf = problem && problem.suffix ? problem.suffix : "";
    // $ is a prefix unit ($18); others suffix (18¢, 18 cm, 18 min, 18 mL).
    const text = suf === "$" ? `$${opt}` : (suf ? `${opt} ${suf}` : `${opt}`);

    // 1. Coin chip — numeric option + ¢ suffix
    if (suf === "¢" && typeof opt === "number") {
      const chip = coinChipsHtml(opt);
      if (chip) return `<span class="ans-text">${text}</span>${chip}`;
    }
    // 2. Bill chip — numeric option + $ suffix
    if (suf === "$" && typeof opt === "number") {
      const chip = billChipsHtml(opt);
      if (chip) return `<span class="ans-text">${text}</span>${chip}`;
    }
    // 3. Shape / time / pre-formatted string
    if (typeof opt === "string") {
      const shape = shapeChipHtml(opt);
      if (shape) return `<span class="ans-text">${text}</span>${shape}`;
      const time = timeChipHtml(opt);
      if (time) return `<span class="ans-text">${text}</span>${time}`;
    }
    // 4. Small-count dots — numeric option, no suffix or generic count
    //    suffix. Helpful for "how many sides?", "how many groups?" items
    //    where the answer is a small concrete count. Avoid for ¢/cm/mL
    //    suffixes where the number means a measurement, not a count.
    //    Apply ONLY when every option in the set qualifies, so the row
    //    looks consistent (no half-dotted answer cards).
    if (typeof opt === "number" && (!suf || suf === "" || suf === "groups" || suf === "sides" || suf === "corners")) {
      const opts = problem && problem.options;
      if (allOptionsDottable(opts)) {
        const dots = dotsChipHtml(opt);
        if (dots) return `<span class="ans-text">${text}</span>${dots}`;
      }
    }

    return text;
  }

  window.MR = window.MR || {};
  window.MR.AnswerChips = { format };
})();
