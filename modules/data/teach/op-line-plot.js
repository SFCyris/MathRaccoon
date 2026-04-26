/*!
 * Teaching op — Line Plots (data).
 *
 * CCSS 3.MD.B.4: "Generate measurement data by measuring lengths using
 * rulers marked with halves and fourths of an inch. Show the data by
 * making a line plot, where the horizontal scale is marked off in
 * appropriate units — whole numbers, halves, or quarters."
 *
 * Three strategies:
 *   1. WHAT is a line plot? (read one)
 *   2. How to BUILD one (turn a list into a chart)
 *   3. READ it (answer questions — most / fewest / total / difference)
 *
 * Uses the linePlot teaching viz.
 */
(function () {
  MR.Content.registerOp({
    id: "dat-op-line-plot",
    moduleId: "data",
    label: "Line Plots",
    emoji: "📈",
    tagline: "X marks the count.",
    accent: "#ff7a93",
    strategies: [
      {
        id: "what-is-line-plot",
        title: "What's a Line Plot?",
        subtitle: "A number line with stacks of X's.",
        emoji: "📏",
        idea: {
          hook: "A line plot is a number line with a column of X's stacked above each number. Each X means one measurement. Where the tallest stack is — that's the most common answer.",
          viz: { type: "linePlot", params: {
            min: 1, max: 6, step: 1, unit: "inches",
            marks: [3, 3, 4, 4, 4, 5, 5, 2, 6],
            label: "Acorn lengths raccoon measured",
          } },
          caption: "4 inches is the tallest stack — the most common length.",
        },
        watchMe: [
          { text: "Raccoon measures 7 acorns. They're 2, 3, 3, 4, 4, 4, and 5 inches long.",
            viz: { type: "linePlot", params: {
              min: 1, max: 6, step: 1, unit: "inches",
              marks: [2, 3, 3, 4, 4, 4, 5],
            } } },
          { text: "Above the number 4, we stacked THREE X's. That's because three acorns were 4 inches.",
            viz: { type: "linePlot", params: {
              min: 1, max: 6, step: 1, unit: "inches",
              marks: [2, 3, 3, 4, 4, 4, 5],
              highlight: 4,
            } },
            equation: "4 inches = 3 acorns" },
          { text: "No acorns were 1 or 6 inches, so those columns are EMPTY. That's okay — empty means zero." },
        ],
        practice: [
          {
            prompt: "How many acorns were 3 inches long?",
            viz: { type: "linePlot", params: {
              min: 1, max: 5, step: 1, unit: "in",
              marks: [2, 3, 3, 3, 4, 4, 5],
              highlight: 3,
            } },
            options: [2, 3, 4],
            answer: 3,
            hint: "Count the X's stacked above 3.",
          },
          {
            prompt: "Which length is most common?",
            viz: { type: "linePlot", params: {
              min: 1, max: 6, step: 1, unit: "in",
              marks: [2, 3, 4, 4, 4, 4, 5, 5, 6],
            } },
            options: ["3 in", "4 in", "5 in"],
            answer: "4 in",
            hint: "The tallest stack tells you the most common.",
          },
        ],
      },
      {
        id: "build-a-line-plot",
        title: "Build One Yourself",
        subtitle: "Every number gets one X per measurement.",
        emoji: "✏️",
        idea: {
          hook: "Got a list of measurements? A line plot turns them into a picture. For EACH number in your list, add ONE X above that value on the line. Same number twice? Stack them.",
          viz: { type: "linePlot", params: {
            min: 2, max: 6, step: 1, unit: "cm",
            marks: [3, 5, 3, 4, 5, 3],
            label: "List: 3, 5, 3, 4, 5, 3 → stacks above those numbers",
          } },
          caption: "Three 3's → three X's stacked at 3. Two 5's → two X's stacked at 5.",
        },
        watchMe: [
          { text: "List of leaf widths: 2, 4, 4, 5, 2, 4 inches.",
            viz: { type: "linePlot", params: {
              min: 1, max: 6, step: 1, unit: "in",
              marks: [],
              label: "Start with an empty scale 1–6.",
            } } },
          { text: "Read 2. Add an X above 2.",
            viz: { type: "linePlot", params: {
              min: 1, max: 6, step: 1, unit: "in",
              marks: [2], highlight: 2,
            } } },
          { text: "Read 4. Add an X above 4. Read 4 again. Another X — now a STACK of 2.",
            viz: { type: "linePlot", params: {
              min: 1, max: 6, step: 1, unit: "in",
              marks: [2, 4, 4], highlight: 4,
            } } },
          { text: "Finish the list: 5, 2, 4. Every number becomes one X.",
            viz: { type: "linePlot", params: {
              min: 1, max: 6, step: 1, unit: "in",
              marks: [2, 4, 4, 5, 2, 4],
            } },
            equation: "6 values → 6 X's total" },
        ],
        practice: [
          {
            prompt: "Raccoon plotted 5 X's for sticks: 3, 4, 4, 5, 4. How many X's are stacked above 4?",
            viz: { type: "linePlot", params: {
              min: 2, max: 6, step: 1, unit: "in",
              marks: [3, 4, 4, 5, 4], highlight: 4,
            } },
            options: [2, 3, 4],
            answer: 3,
            hint: "Count the 4's in the list: there are three.",
          },
          {
            prompt: "The list is: 5, 6, 5, 5, 7. Above which number is the TALLEST stack?",
            viz: { type: "linePlot", params: {
              min: 4, max: 8, step: 1, unit: "cm",
              marks: [5, 6, 5, 5, 7],
            } },
            options: [5, 6, 7],
            answer: 5,
            hint: "Count how many times each number appears. 5 appears three times.",
          },
        ],
      },
      {
        id: "read-and-compare",
        title: "Ask Questions",
        subtitle: "Most, fewest, total, how many more?",
        emoji: "🔎",
        idea: {
          hook: "Once you've made a line plot, you can answer questions fast: which length appears most? fewest? how many were shorter than 5? TOTAL number of measurements (count ALL the X's)?",
          viz: { type: "linePlot", params: {
            min: 1, max: 6, step: 1, unit: "in",
            marks: [2, 3, 3, 3, 4, 4, 5, 5, 5, 5, 6],
            label: "11 measurements total",
          } },
          caption: "Count all X's for the total (11). Tallest stack = 5 in. Fewest = 2, 6 (tied at 1 each).",
        },
        watchMe: [
          { text: "Look at the plot — acorn lengths.",
            viz: { type: "linePlot", params: {
              min: 2, max: 6, step: 1, unit: "in",
              marks: [2, 3, 3, 4, 4, 4, 4, 5, 6, 6],
            } } },
          { text: "TOTAL acorns: count every X. 1 + 2 + 4 + 1 + 2 = 10.",
            equation: "Total = 10" },
          { text: "MOST common: the tallest stack is at 4 inches (4 acorns).",
            equation: "mode = 4 in" },
          { text: "How many MORE acorns were 4 in than 5 in? 4 − 1 = 3.",
            equation: "4 − 1 = 3" },
        ],
        practice: [
          {
            prompt: "What's the TOTAL number of X's on this plot?",
            viz: { type: "linePlot", params: {
              min: 1, max: 5, step: 1, unit: "cm",
              marks: [2, 2, 3, 4, 4, 4, 5],
            } },
            options: [5, 6, 7],
            answer: 7,
            hint: "Count every X across all columns: 2 + 1 + 3 + 1 = 7.",
          },
          {
            prompt: "How many MORE measurements were 3 in than 5 in?",
            viz: { type: "linePlot", params: {
              min: 1, max: 6, step: 1, unit: "in",
              marks: [2, 3, 3, 3, 3, 4, 5, 6],
            } },
            options: [1, 2, 3],
            answer: 3,
            hint: "4 stacks at 3, 1 stack at 5 → 4 − 1 = 3.",
          },
          {
            prompt: "Which length had the FEWEST measurements?",
            viz: { type: "linePlot", params: {
              min: 1, max: 5, step: 1, unit: "in",
              marks: [1, 2, 2, 3, 3, 3, 4, 4],
            } },
            options: ["1 in", "2 in", "4 in"],
            answer: "1 in",
            hint: "The SHORTEST stack (only one X) is at 1 inch.",
          },
        ],
      },
    ],
  });
})();
