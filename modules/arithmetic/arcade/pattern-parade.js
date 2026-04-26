/*!
 * Arithmetic · Arcade — Pattern Parade.
 * Drag the missing numbers/words into a pattern row (3.OA.9).
 * Uses dragDrop engine, kind: "arrange".
 */
(function () {
  MR.Content.registerGame({
    id: "arc-pattern-parade",
    moduleId: "arithmetic",
    title: "Pattern Parade",
    description: "Drag the missing pieces of each number pattern.",
    emoji: "🎵",
    accent: "#b78af0",
    engine: "dragDrop",
    engineConfig: {
      poolId: "ari-arcade-pattern-parade",
      problemsPerRound: 6,
      revisit: true,
    },
    learnOp: "ari-op-patterns",
  });
})();
