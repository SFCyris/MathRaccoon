/*!
 * engines/common.js — shared utilities for problem engines.
 */
(function () {
  function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  function buildOptions(answer, deltas = [1, -1, 2, -2, 10, -10]) {
    const set = new Set([answer]);
    const pool = deltas.map((d) => answer + d).filter((v) => v > 0 && v !== answer);
    for (const v of shuffle(pool)) { set.add(v); if (set.size >= 4) break; }
    let tries = 0;
    while (set.size < 4 && tries++ < 20) {
      const v = answer + randInt(-6, 6);
      if (v > 0 && v !== answer) set.add(v);
    }
    return shuffle(Array.from(set)).slice(0, 4);
  }
  // Fractions come as {n,d} objects; dedupe via JSON stringify.
  function buildFractionOptions(answer, pool) {
    const set = new Set([JSON.stringify(answer)]);
    for (const p of shuffle(pool)) {
      set.add(JSON.stringify(p));
      if (set.size >= 4) break;
    }
    return shuffle(Array.from(set)).slice(0, 4).map((s) => JSON.parse(s));
  }

  window.MR = window.MR || {};
  window.MR.Engines = window.MR.Engines || {};
  window.MR.Engines.Util = { randInt, pick, shuffle, buildOptions, buildFractionOptions };
})();
