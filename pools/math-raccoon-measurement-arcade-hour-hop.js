/*
 * Pool: Hour Hop (Math Raccoon · Measurement · Arcade)
 * ====================================================
 * Elapsed time — hours/minutes between start and end (CCSS 3.MD.1).
 *
 * VIZ STRATEGY:
 *   - "X to Y, how long?"           → clockPair { start, end }
 *                                       (kid reads both clocks, counts hops)
 *   - "Starts at X, lasts Y, ends?" → clock { start }
 *                                       (start clock; kid hops forward)
 *   - "Ends at X, lasted Y, start?" → clock { end }
 *                                       (end clock; kid hops back)
 *   - Digital problems              → digitalClock or clockPair mode="digital"
 *   - Analog↔digital matching       → show the GIVEN clock (whichever was named)
 *                                       — the kid picks the matching format
 *   - Pure conversion / scheduling  → no viz (textual)
 */
MR.Pools.register({
  "id": "mea-arcade-hour-hop",
  "title": "Hour Hop",
  "askedPerRound": 6,
  "questions": [
    // ---- Whole-hour elapsed (X o'clock → Y o'clock) ----
    { "prompt": "⏰ Picnic starts at 2:00 and ends at 5:00. How many hours?",
      "viz": { "type": "clockPair", "params": { "start": { "hour": 2, "minute": 0 }, "end": { "hour": 5, "minute": 0 } } },
      "answer": 3, "suffix": "h", "hint": "Look at both clocks. Hop hour-by-hour from start to end." },
    { "prompt": "⏰ Fox naps from 1:00 to 4:00. How many hours?",
      "viz": { "type": "clockPair", "params": { "start": { "hour": 1, "minute": 0 }, "end": { "hour": 4, "minute": 0 } } },
      "answer": 3, "suffix": "h", "hint": "Look at both clocks. Hop hour-by-hour from start to end." },
    { "prompt": "⏰ Library open 9:00 – 2:00. How many hours?",
      "viz": { "type": "clockPair", "params": { "start": { "hour": 9, "minute": 0 }, "end": { "hour": 2, "minute": 0 } } },
      "answer": 5, "suffix": "h", "hint": "Hop hour-by-hour: 9, 10, 11, 12, 1, 2. Count the hops." },
    { "prompt": "⏰ Race starts at 7:00 and ends at 11:00. How many hours?",
      "viz": { "type": "clockPair", "params": { "start": { "hour": 7, "minute": 0 }, "end": { "hour": 11, "minute": 0 } } },
      "answer": 4, "suffix": "h", "hint": "Look at both clocks. Hop hour-by-hour from start to end." },
    { "prompt": "⏰ Hike leaves at 8:00 a.m. and gets back at 3:00 p.m. Hours hiked?",
      "viz": { "type": "clockPair", "params": { "start": { "hour": 8, "minute": 0 }, "end": { "hour": 3, "minute": 0 }, "startLabel": "8 a.m.", "endLabel": "3 p.m." } },
      "answer": 7, "suffix": "h", "hint": "Hop hour-by-hour past 12: 8, 9, 10, 11, 12, 1, 2, 3. Count the hops." },
    { "prompt": "⏰ Shop opens at 10:00 and closes at 6:00. Hours open?",
      "viz": { "type": "clockPair", "params": { "start": { "hour": 10, "minute": 0 }, "end": { "hour": 6, "minute": 0 } } },
      "answer": 8, "suffix": "h", "hint": "Hop hour-by-hour past 12: 10, 11, 12, 1, 2, 3, 4, 5, 6. Count the hops." },
    { "prompt": "⏰ Movie runs 1:00 to 3:00. How many hours long?",
      "viz": { "type": "clockPair", "params": { "start": { "hour": 1, "minute": 0 }, "end": { "hour": 3, "minute": 0 } } },
      "answer": 2, "suffix": "h", "hint": "Look at both clocks. Hop hour-by-hour from start to end." },
    { "prompt": "⏰ Concert from 6:00 to 9:00 p.m. How many hours?",
      "viz": { "type": "clockPair", "params": { "start": { "hour": 6, "minute": 0 }, "end": { "hour": 9, "minute": 0 } } },
      "answer": 3, "suffix": "h", "hint": "Look at both clocks. Hop hour-by-hour from start to end." },
    { "prompt": "⏰ Class from 9:00 to 12:00. How many hours?",
      "viz": { "type": "clockPair", "params": { "start": { "hour": 9, "minute": 0 }, "end": { "hour": 12, "minute": 0 } } },
      "answer": 3, "suffix": "h", "hint": "Look at both clocks. Hop hour-by-hour from start to end." },

    // ---- Forward duration (start clock shown; kid hops forward) ----
    { "prompt": "⏰ Play starts at 4:00 and lasts 2 hours. What hour does it end?",
      "viz": { "type": "clock", "params": { "hour": 4, "minute": 0, "label": "Start: 4:00" } },
      "answer": 6, "suffix": "h", "hint": "Look at the start clock. Move the hour hand forward by the duration." },
    { "prompt": "⏰ Picnic lasts 4 hours and starts at 11 a.m. What hour does it end?",
      "viz": { "type": "clock", "params": { "hour": 11, "minute": 0, "label": "Start: 11 a.m." } },
      "answer": 3, "suffix": "p.m.", "hint": "Look at the start clock. Hop forward 4 hours, passing 12." },

    // ---- Backward duration (end clock shown; kid hops back) ----
    { "prompt": "⏰ A movie ended at 9 p.m. and lasted 2 hours. What hour did it start?",
      "viz": { "type": "clock", "params": { "hour": 9, "minute": 0, "label": "End: 9 p.m." } },
      "answer": 7, "suffix": "p.m.", "hint": "Look at the end clock. Move the hour hand backward by the duration." },

    // ---- Minutes elapsed (within an hour) ----
    { "prompt": "⏰ Bus leaves 11:15 and arrives 11:45. Minutes elapsed?",
      "viz": { "type": "clockPair", "params": { "start": { "hour": 11, "minute": 15 }, "end": { "hour": 11, "minute": 45 } } },
      "answer": 30, "suffix": "min", "hint": "The hour did not change. Find the gap between the two minute amounts." },
    { "prompt": "⏰ Recess 10:20 to 10:40. How many minutes?",
      "viz": { "type": "clockPair", "params": { "start": { "hour": 10, "minute": 20 }, "end": { "hour": 10, "minute": 40 } } },
      "answer": 20, "suffix": "min", "hint": "The hour did not change. Find the gap between the two minute amounts." },
    { "prompt": "⏰ Lesson from 2:00 to 2:50. How many minutes?",
      "viz": { "type": "clockPair", "params": { "start": { "hour": 2, "minute": 0 }, "end": { "hour": 2, "minute": 50 } } },
      "answer": 50, "suffix": "min", "hint": "The hour did not change. Look at the end minute." },

    // ---- Cross-midnight / across-noon ----
    { "prompt": "⏰ Owl hunts 11 p.m. to 3 a.m. How many hours?",
      "viz": { "type": "clockPair", "params": { "start": { "hour": 11, "minute": 0 }, "end": { "hour": 3, "minute": 0 }, "startLabel": "11 p.m.", "endLabel": "3 a.m." } },
      "answer": 4, "suffix": "h", "hint": "Hop hour-by-hour past 12: 11, 12, 1, 2, 3. Count the hops." },
    { "prompt": "⏰ Zoo open 8:00 a.m. to 6:00 p.m. Total open hours?",
      "viz": { "type": "clockPair", "params": { "start": { "hour": 8, "minute": 0 }, "end": { "hour": 6, "minute": 0 }, "startLabel": "8 a.m.", "endLabel": "6 p.m." } },
      "answer": 10, "suffix": "h", "hint": "First count hours from 8 a.m. to 12. Then count from 12 to 6 p.m. Add them." },
    { "prompt": "⏰ A 2-hour nap started at 12:30. What's the hour shown on the end-time clock?",
      "viz": { "type": "clock", "params": { "hour": 12, "minute": 30, "label": "Start: 12:30" } },
      "answer": 2, "suffix": "h", "hint": "Look at the start clock. Move the hour hand forward by the nap length." },

    // ---- Analog elapsed (clockPair tells the story) ----
    { "prompt": "🕰️ How many hours from the start clock to the end clock?",
      "viz": { "type": "clockPair", "params": { "start": { "hour": 2, "minute": 0 }, "end": { "hour": 5, "minute": 0 } } },
      "answer": 3, "suffix": "h",
      "hint": "Look at both clocks. Hop hour-by-hour from start to end." },
    { "prompt": "🕰️ Start time and end time shown below. How many minutes elapsed?",
      "viz": { "type": "clockPair", "params": { "start": { "hour": 9, "minute": 30 }, "end": { "hour": 11, "minute": 0 } } },
      "answer": 90, "suffix": "min",
      "hint": "First bridge up to the next hour. Then count full hours in minutes." },
    { "prompt": "🕰️ How many minutes from start to end?",
      "viz": { "type": "clockPair", "params": { "start": { "hour": 3, "minute": 15 }, "end": { "hour": 4, "minute": 30 } } },
      "answer": 75, "suffix": "min",
      "hint": "First bridge up to the next hour. Then count the rest in minutes." },
    { "prompt": "🕰️ How many minutes elapsed between start and end?",
      "viz": { "type": "clockPair", "params": { "start": { "hour": 7, "minute": 0 }, "end": { "hour": 7, "minute": 45 } } },
      "answer": 45, "suffix": "min",
      "hint": "Each number on the clock is 5 minutes. Skip-count by 5s along the long hand's path." },

    // ---- Digital elapsed (digital clock pair) ----
    { "prompt": "🔢 The digital clock reads 6:50, then 7:20. How many minutes passed?",
      "viz": { "type": "clockPair", "params": { "mode": "digital", "start": { "hour": 6, "minute": 50 }, "end": { "hour": 7, "minute": 20 } } },
      "answer": 30, "suffix": "min",
      "hint": "First bridge up to 7:00. Then count the rest of the minutes." },
    { "prompt": "🔢 Start: 1:15. End: 3:45. How many minutes total?",
      "viz": { "type": "clockPair", "params": { "mode": "digital", "start": { "hour": 1, "minute": 15 }, "end": { "hour": 3, "minute": 45 } } },
      "answer": 150, "suffix": "min",
      "hint": "Bridge to the next hour. Add full hours in minutes. Add the last leftover minutes." },
    { "prompt": "🔢 From 11:40 a.m. to 12:10 p.m. — how many minutes elapsed?",
      "viz": { "type": "clockPair", "params": { "mode": "digital", "start": { "hour": 11, "minute": 40 }, "end": { "hour": 12, "minute": 10 }, "startLabel": "11:40 a.m.", "endLabel": "12:10 p.m." } },
      "answer": 30, "suffix": "min",
      "hint": "First count minutes up to 12:00. Then count minutes past 12:00." },
    { "prompt": "🔢 Raccoon starts homework at 4:25 and finishes at 5:10. How many minutes spent?",
      "viz": { "type": "clockPair", "params": { "mode": "digital", "start": { "hour": 4, "minute": 25 }, "end": { "hour": 5, "minute": 10 } } },
      "answer": 45, "suffix": "min",
      "hint": "First bridge up to 5:00. Then count the rest of the minutes." },

    // ---- Bridging across the hour ----
    { "prompt": "⏰ Reading starts at 2:45 and ends at 4:15. How many minutes?",
      "viz": { "type": "clockPair", "params": { "start": { "hour": 2, "minute": 45 }, "end": { "hour": 4, "minute": 15 } } },
      "answer": 90, "suffix": "min", "hint": "Bridge up to 3:00. Count full hours in minutes. Add the last minutes." },
    { "prompt": "⏰ Meeting from 9:50 to 10:35. How many minutes?",
      "viz": { "type": "clockPair", "params": { "start": { "hour": 9, "minute": 50 }, "end": { "hour": 10, "minute": 35 } } },
      "answer": 45, "suffix": "min", "hint": "First bridge up to 10:00. Then count the rest of the minutes." },
    { "prompt": "⏰ Snack time 3:55 to 4:20. How many minutes?",
      "viz": { "type": "clockPair", "params": { "start": { "hour": 3, "minute": 55 }, "end": { "hour": 4, "minute": 20 } } },
      "answer": 25, "suffix": "min", "hint": "First bridge up to 4:00. Then count the rest of the minutes." },

    // ---- Picking the end time (start clock + duration) ----
    { "prompt": "⏰ A 30-minute walk starts at 2:45. When does it end?",
      "viz": { "type": "clock", "params": { "hour": 2, "minute": 45, "label": "Start: 2:45, add 30 min" } },
      "options": ["3:00", "3:15", "3:30"],
      "answer": "3:15",
      "hint": "First bridge up to 3:00. Then add the rest of the minutes." },
    { "prompt": "⏰ Raccoon's bath takes 20 minutes. She starts at 7:55. When does it end?",
      "viz": { "type": "clock", "params": { "hour": 7, "minute": 55, "label": "Start: 7:55, add 20 min" } },
      "options": ["8:05", "8:15", "8:25"],
      "answer": "8:15",
      "hint": "First bridge up to 8:00. Then add the rest of the minutes." },
    { "prompt": "⏰ Piano lesson lasts 45 minutes and starts at 4:30. When does it end?",
      "viz": { "type": "clock", "params": { "hour": 4, "minute": 30, "label": "Start: 4:30, add 45 min" } },
      "options": ["5:00", "5:15", "5:30"],
      "answer": "5:15",
      "hint": "First bridge up to 5:00. Then add the rest of the minutes." },
    { "prompt": "⏰ A 1-hour 15-minute show starts at 6:50. What time does it end?",
      "viz": { "type": "clock", "params": { "hour": 6, "minute": 50, "label": "Start: 6:50, add 1h 15m" } },
      "options": ["7:50", "8:00", "8:05"],
      "answer": "8:05",
      "hint": "First add 1 hour to the start. Then add the extra minutes." },

    // ---- Working backwards (end clock + duration → start) ----
    { "prompt": "⏰ A 45-minute chores block ended at 10:15. When did it start?",
      "viz": { "type": "clock", "params": { "hour": 10, "minute": 15, "label": "End: 10:15, hop back 45 min" } },
      "options": ["9:15", "9:30", "9:45"],
      "answer": "9:30",
      "hint": "First hop back to 10:00. Then hop back the rest of the minutes." },
    { "prompt": "⏰ Baking lasted 1 hour 30 minutes and the timer beeped at 4:20. When did baking begin?",
      "viz": { "type": "clock", "params": { "hour": 4, "minute": 20, "label": "End: 4:20, hop back 1h 30m" } },
      "options": ["2:30", "2:50", "3:00"],
      "answer": "2:50",
      "hint": "First hop back the minutes. Then hop back the hours." },

    // ---- Analog ↔ Digital matching (show the GIVEN clock, kid picks the match) ----
    { "prompt": "🕰️ What does the digital clock show? (Read the analog clock first.)",
      "viz": { "type": "clock", "params": { "hour": 4, "minute": 45 } },
      "options": ["4:09", "4:45", "9:20"],
      "answer": "4:45",
      "hint": "Each number on the clock is 5 minutes. Skip-count by 5s along the long hand." },
    { "prompt": "🕰️ Which digital readout matches this analog clock?",
      "viz": { "type": "clock", "params": { "hour": 6, "minute": 30 } },
      "options": ["6:06", "6:30", "7:30"],
      "answer": "6:30",
      "hint": "Read the short hand for the hour. Read the long hand for the minutes." },
    { "prompt": "🔢 The digital clock reads 8:15. Which analog description matches?",
      "viz": { "type": "digitalClock", "params": { "hour": 8, "minute": 15 } },
      "options": ["Short hand on 8, long hand on 12", "Short hand just past 8, long hand on 3", "Short hand on 3, long hand on 8"],
      "answer": "Short hand just past 8, long hand on 3",
      "hint": "Each number is 5 minutes. Which clock number stands for 15 minutes past?" },

    // ---- Detective ----
    { "prompt": "🔍 Detective: a 1-hour-30-minute movie ends at 5:00. When did it start?",
      "viz": { "type": "clock", "params": { "hour": 5, "minute": 0, "label": "End: 5:00, hop back 1h 30m" } },
      "options": ["3:00", "3:30", "4:30"], "answer": "3:30",
      "hint": "Look at the end clock. Hop back the minutes first, then the hour." },
    { "prompt": "🔍 Detective: bus stops every 15 minutes. The 9:30 bus just left. When's the next one?",
      "viz": { "type": "clock", "params": { "hour": 9, "minute": 30, "label": "Last bus: 9:30, add 15 min" } },
      "options": ["9:35", "9:45", "10:00"], "answer": "9:45",
      "hint": "Look at the start clock. Move the long hand forward by 15 minutes." }
  ]
});
