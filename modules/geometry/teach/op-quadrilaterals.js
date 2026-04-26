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
        title: "Four Sides = Family",
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
            prompt: "Which shape is NOT a quadrilateral?",
            options: ["square", "triangle", "rhombus"],
            answer: "triangle",
            hint: "A triangle has 3 sides, not 4.",
          },
          {
            prompt: "How many sides does EVERY quadrilateral have?",
            options: [3, 4, 5],
            answer: 4,
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
          { text: "A RECTANGLE has 2 pairs of parallel sides AND 4 right angles.",
            viz: { type: "quadShape", params: { kind: "rectangle", label: "Rectangle", highlight: "angles" } } },
          { text: "A PARALLELOGRAM has 2 pairs of parallel sides but NOT right angles.",
            viz: { type: "quadShape", params: { kind: "parallelogram", label: "Parallelogram" } } },
          { text: "A TRAPEZOID has only 1 pair of parallel sides.",
            viz: { type: "quadShape", params: { kind: "trapezoid", label: "Trapezoid (1 pair parallel)" } } },
          { text: "A RHOMBUS has 4 equal sides and 2 pairs parallel — like a tilted square.",
            viz: { type: "quadShape", params: { kind: "rhombus", label: "Rhombus", highlight: "sides" } } },
        ],
        practice: [
          {
            prompt: "Which quadrilateral always has 4 right angles AND all sides equal?",
            options: ["rhombus", "rectangle", "square"],
            answer: "square",
            hint: "Equal sides PLUS right angles = square.",
          },
          {
            prompt: "A shape has only 1 pair of parallel sides. It's a…",
            options: ["trapezoid", "rhombus", "square"],
            answer: "trapezoid",
          },
        ],
      },
      {
        id: "hierarchy",
        title: "Every Square Is a Rectangle",
        subtitle: "One shape can belong to MANY groups.",
        emoji: "🎯",
        idea: {
          hook: "A square has 4 right angles AND 2 pairs of parallel sides AND 4 equal sides. That means a square passes the rectangle test (4 right angles), AND the rhombus test (4 equal sides), AND the parallelogram test. So a square is all of those — it just has the fanciest name.",
          viz: { type: "quadShape", params: { kind: "square", label: "A square is ALSO a rectangle, rhombus, parallelogram, AND quadrilateral" } },
        },
        watchMe: [
          { text: "Every rectangle has 2 pairs of parallel sides — so every rectangle is a PARALLELOGRAM.",
            viz: { type: "quadShape", params: { kind: "rectangle", label: "Rectangle ∈ Parallelogram" } } },
          { text: "Every square is a rectangle (has 4 right angles) AND a rhombus (has 4 equal sides).",
            viz: { type: "quadShape", params: { kind: "square", label: "Square ∈ Rectangle ∩ Rhombus" } } },
          { text: "BUT — not every rectangle is a square. A long thin rectangle is not a square.",
            viz: { type: "quadShape", params: { kind: "rectangle", label: "Rectangle (not a square)" } } },
          { text: "Think of it like animals: every dog is a mammal, but not every mammal is a dog.",
            equation: "Squares ⊂ Rectangles ⊂ Parallelograms ⊂ Quadrilaterals" },
        ],
        practice: [
          {
            prompt: "True or false: Every square is also a rectangle.",
            options: ["True", "False"],
            answer: "True",
            hint: "Squares have 4 right angles, so they pass the rectangle test.",
          },
          {
            prompt: "True or false: Every rectangle is a square.",
            options: ["True", "False"],
            answer: "False",
            hint: "Rectangles can be long and thin — sides not equal.",
          },
          {
            prompt: "A rhombus with 4 right angles is called a…",
            options: ["parallelogram", "square", "trapezoid"],
            answer: "square",
            hint: "Equal sides + right angles = the fanciest rhombus = square.",
          },
        ],
      },
    ],
  });
})();
