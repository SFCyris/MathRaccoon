/**
 * divisionEngine.js — division via sharing, grouping, and fact families.
 * 3rd grade: ÷2, ÷5, ÷10, then full 1-digit divisors up to 100÷10.
 */
(function () {
  const { randInt, pick, shuffle, buildOptions } = window.MR.Engines.Util;
  const OBJECTS = ["🍓", "🌰", "🍎", "⭐", "🍪", "🎁", "🌸", "🐞"];

  function generate(cfg = {}, qIndex = 0) {
    // Ensure whole number results by choosing divisor × quotient
    const maxDivisor  = cfg.maxDivisor  || 10;
    const maxQuotient = cfg.maxQuotient || 10;
    const divisorPool = cfg.divisors || null;
    const divisor = divisorPool ? pick(divisorPool) : randInt(2, maxDivisor);
    const quotient = randInt(2, maxQuotient);
    const dividend = divisor * quotient;
    const method = cfg.method === "auto" || !cfg.method
      ? ["share", "group", "fact"][qIndex % 3]
      : cfg.method;
    return {
      a: dividend, b: divisor, answer: quotient, method, emoji: pick(OBJECTS),
      options: buildOptions(quotient, [1, -1, 2, -2, divisor, -divisor]),
    };
  }

  function renderVisual(problem) {
    const { a, b, answer, method, emoji } = problem;

    if (method === "share") {
      // a items shared among b friends
      const perFriend = answer;
      const friends = [];
      for (let i = 0; i < b; i++) {
        const objs = Array(perFriend).fill(`<span class="object-emoji">${emoji}</span>`).join("");
        friends.push(`<div class="group-of-objects" style="flex-direction:column;align-items:center">
          <div style="font-size:1.4rem">🦝</div>
          <div style="display:flex;gap:2px;flex-wrap:wrap;justify-content:center;max-width:120px">${objs}</div>
        </div>`);
      }
      return `
        <div class="visual-aid">${friends.join("")}</div>
        <p style="text-align:center;color:var(--c-ink-soft);font-weight:600;margin:0">
          ${a} shared fairly among ${b} friends — how many does each get?
        </p>`;
    }

    if (method === "group") {
      // Put a items into groups of b
      const groups = [];
      for (let i = 0; i < answer; i++) {
        const objs = Array(b).fill(`<span class="object-emoji">${emoji}</span>`).join("");
        groups.push(`<div class="group-of-objects">${objs}</div>`);
      }
      return `
        <div class="visual-aid">${groups.join("")}</div>
        <p style="text-align:center;color:var(--c-ink-soft);font-weight:600;margin:0">
          ${a} items packed into groups of ${b} — how many groups?
        </p>`;
    }

    // fact family
    return `
      <div style="max-width:340px;margin:0 auto;background:var(--c-cream);border-radius:14px;padding:16px;display:grid;gap:8px">
        <div style="text-align:center;font-weight:800;color:var(--c-berry);font-family:var(--font-display);font-size:1.3rem">
          Fact Family
        </div>
        <div style="display:grid;gap:6px;font-family:var(--font-display);font-size:1.1rem;color:var(--c-ink)">
          <div style="background:white;padding:10px 14px;border-radius:10px;display:flex;justify-content:space-between">
            <span>${b} × ${answer}</span><span>= ${a}</span>
          </div>
          <div style="background:white;padding:10px 14px;border-radius:10px;display:flex;justify-content:space-between">
            <span>${answer} × ${b}</span><span>= ${a}</span>
          </div>
          <div style="background:var(--c-sun);padding:10px 14px;border-radius:10px;display:flex;justify-content:space-between">
            <span>${a} ÷ ${b}</span><span>= ?</span>
          </div>
        </div>
        <p style="text-align:center;color:var(--c-ink-soft);font-weight:600;margin:4px 0 0">
          If ${b} × ? = ${a}, what is ?
        </p>
      </div>`;
  }

  function hintFor(problem) {
    const { a, b, method } = problem;
    if (method === "share") return `Share ${a} items among ${b} friends fairly. How many does each friend get?`;
    if (method === "group") return `Pack ${a} items into groups of ${b}. How many groups can you make?`;
    return `Division is the reverse of multiplication. Think: what times ${b} equals ${a}?`;
  }

  function howTo() {
    return [
      { emoji: "🎯", line: "Division means splitting a group into equal parts." },
      { emoji: "🤝", line: "Sharing: split items equally among friends. Count how many each friend gets." },
      { emoji: "📦", line: "Grouping: pack items into bundles of the same size. Count the bundles." },
      { emoji: "🔁", line: "Fact family trick: if 3 × 4 = 12, then 12 ÷ 3 = 4 and 12 ÷ 4 = 3." },
      { emoji: "🦝", line: "When stuck, use skip counting to find the answer: 3, 6, 9, 12…!" },
    ];
  }

  window.MR.Engines.division = { generate, renderVisual, hintFor, howTo, op: "÷" };
})();
