/*!
 * Teaching op — Division (arithmetic).
 * Strategies: sharing, grouping, think multiplication.
 */
(function () {
  MR.Content.registerOp({
    id: "ari-op-division",
    moduleId: "arithmetic",
    label: "Division",
    emoji: "➗",
    tagline: "Let's share fairly!",
    accent: "#6ee7b7",
    strategies: [
      {
        id: "share-equally",
        title: "Share Fairly",
        subtitle: "One for you, one for you…",
        emoji: "🤝",
        idea: {
          hook: "Division is fair sharing. 12 cookies shared between 3 friends means each gets the same amount.",
          viz: { type: "equalGroups", params: { groups: 3, size: 4, emoji: "🍪", label: "12 ÷ 3 = 4" } },
          caption: "Three piles of four cookies each. Everyone's happy."
        },
        watchMe: [
          { text: "Share 15 berries between 3 bunnies.",
            viz: { type: "beads", params: { count: 15, emoji: "🍓" } } },
          { text: "Deal them out one by one — bunny, bunny, bunny, bunny, bunny, bunny…",
            viz: { type: "equalGroups", params: { groups: 3, size: 5, emoji: "🍓" } } },
          { text: "Each bunny gets 5 berries.",
            viz: { type: "equalGroups", params: { groups: 3, size: 5, emoji: "🍓" } } },
          { text: "15 ÷ 3 = 5.", equation: "15 ÷ 3 = 5" },
        ],
        practice: [
          {
            prompt: "Share 10 acorns between 2 squirrels. How many each?",
            viz: { type: "beads", params: { count: 10, emoji: "🌰" } },
            options: [4, 5, 6],
            answer: 5,
          },
          {
            prompt: "18 ÷ 3 = ?",
            viz: { type: "equalGroups", params: { groups: 3, size: 6, emoji: "🟣", label: "18 ÷ 3" } },
            options: [5, 6, 7],
            answer: 6,
            hint: "Share 18 into 3 equal groups."
          },
        ],
      },
      {
        id: "make-groups",
        title: "Make Groups",
        subtitle: "How many groups fit?",
        emoji: "🧮",
        idea: {
          hook: "Division can also ask: how many groups of a size can we make? 12 cookies, 4 in each bag — how many bags?",
          viz: { type: "equalGroups", params: { groups: 3, size: 4, emoji: "🍪", label: "12 ÷ 4 = 3 bags" } },
        },
        watchMe: [
          { text: "We have 20 flowers and want bunches of 5.",
            viz: { type: "beads", params: { count: 20, emoji: "🌸" } } },
          { text: "Group them by fives.",
            viz: { type: "equalGroups", params: { groups: 4, size: 5, emoji: "🌸" } } },
          { text: "4 bunches. So 20 ÷ 5 = 4.",
            equation: "20 ÷ 5 = 4" },
        ],
        practice: [
          {
            prompt: "18 berries, 6 in each bowl. How many bowls?",
            viz: { type: "array", params: { rows: 1, cols: 18, color: "#a78bfa", label: "18 berries — group them by 6" } },
            options: [2, 3, 4],
            answer: 3,
          },
          {
            prompt: "24 ÷ 8 = ? (how many groups of 8 fit in 24)",
            viz: { type: "array", params: { rows: 1, cols: 24, color: "#a78bfa", label: "24 dots — group them by 8" } },
            options: [3, 4, 5],
            answer: 3,
          },
        ],
      },
      {
        id: "think-multiplication",
        title: "Think Multiplication",
        subtitle: "Use the multiplication fact.",
        emoji: "🔄",
        idea: {
          hook: "Division and multiplication are partners. If 4 × 6 = 24, then 24 ÷ 6 = 4 and 24 ÷ 4 = 6.",
          viz: { type: "factFamily", params: { a: 4, b: 6, product: 24, op: "×", revealCount: 4 } },
          caption: "Four facts share the same three numbers: 4, 6, 24."
        },
        watchMe: [
          { text: "We want 21 ÷ 3. Think: what times 3 makes 21?",
            viz: { type: "array", params: { rows: 3, cols: 7, color: "#a78bfa", label: "? × 3 = 21" } } },
          { text: "3 × 7 = 21. So 21 ÷ 3 = 7.",
            equation: "3 × 7 = 21",
            viz: { type: "factFamily", params: { a: 3, b: 7, product: 21, op: "×", revealCount: 4 } } },
          { text: "Detective: an array has 24 dots in 4 rows. How many columns?",
            viz: { type: "array", params: { rows: 4, cols: 6, color: "#6ee7b7", label: "4 rows of ?" } },
            equation: "4 × ? = 24 → 24 ÷ 4 = 6" },
        ],
        practice: [
          {
            prompt: "28 ÷ 4 = ? (think: 4 × ? = 28)",
            viz: { type: "factFamily", params: { a: 4, b: 7, product: 28, op: "×", revealCount: 2 } },
            options: [6, 7, 8],
            answer: 7,
          },
          {
            prompt: "36 ÷ 6 = ?",
            viz: { type: "array", params: { rows: 6, cols: 6, color: "#7dd3fc", label: "6 rows of ? = 36" } },
            options: [5, 6, 7],
            answer: 6,
          },
          {
            prompt: "Hidden array: 5 rows, 35 total dots. How many columns?",
            viz: { type: "array", params: { rows: 5, cols: 7, color: "#ffd93d", label: "5 × ? = 35" } },
            options: [5, 6, 7],
            answer: 7,
            hint: "35 ÷ 5 = 7. Or: what × 5 = 35?",
          },
        ],
      },
    ],
  });
})();
