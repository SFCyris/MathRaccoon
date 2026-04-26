/*
 * Pool: Multiply Mountain (Math Raccoon · Arithmetic · Arcade)
 * ============================================================
 * FORMAT — each question is a JSON object:
 *   {
 *     "a": 4,   // first factor
 *     "b": 7,   // second factor
 *     "hint": "optional tip"
 *   }
 * The engine computes a × b and auto-builds options.
 *
 * Teachers & parents: add more questions freely. Aim for factor pairs across
 * the 2–10 tables. Keep at least 24 to make rounds feel fresh.
 */
MR.Pools.register({
  "id": "arith-arcade-multiply-mountain",
  "title": "Multiply Mountain",
  "op": "×",
  "askedPerRound": 8,
  "questions": [
    { "a": 2, "b": 3,  "hint": "Two groups of three — count by 2s twice." },
    { "a": 2, "b": 7,  "hint": "Double 7 is 14." },
    { "a": 3, "b": 4,  "hint": "Skip count by 3: 3, 6, 9, 12." },
    { "a": 3, "b": 6,  "hint": "3 × 6 — half of 6 × 6." },
    { "a": 3, "b": 8,  "hint": "3 × 8 = 24 — three eights." },
    { "a": 4, "b": 5,  "hint": "Four fives — 5, 10, 15, 20." },
    { "a": 4, "b": 7,  "hint": "4 × 7 is the same as 7 × 4." },
    { "a": 4, "b": 9,  "hint": "4 × 9 — think 4 × 10 − 4." },
    { "a": 5, "b": 5,  "hint": "A perfect square — 25." },
    { "a": 5, "b": 6,  "hint": "Five sixes — skip count by 5." },
    { "a": 5, "b": 8,  "hint": "Five eights — 8, 16, 24, 32, 40." },
    { "a": 6, "b": 4,  "hint": "Same as 4 × 6." },
    { "a": 6, "b": 6,  "hint": "Six sixes — 36." },
    { "a": 6, "b": 7,  "hint": "Tough one — 42." },
    { "a": 6, "b": 9,  "hint": "6 × 9 — one less than 6 × 10 (60 − 6)." },
    { "a": 7, "b": 3,  "hint": "Three sevens." },
    { "a": 7, "b": 7,  "hint": "Seven sevens — 49." },
    { "a": 7, "b": 8,  "hint": "7 × 8 = 56 — sneaky but common." },
    { "a": 8, "b": 4,  "hint": "Double double: 8 × 2 × 2." },
    { "a": 8, "b": 6,  "hint": "8 × 6 = 48." },
    { "a": 8, "b": 8,  "hint": "Eight eights — 64." },
    { "a": 9, "b": 3,  "hint": "Nine threes — count by 9s or by 3s." },
    { "a": 9, "b": 5,  "hint": "Five nines — ends in 5." },
    { "a": 9, "b": 9,  "hint": "Nine nines — 81." },
    { "a": 10, "b": 7, "hint": "Ten anything — just add a zero." }
  ]
});
