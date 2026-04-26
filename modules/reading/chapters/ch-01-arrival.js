/*!
 * Reading · Chapter 1 — The Arrival
 * Mystery arc: "The Scrambled Library"
 * Reading Raccoon visits with a mystery the pair must solve together.
 */
(function () {
  MR.Content.registerChapter({
    id: "ch-rd-01-arrival",
    moduleId: "reading",
    order: 1,
    title: "Ch. 1 — The Arrival",
    description: "An older raccoon with round glasses arrives at Hidden Valley clutching a torn page.",
    emoji: "🦝",
    accent: "#b78af0",
    requires: null,
    narrative: {
      intro: [
        { speaker: "narrator", text: "{NAME} hears a knock at the hollow. Tap-tap-tap. Math Raccoon peeks out." },
        { speaker: "raccoon",  text: "Uncle Reader! You came!" },
        { speaker: "narrator", text: "An older raccoon steps in. Round glasses. A thick book. A torn page fluttering in his paw." },
        { speaker: "reading",  text: "Hello, {NAME}. I need your help. My library is… scrambled. Pages from every book are mixed together — and this torn page is the only clue." },
        { speaker: "reading",  text: "The wind took them, but a word is missing from this page. Can you tell me what fits?" },
      ],
      outro: [
        { speaker: "reading",  text: "Wonderful! You read the clues like a detective." },
        { speaker: "raccoon",  text: "So where do we start, Uncle?" },
        { speaker: "reading",  text: "We follow the pages — across the valley, through the Grammar Gate, Phonics Forest, and Figurative Falls. Then back to the library." },
      ],
    },
    engine: "reading",
    engineConfig: { modes: ["vocabulary"], problemsPerRound: 6 },
    rewards: {
      critterOnPass: "baby-bookworm",
      journalEntry:  "rd-ch-01",
    },
  });
})();
