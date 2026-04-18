/**
 * mixedEngine.js — final-review engine that rotates between other engines.
 * Config: { engines: ["addition", "subtraction", "multiplication", "division"], engineConfigs: {...} }
 */
(function () {
  function pickEngine(cfg, qIndex) {
    const names = cfg.engines || ["addition", "subtraction", "multiplication", "division"];
    return names[qIndex % names.length];
  }

  function generate(cfg = {}, qIndex = 0) {
    const name = pickEngine(cfg, qIndex);
    const engine = window.MR.Engines[name];
    if (!engine) throw new Error("mixed: missing engine " + name);
    const inner = engine.generate((cfg.engineConfigs || {})[name] || {}, qIndex);
    return { ...inner, _engine: name };
  }

  function renderVisual(problem) {
    return window.MR.Engines[problem._engine].renderVisual(problem);
  }
  function hintFor(problem) {
    return window.MR.Engines[problem._engine].hintFor(problem);
  }
  function howTo() {
    return [
      { emoji: "🌈", line: "This is the Grand Mix! You'll see addition, subtraction, multiplication, and division all jumbled together." },
      { emoji: "👀", line: "Read carefully — look at the symbol to know which operation to do." },
      { emoji: "🦝", line: "You've learned all the strategies. Pick the one that helps you most for each problem." },
      { emoji: "💜", line: "Take your time. You've got this!" },
    ];
  }

  // Per-question engine-specific behavior
  window.MR.Engines.mixed = {
    generate, renderVisual, hintFor, howTo,
    get op() { return ""; },
    // For option rendering, delegate
    formatOption(opt) {
      // If it's a fraction-shaped object, delegate to fraction engine
      if (opt && typeof opt === "object" && "n" in opt && "d" in opt) {
        return window.MR.Engines.fraction.formatOption(opt);
      }
      return String(opt);
    },
    optionsEqual(a, b) {
      if (a && typeof a === "object" && "n" in a) return window.MR.Engines.fraction.optionsEqual(a, b);
      return a === b;
    },
  };
})();
