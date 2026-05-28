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
    { "prompt": "⏰ How many minutes are in half an hour?", "answer": 30, "suffix": "min", "hint": "Half of an hour is half of 60 minutes." },
    { "prompt": "⏰ How many minutes are in a quarter hour?", "answer": 15, "suffix": "min", "hint": "A quarter is one of four equal parts of 60." },
    { "prompt": "🕐 The minute hand points to 6. How many minutes past the hour?",
      "viz": { "type": "clock", "params": { "hour": 12, "minute": 30 } },
      "answer": 30, "suffix": "min", "hint": "Each number on the clock is 5 minutes. Skip-count by 5s to the 6." },
    { "prompt": "🕐 The minute hand points to 3. How many minutes past the hour?",
      "viz": { "type": "clock", "params": { "hour": 12, "minute": 15 } },
      "answer": 15, "suffix": "min", "hint": "Each number on the clock is 5 minutes. Skip-count by 5s to the 3." },
    { "prompt": "🕐 The minute hand points to 9. How many minutes past?",
      "viz": { "type": "clock", "params": { "hour": 12, "minute": 45 } },
      "answer": 45, "suffix": "min", "hint": "Each number on the clock is 5 minutes. Skip-count by 5s to the 9." },
    { "prompt": "🕐 The minute hand points to 12. How many minutes past?",
      "viz": { "type": "clock", "params": { "hour": 12, "minute": 0 } },
      "answer": 0, "suffix": "min", "hint": "The minute hand is on the 12. It's exactly on the hour." },
    { "prompt": "🕑 Raccoon reads from 2:00 to 2:20. How many minutes did she read?", "answer": 20, "suffix": "min", "hint": "The hour did not change. Look at the minutes only." },
    { "prompt": "🕐 Class starts at 1:00 and ends at 1:35. How long is class?", "answer": 35, "suffix": "min", "hint": "The hour did not change. Look at the minutes only." },
    { "prompt": "🕒 Story time is from 3:00 to 3:45. How many minutes?", "answer": 45, "suffix": "min", "hint": "The hour did not change. Look at the minutes only." },
    { "prompt": "⏰ The hour hand points to 4 and the minute hand to 12. What time is it? (in whole hours — answer in hours.)",
      "viz": { "type": "clock", "params": { "hour": 4, "minute": 0 } },
      "answer": 4, "suffix": "h", "hint": "Minute hand on 12 means the hour hand points to the exact hour." },
    { "prompt": "⏰ The hour hand points to 8 and the minute hand to 12. In whole hours, what hour is it?",
      "viz": { "type": "clock", "params": { "hour": 8, "minute": 0 } },
      "answer": 8, "suffix": "h", "hint": "Minute hand on 12 means just read the hour hand." },
    { "prompt": "🕘 Owl hoots at 9:15. How many minutes past 9 is that?",
      "viz": { "type": "clock", "params": { "hour": 9, "minute": 15 } },
      "answer": 15, "suffix": "min", "hint": "The minutes part of the time tells you minutes past the hour." },
    { "prompt": "🕛 The minute hand travels from 12 to 6. How many minutes?",
      "viz": { "type": "clock", "params": { "hour": 12, "minute": 30 } },
      "answer": 30, "suffix": "min", "hint": "From 12 to 6 is halfway around. Find half of 60." },
    { "prompt": "🕕 Minute hand on 4. How many minutes past the hour?",
      "viz": { "type": "clock", "params": { "hour": 12, "minute": 20 } },
      "answer": 20, "suffix": "min", "hint": "Each number on the clock is 5 minutes. Skip-count by 5s to the 4." },
    { "prompt": "🕓 Minute hand on 7. How many minutes past?",
      "viz": { "type": "clock", "params": { "hour": 12, "minute": 35 } },
      "answer": 35, "suffix": "min", "hint": "Each number on the clock is 5 minutes. Skip-count by 5s to the 7." },
    { "prompt": "🕙 Bedtime starts at 10:00 and ends at 10:45. How many minutes?", "answer": 45, "suffix": "min", "hint": "The hour did not change. Look at the minutes only." },
    { "prompt": "🕑 Snacktime is 10 minutes long, starting at 2:00. Ends at 2:__?", "answer": 10, "suffix": "min", "hint": "Add the snack length to the start minutes." },

    // ---- Reverse: given a time in digits, where do the hands point? ----
    { "prompt": "🔍 Reverse: at 4:30, where does the LONG hand point?",
      "options": [3, 6, 12], "answer": 6,
      "hint": "Half past means the long hand points down to the 6." },
    { "prompt": "🔍 Reverse: at 8:15, where does the long hand point?",
      "options": [3, 6, 9], "answer": 3,
      "hint": "Each number on the clock is 5 minutes. Which number is 15 minutes past 12?" },
    { "prompt": "🔍 Reverse: at 11:00 exactly, where does the long hand point?",
      "options": [3, 6, 12], "answer": 12,
      "hint": "On the hour means the long hand is at the top of the clock." },
    { "prompt": "🔍 Detective: the long hand is on 9 and the short hand is JUST PAST 6. What time is it?",
      "options": ["6:45", "9:30", "7:45"], "answer": "6:45",
      "hint": "Read the long hand for the minutes. Read the short hand for the hour." },
    { "prompt": "🔍 Detective: a teacher says it's 'quarter past 5'. What does the long hand point to?",
      "options": [3, 6, 9], "answer": 3,
      "hint": "A quarter past means 15 minutes past the hour. Each number is 5 minutes." }
  ]
});
