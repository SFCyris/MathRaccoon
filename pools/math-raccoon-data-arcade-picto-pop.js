/*
 * Pool: Picto Pop (Math Raccoon · Data · Arcade)
 * ==============================================
 * Pictograph reading — each icon stands for a number (CCSS 3.MD.3).
 *
 * FORMAT — each question is a JSON object:
 *   {
 *     "prompt":  "Story text (HTML allowed).",
 *     "answer":  12,                 // the numeric answer
 *     "options": [10, 12, 14],       // optional
 *     "suffix":  "",                 // usually empty ("cats", etc. can go in prompt)
 *     "hint":    "Multiply icons × scale."
 *   }
 *
 * Teachers & parents: add more pictograph stories freely.
 */
MR.Pools.register({
  "id": "dat-arcade-picto-pop",
  "title": "Picto Pop",
  "askedPerRound": 6,
  "questions": [
    { "prompt": "🖼️ Each 🐶 means 2 dogs. The row shows 🐶🐶🐶🐶. How many dogs?",
      "answer": 8, "hint": "4 icons × 2 dogs each." },
    { "prompt": "🖼️ Each ⭐ means 5 wishes. A row has ⭐⭐⭐. How many wishes?",
      "answer": 15, "hint": "3 × 5." },
    { "prompt": "🖼️ Each 🍎 means 4 apples. A row shows 🍎🍎🍎🍎🍎. How many apples?",
      "answer": 20, "hint": "5 × 4." },
    { "prompt": "🖼️ Each 🐟 means 10 fish. Row: 🐟🐟🐟. How many fish?",
      "answer": 30, "hint": "3 × 10." },
    { "prompt": "🖼️ Each 🐝 means 3 bees. Row: 🐝🐝🐝🐝🐝🐝. How many bees?",
      "answer": 18, "hint": "6 × 3." },
    { "prompt": "🖼️ Each 🚗 means 6 cars. Row: 🚗🚗🚗🚗. Total cars?",
      "answer": 24, "hint": "4 × 6." },
    { "prompt": "🖼️ Each 🐰 means 2 bunnies. Row: 🐰🐰🐰🐰🐰🐰🐰. Total bunnies?",
      "answer": 14, "hint": "7 × 2." },
    { "prompt": "🖼️ Each 🦊 means 5 foxes. Row: 🦊🦊🦊🦊. Total foxes?",
      "answer": 20, "hint": "4 × 5." },
    { "prompt": "🖼️ Monday had 3 🐻 (=4 each), Tuesday had 5 🐻. Monday bears?",
      "answer": 12, "hint": "3 × 4 = 12." },
    { "prompt": "🖼️ Row A: 6 🌟 (=2 each). Row B: 4 🌟. How many more stars in A than B?",
      "answer": 4, "hint": "(6 − 4) × 2." },
    { "prompt": "🖼️ Each 📚 means 10 books. Row: 📚📚📚📚📚. Total books?",
      "answer": 50, "hint": "5 × 10." },
    { "prompt": "🖼️ Each 🍪 means 3 cookies. If 8 icons, total cookies?",
      "answer": 24, "hint": "8 × 3." },
    { "prompt": "🖼️ Each 🌸 means 5 flowers. Row has 7 flowers' icons. Total?",
      "answer": 35, "hint": "7 × 5." },
    { "prompt": "🖼️ Each 🐝 = 4 bees. Row A: 5 icons, Row B: 3 icons. Total bees combined?",
      "answer": 32, "hint": "(5 + 3) × 4." },
    { "prompt": "🖼️ Half an icon 🐟 (=10 fish) means 5 fish. Row: 2 full + 1 half icons. Total fish?",
      "answer": 25, "hint": "2×10 + 5." },
    { "prompt": "🖼️ Each 🎈 = 2 balloons. If the row shows 9 icons, total balloons?",
      "answer": 18, "hint": "9 × 2." },
    { "prompt": "🖼️ Each 🍓 = 6 berries. Row has 4 icons. Total berries?",
      "answer": 24, "hint": "4 × 6." },
    { "prompt": "🖼️ Chart shows: Dogs 4 icons (=5 each), Cats 6 icons (=5 each). How many more cats than dogs?",
      "answer": 10, "hint": "(6 − 4) × 5." }
  ]
});
