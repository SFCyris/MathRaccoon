/*!
 * Teaching op — Area (geometry).
 *
 * Distinct from op-perimeter (edges) by using the FILL metaphor — area is
 * about covering the inside with unit squares. The connection to
 * multiplication (rows × cols) is built slowly, after the tile-counting
 * feel is established. This prevents "length × width" from being a
 * memorized rule with no picture behind it.
 *
 * Uses areaGrid viz.
 */
(function () {
  MR.Content.registerOp({
    id: "geo-op-area",
    moduleId: "geometry",
    label: "Area",
    emoji: "🟨",
    tagline: "Cover the inside.",
    accent: "#ffd93d",
    strategies: [
      {
        id: "tile-the-inside",
        title: "Tile the Inside",
        subtitle: "Count every square.",
        emoji: "🔲",
        idea: {
          hook: "Area is how much SPACE a shape covers. To measure it, fill the shape with little unit squares (like floor tiles) and count them. Perimeter walks the edge; area fills the middle.",
          viz: { type: "areaGrid", params: { rows: 3, cols: 4, label: "12 tiles fill this rectangle" } },
          caption: "Each tile is a square unit. Count them all.",
        },
        watchMe: [
          { text: "Here's a rectangle. We'll tile it with 1×1 squares.",
            viz: { type: "areaGrid", params: { rows: 2, cols: 5, filled: 0 } } },
          { text: "Fill the first row: 5 tiles.",
            viz: { type: "areaGrid", params: { rows: 2, cols: 5, filled: 5 } } },
          { text: "Fill the second row: 5 more tiles. Total so far: 10.",
            viz: { type: "areaGrid", params: { rows: 2, cols: 5, filled: 10, label: "10 tiles" } } },
          { text: "Area is 10 square units. We count the FILL, not the edges.",
            equation: "2 × 5 = 10 sq units" },
        ],
        practice: [
          {
            prompt: "Tap each tile to count it. How many tiles fill this 3-by-4 rectangle?",
            viz: { type: "interactiveAreaGrid", params: { rows: 3, cols: 4, targetCount: 12, label: "Tap tiles to fill them. The counter shows how many you've filled." } },
            options: [7, 12, 14],
            answer: 12,
            hint: "Fill every tile, then read the counter.",
          },
          {
            prompt: "A square is 5 by 5. How many unit tiles inside?",
            viz: { type: "areaGrid", params: { rows: 5, cols: 5 } },
            options: [10, 20, 25],
            answer: 25,
          },
        ],
      },
      {
        id: "rows-times-cols",
        title: "Skip the Counting",
        subtitle: "Rows × columns = area.",
        emoji: "✖️",
        idea: {
          hook: "Once you've tiled a few rectangles, you might notice something. You don't need to count EVERY tile — you just need to count one row, then multiply by how many rows.",
          viz: { type: "areaGrid", params: { rows: 4, cols: 6, label: "6 in each row × 4 rows = 24" } },
          caption: "The area grid IS a multiplication array.",
        },
        watchMe: [
          { text: "Rectangle: 3 rows, 7 columns. How many tiles?",
            viz: { type: "areaGrid", params: { rows: 3, cols: 7 } } },
          { text: "Each row has 7 tiles.",
            equation: "7 per row" },
          { text: "There are 3 rows. So: 7 × 3 = 21 tiles total.",
            equation: "7 × 3 = 21",
            viz: { type: "areaGrid", params: { rows: 3, cols: 7, label: "7 × 3 = 21 square units" } } },
          { text: "That's why area of a rectangle = length × width. You're just multiplying rows × columns." },
        ],
        practice: [
          {
            prompt: "What is the area of a 6-by-4 rectangle?",
            viz: { type: "areaGrid", params: { rows: 4, cols: 6 } },
            options: [10, 20, 24],
            answer: 24,
            hint: "6 × 4 = 24.",
          },
          {
            prompt: "A garden is 8 meters long and 5 meters wide. What's its area?",
            viz: { type: "areaGrid", params: { rows: 5, cols: 8, label: "A garden, 8 m × 5 m" } },
            options: ["13 sq m", "40 sq m", "80 sq m"],
            answer: "40 sq m",
            hint: "8 × 5 = 40.",
          },
        ],
      },
      {
        id: "area-vs-perimeter",
        title: "Area or Perimeter?",
        subtitle: "Spot the difference.",
        emoji: "🆚",
        idea: {
          hook: "Two shapes can have the SAME perimeter but different areas. Or the same area with different perimeters! They measure different things: perimeter is the walk, area is the fill.",
          viz: { type: "areaGrid", params: { rows: 2, cols: 6, label: "Rectangle: 2 by 6" } },
          caption: "Compare: a 3×4 rectangle has the same PERIMETER (14) as a 2×5, but a different area.",
        },
        watchMe: [
          { text: "Rectangle A: 2 by 6. Perimeter = 2 + 6 + 2 + 6 = 16. Area = 12.",
            viz: { type: "areaGrid", params: { rows: 2, cols: 6 } },
            equation: "Rectangle A — Perimeter: 16. Area: 12" },
          { text: "Rectangle B: 3 by 4. Perimeter = 3 + 4 + 3 + 4 = 14. Area = 12.",
            viz: { type: "areaGrid", params: { rows: 3, cols: 4 } },
            equation: "Rectangle B — Perimeter: 14. Area: 12" },
          { text: "Both have the same area (12 squares inside) but different perimeters (16 vs 14 around the edge)." },
          { text: "Question words help: 'how far around' = perimeter. 'How much inside' / 'how big a floor' = area." },
        ],
        practice: [
          {
            prompt: "A rug is 4 feet by 6 feet. We want to know how much FLOOR it COVERS. Area or perimeter?",
            viz: { type: "areaGrid", params: { rows: 4, cols: 6, label: "Floor coverage — fill the inside" } },
            options: ["area", "perimeter"],
            answer: "area",
            hint: "'How much floor it covers' = the inside fill = area.",
          },
          {
            prompt: "A picture frame needs wood ALL AROUND the edge. Area or perimeter?",
            viz: { type: "perimeterShape", params: { w: 6, h: 4, label: "Wood around the edge" } },
            options: ["area", "perimeter"],
            answer: "perimeter",
            hint: "All around the edge = the walk around = perimeter.",
          },
          {
            prompt: "What's the AREA of a 5-by-5 square?",
            viz: { type: "areaGrid", params: { rows: 5, cols: 5 } },
            options: [10, 20, 25],
            answer: 25,
            hint: "5 × 5 = 25 square units.",
          },
          {
            prompt: "Detective: this rectangle is 4 × 5. What's its area?",
            viz: { type: "areaGrid", params: { rows: 4, cols: 5 } },
            options: [9, 18, 20],
            answer: 20,
            hint: "4 rows of 5 tiles. 4 × 5 = 20.",
          },
          {
            prompt: "Detective: a rectangle has AREA 12. Which dimensions could it have?",
            viz: { type: "shapeGrid", params: { shapes: [{ kind: "rectangle", name: "Area = 12. Find the dimensions." }] } },
            options: ["3 by 4", "5 by 5", "2 by 7"],
            answer: "3 by 4",
            hint: "3 × 4 = 12. 5×5 = 25. 2×7 = 14.",
          },
        ],
      },
    ],
  });
})();
