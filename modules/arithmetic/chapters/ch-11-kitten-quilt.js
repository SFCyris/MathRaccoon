/*!
 * Arithmetic · Chapter 11 — Kitten Quilt
 */
(function () {
  MR.Content.registerChapter({
    id: "ch-ari-11-kitten-quilt",
    moduleId: "arithmetic",
    order: 11,
    title: "Ch. 11 — Kitten Quilt",
    description: "Match equivalent fractions on a cozy quilt.",
    emoji: "🐱",
    accent: "#c4b5fd",
    requires: "ch-ari-10-puppy-picnic",
    narrative: {
      intro: [
        { speaker: "narrator", text: "Three kittens tumble on a patchwork quilt." },
        { speaker: "kittens",  text: "Help us find patches that are the same size — even if they look different!" },
      ],
      outro: [
        { speaker: "narrator", text: "The quilt warms the whole valley." },
        { speaker: "kittens",  text: "Purrs all around." },
      ],
    },
    engine: "fraction",
    engineConfig: { modes: ["equivalent"], problemsPerRound: 6 },
    rewards: { critterOnPass: "baby-kitten", journalEntry: "ari-ch-11" },
  });
})();
