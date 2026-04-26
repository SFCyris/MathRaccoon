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
            options: ["kilometers", "inches", "liters"],
            answer: "inches",
            hint: "Kilometers are for long distances. Liters are for liquid.",
          },
          {
            prompt: "Best unit for the weight of a FULL WATERMELON?",
            options: ["grams", "kilograms", "milliliters"],
            answer: "kilograms",
            hint: "A watermelon is heavy. Kilograms are the bigger weight unit.",
          },
          {
            prompt: "Best unit for the amount of water in a SWIMMING POOL?",
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
          { text: "How many GRAMS are in 2 KILOGRAMS?",
            equation: "2 kg = ? g" },
          { text: "1 kg = 1000 g. So 2 kg = 2 × 1000 = 2000 g.",
            equation: "2 × 1000 = 2000" },
          { text: "How many MINUTES are in 3 HOURS?",
            equation: "3 hr = ? min" },
          { text: "1 hr = 60 min. So 3 × 60 = 180 min.",
            equation: "3 × 60 = 180" },
          { text: "How many INCHES are in 2 FEET?",
            equation: "1 ft = 12 in → 2 × 12 = 24 in." },
        ],
        practice: [
          {
            prompt: "How many mL are in 3 L?",
            options: [30, 300, 3000],
            answer: 3000,
            hint: "1 L = 1000 mL. Multiply 3 × 1000.",
          },
          {
            prompt: "How many grams are in 5 kg?",
            options: [500, 5000, 50],
            answer: 5000,
            hint: "Multiply 5 × 1000.",
          },
          {
            prompt: "How many minutes are in 2 hours?",
            options: [60, 120, 200],
            answer: 120,
            hint: "Multiply 2 × 60.",
          },
          {
            prompt: "How many inches are in 4 feet?",
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
          { text: "How many HOURS is 120 minutes?",
            equation: "120 min ÷ 60 = ? hr" },
          { text: "120 ÷ 60 = 2. So 120 min = 2 hours.",
            equation: "120 min = 2 hr" },
          { text: "A 150-minute movie: how many whole hours + leftover minutes?",
            equation: "150 ÷ 60 = 2 R 30" },
          { text: "2 hours and 30 minutes. The 30 is the leftover (not a whole hour)." },
          { text: "Rule of thumb: from tiny to big, DIVIDE by the conversion number.",
            equation: "mL → L: ÷ 1000 · g → kg: ÷ 1000 · in → ft: ÷ 12 · min → hr: ÷ 60" },
        ],
        practice: [
          {
            prompt: "How many liters is 5000 mL?",
            options: [5, 50, 500],
            answer: 5,
            hint: "Divide 5000 ÷ 1000.",
          },
          {
            prompt: "How many hours is 180 minutes?",
            options: [2, 3, 6],
            answer: 3,
            hint: "180 ÷ 60 = 3.",
          },
          {
            prompt: "How many feet is 36 inches?",
            options: [2, 3, 4],
            answer: 3,
            hint: "36 ÷ 12 = 3.",
          },
          {
            prompt: "How many kilograms is 4000 grams?",
            options: [4, 40, 400],
            answer: 4,
            hint: "4000 ÷ 1000 = 4.",
          },
        ],
      },
    ],
  });
})();
