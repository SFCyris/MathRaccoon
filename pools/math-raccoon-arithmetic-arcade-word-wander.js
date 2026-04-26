/*
 * Pool: Word Wander (Math Raccoon · Arithmetic · Arcade)
 * ======================================================
 * Single-step story problems: join (add), separate (subtract), compare.
 *
 * FORMAT — each question is a JSON object:
 *   {
 *     "prompt":  "Story text (HTML allowed — <em>, <strong>, emoji ok).",
 *     "answer":  42,                    // the correct numeric answer
 *     "options": [42, 40, 51, 37],      // optional — engine auto-builds if omitted
 *     "suffix":  "",                    // optional unit label (e.g. "cm", "¢")
 *     "hint":    "Tip Math Raccoon whispers."
 *   }
 *
 * Teachers & parents: add more stories freely. 24+ recommended.
 */
MR.Pools.register({
  "id": "arith-arcade-word-wander",
  "title": "Word Wander",
  "askedPerRound": 8,
  "questions": [
    { "prompt": "🐿️ Squirrel buries 24 acorns in the oak. Later, she hides 13 more in the pine. How many acorns did she hide in all?",
      "answer": 37, "hint": "Put both amounts together — add." },
    { "prompt": "🦊 Fox counts 28 pawprints on the left trail and 19 on the right. How many pawprints together?",
      "answer": 47, "hint": "Add the two counts." },
    { "prompt": "🐻 Bear picks 42 blueberries before lunch and 26 after. How many blueberries altogether?",
      "answer": 68, "hint": "Add both picks." },
    { "prompt": "🦝 Raccoon gathers 35 shells at the brook and 18 more from the pond. How many shells total?",
      "answer": 53, "hint": "Combine both piles." },
    { "prompt": "🐝 A hive has 54 bees, then 27 more fly in. How many bees now?",
      "answer": 81, "hint": "Add — more came in." },
    { "prompt": "🌻 Mouse plants 19 sunflower seeds, then 23 more. How many seeds did she plant?",
      "answer": 42, "hint": "Add the two plantings." },

    { "prompt": "🐰 Bunny had 50 carrots in the basket. He gave 17 to friends. How many carrots are left?",
      "answer": 33, "hint": "Start big, take some away." },
    { "prompt": "🦝 Raccoon had 72 shiny pebbles. She dropped 28 in the brook. How many pebbles does she still have?",
      "answer": 44, "hint": "Subtract the dropped pebbles." },
    { "prompt": "🦔 Hedgehog packed 45 mushrooms. He ate 19 on the walk home. How many are left in the bag?",
      "answer": 26, "hint": "Take away the eaten ones." },
    { "prompt": "🐿️ Squirrel had 63 acorns and lost 15 in the storm. How many acorns does she still have?",
      "answer": 48, "hint": "Subtract the lost ones." },
    { "prompt": "🐻 Bear picked 80 berries, then ate 22. How many berries are left in the basket?",
      "answer": 58, "hint": "Start big, subtract." },
    { "prompt": "📚 The library had 95 books. Owl borrowed 38 of them. How many books are still on the shelf?",
      "answer": 57, "hint": "Subtract the borrowed books." },

    { "prompt": "🦉 Owl spotted 52 fireflies. Mouse spotted 35. How many more fireflies did Owl see?",
      "answer": 17, "hint": "Bigger minus smaller = the difference." },
    { "prompt": "🐼 Panda ate 48 bamboo shoots. Otter ate 29. What is the difference?",
      "answer": 19, "hint": "Bigger count minus smaller count." },
    { "prompt": "🐝 Bee gathered 64 drops of nectar. Butterfly gathered 27. How many more did Bee gather?",
      "answer": 37, "hint": "64 − 27." },
    { "prompt": "🌰 Squirrel buried 85 acorns. Chipmunk buried 46. How many more did Squirrel bury?",
      "answer": 39, "hint": "Subtract smaller from bigger." },
    { "prompt": "🐟 Otter caught 33 fish, Raccoon caught 18. How many more did Otter catch?",
      "answer": 15, "hint": "33 − 18." },
    { "prompt": "⭐ Tuesday Raccoon counted 72 stars; Wednesday she counted 54. How many fewer stars on Wednesday?",
      "answer": 18, "hint": "Subtract the smaller count." },

    { "prompt": "🎈 The picnic had 25 red balloons and 36 blue ones. How many balloons total?",
      "answer": 61, "hint": "Add both colors." },
    { "prompt": "📝 Hedgehog wrote 14 pages on Monday and 26 on Tuesday. How many pages total?",
      "answer": 40, "hint": "Combine the two days." },
    { "prompt": "🪺 A nest held 12 eggs; 5 hatched first. How many eggs are left to hatch?",
      "answer": 7, "hint": "Subtract the hatched ones." },
    { "prompt": "🥕 Bunny planted 48 carrots, Fox planted 23. How many more did Bunny plant?",
      "answer": 25, "hint": "Bigger minus smaller." },
    { "prompt": "🐾 The trail has 66 pawprints; 19 are small, the rest big. How many big pawprints?",
      "answer": 47, "hint": "Total minus the small ones." },
    { "prompt": "🐌 Snail traveled 29 cm on Monday and 47 cm on Tuesday. Total centimeters traveled?",
      "answer": 76, "suffix": "cm", "hint": "Add the two days." }
  ]
});
