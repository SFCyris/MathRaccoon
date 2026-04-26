/*
 * Pool: Jug Judge (Math Raccoon · Measurement · Arcade)
 * =====================================================
 * Capacity — milliliters (CCSS 3.MD.2).
 *
 * FORMAT — each question is a JSON object:
 *   {
 *     "prompt":  "Story text (HTML allowed).",
 *     "answer":  450,                // the numeric answer
 *     "options": [400, 450, 500],    // optional
 *     "suffix":  "mL",               // almost always "mL" here
 *     "hint":    "Pour + pour = total mL."
 *   }
 *
 * Teachers & parents: add more capacity stories freely.
 */
MR.Pools.register({
  "id": "mea-arcade-jug-judge",
  "title": "Jug Judge",
  "askedPerRound": 6,
  "questions": [
    { "prompt": "🥤 A jug has 300 mL of juice. Raccoon pours in 200 mL more. Total mL?",
      "answer": 500, "suffix": "mL", "hint": "300 + 200." },
    { "prompt": "🥤 A bottle holds 250 mL of milk. Add 150 mL. Total mL?",
      "answer": 400, "suffix": "mL", "hint": "250 + 150." },
    { "prompt": "🍵 Teapot had 800 mL. Owl drank 350 mL. How much left?",
      "answer": 450, "suffix": "mL", "hint": "800 − 350." },
    { "prompt": "🥛 Pitcher holds 900 mL. Fox pours 400 mL into a cup. How much left?",
      "answer": 500, "suffix": "mL", "hint": "900 − 400." },
    { "prompt": "☕ 4 teacups hold 200 mL each. Total mL?",
      "answer": 800, "suffix": "mL", "hint": "4 × 200." },
    { "prompt": "🍶 5 glasses of 150 mL each. Total mL?",
      "answer": 750, "suffix": "mL", "hint": "5 × 150." },
    { "prompt": "🥤 3 jugs of 250 mL. Total?",
      "answer": 750, "suffix": "mL", "hint": "3 × 250." },
    { "prompt": "🍵 A pot has 1000 mL. 2 cups of 250 mL poured out. Left?",
      "answer": 500, "suffix": "mL", "hint": "1000 − 500." },
    { "prompt": "🥛 Start with 600 mL, pour out 180 mL. How many mL remain?",
      "answer": 420, "suffix": "mL", "hint": "600 − 180." },
    { "prompt": "🥤 A bottle had 450 mL. Add 270 mL. Total mL?",
      "answer": 720, "suffix": "mL", "hint": "450 + 270." },
    { "prompt": "🍶 2 bottles of 500 mL. Combined?",
      "answer": 1000, "suffix": "mL", "hint": "2 × 500." },
    { "prompt": "🥛 A cup holds 240 mL. Raccoon fills 3 cups. Total?",
      "answer": 720, "suffix": "mL", "hint": "3 × 240." },
    { "prompt": "☕ A kettle has 1200 mL. Fill 4 cups of 200 mL each. How many mL are left?",
      "answer": 400, "suffix": "mL", "hint": "1200 − 4 × 200." },
    { "prompt": "🥤 Pour 175 mL + 225 mL into a jug. Total?",
      "answer": 400, "suffix": "mL", "hint": "175 + 225." },
    { "prompt": "🍶 A bowl holds 850 mL of soup. Eat 370 mL. How many mL remain?",
      "answer": 480, "suffix": "mL", "hint": "850 − 370." },
    { "prompt": "🥛 10 glasses × 100 mL each. Total?",
      "answer": 1000, "suffix": "mL", "hint": "10 × 100." },
    { "prompt": "☕ A teapot holds 900 mL. Pour into 3 equal cups. Each cup holds how many mL?",
      "answer": 300, "suffix": "mL", "hint": "900 ÷ 3." },
    { "prompt": "🥤 6 bottles × 350 mL. Total?",
      "answer": 2100, "suffix": "mL", "hint": "6 × 350." }
  ]
});
