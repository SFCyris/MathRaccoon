/*!
 * Geometry · Arcade — Slice & Shade.
 * Click pieces of a pre-cut shape to shade the right fraction — 3.G.2.
 * Uses dragDrop engine, kind: "partition".
 */
(function () {
  MR.Content.registerGame({
    id: "arc-slice-shade",
    moduleId: "geometry",
    title: "Slice & Shade",
    description: "Shade the right fraction of each pizza or rectangle.",
    emoji: "🍕",
    accent: "#ff7a93",
    engine: "dragDrop",
    engineConfig: {
      poolId: "geo-arcade-slice-shade",
      problemsPerRound: 6,
      revisit: true,
    },
    learnOp: "geo-op-partition",
  });
})();
