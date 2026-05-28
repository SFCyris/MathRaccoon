/*
 * Pool: Story Solver (Math Raccoon · Arithmetic · Arcade)
 * =======================================================
 * Multi-step & equal-group story problems (CCSS 3.OA.3, 3.OA.8).
 *
 * VIZ STRATEGY:
 *   - Pure multiplication (N × M)     → equalGroups { groups: N, size: M, emoji }
 *                                        (kid sees N groups of M; reinforces
 *                                         repeated-addition meaning of ×)
 *   - Pure division (X ÷ N)           → no viz (showing N equal groups would
 *                                        leak the per-group answer)
 *   - Multi-step starting with N × M  → equalGroups for the multiplicative step;
 *                                        kid handles the +/− adjustment mentally
 *   - Multi-step with chained +/−     → no viz (no clean single structure)
 *   - Money / affordability / T/F     → no viz (calculation chains and
 *                                        decision tasks lack a visual structure)
 */
MR.Pools.register({
  "id": "arith-arcade-story-solver",
  "title": "Story Solver",
  "askedPerRound": 8,
  "questions": [
    // ---- Pure multiplication: N groups of M, find total ----
    { "prompt": "🐥 Duckling lines up 5 nests with 4 eggs in each. How many eggs in total?",
      "viz": { "type": "equalGroups", "params": { "groups": 5, "size": 4, "emoji": "🥚" } },
      "answer": 20, "hint": "Each nest has 4 eggs. Add 4 five times." },
    { "prompt": "🐝 The beekeeper has 6 shelves. Each shelf holds 3 jars of honey. How many jars altogether?",
      "viz": { "type": "equalGroups", "params": { "groups": 6, "size": 3, "emoji": "🍯" } },
      "answer": 18, "hint": "Each shelf has 3 jars. Add 3 six times." },
    { "prompt": "🦝 Raccoon fills 4 picnic baskets with 7 berries each. How many berries did she pack?",
      "viz": { "type": "equalGroups", "params": { "groups": 4, "size": 7, "emoji": "🫐" } },
      "answer": 28, "hint": "Each basket has 7 berries. Add 7 four times." },
    { "prompt": "🐰 Bunny planted 7 rows of 8 carrots. How many carrots in the garden?",
      "viz": { "type": "equalGroups", "params": { "groups": 7, "size": 8, "emoji": "🥕" } },
      "answer": 56, "hint": "Each row has 8 carrots. Add 8 seven times." },
    { "prompt": "🪁 Hedgehog bought 6 packs of kites with 5 in each. How many kites in all?",
      "viz": { "type": "equalGroups", "params": { "groups": 6, "size": 5, "emoji": "🪁" } },
      "answer": 30, "hint": "Each pack has 5 kites. Add 5 six times." },
    { "prompt": "🦔 Hedgehog has 9 jars with 3 mushrooms each. How many mushrooms in total?",
      "viz": { "type": "equalGroups", "params": { "groups": 9, "size": 3, "emoji": "🍄" } },
      "answer": 27, "hint": "Each jar has 3 mushrooms. Add 3 nine times." },

    // ---- Pure division: equal-share — no viz (would leak the per-group answer) ----
    { "prompt": "🐿️ Squirrel shares 24 acorns equally into 6 piles. How many acorns in each pile?",
      "answer": 4, "hint": "Share 24 acorns equally into 6 piles. What times 6 reaches 24?" },
    { "prompt": "🦊 Fox splits 35 berries across 5 friends. How many berries does each friend get?",
      "answer": 7, "hint": "Share 35 berries equally across 5 friends. What times 5 reaches 35?" },
    { "prompt": "🐻 Bear divides 48 apples into 8 baskets equally. How many apples per basket?",
      "answer": 6, "hint": "Share 48 apples equally into 8 baskets. What times 8 reaches 48?" },
    { "prompt": "📚 Raccoon arranges 42 books onto 7 shelves. Books per shelf?",
      "answer": 6, "hint": "Share 42 books equally onto 7 shelves. What times 7 reaches 42?" },
    { "prompt": "🌰 36 acorns shared equally among 9 squirrels. How many each?",
      "answer": 4, "hint": "Share 36 acorns equally among 9 squirrels. What times 9 reaches 36?" },
    { "prompt": "🥐 Baker has 30 rolls for 6 bags. Rolls per bag?",
      "answer": 5, "hint": "Share 30 rolls equally into 6 bags. What times 6 reaches 30?" },

    // ---- Multi-step (mult first, then +/−): equalGroups shows the mult step ----
    { "prompt": "🐻 Bear bakes 3 trays of 4 muffins each, then shares 5 with Owl. How many muffins are left?",
      "viz": { "type": "equalGroups", "params": { "groups": 3, "size": 4, "emoji": "🧁", "label": "Step 1: 3 trays × 4 muffins, then − 5" } },
      "answer": 7, "hint": "First find 3 × 4 muffins. Then take away 5 shared." },
    { "prompt": "🦝 Raccoon picks 4 boxes of 8 plums, then eats 6 on the walk. How many plums does she bring home?",
      "viz": { "type": "equalGroups", "params": { "groups": 4, "size": 8, "emoji": "🍑", "label": "Step 1: 4 boxes × 8 plums, then − 6" } },
      "answer": 26, "hint": "First find 4 × 8 plums. Then take away 6 eaten." },
    { "prompt": "🐰 Bunny had 48 carrots. He lost 9 and pulled 12 more from the garden. How many now?",
      "answer": 51, "hint": "First take away the carrots lost. Then add the new ones pulled." },
    { "prompt": "📝 Hedgehog writes 5 pages per day for 4 days, then erases 2. Pages left?",
      "viz": { "type": "equalGroups", "params": { "groups": 4, "size": 5, "emoji": "📝", "label": "Step 1: 4 days × 5 pages, then − 2" } },
      "answer": 18, "hint": "First find 4 × 5 pages. Then take away 2 erased." },
    { "prompt": "🐝 4 jars hold 6 spoons of honey each. Bear eats 8 spoons. How many spoons left?",
      "viz": { "type": "equalGroups", "params": { "groups": 4, "size": 6, "emoji": "🥄", "label": "Step 1: 4 jars × 6 spoons, then − 8" } },
      "answer": 16, "hint": "First find 4 × 6 spoons. Then take away 8 eaten." },
    { "prompt": "🦔 Hedgehog had 30 mushrooms. She made 3 equal piles, then added 4 to each pile. How many mushrooms in one pile now?",
      "answer": 14, "hint": "First share 30 equally into 3 piles. Then add 4 to one pile." },

    // ---- Multi-step with mult: equalGroups for the first multiplicative step ----
    { "prompt": "🥧 Pie Pals made 6 pies, each cut into 4 slices. If 5 slices were eaten, how many slices remain?",
      "viz": { "type": "equalGroups", "params": { "groups": 6, "size": 4, "emoji": "🥧", "label": "Step 1: 6 pies × 4 slices, then − 5" } },
      "answer": 19, "hint": "First find 6 × 4 slices. Then take away 5 eaten." },
    { "prompt": "🎈 7 kids each got 3 balloons. They popped 4 in total. How many balloons are still floating?",
      "viz": { "type": "equalGroups", "params": { "groups": 7, "size": 3, "emoji": "🎈", "label": "Step 1: 7 kids × 3 balloons, then − 4" } },
      "answer": 17, "hint": "First find 7 × 3 balloons. Then take away 4 popped." },
    { "prompt": "🌻 Mouse planted 5 rows of 6 sunflowers. 3 didn't sprout. How many sprouted?",
      "viz": { "type": "equalGroups", "params": { "groups": 5, "size": 6, "emoji": "🌻", "label": "Step 1: 5 rows × 6 flowers, then − 3" } },
      "answer": 27, "hint": "First find 5 × 6 sunflowers. Then take away 3 that didn't sprout." },
    { "prompt": "🧺 There are 48 apples in 6 baskets. Squirrel adds 2 more to each basket. How many apples total now?",
      "answer": 60, "hint": "First find 6 × 2 new apples. Then add that to 48." },
    { "prompt": "⭐ 4 nights, Raccoon spotted 9 stars each night, then one extra on the last. Total stars?",
      "viz": { "type": "equalGroups", "params": { "groups": 4, "size": 9, "emoji": "⭐", "label": "Step 1: 4 nights × 9 stars, then + 1" } },
      "answer": 37, "hint": "First find 4 × 9 stars. Then add 1 extra." },
    { "prompt": "🐾 Fox walks 8 km on Mon and 6 km on Tue. If he splits Wed equally in 2 legs of 5 km each, total km for all three days?",
      "answer": 24, "suffix": "km", "hint": "First add Mon + Tue. Then add 2 × 5 km for Wed." },

    // ---- Money multi-step (calculation chain — no clean visual structure) ----
    { "prompt": "💵 Maria got $50 for her birthday. She buys headphones for $22 and a craft kit for $17. How much money does she have left?",
      "answer": 11, "suffix": "$", "hint": "First add the two purchases. Then take that total from 50." },
    { "prompt": "💵 Ben had $40. He bought a ball for $12 and socks for $6. Dollars left?",
      "answer": 22, "suffix": "$", "hint": "First add the two purchases. Then take that total from 40." },
    { "prompt": "💵 Ava had $30. She spent $9 on snacks and $14 on a book. How much is left?",
      "answer": 7, "suffix": "$", "hint": "First add the two purchases. Then take that total from 30." },
    { "prompt": "💵 Sam had $25. He bought 2 comics at $4 each and a juice for $3. Dollars left?",
      "answer": 14, "suffix": "$", "hint": "First find 2 × 4 for the comics. Add the juice. Then take from 25." },
    { "prompt": "💵 Nora earned $20 babysitting and $15 raking leaves. She bought a puzzle for $18. Money left?",
      "answer": 17, "suffix": "$", "hint": "First add her two earnings. Then take away the puzzle price." },
    { "prompt": "💵 Raccoon had $60. She paid $29 for a lantern and $8 for batteries. Dollars left?",
      "answer": 23, "suffix": "$", "hint": "First add the two purchases. Then take that total from 60." },

    // ---- Affordability / select-an-item (decision task — no viz) ----
    { "prompt": "💵 Maria has $11 left. Which ONE item can she afford?",
      "options": ["A shirt for $12", "A book for $13", "A bike helmet for $17", "A set of markers for $9"],
      "answer":  "A set of markers for $9",
      "hint":    "Check each price. Which one is 11 or less?" },
    { "prompt": "🪙 Fox has 20¢. Which ONE treat can he buy?",
      "options": ["Pie (25¢)", "Cookie (18¢)", "Cake (22¢)", "Pudding (30¢)"],
      "answer":  "Cookie (18¢)",
      "hint":    "Check each price. Which one is 20¢ or less?" },
    { "prompt": "💵 Bear has $15. Which ONE toy fits his budget?",
      "options": ["Kite ($20)", "Yo-yo ($14)", "Board game ($22)", "Bike ($80)"],
      "answer":  "Yo-yo ($14)",
      "hint":    "Check each price. Which one is 15 or less?" },
    { "prompt": "💵 Mouse has 50¢. She wants the MOST EXPENSIVE thing she can still afford. Which is it?",
      "options": ["Paper clip (5¢)", "Cheese wedge (45¢)", "Tiny hat (55¢)", "Balloon (60¢)"],
      "answer":  "Cheese wedge (45¢)",
      "hint":    "First find the prices that are 50¢ or less. Then pick the biggest one." },
    { "prompt": "💵 Ava has $7. Which item CAN'T she afford?",
      "options": ["Pencil ($2)", "Eraser ($1)", "Notebook ($9)", "Sticker ($3)"],
      "answer":  "Notebook ($9)",
      "hint":    "Check each price. Which one is MORE than 7?" },

    // ---- True/False · equation equivalence — no viz (equation comparison task) ----
    { "prompt": "🤔 Is this equation true or false?<br><strong>24 ÷ 8 = 6 ÷ 2</strong>",
      "options": ["True", "False"], "answer": "True",
      "hint":    "Compute each side. Are the two sides the same?" },
    { "prompt": "🤔 Is this equation true or false?<br><strong>4 × 3 = 18 ÷ 2</strong>",
      "options": ["True", "False"], "answer": "False",
      "hint":    "Compute each side. Are the two sides the same?" },
    { "prompt": "🤔 Is this equation true or false?<br><strong>5 × 4 = 20 × 0</strong>",
      "options": ["True", "False"], "answer": "False",
      "hint":    "Compute each side. Remember anything times 0 is 0." },
    { "prompt": "🤔 Is this equation true or false?<br><strong>4 × 1 = 10 ÷ 2</strong>",
      "options": ["True", "False"], "answer": "False",
      "hint":    "Compute each side. Are the two sides the same?" },
    { "prompt": "🤔 Is this equation true or false?<br><strong>6 × 3 = 2 × 9</strong>",
      "options": ["True", "False"], "answer": "True",
      "hint":    "Compute each side. Are the two sides the same?" },
    { "prompt": "🤔 Is this equation true or false?<br><strong>24 ÷ 4 = 24 ÷ 6</strong>",
      "options": ["True", "False"], "answer": "False",
      "hint":    "Compute each side. Are the two sides the same?" },
    { "prompt": "🤔 Is this equation true or false?<br><strong>7 + 8 = 5 × 3</strong>",
      "options": ["True", "False"], "answer": "True",
      "hint":    "Compute each side. Are the two sides the same?" },
    { "prompt": "🤔 Is this equation true or false?<br><strong>9 × 2 = 3 × 6</strong>",
      "options": ["True", "False"], "answer": "True",
      "hint":    "Compute each side. Are the two sides the same?" },
    { "prompt": "🤔 Is this equation true or false?<br><strong>36 ÷ 9 = 4 × 1</strong>",
      "options": ["True", "False"], "answer": "True",
      "hint":    "Compute each side. Are the two sides the same?" },
    { "prompt": "🤔 Is this equation true or false?<br><strong>8 × 0 = 8 − 8</strong>",
      "options": ["True", "False"], "answer": "True",
      "hint":    "Compute each side. Anything times 0 is 0. Anything minus itself is 0." },
    { "prompt": "🤔 Is this equation true or false?<br><strong>5 + 5 + 5 = 3 × 5</strong>",
      "options": ["True", "False"], "answer": "True",
      "hint":    "Repeated addition is multiplication. Three groups of 5 added means 3 × 5." },
    { "prompt": "🤔 Is this equation true or false?<br><strong>16 ÷ 4 = 2 × 3</strong>",
      "options": ["True", "False"], "answer": "False",
      "hint":    "Compute each side. Are the two sides the same?" }
  ]
});
