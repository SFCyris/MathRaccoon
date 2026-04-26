/*
 * Pool: Word Builder (Reading Raccoon · Arcade)
 * =============================================
 * Drag word blocks into order to assemble a sentence. Uses the dragDrop
 * engine. No typing — just drag & drop (or tap to cycle a word into the
 * next empty slot).
 *
 * FORMAT — each question is a JSON object:
 *   {
 *     "kind":   "arrange",         // always "arrange" for this arcade
 *     "prompt": "Build the sentence.",
 *     "tokens": ["a","fox","is","fast"],  // shown shuffled in the bank
 *     "answer": ["a","fox","is","fast"],  // exact target order
 *     "hint":   "Tip shown pre-answer."
 *   }
 *
 * Good sentences for 3rd-grade practice:
 *  - Simple subject + verb + object ("The raccoon hides acorns.")
 *  - Adjective + noun phrases ("The brave little fox slept.")
 *  - Question form ("Where did the bunny go?")
 *  - Compound using 'and'/'but' ("I like apples and pears.")
 *
 * Teachers & parents: 18+ recommended so each round feels fresh.
 */
MR.Pools.register({
  "id": "reading-arcade-word-builder",
  "title": "Word Builder",
  "askedPerRound": 6,
  "questions": [
    { "kind": "arrange", "prompt": "Build the sentence.",
      "tokens": ["The", "raccoon", "hides", "acorns."],
      "answer": ["The", "raccoon", "hides", "acorns."],
      "hint":   "Start with the capital word. End with the period." },

    { "kind": "arrange", "prompt": "Build the sentence.",
      "tokens": ["fox", "quick", "jumps.", "The"],
      "answer": ["The", "quick", "fox", "jumps."],
      "hint":   "Adjectives usually come right before the noun." },

    { "kind": "arrange", "prompt": "Build the sentence.",
      "tokens": ["a", "book.", "Pip", "reads"],
      "answer": ["Pip", "reads", "a", "book."],
      "hint":   "Subject → verb → object." },

    { "kind": "arrange", "prompt": "Build the sentence.",
      "tokens": ["little", "slept.", "bunny", "The"],
      "answer": ["The", "little", "bunny", "slept."],
      "hint":   "The + little = the little __." },

    { "kind": "arrange", "prompt": "Build the sentence.",
      "tokens": ["are", "Owls", "quiet.", "very"],
      "answer": ["Owls", "are", "very", "quiet."],
      "hint":   "\"Very quiet\" describes the owls." },

    { "kind": "arrange", "prompt": "Build the sentence.",
      "tokens": ["the", "climbs", "tree.", "squirrel", "The"],
      "answer": ["The", "squirrel", "climbs", "the", "tree."],
      "hint":   "Two 'the's: one for the squirrel, one for the tree." },

    { "kind": "arrange", "prompt": "Build the question.",
      "tokens": ["Where", "the", "go?", "bunny", "did"],
      "answer": ["Where", "did", "the", "bunny", "go?"],
      "hint":   "Starts with Where. Ends with a question mark." },

    { "kind": "arrange", "prompt": "Build the sentence.",
      "tokens": ["like", "apples", "and", "pears.", "I"],
      "answer": ["I", "like", "apples", "and", "pears."],
      "hint":   "\"I like __ and __.\" — list two things with 'and'." },

    { "kind": "arrange", "prompt": "Build the sentence.",
      "tokens": ["stars", "shine", "brightly.", "The"],
      "answer": ["The", "stars", "shine", "brightly."],
      "hint":   "Adverb 'brightly' describes HOW they shine." },

    { "kind": "arrange", "prompt": "Build the sentence.",
      "tokens": ["under", "slept", "tree.", "a", "Mouse"],
      "answer": ["Mouse", "slept", "under", "a", "tree."],
      "hint":   "Prepositions (under) usually start a location phrase." },

    { "kind": "arrange", "prompt": "Build the sentence.",
      "tokens": ["to", "ran", "the", "Fox", "brook."],
      "answer": ["Fox", "ran", "to", "the", "brook."],
      "hint":   "\"to the __\" points toward a place." },

    { "kind": "arrange", "prompt": "Build the sentence.",
      "tokens": ["sunny", "day.", "a", "It", "is"],
      "answer": ["It", "is", "a", "sunny", "day."],
      "hint":   "\"It is a __ __.\" — two words describe the day." },

    { "kind": "arrange", "prompt": "Build the sentence.",
      "tokens": ["love", "cheese.", "Mice"],
      "answer": ["Mice", "love", "cheese."],
      "hint":   "A tiny 3-word sentence: subject, verb, object." },

    { "kind": "arrange", "prompt": "Build the question.",
      "tokens": ["you", "Are", "ready?"],
      "answer": ["Are", "you", "ready?"],
      "hint":   "Questions put the verb first." },

    { "kind": "arrange", "prompt": "Build the sentence.",
      "tokens": ["bridge.", "built", "a", "raccoons", "strong", "The"],
      "answer": ["The", "raccoons", "built", "a", "strong", "bridge."],
      "hint":   "\"a strong __\" describes the bridge." },

    { "kind": "arrange", "prompt": "Build the sentence.",
      "tokens": ["swim", "Otters", "in", "river.", "the"],
      "answer": ["Otters", "swim", "in", "the", "river."],
      "hint":   "Otters (what) swim (action) in the river (where)." },

    { "kind": "arrange", "prompt": "Build the sentence.",
      "tokens": ["but", "cat", "sleep,", "The", "hunts.", "mice"],
      "answer": ["The", "cat", "hunts,", "but", "mice", "sleep."],
      "hint":   "Two short clauses joined by 'but'. Comma before 'but'." },

    { "kind": "arrange", "prompt": "Build the sentence.",
      "tokens": ["tall", "tree", "has", "The", "leaves.", "green"],
      "answer": ["The", "tall", "tree", "has", "green", "leaves."],
      "hint":   "Two adjectives — 'tall' for tree, 'green' for leaves." },

    { "kind": "arrange", "prompt": "Build the sentence.",
      "tokens": ["moon", "rose", "slowly.", "The"],
      "answer": ["The", "moon", "rose", "slowly."],
      "hint":   "'Slowly' is an adverb — it goes after the verb." },

    { "kind": "arrange", "prompt": "Build the sentence.",
      "tokens": ["all", "day.", "It", "rained"],
      "answer": ["It", "rained", "all", "day."],
      "hint":   "\"It rained __ __.\" — tell how long." },

    { "kind": "arrange", "prompt": "Build the sentence.",
      "tokens": ["berries,", "picked", "Bear", "Raccoon", "and", "swam."],
      "answer": ["Bear", "picked", "berries,", "and", "Raccoon", "swam."],
      "hint":   "Two actions connected with 'and'. Comma before 'and'." }
  ]
});
