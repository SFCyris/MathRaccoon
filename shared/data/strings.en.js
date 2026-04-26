/*!
 * strings.en.js — English UI copy. Keys are dot-namespaced.
 * Extend or override per-locale by registering a second locale.
 */
(function () {
  window.MR.Strings.register("en", {
    // Hub
    "hub.title": "Math Raccoon",
    "hub.subtitle": "Pick a book to start, {name}.",
    "hub.tile.progress": "{done}/{total} chapters",
    "hub.tile.stub": "Coming soon",

    // Module home
    "module.back": "← Back",
    "module.tab.story":  "Adventure",
    "module.tab.arcade": "Arcade",
    "module.tab.learn":  "Learn",
    "module.tab.teach":  "Teaching Corner",
    "module.locked":     "Finish the one before this to unlock.",
    "module.learn.title": "Teaching Corner",
    "module.learn.soon":  "More teaching adventures coming soon! Math Raccoon is busy preparing hands-on lessons — check back soon.",

    // Runner
    "runner.qIndex":  "Question {i} of {n}",
    "runner.correct": "Yes! 🎉",
    "runner.wrong":   "Not quite — let's try the next one.",
    "runner.continue": "Next",
    "runner.finish":  "Finish",
    "runner.result":  "You got {correct} of {total}!",
    "runner.pass":    "Nice — chapter complete!",
    "runner.retry":   "Try again",
    "runner.home":    "Back to book",

    // Narrative
    "narrative.intro": "Begin →",
    "narrative.outro": "Done ✓",

    // Admin
    "admin.title":       "Parent Admin",
    "admin.subtitle":    "Adjust settings and per-game / per-chapter controls. Changes save instantly.",
    "admin.back":        "← Back to hub",
    "admin.name.label":  "Child's name",
    "admin.name.hint":   "Shown in greetings. Default is Ava.",
    "admin.name.save":   "Save",
    "admin.a11y.title":  "Accessibility",
    "admin.calm.label":  "Calm mode",
    "admin.calm.hint":   "Softens animations and transitions.",
    "admin.hc.label":    "High contrast",
    "admin.hc.hint":     "Stronger colors and borders for low-vision readers.",
    "admin.audio.title": "Audio",
    "admin.music.label": "Music",
    "admin.voice.label": "Read aloud (narration)",
    "admin.volume":      "Volume",
    "admin.games.title": "Per-game controls",
    "admin.ch.title":    "Per-chapter controls",
    "admin.reset.title": "Danger zone",
    "admin.reset.all":   "Reset all progress",
    "admin.reset.confirm": "Reset ALL progress, trophies, chapters, and collectibles? (Settings are kept.)",

    // Controls (top bar)
    "controls.music": "Music",
    "controls.voice": "Read",
    "controls.calm":  "Calm",
    "controls.admin": "Admin",

    // Common
    "common.yes": "Yes",
    "common.no":  "No",
  });
})();
