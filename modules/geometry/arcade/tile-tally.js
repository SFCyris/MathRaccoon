/*!
 * Geometry · Arcade — Tangram Tally (formerly Tile Tally).
 * Click cells to fill a rows×cols grid and count the tiles.
 * Practices area as multiplication (3.MD.7) and unit-square counting.
 * Uses dragDrop engine, kind: "shapeCompose".
 */
(function () {
  MR.Content.registerGame({
    id: "arc-tile-tally",
    moduleId: "geometry",
    title: "Tangram Tally",
    description: "Fill the grid — then count the tiles.",
    emoji: "🟦",
    accent: "#6ee7b7",
    engine: "dragDrop",
    engineConfig: {
      poolId: "geo-arcade-tile-tally",
      problemsPerRound: 6,
      revisit: true,
    },
    learnOp: "geo-op-area",
  });
})();
