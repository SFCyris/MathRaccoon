/*
 * Pool: Word Watch (Reading Raccoon · Arcade — vocabulary)
 * =========================================================
 * Mixed vocabulary round: prefixes, suffixes, synonyms, antonyms,
 * homophones, and context clues.  8 questions per round, drawn at
 * random (no duplicates).
 *
 * FORMAT — each entry is a JSON object:
 *   {
 *     "prompt":  "Question text (HTML allowed).",
 *     "options": ["A", "B", "C", ...],
 *     "answer":  "must EXACTLY equal one of options",
 *     "hint":    "optional hint"
 *   }
 *
 * Teachers & parents: add more questions any time. Keep 3× the asked
 * count (24+) so variety stays high.
 */
MR.Pools.register({
  "id": "reading-arcade-word-watch",
  "title": "Word Watch",
  "mode": "vocabulary",
  "askedPerRound": 8,
  "questions": [
    // --- prefixes ---
    { "prompt": "What does <strong>unhappy</strong> mean?",
      "options": ["not happy", "very happy", "happy again", "sad and mad"],
      "answer":  "not happy",
      "hint":    "The prefix <em>un-</em> usually means 'not'." },

    { "prompt": "What does <strong>redo</strong> mean?",
      "options": ["do again", "do not", "finish doing", "stop doing"],
      "answer":  "do again",
      "hint":    "The prefix <em>re-</em> means 'again'." },

    { "prompt": "What does <strong>preview</strong> mean?",
      "options": ["view before", "view again", "do not view", "view carefully"],
      "answer":  "view before",
      "hint":    "The prefix <em>pre-</em> means 'before'." },

    { "prompt": "What does <strong>dislike</strong> mean?",
      "options": ["not like", "like a lot", "like again", "kind of like"],
      "answer":  "not like",
      "hint":    "The prefix <em>dis-</em> means 'not' or 'opposite of'." },

    { "prompt": "What does <strong>unlock</strong> mean?",
      "options": ["open what is locked", "lock again", "lock tightly", "not a lock"],
      "answer":  "open what is locked",
      "hint":    "<em>un-</em> undoes the action." },

    // --- suffixes ---
    { "prompt": "What does <strong>hopeful</strong> mean?",
      "options": ["full of hope", "without hope", "hope again", "tiny hope"],
      "answer":  "full of hope",
      "hint":    "The suffix <em>-ful</em> means 'full of'." },

    { "prompt": "What does <strong>careless</strong> mean?",
      "options": ["without care", "full of care", "care a lot", "careful"],
      "answer":  "without care",
      "hint":    "The suffix <em>-less</em> means 'without'." },

    { "prompt": "What does <strong>painter</strong> mean?",
      "options": ["one who paints", "full of paint", "without paint", "paint again"],
      "answer":  "one who paints",
      "hint":    "The suffix <em>-er</em> often means 'a person who does it'." },

    { "prompt": "What does <strong>fearless</strong> mean?",
      "options": ["without fear", "full of fear", "fear again", "fear a lot"],
      "answer":  "without fear",
      "hint":    "<em>-less</em> means 'without'." },

    { "prompt": "What does <strong>playful</strong> mean?",
      "options": ["full of play", "cannot play", "play again", "without play"],
      "answer":  "full of play",
      "hint":    "<em>-ful</em> means 'full of'." },

    // --- synonyms ---
    { "prompt": "Which word means the SAME as <strong>happy</strong>?",
      "options": ["glad", "sad", "angry", "tired"],
      "answer":  "glad",
      "hint":    "Synonyms share a meaning." },

    { "prompt": "Which word means the SAME as <strong>big</strong>?",
      "options": ["large", "tiny", "short", "quiet"],
      "answer":  "large",
      "hint":    "Think of another word for 'really big'." },

    { "prompt": "Which word means the SAME as <strong>fast</strong>?",
      "options": ["quick", "slow", "heavy", "late"],
      "answer":  "quick",
      "hint":    "Both describe high speed." },

    { "prompt": "Which word means the SAME as <strong>smart</strong>?",
      "options": ["clever", "silly", "slow", "plain"],
      "answer":  "clever",
      "hint":    "Another word for someone who thinks quickly." },

    { "prompt": "Which word means the SAME as <strong>begin</strong>?",
      "options": ["start", "end", "stop", "finish"],
      "answer":  "start",
      "hint":    "Both mean to get going." },

    // --- antonyms ---
    { "prompt": "Which word means the OPPOSITE of <strong>hot</strong>?",
      "options": ["cold", "warm", "cool", "steam"],
      "answer":  "cold",
      "hint":    "Pick the strongest opposite." },

    { "prompt": "Which word means the OPPOSITE of <strong>up</strong>?",
      "options": ["down", "over", "beside", "around"],
      "answer":  "down",
      "hint":    "Up and ___ are opposite directions." },

    { "prompt": "Which word means the OPPOSITE of <strong>night</strong>?",
      "options": ["day", "moon", "dark", "evening"],
      "answer":  "day",
      "hint":    "The bright time is the opposite of the dark time." },

    { "prompt": "Which word means the OPPOSITE of <strong>full</strong>?",
      "options": ["empty", "heavy", "whole", "tight"],
      "answer":  "empty",
      "hint":    "Full means completely filled. The opposite has nothing inside." },

    { "prompt": "Which word means the OPPOSITE of <strong>early</strong>?",
      "options": ["late", "soon", "first", "now"],
      "answer":  "late",
      "hint":    "Arriving before time vs. arriving after time." },

    // --- homophones ---
    { "prompt": "Fill the blank: <em>I put ___ book on the shelf.</em>",
      "options": ["their", "there", "they're"],
      "answer":  "their",
      "hint":    "Shows who owns the book." },

    { "prompt": "Fill the blank: <em>Look, ___ are acorns under the oak!</em>",
      "options": ["their", "there", "they're"],
      "answer":  "there",
      "hint":    "Points to a place." },

    { "prompt": "Fill the blank: <em>The foxes say ___ ready to play.</em>",
      "options": ["their", "there", "they're"],
      "answer":  "they're",
      "hint":    "Short for 'they are'." },

    { "prompt": "Fill the blank: <em>We went ___ the library together.</em>",
      "options": ["to", "too", "two"],
      "answer":  "to",
      "hint":    "Toward a place." },

    { "prompt": "Fill the blank: <em>I want to come, ___!</em>",
      "options": ["to", "too", "two"],
      "answer":  "too",
      "hint":    "Means 'also'." },

    { "prompt": "Fill the blank: <em>She saw ___ raccoons by the brook.</em>",
      "options": ["to", "too", "two"],
      "answer":  "two",
      "hint":    "The number 2." },

    { "prompt": "Fill the blank: <em>He ___ the ball to me.</em>",
      "options": ["threw", "through"],
      "answer":  "threw",
      "hint":    "Past tense of 'throw'." },

    // --- context clues ---
    { "prompt": "<em>The soup was bland — no salt, no herbs, no flavor at all.</em><br>What does <strong>bland</strong> mean?",
      "options": ["tasteless", "spicy", "sweet", "salty"],
      "answer":  "tasteless",
      "hint":    "'No salt, no herbs, no flavor' — that's the clue." },

    { "prompt": "<em>Sam felt elated when she found her puppy — she couldn't stop smiling.</em><br>What does <strong>elated</strong> mean?",
      "options": ["very happy", "angry", "sleepy", "afraid"],
      "answer":  "very happy",
      "hint":    "She couldn't stop smiling." },

    { "prompt": "<em>The old cottage was dilapidated — the roof sagged and the porch had gaping holes.</em><br>What does <strong>dilapidated</strong> mean?",
      "options": ["falling apart", "brand new", "very clean", "freshly painted"],
      "answer":  "falling apart",
      "hint":    "Sagging roof and gaping holes point one way." },

    { "prompt": "<em>After the storm the sky was serene — still, bright, and calm.</em><br>What does <strong>serene</strong> mean?",
      "options": ["calm and peaceful", "stormy", "cloudy", "crowded"],
      "answer":  "calm and peaceful",
      "hint":    "Still, bright, and calm all agree." }
  ]
});
