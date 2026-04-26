/*!
 * Teaching op — Elapsed time (measurement).
 *
 * Distinct from op-time (which teaches reading a clock). This op teaches
 * how to compute DURATION between two events — a different skill entirely.
 * The core strategy is "counting on" across a timeline, not arithmetic on
 * hour/minute digits (which fails at base-60 boundaries like 2:45 → 3:30).
 *
 * Uses the timeline viz, which lets learners *see* the hops.
 */
(function () {
  MR.Content.registerOp({
    id: "mea-op-elapsed-time",
    moduleId: "measurement",
    label: "Elapsed Time",
    emoji: "⏳",
    tagline: "How long did it take?",
    accent: "#ffb077",
    strategies: [
      {
        id: "hop-in-hours",
        title: "Hop by Hours",
        subtitle: "Count whole hours forward.",
        emoji: "🦘",
        idea: {
          hook: "When the start and end times both land on a clean hour, you just count the hours in between. Bake at 2:00, done at 5:00 — that's 3 hours.",
          viz: { type: "timeline", params: {
            start: "2:00", end: "5:00",
            hops: [
              { from: "2:00", to: "3:00", text: "+1h" },
              { from: "3:00", to: "4:00", text: "+1h" },
              { from: "4:00", to: "5:00", text: "+1h" },
            ],
            label: "3 hours total",
          } },
          caption: "Each hop is one hour. Three hops from 2:00 to 5:00.",
        },
        watchMe: [
          { text: "Story: Raccoon started reading at 9:00. Finished at 12:00. How long was she reading?",
            viz: { type: "timeline", params: { start: "9:00", end: "12:00", hops: [] } } },
          { text: "Hop one hour: 9:00 → 10:00.",
            viz: { type: "timeline", params: {
              start: "9:00", end: "12:00",
              hops: [{ from: "9:00", to: "10:00", text: "+1h" }],
            } } },
          { text: "Keep hopping: 10 → 11, then 11 → 12.",
            viz: { type: "timeline", params: {
              start: "9:00", end: "12:00",
              hops: [
                { from: "9:00", to: "10:00", text: "+1h" },
                { from: "10:00", to: "11:00", text: "+1h" },
                { from: "11:00", to: "12:00", text: "+1h" },
              ],
              label: "9:00 to 12:00",
            } } },
          { text: "Three hops. Raccoon read for 3 hours.",
            equation: "3 hours" },
        ],
        practice: [
          {
            prompt: "Movie starts at 4:00, ends at 6:00. How long?",
            viz: { type: "timeline", params: { start: "4:00", end: "6:00", hops: [] } },
            options: ["1 hour", "2 hours", "3 hours"],
            answer: "2 hours",
          },
          {
            prompt: "Otter napped from 1:00 to 5:00. How long?",
            options: ["3 hours", "4 hours", "5 hours"],
            answer: "4 hours",
          },
        ],
      },
      {
        id: "half-hop",
        title: "Bridge the Half Hour",
        subtitle: "Hop to the next hour first.",
        emoji: "🕧",
        idea: {
          hook: "When start and end aren't clean hours, it's easier to hop to the NEXT hour first, then count whole hours. 'Bridge up' to the tidy number.",
          viz: { type: "timeline", params: {
            start: "2:30", end: "4:30",
            hops: [
              { from: "2:30", to: "3:00", text: "+30min" },
              { from: "3:00", to: "4:00", text: "+1h" },
              { from: "4:00", to: "4:30", text: "+30min" },
            ],
            label: "30m + 1h + 30m = 2 hours",
          } },
          caption: "Hop the messy bits first and last, the whole hours in between.",
        },
        watchMe: [
          { text: "Story: Cooking started at 3:45, finished at 5:00. How long?",
            viz: { type: "timeline", params: { start: "3:45", end: "5:00", hops: [] } } },
          { text: "First hop: bridge up to the next whole hour. 3:45 → 4:00 is 15 minutes.",
            viz: { type: "timeline", params: {
              start: "3:45", end: "5:00",
              hops: [{ from: "3:45", to: "4:00", text: "+15min" }],
            } } },
          { text: "Now we're on a whole hour. Hop one more: 4:00 → 5:00 is 1 hour.",
            viz: { type: "timeline", params: {
              start: "3:45", end: "5:00",
              hops: [
                { from: "3:45", to: "4:00", text: "+15min" },
                { from: "4:00", to: "5:00", text: "+1h" },
              ],
            } } },
          { text: "Total: 15 minutes + 1 hour = 1 hour 15 minutes.",
            equation: "1 hour 15 minutes" },
          { text: "The trick: NEVER subtract digits directly across hour boundaries. Bridge up first." },
        ],
        practice: [
          {
            prompt: "From 2:45 to 4:15 — how long?",
            viz: { type: "timeline", params: {
              start: "2:45", end: "4:15",
              hops: [
                { from: "2:45", to: "3:00", text: "+15" },
                { from: "3:00", to: "4:00", text: "+1h" },
                { from: "4:00", to: "4:15", text: "+15" },
              ],
            } },
            options: ["1 hour 15 minutes", "1 hour 30 minutes", "2 hours"],
            answer: "1 hour 30 minutes",
            hint: "15 + 60 + 15 = 90 minutes = 1 hour 30 minutes.",
          },
          {
            prompt: "Lesson from 9:30 to 10:15. How long?",
            options: ["30 minutes", "45 minutes", "1 hour"],
            answer: "45 minutes",
            hint: "Bridge 9:30 → 10:00 (30 min), then 10:00 → 10:15 (15 min).",
          },
        ],
      },
      {
        id: "end-or-start",
        title: "Finding the End (or Start)",
        subtitle: "Add duration to start, or subtract from end.",
        emoji: "🔚",
        idea: {
          hook: "Sometimes you know when something started and how LONG it took — you need the end time. Just hop forward from the start, one interval at a time.",
          viz: { type: "timeline", params: {
            start: "10:00", end: "11:30",
            hops: [
              { from: "10:00", to: "11:00", text: "+1h" },
              { from: "11:00", to: "11:30", text: "+30m" },
            ],
            label: "Start 10:00, +1h 30m ⟶ end 11:30",
          } },
          caption: "Start + duration = end. Start − duration works backwards.",
        },
        watchMe: [
          { text: "Question: if soccer starts at 2:00 and lasts 1 hour 30 minutes, when does it end?",
            viz: { type: "timeline", params: { start: "2:00", end: "3:30", hops: [] } } },
          { text: "Hop an hour from 2:00 to 3:00.",
            viz: { type: "timeline", params: {
              start: "2:00", end: "3:30",
              hops: [{ from: "2:00", to: "3:00", text: "+1h" }],
            } } },
          { text: "Now hop 30 more minutes: 3:00 → 3:30.",
            viz: { type: "timeline", params: {
              start: "2:00", end: "3:30",
              hops: [
                { from: "2:00", to: "3:00", text: "+1h" },
                { from: "3:00", to: "3:30", text: "+30m" },
              ],
            } } },
          { text: "Soccer ends at 3:30.",
            equation: "2:00 + 1h 30m = 3:30" },
        ],
        practice: [
          {
            prompt: "Story time starts at 7:00 and lasts 45 minutes. When does it end?",
            options: ["7:30", "7:45", "8:00"],
            answer: "7:45",
            hint: "7:00 + 45 minutes = 7:45.",
          },
          {
            prompt: "Painting took 2 hours and was finished at 5:00. When did it start?",
            options: ["2:00", "3:00", "4:00"],
            answer: "3:00",
            hint: "Work backwards: subtract 2 hours from 5:00.",
          },
        ],
      },
      {
        id: "read-two-analog",
        title: "Read Two Clocks — Analog",
        subtitle: "Read each clock face, then count hops.",
        emoji: "🕰️",
        idea: {
          hook: "Sometimes the START and the END are drawn as clock faces instead of written as numbers. Read each clock first: short hand = hour, long hand = minutes (count by 5s). THEN use the same hopping trick to count the gap.",
          viz: { type: "clockPair", params: {
            mode: "analog",
            start: { hour: 2, minute: 0 },
            end: { hour: 5, minute: 0 },
            startLabel: "Starts", endLabel: "Ends",
            arrowText: "?",
            label: "Same shape, same trick — you just read the faces first.",
          } },
          caption: "Step 1: read each clock. Step 2: hop from start to end.",
        },
        watchMe: [
          { text: "Look at the two clocks. What time does each one show?",
            viz: { type: "clockPair", params: {
              mode: "analog",
              start: { hour: 9, minute: 0 },
              end: { hour: 12, minute: 0 },
              startLabel: "Start", endLabel: "End",
            } } },
          { text: "Left clock: short hand on 9, long hand on 12 → 9:00. Right clock: short hand on 12, long hand on 12 → 12:00." },
          { text: "Now draw the timeline in your head: 9:00 → 12:00. Hop whole hours: 9→10→11→12.",
            viz: { type: "timeline", params: {
              start: "9:00", end: "12:00",
              hops: [
                { from: "9:00", to: "10:00", text: "+1h" },
                { from: "10:00", to: "11:00", text: "+1h" },
                { from: "11:00", to: "12:00", text: "+1h" },
              ],
            } } },
          { text: "Three hops. The gap between the two clocks is 3 hours.",
            equation: "12:00 − 9:00 = 3 hours" },
          { text: "Tricky part to watch: if the LONG hand moved too, you'll have extra minutes. Let's try one.",
            viz: { type: "clockPair", params: {
              mode: "analog",
              start: { hour: 3, minute: 15 },
              end: { hour: 4, minute: 45 },
              startLabel: "Start", endLabel: "End",
            } } },
          { text: "Left clock reads 3:15 (long hand on 3 = 15 min). Right clock reads 4:45 (long hand on 9 = 45 min). Bridge up: 3:15 → 4:00 is 45 min. Then 4:00 → 4:45 is 45 min. Total = 1 hour 30 minutes.",
            equation: "45 min + 45 min = 1 h 30 min" },
        ],
        practice: [
          {
            prompt: "How long between these two clocks?",
            viz: { type: "clockPair", params: {
              mode: "analog",
              start: { hour: 4, minute: 0 },
              end: { hour: 7, minute: 0 },
              startLabel: "Start", endLabel: "End",
            } },
            options: ["2 hours", "3 hours", "4 hours"],
            answer: "3 hours",
            hint: "Read the faces first: 4:00 and 7:00. Hop: 4→5→6→7.",
          },
          {
            prompt: "How long between these two clocks?",
            viz: { type: "clockPair", params: {
              mode: "analog",
              start: { hour: 8, minute: 30 },
              end: { hour: 10, minute: 0 },
              startLabel: "Start", endLabel: "End",
            } },
            options: ["1 hour", "1 hour 30 minutes", "2 hours"],
            answer: "1 hour 30 minutes",
            hint: "Left is 8:30, right is 10:00. Bridge up: 8:30→9:00 (30 min), then 9:00→10:00 (1 h).",
          },
        ],
      },
      {
        id: "read-two-digital",
        title: "Read Two Clocks — Digital",
        subtitle: "Digital shows the numbers — still hop, don't subtract.",
        emoji: "🔢",
        idea: {
          hook: "Digital clocks HAND you the numbers — no hand-reading needed. But the common mistake is to just subtract the digits! Across an hour boundary, that gives the wrong answer. Hop instead.",
          viz: { type: "clockPair", params: {
            mode: "digital",
            start: { hour: 2, minute: 45 },
            end: { hour: 4, minute: 15 },
            startLabel: "Starts", endLabel: "Ends",
            arrowText: "?",
          } },
          caption: "Never do 4:15 − 2:45 in your head digit-by-digit. Use the timeline.",
        },
        watchMe: [
          { text: "From 2:45 to 4:15 — don't subtract digits directly. Let's hop safely.",
            viz: { type: "clockPair", params: {
              mode: "digital",
              start: { hour: 2, minute: 45 },
              end: { hour: 4, minute: 15 },
              startLabel: "Start", endLabel: "End",
            } } },
          { text: "Step 1 — bridge up. 2:45 → 3:00 is 15 minutes.",
            viz: { type: "timeline", params: {
              start: "2:45", end: "4:15",
              hops: [{ from: "2:45", to: "3:00", text: "+15m" }],
            } } },
          { text: "Step 2 — hop the whole hour. 3:00 → 4:00 is 1 hour.",
            viz: { type: "timeline", params: {
              start: "2:45", end: "4:15",
              hops: [
                { from: "2:45", to: "3:00", text: "+15m" },
                { from: "3:00", to: "4:00", text: "+1h" },
              ],
            } } },
          { text: "Step 3 — finish the minutes. 4:00 → 4:15 is 15 more minutes.",
            viz: { type: "timeline", params: {
              start: "2:45", end: "4:15",
              hops: [
                { from: "2:45", to: "3:00", text: "+15m" },
                { from: "3:00", to: "4:00", text: "+1h" },
                { from: "4:00", to: "4:15", text: "+15m" },
              ],
              label: "Total: 15 + 60 + 15 = 90 min = 1 h 30 m",
            } } },
          { text: "Add the hops: 15 + 60 + 15 = 90 minutes = 1 hour 30 minutes.",
            equation: "1 h 30 m" },
          { text: "Why does 4:15 − 2:45 the wrong way give 1:70 or 2:30? Because minutes don't go to 100 — they reset every 60. The timeline keeps you safe." },
        ],
        practice: [
          {
            prompt: "How long from the first digital time to the second?",
            viz: { type: "clockPair", params: {
              mode: "digital",
              start: { hour: 6, minute: 50 },
              end: { hour: 7, minute: 20 },
              startLabel: "Start", endLabel: "End",
            } },
            options: ["20 minutes", "30 minutes", "1 hour 10 minutes"],
            answer: "30 minutes",
            hint: "Bridge up: 6:50 → 7:00 (10 min), then 7:00 → 7:20 (20 min). 10 + 20 = 30.",
          },
          {
            prompt: "How long from the first digital time to the second?",
            viz: { type: "clockPair", params: {
              mode: "digital",
              start: { hour: 1, minute: 15 },
              end: { hour: 3, minute: 45 },
              startLabel: "Start", endLabel: "End",
            } },
            options: ["2 hours", "2 hours 30 minutes", "3 hours 30 minutes"],
            answer: "2 hours 30 minutes",
            hint: "1:15 → 2:00 is 45 min. 2:00 → 3:00 is 1 h. 3:00 → 3:45 is 45 min. 45 + 60 + 45 = 150 min = 2 h 30 m.",
          },
        ],
      },
      {
        id: "match-analog-digital",
        title: "Same Time, Two Shapes",
        subtitle: "Analog ↔ Digital — same instant.",
        emoji: "🔁",
        idea: {
          hook: "Analog clocks and digital clocks tell the SAME time in different shapes. If you can translate between them, you can solve elapsed-time questions no matter which picture you see.",
          viz: { type: "clockPair", params: {
            mode: "mixed",
            start: { hour: 3, minute: 30 },
            end: { hour: 3, minute: 30 },
            startLabel: "Analog", endLabel: "Digital",
            arrowText: "same",
            label: "3:30 shown two ways.",
          } },
          caption: "Short hand between 3 and 4, long hand on 6 (= 30 minutes) = 3:30.",
        },
        watchMe: [
          { text: "Same moment, two shapes. Analog shows 7 with the long hand on 3 (= 15 min). Digital shows 7:15.",
            viz: { type: "clockPair", params: {
              mode: "mixed",
              start: { hour: 7, minute: 15 },
              end: { hour: 7, minute: 15 },
              startLabel: "Analog", endLabel: "Digital",
              arrowText: "=",
            } } },
          { text: "Translation trick: the long hand's NUMBER × 5 = the minutes. Long hand on 3 → 15 minutes. Long hand on 6 → 30 minutes. Long hand on 9 → 45 minutes." },
          { text: "Now use the translation to solve elapsed time. Analog start reads 5:00; digital end reads 6:45. How long?",
            viz: { type: "clockPair", params: {
              mode: "mixed",
              start: { hour: 5, minute: 0 },
              end: { hour: 6, minute: 45 },
              startLabel: "Start", endLabel: "End",
            } } },
          { text: "5:00 → 6:00 is 1 hour. 6:00 → 6:45 is 45 minutes. Total = 1 hour 45 minutes.",
            viz: { type: "timeline", params: {
              start: "5:00", end: "6:45",
              hops: [
                { from: "5:00", to: "6:00", text: "+1h" },
                { from: "6:00", to: "6:45", text: "+45m" },
              ],
              label: "1 h 45 m",
            } } },
          { text: "Two shapes, one answer. The timeline works either way.",
            equation: "1 h 45 m" },
        ],
        practice: [
          {
            prompt: "The analog clock on the left shows the START. The digital clock on the right shows the END. How long between them?",
            viz: { type: "clockPair", params: {
              mode: "mixed",
              start: { hour: 10, minute: 0 },
              end: { hour: 12, minute: 30 },
              startLabel: "Start", endLabel: "End",
            } },
            options: ["2 hours", "2 hours 30 minutes", "3 hours"],
            answer: "2 hours 30 minutes",
            hint: "Analog reads 10:00. Digital reads 12:30. 10→11→12 is 2 h, plus 30 min.",
          },
          {
            prompt: "Which digital time matches this analog clock?",
            viz: { type: "clock", params: { hour: 4, minute: 45 } },
            options: ["4:15", "4:45", "9:20"],
            answer: "4:45",
            hint: "Short hand is just past 4; long hand on 9 means 9 × 5 = 45 minutes.",
          },
        ],
      },
    ],
  });
})();
