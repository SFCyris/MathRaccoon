/*!
 * Teaching op — Comprehension (reading).
 * Strategies: main idea, inference, sequencing, fact vs. opinion.
 */
(function () {
  MR.Content.registerOp({
    id: "rd-op-comprehension",
    moduleId: "reading",
    label: "Comprehension",
    emoji: "🧠",
    tagline: "Understanding what you read.",
    accent: "#ffd93d",
    strategies: [
      {
        id: "main-idea",
        title: "Main Idea",
        subtitle: "What's it mostly about?",
        emoji: "🎯",
        idea: {
          hook: "The <strong>main idea</strong> is what a passage is MOSTLY about. It's the big picture — not every little detail, but the point that holds the paragraph together.",
          viz: {
            type: "exampleList",
            params: {
              definition: "main idea — the central point of a passage.",
              examples: [
                { text: "All the sentences add up to ONE idea.", note: "like branches on one tree" },
                { text: "The title often hints at the main idea.", note: "" },
                { text: "Tip: ask 'what is the author teaching me?'", note: "" },
              ],
            },
          },
          caption: "Not every detail — just the big picture.",
        },
        watchMe: [
          { text: "Read: 'Pip the squirrel woke up early. She had twenty acorns to hide. She dug holes and buried each acorn before winter came.'" },
          { text: "What's this MOSTLY about? Not the holes. Not the morning. It's about <strong>Pip hiding acorns for winter</strong>." },
          { text: "Trick: if you could only tell one thing about the paragraph, what would you say? That's the main idea." },
        ],
        practice: [
          {
            prompt: "Passage: 'Reading Raccoon polishes his glasses every day. He cleans every bookshelf. Each morning he sweeps the library floor.'<br>What is this MOSTLY about?",
            options: ["How Reading Raccoon keeps the library tidy.", "The color of the glasses.", "How to sweep floors."],
            answer: "How Reading Raccoon keeps the library tidy.",
            hint: "All three sentences are about caring for the library.",
          },
        ],
      },
      {
        id: "inference",
        title: "Making Inferences",
        subtitle: "Reading between the lines.",
        emoji: "🔮",
        idea: {
          hook: "An <strong>inference</strong> is a smart guess using clues from the text PLUS what you already know. The writer doesn't say everything — sometimes you have to piece it together.",
          viz: {
            type: "exampleList",
            params: {
              definition: "inference — a conclusion drawn from clues + prior knowledge.",
              examples: [
                { text: "Clue: Sam zipped up his jacket and rubbed his hands together.", note: "Inference: it was cold outside." },
                { text: "Clue: Mia's eyes were red and she was holding a tissue.",       note: "Inference: Mia had been crying or has a cold." },
              ],
            },
          },
          caption: "Text clues + your brain = inference.",
        },
        watchMe: [
          { text: "Read: 'Pip stared at the empty cupboard and her shoulders drooped.'" },
          { text: "The text doesn't say Pip is sad — but an empty cupboard + drooping shoulders = we can infer she's disappointed or sad." },
          { text: "Ask yourself: what would make a person act this way? Your answer is the inference." },
        ],
        practice: [
          {
            prompt: "Read: 'The acorn pile was gone. Tiny paw prints led to the oak tree.'<br>What can we INFER?",
            options: ["A squirrel took the acorns to the oak.", "The acorns fell from the sky.", "The pile was never there."],
            answer: "A squirrel took the acorns to the oak.",
            hint: "Paw prints + a missing pile = who took them.",
          },
        ],
      },
      {
        id: "sequence-cause",
        title: "Sequence & Cause",
        subtitle: "What happened, and why.",
        emoji: "🔗",
        idea: {
          hook: "Stories have an <strong>order</strong> (sequence) and reasons (<strong>cause</strong> and <strong>effect</strong>). Watch for time words — <em>first, next, then, finally</em> — and cause words — <em>because, so, since</em>.",
          viz: {
            type: "exampleList",
            params: {
              definition: "sequence = order of events. cause = why something happened.",
              examples: [
                { text: "First → Next → Then → Finally",  note: "sequence signals" },
                { text: "'The wind blew hard, so pages scattered.'", note: "cause = wind, effect = scattered pages" },
                { text: "'She slipped because the path was icy.'",   note: "cause = icy path, effect = slipping" },
              ],
            },
          },
          caption: "Look for time words and 'because / so'.",
        },
        watchMe: [
          { text: "Read: 'First, Pip dug a hole. Next, she buried an acorn. Finally, she covered it with leaves.'" },
          { text: "Sequence words make the order obvious: dig → bury → cover." },
          { text: "Now: 'The wind rushed in, so all the pages scattered.' The word <strong>so</strong> connects cause (wind) to effect (scattered pages)." },
        ],
        practice: [
          {
            prompt: "'Pip woke up early, dug a hole, and then buried acorns.' What did Pip do FIRST?",
            options: ["Buried acorns.", "Woke up early.", "Dug a hole."],
            answer: "Woke up early.",
            hint: "Look for time words: 'first', 'then'...",
          },
          {
            prompt: "'Reading Raccoon sighed because pages were everywhere.' Why did he sigh?",
            options: ["He was tired.", "The pages were everywhere.", "He was hungry."],
            answer: "The pages were everywhere.",
            hint: "The word 'because' signals the cause.",
          },
        ],
      },
      {
        id: "fact-opinion",
        title: "Fact vs. Opinion",
        subtitle: "True for everyone, or just one view?",
        emoji: "⚖️",
        idea: {
          hook: "A <strong>fact</strong> can be proven true. An <strong>opinion</strong> is what someone thinks or feels — others may disagree.",
          viz: {
            type: "exampleList",
            params: {
              definition: "fact = provable. opinion = a personal view.",
              examples: [
                { text: "The brook is in Hidden Valley.",     note: "fact — you could check" },
                { text: "The brook is the best spot ever!",   note: "opinion — feelings" },
                { text: "Water sparkles when sunlight hits it.", note: "fact — observable" },
                { text: "Everyone should visit the brook.",   note: "opinion — a recommendation" },
              ],
            },
          },
          caption: "Opinion words: best, worst, should, beautiful, amazing.",
        },
        watchMe: [
          { text: "'The sky is blue.' Can we check? Yes → <strong>fact</strong>." },
          { text: "'Blue is the prettiest color.' Not everyone agrees → <strong>opinion</strong>." },
          { text: "Opinion signal words: best, worst, should, beautiful, amazing, terrible. Watch for them." },
        ],
        practice: [
          {
            prompt: "Which sentence is an OPINION?",
            options: ["Reading Raccoon wears round glasses.", "Raccoon's library is the best in the valley.", "The library has many books."],
            answer: "Raccoon's library is the best in the valley.",
            hint: "'Best' is a signal word for opinion.",
          },
          {
            prompt: "Which sentence is a FACT?",
            options: ["Blue is the prettiest color.", "The sky is blue on a clear day.", "Everyone should like blue."],
            answer: "The sky is blue on a clear day.",
            hint: "A fact can be checked or proven.",
          },
        ],
      },
    ],
  });
})();
