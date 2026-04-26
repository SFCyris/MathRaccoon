/*!
 * Teaching op — Money (measurement).
 *
 * Distinct pedagogy: coins aren't a computation problem — they're a
 * recognition problem. Kids can add 25 + 10 on paper but fail
 * "a quarter plus a dime" because the values aren't visible. This op
 * starts with the coin→value link, then builds counting (biggest first),
 * then making change via count-up.
 *
 * Uses the coinSet viz throughout.
 */
(function () {
  MR.Content.registerOp({
    id: "mea-op-money",
    moduleId: "measurement",
    label: "Money",
    emoji: "💰",
    tagline: "Coins, bills, and change.",
    accent: "#6ee7b7",
    strategies: [
      {
        id: "coin-values",
        title: "Meet the Coins",
        subtitle: "Each coin has a value hiding inside.",
        emoji: "🪙",
        idea: {
          hook: "Coins don't show their value on the FRONT the way numbers do. You have to memorize: penny = 1¢, nickel = 5¢, dime = 10¢, quarter = 25¢. The size doesn't always tell you (the dime is smaller than a nickel but worth more!).",
          viz: { type: "coinSet", params: { coins: ["penny", "nickel", "dime", "quarter"], label: "1¢ · 5¢ · 10¢ · 25¢" } },
        },
        watchMe: [
          { text: "The penny is copper-colored and worth 1 cent.",
            viz: { type: "coinSet", params: { coins: ["penny"] } } },
          { text: "The nickel is the bigger silver coin. 5 cents.",
            viz: { type: "coinSet", params: { coins: ["nickel"] } } },
          { text: "The dime is the smallest silver coin — but worth 10 cents! Don't let its size fool you.",
            viz: { type: "coinSet", params: { coins: ["dime"] } } },
          { text: "The quarter is the biggest common coin. 25 cents.",
            viz: { type: "coinSet", params: { coins: ["quarter"] } } },
        ],
        practice: [
          {
            prompt: "Which coin is worth 10¢?",
            options: ["penny", "nickel", "dime"],
            answer: "dime",
            hint: "The smallest silver coin — but don't judge by size!",
          },
          {
            prompt: "Which coin is worth 25¢?",
            options: ["nickel", "dime", "quarter"],
            answer: "quarter",
          },
        ],
      },
      {
        id: "count-biggest-first",
        title: "Count Biggest First",
        subtitle: "Quarters, then dimes, then nickels, then pennies.",
        emoji: "📉",
        idea: {
          hook: "When you have a pile of mixed coins, sort them biggest first. Quarters, dimes, nickels, pennies — always that order. It keeps the counting tidy.",
          viz: { type: "coinSet", params: {
            coins: ["quarter", "quarter", "dime", "nickel", "penny", "penny"],
            label: "25 + 25 + 10 + 5 + 1 + 1 = 67¢",
          } },
          caption: "Start with the quarters, work down to pennies.",
        },
        watchMe: [
          { text: "We've got: 1 quarter, 2 dimes, 1 nickel. What's the total?",
            viz: { type: "coinSet", params: { coins: ["quarter", "dime", "dime", "nickel"] } } },
          { text: "Start with the quarter: 25¢.",
            equation: "25¢" },
          { text: "Add the two dimes: 25 + 10 = 35, then 35 + 10 = 45.",
            equation: "25 + 10 + 10 = 45¢" },
          { text: "Add the nickel: 45 + 5 = 50. Total: 50¢.",
            equation: "Total: 50¢",
            viz: { type: "coinSet", params: { coins: ["quarter", "dime", "dime", "nickel"], label: "50¢" } } },
          { text: "Why biggest first? Because your brain can add small amounts to a big number faster than the other way around." },
        ],
        practice: [
          {
            prompt: "What's the total: 2 quarters + 1 dime?",
            viz: { type: "coinSet", params: { coins: ["quarter", "quarter", "dime"] } },
            options: ["35¢", "50¢", "60¢"],
            answer: "60¢",
            hint: "Quarters first: 25 + 25 = 50. Then add 10.",
          },
          {
            prompt: "Count: 1 quarter, 1 nickel, 3 pennies.",
            viz: { type: "coinSet", params: { coins: ["quarter", "nickel", "penny", "penny", "penny"] } },
            options: ["28¢", "30¢", "33¢"],
            answer: "33¢",
            hint: "25 + 5 + 1 + 1 + 1 = 33.",
          },
        ],
      },
      {
        id: "count-up-change",
        title: "Making Change",
        subtitle: "Count UP from the price to what was paid.",
        emoji: "🧾",
        idea: {
          hook: "The SMART way to figure out change isn't to subtract — it's to count UP. If something costs 37¢ and you pay 50¢, start at 37 and hop up to 50 using coins. What coins did you hop?",
          viz: { type: "coinSet", params: {
            coins: ["penny", "penny", "penny", "dime"],
            label: "37¢ → 38 → 39 → 40 → 50",
          } },
          caption: "Three pennies get you from 37 to 40. A dime gets you from 40 to 50.",
        },
        watchMe: [
          { text: "The apple costs 44¢. You pay 50¢. How much change?",
            viz: { type: "coinSet", params: { coins: [] } } },
          { text: "Start at 44. Hop 1¢ to 45.",
            viz: { type: "coinSet", params: { coins: ["penny"], label: "44 → 45" } } },
          { text: "Hop 5¢ (a nickel) to 50. Done — you're there!",
            viz: { type: "coinSet", params: { coins: ["penny", "nickel"], label: "45 → 50" } } },
          { text: "Change is 1¢ + 5¢ = 6¢. Or: a penny and a nickel.",
            equation: "50 − 44 = 6¢" },
          { text: "Why count up? It's way easier than borrowing across columns, AND it tells you exactly which coins to hand back." },
        ],
        practice: [
          {
            prompt: "Toy costs 70¢. You pay $1 (100¢). Change?",
            options: ["20¢", "30¢", "40¢"],
            answer: "30¢",
            hint: "Count up from 70 to 100: that's 30.",
          },
          {
            prompt: "Snack is 85¢. You pay 1 dollar. Change?",
            options: ["5¢", "10¢", "15¢"],
            answer: "15¢",
            hint: "85 → 90 → 100. A nickel then a dime = 15¢.",
          },
        ],
      },
    ],
  });
})();
