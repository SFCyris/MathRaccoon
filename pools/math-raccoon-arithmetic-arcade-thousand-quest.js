/*
 * Pool: Thousand Quest (Arithmetic · Arcade)
 * ==========================================
 * Fluency within 1000 — 3-digit + / 3-digit − (3.NBT.2).
 * Uses the `arithmetic` engine. Each entry: { op, a, b, hint? }.
 */
MR.Pools.register({
  "id": "ari-arcade-thousand-quest",
  "title": "Thousand Quest",
  "askedPerRound": 6,
  "questions": [
    { "op": "+", "a": 234, "b": 152, "hint": "Add hundreds, then tens, then ones. 200+100, 30+50, 4+2." },
    { "op": "+", "a": 418, "b": 276, "hint": "8+6=14, carry the 1. 1+1+7=9. 4+2=6 → 694." },
    { "op": "+", "a": 325, "b": 467, "hint": "5+7=12, carry 1. 2+6+1=9. 3+4=7 → 792." },
    { "op": "+", "a": 509, "b": 381, "hint": "9+1=10, carry 1. 0+8+1=9. 5+3=8 → 890." },
    { "op": "+", "a": 612, "b": 298, "hint": "2+8=10, carry. 1+9+1=11, carry. 6+2+1=9 → 910." },
    { "op": "+", "a": 147, "b": 256, "hint": "Line them up by place value." },
    { "op": "+", "a": 705, "b": 195, "hint": "5+5=10. 0+9+1=10. 7+1+1=9 → 900." },

    { "op": "-", "a": 456, "b": 123, "hint": "6−3=3. 5−2=3. 4−1=3 → 333." },
    { "op": "-", "a": 542, "b": 218, "hint": "2−8 borrow: 12−8=4. 3−1=2. 5−2=3 → 324." },
    { "op": "-", "a": 700, "b": 245, "hint": "Borrow across zeros. 700−245 = 455." },
    { "op": "-", "a": 834, "b": 567, "hint": "4−7 borrow → 14−7=7. 2−6 borrow → 12−6=6. 7−5=2 → 267." },
    { "op": "-", "a": 910, "b": 485, "hint": "Line up places, borrow as needed. = 425." },
    { "op": "-", "a": 623, "b": 189, "hint": "3−9 borrow → 13−9=4. 1−8 borrow → 11−8=3. 5−1=4 → 434." },
    { "op": "-", "a": 800, "b": 399, "hint": "800−399 = 401." },
  ],
});
