/*
 * Pool: Ten Times (Arithmetic · Arcade)
 * =====================================
 * Multiply one-digit × multiple of 10 (3.NBT.3).
 * Uses the `arithmetic` engine with op="×".
 */
MR.Pools.register({
  "id": "ari-arcade-ten-times",
  "title": "Ten Times",
  "op": "×",
  "askedPerRound": 6,
  "questions": [
    { "a": 3, "b": 10, "hint": "Any × 10 just adds a zero. 3 → 30." },
    { "a": 7, "b": 10, "hint": "Add a zero to 7." },
    { "a": 12, "b": 10, "hint": "12 with a zero on the end = 120." },
    { "a": 5, "b": 20, "hint": "5 × 2 = 10. Add a zero → 100." },
    { "a": 4, "b": 30, "hint": "4 × 3 = 12. Add zero → 120." },
    { "a": 6, "b": 40, "hint": "6 × 4 = 24 → 240." },
    { "a": 8, "b": 50, "hint": "8 × 5 = 40 → 400." },
    { "a": 7, "b": 60, "hint": "7 × 6 = 42 → 420." },
    { "a": 3, "b": 70, "hint": "3 × 7 = 21 → 210." },
    { "a": 9, "b": 80, "hint": "9 × 8 = 72 → 720." },
    { "a": 4, "b": 90, "hint": "4 × 9 = 36 → 360." },
    { "a": 2, "b": 50, "hint": "2 × 5 = 10 → 100." },
    { "a": 6, "b": 20, "hint": "6 × 2 = 12 → 120." },
    { "a": 5, "b": 70, "hint": "5 × 7 = 35 → 350." },
    { "a": 8, "b": 10, "hint": "Add a zero to 8 → 80." },
    { "a": 9, "b": 10, "hint": "9 with a zero → 90." },
    { "a": 2, "b": 30, "hint": "2 × 3 = 6, add a zero → 60." },
    { "a": 7, "b": 40, "hint": "7 × 4 = 28, then tens → 280." },
    { "a": 5, "b": 50, "hint": "5 × 5 = 25 → 250." },
    { "a": 9, "b": 30, "hint": "9 × 3 = 27 → 270." },
    { "a": 3, "b": 40, "hint": "3 × 4 = 12 → 120." },
    { "a": 6, "b": 60, "hint": "6 × 6 = 36 → 360." },
    { "a": 4, "b": 80, "hint": "4 × 8 = 32 → 320." },
    { "a": 8, "b": 70, "hint": "8 × 7 = 56 → 560." },
    { "a": 2, "b": 90, "hint": "2 × 9 = 18 → 180." },
    { "a": 11, "b": 10, "hint": "11 with a zero → 110." },
    { "a": 15, "b": 10, "hint": "15 with a zero → 150." },
    { "a": 3, "b": 50, "hint": "3 × 5 = 15 → 150." },
    { "a": 4, "b": 20, "hint": "4 × 2 = 8 → 80." },
    { "a": 7, "b": 20, "hint": "7 × 2 = 14 → 140." },
    { "a": 9, "b": 60, "hint": "9 × 6 = 54 → 540." },
    { "a": 6, "b": 90, "hint": "6 × 9 = 54 → 540." },
    { "a": 5, "b": 30, "hint": "5 × 3 = 15 → 150." },
  ],
});
