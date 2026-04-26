/*!
 * Geometry · Arcade — Quad Quest (sort quadrilaterals into families).
 * Uses the shared dragDrop engine (categorize kind).
 */
(function () {
  MR.Content.registerGame({
    id: "arc-quad-quest",
    moduleId: "geometry",
    title: "Quad Quest",
    description: "Drag each shape into the correct quadrilateral family bucket.",
    emoji: "🔷",
    accent: "#a78bfa",
    engine: "dragDrop",
    engineConfig: {
      poolId: "geo-arcade-quad-quest",
      problemsPerRound: 5,
      revisit: true,
    },
    learnOp: "geo-op-quadrilaterals",
  });
})();
