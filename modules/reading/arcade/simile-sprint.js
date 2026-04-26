/*!
 * Reading · Arcade — Simile Sprint (figurative mix).
 */
(function () {
  MR.Content.registerGame({
    id: "arc-simile-sprint",
    moduleId: "reading",
    title: "Simile Sprint",
    description: "Similes, metaphors, and idioms — as fast as you can!",
    emoji: "🌈",
    accent: "#ffb37a",
    engine: "reading",
    engineConfig: {
      poolId: "reading-arcade-simile",
      problemsPerRound: 8,
      revisit: true,
    },
    unlocks: "arc-library-lookup",
    learnOp: "rd-op-figurative",
  });
})();
