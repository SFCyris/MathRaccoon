/*!
 * Teaching op — Partition Shapes Into Equal Areas (geometry).
 *
 * CCSS 3.G.A.2: "Partition shapes into parts with equal areas.
 * Express the area of each part as a unit fraction of the whole."
 */
(function () {
  MR.Content.registerOp({
    id: "geo-op-partition",
    moduleId: "geometry",
    label: "Partition Shapes",
    emoji: "🍕",
    tagline: "Cut into equal parts, shade a fraction.",
    accent: "#ff7a93",
    strategies: [
      {
        id: "equal-cuts",
        title: "Equal Cuts Only",
        subtitle: "Each slice has to be the same size.",
        emoji: "✂️",
        idea: {
          hook: "When you partition (cut) a shape into fractions, every piece MUST be the same size. Unequal cuts are NOT fractions. Two halves have to really be halves — same area, same shape.",
          viz: { type: "fractionBar", params: { numer: 0, denom: 4, label: "4 equal parts — each = 1/4" } },
          caption: "4 equal parts means each part is exactly 1/4 of the whole.",
        },
        watchMe: [
          { text: "A rectangle cut into 4 equal strips — each strip is 1/4 of the whole.",
            viz: { type: "fractionBar", params: { numer: 0, denom: 4 } } },
          { text: "If one piece looks bigger than another, it's NOT really 1/4. Lines must be evenly spaced.",
            viz: { type: "fractionBar", params: { numer: 1, denom: 4 } } },
          { text: "Same trick with 3 parts (thirds), 6 parts (sixths), 8 parts (eighths).",
            viz: { type: "fractionBar", params: { numer: 0, denom: 8 } } },
          { text: "The TOP of the fraction = how many you shade. The BOTTOM = how many total pieces.",
            equation: "shaded / total = fraction" },
        ],
        practice: [
          { prompt: "A rectangle is cut into 6 equal parts. What fraction is each part?",
            options: ["1/6", "1/3", "6/1"], answer: "1/6",
            hint: "One out of six equal = 1/6." },
          { prompt: "What fraction is one slice of a pizza cut into 8 equal slices?",
            options: ["1/4", "1/6", "1/8"], answer: "1/8",
            hint: "1 out of 8." },
          { prompt: "Each equal part of a rectangle cut into 3 is ___.",
            options: ["1/2", "1/3", "1/6"], answer: "1/3",
            hint: "Thirds: 1 out of 3." },
        ],
      },
      {
        id: "shade-a-fraction",
        title: "Shade a Fraction",
        subtitle: "Top = how many, bottom = total.",
        emoji: "🎨",
        idea: {
          hook: "To shade 3/4, partition the shape into 4 equal parts and color in 3 of them. The BOTTOM number tells you how many cuts. The TOP number tells you how many to shade.",
          viz: { type: "fractionBar", params: { numer: 3, denom: 4, label: "3/4 shaded" } },
          caption: "Four pieces total, three shaded.",
        },
        watchMe: [
          { text: "Shade 2/3. First, cut the shape into 3 equal pieces.",
            viz: { type: "fractionBar", params: { numer: 0, denom: 3 } } },
          { text: "Now color in 2 of them. That's 2/3.",
            viz: { type: "fractionBar", params: { numer: 2, denom: 3 } },
            equation: "2/3" },
          { text: "Shade 5/8. Cut into 8. Color 5. Five eighths.",
            viz: { type: "fractionBar", params: { numer: 5, denom: 8 } } },
          { text: "Any piece could be shaded — it just has to be the right COUNT of equal pieces." },
        ],
        practice: [
          { prompt: "How much is shaded? 3 out of 6 pieces.",
            options: ["3/6", "3/4", "6/3"], answer: "3/6",
            hint: "3 shaded, 6 total → 3/6." },
          { prompt: "A shape is cut into 4 equal parts, with 1 shaded. What fraction?",
            options: ["1/1", "1/4", "4/1"], answer: "1/4",
            hint: "1 shaded out of 4." },
          { prompt: "A pizza has 8 slices. You eat 5. Fraction eaten?",
            options: ["5/8", "8/5", "3/8"], answer: "5/8",
            hint: "5 eaten, 8 total." },
        ],
      },
    ],
  });
})();
