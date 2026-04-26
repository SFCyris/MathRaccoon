/*!
 * Arithmetic · Chapter 2 — The Bubbling Brook
 */
(function () {
  MR.Content.registerChapter({
    id: "ch-ari-02-brook",
    moduleId: "arithmetic",
    order: 2,
    title: "Ch. 2 — The Bubbling Brook",
    description: "Count stones across the stream with Rocky Raccoon.",
    emoji: "🪨",
    accent: "#7dd3fc",
    requires: "ch-ari-01-forest",
    narrative: {
      intro: [
        { speaker: "narrator", text: "At the brook, Rocky Raccoon is stacking stones." },
        { speaker: "rocky",    text: "Some stones tumble when a frog hops by. Can you tell me how many are left?" },
      ],
      outro: [
        { speaker: "narrator", text: "Rocky high-fives {NAME} with a mossy paw." },
        { speaker: "rocky",    text: "Great hopping! Want to meet my brother Ricky?" },
      ],
    },
    engine: "arithmetic",
    engineConfig: { op: "-", digits: 2, problemsPerRound: 6 },
    rewards: { critterOnPass: "baby-otter", journalEntry: "ari-ch-02" },
  });
})();
