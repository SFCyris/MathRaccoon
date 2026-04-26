/*!
 * Measurement · Arcade — Coin Cart (money, count and make change).
 * Pairs with mea-op-money.
 */
(function () {
  MR.Content.registerGame({
    id: "arc-coin-cart",
    moduleId: "measurement",
    title: "Coin Cart",
    description: "Count coins, add prices, make change.",
    emoji: "🪙",
    accent: "#fcd34d",
    engine: "wordProblem",
    engineConfig: {
      topics: ["money"],
      problemsPerRound: 8,
      poolId: "mea-arcade-coin-cart", revisit: true,
    },
    learnOp: "mea-op-money",
  });
})();
