/*!
 * Reading · Arcade — Word Watch (vocabulary mix).
 */
(function () {
  MR.Content.registerGame({
    id: "arc-word-watch",
    moduleId: "reading",
    title: "Word Watch",
    description: "Quick vocabulary rounds: prefixes, suffixes, synonyms & more.",
    emoji: "🔎",
    accent: "#b78af0",
    engine: "reading",
    engineConfig: {
      poolId: "reading-arcade-word-watch",
      problemsPerRound: 8,
      revisit: true,
    },
    unlocks: "arc-simile-sprint",
    learnOp: "rd-op-vocabulary",
  });
})();
