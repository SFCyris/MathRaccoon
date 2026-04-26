/*!
 * engines/reading.js — reading & ELA problem generators.
 *
 * Modes (choose via cfg.mode, or cfg.modes for a mixed pool):
 *   "vocabulary"    — prefixes/suffixes, synonyms/antonyms, homophones, context clues
 *   "grammar"       — parts of speech, verb tense, subject-verb agreement, punctuation
 *   "phonics"       — silent letters, patterns, syllable splits
 *   "figurative"    — simile / metaphor / idiom meanings
 *   "comprehension" — main idea, inference, sequencing, fact vs. opinion
 *
 * Exposes the standard engine interface:
 *   generate(cfg, qIndex) → { mode, prompt, options, answer, ... }
 *   renderPrompt(p) → HTML
 *   renderVisual(p) → HTML (may be "")
 *   hintFor(p) → string
 *   formatOption(opt, p) → HTML
 *   optionsEqual(a, b, p) → boolean
 */
(function () {
  const { pick, shuffle } = window.MR.Engines.Util;

  // ---------- BANKS ----------

  // Vocabulary — each entry has a correct answer + three distractors.
  const PREFIXES = [
    { word: "unhappy",    root: "happy",  pre: "un-",  meaning: "not happy",       distractors: ["very happy", "happy again", "the opposite of sad"] },
    { word: "redo",       root: "do",     pre: "re-",  meaning: "do again",        distractors: ["do not", "finish doing", "stop doing"] },
    { word: "preview",    root: "view",   pre: "pre-", meaning: "view before",     distractors: ["view again", "do not view", "view carefully"] },
    { word: "unkind",     root: "kind",   pre: "un-",  meaning: "not kind",        distractors: ["very kind", "kind again", "kind of"] },
    { word: "rebuild",    root: "build",  pre: "re-",  meaning: "build again",     distractors: ["not build", "build first", "stop building"] },
    { word: "dislike",    root: "like",   pre: "dis-", meaning: "not like",        distractors: ["like very much", "like again", "kind of like"] },
    { word: "preheat",    root: "heat",   pre: "pre-", meaning: "heat beforehand", distractors: ["cool down", "heat again", "stop heating"] },
    { word: "unlock",     root: "lock",   pre: "un-",  meaning: "open what is locked", distractors: ["lock again", "lock tightly", "not a lock"] },
  ];

  const SUFFIXES = [
    { word: "hopeful",   root: "hope",   suf: "-ful",  meaning: "full of hope",      distractors: ["without hope", "hope again", "tiny hope"] },
    { word: "hopeless",  root: "hope",   suf: "-less", meaning: "without hope",      distractors: ["full of hope", "a little hope", "hope again"] },
    { word: "careful",   root: "care",   suf: "-ful",  meaning: "full of care",      distractors: ["without care", "care again", "small care"] },
    { word: "careless",  root: "care",   suf: "-less", meaning: "without care",      distractors: ["full of care", "care a lot", "careful"] },
    { word: "painter",   root: "paint",  suf: "-er",   meaning: "one who paints",    distractors: ["full of paint", "without paint", "paint again"] },
    { word: "teacher",   root: "teach",  suf: "-er",   meaning: "one who teaches",   distractors: ["without teaching", "teach again", "full of teaching"] },
    { word: "fearless",  root: "fear",   suf: "-less", meaning: "without fear",      distractors: ["full of fear", "fear again", "fear a lot"] },
    { word: "playful",   root: "play",   suf: "-ful",  meaning: "full of play",      distractors: ["cannot play", "play again", "without play"] },
  ];

  const SYNONYMS = [
    { word: "happy",  answer: "glad",      distractors: ["sad", "angry", "tired"] },
    { word: "big",    answer: "large",     distractors: ["tiny", "short", "quiet"] },
    { word: "fast",   answer: "quick",     distractors: ["slow", "heavy", "late"] },
    { word: "small",  answer: "tiny",      distractors: ["huge", "long", "loud"] },
    { word: "smart",  answer: "clever",    distractors: ["silly", "slow", "plain"] },
    { word: "begin",  answer: "start",     distractors: ["end", "stop", "finish"] },
    { word: "shout",  answer: "yell",      distractors: ["whisper", "sing", "sigh"] },
    { word: "tired",  answer: "sleepy",    distractors: ["awake", "hungry", "lively"] },
  ];

  const ANTONYMS = [
    { word: "hot",    answer: "cold",      distractors: ["warm", "cool", "steam"] },
    { word: "up",     answer: "down",      distractors: ["over", "beside", "around"] },
    { word: "big",    answer: "small",     distractors: ["wide", "tall", "heavy"] },
    { word: "night",  answer: "day",       distractors: ["moon", "dark", "evening"] },
    { word: "fast",   answer: "slow",      distractors: ["quick", "hurry", "speed"] },
    { word: "sharp",  answer: "dull",      distractors: ["pointed", "edge", "shiny"] },
    { word: "full",   answer: "empty",     distractors: ["heavy", "whole", "tight"] },
    { word: "early",  answer: "late",      distractors: ["first", "soon", "now"] },
  ];

  const HOMOPHONES = [
    { sentence: "I put ___ book on the shelf.",            choices: ["their", "there", "they're"], answer: "their",  hint: "Shows who owns the book." },
    { sentence: "Look, ___ are acorns under the oak!",     choices: ["their", "there", "they're"], answer: "there",  hint: "Points to a place." },
    { sentence: "The foxes say ___ ready to play.",        choices: ["their", "there", "they're"], answer: "they're",hint: "Short for 'they are'." },
    { sentence: "We went ___ the library together.",       choices: ["to", "too", "two"],          answer: "to",     hint: "Toward a place." },
    { sentence: "I want to come, ___!",                    choices: ["to", "too", "two"],          answer: "too",    hint: "Means 'also'." },
    { sentence: "She saw ___ raccoons by the brook.",      choices: ["to", "too", "two"],          answer: "two",    hint: "The number 2." },
    { sentence: "The wind blew ___ the valley.",           choices: ["through", "threw"],          answer: "through",hint: "Means 'across' or 'into and out of'." },
    { sentence: "He ___ the ball to me.",                  choices: ["through", "threw"],          answer: "threw",  hint: "Past tense of 'throw'." },
  ];

  const CONTEXT_CLUES = [
    {
      sentence: "The old cottage was dilapidated — the roof sagged and the porch had gaping holes.",
      target: "dilapidated",
      answer: "falling apart",
      distractors: ["brand new", "very clean", "freshly painted"],
      hint: "Look at the clues: sagging roof, gaping holes."
    },
    {
      sentence: "Sam felt elated when she found her lost puppy — she couldn't stop smiling.",
      target: "elated",
      answer: "very happy",
      distractors: ["angry", "sleepy", "afraid"],
      hint: "She couldn't stop smiling — that's a strong clue."
    },
    {
      sentence: "The soup was bland; it had no salt, no herbs, no flavor at all.",
      target: "bland",
      answer: "tasteless",
      distractors: ["spicy", "sweet", "salty"],
      hint: "No salt, no herbs, no flavor — what does that add up to?"
    },
    {
      sentence: "After the storm the sky was serene — still, bright, and calm.",
      target: "serene",
      answer: "calm and peaceful",
      distractors: ["stormy", "cloudy", "crowded"],
      hint: "Still, bright, and calm all point the same way."
    },
  ];

  // Grammar
  const PARTS_OF_SPEECH = [
    { sentence: "The acorn fell quickly.",        target: "quickly", type: "adverb",    distractors: ["noun", "verb", "adjective"], hint: "It tells HOW the acorn fell." },
    { sentence: "Raccoon reads a book.",          target: "reads",   type: "verb",      distractors: ["noun", "adjective", "adverb"], hint: "An action word." },
    { sentence: "The shiny river glistens.",      target: "shiny",   type: "adjective", distractors: ["noun", "verb", "adverb"], hint: "It describes the river." },
    { sentence: "Pip picks berries all day.",     target: "berries", type: "noun",      distractors: ["verb", "adjective", "adverb"], hint: "A thing that you can pick and eat." },
    { sentence: "She sings loudly in the woods.", target: "loudly",  type: "adverb",    distractors: ["adjective", "noun", "verb"], hint: "It tells HOW she sings." },
    { sentence: "The clever fox hid the key.",    target: "clever",  type: "adjective", distractors: ["noun", "verb", "adverb"], hint: "It describes the fox." },
    { sentence: "Owls hoot at midnight.",         target: "hoot",    type: "verb",      distractors: ["noun", "adjective", "adverb"], hint: "The action the owls do." },
    { sentence: "A tiny mouse scurried past.",    target: "mouse",   type: "noun",      distractors: ["verb", "adjective", "adverb"], hint: "A creature — a thing." },
  ];

  const VERB_TENSE = [
    { stem: "Yesterday I ___ a book.",        options: ["read", "reads", "reading"],      answer: "read",    hint: "Yesterday = past tense." },
    { stem: "Right now she ___ very fast.",   options: ["run", "runs", "ran"],             answer: "runs",    hint: "Right now + she = present, add 's'." },
    { stem: "Tomorrow we ___ the museum.",    options: ["visit", "visited", "will visit"], answer: "will visit", hint: "Tomorrow = future." },
    { stem: "Last week they ___ to the pond.",options: ["hike", "hiked", "hiking"],        answer: "hiked",   hint: "Last week = past." },
    { stem: "Every day he ___ his bike.",     options: ["ride", "rides", "rode"],          answer: "rides",   hint: "Every day + he = present, add 's'." },
    { stem: "After school we ___ snacks.",    options: ["eat", "eats", "ate"],             answer: "eat",     hint: "'We' uses the plain form." },
  ];

  const SUBJ_VERB = [
    { sentence: "The raccoons ___ in the tree.", options: ["sleep", "sleeps"], answer: "sleep",  hint: "Plural subject → plain verb." },
    { sentence: "My brother ___ to school.",     options: ["walk", "walks"],   answer: "walks",  hint: "Singular (he) → add 's'." },
    { sentence: "Those birds ___ very loud.",    options: ["is", "are"],       answer: "are",    hint: "Plural (those birds) → 'are'." },
    { sentence: "That puppy ___ small.",         options: ["is", "are"],       answer: "is",     hint: "Singular (that puppy) → 'is'." },
    { sentence: "The kids ___ the book.",        options: ["read", "reads"],   answer: "read",   hint: "Plural (kids) → plain verb." },
    { sentence: "Mom ___ dinner every night.",   options: ["cook", "cooks"],   answer: "cooks",  hint: "Singular (Mom) → add 's'." },
  ];

  const PUNCTUATION = [
    { sentence: "What a beautiful day",        options: ["!", ".", "?"], answer: "!", hint: "Strong feeling → exclamation." },
    { sentence: "Where is the library",        options: [".", "!", "?"], answer: "?", hint: "Asks a question." },
    { sentence: "I like apples",               options: [".", "?", "!"], answer: ".", hint: "Simple statement ends with period." },
    { sentence: "Look out",                    options: ["!", ".", "?"], answer: "!", hint: "Sudden warning → exclamation." },
    { sentence: "Can you help me",             options: ["?", ".", "!"], answer: "?", hint: "A question to someone." },
    { sentence: "The sky is blue",             options: [".", "!", "?"], answer: ".", hint: "Plain fact ends with period." },
  ];

  // Phonics / Spelling
  const SILENT_LETTERS = [
    { word: "knight", silent: "k", choices: ["k", "n", "g", "h"], hint: "Kn- words: the first letter is silent." },
    { word: "write",  silent: "w", choices: ["w", "r", "t", "e"], hint: "Wr- words: the first letter is silent." },
    { word: "lamb",   silent: "b", choices: ["l", "a", "m", "b"], hint: "Mb at the end: the last letter is silent." },
    { word: "hour",   silent: "h", choices: ["h", "o", "u", "r"], hint: "Hour rhymes with 'our'." },
    { word: "comb",   silent: "b", choices: ["c", "o", "m", "b"], hint: "Mb at the end: the last letter is silent." },
    { word: "gnome",  silent: "g", choices: ["g", "n", "o", "m"], hint: "Gn- words: the first letter is silent." },
    { word: "island", silent: "s", choices: ["i", "s", "l", "n"], hint: "It sounds like 'eye-land'." },
    { word: "wrist",  silent: "w", choices: ["w", "r", "i", "t"], hint: "Wr- words start silent." },
  ];

  const VOWEL_PATTERN = [
    { word: "cake", pattern: "silent-e (long a)",  choices: ["silent-e (long a)", "short a", "double vowel", "r-controlled"], hint: "a_e → long vowel." },
    { word: "tape", pattern: "silent-e (long a)",  choices: ["silent-e (long a)", "short a", "r-controlled", "double vowel"], hint: "a_e → long vowel." },
    { word: "rain", pattern: "ai vowel team",      choices: ["ai vowel team", "silent-e", "short a", "r-controlled"], hint: "Two vowels together: the first talks." },
    { word: "boat", pattern: "oa vowel team",      choices: ["oa vowel team", "short o", "silent-e", "r-controlled"], hint: "Two vowels together: the first talks." },
    { word: "star", pattern: "r-controlled (ar)",  choices: ["r-controlled (ar)", "silent-e", "short a", "vowel team"], hint: "R bosses the vowel around." },
    { word: "bird", pattern: "r-controlled (ir)",  choices: ["r-controlled (ir)", "short i", "silent-e", "vowel team"], hint: "R bosses the vowel around." },
  ];

  const SYLLABLES = [
    { word: "butterfly", split: "but•ter•fly",   choices: ["but•ter•fly", "butt•erfly", "bu•tter•fly", "butter•fly"], count: 3, hint: "Clap it out: but-ter-fly." },
    { word: "elephant",  split: "el•e•phant",    choices: ["el•e•phant", "ele•phant", "elep•hant", "e•le•ph•ant"], count: 3, hint: "Clap: el-e-phant." },
    { word: "pencil",    split: "pen•cil",       choices: ["pen•cil", "pe•ncil", "penc•il", "p•encil"], count: 2, hint: "Two beats: pen-cil." },
    { word: "magnet",    split: "mag•net",       choices: ["mag•net", "ma•gnet", "magn•et", "m•agnet"], count: 2, hint: "Split between the two consonants." },
    { word: "robot",     split: "ro•bot",        choices: ["ro•bot", "rob•ot", "r•obot", "rob•o•t"], count: 2, hint: "Open syllable: ro keeps its long sound." },
    { word: "napkin",    split: "nap•kin",       choices: ["nap•kin", "na•pkin", "napk•in", "n•apkin"], count: 2, hint: "Split between the two middle consonants." },
  ];

  // Figurative language
  const SIMILES = [
    { sentence: "Her smile was as bright as the sun.",    meaning: "Her smile was very bright.",     distractors: ["Her smile was yellow.", "Her smile was hot.", "Her smile was round."] },
    { sentence: "The runner moved like a cheetah.",        meaning: "The runner moved very fast.",    distractors: ["The runner had spots.", "The runner had fur.", "The runner ate meat."] },
    { sentence: "The library was as quiet as a mouse.",    meaning: "The library was very quiet.",    distractors: ["The library had mice.", "The library was small.", "The library was gray."] },
    { sentence: "The blanket felt as soft as a cloud.",    meaning: "The blanket was very soft.",     distractors: ["The blanket was white.", "The blanket was up high.", "The blanket was wet."] },
  ];

  const METAPHORS = [
    { sentence: "Pip is a shining star on stage.",         meaning: "Pip is excellent at performing.", distractors: ["Pip lives in the sky.", "Pip glows at night.", "Pip is far away."] },
    { sentence: "The classroom was a zoo.",                meaning: "The classroom was noisy and wild.",distractors: ["The classroom had lions.", "The classroom was green.", "The classroom was outside."] },
    { sentence: "Grandpa's voice is music to my ears.",    meaning: "Grandpa's voice is very pleasant.",distractors: ["Grandpa sings songs.", "Grandpa plays an instrument.", "Grandpa is loud."] },
    { sentence: "The snow was a soft white blanket.",      meaning: "The snow covered everything gently.",distractors: ["The snow was a real blanket.", "The snow was warm.", "The snow was on a bed."] },
  ];

  const IDIOMS = [
    { phrase: "Break a leg!",              meaning: "Good luck!",                 distractors: ["Be careful!", "Run away!", "Hurt your leg!"] },
    { phrase: "It's raining cats and dogs.",meaning: "It's raining very hard.",    distractors: ["Pets are falling.", "The weather is dry.", "Animals are wet."] },
    { phrase: "Hit the books.",            meaning: "Start studying hard.",       distractors: ["Punch a book.", "Drop a book.", "Close the library."] },
    { phrase: "Piece of cake.",            meaning: "Something very easy.",       distractors: ["A dessert.", "A birthday party.", "A sweet treat."] },
    { phrase: "Spill the beans.",          meaning: "Tell a secret.",             distractors: ["Make a mess.", "Drop beans.", "Cook dinner."] },
    { phrase: "Under the weather.",        meaning: "Feeling sick.",              distractors: ["Outside in the rain.", "Looking at clouds.", "In a storm."] },
  ];

  // Comprehension — each passage has multiple question types.
  const PASSAGES = [
    {
      id: "pass-acorns",
      text: "Pip the squirrel woke up early. She had twenty acorns to hide before winter. First she dug a hole by the oak. Then she buried five acorns there. She kept digging until every acorn had a safe spot.",
      questions: [
        { kind: "mainIdea",  prompt: "What is this passage mostly about?",
          answer: "A squirrel hiding acorns for winter.",
          distractors: ["How to dig a deep hole.", "Why squirrels sleep late.", "The colors of the oak tree."] },
        { kind: "sequence",  prompt: "What did Pip do FIRST?",
          answer: "She woke up early.",
          distractors: ["She buried five acorns.", "She dug a hole by the oak.", "She went back to sleep."] },
        { kind: "inference", prompt: "Why is Pip hiding acorns?",
          answer: "So she has food for winter.",
          distractors: ["To plant a new tree.", "To give them to friends.", "To count them later."] },
      ],
    },
    {
      id: "pass-library",
      text: "Reading Raccoon took off his glasses and sighed. Pages from every book lay scattered on the floor. 'The wind must have rushed in,' he said. He wiped his glasses, picked up a page, and began to sort them back into their books.",
      questions: [
        { kind: "mainIdea",  prompt: "What is this paragraph mostly about?",
          answer: "Reading Raccoon sorting pages after a big mess.",
          distractors: ["Why glasses are useful.", "How wind is made.", "A new book being written."] },
        { kind: "cause",     prompt: "What caused the pages to scatter?",
          answer: "The wind rushed in.",
          distractors: ["Reading Raccoon threw them.", "A mouse knocked them.", "They fell off a shelf by themselves."] },
        { kind: "traits",    prompt: "Which word best describes Reading Raccoon?",
          answer: "Patient",
          distractors: ["Angry", "Silly", "Lazy"] },
      ],
    },
    {
      id: "pass-brook",
      text: "The brook in Hidden Valley is my favorite place. The water sparkles, and tiny fish dart between the stones. Everyone should visit at least once. It's the best spot in the whole valley.",
      questions: [
        { kind: "factOpinion", prompt: "Which sentence is an OPINION?",
          answer: "It's the best spot in the whole valley.",
          distractors: ["The water sparkles.", "Tiny fish dart between the stones.", "The brook is in Hidden Valley."] },
        { kind: "factOpinion", prompt: "Which sentence is a FACT?",
          answer: "Tiny fish dart between the stones.",
          distractors: ["It's the best spot in the whole valley.", "Everyone should visit at least once.", "The brook is my favorite place."] },
        { kind: "mainIdea",    prompt: "What is the author's main purpose?",
          answer: "To convince readers the brook is a great place.",
          distractors: ["To explain how fish swim.", "To describe how to build a bridge.", "To teach about rocks."] },
      ],
    },
  ];

  // ---------- GENERATORS ----------

  function genPrefix() {
    const x = pick(PREFIXES);
    const options = shuffle([x.meaning, ...x.distractors]);
    return {
      mode: "vocabulary", sub: "prefix",
      prompt: `What does <strong>${x.word}</strong> mean?`,
      options, answer: x.meaning,
      hint: `The prefix "${x.pre}" attaches to "${x.root}".`,
    };
  }

  function genSuffix() {
    const x = pick(SUFFIXES);
    const options = shuffle([x.meaning, ...x.distractors]);
    return {
      mode: "vocabulary", sub: "suffix",
      prompt: `What does <strong>${x.word}</strong> mean?`,
      options, answer: x.meaning,
      hint: `The suffix "${x.suf}" changes "${x.root}".`,
    };
  }

  function genSynonym() {
    const x = pick(SYNONYMS);
    const options = shuffle([x.answer, ...x.distractors]);
    return {
      mode: "vocabulary", sub: "synonym",
      prompt: `Which word means the SAME as <strong>${x.word}</strong>?`,
      options, answer: x.answer,
      hint: "Synonyms have similar meanings.",
    };
  }

  function genAntonym() {
    const x = pick(ANTONYMS);
    const options = shuffle([x.answer, ...x.distractors]);
    return {
      mode: "vocabulary", sub: "antonym",
      prompt: `Which word means the OPPOSITE of <strong>${x.word}</strong>?`,
      options, answer: x.answer,
      hint: "Antonyms mean the opposite.",
    };
  }

  function genHomophone() {
    const x = pick(HOMOPHONES);
    return {
      mode: "vocabulary", sub: "homophone",
      prompt: `Fill the blank: <em>${x.sentence}</em>`,
      options: shuffle(x.choices.slice()), answer: x.answer,
      hint: x.hint,
    };
  }

  function genContextClue() {
    const x = pick(CONTEXT_CLUES);
    const options = shuffle([x.answer, ...x.distractors]);
    return {
      mode: "vocabulary", sub: "context",
      prompt: `<em>${x.sentence}</em><br>What does <strong>${x.target}</strong> mean?`,
      options, answer: x.answer,
      hint: x.hint,
    };
  }

  function genPartsOfSpeech() {
    const x = pick(PARTS_OF_SPEECH);
    const options = shuffle([x.type, ...x.distractors]);
    return {
      mode: "grammar", sub: "pos",
      prompt: `<em>${x.sentence}</em><br>What part of speech is <strong>${x.target}</strong>?`,
      options, answer: x.type,
      hint: x.hint,
    };
  }

  function genVerbTense() {
    const x = pick(VERB_TENSE);
    return {
      mode: "grammar", sub: "tense",
      prompt: `Fill the blank: <em>${x.stem}</em>`,
      options: shuffle(x.options.slice()), answer: x.answer,
      hint: x.hint,
    };
  }

  function genSubjVerb() {
    const x = pick(SUBJ_VERB);
    return {
      mode: "grammar", sub: "subject-verb",
      prompt: `Pick the right verb: <em>${x.sentence}</em>`,
      options: shuffle(x.options.slice()), answer: x.answer,
      hint: x.hint,
    };
  }

  function genPunctuation() {
    const x = pick(PUNCTUATION);
    return {
      mode: "grammar", sub: "punctuation",
      prompt: `What punctuation ends this sentence?<br><em>${x.sentence} __</em>`,
      options: shuffle(x.options.slice()), answer: x.answer,
      hint: x.hint,
    };
  }

  function genSilentLetter() {
    const x = pick(SILENT_LETTERS);
    return {
      mode: "phonics", sub: "silent",
      prompt: `Which letter is <strong>silent</strong> in <strong>${x.word}</strong>?`,
      options: shuffle(x.choices.slice()), answer: x.silent,
      hint: x.hint,
    };
  }

  function genVowelPattern() {
    const x = pick(VOWEL_PATTERN);
    return {
      mode: "phonics", sub: "pattern",
      prompt: `What vowel pattern is in <strong>${x.word}</strong>?`,
      options: shuffle(x.choices.slice()), answer: x.pattern,
      hint: x.hint,
    };
  }

  function genSyllables() {
    const x = pick(SYLLABLES);
    return {
      mode: "phonics", sub: "syllables",
      prompt: `How do you split <strong>${x.word}</strong> into syllables?`,
      options: shuffle(x.choices.slice()), answer: x.split,
      hint: x.hint,
    };
  }

  function genSimile() {
    const x = pick(SIMILES);
    const options = shuffle([x.meaning, ...x.distractors]);
    return {
      mode: "figurative", sub: "simile",
      prompt: `<em>${x.sentence}</em><br>What does this simile mean?`,
      options, answer: x.meaning,
      hint: "A simile compares using 'like' or 'as'.",
    };
  }

  function genMetaphor() {
    const x = pick(METAPHORS);
    const options = shuffle([x.meaning, ...x.distractors]);
    return {
      mode: "figurative", sub: "metaphor",
      prompt: `<em>${x.sentence}</em><br>What does this metaphor mean?`,
      options, answer: x.meaning,
      hint: "A metaphor says one thing IS another — without 'like' or 'as'.",
    };
  }

  function genIdiom() {
    const x = pick(IDIOMS);
    const options = shuffle([x.meaning, ...x.distractors]);
    return {
      mode: "figurative", sub: "idiom",
      prompt: `What does this idiom mean?<br><strong>"${x.phrase}"</strong>`,
      options, answer: x.meaning,
      hint: "Idioms don't mean what the words literally say.",
    };
  }

  function genComprehension() {
    const passage = pick(PASSAGES);
    const q = pick(passage.questions);
    const options = shuffle([q.answer, ...q.distractors]);
    return {
      mode: "comprehension", sub: q.kind,
      passage: passage.text,
      prompt: q.prompt,
      options, answer: q.answer,
      hint: "Re-read the passage. The clue is in the text.",
    };
  }

  // ---------- DISPATCH ----------

  const MODE_GENERATORS = {
    vocabulary:   [genPrefix, genSuffix, genSynonym, genAntonym, genHomophone, genContextClue],
    grammar:      [genPartsOfSpeech, genVerbTense, genSubjVerb, genPunctuation],
    phonics:      [genSilentLetter, genVowelPattern, genSyllables],
    figurative:   [genSimile, genMetaphor, genIdiom],
    comprehension:[genComprehension],
  };

  // planRound: if a pool is configured, pre-draw N unique questions so the
  // round has no duplicates. Runner picks these up via engine.planRound.
  // Falls back to procedural generate() when no pool is configured.
  function planRound(cfg = {}, total = 0) {
    if (cfg.poolId && window.MR.Pools && window.MR.Pools.has(cfg.poolId)) {
      const drawn = window.MR.Pools.sample(cfg.poolId, total);
      return drawn.map((q) => ({
        mode: cfg.mode || "pool",
        sub:  "pool",
        passage: q.passage || null,
        prompt:  q.prompt,
        options: q.options.slice(),
        answer:  q.answer,
        hint:    q.hint || "",
      }));
    }
    return null;
  }

  function generate(cfg = {}, qIndex = 0) {
    const modes = cfg.modes && cfg.modes.length ? cfg.modes : [cfg.mode || "vocabulary"];
    const mode = modes[qIndex % modes.length];
    const gens = MODE_GENERATORS[mode];
    if (!gens || !gens.length) throw new Error(`Unknown reading mode: ${mode}`);
    // If cfg.sub is specified and valid for this mode, try to pick that specific generator.
    if (cfg.sub) {
      const match = gens.find((g) => {
        try { return g().sub === cfg.sub; } catch (e) { return false; }
      });
      if (match) return match();
    }
    return pick(gens)();
  }

  function renderPrompt(p) {
    const passage = p.passage
      ? `<div class="reading-passage">${escapeForPassage(p.passage)}</div>`
      : "";
    return `${passage}<div class="reading-prompt">${p.prompt}</div>`;
  }

  function renderVisual() { return ""; }

  function escapeForPassage(str) {
    return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function hintFor(p) { return p.hint || ""; }

  function formatOption(opt) {
    return String(opt);
  }

  function optionsEqual(a, b) {
    return String(a) === String(b);
  }

  window.MR = window.MR || {};
  window.MR.Engines = window.MR.Engines || {};
  window.MR.Engines.reading = {
    generate, planRound, renderPrompt, renderVisual, hintFor, formatOption, optionsEqual,
  };
})();
