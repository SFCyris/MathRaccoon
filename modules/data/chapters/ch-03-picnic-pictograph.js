/*!
 * Data · Chapter 3 — Picnic Pictograph.
 * Mixes dat-op-pictograph + dat-op-graphs. CCSS 3.MD.3 (scaled pictograph).
 */
(function () {
  MR.Content.registerChapter({
    id: "ch-dat-03-picnic-pictograph",
    moduleId: "data",
    order: 3,
    title: "Ch. 3 — Picnic Pictograph",
    description: "Each basket stands for a number — read the picture-graph.",
    emoji: "🧺",
    accent: "#fcd34d",
    requires: "ch-dat-02-graph-grove",
    narrative: {
      intro: [
        { speaker: "narrator", text: "Picnic baskets line the hilltop. A raccoon scholar unrolls a picture-graph." },
        { speaker: "scholar",  text: "Each basket-icon stands for THIS many sandwiches, {NAME}. Read the key first!" },
        { speaker: "raccoon",  text: "Pictograph icons equal the 'scale'. Multiply icons × scale to read the row." },
      ],
      outro: [
        { speaker: "scholar",  text: "Scale read. Rows totaled. You speak picture-graph fluently now!" },
        { speaker: "narrator", text: "The picnic baskets rustle in approval." },
      ],
    },
    engine: "mixed",
    engineConfig: {
      problemsPerRound: 8,
      engines: ["wordProblem", "arithmetic"],
      arithmeticOps: ["×"],
      engineConfigs: {
        wordProblem: { topics: ["equal-groups", "compare"] },
        arithmetic:  { minFactor: 2, maxFactor: 8 },
      },
    },
    rewards: { critterOnPass: null, journalEntry: "dat-ch-03" },
  });
})();
