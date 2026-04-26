/*!
 * Arithmetic · Chapter 8 — The Hedgehog Hollow Heist
 */
(function () {
  MR.Content.registerChapter({
    id: "ch-ari-08-hedgehog-heist",
    moduleId: "arithmetic",
    order: 8,
    title: "Ch. 8 — The Hedgehog Hollow Heist",
    description: "Subtract to solve a twist at Hedgehog Hollow.",
    emoji: "🦔",
    accent: "#7dd3fc",
    requires: "ch-ari-07-night-sky",
    narrative: {
      intro: [
        { speaker: "narrator", text: "A hedgehog scampers up, prickles wiggling." },
        { speaker: "hedgehog", text: "Someone swiped some of my acorn coins! Subtract to find what's missing!" },
      ],
      outro: [
        { speaker: "narrator", text: "A cheeky squirrel returns the coins with a wink." },
        { speaker: "hedgehog", text: "Mystery solved — thanks to subtraction!" },
      ],
    },
    engine: "arithmetic",
    engineConfig: { op: "-", digits: 3, problemsPerRound: 6 },
    rewards: { critterOnPass: "baby-hedgehog", journalEntry: "ari-ch-08" },
  });
})();
