/**
 * gameRegistry.js — modular registry for arcade and story games.
 *
 * A game def can be a simple bundle:
 *   { id, title, description, emoji, accent, grade, create, howTo? }
 *
 * Or a config-driven game that uses a shared engine and the generic round
 * runner (MR.GameRunner):
 *   { id, title, description, emoji, accent, grade,
 *     mode: "arcade" | "story",
 *     engine: "addition" | "subtraction" | "multiplication" | "division" | "fraction" | "placeValue",
 *     config: { problemsPerRound, ...engineConfig },
 *     unlocks: "next-game-id",           // arcade only — progression gate
 *     requiresPass: "previous-game-id",  // locks until that game has ≥75%
 *     chapter: 1-16,                      // story only — order
 *     narrative: {...},                   // story only — see story.js
 *   }
 */
(function () {
  const games = [];

  const Games = {
    register(def) {
      if (!def || !def.id) { console.warn("invalid game def", def); return; }
      if (games.some((g) => g.id === def.id)) { console.warn("duplicate game id", def.id); return; }
      games.push({
        id: def.id,
        title: def.title || def.id,
        description: def.description || "",
        emoji: def.emoji || "🎮",
        accent: def.accent || "#c4b5fd",
        grade: def.grade || "",
        mode: def.mode || "arcade",
        engine: def.engine || null,
        config: def.config || {},
        howTo: def.howTo || null,
        unlocks: def.unlocks || null,
        requiresPass: def.requiresPass || null,
        chapter: def.chapter || null,
        narrative: def.narrative || null,
        friendId: def.friendId || null,    // story — collectible critter awarded on pass
        journal: def.journal || null,      // story — journal page unlocked on pass
        create: def.create || null, // custom create fn; otherwise use engine runner
      });
    },
    all() { return games.slice(); },
    get(id) { return games.find((g) => g.id === id); },
    arcade() { return games.filter((g) => g.mode === "arcade"); },
    story() { return games.filter((g) => g.mode === "story").sort((a, b) => (a.chapter || 0) - (b.chapter || 0)); },

    // Is a game currently playable by the user?
    // Considers admin-disable, forceUnlock override, and the "requiresPass" gate.
    isUnlocked(id) {
      const g = this.get(id);
      if (!g) return false;
      const Storage = window.MR.Storage;
      if (!Storage.isGameEnabled(id)) return false;
      if (Storage.isForceUnlocked(id)) return true;
      if (!g.requiresPass) return true;
      return Storage.hasPassed(g.requiresPass);
    },
    isEnabled(id) { return window.MR.Storage.isGameEnabled(id); },
  };

  window.MR = window.MR || {};
  window.MR.Games = Games;
})();
