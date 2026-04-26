/*!
 * Geometry · Chapter 1 — Shape Scout.
 * Builds on geo-op-shapes. CCSS 3.G.1 (attributes of quadrilaterals).
 */
(function () {
  MR.Content.registerChapter({
    id: "ch-geo-01-shape-scout",
    moduleId: "geometry",
    order: 1,
    title: "Ch. 1 — Shape Scout",
    description: "Sketch shapes and tally their sides with the turtle.",
    emoji: "🔷",
    accent: "#7dd3fc",
    requires: null,
    narrative: {
      intro: [
        { speaker: "narrator", text: "A friendly turtle sketches shapes in the sand with the end of her walking stick." },
        { speaker: "turtle",   text: "Triangles, squares, rectangles — each has its own number of sides, {NAME}." },
        { speaker: "raccoon",  text: "Count sides, count corners. That's how we name a shape." },
      ],
      outro: [
        { speaker: "turtle",   text: "Every shape is a quiet little puzzle. You spotted them all." },
        { speaker: "narrator", text: "The turtle blinks slowly and smiles." },
      ],
    },
    engine: "arithmetic",
    engineConfig: { op: "+", digits: 1, problemsPerRound: 5 },
    rewards: { critterOnPass: null, journalEntry: "geo-ch-01" },
  });
})();
