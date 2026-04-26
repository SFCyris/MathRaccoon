/*!
 * Data · Chapter 5 — The Plot Lab.
 * Builds on the new dat-op-line-plot. CCSS 3.MD.B.4.
 * Features Lark the Line-Plot Lark — a new data-module character.
 */
(function () {
  MR.Content.registerChapter({
    id: "ch-dat-05-plot-lab",
    moduleId: "data",
    order: 5,
    title: "Ch. 5 — The Plot Lab",
    description: "Lark the lark measures every acorn. Stack the X's, solve the mystery.",
    emoji: "📈",
    accent: "#ff7a93",
    requires: "ch-dat-04-survey-summit",
    narrative: {
      intro: [
        { speaker: "narrator", text: "A crooked shed sits behind Graph Grove. Inside, a song-lark flits between rulers and graph paper." },
        { speaker: "lark",     text: "Welcome to the Plot Lab, {NAME}! I'm Lark, and I measured EVERY acorn that fell this week." },
        { speaker: "raccoon",  text: "Every one? That's a lot of numbers, Lark." },
        { speaker: "lark",     text: "Exactly! So I drew a line plot — one X for each acorn, stacked above its length. Help me read it." },
        { speaker: "narrator", text: "A scroll unfurls, painted with a number line and towers of X's." },
      ],
      outro: [
        { speaker: "lark",     text: "Tallest stack at 4 inches! That's the most common size — and you spotted it." },
        { speaker: "raccoon",  text: "Line plots turn a pile of measurements into a story you can see." },
        { speaker: "lark",     text: "Come back any time, {NAME}. The Plot Lab always has measurements to sort." },
        { speaker: "narrator", text: "Lark pins your scroll to the wall — your first plot, framed like a prize." },
      ],
    },
    engine: "mixed",
    engineConfig: {
      problemsPerRound: 8,
      engines: ["arithmetic", "wordProblem"],
      arithmeticOps: ["+", "-"],
      engineConfigs: {
        arithmetic:  { digits: 2, regroup: false },
        wordProblem: { topics: ["compare", "equal-groups"] },
      },
    },
    rewards: { critterOnPass: null, journalEntry: "dat-ch-05" },
  });
})();
