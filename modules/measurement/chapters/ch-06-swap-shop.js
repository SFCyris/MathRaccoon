/*!
 * Measurement · Chapter 6 — The Swap Shop.
 * Builds on the new mea-op-unit-convert. CCSS 3.MD.A.1–2 + 4.MD.A.1.
 * Features Swap the Chipmunk — a new measurement-module character.
 */
(function () {
  MR.Content.registerChapter({
    id: "ch-mea-06-swap-shop",
    moduleId: "measurement",
    order: 6,
    title: "Ch. 6 — The Swap Shop",
    description: "Swap the chipmunk trades big units for small — and back again.",
    emoji: "🔄",
    accent: "#6ee7b7",
    requires: "ch-mea-05-pond-picnic",
    narrative: {
      intro: [
        { speaker: "narrator", text: "A tiny shop on the meadow's edge is piled with jars, scales, rulers, and clocks — all jumbled together." },
        { speaker: "swap",     text: "Welcome to the Swap Shop! I'm Swap the Chipmunk. I trade big units for little ones." },
        { speaker: "raccoon",  text: "What do you mean, Swap?" },
        { speaker: "swap",     text: "A customer needed 1 kilogram but I only had grams. Easy — 1 kilo = 1000 grams. I just MULTIPLY!" },
        { speaker: "swap",     text: "Then another wanted 2 hours but had 120 minutes. DIVIDE by 60 — two hours, done. {NAME}, help me keep my shelves straight today." },
      ],
      outro: [
        { speaker: "swap",     text: "Big → small, MULTIPLY. Small → big, DIVIDE. That's the whole trick!" },
        { speaker: "raccoon",  text: "Same amount, different unit. Still the same stuff." },
        { speaker: "swap",     text: "You earned a jar of my rarest goods, {NAME} — a full 1000 mL of honey. Or, you know, 1 liter." },
        { speaker: "narrator", text: "Swap winks, slides the jar across the counter, and hangs a new sign: 'Swap & {NAME} — Official Unit-Flippers.'" },
      ],
    },
    engine: "mixed",
    engineConfig: {
      problemsPerRound: 8,
      engines: ["arithmetic", "wordProblem"],
      arithmeticOps: ["×", "÷"],
      engineConfigs: {
        arithmetic:  { minFactor: 2, maxFactor: 12 },
        wordProblem: { topics: ["time", "capacity", "length"] },
      },
    },
    rewards: { critterOnPass: null, journalEntry: "mea-ch-06" },
  });
})();
