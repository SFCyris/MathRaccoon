/*!
 * Arithmetic · Chapter 13 — Deer Dale
 */
(function () {
  MR.Content.registerChapter({
    id: "ch-ari-13-deer-dale",
    moduleId: "arithmetic",
    order: 13,
    title: "Ch. 13 — Deer Dale",
    description: "Add four-digit totals with the deer clan.",
    emoji: "🦌",
    accent: "#6ee7b7",
    requires: "ch-ari-12-fox-fair",
    narrative: {
      intro: [
        { speaker: "narrator", text: "Tall deer stand at the edge of Deer Dale." },
        { speaker: "deer",     text: "Our numbers are getting bigger! Add the four-digit herds for us." },
      ],
      outro: [
        { speaker: "narrator", text: "The deer bow their heads." },
        { speaker: "deer",     text: "Your math is as mighty as our antlers!" },
      ],
    },
    engine: "arithmetic",
    engineConfig: { op: "+", digits: 4, regroup: true, problemsPerRound: 6 },
    rewards: { critterOnPass: "baby-fawn", journalEntry: "ari-ch-13" },
  });
})();
