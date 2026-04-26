/*!
 * Data · Chapter 2 — Graph Grove.
 * Builds on dat-op-graphs (scaled bar graph comparisons). CCSS 3.MD.3.
 */
(function () {
  MR.Content.registerChapter({
    id: "ch-dat-02-graph-grove",
    moduleId: "data",
    order: 2,
    title: "Ch. 2 — Graph Grove",
    description: "Compare the bars — find the difference.",
    emoji: "📈",
    accent: "#a78bfa",
    requires: "ch-dat-01-tally-twinkle",
    narrative: {
      intro: [
        { speaker: "narrator", text: "In Graph Grove, bar charts grow like friendly trees." },
        { speaker: "sparrow",  text: "Tallest bar minus shortest bar — that's the difference, {NAME}." },
        { speaker: "raccoon",  text: "Bigger number first, then subtract. That's comparison." },
      ],
      outro: [
        { speaker: "sparrow",  text: "A graph is a picture that talks back." },
        { speaker: "narrator", text: "The tallest bar bows ever so slightly." },
      ],
    },
    engine: "arithmetic",
    engineConfig: { op: "-", digits: 2, problemsPerRound: 5 },
    rewards: { critterOnPass: null, journalEntry: "dat-ch-02" },
  });
})();
