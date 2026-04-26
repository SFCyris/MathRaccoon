/*!
 * Geometry · Chapter 3 — Garden Gala.
 * Mixes geo-op-perimeter + geo-op-area. CCSS 3.MD.7 + 3.MD.8.
 */
(function () {
  MR.Content.registerChapter({
    id: "ch-geo-03-garden-gala",
    moduleId: "geometry",
    order: 3,
    title: "Ch. 3 — Garden Gala",
    description: "Fence the edge, tile the inside — perimeter AND area.",
    emoji: "🌻",
    accent: "#fcd34d",
    requires: "ch-geo-02-tile-town",
    narrative: {
      intro: [
        { speaker: "narrator", text: "A bumblebee hums over rows of sunflowers. The garden needs tending." },
        { speaker: "bee",      text: "Two jobs, {NAME}: fence the edge (perimeter) AND tile the paths (area)." },
        { speaker: "raccoon",  text: "Perimeter walks AROUND. Area fills INSIDE. Same shape, two numbers." },
      ],
      outro: [
        { speaker: "bee",      text: "Fence and tiles — both exactly right. The bees approve!" },
        { speaker: "narrator", text: "The sunflowers bob as if applauding." },
      ],
    },
    engine: "mixed",
    engineConfig: {
      problemsPerRound: 8,
      engines: ["arithmetic"],
      arithmeticOps: ["+", "×"],
      engineConfigs: {
        arithmetic: { digits: 2, regroup: false, minFactor: 2, maxFactor: 10 },
      },
    },
    rewards: { critterOnPass: null, journalEntry: "geo-ch-03" },
  });
})();
