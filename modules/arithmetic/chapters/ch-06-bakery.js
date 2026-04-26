/*!
 * Arithmetic · Chapter 6 — Beaver Bakery
 */
(function () {
  MR.Content.registerChapter({
    id: "ch-ari-06-bakery",
    moduleId: "arithmetic",
    order: 6,
    title: "Ch. 6 — Beaver Bakery",
    description: "Slice pies into fractions for the beaver family.",
    emoji: "🥧",
    accent: "#c4b5fd",
    requires: "ch-ari-05-library",
    narrative: {
      intro: [
        { speaker: "narrator",     text: "Mama Beaver slides a warm berry pie from the oven." },
        { speaker: "mama-beaver",  text: "Every beaver gets a fair slice. Can you name the fraction we served?" },
      ],
      outro: [
        { speaker: "narrator",     text: "Each beaver wags their tail happily, crumbs on their whiskers." },
        { speaker: "mama-beaver",  text: "Delicious and just right!" },
      ],
    },
    engine: "fraction",
    engineConfig: { modes: ["name"], problemsPerRound: 6 },
    rewards: { critterOnPass: "baby-bunny", journalEntry: "ari-ch-06" },
  });
})();
