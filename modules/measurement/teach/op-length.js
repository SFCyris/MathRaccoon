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
            equation: "length = 4 cm" },
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
            options: ["3 cm", "30 cm", "3 m"],
            answer: "3 cm",
          },
          {
            prompt: "About how tall is a doorway?",
            options: ["20 cm", "2 m", "20 m"],
            answer: "2 m",
          },
        ],
      },
    ],
  });
})();
