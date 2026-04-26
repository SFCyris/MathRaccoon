/*!
 * Arithmetic · Arcade — Thousand Quest.
 * Fluency practice with +/- within 1000 (3.NBT.2).
 * Uses the existing arithmetic engine; pool provides 3-digit pairs.
 */
(function () {
  MR.Content.registerGame({
    id: "arc-thousand-quest",
    moduleId: "arithmetic",
    title: "Thousand Quest",
    description: "Big numbers — add and subtract within 1000.",
    emoji: "🔢",
    accent: "#6ee7b7",
    engine: "arithmetic",
    engineConfig: {
      digits: 3,
      problemsPerRound: 6,
      poolId: "ari-arcade-thousand-quest",
      revisit: true,
    },
  });
})();
