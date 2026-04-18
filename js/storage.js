/*!
 * Math Raccoon Arcade — © 2026 S. F. Cyris
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Math Raccoon™, Reading Raccoon™, Art Raccoon™, Painter Raccoon™,
 * and Ava's Hidden Valley™ are unregistered common-law trademarks
 * of the author. See NOTICE.md — these marks are NOT licensed under Apache 2.0.
 *
 * Source: https://github.com/SFCyris/MathRaccoon
 */

/**
 * storage.js — persistence for progress, achievements, settings,
 * progression unlocks, admin overrides, and story chapter state.
 */
(function () {
  const NS = "mathRaccoon::v1";
  const KEY_PROGRESS     = `${NS}:progress`;
  const KEY_ACHIEVEMENTS = `${NS}:achievements`;
  const KEY_SETTINGS     = `${NS}:settings`;
  const KEY_ADMIN        = `${NS}:admin`;        // { disabledGames: [], forceUnlocked: [] }
  const KEY_STORY        = `${NS}:story`;        // { currentChapter, completedChapters: [] }
  const KEY_FRIENDS      = `${NS}:friends`;      // [id, id, ...]
  const KEY_JOURNAL      = `${NS}:journal`;      // [id, id, ...]
  const KEY_DAILY        = `${NS}:daily`;        // { lastDate, streak, todayCount, todayCorrect }
  const KEY_CRITTERS     = `${NS}:critters`;     // [id, id, ...] — Critter Cam gallery

  const UNLOCK_THRESHOLD = 0.75; // 75% accuracy to unlock next

  function safeRead(key, fallback) {
    try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; }
    catch (e) { return fallback; }
  }
  function safeWrite(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
  }

  const Storage = {
    // ----- progress -----
    getAllProgress() { return safeRead(KEY_PROGRESS, {}); },

    getProgress(gameId) {
      const all = this.getAllProgress();
      return all[gameId] || { runs: 0, correct: 0, total: 0, bestStreak: 0, lastPlayed: null, lastRound: null };
    },

    recordAnswer(gameId, wasCorrect, currentStreak) {
      const all = this.getAllProgress();
      const g = all[gameId] || { runs: 0, correct: 0, total: 0, bestStreak: 0, lastPlayed: null, lastRound: null };
      g.total += 1;
      if (wasCorrect) g.correct += 1;
      if (currentStreak > (g.bestStreak || 0)) g.bestStreak = currentStreak;
      g.lastPlayed = Date.now();
      all[gameId] = g;
      safeWrite(KEY_PROGRESS, all);
      return g;
    },

    recordRun(gameId) {
      const all = this.getAllProgress();
      const g = all[gameId] || { runs: 0, correct: 0, total: 0, bestStreak: 0, lastPlayed: null, lastRound: null };
      g.runs = (g.runs || 0) + 1;
      g.lastPlayed = Date.now();
      all[gameId] = g;
      safeWrite(KEY_PROGRESS, all);
      return g;
    },

    // Record how a specific round went (used for 75% unlock check)
    recordRoundResult(gameId, correct, total) {
      const all = this.getAllProgress();
      const g = all[gameId] || { runs: 0, correct: 0, total: 0, bestStreak: 0, lastPlayed: null, lastRound: null };
      g.lastRound = { correct, total, pct: total ? correct / total : 0, at: Date.now() };
      if (!g.bestRoundPct || g.lastRound.pct > g.bestRoundPct) g.bestRoundPct = g.lastRound.pct;
      all[gameId] = g;
      safeWrite(KEY_PROGRESS, all);
      return g;
    },

    // A game "passes" if best round accuracy ≥ threshold
    hasPassed(gameId) {
      const p = this.getProgress(gameId);
      return (p.bestRoundPct || 0) >= UNLOCK_THRESHOLD;
    },
    unlockThreshold() { return UNLOCK_THRESHOLD; },

    // ----- achievements -----
    getAchievements() { return safeRead(KEY_ACHIEVEMENTS, []); },
    hasAchievement(id) { return this.getAchievements().includes(id); },
    earnAchievement(id) {
      const list = this.getAchievements();
      if (list.includes(id)) return false;
      list.push(id);
      safeWrite(KEY_ACHIEVEMENTS, list);
      return true;
    },

    // ----- settings -----
    getSettings() {
      return safeRead(KEY_SETTINGS, {
        musicOn: false, volume: 0.4, playerName: "Ava",
        voiceOn: false, calmMode: false, hasOnboarded: false,
      });
    },
    setSettings(patch) {
      const cur = this.getSettings();
      const next = { ...cur, ...patch };
      safeWrite(KEY_SETTINGS, next);
      return next;
    },

    // ----- admin (parent controls) -----
    getAdmin() { return safeRead(KEY_ADMIN, { disabledGames: [], forceUnlocked: [] }); },
    setGameEnabled(gameId, enabled) {
      const a = this.getAdmin();
      a.disabledGames = a.disabledGames || [];
      if (enabled) a.disabledGames = a.disabledGames.filter((id) => id !== gameId);
      else if (!a.disabledGames.includes(gameId)) a.disabledGames.push(gameId);
      safeWrite(KEY_ADMIN, a);
    },
    isGameEnabled(gameId) {
      const a = this.getAdmin();
      return !(a.disabledGames || []).includes(gameId);
    },
    forceUnlock(gameId, on = true) {
      const a = this.getAdmin();
      a.forceUnlocked = a.forceUnlocked || [];
      if (on) { if (!a.forceUnlocked.includes(gameId)) a.forceUnlocked.push(gameId); }
      else    { a.forceUnlocked = a.forceUnlocked.filter((id) => id !== gameId); }
      safeWrite(KEY_ADMIN, a);
    },
    isForceUnlocked(gameId) {
      const a = this.getAdmin();
      return (a.forceUnlocked || []).includes(gameId);
    },

    // ----- story -----
    getStory() { return safeRead(KEY_STORY, { completedChapters: [] }); },
    markChapterComplete(chapterId) {
      const s = this.getStory();
      s.completedChapters = s.completedChapters || [];
      if (!s.completedChapters.includes(chapterId)) s.completedChapters.push(chapterId);
      safeWrite(KEY_STORY, s);
    },
    isChapterComplete(chapterId) {
      const s = this.getStory();
      return (s.completedChapters || []).includes(chapterId);
    },

    // ----- friends (collectible valley raccoons and critters) -----
    getFriends() { return safeRead(KEY_FRIENDS, []); },
    hasFriend(id) { return this.getFriends().includes(id); },
    earnFriend(id) {
      const list = this.getFriends();
      if (list.includes(id)) return false;
      list.push(id);
      safeWrite(KEY_FRIENDS, list);
      return true;
    },

    // ----- critter cam (drip-unlock SVG gallery, 1 per 5 correct) -----
    getCritters() { return safeRead(KEY_CRITTERS, []); },
    hasCritter(id) { return this.getCritters().includes(id); },
    earnCritter(id) {
      const list = this.getCritters();
      if (!id || list.includes(id)) return false;
      list.push(id);
      safeWrite(KEY_CRITTERS, list);
      return true;
    },

    // ----- journal (unlockable story pages) -----
    getJournal() { return safeRead(KEY_JOURNAL, []); },
    hasJournalEntry(id) { return this.getJournal().includes(id); },
    unlockJournalEntry(id) {
      const list = this.getJournal();
      if (list.includes(id)) return false;
      list.push(id);
      safeWrite(KEY_JOURNAL, list);
      return true;
    },

    // ----- daily raccoon visit -----
    getDaily() { return safeRead(KEY_DAILY, { lastDate: null, streak: 0, todayCount: 0, todayCorrect: 0 }); },
    todayKey() { const d = new Date(); return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`; },
    isDailyDone() {
      const d = this.getDaily();
      return d.lastDate === this.todayKey() && d.todayCount >= 3;
    },
    recordDailyAnswer(correct) {
      const t = this.todayKey();
      const d = this.getDaily();
      if (d.lastDate !== t) {
        d.todayCount = 0;
        d.todayCorrect = 0;
      }
      d.todayCount += 1;
      if (correct) d.todayCorrect += 1;
      d.lastDate = t;
      safeWrite(KEY_DAILY, d);
      return d;
    },
    completeDaily() {
      const t = this.todayKey();
      const d = this.getDaily();
      // streak: if yesterday was the last streak-increment date, bump; else reset to 1
      const yest = new Date(); yest.setDate(yest.getDate() - 1);
      const yKey = `${yest.getFullYear()}-${yest.getMonth()+1}-${yest.getDate()}`;
      if (d.streakDate === yKey) d.streak = (d.streak || 0) + 1;
      else if (d.streakDate !== t) d.streak = 1;
      d.streakDate = t;
      d.lastDate = t;
      safeWrite(KEY_DAILY, d);
      return d;
    },

    // ----- reset -----
    resetAll() {
      try {
        localStorage.removeItem(KEY_PROGRESS);
        localStorage.removeItem(KEY_ACHIEVEMENTS);
        localStorage.removeItem(KEY_STORY);
        localStorage.removeItem(KEY_FRIENDS);
        localStorage.removeItem(KEY_JOURNAL);
        localStorage.removeItem(KEY_DAILY);
        localStorage.removeItem(KEY_CRITTERS);
        const cur = safeRead(KEY_SETTINGS, {});
        safeWrite(KEY_SETTINGS, {
          ...cur,
          playerName: "Ava",
          hasOnboarded: false,
        });
      } catch (e) {}
    },
    resetGame(gameId) {
      const all = this.getAllProgress();
      delete all[gameId];
      safeWrite(KEY_PROGRESS, all);
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
      return { correct, total, runs, trophies: this.getAchievements().length };
    },
  };

  window.MR = window.MR || {};
  window.MR.Storage = Storage;
})();
