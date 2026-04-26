/*
 * Pool: Hour Hop (Math Raccoon · Measurement · Arcade)
 * ====================================================
 * Elapsed time — hours between start and end (CCSS 3.MD.1).
 *
 * FORMAT — each question is a JSON object.
 *
 * A) Numeric-answer (most common):
 *   {
 *     "prompt":  "Story text (HTML allowed).",
 *     "answer":  4,             // the numeric answer
 *     "options": [3, 4, 5],     // optional
 *     "suffix":  "h",           // usually "h" for hours or "min" for minutes
 *     "hint":    "End − start."
 *   }
 *
 * B) Pick-a-time (multiple-choice with explicit string options — useful when
 *    the answer is a time like "4:45" or a phrase like "1 hour 30 min"):
 *   {
 *     "prompt":  "⏰ A 30-minute walk starts at 2:45. When does it end?",
 *     "options": ["3:00", "3:15", "3:30"],
 *     "answer":  "3:15",
 *     "hint":    "Bridge up to 3:00 (15 min), then hop 15 more."
 *   }
 *
 * Teachers & parents: add more elapsed-time stories freely. When describing
 * analog clocks in the prompt, mention which NUMBER each hand points to
 * (short = hour, long = minutes × 5). Digital clocks can be written directly
 * as "the digital clock reads 7:45".
 */
