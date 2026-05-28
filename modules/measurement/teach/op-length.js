/*!
 * Teaching op — Measuring length (measurement).
 */
(function () {
  MR.Content.registerOp({
    id: "mea-op-length",
    moduleId: "measurement",
    label: "Measuring Length",
    emoji: "📏",
    tagline: "How long is it?",
    accent: "#7dd3fc",
    strategies: [
      {
        id: "ruler-zero",
        title: "Line up with Zero",
        subtitle: "Start at the start.",
        emoji: "0️⃣",
        idea: {
          hook: "When you measure, line up the left edge of your object with the 0 on the ruler. Then read the tick at the other end.",
          viz: { type: "ruler", params: { length: 8, unit: "cm", item: "🖍️", itemLen: 5 } },
          caption: "The crayon starts at 0 and ends at 5. It's 5 cm long."
        },
        watchMe: [
          { text: "Place the leaf's left edge at 0.",
            viz: { type: "ruler", params: { length: 8, unit: "cm", item: "🍃", itemLen: 4 } } },
          { text: "Look at the other end — it points to 4.",
            viz: { type: "ruler", params: { length: 8, unit: "cm", item: "🍃", itemLen: 4 } } },
          { text: "So the leaf is 4 cm long.",
            equation: "length: 4 cm" },
        ],
        practice: [
          {
            prompt: "How long is the crayon?",
            viz: { type: "ruler", params: { length: 10, unit: "cm", item: "🖍️", itemLen: 6 } },
            options: [4, 5, 6],
            answer: 6,
          },
          {
            prompt: "How long is the twig?",
            viz: { type: "ruler", params: { length: 10, unit: "cm", item: "🪵", itemLen: 7 } },
            options: [6, 7, 8],
            answer: 7,
            hint: "Check where the right end lines up."
          },
        ],
      },
      {
        id: "estimate",
        title: "Smart Estimate",
        subtitle: "Guess first, measure next.",
        emoji: "🤔",
        idea: {
          hook: "Before measuring, estimate! A pencil is about 7 cm to 20 cm. A doorway is about 2 meters tall. Good guesses sharpen your sense for sizes.",
          viz: { type: "ruler", params: { length: 10, unit: "cm", item: "✏️", itemLen: 7 } },
          caption: "Pencils are usually between 7 cm and 20 cm long."
        },
        watchMe: [
          { text: "Is this butterfly more or less than 5 cm wide? Look at the ruler.",
            viz: { type: "ruler", params: { length: 10, unit: "cm", item: "🦋", itemLen: 6 } } },
          { text: "The right end is past 5, near 6. So the wingspan is about 6 cm." },
          { text: "Good estimators get better by checking with a real ruler afterward." },
        ],
        practice: [
          {
            prompt: "About how long is a paperclip?",
            viz: { type: "ruler", params: { length: 10, unit: "cm", item: "📎", itemLen: 3 } },
            options: ["3 cm", "30 cm", "3 m"],
            answer: "3 cm",
          },
          {
            prompt: "About how tall is a doorway?",
            viz: { type: "ruler", params: { length: 4, unit: "m", item: "🚪", itemLen: 2 } },
            options: ["20 cm", "2 m", "20 m"],
            answer: "2 m",
          },
        ],
      },
      {
        id: "reverse-length",
        title: "Reverse — Find Something That Fits",
        subtitle: "Given a measurement, name an object.",
        emoji: "🔍",
        idea: {
          hook: "Run measurement backwards: if I say \"4 cm,\" what could it be? Your thumb is about 4 cm wide. A bee is about 2 cm long. Build a feel for sizes by matching numbers to real things.",
          viz: { type: "ruler", params: { length: 10, unit: "cm", item: "👍", itemLen: 4 } },
          caption: "Your thumb is about 4 cm wide — a handy ruler that's always with you.",
        },
        watchMe: [
          { text: "What's about 1 cm? A thumbtack. A small button.",
            viz: { type: "ruler", params: { length: 5, unit: "cm", item: "📌", itemLen: 1 } } },
          { text: "What's about 7 cm? A juice-box straw. A short pencil.",
            viz: { type: "ruler", params: { length: 10, unit: "cm", item: "🥤", itemLen: 7 } } },
          { text: "Detective: which object is about 3 cm?",
            viz: { type: "ruler", params: { length: 8, unit: "cm", item: "🐞", itemLen: 1 } } },
          { text: "Tiny ladybug? Only about 1 cm. A small paperclip is closer to 3 cm.",
            viz: { type: "ruler", params: { length: 8, unit: "cm", item: "📎", itemLen: 3 } } },
        ],
        practice: [
          { prompt: "Which object is about 2 cm long?",
            viz: { type: "ruler", params: { length: 8, unit: "cm", item: "🪙", itemLen: 2 } },
            options: ["a coin", "a couch", "a car"], answer: "a coin",
            hint: "Couches are meters long. Coins are about 2 cm." },
          { prompt: "Reverse: a child's hand-span is about ___ cm.",
            viz: { type: "ruler", params: { length: 25, unit: "cm", item: "🖐️", itemLen: 15 } },
            options: ["1 cm", "15 cm", "150 cm"], answer: "15 cm",
            hint: "Smaller than a ruler (30 cm), bigger than a finger (1 cm)." },
          { prompt: "An adult shoe is about how long?",
            viz: { type: "ruler", params: { length: 30, unit: "cm", item: "👟", itemLen: 25 } },
            options: ["3 cm", "25 cm", "2 m"], answer: "25 cm",
            hint: "About a ruler-length. Definitely not 2 meters." },
        ],
      },
    ],
  });
})();
