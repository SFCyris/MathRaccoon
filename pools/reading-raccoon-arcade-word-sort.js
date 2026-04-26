/*
 * Pool: Word Sort (Reading Raccoon · Arcade)
 * ==========================================
 * Drag words into labeled buckets. No typing.
 *
 * FORMAT — each question is a JSON object:
 *   {
 *     "kind":    "categorize",
 *     "prompt":  "Sort by part of speech.",
 *     "buckets": [
 *       { "id": "noun", "label": "Noun" },
 *       { "id": "verb", "label": "Verb" },
 *       { "id": "adj",  "label": "Adjective" }
 *     ],
 *     "tokens": [
 *       { "text": "raccoon", "bucket": "noun" },
 *       { "text": "runs",    "bucket": "verb" },
 *       { "text": "furry",   "bucket": "adj" }
 *     ],
 *     "hint": "Noun = names, Verb = acts, Adjective = describes."
 *   }
 *
 * Good groupings for 3rd grade:
 *  - Nouns / Verbs / Adjectives
 *  - Synonyms clusters (Big words vs. Small words)
 *  - Rhyming groups
 *  - Literal vs. Figurative meanings
 *
 * Teachers & parents: 15+ recommended.
 */
MR.Pools.register({
  "id": "reading-arcade-word-sort",
  "title": "Word Sort",
  "askedPerRound": 5,
  "questions": [
    { "kind": "categorize",
      "prompt": "Sort the words by part of speech.",
      "buckets": [
        { "id": "noun", "label": "🧺 Noun"      },
        { "id": "verb", "label": "🏃 Verb"      },
        { "id": "adj",  "label": "🎨 Adjective" }
      ],
      "tokens": [
        { "text": "raccoon", "bucket": "noun" },
        { "text": "runs",    "bucket": "verb" },
        { "text": "furry",   "bucket": "adj"  },
        { "text": "tree",    "bucket": "noun" },
        { "text": "jumps",   "bucket": "verb" },
        { "text": "tiny",    "bucket": "adj"  }
      ],
      "hint": "Noun = names a thing, Verb = an action, Adjective = describes." },

    { "kind": "categorize",
      "prompt": "Sort the words by part of speech.",
      "buckets": [
        { "id": "noun", "label": "🧺 Noun"      },
        { "id": "verb", "label": "🏃 Verb"      },
        { "id": "adj",  "label": "🎨 Adjective" }
      ],
      "tokens": [
        { "text": "owl",     "bucket": "noun" },
        { "text": "hoots",   "bucket": "verb" },
        { "text": "quiet",   "bucket": "adj"  },
        { "text": "forest",  "bucket": "noun" },
        { "text": "bright",  "bucket": "adj"  },
        { "text": "flies",   "bucket": "verb" }
      ],
      "hint": "Does the word name, act, or describe?" },

    { "kind": "categorize",
      "prompt": "Sort the words by part of speech.",
      "buckets": [
        { "id": "noun", "label": "🧺 Noun"      },
        { "id": "verb", "label": "🏃 Verb"      },
        { "id": "adj",  "label": "🎨 Adjective" }
      ],
      "tokens": [
        { "text": "sparkles", "bucket": "verb" },
        { "text": "brook",    "bucket": "noun" },
        { "text": "cold",     "bucket": "adj"  },
        { "text": "pebble",   "bucket": "noun" },
        { "text": "swims",    "bucket": "verb" },
        { "text": "clear",    "bucket": "adj"  }
      ],
      "hint": "Try replacing the word with a similar-class word to test it." },

    { "kind": "categorize",
      "prompt": "Sort the words by part of speech.",
      "buckets": [
        { "id": "noun", "label": "🧺 Noun"      },
        { "id": "verb", "label": "🏃 Verb"      },
        { "id": "adv",  "label": "🌬 Adverb"     }
      ],
      "tokens": [
        { "text": "rabbit",   "bucket": "noun" },
        { "text": "hops",     "bucket": "verb" },
        { "text": "quickly",  "bucket": "adv"  },
        { "text": "whispered","bucket": "verb" },
        { "text": "softly",   "bucket": "adv"  },
        { "text": "friend",   "bucket": "noun" }
      ],
      "hint": "Adverbs often end in '-ly' and describe HOW a verb happens." },

    { "kind": "categorize",
      "prompt": "Group the synonyms.",
      "buckets": [
        { "id": "big",   "label": "🐘 Means 'big'"   },
        { "id": "small", "label": "🐜 Means 'small'" }
      ],
      "tokens": [
        { "text": "huge",   "bucket": "big"   },
        { "text": "tiny",   "bucket": "small" },
        { "text": "giant",  "bucket": "big"   },
        { "text": "little", "bucket": "small" },
        { "text": "massive","bucket": "big"   },
        { "text": "wee",    "bucket": "small" }
      ],
      "hint": "Which words replace 'big'? Which replace 'small'?" },

    { "kind": "categorize",
      "prompt": "Group the synonyms.",
      "buckets": [
        { "id": "happy", "label": "🙂 Means 'happy'"  },
        { "id": "sad",   "label": "😢 Means 'sad'"    }
      ],
      "tokens": [
        { "text": "glad",     "bucket": "happy" },
        { "text": "cheerful", "bucket": "happy" },
        { "text": "gloomy",   "bucket": "sad"   },
        { "text": "joyful",   "bucket": "happy" },
        { "text": "miserable","bucket": "sad"   },
        { "text": "blue",     "bucket": "sad"   }
      ],
      "hint": "Think: could this word replace 'happy' or 'sad' in a sentence?" },

    { "kind": "categorize",
      "prompt": "Sort the words by vowel sound.",
      "buckets": [
        { "id": "long-a",  "label": "Long A (cake)" },
        { "id": "short-a", "label": "Short A (cat)" }
      ],
      "tokens": [
        { "text": "rain",  "bucket": "long-a"  },
        { "text": "hat",   "bucket": "short-a" },
        { "text": "tape",  "bucket": "long-a"  },
        { "text": "map",   "bucket": "short-a" },
        { "text": "plane", "bucket": "long-a"  },
        { "text": "bag",   "bucket": "short-a" }
      ],
      "hint": "Long-A says the LETTER's name; Short-A says /a/ as in 'cat'." },

    { "kind": "categorize",
      "prompt": "Sort by ending sound (rhymes).",
      "buckets": [
        { "id": "at", "label": "rhymes with -at" },
        { "id": "an", "label": "rhymes with -an" },
        { "id": "in", "label": "rhymes with -in" }
      ],
      "tokens": [
        { "text": "cat", "bucket": "at" },
        { "text": "man", "bucket": "an" },
        { "text": "pin", "bucket": "in" },
        { "text": "bat", "bucket": "at" },
        { "text": "fan", "bucket": "an" },
        { "text": "win", "bucket": "in" }
      ],
      "hint": "Listen to the last two letters of each word." },

    { "kind": "categorize",
      "prompt": "Literal or figurative?",
      "buckets": [
        { "id": "literal",    "label": "📖 Literal (real)"       },
        { "id": "figurative", "label": "✨ Figurative (imagine)" }
      ],
      "tokens": [
        { "text": "It rained cats and dogs",  "bucket": "figurative" },
        { "text": "The cat sat on the mat",   "bucket": "literal"    },
        { "text": "Owl hooted at midnight",   "bucket": "literal"    },
        { "text": "Her smile lit the room",   "bucket": "figurative" },
        { "text": "I'm so hungry I could eat a horse", "bucket": "figurative" },
        { "text": "The mouse ate the cheese", "bucket": "literal" }
      ],
      "hint": "Literal = actually true. Figurative = just a picture in your mind." },

    { "kind": "categorize",
      "prompt": "Sort the words by part of speech.",
      "buckets": [
        { "id": "noun", "label": "🧺 Noun"      },
        { "id": "verb", "label": "🏃 Verb"      },
        { "id": "adj",  "label": "🎨 Adjective" }
      ],
      "tokens": [
        { "text": "meadow",  "bucket": "noun" },
        { "text": "dances",  "bucket": "verb" },
        { "text": "golden",  "bucket": "adj"  },
        { "text": "petal",   "bucket": "noun" },
        { "text": "shimmers","bucket": "verb" },
        { "text": "soft",    "bucket": "adj"  }
      ],
      "hint": "Noun = thing. Verb = action. Adjective = describes." },

    { "kind": "categorize",
      "prompt": "Group the antonyms.",
      "buckets": [
        { "id": "hot",  "label": "🔥 Means HOT"  },
        { "id": "cold", "label": "❄️ Means COLD" }
      ],
      "tokens": [
        { "text": "boiling", "bucket": "hot"  },
        { "text": "frosty",  "bucket": "cold" },
        { "text": "scorching","bucket": "hot" },
        { "text": "chilly",  "bucket": "cold" },
        { "text": "icy",     "bucket": "cold" },
        { "text": "burning", "bucket": "hot"  }
      ],
      "hint": "Which feel warm to touch? Which feel cold?" },

    { "kind": "categorize",
      "prompt": "Subject or verb?",
      "buckets": [
        { "id": "subj", "label": "👉 Who / What" },
        { "id": "verb", "label": "🏃 Action"      }
      ],
      "tokens": [
        { "text": "Raccoon",   "bucket": "subj" },
        { "text": "laughs",    "bucket": "verb" },
        { "text": "The owl",   "bucket": "subj" },
        { "text": "flew",      "bucket": "verb" },
        { "text": "My sister", "bucket": "subj" },
        { "text": "reads",     "bucket": "verb" }
      ],
      "hint": "The subject tells WHO; the verb tells WHAT they do." }
  ]
});
