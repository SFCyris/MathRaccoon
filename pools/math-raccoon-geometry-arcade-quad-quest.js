/*
 * Pool: Quad Quest (Geometry · Arcade)
 * =====================================
 * Categorize shapes by quadrilateral family. No typing — drag & drop.
 *
 * FORMAT — each question is a JSON object using the categorize kind:
 *   {
 *     "kind":    "categorize",
 *     "prompt":  "Sort by number of sides.",
 *     "buckets": [ { "id": "tri", "label": "Triangle · 3" }, ... ],
 *     "tokens":  [ { "text": "🔺", "bucket": "tri" }, ... ],
 *     "hint":    "Count sides."
 *   }
 *
 * CCSS 3.G.A.1. Teachers & parents: 12+ recommended.
 */
MR.Pools.register({
  "id": "geo-arcade-quad-quest",
  "title": "Quad Quest",
  "askedPerRound": 5,
  "questions": [
    { "kind": "categorize",
      "prompt": "Sort each shape into the correct polygon family.",
      "buckets": [
        { "id": "tri",  "label": "🔺 Triangle (3 sides)" },
        { "id": "quad", "label": "◻️ Quadrilateral (4 sides)" },
        { "id": "pent", "label": "⬠ Pentagon (5 sides)" }
      ],
      "tokens": [
        { "text": "🔺",  "bucket": "tri"  },
        { "text": "⬛",  "bucket": "quad" },
        { "text": "▭",  "bucket": "quad" },
        { "text": "⬠",  "bucket": "pent" },
        { "text": "◇",  "bucket": "quad" },
        { "text": "⛰",  "bucket": "tri"  }
      ],
      "hint": "Count the straight sides of each shape." },

    { "kind": "categorize",
      "prompt": "Has 4 right angles, or not?",
      "buckets": [
        { "id": "rt",  "label": "📐 4 right angles"      },
        { "id": "not", "label": "↗️ No right angles"      }
      ],
      "tokens": [
        { "text": "Square",        "bucket": "rt"  },
        { "text": "Rectangle",     "bucket": "rt"  },
        { "text": "Rhombus (tilted)", "bucket": "not" },
        { "text": "Parallelogram", "bucket": "not" },
        { "text": "Trapezoid",     "bucket": "not" },
        { "text": "Book corner",   "bucket": "rt"  }
      ],
      "hint": "Right angles look like the corner of a page." },

    { "kind": "categorize",
      "prompt": "Sort by number of parallel-side pairs.",
      "buckets": [
        { "id": "two", "label": "2 pairs parallel" },
        { "id": "one", "label": "1 pair parallel"  },
        { "id": "zero","label": "0 pairs parallel" }
      ],
      "tokens": [
        { "text": "Square",        "bucket": "two"  },
        { "text": "Rectangle",     "bucket": "two"  },
        { "text": "Rhombus",       "bucket": "two"  },
        { "text": "Trapezoid",     "bucket": "one"  },
        { "text": "Parallelogram", "bucket": "two"  },
        { "text": "Kite",          "bucket": "zero" }
      ],
      "hint": "Parallelograms (incl. squares/rectangles/rhombuses) have 2 pairs. Trapezoid = 1 pair. Kite = 0." },

    { "kind": "categorize",
      "prompt": "Is it a quadrilateral?",
      "buckets": [
        { "id": "yes", "label": "✅ Quadrilateral (4 sides)"     },
        { "id": "no",  "label": "❌ Not a quadrilateral"         }
      ],
      "tokens": [
        { "text": "Square",   "bucket": "yes" },
        { "text": "Triangle", "bucket": "no"  },
        { "text": "Hexagon",  "bucket": "no"  },
        { "text": "Rhombus",  "bucket": "yes" },
        { "text": "Circle",   "bucket": "no"  },
        { "text": "Kite",     "bucket": "yes" }
      ],
      "hint": "Quadrilaterals have exactly 4 straight sides." },

    { "kind": "categorize",
      "prompt": "Is every SQUARE also a …?",
      "buckets": [
        { "id": "yes", "label": "✅ Yes (square fits)" },
        { "id": "no",  "label": "❌ No"               }
      ],
      "tokens": [
        { "text": "… rectangle?",    "bucket": "yes" },
        { "text": "… rhombus?",      "bucket": "yes" },
        { "text": "… parallelogram?","bucket": "yes" },
        { "text": "… triangle?",     "bucket": "no"  },
        { "text": "… trapezoid?",    "bucket": "no"  },
        { "text": "… quadrilateral?","bucket": "yes" }
      ],
      "hint": "A square passes every test a rectangle/rhombus/parallelogram passes." },

    { "kind": "categorize",
      "prompt": "Is every RECTANGLE also a …?",
      "buckets": [
        { "id": "yes", "label": "✅ Yes (rectangle fits)" },
        { "id": "no",  "label": "❌ No"                  }
      ],
      "tokens": [
        { "text": "… parallelogram?",  "bucket": "yes" },
        { "text": "… quadrilateral?",  "bucket": "yes" },
        { "text": "… square?",         "bucket": "no"  },
        { "text": "… rhombus?",        "bucket": "no"  },
        { "text": "… trapezoid?",      "bucket": "no"  },
        { "text": "… has 4 sides?",    "bucket": "yes" }
      ],
      "hint": "Long thin rectangles aren't squares or rhombuses — their sides aren't all equal." },

    { "kind": "categorize",
      "prompt": "Sort by exact shape name.",
      "buckets": [
        { "id": "sq",  "label": "⬛ Square"    },
        { "id": "rec", "label": "▭ Rectangle"  },
        { "id": "rh",  "label": "◇ Rhombus"    }
      ],
      "tokens": [
        { "text": "4 equal sides + 4 right angles",   "bucket": "sq"  },
        { "text": "2 long + 2 short + 4 right angles", "bucket": "rec" },
        { "text": "4 equal sides, NO right angles",   "bucket": "rh"  },
        { "text": "A tilted square",                   "bucket": "rh"  },
        { "text": "A stretched square",                "bucket": "rec" },
        { "text": "A tilted diamond shape",            "bucket": "rh"  }
      ],
      "hint": "Square needs BOTH equal sides AND right angles." },

    { "kind": "categorize",
      "prompt": "Sort shapes by their NUMBER OF SIDES.",
      "buckets": [
        { "id": "3", "label": "3 sides" },
        { "id": "4", "label": "4 sides" },
        { "id": "5", "label": "5 sides" },
        { "id": "6", "label": "6 sides" }
      ],
      "tokens": [
        { "text": "Triangle",      "bucket": "3" },
        { "text": "Quadrilateral", "bucket": "4" },
        { "text": "Pentagon",      "bucket": "5" },
        { "text": "Hexagon",       "bucket": "6" },
        { "text": "Rhombus",       "bucket": "4" },
        { "text": "Honeycomb cell","bucket": "6" }
      ],
      "hint": "Tri=3, quad=4, penta=5, hexa=6." },

    { "kind": "categorize",
      "prompt": "Open or closed shapes?",
      "buckets": [
        { "id": "open",   "label": "📂 Open (has a gap)" },
        { "id": "closed", "label": "📦 Closed (no gap)"   }
      ],
      "tokens": [
        { "text": "Letter C",   "bucket": "open"   },
        { "text": "Square",     "bucket": "closed" },
        { "text": "Letter U",   "bucket": "open"   },
        { "text": "Triangle",   "bucket": "closed" },
        { "text": "Rainbow arc","bucket": "open"   },
        { "text": "Pentagon",   "bucket": "closed" }
      ],
      "hint": "Closed = every side connects end-to-end with no gaps." },

    { "kind": "categorize",
      "prompt": "Which group does the shape belong to?",
      "buckets": [
        { "id": "reg", "label": "🔷 Regular (all sides equal)" },
        { "id": "irr", "label": "🧩 Irregular (sides differ)"  }
      ],
      "tokens": [
        { "text": "Square",      "bucket": "reg" },
        { "text": "Rectangle",   "bucket": "irr" },
        { "text": "Rhombus",     "bucket": "reg" },
        { "text": "Trapezoid",   "bucket": "irr" },
        { "text": "Kite",        "bucket": "irr" },
        { "text": "Equilateral triangle", "bucket": "reg" }
      ],
      "hint": "'Regular' means all sides are the same length." },

    { "kind": "categorize",
      "prompt": "Sort these shapes by how many angles (corners).",
      "buckets": [
        { "id": "3", "label": "3 angles" },
        { "id": "4", "label": "4 angles" },
        { "id": "5", "label": "5 angles" }
      ],
      "tokens": [
        { "text": "Triangle",  "bucket": "3" },
        { "text": "Rhombus",   "bucket": "4" },
        { "text": "Pentagon",  "bucket": "5" },
        { "text": "Square",    "bucket": "4" },
        { "text": "Kite",      "bucket": "4" },
        { "text": "Yield sign","bucket": "3" }
      ],
      "hint": "Number of angles equals number of sides." },

    { "kind": "categorize",
      "prompt": "Does the shape have at least one RIGHT ANGLE?",
      "buckets": [
        { "id": "yes", "label": "📐 Has a right angle" },
        { "id": "no",  "label": "↗️ No right angles"   }
      ],
      "tokens": [
        { "text": "Square",    "bucket": "yes" },
        { "text": "Rectangle", "bucket": "yes" },
        { "text": "Rhombus",   "bucket": "no"  },
        { "text": "Parallelogram", "bucket": "no" },
        { "text": "Right triangle","bucket": "yes" },
        { "text": "Pentagon",  "bucket": "no"  }
      ],
      "hint": "Right angles make a perfect L-corner." }
  ]
});
