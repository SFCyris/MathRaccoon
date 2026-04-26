/*!
 * Arithmetic · Chapter 15 — Thousand-Star Sky
 */
(function () {
  MR.Content.registerChapter({
    id: "ch-ari-15-thousand-stars",
    moduleId: "arithmetic",
    order: 15,
    title: "Ch. 15 — Thousand-Star Sky",
    description: "Read, expand, and round four-digit skies.",
    emoji: "🌌",
    accent: "#a78bfa",
    requires: "ch-ari-14-honey-hunt",
    narrative: {
      intro: [
        { speaker: "narrator",    text: "The whole valley gazes up at the night sky." },
        { speaker: "star-sprite", text: "The sky has thousands of stars tonight. Read their place values and round to the nearest 100." },
      ],
      outro: [
        { speaker: "narrator",    text: "The sky shimmers with {NAME}'s answers." },
        { speaker: "star-sprite", text: "The valley erupts in applause!" },
      ],
    },
    engine: "placeValue",
    engineConfig: { digits: 4, modes: ["read", "expanded", "round"], roundTo: 100, problemsPerRound: 6 },
    rewards: { critterOnPass: "baby-duckling", journalEntry: "ari-ch-15" },
  });
})();
