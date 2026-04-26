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
    ],
  });
})();
