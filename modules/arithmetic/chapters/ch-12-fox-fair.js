/*!
 * Arithmetic · Chapter 12 — Fox Fair
 */
(function () {
  MR.Content.registerChapter({
    id: "ch-ari-12-fox-fair",
    moduleId: "arithmetic",
    order: 12,
    title: "Ch. 12 — Fox Fair",
    description: "Round prices at the fox fairground stalls.",
    emoji: "🦊",
    accent: "#ffb077",
    requires: "ch-ari-11-kitten-quilt",
    narrative: {
      intro: [
        { speaker: "narrator", text: "A clever fox grins at the fair." },
        { speaker: "fox",      text: "Our prices are wiggly! Round to the nearest 10 so shoppers know what to expect." },
      ],
      outro: [
        { speaker: "narrator", text: "The fox tips its hat." },
        { speaker: "fox",      text: "A sharp estimator — welcome back anytime!" },
      ],
    },
    engine: "placeValue",
    engineConfig: { digits: 3, modes: ["round"], roundTo: 10, problemsPerRound: 6 },
    rewards: { critterOnPass: "baby-fox", journalEntry: "ari-ch-12" },
  });
})();