MR.Pools.register({
  "id": "mea-arcade-hour-hop",
  "title": "Hour Hop",
  "askedPerRound": 6,
  "questions": [
    { "prompt": "⏰ Picnic starts at 2:00 and ends at 5:00. How many hours?", "answer": 3, "suffix": "h", "hint": "5 − 2 = 3." },
    { "prompt": "⏰ Fox naps from 1:00 to 4:00. How many hours?", "answer": 3, "suffix": "h", "hint": "3 hours of snoozing." },
    { "prompt": "⏰ Library open 9:00 – 2:00. How many hours?", "answer": 5, "suffix": "h", "hint": "9 to 2 = 5 hours." },
    { "prompt": "⏰ Race starts at 7:00 and ends at 11:00. How many hours?", "answer": 4, "suffix": "h", "hint": "11 − 7 = 4." },
    { "prompt": "⏰ Hike leaves at 8:00 and gets back at 3:00. Hours hiked?", "answer": 7, "suffix": "h", "hint": "Count 8 → 9 → 10 → 11 → 12 → 1 → 2 → 3." },
    { "prompt": "⏰ Shop opens at 10:00 and closes at 6:00. Hours open?", "answer": 8, "suffix": "h", "hint": "10 to 6 = 8 hours." },
    { "prompt": "⏰ Movie runs 1:00 to 3:00. How many hours long?", "answer": 2, "suffix": "h", "hint": "3 − 1." },
    { "prompt": "⏰ Concert: 6:00 to 9:00 p.m. Hours?", "answer": 3, "suffix": "h", "hint": "9 − 6 = 3." },
    { "prompt": "⏰ Class: 9:00 to 12:00. How many hours?", "answer": 3, "suffix": "h", "hint": "12 − 9 = 3." },
    { "prompt": "⏰ Play starts at 4:00 and lasts 2 hours. Ends at ___ o'clock?", "answer": 6, "suffix": "h", "hint": "4 + 2 = 6." },
    { "prompt": "⏰ Flight leaves at 8:00 and lasts 5 hours. Arrives at ___?", "answer": 13, "suffix": "h (on 24-h clock)", "hint": "8 + 5 = 13 (= 1 p.m.)." },
    { "prompt": "⏰ Raccoon slept 9 hours and woke up at 7:00. She fell asleep at ___? (hour)", "answer": 22, "suffix": "h (on 24-h clock)", "hint": "7 − 9 = −2 → 22 (10 p.m.)." },
    { "prompt": "⏰ Bus leaves 11:15 and arrives 11:45. Minutes elapsed?", "answer": 30, "suffix": "min", "hint": "45 − 15 = 30 min." },
    { "prompt": "⏰ Recess 10:20 to 10:40. Minutes long?", "answer": 20, "suffix": "min", "hint": "40 − 20." },
    { "prompt": "⏰ Lesson from 2:00 to 2:50. Minutes long?", "answer": 50, "suffix": "min", "hint": "50 − 0." },
    { "prompt": "⏰ Owl hunts 11 p.m. to 3 a.m. How many hours?", "answer": 4, "suffix": "h", "hint": "11 → 12 → 1 → 2 → 3." },
    { "prompt": "⏰ Zoo open 8:00 to 6:00 p.m. Total open hours?", "answer": 10, "suffix": "h", "hint": "8 → 12 = 4, 12 → 6 = 6, sum 10." },
    { "prompt": "⏰ A 2-hour nap started at 12:30. Ends at ___ (hour of end time)?", "answer": 2, "suffix": "h", "hint": "12:30 + 2h = 2:30." },

    // ---- Analog-clock reading → elapsed time (CCSS 3.MD.1) ----
    { "prompt": "🕰️ Start clock: short hand on 2, long hand on 12. End clock: short hand on 5, long hand on 12. How many hours between them?",
      "answer": 3, "suffix": "h",
      "hint": "That's 2:00 and 5:00. Hop whole hours: 2→3→4→5." },
    { "prompt": "🕰️ The start clock's short hand is on 9 and long hand on 6 (= 9:30). The end clock's short hand is on 11 and long hand on 12 (= 11:00). Minutes elapsed?",
      "answer": 90, "suffix": "min",
      "hint": "9:30 → 10:00 is 30 min. Then 10:00 → 11:00 is 60 min. 30 + 60 = 90." },
    { "prompt": "🕰️ An analog clock shows the short hand between 3 and 4, long hand on 3 (= 3:15). Another shows short hand on 4, long hand on 6 (= 4:30). Minutes between them?",
      "answer": 75, "suffix": "min",
      "hint": "3:15 → 4:00 is 45 min. 4:00 → 4:30 is 30 min. 45 + 30 = 75." },
    { "prompt": "🕰️ Start: long hand on 12, short hand on 7 (= 7:00). End: long hand on 9, short hand just past 7 (= 7:45). Minutes?",
      "answer": 45, "suffix": "min",
      "hint": "Long hand on 9 means 9 × 5 = 45 minutes past the hour." },

    // ---- Digital-clock readouts → elapsed time ----
    { "prompt": "🔢 The digital clock reads 6:50. A moment later it reads 7:20. How many minutes have passed?",
      "answer": 30, "suffix": "min",
      "hint": "Bridge up: 6:50 → 7:00 is 10. Then 7:00 → 7:20 is 20. Total 30." },
    { "prompt": "🔢 Digital clock shows 1:15 at start, 3:45 at end. How many minutes total?",
      "answer": 150, "suffix": "min",
      "hint": "45 + 60 + 45 = 150 min (= 2 h 30 m)." },
    { "prompt": "🔢 At 11:40 a.m. the digital clock ticks up until 12:10 p.m. Minutes elapsed?",
      "answer": 30, "suffix": "min",
      "hint": "20 min to noon, then 10 past. 20 + 10 = 30." },
    { "prompt": "🔢 Digital clock reads 4:25 when Raccoon starts homework, 5:10 when she finishes. Minutes spent?",
      "answer": 45, "suffix": "min",
      "hint": "4:25 → 5:00 is 35 min. 5:00 → 5:10 is 10 min. 35 + 10 = 45." },

    // ---- Bridging across the hour (quarter + half hour) ----
    { "prompt": "⏰ Reading starts at 2:45 and ends at 4:15. Minutes spent?",
      "answer": 90, "suffix": "min",
      "hint": "15 + 60 + 15 = 90 min." },
    { "prompt": "⏰ Meeting from 9:50 to 10:35. Minutes?",
      "answer": 45, "suffix": "min",
      "hint": "10 min to 10:00, then 35 more. 10 + 35 = 45." },
    { "prompt": "⏰ Snack time 3:55 to 4:20. Minutes?",
      "answer": 25, "suffix": "min",
      "hint": "5 min to 4:00, then 20. 5 + 20 = 25." },

    // ---- Picking the end time (string answers) ----
    { "prompt": "⏰ A 30-minute walk starts at 2:45. When does it end?",
      "options": ["3:00", "3:15", "3:30"],
      "answer":  "3:15",
      "hint":    "Bridge up 15 min to 3:00, then 15 more." },
    { "prompt": "⏰ Raccoon's bath takes 20 minutes. She starts at 7:55. When does it end?",
      "options": ["8:05", "8:15", "8:25"],
      "answer":  "8:15",
      "hint":    "5 min to 8:00, then 15 more past 8:00." },
    { "prompt": "⏰ Piano lesson lasts 45 minutes and starts at 4:30. When does it end?",
      "options": ["5:00", "5:15", "5:30"],
      "answer":  "5:15",
      "hint":    "30 min to 5:00, then 15 more." },
    { "prompt": "⏰ A 1-hour 15-minute show starts at 6:50. What time does it end?",
      "options": ["7:50", "8:00", "8:05"],
      "answer":  "8:05",
      "hint":    "6:50 + 1 h = 7:50. Then + 15 min = 8:05." },

    // ---- Working backwards — when did it start? ----
    { "prompt": "⏰ A 45-minute chores block ended at 10:15. When did it start?",
      "options": ["9:15", "9:30", "9:45"],
      "answer":  "9:30",
      "hint":    "Hop backwards: 10:15 − 15 min = 10:00; − 30 min = 9:30." },
    { "prompt": "⏰ Baking lasted 1 hour 30 minutes and the timer beeped at 4:20. When did baking begin?",
      "options": ["2:30", "2:50", "3:00"],
      "answer":  "2:50",
      "hint":    "4:20 − 30 min = 3:50; − 1 h = 2:50." },

    // ---- Analog ↔ Digital matching ----
    { "prompt": "🕰️ An analog clock has the short hand just past 4 and the long hand on 9. What does the digital clock show?",
      "options": ["4:09", "4:45", "9:20"],
      "answer":  "4:45",
      "hint":    "Long hand on 9 means 9 × 5 = 45 minutes." },
    { "prompt": "🕰️ Short hand between 6 and 7, long hand on 6. Which digital readout matches?",
      "options": ["6:06", "6:30", "7:30"],
      "answer":  "6:30",
      "hint":    "Long hand on 6 = 30 minutes past 6." },
    { "prompt": "🔢 A digital clock reads 8:15. Which analog description matches?",
      "options": ["Short hand on 8, long hand on 12", "Short hand just past 8, long hand on 3", "Short hand on 3, long hand on 8"],
      "answer":  "Short hand just past 8, long hand on 3",
      "hint":    "15 minutes = long hand on the 3 (3 × 5)." }
  ]
});
