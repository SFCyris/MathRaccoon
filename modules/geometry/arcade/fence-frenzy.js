/*!
 * Geometry · Arcade — Fence Frenzy (perimeter, add edges).
 * Pairs with geo-op-perimeter (CCSS 3.MD.8).
 */
(function () {
  MR.Content.registerGame({
    id: "arc-fence-frenzy",
    moduleId: "geometry",
    title: "Fence Frenzy",
    description: "Walk the edge — sum every side to find the perimeter.",
    emoji: "🚧",
    accent: "#6ee7b7",
    engine: "wordProblem",
    engineConfig: {
      topics: ["length"],
      problemsPerRound: 6,
      poolId: "geo-arcade-fence-frenzy", revisit: true,
    },
    learnOp: "geo-op-perimeter",
  });
})();
