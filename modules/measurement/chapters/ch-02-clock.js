/*!
 * Measurement · Chapter 2 — Clock Tower.
 * Builds on mea-op-time + mea-op-elapsed-time. CCSS 3.MD.1.
 */
(function () {
  MR.Content.registerChapter({
    id: "ch-mea-02-clock",
    moduleId: "measurement",
    order: 2,
    title: "Ch. 2 — Clock Tower",
    description: "Read the bells and count the hours between chimes.",
    emoji: "⏰",
    accent: "#ffd93d",
    requires: "ch-mea-01-ruler",
    narrative: {
      intro: [
        { speaker: "narrator",     text: "The valley clock-tower chimes every hour. The clock-keeper polishes the gears." },
        { speaker: "clock-keeper", text: "Tell me the hours between each chime, {NAME}." },
        { speaker: "raccoon",      text: "Start time, end time — count the hops between." },
      ],
      outro: [
        { speaker: "clock-keeper", text: "Time is a measurement too, just like length." },
        { speaker: "narrator",     text: "The gears hum on, keeping the valley on schedule." },
      ],
    },
    engine: "wordProblem",
    engineConfig: { topics: ["time"], problemsPerRound: 5 },
    rewards: { critterOnPass: null, journalEntry: "mea-ch-02" },
  });
})();
