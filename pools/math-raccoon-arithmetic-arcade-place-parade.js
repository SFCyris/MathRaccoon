/*
 * Pool: Place Parade (Math Raccoon · Arithmetic · Arcade)
 * =======================================================
 * FORMAT — each question is one of three shapes:
 *
 * 1) READ a digit in a place column:
 *    { "mode": "read", "n": 4372, "placeIdx": 2, "hint": "…" }
 *    placeIdx: 0 = ones, 1 = tens, 2 = hundreds, 3 = thousands, 4 = ten-thousands.
 *    The engine finds the digit at that place (here: 3 in "hundreds").
 *
 * 2) EXPANDED form — pick the number matching the expansion:
 *    { "mode": "expanded", "n": 4372, "hint": "4000 + 300 + 70 + 2." }
 *
 * 3) ROUND n to the nearest toPlace:
 *    { "mode": "round", "n": 4372, "toPlace": 100, "hint": "4372 → 4400." }
 *    toPlace is typically 10, 100, or 1000.
 *
 * Teachers & parents: add more numbers freely. 24+ recommended.
 */
MR.Pools.register({
  "id": "arith-arcade-place-parade",
  "title": "Place Parade",
  "askedPerRound": 8,
  "questions": [
    { "mode": "read", "n": 438,   "placeIdx": 0, "hint": "Last digit is the ones place." },
    { "mode": "read", "n": 725,   "placeIdx": 1, "hint": "Second from the right: the tens." },
    { "mode": "read", "n": 619,   "placeIdx": 2, "hint": "The hundreds place — leftmost here." },
    { "mode": "read", "n": 1384,  "placeIdx": 0, "hint": "Ones = rightmost digit." },
    { "mode": "read", "n": 2956,  "placeIdx": 1, "hint": "Tens column." },
    { "mode": "read", "n": 4721,  "placeIdx": 2, "hint": "Hundreds column." },
    { "mode": "read", "n": 5083,  "placeIdx": 3, "hint": "Thousands column — leftmost." },
    { "mode": "read", "n": 8642,  "placeIdx": 2, "hint": "Hundreds column." },

    { "mode": "expanded", "n": 234,  "hint": "200 + 30 + 4." },
    { "mode": "expanded", "n": 506,  "hint": "500 + 0 + 6. Zero tens!" },
    { "mode": "expanded", "n": 1284, "hint": "1000 + 200 + 80 + 4." },
    { "mode": "expanded", "n": 3070, "hint": "3000 + 0 + 70 + 0." },
    { "mode": "expanded", "n": 4506, "hint": "4000 + 500 + 0 + 6." },
    { "mode": "expanded", "n": 6789, "hint": "6000 + 700 + 80 + 9." },
    { "mode": "expanded", "n": 9012, "hint": "9000 + 0 + 10 + 2." },

    { "mode": "round", "n": 34,   "toPlace": 10,   "hint": "4 is less than 5 → round down." },
    { "mode": "round", "n": 47,   "toPlace": 10,   "hint": "7 ≥ 5 → round up to 50." },
    { "mode": "round", "n": 156,  "toPlace": 10,   "hint": "The 6 says round up." },
    { "mode": "round", "n": 234,  "toPlace": 100,  "hint": "Tens digit 3 → round down." },
    { "mode": "round", "n": 567,  "toPlace": 100,  "hint": "Tens digit 6 → round up to 600." },
    { "mode": "round", "n": 742,  "toPlace": 100,  "hint": "Tens digit 4 → round down to 700." },
    { "mode": "round", "n": 850,  "toPlace": 100,  "hint": "The 5 rule — round up to 900." },
    { "mode": "round", "n": 1234, "toPlace": 100,  "hint": "Tens digit 3 → round down to 1200." },
    { "mode": "round", "n": 2750, "toPlace": 1000, "hint": "Hundreds digit 7 → round up to 3000." },
    { "mode": "round", "n": 4499, "toPlace": 1000, "hint": "Hundreds digit 4 → round down to 4000." }
  ]
});
