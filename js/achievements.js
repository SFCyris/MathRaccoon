/**
 * achievements.js — registry + evaluator for trophies.
 * Games call MR.Achievements.check(context) after each answer and
 * any newly-earned trophies get returned so the UI can celebrate them.
 */
(function () {
  const DEFS = [
    // Cross-game
    { id: "first_step",   icon: "🌱", name: "First Step",      desc: "Answered your very first question.",
      test: (ctx) => ctx.totals.total >= 1 },
    { id: "ten_correct",  icon: "⭐", name: "Ten Stars",        desc: "Got 10 answers correct across all games.",
      test: (ctx) => ctx.totals.correct >= 10 },
    { id: "fifty_correct",icon: "🌟", name: "Fifty Stars",      desc: "Got 50 answers correct across all games.",
      test: (ctx) => ctx.totals.correct >= 50 },
    { id: "three_games",  icon: "🎯", name: "Explorer",         desc: "Played 3 different games.",
      test: (ctx) => ctx.gamesPlayedCount >= 3 },

    // Streaks
    { id: "streak_3",     icon: "🔥", name: "On Fire",          desc: "Got 3 correct in a row.",
      test: (ctx) => ctx.streak >= 3 },
    { id: "streak_5",     icon: "🚀", name: "Rocket Streak",    desc: "Got 5 correct in a row.",
      test: (ctx) => ctx.streak >= 5 },
    { id: "streak_10",    icon: "💫", name: "Stellar Streak",   desc: "Got 10 correct in a row.",
      test: (ctx) => ctx.streak >= 10 },

    // Multiplication
    { id: "mult_first",   icon: "✖️", name: "Multiplier",       desc: "Finished your first multiplication round.",
      test: (ctx) => ctx.event === "round_complete" && ctx.gameId === "multiplication" },
    { id: "mult_perfect", icon: "🏆", name: "Multiplication Ace", desc: "Perfect round in multiplication.",
      test: (ctx) => ctx.event === "round_complete" && ctx.gameId === "multiplication" && ctx.roundPerfect },

    // Subtraction
    { id: "sub_first",    icon: "➖", name: "Subtractor",        desc: "Finished your first subtraction round.",
      test: (ctx) => ctx.event === "round_complete" && ctx.gameId === "subtraction" },
    { id: "sub_perfect",  icon: "🥇", name: "Subtraction Ace",   desc: "Perfect round in subtraction.",
      test: (ctx) => ctx.event === "round_complete" && ctx.gameId === "subtraction" && ctx.roundPerfect },
  ];

  const Achievements = {
    all() {
      return DEFS.map((d) => ({
        ...d,
        earned: window.MR.Storage.hasAchievement(d.id),
      }));
    },

    getDef(id) {
      return DEFS.find((d) => d.id === id);
    },

    /**
     * Evaluate all achievement rules against a context object and persist
     * any newly earned ones. Returns an array of freshly-earned definitions.
     * ctx shape: { event, gameId, streak, roundPerfect?, totals, gamesPlayedCount }
     */
    check(ctx) {
      const earned = [];
      for (const def of DEFS) {
        if (window.MR.Storage.hasAchievement(def.id)) continue;
        let ok = false;
        try { ok = def.test(ctx); } catch (e) { ok = false; }
        if (ok) {
          window.MR.Storage.earnAchievement(def.id);
          earned.push(def);
        }
      }
      return earned;
    },
  };

  window.MR = window.MR || {};
  window.MR.Achievements = Achievements;
})();
