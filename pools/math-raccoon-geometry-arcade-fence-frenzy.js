/*
 * Pool: Fence Frenzy (Math Raccoon · Geometry · Arcade)
 * =====================================================
 * Perimeter word problems — sum every side of a shape (CCSS 3.MD.8).
 *
 * FORMAT — each question is a JSON object:
 *   {
 *     "prompt":  "Story text (HTML allowed).",
 *     "answer":  42,               // the correct numeric answer
 *     "options": [42, 40, 51],     // optional — engine auto-builds if omitted
 *     "suffix":  "cm",             // unit label (often cm, m, or ft)
 *     "hint":    "Add every side."
 *   }
 *
 * Teachers & parents: add more stories freely. 18+ recommended.
 */
MR.Pools.register({
  "id": "geo-arcade-fence-frenzy",
  "title": "Fence Frenzy",
  "askedPerRound": 6,
  "questions": [
    { "prompt": "🚧 A square pen has sides of 6 cm each. What is the perimeter?",
      "answer": 24, "suffix": "cm", "hint": "Four equal sides — 6 × 4." },
    { "prompt": "🚧 A rectangle garden is 8 cm long and 5 cm wide. Perimeter?",
      "answer": 26, "suffix": "cm", "hint": "2 × (8 + 5) or add all four sides." },
    { "prompt": "🚧 An equilateral triangle has sides of 7 cm. Perimeter?",
      "answer": 21, "suffix": "cm", "hint": "Three equal sides — 7 × 3." },
    { "prompt": "🚧 A square plot measures 9 cm on each side. Perimeter?",
      "answer": 36, "suffix": "cm", "hint": "9 × 4 = 36." },
    { "prompt": "🚧 A rectangle mat is 12 cm by 4 cm. Perimeter?",
      "answer": 32, "suffix": "cm", "hint": "2 × (12 + 4)." },
    { "prompt": "🚧 A 5-sided garden has sides 4, 4, 6, 6, 5 cm. Total fence needed?",
      "answer": 25, "suffix": "cm", "hint": "Add all five: 4+4+6+6+5." },
    { "prompt": "🚧 A square yard has perimeter fence of 4 sides × 11 cm. Perimeter?",
      "answer": 44, "suffix": "cm", "hint": "11 × 4 = 44." },
    { "prompt": "🚧 A triangle has sides 5 cm, 8 cm, and 9 cm. What is the perimeter?",
      "answer": 22, "suffix": "cm", "hint": "Add all three sides." },
    { "prompt": "🚧 A rectangle is 15 cm long and 7 cm wide. Perimeter?",
      "answer": 44, "suffix": "cm", "hint": "2 × (15 + 7) = 44." },
    { "prompt": "🚧 A hexagon (6 sides) has equal sides of 4 cm. Perimeter?",
      "answer": 24, "suffix": "cm", "hint": "6 × 4 = 24." },
    { "prompt": "🚧 A rectangle mat is 10 cm by 3 cm. How many cm of tape to go around?",
      "answer": 26, "suffix": "cm", "hint": "2 × (10 + 3)." },
    { "prompt": "🚧 A square tile has perimeter 28 cm. What's the length of ONE side?",
      "answer": 7, "suffix": "cm", "hint": "28 ÷ 4 = 7." },
    { "prompt": "🚧 A rectangle is 9 cm by 4 cm. Perimeter?",
      "answer": 26, "suffix": "cm", "hint": "2 × (9 + 4) = 26." },
    { "prompt": "🚧 A triangle has sides 6, 7, and 8 cm. Perimeter?",
      "answer": 21, "suffix": "cm", "hint": "Add all three." },
    { "prompt": "🚧 A square has side 13 cm. Perimeter?",
      "answer": 52, "suffix": "cm", "hint": "13 × 4." },
    { "prompt": "🚧 A rectangle is 11 cm long, 6 cm wide. Perimeter?",
      "answer": 34, "suffix": "cm", "hint": "2 × (11 + 6)." },
    { "prompt": "🚧 A pentagon has sides 3, 4, 5, 6, 7 cm. Perimeter?",
      "answer": 25, "suffix": "cm", "hint": "Add all five sides." },
    { "prompt": "🚧 A square garden has perimeter 40 cm. Side length?",
      "answer": 10, "suffix": "cm", "hint": "40 ÷ 4." }
  ]
});
