/**
 * additionEngine.js — 3rd→4th grade addition with place-value visuals.
 * Config:
 *   range: [min, max] bounds for each addend
 *   digits: 2 | 3 | 4
 *   regroup: true | false (whether to allow carrying)
 *   method: "blocks" | "columns" | "breakapart" (or rotate when "auto")
 */
(function () {
  const { randInt, pick, shuffle, buildOptions } = window.MR.Engines.Util;

  function generate(cfg = {}, qIndex = 0) {
    const digits = cfg.digits || 3;
    const ceiling = Math.pow(10, digits) - 1;
    const floor   = Math.pow(10, digits - 1);
    const a = randInt(floor, ceiling);
    let b;
    if (cfg.regroup === false) {
      // Build b so no column carries (each digit sum < 10)
      const aDigits = String(a).split("").map(Number);
      const bDigits = aDigits.map((d) => randInt(0, 9 - d));
      b = Number(bDigits.join("")) || randInt(1, 9);
    } else {
      b = randInt(floor, Math.min(ceiling, cfg.maxB || ceiling));
    }
    const answer = a + b;
    const method = cfg.method === "auto" || !cfg.method
      ? ["blocks", "columns", "breakapart"][qIndex % 3]
      : cfg.method;
    return { a, b, answer, method, options: buildOptions(answer, [1, -1, 10, -10, 100, -100, 9, -9, 11, -11]) };
  }

  function renderBlocks(n) {
    const hundreds = Math.floor(n / 100);
    const tens     = Math.floor((n % 100) / 10);
    const ones     = n % 10;
    const h = Array(hundreds).fill(`<span class="block hundred"></span>`).join("");
    const t = Array(tens).fill(`<span class="block ten"></span>`).join("");
    const o = Array(ones).fill(`<span class="block one"></span>`).join("");
    const grp = (label, inner, show) =>
      show ? `<div class="block-group"><span class="label">${label}</span><div>${inner || `<span style="opacity:0.3">—</span>`}</div></div>` : "";
    return `<div class="blocks-row">${grp("hundreds", h, hundreds > 0)}${grp("tens", t, tens > 0 || hundreds > 0)}${grp("ones", o, true)}</div>`;
  }

  function renderVisual(problem) {
    const { a, b, method } = problem;

    if (method === "blocks") {
      return `
        <div style="display:grid;gap:10px">
          <div style="text-align:center;font-weight:700;color:var(--c-ink-soft)">Start with ${a}</div>
          ${renderBlocks(a)}
          <div style="text-align:center;font-weight:800;color:var(--c-mint);font-size:1.1rem">+ add ${b}</div>
          ${renderBlocks(b)}
          <div style="text-align:center;color:var(--c-ink-soft);font-weight:600">Put them all together!</div>
        </div>`;
    }

    if (method === "columns") {
      const maxLen = Math.max(String(a).length, String(b).length);
      const aStr = String(a).padStart(maxLen, " ");
      const bStr = String(b).padStart(maxLen, " ");
      const row = (s, prefix = "") => `
        <div style="display:flex;justify-content:flex-end;gap:8px;font-family:var(--font-display);font-size:2rem;color:var(--c-ink)">
          <span style="color:var(--c-coral);width:1.2em">${prefix}</span>
          ${s.split("").map((ch) => `<span style="width:1em;text-align:center">${ch === " " ? "" : ch}</span>`).join("")}
        </div>`;
      return `
        <div style="max-width:260px;margin:0 auto;padding:18px;background:var(--c-cream);border-radius:14px">
          ${row(aStr)}
          ${row(bStr, "+")}
          <div style="border-top:3px solid var(--c-berry);margin:6px 0"></div>
          <div style="text-align:center;color:var(--c-ink-soft);font-weight:600;font-size:0.85rem">Add the ones, then tens, then hundreds!</div>
        </div>`;
    }

    // break apart
    const digits = Math.max(String(a).length, String(b).length);
    const places = [];
    for (let p = digits - 1; p >= 0; p--) {
      const mult = Math.pow(10, p);
      const av = Math.floor(a / mult) % 10 * mult;
      const bv = Math.floor(b / mult) % 10 * mult;
      const names = ["ones", "tens", "hundreds", "thousands"];
      places.push({ name: names[p], av, bv, sum: av + bv });
    }
    return `
      <div style="display:grid;gap:8px;max-width:420px;margin:0 auto">
        <div style="display:flex;justify-content:space-between;font-weight:700;color:var(--c-ink-soft);font-size:0.85rem;padding:0 8px">
          <span>place</span><span>from A</span><span>from B</span><span>sum</span>
        </div>
        ${places.map(({ name, av, bv, sum }) => `
          <div style="display:flex;justify-content:space-between;align-items:center;background:var(--c-cream);padding:10px 14px;border-radius:12px;font-family:var(--font-display);font-size:1.05rem">
            <span style="font-size:0.85rem;color:var(--c-ink-soft);font-family:var(--font-body);font-weight:700">${name}</span>
            <span style="color:var(--c-berry)">${av}</span>
            <span style="color:var(--c-mint)">+${bv}</span>
            <span style="color:var(--c-ink)">= ${sum}</span>
          </div>`).join("")}
        <div style="text-align:center;color:var(--c-ink-soft);font-weight:600">Now add the pieces!</div>
      </div>`;
  }

  function hintFor(problem) {
    const { a, b, method } = problem;
    if (method === "blocks") return `Put together ${a} blocks and ${b} more. Count them all!`;
    if (method === "columns") return `Stack ${a} on top of ${b}. Add the ones first, carry if more than 9!`;
    return `Break ${a} and ${b} into places. Add each place, then combine!`;
  }

  function howTo() {
    return [
      { emoji: "🎯", line: "Addition means putting two groups together to find the total." },
      { emoji: "🧱", line: "The blocks method: each group has ones, tens, and hundreds. Combine them all." },
      { emoji: "📊", line: "The columns method: line up the digits. Add the ones column first, then tens, then hundreds." },
      { emoji: "✂️", line: "The break-apart method: split each number into place values, add each place, then put them back together." },
      { emoji: "🦝", line: "Tip: if a column adds to 10 or more, carry the extra 1 to the next column!" },
    ];
  }

  window.MR.Engines.addition = { generate, renderVisual, hintFor, howTo, op: "+" };
})();
