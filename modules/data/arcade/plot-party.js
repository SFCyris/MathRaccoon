/*!
 * Data · Arcade — Plot Party (build a line plot by clicking X's).
 * Uses the shared dragDrop engine with kind:"linePlot".
 */
(function () {
  MR.Content.registerGame({
    id: "arc-plot-party",
    moduleId: "data",
    title: "Plot Party",
    description: "Click a number to stack an X. Build the line plot from the list.",
    emoji: "📈",
    accent: "#ff7a93",
    engine: "dragDrop",
    engineConfig: {
      poolId: "dat-arcade-plot-party",
      problemsPerRound: 5,
      revisit: true,
    },
    learnOp: "dat-op-line-plot",
  });
})();
