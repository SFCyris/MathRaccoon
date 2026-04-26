/*
 * Pool: Slice & Shade (Geometry · Arcade)
 * =======================================
 * Tap/click pieces of a pre-partitioned shape to shade the right
 * fraction. Uses dragDrop engine, kind: "partition".
 *
 * CCSS 3.G.2.
 *
 * FORMAT:
 *   {
 *     "kind": "partition",
 *     "prompt": "Shade 3/4 of the rectangle.",
 *     "shape": "rect" | "circle",
 *     "cuts": 4,        // number of equal parts
 *     "shade": 3,       // how many of them to shade
 *     "hint": "..."
 *   }
 */
MR.Pools.register({
  "id": "geo-arcade-slice-shade",
  "title": "Slice & Shade",
  "askedPerRound": 6,
  "questions": [
    { "kind": "partition",
      "prompt": "Shade 1/2 of the rectangle.",
      "shape": "rect", "cuts": 2, "shade": 1,
      "hint": "One out of two equal parts." },

    { "kind": "partition",
      "prompt": "Shade 1/4 of the pizza.",
      "shape": "circle", "cuts": 4, "shade": 1,
      "hint": "One slice out of four." },

    { "kind": "partition",
      "prompt": "Shade 3/4 of the rectangle.",
      "shape": "rect", "cuts": 4, "shade": 3,
      "hint": "3 shaded, 1 not. Three quarters." },

    { "kind": "partition",
      "prompt": "Shade 2/3 of the pizza.",
      "shape": "circle", "cuts": 3, "shade": 2,
      "hint": "2 slices out of 3." },

    { "kind": "partition",
      "prompt": "Shade 5/8 of the pizza.",
      "shape": "circle", "cuts": 8, "shade": 5,
      "hint": "5 out of 8 slices." },

    { "kind": "partition",
      "prompt": "Shade 1/3 of the rectangle.",
      "shape": "rect", "cuts": 3, "shade": 1,
      "hint": "One out of three strips." },

    { "kind": "partition",
      "prompt": "Shade 3/6 of the rectangle.",
      "shape": "rect", "cuts": 6, "shade": 3,
      "hint": "Half of the strips — 3 out of 6." },

    { "kind": "partition",
      "prompt": "Shade 4/8 of the pizza.",
      "shape": "circle", "cuts": 8, "shade": 4,
      "hint": "Half the pie. 4 out of 8." },

    { "kind": "partition",
      "prompt": "Shade 2/6 of the pizza.",
      "shape": "circle", "cuts": 6, "shade": 2,
      "hint": "Two slices out of six." },

    { "kind": "partition",
      "prompt": "Shade 5/6 of the rectangle.",
      "shape": "rect", "cuts": 6, "shade": 5,
      "hint": "5 shaded, 1 not." },

    { "kind": "partition",
      "prompt": "Shade 7/8 of the pizza.",
      "shape": "circle", "cuts": 8, "shade": 7,
      "hint": "Everyone but one slice." },

    { "kind": "partition",
      "prompt": "Shade 1/6 of the rectangle.",
      "shape": "rect", "cuts": 6, "shade": 1,
      "hint": "Just one strip out of six." },

    { "kind": "partition",
      "prompt": "Shade 3/8 of the rectangle.",
      "shape": "rect", "cuts": 8, "shade": 3,
      "hint": "3 of the 8 strips." },

    { "kind": "partition",
      "prompt": "Shade 2/4 of the pizza.",
      "shape": "circle", "cuts": 4, "shade": 2,
      "hint": "Half the pizza = 2 out of 4." },

    { "kind": "partition",
      "prompt": "Shade 1/8 of the rectangle.",
      "shape": "rect", "cuts": 8, "shade": 1,
      "hint": "Just one strip out of eight." },

    { "kind": "partition",
      "prompt": "Shade 3/3 of the rectangle (all of it!).",
      "shape": "rect", "cuts": 3, "shade": 3,
      "hint": "3 out of 3 = the whole thing." },

    { "kind": "partition",
      "prompt": "Shade 6/8 of the pizza.",
      "shape": "circle", "cuts": 8, "shade": 6,
      "hint": "6 out of 8 slices." },

    { "kind": "partition",
      "prompt": "Shade 4/6 of the rectangle.",
      "shape": "rect", "cuts": 6, "shade": 4,
      "hint": "4 out of 6 strips." },

    { "kind": "partition",
      "prompt": "Shade 3/4 of the pizza.",
      "shape": "circle", "cuts": 4, "shade": 3,
      "hint": "3 slices out of 4." },

    { "kind": "partition",
      "prompt": "Shade 1/3 of the pizza.",
      "shape": "circle", "cuts": 3, "shade": 1,
      "hint": "One slice out of three." },

    { "kind": "partition",
      "prompt": "Shade 5/6 of the pizza.",
      "shape": "circle", "cuts": 6, "shade": 5,
      "hint": "Everyone but one." },

    { "kind": "partition",
      "prompt": "Shade 2/2 of the rectangle.",
      "shape": "rect", "cuts": 2, "shade": 2,
      "hint": "Both halves — the whole rectangle." },

    { "kind": "partition",
      "prompt": "Shade 4/4 of the pizza.",
      "shape": "circle", "cuts": 4, "shade": 4,
      "hint": "All four slices!" },

    { "kind": "partition",
      "prompt": "Shade 6/6 of the rectangle.",
      "shape": "rect", "cuts": 6, "shade": 6,
      "hint": "Every strip — the whole shape." },

    { "kind": "partition",
      "prompt": "Shade 2/8 of the rectangle.",
      "shape": "rect", "cuts": 8, "shade": 2,
      "hint": "2 of the 8 strips. Same as 1/4!" },
  ],
});
