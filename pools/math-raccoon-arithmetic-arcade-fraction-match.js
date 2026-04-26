/*
 * Pool: Fraction Match (Arithmetic · Arcade)
 * ==========================================
 * Drag each fraction into a bucket labeled by its simplified value
 * (1/2, 1/3, 1/4 …). Also includes compare-fraction sort tasks.
 * Uses `categorize` kind of dragDrop engine.
 *
 * CCSS 3.NF.3.
 */
MR.Pools.register({
  "id": "ari-arcade-fraction-match",
  "title": "Fraction Match",
  "askedPerRound": 5,
  "questions": [
    { "kind": "categorize",
      "prompt": "Sort each fraction by its simplest value.",
      "buckets": [
        { "id": "half",    "label": "= 1/2" },
        { "id": "third",   "label": "= 1/3" },
        { "id": "quarter", "label": "= 1/4" }
      ],
      "tokens": [
        { "text": "2/4", "bucket": "half" },
        { "text": "3/6", "bucket": "half" },
        { "text": "2/6", "bucket": "third" },
        { "text": "3/9", "bucket": "third" },
        { "text": "2/8", "bucket": "quarter" },
        { "text": "3/12", "bucket": "quarter" }
      ],
      "hint": "Halve the top & bottom until you can't anymore." },

    { "kind": "categorize",
      "prompt": "Group these by equivalent value.",
      "buckets": [
        { "id": "half",  "label": "= 1/2" },
        { "id": "whole", "label": "= 1 (whole)" },
        { "id": "fifth", "label": "= 1/5" }
      ],
      "tokens": [
        { "text": "4/8", "bucket": "half" },
        { "text": "5/10", "bucket": "half" },
        { "text": "3/3", "bucket": "whole" },
        { "text": "6/6", "bucket": "whole" },
        { "text": "2/10", "bucket": "fifth" },
        { "text": "3/15", "bucket": "fifth" }
      ],
      "hint": "Any fraction where top = bottom equals 1 whole." },

    { "kind": "categorize",
      "prompt": "Bigger than, smaller than, or equal to 1/2?",
      "buckets": [
        { "id": "less",  "label": "< 1/2" },
        { "id": "equal", "label": "= 1/2" },
        { "id": "more",  "label": "> 1/2" }
      ],
      "tokens": [
        { "text": "2/5", "bucket": "less" },
        { "text": "1/4", "bucket": "less" },
        { "text": "3/6", "bucket": "equal" },
        { "text": "4/8", "bucket": "equal" },
        { "text": "5/8", "bucket": "more" },
        { "text": "3/4", "bucket": "more" }
      ],
      "hint": "Is the top more than, less than, or equal to half the bottom?" },

    { "kind": "categorize",
      "prompt": "Sort by equivalent value.",
      "buckets": [
        { "id": "third",   "label": "= 1/3" },
        { "id": "twothird","label": "= 2/3" },
        { "id": "whole",   "label": "= 1" }
      ],
      "tokens": [
        { "text": "2/6",  "bucket": "third" },
        { "text": "3/9",  "bucket": "third" },
        { "text": "4/6",  "bucket": "twothird" },
        { "text": "6/9",  "bucket": "twothird" },
        { "text": "4/4",  "bucket": "whole" },
        { "text": "5/5",  "bucket": "whole" }
      ],
      "hint": "Halve or third the fractions to match." },

    { "kind": "categorize",
      "prompt": "Compare each to 3/4. Bigger, smaller, or equal?",
      "buckets": [
        { "id": "less",  "label": "< 3/4" },
        { "id": "equal", "label": "= 3/4" },
        { "id": "more",  "label": "> 3/4" }
      ],
      "tokens": [
        { "text": "1/2", "bucket": "less" },
        { "text": "5/8", "bucket": "less" },
        { "text": "6/8", "bucket": "equal" },
        { "text": "9/12","bucket": "equal" },
        { "text": "7/8", "bucket": "more" },
        { "text": "4/4", "bucket": "more" }
      ],
      "hint": "Convert or sketch mentally. 6/8 = 3/4 exactly." },

    { "kind": "categorize",
      "prompt": "Group fractions by value (1/4 vs 1/2 vs 3/4).",
      "buckets": [
        { "id": "q1", "label": "= 1/4" },
        { "id": "q2", "label": "= 1/2" },
        { "id": "q3", "label": "= 3/4" }
      ],
      "tokens": [
        { "text": "2/8", "bucket": "q1" },
        { "text": "3/12","bucket": "q1" },
        { "text": "4/8", "bucket": "q2" },
        { "text": "2/4", "bucket": "q2" },
        { "text": "6/8", "bucket": "q3" },
        { "text": "9/12","bucket": "q3" }
      ],
      "hint": "Divide top and bottom by the same number until simplest." },

    { "kind": "categorize",
      "prompt": "Same top? Sort by size. (Smaller bottom = bigger piece.)",
      "buckets": [
        { "id": "biggest",  "label": "Biggest piece" },
        { "id": "middle",   "label": "Middle" },
        { "id": "smallest", "label": "Smallest piece" }
      ],
      "tokens": [
        { "text": "1/2", "bucket": "biggest" },
        { "text": "2/3", "bucket": "biggest" },
        { "text": "1/4", "bucket": "middle" },
        { "text": "2/5", "bucket": "middle" },
        { "text": "1/8", "bucket": "smallest" },
        { "text": "2/9", "bucket": "smallest" }
      ],
      "hint": "Smaller bottom → bigger slice of the whole." },
  ],
});
