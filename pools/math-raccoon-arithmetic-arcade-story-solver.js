/*
 * Pool: Story Solver (Math Raccoon · Arithmetic · Arcade)
 * =======================================================
 * Multi-step & equal-group story problems (CCSS 3.OA.3, 3.OA.8).
 *
 * FORMAT — each question is a JSON object.
 *
 * A) Numeric-answer (most common):
 *   {
 *     "prompt":  "Story text (HTML allowed).",
 *     "answer":  42,                    // the correct numeric answer
 *     "options": [42, 40, 51, 37],      // optional — engine auto-builds if omitted
 *     "suffix":  "",                    // optional unit label
 *     "hint":    "Tip Math Raccoon whispers."
 *   }
 *
 * B) True/False (test operation equivalence, CCSS 3.OA.D.9):
 *   {
 *     "prompt":  "Is 24 ÷ 8 = 6 ÷ 2?",
 *     "options": ["True", "False"],
 *     "answer":  "True",
 *     "hint":    "24 ÷ 8 = 3, and 6 ÷ 2 = 3."
 *   }
 *
 * C) Pick-an-item (affordability & comparison):
 *   {
 *     "prompt":  "Raccoon has 11¢. Which treat can she afford?",
 *     "options": ["Apple (12¢)", "Nut (9¢)", "Pie (17¢)"],
 *     "answer":  "Nut (9¢)",
 *     "hint":    "Only items ≤ 11¢ fit the budget."
 *   }
 *
 * Teachers & parents: add more stories freely. Stories can be multi-step —
 * just describe the situation and give the final answer.
 */
