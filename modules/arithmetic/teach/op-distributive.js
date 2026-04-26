/*!
 * Teaching op — Distributive Property (arithmetic).
 *
 * CCSS 3.OA.5: "Apply properties of operations as strategies to multiply
 * and divide. Examples: 8 × 3 = 3 × 8 (commutative). 8 × 5 = 40; 8 × 2 = 16;
 * 8 × 7 = 8 × 5 + 8 × 2 = 40 + 16 = 56 (distributive)."
 */
(function () {
  MR.Content.registerOp({
    id: "ari-op-distributive",
    moduleId: "arithmetic",
    label: "Distributive Property",
    emoji: "🪟",
    tagline: "Split hard problems into easy ones.",
    accent: "#6ee7b7",
    strategies: [
      {
        id: "split-and-add",
        title: "Split, Then Add",
        subtitle: "Break ×7 into ×5 + ×2.",
        emoji: "✂️",
        idea: {
          hook: "Multiplication has a superpower: you can SPLIT one factor into friendlier parts, multiply each, and add. 7 × 6 is hard? Split 7 into 5 + 2. Do 5 × 6 = 30 and 2 × 6 = 12. Add: 30 + 12 = 42.",
          viz: { type: "array", params: { rows: 6, cols: 7, label: "6 × 7 = 6×5 + 6×2" } },
          caption: "Split an array into two easier pieces.",
        },
        watchMe: [
          { text: "8 × 7. Split 7 into 5 + 2. So 8 × 7 = (8×5) + (8×2).",
            equation: "8 × 7 = 8×5 + 8×2" },
          { text: "8 × 5 = 40. 8 × 2 = 16. Add: 40 + 16 = 56. Done!",
            equation: "= 40 + 16 = 56" },
          { text: "9 × 6. Split 6 into 5 + 1. 9×5=45, 9×1=9. 45 + 9 = 54.",
            equation: "9 × 6 = 45 + 9 = 54" },
          { text: "This is the DISTRIBUTIVE PROPERTY. It works for ANY split." },
        ],
        practice: [
          { prompt: "7 × 6 = (7 × 5) + (7 × __). What goes in the blank?", options: [1, 2, 6], answer: 1,
            hint: "5 + 1 = 6. So split 6 into 5 + 1." },
          { prompt: "8 × 7 = (8 × 5) + (8 × 2) = 40 + __?", options: [14, 15, 16], answer: 16,
            hint: "8 × 2 = 16." },
          { prompt: "What is (4 × 3) + (4 × 2)?", options: [12, 20, 7], answer: 20,
            hint: "12 + 8 = 20. That's also 4 × 5." },
        ],
      },
      {
        id: "array-split",
        title: "See It In An Array",
        subtitle: "The picture makes it obvious.",
        emoji: "🟩",
        idea: {
          hook: "A multiplication array is just a rectangle of dots. If you draw a line through it, you get two smaller rectangles. The dots DIDN'T change — just how we count them.",
          viz: { type: "array", params: { rows: 4, cols: 8, label: "4 × 8 = 4×5 + 4×3" } },
          caption: "Split the 4×8 rectangle into 4×5 and 4×3.",
        },
        watchMe: [
          { text: "6 × 7 as an array. Imagine 6 rows of 7 dots." },
          { text: "Draw a line between columns 5 and 6. Now we have 6×5 on the left and 6×2 on the right." },
          { text: "6×5 = 30. 6×2 = 12. Total 42 dots. Same 42 as before!",
            equation: "6 × 7 = 30 + 12 = 42" },
          { text: "We can split anywhere. 6 × 7 also = 6×3 + 6×4 = 18 + 24 = 42.",
            equation: "6×3 + 6×4 = 42" },
        ],
        practice: [
          { prompt: "5 × 9 = (5 × 5) + (5 × __)?", options: [4, 5, 9], answer: 4,
            hint: "5 + 4 = 9." },
          { prompt: "6 × 8 = (6 × 4) + (6 × 4) = ?", options: [24, 36, 48], answer: 48,
            hint: "24 + 24 = 48. Same as 6 × 8." },
          { prompt: "7 × 9 = (7 × 5) + (7 × 4) = 35 + __?", options: [28, 30, 42], answer: 28,
            hint: "7 × 4 = 28." },
        ],
      },
    ],
  });
})();
