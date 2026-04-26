/*!
 * Teaching op — Phonics & Spelling (reading).
 * Strategies: silent letters, vowel patterns, syllable splits.
 */
(function () {
  MR.Content.registerOp({
    id: "rd-op-phonics",
    moduleId: "reading",
    label: "Phonics & Spelling",
    emoji: "🔤",
    tagline: "Sounds that letters make (and don't make).",
    accent: "#9be8a4",
    strategies: [
      {
        id: "silent-letters",
        title: "Silent Letters",
        subtitle: "Letters that hide.",
        emoji: "🤫",
        idea: {
          hook: "Some letters are sneaky — they sit in a word but don't make a sound. Watching for them helps you spell AND read tricky words.",
          viz: {
            type: "exampleList",
            params: {
              definition: "Letters that appear but stay silent.",
              examples: [
                { text: "knight",  note: "the K is silent — 'night'" },
                { text: "write",   note: "the W is silent — 'rite'" },
                { text: "lamb",    note: "the B is silent — 'lam'" },
                { text: "hour",    note: "the H is silent — sounds like 'our'" },
                { text: "island",  note: "the S is silent — 'eye-land'" },
              ],
            },
          },
          caption: "Common silent patterns: kn-, wr-, gn-, -mb, -gh.",
        },
        watchMe: [
          { text: "'Knight' — say it aloud. Do you hear a K? No → the K is silent." },
          { text: "'Write' — say it. No W sound → the W is silent." },
          { text: "Pattern tip: if a word starts with <strong>kn-</strong>, <strong>wr-</strong>, or <strong>gn-</strong>, the first letter is silent." },
          { text: "And if a word ends in <strong>-mb</strong> (lamb, comb, thumb), the B is silent." },
        ],
        practice: [
          { prompt: "Which letter is <strong>silent</strong> in <strong>comb</strong>?",
            options: ["c", "o", "m", "b"], answer: "b", hint: "-mb ending → B is silent." },
          { prompt: "Which letter is <strong>silent</strong> in <strong>gnome</strong>?",
            options: ["g", "n", "o", "m"], answer: "g", hint: "gn- start → G is silent." },
        ],
      },
      {
        id: "vowel-patterns",
        title: "Vowel Patterns",
        subtitle: "When vowels team up.",
        emoji: "👥",
        idea: {
          hook: "Vowels (a, e, i, o, u) can team up or work alone. Three common patterns: <strong>silent-e</strong>, <strong>vowel teams</strong>, and <strong>r-controlled</strong> vowels.",
          viz: {
            type: "exampleList",
            params: {
              definition: "Three vowel jobs.",
              examples: [
                { text: "cake",  note: "silent-e — the E at the end makes the A long" },
                { text: "rain",  note: "vowel team 'ai' — first vowel talks, second stays quiet" },
                { text: "star",  note: "r-controlled — the R bosses the A around" },
              ],
            },
          },
          caption: "When you see two vowels, the first usually does the talking.",
        },
        watchMe: [
          { text: "'Cake' — an A with a silent E at the end. The E makes the A say its name: 'cāke'." },
          { text: "'Rain' — 'ai' is a vowel team. The first vowel (A) talks, the second (I) is quiet: 'rān'." },
          { text: "'Star' — the R changes the A's sound. That's r-controlled." },
          { text: "Rule of thumb: 'When two vowels go walking, the first does the talking.' (Mostly true!)" },
        ],
        practice: [
          { prompt: "What vowel pattern is in <strong>tape</strong>?",
            options: ["silent-e (long a)", "vowel team", "r-controlled", "short a"], answer: "silent-e (long a)",
            hint: "The E at the end is silent and makes the A long." },
          { prompt: "What vowel pattern is in <strong>boat</strong>?",
            options: ["oa vowel team", "silent-e", "r-controlled", "short o"], answer: "oa vowel team",
            hint: "Two vowels together — first one talks." },
        ],
      },
      {
        id: "syllables",
        title: "Syllable Splits",
        subtitle: "Break big words into beats.",
        emoji: "🥁",
        idea: {
          hook: "A syllable is one beat of a word. Clap as you say a word — each clap is a syllable. Splitting long words into syllables makes them easy to read.",
          viz: {
            type: "exampleList",
            params: {
              definition: "One vowel sound = one syllable.",
              examples: [
                { text: "cat",       note: "1 syllable — cat" },
                { text: "pen•cil",   note: "2 syllables — pen + cil" },
                { text: "but•ter•fly", note: "3 syllables — but + ter + fly" },
                { text: "el•e•phant", note: "3 syllables — el + e + phant" },
              ],
            },
          },
          caption: "Every syllable has a vowel sound.",
        },
        watchMe: [
          { text: "'Butterfly' — clap as you say it: BUT / TER / FLY. Three claps, three syllables." },
          { text: "So butterfly splits as <strong>but•ter•fly</strong>." },
          { text: "Common tip: when you see two consonants between vowels, split between them. 'Napkin' → nap•kin." },
          { text: "Try it on big words. A long word is just little words stacked up!" },
        ],
        practice: [
          { prompt: "How do you split <strong>pencil</strong> into syllables?",
            options: ["pen•cil", "pe•ncil", "p•encil"], answer: "pen•cil", hint: "Two claps: pen-cil." },
          { prompt: "How do you split <strong>robot</strong> into syllables?",
            options: ["ro•bot", "rob•ot", "r•obot"], answer: "ro•bot", hint: "Two claps: ro-bot. The 'ro' is an open syllable." },
        ],
      },
    ],
  });
})();
