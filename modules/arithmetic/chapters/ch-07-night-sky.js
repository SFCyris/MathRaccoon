/*!
 * Arithmetic · Chapter 7 — Owl's Night Sky
 */
(function () {
  MR.Content.registerChapter({
    id: "ch-ari-07-night-sky",
    moduleId: "arithmetic",
    order: 7,
    title: "Ch. 7 — Owl's Night Sky",
    description: "Count stars in big three-digit numbers with Professor Owl.",
    emoji: "🦉",
    accent: "#a78bfa",
    requires: "ch-ari-06-bakery",
    narrative: {
      intro: [
        { speaker: "narrator", text: "Professor Owl glides down with a scroll of stars." },
        { speaker: "owl",      text: "The sky is too big to count alone. Help me add the stars in each constellation!" },
      ],
      outro: [
        { speaker: "narrator", text: "The stars twinkle in time with {NAME}'s answers." },
        { speaker: "owl",      text: "Splendid! Knowledge soars when shared." },
      ],
    },
    engine: "arithmetic",
    engineConfig: { op: "+", digits: 3, regroup: true, problemsPerRound: 6 },
    rewards: { critterOnPass: "baby-owl", journalEntry: "ari-ch-07" },
  });
})();
