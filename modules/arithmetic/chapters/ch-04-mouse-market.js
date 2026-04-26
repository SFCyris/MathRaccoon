/*!
 * Arithmetic · Chapter 4 — Mouse Market
 */
(function () {
  MR.Content.registerChapter({
    id: "ch-ari-04-mouse-market",
    moduleId: "arithmetic",
    order: 4,
    title: "Ch. 4 — Mouse Market",
    description: "Divide cheese wedges fairly at the mouse market.",
    emoji: "🧀",
    accent: "#ffd93d",
    requires: "ch-ari-03-berries",
    narrative: {
      intro: [
        { speaker: "narrator", text: "Three little mice tumble out of a pumpkin cart." },
        { speaker: "mice",     text: "We have cheese to share. Every mouse must get the same amount — divide for us!" },
      ],
      outro: [
        { speaker: "narrator", text: "The mice squeak with joy, each holding a perfectly equal wedge." },
        { speaker: "mice",     text: "Fair and square, thank you!" },
      ],
    },
    engine: "arithmetic",
    engineConfig: { op: "÷", minFactor: 2, maxFactor: 6, problemsPerRound: 6 },
    rewards: { critterOnPass: "baby-mouse", journalEntry: "ari-ch-04" },
  });
})();
