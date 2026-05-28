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
            viz: { type: "placeValue", params: { tens: 6, ones: 2 } },
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
            viz: { type: "placeValue", params: { hundreds: 4, tens: 2, ones: 6 } },
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
            viz: { type: "placeValue", params: { hundreds: 1, tens: 5, ones: 3, label: "153" } },
            options: ["100 + 50 + 3", "100 + 5 + 3", "1 + 5 + 3"],
            answer: "100 + 50 + 3",
          },
          {
            prompt: "400 + 60 + 2 = ?",
            viz: { type: "placeValue", params: { hundreds: 4, tens: 6, ones: 2 } },
            options: [264, 462, 642],
            answer: 462,
          },
        ],
      },
      {
        id: "reverse-detective",
        title: "Reverse & Detective",
        subtitle: "Find the digit, find the number.",
        emoji: "🔍",
        idea: {
          hook: "Sometimes you start with a number and need to find a specific digit's place. Other times you have clues about the digits and need to assemble the number. Same pieces, different direction.",
          viz: { type: "placeValue", params: { hundreds: 4, tens: 7, ones: 2, label: "472 — what's the digit in each place?" } },
          caption: "Hundreds: 4. Tens: 7. Ones: 2. Same number, three positions.",
        },
        watchMe: [
          { text: "Reverse: in the number 583, what digit is in the TENS place?",
            viz: { type: "placeValue", params: { hundreds: 5, tens: 8, ones: 3, label: "583" } } },
          { text: "Look at the middle digit. The 8 sits in the tens place. So tens digit = 8.",
            equation: "583 → tens digit: 8" },
          { text: "Detective: I'm thinking of a number. 3 in the hundreds, 0 in the tens, 6 in the ones.",
            viz: { type: "placeValue", params: { hundreds: 3, tens: 0, ones: 6, label: "Find me!" } } },
          { text: "300 + 0 + 6 = 306. The 0 holds the tens place open.",
            equation: "300 + 6 = 306" },
          { text: "Compare 247 and 274. Same digits! Different places mean different values.",
            viz: { type: "placeValue", params: { hundreds: 2, tens: 7, ones: 4, label: "274 — the 7 is in tens" } },
            equation: "247 < 274 (place matters!)" },
        ],
        practice: [
          {
            prompt: "In 627, what digit is in the HUNDREDS place?",
            viz: { type: "placeValue", params: { hundreds: 6, tens: 2, ones: 7, label: "627" } },
            options: [2, 6, 7], answer: 6,
            hint: "The first (leftmost) digit is the hundreds place.",
          },
          {
            prompt: "In 405, what's in the TENS place?",
            viz: { type: "placeValue", params: { hundreds: 4, tens: 0, ones: 5, label: "405" } },
            options: [0, 4, 5], answer: 0,
            hint: "The middle digit is 0 — zero tens. The 0 holds the place open.",
          },
          {
            prompt: "A number has 7 hundreds, 2 tens, 9 ones. What is it?",
            viz: { type: "placeValue", params: { hundreds: 7, tens: 2, ones: 9 } },
            options: [279, 729, 972], answer: 729,
            hint: "700 + 20 + 9 = 729.",
          },
          {
            prompt: "Which is BIGGER: 348 or 384? (Same digits, different places.)",
            viz: { type: "placeValue", params: { hundreds: 3, tens: 8, ones: 4, label: "Compare the digit in each place" } },
            options: ["348", "384", "equal"], answer: "384",
            hint: "384 has 8 in the tens place (80). 348 only has 4 tens (40). Place matters.",
          },
        ],
      },
    ],
  });
})();
