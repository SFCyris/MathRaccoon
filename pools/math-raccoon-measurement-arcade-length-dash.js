/*
 * Pool: Ruler Race (Measurement · Arcade)
 * =======================================
 * Drag the ✋ end-mark on a ruler to measure each colored ribbon.
 * Uses dragDrop engine, kind: "ruler".
 *
 * CCSS 3.MD.4 / 3.MD.5 (and the general "read a scale" skill).
 *
 * FORMAT:
 *   {
 *     "kind": "ruler",
 *     "prompt": "...",
 *     "scale":   { "min":0, "max":20, "step":1, "unit":"cm" },
 *     "segment": { "start":3, "end":11 },
 *     "answer":  8,
 *     "hint":    "..."
 *   }
 *
 * The student drags the end marker; the engine checks that the
 * marker lines up with segment.end (which equals start + answer).
 */
MR.Pools.register({
  "id": "mea-arcade-length-dash",
  "title": "Ruler Race",
  "askedPerRound": 6,
  "questions": [
    { "kind": "ruler",
      "prompt": "How long is the red ribbon? Drag ✋ to the end.",
      "scale":   { "min": 0, "max": 10, "step": 1, "unit": "cm" },
      "segment": { "start": 0, "end": 4 },
      "answer":  4,
      "hint":    "Start at 0, end at 4 → 4 cm." },

    { "kind": "ruler",
      "prompt": "Measure the blue ribbon.",
      "scale":   { "min": 0, "max": 10, "step": 1, "unit": "cm" },
      "segment": { "start": 0, "end": 7 },
      "answer":  7,
      "hint":    "End mark goes on 7." },

    { "kind": "ruler",
      "prompt": "The ribbon starts at 2. How long is it?",
      "scale":   { "min": 0, "max": 12, "step": 1, "unit": "cm" },
      "segment": { "start": 2, "end": 8 },
      "answer":  6,
      "hint":    "8 - 2 = 6 cm." },

    { "kind": "ruler",
      "prompt": "Measure this longer ribbon.",
      "scale":   { "min": 0, "max": 20, "step": 1, "unit": "cm" },
      "segment": { "start": 0, "end": 13 },
      "answer":  13,
      "hint":    "Past 10, count 1, 2, 3 more → 13." },

    { "kind": "ruler",
      "prompt": "How long is this pencil?",
      "scale":   { "min": 0, "max": 20, "step": 1, "unit": "cm" },
      "segment": { "start": 3, "end": 11 },
      "answer":  8,
      "hint":    "11 - 3 = 8 cm." },

    { "kind": "ruler",
      "prompt": "Measure the ribbon in cm.",
      "scale":   { "min": 0, "max": 20, "step": 1, "unit": "cm" },
      "segment": { "start": 5, "end": 17 },
      "answer":  12,
      "hint":    "17 - 5 = 12 cm." },

    { "kind": "ruler",
      "prompt": "Drag ✋ to the end of the ribbon.",
      "scale":   { "min": 0, "max": 15, "step": 1, "unit": "cm" },
      "segment": { "start": 0, "end": 9 },
      "answer":  9,
      "hint":    "End of ribbon is at 9." },

    { "kind": "ruler",
      "prompt": "How long is this straw?",
      "scale":   { "min": 0, "max": 20, "step": 1, "unit": "cm" },
      "segment": { "start": 4, "end": 19 },
      "answer":  15,
      "hint":    "19 - 4 = 15 cm." },

    { "kind": "ruler",
      "prompt": "Measure this short string.",
      "scale":   { "min": 0, "max": 10, "step": 1, "unit": "cm" },
      "segment": { "start": 1, "end": 4 },
      "answer":  3,
      "hint":    "4 - 1 = 3 cm." },

    { "kind": "ruler",
      "prompt": "How long is the tape?",
      "scale":   { "min": 0, "max": 20, "step": 1, "unit": "cm" },
      "segment": { "start": 2, "end": 16 },
      "answer":  14,
      "hint":    "16 - 2 = 14 cm." },

    { "kind": "ruler",
      "prompt": "Measure in inches.",
      "scale":   { "min": 0, "max": 12, "step": 1, "unit": "in" },
      "segment": { "start": 0, "end": 5 },
      "answer":  5,
      "hint":    "Inches this time — end mark at 5." },

    { "kind": "ruler",
      "prompt": "How long is this nail?",
      "scale":   { "min": 0, "max": 12, "step": 1, "unit": "in" },
      "segment": { "start": 1, "end": 7 },
      "answer":  6,
      "hint":    "7 - 1 = 6 in." },
  ],
});
