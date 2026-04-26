/*!
 * achievements.js — trophy definitions + checker.
 *
 * Each DEF has { id, icon, name, hint, test(ctx) }. A trophy is earned when
 * test(ctx) returns true and the trophy isn't already in storage.
 *
 * ctx fields passed by the runner:
 *   event        "answer" | "round_complete"
 *   gameId       id of the current chapter/arcade/teach op
 *   moduleId     the module it belongs to
 *   kind         "chapter" | "arcade" | "teach"
 *   correct      was the answer correct? (for "answer" events)
 *   streak       current answer streak
 *   roundPerfect true when the whole round was 100% (round_complete)
 *   roundPct     fraction correct for the round (round_complete)
 *   passed       did the round meet the 75% threshold (round_complete)
 *   totals       the shared Storage.getTotals() snapshot
 *   progressId   progress record for this gameId
 *   gamesPlayedCount distinct game IDs with any progress
 *   chaptersCount    v2 completed chapters count
 *   moduleChaptersDone { [moduleId]: Number }
 */
(function () {
  const S = window.MR.Storage;

  const DEFS = [
    // --- Milestones ---
    { id: "first_step",     icon: "🌱", name: "First Step",        hint: "Answer your first question",
      test: (ctx) => ctx.totals.total >= 1 },
    { id: "ten_correct",    icon: "⭐", name: "Ten Stars",           hint: "10 correct answers",
      test: (ctx) => ctx.totals.correct >= 10 },
    { id: "fifty_correct",  icon: "🌟", name: "Fifty Stars",         hint: "50 correct answers",
      test: (ctx) => ctx.totals.correct >= 50 },
    { id: "hundred_correct",icon: "💯", name: "Century Solver",      hint: "100 correct answers",
      test: (ctx) => ctx.totals.correct >= 100 },
    { id: "three_games",    icon: "🎯", name: "Explorer",            hint: "Try 3 different games",
      test: (ctx) => ctx.gamesPlayedCount >= 3 },
    { id: "ten_games",      icon: "🗺️", name: "Valley Wanderer",     hint: "Try 10 different activities",
      test: (ctx) => ctx.gamesPlayedCount >= 10 },

    // --- Streaks ---
    { id: "streak_3",       icon: "🔥", name: "On Fire",             hint: "3 in a row",
      test: (ctx) => ctx.streak >= 3 },
    { id: "streak_5",       icon: "🚀", name: "Rocket Streak",       hint: "5 in a row",
      test: (ctx) => ctx.streak >= 5 },
    { id: "streak_10",      icon: "💫", name: "Stellar Streak",      hint: "10 in a row",
      test: (ctx) => ctx.streak >= 10 },
    { id: "streak_20",      icon: "🌠", name: "Comet Streak",        hint: "20 in a row",
      test: (ctx) => ctx.streak >= 20 },

    // --- Perfect rounds ---
    { id: "perfect_first",  icon: "🏆", name: "Perfect Round",       hint: "100% on any round",
      test: (ctx) => ctx.event === "round_complete" && ctx.roundPerfect },
    { id: "chapter_perfect",icon: "👑", name: "Chapter Champion",    hint: "100% on any chapter",
      test: (ctx) => ctx.event === "round_complete" && ctx.roundPerfect && ctx.kind === "chapter" },

    // --- Chapter counts ---
    { id: "one_chapter",    icon: "📖", name: "Page Turner",         hint: "Finish 1 chapter",
      test: (ctx) => ctx.chaptersCount >= 1 },
    { id: "five_chapters",  icon: "📚", name: "Storyteller",         hint: "Finish 5 chapters",
      test: (ctx) => ctx.chaptersCount >= 5 },
    { id: "ten_chapters",   icon: "📔", name: "Library Card",        hint: "Finish 10 chapters",
      test: (ctx) => ctx.chaptersCount >= 10 },

    // --- Per-module completion (all chapters in module) ---
    { id: "mod_arithmetic", icon: "🧮", name: "Number Ninja",        hint: "Finish every Arithmetic chapter",
      test: (ctx) => (ctx.moduleChaptersDone.arithmetic || 0) >= 16 },
    { id: "mod_measurement",icon: "📏", name: "Measuring Master",    hint: "Finish every Measurement chapter",
      test: (ctx) => (ctx.moduleChaptersDone.measurement || 0) >= 5 },
    { id: "mod_geometry",   icon: "📐", name: "Shape Scout",         hint: "Finish every Geometry chapter",
      test: (ctx) => (ctx.moduleChaptersDone.geometry || 0) >= 4 },
    { id: "mod_data",       icon: "📊", name: "Data Detective",      hint: "Finish every Data chapter",
      test: (ctx) => (ctx.moduleChaptersDone.data || 0) >= 4 },
    { id: "mod_reading",    icon: "📚", name: "Library Restored",    hint: "Finish every Reading chapter",
      test: (ctx) => (ctx.moduleChaptersDone.reading || 0) >= 5 },

    // --- Per-module first chapter ---
    { id: "first_arithmetic", icon: "🧮", name: "Arithmetic Starter",  hint: "Finish an Arithmetic chapter",
      test: (ctx) => (ctx.moduleChaptersDone.arithmetic || 0) >= 1 },
    { id: "first_measurement",icon: "📏", name: "Measurement Starter", hint: "Finish a Measurement chapter",
      test: (ctx) => (ctx.moduleChaptersDone.measurement || 0) >= 1 },
    { id: "first_geometry",   icon: "📐", name: "Geometry Starter",    hint: "Finish a Geometry chapter",
      test: (ctx) => (ctx.moduleChaptersDone.geometry || 0) >= 1 },
    { id: "first_data",       icon: "📊", name: "Data Starter",        hint: "Finish a Data chapter",
      test: (ctx) => (ctx.moduleChaptersDone.data || 0) >= 1 },
    { id: "first_reading",    icon: "📖", name: "Reading Starter",     hint: "Finish a Reading chapter",
      test: (ctx) => (ctx.moduleChaptersDone.reading || 0) >= 1 },

    // --- Arcade specific ---
    { id: "arcade_first",   icon: "🎮", name: "Arcade Opener",       hint: "Pass any arcade round",
      test: (ctx) => ctx.event === "round_complete" && ctx.kind === "arcade" && ctx.passed },
    { id: "word_wander",    icon: "📖", name: "Word Wanderer",       hint: "Pass Word Wander arcade",
      test: (ctx) => ctx.event === "round_complete" && ctx.gameId === "arc-word-wander" && ctx.passed },
    { id: "story_solver",   icon: "🧩", name: "Story Solver",        hint: "Pass Story Solver arcade",
      test: (ctx) => ctx.event === "round_complete" && ctx.gameId === "arc-story-solver" && ctx.passed },

    // --- Topic-specific badges ---
    { id: "mult_ace",       icon: "✖️", name: "Multiplication Ace",  hint: "Perfect round on Multiply Mountain",
      test: (ctx) => ctx.event === "round_complete" && ctx.gameId === "arc-multiply-mountain" && ctx.roundPerfect },
    { id: "fraction_fan",   icon: "🥧", name: "Fraction Fan",        hint: "Pass Pie Pals",
      test: (ctx) => ctx.event === "round_complete" && ctx.gameId === "arc-pie-pals" && ctx.passed },
    { id: "clock_keeper",   icon: "⏰", name: "Clock Keeper",        hint: "Pass Clock Quest",
      test: (ctx) => ctx.event === "round_complete" && ctx.gameId === "arc-clock-quest" && ctx.passed },
    { id: "penny_pro",      icon: "🪙", name: "Penny Pro",           hint: "Pass Coin Cart",
      test: (ctx) => ctx.event === "round_complete" && ctx.gameId === "arc-coin-cart" && ctx.passed },
    { id: "shape_sleuth",   icon: "🔷", name: "Shape Sleuth",        hint: "Pass Shape Sleuth",
      test: (ctx) => ctx.event === "round_complete" && ctx.gameId === "arc-shape-sleuth" && ctx.passed },
    { id: "graph_guru",     icon: "📈", name: "Graph Guru",          hint: "Pass Bar Burst",
      test: (ctx) => ctx.event === "round_complete" && ctx.gameId === "arc-bar-burst" && ctx.passed },

    // --- Reading arcades ---
    { id: "word_watch",     icon: "🔎", name: "Word Watcher",        hint: "Pass Word Watch",
      test: (ctx) => ctx.event === "round_complete" && ctx.gameId === "arc-word-watch" && ctx.passed },
    { id: "simile_sprinter",icon: "🌈", name: "Simile Sprinter",     hint: "Pass Simile Sprint",
      test: (ctx) => ctx.event === "round_complete" && ctx.gameId === "arc-simile-sprint" && ctx.passed },
    { id: "library_perfect",icon: "🏛️", name: "Library Lookup Ace",  hint: "Perfect round on Library Lookup",
      test: (ctx) => ctx.event === "round_complete" && ctx.gameId === "arc-library-lookup" && ctx.roundPerfect },
    { id: "wordsmith",      icon: "🪶", name: "Wordsmith",           hint: "Pass all three Reading arcades",
      test: (ctx) => {
        const P = window.MR && MR.Storage;
        if (!P || !P.hasPassed) return false;
        return P.hasPassed("arc-word-watch") && P.hasPassed("arc-simile-sprint") && P.hasPassed("arc-library-lookup");
      } },
    { id: "reading_comeback", icon: "🔁", name: "Second-Chance Reader", hint: "Retry missed questions and fix them all",
      test: (ctx) => ctx.event === "round_complete" && ctx.revisited && ctx.roundPerfect },

    // --- Collection achievements ---
    { id: "five_friends",   icon: "🤗", name: "Friend Group",        hint: "Make 5 valley friends",
      test: (ctx) => ctx.totals.friends >= 5 },
    { id: "ten_friends",    icon: "💜", name: "Valley Regular",      hint: "Make 10 valley friends",
      test: (ctx) => ctx.totals.friends >= 10 },
    { id: "five_critters",  icon: "🐾", name: "Critter Club",        hint: "Meet 5 critters",
      test: (ctx) => ctx.totals.critters >= 5 },
    { id: "ten_critters",   icon: "🦝", name: "Critter Keeper",      hint: "Meet 10 critters",
      test: (ctx) => ctx.totals.critters >= 10 },
    { id: "five_journal",   icon: "📝", name: "Journal Keeper",      hint: "Unlock 5 journal pages",
      test: (ctx) => ctx.totals.journal >= 5 },
  ];

  const DEF_BY_ID = Object.fromEntries(DEFS.map((d) => [d.id, d]));

  function buildCtx(partial) {
    const totals = S.getTotals();
    const all    = S.getAllProgress();
    const chapters = S.getChapters();
    const C = window.MR.Content;

    // Count chapters done per module.
    const moduleChaptersDone = {};
    for (const chId of chapters) {
      const ch = C && C.getChapter(chId);
      if (ch && ch.moduleId) {
        moduleChaptersDone[ch.moduleId] = (moduleChaptersDone[ch.moduleId] || 0) + 1;
      }
    }

    return {
      totals,
      streak: 0,
      correct: false,
      event: "answer",
      kind: null,
      moduleId: null,
      gameId: null,
      roundPerfect: false,
      roundPct: 0,
      passed: false,
      progressId: null,
      gamesPlayedCount: Object.keys(all).length,
      chaptersCount: chapters.length,
      moduleChaptersDone,
      ...partial,
    };
  }

  /**
   * Evaluate DEFs against ctx and earn any that newly qualify.
   * Returns an array of newly earned DEF objects (may be empty).
   */
  function check(partial) {
    const ctx = buildCtx(partial || {});
    const newly = [];
    for (const def of DEFS) {
      if (S.hasAchievement(def.id)) continue;
      let passed = false;
      try { passed = !!def.test(ctx); } catch (e) { passed = false; }
      if (passed) {
        if (S.earnAchievement(def.id)) newly.push(def);
      }
    }
    return newly;
  }

  function all() { return DEFS.slice(); }
  function get(id) { return DEF_BY_ID[id] || null; }

  window.MR = window.MR || {};
  window.MR.Achievements = { check, all, get };
})();
