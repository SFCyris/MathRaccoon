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
          viz: { type: "equalGroups", params: { groups: 3, size: 2, label: "6 dots = 3 pairs — even" } },
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
            viz: { type: "barModel", params: { parts: [{ value: 7, label: "7 (odd)" }, { value: 5, label: "5 (odd)" }] } },
            options: ["Even", "Odd", "Can't tell"],
            answer: "Even",
            hint: "Both numbers are odd. Odd + Odd = Even.",
          },
          {
            prompt: "What about 6 × 3?",
            viz: { type: "barModel", params: { parts: [{ value: 6, label: "6" }, { value: 6, label: "6" }, { value: 6, label: "6" }] } },
            options: ["Even", "Odd"],
            answer: "Even",
            hint: "6 is even. Any number times an even number is even.",
          },
          {
            prompt: "And 9 + 4?",
            viz: { type: "barModel", params: { parts: [{ value: 9, label: "9 (odd)" }, { value: 4, label: "4 (even)" }] } },
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
            viz: { type: "numberLine", params: { min: 0, max: 24, at: 16, hops: [4, 8, 12, 16] } },
            options: [18, 20, 24],
            answer: 20,
            hint: "Each number goes up by 4. 16 + 4 = 20.",
          },
          {
            prompt: "What comes next? 10, 20, 30, __",
            viz: { type: "numberLine", params: { min: 0, max: 50, at: 30, hops: [10, 20, 30] } },
            options: [35, 40, 50],
            answer: 40,
            hint: "Jumps of 10. 30 + 10 = 40.",
          },
          {
            prompt: "Skip by 3s: 3, 6, 9, __, __",
            viz: { type: "numberLine", params: { min: 0, max: 18, at: 9, hops: [3, 6, 9] } },
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
        // --- IDEA: Stage A — watch the machine run on its own --------------
        idea: {
          hook: "A function table has an <strong>IN</strong> column and an <strong>OUT</strong> column. One <strong>RULE</strong> turns every IN into its OUT — the same rule every row. Watch the machine run.",
          viz: {
            type: "functionTable",
            params: {
              rule: { op: "+", n: 3 },
              rows: [
                { in: 1, out: 4 },
                { in: 2, out: 5 },
                { in: 3, out: 6 },
                { in: 4, out: 7 },
              ],
              autoPlay: true,
              caption: "The machine never changes its rule. +3 every time.",
            },
          },
          caption: "Blue: IN · Yellow: RULE · Green: OUT. A coral “?” means we don’t know that one yet.",
        },
        // --- WATCH ME: walk through how the same picture asks different ----
        //     questions (forward → reverse → detective) -----------------------
        watchMe: [
          {
            text: "Here's a table. The RULE is <strong>+3</strong>. The IN goes into the machine, the rule adds 3, the OUT pops out. Same rule for every row.",
            viz: {
              type: "functionTable",
              params: {
                rule: { op: "+", n: 3 },
                rows: [
                  { in: 1, out: 4 },
                  { in: 2, out: 5 },
                  { in: 3, out: 6 },
                ],
                machine: { in: 2, out: 5, showOut: true },
                activeRowIdx: 1,
              },
            },
            equation: "IN + 3 = OUT",
          },
          {
            text: "<strong>Forward:</strong> if I know the rule and I know the IN, I can find the OUT. IN = 7, rule is +3, so OUT = <strong>10</strong>.",
            viz: {
              type: "functionTable",
              params: {
                rule: { op: "+", n: 3 },
                rows: [
                  { in: 7, out: 10 },
                ],
                machine: { in: 7, out: 10, showOut: true },
                activeRowIdx: 0,
                caption: "Forward: rule + IN → OUT.",
              },
            },
          },
          {
            text: "<strong>Reverse:</strong> sometimes the OUT is shown and the IN is the mystery. If OUT = 9 and the rule is +3, the IN must be <strong>6</strong> (because 6 + 3 = 9).",
            viz: {
              type: "functionTable",
              params: {
                rule: { op: "+", n: 3 },
                rows: [
                  { in: null, out: 9 },
                ],
                machine: { in: "?", out: 9, showOut: true },
                activeRowIdx: 0,
                caption: "Reverse: rule + OUT → IN. Think “undo”.",
              },
            },
          },
          {
            text: "<strong>Detective:</strong> the rule is hidden. Compare a row to spot it. 2 became 10. 3 became 15. 4 became 20. The OUT is always 5 times the IN, so the rule is <strong>×5</strong>.",
            viz: {
              type: "functionTable",
              params: {
                rule: null,
                rows: [
                  { in: 2, out: 10 },
                  { in: 3, out: 15 },
                  { in: 4, out: 20 },
                ],
                caption: "Detective: pairs → find the rule.",
              },
            },
            equation: "IN × 5 = OUT",
          },
          {
            text: "Once you know the rule, you can fill in any gap — even a mix of forwards and backwards in the same table.",
            viz: {
              type: "functionTable",
              params: {
                rule: { op: "×", n: 5 },
                rows: [
                  { in: 2, out: 10 },
                  { in: 3, out: 15 },
                  { in: 4, out: 20 },
                  { in: 6, out: 30 },
                ],
                caption: "Same machine, every row.",
              },
            },
          },
        ],
        // --- YOUR TURN: B (forward), C (reverse), D (detective), E (gaps) ---
        practice: [
          {
            // Stage B — forward
            prompt: "The rule is <strong>+5</strong>. The machine runs IN: 7. What pops out?",
            viz: {
              type: "functionTable",
              params: {
                rule: { op: "+", n: 5 },
                rows: [{ in: 7, out: null }],
                machine: { in: 7, out: null, showOut: true },
                activeRowIdx: 0,
              },
            },
            options: [12, 13, 35],
            answer: 12,
            hint: "Take the IN and add 5. 7 + 5 = 12.",
          },
          {
            // Stage B — forward (multiplication, builds on ×)
            prompt: "The rule is <strong>×10</strong>. IN: 6. What's the OUT?",
            viz: {
              type: "functionTable",
              params: {
                rule: { op: "×", n: 10 },
                rows: [{ in: 6, out: null }],
                machine: { in: 6, out: null, showOut: true },
                activeRowIdx: 0,
              },
            },
            options: [16, 60, 600],
            answer: 60,
            hint: "×10 means 10 times as much. 6 × 10 = 60.",
          },
          {
            // Stage C — reverse
            prompt: "The rule is <strong>+4</strong>. The OUT was 11. What went IN?",
            viz: {
              type: "functionTable",
              params: {
                rule: { op: "+", n: 4 },
                rows: [{ in: null, out: 11 }],
                machine: { in: "?", out: 11, showOut: true },
                activeRowIdx: 0,
              },
            },
            options: [6, 7, 15],
            answer: 7,
            hint: "Undo the rule. 11 take away 4 = 7. Check: 7 + 4 = 11. ✓",
          },
          {
            // Stage D — detective (additive)
            prompt: "Three rows of a table. The rule is hidden. What is it?",
            viz: {
              type: "functionTable",
              params: {
                rule: null,
                rows: [
                  { in: 1, out: 4 },
                  { in: 2, out: 5 },
                  { in: 3, out: 6 },
                ],
              },
            },
            options: ["+3", "×3", "×4"],
            answer: "+3",
            hint: "Compare each row: how much bigger is OUT than IN? 4−1=3. 5−2=3. 6−3=3. Same gap → +3.",
          },
          {
            // Stage D — detective (multiplicative)
            prompt: "Hidden rule again. Look closely: 2→8, 3→12, 5→20.",
            viz: {
              type: "functionTable",
              params: {
                rule: null,
                rows: [
                  { in: 2, out: 8 },
                  { in: 3, out: 12 },
                  { in: 5, out: 20 },
                ],
              },
            },
            options: ["+6", "×4", "×3"],
            answer: "×4",
            hint: "Try multiplying: 2×4=8, 3×4=12, 5×4=20. Every row works → ×4.",
          },
          {
            // Stage E — gaps (rule given, mix of forward + reverse)
            prompt: "Rule: <strong>×2</strong>. The table has a gap in each row — which IN is missing in row 3?",
            viz: {
              type: "functionTable",
              params: {
                rule: { op: "×", n: 2 },
                rows: [
                  { in: 3, out: 6 },
                  { in: 5, out: 10 },
                  { in: null, out: 14 },
                ],
                activeRowIdx: 2,
              },
            },
            options: [6, 7, 12],
            answer: 7,
            hint: "Reverse the rule for row 3. OUT 14, rule ×2, so IN must be 14 ÷ 2 = 7.",
          },
        ],
      },
    ],
  });
})();
