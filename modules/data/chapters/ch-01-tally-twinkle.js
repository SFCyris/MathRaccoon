/*!
 * Data · Chapter 1 — Tally Twinkle.
 * Builds on dat-op-graphs. CCSS 3.MD.3.
 */
(function () {
  MR.Content.registerChapter({
    id: "ch-dat-01-tally-twinkle",
    moduleId: "data",
    order: 1,
    title: "Ch. 1 — Tally Twinkle",
    description: "Add tally columns with the little bat.",
    emoji: "📊",
    accent: "#c4b5fd",
    requires: null,
    narrative: {
      intro: [
        { speaker: "narrator", text: "A little bat hangs upside-down over a chalkboard of tally marks." },
        { speaker: "bat",      text: "Add up the totals so we can see who visited the valley today, {NAME}." },
        { speaker: "raccoon",  text: "Each row is a group. Add them up, row by row." },
      ],
      outro: [
        { speaker: "bat",      text: "Data is just counting — with style." },
        { speaker: "narrator", text: "Each column shows a tidy, flappable total." },
      ],
    },
    engine: "arithmetic",
    engineConfig: { op: "+", digits: 2, problemsPerRound: 5 },
    rewards: { critterOnPass: null, journalEntry: "dat-ch-01" },
  });
})();
