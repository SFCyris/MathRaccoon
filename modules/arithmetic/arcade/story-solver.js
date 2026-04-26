/*!
 * Arithmetic · Arcade — Story Solver (multi-step & equal-groups word problems).
 * Pairs with ari-op-word-problems: equal-groups / share / two-step (CCSS 3.OA.3, 3.OA.8).
 */
(function () {
  MR.Content.registerGame({
    id: "arc-story-solver",
    moduleId: "arithmetic",
    title: "Story Solver",
    description: "Multi-step & equal-groups stories — harder reasoning.",
    emoji: "🧩",
    accent: "#c4b5fd",
    engine: "wordProblem",
    engineConfig: {
      topics: ["equal-groups", "share", "two-step"],
      problemsPerRound: 8,
      poolId: "arith-arcade-story-solver", revisit: true,
    },
  });
})();
