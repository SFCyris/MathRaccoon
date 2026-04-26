/*!
 * Measurement · Arcade — Clock Quest (telling time, minutes & hours).
 * Pairs with mea-op-time (CCSS 3.MD.1).
 */
(function () {
  MR.Content.registerGame({
    id: "arc-clock-quest",
    moduleId: "measurement",
    title: "Clock Quest",
    description: "Read the clock — what time does it say?",
    emoji: "⏰",
    accent: "#ffd93d",
    engine: "wordProblem",
    engineConfig: {
      topics: ["time"],
      problemsPerRound: 6,
      poolId: "mea-arcade-clock-quest", revisit: true,
    },
    learnOp: "mea-op-time",
  });
})();
