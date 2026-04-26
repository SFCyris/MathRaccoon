/*
 * Pool: Pattern Parade (Arithmetic · Arcade)
 * ===========================================
 * Drag the three missing pieces into a skip-count or function-table row.
 * Uses the `arrange` kind of the dragDrop engine.
 *
 * FORMAT — each question's `answer` array has exactly the pieces the child
 * must place, in order. `tokens` always contains the answer set plus two
 * decoy values so it's not a pure drag-all-three.
 *
 * CCSS 3.OA.9.
 */
MR.Pools.register({
  "id": "ari-arcade-pattern-parade",
  "title": "Pattern Parade",
  "askedPerRound": 6,
  "questions": [
    { "kind": "arrange",
      "prompt": "Count by 2s. Fill in: 2, __, __, __, 10.",
      "tokens": ["4", "6", "8", "5", "7"],
      "answer": ["4", "6", "8"],
      "hint": "Add 2 each step: 2+2=4, 4+2=6, 6+2=8." },

    { "kind": "arrange",
      "prompt": "Count by 5s. Fill in: 5, __, __, __, 25.",
      "tokens": ["10", "15", "20", "12", "18"],
      "answer": ["10", "15", "20"],
      "hint": "Jumps of 5 each time." },

    { "kind": "arrange",
      "prompt": "Count by 3s. Fill in: 3, __, __, __, 15.",
      "tokens": ["6", "9", "12", "8", "10"],
      "answer": ["6", "9", "12"],
      "hint": "3+3=6, 6+3=9, 9+3=12." },

    { "kind": "arrange",
      "prompt": "Count by 10s. Fill in: 10, __, __, __, 50.",
      "tokens": ["20", "30", "40", "25", "35"],
      "answer": ["20", "30", "40"],
      "hint": "Every jump is +10." },

    { "kind": "arrange",
      "prompt": "Function rule: +4. Fill OUT for IN 1, 2, 3.",
      "tokens": ["5", "6", "7", "4", "8"],
      "answer": ["5", "6", "7"],
      "hint": "1+4=5, 2+4=6, 3+4=7." },

    { "kind": "arrange",
      "prompt": "Function rule: ×3. Fill OUT for IN 2, 3, 4.",
      "tokens": ["6", "9", "12", "8", "10"],
      "answer": ["6", "9", "12"],
      "hint": "2×3=6, 3×3=9, 4×3=12." },

    { "kind": "arrange",
      "prompt": "Count by 4s. Fill in: 4, __, __, __, 20.",
      "tokens": ["8", "12", "16", "10", "14"],
      "answer": ["8", "12", "16"],
      "hint": "Each jump is +4." },

    { "kind": "arrange",
      "prompt": "Sort the sums: 2+4, 3+5, 1+3. All answers go from smallest to biggest.",
      "tokens": ["1+3", "2+4", "3+5"],
      "answer": ["1+3", "2+4", "3+5"],
      "hint": "1+3=4, 2+4=6, 3+5=8. Smallest first." },

    { "kind": "arrange",
      "prompt": "Function rule: ×5. Fill OUT for IN 2, 4, 6.",
      "tokens": ["10", "20", "30", "15", "25"],
      "answer": ["10", "20", "30"],
      "hint": "2×5=10, 4×5=20, 6×5=30." },

    { "kind": "arrange",
      "prompt": "Pattern: each next is +6. Fill: 6, __, __, __.",
      "tokens": ["12", "18", "24", "10", "20"],
      "answer": ["12", "18", "24"],
      "hint": "6+6=12, 12+6=18, 18+6=24." },

    { "kind": "arrange",
      "prompt": "Count by 2s, starting at 14: 14, __, __, __, 22.",
      "tokens": ["16", "18", "20", "21", "17"],
      "answer": ["16", "18", "20"],
      "hint": "Still adding 2 each time." },

    { "kind": "arrange",
      "prompt": "Count DOWN by 5s: 30, __, __, __, 10.",
      "tokens": ["25", "20", "15", "5", "35"],
      "answer": ["25", "20", "15"],
      "hint": "Subtract 5 each time. 30−5=25, 25−5=20, 20−5=15." },

    { "kind": "arrange",
      "prompt": "Count by 7s. Fill in: 7, __, __, __, 35.",
      "tokens": ["14", "21", "28", "20", "30"],
      "answer": ["14", "21", "28"],
      "hint": "Each jump is +7. 7+7=14, 14+7=21, 21+7=28." },

    { "kind": "arrange",
      "prompt": "Count by 8s. Fill in: 8, __, __, __, 40.",
      "tokens": ["16", "24", "32", "20", "36"],
      "answer": ["16", "24", "32"],
      "hint": "+8 each step. 8→16→24→32." },

    { "kind": "arrange",
      "prompt": "Function rule: +10. Fill OUT for IN 3, 5, 8.",
      "tokens": ["13", "15", "18", "11", "14"],
      "answer": ["13", "15", "18"],
      "hint": "Add ten to each input." },

    { "kind": "arrange",
      "prompt": "Function rule: −3. Fill OUT for IN 7, 10, 12.",
      "tokens": ["4", "7", "9", "5", "11"],
      "answer": ["4", "7", "9"],
      "hint": "Subtract 3. 7−3=4, 10−3=7, 12−3=9." },

    { "kind": "arrange",
      "prompt": "Count DOWN by 10s: 80, __, __, __, 40.",
      "tokens": ["70", "60", "50", "30", "65"],
      "answer": ["70", "60", "50"],
      "hint": "Each step is −10." },

    { "kind": "arrange",
      "prompt": "Count by 9s. Fill in: 9, __, __, __, 45.",
      "tokens": ["18", "27", "36", "24", "30"],
      "answer": ["18", "27", "36"],
      "hint": "Each number is +9." },

    { "kind": "arrange",
      "prompt": "Function rule: ×2. Fill OUT for IN 4, 6, 8.",
      "tokens": ["8", "12", "16", "10", "14"],
      "answer": ["8", "12", "16"],
      "hint": "Double the input. 4→8, 6→12, 8→16." },

    { "kind": "arrange",
      "prompt": "Sort the products smallest to biggest: 3×2, 2×5, 4×4.",
      "tokens": ["3×2", "2×5", "4×4"],
      "answer": ["3×2", "2×5", "4×4"],
      "hint": "3×2=6, 2×5=10, 4×4=16." },

    { "kind": "arrange",
      "prompt": "Count by 25s. Fill in: 25, __, __, __, 125.",
      "tokens": ["50", "75", "100", "80", "110"],
      "answer": ["50", "75", "100"],
      "hint": "Each jump adds 25." },

    { "kind": "arrange",
      "prompt": "Function rule: +6. Fill OUT for IN 2, 5, 9.",
      "tokens": ["8", "11", "15", "10", "13"],
      "answer": ["8", "11", "15"],
      "hint": "Add six to each input." },

    { "kind": "arrange",
      "prompt": "Pattern: start 4, rule +3. Fill: __, __, __.",
      "tokens": ["7", "10", "13", "11", "15"],
      "answer": ["7", "10", "13"],
      "hint": "4+3=7, 7+3=10, 10+3=13." },
  ],
});
