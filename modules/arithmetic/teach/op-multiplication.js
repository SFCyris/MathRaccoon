/*!
 * Teaching op — Multiplication (arithmetic).
 * Strategies: equal groups, arrays, skip-count, break-apart.
 */
(function () {
  MR.Content.registerOp({
    id: "ari-op-multiplication",
    moduleId: "arithmetic",
    label: "Multiplication",
    emoji: "✖️",
    tagline: "Let's make groups!",
    accent: "#ffb077",
    strategies: [
      {
        id: "equal-groups",
        title: "Equal Groups",
        subtitle: "Same number in each basket.",
        emoji: "🧺",
        idea: {
          hook: "Multiplication is fast counting of equal groups. 3 × 4 means 3 groups with 4 in each.",
          viz: { type: "equalGroups", params: { groups: 3, size: 4, emoji: "🍓", label: "3 × 4 = 12" } },
          caption: "Three baskets, four berries each. Twelve berries in all."
        },
        watchMe: [
          { text: "Let's find 4 × 3. That's 4 groups of 3.",
            viz: { type: "equalGroups", params: { groups: 4, size: 3, emoji: "🍎" } } },
          { text: "Count by 3s: 3, 6, 9, 12." },
          { text: "So 4 × 3 = 12.", equation: "4 × 3 = 12" },
        ],
        practice: [
          {
            prompt: "How many apples? 5 groups of 2.",
            viz: { type: "equalGroups", params: { groups: 5, size: 2, emoji: "🍎" } },
            options: [8, 10, 12],
            answer: 10,
            hint: "Skip count by 2: 2, 4, 6, 8, 10."
          },
          {
            prompt: "3 × 6 = ?",
            viz: { type: "equalGroups", params: { groups: 3, size: 6, emoji: "🍇" } },
            options: [15, 18, 21],
            answer: 18,
          },
        ],
      },
      {
        id: "arrays",
        title: "Rows and Columns",
        subtitle: "Make a neat grid.",
        emoji: "🟪",
        idea: {
          hook: "An array lines up objects in rows and columns. 3 rows of 5 dots is the same as 5 rows of 3 dots — that's 15 either way.",
          viz: { type: "array", params: { rows: 3, cols: 5, label: "3 × 5 = 15" } },
          caption: "Multiplication is commutative: rows × cols = cols × rows."
        },
        watchMe: [
          { text: "Try 4 × 6 as an array — 4 rows of 6 dots.",
            viz: { type: "array", params: { rows: 4, cols: 6 } } },
          { text: "Count one row: 6. Now we have 4 of those." },
          { text: "6 + 6 + 6 + 6 = 24. So 4 × 6 = 24.",
            equation: "4 × 6 = 24" },
          { text: "Same answer if we turn it sideways: 6 × 4 = 24.",
            viz: { type: "array", params: { rows: 6, cols: 4, color: "#ff7a93" } } },
        ],
        practice: [
          {
            prompt: "How many dots? 2 rows of 7.",
            viz: { type: "array", params: { rows: 2, cols: 7 } },
            options: [12, 14, 16],
            answer: 14,
          },
          {
            prompt: "4 × 5 = ?",
            viz: { type: "array", params: { rows: 4, cols: 5 } },
            options: [18, 20, 22],
            answer: 20,
          },
        ],
      },
      {
        id: "skip-count",
        title: "Skip Count",
        subtitle: "Hop by the same amount.",
        emoji: "🦘",
        idea: {
          hook: "Skip-counting is multiplication in action. Count by 5s: 5, 10, 15, 20, 25. That's five hops of 5.",
          viz: { type: "numberLine", params: { min: 0, max: 20, at: 0, hops: [5, 10, 15, 20], label: "5 × 4 = 20" } },
        },
        watchMe: [
          { text: "Try 3 × 4 on a number line. Start at 0 and hop 4 three times.",
            viz: { type: "numberLine", params: { min: 0, max: 14, at: 0 } } },
          { text: "First hop — 4.",
            viz: { type: "numberLine", params: { min: 0, max: 14, at: 4, hops: [4], step: 4 } } },
          { text: "Second hop — 8.",
            viz: { type: "numberLine", params: { min: 0, max: 14, at: 8, hops: [4, 8] } } },
          { text: "Third hop — 12. So 3 × 4 = 12.",
            equation: "3 × 4 = 12",
            viz: { type: "numberLine", params: { min: 0, max: 14, at: 12, hops: [4, 8, 12] } } },
        ],
        practice: [
          {
            prompt: "Skip count by 2, four times: 2, 4, 6, __.",
            options: [7, 8, 9],
            answer: 8,
          },
          {
            prompt: "4 × 3 on a number line. Start at 0, hop 3 four times. Where do you land?",
            options: [9, 12, 15],
            answer: 12,
          },
        ],
      },
      {
        id: "break-apart",
        title: "Break Apart",
        subtitle: "Split a tricky fact.",
        emoji: "✂️",
        idea: {
          hook: "Tricky facts like 7 × 8 can be broken into easier pieces. 7 × 8 = (7 × 4) + (7 × 4) = 28 + 28 = 56.",
          viz: { type: "array", params: { rows: 7, cols: 8 } },
          caption: "Split the array in half. Easier to count two small pieces."
        },
        watchMe: [
          { text: "Let's find 6 × 7. That's a 6 × 7 array.",
            viz: { type: "array", params: { rows: 6, cols: 7 } } },
          { text: "Split it: 6 × 5 and 6 × 2.",
            equation: "6 × 7 = (6 × 5) + (6 × 2)" },
          { text: "6 × 5 = 30. 6 × 2 = 12. Add them: 30 + 12 = 42.",
            equation: "30 + 12 = 42" },
          { text: "So 6 × 7 = 42.", equation: "6 × 7 = 42" },
        ],
        practice: [
          {
            prompt: "7 × 6 = ? Try: (7 × 5) + (7 × 1).",
            options: [40, 42, 44],
            answer: 42,
            hint: "7 × 5 = 35. 7 × 1 = 7. 35 + 7 = 42."
          },
          {
            prompt: "8 × 6 = ? Try (8 × 5) + (8 × 1).",
            options: [40, 48, 56],
            answer: 48,
          },
        ],
      },
    ],
  });
})();
