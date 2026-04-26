/*!
 * engines/wordProblem.js — templated story problems across topics.
 *
 * engineConfig:
 *   topics: ["join","separate","compare","equal-groups","share","two-step",
 *            "money","length","time","capacity"]   // subset to rotate through
 *   problemsPerRound: 8
 *
 * Problem shape: { topic, story, answer, options, suffix? }
 */
(function () {
  const { randInt, pick, buildOptions } = window.MR.Engines.Util;

  // ---- Template bank ----------------------------------------------------
  // Each template returns a problem object with { story, answer, options, suffix? }.
  // suffix is the unit label shown after the option (e.g. "cm", "min").

  const BANK = {
    "join": [
      () => {
        const a = randInt(12, 45), b = randInt(8, 40);
        return {
          story: `🐿️ Squirrel buries ${a} acorns in the oak. Later, she hides ${b} more in the pine. How many acorns did she hide in all?`,
          answer: a + b,
        };
      },
      () => {
        const a = randInt(20, 60), b = randInt(15, 50);
        return {
          story: `🦊 Fox counts ${a} pawprints on the left trail and ${b} on the right. How many pawprints together?`,
          answer: a + b,
        };
      },
      () => {
        const a = randInt(25, 75), b = randInt(10, 40);
        return {
          story: `🐻 Bear picks ${a} blueberries before lunch and ${b} after. How many blueberries altogether?`,
          answer: a + b,
        };
      },
    ],

    "separate": [
      () => {
        const start = randInt(40, 90), gone = randInt(10, 35);
        return {
          story: `🐰 Bunny had ${start} carrots in the basket. He gave ${gone} to friends. How many carrots are left?`,
          answer: start - gone,
        };
      },
      () => {
        const start = randInt(50, 95), gone = randInt(15, 40);
        return {
          story: `🦝 Raccoon had ${start} shiny pebbles. She dropped ${gone} in the brook. How many pebbles does she still have?`,
          answer: start - gone,
        };
      },
      () => {
        const start = randInt(30, 80), gone = randInt(8, 25);
        return {
          story: `🦔 Hedgehog packed ${start} mushrooms. He ate ${gone} on the walk home. How many are left in the bag?`,
          answer: start - gone,
        };
      },
    ],

    "compare": [
      () => {
        const small = randInt(12, 35), extra = randInt(5, 20);
        const big = small + extra;
        return {
          story: `🦉 Owl spotted ${big} fireflies. Mouse spotted ${small}. How many more fireflies did Owl see?`,
          answer: extra,
        };
      },
      () => {
        const small = randInt(20, 45), extra = randInt(10, 25);
        const big = small + extra;
        return {
          story: `🐼 Panda ate ${big} bamboo shoots. Otter ate ${small}. What is the difference?`,
          answer: extra,
        };
      },
    ],

    "equal-groups": [
      () => {
        const g = randInt(3, 7), per = randInt(3, 8);
        return {
          story: `🐥 Duckling lines up ${g} nests with ${per} eggs in each. How many eggs in total?`,
          answer: g * per,
        };
      },
      () => {
        const g = randInt(4, 8), per = randInt(2, 6);
        return {
          story: `🐝 The bee keeper has ${g} shelves. Each shelf holds ${per} jars of honey. How many jars altogether?`,
          answer: g * per,
        };
      },
      () => {
        const g = randInt(2, 6), per = randInt(4, 9);
        return {
          story: `🦝 Raccoon fills ${g} picnic baskets with ${per} berries each. How many berries did she pack?`,
          answer: g * per,
        };
      },
    ],

    "share": [
      () => {
        const per = randInt(3, 8), groups = randInt(2, 6);
        const total = per * groups;
        return {
          story: `🐿️ Squirrel shares ${total} acorns equally into ${groups} piles. How many acorns in each pile?`,
          answer: per,
        };
      },
      () => {
        const per = randInt(4, 9), groups = randInt(2, 5);
        const total = per * groups;
        return {
          story: `🦊 Fox splits ${total} berries across ${groups} friends. How many berries does each friend get?`,
          answer: per,
        };
      },
    ],

    "two-step": [
      () => {
        const per = randInt(3, 6), groups = randInt(2, 4), give = randInt(2, 6);
        const total = per * groups - give;
        return {
          story: `🐻 Bear bakes ${groups} trays of ${per} muffins each, then shares ${give} with Owl. How many muffins are left?`,
          answer: total,
        };
      },
      () => {
        const box = randInt(6, 10), boxes = randInt(2, 4), eat = randInt(3, 7);
        const total = box * boxes - eat;
        return {
          story: `🦝 Raccoon picks ${boxes} boxes of ${box} plums, then eats ${eat} on the walk. How many plums does she bring home?`,
          answer: total,
        };
      },
      () => {
        const start = randInt(30, 60), lost = randInt(5, 12), add = randInt(8, 20);
        const total = start - lost + add;
        return {
          story: `🐰 Bunny had ${start} carrots. He lost ${lost} and then pulled ${add} more from the garden. How many now?`,
          answer: total,
        };
      },
    ],

    "money": [
      () => {
        const a = randInt(15, 45), b = randInt(10, 40);
        return {
          story: `🪙 Mouse pays ${a}¢ for string and ${b}¢ for cheese. How much did she spend in all?`,
          answer: a + b, suffix: "¢",
        };
      },
      () => {
        const paid = randInt(50, 95), cost = randInt(15, 45);
        return {
          story: `💵 Fox gave the shopkeeper ${paid}¢ for a treat that cost ${cost}¢. How much change should he get?`,
          answer: paid - cost, suffix: "¢",
        };
      },
      () => {
        const quarters = randInt(2, 4), dimes = randInt(2, 6);
        const total = quarters * 25 + dimes * 10;
        return {
          story: `💰 Hedgehog has ${quarters} quarters and ${dimes} dimes. How many cents total?`,
          answer: total, suffix: "¢",
        };
      },
    ],

    "length": [
      () => {
        const a = randInt(12, 55), b = randInt(10, 50);
        return {
          story: `📏 The tailor-mouse sews two ribbons: one ${a} cm, one ${b} cm. How long end-to-end?`,
          answer: a + b, suffix: "cm",
        };
      },
      () => {
        const full = randInt(60, 120), used = randInt(15, 50);
        return {
          story: `🧵 Raccoon has a ${full} cm string. She cuts off ${used} cm for a kite. How many cm are left?`,
          answer: full - used, suffix: "cm",
        };
      },
      () => {
        const pieces = randInt(3, 6), each = randInt(8, 20);
        return {
          story: `🪢 ${pieces} ropes each measure ${each} cm. Total length?`,
          answer: pieces * each, suffix: "cm",
        };
      },
    ],

    "time": [
      () => {
        const hours = randInt(2, 5);
        const start = randInt(1, 9);
        const end = start + hours;
        return {
          story: `⏰ The picnic starts at ${start}:00 and ends at ${end}:00. How many hours is the picnic?`,
          answer: hours, suffix: "h",
        };
      },
      () => {
        const mins = pick([15, 20, 25, 30, 40, 45]);
        const start = randInt(1, 10);
        return {
          story: `🕰️ The movie starts at ${start}:00 and lasts ${mins} minutes. At what :minute does it end?`,
          answer: mins, suffix: "min",
        };
      },
      () => {
        const s1 = randInt(10, 30), s2 = randInt(10, 30);
        return {
          story: `⌛ Otter reads for ${s1} minutes, then plays for ${s2} minutes. How long in total?`,
          answer: s1 + s2, suffix: "min",
        };
      },
    ],

    "capacity": [
      () => {
        const a = randInt(200, 500), b = randInt(150, 400);
        return {
          story: `🥛 A jug has ${a} mL of juice. Raccoon pours in ${b} mL more. How many mL now?`,
          answer: a + b, suffix: "mL",
        };
      },
      () => {
        const full = randInt(700, 1000), drank = randInt(150, 400);
        return {
          story: `🍵 The teapot held ${full} mL. Owl drank ${drank} mL. How much is left?`,
          answer: full - drank, suffix: "mL",
        };
      },
      () => {
        const cups = randInt(3, 6), each = randInt(150, 300);
        return {
          story: `☕ ${cups} teacups each hold ${each} mL. Total capacity?`,
          answer: cups * each, suffix: "mL",
        };
      },
    ],
  };

  const HINTS = {
    "join":         "Put the two amounts together — add.",
    "separate":     "Start big, take some away — subtract.",
    "compare":      "Bigger minus smaller gives the difference.",
    "equal-groups": "Groups × how many in each group.",
    "share":        "Divide the total by the number of groups.",
    "two-step":     "Solve the first part, then the second. Two steps!",
    "money":        "Read it like an addition or subtraction story.",
    "length":       "Centimeters add just like regular numbers.",
    "time":         "Count the hours (or minutes) between the two times.",
    "capacity":     "Milliliters add and subtract like regular numbers.",
  };

  // ---- Engine API -------------------------------------------------------

  // planRound: draw from a pool. Pool question shape (teacher-friendly):
  //   { prompt: "Story text…",       // HTML allowed (e.g. <em>, <strong>)
  //     answer: 42,                  // number — the correct numeric answer
  //     options?: [42, 40, 51, 37],  // optional — engine builds options if missing
  //     suffix?: "cm" | "¢" | ...,   // optional unit label
  //     hint?: "Add both amounts." }
  function planRound(cfg = {}, total = 0) {
    if (!cfg.poolId || !window.MR.Pools || !window.MR.Pools.has(cfg.poolId)) return null;
    const drawn = window.MR.Pools.sample(cfg.poolId, total);
    return drawn.map((q) => buildWPFromPool(q));
  }

  function buildWPFromPool(q) {
    // Allow numeric answers (auto-builds options) or explicit string/mixed
    // answers when options[] is supplied (e.g. True/False, named choices).
    const rawAnswer = q.answer;
    const isNumeric = typeof rawAnswer === "number"
      || (typeof rawAnswer === "string" && rawAnswer.trim() !== "" && !isNaN(Number(rawAnswer)));
    const answer = isNumeric ? Number(rawAnswer) : rawAnswer;
    const options = (q.options && q.options.length)
      ? q.options.slice()
      : (isNumeric
          ? buildOptions(
              answer,
              [1, -1, 2, -2, 5, -5, 10, -10, answer > 20 ? -20 : 3, answer > 20 ? 20 : -3]
            )
          : [answer]);
    return {
      topic: q.topic || "pool",
      story: q.prompt,
      answer,
      options,
      suffix: q.suffix || "",
      _hint: q.hint || "",
    };
  }

  function generate(cfg = {}, qIndex = 0) {
    const topics = (cfg.topics && cfg.topics.length) ? cfg.topics : ["join", "separate", "compare", "equal-groups"];
    const topic = topics[qIndex % topics.length];
    const bank = BANK[topic] || BANK["join"];
    const make = pick(bank);
    const base = make();

    const options = buildOptions(
      base.answer,
      [1, -1, 2, -2, 5, -5, 10, -10, base.answer > 20 ? -20 : 3, base.answer > 20 ? 20 : -3]
    );

    return { topic, story: base.story, answer: base.answer, options, suffix: base.suffix || "" };
  }

  function renderPrompt(p) {
    return `<div class="wp-story">${p.story}</div>`;
  }

  function renderVisual(p) {
    return `
      <div class="wp-visual" aria-hidden="true">
        <div class="wp-emoji">💭</div>
        <div class="wp-hint-bar">Think it through slowly — read it twice.</div>
      </div>`;
  }

  function hintFor(p) {
    if (p && p._hint) return p._hint;
    return HINTS[p.topic] || "Read slowly — what is the story asking?";
  }

  function formatOption(opt, p) {
    const suf = p && p.suffix ? p.suffix : "";
    // $ is a prefix unit ($18), others suffix (18¢, 18 cm, 18 min, 18 mL).
    if (suf === "$") return `$${opt}`;
    return suf ? `${opt} ${suf}` : `${opt}`;
  }

  window.MR = window.MR || {};
  window.MR.Engines = window.MR.Engines || {};
  window.MR.Engines.wordProblem = {
    generate, planRound, renderPrompt, renderVisual, hintFor, formatOption,
  };
})();
