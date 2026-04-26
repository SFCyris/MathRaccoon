/*!
 * Measurement · Arcade — Unit Match (pair units & equivalences).
 * Uses the shared dragDrop engine (categorize kind).
 */
(function () {
  MR.Content.registerGame({
    id: "arc-unit-match",
    moduleId: "measurement",
    title: "Unit Match",
    description: "Drag each item into the right unit bucket — or match equivalent amounts.",
    emoji: "🔄",
    accent: "#6ee7b7",
    engine: "dragDrop",
    engineConfig: {
      poolId: "mea-arcade-unit-match",
      problemsPerRound: 5,
      revisit: true,
    },
    learnOp: "mea-op-unit-convert",
  });
})();
