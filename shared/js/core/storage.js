/*!
 * Math Raccoon v2 — © 2026 S. F. Cyris · Apache 2.0
 * storage.js — localStorage persistence (schemaVersion 2).
 */
(function () {
  const NS  = "mathRaccoon::v2";
  const NS_V1 = "mathRaccoon::v1";
  const KEY = {
    SCHEMA:       `${NS}:schemaVersion`,
    SETTINGS:     `${NS}:settings`,
    PROGRESS:     `${NS}:progress`,
    ACHIEVEMENTS: `${NS}:achievements`,
    CHAPTERS:     `${NS}:chapters`,
    JOURNAL:      `${NS}:journal`,
    CRITTERS:     `${NS}:critters`,
    FRIENDS:      `${NS}:friends`,
    DAILY:        `${NS}:daily`,
    ADMIN:        `${NS}:admin`,
    V1_IMPORTED:  `${NS}:v1Imported`,
  };
  const SCHEMA_VERSION = 2;
  const UNLOCK_THRESHOLD = 0.75;

  function safeRead(key, fallback) {
    try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; }
    catch (e) { return fallback; }
  }
  function safeWrite(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
  }
  function unionInto(key, arr) {
    if (!Array.isArray(arr) || !arr.length) return;
    const cur = safeRead(key, []);
    const set = new Set(cur);
    for (const v of arr) if (v) set.add(v);
    safeWrite(key, Array.from(set));
  }

  // Seed schema version on first run.
  if (safeRead(KEY.SCHEMA, null) !== SCHEMA_VERSION) safeWrite(KEY.SCHEMA, SCHEMA_VERSION);

  // One-time v1 → v2 migration. Reads v1 localStorage keys and merges into v2
  // arrays (union — never overwrites existing v2 progress). Runs once per browser.
  (function migrateFromV1() {
    if (safeRead(KEY.V1_IMPORTED, false)) return;
    try {
      // Trophies / achievements
      unionInto(KEY.ACHIEVEMENTS, safeRead(`${NS_V1}:achievements`, []));
      // Friends
      unionInto(KEY.FRIENDS, safeRead(`${NS_V1}:friends`, []));
      // Journal
      unionInto(KEY.JOURNAL, safeRead(`${NS_V1}:journal`, []));
      // Critters
      unionInto(KEY.CRITTERS, safeRead(`${NS_V1}:critters`, []));
      // Story chapters completed
      const v1Story = safeRead(`${NS_V1}:story`, null);
      if (v1Story && Array.isArray(v1Story.completedChapters)) {
        unionInto(KEY.CHAPTERS, v1Story.completedChapters);
      }
      // Settings (only if v2 has no settings yet — don't overwrite)
      if (safeRead(KEY.SETTINGS, null) === null) {
        const v1s = safeRead(`${NS_V1}:settings`, null);
        if (v1s && typeof v1s === "object") {
          safeWrite(KEY.SETTINGS, {
            calmMode: !!v1s.calmMode, highContrast: false,
            musicOn: !!v1s.musicOn, voiceOn: !!v1s.voiceOn,
            volume: typeof v1s.volume === "number" ? v1s.volume : 0.4,
            playerName: v1s.playerName || "Ava",
            hasOnboarded: !!v1s.hasOnboarded,
            locale: "en",
          });
        }
      }
    } catch (e) { /* noop — migration failures shouldn't crash the app */ }
    safeWrite(KEY.V1_IMPORTED, true);
  })();

  const Storage = {
    UNLOCK_THRESHOLD,

    // ----- settings -----
    getSettings() {
      return safeRead(KEY.SETTINGS, {
        calmMode: false, highContrast: false,
        musicOn: false, voiceOn: false, volume: 0.4,
        playerName: "Ava", hasOnboarded: false,
        locale: "en",
      });
    },
    setSettings(patch) {
      const next = { ...this.getSettings(), ...patch };
      safeWrite(KEY.SETTINGS, next);
      return next;
    },

    // ----- progress -----
    getAllProgress() { return safeRead(KEY.PROGRESS, {}); },
    getProgress(id) {
      return this.getAllProgress()[id] || {
        runs: 0, correct: 0, total: 0, bestStreak: 0, bestRoundPct: 0,
        lastPlayed: null, lastRound: null,
      };
    },
    recordAnswer(id, wasCorrect, currentStreak) {
      const all = this.getAllProgress();
      const p = all[id] || { runs: 0, correct: 0, total: 0, bestStreak: 0, bestRoundPct: 0, lastPlayed: null, lastRound: null };
      p.total += 1;
      if (wasCorrect) p.correct += 1;
      if (currentStreak > (p.bestStreak || 0)) p.bestStreak = currentStreak;
      p.lastPlayed = Date.now();
      all[id] = p; safeWrite(KEY.PROGRESS, all);
      return p;
    },
    recordRun(id) {
      const all = this.getAllProgress();
      const p = all[id] || { runs: 0, correct: 0, total: 0, bestStreak: 0, bestRoundPct: 0, lastPlayed: null, lastRound: null };
      p.runs = (p.runs || 0) + 1;
      p.lastPlayed = Date.now();
      all[id] = p; safeWrite(KEY.PROGRESS, all);
      return p;
    },
    recordRoundResult(id, correct, total) {
      const all = this.getAllProgress();
      const p = all[id] || { runs: 0, correct: 0, total: 0, bestStreak: 0, bestRoundPct: 0, lastPlayed: null, lastRound: null };
      p.lastRound = { correct, total, pct: total ? correct / total : 0, at: Date.now() };
      if (!p.bestRoundPct || p.lastRound.pct > p.bestRoundPct) p.bestRoundPct = p.lastRound.pct;
      all[id] = p; safeWrite(KEY.PROGRESS, all);
      return p;
    },
    hasPassed(id) { return (this.getProgress(id).bestRoundPct || 0) >= UNLOCK_THRESHOLD; },
    resetGame(id) { const all = this.getAllProgress(); delete all[id]; safeWrite(KEY.PROGRESS, all); },

    // ----- achievements (trophies) -----
    getAchievements() { return safeRead(KEY.ACHIEVEMENTS, []); },
    hasAchievement(id) { return this.getAchievements().includes(id); },
    earnAchievement(id) {
      const list = this.getAchievements();
      if (list.includes(id)) return false;
      list.push(id); safeWrite(KEY.ACHIEVEMENTS, list); return true;
    },

    // ----- chapters (story) -----
    getChapters() { return safeRead(KEY.CHAPTERS, []); },
    isChapterComplete(id) { return this.getChapters().includes(id); },
    markChapterComplete(id) {
      const list = this.getChapters();
      if (list.includes(id)) return false;
      list.push(id); safeWrite(KEY.CHAPTERS, list); return true;
    },

    // ----- journal -----
    getJournal() { return safeRead(KEY.JOURNAL, []); },
    hasJournalEntry(id) { return this.getJournal().includes(id); },
    unlockJournalEntry(id) {
      const list = this.getJournal();
      if (!id || list.includes(id)) return false;
      list.push(id); safeWrite(KEY.JOURNAL, list); return true;
    },

    // ----- critters -----
    getCritters() { return safeRead(KEY.CRITTERS, []); },
    hasCritter(id) { return this.getCritters().includes(id); },
    earnCritter(id) {
      const list = this.getCritters();
      if (!id || list.includes(id)) return false;
      list.push(id); safeWrite(KEY.CRITTERS, list); return true;
    },

    // ----- friends (valley mascots) -----
    getFriends() { return safeRead(KEY.FRIENDS, []); },
    hasFriend(id) { return this.getFriends().includes(id); },
    earnFriend(id) {
      const list = this.getFriends();
      if (!id || list.includes(id)) return false;
      list.push(id); safeWrite(KEY.FRIENDS, list); return true;
    },

    // ----- daily -----
    getDaily() { return safeRead(KEY.DAILY, { lastDate: null, streak: 0, todayCount: 0, todayCorrect: 0 }); },
    todayKey() { const d = new Date(); return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`; },
    yesterdayKey() {
      const d = new Date(); d.setDate(d.getDate() - 1);
      return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
    },
    hasSeenDailyToday() { return this.getDaily().lastDate === this.todayKey(); },
    // Bumps streak (resets if gap > 1 day), stamps lastDate. Safe to call once per day.
    markDailyVisit() {
      const d = this.getDaily();
      const today = this.todayKey();
      if (d.lastDate === today) return d;
      const cont = d.lastDate === this.yesterdayKey();
      const next = {
        lastDate: today,
        streak:   cont ? (d.streak || 0) + 1 : 1,
        todayCount: 0,
        todayCorrect: 0,
      };
      safeWrite(KEY.DAILY, next);
      return next;
    },
    recordDailyAnswer(wasCorrect) {
      const d = this.getDaily();
      d.todayCount   = (d.todayCount || 0) + 1;
      d.todayCorrect = (d.todayCorrect || 0) + (wasCorrect ? 1 : 0);
      safeWrite(KEY.DAILY, d);
      return d;
    },

    // ----- admin -----
    getAdmin() { return safeRead(KEY.ADMIN, { disabledGames: [], forceUnlocked: [], forceChapterUnlocks: [] }); },
    setGameEnabled(id, enabled) {
      const a = this.getAdmin();
      a.disabledGames = a.disabledGames || [];
      if (enabled) a.disabledGames = a.disabledGames.filter((x) => x !== id);
      else if (!a.disabledGames.includes(id)) a.disabledGames.push(id);
      safeWrite(KEY.ADMIN, a);
    },
    isGameEnabled(id) { return !(this.getAdmin().disabledGames || []).includes(id); },
    forceUnlock(id, on = true) {
      const a = this.getAdmin();
      a.forceUnlocked = a.forceUnlocked || [];
      if (on) { if (!a.forceUnlocked.includes(id)) a.forceUnlocked.push(id); }
      else    { a.forceUnlocked = a.forceUnlocked.filter((x) => x !== id); }
      safeWrite(KEY.ADMIN, a);
    },
    isForceUnlocked(id) { return (this.getAdmin().forceUnlocked || []).includes(id); },
    forceChapter(id, on = true) {
      const a = this.getAdmin();
      a.forceChapterUnlocks = a.forceChapterUnlocks || [];
      if (on) { if (!a.forceChapterUnlocks.includes(id)) a.forceChapterUnlocks.push(id); }
      else    { a.forceChapterUnlocks = a.forceChapterUnlocks.filter((x) => x !== id); }
      safeWrite(KEY.ADMIN, a);
    },
    isChapterForceUnlocked(id) { return (this.getAdmin().forceChapterUnlocks || []).includes(id); },

    // ----- reset -----
    resetAll() {
      // Keep settings so Calm / HC prefs survive a reset.
      try {
        localStorage.removeItem(KEY.PROGRESS);
        localStorage.removeItem(KEY.ACHIEVEMENTS);
        localStorage.removeItem(KEY.CHAPTERS);
        localStorage.removeItem(KEY.JOURNAL);
        localStorage.removeItem(KEY.CRITTERS);
        localStorage.removeItem(KEY.FRIENDS);
        localStorage.removeItem(KEY.DAILY);
        const cur = this.getSettings();
        safeWrite(KEY.SETTINGS, { ...cur, playerName: "Ava", hasOnboarded: false });
      } catch (e) {}
    },

    // ----- totals -----
    getTotals() {
      const all = this.getAllProgress();
      let correct = 0, total = 0, runs = 0;
      for (const k of Object.keys(all)) {
        correct += all[k].correct || 0;
        total   += all[k].total   || 0;
        runs    += all[k].runs    || 0;
      }
      // Count only stored IDs that still exist in content — stale IDs from
      // older versions shouldn't inflate the chips while tiles show locked.
      const C = window.MR && window.MR.Content;
      const liveCount = (stored, liveList) => {
        if (!C || !liveList) return stored.length;
        const ids = new Set(liveList.map((x) => x.id));
        return stored.filter((id) => ids.has(id)).length;
      };
      return {
        correct, total, runs,
        achievements: this.getAchievements().length,
        chapters: this.getChapters().length,
        journal:  liveCount(this.getJournal(),  C && C.allJournalEntries && C.allJournalEntries()),
        critters: liveCount(this.getCritters(), C && C.allCritters        && C.allCritters()),
        friends:  liveCount(this.getFriends(),  C && C.allFriends         && C.allFriends()),
      };
    },
  };

  window.MR = window.MR || {};
  window.MR.Storage = Storage;
})();
