/*!
 * progress.js — cross-module unlock/completion logic on top of storage.
 */
(function () {
  const S = window.MR.Storage;
  const C = window.MR.Content;

  function chapterUnlocked(id) {
    const ch = C.getChapter(id); if (!ch) return false;
    if (S.isChapterForceUnlocked(id)) return true;
    if (!ch.requires) return true;
    return S.isChapterComplete(ch.requires) || S.hasPassed(ch.requires);
  }

  function gameUnlocked(id) {
    const g = C.getGame(id); if (!g) return false;
    if (!S.isGameEnabled(id)) return false;
    if (S.isForceUnlocked(id)) return true;
    if (!g.requiresPass) return true;
    return S.hasPassed(g.requiresPass);
  }

  function moduleProgress(modId) {
    const chapters = C.chaptersForModule(modId);
    const completed = chapters.filter((c) => S.isChapterComplete(c.id)).length;
    return {
      completed, total: chapters.length,
      pct: chapters.length ? completed / chapters.length : 0,
    };
  }

  window.MR = window.MR || {};
  window.MR.Progress = { chapterUnlocked, gameUnlocked, moduleProgress };
})();
