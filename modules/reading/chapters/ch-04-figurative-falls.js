/*!
 * Reading · Chapter 4 — Figurative Falls
 */
(function () {
  MR.Content.registerChapter({
    id: "ch-rd-04-figurative-falls",
    moduleId: "reading",
    order: 4,
    title: "Ch. 4 — Figurative Falls",
    description: "Water that sounds like music — and words that don't mean what they say.",
    emoji: "💧",
    accent: "#ffb37a",
    requires: "ch-rd-03-phonics-forest",
    narrative: {
      intro: [
        { speaker: "narrator", text: "A tall waterfall sparkles in the sun. Pages dance in the spray like butterflies." },
        { speaker: "reading",  text: "Figurative Falls! Here, sentences say one thing and mean another — similes, metaphors, idioms." },
        { speaker: "raccoon",  text: "Like 'raining cats and dogs'? I always pictured puppies falling from the sky." },
        { speaker: "reading",  text: "Exactly. Let's help each sentence find its real meaning, {NAME}." },
      ],
      outro: [
        { speaker: "reading",  text: "Well done! The last pages are glowing on the wind." },
        { speaker: "raccoon",  text: "They're pointing back toward your library, Uncle!" },
      ],
    },
    engine: "reading",
    engineConfig: { modes: ["figurative"], problemsPerRound: 6 },
    rewards: {
      critterOnPass: "baby-paper-crane",
      journalEntry:  "rd-ch-04",
    },
  });
})();
