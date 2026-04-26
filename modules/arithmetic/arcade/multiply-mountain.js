/*!
 * Arithmetic · Arcade — Multiply Mountain.
 */
(function () {
  MR.Content.registerGame({
    id: "arc-multiply-mountain",
    moduleId: "arithmetic",
    title: "Multiply Mountain",
    description: "Equal groups and arrays up to 10 × 10.",
    emoji: "🏔️",
    accent: "#ff7a93",
    engine: "arithmetic",
    engineConfig: {
      op: "×", minFactor: 2, maxFactor: 10, problemsPerRound: 8,
      poolId: "arith-arcade-multiply-mountain", revisit: true,
    },
    requiresPass: "arc-treasure-trail",
    unlocks: "arc-share-shack",
  });
})();
