/*!
 * Teaching op — Fractions on a number line (arithmetic).
 *
 * CCSS 3.NF.2 anchor. Distinct pedagogy: fractions as NUMBERS (points on
 * a line), not slices of a circle. Many kids can shade 3/4 of a pie but
 * can't place 3/4 on 0–1. That gap is what this op fixes.
 *
 * Uses the fractionNumline viz exclusively — no pies, no bars. That
 * visual separation reinforces "a fraction is a number."
 */
(function () {
  MR.Content.registerOp({
    id: "ari-op-fractions-numberline",
    moduleId: "arithmetic",
    label: "Fractions on a Number Line",
    emoji: "📏",
    tagline: "Fractions are numbers too.",
    accent: "#7dd3fc",
    strategies: [
      {
        id: "split-the-line",
        title: "Splitting 0 to 1",
        subtitle: "Fourths, eighths — all between 0 and 1.",
        emoji: "✂️",
        idea: {
          hook: "Between 0 and 1 there's a LOT of room. Fractions live there. To find fourths, split the stretch from 0 to 1 into four equal jumps.",
          viz: { type: "fractionNumline", params: { denom: 4, labelEvery: true } },
          caption: "Four equal gaps means each tick is 1/4 farther from zero.",
        },
        watchMe: [
          { text: "Here's the line from 0 to 1. We'll find thirds.",
            viz: { type: "fractionNumline", params: { denom: 3, labelEvery: false } } },
          { text: "Split into 3 equal parts. Three jumps, three gaps.",
            viz: { type: "fractionNumline", params: { denom: 3, labelEvery: true } } },
          { text: "Each tick mark is a fraction. First jump = 1/3. Second = 2/3. Third = 3/3 = 1.",
            viz: { type: "fractionNumline", params: { denom: 3, markAt: 2, labelEvery: true, label: "Raccoon stands on 2/3" } } },
          { text: "A fraction is how far you are along the line — not how many slices of pie." },
        ],
        practice: [
          {
            prompt: "If we split 0 to 1 into 5 equal jumps, what fraction is at the 3rd tick?",
            viz: { type: "fractionNumline", params: { denom: 5, markAt: 3, labelEvery: true } },
            options: ["1/5", "3/5", "5/3"],
            answer: "3/5",
          },
          {
            prompt: "A line is split into 8 parts. Raccoon stops on the 1st tick after 0. Where is raccoon?",
            viz: { type: "fractionNumline", params: { denom: 8, markAt: 1, labelEvery: true } },
            options: ["0/8", "1/8", "8/1"],
            answer: "1/8",
          },
        ],
      },
      {
        id: "equivalent-stops",
        title: "Same Spot, Different Names",
        subtitle: "2/4 and 1/2 live at the same tick.",
        emoji: "🪞",
        idea: {
          hook: "Two fractions can name the exact same point on the line. 1/2 and 2/4 both land in the middle — they're twins wearing different outfits.",
          viz: { type: "fractionNumline", params: { denom: 4, markAt: 2, labelEvery: true, label: "2/4 is right here…" } },
          caption: "…and 1/2 is ALSO right here. Same location on the line.",
        },
        watchMe: [
          { text: "Split 0 to 1 into halves. Raccoon stops at 1/2 — the middle.",
            viz: { type: "fractionNumline", params: { denom: 2, markAt: 1, labelEvery: true } } },
          { text: "Now split into fourths. Each jump is smaller, but the MIDDLE is still the middle.",
            viz: { type: "fractionNumline", params: { denom: 4, markAt: 2, labelEvery: true } } },
          { text: "The middle is the 2nd tick of 4. That's 2/4. So 1/2 = 2/4.",
            equation: "1/2 = 2/4" },
          { text: "Split again into eighths — same middle. 4/8 is also 1/2.",
            viz: { type: "fractionNumline", params: { denom: 8, markAt: 4, labelEvery: true, label: "4/8 = 2/4 = 1/2" } },
            equation: "4/8 = 2/4 = 1/2" },
        ],
        practice: [
          {
            prompt: "Which fraction is at the same spot as 1/2?",
            options: ["1/3", "3/6", "2/3"],
            answer: "3/6",
            hint: "The 3rd tick of 6 is the middle — same as 1/2.",
          },
          {
            prompt: "1/4 lives at the same spot as which?",
            viz: { type: "fractionNumline", params: { denom: 8, markAt: 2, labelEvery: true } },
            options: ["2/8", "3/8", "4/8"],
            answer: "2/8",
            hint: "1/4 is one-quarter of the way. So is 2 out of 8.",
          },
        ],
      },
      {
        id: "past-one",
        title: "Going Past 1",
        subtitle: "5/4 is one whole plus a fourth.",
        emoji: "🚶",
        idea: {
          hook: "Fractions don't stop at 1. If you keep walking, 5/4 is one whole step PLUS one more fourth. It's bigger than 1.",
          viz: { type: "numberLine", params: { min: 0, max: 2, at: 1, label: "0 ··· 1 ··· 2" } },
          caption: "Imagine ticks between 1 and 2 — that's where fractions bigger than 1 live.",
        },
        watchMe: [
          { text: "We'll find 5/4. That means 5 jumps of a fourth.",
            viz: { type: "fractionNumline", params: { denom: 4, labelEvery: true } } },
          { text: "Jump 1, 2, 3, 4 — now we're at 1. Still one jump to go.",
            viz: { type: "fractionNumline", params: { denom: 4, markAt: 4, labelEvery: true, label: "4/4 = 1" } } },
          { text: "Keep the same tick-size going past 1. One more jump lands us at 5/4.",
            equation: "5/4 = 1 and 1/4" },
          { text: "So 5/4 is one whole plus a fourth. It's more than 1 but less than 2." },
        ],
        practice: [
          {
            prompt: "Is 7/4 bigger or smaller than 1?",
            options: ["bigger", "smaller", "equal"],
            answer: "bigger",
            hint: "4/4 already equals 1. 7/4 has three extra fourths on top.",
          },
          {
            prompt: "Which number is 3/2 closest to?",
            options: ["0", "1", "2"],
            answer: "2",
            hint: "3/2 is 1 and a half. Halfway between 1 and 2.",
          },
        ],
      },
    ],
  });
})();
