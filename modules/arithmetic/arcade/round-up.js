/*!
 * Arithmetic · Arcade — Round Up.
 * Drag each number onto the nearest 10 or 100 on the number line (3.NBT.1).
 * Uses dragDrop engine, kind: "numberLine".
 */
(function () {
  MR.Content.registerGame({
    id: "arc-round-up",
    moduleId: "arithmetic",
    title: "Round Up",
    description: "Drop each number onto its nearest 10 or 100.",
    emoji: "🎯",
    accent: "#ffd93d",
    engine: "dragDrop",
    engineConfig: {
      poolId: "ari-arcade-round-up",
      problemsPerRound: 6,
      revisit: true,
    },
    learnOp: "ari-op-rounding",
  });
})();
