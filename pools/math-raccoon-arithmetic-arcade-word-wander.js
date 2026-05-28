/*
 * Pool: Word Wander (Math Raccoon · Arithmetic · Arcade)
 * ======================================================
 * Single-step story problems: join (add), separate (subtract), compare.
 *
 * VIZ STRATEGY:
 *   - Additive (X + Y, find total)        → barModel { parts: [X, Y] }
 *   - Subtractive (start − Y = ?)         → barModel { whole: start, parts: [Y] }
 *                                            (empty space visually = remainder)
 *   - Compare (X vs Y, how many more)     → barModel { whole: bigger, parts: [smaller] }
 *                                            (empty space visually = difference)
 *   - Multiplicative (N × Y, total)       → barModel with N equal parts of Y
 *   - Division (X ÷ N, find each)         → no viz (showing N equal parts would leak)
 */
MR.Pools.register({
  "id": "arith-arcade-word-wander",
  "title": "Word Wander",
  "askedPerRound": 8,
  "questions": [
    // ---- Additive: combine two amounts ----
    { "prompt": "🐿️ Squirrel buries 24 acorns in the oak. Later, she hides 13 more in the pine. How many acorns did she hide in all?",
      "viz": { "type": "barModel", "params": { "parts": [{ "value": 24, "label": "oak: 24" }, { "value": 13, "label": "+ pine: 13" }] } },
      "answer": 37, "hint": "Look at both bars. Add the two acorn amounts." },
    { "prompt": "🦊 Fox counts 28 pawprints on the left trail and 19 on the right. How many pawprints together?",
      "viz": { "type": "barModel", "params": { "parts": [{ "value": 28, "label": "left: 28" }, { "value": 19, "label": "+ right: 19" }] } },
      "answer": 47, "hint": "Look at both bars. Add the two pawprint counts." },
    { "prompt": "🐻 Bear picks 42 blueberries before lunch and 26 after. How many blueberries altogether?",
      "viz": { "type": "barModel", "params": { "parts": [{ "value": 42, "label": "before: 42" }, { "value": 26, "label": "+ after: 26" }] } },
      "answer": 68, "hint": "Look at both bars. Add the two blueberry amounts." },
    { "prompt": "🦝 Raccoon gathers 35 shells at the brook and 18 more from the pond. How many shells total?",
      "viz": { "type": "barModel", "params": { "parts": [{ "value": 35, "label": "brook: 35" }, { "value": 18, "label": "+ pond: 18" }] } },
      "answer": 53, "hint": "Look at both bars. Add the two shell amounts." },
    { "prompt": "🐝 A hive has 54 bees, then 27 more fly in. How many bees now?",
      "viz": { "type": "barModel", "params": { "parts": [{ "value": 54, "label": "had: 54" }, { "value": 27, "label": "+ 27 flew in" }] } },
      "answer": 81, "hint": "Look at both bars. Add the two bee amounts." },
    { "prompt": "🌻 Mouse plants 19 sunflower seeds, then 23 more. How many seeds did she plant?",
      "viz": { "type": "barModel", "params": { "parts": [{ "value": 19, "label": "first: 19" }, { "value": 23, "label": "+ then: 23" }] } },
      "answer": 42, "hint": "Look at both bars. Add the two seed amounts." },

    // ---- Subtractive: start − Y → remaining ----
    { "prompt": "🐰 Bunny had 50 carrots in the basket. He gave 17 to friends. How many carrots are left?",
      "viz": { "type": "barModel", "params": { "whole": 50, "parts": [{ "value": 17, "label": "gave away: 17" }] } },
      "answer": 33, "hint": "Start with the big bar. Take away the carrots given." },
    { "prompt": "🦝 Raccoon had 72 shiny pebbles. She dropped 28 in the brook. How many pebbles does she still have?",
      "viz": { "type": "barModel", "params": { "whole": 72, "parts": [{ "value": 28, "label": "dropped: 28" }] } },
      "answer": 44, "hint": "Start with the big bar. Take away the pebbles dropped." },
    { "prompt": "🦔 Hedgehog packed 45 mushrooms. He ate 19 on the walk home. How many are left in the bag?",
      "viz": { "type": "barModel", "params": { "whole": 45, "parts": [{ "value": 19, "label": "ate: 19" }] } },
      "answer": 26, "hint": "Start with the big bar. Take away the mushrooms eaten." },
    { "prompt": "🐿️ Squirrel had 63 acorns and lost 15 in the storm. How many acorns does she still have?",
      "viz": { "type": "barModel", "params": { "whole": 63, "parts": [{ "value": 15, "label": "lost: 15" }] } },
      "answer": 48, "hint": "Start with the big bar. Take away the acorns lost." },
    { "prompt": "🐻 Bear picked 80 berries, then ate 22. How many berries are left in the basket?",
      "viz": { "type": "barModel", "params": { "whole": 80, "parts": [{ "value": 22, "label": "ate: 22" }] } },
      "answer": 58, "hint": "Start with the big bar. Take away the berries eaten." },
    { "prompt": "📚 The library had 95 books. Owl borrowed 38 of them. How many books are still on the shelf?",
      "viz": { "type": "barModel", "params": { "whole": 95, "parts": [{ "value": 38, "label": "borrowed: 38" }] } },
      "answer": 57, "hint": "Start with the big bar. Take away the books borrowed." },

    // ---- Compare: bigger − smaller → difference ----
    { "prompt": "🦉 Owl spotted 52 fireflies. Mouse spotted 35. How many more fireflies did Owl see?",
      "viz": { "type": "barModel", "params": { "whole": 52, "parts": [{ "value": 35, "label": "Mouse: 35" }] } },
      "answer": 17, "hint": "Find the gap between the two firefly counts." },
    { "prompt": "🐼 Panda ate 48 bamboo shoots. Otter ate 29. What is the difference?",
      "viz": { "type": "barModel", "params": { "whole": 48, "parts": [{ "value": 29, "label": "Otter: 29" }] } },
      "answer": 19, "hint": "Find the gap between the two bamboo counts." },
    { "prompt": "🐝 Bee gathered 64 drops of nectar. Butterfly gathered 27. How many more did Bee gather?",
      "viz": { "type": "barModel", "params": { "whole": 64, "parts": [{ "value": 27, "label": "Butterfly: 27" }] } },
      "answer": 37, "hint": "Find the gap between the two nectar counts." },
    { "prompt": "🌰 Squirrel buried 85 acorns. Chipmunk buried 46. How many more did Squirrel bury?",
      "viz": { "type": "barModel", "params": { "whole": 85, "parts": [{ "value": 46, "label": "Chipmunk: 46" }] } },
      "answer": 39, "hint": "Find the gap between the two acorn counts." },
    { "prompt": "🐟 Otter caught 33 fish, Raccoon caught 18. How many more did Otter catch?",
      "viz": { "type": "barModel", "params": { "whole": 33, "parts": [{ "value": 18, "label": "Raccoon: 18" }] } },
      "answer": 15, "hint": "Find the gap between the two fish counts." },
    { "prompt": "⭐ Tuesday Raccoon counted 72 stars; Wednesday she counted 54. How many fewer stars on Wednesday?",
      "viz": { "type": "barModel", "params": { "whole": 72, "parts": [{ "value": 54, "label": "Wednesday: 54" }] } },
      "answer": 18, "hint": "Find the gap between the two star counts." },

    // ---- Mixed additive/subtractive ----
    { "prompt": "🎈 The picnic had 25 red balloons and 36 blue ones. How many balloons total?",
      "viz": { "type": "barModel", "params": { "parts": [{ "value": 25, "label": "red: 25" }, { "value": 36, "label": "+ blue: 36" }] } },
      "answer": 61, "hint": "Look at both bars. Add the two balloon amounts." },
    { "prompt": "📝 Hedgehog wrote 14 pages on Monday and 26 on Tuesday. How many pages total?",
      "viz": { "type": "barModel", "params": { "parts": [{ "value": 14, "label": "Mon: 14" }, { "value": 26, "label": "+ Tue: 26" }] } },
      "answer": 40, "hint": "Look at both bars. Add the two page counts." },
    { "prompt": "🪺 A nest held 12 eggs; 5 hatched first. How many eggs are left to hatch?",
      "viz": { "type": "barModel", "params": { "whole": 12, "parts": [{ "value": 5, "label": "hatched: 5" }] } },
      "answer": 7, "hint": "Start with the big bar. Take away the eggs that hatched." },
    { "prompt": "🥕 Bunny planted 48 carrots, Fox planted 23. How many more did Bunny plant?",
      "viz": { "type": "barModel", "params": { "whole": 48, "parts": [{ "value": 23, "label": "Fox: 23" }] } },
      "answer": 25, "hint": "Find the gap between the two carrot counts." },
    { "prompt": "🐾 The trail has 66 pawprints; 19 are small, the rest big. How many big pawprints?",
      "viz": { "type": "barModel", "params": { "whole": 66, "parts": [{ "value": 19, "label": "small: 19" }] } },
      "answer": 47, "hint": "Start with the big bar. Take away the small pawprints." },
    { "prompt": "🐌 Snail traveled 29 cm on Monday and 47 cm on Tuesday. Total centimeters traveled?",
      "viz": { "type": "barModel", "params": { "parts": [{ "value": 29, "label": "Mon: 29 cm" }, { "value": 47, "label": "+ Tue: 47 cm" }] } },
      "answer": 76, "suffix": "cm", "hint": "Look at both bars. Add the two day amounts." },

    // ---- Detective: pick the operation, then find the answer ----
    { "prompt": "🔍 Detective: Raccoon puts 24 acorns into 3 EQUAL piles. How many acorns in each pile?",
      "answer": 8,
      "hint": "Share 24 acorns equally into 3 piles. What times 3 reaches 24?" },
    { "prompt": "🔍 Detective: Owl had 15 mice. She caught 9 MORE. Total mice now?",
      "viz": { "type": "barModel", "params": { "parts": [{ "value": 15, "label": "had: 15" }, { "value": 9, "label": "+ caught: 9" }] } },
      "answer": 24,
      "hint": "'More' means add. Put both mouse amounts together." },
    { "prompt": "🔍 Detective: Fox had 20 berries and ate 7. How many LEFT?",
      "viz": { "type": "barModel", "params": { "whole": 20, "parts": [{ "value": 7, "label": "ate: 7" }] } },
      "answer": 13,
      "hint": "'Left' means subtract. Start big, take away the berries eaten." },
    { "prompt": "🔍 Detective: 4 birds carry 6 worms EACH. Total worms carried?",
      "viz": { "type": "barModel", "params": { "parts": [{ "value": 6, "label": "bird 1: 6" }, { "value": 6, "label": "bird 2: 6" }, { "value": 6, "label": "bird 3: 6" }, { "value": 6, "label": "bird 4: 6" }] } },
      "answer": 24,
      "hint": "Each bird carries 6. Add 6 worms four times." }
  ]
});
