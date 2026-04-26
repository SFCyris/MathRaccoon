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
 *     "hint":    "A hexagon has 6 sides."
 *   }
 *
 * Teachers & parents: add more shape-attribute questions freely.
 */
MR.Pools.register({
  "id": "geo-arcade-shape-sleuth",
  "title": "Shape Sleuth",
  "askedPerRound": 6,
  "questions": [
    { "prompt": "🔺 A triangle has how many sides?", "answer": 3, "hint": "Tri- means three." },
    { "prompt": "⬜ A square has how many sides?",    "answer": 4, "hint": "All four sides equal." },
    { "prompt": "⬟ A pentagon has how many sides?",  "answer": 5, "hint": "Penta- means five." },
    { "prompt": "⬢ A hexagon has how many sides?",   "answer": 6, "hint": "Hexa- means six." },
    { "prompt": "🔷 A rhombus has how many sides?",  "answer": 4, "hint": "A diamond shape — four equal sides." },
    { "prompt": "▱ A parallelogram has how many sides?", "answer": 4, "hint": "Opposite sides parallel — four total." },
    { "prompt": "🔺 A triangle has how many corners (vertices)?", "answer": 3, "hint": "Corners match side count." },
    { "prompt": "⬜ A rectangle has how many corners?", "answer": 4, "hint": "Four right-angled corners." },
    { "prompt": "⬢ A hexagon has how many corners?", "answer": 6, "hint": "Same as its number of sides." },
    { "prompt": "🔶 A trapezoid has how many sides?", "answer": 4, "hint": "It's a quadrilateral with one parallel pair." },
    { "prompt": "🟦 How many sides do 2 squares have in total?", "answer": 8, "hint": "4 + 4 = 8." },
    { "prompt": "🔺 How many sides do 3 triangles have in total?", "answer": 9, "hint": "3 × 3 = 9." },
    { "prompt": "⬢ How many sides do 2 hexagons have in total?", "answer": 12, "hint": "6 + 6." },
    { "prompt": "⬜ How many corners do 2 pentagons have in total?", "answer": 10, "hint": "5 × 2." },
    { "prompt": "🔷 A rhombus has how many pairs of parallel sides?", "answer": 2, "hint": "Both opposite pairs are parallel." },
    { "prompt": "🟥 A rectangle has how many right angles?", "answer": 4, "hint": "Every corner is a right angle." },
    { "prompt": "🔺 How many sides do 4 triangles have together?", "answer": 12, "hint": "4 × 3." },
    { "prompt": "⬜ How many corners do 5 squares have together?", "answer": 20, "hint": "5 × 4." }
  ]
});
