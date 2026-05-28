/*!
 * Teaching op — Telling time (measurement).
 */
(function () {
  MR.Content.registerOp({
    id: "mea-op-time",
    moduleId: "measurement",
    label: "Telling Time",
    emoji: "⏰",
    tagline: "What time is it?",
    accent: "#a78bfa",
    strategies: [
      {
        id: "hour-hand",
        title: "The Hour Hand",
        subtitle: "Short hand points to the hour.",
        emoji: "🕒",
        idea: {
          hook: "The short hand on a clock tells the hour. When it points straight at a number, it's that hour on the dot.",
          viz: { type: "clock", params: { hour: 3, minute: 0, label: "3 o'clock" } },
        },
        watchMe: [
          { text: "The short hand points right at 7.",
            viz: { type: "clock", params: { hour: 7, minute: 0 } } },
          { text: "The long hand is on 12. That means no extra minutes — it's exactly o'clock." },
          { text: "So the time is 7:00.",
            equation: "7 : 00" },
        ],
        practice: [
          {
            prompt: "What time is it?",
            viz: { type: "clock", params: { hour: 5, minute: 0 } },
            options: ["4:00", "5:00", "6:00"],
            answer: "5:00",
          },
          {
            prompt: "What time is it?",
            viz: { type: "clock", params: { hour: 11, minute: 0 } },
            options: ["10:00", "11:00", "12:00"],
            answer: "11:00",
          },
        ],
      },
      {
        id: "minute-hand",
        title: "The Minute Hand",
        subtitle: "Long hand, count by 5s.",
        emoji: "🕖",
        idea: {
          hook: "The long hand points to minutes. Every number is 5 minutes apart. Count by 5s around the clock.",
          viz: { type: "clock", params: { hour: 2, minute: 30, label: "2:30 — half past 2" } },
        },
        watchMe: [
          { text: "The short hand is between 3 and 4, just past 3.",
            viz: { type: "clock", params: { hour: 3, minute: 15 } } },
          { text: "The long hand is on 3. Count by 5s: 5, 10, 15. That's 15 minutes." },
          { text: "So the time is 3:15.",
            equation: "3 : 15" },
        ],
        practice: [
          {
            prompt: "What time is it?",
            viz: { type: "clock", params: { hour: 6, minute: 30 } },
            options: ["6:15", "6:30", "6:45"],
            answer: "6:30",
          },
          {
            prompt: "What time is it?",
            viz: { type: "clock", params: { hour: 4, minute: 45 } },
            options: ["4:15", "4:30", "4:45"],
            answer: "4:45",
            hint: "Long hand on 9 means 45 minutes."
          },
        ],
      },
      {
        id: "reverse-time",
        title: "Reverse — Match the Clock to the Time",
        subtitle: "Given a time, find the clock.",
        emoji: "🔍",
        idea: {
          hook: "Now run the rule backwards. Given the time in words or digits, you should be able to PICTURE where each hand sits. Long hand for minutes, short hand for hours.",
          viz: { type: "clock", params: { hour: 9, minute: 0, label: "9:00" } },
          caption: "9:00 — short hand on 9, long hand on 12.",
        },
        watchMe: [
          { text: "Where does the long hand go at 6:30?",
            viz: { type: "clock", params: { hour: 6, minute: 30 } } },
          { text: "Half past = long hand on 6. Short hand sits between 6 and 7.",
            equation: "6:30 → long hand on 6" },
          { text: "Detective: what time does this clock show?",
            viz: { type: "clock", params: { hour: 4, minute: 15 } } },
          { text: "Short hand just past 4 = the 4 o'clock hour. Long hand on 3 = 15 minutes. So 4:15.",
            equation: "Long hand on 3 → 15 minutes" },
        ],
        practice: [
          { prompt: "What time does this clock show?",
            viz: { type: "clock", params: { hour: 2, minute: 0 } },
            options: ["1:55", "2:00", "12:10"], answer: "2:00",
            hint: "Short hand straight on 2, long hand on 12 — exactly 2 o'clock." },
          { prompt: "Drag the long hand to make 7:30. Where does it land?",
            viz: { type: "interactiveClock", params: { startHour: 7, startMinute: 0, targetHour: 7, targetMinute: 30, label: "Drag the long (purple) hand around the dial. Snaps every 5 minutes." } },
            options: ["on 6", "on 12", "on 3"], answer: "on 6",
            hint: "Drag the long hand to the bottom of the clock. Which number is it on?" },
          { prompt: "What time does this clock show?",
            viz: { type: "clock", params: { hour: 8, minute: 45 } },
            options: ["8:09", "8:45", "9:40"], answer: "8:45",
            hint: "Long hand on 9 means 45 minutes. Short hand just past 8." },
        ],
      },
    ],
  });
})();
