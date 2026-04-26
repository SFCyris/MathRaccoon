/*!
 * Measurement · Chapter 5 — Pond Picnic.
 * Mixes mea-op-time + mea-op-capacity. CCSS 3.MD.1 + 3.MD.2.
 */
(function () {
  MR.Content.registerChapter({
    id: "ch-mea-05-pond-picnic",
    moduleId: "measurement",
    order: 5,
    title: "Ch. 5 — Pond Picnic",
    description: "Pour milliliters and track the picnic clock.",
    emoji: "🧺",
    accent: "#86efac",
    requires: "ch-mea-04-ribbon-market",
    narrative: {
      intro: [
        { speaker: "narrator", text: "Lily pads drift across the pond. The otter-cousins unpack the picnic basket." },
        { speaker: "otter",    text: "Pour the juice carefully — too much and the cups overflow!" },
        { speaker: "raccoon",  text: "Milliliters for the jug. Minutes for the picnic. Two units, one afternoon." },
      ],
      outro: [
        { speaker: "otter",    text: "All poured, all timed, all eaten. Picnic perfect, {NAME}." },
        { speaker: "narrator", text: "The pond ripples softly as evening draws in." },
      ],
    },
    engine: "mixed",
    engineConfig: {
      problemsPerRound: 8,
      engines: ["wordProblem"],
      engineConfigs: {
        wordProblem: { topics: ["time", "capacity"] },
      },
    },
    rewards: { critterOnPass: null, journalEntry: "mea-ch-05" },
  });
})();
