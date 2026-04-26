/*!
 * Teaching op — Vocabulary (reading).
 * Strategies: prefixes/suffixes, synonyms/antonyms, homophones, context clues.
 */
(function () {
  MR.Content.registerOp({
    id: "rd-op-vocabulary",
    moduleId: "reading",
    label: "Vocabulary",
    emoji: "📖",
    tagline: "Let's build word power!",
    accent: "#b78af0",
    strategies: [
      {
        id: "prefix-suffix",
        title: "Prefixes & Suffixes",
        subtitle: "Small parts, big meaning.",
        emoji: "🧩",
        idea: {
          hook: "A word can have a helper at the front (prefix) or the end (suffix). These little helpers change the whole meaning.",
          viz: {
            type: "wordBreak",
            params: {
              word: "unhappy",
              parts: [
                { text: "un",    role: "prefix" },
                { text: "happy", role: "root"   },
              ],
              gloss: "un- means 'not' → unhappy = not happy",
            },
          },
          caption: "Prefix = front helper. Suffix = back helper.",
        },
        watchMe: [
          {
            text: "Let's try 'redo'. 're-' is a prefix meaning 'again'.",
            viz: { type: "wordBreak", params: { word: "redo", parts: [{ text: "re", role: "prefix" }, { text: "do", role: "root" }], gloss: "re- means 'again' → redo = do again" } },
          },
          {
            text: "Now 'hopeful'. '-ful' is a suffix meaning 'full of'.",
            viz: { type: "wordBreak", params: { word: "hopeful", parts: [{ text: "hope", role: "root" }, { text: "ful", role: "suffix" }], gloss: "-ful means 'full of' → hopeful = full of hope" } },
          },
          {
            text: "And 'hopeless'. '-less' is a suffix meaning 'without'.",
            viz: { type: "wordBreak", params: { word: "hopeless", parts: [{ text: "hope", role: "root" }, { text: "less", role: "suffix" }], gloss: "-less means 'without' → hopeless = without hope" } },
          },
          {
            text: "Common prefixes: un- (not), re- (again), pre- (before), dis- (not). Common suffixes: -ful (full of), -less (without), -er (one who).",
            viz: {
              type: "exampleList",
              params: {
                definition: "Use the helper's meaning plus the root.",
                examples: [
                  { text: "preview",  note: "pre- + view = view BEFORE" },
                  { text: "teacher",  note: "teach + -er = ONE WHO teaches" },
                  { text: "careless", note: "care + -less = WITHOUT care" },
                ],
              },
            },
          },
        ],
        practice: [
          { prompt: "What does <strong>unkind</strong> mean?",   options: ["not kind", "very kind", "kind of"], answer: "not kind", hint: "un- means 'not'." },
          { prompt: "What does <strong>fearless</strong> mean?", options: ["full of fear", "without fear", "a little fear"], answer: "without fear", hint: "-less means 'without'." },
        ],
      },
      {
        id: "synonyms-antonyms",
        title: "Synonyms & Antonyms",
        subtitle: "Same-same or total opposites.",
        emoji: "🔄",
        idea: {
          hook: "Synonyms mean almost the SAME. Antonyms mean the OPPOSITE. Knowing these helps you describe things in more colorful ways.",
          viz: {
            type: "exampleList",
            params: {
              definition: "Synonyms = same meaning. Antonyms = opposite meaning.",
              examples: [
                { text: "happy / glad",  note: "synonyms — both mean cheerful" },
                { text: "big / large",   note: "synonyms — both mean large size" },
                { text: "hot / cold",    note: "antonyms — opposites" },
                { text: "up / down",     note: "antonyms — opposites" },
              ],
            },
          },
          caption: "Synonyms pair up. Antonyms face off.",
        },
        watchMe: [
          { text: "'Fast' and 'quick' — both mean moving with speed. Synonyms!",
            viz: { type: "richText", params: { html: `<div class="rex-def"><strong>fast</strong> = <strong>quick</strong> (synonyms)</div>` } } },
          { text: "'Fast' and 'slow' — they go opposite directions. Antonyms!",
            viz: { type: "richText", params: { html: `<div class="rex-def"><strong>fast</strong> ⟷ <strong>slow</strong> (antonyms)</div>` } } },
          { text: "Tip: if two words could switch places in a sentence without changing the meaning, they're synonyms. If the meaning flips, they're antonyms." },
        ],
        practice: [
          { prompt: "Which word is a SYNONYM for <strong>begin</strong>?", options: ["start", "end", "stop"], answer: "start", hint: "Begin and start both mean to set off." },
          { prompt: "Which word is an ANTONYM for <strong>early</strong>?", options: ["soon", "late", "first"], answer: "late", hint: "Early and late go opposite ways." },
        ],
      },
      {
        id: "homophones",
        title: "Homophones",
        subtitle: "Sound the same, mean different.",
        emoji: "👯",
        idea: {
          hook: "Some words sound exactly alike but mean totally different things. Pick the right one by checking the meaning of the sentence.",
          viz: {
            type: "exampleList",
            params: {
              definition: "Homophones = sound the same, spell differently, mean differently.",
              examples: [
                { text: "their",   note: "belongs to them — 'their books'" },
                { text: "there",   note: "a place — 'over there'" },
                { text: "they're", note: "short for 'they are' — 'they're reading'" },
              ],
            },
          },
          caption: "Read the sentence. Which meaning fits?",
        },
        watchMe: [
          { text: "Try: 'Look, ___ are the pages!' — Does it mean a place? Belongs to someone? Or 'they are'?",
            viz: { type: "richText", params: { html: `<div class="rex-def">'Look, <span style="color:#b78af0">___</span> are the pages!'</div>` } } },
          { text: "'There' fits — it points to a place where the pages are." },
          { text: "Tip: If you can say 'they are' in place of the word, use <strong>they're</strong>. If it shows ownership, use <strong>their</strong>. Otherwise, <strong>there</strong>." },
        ],
        practice: [
          { prompt: "Fill the blank: 'I want to come, ___!'", options: ["to", "too", "two"], answer: "too", hint: "'Too' means 'also'." },
          { prompt: "Fill the blank: 'She saw ___ raccoons.'", options: ["to", "too", "two"], answer: "two", hint: "A number — 2 raccoons." },
        ],
      },
      {
        id: "context-clues",
        title: "Context Clues",
        subtitle: "Use the sentence to figure it out.",
        emoji: "🔍",
        idea: {
          hook: "If you don't know a word, DON'T panic. Look at the sentence around it. The other words are clues to its meaning.",
          viz: {
            type: "richText",
            params: {
              html: `<div class="rex-def"><strong>Sentence:</strong> The soup was <em>bland</em>; it had no salt, no herbs, no flavor at all.</div>
                     <div class="rex-def" style="margin-top:10px"><strong>Clues:</strong> "no salt, no herbs, no flavor" → <strong>bland</strong> means tasteless.</div>`,
            },
          },
          caption: "Clues are like fingerprints — follow them to the meaning.",
        },
        watchMe: [
          { text: "Try this sentence: 'After the storm the sky was serene — still, bright, and calm.'" },
          { text: "Clues: 'still, bright, and calm.' They all mean peaceful. So <strong>serene</strong> = calm and peaceful." },
          { text: "Trick: look for synonyms in the sentence, or for an example that shows the meaning." },
        ],
        practice: [
          {
            prompt: "In: 'Sam felt <em>elated</em> when she found her puppy — she couldn't stop smiling.'<br>What does <strong>elated</strong> mean?",
            options: ["angry", "very happy", "sleepy"], answer: "very happy",
            hint: "'Couldn't stop smiling' is a clue.",
          },
          {
            prompt: "In: 'The old cottage was <em>dilapidated</em> — the roof sagged and the porch had holes.'<br>What does <strong>dilapidated</strong> mean?",
            options: ["brand new", "falling apart", "freshly painted"], answer: "falling apart",
            hint: "Sagging roof + holes = broken down.",
          },
        ],
      },
    ],
  });
})();
