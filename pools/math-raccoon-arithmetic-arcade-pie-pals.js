/*
 * Pool: Pie Pals (Math Raccoon · Arithmetic · Arcade)
 * ===================================================
 * FORMAT — each question is one of three shapes:
 *
 * 1) NAME the shaded fraction:
 *    { "mode": "name", "f": { "n": 3, "d": 4 }, "hint": "…" }
 *    Renders a pie with n of d slices shaded. Learner picks the fraction.
 *
 * 2) EQUIVALENT fraction (pick the one equal to f):
 *    { "mode": "equivalent", "f": { "n": 1, "d": 2 }, "mult": 3, "hint": "…" }
 *    The answer is f scaled by mult (so 1/2 × 3 = 3/6).
 *    You can also set "equiv" explicitly: { ..., "equiv": { "n": 4, "d": 8 } }
 *
 * 3) COMPARE two fractions (pick the larger):
 *    { "mode": "compare", "f": { "n": 3, "d": 4 }, "other": { "n": 1, "d": 2 }, "hint": "…" }
 *
 * Fractions are written as { "n": numerator, "d": denominator } objects.
 *
 * Teachers & parents: add more questions freely. 24+ recommended.
 */
MR.Pools.register({
  "id": "arith-arcade-pie-pals",
  "title": "Pie Pals",
  "askedPerRound": 8,
  "questions": [
    { "mode": "name", "f": { "n": 1, "d": 2 }, "hint": "Half the pie is shaded." },
    { "mode": "name", "f": { "n": 1, "d": 3 }, "hint": "One of three equal slices." },
    { "mode": "name", "f": { "n": 2, "d": 3 }, "hint": "Two out of three pieces." },
    { "mode": "name", "f": { "n": 1, "d": 4 }, "hint": "One slice, four total." },
    { "mode": "name", "f": { "n": 3, "d": 4 }, "hint": "Three out of four slices — most of the pie." },
    { "mode": "name", "f": { "n": 2, "d": 6 }, "hint": "Two out of six equal pieces." },
    { "mode": "name", "f": { "n": 5, "d": 6 }, "hint": "Five of six — nearly whole." },
    { "mode": "name", "f": { "n": 3, "d": 8 }, "hint": "Three of eight small slices." },
    { "mode": "name", "f": { "n": 5, "d": 8 }, "hint": "Five out of eight." },
    { "mode": "name", "f": { "n": 7, "d": 8 }, "hint": "Seven eighths — almost all." },

    { "mode": "equivalent", "f": { "n": 1, "d": 2 }, "mult": 2, "hint": "1/2 = 2/4 — double top AND bottom." },
    { "mode": "equivalent", "f": { "n": 1, "d": 2 }, "mult": 3, "hint": "1/2 = 3/6 — triple top AND bottom." },
    { "mode": "equivalent", "f": { "n": 1, "d": 2 }, "mult": 4, "hint": "1/2 = 4/8." },
    { "mode": "equivalent", "f": { "n": 1, "d": 3 }, "mult": 2, "hint": "1/3 = 2/6." },
    { "mode": "equivalent", "f": { "n": 2, "d": 3 }, "mult": 2, "hint": "2/3 = 4/6." },
    { "mode": "equivalent", "f": { "n": 1, "d": 4 }, "mult": 2, "hint": "1/4 = 2/8." },
    { "mode": "equivalent", "f": { "n": 3, "d": 4 }, "mult": 2, "hint": "3/4 = 6/8." },

    { "mode": "compare", "f": { "n": 1, "d": 2 }, "other": { "n": 1, "d": 4 }, "hint": "Halves are bigger than quarters." },
    { "mode": "compare", "f": { "n": 3, "d": 4 }, "other": { "n": 1, "d": 2 }, "hint": "3/4 is more than half." },
    { "mode": "compare", "f": { "n": 1, "d": 3 }, "other": { "n": 1, "d": 6 }, "hint": "Thirds beat sixths." },
    { "mode": "compare", "f": { "n": 2, "d": 3 }, "other": { "n": 1, "d": 2 }, "hint": "2/3 is just past half." },
    { "mode": "compare", "f": { "n": 5, "d": 8 }, "other": { "n": 3, "d": 8 }, "hint": "Same bottom — compare tops." },
    { "mode": "compare", "f": { "n": 3, "d": 4 }, "other": { "n": 5, "d": 8 }, "hint": "6/8 vs 5/8 — same bottom." },
    { "mode": "compare", "f": { "n": 7, "d": 8 }, "other": { "n": 3, "d": 4 }, "hint": "7/8 is almost whole." },

    // ---- Extra equivalence practice (CCSS 3.NF.A.3.b) ----
    { "mode": "equivalent", "f": { "n": 2, "d": 4 }, "equiv": { "n": 1, "d": 2 }, "hint": "2/4 simplifies to 1/2." },
    { "mode": "equivalent", "f": { "n": 4, "d": 8 }, "equiv": { "n": 1, "d": 2 }, "hint": "4/8 = 1/2." },
    { "mode": "equivalent", "f": { "n": 3, "d": 6 }, "equiv": { "n": 1, "d": 2 }, "hint": "3/6 reduces to 1/2." },
    { "mode": "equivalent", "f": { "n": 2, "d": 6 }, "equiv": { "n": 1, "d": 3 }, "hint": "2/6 = 1/3 — halve top AND bottom." },
    { "mode": "equivalent", "f": { "n": 2, "d": 8 }, "equiv": { "n": 1, "d": 4 }, "hint": "2/8 simplifies to 1/4." },
    { "mode": "equivalent", "f": { "n": 4, "d": 6 }, "equiv": { "n": 2, "d": 3 }, "hint": "4/6 = 2/3." },
    { "mode": "equivalent", "f": { "n": 6, "d": 8 }, "equiv": { "n": 3, "d": 4 }, "hint": "6/8 = 3/4 — both halved." },
    { "mode": "equivalent", "f": { "n": 1, "d": 4 }, "mult": 3, "hint": "1/4 = 3/12 (not shown), or use the 3× pattern." },
    { "mode": "equivalent", "f": { "n": 2, "d": 3 }, "mult": 3, "hint": "2/3 = 6/9." },

    // ---- More comparisons ----
    { "mode": "compare", "f": { "n": 1, "d": 2 }, "other": { "n": 2, "d": 4 }, "hint": "1/2 equals 2/4 — pick whichever you'd draw bigger on a number line." },
    { "mode": "compare", "f": { "n": 2, "d": 3 }, "other": { "n": 1, "d": 3 }, "hint": "Same bottom — compare tops." },
    { "mode": "compare", "f": { "n": 3, "d": 8 }, "other": { "n": 1, "d": 4 }, "hint": "1/4 = 2/8, so 3/8 is larger." },
    { "mode": "compare", "f": { "n": 1, "d": 2 }, "other": { "n": 3, "d": 8 }, "hint": "1/2 = 4/8 — bigger than 3/8." },
    { "mode": "compare", "f": { "n": 4, "d": 6 }, "other": { "n": 1, "d": 2 }, "hint": "1/2 = 3/6, so 4/6 is bigger." },
    { "mode": "compare", "f": { "n": 5, "d": 6 }, "other": { "n": 2, "d": 3 }, "hint": "2/3 = 4/6." }
  ]
});
