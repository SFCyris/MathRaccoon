/*
 * Pool: Jug Judge (Math Raccoon · Measurement · Arcade)
 * =====================================================
 * Capacity — milliliters (CCSS 3.MD.2).
 *
 * VIZ STRATEGY:
 *   - Additive (X + Y, find total)   → barModel with parts [X, Y]
 *   - Subtractive (start − Y = ?)    → barModel with whole = start, ONE part = Y
 *                                       (empty space visually = "what's left")
 *   - Multiplicative (N × Y, total)  → barModel with N equal parts of Y
 *   - Detective "half full" / compare → capacityJug showing the actual fill state
 *   - Division (X ÷ N) → no viz: showing N equal parts would leak the answer
 */
MR.Pools.register({
  "id": "mea-arcade-jug-judge",
  "title": "Jug Judge",
  "askedPerRound": 6,
  "questions": [
    { "prompt": "🥤 A jug has 300 mL of juice. Raccoon pours in 200 mL more. Total mL?",
      "viz": { "type": "barModel", "params": { "parts": [{ "value": 300, "label": "300 mL" }, { "value": 200, "label": "+ 200 mL" }] } },
      "answer": 500, "suffix": "mL", "hint": "Look at both bars. Add the two amounts." },
    { "prompt": "🥤 A bottle holds 250 mL of milk. Add 150 mL. Total mL?",
      "viz": { "type": "barModel", "params": { "parts": [{ "value": 250, "label": "250 mL" }, { "value": 150, "label": "+ 150 mL" }] } },
      "answer": 400, "suffix": "mL", "hint": "Look at both bars. Add the two amounts." },
    { "prompt": "🍵 Teapot had 800 mL. Owl drank 350 mL. How much left?",
      "viz": { "type": "barModel", "params": { "whole": 800, "parts": [{ "value": 350, "label": "drank 350" }] } },
      "answer": 450, "suffix": "mL", "hint": "Start with the big bar. Take away what was drunk." },
    { "prompt": "🥛 Pitcher holds 900 mL. Fox pours 400 mL into a cup. How much left?",
      "viz": { "type": "barModel", "params": { "whole": 900, "parts": [{ "value": 400, "label": "poured 400" }] } },
      "answer": 500, "suffix": "mL", "hint": "Start with the big bar. Take away what was poured." },
    { "prompt": "☕ 4 teacups hold 200 mL each. Total mL?",
      "viz": { "type": "barModel", "params": { "parts": [{ "value": 200, "label": "200" }, { "value": 200, "label": "200" }, { "value": 200, "label": "200" }, { "value": 200, "label": "200" }] } },
      "answer": 800, "suffix": "mL", "hint": "Each cup holds the same. Add 200 four times." },
    { "prompt": "🍶 5 glasses of 150 mL each. Total mL?",
      "viz": { "type": "barModel", "params": { "parts": [{ "value": 150 }, { "value": 150 }, { "value": 150 }, { "value": 150 }, { "value": 150 }] } },
      "answer": 750, "suffix": "mL", "hint": "Each glass holds the same. Add 150 five times." },
    { "prompt": "🥤 3 jugs of 250 mL. Total?",
      "viz": { "type": "barModel", "params": { "parts": [{ "value": 250 }, { "value": 250 }, { "value": 250 }] } },
      "answer": 750, "suffix": "mL", "hint": "Each jug holds the same. Add 250 three times." },
    { "prompt": "🍵 A pot has 1000 mL. 2 cups of 250 mL poured out. Left?",
      "viz": { "type": "barModel", "params": { "whole": 1000, "parts": [{ "value": 250, "label": "cup 1" }, { "value": 250, "label": "cup 2" }] } },
      "answer": 500, "suffix": "mL", "hint": "First find what 2 cups holds together. Then take that from the pot." },
    { "prompt": "🥛 Start with 600 mL, pour out 180 mL. How many mL remain?",
      "viz": { "type": "barModel", "params": { "whole": 600, "parts": [{ "value": 180, "label": "poured 180" }] } },
      "answer": 420, "suffix": "mL", "hint": "Start with the big bar. Take away what was poured." },
    { "prompt": "🥤 A bottle had 450 mL. Add 270 mL. Total mL?",
      "viz": { "type": "barModel", "params": { "parts": [{ "value": 450, "label": "450 mL" }, { "value": 270, "label": "+ 270 mL" }] } },
      "answer": 720, "suffix": "mL", "hint": "Look at both bars. Add the two amounts." },
    { "prompt": "🍶 2 bottles of 500 mL. Combined?",
      "viz": { "type": "barModel", "params": { "parts": [{ "value": 500, "label": "500" }, { "value": 500, "label": "500" }] } },
      "answer": 1000, "suffix": "mL", "hint": "Each bottle holds the same. Add 500 twice." },
    { "prompt": "🥛 A cup holds 240 mL. Raccoon fills 3 cups. Total?",
      "viz": { "type": "barModel", "params": { "parts": [{ "value": 240 }, { "value": 240 }, { "value": 240 }] } },
      "answer": 720, "suffix": "mL", "hint": "Each cup holds the same. Add 240 three times." },
    { "prompt": "☕ A kettle has 1200 mL. Fill 4 cups of 200 mL each. How many mL are left?",
      "viz": { "type": "barModel", "params": { "whole": 1200, "parts": [{ "value": 200 }, { "value": 200 }, { "value": 200 }, { "value": 200 }] } },
      "answer": 400, "suffix": "mL", "hint": "First find what 4 cups holds together. Then take that from the kettle." },
    { "prompt": "🥤 Pour 175 mL + 225 mL into a jug. Total?",
      "viz": { "type": "barModel", "params": { "parts": [{ "value": 175, "label": "175" }, { "value": 225, "label": "+ 225" }] } },
      "answer": 400, "suffix": "mL", "hint": "Look at both bars. Add the two amounts." },
    { "prompt": "🍶 A bowl holds 850 mL of soup. Eat 370 mL. How many mL remain?",
      "viz": { "type": "barModel", "params": { "whole": 850, "parts": [{ "value": 370, "label": "ate 370" }] } },
      "answer": 480, "suffix": "mL", "hint": "Start with the big bar. Take away what was eaten." },
    { "prompt": "🥛 10 glasses × 100 mL each. Total?",
      "viz": { "type": "barModel", "params": { "parts": [{ "value": 100 }, { "value": 100 }, { "value": 100 }, { "value": 100 }, { "value": 100 }, { "value": 100 }, { "value": 100 }, { "value": 100 }, { "value": 100 }, { "value": 100 }] } },
      "answer": 1000, "suffix": "mL", "hint": "Each glass holds the same. Skip-count by 100s, ten times." },
    { "prompt": "☕ A teapot holds 900 mL. Pour into 3 equal cups. Each cup holds how many mL?",
      "answer": 300, "suffix": "mL", "hint": "Share 900 equally into 3 cups. What times 3 reaches 900?" },
    { "prompt": "🥤 6 bottles × 350 mL. Total?",
      "viz": { "type": "barModel", "params": { "parts": [{ "value": 350 }, { "value": 350 }, { "value": 350 }, { "value": 350 }, { "value": 350 }, { "value": 350 }] } },
      "answer": 2100, "suffix": "mL", "hint": "Each bottle holds the same. Add 350 six times." },

    // ---- Detective: capacityJug shows the actual fill state ----
    { "prompt": "🔍 Detective: a 2-L jug is half full. How many mL are inside?",
      "viz": { "type": "capacityJug", "params": { "capacity": 2, "fill": 0.5, "unit": "L", "label": "2 L jug, half full" } },
      "answer": 1000, "suffix": "mL", "hint": "Half of 2 L is 1 L. Convert that 1 L into mL." },
    { "prompt": "🔍 Detective: which holds MORE — a 2-L bottle or a 1500-mL pitcher?",
      "viz": { "type": "capacityJug", "params": { "capacity": 2, "fill": 1, "unit": "L", "label": "Compare to 1500 mL pitcher" } },
      "options": ["the 2-L bottle", "the 1500-mL pitcher", "Equal"], "answer": "the 2-L bottle",
      "hint": "1 L is 1000 mL. Change both to mL, then compare." },
    { "prompt": "🔍 Detective: a 1-L jug is half full. How many mL inside?",
      "viz": { "type": "capacityJug", "params": { "capacity": 1, "fill": 0.5, "unit": "L", "label": "1 L jug, half full" } },
      "answer": 500, "suffix": "mL",
      "hint": "1 L is 1000 mL. Find half of the total capacity." }
  ]
});
