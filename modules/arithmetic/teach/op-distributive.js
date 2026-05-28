/*!
 * Teaching op — Distributive Property (arithmetic).
 *
 * CCSS 3.OA.5: "Apply properties of operations as strategies to multiply
 * and divide. Examples: 8 × 3 = 3 × 8 (commutative). 8 × 5 = 40; 8 × 2 = 16;
 * 8 × 7 = 8 × 5 + 8 × 2 = 40 + 16 = 56 (distributive)."
 *
 * The distributive property is fundamentally VISUAL — it's about cutting an
 * array into two pieces. Every watchMe frame now carries an array viz so
 * the split is something kids SEE, not just read about.
 */
(function () {
  MR.Content.registerOp({
    id: "ari-op-distributive",
    moduleId: "arithmetic",
    label: "Distributive Property",
    emoji: "🪟",
    tagline: "Split hard problems into easy ones.",
    accent: "#6ee7b7",
    strategies: [
      {
        id: "split-and-add",
        title: "Split, Then Add",
        subtitle: "Break ×7 into ×5 + ×2.",
        emoji: "✂️",
        idea: {
          // The 6×7 array is shown with the split ALREADY RENDERED so the kid
          // sees the two color-coded pieces (blue = 6×5, mint = 6×2) and the
          // sum 30 + 12 = 42 in a separate panel. No "imagine the line" — the
          // line is on screen.
          hook: "Multiplication has a superpower: SPLIT one factor into easier pieces, multiply each piece, then add. The split is just a line through the array. Look at the two colored pieces below — each one is an easier multiplication.",
          viz: { type: "breakApartArray", params: { rows: 6, cols: 7, splitAxis: "col", splitTarget: 5, label: "6 × 7 split at column 5 — blue piece + mint piece = same total." } },
          caption: "The blue piece is 6 × 5 = 30. The mint piece is 6 × 2 = 12. Together: 42. Same as 6 × 7.",
        },
        watchMe: [
          { text: "Start with 8 × 7. That's 8 rows of 7 dots — a tough fact to recall.",
            viz: { type: "breakApartArray", params: { rows: 8, cols: 7, splitAxis: "col", splitTarget: 1, showSum: false, label: "8 rows × 7 columns = 56 dots." } } },
          { text: "Now split the 7 columns into 5 + 2. The line goes between column 5 and column 6. Look at the two pieces.",
            viz: { type: "breakApartArray", params: { rows: 8, cols: 7, splitAxis: "col", splitTarget: 5, label: "Blue piece: 8 × 5. Mint piece: 8 × 2." } },
            equation: "8 × 7 = 8×5 + 8×2" },
          { text: "Each piece is an easy fact. 8 × 5 is 40 (count by 5s, eight times). 8 × 2 is 16 (double 8 is 16).",
            equation: "40 + 16 = 56" },
          { text: "Same strategy on 9 × 6: split the 6 into 5 + 1. The line goes between column 5 and column 6.",
            viz: { type: "breakApartArray", params: { rows: 9, cols: 6, splitAxis: "col", splitTarget: 5, label: "9 × 6 split at column 5." } },
            equation: "9 × 6 = 45 + 9 = 54" },
          { text: "The split works on any multiplication. Pick a hard one, split a factor into 5 + something, and do two easy facts instead." },
        ],
        practice: [
          { prompt: "Tap to split 7 × 6 into a 7×5 piece and a 7×(?) piece. What goes in the blank?",
            viz: { type: "breakApartArray", params: { rows: 7, cols: 6, splitAxis: "col", splitTarget: 5, showSum: false, label: "Tap a gap to split. Read the missing factor from the mint piece." } },
            options: [1, 2, 6], answer: 1, hint: "Look at the mint (right) piece. How many columns is it?" },
          { prompt: "Tap to split 8 × 7 into a 8×5 piece and a 8×2 piece. Read the total from both pieces.",
            viz: { type: "breakApartArray", params: { rows: 8, cols: 7, splitAxis: "col", splitTarget: 5, showSum: false, label: "Tap to split. Add both products to find the total." } },
            options: [54, 56, 58], answer: 56, hint: "Look at both colored pieces. Add their products." },
          { prompt: "Tap to split 4 × 5 into a 4×3 piece and a 4×2 piece. What is the total?",
            viz: { type: "breakApartArray", params: { rows: 4, cols: 5, splitAxis: "col", splitTarget: 3, label: "Tap to split. Add both pieces." } },
            options: [12, 20, 7], answer: 20, hint: "Look at both colored pieces. Blue: 4×3 = 12. Mint: 4×2 = 8. Add them." },
        ],
      },
      {
        id: "array-split",
        title: "See It In An Array",
        subtitle: "The picture makes it obvious.",
        emoji: "🟩",
        idea: {
          hook: "A multiplication array is a rectangle of dots. Draw a line through it anywhere — you get two smaller rectangles. The dots DIDN'T change. Just how you count them.",
          viz: { type: "breakApartArray", params: { rows: 4, cols: 8, splitAxis: "col", splitTarget: 5, label: "4 × 8 split at column 5 — same dots, two pieces." } },
          caption: "Blue piece: 4 × 5 = 20. Mint piece: 4 × 3 = 12. Together: 32. Same as 4 × 8.",
        },
        watchMe: [
          { text: "Start with 6 × 7 as an array — 6 rows of 7 dots.",
            viz: { type: "breakApartArray", params: { rows: 6, cols: 7, splitAxis: "col", splitTarget: 1, showSum: false, label: "6 rows × 7 columns." } } },
          { text: "Draw a line between columns 5 and 6. Look at the two color-coded pieces.",
            viz: { type: "breakApartArray", params: { rows: 6, cols: 7, splitAxis: "col", splitTarget: 5, label: "Blue: 6 × 5 = 30. Mint: 6 × 2 = 12." } },
            equation: "6 × 7 = 30 + 12 = 42" },
          { text: "Same total as before — we just counted in two chunks.",
            equation: "30 + 12 = 42" },
          { text: "We can split ANYWHERE. Tap a different gap to see 6 × 7 = 6×3 + 6×4 = 18 + 24 = 42.",
            viz: { type: "breakApartArray", params: { rows: 6, cols: 7, splitAxis: "col", splitTarget: 3, label: "Different split — same total." } },
            equation: "18 + 24 = 42" },
        ],
        practice: [
          { prompt: "Tap a gap to split 5 × 9 into a 5×5 piece and a 5×(?) piece. What goes in the blank?",
            viz: { type: "breakApartArray", params: { rows: 5, cols: 9, splitAxis: "col", splitTarget: 5, showSum: false, label: "Tap a gap between columns to split. Find the missing factor." } },
            options: [4, 5, 9], answer: 4, hint: "Split the 9 columns. The Left piece is 5×5. What columns are LEFT on the right?" },
          { prompt: "Tap a gap to split 6 × 8 down the middle. What is the total?",
            viz: { type: "breakApartArray", params: { rows: 6, cols: 8, splitAxis: "col", splitTarget: 4, label: "Tap to split. Both halves add to the total." } },
            options: [24, 36, 48], answer: 48, hint: "Look at both pieces. Add their products." },
          { prompt: "Tap to split 7 × 9 into a 7×5 piece and a 7×4 piece. Then pick the total.",
            viz: { type: "breakApartArray", params: { rows: 7, cols: 9, splitAxis: "col", splitTarget: 5, label: "Tap a gap between columns to split. Add both pieces." } },
            options: [56, 63, 72], answer: 63, hint: "Look at both colored pieces. Add their products." },
        ],
      },
      {
        id: "reverse-distribute",
        title: "Combine the Pieces",
        subtitle: "Run the rule in reverse — recognise a split.",
        emoji: "🔁",
        idea: {
          hook: "Sometimes a problem comes pre-split. You see (8 × 5) + (8 × 2) — those are two pieces of the SAME array. Look below: the blue piece is 8 × 5, the mint piece is 8 × 2. Together they make 8 × 7.",
          viz: { type: "breakApartArray", params: { rows: 8, cols: 7, splitAxis: "col", splitTarget: 5, label: "Two pieces, one rectangle: 8 × 5 + 8 × 2 = 8 × 7." } },
          caption: "Look for the shared factor (8). Add the OTHER factors (5 + 2 = 7). The original is 8 × 7.",
        },
        watchMe: [
          { text: "Look at (6 × 5) + (6 × 3). The 6 is the SAME in both pieces. The 5 and 3 are different.",
            viz: { type: "breakApartArray", params: { rows: 6, cols: 8, splitAxis: "col", splitTarget: 5, showSum: false, label: "Blue: 6 × 5. Mint: 6 × 3. Shared factor: 6." } } },
          { text: "Add the OTHER factors: 5 + 3 = 8. So both pieces together make 6 × 8.",
            equation: "(6 × 5) + (6 × 3) = 6 × 8" },
          { text: "Another one: (4 × 6) + (4 × 4). Shared factor is 4. Other factors: 6 + 4 = 10.",
            viz: { type: "breakApartArray", params: { rows: 4, cols: 10, splitAxis: "col", splitTarget: 6, showSum: false, label: "Blue: 4 × 6. Mint: 4 × 4. Shared: 4." } },
            equation: "(4 × 6) + (4 × 4) = 4 × 10" },
          { text: "The shared factor stays. The split parts add up to give the other factor." },
        ],
        practice: [
          { prompt: "(7 × 4) + (7 × 6) = 7 × ?",
            viz: { type: "breakApartArray", params: { rows: 7, cols: 10, splitAxis: "col", splitTarget: 4, showSum: false, label: "Blue: 7 × 4. Mint: 7 × 6. Shared: 7." } },
            options: [10, 24, 42], answer: 10, hint: "Both pieces share the 7. Add the other factors: 4 + 6." },
          { prompt: "(5 × 2) + (5 × 8) = 5 × ?",
            viz: { type: "breakApartArray", params: { rows: 5, cols: 10, splitAxis: "col", splitTarget: 2, showSum: false, label: "Blue: 5 × 2. Mint: 5 × 8. Shared: 5." } },
            options: [10, 16, 40], answer: 10, hint: "Add the right-side factors: 2 + 8." },
          { prompt: "Which is (3 × 5) + (3 × 2) equal to?",
            viz: { type: "breakApartArray", params: { rows: 3, cols: 7, splitAxis: "col", splitTarget: 5, showSum: false, label: "Blue: 3 × 5. Mint: 3 × 2. Shared: 3." } },
            options: ["3 × 7", "3 × 10", "5 × 5"], answer: "3 × 7", hint: "Shared 3. Add the right-side factors: 5 + 2." },
        ],
      },
    ],
  });
})();
