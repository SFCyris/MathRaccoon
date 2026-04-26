/*
 * Pool: Simile Sprint (Reading Raccoon · Arcade)
 * ================================================
 * One round asks 8 questions, drawn at random from the list below (no
 * duplicates). Missed questions can be revisited at the end of the round.
 *
 * FORMAT — each question is a JSON object:
 *   {
 *     "prompt":  "The sentence shown to the player (HTML allowed).",
 *     "options": ["choice A", "choice B", "choice C", ...],
 *     "answer":  "the choice that matches — must EXACTLY equal one of options",
 *     "hint":    "optional — shown if they ask for a hint"
 *   }
 *
 * Teachers & parents: you can safely add more questions to the array below.
 * Keep at least 3× askedPerRound (so 24+ for 8 per round) to keep rounds varied.
 * Save the file, reload the page, and the new questions are live.
 */
MR.Pools.register({
  "id": "reading-arcade-simile",
  "title": "Simile Sprint",
  "mode": "figurative",
  "askedPerRound": 8,
  "questions": [
    { "prompt": "<em>Her smile was as bright as the sun.</em><br>What does this simile mean?",
      "options": ["Her smile was very bright.", "Her smile was yellow.", "Her smile was hot.", "Her smile was round."],
      "answer":  "Her smile was very bright.",
      "hint":    "The sun is famously bright — that's the comparison." },

    { "prompt": "<em>The runner moved like a cheetah.</em><br>What does this simile mean?",
      "options": ["The runner moved very fast.", "The runner had spots.", "The runner had fur.", "The runner ate meat."],
      "answer":  "The runner moved very fast.",
      "hint":    "Cheetahs are famous for speed." },

    { "prompt": "<em>The library was as quiet as a mouse.</em><br>What does this simile mean?",
      "options": ["The library was very quiet.", "The library had mice.", "The library was small.", "The library was gray."],
      "answer":  "The library was very quiet.",
      "hint":    "Mice make almost no sound." },

    { "prompt": "<em>The blanket felt as soft as a cloud.</em><br>What does this simile mean?",
      "options": ["The blanket was very soft.", "The blanket was white.", "The blanket was up high.", "The blanket was wet."],
      "answer":  "The blanket was very soft.",
      "hint":    "Clouds feel fluffy — we compare the softness." },

    { "prompt": "<em>The baby slept like a log.</em><br>What does this simile mean?",
      "options": ["The baby slept deeply.", "The baby was made of wood.", "The baby slept on a log.", "The baby was heavy."],
      "answer":  "The baby slept deeply.",
      "hint":    "A log doesn't move — it stays perfectly still." },

    { "prompt": "<em>Her hair shone like gold.</em><br>What does this simile mean?",
      "options": ["Her hair was bright and beautiful.", "Her hair was yellow metal.", "Her hair cost a lot.", "Her hair was hard."],
      "answer":  "Her hair was bright and beautiful.",
      "hint":    "Gold is shiny and prized — it's about the shine." },

    { "prompt": "<em>He eats like a bird.</em><br>What does this simile mean?",
      "options": ["He eats very little.", "He eats seeds.", "He flies while eating.", "He eats noisily."],
      "answer":  "He eats very little.",
      "hint":    "Birds take tiny bites — the simile means small appetite." },

    { "prompt": "<em>The snow was like a soft white carpet.</em><br>What does this simile mean?",
      "options": ["The snow covered everything softly.", "The snow was a rug.", "The snow was woven.", "The snow was indoors."],
      "answer":  "The snow covered everything softly.",
      "hint":    "A carpet covers the floor smoothly — snow does the same outside." },

    { "prompt": "<em>The teacher's voice was like music.</em><br>What does this simile mean?",
      "options": ["Her voice was pleasant to hear.", "She sang every word.", "She played an instrument.", "She was loud."],
      "answer":  "Her voice was pleasant to hear.",
      "hint":    "Music is nice to listen to." },

    { "prompt": "<em>His hands were as cold as ice.</em><br>What does this simile mean?",
      "options": ["His hands were very cold.", "His hands were frozen water.", "His hands were slippery.", "His hands were white."],
      "answer":  "His hands were very cold.",
      "hint":    "Ice is famously cold." },

    { "prompt": "<em>The room was like an oven.</em><br>What does this simile mean?",
      "options": ["The room was very hot.", "The room had bread inside.", "The room smelled like food.", "The room had a door."],
      "answer":  "The room was very hot.",
      "hint":    "Ovens are hot — the room feels the same." },

    { "prompt": "<em>She was as busy as a bee.</em><br>What does this simile mean?",
      "options": ["She was working very hard.", "She had stripes.", "She flew around.", "She made honey."],
      "answer":  "She was working very hard.",
      "hint":    "Bees are always buzzing around doing work." },

    { "prompt": "<em>The lake was like a mirror.</em><br>What does this simile mean?",
      "options": ["The lake was very still and reflective.", "The lake was made of glass.", "The lake was on a wall.", "The lake was small."],
      "answer":  "The lake was very still and reflective.",
      "hint":    "A mirror shows a clear reflection — so does still water." },

    { "prompt": "<em>His voice boomed like thunder.</em><br>What does this simile mean?",
      "options": ["His voice was very loud.", "His voice was wet.", "His voice brought rain.", "His voice was in the sky."],
      "answer":  "His voice was very loud.",
      "hint":    "Thunder is one of the loudest sounds." },

    { "prompt": "<em>The dancer moved like a feather.</em><br>What does this simile mean?",
      "options": ["The dancer moved lightly and gracefully.", "The dancer was small.", "The dancer flew away.", "The dancer was made of feathers."],
      "answer":  "The dancer moved lightly and gracefully.",
      "hint":    "Feathers drift softly through the air." },

    { "prompt": "<em>The water was as clear as glass.</em><br>What does this simile mean?",
      "options": ["You could see right through the water.", "The water was breakable.", "The water was a window.", "The water was hard."],
      "answer":  "You could see right through the water.",
      "hint":    "Clean glass is completely see-through." },

    { "prompt": "<em>She was as brave as a lion.</em><br>What does this simile mean?",
      "options": ["She was very brave.", "She had a mane.", "She roared loudly.", "She ate meat."],
      "answer":  "She was very brave.",
      "hint":    "Lions are a classic symbol of courage." },

    { "prompt": "<em>The pillow was like a rock.</em><br>What does this simile mean?",
      "options": ["The pillow was very hard.", "The pillow weighed a ton.", "The pillow was outside.", "The pillow was gray."],
      "answer":  "The pillow was very hard.",
      "hint":    "Rocks are hard — opposite of a good pillow!" },

    { "prompt": "<em>The river ran like a ribbon through the valley.</em><br>What does this simile mean?",
      "options": ["The river was long and winding.", "The river was made of fabric.", "The river was a decoration.", "The river was tied in a bow."],
      "answer":  "The river was long and winding.",
      "hint":    "A ribbon is a long thin strip that bends gently." },

    { "prompt": "<em>The stars were like diamonds.</em><br>What does this simile mean?",
      "options": ["The stars were sparkling brightly.", "The stars could be sold.", "The stars were square.", "The stars were expensive."],
      "answer":  "The stars were sparkling brightly.",
      "hint":    "Diamonds are famous for their sparkle." },

    { "prompt": "<em>He is as strong as an ox.</em><br>What does this simile mean?",
      "options": ["He is very strong.", "He has horns.", "He pulls a plow.", "He is slow."],
      "answer":  "He is very strong.",
      "hint":    "Oxen are known for their strength." },

    { "prompt": "<em>The kitten's fur was like silk.</em><br>What does this simile mean?",
      "options": ["The fur was very smooth.", "The fur was made of thread.", "The fur was in a dress.", "The fur was shiny metal."],
      "answer":  "The fur was very smooth.",
      "hint":    "Silk is a very smooth, soft fabric." },

    { "prompt": "<em>My sister is as sweet as honey.</em><br>What does this simile mean?",
      "options": ["She is very kind and lovable.", "She tastes sugary.", "She came from a bee.", "She is sticky."],
      "answer":  "She is very kind and lovable.",
      "hint":    "Honey is sweet — we use it for kind people too." },

    { "prompt": "<em>The old truck roared like a monster.</em><br>What does this simile mean?",
      "options": ["The truck was very loud.", "The truck was scary looking.", "The truck had teeth.", "The truck was alive."],
      "answer":  "The truck was very loud.",
      "hint":    "Monsters are famous for their roars — loud noises." }
  ]
});
