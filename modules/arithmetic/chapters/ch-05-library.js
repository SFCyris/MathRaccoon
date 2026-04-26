/*!
 * Arithmetic · Chapter 5 — Reading Raccoon's Library
 */
(function () {
  MR.Content.registerChapter({
    id: "ch-ari-05-library",
    moduleId: "arithmetic",
    order: 5,
    title: "Ch. 5 — Reading Raccoon's Library",
    description: "Help Reading Raccoon shelve books by place value.",
    emoji: "📚",
    accent: "#ffb077",
    requires: "ch-ari-04-mouse-market",
    narrative: {
      intro: [
        { speaker: "narrator",         text: "Inside a hollow tree, Reading Raccoon pushes up tiny spectacles." },
        { speaker: "reading-raccoon",  text: "Books have numbers — can you tell me which digit goes where?" },
      ],
      outro: [
        { speaker: "narrator",         text: "The library hums with happy pages." },
        { speaker: "reading-raccoon",  text: "You're welcome back anytime, my friend." },
      ],
    },
    engine: "placeValue",
    engineConfig: { digits: 3, modes: ["read", "expanded"], problemsPerRound: 6 },
    rewards: { critterOnPass: "baby-koala", journalEntry: "ari-ch-05" },
  });
})();
