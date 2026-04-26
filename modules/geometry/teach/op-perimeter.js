/*!
 * Teaching op — Perimeter (geometry).
 *
 * Distinct from op-shapes (which names shapes). This op focuses on
 * TRACING THE EDGES. Perimeter = the walk around the outside. Emphasizes
 * the physical tracing motion to prevent confusion with area.
 *
 * Uses perimeterShape viz which highlights edges one at a time.
 */
(function () {
  MR.Content.registerOp({
    id: "geo-op-perimeter",
    moduleId: "geometry",
    label: "Perimeter",
    emoji: "🖍️",
    tagline: "Walk around the outside.",
    accent: "#ffb077",
    strategies: [
      {
        id: "trace-the-edges",
        title: "Trace the Fence",
        subtitle: "Perimeter is the path around.",
        emoji: "🚶",
        idea: {
          hook: "Imagine building a fence around a garden. The total length of fence you need is the perimeter — you walk around the outside edge and add up every side.",
          viz: { type: "perimeterShape", params: { w: 5, h: 3, label: "A garden 5 by 3" } },
          caption: "Walk: 5 across the top + 3 down the side + 5 along the bottom + 3 up the other side.",
        },
        watchMe: [
          { text: "Here's a rectangle, 4 by 2. Let's walk around it.",
            viz: { type: "perimeterShape", params: { w: 4, h: 2 } } },
          { text: "Start at the top-left. Walk across the top: 4.",
            viz: { type: "perimeterShape", params: { w: 4, h: 2, traceEdge: 0 } } },
          { text: "Turn and walk down the right side: 2.",
            viz: { type: "perimeterShape", params: { w: 4, h: 2, traceEdge: 1 } } },
          { text: "Walk across the bottom: 4.",
            viz: { type: "perimeterShape", params: { w: 4, h: 2, traceEdge: 2 } } },
          { text: "And up the left side: 2. Back where we started.",
            viz: { type: "perimeterShape", params: { w: 4, h: 2, traceEdge: 3 } } },
          { text: "Add the four edges: 4 + 2 + 4 + 2 = 12. Perimeter = 12.",
            equation: "P = 4 + 2 + 4 + 2 = 12" },
        ],
        practice: [
          {
            prompt: "What's the perimeter of this 6-by-3 rectangle?",
            viz: { type: "perimeterShape", params: { w: 6, h: 3 } },
            options: [9, 18, 12],
            answer: 18,
            hint: "6 + 3 + 6 + 3 = 18.",
          },
          {
            prompt: "A square has all 4 sides equal to 5. Perimeter?",
            options: [10, 20, 25],
            answer: 20,
            hint: "5 + 5 + 5 + 5 = 20. Or 4 × 5.",
          },
        ],
      },
      {
        id: "rectangle-shortcut",
        title: "Two Longs + Two Shorts",
        subtitle: "For rectangles: 2 × (length + width).",
        emoji: "📐",
        idea: {
          hook: "Rectangles have pairs of equal sides. Two long sides, two short sides. So you don't need to add all four — just add one long and one short, then double.",
          viz: { type: "perimeterShape", params: { w: 7, h: 4, label: "7 + 4 = 11, then × 2 = 22" } },
        },
        watchMe: [
          { text: "A rectangle: 8 across, 3 tall.",
            viz: { type: "perimeterShape", params: { w: 8, h: 3 } } },
          { text: "Add ONE long side + ONE short side: 8 + 3 = 11.",
            equation: "8 + 3 = 11" },
          { text: "There are two of each. Double the total: 11 × 2 = 22.",
            equation: "2 × (8 + 3) = 22" },
          { text: "Perimeter = 22. Same answer, fewer steps." },
        ],
        practice: [
          {
            prompt: "Rectangle 10 by 6. Perimeter using the shortcut?",
            viz: { type: "perimeterShape", params: { w: 10, h: 6 } },
            options: [16, 26, 32],
            answer: 32,
            hint: "10 + 6 = 16. Double it: 32.",
          },
          {
            prompt: "A rectangle is 9 wide and 2 tall. Perimeter?",
            options: [11, 18, 22],
            answer: 22,
          },
        ],
      },
      {
        id: "missing-side",
        title: "Finding a Missing Side",
        subtitle: "Perimeter backwards.",
        emoji: "🧩",
        idea: {
          hook: "Sometimes the perimeter is given but one side is hidden. Work backwards: subtract the sides you DO know from the total — what's left is the missing side.",
          viz: { type: "perimeterShape", params: { w: 5, h: 2, label: "Perimeter = 14" } },
          caption: "If you know three sides and the perimeter, the fourth side comes from subtraction.",
        },
        watchMe: [
          { text: "A rectangle has perimeter 20. One side is 7. What's the OTHER side?",
            viz: { type: "perimeterShape", params: { w: 7, h: 3, label: "P = 20, w = 7, h = ?" } } },
          { text: "Two longs + two shorts = 20. The two longs are 7 each: 7 + 7 = 14.",
            equation: "7 + 7 = 14" },
          { text: "So the two shorts together = 20 − 14 = 6.",
            equation: "20 − 14 = 6" },
          { text: "One short = 6 ÷ 2 = 3. The missing side is 3.",
            equation: "6 ÷ 2 = 3" },
        ],
        practice: [
          {
            prompt: "Rectangle with perimeter 24. One side is 8. What's the other side?",
            options: [2, 4, 16],
            answer: 4,
            hint: "2 × 8 = 16. 24 − 16 = 8. Split between two: 8 ÷ 2 = 4.",
          },
          {
            prompt: "Square has perimeter 32. How long is one side?",
            options: [4, 8, 16],
            answer: 8,
            hint: "All 4 sides are equal. 32 ÷ 4 = 8.",
          },
        ],
      },
    ],
  });
})();
