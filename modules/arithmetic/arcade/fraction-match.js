/*!
 * Arithmetic · Arcade — Fraction Match.
 * Categorize fractions by their value (equivalent groups) — 3.NF.3.
 * Uses dragDrop engine, kind: "categorize".
 */
(function () {
  MR.Content.registerGame({
    id: "arc-fraction-match",
    moduleId: "arithmetic",
    title: "Fraction Match",
    description: "Sort each fraction into its equivalent-value bucket.",
    emoji: "🟰",
    accent: "#ff7a93",
    engine: "dragDrop",
    engineConfig: {
      poolId: "ari-arcade-fraction-match",
      problemsPerRound: 5,
      revisit: true,
    },
    learnOp: "ari-op-equivalent-fractions",
  });
})();
