/*!
 * Arithmetic · Arcade — Bubble Blocks (addition).
 */
(function () {
  MR.Content.registerGame({
    id: "arc-bubble-blocks",
    moduleId: "arithmetic",
    title: "Bubble Blocks",
    description: "Add with colorful 2–3 digit sums.",
    emoji: "🧱",
    accent: "#6ee7b7",
    engine: "arithmetic",
    engineConfig: {
      op: "+", digits: 2, regroup: true, problemsPerRound: 8,
      poolId: "arith-arcade-bubble-blocks", revisit: true,
    },
    unlocks: "arc-treasure-trail",
  });
})();
