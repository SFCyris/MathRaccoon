/*!
 * pools.js — central question-pool registry.
 *
 * A pool is a reusable bank of ready-to-use questions. Engines can sample
 * from a pool to build a non-repeating round, and teachers/parents can
 * expand a pool by adding more questions to its JSON data file — no code
 * changes needed.
 *
 * Pool shape (see pools/*.json.js for examples):
 *   {
 *     id:            "reading-arcade-simile",
 *     title:         "Simile Sprint",         // human label, optional
 *     askedPerRound: 8,                        // how many questions one round asks
 *     mode:          "figurative",             // optional — reading-engine mode hint
 *     questions: [
 *       {
 *         prompt:  "Her smile was as bright as the sun. What does this simile mean?",
 *         options: ["Her smile was very bright.", "Her smile was yellow.", ...],
 *         answer:  "Her smile was very bright.",
 *         hint:    "A simile compares using 'like' or 'as'.",
 *         passage: "optional — long text shown above the prompt"
 *       },
 *       ...
 *     ]
 *   }
 *
 * Each round the engine calls MR.Pools.sample(id, n) to draw n UNIQUE random
 * questions. If the pool has fewer than 3× askedPerRound questions we still
 * work, but rounds will feel repetitive across sessions — aim for 3× or more.
 */
(function () {
  const pools = {};

  function register(spec) {
    if (!spec || !spec.id) { console.warn("invalid pool spec", spec); return; }
    if (pools[spec.id]) { console.warn("duplicate pool id", spec.id); return; }
    pools[spec.id] = Object.freeze({
      id: spec.id,
      title: spec.title || spec.id,
      askedPerRound: spec.askedPerRound || 8,
      mode: spec.mode || null,
      questions: (spec.questions || []).slice(),
    });
  }

  function get(id) { return pools[id] || null; }
  function has(id) { return !!pools[id]; }

  // Return n random unique questions from pool.
  function sample(id, n) {
    const p = pools[id];
    if (!p) return [];
    const list = p.questions.slice();
    const take = Math.min(n, list.length);
    // Fisher–Yates shuffle up to `take` positions.
    for (let i = 0; i < take; i++) {
      const j = i + Math.floor(Math.random() * (list.length - i));
      const tmp = list[i]; list[i] = list[j]; list[j] = tmp;
    }
    return list.slice(0, take);
  }

  function all() { return Object.values(pools); }

  window.MR = window.MR || {};
  window.MR.Pools = { register, get, has, sample, all };
})();
