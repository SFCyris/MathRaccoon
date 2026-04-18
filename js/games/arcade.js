/**
 * arcade.js — 6 warm-up arcade games using shared engines via GameRunner.
 *
 * Progression chain: addition → subtraction → multiplication → division
 *                  → fraction → placeValue. Each needs 75% on the prior to unlock.
 * No create() is provided; app.js sees `engine` and runs MR.GameRunner.
 */
(function () {
  const R = window.MR.Games;

  R.register({
    id: "addition",
    title: "Bubble Blocks",
    description: "Add with colorful base-10 blocks. 2–3 digit sums.",
    emoji: "🧱",
    accent: "#6ee7b7",
    grade: "Gr. 3",
    mode: "arcade",
    engine: "addition",
    config: { problemsPerRound: 8, digits: 2, allowRegroup: true },
    unlocks: "subtraction",
  });

  R.register({
    id: "subtraction",
    title: "Treasure Trail",
    description: "Hop along a number line to find the difference.",
    emoji: "🗺️",
    accent: "#7dd3fc",
    grade: "Gr. 3",
    mode: "arcade",
    engine: "subtraction",
    config: { problemsPerRound: 8, digits: 2, allowRegroup: true },
    requiresPass: "addition",
    unlocks: "multiplication",
  });

  R.register({
    id: "multiplication",
    title: "Multiply Mountain",
    description: "Equal groups and arrays up to 10 × 10.",
    emoji: "🏔️",
    accent: "#ff7a93",
    grade: "Gr. 3",
    mode: "arcade",
    engine: "multiplication",
    config: { problemsPerRound: 8, maxFactor: 10 },
    requiresPass: "subtraction",
    unlocks: "division",
  });

  R.register({
    id: "division",
    title: "Share Shack",
    description: "Share snacks evenly. Division with fact families.",
    emoji: "🍪",
    accent: "#ffd93d",
    grade: "Gr. 3",
    mode: "arcade",
    engine: "division",
    config: { problemsPerRound: 8, maxDivisor: 10 },
    requiresPass: "multiplication",
    unlocks: "fraction",
  });

  R.register({
    id: "fraction",
    title: "Pie Pals",
    description: "Name, compare, and match fractions with pies and bars.",
    emoji: "🥧",
    accent: "#c4b5fd",
    grade: "Gr. 3–4",
    mode: "arcade",
    engine: "fraction",
    config: { problemsPerRound: 8, maxDenom: 8 },
    requiresPass: "division",
    unlocks: "placeValue",
  });

  R.register({
    id: "placeValue",
    title: "Place Parade",
    description: "Read big numbers, expand them, and round like a pro.",
    emoji: "🔢",
    accent: "#ffb077",
    grade: "Gr. 4",
    mode: "arcade",
    engine: "placeValue",
    config: { problemsPerRound: 8, digits: 4 },
    requiresPass: "fraction",
  });
})();
