/*!
 * Geometry · Chapter 2 — Tile Town.
 * Builds on geo-op-area. CCSS 3.MD.7 (area via multiplication).
 */
(function () {
  MR.Content.registerChapter({
    id: "ch-geo-02-tile-town",
    moduleId: "geometry",
    order: 2,
    title: "Ch. 2 — Tile Town",
    description: "Cover the town square with tiles — rows times columns.",
    emoji: "🟦",
    accent: "#a78bfa",
    requires: "ch-geo-01-shape-scout",
    narrative: {
      intro: [
        { speaker: "narrator", text: "The builder-badger lays tiles in neat rows across the town square." },
        { speaker: "builder",  text: "Rows times columns, {NAME}. That's area in a single multiplication." },
        { speaker: "raccoon",  text: "When the shape is a rectangle, area is just an array waiting to be counted." },
      ],
      outro: [
        { speaker: "builder",  text: "The square is full. Geometry is arithmetic with a shape on top." },
        { speaker: "narrator", text: "The tiles gleam in the afternoon sun." },
      ],
    },
    engine: "arithmetic",
    engineConfig: { op: "×", minFactor: 2, maxFactor: 8, problemsPerRound: 5 },
    rewards: { critterOnPass: null, journalEntry: "geo-ch-02" },
  });
})();
