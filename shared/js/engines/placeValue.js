/*!
 * engines/placeValue.js — read, expanded form, rounding.
 * Ported from v1 placeValueEngine.js.
 */
(function () {
  const { randInt, buildOptions } = window.MR.Engines.Util;
  const PLACE_NAMES = ["ones", "tens", "hundreds", "thousands", "ten-thousands"];

  // planRound: draw from a pool. Pool question shape:
  //   { mode: "read"|"expanded"|"round", n: 4372,
  //     placeIdx?: 2 (for read),
  //     toPlace?: 100 (for round), hint? }
  function planRound(cfg = {}, total = 0) {
    if (!cfg.poolId || !window.MR.Pools || !window.MR.Pools.has(cfg.poolId)) return null;
    const drawn = window.MR.Pools.sample(cfg.poolId, total);
    return drawn.map((q) => buildPVFromPool(q));
  }

  function buildPVFromPool(q) {
    const mode = q.mode || "read";
    const n = Number(q.n);

    if (mode === "read") {
      const placeIdx = q.placeIdx != null ? Number(q.placeIdx) : 0;
      const placeName = PLACE_NAMES[placeIdx];
      const digit = Math.floor(n / Math.pow(10, placeIdx)) % 10;
      const opts = buildOptions(digit, [1, -1, 2, -2, 3, -3])
        .map((v) => Math.max(0, Math.min(9, v)))
        .filter((v, i, a) => a.indexOf(v) === i)
        .slice(0, 4);
      return { mode, n, placeIdx, placeName, answer: digit, options: opts, _hint: q.hint || "" };
    }

    if (mode === "expanded") {
      return {
        mode, n, answer: n,
        options: buildOptions(n, [1, -1, 10, -10, 100, -100, 1000, -1000]),
        _hint: q.hint || "",
      };
    }

    // round
    const toPlace = q.toPlace != null ? Number(q.toPlace) : 100;
    const answer = Math.round(n / toPlace) * toPlace;
    return {
      mode, n, toPlace, answer,
      options: buildOptions(answer, [toPlace, -toPlace, toPlace * 2, -toPlace * 2, toPlace / 10, -toPlace / 10]),
      _hint: q.hint || "",
    };
  }

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
      const opts = buildOptions(digit, [1, -1, 2, -2, 3, -3])
        .map((v) => Math.max(0, Math.min(9, v)))
        .filter((v, i, a) => a.indexOf(v) === i)
        .slice(0, 4);
      return { mode, n, placeIdx, placeName, answer: digit, options: opts };
    }

    if (mode === "expanded") {
      return {
        mode, n, answer: n,
        options: buildOptions(n, [1, -1, 10, -10, 100, -100, 1000, -1000]),
      };
    }

    const toPlace = cfg.roundTo || (digits >= 3 ? 100 : 10);
    const answer = Math.round(n / toPlace) * toPlace;
    return {
      mode, n, toPlace, answer,
      options: buildOptions(answer, [toPlace, -toPlace, toPlace * 2, -toPlace * 2, toPlace / 10, -toPlace / 10]),
    };
  }

  function renderPrompt(p) {
    if (p.mode === "read")     return `What digit is in the ${p.placeName} place of ${p.n}?`;
    if (p.mode === "expanded") return `Which number matches this expanded form?`;
    return `Round ${p.n} to the nearest ${p.toPlace}.`;
  }

  function renderVisual(p) {
    const digits = String(p.n).split("");
    const names = [];
    for (let i = digits.length - 1; i >= 0; i--) names.push(PLACE_NAMES[i]);
    const palette = ["#c4b5fd", "#7dd3fc", "#6ee7b7", "#ffd93d", "#ffb077"];
    const chart = `
      <div style="display:flex;justify-content:center;gap:6px;flex-wrap:wrap">
        ${digits.map((d, idx) => {
          const name = names[idx];
          const color = palette[names.length - idx - 1] || "#c4b5fd";
          return `
            <div style="min-width:58px;background:${color};border-radius:14px;padding:10px 8px;text-align:center">
              <div style="font-family:var(--font-display);font-size:1.8rem;color:var(--c-ink);line-height:1">${d}</div>
              <div style="font-size:0.7rem;font-weight:700;color:var(--c-ink);opacity:0.7;margin-top:4px">${name}</div>
            </div>`;
        }).join("")}
      </div>`;

    if (p.mode === "read") {
      return `<div style="display:grid;gap:12px;justify-items:center">${chart}</div>`;
    }
    if (p.mode === "expanded") {
      const parts = digits.map((d, idx) => Number(d) * Math.pow(10, digits.length - idx - 1)).filter((v) => v > 0);
      return `
        <div style="display:grid;gap:12px;justify-items:center">
          <div style="font-family:var(--font-display);font-size:1.6rem;color:var(--c-berry);text-align:center">
            ${parts.join(" + ") || "0"}
          </div>
        </div>`;
    }
    return `<div style="display:grid;gap:12px;justify-items:center">${chart}</div>`;
  }

  function hintFor(p) {
    if (p && p._hint) return p._hint;
    if (p.mode === "read")     return `Find the ${p.placeName} column. The digit sitting there is your answer.`;
    if (p.mode === "expanded") return `Add each part together to get the full number.`;
    return `Look at the digit just right of the ${p.toPlace}s place. 5 or more? Round up!`;
  }

  window.MR = window.MR || {};
  window.MR.Engines = window.MR.Engines || {};
  window.MR.Engines.placeValue = { generate, planRound, renderPrompt, renderVisual, hintFor };
})();
