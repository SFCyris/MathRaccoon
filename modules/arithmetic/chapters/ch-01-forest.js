/*!
 * Arithmetic · Chapter 1 — Into Hidden Valley
 * Ported narrative from v1 story.js chapter 1.
 */
(function () {
  MR.Content.registerChapter({
    id: "ch-ari-01-forest",
    moduleId: "arithmetic",
    order: 1,
    title: "Ch. 1 — Into Hidden Valley",
    description: "{NAME} follows a trail of acorns into a valley glowing with adventure.",
    emoji: "🌲",
    accent: "#6ee7b7",
    requires: null,
    narrative: {
      intro: [
        { speaker: "narrator", text: "{NAME} ducks under a curtain of ivy and — poof! — sunshine splashes across Hidden Valley." },
        { speaker: "raccoon",  text: "I'm Math Raccoon! Help me count the acorns on the path?" },
      ],
      outro: [
        { speaker: "narrator", text: "The acorns sparkle as {NAME} adds them up." },
        { speaker: "raccoon",  text: "You're a natural! Come meet the rest of the valley." },
      ],
    },
    engine: "arithmetic",
    engineConfig: { op: "+", digits: 2, regroup: false, problemsPerRound: 6 },
    rewards: {
      critterOnPass: "baby-raccoon",
      journalEntry:  "ari-ch-01",
    },
  });
})();
