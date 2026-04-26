/*!
 * Data · Arcade — Bar Builder (formerly Bar Burst).
 * Click category buttons to build a bar graph that matches the data.
 * Practices scaled bar graphs (3.MD.3).
 * Uses dragDrop engine, kind: "barGraph".
 */
(function () {
  MR.Content.registerGame({
    id: "arc-bar-burst",
    moduleId: "data",
    title: "Bar Builder",
    description: "Tap each bar to build the graph from the data.",
    emoji: "📊",
    accent: "#c4b5fd",
    engine: "dragDrop",
    engineConfig: {
      poolId: "dat-arcade-bar-burst",
      problemsPerRound: 5,
      revisit: true,
    },
    learnOp: "dat-op-graphs",
  });
})();
