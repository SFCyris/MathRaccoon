/*!
 * Arithmetic · Arcade — Array Split.
 * Distributive-property drills (3.OA.5) using the `balance` drag kind.
 */
(function () {
  MR.Content.registerGame({
    id: "arc-array-split",
    moduleId: "arithmetic",
    title: "Array Split",
    description: "Fill in the distributive split so both sides match.",
    emoji: "🪟",
    accent: "#6ee7b7",
    engine: "dragDrop",
    engineConfig: {
      poolId: "ari-arcade-array-split",
      problemsPerRound: 6,
      revisit: true,
    },
    learnOp: "ari-op-distributive",
  });
})();
