/*!
 * Arithmetic · Arcade — Ten Times.
 * Quick multiplication drills with multiples of 10 (3.NBT.3).
 */
(function () {
  MR.Content.registerGame({
    id: "arc-ten-times",
    moduleId: "arithmetic",
    title: "Ten Times",
    description: "Lightning-fast × 10, × 20, × 30, × 40…",
    emoji: "⚡",
    accent: "#f4c77a",
    engine: "arithmetic",
    engineConfig: {
      problemsPerRound: 6,
      poolId: "ari-arcade-ten-times",
      revisit: true,
    },
    learnOp: "ari-op-times-ten",
  });
})();
