/*!
 * Teaching op — Pictographs (data).
 *
 * Distinct from op-graphs (which teaches tallies and bar charts). A
 * pictograph is different because one icon may represent MORE than one
 * thing. The scale factor trap (half-icons, reading the key) is the
 * central skill here, and it's not covered by bar charts or tallies.
 *
 * Uses the pictograph viz.
 */
(function () {
  MR.Content.registerOp({
    id: "dat-op-pictograph",
    moduleId: "data",
    label: "Pictographs",
    emoji: "🖼️",
    tagline: "Pictures that count.",
    accent: "#ff7a93",
    strategies: [
      {
        id: "read-one-to-one",
        title: "When Each Icon = 1",
        subtitle: "Just count the pictures.",
        emoji: "1️⃣",
        idea: {
          hook: "The easiest pictograph is when every little picture stands for exactly one thing. If there are 4 apples in the row, that's 4 apples. Easy.",
          viz: { type: "pictograph", params: {
            rows: [
              { label: "Mon", count: 3, icon: "🍎" },
              { label: "Tue", count: 5, icon: "🍎" },
              { label: "Wed", count: 2, icon: "🍎" },
            ],
            label: "Apples picked each day",
          } },
          caption: "Each apple icon means one real apple.",
        },
        watchMe: [
          { text: "Here's a chart of acorns raccoon collected. Each 🌰 = 1 acorn.",
            viz: { type: "pictograph", params: {
              rows: [
                { label: "Mon", count: 4, icon: "🌰" },
                { label: "Tue", count: 2, icon: "🌰" },
                { label: "Wed", count: 6, icon: "🌰" },
              ],
            } } },
          { text: "On Monday: count the icons. 4 acorns.",
            equation: "Monday = 4" },
          { text: "Wednesday had the most: 6 acorns.",
            equation: "Wednesday = 6" },
          { text: "Total across all three days: 4 + 2 + 6 = 12 acorns.",
            equation: "Total = 12" },
        ],
        practice: [
          {
            prompt: "How many butterflies on Thursday?",
            viz: { type: "pictograph", params: {
              rows: [
                { label: "Wed", count: 2, icon: "🦋" },
                { label: "Thu", count: 5, icon: "🦋" },
                { label: "Fri", count: 3, icon: "🦋" },
              ],
            } },
            options: [3, 5, 10],
            answer: 5,
          },
          {
            prompt: "Which day had the fewest fish?",
            viz: { type: "pictograph", params: {
              rows: [
                { label: "Mon", count: 4, icon: "🐟" },
                { label: "Tue", count: 2, icon: "🐟" },
                { label: "Wed", count: 6, icon: "🐟" },
              ],
            } },
            options: ["Mon", "Tue", "Wed"],
            answer: "Tue",
          },
        ],
      },
      {
        id: "read-the-key",
        title: "Always Check the Key",
        subtitle: "Sometimes one icon = more than one.",
        emoji: "🔑",
        idea: {
          hook: "Big pictographs get CROWDED if each icon is only worth 1. So sometimes the key says '🐝 = 5 bees' — meaning each bee icon stands for five real bees. You MUST read the key before counting, or your answer will be totally wrong.",
          viz: { type: "pictograph", params: {
            rows: [
              { label: "Hive 1", count: 3, icon: "🐝" },
              { label: "Hive 2", count: 5, icon: "🐝" },
            ],
            icon: "🐝",
            scale: 5,
            label: "How many bees in each hive?",
          } },
          caption: "Three 🐝 icons × 5 bees each = 15 bees. Not 3!",
        },
        watchMe: [
          { text: "A pictograph shows stars collected. Each ⭐ = 2 stars.",
            viz: { type: "pictograph", params: {
              rows: [
                { label: "Owl", count: 4, icon: "⭐" },
                { label: "Fox", count: 3, icon: "⭐" },
              ],
              icon: "⭐", scale: 2,
            } } },
          { text: "Owl's row has 4 icons. Each is worth 2. So 4 × 2 = 8 stars.",
            equation: "4 × 2 = 8" },
          { text: "Fox's row: 3 × 2 = 6 stars.",
            equation: "3 × 2 = 6" },
          { text: "Moral: the NUMBER OF ICONS is not the answer. Icons × scale = the answer." },
        ],
        practice: [
          {
            prompt: "Each 🐟 = 10 fish. A row has 4 fish icons. How many real fish?",
            viz: { type: "pictograph", params: {
              rows: [{ label: "Lake", count: 4, icon: "🐟" }],
              icon: "🐟", scale: 10,
            } },
            options: [4, 14, 40],
            answer: 40,
            hint: "4 × 10 = 40.",
          },
          {
            prompt: "Each 🌸 = 3 flowers. A row has 5 flower icons. Real flowers?",
            options: [8, 15, 35],
            answer: 15,
            hint: "5 × 3 = 15.",
          },
        ],
      },
      {
        id: "compare-pictographs",
        title: "Comparing Rows",
        subtitle: "Which row has MORE?",
        emoji: "↕️",
        idea: {
          hook: "When the icons all count the same, you can compare rows just by looking at which one is LONGER. But if icons have different values (read the key!), you need to multiply before comparing.",
          viz: { type: "pictograph", params: {
            rows: [
              { label: "Bees", count: 3, icon: "🐝" },
              { label: "Ants", count: 7, icon: "🐜" },
            ],
            label: "Same scale → longer row = more",
          } },
        },
        watchMe: [
          { text: "Two rows, same icon (1 each).",
            viz: { type: "pictograph", params: {
              rows: [
                { label: "Team A", count: 6, icon: "🎯" },
                { label: "Team B", count: 9, icon: "🎯" },
              ],
            } } },
          { text: "Team B has more icons in the row. 9 > 6.",
            equation: "B > A: 9 > 6" },
          { text: "Difference: 9 − 6 = 3. Team B has 3 more points than A.",
            equation: "Difference: 3" },
        ],
        practice: [
          {
            prompt: "Looking at the chart, how many MORE apples on Tuesday than Monday?",
            viz: { type: "pictograph", params: {
              rows: [
                { label: "Mon", count: 4, icon: "🍎" },
                { label: "Tue", count: 7, icon: "🍎" },
              ],
            } },
            options: [3, 4, 11],
            answer: 3,
            hint: "Subtract: 7 − 4 = 3.",
          },
          {
            prompt: "Each 🍓 = 5 berries. Row 1 has 2 icons. Row 2 has 4 icons. How many more berries in row 2?",
            options: [2, 10, 20],
            answer: 10,
            hint: "Row 1 = 10 berries. Row 2 = 20. Difference = 10.",
          },
        ],
      },
    ],
  });
})();
