/*!
 * Reading · Arcade — Word Sort (drag words into grammar buckets).
 * Uses the shared dragDrop engine for interactive categorization.
 */
(function () {
  MR.Content.registerGame({
    id: "arc-word-sort",
    moduleId: "reading",
    title: "Word Sort",
    description: "Sort words by meaning: nouns, verbs, adjectives, and more.",
    emoji: "🗂",
    accent: "#c4b5fd",
    engine: "dragDrop",
    engineConfig: {
      poolId: "reading-arcade-word-sort",
      problemsPerRound: 5,
      revisit: true,
    },
    learnOp: "rd-op-grammar",
  });
})();
