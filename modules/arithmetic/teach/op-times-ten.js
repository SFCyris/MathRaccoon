/*!
 * Teaching op — Multiply by Multiples of 10 (arithmetic).
 *
 * CCSS 3.NBT.3: "Multiply one-digit whole numbers by multiples of 10 in
 * the range 10-90 (e.g., 9 × 80, 5 × 60) using strategies based on place
 * value and properties of operations."
 */
(function () {
  MR.Content.registerOp({
    id: "ari-op-times-ten",
    moduleId: "arithmetic",
    label: "× Tens",
    emoji: "⚡",
    tagline: "Multiply by 10, 20, 30…",
    accent: "#f4c77a",
    strategies: [
      {
        id: "just-add-zero",
        title: "× 10 — Just Add a Zero",
        subtitle: "The fastest trick in math.",
        emoji: "🪄",
        idea: {
          hook: "Multiplying by 10 SHIFTS every digit one place to the left. That means you just stick a 0 on the end! It works because 10 is the size of the next place-value column.",
          viz: { type: "placeValue", params: { value: 70, highlight: "tens" } },
          caption: "7 × 10 = 70. The 7 moves from ones into tens.",
        },
        watchMe: [
          { text: "3 × 10. Three groups of ten is thirty. Just write 3 and a zero.",
            equation: "3 × 10 = 30" },
          { text: "6 × 10 = 60. Same trick.",
            equation: "6 × 10 = 60" },
          { text: "Works with bigger numbers too: 25 × 10 = 250. Add one zero to the end.",
            equation: "25 × 10 = 250" },
          { text: "Why? Because ten is ten ones. Ten times any amount scales it up by one place." },
        ],
        practice: [
          { prompt: "8 × 10 = ?", options: [18, 80, 800], answer: 80, hint: "Add a zero to 8." },
          { prompt: "5 × 10 = ?", options: [15, 50, 500], answer: 50, hint: "5 with a zero on the end." },
          { prompt: "12 × 10 = ?", options: [22, 112, 120], answer: 120, hint: "12 becomes 120." },
        ],
      },
      {
        id: "break-apart",
        title: "× 20, 30, 40… — Break Apart",
        subtitle: "Multiply by the digit, then add the zero.",
        emoji: "✂️",
        idea: {
          hook: "To do 6 × 40, think: 40 is 4 × 10. So 6 × 40 = 6 × 4 × 10. Do the little multiplication (6 × 4 = 24) and then stick a zero on the end (240).",
          viz: { type: "equalGroups", params: { groups: 4, per: 6, label: "6 × 4 = 24 — now × 10 → 240" } },
          caption: "Break the 40 into 4 × 10. 6×4 first, then ×10.",
        },
        watchMe: [
          { text: "5 × 30. Break into 5 × 3 × 10. First: 5 × 3 = 15. Then: 15 × 10 = 150.",
            equation: "5 × 30 = 150" },
          { text: "7 × 60. 7 × 6 = 42. Stick a zero: 420.",
            equation: "7 × 60 = 420" },
          { text: "9 × 80. 9 × 8 = 72. Add zero: 720.",
            equation: "9 × 80 = 720" },
          { text: "Pattern: use your basic times table, then shift left one place." },
        ],
        practice: [
          { prompt: "4 × 20 = ?", options: [24, 80, 200], answer: 80, hint: "4 × 2 = 8. Then × 10 → 80." },
          { prompt: "6 × 50 = ?", options: [56, 300, 600], answer: 300, hint: "6 × 5 = 30 → 300." },
          { prompt: "8 × 70 = ?", options: [56, 560, 5600], answer: 560, hint: "8 × 7 = 56 → 560." },
          { prompt: "3 × 90 = ?", options: [27, 270, 930], answer: 270, hint: "3 × 9 = 27 → 270." },
        ],
      },
      {
        id: "base-ten-pic",
        title: "See it With Base-Ten Blocks",
        subtitle: "Why the trick works.",
        emoji: "🧱",
        idea: {
          hook: "A 'ten' is a stick of 10 unit cubes. Six stacks of four tens = 24 ten-sticks = 240. The rearranging shows WHY the shortcut works, not just how.",
          viz: { type: "placeValue", params: { value: 240 } },
          caption: "24 tens = 240 ones.",
        },
        watchMe: [
          { text: "3 × 20. That's 3 groups of 2 tens. 6 tens altogether = 60.",
            equation: "3 × 20 = 60" },
          { text: "Think of ten-sticks. When you have sixty ones, you regroup into 6 tens.",
            viz: { type: "placeValue", params: { value: 60 } } },
          { text: "5 × 40. 5 groups of 4 tens = 20 tens = 200.",
            equation: "5 × 40 = 200" },
          { text: "The bigger the tens, the bigger the stack. Same place-value logic." },
        ],
        practice: [
          { prompt: "2 × 30 = ?", options: [23, 60, 120], answer: 60, hint: "2 groups of 3 tens = 6 tens = 60." },
          { prompt: "4 × 50 = ?", options: [20, 200, 450], answer: 200, hint: "4 × 5 = 20 → 200." },
          { prompt: "6 × 40 = ?", options: [46, 240, 640], answer: 240, hint: "6 × 4 = 24 → 240." },
        ],
      },
    ],
  });
})();
