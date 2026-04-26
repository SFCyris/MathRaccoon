/*!
 * Measurement · Arcade — Jug Judge (capacity, mL).
 * Pairs with mea-op-capacity (CCSS 3.MD.2).
 */
(function () {
  MR.Content.registerGame({
    id: "arc-jug-judge",
    moduleId: "measurement",
    title: "Jug Judge",
    description: "Pour and subtract — how many milliliters?",
    emoji: "🥤",
    accent: "#7dd3fc",
    engine: "wordProblem",
    engineConfig: {
      topics: ["capacity"],
      problemsPerRound: 6,
      poolId: "mea-arcade-jug-judge", revisit: true,
    },
    learnOp: "mea-op-capacity",
  });
})();
