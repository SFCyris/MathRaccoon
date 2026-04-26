/*!
 * content.js — central content registry. All modules, chapters, games,
 * teaching ops, and critters register here at load time.
 *
 * Works on file:// because registration happens via <script> tags, not fetch().
 */
(function () {
  const state = {
    modules:   {},  // id → manifest
    chapters:  {},  // id → definition
    games:     {},  // id → definition (arcade)
    ops:       {},  // id → teaching-corner op
    critters:  {},  // id → catalog entry
    friends:   {},  // id → catalog entry
    journal:   {},  // id → journal-entry definition
  };

  const Content = {
    // ---- modules ----
    registerModule(m) {
      if (!m || !m.id) return console.warn("invalid module", m);
      if (state.modules[m.id]) return console.warn("duplicate module id", m.id);
      state.modules[m.id] = Object.freeze({
        id: m.id,
        title: m.title || m.id,
        subtitle: m.subtitle || "",
        emoji: m.emoji || "📚",
        accent: m.accent || "#c4b5fd",
        grade: m.grade || "",
        order: m.order || 0,
        intro: m.intro || null,
        chapters: (m.chapters || []).slice(),
        arcadeGames: (m.arcadeGames || []).slice(),
        teachingOps: (m.teachingOps || []).slice(),
        critterPool: (m.critterPool || []).slice(),
        status: m.status || "live",   // "live" | "stub" (hub renders stubs differently)
        section: m.section || "math", // "math" | "reading" (hub groups by section)
      });
    },
    getModule(id) { return state.modules[id] || null; },
    allModules() {
      return Object.values(state.modules).sort((a, b) => (a.order || 0) - (b.order || 0));
    },

    // ---- chapters ----
    registerChapter(c) {
      if (!c || !c.id) return console.warn("invalid chapter", c);
      if (state.chapters[c.id]) return console.warn("duplicate chapter id", c.id);
      state.chapters[c.id] = Object.freeze({
        id: c.id,
        moduleId: c.moduleId,
        order: c.order || 0,
        title: c.title || c.id,
        description: c.description || "",
        emoji: c.emoji || "📖",
        accent: c.accent || null,
        requires: c.requires || null,
        narrative: c.narrative || { intro: [], outro: [] },
        engine: c.engine || null,
        engineConfig: c.engineConfig || {},
        rewards: c.rewards || {},
      });
    },
    getChapter(id) { return state.chapters[id] || null; },
    chaptersForModule(modId) {
      const m = this.getModule(modId); if (!m) return [];
      return m.chapters.map((id) => this.getChapter(id)).filter(Boolean);
    },

    // ---- arcade games ----
    registerGame(g) {
      if (!g || !g.id) return console.warn("invalid game", g);
      if (state.games[g.id]) return console.warn("duplicate game id", g.id);
      state.games[g.id] = Object.freeze({
        id: g.id,
        moduleId: g.moduleId,
        title: g.title || g.id,
        description: g.description || "",
        emoji: g.emoji || "🎮",
        accent: g.accent || "#c4b5fd",
        engine: g.engine || null,
        engineConfig: g.engineConfig || {},
        requiresPass: g.requiresPass || null,
        unlocks: g.unlocks || null,
      });
    },
    getGame(id) { return state.games[id] || null; },
    gamesForModule(modId) {
      const m = this.getModule(modId); if (!m) return [];
      return m.arcadeGames.map((id) => this.getGame(id)).filter(Boolean);
    },

    // ---- teaching-corner ops ----
    registerOp(op) {
      if (!op || !op.id) return console.warn("invalid op", op);
      if (state.ops[op.id]) return console.warn("duplicate op id", op.id);
      state.ops[op.id] = Object.freeze({
        id: op.id,
        moduleId: op.moduleId,
        label: op.label || op.id,
        emoji: op.emoji || "🎓",
        tagline: op.tagline || "",       // short hook like "Let's add!"
        accent: op.accent || null,        // falls back to module accent at render time
        strategies: (op.strategies || []).slice(),
      });
    },
    getOp(id) { return state.ops[id] || null; },
    opsForModule(modId) {
      const m = this.getModule(modId); if (!m) return [];
      return m.teachingOps.map((id) => this.getOp(id)).filter(Boolean);
    },

    // ---- critters ----
    registerCritter(c) {
      if (!c || !c.id) return console.warn("invalid critter", c);
      if (state.critters[c.id]) return console.warn("duplicate critter id", c.id);
      state.critters[c.id] = Object.freeze({
        id: c.id,
        name: c.name || c.id,
        caption: c.caption || "",
        moduleHint: c.moduleHint || null,
        svg: c.svg || null,
      });
    },
    getCritter(id) { return state.critters[id] || null; },
    allCritters() { return Object.values(state.critters); },

    // ---- friends ----
    registerFriend(f) {
      if (!f || !f.id) return console.warn("invalid friend", f);
      if (state.friends[f.id]) return console.warn("duplicate friend id", f.id);
      state.friends[f.id] = Object.freeze({
        id: f.id,
        name: f.name || f.id,
        emoji: f.emoji || "🤗",
        accent: f.accent || "#c4b5fd",
        caption: f.caption || "",
        moduleId: f.moduleId || null,
        earnedBy: f.earnedBy || null,   // { chapter: "id" } | { module: "id" }
      });
    },
    getFriend(id) { return state.friends[id] || null; },
    allFriends() { return Object.values(state.friends); },
    friendForChapter(chId) {
      for (const f of Object.values(state.friends)) {
        if (f.earnedBy && f.earnedBy.chapter === chId) return f;
      }
      return null;
    },
    friendForModuleCompletion(modId) {
      for (const f of Object.values(state.friends)) {
        if (f.earnedBy && f.earnedBy.module === modId) return f;
      }
      return null;
    },

    // ---- journal entries ----
    registerJournalEntry(j) {
      if (!j || !j.id) return console.warn("invalid journal entry", j);
      if (state.journal[j.id]) return console.warn("duplicate journal id", j.id);
      state.journal[j.id] = Object.freeze({
        id: j.id,
        title: j.title || j.id,
        emoji: j.emoji || "📝",
        accent: j.accent || "#c4b5fd",
        moduleId: j.moduleId || null,
        chapterId: j.chapterId || null,
        body: (j.body || []).slice(),  // array of strings
      });
    },
    getJournalEntry(id) { return state.journal[id] || null; },
    allJournalEntries() { return Object.values(state.journal); },
  };

  window.MR = window.MR || {};
  window.MR.Content = Content;
})();
