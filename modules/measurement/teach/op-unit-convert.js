/*!
 * Teaching op — Unit Conversion (measurement).
 *
 * CCSS 3.MD.A.2: "Measure and estimate liquid volumes and masses of objects
 * using standard units of grams (g), kilograms (kg), and liters (l)."
 * Also touches 4.MD.A.1 — convert between units in the same system.
 *
 * Focus: know which unit fits which thing, and basic conversions between
 * units in the same family (kg↔g, km↔m, L↔mL, ft↔in, hr↔min).
 */
(function () {
  MR.Content.registerOp({
    id: "mea-op-unit-convert",
    moduleId: "measurement",
    label: "Unit Conversion",
    emoji: "🔄",
    tagline: "Big unit. Little unit. Same thing.",
    accent: "#6ee7b7",
    strategies: [
      {
        id: "pick-the-right-unit",
        title: "Pick the Right Unit",
        subtitle: "Big thing = big unit. Tiny thing = tiny unit.",
        emoji: "🤔",
        idea: {
          hook: "You wouldn't measure a playground in centimeters (tons of counting) or an ant in meters (tons of zeros). Match the TOOL to the SIZE.",
          viz: { type: "unitScale", params: {
            unitA: { label: "kg (big)",  size: 60, count: 1 },
            unitB: { label: "g (small)", size: 12, count: 12 },
            caption: "1 kg ≈ weight of a book · 1 g ≈ weight of a paper clip",
          } },
          caption: "Big units for big things. Small units for small things.",
        },
        watchMe: [
          { text: "Length: a PENCIL is about 7 inches — so we use INCHES (or cm).",
            viz: { type: "ruler", params: { length: 7, unit: "in", item: "✏️", itemLen: 6 } } },
          { text: "Length: a ROOM is about 4 METERS — meters beat inches here.",
            equation: "Room ≈ 4 m (not 157 in)" },
          { text: "Weight: a BACKPACK ≈ 3 KILOGRAMS (kg). Kilograms beat grams for bigger loads.",
            equation: "Backpack ≈ 3 kg = 3000 g" },
          { text: "Liquid: a WATER BOTTLE ≈ 1 LITER (L). A raindrop ≈ 1 MILLILITER (mL).",
            equation: "1 L = 1000 mL" },
        ],
        practice: [
          {
            prompt: "Best unit to measure the length of your FOOT?",
            viz: { type: "ruler", params: { length: 10, unit: "in", item: "🦶", itemLen: 8 } },
            options: ["kilometers", "inches", "liters"],
            answer: "inches",
            hint: "Kilometers are for long distances. Liters are for liquid.",
          },
          {
            prompt: "Best unit for the weight of a FULL WATERMELON?",
            viz: { type: "unitScale", params: {
              unitA: { label: "🍉",   size: 60, count: 1 },
              unitB: { label: "g (tiny)", size: 8, count: 5 },
              caption: "A watermelon is heavy.",
            } },
            options: ["grams", "kilograms", "milliliters"],
            answer: "kilograms",
            hint: "A watermelon is heavy. Kilograms are the bigger weight unit.",
          },
          {
            prompt: "Best unit for the amount of water in a SWIMMING POOL?",
            viz: { type: "capacityJug", params: { capacity: 1, fill: 1, unit: "L", label: "Many liters fill a pool" } },
            options: ["milliliters", "liters", "grams"],
            answer: "liters",
          },
        ],
      },
      {
        id: "big-to-small",
        title: "Big Unit → Small Unit",
        subtitle: "MULTIPLY when going smaller.",
        emoji: "⤵️",
        idea: {
          hook: "When you switch to a SMALLER unit, the NUMBER gets BIGGER. Think of it like cutting a pizza into smaller slices — more slices! To go from kg to g, MULTIPLY by 1000 (1 kg = 1000 g).",
          viz: { type: "unitScale", params: {
            unitA: { label: "1 kg",   size: 64, count: 1 },
            unitB: { label: "1000 g", size: 6,  count: 16 },
            caption: "1 kg = 1000 g",
            note: "Smaller unit → bigger number.",
          } },
        },
        watchMe: [
          { text: "How many GRAMS are in 2 KILOGRAMS? Bigger unit → smaller unit, so number goes UP.",
            viz: { type: "unitScale", params: {
              unitA: { label: "2 kg",     size: 60, count: 2 },
              unitB: { label: "? g",      size: 6,  count: 0 },
              caption: "2 kg = ? g",
            } } },
          { text: "1 kg = 1000 g. So 2 kg = 2 × 1000 = 2000 g.",
            viz: { type: "unitScale", params: {
              unitA: { label: "2 kg",     size: 60, count: 2 },
              unitB: { label: "2000 g",   size: 6,  count: 20 },
              caption: "2 kg = 2000 g",
            } },
            equation: "2 × 1000 = 2000" },
          { text: "How many MINUTES are in 3 HOURS? Same rule — multiply by the conversion.",
            viz: { type: "unitScale", params: {
              unitA: { label: "3 hr",     size: 50, count: 3 },
              unitB: { label: "180 min",  size: 5,  count: 24 },
              caption: "1 hr = 60 min, so 3 × 60 = 180",
            } },
            equation: "3 × 60 = 180" },
          { text: "How many INCHES are in 2 FEET?",
            viz: { type: "ruler", params: { length: 24, unit: "in", item: "📏", itemLen: 24 } },
            equation: "2 × 12 = 24 in" },
          { text: "Pattern: from big unit to small unit, ALWAYS multiply.",
            viz: { type: "functionTable", params: {
              rule: { op: "×", n: 1000 },
              rows: [{ in: 1, out: 1000 }, { in: 2, out: 2000 }, { in: 5, out: 5000 }],
              caption: "kg → g machine: ×1000 every time",
            } } },
        ],
        practice: [
          {
            prompt: "How many mL are in 3 L?",
            viz: { type: "functionTable", params: { rule: { op: "×", n: 1000 }, rows: [{ in: 3, out: null }], machine: { in: 3, out: null, showOut: true }, activeRowIdx: 0 } },
            options: [30, 300, 3000],
            answer: 3000,
            hint: "1 L = 1000 mL. Multiply 3 × 1000.",
          },
          {
            prompt: "How many grams are in 5 kg?",
            viz: { type: "functionTable", params: { rule: { op: "×", n: 1000 }, rows: [{ in: 5, out: null }], machine: { in: 5, out: null, showOut: true }, activeRowIdx: 0 } },
            options: [500, 5000, 50],
            answer: 5000,
            hint: "Multiply 5 × 1000.",
          },
          {
            prompt: "How many minutes are in 2 hours?",
            viz: { type: "functionTable", params: { rule: { op: "×", n: 60 }, rows: [{ in: 2, out: null }], machine: { in: 2, out: null, showOut: true }, activeRowIdx: 0 } },
            options: [60, 120, 200],
            answer: 120,
            hint: "Multiply 2 × 60.",
          },
          {
            prompt: "How many inches are in 4 feet?",
            viz: { type: "functionTable", params: { rule: { op: "×", n: 12 }, rows: [{ in: 4, out: null }], machine: { in: 4, out: null, showOut: true }, activeRowIdx: 0 } },
            options: [12, 24, 48],
            answer: 48,
            hint: "1 foot = 12 inches. 4 × 12 = 48.",
          },
        ],
      },
      {
        id: "small-to-big",
        title: "Small Unit → Big Unit",
        subtitle: "DIVIDE when going bigger.",
        emoji: "⤴️",
        idea: {
          hook: "Going the OTHER way — from smaller to bigger units — means the number gets SMALLER. DIVIDE. Example: 2000 g ÷ 1000 = 2 kg. If the division isn't clean, leave a remainder in the small unit.",
          viz: { type: "unitScale", params: {
            unitA: { label: "2000 g",  size: 6,  count: 20 },
            unitB: { label: "2 kg",    size: 64, count: 2 },
            caption: "2000 g = 2 kg (÷ 1000)",
          } },
        },
        watchMe: [
          { text: "How many HOURS is 120 minutes? Small unit to big unit — number gets smaller.",
            viz: { type: "unitScale", params: {
              unitA: { label: "120 min",  size: 5,  count: 18 },
              unitB: { label: "? hr",     size: 50, count: 0 },
              caption: "120 min = ? hr",
            } } },
          { text: "Divide by the conversion: 120 ÷ 60 = 2 hours.",
            viz: { type: "unitScale", params: {
              unitA: { label: "120 min",  size: 5,  count: 18 },
              unitB: { label: "2 hr",     size: 50, count: 2 },
              caption: "120 ÷ 60 = 2 hours",
            } },
            equation: "120 ÷ 60 = 2 hr" },
          { text: "A 150-minute movie: how many WHOLE hours fit, with what left over?",
            viz: { type: "timeline", params: { start: "0:00", end: "2:30", hops: [{ from: "0:00", to: "1:00", text: "+60" }, { from: "1:00", to: "2:00", text: "+60" }, { from: "2:00", to: "2:30", text: "+30" }], label: "Two whole hours + 30 min left over" } },
            equation: "150 minutes is 2 whole hours with 30 minutes left over" },
          { text: "2 hours and 30 minutes. The 30 is the leftover (not a whole hour)." },
          { text: "Pattern: small unit to big unit, ALWAYS divide.",
            viz: { type: "functionTable", params: {
              rule: { op: "÷", n: 1000 },
              rows: [{ in: 1000, out: 1 }, { in: 5000, out: 5 }, { in: 8000, out: 8 }],
              caption: "g → kg machine: ÷1000 every time",
            } } },
        ],
        practice: [
          {
            prompt: "How many liters is 5000 mL?",
            viz: { type: "functionTable", params: { rule: { op: "÷", n: 1000 }, rows: [{ in: 5000, out: null }], machine: { in: 5000, out: null, showOut: true }, activeRowIdx: 0 } },
            options: [5, 50, 500],
            answer: 5,
            hint: "Divide 5000 ÷ 1000.",
          },
          {
            prompt: "How many hours is 180 minutes?",
            viz: { type: "functionTable", params: { rule: { op: "÷", n: 60 }, rows: [{ in: 180, out: null }], machine: { in: 180, out: null, showOut: true }, activeRowIdx: 0 } },
            options: [2, 3, 6],
            answer: 3,
            hint: "180 ÷ 60 = 3.",
          },
          {
            prompt: "How many feet is 36 inches?",
            viz: { type: "functionTable", params: { rule: { op: "÷", n: 12 }, rows: [{ in: 36, out: null }], machine: { in: 36, out: null, showOut: true }, activeRowIdx: 0 } },
            options: [2, 3, 4],
            answer: 3,
            hint: "36 ÷ 12 = 3.",
          },
          {
            prompt: "How many kilograms is 4000 grams?",
            viz: { type: "functionTable", params: { rule: { op: "÷", n: 1000 }, rows: [{ in: 4000, out: null }], machine: { in: 4000, out: null, showOut: true }, activeRowIdx: 0 } },
            options: [4, 40, 400],
            answer: 4,
            hint: "4000 ÷ 1000 = 4.",
          },
        ],
      },
      {
        id: "detective-unit",
        title: "Detective — Spot the Conversion",
        subtitle: "Given a pair, find the rule.",
        emoji: "🔍",
        idea: {
          hook: "Every unit pair has a HIDDEN multiplier. 1 kg = 1000 g, 1 hr = 60 min, 1 ft = 12 in. Given a few rows of a conversion table, you can spot the multiplier just like a function rule.",
          viz: {
            type: "functionTable",
            params: {
              rule: null,
              rows: [
                { in: 1, out: 60 },
                { in: 2, out: 120 },
                { in: 5, out: 300 },
              ],
              caption: "Hours → Minutes. What's the multiplier?",
            },
          },
          caption: "Find the multiplier between IN and OUT. That's the conversion factor.",
        },
        watchMe: [
          { text: "Three rows of a hidden conversion. Each IN, an OUT 60 times bigger.",
            viz: { type: "functionTable", params: { rule: null, rows: [{ in: 1, out: 60 }, { in: 2, out: 120 }, { in: 5, out: 300 }] } } },
          { text: "1 × ? = 60. So the multiplier is 60. This is HOURS → MINUTES.",
            equation: "Conversion factor: × 60" },
          { text: "Now this hidden pair. IN 1 → OUT 1000. IN 3 → OUT 3000.",
            viz: { type: "functionTable", params: { rule: null, rows: [{ in: 1, out: 1000 }, { in: 3, out: 3000 }, { in: 5, out: 5000 }] } } },
          { text: "Multiplier of 1000 — could be kg → g, km → m, or L → mL. All use 1000.",
            equation: "Conversion factor: × 1000" },
        ],
        practice: [
          {
            prompt: "Find the multiplier: 1 → 1000, 2 → 2000, 5 → 5000.",
            viz: { type: "functionTable", params: { rule: null, rows: [{ in: 1, out: 1000 }, { in: 2, out: 2000 }, { in: 5, out: 5000 }] } },
            options: ["× 10", "× 100", "× 1000"],
            answer: "× 1000",
            hint: "1 to 1000 is a jump of 1000×.",
          },
          {
            prompt: "Find the multiplier: 1 → 60, 2 → 120, 3 → 180.",
            viz: { type: "functionTable", params: { rule: null, rows: [{ in: 1, out: 60 }, { in: 2, out: 120 }, { in: 3, out: 180 }] } },
            options: ["× 6", "× 60", "× 100"],
            answer: "× 60",
            hint: "1 hour has 60 minutes — that's the multiplier.",
          },
          {
            prompt: "Find the multiplier: 1 → 12, 2 → 24, 4 → 48.",
            viz: { type: "functionTable", params: { rule: null, rows: [{ in: 1, out: 12 }, { in: 2, out: 24 }, { in: 4, out: 48 }] } },
            options: ["× 10", "× 12", "× 24"],
            answer: "× 12",
            hint: "1 foot = 12 inches → multiplier is 12.",
          },
        ],
      },
    ],
  });
})();
