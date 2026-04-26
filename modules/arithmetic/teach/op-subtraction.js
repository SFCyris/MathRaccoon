/*!
 * Teaching op — Subtraction (arithmetic).
 * Strategies: count back, count up, think addition, regroup.
 */
(function () {
  MR.Content.registerOp({
    id: "ari-op-subtraction",
    moduleId: "arithmetic",
    label: "Subtraction",
    emoji: "➖",
    tagline: "Let's take apart!",
    accent: "#7dd3fc",
    strategies: [
      {
        id: "count-back",
        title: "Count Back",
        subtitle: "Hop down from the bigger number.",
        emoji: "⬅️",
        idea: {
          hook: "Take-away is like hopping backwards. Start at the bigger number and hop back the smaller number of times.",
          viz: { type: "numberLine", params: { min: 0, max: 12, at: 9, hops: [8, 7], dir: "down", label: "9 − 2 = ?" } },
          caption: "Raccoon hops backwards from 9: 8, 7."
        },
        watchMe: [
          { text: "Let's try 10 − 3. Find 10.",
            viz: { type: "numberLine", params: { min: 0, max: 12, at: 10 } } },
          { text: "Hop back: 9.",
            viz: { type: "numberLine", params: { min: 0, max: 12, at: 9, hops: [9], dir: "down", visited: [10] } } },
          { text: "Hop back again: 8.",
            viz: { type: "numberLine", params: { min: 0, max: 12, at: 8, hops: [9, 8], dir: "down", visited: [10, 9] } } },
          { text: "One more hop: 7. So 10 − 3 = 7.",
            equation: "10 − 3 = 7",
            viz: { type: "numberLine", params: { min: 0, max: 12, at: 7, hops: [9, 8, 7], dir: "down", visited: [10, 9, 8] } } },
        ],
        practice: [
          {
            prompt: "12 − 4 = ?",
            viz: { type: "numberLine", params: { min: 0, max: 14, at: 12 } },
            options: [7, 8, 9],
            answer: 8,
            hint: "Start at 12 and hop back 4: 11, 10, 9, 8."
          },
          {
            prompt: "11 − 3 = ?",
            options: [7, 8, 9],
            answer: 8,
            hint: "Start at 11, hop back 3 times."
          },
        ],
      },
      {
        id: "count-up",
        title: "Count Up",
        subtitle: "Close the gap.",
        emoji: "🪜",
        idea: {
          hook: "Another way to subtract is to count up from the smaller number to the bigger number. How many hops did it take?",
          viz: { type: "numberLine", params: { min: 0, max: 12, at: 7, hops: [8, 9, 10], label: "10 − 7 = ?" } },
          caption: "From 7 to 10 is 3 hops, so 10 − 7 = 3."
        },
        watchMe: [
          { text: "Try 13 − 9. Find the smaller number, 9.",
            viz: { type: "numberLine", params: { min: 5, max: 15, at: 9 } } },
          { text: "How many hops to 13? Let's count: 10…",
            viz: { type: "numberLine", params: { min: 5, max: 15, at: 10, hops: [10], visited: [9] } } },
          { text: "…11, 12, 13. That's 4 hops.",
            viz: { type: "numberLine", params: { min: 5, max: 15, at: 13, hops: [10, 11, 12, 13], visited: [9, 10, 11, 12] } } },
          { text: "So 13 − 9 = 4.", equation: "13 − 9 = 4" },
        ],
        practice: [
          {
            prompt: "15 − 11 = ? (count up from 11)",
            viz: { type: "numberLine", params: { min: 8, max: 17, at: 11 } },
            options: [3, 4, 5],
            answer: 4,
            hint: "From 11 to 15: 12, 13, 14, 15. Four hops."
          },
          {
            prompt: "14 − 9 = ?",
            options: [4, 5, 6],
            answer: 5,
            hint: "From 9, count up: 10, 11, 12, 13, 14. Five hops."
          },
        ],
      },
      {
        id: "think-addition",
        title: "Think Addition",
        subtitle: "Use the sister fact.",
        emoji: "🔄",
        idea: {
          hook: "Every subtraction has an addition twin. If you know 6 + 7 = 13, then you also know 13 − 7 = 6 and 13 − 6 = 7.",
          viz: { type: "factFamily", params: { a: 6, b: 7, product: 13, op: "+", revealCount: 4 } },
          caption: "Four facts share the same trio: 6, 7, 13."
        },
        watchMe: [
          { text: "We want 12 − 5. Think: what plus 5 makes 12?" },
          { text: "5 + 7 = 12. So the missing part is 7.",
            equation: "5 + 7 = 12" },
          { text: "That means 12 − 5 = 7.", equation: "12 − 5 = 7" },
        ],
        practice: [
          {
            prompt: "16 − 9 = ? Think: 9 + ? = 16.",
            options: [6, 7, 8],
            answer: 7,
          },
          {
            prompt: "14 − 6 = ? Think: 6 + ? = 14.",
            options: [7, 8, 9],
            answer: 8,
          },
        ],
      },
    ],
  });
})();
