/*!
 * Arithmetic · Chapter 16 — Grand Raccoon Revue
 */
(function () {
  MR.Content.registerChapter({
    id: "ch-ari-16-grand-revue",
    moduleId: "arithmetic",
    order: 16,
    title: "Ch. 16 — Grand Raccoon Revue",
    description: "Final celebration! Mixed math with all your raccoon friends.",
    emoji: "🎪",
    accent: "#ff7a93",
    requires: "ch-ari-15-thousand-stars",
    narrative: {
      intro: [
        { speaker: "narrator", text: "Every critter has come out for the Grand Revue! Math Raccoon takes the stage." },
        { speaker: "raccoon",  text: "One last show — any kind of math, all mixed together. You've got this, {NAME}!" },
      ],
      outro: [
        { speaker: "narrator", text: "Fireflies spell '{NAME}' across the valley sky." },
        { speaker: "raccoon",  text: "You're an honorary citizen of Hidden Valley!" },
      ],
    },
    engine: "mixed",
    engineConfig: {
      problemsPerRound: 10,
      engines: ["arithmetic"],
      arithmeticOps: ["+", "-", "×", "÷"],
      engineConfigs: {
        arithmetic: { digits: 3, regroup: true, minFactor: 2, maxFactor: 10 },
      },
    },
    rewards: { critterOnPass: "baby-panda", journalEntry: "ari-ch-16" },
  });
})();
