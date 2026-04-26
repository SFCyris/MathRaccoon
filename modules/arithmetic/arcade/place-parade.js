/*!
 * Arithmetic · Arcade — Place Parade.
 */
(function () {
  MR.Content.registerGame({
    id: "arc-place-parade",
    moduleId: "arithmetic",
    title: "Place Parade",
    description: "Read big numbers, expand them, round like a pro.",
    emoji: "🔢",
    accent: "#ffb077",
    engine: "placeValue",
    engineConfig: {
      digits: 4, modes: ["read", "expanded", "round"], problemsPerRound: 8,
      poolId: "arith-arcade-place-parade", revisit: true,
    },
    requiresPass: "arc-pie-pals",
  });
})();
