/*!
 * Teaching op — × and ÷ are inverses (arithmetic).
 *
 * Angle: multiplication and division *undo* each other via arrays. Rather
 * than teaching how to multiply or divide, this op builds fluency moving
 * between multiplication facts and their division partners.
 *
 * Distinct pedagogy vs op-multiplication / op-division:
 *   - Uses one array to see BOTH operations simultaneously.
 *   - Core move: "cover one dimension, and the other reveals the quotient."
 *   - Focuses on known-from-unknown reasoning: knowing 4×6=24 gives you
 *     24÷6=4 and 24÷4=6 for free.
 */
(function () {
  MR.Content.registerOp({
    id: "ari-op-mul-div-inverse",
    moduleId: "arithmetic",
    label: "× and ÷ Together",
    emoji: "🔁",
    tagline: "Same array, two stories.",
    accent: "#6ee7b7",
    strategies: [
      {
        id: "same-array",
        title: "One Array, Two Facts",
        subtitle: "Rows × cols = total. Total ÷ rows = cols.",
        emoji: "🔲",
        idea: {
          hook: "An array is a box of dots in rows and columns. The SAME box tells you a times-fact AND a divide-fact. You don't learn them twice — you learn them together.",
          viz: { type: "array", params: { rows: 3, cols: 4, label: "3 rows × 4 cols = 12" } },
          caption: "3 × 4 = 12 counts the dots. 12 ÷ 3 = 4 asks 'how many in each row?'",
        },
        watchMe: [
          { text: "Here's an array: 2 rows of 5.",
            viz: { type: "array", params: { rows: 2, cols: 5, label: "2 × 5" } } },
          { text: "Counting dots: 2 × 5 = 10.",
            equation: "2 × 5 = 10" },
          { text: "Now imagine someone hands you 10 dots and says 'arrange in 2 equal rows.' How many per row?",
            viz: { type: "array", params: { rows: 2, cols: 5, color: "#ff7a93", label: "10 ÷ 2 = ?" } } },
          { text: "5 per row. 10 ÷ 2 = 5. Same array — one divide fact.",
            equation: "10 ÷ 2 = 5" },
          { text: "Or split into rows of 5: that's 2 rows. 10 ÷ 5 = 2. Two divide facts from one multiplication.",
            equation: "10 ÷ 5 = 2" },
        ],
        practice: [
          {
            prompt: "You know 6 × 4 = 24. What is 24 ÷ 4?",
            viz: { type: "array", params: { rows: 6, cols: 4, label: "6 × 4 = 24" } },
            options: [4, 6, 8],
            answer: 6,
            hint: "The array has 6 rows. 24 shared into 4 groups = 6 in each.",
          },
          {
            prompt: "If 5 × 3 = 15, what is 15 ÷ 3?",
            options: [3, 5, 15],
            answer: 5,
            hint: "Flip the times fact: 15 split into 3 equal groups is 5 each.",
          },
        ],
      },
      {
        id: "cover-a-side",
        title: "Cover a Side",
        subtitle: "The quotient is what's left.",
        emoji: "🙈",
        idea: {
          hook: "Put your hand over one side of an array. What you can still see tells you the answer to the division. The array is a tiny detective game.",
          viz: { type: "array", params: { rows: 4, cols: 3, label: "12 ÷ 3 = ?" } },
          caption: "Cover the 3 columns. How many rows are left? That's the answer.",
        },
        watchMe: [
          { text: "We want 18 ÷ 6. Build the array — 18 dots, 6 in each column.",
            viz: { type: "array", params: { rows: 3, cols: 6, label: "18 dots" } } },
          { text: "Cover the 6 columns with your hand. How many rows do you count going down?",
            viz: { type: "array", params: { rows: 3, cols: 6, color: "#c4b5fd" } } },
          { text: "3 rows. So 18 ÷ 6 = 3.",
            equation: "18 ÷ 6 = 3" },
          { text: "It's the inverse of 6 × 3 = 18. Same dots, different question." },
        ],
        practice: [
          {
            prompt: "Cover the columns. 20 dots in rows of 4 — how many rows?",
            viz: { type: "array", params: { rows: 5, cols: 4, label: "20 ÷ 4 = ?" } },
            options: [4, 5, 6],
            answer: 5,
          },
          {
            prompt: "You know 9 × 2 = 18. What is 18 ÷ 9?",
            options: [2, 4, 9],
            answer: 2,
            hint: "9 groups of 2. If you have 18 and split into 9 groups: 2 each.",
          },
        ],
      },
      {
        id: "missing-factor",
        title: "The Missing Factor",
        subtitle: "4 × ? = 20. Division knows.",
        emoji: "❓",
        idea: {
          hook: "When one factor is hidden — like 4 × ? = 20 — division is the tool that finds it. Ask: 20 ÷ 4 = ?",
          viz: { type: "equalGroups", params: { groups: 4, size: 5, emoji: "⭐", label: "4 groups of ? = 20" } },
          caption: "We have 4 groups making 20 stars. How many in each group? Divide.",
        },
        watchMe: [
          { text: "Puzzle: ? × 3 = 21. Something times three equals twenty-one.",
            equation: "? × 3 = 21" },
          { text: "Flip it into a division: 21 ÷ 3 tells us the missing number.",
            equation: "21 ÷ 3 = ?" },
          { text: "21 split into 3 equal groups is 7 in each. The missing factor is 7.",
            equation: "7 × 3 = 21",
            viz: { type: "equalGroups", params: { groups: 3, size: 7, emoji: "🍓" } } },
        ],
        practice: [
          {
            prompt: "? × 5 = 35. What's missing?",
            options: [5, 6, 7],
            answer: 7,
            hint: "35 ÷ 5 — how many fives in thirty-five?",
          },
          {
            prompt: "8 × ? = 24. What's missing?",
            options: [3, 4, 8],
            answer: 3,
            hint: "24 ÷ 8 = ?",
          },
        ],
      },
      {
        id: "distributive",
        title: "Break-Apart Arrays",
        subtitle: "7 × 6 = (5 × 6) + (2 × 6).",
        emoji: "✂️",
        idea: {
          hook: "A tricky multiplication like 7 × 6 can split into two easier ones. Break the 7 rows into a 5-row piece and a 2-row piece — the pieces add to the whole.",
          viz: { type: "array", params: { rows: 7, cols: 6, label: "7 × 6 = ?" } },
          caption: "Cut the array after row 5. You get a 5×6 and a 2×6.",
        },
        watchMe: [
          { text: "The tricky one: 7 × 6.",
            viz: { type: "array", params: { rows: 7, cols: 6, label: "7 × 6" } } },
          { text: "Split the 7 into 5 + 2.",
            equation: "7 = 5 + 2" },
          { text: "Top piece: 5 × 6 = 30. Easy.",
            equation: "5 × 6 = 30",
            viz: { type: "array", params: { rows: 5, cols: 6, color: "#a78bfa", label: "5 × 6 = 30" } } },
          { text: "Bottom piece: 2 × 6 = 12. Also easy.",
            equation: "2 × 6 = 12",
            viz: { type: "array", params: { rows: 2, cols: 6, color: "#ff7a93", label: "2 × 6 = 12" } } },
          { text: "Add the pieces: 30 + 12 = 42. So 7 × 6 = 42.",
            equation: "7 × 6 = 30 + 12 = 42" },
        ],
        practice: [
          {
            prompt: "Solve 6 × 8 by breaking 6 into 5 + 1.",
            options: [40, 45, 48],
            answer: 48,
            hint: "5 × 8 = 40, and 1 × 8 = 8. Add them: 40 + 8.",
          },
          {
            prompt: "9 × 4 = ? (split 9 into 5 + 4).",
            options: [32, 36, 40],
            answer: 36,
            hint: "5 × 4 = 20, 4 × 4 = 16. 20 + 16 = 36.",
          },
        ],
      },
    ],
  });
})();
