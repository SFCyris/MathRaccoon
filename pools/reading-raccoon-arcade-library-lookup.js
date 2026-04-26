/*
 * Pool: Library Lookup (Reading Raccoon · Arcade — mixed)
 * ========================================================
 * A mixed round spanning every reading area: vocabulary, grammar,
 * phonics, figurative language, and comprehension. 10 questions per
 * round, drawn at random with no duplicates.
 *
 * FORMAT — each entry is a JSON object:
 *   {
 *     "prompt":  "Question text (HTML allowed).",
 *     "options": ["A", "B", "C", ...],
 *     "answer":  "must EXACTLY equal one of options",
 *     "hint":    "optional hint",
 *     "passage": "optional — a reading passage shown above the prompt"
 *   }
 *
 * Teachers & parents: add more items any time, especially comprehension
 * passages. Aim for 3× askedPerRound (30+) so rounds stay varied.
 */
MR.Pools.register({
  "id": "reading-arcade-library-lookup",
  "title": "Library Lookup",
  "mode": "mixed",
  "askedPerRound": 10,
  "questions": [
    // --- vocabulary ---
    { "prompt": "What does <strong>rebuild</strong> mean?",
      "options": ["build again", "not build", "build first", "stop building"],
      "answer":  "build again", "hint": "<em>re-</em> means 'again'." },
    { "prompt": "What does <strong>teacher</strong> mean?",
      "options": ["one who teaches", "without teaching", "teach again", "full of teaching"],
      "answer":  "one who teaches", "hint": "<em>-er</em> often means 'a person who ___s'." },
    { "prompt": "Which word means the SAME as <strong>small</strong>?",
      "options": ["tiny", "huge", "long", "loud"],
      "answer":  "tiny", "hint": "Synonyms share a meaning." },
    { "prompt": "Which word means the OPPOSITE of <strong>sharp</strong>?",
      "options": ["dull", "pointed", "edge", "shiny"],
      "answer":  "dull", "hint": "A dull knife won't cut." },

    // --- grammar ---
    { "prompt": "<em>The acorn fell quickly.</em><br>What part of speech is <strong>quickly</strong>?",
      "options": ["adverb", "noun", "verb", "adjective"],
      "answer":  "adverb", "hint": "It tells HOW the acorn fell." },
    { "prompt": "<em>Raccoon reads a book.</em><br>What part of speech is <strong>reads</strong>?",
      "options": ["verb", "noun", "adjective", "adverb"],
      "answer":  "verb", "hint": "An action word." },
    { "prompt": "<em>A tiny mouse scurried past.</em><br>What part of speech is <strong>mouse</strong>?",
      "options": ["noun", "verb", "adjective", "adverb"],
      "answer":  "noun", "hint": "A creature — a thing." },
    { "prompt": "Pick the right verb: <em>The kids ___ the book.</em>",
      "options": ["read", "reads"],
      "answer":  "read", "hint": "Plural subject → plain verb." },
    { "prompt": "Pick the right verb: <em>Mom ___ dinner every night.</em>",
      "options": ["cooks", "cook"],
      "answer":  "cooks", "hint": "Singular (Mom) → add 's'." },
    { "prompt": "Fill the blank: <em>Yesterday I ___ a book.</em>",
      "options": ["read", "reads", "reading"],
      "answer":  "read", "hint": "Yesterday = past tense." },
    { "prompt": "What punctuation ends this sentence?<br><em>Where is the library __</em>",
      "options": ["?", ".", "!"],
      "answer":  "?", "hint": "A question needs a question mark." },
    { "prompt": "What punctuation ends this sentence?<br><em>Look out __</em>",
      "options": ["!", ".", "?"],
      "answer":  "!", "hint": "Sudden warning — strong feeling." },

    // --- phonics ---
    { "prompt": "Which letter is <strong>silent</strong> in <strong>knight</strong>?",
      "options": ["k", "n", "g", "h"],
      "answer":  "k", "hint": "Kn- words: the first letter is silent." },
    { "prompt": "Which letter is <strong>silent</strong> in <strong>lamb</strong>?",
      "options": ["b", "l", "a", "m"],
      "answer":  "b", "hint": "Words ending in -mb: the b is silent." },
    { "prompt": "Which letter is <strong>silent</strong> in <strong>wrist</strong>?",
      "options": ["w", "r", "i", "t"],
      "answer":  "w", "hint": "Wr- words start silent." },
    { "prompt": "What vowel pattern is in <strong>boat</strong>?",
      "options": ["oa vowel team", "short o", "silent-e", "r-controlled"],
      "answer":  "oa vowel team", "hint": "Two vowels together: the first talks." },
    { "prompt": "What vowel pattern is in <strong>star</strong>?",
      "options": ["r-controlled (ar)", "silent-e", "short a", "vowel team"],
      "answer":  "r-controlled (ar)", "hint": "R bosses the vowel around." },
    { "prompt": "How do you split <strong>butterfly</strong> into syllables?",
      "options": ["but•ter•fly", "butt•erfly", "bu•tter•fly", "butter•fly"],
      "answer":  "but•ter•fly", "hint": "Clap: but-ter-fly." },
    { "prompt": "How do you split <strong>pencil</strong> into syllables?",
      "options": ["pen•cil", "pe•ncil", "penc•il", "p•encil"],
      "answer":  "pen•cil", "hint": "Two beats: pen-cil." },

    // --- figurative ---
    { "prompt": "<em>Pip is a shining star on stage.</em><br>What does this metaphor mean?",
      "options": ["Pip is excellent at performing.", "Pip lives in the sky.", "Pip glows at night.", "Pip is far away."],
      "answer":  "Pip is excellent at performing.",
      "hint":    "Metaphors don't mean it literally — Pip is not a sky star." },
    { "prompt": "<em>The classroom was a zoo.</em><br>What does this metaphor mean?",
      "options": ["The classroom was noisy and wild.", "The classroom had lions.", "The classroom was green.", "The classroom was outside."],
      "answer":  "The classroom was noisy and wild.",
      "hint":    "A zoo can be loud and chaotic." },
    { "prompt": "What does this idiom mean?<br><strong>\"Break a leg!\"</strong>",
      "options": ["Good luck!", "Be careful!", "Run away!", "Hurt your leg!"],
      "answer":  "Good luck!",
      "hint":    "A theater saying — opposite of what it sounds like." },
    { "prompt": "What does this idiom mean?<br><strong>\"Piece of cake.\"</strong>",
      "options": ["Something very easy.", "A dessert.", "A birthday party.", "A sweet treat."],
      "answer":  "Something very easy.",
      "hint":    "Idioms don't mean the words literally." },

    // --- comprehension (with passages) ---
    { "passage": "Pip the squirrel woke up early. She had twenty acorns to hide before winter. First she dug a hole by the oak. Then she buried five acorns there. She kept digging until every acorn had a safe spot.",
      "prompt": "What is this passage MOSTLY about?",
      "options": ["A squirrel hiding acorns for winter.", "How to dig a deep hole.", "Why squirrels sleep late.", "The colors of the oak tree."],
      "answer":  "A squirrel hiding acorns for winter.",
      "hint":    "The main idea is what the whole passage is about." },
    { "passage": "Pip the squirrel woke up early. She had twenty acorns to hide before winter. First she dug a hole by the oak. Then she buried five acorns there. She kept digging until every acorn had a safe spot.",
      "prompt": "Why is Pip hiding acorns?",
      "options": ["So she has food for winter.", "To plant a new tree.", "To give them to friends.", "To count them later."],
      "answer":  "So she has food for winter.",
      "hint":    "The text says she must hide them 'before winter'." },

    { "passage": "Reading Raccoon took off his glasses and sighed. Pages from every book lay scattered on the floor. 'The wind must have rushed in,' he said. He wiped his glasses, picked up a page, and began to sort them back into their books.",
      "prompt": "What caused the pages to scatter?",
      "options": ["The wind rushed in.", "Reading Raccoon threw them.", "A mouse knocked them.", "They fell by themselves."],
      "answer":  "The wind rushed in.",
      "hint":    "Reading Raccoon says it himself." },
    { "passage": "Reading Raccoon took off his glasses and sighed. Pages from every book lay scattered on the floor. 'The wind must have rushed in,' he said. He wiped his glasses, picked up a page, and began to sort them back into their books.",
      "prompt": "Which word best describes Reading Raccoon?",
      "options": ["Patient", "Angry", "Silly", "Lazy"],
      "answer":  "Patient",
      "hint":    "He sighs and calmly gets to work." },

    { "passage": "The brook in Hidden Valley is my favorite place. The water sparkles, and tiny fish dart between the stones. Everyone should visit at least once. It's the best spot in the whole valley.",
      "prompt": "Which sentence is an OPINION?",
      "options": ["It's the best spot in the whole valley.", "The water sparkles.", "Tiny fish dart between the stones.", "The brook is in Hidden Valley."],
      "answer":  "It's the best spot in the whole valley.",
      "hint":    "An opinion can't be checked — it's what someone thinks." },
    { "passage": "The brook in Hidden Valley is my favorite place. The water sparkles, and tiny fish dart between the stones. Everyone should visit at least once. It's the best spot in the whole valley.",
      "prompt": "Which sentence is a FACT?",
      "options": ["Tiny fish dart between the stones.", "It's the best spot in the whole valley.", "Everyone should visit at least once.", "The brook is my favorite place."],
      "answer":  "Tiny fish dart between the stones.",
      "hint":    "A fact can be checked or observed." },

    { "passage": "When the bell rang, the foxes bolted out the door. 'Recess!' they cheered. They ran to the field and started a game of tag. The sun was warm and the grass was soft, so they played until their laughter echoed through the trees.",
      "prompt": "What happened FIRST?",
      "options": ["The bell rang.", "They started tag.", "Their laughter echoed.", "They sat on the grass."],
      "answer":  "The bell rang.",
      "hint":    "Look for the very first sentence." },
    { "passage": "When the bell rang, the foxes bolted out the door. 'Recess!' they cheered. They ran to the field and started a game of tag. The sun was warm and the grass was soft, so they played until their laughter echoed through the trees.",
      "prompt": "Why did the foxes play so long?",
      "options": ["The sun was warm and the grass was soft.", "The teacher said so.", "They had no homework.", "They were hungry."],
      "answer":  "The sun was warm and the grass was soft.",
      "hint":    "The passage gives a direct reason." }
  ]
});
