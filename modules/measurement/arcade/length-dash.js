/*!
 * Measurement · Arcade — Ruler Race (formerly Length Dash).
 * Drag the end-mark on a ruler to measure the length of colored
 * ribbons. Practices reading a scale (3.MD.4 / 3.MD.5).
 * Uses dragDrop engine, kind: "ruler".
 */
(function () {
  MR.Content.registerGame({
    id: "arc-length-dash",
    moduleId: "measurement",
    title: "Ruler Race",
    description: "Slide the ✋ marker to measure each ribbon.",
    emoji: "📏",
    accent: "#7dd3fc",
    engine: "dragDrop",
    engineConfig: {
      poolId: "mea-arcade-length-dash",
      problemsPerRound: 6,
      revisit: true,
    },
    learnOp: "mea-op-length",
  });
})();
