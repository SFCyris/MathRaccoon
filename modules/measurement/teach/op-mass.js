/*!
 * Teaching op — Mass (measurement).
 *
 * CCSS 3.MD.2: "Measure and estimate liquid volumes and masses of objects
 * using standard units of grams (g), kilograms (kg), and liters (l)."
 *
 * Distinct pedagogy: mass is estimation + unit intuition, paired with the
 * conversion (1 kg = 1000 g). The point is building a kid's sense for what
 * a gram vs a kilogram FEELS like, then linking that to the right number.
 *
 * Mirrors op-capacity's structure (unit-sense → compare → convert) so kids
 * who learned capacity recognize the pattern.
 */
(function () {
  MR.Content.registerOp({
    id: "mea-op-mass",
    moduleId: "measurement",
    label: "How Much It Weighs",
    emoji: "⚖️",
    tagline: "Grams and kilograms.",
    accent: "#a78bfa",
    strategies: [
      {
        id: "unit-sense-mass",
        title: "Feel the Unit",
        subtitle: "g is tiny. kg is a textbook.",
        emoji: "🤏",
        idea: {
          hook: "A gram is about the weight of a paper clip — barely anything. A kilogram is much heavier — about the weight of a big book or a pineapple. When you hear a number, first ask: did they say g or kg? That changes everything.",
          viz: { type: "unitScale", params: {
            unitA: { label: "1 kg (heavy)",   size: 60, count: 1 },
            unitB: { label: "1 g (tiny)",     size: 8,  count: 1 },
            caption: "1 kg ≈ a big book · 1 g ≈ a paper clip",
          } },
          caption: "Big things use kg. Tiny things use g.",
        },
        watchMe: [
          { text: "A kilogram (kg) is heavy. A liter of water weighs about 1 kg.",
            viz: { type: "unitScale", params: {
              unitA: { label: "1 kg", size: 60, count: 1 },
              unitB: { label: "",      size: 0,  count: 0 },
              caption: "Picture a 1 L water bottle — that's about 1 kg.",
            } } },
          { text: "A gram (g) is tiny. A single grape weighs about 5 g. A paper clip weighs about 1 g.",
            viz: { type: "unitScale", params: {
              unitA: { label: "1 g",  size: 8,  count: 5 },
              unitB: { label: "",      size: 0,  count: 0 },
              caption: "Five paper clips ≈ 5 g (about one grape)",
            } } },
          { text: "Big things use kg: a backpack (3 kg), a watermelon (5 kg), a child (30 kg).",
            equation: "Big things: use kg" },
          { text: "Tiny things use g: a coin (5 g), a slice of bread (30 g), a chocolate bar (50 g).",
            equation: "Tiny things: use g" },
        ],
        practice: [
          {
            prompt: "Which unit for a WATERMELON?",
            viz: { type: "unitScale", params: {
              unitA: { label: "🍉", size: 60, count: 1 },
              unitB: { label: "1 g (tiny)", size: 8, count: 1 },
              caption: "Heavy object — big unit or small?",
            } },
            options: ["g", "kg"],
            answer: "kg",
            hint: "Watermelons are heavy — kilograms are the bigger unit.",
          },
          {
            prompt: "Which unit for a SINGLE GRAPE?",
            viz: { type: "unitScale", params: {
              unitA: { label: "🍇 one grape", size: 14, count: 1 },
              unitB: { label: "1 kg", size: 60, count: 1 },
              caption: "Tiny object — big unit or small?",
            } },
            options: ["g", "kg"],
            answer: "g",
            hint: "Grapes are tiny — grams are the smaller unit.",
          },
          {
            prompt: "Which unit for a BICYCLE?",
            viz: { type: "unitScale", params: {
              unitA: { label: "🚲", size: 70, count: 1 },
              unitB: { label: "1 g (paper clip)", size: 8, count: 1 },
              caption: "Heavy object — pick the unit.",
            } },
            options: ["g", "kg"],
            answer: "kg",
            hint: "Bicycles are heavy. Kilograms.",
          },
          {
            prompt: "Which unit for a PENCIL?",
            viz: { type: "unitScale", params: {
              unitA: { label: "✏️", size: 18, count: 1 },
              unitB: { label: "1 kg", size: 60, count: 1 },
              caption: "Light object — pick the unit.",
            } },
            options: ["g", "kg"],
            answer: "g",
            hint: "Pencils are light. Grams.",
          },
        ],
      },
      {
        id: "compare-mass",
        title: "Comparing Mass",
        subtitle: "Which is heavier?",
        emoji: "⚖️",
        idea: {
          hook: "When you compare two things' weights, bigger doesn't always mean heavier. A balloon full of air is BIG but very LIGHT. A small rock can weigh more than a big pillow. To compare, you need the NUMBER and the UNIT — not the size of the container.",
          viz: { type: "unitScale", params: {
            unitA: { label: "2 kg book",   size: 50, count: 1 },
            unitB: { label: "500 g pillow", size: 70, count: 1 },
            caption: "The pillow LOOKS bigger, but the book weighs 4× more (2000 g vs 500 g).",
          } },
          caption: "Compare numbers + units, not the size of the object.",
        },
        watchMe: [
          { text: "Object A weighs 3 kg. Object B weighs 1500 g. Which is heavier?",
            viz: { type: "unitScale", params: {
              unitA: { label: "3 kg",    size: 60, count: 1 },
              unitB: { label: "1500 g",  size: 30, count: 1 },
              caption: "Convert to the same unit to compare.",
            } } },
          { text: "Convert 3 kg to grams: 3 × 1000 = 3000 g. Now compare: 3000 g vs 1500 g.",
            equation: "3000 g > 1500 g" },
          { text: "A is heavier. The rule: always make both units match before comparing." },
          { text: "You can also think of 1500 g as 1 kg and 500 g. That's less than 3 whole kg — same answer.",
            equation: "1500 g is 1 kg and 500 g" },
        ],
        practice: [
          {
            prompt: "Which is heavier: a 2 kg book or a 1500 g pillow?",
            viz: { type: "unitScale", params: {
              unitA: { label: "2 kg book", size: 50, count: 1 },
              unitB: { label: "1500 g pillow", size: 60, count: 1 },
              caption: "Convert both to the same unit.",
            } },
            options: ["2 kg book", "1500 g pillow", "equal"],
            answer: "2 kg book",
            hint: "2 kg = 2000 g. 2000 > 1500.",
          },
          {
            prompt: "Which is heavier: 800 g of grapes or 1 kg of grapes?",
            viz: { type: "unitScale", params: {
              unitA: { label: "800 g", size: 40, count: 1 },
              unitB: { label: "1 kg", size: 50, count: 1 },
              caption: "1 kg vs 800 g — convert to compare.",
            } },
            options: ["800 g", "1 kg", "equal"],
            answer: "1 kg",
            hint: "1 kg = 1000 g. 1000 > 800.",
          },
          {
            prompt: "A bag of rice is 2 kg. A bag of sugar is 2000 g. Which is heavier?",
            viz: { type: "unitScale", params: {
              unitA: { label: "2 kg rice", size: 50, count: 1 },
              unitB: { label: "2000 g sugar", size: 50, count: 1 },
              caption: "Same number in different unit shapes.",
            } },
            options: ["rice", "sugar", "equal"],
            answer: "equal",
            hint: "2 kg = 2000 g — same weight!",
          },
        ],
      },
      {
        id: "kg-g-convert",
        title: "1 kg = 1000 g",
        subtitle: "The magic thousand (again).",
        emoji: "🔢",
        idea: {
          hook: "A kilogram is just a stack of 1000 grams. The same rule as liters → milliliters: when moving between kg and g, multiply or divide by 1000.",
          viz: {
            type: "functionTable",
            params: {
              rule: { op: "×", n: 1000 },
              rows: [
                { in: 1, out: 1000 },
                { in: 2, out: 2000 },
                { in: 5, out: 5000 },
              ],
              caption: "kg → g machine: ×1000 every row.",
            },
          },
          caption: "Going from BIG unit (kg) to TINY unit (g) → multiply.",
        },
        watchMe: [
          { text: "1 kilogram = 1000 grams. Memorize this fact — it's the only one you need.",
            viz: { type: "unitScale", params: {
              unitA: { label: "1 kg",    size: 60, count: 1 },
              unitB: { label: "1000 g",  size: 6,  count: 20 },
              caption: "1 kg = 1000 g",
            } },
            equation: "1 kg = 1000 g" },
          { text: "So 2 kg = 2000 g. 3 kg = 3000 g. Easy — add three zeros.",
            equation: "2 × 1000 = 2000" },
          { text: "Going the other way: 4000 g = 4 kg (take off three zeros). 500 g = half a kg.",
            viz: {
              type: "functionTable",
              params: {
                rule: { op: "÷", n: 1000 },
                rows: [
                  { in: 1000, out: 1 },
                  { in: 3000, out: 3 },
                  { in: 7000, out: 7 },
                ],
                caption: "g → kg machine: ÷1000 every row.",
              },
            },
            equation: "4000 ÷ 1000 = 4" },
          { text: "Trick: to turn kg into g, add three zeros. To turn g into kg, take three zeros off. Same as L ↔ mL." },
        ],
        practice: [
          {
            prompt: "5 kilograms = how many grams?",
            viz: { type: "functionTable", params: { rule: { op: "×", n: 1000 }, rows: [{ in: 5, out: null }], machine: { in: 5, out: null, showOut: true }, activeRowIdx: 0 } },
            options: ["50", "500", "5000"],
            answer: "5000",
            hint: "Multiply by 1000 — add three zeros.",
          },
          {
            prompt: "6000 g = how many kilograms?",
            viz: { type: "functionTable", params: { rule: { op: "÷", n: 1000 }, rows: [{ in: 6000, out: null }], machine: { in: 6000, out: null, showOut: true }, activeRowIdx: 0 } },
            options: ["6 kg", "60 kg", "600 kg"],
            answer: "6 kg",
            hint: "Divide by 1000 — take off three zeros.",
          },
          {
            prompt: "Is 1500 g more or less than 1 kilogram?",
            viz: { type: "unitScale", params: {
              unitA: { label: "1500 g", size: 30, count: 1 },
              unitB: { label: "1 kg = 1000 g", size: 30, count: 1 },
              caption: "Compare 1500 g vs 1000 g.",
            } },
            options: ["more", "less", "equal"],
            answer: "more",
            hint: "1 kg = 1000 g. 1500 > 1000 → more.",
          },
          {
            prompt: "A bag of flour is 2 kg. How many grams is that?",
            viz: { type: "functionTable", params: { rule: { op: "×", n: 1000 }, rows: [{ in: 2, out: null }], machine: { in: 2, out: null, showOut: true }, activeRowIdx: 0 } },
            options: ["20 g", "200 g", "2000 g"],
            answer: "2000 g",
            hint: "2 kg × 1000 g/kg = 2000 g.",
          },
        ],
      },
    ],
  });
})();
