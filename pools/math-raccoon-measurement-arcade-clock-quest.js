/*
 * Pool: Clock Quest (Math Raccoon · Measurement · Arcade)
 * =======================================================
 * Telling time — minutes and hours (CCSS 3.MD.1).
 *
 * FORMAT — each question is a JSON object:
 *   {
 *     "prompt":  "Story text (HTML allowed).",
 *     "answer":  30,                  // the numeric answer
 *     "options": [15, 30, 45, 60],    // optional — engine auto-builds
 *     "suffix":  "min",               // "min" or "h" or "" etc.
 *     "hint":    "There are 60 minutes in an hour."
 *   }
 *
 * Teachers & parents: add more time-reading questions freely.
 */
MR.Pools.register({
  "id": "mea-arcade-clock-quest",
  "title": "Clock Quest",
  "askedPerRound": 6,
  "questions": [
    { "prompt": "⏰ How many minutes are in one hour?", "answer": 60, "suffix": "min", "hint": "A full lap of the minute hand." },
    { "prompt": "⏰ How many minutes are in half an hour?", "answer": 30, "suffix": "min", "hint": "Half of 60." },
    { "prompt": "⏰ How many minutes are in a quarter hour?", "answer": 15, "suffix": "min", "hint": "60 ÷ 4 = 15." },
    { "prompt": "🕐 The minute hand points to 6. How many minutes past the hour?", "answer": 30, "suffix": "min", "hint": "6 × 5 = 30." },
    { "prompt": "🕐 The minute hand points to 3. How many minutes past the hour?", "answer": 15, "suffix": "min", "hint": "3 × 5 = 15." },
    { "prompt": "🕐 The minute hand points to 9. How many minutes past?", "answer": 45, "suffix": "min", "hint": "9 × 5 = 45." },
    { "prompt": "🕐 The minute hand points to 12. How many minutes past?", "answer": 0, "suffix": "min", "hint": "It's exactly on the hour." },
    { "prompt": "🕑 Raccoon reads from 2:00 to 2:20. How many minutes did she read?", "answer": 20, "suffix": "min", "hint": "20 − 0 = 20." },
    { "prompt": "🕐 Class starts at 1:00 and ends at 1:35. How long is class?", "answer": 35, "suffix": "min", "hint": "35 minutes exactly." },
    { "prompt": "🕒 Story time is from 3:00 to 3:45. How many minutes?", "answer": 45, "suffix": "min", "hint": "45 minutes total." },
    { "prompt": "⏰ The hour hand points to 4 and the minute hand to 12. What time is it? (in whole hours — answer in hours.)", "answer": 4, "suffix": "h", "hint": "Minute on 12 = the hour exactly." },
    { "prompt": "⏰ The hour hand points to 8 and the minute hand to 12. In whole hours, what hour is it?", "answer": 8, "suffix": "h", "hint": "On the hour — minute hand on 12." },
    { "prompt": "🕘 Owl hoots at 9:15. How many minutes past 9 is that?", "answer": 15, "suffix": "min", "hint": "The minute hand is on 3 → 15." },
    { "prompt": "🕛 The minute hand travels from 12 to 6. How many minutes?", "answer": 30, "suffix": "min", "hint": "Half a rotation = 30 min." },
    { "prompt": "🕕 Minute hand on 4. How many minutes past the hour?", "answer": 20, "suffix": "min", "hint": "4 × 5." },
    { "prompt": "🕓 Minute hand on 7. How many minutes past?", "answer": 35, "suffix": "min", "hint": "7 × 5 = 35." },
    { "prompt": "🕙 Bedtime starts at 10:00 and ends at 10:45. How many minutes?", "answer": 45, "suffix": "min", "hint": "45 minutes." },
    { "prompt": "🕑 Snacktime is 10 minutes long, starting at 2:00. Ends at 2:__?", "answer": 10, "suffix": "min", "hint": "2:00 + 10 min = 2:10." }
  ]
});
