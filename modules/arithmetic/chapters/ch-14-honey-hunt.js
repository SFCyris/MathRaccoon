/*!
 * Arithmetic · Chapter 14 — Bear's Honey Hunt
 */
(function () {
  MR.Content.registerChapter({
    id: "ch-ari-14-honey-hunt",
    moduleId: "arithmetic",
    order: 14,
    title: "Ch. 14 — Bear's Honey Hunt",
    description: "Compare fractions of honeycombs with Grandpa Bear.",
    emoji: "🐻",
    accent: "#ffd93d",
    requires: "ch-ari-13-deer-dale",
    narrative: {
      intro: [
        { speaker: "narrator",     text: "Grandpa Bear hums, paws sticky with honey." },
        { speaker: "grandpa-bear", text: "Which honeycomb piece is bigger? Compare the fractions for me!" },
      ],
      outro: [
        { speaker: "narrator",     text: "Grandpa Bear shares the biggest slice with {NAME}." },
        { speaker: "grandpa-bear", text: "Fair is sweet." },
      ],
    },
    engine: "fraction",
    engineConfig: { modes: ["compare"], problemsPerRound: 6 },
    rewards: { critterOnPass: "baby-bear-cub", journalEntry: "ari-ch-14" },
  });
})();
