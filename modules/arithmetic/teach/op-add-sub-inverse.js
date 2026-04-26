/*!
 * Teaching op — + and − are inverses (arithmetic).
 *
 * Angle: addition and subtraction *undo* each other. Rather than teaching
 * each operation in isolation, this op anchors fluency in the fact-family
 * relationship: if a + b = c, then c − a = b and c − b = a.
 *
 * Distinct pedagogy vs op-addition / op-subtraction:
 *   - Does NOT teach how to compute a sum or difference.
 *   - Focuses on seeing the same story from different angles (same three
 *     numbers, four equations).
 *   - Uses bar model and fact-family sun — visual anchors that carry one
 *     whole and two parts together in one picture.
 */
(function () {
  MR.Content.registerOp({
    id: "ari-op-add-sub-inverse",
    moduleId: "arithmetic",
    label: "+ and − Together",
    emoji: "🔄",
    tagline: "They undo each other.",
    accent: "#ffb077",
    strategies: [
      {
        id: "undo-hop",
        title: "Adding Then Un-Adding",
        subtitle: "What you do, you can undo.",
        emoji: "↩️",
        idea: {
          hook: "If you hop 3 forward, then 3 back, you end up right where you started. Plus and minus are like that — one undoes the other.",
          viz: { type: "numberLine", params: { min: 0, max: 12, at: 6, hops: [6], visited: [] } },
          caption: "Raccoon hops +3 to get to 6. To undo, subtract 3 and land back on 3.",
        },
        watchMe: [
          { text: "Start on 5.",
            viz: { type: "numberLine", params: { min: 0, max: 12, at: 5 } } },
          { text: "Add 4 — hop four times forward. Now you're on 9.",
            equation: "5 + 4 = 9",
            viz: { type: "numberLine", params: { min: 0, max: 12, at: 9, hops: [6,7,8,9], visited: [5,6,7,8] } } },
          { text: "To UNDO, subtract 4 — hop four times back. You land back on 5.",
            equation: "9 − 4 = 5",
            viz: { type: "numberLine", params: { min: 0, max: 12, at: 5, hops: [8,7,6,5], visited: [9,8,7,6], dir: "down" } } },
          { text: "That's the rule: adding then subtracting the same number brings you home." },
        ],
        practice: [
          {
            prompt: "Raccoon hopped +7 and landed on 12. Where did raccoon start?",
            viz: { type: "numberLine", params: { min: 0, max: 14, at: 12 } },
            options: [4, 5, 6],
            answer: 5,
            hint: "Undo the +7 — subtract 7 from 12.",
          },
          {
            prompt: "If 6 + 3 = 9, what is 9 − 3?",
            options: [5, 6, 7],
            answer: 6,
            hint: "Subtracting 3 undoes adding 3.",
          },
        ],
      },
      {
        id: "fact-family",
        title: "Fact Families",
        subtitle: "Three numbers. Four sentences.",
        emoji: "🌞",
        idea: {
          hook: "When three numbers belong together — like 4, 6, and 10 — you can write four different true sentences with them. They're a math family.",
          viz: { type: "factFamily", params: { a: 4, b: 6, product: 10, op: "+", revealCount: 4 } },
          caption: "4 + 6 = 10. 6 + 4 = 10. 10 − 4 = 6. 10 − 6 = 4. Same family.",
        },
        watchMe: [
          { text: "Meet the family: 3, 5, and 8.",
            viz: { type: "factFamily", params: { a: 3, b: 5, product: 8, op: "+", revealCount: 0 } } },
          { text: "First + sentence: 3 + 5 = 8.",
            equation: "3 + 5 = 8",
            viz: { type: "factFamily", params: { a: 3, b: 5, product: 8, op: "+", revealCount: 1 } } },
          { text: "Flip the parts: 5 + 3 = 8. Still true.",
            equation: "5 + 3 = 8",
            viz: { type: "factFamily", params: { a: 3, b: 5, product: 8, op: "+", revealCount: 2 } } },
          { text: "Now subtract. Start with the whole: 8 − 3 = 5.",
            equation: "8 − 3 = 5",
            viz: { type: "factFamily", params: { a: 3, b: 5, product: 8, op: "+", revealCount: 3 } } },
          { text: "And 8 − 5 = 3. Four sentences, one family.",
            equation: "8 − 5 = 3",
            viz: { type: "factFamily", params: { a: 3, b: 5, product: 8, op: "+", revealCount: 4 } } },
        ],
        practice: [
          {
            prompt: "The family is 2, 7, 9. Which sentence is NOT in this family?",
            options: ["2 + 7 = 9", "9 − 7 = 2", "9 + 2 = 11"],
            answer: "9 + 2 = 11",
            hint: "Every sentence in the family uses all three numbers: 2, 7, 9.",
          },
          {
            prompt: "If 4 + 8 = 12 is in the family, what subtraction sentence belongs?",
            options: ["12 − 4 = 8", "8 − 4 = 4", "12 − 10 = 2"],
            answer: "12 − 4 = 8",
          },
        ],
      },
      {
        id: "find-missing",
        title: "Missing Number",
        subtitle: "Flip the sentence to find it.",
        emoji: "🔎",
        idea: {
          hook: "Sometimes the number you want is hiding. If you see 5 + ? = 12, you can flip it: 12 − 5 tells you the missing part.",
          viz: { type: "barModel", params: { whole: 12, parts: [{ value: 5, label: "5" }, { value: 7, label: "?" }] } },
          caption: "The whole is 12. One part is 5. The other part hides — but 12 − 5 reveals it.",
        },
        watchMe: [
          { text: "Look: 9 − ? = 4. What's missing?",
            viz: { type: "barModel", params: { whole: 9, parts: [{ value: 4, label: "4" }, { value: 5, label: "?" }] } } },
          { text: "The whole is 9. One part is 4. The other part is the mystery.",
            viz: { type: "barModel", params: { whole: 9, parts: [{ value: 4, label: "4" }, { value: 5, label: "?" }] } } },
          { text: "Flip it to addition: 4 + ? = 9. Count up from 4.",
            equation: "4 + ? = 9" },
          { text: "4, 5, 6, 7, 8, 9 — that's five hops. The missing number is 5.",
            equation: "9 − 5 = 4",
            viz: { type: "barModel", params: { whole: 9, parts: [{ value: 4, label: "4" }, { value: 5, label: "5" }] } } },
        ],
        practice: [
          {
            prompt: "8 + ? = 14. What's missing?",
            viz: { type: "barModel", params: { whole: 14, parts: [{ value: 8, label: "8" }, { value: 6, label: "?" }] } },
            options: [5, 6, 7],
            answer: 6,
            hint: "Flip to subtraction: 14 − 8 = ?",
          },
          {
            prompt: "? − 3 = 5. What number did we start with?",
            options: [2, 7, 8],
            answer: 8,
            hint: "If taking 3 away leaves 5, we started with 5 + 3.",
          },
        ],
      },
    ],
  });
})();
