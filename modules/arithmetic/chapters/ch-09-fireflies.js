/*!
 * Arithmetic · Chapter 9 — Firefly Formation
 */
(function () {
  MR.Content.registerChapter({
    id: "ch-ari-09-fireflies",
    moduleId: "arithmetic",
    order: 9,
    title: "Ch. 9 — Firefly Formation",
    description: "Arrange fireflies into arrays for the summer dance.",
    emoji: "✨",
    accent: "#ff7a93",
    requires: "ch-ari-08-hedgehog-heist",
    narrative: {
      intro: [
        { speaker: "narrator",  text: "Fireflies blink into rows and columns." },
        { speaker: "fireflies", text: "We want to dance in a perfect array! Multiply to see how many of us are in the show." },
      ],
      outro: [
        { speaker: "narrator",  text: "The meadow glows like a starfield." },
        { speaker: "fireflies", text: "Encore! Encore!" },
      ],
    },
    engine: "arithmetic",
    engineConfig: { op: "×", minFactor: 2, maxFactor: 10, problemsPerRound: 6 },
    rewards: { critterOnPass: "baby-skunk", journalEntry: "ari-ch-09" },
  });
})();
