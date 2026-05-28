/*!
 * Teaching op — Fractions (arithmetic).
 * Strategies: equal parts, name the fraction, equivalent fractions, compare.
 */
(function () {
  MR.Content.registerOp({
    id: "ari-op-fractions",
    moduleId: "arithmetic",
    label: "Fractions",
    emoji: "🥧",
    tagline: "Parts of a whole.",
    accent: "#c4b5fd",
    strategies: [
      {
        id: "equal-parts",
        title: "Equal Parts",
        subtitle: "Every slice the same.",
        emoji: "🍰",
        idea: {
          hook: "A fraction only works if all the parts are the same size. A pie cut into 4 equal slices is cut into fourths.",
          viz: { type: "fractionBar", params: { denom: 4, num: 1, label: "1/4 of the bar is shaded" } },
        },
        watchMe: [
          { text: "Here's a bar split into 3 equal parts.",
            viz: { type: "fractionBar", params: { denom: 3, num: 0 } } },
          { text: "Shade 1 part. That's one-third.",
            viz: { type: "fractionBar", params: { denom: 3, num: 1, label: "1/3" } } },
          { text: "Shade 2 parts. That's two-thirds.",
            viz: { type: "fractionBar", params: { denom: 3, num: 2, label: "2/3" } } },
          { text: "The bottom number (denominator) says how many equal parts. The top (numerator) says how many are shaded." },
        ],
        practice: [
          {
            prompt: "Tap segments to shade 3 out of 4 parts. Then pick the fraction.",
            viz: { type: "interactiveFractionBar", params: { denominator: 4, targetNumer: 3, label: "Tap a segment to shade it. The readout shows your fraction." } },
            options: ["1/4", "3/4", "4/3"],
            answer: "3/4",
          },
          {
            prompt: "What fraction is shaded?",
            viz: { type: "fractionBar", params: { denom: 6, num: 2 } },
            options: ["1/6", "2/6", "4/6"],
            answer: "2/6",
          },
        ],
      },
      {
        id: "name-fraction",
        title: "Name the Fraction",
        subtitle: "Top and bottom.",
        emoji: "🔢",
        idea: {
          hook: "The bottom number counts equal parts in the whole. The top number counts the parts we're talking about.",
          viz: { type: "fractionBar", params: { denom: 5, num: 2, label: "2 out of 5 shaded → 2/5" } },
        },
        watchMe: [
          { text: "Here's a bar with 8 equal parts, 3 shaded.",
            viz: { type: "fractionBar", params: { denom: 8, num: 3 } } },
          { text: "Denominator is 8. Numerator is 3." },
          { text: "We read this as three-eighths: 3/8.",
            equation: "3/8" },
        ],
        practice: [
          {
            prompt: "What's this fraction?",
            viz: { type: "fractionBar", params: { denom: 5, num: 4 } },
            options: ["4/1", "4/5", "5/4"],
            answer: "4/5",
          },
          {
            prompt: "What's this fraction?",
            viz: { type: "fractionBar", params: { denom: 10, num: 3 } },
            options: ["3/10", "7/10", "10/3"],
            answer: "3/10",
          },
        ],
      },
      {
        id: "compare",
        title: "Compare Fractions",
        subtitle: "Which is bigger?",
        emoji: "⚖️",
        idea: {
          hook: "When two fractions share the same denominator, just compare the top numbers. 3/5 is more than 2/5 because 3 > 2.",
          viz: { type: "fractionBar", params: { denom: 5, num: 3, label: "3/5" } },
        },
        watchMe: [
          { text: "Compare 2/6 and 4/6. Both are out of 6.",
            viz: { type: "fractionBar", params: { denom: 6, num: 2, label: "2/6" } } },
          { text: "4/6 has more shaded parts.",
            viz: { type: "fractionBar", params: { denom: 6, num: 4, label: "4/6" } } },
          { text: "So 4/6 > 2/6.", equation: "4/6 > 2/6" },
        ],
        practice: [
          {
            prompt: "Which is bigger, 3/8 or 5/8?",
            viz: { type: "fractionBar", params: { denom: 8, num: 5, label: "5/8" } },
            options: ["3/8", "5/8", "they're equal"],
            answer: "5/8",
          },
          {
            prompt: "Which is bigger, 1/2 or 3/4?",
            viz: { type: "fractionBarPair", params: { top: { numer: 1, denom: 2 }, bottom: { numer: 3, denom: 4 } } },
            options: ["1/2", "3/4", "they're equal"],
            answer: "3/4",
            hint: "1/2 is the same as 2/4. Compare 2/4 and 3/4."
          },
        ],
      },
      {
        id: "whole-as-fraction",
        title: "Whole Numbers Are Fractions Too",
        subtitle: "5 is the same as 5/1.",
        emoji: "🎁",
        idea: {
          hook: "Every whole number is also a fraction. If you have 5 whole bars and don't cut any of them, that's 5 — but you can also write it as 5/1 (five whole bars, each uncut).",
          viz: { type: "fractionBar", params: { wholes: 5, label: "5 whole bars" } },
          caption: "Bottom number is 1: the bar isn't cut at all. Top number: how many whole bars.",
        },
        watchMe: [
          { text: "One whole bar — not cut. That's 1. We can also write it as 1/1.",
            viz: { type: "fractionBar", params: { denom: 1, num: 1, label: "1 whole bar" } },
            equation: "1 = 1/1" },
          { text: "Two whole bars — still uncut. That's 2. We can write it as 2/1.",
            viz: { type: "fractionBar", params: { wholes: 2, label: "2 whole bars" } },
            equation: "2 = 2/1" },
          { text: "Five whole bars — uncut. That's 5. We can write it as 5/1.",
            viz: { type: "fractionBar", params: { wholes: 5, label: "5 whole bars" } },
            equation: "5 = 5/1" },
          { text: "Trick: any whole number N on top with 1 on bottom — it's just that whole number." },
        ],
        practice: [
          { prompt: "Three whole bars. Which fraction matches?",
            viz: { type: "fractionBar", params: { wholes: 3, label: "3 whole bars" } },
            options: ["1/3", "3/1", "3/3"], answer: "3/1",
            hint: "Count the bars. Each bar is uncut, so the bottom is 1." },
          { prompt: "What does 7/1 equal?",
            viz: { type: "fractionBar", params: { wholes: 7, label: "7/1" } },
            options: [1, 7, 17], answer: 7,
            hint: "Bottom is 1, so each bar is uncut. Count the whole bars." },
          { prompt: "Which is the same as the number 4?",
            viz: { type: "fractionBar", params: { wholes: 4, label: "4 whole bars" } },
            options: ["4/4", "4/1", "1/4"], answer: "4/1",
            hint: "Count the bars. Each bar is uncut. Top is the count, bottom is 1." },
        ],
      },
    ],
  });
})();
