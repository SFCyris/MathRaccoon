/*
 * Pool: Share Shack (Math Raccoon · Arithmetic · Arcade)
 * ======================================================
 * FORMAT — each question is a JSON object:
 *   {
 *     "a": 24,  // the total (dividend)
 *     "b": 6,   // the number of groups (divisor)
 *     "hint": "optional tip"
 *   }
 * The engine computes a ÷ b and auto-builds options.
 * IMPORTANT: use even-divisible pairs so answers are whole numbers.
 *
 * Teachers & parents: add more fact-family pairs freely (24+ recommended).
 */
MR.Pools.register({
  "id": "arith-arcade-share-shack",
  "title": "Share Shack",
  "op": "÷",
  "askedPerRound": 8,
  "questions": [
    { "a": 6,  "b": 2, "hint": "6 shared into 2 groups = 3 each." },
    { "a": 10, "b": 2, "hint": "Half of 10." },
    { "a": 12, "b": 3, "hint": "3 × ? = 12." },
    { "a": 12, "b": 4, "hint": "4 × 3 = 12." },
    { "a": 15, "b": 3, "hint": "3 × 5 = 15." },
    { "a": 15, "b": 5, "hint": "5 × 3 = 15." },
    { "a": 16, "b": 4, "hint": "4 × 4 = 16." },
    { "a": 18, "b": 3, "hint": "3 × 6 = 18." },
    { "a": 18, "b": 6, "hint": "6 × 3 = 18." },
    { "a": 20, "b": 4, "hint": "4 × 5 = 20." },
    { "a": 20, "b": 5, "hint": "5 × 4 = 20." },
    { "a": 24, "b": 4, "hint": "4 × 6 = 24." },
    { "a": 24, "b": 6, "hint": "6 × 4 = 24." },
    { "a": 24, "b": 8, "hint": "8 × 3 = 24." },
    { "a": 28, "b": 4, "hint": "4 × 7 = 28." },
    { "a": 30, "b": 5, "hint": "5 × 6 = 30." },
    { "a": 30, "b": 6, "hint": "6 × 5 = 30." },
    { "a": 32, "b": 8, "hint": "8 × 4 = 32." },
    { "a": 35, "b": 5, "hint": "5 × 7 = 35." },
    { "a": 36, "b": 6, "hint": "6 × 6 = 36." },
    { "a": 36, "b": 9, "hint": "9 × 4 = 36." },
    { "a": 42, "b": 7, "hint": "7 × 6 = 42." },
    { "a": 48, "b": 8, "hint": "8 × 6 = 48." },
    { "a": 54, "b": 9, "hint": "9 × 6 = 54." },
    { "a": 63, "b": 9, "hint": "9 × 7 = 63." }
  ]
});
