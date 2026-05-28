/*
 * Pool: Fence Frenzy (Math Raccoon · Geometry · Arcade)
 * =====================================================
 * Perimeter word problems — sum every side of a shape (CCSS 3.MD.8).
 *
 * VIZ STRATEGY:
 *   - Rectangle items → perimeterShape showing the rectangle with dimensions
 *   - Square items → perimeterShape with w=h (a square is still a rectangle)
 *   - Triangle/pentagon/hexagon items → shapeGrid showing the shape (kid
 *     counts/sums sides from the visible shape)
 *   - Detective items where viz would leak the answer → no viz (thought-bubble)
 */
MR.Pools.register({
  "id": "geo-arcade-fence-frenzy",
  "title": "Fence Frenzy",
  "askedPerRound": 6,
  "questions": [
    { "prompt": "🚧 A square pen has sides of 6 cm each. What is the perimeter?",
      "viz": { "type": "perimeterShape", "params": { "w": 6, "h": 6 } },
      "answer": 24, "suffix": "cm", "hint": "All sides are the same. Add one side four times." },
    { "prompt": "🚧 A rectangle garden is 8 cm long and 5 cm wide. Perimeter?",
      "viz": { "type": "perimeterShape", "params": { "w": 8, "h": 5 } },
      "answer": 26, "suffix": "cm", "hint": "Add all four sides. Two long, two short." },
    { "prompt": "🚧 An equilateral triangle has sides of 7 cm. Perimeter?",
      "viz": { "type": "shapeGrid", "params": { "shapes": [{ "kind": "triangle", "name": "7 cm on each side" }] } },
      "answer": 21, "suffix": "cm", "hint": "All three sides are the same. Add 7 three times." },
    { "prompt": "🚧 A square plot measures 9 cm on each side. Perimeter?",
      "viz": { "type": "perimeterShape", "params": { "w": 9, "h": 9 } },
      "answer": 36, "suffix": "cm", "hint": "All sides are the same. Add 9 four times." },
    { "prompt": "🚧 A rectangle mat is 12 cm by 4 cm. Perimeter?",
      "viz": { "type": "perimeterShape", "params": { "w": 12, "h": 4 } },
      "answer": 32, "suffix": "cm", "hint": "Add all four sides. Two long, two short." },
    { "prompt": "🚧 A 5-sided garden has sides 4, 4, 6, 6, 5 cm. Total fence needed?",
      "viz": { "type": "shapeGrid", "params": { "shapes": [{ "kind": "pentagon", "name": "Sides: 4, 4, 6, 6, 5" }] } },
      "answer": 25, "suffix": "cm", "hint": "Add up every side once." },
    { "prompt": "🚧 A square yard has perimeter fence of 4 sides × 11 cm. Perimeter?",
      "viz": { "type": "perimeterShape", "params": { "w": 11, "h": 11 } },
      "answer": 44, "suffix": "cm", "hint": "All sides are the same. Add 11 four times." },
    { "prompt": "🚧 A triangle has sides 5 cm, 8 cm, and 9 cm. What is the perimeter?",
      "viz": { "type": "shapeGrid", "params": { "shapes": [{ "kind": "triangle", "name": "Sides: 5, 8, 9" }] } },
      "answer": 22, "suffix": "cm", "hint": "Add all three sides once." },
    { "prompt": "🚧 A rectangle is 15 cm long and 7 cm wide. Perimeter?",
      "viz": { "type": "perimeterShape", "params": { "w": 15, "h": 7 } },
      "answer": 44, "suffix": "cm", "hint": "Add all four sides. Two long, two short." },
    { "prompt": "🚧 A hexagon (6 sides) has equal sides of 4 cm. Perimeter?",
      "viz": { "type": "shapeGrid", "params": { "shapes": [{ "kind": "hexagon", "name": "4 cm on each side" }] } },
      "answer": 24, "suffix": "cm", "hint": "All six sides are the same. Add 4 six times." },
    { "prompt": "🚧 A rectangle mat is 10 cm by 3 cm. How many cm of tape to go around?",
      "viz": { "type": "perimeterShape", "params": { "w": 10, "h": 3 } },
      "answer": 26, "suffix": "cm", "hint": "Add all four sides. Two long, two short." },
    { "prompt": "🚧 A square tile has perimeter 28 cm. What's the length of ONE side?",
      "viz": { "type": "shapeGrid", "params": { "shapes": [{ "kind": "square", "name": "Perimeter 28 cm — find one side" }] } },
      "answer": 7, "suffix": "cm", "hint": "All four sides are the same. What times 4 reaches 28?" },
    { "prompt": "🚧 A rectangle is 9 cm by 4 cm. Perimeter?",
      "viz": { "type": "perimeterShape", "params": { "w": 9, "h": 4 } },
      "answer": 26, "suffix": "cm", "hint": "Add all four sides. Two long, two short." },
    { "prompt": "🚧 A triangle has sides 6, 7, and 8 cm. Perimeter?",
      "viz": { "type": "shapeGrid", "params": { "shapes": [{ "kind": "triangle", "name": "Sides: 6, 7, 8" }] } },
      "answer": 21, "suffix": "cm", "hint": "Add all three sides once." },
    { "prompt": "🚧 A square has side 13 cm. Perimeter?",
      "viz": { "type": "perimeterShape", "params": { "w": 13, "h": 13 } },
      "answer": 52, "suffix": "cm", "hint": "All sides are the same. Add 13 four times." },
    { "prompt": "🚧 A rectangle is 11 cm long, 6 cm wide. Perimeter?",
      "viz": { "type": "perimeterShape", "params": { "w": 11, "h": 6 } },
      "answer": 34, "suffix": "cm", "hint": "Add all four sides. Two long, two short." },
    { "prompt": "🚧 A pentagon has sides 3, 4, 5, 6, 7 cm. Perimeter?",
      "viz": { "type": "shapeGrid", "params": { "shapes": [{ "kind": "pentagon", "name": "Sides: 3, 4, 5, 6, 7" }] } },
      "answer": 25, "suffix": "cm", "hint": "Add up every side once." },
    { "prompt": "🚧 A square garden has perimeter 40 cm. Side length?",
      "viz": { "type": "shapeGrid", "params": { "shapes": [{ "kind": "square", "name": "Perimeter 40 cm — find one side" }] } },
      "answer": 10, "suffix": "cm", "hint": "All four sides are the same. What times 4 reaches 40?" },

    // ---- Reverse: shape only, no specific dimensions (would leak the answer) ----
    { "prompt": "🔍 Reverse: a rectangle has perimeter 30 cm. One side is 9 cm. Other side?",
      "viz": { "type": "shapeGrid", "params": { "shapes": [{ "kind": "rectangle", "name": "Perimeter: 30 cm, one side: 9 cm" }] } },
      "answer": 6, "suffix": "cm",
      "hint": "Two long sides add to 18. The two short sides share what's left." },
    { "prompt": "🔍 Reverse: a square has perimeter 28 m. Side length?",
      "viz": { "type": "shapeGrid", "params": { "shapes": [{ "kind": "square", "name": "Perimeter 28 m" }] } },
      "answer": 7, "suffix": "m", "hint": "All four sides are the same. What times 4 reaches 28?" },
    { "prompt": "🔍 Detective: a pentagon with all 5 sides equal has perimeter 35 cm. Each side?",
      "viz": { "type": "shapeGrid", "params": { "shapes": [{ "kind": "pentagon", "name": "Perimeter 35 cm, 5 equal sides" }] } },
      "answer": 7, "suffix": "cm",
      "hint": "All five sides are equal. What times 5 reaches 35?" },
    { "prompt": "🔍 Detective: a hexagon with all 6 sides equal has perimeter 24 m. Each side?",
      "viz": { "type": "shapeGrid", "params": { "shapes": [{ "kind": "hexagon", "name": "Perimeter 24 m, 6 equal sides" }] } },
      "answer": 4, "suffix": "m",
      "hint": "All six sides are equal. What times 6 reaches 24?" }
  ]
});
