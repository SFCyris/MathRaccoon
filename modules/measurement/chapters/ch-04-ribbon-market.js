/*!
 * Measurement · Chapter 4 — Ribbon Market.
 * Mixes mea-op-length + mea-op-money. CCSS 3.MD.4 + money problem solving.
 */
(function () {
  MR.Content.registerChapter({
    id: "ch-mea-04-ribbon-market",
    moduleId: "measurement",
    order: 4,
    title: "Ch. 4 — Ribbon Market",
    description: "Measure ribbons, count coins — the market is busy today.",
    emoji: "🎀",
    accent: "#fcd34d",
    requires: "ch-mea-03-hour-hike",
    narrative: {
      intro: [
        { speaker: "narrator",     text: "Sellers call out prices. Ribbons trail from every stall in rainbow stripes." },
        { speaker: "tailor-mouse", text: "Some folks want ribbons by length, {NAME}. Some want change counted back." },
        { speaker: "raccoon",      text: "Same tools: add, subtract, and keep track of your unit." },
      ],
      outro: [
        { speaker: "tailor-mouse", text: "You kept the coins straight AND the ribbons fair. A true market raccoon." },
        { speaker: "narrator",     text: "The market coin-jar jingles — a cheerful sound." },
      ],
    },
    engine: "mixed",
    engineConfig: {
      problemsPerRound: 8,
      engines: ["wordProblem"],
      engineConfigs: {
        wordProblem: { topics: ["length", "money"] },
      },
    },
    rewards: { critterOnPass: null, journalEntry: "mea-ch-04" },
  });
})();
