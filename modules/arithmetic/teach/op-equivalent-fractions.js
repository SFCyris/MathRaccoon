/*!
 * Teaching op — Equivalent & Comparing Fractions (arithmetic).
 *
 * CCSS 3.NF.3: "Explain equivalence of fractions in special cases, and
 * compare fractions by reasoning about their size. Recognize and generate
 * simple equivalent fractions (1/2 = 2/4, 4/6 = 2/3), and compare two
 * fractions with the same numerator or the same denominator."
 */
(function () {
  MR.Content.registerOp({
    id: "ari-op-equivalent-fractions",
    moduleId: "arithmetic",
    label: "Equivalent Fractions",
    emoji: "🟰",
    tagline: "Different names, same amount.",
    accent: "#ff7a93",
    strategies: [
      {
        id: "same-amount",
        title: "Same Amount, Different Cuts",
        subtitle: "½ and 2⁄4 cover the same pizza.",
        emoji: "🍕",
        idea: {
          hook: "When you split a shape twice as finely, every piece gets cut in half — but if you SHADE twice as many, you've still got the same amount. That's why ½ = 2⁄4.",
          viz: { type: "fractionBar", params: { numer: 1, denom: 2, label: "1/2" } },
          caption: "Two 1/4 pieces fill the same area as one 1/2 piece.",
        },
        watchMe: [
          { text: "Start with 1/2. One piece out of 2.",
            viz: { type: "fractionBar", params: { numer: 1, denom: 2 } } },
          { text: "Now cut every piece in half. We have 4 pieces — and 2 are shaded.",
            viz: { type: "fractionBar", params: { numer: 2, denom: 4 } },
            equation: "1/2 = 2/4" },
          { text: "Cut again: now 8 pieces, 4 shaded. Still the same area.",
            viz: { type: "fractionBar", params: { numer: 4, denom: 8 } },
            equation: "1/2 = 2/4 = 4/8" },
          { text: "The RULE: multiply both the top and bottom by the same number." },
        ],
        practice: [
          { prompt: "Which is equivalent to 1/3?", options: ["2/6", "2/5", "3/9"], answer: "2/6",
            hint: "Double both top and bottom: 1×2 / 3×2 = 2/6." },
          { prompt: "2/4 = ?", options: ["1/2", "2/8", "4/2"], answer: "1/2",
            hint: "Half both: 2÷2 / 4÷2 = 1/2." },
          { prompt: "3/6 is the same as…", options: ["1/2", "1/3", "3/3"], answer: "1/2",
            hint: "3/6 means half of the total. Same as 1/2." },
        ],
      },
      {
        id: "same-top",
        title: "Compare — Same TOP",
        subtitle: "Smaller bottom = bigger piece.",
        emoji: "🍰",
        idea: {
          hook: "When two fractions have the SAME numerator (top), the one with the SMALLER denominator is bigger. Why? Fewer pieces means each piece is bigger.",
          viz: { type: "fractionBar", params: { numer: 1, denom: 3, label: "1/3" } },
          caption: "1/3 is bigger than 1/6 because thirds are bigger slices than sixths.",
        },
        watchMe: [
          { text: "Compare 1/4 and 1/6. Same top (1). Smaller bottom wins — 1/4.",
            equation: "1/4 > 1/6" },
          { text: "3/5 vs. 3/8. Same 3 on top. 5 is smaller than 8, so fifths are bigger pieces.",
            equation: "3/5 > 3/8" },
          { text: "Think: if you share a pizza into fewer slices, your slice is bigger!" },
        ],
        practice: [
          { prompt: "Which is bigger: 1/4 or 1/8?", options: ["1/4", "1/8", "equal"], answer: "1/4",
            hint: "Smaller bottom = bigger slice." },
          { prompt: "Which is bigger: 2/3 or 2/5?", options: ["2/3", "2/5", "equal"], answer: "2/3",
            hint: "Both have 2 pieces; thirds are bigger than fifths." },
          { prompt: "Order: 1/2, 1/8, 1/4. Which is smallest?", options: ["1/2", "1/4", "1/8"], answer: "1/8",
            hint: "Biggest bottom wins the smallest-piece prize." },
        ],
      },
      {
        id: "same-bottom",
        title: "Compare — Same BOTTOM",
        subtitle: "More pieces wins.",
        emoji: "📏",
        idea: {
          hook: "When two fractions have the SAME denominator (bottom), all the pieces are the same size. So whichever has MORE pieces shaded wins.",
          viz: { type: "fractionBar", params: { numer: 3, denom: 5, label: "3/5" } },
          caption: "3 fifths is more than 2 fifths. Same-sized pieces, just more of them.",
        },
        watchMe: [
          { text: "Compare 3/5 and 2/5. Both fifths. 3 > 2 so 3/5 > 2/5.",
            equation: "3/5 > 2/5" },
          { text: "5/8 vs. 7/8. Same eighths. 7 > 5 so 7/8 wins.",
            equation: "7/8 > 5/8" },
          { text: "When bottoms match, just compare the tops!" },
        ],
        practice: [
          { prompt: "Which is bigger: 3/7 or 5/7?", options: ["3/7", "5/7", "equal"], answer: "5/7",
            hint: "Same bottom; bigger top wins." },
          { prompt: "Which is smallest: 2/9, 5/9, 7/9?", options: ["2/9", "5/9", "7/9"], answer: "2/9",
            hint: "Fewest pieces of ninths." },
          { prompt: "Is 4/6 bigger than 3/6?", options: ["Yes", "No", "Equal"], answer: "Yes",
            hint: "Both sixths; 4 > 3." },
        ],
      },
    ],
  });
})();
