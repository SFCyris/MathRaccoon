/*!
 * Geometry · Chapter 4 — Quilt Fair.
 * Mixes geo-op-shapes + geo-op-perimeter + geo-op-area. CCSS 3.G.1 + 3.MD.7-8.
 */
(function () {
  MR.Content.registerChapter({
    id: "ch-geo-04-quilt-fair",
    moduleId: "geometry",
    order: 4,
    title: "Ch. 4 — Quilt Fair",
    description: "Stitch squares and triangles — sides, edges, and tiles together.",
    emoji: "🪡",
    accent: "#f472b6",
    requires: "ch-geo-03-garden-gala",
    narrative: {
      intro: [
        { speaker: "narrator",   text: "Quilts hang from every branch — each one a patchwork of shapes." },
        { speaker: "bunny",      text: "Count the sides on each patch, then fence its edge and tile its face." },
        { speaker: "raccoon",    text: "Shapes, perimeter, area — a full geometry bundle in every quilt." },
      ],
      outro: [
        { speaker: "bunny",      text: "The fair judges are amazed. You wove math into every patch, {NAME}!" },
        { speaker: "narrator",   text: "The quilts sway like friendly flags in the breeze." },
      ],
    },
    engine: "mixed",
    engineConfig: {
      problemsPerRound: 10,
      engines: ["arithmetic"],
      arithmeticOps: ["+", "×", "+"],
      engineConfigs: {
        arithmetic: { digits: 2, regroup: true, minFactor: 2, maxFactor: 10 },
      },
    },
    rewards: { critterOnPass: null, journalEntry: "geo-ch-04" },
  });
})();
