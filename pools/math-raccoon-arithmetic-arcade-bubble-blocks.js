/*
 * Pool: Bubble Blocks (Math Raccoon · Arithmetic · Arcade)
 * ========================================================
 * One round asks 8 questions, drawn at random from the list below (no
 * duplicates). Missed questions can be revisited at the end of the round.
 *
 * FORMAT — each question is a JSON object:
 *   {
 *     "a": 34,                // first addend (number)
 *     "b": 28,                // second addend (number)
 *     "hint": "optional — the tip Math Raccoon whispers"
 *   }
 * The engine computes the answer (a + b) and auto-builds the multiple-choice
 * options. The big "a + b = ?" equation and place-value blocks are rendered
 * automatically — you only author the numbers.
 *
 * Teachers & parents: you can safely add more questions to the array below.
 * Keep at least 3× askedPerRound (so 24+ for 8 per round) to keep rounds
 * varied. Save the file, reload the page, and the new questions are live.
 */
MR.Pools.register({
  "id": "arith-arcade-bubble-blocks",
  "title": "Bubble Blocks",
  "op": "+",
  "askedPerRound": 8,
  "questions": [
    { "a": 12, "b": 7,  "hint": "Count up from 12." },
    { "a": 15, "b": 14, "hint": "Add the tens, then the ones." },
    { "a": 23, "b": 18, "hint": "Watch for regrouping — 3 + 8 is more than 9." },
    { "a": 27, "b": 26, "hint": "Ones: 7 + 6 = 13 (carry the 1)." },
    { "a": 34, "b": 28, "hint": "Carry the ten when ones sum > 9." },
    { "a": 36, "b": 47, "hint": "Ones first: 6 + 7 = 13." },
    { "a": 42, "b": 31, "hint": "Tens: 4 + 3, ones: 2 + 1." },
    { "a": 45, "b": 29, "hint": "Ones: 5 + 9 = 14 — carry the 1." },
    { "a": 48, "b": 33, "hint": "Don't forget the ten you carried." },
    { "a": 52, "b": 19, "hint": "Ones: 2 + 9 = 11." },
    { "a": 54, "b": 18, "hint": "Carry 1 to the tens." },
    { "a": 56, "b": 27, "hint": "Ones: 6 + 7 = 13." },
    { "a": 59, "b": 22, "hint": "Ones: 9 + 2 = 11." },
    { "a": 61, "b": 25, "hint": "No regrouping needed here." },
    { "a": 63, "b": 19, "hint": "Ones: 3 + 9 = 12." },
    { "a": 65, "b": 27, "hint": "Carry the ten from 5 + 7." },
    { "a": 67, "b": 24, "hint": "Ones first: 7 + 4 = 11." },
    { "a": 71, "b": 18, "hint": "Ones: 1 + 8 = 9, no carry." },
    { "a": 73, "b": 19, "hint": "Ones: 3 + 9 = 12." },
    { "a": 74, "b": 25, "hint": "Ones: 4 + 5 = 9." },
    { "a": 77, "b": 16, "hint": "Ones: 7 + 6 = 13 — carry!" },
    { "a": 82, "b": 13, "hint": "Tens + tens, ones + ones." },
    { "a": 84, "b": 17, "hint": "Ones: 4 + 7 = 11." },
    { "a": 89, "b": 21, "hint": "Ones: 9 + 1 = 10 — carry." },
    { "a": 91, "b": 22, "hint": "Tens only: 9 + 2." }
  ]
});
