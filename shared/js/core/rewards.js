/*!
 * rewards.js — central "award X" helpers with toast UI.
 *
 * Exposes:
 *   MR.Rewards.toast({emoji,title,name})
 *   MR.Rewards.earnAchievement(def)        — shows toast if newly earned
 *   MR.Rewards.earnFriend(friend)          — ditto
 *   MR.Rewards.earnCritter(critter)        — ditto
 *   MR.Rewards.unlockJournal(entry)        — ditto
 *   MR.Rewards.checkAchievements(ctx)      — runs Achievements.check + toasts each
 *   MR.Rewards.dripCritter()               — picks next unearned critter if totalCorrect crossed a 5-boundary
 *   MR.Rewards.onChapterPassed(chapterId)  — awards friend, maybe module mascot
 */
(function () {
  const S = window.MR.Storage;
  const C = window.MR.Content;
  const A = window.MR.Achievements;

  const TOAST_MS   = 2600;
  const TOAST_GAP  = 500; // spacing between multiple queued toasts

  let toastQueue = [];
  let toastBusy = false;

  function runToast() {
    if (toastBusy || !toastQueue.length) return;
    toastBusy = true;
    const t = toastQueue.shift();
    const el = document.createElement("div");
    el.className = "reward-toast";
    el.innerHTML = `
      <div class="reward-toast-emoji">${t.emoji || "🎉"}</div>
      <div>
        <div class="reward-toast-title">${t.title || "Unlocked!"}</div>
        <div class="reward-toast-name">${t.name || ""}</div>
      </div>`;
    document.body.appendChild(el);
    setTimeout(() => {
      el.classList.add("leaving");
      setTimeout(() => {
        el.remove();
        toastBusy = false;
        setTimeout(runToast, TOAST_GAP);
      }, 350);
    }, TOAST_MS);
  }

  function toast(opts) {
    toastQueue.push(opts || {});
    runToast();
  }

  function earnAchievement(def) {
    if (!def) return false;
    const newly = S.earnAchievement(def.id);
    if (newly) toast({ emoji: def.icon, title: "Trophy earned!", name: def.name });
    return newly;
  }
  function earnFriend(friend) {
    if (!friend) return false;
    const newly = S.earnFriend(friend.id);
    if (newly) toast({ emoji: friend.emoji, title: "New valley friend!", name: friend.name });
    return newly;
  }
  function earnCritter(critter) {
    if (!critter) return false;
    const newly = S.earnCritter(critter.id);
    if (newly) toast({ emoji: "🐾", title: "Critter spotted!", name: critter.name });
    return newly;
  }
  function unlockJournal(entry) {
    if (!entry) return false;
    const newly = S.unlockJournalEntry(entry.id);
    if (newly) toast({ emoji: entry.emoji || "📝", title: "Journal page unlocked!", name: entry.title });
    return newly;
  }

  function checkAchievements(partial) {
    const earned = A.check(partial || {});
    for (const def of earned) {
      toast({ emoji: def.icon, title: "Trophy earned!", name: def.name });
    }
    return earned;
  }

  // Pick the next unearned critter (catalog order) and award it.
  // Used by the 1-per-5-correct drip.
  function dripCritter() {
    const all = C.allCritters();
    const owned = new Set(S.getCritters());
    for (const c of all) {
      if (!owned.has(c.id)) {
        if (S.earnCritter(c.id)) {
          toast({ emoji: "🐾", title: "Critter spotted!", name: c.name });
          return c;
        }
      }
    }
    return null;
  }

  // Call after each answer — awards a new critter every 5th correct total.
  function maybeDripAfterAnswer() {
    const totals = S.getTotals();
    // Before/after deltas aren't tracked, but we can use modulo of totals.correct:
    if (totals.correct > 0 && totals.correct % 5 === 0) {
      // Only drip if we haven't awarded a critter for this exact count yet.
      // Guard: record last-drip-count in memory; if we see the same count twice, skip.
      if (maybeDripAfterAnswer._lastCount === totals.correct) return null;
      maybeDripAfterAnswer._lastCount = totals.correct;
      return dripCritter();
    }
    return null;
  }

  // When a chapter is passed, award its friend + maybe the module mascot.
  function onChapterPassed(chapterId) {
    const ch = C.getChapter(chapterId);
    if (!ch) return;
    const friend = C.friendForChapter(chapterId);
    if (friend) earnFriend(friend);

    // Module mascot: awarded when every chapter in the module is complete.
    const modId = ch.moduleId;
    if (modId) {
      const mod = C.getModule(modId);
      if (mod) {
        const allDone = (mod.chapters || []).every((id) => S.isChapterComplete(id));
        if (allDone) {
          const mascot = C.friendForModuleCompletion(modId);
          if (mascot) earnFriend(mascot);
        }
      }
    }
  }

  window.MR = window.MR || {};
  window.MR.Rewards = {
    toast, earnAchievement, earnFriend, earnCritter, unlockJournal,
    checkAchievements, dripCritter, maybeDripAfterAnswer, onChapterPassed,
  };
})();
