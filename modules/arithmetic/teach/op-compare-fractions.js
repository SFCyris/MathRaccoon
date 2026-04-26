/*!
 * Teaching op — Compare fractions (arithmetic).
 *
 * Distinct from the small "compare" strategy inside op-fractions: this op
 * goes deep on the four main comparison tools a 3rd/4th grader needs, with
 * a separate strategy for each — because "just look at the number" is a
 * trap when denominators differ.
 *
 * Strategies:
 *   - same-denom (count pieces)
 *   - same-numer (bigger denom = smaller piece — the classic gotcha)
 *   - half-benchmark (is it < 1/2, = 1/2, or > 1/2?)
 *   - side-by-side (visual bar lineup when you're stuck)
 */
(function () {
  MR.Content.registerOp({
    id: "ari-op-compare-fractions",
    moduleId: "arithmetic",
    label: "Comparing Fractions",
    emoji: "⚖️",
    tagline: "Which one is bigger?",
    accent: "#a78bfa",
    strategies: [
      {
        id: "same-denom",
        title: "Same Denominator",
        subtitle: "Just count the shaded pieces.",
        emoji: "🟰",
        idea: {
          hook: "When two fractions are cut into the same number of pieces, the one with more shaded pieces is bigger. The pieces are the same size.",
          viz: { type: "fractionBar", params: { denom: 6, num: 4, label: "4/6" } },
          caption: "All sixths. Just count who shades more.",
        },
        watchMe: [
          { text: "Compare 3/8 and 5/8. Both are out of 8.",
            viz: { type: "fractionBar", params: { denom: 8, num: 3, label: "3/8" } } },
          { text: "5/8 shades more pieces.",
            viz: { type: "fractionBar", params: { denom: 8, num: 5, label: "5/8" } } },
          { text: "So 5/8 > 3/8. The pieces are the same size, 5 beats 3.",
            equation: "5/8 > 3/8" },
        ],
        practice: [
          {
            prompt: "Which is bigger, 4/9 or 7/9?",
            options: ["4/9", "7/9", "equal"],
            answer: "7/9",
          },
          {
            prompt: "Which is smaller, 2/5 or 4/5?",
            options: ["2/5", "4/5", "equal"],
            answer: "2/5",
          },
        ],
      },
      {
        id: "same-numer",
        title: "Same Numerator — Watch Out!",
        subtitle: "More pieces = smaller pieces.",
        emoji: "🪤",
        idea: {
          hook: "Here's the trick: 1/3 is BIGGER than 1/6, even though 6 is bigger than 3. Why? A pie cut in 3 pieces has bigger slices than a pie cut in 6. Big denominator, tiny pieces.",
          viz: { type: "fractionBar", params: { denom: 3, num: 1, label: "1/3" } },
          caption: "Compare the size of 1/3 versus 1/6 — the SAME ONE piece, but from pies cut differently.",
        },
        watchMe: [
          { text: "1/3 of a bar: one out of three big pieces.",
            viz: { type: "fractionBar", params: { denom: 3, num: 1, color: "#a78bfa", label: "1/3" } } },
          { text: "1/6 of a bar: one out of six tiny pieces.",
            viz: { type: "fractionBar", params: { denom: 6, num: 1, color: "#ff7a93", label: "1/6" } } },
          { text: "Same bar. 1/3 is much fatter.",
            equation: "1/3 > 1/6" },
          { text: "Rule: when the tops match, the one with the SMALLER bottom is bigger. Fewer pieces → each one is chunkier." },
        ],
        practice: [
          {
            prompt: "Which is bigger, 1/4 or 1/8?",
            viz: { type: "fractionBar", params: { denom: 8, num: 1, label: "1/8" } },
            options: ["1/4", "1/8", "equal"],
            answer: "1/4",
            hint: "Fewer pieces in the whole means each piece is bigger.",
          },
          {
            prompt: "Which is bigger, 2/5 or 2/10?",
            options: ["2/5", "2/10", "equal"],
            answer: "2/5",
            hint: "Tops are equal. Smaller bottom wins.",
          },
          {
            prompt: "Which is smaller, 3/4 or 3/12?",
            options: ["3/4", "3/12", "equal"],
            answer: "3/12",
            hint: "Twelfths are tiny. 3 tiny pieces is less than 3 fat pieces.",
          },
        ],
      },
      {
        id: "half-benchmark",
        title: "The Half Test",
        subtitle: "Is it more or less than 1/2?",
        emoji: "🪙",
        idea: {
          hook: "1/2 is an easy checkpoint. If one fraction is bigger than half and the other is smaller, you know the answer without comparing the pieces directly.",
          viz: { type: "fractionBar", params: { denom: 2, num: 1, label: "1/2" } },
          caption: "Numerator is half of denominator → the fraction equals 1/2. More than half means the top is more than half the bottom.",
        },
        watchMe: [
          { text: "Compare 3/8 and 5/9. Tricky — different bottoms!",
            viz: { type: "fractionBar", params: { denom: 8, num: 3, label: "3/8" } } },
          { text: "Check 3/8 vs 1/2. Half of 8 is 4. 3 is less than 4 — so 3/8 < 1/2.",
            equation: "3/8 < 1/2" },
          { text: "Check 5/9 vs 1/2. Half of 9 is 4.5. 5 is more than 4.5 — so 5/9 > 1/2.",
            viz: { type: "fractionBar", params: { denom: 9, num: 5, label: "5/9" } },
            equation: "5/9 > 1/2" },
          { text: "3/8 is below half, 5/9 is above half. So 5/9 wins.",
            equation: "5/9 > 3/8" },
        ],
        practice: [
          {
            prompt: "Is 2/7 more or less than 1/2?",
            options: ["more", "less", "equal"],
            answer: "less",
            hint: "Half of 7 is 3.5. 2 is less than 3.5.",
          },
          {
            prompt: "Compare 3/10 and 5/8 using the half-test.",
            options: ["3/10", "5/8", "equal"],
            answer: "5/8",
            hint: "3/10 is less than half (half of 10 is 5). 5/8 is more than half (half of 8 is 4).",
          },
        ],
      },
      {
        id: "line-them-up",
        title: "Line Them Up",
        subtitle: "When the other tricks don't help.",
        emoji: "📐",
        idea: {
          hook: "Still stuck? Draw both fractions on bars of the same length, one above the other. Your eyes will tell you instantly.",
          viz: { type: "fractionBar", params: { denom: 4, num: 3, label: "3/4" } },
          caption: "Line them up — same bar length, different splits.",
        },
        watchMe: [
          { text: "Compare 2/3 and 3/4. Both are pretty big — we need to see.",
            viz: { type: "fractionBar", params: { denom: 3, num: 2, color: "#a78bfa", label: "2/3" } } },
          { text: "Draw 3/4 on an equal bar.",
            viz: { type: "fractionBar", params: { denom: 4, num: 3, color: "#ff7a93", label: "3/4" } } },
          { text: "Eye the right-hand edge of the shading. 3/4 stretches farther.",
            equation: "3/4 > 2/3" },
        ],
        practice: [
          {
            prompt: "Looking at the bars, which is bigger?",
            viz: { type: "fractionBar", params: { denom: 5, num: 3, label: "3/5" } },
            options: ["3/5", "2/3", "equal"],
            answer: "2/3",
            hint: "2/3 fills more of the bar than 3/5.",
          },
          {
            prompt: "Compare using mental bars: which is bigger, 5/6 or 4/5?",
            options: ["5/6", "4/5", "equal"],
            answer: "5/6",
            hint: "5/6 is just 1/6 away from one whole. 4/5 is 1/5 away. 1/6 is smaller than 1/5, so 5/6 is closer to 1.",
          },
        ],
      },
    ],
  });
})();
