/*!
 * Geometry · Arcade — Shape Sleuth (shape attributes, side counts).
 * Pairs with geo-op-shapes (CCSS 3.G.1).
 * Uses the arithmetic engine for side-count sums while the dedicated
 * shapes engine matures.
 */
(function () {
  MR.Content.registerGame({
    id: "arc-shape-sleuth",
    moduleId: "geometry",
    title: "Shape Sleuth",
    description: "Tally sides, count corners, spot the quadrilateral.",
    emoji: "🔷",
    accent: "#7dd3fc",
    engine: "wordProblem",
    engineConfig: {
      topics: ["equal-groups"],
      problemsPerRound: 6,
      poolId: "geo-arcade-shape-sleuth", revisit: true,
    },
    learnOp: "geo-op-shapes",
  });
})();
