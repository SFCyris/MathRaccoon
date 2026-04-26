/*!
 * engines/fraction.js — name / equivalent / compare fractions.
 * Ported from v1 fractionEngine.js.
 */
(function () {
  const { pick, buildFractionOptions } = window.MR.Engines.Util;

  function gcd(a, b) { return b ? gcd(b, a % b) : a; }
  function simplify(n, d) { const g = gcd(n, d); return { n: n / g, d: d / g }; }
  function eq(f1, f2) { const a = simplify(f1.n, f1.d), b = simplify(f2.n, f2.d); return a.n === b.n && a.d === b.d; }

  const COMMON = [
    { n: 1, d: 2 }, { n: 1, d: 3 }, { n: 2, d: 3 },
    { n: 1, d: 4 }, { n: 2, d: 4 }, { n: 3, d: 4 },
    { n: 1, d: 6 }, { n: 2, d: 6 }, { n: 3, d: 6 }, { n: 5, d: 6 },
    { n: 1, d: 8 }, { n: 2, d: 8 }, { n: 3, d: 8 }, { n: 5, d: 8 }, { n: 7, d: 8 },
  ];

  // planRound: draw from a pool when cfg.poolId is set.
  // Pool question shape:
  //   { mode: "name"|"equivalent"|"compare", f: {n,d},
  //     other?: {n,d} (for compare), equiv?: {n,d} (for equivalent), hint? }
  function planRound(cfg = {}, total = 0) {
    if (!cfg.poolId || !window.MR.Pools || !window.MR.Pools.has(cfg.poolId)) return null;
    const drawn = window.MR.Pools.sample(cfg.poolId, total);
    return drawn.map((q) => buildFracFromPool(q));
  }

  function buildFracFromPool(q) {
    const mode = q.mode || "name";
    const f = q.f;
    if (mode === "name") {
      const options = buildFractionOptions(f, [
        { n: (f.n % f.d) + 1, d: f.d },
        { n: f.n, d: f.d + 1 },
        pick(COMMON.filter((c) => !eq(c, f))),
      ]);
      return { mode, f, answer: f, options, visualKind: "pie", _hint: q.hint || "" };
    }
    if (mode === "equivalent") {
      const mult = q.mult || 2;
      const equiv = q.equiv || { n: f.n * mult, d: f.d * mult };
      const fakes = [
        { n: f.n + 1, d: equiv.d },
        { n: equiv.n, d: equiv.d + 1 },
        pick(COMMON.filter((c) => !eq(c, f))),
      ];
      const options = buildFractionOptions(equiv, fakes);
      return { mode, f, answer: equiv, options, visualKind: "bar-compare", equiv, _hint: q.hint || "" };
    }
    // compare
    const other = q.other;
    const bigger = (f.n / f.d) > (other.n / other.d) ? f : other;
    return {
      mode, f, other, answer: bigger, visualKind: "bar-compare",
      options: [f, other, { n: f.n, d: other.d }, { n: other.n, d: f.d }],
      _hint: q.hint || "",
    };
  }

  function generate(cfg = {}, qIndex = 0) {
    const modes = cfg.modes || ["name", "equivalent", "compare"];
    const mode = modes[qIndex % modes.length];
    const f = pick(COMMON);

    if (mode === "name") {
      const options = buildFractionOptions(f, [
        { n: (f.n % f.d) + 1, d: f.d },
        { n: f.n, d: f.d + 1 },
        pick(COMMON.filter((c) => !eq(c, f))),
      ]);
      return { mode, f, answer: f, options, visualKind: "pie" };
    }

    if (mode === "equivalent") {
      const mult = pick([2, 3, 4]);
      const equiv = { n: f.n * mult, d: f.d * mult };
      const fakes = [
        { n: f.n + 1, d: f.d * mult },
        { n: f.n * mult, d: f.d * mult + 1 },
        pick(COMMON.filter((c) => !eq(c, f))),
      ];
      const options = buildFractionOptions(equiv, fakes);
      return { mode, f, answer: equiv, options, visualKind: "bar-compare", equiv };
    }

    let other;
    do { other = pick(COMMON); } while (eq(other, f) || (f.n / f.d) === (other.n / other.d));
    const bigger = (f.n / f.d) > (other.n / other.d) ? f : other;
    return {
      mode, f, other, answer: bigger, visualKind: "bar-compare",
      options: [f, other, { n: f.n, d: other.d }, { n: other.n, d: f.d }],
    };
  }

  function renderPie(f, size = 140) {
    const slices = [];
    const cx = size / 2, cy = size / 2, r = size / 2 - 4;
    const step = (2 * Math.PI) / f.d;
    for (let i = 0; i < f.d; i++) {
      const a0 = -Math.PI / 2 + i * step;
      const a1 = a0 + step;
      const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
      const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
      const large = step > Math.PI ? 1 : 0;
      const fill = i < f.n ? "#ff7a93" : "#fff4d6";
      slices.push(`<path d="M${cx} ${cy} L${x0} ${y0} A${r} ${r} 0 ${large} 1 ${x1} ${y1} Z" fill="${fill}" stroke="#3a2e5f" stroke-width="2"/>`);
    }
    return `<svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">${slices.join("")}</svg>`;
  }

  function renderBar(f, color = "#ff7a93", width = 220, height = 28) {
    const segW = width / f.d;
    const segs = [];
    for (let i = 0; i < f.d; i++) {
      const fill = i < f.n ? color : "#fff4d6";
      segs.push(`<rect x="${i * segW}" y="0" width="${segW}" height="${height}" fill="${fill}" stroke="#3a2e5f" stroke-width="2"/>`);
    }
    return `<svg viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">${segs.join("")}</svg>`;
  }

  function fracLabel(f) {
    return `<span style="display:inline-flex;flex-direction:column;align-items:center;font-family:var(--font-display);font-weight:800;color:var(--c-berry);font-size:1.1rem;line-height:1">
      <span style="border-bottom:3px solid currentColor;padding:0 6px">${f.n}</span>
      <span style="padding:0 6px">${f.d}</span>
    </span>`;
  }

  function renderPrompt(p) {
    if (p.mode === "name")       return `What fraction is shaded?`;
    if (p.mode === "equivalent") return `Which fraction is equal to this one?`;
    return `Which fraction is bigger?`;
  }

  function renderVisual(p) {
    if (p.mode === "name") {
      return `<div style="display:flex;flex-direction:column;align-items:center;gap:12px">${renderPie(p.f)}</div>`;
    }
    if (p.mode === "equivalent") {
      return `
        <div style="display:flex;flex-direction:column;align-items:center;gap:10px">
          <div style="display:flex;align-items:center;gap:14px">
            ${fracLabel(p.f)}
            ${renderBar(p.f, "#ff7a93")}
          </div>
        </div>`;
    }
    return `
      <div style="display:flex;flex-direction:column;align-items:center;gap:14px">
        <div style="display:flex;align-items:center;gap:14px">${fracLabel(p.f)}${renderBar(p.f, "#ff7a93")}</div>
        <div style="display:flex;align-items:center;gap:14px">${fracLabel(p.other)}${renderBar(p.other, "#7dd3fc")}</div>
      </div>`;
  }

  function hintFor(p) {
    if (p && p._hint) return p._hint;
    if (p.mode === "name")       return `Top is how many pieces are pink. Bottom is the total pieces.`;
    if (p.mode === "equivalent") return `Multiply top AND bottom by the same number to get an equal fraction.`;
    return `Compare the bars — the fuller one is the bigger fraction.`;
  }

  function formatOption(opt) {
    return `<span style="display:inline-flex;flex-direction:column;align-items:center;line-height:1">
      <span style="border-bottom:3px solid currentColor;padding:0 6px">${opt.n}</span>
      <span style="padding:0 6px">${opt.d}</span>
    </span>`;
  }
  function optionsEqual(a, b) { return eq(a, b); }

  window.MR = window.MR || {};
  window.MR.Engines = window.MR.Engines || {};
  window.MR.Engines.fraction = {
    generate, planRound, renderPrompt, renderVisual, hintFor,
    formatOption, optionsEqual,
  };
})();
