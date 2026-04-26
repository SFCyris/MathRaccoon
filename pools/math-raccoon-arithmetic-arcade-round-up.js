/*
 * Pool: Round Up (Arithmetic · Arcade)
 * ====================================
 * Drag number chips onto the nearest 10 (or 100) on a number line.
 * Uses the `numberLine` kind of the dragDrop engine.
 *
 * FORMAT — each question:
 *   {
 *     "kind": "numberLine",
 *     "prompt": "Round each number to the nearest 10.",
 *     "scale": { "min": 0, "max": 100, "step": 10, "majorEvery": 10, "unit": "" },
 *     "markers": [
 *       { "id": "a", "label": "47", "target": 50 },
 *       { "id": "b", "label": "33", "target": 30 }
 *     ],
 *     "hint": "5 or more rounds up."
 *   }
 *
 * CCSS 3.NBT.1.
 */
MR.Pools.register({
  "id": "ari-arcade-round-up",
  "title": "Round Up",
  "askedPerRound": 6,
  "questions": [
    { "kind": "numberLine",
      "prompt": "Round each number to the nearest 10.",
      "scale": { "min": 0, "max": 100, "step": 10, "majorEvery": 10 },
      "markers": [
        { "id": "a", "label": "47", "target": 50 },
        { "id": "b", "label": "23", "target": 20 },
        { "id": "c", "label": "85", "target": 90 }
      ],
      "hint": "Ones digit 5-or-more rounds UP, 4-or-less rounds down." },

    { "kind": "numberLine",
      "prompt": "Nearest 10? Drop each number.",
      "scale": { "min": 30, "max": 70, "step": 10, "majorEvery": 10 },
      "markers": [
        { "id": "a", "label": "38", "target": 40 },
        { "id": "b", "label": "52", "target": 50 },
        { "id": "c", "label": "67", "target": 70 }
      ],
      "hint": "Look at the ones digit of each." },

    { "kind": "numberLine",
      "prompt": "Round to the nearest 10.",
      "scale": { "min": 0, "max": 50, "step": 10, "majorEvery": 10 },
      "markers": [
        { "id": "a", "label": "12", "target": 10 },
        { "id": "b", "label": "26", "target": 30 },
        { "id": "c", "label": "45", "target": 50 }
      ],
      "hint": "45 — the halfway number — rounds UP." },

    { "kind": "numberLine",
      "prompt": "Round each to the nearest 10.",
      "scale": { "min": 70, "max": 110, "step": 10, "majorEvery": 10 },
      "markers": [
        { "id": "a", "label": "74", "target": 70 },
        { "id": "b", "label": "89", "target": 90 },
        { "id": "c", "label": "103", "target": 100 }
      ],
      "hint": "Which tens mark is each closest to?" },

    { "kind": "numberLine",
      "prompt": "Round each number to the nearest 100.",
      "scale": { "min": 100, "max": 500, "step": 100, "majorEvery": 100 },
      "markers": [
        { "id": "a", "label": "234", "target": 200 },
        { "id": "b", "label": "389", "target": 400 },
        { "id": "c", "label": "450", "target": 500 }
      ],
      "hint": "Look at the TENS digit when rounding to 100." },

    { "kind": "numberLine",
      "prompt": "Round to the nearest 100.",
      "scale": { "min": 0, "max": 400, "step": 100, "majorEvery": 100 },
      "markers": [
        { "id": "a", "label": "48", "target": 0 },
        { "id": "b", "label": "167", "target": 200 },
        { "id": "c", "label": "312", "target": 300 }
      ],
      "hint": "48 is closer to 0 than to 100!" },

    { "kind": "numberLine",
      "prompt": "Nearest 10 for each.",
      "scale": { "min": 50, "max": 100, "step": 10, "majorEvery": 10 },
      "markers": [
        { "id": "a", "label": "58", "target": 60 },
        { "id": "b", "label": "72", "target": 70 },
        { "id": "c", "label": "95", "target": 100 }
      ],
      "hint": "95 rounds up — 5 goes UP." },

    { "kind": "numberLine",
      "prompt": "Nearest 100, drop them in.",
      "scale": { "min": 500, "max": 900, "step": 100, "majorEvery": 100 },
      "markers": [
        { "id": "a", "label": "549", "target": 500 },
        { "id": "b", "label": "672", "target": 700 },
        { "id": "c", "label": "850", "target": 900 }
      ],
      "hint": "549 → tens is 4 → round DOWN." },

    { "kind": "numberLine",
      "prompt": "Round to the nearest 10.",
      "scale": { "min": 10, "max": 60, "step": 10, "majorEvery": 10 },
      "markers": [
        { "id": "a", "label": "17", "target": 20 },
        { "id": "b", "label": "41", "target": 40 },
        { "id": "c", "label": "55", "target": 60 }
      ],
      "hint": "55 — halfway — rounds up." },

    { "kind": "numberLine",
      "prompt": "Nearest 100 for each.",
      "scale": { "min": 200, "max": 600, "step": 100, "majorEvery": 100 },
      "markers": [
        { "id": "a", "label": "247", "target": 200 },
        { "id": "b", "label": "356", "target": 400 },
        { "id": "c", "label": "519", "target": 500 }
      ],
      "hint": "Tens digits: 4, 5, 1." },
  ],
});
