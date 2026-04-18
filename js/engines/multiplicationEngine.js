/**
 * multiplicationEngine.js — multiplication via arrays, groups, skip counting.
 * Supports 3rd grade (up to 10×10) and 4th grade (2-digit × 1-digit).
 */
(function () {
  const { randInt, pick, shuffle, buildOptions } = window.MR.Engines.Util;
  const OBJECTS = ["🍓", "🍎", "🌸", "⭐", "🦋", "🐞", "🍊", "🐝", "🌈", "🍇", "🐛", "🌰"];

  function generate(cfg = {}, qIndex = 0) {
    const maxA = cfg.maxA || 10;
    const maxB = cfg.maxB || 10;
    const minA = cfg.minA || 2;
    const minB = cfg.minB || 2;
    const a = randInt(minA, maxA);
    const b = randInt(minB, maxB);
    const method = cfg.method === "auto" || !cfg.method
      ? ["array", "groups", "skip"][qIndex % 3]
      : cfg.method;
    const answer = a * b;
    return { a, b, answer, method, emoji: pick(OBJECTS), options: buildOptions(answer, [1, -1, 2, -2, a, -a, b, -b]) };
  }

  function renderVisual(problem) {
    const { a, b, method, emoji } = problem;

    if (method === "array") {
      // Cap visual to keep the UI compact for larger 4th-grade factors
      const displayA = Math.min(a, 10);
      const displayB = Math.min(b, 10);
      const rows = [];
      for (let i = 0; i < displayA; i++) {
        const row = Array(displayB).fill(`<span class="object-emoji">${emoji}</span>`).join("");
        rows.push(`<div style="display:flex;gap:6px;justify-content:center">${row}</div>`);
      }
      return `
        <div class="visual-aid">
          <div class="group-of-objects" style="flex-direction:column">
            ${rows.join("")}
          </div>
        </div>
        <p style="text-align:center;color:var(--c-ink-soft);font-weight:600;margin:0">
          ${a} rows × ${b} in each row
        </p>`;
    }

    if (method === "groups") {
      const displayGroups = Math.min(a, 8);
      const displayPer = Math.min(b, 10);
      const groups = [];
      for (let i = 0; i < displayGroups; i++) {
        const objs = Array(displayPer).fill(`<span class="object-emoji">${emoji}</span>`).join("");
        groups.push(`<div class="group-of-objects">${objs}</div>`);
      }
      return `
        <div class="visual-aid">${groups.join("")}</div>
        <p style="text-align:center;color:var(--c-ink-soft);font-weight:600;margin:0">
          ${a} groups of ${b}
        </p>`;
    }

    // skip counting
    const max = a * b + Math.ceil(b * 0.5);
    const ticks = [];
    const hops = [];
    const step = Math.max(b, Math.ceil(max / 10));
    for (let i = 0; i <= max; i += step) {
      const left = Math.min(100, (i / max) * 100);
      ticks.push(`<div class="tick" style="left:${left}%"></div>`);
      ticks.push(`<div class="tick-label" style="left:${left}%">${i}</div>`);
    }
    for (let i = 1; i <= a; i++) {
      const leftStart = Math.min(100, ((i - 1) * b / max) * 100);
      const w = Math.min(100 - leftStart, (b / max) * 100);
      hops.push(`<div class="hop" style="left:${leftStart}%;width:${w}%;animation-delay:${i * 0.15}s"></div>`);
    }
    return `
      <div class="number-line">
        <div class="line">${ticks.join("")}${hops.join("")}</div>
      </div>
      <p style="text-align:center;color:var(--c-ink-soft);font-weight:600;margin:0">
        Skip count by ${b}, ${a} times!
      </p>`;
  }

  function hintFor(problem) {
    const { a, b, method } = problem;
    if (method === "array") return `This array has ${a} rows with ${b} in each row. Count them all!`;
    if (method === "groups") return `There are ${a} equal groups, each with ${b}. How many in total?`;
    return `Start at 0 and jump by ${b}s. How far do you get after ${a} jumps?`;
  }

  function howTo() {
    return [
      { emoji: "🎯", line: "Multiplication is a fast way to add the same number many times." },
      { emoji: "▦", line: "Array method: arrange items in equal rows. Count rows × items-per-row." },
      { emoji: "🧺", line: "Equal groups: put the same amount in each basket. Count baskets × items-per-basket." },
      { emoji: "🦘", line: "Skip counting: hop along the number line by the same amount until you've done it enough times." },
      { emoji: "🔄", line: "Cool trick: 3 × 4 is the same as 4 × 3! Order doesn't matter." },
    ];
  }

  window.MR.Engines.multiplication = { generate, renderVisual, hintFor, howTo, op: "×" };
})();
