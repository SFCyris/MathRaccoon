/*!
 * Geometry · Chapter 5 — Quadrilateral Quest.
 * Builds on the new geo-op-quadrilaterals. CCSS 3.G.A.1.
 * Features Quilly the Hedgehog King of Shapes.
 */
(function () {
  MR.Content.registerChapter({
    id: "ch-geo-05-quadrilateral-quest",
    moduleId: "geometry",
    order: 5,
    title: "Ch. 5 — Quadrilateral Quest",
    description: "King Quilly the Hedgehog rules a kingdom of four-sided shapes. Sort them into their proper families.",
    emoji: "🔷",
    accent: "#a78bfa",
    requires: "ch-geo-04-quilt-fair",
    narrative: {
      intro: [
        { speaker: "narrator", text: "A great banner waves above a clearing — four sides, stitched with purple thread." },
        { speaker: "quilly",   text: "Halt! I am Quilly, King of Four Sides! Who dares enter my kingdom, {NAME}?" },
        { speaker: "raccoon",  text: "We come in peace, King Quilly. We heard your shapes need sorting." },
        { speaker: "quilly",   text: "Indeed! My royal rhombuses have wandered into the rectangle ranks. And worst of all — a SQUARE claims to be BOTH. Is it possible?" },
        { speaker: "raccoon",  text: "It is! Every square IS a rectangle AND a rhombus — same family tree. Let's sort them out, {NAME}." },
      ],
      outro: [
        { speaker: "quilly",   text: "Astonishing! Every square is a rectangle. Every rectangle is a parallelogram. A family of families!" },
        { speaker: "raccoon",  text: "That's the quadrilateral hierarchy — big family, smaller families inside." },
        { speaker: "quilly",   text: "You are welcome in my kingdom any time, {NAME}. Four sides, four thousand thanks." },
        { speaker: "narrator", text: "Quilly pins a tiny medal shaped like a rhombus onto your collar." },
      ],
    },
    engine: "mixed",
    engineConfig: {
      problemsPerRound: 8,
      engines: ["wordProblem"],
      engineConfigs: {
        wordProblem: { topics: ["shapes"] },
      },
    },
    rewards: { critterOnPass: null, journalEntry: "geo-ch-05" },
  });
})();
