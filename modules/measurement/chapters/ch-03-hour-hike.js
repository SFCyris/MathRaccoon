/*!
 * Measurement · Chapter 3 — Hour Hike.
 * Mixes mea-op-length + mea-op-elapsed-time (CCSS 3.MD.1, 3.MD.4).
 */
(function () {
  MR.Content.registerChapter({
    id: "ch-mea-03-hour-hike",
    moduleId: "measurement",
    order: 3,
    title: "Ch. 3 — Hour Hike",
    description: "Measure the trail and track the hours — a hike at sunrise.",
    emoji: "🥾",
    accent: "#a78bfa",
    requires: "ch-mea-02-clock",
    narrative: {
      intro: [
        { speaker: "narrator", text: "Sunrise mist lifts off the valley as the fox-guide waves a walking stick." },
        { speaker: "fox",      text: "We've got a trail to measure AND a time to keep, {NAME}. Both at once!" },
        { speaker: "raccoon",  text: "Measurements stack nicely: centimeters for the trail, hours for the clock." },
      ],
      outro: [
        { speaker: "fox",      text: "Trail mapped, time tracked. You can measure the world two ways now." },
        { speaker: "narrator", text: "The sun is high. A picnic waits at the clearing." },
      ],
    },
    engine: "mixed",
    engineConfig: {
      problemsPerRound: 8,
      engines: ["wordProblem"],
      engineConfigs: {
        wordProblem: { topics: ["length", "time"] },
      },
    },
    rewards: { critterOnPass: null, journalEntry: "mea-ch-03" },
  });
})();
