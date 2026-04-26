/*!
 * Arithmetic · Chapter 10 — Puppy Picnic
 */
(function () {
  MR.Content.registerChapter({
    id: "ch-ari-10-puppy-picnic",
    moduleId: "arithmetic",
    order: 10,
    title: "Ch. 10 — Puppy Picnic",
    description: "Share sandwiches among puppies with division.",
    emoji: "🐶",
    accent: "#ffd93d",
    requires: "ch-ari-09-fireflies",
    narrative: {
      intro: [
        { speaker: "narrator", text: "A pile of wriggly puppies spots {NAME} with a picnic basket." },
        { speaker: "puppies",  text: "Share the sandwiches evenly so everyone wags equally!" },
      ],
      outro: [
        { speaker: "narrator", text: "Tails wag in unison." },
        { speaker: "puppies",  text: "Puppy approved!" },
      ],
    },
    engine: "arithmetic",
    engineConfig: { op: "÷", minFactor: 2, maxFactor: 10, problemsPerRound: 6 },
    rewards: { critterOnPass: "baby-puppy", journalEntry: "ari-ch-10" },
  });
})();
