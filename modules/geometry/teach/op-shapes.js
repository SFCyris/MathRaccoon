/*!
 * Teaching op — Naming shapes (geometry).
 */
(function () {
  MR.Content.registerOp({
    id: "geo-op-shapes",
    moduleId: "geometry",
    label: "Naming Shapes",
    emoji: "🔷",
    tagline: "Sides, corners, families.",
    accent: "#6ee7b7",
    strategies: [
      {
        id: "count-sides",
        title: "Count the Sides",
        subtitle: "Every polygon has a number.",
        emoji: "🔢",
        idea: {
          hook: "Polygons are shapes made of straight lines. You can tell them apart by counting sides.",
          viz: { type: "shapeGrid", params: { shapes: [
            { kind: "triangle", name: "Triangle · 3" },
            { kind: "square", name: "Square · 4" },
            { kind: "pentagon", name: "Pentagon · 5" },
            { kind: "hexagon", name: "Hexagon · 6" },
          ] } },
          caption: "Tri = 3. Quad = 4. Penta = 5. Hexa = 6."
        },
        watchMe: [
          { text: "Let's look at a triangle. How many sides?",
            viz: { type: "shapeGrid", params: { shapes: [{ kind: "triangle", name: "3 sides" }] } } },
          { text: "Three sides. The name tri-angle means three angles.",
            equation: "Triangle = 3 sides" },
          { text: "A pentagon has 5 sides.",
            viz: { type: "shapeGrid", params: { shapes: [{ kind: "pentagon", name: "5 sides" }] } } },
        ],
        practice: [
          {
            prompt: "Which shape has 6 sides?",
            options: ["triangle", "pentagon", "hexagon"],
            answer: "hexagon",
          },
          {
            prompt: "A shape with 4 straight sides is a…",
            options: ["triangle", "quadrilateral", "pentagon"],
            answer: "quadrilateral",
            hint: "Quad = 4."
          },
        ],
      },
      {
        id: "special-quads",
        title: "Special Quadrilaterals",
        subtitle: "Four sides come in families.",
        emoji: "🔶",
        idea: {
          hook: "All four-sided shapes are quadrilaterals, but some have special names: square, rectangle, rhombus, trapezoid.",
          viz: { type: "shapeGrid", params: { shapes: [
            { kind: "square", name: "Square" },
            { kind: "rectangle", name: "Rectangle" },
            { kind: "rhombus", name: "Rhombus" },
            { kind: "trapezoid", name: "Trapezoid" },
          ] } },
        },
        watchMe: [
          { text: "A square has 4 equal sides and 4 right angles.",
            viz: { type: "shapeGrid", params: { shapes: [{ kind: "square", name: "Square" }] } } },
          { text: "A rectangle has 4 right angles too, but two pairs of sides (long and short).",
            viz: { type: "shapeGrid", params: { shapes: [{ kind: "rectangle", name: "Rectangle" }] } } },
          { text: "A rhombus has 4 equal sides but not always right angles.",
            viz: { type: "shapeGrid", params: { shapes: [{ kind: "rhombus", name: "Rhombus" }] } } },
        ],
        practice: [
          {
            prompt: "Which shape has 4 equal sides AND 4 right angles?",
            options: ["rectangle", "square", "trapezoid"],
            answer: "square",
          },
          {
            prompt: "A shape with only one pair of parallel sides is a…",
            options: ["rhombus", "trapezoid", "rectangle"],
            answer: "trapezoid",
          },
        ],
      },
    ],
  });
})();
