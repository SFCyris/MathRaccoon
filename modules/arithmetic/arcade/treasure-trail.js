/*!
 * Arithmetic · Arcade — Treasure Trail (subtraction).
 */
(function () {
  MR.Content.registerGame({
    id: "arc-treasure-trail",
    moduleId: "arithmetic",
    title: "Treasure Trail",
    description: "Hop along the trail to find the difference.",
    emoji: "🗺️",
    accent: "#7dd3fc",
    engine: "arithmetic",
    engineConfig: {
      op: "-", digits: 2, problemsPerRound: 8,
      poolId: "arith-arcade-treasure-trail", revisit: true,
    },
    requiresPass: "arc-bubble-blocks",
    unlocks: "arc-multiply-mountain",
  });
})();
