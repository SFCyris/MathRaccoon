/*!
 * Reading · Chapter 2 — The Grammar Gate
 */
(function () {
  MR.Content.registerChapter({
    id: "ch-rd-02-grammar-gate",
    moduleId: "reading",
    order: 2,
    title: "Ch. 2 — The Grammar Gate",
    description: "A stone gate with a sentence carved into it — but the words are jumbled.",
    emoji: "🚪",
    accent: "#8fd8f0",
    requires: "ch-rd-01-arrival",
    narrative: {
      intro: [
        { speaker: "narrator", text: "The trail leads to a tall stone gate. Words are carved across it — verbs, nouns, adjectives — but in the wrong places." },
        { speaker: "reading",  text: "The gate won't open until every word knows its job. Help me, {NAME}?" },
        { speaker: "raccoon",  text: "I'll shine my lantern so you can read it." },
      ],
      outro: [
        { speaker: "reading",  text: "The gate swings open! You knew your nouns from your verbs." },
        { speaker: "narrator", text: "Beyond the gate, a trail of pages flutters into the Phonics Forest." },
      ],
    },
    engine: "reading",
    engineConfig: { modes: ["grammar"], problemsPerRound: 6 },
    rewards: {
      critterOnPass: "baby-quill-mouse",
      journalEntry:  "rd-ch-02",
    },
  });
})();
