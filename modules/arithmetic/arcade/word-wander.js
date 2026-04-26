/*!
 * Arithmetic · Arcade — Word Wander (word problems, single-step).
 * Pairs with ari-op-word-problems: join / separate / compare.
 */
(function () {
  MR.Content.registerGame({
    id: "arc-word-wander",
    moduleId: "arithmetic",
    title: "Word Wander",
    description: "Single-step story problems: put together, take apart, compare.",
    emoji: "📖",
    accent: "#ffd6a5",
    engine: "wordProblem",
    engineConfig: {
      topics: ["join", "separate", "compare"],
      problemsPerRound: 8,
      poolId: "arith-arcade-word-wander", revisit: true,
    },
  });
})();
