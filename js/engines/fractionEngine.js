/**
 * fractionEngine.js — fractions via pie slices, bars, and equivalent fractions.
 * 3rd→4th grade focus: halves/thirds/fourths/sixths/eighths, equivalents.
 */
(function () {
  const { randInt, pick, shuffle, buildFractionOptions } = window.MR.Engines.Util;

  function gcd(a, b) { return b ? gcd(b, a % b) : a; }
  function simplify(n, d) { const g = gcd(n, d); return { n: n / g, d: d / g }; }
  function eq(f1, f2) { const a = simplify(f1.n, f1.d), b = simplify(f2.n, f2.d); return a.n === b.n && a.d === b.d; }

  const COMMON = [
    { n: 1, d: 2 }, { n: 1, d: 3 }, { n: 2, d: 3 },
    { n: 1, d: 4 }, { n: 2, d: 4 }, { n: 3, d: 4 },
    { n: 1, d: 6 }, { n: 2, d: 6 }, { n: 3, d: 6 }, { n: 5, d: 6 },
    { n: 1, d: 8 }, { n: 2, d: 8 }, { n: 3, d: 8 }, { n: 5, d: 8 }, { n: 7, d: 8 },
  ];

  function generate(cfg = {}, qIndex = 0) {
    const modes = cfg.modes || ["name", "equivalent", "compare"];
    const mode = modes[qIndex % modes.length];
    const f = pick(COMMON);

    if (mode === "name") {
      // "What fraction is shaded?" — pick a fraction, show visual; answer is {n,d}
      const options = buildFractionOptions(f, [
        { n: (f.n % f.d) + 1, d: f.d },
        { n: f.n, d: f.d + 1 },
        pick(COMMON.filter((c) => !eq(c, f))),
      ]);
      return { mode, f, answer: f, options, visualKind: "pie" };
    }

    if (mode === "equivalent") {
      // Find equivalent: show f, ask which is equal
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

    // compare
    let other;
    do { other = pick(COMMON); } while (eq(other, f) || (f.n / f.d) === (other.n / other.d));
    const bigger = (f.n / f.d) > (other.n / other.d) ? f : other;
    // Represent as a textual answer: "f1 > f2" choices
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

  function fracLabel(f) { return `<span style="font-family:var(--font-display);font-weight:800;color:var(--c-berry);font-size:1.3rem"><span style="display:inline-block;text-align:center;border-bottom:3px solid currentColor;padding:0 4px">${f.n}</span><br><span style="display:inline-block;text-align:center;padding:0 4px">${f.d}</span></span>`; }

  function renderVisual(problem) {
    const { mode, f, other, visualKind } = problem;

    if (mode === "name") {
      return `
        <div style="display:flex;flex-direction:column;align-items:center;gap:12px">
          ${renderPie(f)}
          <p style="color:var(--c-ink-soft);font-weight:600;margin:0">What fraction is pink?</p>
        </div>`;
    }

    if (mode === "equivalent") {
      return `
        <div style="display:flex;flex-direction:column;align-items:center;gap:10px">
          <div style="display:flex;align-items:center;gap:14px">
            ${fracLabel(f)}
            ${renderBar(f, "#ff7a93")}
          </div>
          <p style="color:var(--c-ink-soft);font-weight:600;margin:4px 0">Which fraction shows the same amount?</p>
        </div>`;
    }

    // compare
    return `
      <div style="display:flex;flex-direction:column;align-items:center;gap:14px">
        <div style="display:flex;align-items:center;gap:14px">
          ${fracLabel(f)}${renderBar(f, "#ff7a93")}
        </div>
        <div style="display:flex;align-items:center;gap:14px">
          ${fracLabel(other)}${renderBar(other, "#7dd3fc")}
        </div>
        <p style="color:var(--c-ink-soft);font-weight:600;margin:4px 0">Which fraction is bigger?</p>
      </div>`;
  }

  function hintFor(problem) {
    const { mode, f } = problem;
    if (mode === "name") return `The top number (numerator) is how many pieces are pink. The bottom (denominator) is the total pieces.`;
    if (mode === "equivalent") return `Equivalent fractions show the same amount. Multiply top and bottom by the same number!`;
    return `When denominators are different, compare by seeing which bar is more full.`;
  }

  function howTo() {
    return [
      { emoji: "🥧", line: "A fraction has two parts: the top (numerator) counts pieces you have, the bottom (denominator) counts total pieces." },
      { emoji: "🟰", line: "Equivalent fractions look different but show the same amount. Like 1/2 and 2/4 — both are half!" },
      { emoji: "⚖️", line: "To compare, use pictures: which bar has more color? That's the bigger fraction." },
      { emoji: "✖️", line: "To make equivalent fractions, multiply top AND bottom by the same number." },
      { emoji: "🦝", line: "Remember: the denominator tells you how many pieces the whole is cut into." },
    ];
  }

  // Formatter used by the generic answer-button renderer
  function formatOption(opt) {
    return `<span style="display:inline-flex;flex-direction:column;align-items:center;line-height:1">
      <span style="border-bottom:3px solid currentColor;padding:0 6px">${opt.n}</span>
      <span style="padding:0 6px">${opt.d}</span>
    </span>`;
  }
  function optionsEqual(a, b) { return eq(a, b); }

  window.MR.Engines.fraction = {
    generate, renderVisual, hintFor, howTo, op: "",
    formatOption, optionsEqual, isFraction: true,
  };
})();
