/*!
 * Reading · Chapter 5 — The Final Chapter
 * Comprehension finale — passages, inferences, main idea.
 */
(function () {
  MR.Content.registerChapter({
    id: "ch-rd-05-final-chapter",
    moduleId: "reading",
    order: 5,
    title: "Ch. 5 — The Final Chapter",
    description: "Back at the library, the pages are home — but the story still needs to be read.",
    emoji: "📖",
    accent: "#ffd93d",
    requires: "ch-rd-04-figurative-falls",
    narrative: {
      intro: [
        { speaker: "narrator", text: "The library sparkles — every page is where it belongs. But the biggest book sits open, waiting." },
        { speaker: "reading",  text: "The scrambled pages carried a secret story, {NAME}. Only a careful reader can piece it together." },
        { speaker: "raccoon",  text: "Read with us! What is each page really telling us?" },
      ],
      outro: [
        { speaker: "reading",  text: "You did it! You read between the lines and found the heart of every page." },
        { speaker: "raccoon",  text: "Mystery solved! Come back any time, Uncle." },
        { speaker: "reading",  text: "Oh, I shall. And {NAME} — you're always welcome at my library." },
      ],
    },
    engine: "reading",
    engineConfig: { modes: ["comprehension"], problemsPerRound: 5 },
    rewards: {
      critterOnPass: "baby-lantern-bug",
      journalEntry:  "rd-ch-05",
    },
  });
})();
