/*
 * Pool: Unit Match (Measurement · Arcade)
 * ========================================
 * Drag items / amounts into the correct unit family bucket, or match
 * equivalences. No typing. Uses the dragDrop engine (categorize kind).
 *
 * FORMAT — each question is a JSON object:
 *   {
 *     "kind":    "categorize",
 *     "prompt":  "Which unit fits each thing?",
 *     "buckets": [ { "id": "g", "label": "Grams (g)" }, ... ],
 *     "tokens":  [ { "text": "paper clip", "bucket": "g" }, ... ],
 *     "hint":    "Heavy things → kg, light things → g."
 *   }
 *
 * CCSS 3.MD.A.1–2 + 4.MD.A.1. Teachers & parents: 12+ recommended.
 */
MR.Pools.register({
  "id": "mea-arcade-unit-match",
  "title": "Unit Match",
  "askedPerRound": 5,
  "questions": [
    { "kind": "categorize",
      "prompt": "Pick the right WEIGHT unit for each thing.",
      "buckets": [
        { "id": "g",  "label": "⚖️ Grams (tiny)"      },
        { "id": "kg", "label": "🏋️ Kilograms (big)"   }
      ],
      "tokens": [
        { "text": "paperclip",     "bucket": "g"  },
        { "text": "watermelon",    "bucket": "kg" },
        { "text": "feather",       "bucket": "g"  },
        { "text": "bag of apples", "bucket": "kg" },
        { "text": "grain of rice", "bucket": "g"  },
        { "text": "backpack",      "bucket": "kg" }
      ],
      "hint": "Tiny → g. Big heavy thing → kg." },

    { "kind": "categorize",
      "prompt": "Pick the right LENGTH unit.",
      "buckets": [
        { "id": "cm", "label": "📏 Centimeters"  },
        { "id": "m",  "label": "🚶 Meters"        },
        { "id": "km", "label": "🏞️ Kilometers"   }
      ],
      "tokens": [
        { "text": "pencil",        "bucket": "cm" },
        { "text": "your height",   "bucket": "m"  },
        { "text": "a marathon",    "bucket": "km" },
        { "text": "ladybug",       "bucket": "cm" },
        { "text": "classroom",     "bucket": "m"  },
        { "text": "airport runway","bucket": "km" }
      ],
      "hint": "Small things in cm, rooms in m, long distances in km." },

    { "kind": "categorize",
      "prompt": "Pick the right LIQUID unit.",
      "buckets": [
        { "id": "mL", "label": "💧 Milliliters" },
        { "id": "L",  "label": "🪣 Liters"       }
      ],
      "tokens": [
        { "text": "one raindrop",    "bucket": "mL" },
        { "text": "bathtub of water","bucket": "L"  },
        { "text": "spoon of syrup",  "bucket": "mL" },
        { "text": "water bottle",    "bucket": "L"  },
        { "text": "eye drop",        "bucket": "mL" },
        { "text": "swimming pool",   "bucket": "L"  }
      ],
      "hint": "A tiny drop = mL. A jug or more = L." },

    { "kind": "categorize",
      "prompt": "Match each amount to its equivalent.",
      "buckets": [
        { "id": "1kg",  "label": "= 1 kg"   },
        { "id": "1m",   "label": "= 1 m"    },
        { "id": "1L",   "label": "= 1 L"    }
      ],
      "tokens": [
        { "text": "1000 g",    "bucket": "1kg" },
        { "text": "100 cm",    "bucket": "1m"  },
        { "text": "1000 mL",   "bucket": "1L"  },
        { "text": "10 hg (hectograms)", "bucket": "1kg" },
        { "text": "1000 mm",   "bucket": "1m"  },
        { "text": "4 glasses × 250 mL", "bucket": "1L" }
      ],
      "hint": "1 kg = 1000 g. 1 m = 100 cm. 1 L = 1000 mL." },

    { "kind": "categorize",
      "prompt": "Match each TIME amount to its equal amount.",
      "buckets": [
        { "id": "1hr",  "label": "= 1 hour"   },
        { "id": "1day", "label": "= 1 day"    },
        { "id": "1wk",  "label": "= 1 week"   }
      ],
      "tokens": [
        { "text": "60 minutes",  "bucket": "1hr"  },
        { "text": "24 hours",    "bucket": "1day" },
        { "text": "7 days",      "bucket": "1wk"  },
        { "text": "3600 seconds","bucket": "1hr"  },
        { "text": "1440 minutes","bucket": "1day" },
        { "text": "168 hours",   "bucket": "1wk"  }
      ],
      "hint": "1 hr = 60 min = 3600 s. 1 day = 24 hr. 1 wk = 7 days." },

    { "kind": "categorize",
      "prompt": "Sort BIG vs. SMALL units in each family.",
      "buckets": [
        { "id": "big",   "label": "🔼 Bigger unit"   },
        { "id": "small", "label": "🔽 Smaller unit"  }
      ],
      "tokens": [
        { "text": "kilometer",  "bucket": "big"   },
        { "text": "meter",      "bucket": "small" },
        { "text": "kilogram",   "bucket": "big"   },
        { "text": "gram",       "bucket": "small" },
        { "text": "liter",      "bucket": "big"   },
        { "text": "milliliter", "bucket": "small" }
      ],
      "hint": "'Kilo-' means 1000 big. 'Milli-' means 1000 small." },

    { "kind": "categorize",
      "prompt": "Match each amount to its VALUE in grams.",
      "buckets": [
        { "id": "1000", "label": "= 1000 g"  },
        { "id": "2000", "label": "= 2000 g"  },
        { "id": "5000", "label": "= 5000 g"  }
      ],
      "tokens": [
        { "text": "1 kg",   "bucket": "1000" },
        { "text": "2 kg",   "bucket": "2000" },
        { "text": "5 kg",   "bucket": "5000" },
        { "text": "1500 g + 500 g", "bucket": "2000" },
        { "text": "half of 10 kg",  "bucket": "5000" },
        { "text": "two 500 g blocks","bucket": "1000" }
      ],
      "hint": "Multiply kg × 1000 to get grams." },

    { "kind": "categorize",
      "prompt": "Match to the right LENGTH value in cm.",
      "buckets": [
        { "id": "100", "label": "= 100 cm" },
        { "id": "200", "label": "= 200 cm" },
        { "id": "300", "label": "= 300 cm" }
      ],
      "tokens": [
        { "text": "1 m",       "bucket": "100" },
        { "text": "2 m",       "bucket": "200" },
        { "text": "3 m",       "bucket": "300" },
        { "text": "half of 6 m","bucket": "300" },
        { "text": "two tape measures of 1 m","bucket": "200" },
        { "text": "1000 mm",   "bucket": "100" }
      ],
      "hint": "1 m = 100 cm = 1000 mm." },

    { "kind": "categorize",
      "prompt": "Match each amount to its equivalent MINUTES.",
      "buckets": [
        { "id": "60",  "label": "= 60 min"  },
        { "id": "120", "label": "= 120 min" },
        { "id": "180", "label": "= 180 min" }
      ],
      "tokens": [
        { "text": "1 hour",      "bucket": "60"  },
        { "text": "2 hours",     "bucket": "120" },
        { "text": "3 hours",     "bucket": "180" },
        { "text": "half of 6 hr","bucket": "180" },
        { "text": "30 + 30 min", "bucket": "60"  },
        { "text": "2 × 60 min",  "bucket": "120" }
      ],
      "hint": "1 hr = 60 min. Multiply or add to match." },

    { "kind": "categorize",
      "prompt": "Which family does each unit belong to?",
      "buckets": [
        { "id": "length", "label": "📏 Length"  },
        { "id": "mass",   "label": "⚖️ Mass"     },
        { "id": "vol",    "label": "💧 Volume"   },
        { "id": "time",   "label": "⏰ Time"     }
      ],
      "tokens": [
        { "text": "centimeter", "bucket": "length" },
        { "text": "gram",       "bucket": "mass"   },
        { "text": "milliliter", "bucket": "vol"    },
        { "text": "minute",     "bucket": "time"   },
        { "text": "kilometer",  "bucket": "length" },
        { "text": "hour",       "bucket": "time"   }
      ],
      "hint": "Length = distance. Mass = weight. Volume = liquid. Time = clock." },

    { "kind": "categorize",
      "prompt": "Is each amount MORE or LESS than 1 kilogram?",
      "buckets": [
        { "id": "more", "label": "🔼 More than 1 kg" },
        { "id": "less", "label": "🔽 Less than 1 kg" }
      ],
      "tokens": [
        { "text": "1500 g",     "bucket": "more" },
        { "text": "900 g",      "bucket": "less" },
        { "text": "3 kg",       "bucket": "more" },
        { "text": "500 g",      "bucket": "less" },
        { "text": "2000 g",     "bucket": "more" },
        { "text": "250 g",      "bucket": "less" }
      ],
      "hint": "1 kg = 1000 g. Compare grams to 1000." },

    { "kind": "categorize",
      "prompt": "Is each amount MORE or LESS than 1 liter?",
      "buckets": [
        { "id": "more", "label": "🔼 More than 1 L" },
        { "id": "less", "label": "🔽 Less than 1 L" }
      ],
      "tokens": [
        { "text": "1500 mL",    "bucket": "more" },
        { "text": "250 mL",     "bucket": "less" },
        { "text": "3 L",        "bucket": "more" },
        { "text": "750 mL",     "bucket": "less" },
        { "text": "2 L",        "bucket": "more" },
        { "text": "500 mL",     "bucket": "less" }
      ],
      "hint": "1 L = 1000 mL. Compare to 1000 mL." }
  ]
});