MR.Pools.register({
  "id": "arith-arcade-story-solver",
  "title": "Story Solver",
  "askedPerRound": 8,
  "questions": [
    { "prompt": "🐥 Duckling lines up 5 nests with 4 eggs in each. How many eggs in total?",
      "answer": 20, "hint": "5 groups of 4 — multiply." },
    { "prompt": "🐝 The beekeeper has 6 shelves. Each shelf holds 3 jars of honey. How many jars altogether?",
      "answer": 18, "hint": "6 × 3 = 18." },
    { "prompt": "🦝 Raccoon fills 4 picnic baskets with 7 berries each. How many berries did she pack?",
      "answer": 28, "hint": "4 × 7." },
    { "prompt": "🐰 Bunny planted 7 rows of 8 carrots. How many carrots in the garden?",
      "answer": 56, "hint": "7 × 8 = 56." },
    { "prompt": "🪁 Hedgehog bought 6 packs of kites with 5 in each. How many kites in all?",
      "answer": 30, "hint": "6 × 5." },
    { "prompt": "🦔 Hedgehog has 9 jars with 3 mushrooms each. How many mushrooms in total?",
      "answer": 27, "hint": "9 × 3 = 27." },

    { "prompt": "🐿️ Squirrel shares 24 acorns equally into 6 piles. How many acorns in each pile?",
      "answer": 4, "hint": "24 ÷ 6 — think 6 × ? = 24." },
    { "prompt": "🦊 Fox splits 35 berries across 5 friends. How many berries does each friend get?",
      "answer": 7, "hint": "5 × 7 = 35." },
    { "prompt": "🐻 Bear divides 48 apples into 8 baskets equally. How many apples per basket?",
      "answer": 6, "hint": "48 ÷ 8." },
    { "prompt": "📚 Raccoon arranges 42 books onto 7 shelves. Books per shelf?",
      "answer": 6, "hint": "7 × 6 = 42." },
    { "prompt": "🌰 36 acorns shared equally among 9 squirrels. How many each?",
      "answer": 4, "hint": "9 × 4 = 36." },
    { "prompt": "🥐 Baker has 30 rolls for 6 bags. Rolls per bag?",
      "answer": 5, "hint": "30 ÷ 6 = 5." },

    { "prompt": "🐻 Bear bakes 3 trays of 4 muffins each, then shares 5 with Owl. How many muffins are left?",
      "answer": 7, "hint": "3 × 4 = 12, then minus 5." },
    { "prompt": "🦝 Raccoon picks 4 boxes of 8 plums, then eats 6 on the walk. How many plums does she bring home?",
      "answer": 26, "hint": "4 × 8 − 6." },
    { "prompt": "🐰 Bunny had 48 carrots. He lost 9 and pulled 12 more from the garden. How many now?",
      "answer": 51, "hint": "48 − 9 + 12." },
    { "prompt": "📝 Hedgehog writes 5 pages per day for 4 days, then erases 2. Pages left?",
      "answer": 18, "hint": "5 × 4, then minus 2." },
    { "prompt": "🐝 4 jars hold 6 spoons of honey each. Bear eats 8 spoons. How many spoons left?",
      "answer": 16, "hint": "4 × 6 − 8." },
    { "prompt": "🦔 Hedgehog had 30 mushrooms. She made 3 equal piles, then added 4 to each pile. How many mushrooms in one pile now?",
      "answer": 14, "hint": "30 ÷ 3 = 10, then + 4." },

    { "prompt": "🥧 Pie Pals made 6 pies, each cut into 4 slices. If 5 slices were eaten, how many slices remain?",
      "answer": 19, "hint": "6 × 4 − 5." },
    { "prompt": "🎈 7 kids each got 3 balloons. They popped 4 in total. How many balloons are still floating?",
      "answer": 17, "hint": "7 × 3 − 4." },
    { "prompt": "🌻 Mouse planted 5 rows of 6 sunflowers. 3 didn't sprout. How many sprouted?",
      "answer": 27, "hint": "5 × 6 − 3." },
    { "prompt": "🧺 There are 48 apples in 6 baskets. Squirrel adds 2 more to each basket. How many apples total now?",
      "answer": 60, "hint": "48 + 6 × 2." },
    { "prompt": "⭐ 4 nights, Raccoon spotted 9 stars each night, then one extra on the last. Total stars?",
      "answer": 37, "hint": "4 × 9 + 1." },
    { "prompt": "🐾 Fox walks 8 km on Mon and 6 km on Tue. If he splits Wed equally in 2 legs of 5 km each, total km for all three days?",
      "answer": 24, "suffix": "km", "hint": "8 + 6 + (2 × 5)." },

    // ---- Money · multi-step remaining ($) — CCSS 3.OA.8 ----
    { "prompt": "💵 Maria got $50 for her birthday. She buys headphones for $22 and a craft kit for $17. How much money does she have left?",
      "answer": 11, "suffix": "$", "hint": "Add both purchases, then subtract from 50." },
    { "prompt": "💵 Ben had $40. He bought a ball for $12 and socks for $6. Dollars left?",
      "answer": 22, "suffix": "$", "hint": "12 + 6 = 18, then 40 − 18." },
    { "prompt": "💵 Ava had $30. She spent $9 on snacks and $14 on a book. How much is left?",
      "answer": 7, "suffix": "$", "hint": "Total spent = 23. 30 − 23." },
    { "prompt": "💵 Sam had $25. He bought 2 comics at $4 each and a juice for $3. Dollars left?",
      "answer": 14, "suffix": "$", "hint": "2 × 4 = 8, + 3 = 11, then 25 − 11." },
    { "prompt": "💵 Nora earned $20 babysitting and $15 raking leaves. She bought a puzzle for $18. Money left?",
      "answer": 17, "suffix": "$", "hint": "20 + 15 = 35, then 35 − 18." },
    { "prompt": "💵 Raccoon had $60. She paid $29 for a lantern and $8 for batteries. Dollars left?",
      "answer": 23, "suffix": "$", "hint": "29 + 8 = 37, then 60 − 37." },

    // ---- Affordability / select-an-item — CCSS 3.OA.8 ----
    { "prompt": "💵 Maria has $11 left. Which ONE item can she afford?",
      "options": ["A shirt for $12", "A book for $13", "A bike helmet for $17", "A set of markers for $9"],
      "answer":  "A set of markers for $9",
      "hint":    "She needs a price ≤ $11." },
    { "prompt": "🪙 Fox has 20¢. Which ONE treat can he buy?",
      "options": ["Pie (25¢)", "Cookie (18¢)", "Cake (22¢)", "Pudding (30¢)"],
      "answer":  "Cookie (18¢)",
      "hint":    "Look for a price 20¢ or under." },
    { "prompt": "💵 Bear has $15. Which ONE toy fits his budget?",
      "options": ["Kite ($20)", "Yo-yo ($14)", "Board game ($22)", "Bike ($80)"],
      "answer":  "Yo-yo ($14)",
      "hint":    "Pick the one costing $15 or less." },
    { "prompt": "💵 Mouse has 50¢. She wants the MOST EXPENSIVE thing she can still afford. Which is it?",
      "options": ["Paper clip (5¢)", "Cheese wedge (45¢)", "Tiny hat (55¢)", "Balloon (60¢)"],
      "answer":  "Cheese wedge (45¢)",
      "hint":    "The biggest price that is still ≤ 50¢." },
    { "prompt": "💵 Ava has $7. Which item CAN'T she afford?",
      "options": ["Pencil ($2)", "Eraser ($1)", "Notebook ($9)", "Sticker ($3)"],
      "answer":  "Notebook ($9)",
      "hint":    "One of these costs more than $7." },

    // ---- True/False · equation equivalence — CCSS 3.OA.D.9 ----
    { "prompt": "🤔 Is this equation true or false?<br><strong>24 ÷ 8 = 6 ÷ 2</strong>",
      "options": ["True", "False"], "answer": "True",
      "hint":    "24 ÷ 8 = 3, and 6 ÷ 2 = 3. Both sides equal 3." },
    { "prompt": "🤔 Is this equation true or false?<br><strong>4 × 3 = 18 ÷ 2</strong>",
      "options": ["True", "False"], "answer": "False",
      "hint":    "4 × 3 = 12, but 18 ÷ 2 = 9. Not equal." },
    { "prompt": "🤔 Is this equation true or false?<br><strong>5 × 4 = 20 × 0</strong>",
      "options": ["True", "False"], "answer": "False",
      "hint":    "Anything × 0 is 0. But 5 × 4 = 20." },
    { "prompt": "🤔 Is this equation true or false?<br><strong>4 × 1 = 10 ÷ 2</strong>",
      "options": ["True", "False"], "answer": "False",
      "hint":    "4 × 1 = 4, but 10 ÷ 2 = 5." },
    { "prompt": "🤔 Is this equation true or false?<br><strong>6 × 3 = 2 × 9</strong>",
      "options": ["True", "False"], "answer": "True",
      "hint":    "6 × 3 = 18, and 2 × 9 = 18." },
    { "prompt": "🤔 Is this equation true or false?<br><strong>24 ÷ 4 = 24 ÷ 6</strong>",
      "options": ["True", "False"], "answer": "False",
      "hint":    "24 ÷ 4 = 6, but 24 ÷ 6 = 4." },
    { "prompt": "🤔 Is this equation true or false?<br><strong>7 + 8 = 5 × 3</strong>",
      "options": ["True", "False"], "answer": "True",
      "hint":    "7 + 8 = 15, and 5 × 3 = 15." },
    { "prompt": "🤔 Is this equation true or false?<br><strong>9 × 2 = 3 × 6</strong>",
      "options": ["True", "False"], "answer": "True",
      "hint":    "Both equal 18." },
    { "prompt": "🤔 Is this equation true or false?<br><strong>36 ÷ 9 = 4 × 1</strong>",
      "options": ["True", "False"], "answer": "True",
      "hint":    "36 ÷ 9 = 4, and 4 × 1 = 4." },
    { "prompt": "🤔 Is this equation true or false?<br><strong>8 × 0 = 8 − 8</strong>",
      "options": ["True", "False"], "answer": "True",
      "hint":    "Both sides are 0." },
    { "prompt": "🤔 Is this equation true or false?<br><strong>5 + 5 + 5 = 3 × 5</strong>",
      "options": ["True", "False"], "answer": "True",
      "hint":    "Repeated addition is multiplication: 3 groups of 5." },
    { "prompt": "🤔 Is this equation true or false?<br><strong>16 ÷ 4 = 2 × 3</strong>",
      "options": ["True", "False"], "answer": "False",
      "hint":    "16 ÷ 4 = 4, but 2 × 3 = 6." }
  ]
});
