/*!
 * Teaching op — Addition (arithmetic).
 * Strategies: count on, make a ten, doubles ± 1, number bonds.
 */
(function () {
  MR.Content.registerOp({
    id: "ari-op-addition",
    moduleId: "arithmetic",
    label: "Addition",
    emoji: "➕",
    tagline: "Let's add!",
    accent: "#ff7a93",
    strategies: [
      {
        id: "count-on",
        title: "Count On",
        subtitle: "Start big, hop up.",
        emoji: "🦘",
        idea: {
          hook: "When you add a small number, you don't have to count everything again. Start with the bigger number in your head and hop up.",
          viz: { type: "numberLine", params: { min: 0, max: 12, at: 7, hops: [8, 9], label: "7 + 2 = ?" } },
          caption: "Raccoon starts on 7 and hops twice: 8, 9."
        },
        watchMe: [
          { text: "Let's add 7 + 3. Start by finding 7 on the number line.",
            viz: { type: "numberLine", params: { min: 0, max: 12, at: 7 } } },
          { text: "Now hop forward one. That's 8.",
            viz: { type: "numberLine", params: { min: 0, max: 12, at: 8, hops: [8], visited: [7] } } },
          { text: "Hop again — 9.",
            viz: { type: "numberLine", params: { min: 0, max: 12, at: 9, hops: [8, 9], visited: [7, 8] } } },
          { text: "One more — 10. So 7 + 3 = 10.",
            equation: "7 + 3 = 10",
            viz: { type: "numberLine", params: { min: 0, max: 12, at: 10, hops: [8, 9, 10], visited: [7, 8, 9] } } },
        ],
        practice: [
          {
            prompt: "{NAME}, try this one: 8 + 3 = ?",
            viz: { type: "numberLine", params: { min: 0, max: 14, at: 8 } },
            options: [10, 11, 12],
            answer: 11,
            hint: "Start at 8, then hop 3 times: 9, 10, 11."
          },
          {
            prompt: "Now: 6 + 4 = ?",
            viz: { type: "numberLine", params: { min: 0, max: 12, at: 6 } },
            options: [9, 10, 11],
            answer: 10,
            hint: "Start at 6. Hop 4 times: 7, 8, 9, 10."
          },
        ],
      },
      {
        id: "make-a-ten",
        title: "Make a Ten",
        subtitle: "Fill the frame first.",
        emoji: "🔟",
        idea: {
          hook: "Ten is a tidy number. If you're adding near ten, first finish the ten, then add what's left.",
          viz: { type: "twoTenFrames", params: { a: 8, b: 5, aLabel: "8", bLabel: "5" } },
          caption: "To do 8 + 5, we can move 2 over to fill ten, then we have 10 + 3."
        },
        watchMe: [
          { text: "We want 9 + 4.",
            viz: { type: "twoTenFrames", params: { a: 9, b: 4, aLabel: "9", bLabel: "4" } } },
          { text: "Borrow 1 from the 4 to fill the ten.",
            viz: { type: "twoTenFrames", params: { a: 10, b: 3, aLabel: "10", bLabel: "3" } } },
          { text: "Now it's 10 + 3 = 13. That's easy! So 9 + 4 = 13.",
            equation: "9 + 4 = 10 + 3 = 13",
            viz: { type: "twoTenFrames", params: { a: 10, b: 3, aLabel: "full ten", bLabel: "+3" } } },
        ],
        practice: [
          {
            prompt: "Try it: 8 + 6 = ?",
            viz: { type: "twoTenFrames", params: { a: 8, b: 6, aLabel: "8", bLabel: "6" } },
            options: [13, 14, 15],
            answer: 14,
            hint: "Move 2 over to make a ten, then 10 + 4 = 14."
          },
          {
            prompt: "One more: 7 + 5 = ?",
            viz: { type: "twoTenFrames", params: { a: 7, b: 5, aLabel: "7", bLabel: "5" } },
            options: [11, 12, 13],
            answer: 12,
            hint: "Borrow 3 to fill ten, then 10 + 2 = 12."
          },
        ],
      },
      {
        id: "doubles",
        title: "Use Doubles",
        subtitle: "Doubles + 1 or − 1.",
        emoji: "🪞",
        idea: {
          hook: "Doubles are easy to remember: 3 + 3, 4 + 4, 5 + 5… If a fact is almost a double, use the double and adjust.",
          viz: { type: "beads", params: { count: 12, split: 6, emoji: "🐞" } },
          caption: "Six ladybugs plus six ladybugs. That's a double."
        },
        watchMe: [
          { text: "What's 6 + 7? That's close to the double 6 + 6.",
            viz: { type: "beads", params: { count: 13, split: 6, emoji: "🐞" } } },
          { text: "We know 6 + 6 = 12. Seven is just one more than six.",
            equation: "6 + 6 = 12" },
          { text: "So 6 + 7 is just one more: 12 + 1 = 13.",
            equation: "6 + 7 = 13" },
        ],
        practice: [
          {
            prompt: "What's 5 + 6?",
            options: [10, 11, 12],
            answer: 11,
            hint: "5 + 5 = 10. Add one more."
          },
          {
            prompt: "What's 7 + 8?",
            options: [14, 15, 16],
            answer: 15,
            hint: "7 + 7 = 14. Eight is one more."
          },
        ],
      },
      {
        id: "number-bonds",
        title: "Number Bonds",
        subtitle: "Partners that make a total.",
        emoji: "🤝",
        idea: {
          hook: "Every number has partners — pairs that add up to it. Ten has lots of partners: 1+9, 2+8, 3+7, 4+6, 5+5.",
          viz: { type: "barModel", params: { whole: 10, parts: [{ value: 4 }, { value: 6 }] } },
          caption: "Knowing the partners for ten makes adding faster."
        },
        watchMe: [
          { text: "The whole is 10. We know one part is 3. What's the other part?",
            viz: { type: "barModel", params: { whole: 10, parts: [{ value: 3, label: "3" }, { value: 7, label: "?" }] } } },
          { text: "Count up from 3 to 10. That's 7.",
            equation: "3 + 7 = 10",
            viz: { type: "barModel", params: { whole: 10, parts: [{ value: 3, label: "3" }, { value: 7, label: "7" }] } } },
          { text: "Number bonds work both ways: if 3 + 7 = 10, then 10 − 3 = 7 too." },
        ],
        practice: [
          {
            prompt: "The whole is 10. One part is 4. What's the other part?",
            viz: { type: "barModel", params: { whole: 10, parts: [{ value: 4, label: "4" }, { value: 6, label: "?" }] } },
            options: [5, 6, 7],
            answer: 6,
          },
          {
            prompt: "Whole is 8. One part is 3. Other part?",
            viz: { type: "barModel", params: { whole: 8, parts: [{ value: 3, label: "3" }, { value: 5, label: "?" }] } },
            options: [4, 5, 6],
            answer: 5,
          },
        ],
      },
    ],
  });
})();
