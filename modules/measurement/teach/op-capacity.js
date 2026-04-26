/*!
 * Teaching op — Capacity (measurement).
 *
 * Distinct pedagogy: capacity is estimation, not precision. The point is
 * building intuition for what a milliliter vs a liter FEELS like, and
 * linking unit words to real-world containers. The capacityJug viz shows
 * fill levels rather than abstract numbers.
 *
 * Core moves:
 *   - unit-sense: mL = small (eyedropper), L = medium (bottle), no gallons yet
 *   - compare: when two jugs hold different amounts
 *   - convert: 1 L = 1000 mL, via fill-and-repeat visual
 */
(function () {
  MR.Content.registerOp({
    id: "mea-op-capacity",
    moduleId: "measurement",
    label: "How Much It Holds",
    emoji: "🥛",
    tagline: "Milliliters and liters.",
    accent: "#7dd3fc",
    strategies: [
      {
        id: "unit-sense",
        title: "Feel the Unit",
        subtitle: "mL is tiny. L is lunchbox-ish.",
        emoji: "🤏",
        idea: {
          hook: "A milliliter is about one tiny drop — like a raindrop from an eyedropper. A liter is much bigger — about a big water bottle. When you hear a number, first ask: did they say mL or L? That changes everything.",
          viz: { type: "capacityJug", params: { capacity: 1, fill: 0.8, unit: "L", label: "1 liter jug, almost full" } },
        },
        watchMe: [
          { text: "This is a 1-liter bottle. Imagine holding it — it's about 4 cups of water.",
            viz: { type: "capacityJug", params: { capacity: 1, fill: 1, unit: "L", label: "1 L ≈ a big drink bottle" } } },
          { text: "This is about 250 milliliters — a small cup of juice.",
            viz: { type: "capacityJug", params: { capacity: 1000, fill: 0.25, unit: "mL", label: "250 mL ≈ 1 cup" } } },
          { text: "And 10 mL? That's about two teaspoons — barely a sip.",
            viz: { type: "capacityJug", params: { capacity: 1000, fill: 0.01, unit: "mL", label: "10 mL ≈ 2 teaspoons" } } },
          { text: "When you see a number, picture it. A 5 L jug? Big — like a picnic jug. A 5 mL dose? Tiny — like medicine." },
        ],
        practice: [
          {
            prompt: "Which unit for a bathtub?",
            options: ["mL", "L"],
            answer: "L",
            hint: "Bathtubs hold a LOT. Tiny units would take thousands.",
          },
          {
            prompt: "Which unit for a spoonful of syrup?",
            options: ["mL", "L"],
            answer: "mL",
            hint: "A spoon is small — smaller than a cup.",
          },
          {
            prompt: "Which is more: 500 mL or 1 L?",
            viz: { type: "capacityJug", params: { capacity: 1, fill: 0.5, unit: "L", label: "500 mL" } },
            options: ["500 mL", "1 L", "equal"],
            answer: "1 L",
            hint: "1 L = 1000 mL. 1000 is more than 500.",
          },
        ],
      },
      {
        id: "compare-jugs",
        title: "Comparing Capacity",
        subtitle: "Which holds more?",
        emoji: "⚖️",
        idea: {
          hook: "When you compare two containers, the one filled HIGHER isn't always the one that holds more. A tall skinny bottle can hold less than a wide stubby jug. It's the SPACE inside that counts.",
          viz: { type: "capacityJug", params: { capacity: 2, fill: 0.8, unit: "L", label: "2 L jug" } },
          caption: "Numbers on the side tell you the real capacity.",
        },
        watchMe: [
          { text: "Jug A holds 2 L, half full.",
            viz: { type: "capacityJug", params: { capacity: 2, fill: 0.5, unit: "L", label: "2 L, half full = 1 L" } } },
          { text: "Jug B holds 1 L, totally full.",
            viz: { type: "capacityJug", params: { capacity: 1, fill: 1, unit: "L", label: "1 L, full = 1 L" } } },
          { text: "Both have 1 liter inside! Same amount, different-looking jugs.",
            equation: "Both = 1 L" },
          { text: "Lesson: to compare, multiply capacity × fill-fraction. Don't trust just the fill line." },
        ],
        practice: [
          {
            prompt: "Jug X: 3 L, filled to 1/3. Jug Y: 2 L, filled to 1/2. Which has MORE?",
            options: ["Jug X", "Jug Y", "equal"],
            answer: "equal",
            hint: "1/3 of 3 L = 1 L. 1/2 of 2 L = 1 L. They're equal.",
          },
          {
            prompt: "A full 500 mL bottle vs a half-full 1 L bottle — which is more?",
            options: ["500 mL bottle", "1 L bottle", "equal"],
            answer: "equal",
            hint: "Half of 1 L is 500 mL. Same amount!",
          },
        ],
      },
      {
        id: "mL-L-convert",
        title: "1 L = 1000 mL",
        subtitle: "The magic thousand.",
        emoji: "🔢",
        idea: {
          hook: "A liter is just a stack of 1000 milliliters. That's it. Whenever you move between mL and L, you're just multiplying or dividing by 1000.",
          viz: { type: "capacityJug", params: { capacity: 1000, fill: 1, unit: "mL", label: "1000 mL = 1 L" } },
        },
        watchMe: [
          { text: "One liter is the same as 1000 milliliters.",
            viz: { type: "capacityJug", params: { capacity: 1, fill: 1, unit: "L", label: "1 L" } },
            equation: "1 L = 1000 mL" },
          { text: "So 2 liters = 2000 mL. 3 liters = 3000 mL. Easy.",
            equation: "2 L = 2000 mL" },
          { text: "Going the other way: 500 mL is half a liter. 250 mL is a quarter.",
            viz: { type: "capacityJug", params: { capacity: 1, fill: 0.25, unit: "L", label: "250 mL = 1/4 L" } } },
          { text: "Trick: to turn L into mL, add three zeros. To turn mL into L, take three zeros off." },
        ],
        practice: [
          {
            prompt: "5 liters = how many milliliters?",
            options: ["50", "500", "5000"],
            answer: "5000",
            hint: "Multiply by 1000 — add three zeros.",
          },
          {
            prompt: "3000 mL = how many liters?",
            options: ["3 L", "30 L", "300 L"],
            answer: "3 L",
            hint: "Divide by 1000 — take off three zeros.",
          },
          {
            prompt: "Is 1500 mL more or less than 1 liter?",
            options: ["more", "less", "equal"],
            answer: "more",
            hint: "1 L = 1000 mL. 1500 is bigger than 1000.",
          },
        ],
      },
    ],
  });
})();
