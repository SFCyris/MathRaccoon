/*!
 * Reading · Arcade — Library Lookup (mixed reading).
 */
(function () {
  MR.Content.registerGame({
    id: "arc-library-lookup",
    moduleId: "reading",
    title: "Library Lookup",
    description: "A mixed round from every reading area.",
    emoji: "📚",
    accent: "#ffd93d",
    engine: "reading",
    engineConfig: {
      poolId: "reading-arcade-library-lookup",
      problemsPerRound: 10,
      revisit: true,
    },
  });
})();
