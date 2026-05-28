/*!
 * Teaching op — Quadrilateral Families (geometry).
 *
 * CCSS 3.G.A.1: "Understand that shapes in different categories may share
 * attributes (e.g., having four sides), and that the shared attributes can
 * define a larger category (e.g., quadrilaterals). Recognize rhombuses,
 * rectangles, and squares as examples of quadrilaterals, and draw examples
 * of quadrilaterals that do not belong to any of these subcategories."
 *
 * This op goes DEEPER than op-shapes' "Special Quadrilaterals" section —
 * it focuses on the HIERARCHY and the shared-attribute argument (every
 * square is a rectangle, every rectangle is a parallelogram, …).
 */
(function () {
  MR.Content.registerOp({
    id: "geo-op-quadrilaterals",
    moduleId: "geometry",
    label: "Quadrilateral Families",
    emoji: "🔷",
    tagline: "Every square is a rectangle.",
    accent: "#a78bfa",
    strategies: [
      {
        id: "shared-attributes",
        title: "Four Sides Make a Family",
        subtitle: "All quadrilaterals share ONE big rule.",
        emoji: "4️⃣",
        idea: {
          hook: "A quadrilateral is any closed shape with exactly 4 straight sides. Squares, rectangles, rhombuses, trapezoids — they're all in the family. That's the ONE rule.",
          viz: { type: "quadShape", params: { kind: "square", label: "All quadrilaterals have 4 sides", highlight: "sides" } },
        },
        watchMe: [
          { text: "A square has 4 sides. It's a quadrilateral.",
            viz: { type: "quadShape", params: { kind: "square", label: "Square (4 sides)" } } },
          { text: "A rectangle has 4 sides. It's a quadrilateral too.",
            viz: { type: "quadShape", params: { kind: "rectangle", label: "Rectangle (4 sides)" } } },
          { text: "A rhombus has 4 sides. Also a quadrilateral.",
            viz: { type: "quadShape", params: { kind: "rhombus", label: "Rhombus (4 sides)" } } },
          { text: "A trapezoid has 4 sides. Quadrilateral family.",
            viz: { type: "quadShape", params: { kind: "trapezoid", label: "Trapezoid (4 sides)" } } },
        ],
        practice: [
          {
            prompt: "Look at the three shapes below. Which one is NOT a quadrilateral?",
            viz: { type: "shapeGrid", params: { shapes: [{ kind: "square", name: "square" }, { kind: "triangle", name: "triangle" }, { kind: "rhombus", name: "rhombus" }] } },
            options: ["square", "triangle", "rhombus"],
            answer: "triangle",
            hint: "Count the sides of each shape. Which one does not have 4?",
          },
          {
            prompt: "How many sides does EVERY quadrilateral have?",
            viz: { type: "shapeGrid", params: { shapes: [{ kind: "square", name: "" }, { kind: "rectangle", name: "" }, { kind: "trapezoid", name: "" }] } },
            options: [3, 4, 5],
            answer: 4,
            hint: "Count the sides on each shape shown.",
          },
        ],
      },
      {
        id: "parallel-vs-right",
        title: "Parallel Sides & Right Angles",
        subtitle: "Two things that split the family.",
        emoji: "📐",
        idea: {
          hook: "Quadrilaterals split into groups by TWO things: (1) how many pairs of parallel sides they have, and (2) whether the corners are right angles (like the corner of a book).",
          viz: { type: "quadShape", params: { kind: "rectangle", label: "Rectangle: 2 pairs parallel + 4 right angles", highlight: "angles" } },
        },
        watchMe: [
          { text: "A RECTANGLE has 2 pairs of parallel sides AND 4 right angles. Parallel sides go the same direction — like train tracks.",
            viz: { type: "quadShape", params: { kind: "rectangle", label: "Parallel sides — like train tracks", highlight: "parallel" } } },
          { text: "A PARALLELOGRAM has 2 pairs of parallel sides but NOT right angles.",
            viz: { type: "quadShape", params: { kind: "parallelogram", label: "Parallelogram" } } },
          { text: "A TRAPEZOID has only 1 pair of parallel sides.",
            viz: { type: "quadShape", params: { kind: "trapezoid", label: "Trapezoid (1 pair parallel)" } } },
          { text: "A RHOMBUS has 4 equal sides and 2 pairs parallel — like a tilted square.",
            viz: { type: "quadShape", params: { kind: "rhombus", label: "Rhombus", highlight: "sides" } } },
        ],
        practice: [
          {
            prompt: "Which shape has 4 right angles AND all 4 sides equal?",
            viz: { type: "shapeGrid", params: { shapes: [{ kind: "rhombus", name: "rhombus" }, { kind: "rectangle", name: "rectangle" }, { kind: "square", name: "square" }] } },
            options: ["rhombus", "rectangle", "square"],
            answer: "square",
            hint: "Look for square corners AND equal sides on the same shape.",
          },
          {
            prompt: "A shape has only 1 pair of parallel sides. Which one is it?",
            viz: { type: "shapeGrid", params: { shapes: [{ kind: "trapezoid", name: "trapezoid" }, { kind: "rhombus", name: "rhombus" }, { kind: "square", name: "square" }] } },
            options: ["trapezoid", "rhombus", "square"],
            answer: "trapezoid",
            hint: "Parallel sides go the same direction. Find the shape with just ONE pair.",
          },
        ],
      },
      {
        id: "hierarchy",
        title: "Every Square Is a Rectangle",
        subtitle: "One shape can belong to MANY groups.",
        emoji: "🎯",
        idea: {
          hook: "A square has 4 right angles. It also has 2 pairs of parallel sides. AND it has 4 equal sides. So it passes every test: rectangle, rhombus, parallelogram, quadrilateral. A square is all of those — it just has the most specific name.",
          viz: { type: "quadShape", params: { kind: "square", label: "A square is ALSO a rectangle, rhombus, parallelogram, AND quadrilateral" } },
        },
        watchMe: [
          { text: "Every rectangle has 2 pairs of parallel sides — so every rectangle is a PARALLELOGRAM.",
            viz: { type: "quadShape", params: { kind: "rectangle", label: "Every rectangle is a parallelogram" } } },
          { text: "Every square is a rectangle (has 4 right angles) AND a rhombus (has 4 equal sides).",
            viz: { type: "quadShape", params: { kind: "square", label: "A square is in BOTH families — rectangles AND rhombuses" } } },
          { text: "BUT — not every rectangle is a square. A long thin rectangle is not a square.",
            viz: { type: "quadShape", params: { kind: "rectangle", label: "Rectangle (not a square)" } } },
          { text: "Think of it like animals: every dog is a mammal, but not every mammal is a dog.",
            equation: "Square → Rectangle → Parallelogram → Quadrilateral (each less specific than the last)" },
        ],
        practice: [
          {
            prompt: "True or false: Every square is also a rectangle.",
            viz: { type: "shapeGrid", params: { shapes: [{ kind: "square", name: "square" }, { kind: "rectangle", name: "rectangle" }] } },
            options: ["True", "False"],
            answer: "True",
            hint: "Squares have 4 right angles, so they pass the rectangle test.",
          },
          {
            prompt: "True or false: Every rectangle is a square.",
            viz: { type: "shapeGrid", params: { shapes: [{ kind: "rectangle", name: "rectangle" }, { kind: "square", name: "square" }] } },
            options: ["True", "False"],
            answer: "False",
            hint: "Rectangles can be long and thin — sides not equal.",
          },
          {
            prompt: "A rhombus with 4 right angles is called a…",
            viz: { type: "quadShape", params: { kind: "square", label: "4 equal sides + 4 right angles" } },
            options: ["parallelogram", "square", "trapezoid"],
            answer: "square",
            hint: "Equal sides + right angles = the most specific name for that rhombus = square.",
          },
          {
            prompt: "Detective: a shape has 4 sides, 2 pairs parallel, 4 right angles, but sides are NOT all equal. What is it?",
            viz: { type: "quadShape", params: { kind: "rectangle", label: "What am I?" } },
            options: ["square", "rectangle", "rhombus"],
            answer: "rectangle",
            hint: "Right angles but unequal sides = rectangle (not a square).",
          },
          {
            prompt: "Detective: 4 sides, 1 pair parallel only. Pick me.",
            viz: { type: "quadShape", params: { kind: "trapezoid", label: "1 pair parallel" } },
            options: ["parallelogram", "trapezoid", "rhombus"],
            answer: "trapezoid",
            hint: "ONE pair of parallel sides = trapezoid.",
          },
        ],
      },
    ],
  });
})();
