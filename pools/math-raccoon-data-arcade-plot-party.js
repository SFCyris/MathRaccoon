/*
 * Pool: Plot Party (Data · Arcade)
 * =================================
 * Build a line plot by clicking (or tapping) the scale to add X's.
 * Uses the `linePlot` kind of the dragDrop engine — no typing.
 *
 * FORMAT — each question is a JSON object:
 *   {
 *     "kind":   "linePlot",
 *     "prompt": "Raccoon measured 6 acorns: 2, 3, 3, 4, 5, 3 inches. Plot them!",
 *     "scale":  { "min": 1, "max": 6, "step": 1, "unit": "inches" },
 *     "marks":  [2, 3, 3, 3, 4, 5],
 *     "hint":   "Tap a number to add an X. The child must plot 6 X's total."
 *   }
 *
 * CCSS 3.MD.B.4. Teachers & parents: 12+ recommended.
 */
MR.Pools.register({
  "id": "dat-arcade-plot-party",
  "title": "Plot Party",
  "askedPerRound": 5,
  "questions": [
    { "kind": "linePlot",
      "prompt": "Raccoon measured 6 pinecones: 2, 3, 3, 4, 4, 5 inches. Plot each measurement.",
      "scale": { "min": 1, "max": 6, "step": 1, "unit": "inches" },
      "marks": [2, 3, 3, 4, 4, 5],
      "hint":  "Tap a number to add an X. Need 6 X's total." },

    { "kind": "linePlot",
      "prompt": "Owl weighed 5 mice: 2, 2, 3, 3, 3 oz. Build the line plot.",
      "scale": { "min": 1, "max": 5, "step": 1, "unit": "oz" },
      "marks": [2, 2, 3, 3, 3],
      "hint":  "5 X's total. Two at 2, three at 3." },

    { "kind": "linePlot",
      "prompt": "Kids counted bugs on leaves: 1, 2, 2, 3, 3, 3, 4. Plot them!",
      "scale": { "min": 1, "max": 5, "step": 1, "unit": "bugs" },
      "marks": [1, 2, 2, 3, 3, 3, 4],
      "hint":  "7 X's. The stack above 3 is tallest." },

    { "kind": "linePlot",
      "prompt": "Fox measured 6 sticks: 4, 4, 5, 6, 6, 7 cm.",
      "scale": { "min": 3, "max": 8, "step": 1, "unit": "cm" },
      "marks": [4, 4, 5, 6, 6, 7],
      "hint":  "6 X's. Two each at 4 and 6, one each at 5 and 7." },

    { "kind": "linePlot",
      "prompt": "The class measured their pencils: 4, 5, 5, 5, 6, 6, 7 in.",
      "scale": { "min": 3, "max": 8, "step": 1, "unit": "inches" },
      "marks": [4, 5, 5, 5, 6, 6, 7],
      "hint":  "7 X's. Tallest stack is at 5 (three pencils)." },

    { "kind": "linePlot",
      "prompt": "Rabbit hopped these many times each day for a week: 3, 4, 4, 5, 5, 5, 6.",
      "scale": { "min": 1, "max": 8, "step": 1, "unit": "hops" },
      "marks": [3, 4, 4, 5, 5, 5, 6],
      "hint":  "7 X's. Three at 5, two at 4, one each at 3 and 6." },

    { "kind": "linePlot",
      "prompt": "Squirrel's acorn list: 2, 3, 3, 3, 3, 4 inches.",
      "scale": { "min": 1, "max": 5, "step": 1, "unit": "inches" },
      "marks": [2, 3, 3, 3, 3, 4],
      "hint":  "6 X's — and 4 of them stack at 3!" },

    { "kind": "linePlot",
      "prompt": "Daily rainfall in cm: 0, 1, 1, 2, 2, 2, 3.",
      "scale": { "min": 0, "max": 4, "step": 1, "unit": "cm" },
      "marks": [0, 1, 1, 2, 2, 2, 3],
      "hint":  "7 X's. Column 2 has the tallest stack." },

    { "kind": "linePlot",
      "prompt": "Mouse counted nuts per day: 2, 3, 4, 4, 5, 5, 5, 6 nuts.",
      "scale": { "min": 1, "max": 7, "step": 1, "unit": "nuts" },
      "marks": [2, 3, 4, 4, 5, 5, 5, 6],
      "hint":  "8 X's total. Three at 5 is the mode." },

    { "kind": "linePlot",
      "prompt": "Bird nests with eggs: 1, 2, 2, 3, 3, 4.",
      "scale": { "min": 0, "max": 5, "step": 1, "unit": "eggs" },
      "marks": [1, 2, 2, 3, 3, 4],
      "hint":  "6 X's. Two columns tied at 2 X's." },

    { "kind": "linePlot",
      "prompt": "Readers finished books each week: 1, 2, 2, 3, 3, 3.",
      "scale": { "min": 0, "max": 4, "step": 1, "unit": "books" },
      "marks": [1, 2, 2, 3, 3, 3],
      "hint":  "6 X's. Three at 3 is the tallest stack." },

    { "kind": "linePlot",
      "prompt": "Temperatures this week: 68, 70, 70, 72, 72, 72, 74 °F.",
      "scale": { "min": 66, "max": 76, "step": 2, "unit": "°F" },
      "marks": [68, 70, 70, 72, 72, 72, 74],
      "hint":  "Scale counts by 2s. 7 X's total." },

    { "kind": "linePlot",
      "prompt": "Cat naps per day: 3, 4, 4, 4, 5, 5, 6.",
      "scale": { "min": 1, "max": 8, "step": 1, "unit": "naps" },
      "marks": [3, 4, 4, 4, 5, 5, 6],
      "hint":  "7 X's. Tall stack at 4 (three naps)." },

    { "kind": "linePlot",
      "prompt": "Hiking distances: 2, 3, 3, 4, 4, 4, 5 miles.",
      "scale": { "min": 1, "max": 6, "step": 1, "unit": "miles" },
      "marks": [2, 3, 3, 4, 4, 4, 5],
      "hint":  "7 X's total. Mode is 4 (three hikes)." },

    { "kind": "linePlot",
      "prompt": "Baby teeth at the clinic: 4, 5, 5, 6, 6, 6, 7.",
      "scale": { "min": 3, "max": 8, "step": 1, "unit": "teeth" },
      "marks": [4, 5, 5, 6, 6, 6, 7],
      "hint":  "7 X's. Stack tallest at 6." },

    { "kind": "linePlot",
      "prompt": "Library books checked out: 1, 2, 2, 2, 3, 3, 4, 4.",
      "scale": { "min": 0, "max": 5, "step": 1, "unit": "books" },
      "marks": [1, 2, 2, 2, 3, 3, 4, 4],
      "hint":  "8 X's. Three X's at 2 is the mode." },

    { "kind": "linePlot",
      "prompt": "Pumpkin weights: 6, 8, 8, 10, 10, 10, 12 lbs.",
      "scale": { "min": 4, "max": 14, "step": 2, "unit": "lbs" },
      "marks": [6, 8, 8, 10, 10, 10, 12],
      "hint":  "Scale counts by 2s. 7 X's total." },

    { "kind": "linePlot",
      "prompt": "Class shoe sizes: 2, 2, 3, 3, 3, 4, 5.",
      "scale": { "min": 1, "max": 6, "step": 1, "unit": "size" },
      "marks": [2, 2, 3, 3, 3, 4, 5],
      "hint":  "7 X's. Three at size 3." },

    { "kind": "linePlot",
      "prompt": "Snowfall per day: 0, 1, 1, 2, 2, 3, 3, 3.",
      "scale": { "min": 0, "max": 4, "step": 1, "unit": "in" },
      "marks": [0, 1, 1, 2, 2, 3, 3, 3],
      "hint":  "8 X's total. Mode is 3 inches." },

    { "kind": "linePlot",
      "prompt": "Pencil lengths: 5, 6, 6, 7, 7, 7, 8 cm.",
      "scale": { "min": 4, "max": 9, "step": 1, "unit": "cm" },
      "marks": [5, 6, 6, 7, 7, 7, 8],
      "hint":  "7 X's. Tallest stack at 7." },

    { "kind": "linePlot",
      "prompt": "Birdbath visits per hour: 1, 2, 2, 3, 3, 3, 4, 5.",
      "scale": { "min": 0, "max": 6, "step": 1, "unit": "birds" },
      "marks": [1, 2, 2, 3, 3, 3, 4, 5],
      "hint":  "8 X's total. Mode is 3." },

    { "kind": "linePlot",
      "prompt": "Lost marbles counted: 1, 1, 2, 2, 2, 2, 3.",
      "scale": { "min": 0, "max": 4, "step": 1, "unit": "marbles" },
      "marks": [1, 1, 2, 2, 2, 2, 3],
      "hint":  "7 X's. Four X's stack at 2!" },

    { "kind": "linePlot",
      "prompt": "Bee visits per flower: 3, 4, 4, 5, 5, 5, 6, 7.",
      "scale": { "min": 2, "max": 8, "step": 1, "unit": "bees" },
      "marks": [3, 4, 4, 5, 5, 5, 6, 7],
      "hint":  "8 X's total. Tallest at 5." }
  ]
});
