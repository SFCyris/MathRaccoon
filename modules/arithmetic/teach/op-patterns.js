/*!
 * Teaching op — Patterns (arithmetic).
 *
 * CCSS 3.OA.9: "Identify arithmetic patterns (including patterns in the
 * addition table or multiplication table), and explain them using
 * properties of operations."
 *
 * Strategies:
 *   1. Even & odd — sums & products follow rules.
 *   2. Skip-counting — spot the rhythm.
 *   3. Function tables — rule in → rule out.
 */
(function () {
  MR.Content.registerOp({
    id: "ari-op-patterns",
    moduleId: "arithmetic",
    label: "Patterns",
    emoji: "🎵",
    tagline: "Numbers have a beat.",
    accent: "#b78af0",
    strategies: [
      {
        id: "even-odd",
        title: "Even & Odd",
        subtitle: "Pairs make patterns.",
        emoji: "🎯",
        idea: {
          hook: "Even numbers pair up evenly (2, 4, 6, 8…). Odd numbers always have one left over (1, 3, 5, 7…). When you add or multiply, the answer follows a rule — it's always even or always odd!",
          viz: { type: "equalGroups", params: { groups: 3, per: 2, label: "6 dots = 3 pairs — even" } },
          caption: "Even + Even = Even. Odd + Odd = Even. Odd + Even = Odd.",
        },
        watchMe: [
          { text: "Look at 2 + 4. Both are even. The answer is 6 — also even.",
            equation: "2 + 4 = 6 (even)" },
          { text: "Now 3 + 5. Both are odd. The answer is 8 — also even! Odd + Odd = Even.",
            equation: "3 + 5 = 8 (even)" },
          { text: "And 3 + 4. One odd + one even = 7 (odd). Odd + Even always gives odd." },
          { text: "For multiplication: any number × 2 is always even. Any number × even is even.",
            equation: "any × 2 = even" },
        ],
        practice: [
          {
            prompt: "Is 7 + 5 even or odd?",
            options: ["Even", "Odd", "Can't tell"],
            answer: "Even",
            hint: "Both numbers are odd. Odd + Odd = Even.",
          },
          {
            prompt: "What about 6 × 3?",
            options: ["Even", "Odd"],
            answer: "Even",
            hint: "6 is even. Any number times an even number is even.",
          },
          {
            prompt: "And 9 + 4?",
            options: ["Even", "Odd"],
            answer: "Odd",
            hint: "One is odd, one is even. Odd + Even = Odd.",
          },
        ],
      },
      {
        id: "skip-count",
        title: "Skip-Counting",
        subtitle: "The rhythm of the table.",
        emoji: "🦘",
        idea: {
          hook: "Counting by 2s, 3s, 5s, or 10s makes a beat. You can see the beat on a number line — the hops are always the same size. The multiplication table is just skip-counting lined up!",
          viz: { type: "numberLine", params: { min: 0, max: 25, at: 20, hops: [5, 10, 15, 20], label: "Count by 5s" } },
          caption: "5, 10, 15, 20, 25 — every hop is +5.",
        },
        watchMe: [
          { text: "Count by 3s: 3, 6, 9, 12, 15. Each jump is 3.",
            viz: { type: "numberLine", params: { min: 0, max: 15, at: 15, hops: [3, 6, 9, 12, 15] } } },
          { text: "That's the 3s times table! 1×3, 2×3, 3×3, 4×3, 5×3.",
            equation: "3 · 6 · 9 · 12 · 15" },
          { text: "Count by 10s: 10, 20, 30, 40. Notice the ones digit is always 0.",
            equation: "10 · 20 · 30 · 40 · 50" },
          { text: "Count by 5s: 5, 10, 15, 20, 25. The ones digit alternates 5, 0, 5, 0." },
        ],
        practice: [
          {
            prompt: "What comes next? 4, 8, 12, 16, __",
            options: [18, 20, 24],
            answer: 20,
            hint: "Each number goes up by 4. 16 + 4 = 20.",
          },
          {
            prompt: "What comes next? 10, 20, 30, __",
            options: [35, 40, 50],
            answer: 40,
            hint: "Jumps of 10. 30 + 10 = 40.",
          },
          {
            prompt: "Skip by 3s: 3, 6, 9, __, __",
            options: ["12, 15", "11, 13", "12, 14"],
            answer: "12, 15",
            hint: "Add 3 each time. 9+3=12, then 12+3=15.",
          },
        ],
      },
      {
        id: "function-tables",
        title: "Function Tables",
        subtitle: "Same rule for every row.",
        emoji: "📋",
        idea: {
          hook: "A function table has an IN column and an OUT column. There's ONE rule that turns every in-number into its out-number. Find the rule by comparing a couple of rows — does it add something? Multiply?",
          viz: { type: "barModel", params: { parts: [2, 5], label: "IN 2 → OUT 5 · rule: +3" } },
          caption: "Same rule every time: +3.",
        },
        watchMe: [
          { text: "Table: IN 1 → OUT 4, IN 2 → OUT 5, IN 3 → OUT 6. What's the rule?" },
          { text: "Compare: 1 becomes 4. 2 becomes 5. The out is always 3 MORE than the in.",
            equation: "OUT = IN + 3" },
          { text: "So IN 10 → OUT 13. IN 7 → OUT 10. Same rule every row." },
          { text: "Sometimes the rule is ×. IN 2 → OUT 10, IN 3 → OUT 15, IN 4 → OUT 20. Rule: ×5.",
            equation: "OUT = IN × 5" },
        ],
        practice: [
          {
            prompt: "Rule: +5. If IN = 7, what's OUT?",
            options: [12, 13, 35],
            answer: 12,
            hint: "7 + 5 = 12.",
          },
          {
            prompt: "Table: 2→8, 3→12, 5→20. What's the rule?",
            options: ["+6", "×4", "×3"],
            answer: "×4",
            hint: "2×4=8. 3×4=12. Same multiplier every row.",
          },
          {
            prompt: "Rule: ×10. If IN = 6, OUT = ?",
            options: [16, 60, 600],
            answer: 60,
            hint: "6 × 10 = 60.",
          },
        ],
      },
    ],
  });
})();
