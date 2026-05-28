/*!
 * Teaching op — Word problems (arithmetic).
 *
 * Distinct pedagogy: this op does NOT teach any computation. It teaches
 * how to READ a story and decide WHICH operation to use. That skill is
 * the single biggest blocker for neurodiverse learners on word problems,
 * because the mental leap from narrative to symbols is the hard part.
 *
 * Strategies walk through the four major problem structures:
 *   - join / separate (add / subtract)
 *   - compare (subtract)
 *   - equal groups (multiply / divide)
 *   - identify the question (what is ACTUALLY being asked)
 *
 * Uses storyProblem viz — a little scene + narrative + operation chips.
 */
(function () {
  MR.Content.registerOp({
    id: "ari-op-word-problems",
    moduleId: "arithmetic",
    label: "Word Problems",
    emoji: "📖",
    tagline: "Turn a story into math.",
    accent: "#c4b5fd",
    strategies: [
      {
        id: "join-separate",
        title: "Joining and Parting",
        subtitle: "Things together? Or going away?",
        emoji: "🤝",
        idea: {
          hook: "Some stories bring things together. Some take things away. The verbs give it away: 'joined', 'more', 'altogether' = add. 'Left', 'gave', 'lost' = subtract.",
          viz: { type: "storyProblem", params: {
            scene: "🐿️",
            story: "Squirrel had 6 acorns. Friend gave her 4 more. How many now?",
            chips: ["+", "−", "×", "÷"],
            highlight: "+",
          } },
          caption: "'Gave more' = joining. This is an add story.",
        },
        watchMe: [
          { text: "Story 1: 'Bunny had 9 carrots. He ate 3. How many left?'",
            viz: { type: "storyProblem", params: {
              scene: "🐰", story: "Bunny had 9 carrots. He ate 3. How many left?",
              chips: ["+", "−", "×", "÷"],
            } } },
          { text: "'Ate' — things going away. 'How many LEFT' — subtraction.",
            viz: { type: "storyProblem", params: {
              scene: "🐰", story: "Bunny had 9 carrots. He ate 3. How many left?",
              chips: ["+", "−", "×", "÷"], highlight: "−",
            } } },
          { text: "So we do 9 − 3 = 6. Bunny has 6 carrots.",
            equation: "9 − 3 = 6" },
          { text: "Try the verb-check: 'ate', 'lost', 'gave away', 'broke' → subtract. 'Found', 'got more', 'arrived' → add." },
        ],
        practice: [
          {
            prompt: "'Fox spotted 8 leaves, then 5 MORE leaves fluttered down.' Which operation?",
            viz: { type: "storyProblem", params: {
              scene: "🦊", story: "Fox spotted 8 leaves, then 5 MORE leaves fluttered down.",
              chips: ["+", "−", "×", "÷"],
            } },
            options: ["+", "−", "×"],
            answer: "+",
            hint: "'More leaves fluttered down' — things arriving.",
          },
          {
            prompt: "'Otter had 12 shells. She gave 7 AWAY.' Which operation?",
            viz: { type: "barModel", params: { whole: 12, parts: [{ value: 7, label: "given" }, { value: 5, label: "left" }] } },
            options: ["+", "−", "×"],
            answer: "−",
            hint: "'Gave away' — things leaving.",
          },
        ],
      },
      {
        id: "compare",
        title: "Comparing",
        subtitle: "'How many more?' is still subtract.",
        emoji: "👯",
        idea: {
          hook: "Some stories don't join or part — they compare two amounts. 'How many MORE?' or 'How many FEWER?' Both of those are subtract stories, even though they don't take anything away.",
          viz: { type: "storyProblem", params: {
            scene: "🦝",
            story: "Raccoon has 12 stars. Owl has 7 stars. How many more does Raccoon have?",
            chips: ["+", "−", "×", "÷"],
            highlight: "−",
          } },
          caption: "Nothing is lost. But 'how many more' = the difference = subtract.",
        },
        watchMe: [
          { text: "Story: 'Duck has 15 pebbles. Frog has 9. How many fewer does Frog have?'",
            viz: { type: "storyProblem", params: {
              scene: "🦆", story: "Duck has 15 pebbles. Frog has 9. How many fewer does Frog have?",
              chips: ["+", "−"],
            } } },
          { text: "Both animals keep their pebbles. But we're asked about the DIFFERENCE.",
            viz: { type: "storyProblem", params: {
              scene: "🦆", story: "Duck has 15 pebbles. Frog has 9. How many fewer does Frog have?",
              chips: ["+", "−"], highlight: "−",
            } } },
          { text: "Subtract to find the gap: 15 − 9 = 6. Frog has 6 fewer.",
            equation: "15 − 9 = 6" },
          { text: "Key words that mean subtract-to-compare: 'how many more', 'how many fewer', 'difference', 'taller', 'shorter'." },
        ],
        practice: [
          {
            prompt: "Koala has 20 leaves, Bunny has 14. How many MORE does Koala have?",
            viz: { type: "storyProblem", params: {
              scene: "🐨", story: "Koala has 20, Bunny has 14. How many more does Koala have?",
              chips: ["+", "−"],
            } },
            options: [4, 6, 34],
            answer: 6,
            hint: "Find the difference: 20 − 14.",
          },
          {
            prompt: "Mouse is 7 cm tall. Hedgehog is 10 cm tall. How much TALLER is hedgehog?",
            viz: { type: "barModel", params: { parts: [{ value: 7, label: "Mouse 7" }, { value: 3, label: "?" }], label: "Hedgehog total = 10" } },
            options: [3, 7, 17],
            answer: 3,
            hint: "Comparison story — subtract: 10 − 7.",
          },
        ],
      },
      {
        id: "equal-groups-problem",
        title: "Equal Groups Stories",
        subtitle: "'Each' is the signal word.",
        emoji: "🎁",
        idea: {
          hook: "When a story says EACH, it's almost always a multiply or divide story. '4 baskets with 5 berries EACH' — equal groups. Multiply. Or 'share 20 berries EQUALLY into 4 baskets' — divide.",
          viz: { type: "storyProblem", params: {
            scene: "🍓",
            story: "Raccoon fills 4 baskets. Each basket holds 5 berries. How many berries in all?",
            chips: ["+", "−", "×", "÷"],
            highlight: "×",
          } },
          caption: "'Each' + 'how many in all' = multiply story.",
        },
        watchMe: [
          { text: "Story: 'Bear baked 24 muffins. He put them into 6 boxes, same number in each. How many per box?'",
            viz: { type: "storyProblem", params: {
              scene: "🐻", story: "Bear baked 24 muffins. 6 boxes, same number in each. How many per box?",
              chips: ["×", "÷"],
            } } },
          { text: "The total (24) is known. The groups (6) are known. We want how many PER GROUP.",
            viz: { type: "storyProblem", params: {
              scene: "🐻", story: "Bear baked 24 muffins. 6 boxes, same number in each. How many per box?",
              chips: ["×", "÷"], highlight: "÷",
            } } },
          { text: "Divide: 24 ÷ 6 = 4. Four muffins per box.",
            equation: "24 ÷ 6 = 4" },
          { text: "Quick test: if you KNOW the total, you probably divide. If you DON'T know the total, you multiply to find it." },
        ],
        practice: [
          {
            prompt: "Fawn sees 3 flower rows with 7 flowers EACH. How many flowers total?",
            viz: { type: "storyProblem", params: {
              scene: "🦌", story: "3 rows, 7 flowers each. Total?",
              chips: ["×", "÷"],
            } },
            options: [10, 14, 21],
            answer: 21,
            hint: "Equal groups, looking for total. Multiply.",
          },
          {
            prompt: "Skunk has 18 leaves to share EQUALLY among 3 friends. How many each?",
            viz: { type: "equalGroups", params: { groups: 3, size: 6, emoji: "🍃", label: "18 leaves into 3 groups" } },
            options: [3, 6, 21],
            answer: 6,
            hint: "Total is known (18). Divide into 3 groups.",
          },
        ],
      },
      {
        id: "find-the-question",
        title: "Find the Real Question",
        subtitle: "What is the story actually asking?",
        emoji: "🔍",
        idea: {
          hook: "Stories give lots of numbers. But only the LAST sentence — usually ending with a question mark — tells you what to solve. Read that line twice. Ignore what isn't asked.",
          viz: { type: "storyProblem", params: {
            scene: "🦉",
            story: "Owl found 9 feathers on Monday, 4 on Tuesday, and 6 on Wednesday. How many feathers on Monday and Tuesday?",
            chips: ["+", "−"],
          } },
          caption: "The question asks about Monday AND Tuesday only. Wednesday is a distraction.",
        },
        watchMe: [
          { text: "Read carefully: 'Owl found 9 on Monday, 4 on Tuesday, 6 on Wednesday. How many on MON and TUE?'",
            viz: { type: "storyProblem", params: {
              scene: "🦉", story: "9 on Mon, 4 on Tue, 6 on Wed. How many on MON and TUE?",
              chips: ["+", "−"],
            } } },
          { text: "Underline the question. What days does it ask about?",
            viz: { type: "storyProblem", params: {
              scene: "🦉", story: "9 on Mon, 4 on Tue, 6 on Wed. How many on MON and TUE?",
              chips: ["+", "−"], highlight: "+",
            } } },
          { text: "Monday and Tuesday. Ignore Wednesday. It's a distractor.",
            equation: "9 + 4 = 13" },
          { text: "Tip: cross out any numbers that the question doesn't ask about. Your brain will thank you." },
        ],
        practice: [
          {
            prompt: "'Panda has 12 bamboo shoots. He gives 3 to a friend and eats 2. How many did he GIVE AWAY?' What's the answer?",
            viz: { type: "storyProblem", params: {
              scene: "🐼", story: "Panda gave 3 shoots and ate 2. The question only asks about GIVE AWAY.",
              chips: ["+", "−"],
            } },
            options: [2, 3, 5],
            answer: 3,
            hint: "The question is ONLY about giving away. Eating 2 doesn't matter.",
          },
          {
            prompt: "'Bunny had 10 carrots. She ate 4 and found 2 more. How many did she EAT?'",
            viz: { type: "storyProblem", params: {
              scene: "🐰", story: "Bunny ate 4, found 2 more. Question asks: how many did she EAT?",
              chips: ["+", "−"],
            } },
            options: [4, 6, 8],
            answer: 4,
            hint: "The question asks only what she ate.",
          },
        ],
      },
      {
        id: "two-step",
        title: "Two-Step Stories",
        subtitle: "Two operations, in order.",
        emoji: "🪜",
        idea: {
          hook: "Some stories need TWO math steps. Do the first step. Hold the answer in your head. Then do the second step on that answer. Read the story TWICE if you need to find both questions.",
          viz: { type: "storyProblem", params: {
            scene: "🐻",
            story: "Bear baked 3 trays of 4 muffins each. Then she ate 2. How many left?",
            chips: ["× then −", "+ then ×", "÷ then +"],
            highlight: "× then −",
          } },
          caption: "Step 1: 3 × 4 = 12 muffins. Step 2: 12 − 2 = 10. Always: step 1 first, then use that answer in step 2.",
        },
        watchMe: [
          { text: "Story: 'Fox had 5 stamps. She got 3 more, then gave half to friend.' What's the FIRST step?",
            viz: { type: "storyProblem", params: {
              scene: "🦊", story: "Fox had 5 stamps. She got 3 more, then gave half to friend.",
              chips: ["+", "÷"],
            } } },
          { text: "First, find how many she had after getting more: 5 + 3 = 8.",
            viz: { type: "storyProblem", params: {
              scene: "🦊", story: "Step 1: 5 + 3 = 8 stamps.",
              chips: ["+", "÷"], highlight: "+",
            } },
            equation: "5 + 3 = 8" },
          { text: "Now use that 8. Half of 8 is 4. She gave 4 stamps away.",
            viz: { type: "storyProblem", params: {
              scene: "🦊", story: "Step 2: half of 8 = 4. She gave 4 away.",
              chips: ["+", "÷"], highlight: "÷",
            } },
            equation: "8 ÷ 2 = 4" },
          { text: "TWO steps: first add, then divide. Each step uses the answer from before." },
          { text: "Trick: underline each step's question. 'GOT MORE' = step 1 (add). 'GAVE HALF' = step 2 (divide)." },
        ],
        practice: [
          {
            prompt: "Bear had 4 honeycombs. She found 3 more. How many honeycombs in TOTAL did she have to share?",
            viz: { type: "barModel", params: { parts: [{ value: 4, label: "had 4" }, { value: 3, label: "found 3" }] } },
            options: [3, 4, 7],
            answer: 7,
            hint: "Step 1: count what she had after finding more: 4 + 3 = 7.",
          },
          {
            prompt: "Owl caught 2 mice each night for 4 nights. Then she ate 3. How many LEFT?",
            viz: { type: "equalGroups", params: { groups: 4, size: 2, emoji: "🐭", label: "2 mice × 4 nights = 8" } },
            options: [3, 5, 8],
            answer: 5,
            hint: "Step 1: 2 × 4 = 8 mice caught. Step 2: 8 − 3 = 5 left.",
          },
          {
            prompt: "Squirrel found 12 nuts and split them into 3 piles. Then she added 2 to one pile. How many in that pile?",
            viz: { type: "equalGroups", params: { groups: 3, size: 4, emoji: "🌰", label: "12 ÷ 3 = 4 per pile" } },
            options: [4, 6, 14],
            answer: 6,
            hint: "Step 1: 12 ÷ 3 = 4 per pile. Step 2: 4 + 2 = 6.",
          },
        ],
      },
    ],
  });
})();
