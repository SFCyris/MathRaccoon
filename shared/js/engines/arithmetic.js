/*!
 * engines/arithmetic.js — +, −, ×, ÷ problem generators.
 *
 * Exposes one engine object per op, plus a dispatcher:
 *   MR.Engines.arithmetic.generate({ op: "+", ... }, qIndex) → problem
 *   MR.Engines.arithmetic.renderVisual(problem) → HTML string
 *   MR.Engines.arithmetic.hintFor(problem) → string
 */
(function () {
  const { randInt, buildOptions } = window.MR.Engines.Util;

  // ---- Addition ----
  function addGen(cfg, qIndex) {
    const digits = cfg.digits || 2;
    const ceiling = Math.pow(10, digits) - 1;
    const floor   = Math.pow(10, digits - 1);
    const a = randInt(floor, ceiling);
    let b;
    if (cfg.regroup === false) {
      const aDigits = String(a).split("").map(Number);
      const bDigits = aDigits.map((d) => randInt(0, 9 - d));
      b = Number(bDigits.join("")) || randInt(1, 9);
    } else {
      b = randInt(floor, ceiling);
    }
    const answer = a + b;
    return { op: "+", a, b, answer, options: buildOptions(answer, [1, -1, 10, -10, 9, -9, 11, -11]) };
  }
  function addHint(p) { return `Put ${p.a} and ${p.b} together. How many altogether?`; }

  // ---- Subtraction ----
  function subGen(cfg) {
    const digits = cfg.digits || 2;
    const ceiling = Math.pow(10, digits) - 1;
    const floor   = Math.pow(10, digits - 1);
    const a = randInt(floor, ceiling);
    const b = randInt(1, a);
    const answer = a - b;
    return { op: "-", a, b, answer, options: buildOptions(answer, [1, -1, 10, -10]) };
  }
  function subHint(p) { return `Take ${p.b} away from ${p.a}. How many are left?`; }

  // ---- Multiplication ----
  function mulGen(cfg) {
    const max = cfg.maxFactor || 10;
    const min = cfg.minFactor || 2;
    const a = randInt(min, max);
    const b = randInt(min, max);
    const answer = a * b;
    return { op: "×", a, b, answer, options: buildOptions(answer, [a, -a, b, -b, 1, -1]) };
  }
  function mulHint(p) { return `${p.a} groups of ${p.b}. How many in total?`; }

  // ---- Division ----
  function divGen(cfg) {
    const max = cfg.maxFactor || 10;
    const min = cfg.minFactor || 2;
    const b = randInt(min, max);
    const q = randInt(min, max);
    const a = b * q;
    return { op: "÷", a, b, answer: q, options: buildOptions(q, [1, -1, 2, -2]) };
  }
  function divHint(p) { return `Share ${p.a} equally into ${p.b} groups. How many per group?`; }

  const engines = {
    "+": { gen: addGen, hint: addHint },
    "-": { gen: subGen, hint: subHint },
    "×": { gen: mulGen, hint: mulHint },
    "÷": { gen: divGen, hint: divHint },
  };

  function generate(cfg = {}, qIndex = 0) {
    const op = cfg.op || "+";
    const e = engines[op];
    if (!e) throw new Error(`Unknown op: ${op}`);
    return e.gen(cfg, qIndex);
  }

  // planRound: if a pool is configured, pre-draw N unique questions so the
  // round has no duplicates and teachers can curate the exact a/b pairs
  // by editing pools/math-raccoon-*-arcade-*.js. Falls back to procedural.
  function planRound(cfg = {}, total = 0) {
    if (!cfg.poolId || !window.MR.Pools || !window.MR.Pools.has(cfg.poolId)) return null;
    const pool = window.MR.Pools.get(cfg.poolId);
    const poolOp = pool.op || cfg.op || "+";
    const drawn = window.MR.Pools.sample(cfg.poolId, total);
    return drawn.map((q) => buildArithFromPool(q, poolOp));
  }

  function buildArithFromPool(q, poolOp) {
    const op = q.op || poolOp;
    const a = Number(q.a);
    const b = Number(q.b);
    let answer;
    if (op === "+") answer = a + b;
    else if (op === "-") answer = a - b;
    else if (op === "×" || op === "*") answer = a * b;
    else if (op === "÷" || op === "/") answer = a / b;
    else throw new Error(`Unknown op in pool: ${op}`);
    const deltas = op === "×" ? [a, -a, b, -b, 1, -1]
                 : op === "÷" ? [1, -1, 2, -2]
                 : [1, -1, 10, -10, 9, -9, 11, -11];
    return {
      op: op === "*" ? "×" : op === "/" ? "÷" : op,
      a, b, answer,
      options: buildOptions(answer, deltas),
      _hint: q.hint || "",
    };
  }

  function hintFor(p) {
    if (p && p._hint) return p._hint;
    const e = engines[p.op];
    return e ? e.hint(p) : "";
  }

  function renderPrompt(p) {
    return `${p.a} ${p.op} ${p.b} = ?`;
  }

  // ---- Visuals ----
  function blocksForNumber(n) {
    const hundreds = Math.floor(n / 100);
    const tens     = Math.floor((n % 100) / 10);
    const ones     = n % 10;

    function group(label, count, cls, show) {
      if (!show) return "";
      const blocks = count > 0
        ? Array.from({ length: count },
            () => `<span class="pv-block ${cls}"></span>`).join("")
        : `<span style="opacity:0.4;font-size:0.9rem">—</span>`;
      return `
        <div class="block-group">
          <span class="bg-label">${label}</span>
          <div class="bg-blocks">${blocks}</div>
        </div>`;
    }

    return `<div class="blocks-row">
      ${group("hundreds", hundreds, "hundred", hundreds > 0)}
      ${group("tens",     tens,     "ten",     tens > 0 || hundreds > 0)}
      ${group("ones",     ones,     "one",     true)}
    </div>`;
  }

  function renderAddVisual(p) {
    return `
      <div style="display:grid;gap:10px;margin-top:18px">
        <div style="font-weight:700;color:var(--c-ink-soft)">Start with ${p.a}</div>
        ${blocksForNumber(p.a)}
        <div style="font-weight:800;color:var(--c-mint);font-size:1.05rem">+ add ${p.b}</div>
        ${blocksForNumber(p.b)}
        <div style="color:var(--c-ink-soft);font-weight:600">Put them all together!</div>
      </div>`;
  }

  function renderSubVisual(p) {
    return `
      <div style="display:grid;gap:10px;margin-top:18px">
        <div style="font-weight:700;color:var(--c-ink-soft)">Start with ${p.a}</div>
        ${blocksForNumber(p.a)}
        <div style="font-weight:800;color:var(--c-coral);font-size:1.05rem">− take away ${p.b}</div>
        ${blocksForNumber(p.b)}
        <div style="color:var(--c-ink-soft);font-weight:600">How many are left?</div>
      </div>`;
  }

  function renderGroupVisual(groups, per) {
    const boxes = Array.from({ length: groups }, () => {
      const dots = Array.from({ length: per }, () => `<span class="group-dot"></span>`).join("");
      return `<div class="group-box">${dots}</div>`;
    }).join("");
    return `<div class="group-row" style="margin-top:18px">${boxes}</div>`;
  }

  function renderVisual(p) {
    if (p.op === "+") return renderAddVisual(p);
    if (p.op === "-") return renderSubVisual(p);
    if (p.op === "×") return `
      <div style="margin-top:18px">
        <div style="font-weight:700;color:var(--c-ink-soft);margin-bottom:8px">${p.a} groups of ${p.b}</div>
        ${renderGroupVisual(p.a, p.b)}
      </div>`;
    if (p.op === "÷") return `
      <div style="margin-top:18px">
        <div style="font-weight:700;color:var(--c-ink-soft);margin-bottom:8px">Share ${p.a} into ${p.b} groups</div>
        ${renderGroupVisual(p.b, p.answer)}
      </div>`;
    return "";
  }

  // Per-op sub-engine (so the shared runner can look up engine.op from the registered engine).
  // The dispatch engine below exposes the union that runner.js calls into.
  window.MR = window.MR || {};
  window.MR.Engines = window.MR.Engines || {};

  // Wrapper: when runner reads engine.op, we hand back the op from config via a getter
  // on the returned problem. Since the runner reads it from engine directly, we expose
  // a proxy that reflects the last-generated op.
  let lastOp = "+";
  function generateAndTrack(cfg = {}, qIndex = 0) {
    const p = generate(cfg, qIndex);
    lastOp = p.op;
    return p;
  }

  function planRoundAndTrack(cfg = {}, total = 0) {
    const planned = planRound(cfg, total);
    if (planned && planned.length) lastOp = planned[0].op;
    return planned;
  }

  window.MR.Engines.arithmetic = {
    generate: generateAndTrack,
    planRound: planRoundAndTrack,
    hintFor,
    renderPrompt,
    renderVisual,
    get op() { return lastOp; },
  };
})();
