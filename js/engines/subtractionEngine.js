/**
 * subtractionEngine.js — 3rd→4th grade subtraction with three methods.
 */
(function () {
  const { randInt, pick, shuffle, buildOptions } = window.MR.Engines.Util;

  function generate(cfg = {}, qIndex = 0) {
    const digits = cfg.digits || 3;
    const ceiling = Math.pow(10, digits) - 1;
    const floor   = Math.pow(10, digits - 1);
    let a, b;
    if (cfg.regroup === false) {
      a = randInt(floor, ceiling);
      const aDigits = String(a).split("").map(Number);
      const bDigits = aDigits.map((d) => randInt(0, d));
      b = Number(bDigits.join("")) || randInt(1, Math.min(9, a - 1));
    } else {
      a = randInt(floor, ceiling);
      b = randInt(Math.max(1, Math.floor(floor / 2)), a - 1);
    }
    const answer = a - b;
    const method = cfg.method === "auto" || !cfg.method
      ? ["blocks", "numberline", "break"][qIndex % 3]
      : cfg.method;
    return { a, b, answer, method, options: buildOptions(answer, [1, -1, 10, -10, 9, -9, 11, -11]) };
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
          <div style="text-align:center;font-weight:800;color:var(--c-coral);font-size:1.1rem">− take away ${b}</div>
          ${renderBlocks(b)}
        </div>`;
    }

    if (method === "numberline") {
      const lo = Math.max(0, (a - b) - Math.max(5, Math.floor(b * 0.2)));
      const hi = a + 3;
      const range = hi - lo;
      const ticks = [];
      const major = range > 80 ? 20 : range > 40 ? 10 : 5;
      for (let v = lo; v <= hi; v += major) {
        const left = ((v - lo) / range) * 100;
        ticks.push(`<div class="tick" style="left:${left}%"></div>`);
        ticks.push(`<div class="tick-label" style="left:${left}%">${v}</div>`);
      }
      const hops = [];
      let pos = a, remaining = b, delay = 0.2;
      const tens = Math.floor(remaining / 10);
      for (let i = 0; i < tens; i++) {
        const from = pos, to = pos - 10;
        const leftStart = ((to - lo) / range) * 100;
        const w = ((from - to) / range) * 100;
        hops.push(`<div class="hop" style="left:${leftStart}%;width:${w}%;animation-delay:${delay}s;border-color:var(--c-coral)"></div>`);
        pos = to; delay += 0.12; remaining -= 10;
      }
      if (remaining > 0) {
        const from = pos, to = pos - remaining;
        const leftStart = ((to - lo) / range) * 100;
        const w = ((from - to) / range) * 100;
        hops.push(`<div class="hop" style="left:${leftStart}%;width:${w}%;animation-delay:${delay}s;border-color:var(--c-berry)"></div>`);
      }
      const startLeft = ((a - lo) / range) * 100;
      hops.push(`<div class="marker" style="left:${startLeft}%">🦝</div>`);
      return `
        <div class="number-line" style="padding-top:40px">
          <div class="line" style="position:relative">${ticks.join("")}${hops.join("")}</div>
        </div>
        <p style="text-align:center;color:var(--c-ink-soft);font-weight:600;margin:6px 0 0">
          Hop back from ${a} by ${Math.floor(b/10)} tens and ${b%10} ones.
        </p>`;
    }

    // break
    const digits = Math.max(String(a).length, String(b).length);
    const places = [];
    for (let p = digits - 1; p >= 0; p--) {
      const mult = Math.pow(10, p);
      const av = Math.floor(a / mult) % 10 * mult;
      const bv = Math.floor(b / mult) % 10 * mult;
      const names = ["ones", "tens", "hundreds", "thousands"];
      places.push({ name: names[p], av, bv, diff: av - bv });
    }
    return `
      <div style="display:grid;gap:8px;max-width:420px;margin:0 auto">
        <div style="display:flex;justify-content:space-between;font-weight:700;color:var(--c-ink-soft);font-size:0.85rem;padding:0 8px">
          <span>place</span><span>from</span><span>take</span><span>left</span>
        </div>
        ${places.map(({ name, av, bv, diff }) => `
          <div style="display:flex;justify-content:space-between;align-items:center;background:var(--c-cream);padding:10px 14px;border-radius:12px;font-family:var(--font-display);font-size:1.05rem">
            <span style="font-size:0.85rem;color:var(--c-ink-soft);font-family:var(--font-body);font-weight:700">${name}</span>
            <span style="color:var(--c-berry)">${av}</span>
            <span style="color:var(--c-coral)">−${bv}</span>
            <span style="color:var(--c-ink)">= ${diff}</span>
          </div>`).join("")}
        <div style="text-align:center;color:var(--c-ink-soft);font-weight:600">Now add the pieces!</div>
      </div>`;
  }

  function hintFor(problem) {
    const { a, b, method } = problem;
    if (method === "blocks") return `Start with ${a} blocks. Take away ${b}. How many are left?`;
    if (method === "numberline") return `Start at ${a} and hop back ${b}. Where do you land?`;
    return `Break ${a} and ${b} into places. Subtract each place, then combine!`;
  }

  function howTo() {
    return [
      { emoji: "🎯", line: "Subtraction means taking some away to find what's left." },
      { emoji: "🧱", line: "Blocks method: start with your number in hundreds, tens, ones. Cross out the amount to subtract." },
      { emoji: "🦝", line: "Number line method: start at the bigger number and hop back. Jump by tens first, then ones." },
      { emoji: "✂️", line: "Break-apart method: split each number into places. Subtract each place, then add the pieces." },
      { emoji: "⚡", line: "If you need to subtract more than you have in a place, regroup from the next place over!" },
    ];
  }

  window.MR.Engines.subtraction = { generate, renderVisual, hintFor, howTo, op: "−" };
})();
