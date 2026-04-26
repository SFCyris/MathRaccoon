/*!
 * Arithmetic · Arcade — Pie Pals (fractions).
 */
(function () {
  MR.Content.registerGame({
    id: "arc-pie-pals",
    moduleId: "arithmetic",
    title: "Pie Pals",
    description: "Name, compare, and match fractions.",
    emoji: "🥧",
    accent: "#c4b5fd",
    engine: "fraction",
    engineConfig: {
      modes: ["name", "equivalent", "compare"], problemsPerRound: 8,
      poolId: "arith-arcade-pie-pals", revisit: true,
    },
    requiresPass: "arc-share-shack",
    unlocks: "arc-place-parade",
  });
})();
