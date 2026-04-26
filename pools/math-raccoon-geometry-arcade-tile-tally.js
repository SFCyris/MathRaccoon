/*
 * Pool: Tangram Tally (Geometry · Arcade)
 * =======================================
 * Click cells in a rows×cols grid to tile it completely, then count.
 * Uses dragDrop engine, kind: "shapeCompose".
 *
 * CCSS 3.MD.7 — "Find the area of a rectangle by tiling… and relate
 * tiling to multiplication."
 *
 * FORMAT:
 *   {
 *     "kind": "shapeCompose",
 *     "prompt": "...",
 *     "rows": 3, "cols": 4,
 *     "answer": 12,      // rows × cols
 *     "hint":   "..."
 *   }
 */
MR.Pools.register({
  "id": "geo-arcade-tile-tally",
  "title": "Tangram Tally",
  "askedPerRound": 6,
  "questions": [
    { "kind": "shapeCompose",
      "prompt": "Tile this 2 × 3 rectangle. How many tiles?",
      "rows": 2, "cols": 3, "answer": 6,
      "hint": "2 rows of 3 = 6 tiles." },

    { "kind": "shapeCompose",
      "prompt": "Fill the 3 × 3 square.",
      "rows": 3, "cols": 3, "answer": 9,
      "hint": "3 × 3 = 9." },

    { "kind": "shapeCompose",
      "prompt": "How many tiles for a 2 × 5 rug?",
      "rows": 2, "cols": 5, "answer": 10,
      "hint": "2 rows of 5 = 10." },

    { "kind": "shapeCompose",
      "prompt": "Tile the 3 × 4 patio.",
      "rows": 3, "cols": 4, "answer": 12,
      "hint": "3 × 4 = 12 tiles." },

    { "kind": "shapeCompose",
      "prompt": "Fill this 4 × 4 checkerboard.",
      "rows": 4, "cols": 4, "answer": 16,
      "hint": "4 × 4 = 16." },

    { "kind": "shapeCompose",
      "prompt": "A 3 × 5 garden bed. How many tiles?",
      "rows": 3, "cols": 5, "answer": 15,
      "hint": "3 × 5 = 15." },

    { "kind": "shapeCompose",
      "prompt": "Tile the 4 × 5 kitchen floor.",
      "rows": 4, "cols": 5, "answer": 20,
      "hint": "4 × 5 = 20." },

    { "kind": "shapeCompose",
      "prompt": "How many tiles for a 2 × 6 strip?",
      "rows": 2, "cols": 6, "answer": 12,
      "hint": "2 × 6 = 12." },

    { "kind": "shapeCompose",
      "prompt": "Fill a 3 × 6 sidewalk.",
      "rows": 3, "cols": 6, "answer": 18,
      "hint": "3 × 6 = 18." },

    { "kind": "shapeCompose",
      "prompt": "Tile this 5 × 5 puzzle.",
      "rows": 5, "cols": 5, "answer": 25,
      "hint": "5 × 5 = 25." },

    { "kind": "shapeCompose",
      "prompt": "A 4 × 6 bathroom. How many tiles?",
      "rows": 4, "cols": 6, "answer": 24,
      "hint": "4 × 6 = 24." },

    { "kind": "shapeCompose",
      "prompt": "Fill the 2 × 7 hallway.",
      "rows": 2, "cols": 7, "answer": 14,
      "hint": "2 × 7 = 14." },

    { "kind": "shapeCompose",
      "prompt": "How many tiles for a 3 × 7 rug?",
      "rows": 3, "cols": 7, "answer": 21,
      "hint": "3 × 7 = 21." },

    { "kind": "shapeCompose",
      "prompt": "Tile the 5 × 6 shed floor.",
      "rows": 5, "cols": 6, "answer": 30,
      "hint": "5 × 6 = 30." },

    { "kind": "shapeCompose",
      "prompt": "Fill the 2 × 4 table top.",
      "rows": 2, "cols": 4, "answer": 8,
      "hint": "2 × 4 = 8." },

    { "kind": "shapeCompose",
      "prompt": "Tile this 3 × 8 bench.",
      "rows": 3, "cols": 8, "answer": 24,
      "hint": "3 × 8 = 24." },

    { "kind": "shapeCompose",
      "prompt": "A 4 × 7 yard. How many tiles?",
      "rows": 4, "cols": 7, "answer": 28,
      "hint": "4 × 7 = 28." },

    { "kind": "shapeCompose",
      "prompt": "Fill this 5 × 4 rug.",
      "rows": 5, "cols": 4, "answer": 20,
      "hint": "5 × 4 = 20." },

    { "kind": "shapeCompose",
      "prompt": "Tile the 6 × 6 puzzle.",
      "rows": 6, "cols": 6, "answer": 36,
      "hint": "6 × 6 = 36." },

    { "kind": "shapeCompose",
      "prompt": "How many tiles for a 2 × 8 mat?",
      "rows": 2, "cols": 8, "answer": 16,
      "hint": "2 × 8 = 16." },

    { "kind": "shapeCompose",
      "prompt": "Fill this 3 × 2 stepping-stone path.",
      "rows": 3, "cols": 2, "answer": 6,
      "hint": "3 × 2 = 6." },

    { "kind": "shapeCompose",
      "prompt": "A 4 × 4 checkerboard. How many tiles?",
      "rows": 4, "cols": 4, "answer": 16,
      "hint": "4 × 4 = 16." },

    { "kind": "shapeCompose",
      "prompt": "Fill this 5 × 7 garden.",
      "rows": 5, "cols": 7, "answer": 35,
      "hint": "5 × 7 = 35." },

    { "kind": "shapeCompose",
      "prompt": "How many tiles for a 1 × 9 strip?",
      "rows": 1, "cols": 9, "answer": 9,
      "hint": "Only 1 row — 9 tiles." },

    { "kind": "shapeCompose",
      "prompt": "Tile the 6 × 3 poster.",
      "rows": 6, "cols": 3, "answer": 18,
      "hint": "6 × 3 = 18." },
  ],
});
