/*
 * Pool: Picto Pop (Math Raccoon · Data · Arcade)
 * ==============================================
 * Pictograph reading — each icon stands for a number (CCSS 3.MD.3).
 *
 * FORMAT — each question is a JSON object:
 *   {
 *     "prompt":  "Story text (HTML allowed).",
 *     "answer":  12,                 // the numeric answer
 *     "options": [10, 12, 14],       // optional
 *     "suffix":  "",                 // usually empty ("cats", etc. can go in prompt)
 *     "hint":    "Multiply icons × scale."
 *   }
 *
 * Teachers & parents: add more pictograph stories freely.
 */
MR.Pools.register({
  "id": "dat-arcade-picto-pop",
  "title": "Picto Pop",
  "askedPerRound": 6,
  "questions": [
    { "prompt": "🖼️ Each 🐶 means 2 dogs. The row shows 🐶🐶🐶🐶. How many dogs?",
      "viz": { "type": "skipCountPicto", "params": { "icon": "🐶", "scale": 2, "count": 4, "showTally": false } },
      "answer": 8, "hint": "Each icon is 2 dogs. Skip-count by 2 along the row." },
    { "prompt": "🖼️ Each ⭐ means 5 wishes. A row has ⭐⭐⭐. How many wishes?",
      "viz": { "type": "skipCountPicto", "params": { "icon": "⭐", "scale": 5, "count": 3, "showTally": false } },
      "answer": 15, "hint": "Each star is 5 wishes. Skip-count by 5s." },
    { "prompt": "🖼️ Each 🍎 means 4 apples. A row shows 🍎🍎🍎🍎🍎. How many apples?",
      "viz": { "type": "skipCountPicto", "params": { "icon": "🍎", "scale": 4, "count": 5, "showTally": false } },
      "answer": 20, "hint": "Each apple icon is 4 apples. Skip-count by 4s." },
    { "prompt": "🖼️ Each 🐟 means 10 fish. Row: 🐟🐟🐟. How many fish?",
      "viz": { "type": "skipCountPicto", "params": { "icon": "🐟", "scale": 10, "count": 3, "showTally": false } },
      "answer": 30, "hint": "Each fish is 10. Skip-count by 10s along the row." },
    { "prompt": "🖼️ Each 🐝 means 3 bees. Row: 🐝🐝🐝🐝🐝🐝. How many bees?",
      "viz": { "type": "skipCountPicto", "params": { "icon": "🐝", "scale": 3, "count": 6, "showTally": false } },
      "answer": 18, "hint": "Each bee icon is 3 bees. Skip-count by 3s." },
    { "prompt": "🖼️ Each 🚗 means 6 cars. Row: 🚗🚗🚗🚗. Total cars?",
      "viz": { "type": "skipCountPicto", "params": { "icon": "🚗", "scale": 6, "count": 4, "showTally": false } },
      "answer": 24, "hint": "Each car icon is 6 cars. Skip-count by 6s." },
    { "prompt": "🖼️ Each 🐰 means 2 bunnies. Row: 🐰🐰🐰🐰🐰🐰🐰. Total bunnies?",
      "viz": { "type": "skipCountPicto", "params": { "icon": "🐰", "scale": 2, "count": 7, "showTally": false } },
      "answer": 14, "hint": "Each bunny icon is 2. Skip-count by 2s." },
    { "prompt": "🖼️ Each 🦊 means 5 foxes. Row: 🦊🦊🦊🦊. Total foxes?",
      "viz": { "type": "skipCountPicto", "params": { "icon": "🦊", "scale": 5, "count": 4, "showTally": false } },
      "answer": 20, "hint": "Each fox icon is 5. Skip-count by 5s." },
    { "prompt": "🖼️ Each 🐻 stands for 4 bears. Monday's row has 3 icons. How many bears were on Monday?",
      "viz": { "type": "skipCountPicto", "params": { "icon": "🐻", "scale": 4, "count": 3, "showTally": false } },
      "answer": 12, "hint": "Each bear icon is 4 bears. Skip-count by 4s, three times." },
    { "prompt": "🖼️ Each 🌟 means 2 stars. Row A has 6 icons. How many stars in Row A?",
      "viz": { "type": "skipCountPicto", "params": { "icon": "🌟", "scale": 2, "count": 6, "showTally": false } },
      "answer": 12, "hint": "Each star icon is 2. Skip-count by 2s, six times." },
    { "prompt": "🖼️ Each 📚 means 10 books. Row: 📚📚📚📚📚. Total books?",
      "viz": { "type": "skipCountPicto", "params": { "icon": "📚", "scale": 10, "count": 5, "showTally": false } },
      "answer": 50, "hint": "Each book icon is 10. Skip-count by 10s." },
    { "prompt": "🖼️ Each 🍪 means 3 cookies. If 8 icons, total cookies?",
      "viz": { "type": "skipCountPicto", "params": { "icon": "🍪", "scale": 3, "count": 8, "showTally": false } },
      "answer": 24, "hint": "Each cookie icon is 3. Skip-count by 3s, eight times." },
    { "prompt": "🖼️ Each 🌸 means 5 flowers. Row has 7 flowers' icons. Total?",
      "viz": { "type": "skipCountPicto", "params": { "icon": "🌸", "scale": 5, "count": 7, "showTally": false } },
      "answer": 35, "hint": "Each flower icon is 5. Skip-count by 5s, seven times." },
    { "prompt": "🖼️ Each 🐝 stands for 4 bees. Row A has 5 icons. Row B has 3 icons. How many bees in BOTH rows together?",
      "answer": 32, "hint": "First add the icons in both rows. Then skip-count by 4s for the total." },
    { "prompt": "🖼️ Each 🐟 stands for 10 fish. The row has 3 icons. How many fish in the row?",
      "viz": { "type": "skipCountPicto", "params": { "icon": "🐟", "scale": 10, "count": 3, "showTally": false } },
      "answer": 30, "hint": "Each fish icon is 10. Skip-count by 10s." },
    { "prompt": "🖼️ Each 🎈 means 2 balloons. If the row shows 9 icons, total balloons?",
      "viz": { "type": "skipCountPicto", "params": { "icon": "🎈", "scale": 2, "count": 9, "showTally": false } },
      "answer": 18, "hint": "Each balloon icon is 2. Skip-count by 2s, nine times." },
    { "prompt": "🖼️ Each 🍓 means 6 berries. Row has 4 icons. Total berries?",
      "viz": { "type": "skipCountPicto", "params": { "icon": "🍓", "scale": 6, "count": 4, "showTally": false } },
      "answer": 24, "hint": "Each berry icon is 6. Skip-count by 6s, four times." },
    { "prompt": "🖼️ Each pet icon stands for 5 pets. The dogs row has 4 icons. The cats row has 6 icons. How many MORE cats than dogs?",
      "answer": 10, "hint": "Find the total for each row. Then find the gap between them." },

    // ---- Reverse: given the total, find the icon count or scale ----
    { "prompt": "🔍 Detective: each 🐝 = 4 bees and the row totals 24 bees. How many icons are in the row?",
      "answer": 6, "hint": "Each icon stands for 4. What times 4 reaches 24?" },
    { "prompt": "🔍 Detective: a row has 5 🌟 icons and totals 25 wishes. What does each star represent?",
      "answer": 5, "hint": "Count the stars in the row. What number times that count reaches 25?" },
    { "prompt": "🔍 Detective: each 🐟 means 10 fish. Friday's total was 60 fish. How many icons that day?",
      "answer": 6, "hint": "Each icon stands for 10. What times 10 reaches 60?" },
    { "prompt": "🔍 Detective: each 🍎 means 3 apples. A row shows a total of 21 apples. Icon count?",
      "answer": 7, "hint": "Each icon stands for 3. What times 3 reaches 21?" }
  ]
});
