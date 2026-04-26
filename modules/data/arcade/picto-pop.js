/*!
 * Data · Arcade — Picto Pop (pictograph reading).
 * Pairs with dat-op-pictograph (CCSS 3.MD.3).
 * Uses wordProblem engine with equal-groups/join/compare for scale-key reading.
 */
(function () {
  MR.Content.registerGame({
    id: "arc-picto-pop",
    moduleId: "data",
    title: "Picto Pop",
    description: "Each icon stands for a number — count the row.",
    emoji: "🖼️",
    accent: "#c4b5fd",
    engine: "wordProblem",
    engineConfig: {
      topics: ["equal-groups", "compare", "join"],
      problemsPerRound: 6,
      poolId: "dat-arcade-picto-pop", revisit: true,
    },
    learnOp: "dat-op-pictograph",
  });
})();
