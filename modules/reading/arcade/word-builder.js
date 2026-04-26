/*!
 * Reading · Arcade — Word Builder (drag words to build sentences).
 * Uses the shared dragDrop engine for interactive sentence assembly.
 */
(function () {
  MR.Content.registerGame({
    id: "arc-word-builder",
    moduleId: "reading",
    title: "Word Builder",
    description: "Drag the word blocks into order to build each sentence.",
    emoji: "🧩",
    accent: "#7dd3fc",
    engine: "dragDrop",
    engineConfig: {
      poolId: "reading-arcade-word-builder",
      problemsPerRound: 6,
      revisit: true,
    },
    unlocks: "arc-word-sort",
    learnOp: "rd-op-grammar",
  });
})();
