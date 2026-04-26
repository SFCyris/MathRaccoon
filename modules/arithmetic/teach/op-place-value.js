/*!
 * Teaching op — Place Value (arithmetic).
 * Strategies: tens & ones, hundreds, expanded form, compare.
 */
(function () {
  MR.Content.registerOp({
    id: "ari-op-place-value",
    moduleId: "arithmetic",
    label: "Place Value",
    emoji: "🏛️",
    tagline: "What does each digit mean?",
    accent: "#ffd93d",
    strategies: [
      {
        id: "tens-and-ones",
        title: "Tens & Ones",
        subtitle: "Bundle sticks into tens.",
        emoji: "📏",
        idea: {
          hook: "Numbers bigger than 9 tell you how many tens and how many ones. 23 is 2 tens and 3 ones.",
          viz: { type: "placeValue", params: { tens: 2, ones: 3, label: "23 = 2 tens + 3 ones" } },
        },
        watchMe: [
          { text: "Let's build 47. First, 4 tens rods.",
            viz: { type: "placeValue", params: { tens: 4, ones: 0, label: "40" } } },
          { text: "Now add 7 ones.",
            viz: { type: "placeValue", params: { tens: 4, ones: 7, label: "47" } } },
          { text: "4 tens = 40. Plus 7 ones = 47.",
            equation: "40 + 7 = 47" },
        ],
        practice: [
          {
            prompt: "What number is shown?",
            viz: { type: "placeValue", params: { tens: 3, ones: 5 } },
            options: [25, 35, 53],
            answer: 35,
          },
          {
            prompt: "6 tens and 2 ones = ?",
            options: [26, 62, 602],
            answer: 62,
          },
        ],
      },
      {
        id: "hundreds",
        title: "Hundreds",
        subtitle: "Ten tens make a hundred.",
        emoji: "💯",
        idea: {
          hook: "Bundle 10 tens together and you get a hundred. The number 245 is 2 hundreds, 4 tens, and 5 ones.",
          viz: { type: "placeValue", params: { hundreds: 2, tens: 4, ones: 5, label: "245" } },
        },
        watchMe: [
          { text: "Build 132. One hundred flat.",
            viz: { type: "placeValue", params: { hundreds: 1, tens: 0, ones: 0, label: "100" } } },
          { text: "Plus 3 tens.",
            viz: { type: "placeValue", params: { hundreds: 1, tens: 3, ones: 0, label: "130" } } },
          { text: "Plus 2 ones. That's 132.",
            viz: { type: "placeValue", params: { hundreds: 1, tens: 3, ones: 2, label: "132" } },
            equation: "100 + 30 + 2 = 132" },
        ],
        practice: [
          {
            prompt: "What number is shown?",
            viz: { type: "placeValue", params: { hundreds: 3, tens: 1, ones: 4 } },
            options: [134, 314, 413],
            answer: 314,
          },
          {
            prompt: "4 hundreds + 2 tens + 6 ones = ?",
            options: [246, 426, 462],
            answer: 426,
          },
        ],
      },
      {
        id: "expanded",
        title: "Expanded Form",
        subtitle: "Stretch the number out.",
        emoji: "📐",
        idea: {
          hook: "Expanded form shows every place's value: 258 = 200 + 50 + 8. Each digit stands for a different amount.",
          viz: { type: "placeValue", params: { hundreds: 2, tens: 5, ones: 8, label: "200 + 50 + 8 = 258" } },
        },
        watchMe: [
          { text: "Let's expand 374.",
            viz: { type: "placeValue", params: { hundreds: 3, tens: 7, ones: 4 } } },
          { text: "3 in the hundreds place = 300.",
            equation: "3 → 300" },
          { text: "7 in the tens place = 70. 4 in the ones = 4.",
            equation: "7 → 70, 4 → 4" },
          { text: "300 + 70 + 4 = 374.",
            equation: "300 + 70 + 4 = 374" },
        ],
        practice: [
          {
            prompt: "Expand 153. Which is correct?",
            options: ["100 + 50 + 3", "100 + 5 + 3", "1 + 5 + 3"],
            answer: "100 + 50 + 3",
          },
          {
            prompt: "400 + 60 + 2 = ?",
            options: [264, 462, 642],
            answer: 462,
          },
        ],
      },
    ],
  });
})();
