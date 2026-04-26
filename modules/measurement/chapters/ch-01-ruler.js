/*!
 * Measurement · Chapter 1 — Ruler Roundup.
 * Builds on mea-op-length. CCSS 3.MD.4.
 */
(function () {
  MR.Content.registerChapter({
    id: "ch-mea-01-ruler",
    moduleId: "measurement",
    order: 1,
    title: "Ch. 1 — Ruler Roundup",
    description: "Measure ribbons and rope with the tailor-mouse.",
    emoji: "📏",
    accent: "#7dd3fc",
    requires: null,
    narrative: {
      intro: [
        { speaker: "narrator",     text: "A tiny tailor-mouse runs a ribbon shop at the edge of the valley." },
        { speaker: "tailor-mouse", text: "My measuring tape is tangled, {NAME}! Help me add ribbon lengths — every centimeter counts." },
        { speaker: "raccoon",      text: "Centimeters are just numbers with 'cm' tucked on the end." },
      ],
      outro: [
        { speaker: "tailor-mouse", text: "Every ribbon trimmed just right. Thank you, {NAME}!" },
        { speaker: "narrator",     text: "Measure twice, cut once — a motto worth keeping." },
      ],
    },
    engine: "wordProblem",
    engineConfig: { topics: ["length"], problemsPerRound: 5 },
    rewards: { critterOnPass: null, journalEntry: "mea-ch-01" },
  });
})();
