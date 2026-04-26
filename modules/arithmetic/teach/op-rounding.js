/*!
 * Teaching op — Rounding (arithmetic).
 *
 * CCSS 3.NBT.1: "Use place value understanding to round whole numbers
 * to the nearest 10 or 100."
 *
 * Strategies:
 *   1. Halfway rule (5-or-more goes up)
 *   2. Picture the number line
 *   3. Round to the nearest 100
 */
(function () {
  MR.Content.registerOp({
    id: "ari-op-rounding",
    moduleId: "arithmetic",
    label: "Rounding",
    emoji: "🎯",
    tagline: "Snap to the nearest round number.",
    accent: "#ffd93d",
    strategies: [
      {
        id: "halfway",
        title: "5 or More — Round Up",
        subtitle: "The rule of thumb.",
        emoji: "👆",
        idea: {
          hook: "When you round to the nearest 10, look at the ONES digit. If it's 5 or more, round UP. If it's 4 or less, round DOWN (keep the tens, zero the ones).",
          viz: { type: "numberLine", params: { min: 40, max: 50, at: 47, label: "47 → closer to 50 than 40" } },
          caption: "47 ends in 7, so we round UP to 50.",
        },
        watchMe: [
          { text: "Round 23 to the nearest 10. Ones digit = 3. That's less than 5, so round DOWN to 20.",
            viz: { type: "numberLine", params: { min: 20, max: 30, at: 23 } },
            equation: "23 → 20" },
          { text: "Round 78 to the nearest 10. Ones digit = 8. Round UP to 80.",
            viz: { type: "numberLine", params: { min: 70, max: 80, at: 78 } },
            equation: "78 → 80" },
          { text: "Round 45 — exactly halfway. The rule says 5 goes UP, so 45 → 50.",
            viz: { type: "numberLine", params: { min: 40, max: 50, at: 45 } },
            equation: "45 → 50" },
          { text: "Remember: 0-1-2-3-4 round DOWN. 5-6-7-8-9 round UP." },
        ],
        practice: [
          { prompt: "Round 34 to the nearest 10.", options: [30, 34, 40], answer: 30,
            hint: "Ones digit is 4 — round down." },
          { prompt: "Round 67 to the nearest 10.", options: [60, 65, 70], answer: 70,
            hint: "Ones digit is 7 — round up." },
          { prompt: "Round 85 to the nearest 10.", options: [80, 85, 90], answer: 90,
            hint: "5 goes UP." },
          { prompt: "Round 12 to the nearest 10.", options: [10, 12, 20], answer: 10,
            hint: "Ones digit is 2 — round down." },
        ],
      },
      {
        id: "picture-line",
        title: "Picture the Line",
        subtitle: "Snap to the nearer tick.",
        emoji: "📏",
        idea: {
          hook: "Imagine a number line with only the round numbers shown. Your number sits somewhere between two of them. It rounds to whichever tick is CLOSER.",
          viz: { type: "numberLine", params: { min: 30, max: 40, at: 34, label: "34 is closer to 30" } },
          caption: "34 is 4 away from 30, but 6 away from 40 → 30 wins.",
        },
        watchMe: [
          { text: "Round 62 to the nearest 10. It lives between 60 and 70.",
            viz: { type: "numberLine", params: { min: 60, max: 70, at: 62 } } },
          { text: "62 is only 2 steps from 60, but 8 steps from 70. 60 is closer.",
            equation: "62 → 60" },
          { text: "Round 128 to the nearest 10. Between 120 and 130.",
            viz: { type: "numberLine", params: { min: 120, max: 130, at: 128 } } },
          { text: "128 is 8 past 120 but only 2 from 130 → round UP to 130.",
            equation: "128 → 130" },
        ],
        practice: [
          { prompt: "Round 52 to the nearest 10.", options: [50, 55, 60], answer: 50,
            hint: "52 is only 2 past 50." },
          { prompt: "Round 89 to the nearest 10.", options: [80, 85, 90], answer: 90,
            hint: "89 is 1 away from 90." },
          { prompt: "Round 141 to the nearest 10.", options: [130, 140, 150], answer: 140,
            hint: "141 is 1 past 140." },
        ],
      },
      {
        id: "nearest-hundred",
        title: "Round to Hundreds",
        subtitle: "Look at the TENS digit.",
        emoji: "💯",
        idea: {
          hook: "Same rule, bigger jumps. When rounding to the nearest 100, look at the TENS digit. 5 or more → round up. Less than 5 → round down.",
          viz: { type: "numberLine", params: { min: 200, max: 300, at: 247, label: "247 → 200" } },
          caption: "Tens digit of 247 is 4. Round DOWN to 200.",
        },
        watchMe: [
          { text: "Round 372 to the nearest 100. Tens digit = 7. Round UP to 400.",
            equation: "372 → 400" },
          { text: "Round 518 to the nearest 100. Tens digit = 1. Round DOWN to 500.",
            equation: "518 → 500" },
          { text: "Round 650 to the nearest 100. Tens digit = 5 → round UP to 700.",
            equation: "650 → 700" },
          { text: "The tens digit tells you which way. Ignore the ones for this one!" },
        ],
        practice: [
          { prompt: "Round 234 to the nearest 100.", options: [200, 230, 300], answer: 200,
            hint: "Tens digit is 3 — less than 5 — round DOWN." },
          { prompt: "Round 567 to the nearest 100.", options: [500, 560, 600], answer: 600,
            hint: "Tens digit is 6 — round UP." },
          { prompt: "Round 749 to the nearest 100.", options: [700, 740, 800], answer: 700,
            hint: "Tens digit is 4 — round down." },
          { prompt: "Round 850 to the nearest 100.", options: [800, 850, 900], answer: 900,
            hint: "Tens digit of 5 rounds UP." },
        ],
      },
    ],
  });
})();
