/*!
 * Measurement · Arcade — Hour Hop (elapsed time).
 * Pairs with mea-op-elapsed-time (CCSS 3.MD.1).
 */
(function () {
  MR.Content.registerGame({
    id: "arc-hour-hop",
    moduleId: "measurement",
    title: "Hour Hop",
    description: "From start to end — count the hours between.",
    emoji: "🦘",
    accent: "#f9c784",
    engine: "wordProblem",
    engineConfig: {
      topics: ["time"],
      problemsPerRound: 6,
      poolId: "mea-arcade-hour-hop", revisit: true,
    },
    learnOp: "mea-op-elapsed-time",
  });
})();
