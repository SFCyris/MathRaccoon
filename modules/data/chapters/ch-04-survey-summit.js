/*!
 * Data · Chapter 4 — Survey Summit.
 * Mixes dat-op-graphs + dat-op-pictograph. CCSS 3.MD.3 review.
 */
(function () {
  MR.Content.registerChapter({
    id: "ch-dat-04-survey-summit",
    moduleId: "data",
    order: 4,
    title: "Ch. 4 — Survey Summit",
    description: "Read bars AND pictographs — who likes what in the valley?",
    emoji: "📋",
    accent: "#86efac",
    requires: "ch-dat-03-picnic-pictograph",
    narrative: {
      intro: [
        { speaker: "narrator", text: "The valley's yearly survey is in! Two charts hang on the noticeboard." },
        { speaker: "owl",      text: "One is a bar graph, one a pictograph. Both say the same story — different styles." },
        { speaker: "raccoon",  text: "Different pictures, same math: compare, add, subtract." },
      ],
      outro: [
        { speaker: "owl",      text: "You read both graphs like an old pro, {NAME}!" },
        { speaker: "narrator", text: "The data squirrels nod and scurry off to tally more." },
      ],
    },
    engine: "mixed",
    engineConfig: {
      problemsPerRound: 8,
      engines: ["arithmetic", "wordProblem"],
      arithmeticOps: ["-", "+"],
      engineConfigs: {
        arithmetic:  { digits: 2, regroup: false },
        wordProblem: { topics: ["compare", "equal-groups"] },
      },
    },
    rewards: { critterOnPass: null, journalEntry: "dat-ch-04" },
  });
})();
