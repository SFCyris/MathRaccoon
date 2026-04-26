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
    ],
  });
})();
