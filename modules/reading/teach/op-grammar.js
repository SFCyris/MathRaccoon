/*!
 * Teaching op — Grammar (reading).
 * Strategies: parts of speech, verb tenses, subject-verb agreement, sentence types / punctuation.
 */
(function () {
  MR.Content.registerOp({
    id: "rd-op-grammar",
    moduleId: "reading",
    label: "Grammar",
    emoji: "🏛️",
    tagline: "The rules that hold sentences together.",
    accent: "#8fd8f0",
    strategies: [
      {
        id: "parts-of-speech",
        title: "Parts of Speech",
        subtitle: "Every word has a job.",
        emoji: "🏷️",
        idea: {
          hook: "Every word in a sentence has a job. Nouns name things. Verbs are actions. Adjectives describe. Adverbs tell HOW, WHEN, or WHERE.",
          viz: {
            type: "exampleList",
            params: {
              definition: "Four big jobs words do.",
              examples: [
                { text: "Raccoon",  note: "noun — a person, animal, thing, or place" },
                { text: "reads",    note: "verb — an action" },
                { text: "shiny",    note: "adjective — describes a noun" },
                { text: "quickly",  note: "adverb — tells HOW something happens" },
              ],
            },
          },
          caption: "Ask: what does this word DO in the sentence?",
        },
        watchMe: [
          { text: "'The <strong>clever</strong> fox hid the key.' What is 'clever' doing?",
            viz: { type: "richText", params: { html: `<div class="rex-def">The <span style="color:#b78af0">clever</span> fox hid the key.</div>` } } },
          { text: "It describes the fox → <strong>adjective</strong>." },
          { text: "'She sings <strong>loudly</strong>.' 'Loudly' tells HOW she sings → <strong>adverb</strong>." },
          { text: "Quick test: an <strong>-ly</strong> word is usually an adverb. A thing you can see or touch is usually a noun." },
        ],
        practice: [
          { prompt: "<em>The acorn fell quickly.</em><br>What part of speech is <strong>quickly</strong>?",
            options: ["noun", "verb", "adjective", "adverb"], answer: "adverb",
            hint: "It tells HOW the acorn fell." },
          { prompt: "<em>Owls hoot at midnight.</em><br>What part of speech is <strong>hoot</strong>?",
            options: ["noun", "verb", "adjective", "adverb"], answer: "verb",
            hint: "The action the owls do." },
        ],
      },
      {
        id: "verb-tense",
        title: "Verb Tenses",
        subtitle: "Past, present, future.",
        emoji: "⏳",
        idea: {
          hook: "Verbs change shape to show WHEN. Yesterday (past), right now (present), tomorrow (future).",
          viz: {
            type: "exampleList",
            params: {
              definition: "Three time frames.",
              examples: [
                { text: "I read the book.",          note: "past — already done" },
                { text: "I read the book every day.", note: "present — happens now" },
                { text: "I will read the book.",      note: "future — hasn't happened yet" },
              ],
            },
          },
          caption: "Look for time clues in the sentence.",
        },
        watchMe: [
          { text: "'Yesterday I ___ a book.' 'Yesterday' = past tense." },
          { text: "So the verb is <strong>read</strong> (past). 'Yesterday I read a book.'" },
          { text: "'Tomorrow we ___ the museum.' 'Tomorrow' = future tense → <strong>will visit</strong>." },
        ],
        practice: [
          { prompt: "Fill the blank: <em>Last week they ___ to the pond.</em>",
            options: ["hike", "hiked", "hiking"], answer: "hiked", hint: "'Last week' means past." },
          { prompt: "Fill the blank: <em>Tomorrow I ___ my grandma.</em>",
            options: ["visit", "visited", "will visit"], answer: "will visit", hint: "'Tomorrow' means future." },
        ],
      },
      {
        id: "subject-verb",
        title: "Subject-Verb Agreement",
        subtitle: "Singular matches singular.",
        emoji: "🤝",
        idea: {
          hook: "A single subject uses a singular verb. Many subjects use the plural verb. They have to match — that's 'agreement'.",
          viz: {
            type: "exampleList",
            params: {
              definition: "Match your verb to your subject.",
              examples: [
                { text: "The dog runs.",   note: "1 dog → 'runs' (add s)" },
                { text: "The dogs run.",   note: "many dogs → 'run' (no s)" },
                { text: "She is kind.",    note: "1 person → 'is'" },
                { text: "They are kind.",  note: "many people → 'are'" },
              ],
            },
          },
          caption: "Count first, then pick the verb.",
        },
        watchMe: [
          { text: "'The raccoons ___ in the tree.' Many raccoons? → plural verb, no s." },
          { text: "'The raccoons <strong>sleep</strong> in the tree.' Agreement! ✓" },
          { text: "'My brother ___ to school.' One brother → singular verb, add s." },
          { text: "'My brother <strong>walks</strong> to school.' ✓" },
        ],
        practice: [
          { prompt: "Pick the right verb: <em>Those birds ___ very loud.</em>",
            options: ["is", "are"], answer: "are", hint: "Many birds → plural verb." },
          { prompt: "Pick the right verb: <em>Mom ___ dinner every night.</em>",
            options: ["cook", "cooks"], answer: "cooks", hint: "One person (Mom) → add s." },
        ],
      },
      {
        id: "punctuation",
        title: "Sentence Types & Punctuation",
        subtitle: "How to finish a sentence.",
        emoji: "❗",
        idea: {
          hook: "Every sentence needs an ending mark. A period ends a plain statement. A question mark ends a question. An exclamation mark shows strong feeling.",
          viz: {
            type: "exampleList",
            params: {
              definition: "Three ways to end a sentence.",
              examples: [
                { text: "The sky is blue.",    note: "statement → period ." },
                { text: "Where are you?",      note: "question → question mark ?" },
                { text: "Watch out!",          note: "strong feeling → exclamation !" },
              ],
            },
          },
          caption: "Match the mark to the feeling.",
        },
        watchMe: [
          { text: "'What a beautiful day' — this shouts with feeling → exclamation!" },
          { text: "'Where is the library' — this asks for information → question?" },
          { text: "'I like apples' — this simply tells → period." },
          { text: "Tip: read the sentence aloud. The way your voice goes up or stays flat is a clue." },
        ],
        practice: [
          { prompt: "What punctuation ends this sentence?<br><em>Can you help me __</em>",
            options: ["?", ".", "!"], answer: "?", hint: "It asks for help." },
          { prompt: "What punctuation ends this sentence?<br><em>Look out __</em>",
            options: ["!", ".", "?"], answer: "!", hint: "Sudden warning — strong feeling." },
        ],
      },
    ],
  });
})();
