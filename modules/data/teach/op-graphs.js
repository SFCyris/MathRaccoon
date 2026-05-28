/*!
 * Teaching op — Reading graphs (data).
 */
(function () {
  MR.Content.registerOp({
    id: "dat-op-graphs",
    moduleId: "data",
    label: "Reading Graphs",
    emoji: "📊",
    tagline: "Let the picture tell the story.",
    accent: "#c4b5fd",
    strategies: [
      {
        id: "tallies",
        title: "Tally Marks",
        subtitle: "Count by 5s.",
        emoji: "✋",
        idea: {
          hook: "Tally marks are quick counts. Four single marks, then a slash across for 5. It's the fastest way to count with a pencil.",
          viz: { type: "tally", params: { count: 8, label: "8" } },
          caption: "One bundle of 5 plus 3 singles = 8."
        },
        watchMe: [
          { text: "Count these tallies:",
            viz: { type: "tally", params: { count: 12 } } },
          { text: "Each bundle is 5. Two bundles = 10." },
          { text: "Plus 2 singles = 12.",
            equation: "5 + 5 + 2 = 12" },
        ],
        practice: [
          {
            prompt: "How many are shown?",
            viz: { type: "tally", params: { count: 7 } },
            options: [5, 6, 7],
            answer: 7,
          },
          {
            prompt: "How many are shown?",
            viz: { type: "tally", params: { count: 11 } },
            options: [10, 11, 12],
            answer: 11,
          },
        ],
      },
      {
        id: "bar-graph",
        title: "Bar Graphs",
        subtitle: "Taller bar, more stuff.",
        emoji: "📏",
        idea: {
          hook: "A bar graph turns numbers into tall rectangles. Taller = more. Compare bars to see which category has the most.",
          viz: { type: "barChart", params: { bars: [
            { label: "🍎", value: 4 }, { label: "🍇", value: 7 }, { label: "🍓", value: 3 },
          ], label: "Favorite fruit" } },
          caption: "Seven kids picked grapes. Grapes wins!"
        },
        watchMe: [
          { text: "Here's a bar graph of book types the forest critters love.",
            viz: { type: "barChart", params: { bars: [
              { label: "fairy", value: 5 }, { label: "mystery", value: 8 }, { label: "science", value: 2 },
            ] } } },
          { text: "Mystery has the tallest bar. That's the favorite." },
          { text: "Science has the shortest bar — the fewest fans.",
            equation: "mystery > fairy > science" },
        ],
        practice: [
          {
            prompt: "Which bar is tallest?",
            viz: { type: "barChart", params: { bars: [
              { label: "🐰", value: 4 }, { label: "🦊", value: 9 }, { label: "🦝", value: 6 },
            ] } },
            options: ["🐰", "🦊", "🦝"],
            answer: "🦊",
          },
          {
            prompt: "How many voted for 🌟?",
            viz: { type: "barChart", params: { bars: [
              { label: "🌙", value: 3 }, { label: "🌟", value: 7 }, { label: "☁️", value: 5 },
            ] } },
            options: [5, 6, 7],
            answer: 7,
          },
        ],
      },
      {
        id: "reverse-graph",
        title: "Reverse — Numbers Into a Graph",
        subtitle: "Match the data to the picture.",
        emoji: "🔍",
        idea: {
          hook: "Reading a graph is forward. Going from numbers TO the graph is reverse. Which set of counts could have made this picture?",
          viz: { type: "barChart", params: { bars: [
            { label: "🐰", value: 6 }, { label: "🦊", value: 3 }, { label: "🦝", value: 5 },
          ], label: "Which counts match?" } },
          caption: "Bunny tallest (6). Fox shortest (3). Raccoon in the middle (5).",
        },
        watchMe: [
          { text: "Here's a graph. Now I'll tell you the counts and you check.",
            viz: { type: "barChart", params: { bars: [
              { label: "A", value: 4 }, { label: "B", value: 7 }, { label: "C", value: 2 },
            ] } } },
          { text: "I say: A=4, B=7, C=2. The B bar should be the tallest. C should be shortest. ✓",
            equation: "B (7) > A (4) > C (2)" },
          { text: "Detective: which set of counts matches this graph?",
            viz: { type: "barChart", params: { bars: [
              { label: "🍎", value: 5 }, { label: "🍌", value: 2 }, { label: "🍇", value: 8 },
            ] } } },
          { text: "Grapes is tallest (8). Banana is shortest (2). Apple is in between (5).",
            equation: "🍎 5 · 🍌 2 · 🍇 8" },
        ],
        practice: [
          { prompt: "A graph shows 🐶: 3 and 🐱: 5. Which bar is TALLER?",
            viz: { type: "barChart", params: { bars: [
              { label: "🐶", value: 3 }, { label: "🐱", value: 5 },
            ] } },
            options: ["🐶", "🐱", "equal"], answer: "🐱",
            hint: "5 > 3 — cat bar is taller." },
          { prompt: "Which counts could make this graph: tallest: 7, middle: 4, shortest: 2?",
            viz: { type: "barChart", params: { bars: [
              { label: "X", value: 7 }, { label: "Y", value: 4 }, { label: "Z", value: 2 },
            ] } },
            options: ["X: 7, Y: 4, Z: 2", "X: 2, Y: 4, Z: 7", "all equal"], answer: "X: 7, Y: 4, Z: 2",
            hint: "Look at the heights left-to-right." },
          { prompt: "Detective: a graph has 3 bars all the same height. The data must be…",
            viz: { type: "barChart", params: { bars: [
              { label: "A", value: 5 }, { label: "B", value: 5 }, { label: "C", value: 5 },
            ], label: "All bars same height" } },
            options: ["all different", "all equal", "two same, one different"], answer: "all equal",
            hint: "Same height means same count." },
        ],
      },
    ],
  });
})();
