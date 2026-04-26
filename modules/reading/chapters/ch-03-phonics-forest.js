/*!
 * Reading · Chapter 3 — The Phonics Forest
 */
(function () {
  MR.Content.registerChapter({
    id: "ch-rd-03-phonics-forest",
    moduleId: "reading",
    order: 3,
    title: "Ch. 3 — The Phonics Forest",
    description: "Letters whisper through the trees — some talk, some stay silent.",
    emoji: "🌲",
    accent: "#9be8a4",
    requires: "ch-rd-02-grammar-gate",
    narrative: {
      intro: [
        { speaker: "narrator", text: "Tall pines lean in close. The leaves rustle like pages turning." },
        { speaker: "reading",  text: "This forest is full of tricky spellings. Silent letters hide in the ferns. Vowel teams rustle overhead." },
        { speaker: "reading",  text: "Listen carefully, {NAME}. Which letters speak, and which stay quiet?" },
      ],
      outro: [
        { speaker: "raccoon",  text: "Look — pages drifting on the mist!" },
        { speaker: "reading",  text: "That way lies Figurative Falls. The clues are close together now." },
      ],
    },
    engine: "reading",
    engineConfig: { modes: ["phonics"], problemsPerRound: 6 },
    rewards: {
      critterOnPass: "baby-bunny",
      journalEntry:  "rd-ch-03",
    },
  });
})();
