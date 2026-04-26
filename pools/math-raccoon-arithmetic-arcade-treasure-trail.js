/*
 * Pool: Treasure Trail (Math Raccoon · Arithmetic · Arcade)
 * =========================================================
 * FORMAT — each question is a JSON object:
 *   {
 *     "a": 54,                // the starting amount (minuend)
 *     "b": 28,                // the amount taken away (subtrahend)
 *     "hint": "optional tip"
 *   }
 * The engine computes answer (a − b) and auto-builds options.
 * IMPORTANT: keep a ≥ b so the answer stays non-negative.
 *
 * Teachers & parents: add more questions freely. 24+ keeps rounds varied.
 */
MR.Pools.register({
  "id": "arith-arcade-treasure-trail",
  "title": "Treasure Trail",
  "op": "-",
  "askedPerRound": 8,
  "questions": [
    { "a": 20, "b": 7,  "hint": "Count back from 20." },
    { "a": 23, "b": 9,  "hint": "Borrow from the tens if ones are too small." },
    { "a": 31, "b": 18, "hint": "Ones: 1 − 8 needs a borrow from the tens." },
    { "a": 34, "b": 19, "hint": "Borrow 10 from the tens — 14 − 9." },
    { "a": 42, "b": 17, "hint": "Ones: 2 − 7, borrow from tens." },
    { "a": 45, "b": 28, "hint": "Borrow to do 15 − 8." },
    { "a": 48, "b": 13, "hint": "No borrow — 48 tens: 4 minus 1." },
    { "a": 52, "b": 19, "hint": "Borrow — 12 − 9 in the ones." },
    { "a": 55, "b": 26, "hint": "15 − 6 in the ones after borrowing." },
    { "a": 58, "b": 23, "hint": "Ones: 8 − 3, tens: 5 − 2." },
    { "a": 61, "b": 27, "hint": "Borrow — 11 − 7 in the ones." },
    { "a": 64, "b": 38, "hint": "Borrow 10: 14 − 8 in the ones." },
    { "a": 67, "b": 19, "hint": "17 − 9 in the ones after borrowing." },
    { "a": 72, "b": 35, "hint": "Borrow — 12 − 5 ones." },
    { "a": 75, "b": 48, "hint": "15 − 8 in the ones after borrow." },
    { "a": 78, "b": 23, "hint": "Ones: 8 − 3, tens: 7 − 2." },
    { "a": 80, "b": 37, "hint": "Borrow twice: 10 − 7 ones, then the tens." },
    { "a": 83, "b": 29, "hint": "Borrow — 13 − 9 ones." },
    { "a": 85, "b": 46, "hint": "Ones: 15 − 6 after borrow." },
    { "a": 87, "b": 19, "hint": "17 − 9 ones after borrow." },
    { "a": 91, "b": 25, "hint": "Borrow — 11 − 5 ones." },
    { "a": 93, "b": 47, "hint": "13 − 7 in the ones." },
    { "a": 95, "b": 38, "hint": "Borrow 10: 15 − 8 ones." },
    { "a": 98, "b": 29, "hint": "18 − 9 ones after borrow." }
  ]
});
