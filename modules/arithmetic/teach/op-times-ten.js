/*!
 * Teaching op — Multiply by Multiples of 10 (arithmetic).
 *
 * CCSS 3.NBT.3: "Multiply one-digit whole numbers by multiples of 10 in
 * the range 10-90 (e.g., 9 × 80, 5 × 60) using strategies based on place
 * value and properties of operations."
 *
 * × 10 IS a function rule, so the function-machine metaphor maps perfectly.
 * Every watchMe frame now carries a visual, and Strategy 4 covers the
 * reverse direction (60 ÷ 10 = ?) + detective (spot the ×10 pattern).
 */
(function () {
  MR.Content.registerOp({
    id: "ari-op-times-ten",
    moduleId: "arithmetic",
    label: "× Tens",
    emoji: "⚡",
    tagline: "Multiply by 10, 20, 30…",
    accent: "#f4c77a",
    strategies: [
      {
        id: "just-add-zero",
        title: "× 10 — Just Add a Zero",
        subtitle: "A quick rule for ×10.",
        emoji: "🪄",
        idea: {
          hook: "× 10 is a function-machine rule: drop in any number, the machine adds a zero to the end. The same rule every row — predictable.",
          viz: {
            type: "functionTable",
            params: {
              rule: { op: "×", n: 10 },
              rows: [
                { in: 3,  out: 30 },
                { in: 5,  out: 50 },
                { in: 7,  out: 70 },
                { in: 12, out: 120 },
              ],
              autoPlay: true,
              caption: "Each IN runs through the ×10 machine. Same rule, every row.",
            },
          },
          caption: "× 10 shifts every digit one place to the left.",
        },
        watchMe: [
          { text: "3 × 10. Three groups of ten — count them.",
            viz: { type: "equalGroups", params: { groups: 3, size: 10, emoji: "🟡", label: "3 groups of 10 = 30" } },
            equation: "3 × 10 = 30" },
          { text: "6 × 10. Same rule — six groups of ten.",
            viz: { type: "equalGroups", params: { groups: 6, size: 10, emoji: "🟢", label: "6 groups of 10 = 60" } },
            equation: "6 × 10 = 60" },
          { text: "Bigger numbers work too. 25 × 10 — the 25 shifts left, leaving a zero behind.",
            viz: { type: "placeValue", params: { value: 250, label: "25 → 250" } },
            equation: "25 × 10 = 250" },
          { text: "Why? Ten is the next place value up. ×10 promotes ones into tens, tens into hundreds.",
            viz: { type: "placeValue", params: { value: 70, label: "7 ones → 7 tens" } } },
        ],
        practice: [
          { prompt: "8 × 10 = ?",
            viz: { type: "functionTable", params: { rule: { op: "×", n: 10 }, rows: [{ in: 8, out: null }], machine: { in: 8, out: null, showOut: true }, activeRowIdx: 0 } },
            options: [18, 80, 800], answer: 80, hint: "Add a zero to 8." },
          { prompt: "5 × 10 = ?",
            viz: { type: "functionTable", params: { rule: { op: "×", n: 10 }, rows: [{ in: 5, out: null }], machine: { in: 5, out: null, showOut: true }, activeRowIdx: 0 } },
            options: [15, 50, 500], answer: 50, hint: "5 with a zero on the end." },
          { prompt: "12 × 10 = ?",
            viz: { type: "functionTable", params: { rule: { op: "×", n: 10 }, rows: [{ in: 12, out: null }], machine: { in: 12, out: null, showOut: true }, activeRowIdx: 0 } },
            options: [22, 112, 120], answer: 120, hint: "12 becomes 120." },
        ],
      },
      {
        id: "break-apart",
        title: "× 20, 30, 40… — Break Apart",
        subtitle: "Multiply by the digit, then add the zero.",
        emoji: "✂️",
        idea: {
          hook: "To do 6 × 40, split 40 into 4 × 10. Then 6 × 40 = 6 × 4 × 10. Do the small multiplication first (6 × 4 = 24), then stick a zero on (240).",
          viz: { type: "equalGroups", params: { groups: 4, size: 6, emoji: "🟣", label: "6 × 4 = 24, then × 10 → 240" } },
          caption: "Break the 40 into 4 × 10. Easy × first, then ×10.",
        },
        watchMe: [
          { text: "5 × 30. Split 30 into 3 × 10.",
            viz: { type: "equalGroups", params: { groups: 3, size: 5, emoji: "🟡", label: "5 × 3 = 15" } },
            equation: "5 × 3 = 15" },
          { text: "Now multiply that by 10. Stick a zero on 15.",
            viz: { type: "placeValue", params: { value: 150, label: "15 × 10 = 150" } },
            equation: "5 × 30 = 150" },
          { text: "7 × 60. Step 1: the easy part. 7 × 6 = 42.",
            viz: { type: "array", params: { rows: 7, cols: 6, color: "#a78bfa", label: "7 × 6 = 42" } },
            equation: "7 × 6 = 42" },
          { text: "Step 2: × 10. Add the zero. 42 → 420.",
            viz: { type: "placeValue", params: { value: 420, label: "42 × 10 = 420" } },
            equation: "7 × 60 = 420" },
          { text: "9 × 80. 9 × 8 = 72. Add zero: 720.",
            viz: { type: "placeValue", params: { value: 720, label: "9 × 80 = 720" } },
            equation: "9 × 80 = 720" },
          { text: "Pattern: use your basic times table, then shift one place left.",
            viz: { type: "functionTable", params: { rule: { op: "×", n: 10 }, rows: [{ in: 15, out: 150 }, { in: 42, out: 420 }, { in: 72, out: 720 }], caption: "The second step is always the same ×10 machine." } } },
        ],
        practice: [
          { prompt: "4 × 20 = ?",
            viz: { type: "equalGroups", params: { groups: 2, size: 4, emoji: "🟢", label: "Step 1: 4 × 2 = 8" } },
            options: [24, 80, 200], answer: 80, hint: "4 × 2 = 8. Then × 10 → 80." },
          { prompt: "6 × 50 = ?",
            viz: { type: "barModel", params: { parts: Array.from({ length: 6 }, () => ({ value: 50, label: "50" })) } },
            options: [56, 300, 600], answer: 300, hint: "6 × 5 = 30 → 300." },
          { prompt: "8 × 70 = ?",
            viz: { type: "barModel", params: { parts: Array.from({ length: 8 }, () => ({ value: 70, label: "70" })) } },
            options: [56, 560, 5600], answer: 560, hint: "8 × 7 = 56 → 560." },
          { prompt: "3 × 90 = ?",
            viz: { type: "barModel", params: { parts: Array.from({ length: 3 }, () => ({ value: 90, label: "90" })) } },
            options: [27, 270, 930], answer: 270, hint: "3 × 9 = 27 → 270." },
        ],
      },
      {
        id: "base-ten-pic",
        title: "See it With Base-Ten Blocks",
        subtitle: "Why the rule works.",
        emoji: "🧱",
        idea: {
          hook: "A 'ten' is a stick of 10 unit cubes. Six stacks of four tens = 24 ten-sticks = 240. The rearranging shows WHY the shortcut works, not just how.",
          viz: { type: "placeValue", params: { value: 240, label: "24 tens = 240" } },
          caption: "24 tens = 240 ones.",
        },
        watchMe: [
          { text: "3 × 20. That's 3 groups of 2 tens.",
            viz: { type: "placeValue", params: { value: 60, label: "6 tens = 60" } },
            equation: "3 × 20 = 60" },
          { text: "When you have sixty ones, you regroup into 6 tens — same number, neater pile.",
            viz: { type: "placeValue", params: { value: 60 } } },
          { text: "5 × 40. Five groups of 4 tens. Twenty tens.",
            viz: { type: "placeValue", params: { value: 200, label: "20 tens = 200" } },
            equation: "5 × 40 = 200" },
          { text: "The bigger the tens, the bigger the stack. Same place-value logic." },
        ],
        practice: [
          { prompt: "2 × 30 = ?",
            viz: { type: "placeValue", params: { value: 60, label: "How many tens? Count them." } },
            options: [23, 60, 120], answer: 60, hint: "2 groups of 3 tens = 6 tens = 60." },
          { prompt: "4 × 50 = ?",
            viz: { type: "barModel", params: { parts: Array.from({ length: 4 }, () => ({ value: 50, label: "50" })) } },
            options: [20, 200, 450], answer: 200, hint: "4 × 5 = 20 → 200." },
          { prompt: "6 × 40 = ?",
            viz: { type: "barModel", params: { parts: Array.from({ length: 6 }, () => ({ value: 40, label: "40" })) } },
            options: [46, 240, 640], answer: 240, hint: "6 × 4 = 24 → 240." },
        ],
      },
      {
        id: "reverse-and-detect",
        title: "Reverse & Detective",
        subtitle: "Run the ×10 machine backwards.",
        emoji: "🔍",
        idea: {
          hook: "If the rule is ×10 and the OUT is 70, the IN must be 7. To reverse the rule, just take the zero off the end. Or: divide by 10.",
          viz: {
            type: "functionTable",
            params: {
              rule: { op: "×", n: 10 },
              rows: [
                { in: null, out: 70 },
                { in: null, out: 90 },
                { in: null, out: 120 },
              ],
              caption: "Same machine, just running backwards. What IN gives each OUT?",
            },
          },
          caption: "Reverse the rule by undoing it: ×10 → ÷10.",
        },
        watchMe: [
          { text: "Reverse: if OUT is 80 and the rule is ×10, what went IN?",
            viz: { type: "functionTable", params: { rule: { op: "×", n: 10 }, rows: [{ in: null, out: 80 }], machine: { in: "?", out: 80, showOut: true }, activeRowIdx: 0 } } },
          { text: "Take the zero off: 80 → 8. Check: 8 × 10 = 80. ✓",
            equation: "80 ÷ 10 = 8" },
          { text: "Detective: three rows of a hidden ×N table. What's N?",
            viz: { type: "functionTable", params: { rule: null, rows: [{ in: 4, out: 40 }, { in: 7, out: 70 }, { in: 9, out: 90 }], caption: "Compare IN and OUT — what did the machine do?" } } },
          { text: "Each OUT is 10 times the IN. The hidden rule is ×10." },
        ],
        practice: [
          { prompt: "Rule: ×10. The OUT is 60. What's the IN?",
            viz: { type: "functionTable", params: { rule: { op: "×", n: 10 }, rows: [{ in: null, out: 60 }], machine: { in: "?", out: 60, showOut: true }, activeRowIdx: 0 } },
            options: [6, 60, 600], answer: 6, hint: "Drop the zero: 60 → 6." },
          { prompt: "Rule: ×10. OUT: 150. IN = ?",
            viz: { type: "functionTable", params: { rule: { op: "×", n: 10 }, rows: [{ in: null, out: 150 }], machine: { in: "?", out: 150, showOut: true }, activeRowIdx: 0 } },
            options: [15, 50, 1500], answer: 15, hint: "150 with the zero off the end." },
          { prompt: "Hidden rule. Rows: 5→50, 8→80, 11→110. What's the rule?",
            viz: { type: "functionTable", params: { rule: null, rows: [{ in: 5, out: 50 }, { in: 8, out: 80 }, { in: 11, out: 110 }] } },
            options: ["+45", "×10", "+10"], answer: "×10", hint: "Each OUT is 10× the IN." },
        ],
      },
    ],
  });
})();
