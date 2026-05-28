/*
 * Pool: Shape Sleuth (Math Raccoon · Geometry · Arcade)
 * =====================================================
 * Shape attributes — side counts, vertex counts, quick addition (CCSS 3.G.1).
 * Uses the word-problem engine for prompt-based questions.
 *
 * FORMAT — each question is a JSON object:
 *   {
 *     "prompt":  "Question text (HTML allowed).",
 *     "answer":  6,                   // the correct numeric answer
 *     "options": [3, 4, 5, 6],        // optional — engine auto-builds if omitted
 *     "suffix":  "",                  // usually empty for shape counts
 *     "hint":    "A hexagon has 6 sides.",
 *     "viz":     { type, params }     // optional MR.Viz spec
 *   }
 *
 * VIZ STRATEGY: forward items ("how many sides does a triangle have?") get a
 * shapeGrid viz showing the shape — kid counts sides on the visible polygon.
 * That's the LEARNING task. Detective items ("I have 5 sides, what am I?")
 * get NO viz because showing the shape would leak the answer.
 *
 * Teachers & parents: add more shape-attribute questions freely.
 */
MR.Pools.register({
  "id": "geo-arcade-shape-sleuth",
  "title": "Shape Sleuth",
  "askedPerRound": 6,
  "questions": [
    { "prompt": "🔺 A triangle has how many sides?", "answer": 3, "hint": "Look at the picture. Count the straight edges.",
      "viz": { "type": "shapeGrid", "params": { "shapes": [{ "kind": "triangle", "name": "Count the sides" }] } } },
    { "prompt": "⬜ A square has how many sides?", "answer": 4, "hint": "Look at the picture. Count the straight edges.",
      "viz": { "type": "shapeGrid", "params": { "shapes": [{ "kind": "square", "name": "Count the sides" }] } } },
    { "prompt": "⬟ A pentagon has how many sides?", "answer": 5, "hint": "Look at the picture. Count the straight edges.",
      "viz": { "type": "shapeGrid", "params": { "shapes": [{ "kind": "pentagon", "name": "Count the sides" }] } } },
    { "prompt": "⬢ A hexagon has how many sides?", "answer": 6, "hint": "Look at the picture. Count the straight edges.",
      "viz": { "type": "shapeGrid", "params": { "shapes": [{ "kind": "hexagon", "name": "Count the sides" }] } } },
    { "prompt": "🔷 A rhombus has how many sides?", "answer": 4, "hint": "Look at the picture. Count the straight edges.",
      "viz": { "type": "shapeGrid", "params": { "shapes": [{ "kind": "rhombus", "name": "Count the sides" }] } } },
    { "prompt": "▱ A parallelogram has how many sides?", "answer": 4, "hint": "Look at the picture. Count the straight edges.",
      "viz": { "type": "shapeGrid", "params": { "shapes": [{ "kind": "parallelogram", "name": "Count the sides" }] } } },
    { "prompt": "🔺 A triangle has how many corners (vertices)?", "answer": 3, "hint": "Look at the picture. Count the pointy corners.",
      "viz": { "type": "shapeGrid", "params": { "shapes": [{ "kind": "triangle", "name": "Count the corners" }] } } },
    { "prompt": "⬜ A rectangle has how many corners?", "answer": 4, "hint": "Look at the picture. Count the corners.",
      "viz": { "type": "shapeGrid", "params": { "shapes": [{ "kind": "rectangle", "name": "Count the corners" }] } } },
    { "prompt": "⬢ A hexagon has how many corners?", "answer": 6, "hint": "Look at the picture. Count the corners.",
      "viz": { "type": "shapeGrid", "params": { "shapes": [{ "kind": "hexagon", "name": "Count the corners" }] } } },
    { "prompt": "🔶 A trapezoid has how many sides?", "answer": 4, "hint": "Look at the picture. Count the straight edges.",
      "viz": { "type": "shapeGrid", "params": { "shapes": [{ "kind": "trapezoid", "name": "Count the sides" }] } } },
    { "prompt": "🟦 How many sides do 2 squares have in total?", "answer": 8, "hint": "Count the sides on one square. Then add that count twice.",
      "viz": { "type": "shapeGrid", "params": { "shapes": [{ "kind": "square" }, { "kind": "square" }] } } },
    { "prompt": "🔺 How many sides do 3 triangles have in total?", "answer": 9, "hint": "Count the sides on one triangle. Add that count three times.",
      "viz": { "type": "shapeGrid", "params": { "shapes": [{ "kind": "triangle" }, { "kind": "triangle" }, { "kind": "triangle" }] } } },
    { "prompt": "⬢ How many sides do 2 hexagons have in total?", "answer": 12, "hint": "Count the sides on one hexagon. Then add that count twice.",
      "viz": { "type": "shapeGrid", "params": { "shapes": [{ "kind": "hexagon" }, { "kind": "hexagon" }] } } },
    { "prompt": "⬜ How many corners do 2 pentagons have in total?", "answer": 10, "hint": "Count the corners on one pentagon. Then add that count twice.",
      "viz": { "type": "shapeGrid", "params": { "shapes": [{ "kind": "pentagon" }, { "kind": "pentagon" }] } } },
    { "prompt": "🔷 A rhombus has how many pairs of parallel sides?", "answer": 2, "hint": "Look at the picture. Find sides that point the same way.",
      "viz": { "type": "shapeGrid", "params": { "shapes": [{ "kind": "rhombus", "name": "Look for parallel pairs" }] } } },
    { "prompt": "🟥 A rectangle has how many right angles?", "answer": 4, "hint": "Look at the picture. Count the square corners.",
      "viz": { "type": "shapeGrid", "params": { "shapes": [{ "kind": "rectangle", "name": "Count right angles" }] } } },
    { "prompt": "🔺 How many sides do 4 triangles have together?", "answer": 12, "hint": "Count the sides on one triangle. Add that count four times.",
      "viz": { "type": "shapeGrid", "params": { "shapes": [{ "kind": "triangle" }, { "kind": "triangle" }, { "kind": "triangle" }, { "kind": "triangle" }] } } },
    { "prompt": "⬜ How many corners do 5 squares have together?", "answer": 20, "hint": "Count the corners on one square. Add that count five times.",
      "viz": { "type": "shapeGrid", "params": { "shapes": [{ "kind": "square" }, { "kind": "square" }, { "kind": "square" }, { "kind": "square" }, { "kind": "square" }] } } },

    // ---- Reverse: given a count, name the shape (3.G.1) ----
    // No viz — showing the shape would leak the answer.
    { "prompt": "🔍 Detective: I have exactly 5 sides. What am I?",
      "options": ["triangle", "pentagon", "hexagon"], "answer": "pentagon",
      "hint": "Picture each option in your head. Which one has exactly that many sides?" },
    { "prompt": "🔍 Detective: I have 6 corners and 6 sides. What am I?",
      "options": ["square", "hexagon", "pentagon"], "answer": "hexagon",
      "hint": "Picture each option in your head. Which one has 6 corners and 6 sides?" },
    { "prompt": "🔍 Detective: I'm a quadrilateral with 4 equal sides AND 4 right angles. What am I?",
      "options": ["rhombus", "rectangle", "square"], "answer": "square",
      "hint": "Find a shape that has BOTH equal sides AND right-angle corners." },
    { "prompt": "🔍 Detective: I'm a quadrilateral with 4 right angles but NOT all sides equal. What am I?",
      "options": ["rectangle", "square", "rhombus"], "answer": "rectangle",
      "hint": "Find a shape with square corners. Two long sides, two short sides." },
    { "prompt": "🔍 Detective: I have 4 sides but only ONE pair is parallel. What am I?",
      "options": ["trapezoid", "rhombus", "parallelogram"], "answer": "trapezoid",
      "hint": "Find a four-sided shape with just one pair of sides pointing the same way." },
    { "prompt": "🔍 Detective: which shape has 6 corners and 6 sides?",
      "options": ["pentagon", "hexagon", "triangle"], "answer": "hexagon",
      "hint": "Picture each option in your head. Which one has 6 corners and 6 sides?" },
    { "prompt": "🔍 Detective: I have 4 sides, all the same length. I might be a square OR…",
      "options": ["triangle", "rhombus", "pentagon"], "answer": "rhombus",
      "hint": "Find a four-sided shape with equal sides but tilted, not square." }
  ]
});
