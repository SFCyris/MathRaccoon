/*!
 * Arithmetic · Arcade — Share Shack (division).
 */
(function () {
  MR.Content.registerGame({
    id: "arc-share-shack",
    moduleId: "arithmetic",
    title: "Share Shack",
    description: "Share snacks evenly with fact-family division.",
    emoji: "🍪",
    accent: "#ffd93d",
    engine: "arithmetic",
    engineConfig: {
      op: "÷", minFactor: 2, maxFactor: 10, problemsPerRound: 8,
      poolId: "arith-arcade-share-shack", revisit: true,
    },
    requiresPass: "arc-multiply-mountain",
    unlocks: "arc-pie-pals",
  });
})();
