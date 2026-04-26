/*!
 * daily-challenge.js — picks a curated curriculum challenge once per
 * calendar day and tracks a "challenge streak" separate from the hub-
 * visit streak already recorded in storage.js.
 *
 * The game of the day is deterministic from today's date, so every
 * device sees the same challenge — you're sharing it with Math Raccoon,
 * not dicing a random-number generator.
 *
 * Storage key: `mathRaccoon::v2:dailyChallenge`
 *   { lastDate: "YYYY-M-D",    // last time we refreshed
 *     streak:   3,              // consecutive days completed
 *     todayId:  "arc-round-up", // today's pick
 *     todayDone: false          // completed today yet?
 *   }
 *
 * The runner calls `MR.DailyChallenge.markCompleted(gameId, passed)`
 * when a round finishes. If the id matches today and the round passed,
 * we bump the streak and show a reward toast.
 */
(function () {
  // Resolve deps lazily — Content and Router might register after us
  // depending on <script> load order.
  function C()     { return window.MR && window.MR.Content; }
  function Router(){ return window.MR && window.MR.Router; }

  // Curated pool of 3rd-grade-appropriate arcade games. Missing ids
  // (unregistered games) are filtered out at pick time so the daily
  // challenge never lands on a game that doesn't exist.
  const CHALLENGE_GAMES = [
    "arc-bake-off",
    "arc-carry-crunch",
    "arc-fact-frenzy",
    "arc-dojo-drill",
    "arc-place-shift",
    "arc-pattern-parade",
    "arc-round-up",
    "arc-thousand-quest",
    "arc-ten-times",
    "arc-array-split",
    "arc-fraction-match",
    "arc-slice-shade",
    "arc-length-dash",
    "arc-tile-tally",
    "arc-bar-burst",
  ];

  const KEY = "mathRaccoon::v2:dailyChallenge";

  function getState() {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : defaults();
    } catch (e) {
      return defaults();
    }
  }
  function saveState(s) {
    try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {}
  }
  function defaults() {
    return { lastDate: null, streak: 0, todayId: null, todayDone: false };
  }

  function dateKey(d) {
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  }
  function todayKey() { return dateKey(new Date()); }
  function yesterdayKey() {
    const d = new Date(); d.setDate(d.getDate() - 1);
    return dateKey(d);
  }
  function todaySeed() {
    const d = new Date();
    return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
  }

  function pickGameId() {
    const content = C();
    const available = CHALLENGE_GAMES.filter((id) => content && content.getGame && content.getGame(id));
    if (!available.length) return null;
    return available[todaySeed() % available.length];
  }

  // Refresh state for today — rotates the pick and clears todayDone if
  // a new calendar day has started. Resets the streak if yesterday was
  // skipped (gap ≥ 2 days since last completion).
  function refresh() {
    const s = getState();
    const k = todayKey();
    if (s.lastDate === k) {
      // Same day — keep as-is (todayId pinned once set today)
      if (!s.todayId) {
        const id = pickGameId();
        if (id) {
          s.todayId = id;
          saveState(s);
        }
      }
      return s;
    }
    // New day → pick fresh challenge.
    // Keep the existing streak IFF the last completed day was yesterday.
    // Otherwise, the streak is broken (back to 0 until they finish today).
    const nextStreak = (s.lastDate === yesterdayKey()) ? (s.streak || 0) : 0;
    const next = {
      lastDate: k,
      streak: nextStreak,
      todayId: pickGameId(),
      todayDone: false,
    };
    saveState(next);
    return next;
  }

  function todaysGame() {
    const s = refresh();
    const content = C();
    return (s.todayId && content) ? (content.getGame(s.todayId) || null) : null;
  }

  function todayHash() {
    const g = todaysGame();
    const r = Router();
    return (g && r) ? r.arcadeHash(g.moduleId, g.id) : null;
  }

  function isTodayDone() {
    return refresh().todayDone === true;
  }

  function streak() {
    return refresh().streak || 0;
  }

  // Called by the runner when a round finishes. Only counts as completion
  // when the played game matches today's pick AND the round passed.
  function markCompleted(gameId, passed) {
    if (!passed) return;
    const s = refresh();
    if (s.todayDone) return;
    if (!s.todayId || s.todayId !== gameId) return;
    s.todayDone = true;
    s.streak = (s.streak || 0) + 1;
    s.lastDate = todayKey();
    saveState(s);
    if (window.MR.Rewards && window.MR.Rewards.toast) {
      window.MR.Rewards.toast({
        emoji: "🎯",
        title: "Daily Challenge done!",
        name: `${s.streak}-day streak`,
      });
    }
    // Trophy for hitting streak milestones — delegate to Rewards so it
    // shows nicely and persists.
    const Rewards = window.MR.Rewards;
    const A = window.MR.Achievements;
    if (Rewards && A && A.byId) {
      if (s.streak === 3 && A.byId("streak-3"))  Rewards.earnAchievement(A.byId("streak-3"));
      if (s.streak === 7 && A.byId("streak-7"))  Rewards.earnAchievement(A.byId("streak-7"));
      if (s.streak === 30 && A.byId("streak-30")) Rewards.earnAchievement(A.byId("streak-30"));
    }
  }

  const DailyChallenge = {
    CHALLENGE_GAMES,
    refresh,
    getState,
    streak,
    isTodayDone,
    todaysGame,
    todayHash,
    markCompleted,
  };

  window.MR = window.MR || {};
  window.MR.DailyChallenge = DailyChallenge;
})();
