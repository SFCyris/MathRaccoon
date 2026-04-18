/**
 * placeValueEngine.js — place value & rounding, 3rd→4th grade.
 * Modes: "read" (what digit is in place X?), "expanded" (expanded form), "round"
 */
(function () {
  const { randInt, pick, shuffle, buildOptions } = window.MR.Engines.Util;
  const PLACE_NAMES = ["ones", "tens", "hundreds", "thousands", "ten-thousands"];

  function generate(cfg = {}, qIndex = 0) {
    const digits = cfg.digits || 4;
    const modes = cfg.modes || ["read", "expanded", "round"];
    const mode = modes[qIndex % modes.length];

    const lo = Math.pow(10, digits - 1);
    const hi = Math.pow(10, digits) - 1;
    const n = randInt(lo, hi);

    if (mode === "read") {
      const placeIdx = randInt(0, digits - 1);
      const placeName = PLACE_NAMES[placeIdx];
      const digit = Math.floor(n / Math.pow(10, placeIdx)) % 10;
      return {
        mode, n, placeIdx, placeName, answer: digit,
        options: buildOptions(digit, [1, -1, 2, -2, 3, -3]).map((v) => Math.max(0, Math.min(9, v))).filter((v, i, a) => a.indexOf(v) === i).slice(0, 4),
      };
    }

    if (mode === "expanded") {
      // Show expanded form like 3000 + 400 + 20 + 5 and ask the number
      return {
        mode, n, answer: n,
        options: buildOptions(n, [1, -1, 10, -10, 100, -100, 1000, -1000]),
      };
    }

    // round — to nearest 10 or 100
    const toPlace = cfg.roundTo || (digits >= 3 ? 100 : 10);
    const answer = Math.round(n / toPlace) * toPlace;
    return {
      mode, n, toPlace, answer,
      options: buildOptions(answer, [toPlace, -toPlace, toPlace * 2, -toPlace * 2, toPlace / 10, -toPlace / 10]),
    };
  }

  function renderVisual(problem) {
    const { mode, n } = problem;
    const digits = String(n).split("");
    const names = [];
    for (let i = digits.length - 1; i >= 0; i--) names.push(PLACE_NAMES[i]);

    const chart = `
      <div style="display:flex;justify-content:center;gap:6px;flex-wrap:wrap">
        ${digits.map((d, idx) => {
          const name = names[idx];
          const color = ["#c4b5fd", "#7dd3fc", "#6ee7b7", "#ffd93d", "#ffb077"][names.length - idx - 1] || "#c4b5fd";
          return `
            <div style="min-width:58px;background:${color};border-radius:14px;padding:10px 8px;text-align:center">
              <div style="font-family:var(--font-display);font-size:1.8rem;color:var(--c-ink);line-height:1">${d}</div>
              <div style="font-size:0.7rem;font-weight:700;color:var(--c-ink);opacity:0.7;margin-top:4px">${name}</div>
            </div>`;
        }).join("")}
      </div>`;

    if (mode === "read") {
      return `
        <div style="display:grid;gap:16px;justify-items:center">
          ${chart}
          <p style="color:var(--c-ink-soft);font-weight:700;margin:0;font-size:1.1rem">
            What digit is in the <strong style="color:var(--c-coral)">${problem.placeName}</strong> place?
          </p>
        </div>`;
    }

    if (mode === "expanded") {
      const parts = digits.map((d, idx) => {
        const mult = Math.pow(10, digits.length - idx - 1);
        return Number(d) * mult;
      }).filter((v) => v > 0);
      return `
        <div style="display:grid;gap:16px;justify-items:center">
          <div style="font-family:var(--font-display);font-size:1.6rem;color:var(--c-berry);text-align:center">
            ${parts.join(" + ") || "0"}
          </div>
          <p style="color:var(--c-ink-soft);font-weight:700;margin:0">
            What number is this expanded form?
          </p>
        </div>`;
    }

    // round
    const { toPlace } = problem;
    return `
      <div style="display:grid;gap:16px;justify-items:center">
        ${chart}
        <p style="color:var(--c-ink-soft);font-weight:700;margin:0;font-size:1.1rem">
          Round <strong style="color:var(--c-coral)">${n}</strong> to the nearest <strong>${toPlace}</strong>.
        </p>
      </div>`;
  }

  function hintFor(problem) {
    if (problem.mode === "read") return `Look for the ${problem.placeName} column in the chart. That digit is your answer!`;
    if (problem.mode === "expanded") return `Add the pieces: each part tells you the value of a place.`;
    return `Look at the digit just to the right of the ${problem.toPlace}s place. If it's 5 or more, round up!`;
  }

  function howTo() {
    return [
      { emoji: "📍", line: "Every digit in a number has a place: ones, tens, hundreds, thousands..." },
      { emoji: "🔢", line: "The place tells you the digit's value. In 348, the 4 means 40 because it's in the tens place." },
      { emoji: "✂️", line: "Expanded form breaks a number into places: 348 = 300 + 40 + 8." },
      { emoji: "🎯", line: "To round, look at the digit to the right. 5 or more? Round up. Less than 5? Round down." },
      { emoji: "🦝", line: "Rounding gives a nearby friendly number, great for quick estimating!" },
    ];
  }

  window.MR.Engines.placeValue = { generate, renderVisual, hintFor, howTo, op: "" };
})();
