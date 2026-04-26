/*!
 * Arithmetic · Chapter 3 — Ricky's Berry Baskets
 */
(function () {
  MR.Content.registerChapter({
    id: "ch-ari-03-berries",
    moduleId: "arithmetic",
    order: 3,
    title: "Ch. 3 — Ricky's Berry Baskets",
    description: "Ricky Raccoon sorts blueberries into equal baskets.",
    emoji: "🫐",
    accent: "#ff7a93",
    requires: "ch-ari-02-brook",
    narrative: {
      intro: [
        { speaker: "narrator", text: "Ricky Raccoon bounces up with tiny woven baskets." },
        { speaker: "ricky",    text: "Each basket has the same number of berries. Can you multiply to see how many we picked?" },
      ],
      outro: [
        { speaker: "narrator", text: "Ricky scatters berries in a rainbow." },
        { speaker: "ricky",    text: "You're a berry math star! Let's keep going!" },
      ],
    },
    engine: "arithmetic",
    engineConfig: { op: "×", minFactor: 2, maxFactor: 6, problemsPerRound: 6 },
    rewards: { critterOnPass: "baby-squirrel", journalEntry: "ari-ch-03" },
  });
})();
