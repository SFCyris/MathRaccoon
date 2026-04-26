/*!
 * engines/mixed.js — round-robin over other engines for a final mixed review.
 *
 * engineConfig:
 *   engines: ["arithmetic", "fraction", "placeValue"]
 *   engineConfigs: { arithmetic: {...}, fraction: {...}, ... }
 *   arithmeticOps: ["+","-","×","÷"]  (optional, rotates arithmetic.op if engine === "arithmetic")
 */
(function () {
  const { pick } = window.MR.Engines.Util;

  function pickEngine(cfg, qIndex) {
    const list = cfg.engines || ["arithmetic"];
    return list[qIndex % list.length];
  }

  function resolveInner(cfg, engineKey, qIndex) {
    const engine = window.MR.Engines[engineKey];
    if (!engine) return null;
    const subCfg = Object.assign({}, (cfg.engineConfigs || {})[engineKey] || {});
    if (engineKey === "arithmetic") {
      const ops = cfg.arithmeticOps || ["+", "-", "×", "÷"];
      subCfg.op = subCfg.op || ops[qIndex % ops.length];
    }
    return { engine, subCfg };
  }

  function generate(cfg = {}, qIndex = 0) {
    const engineKey = pickEngine(cfg, qIndex);
    const resolved = resolveInner(cfg, engineKey, qIndex);
    if (!resolved) return { error: `missing engine: ${engineKey}` };
    const p = resolved.engine.generate(resolved.subCfg, qIndex);
    p._engineKey = engineKey;
    return p;
  }

  function renderPrompt(p) {
    const e = window.MR.Engines[p._engineKey];
    return e && e.renderPrompt ? e.renderPrompt(p) : "?";
  }
  function renderVisual(p) {
    const e = window.MR.Engines[p._engineKey];
    return e && e.renderVisual ? e.renderVisual(p) : "";
  }
  function hintFor(p) {
    const e = window.MR.Engines[p._engineKey];
    return e && e.hintFor ? e.hintFor(p) : "";
  }
  function formatOption(opt, p) {
    const e = window.MR.Engines[p && p._engineKey];
    return e && e.formatOption ? e.formatOption(opt, p) : String(opt);
  }
  function optionsEqual(a, b, p) {
    const e = window.MR.Engines[p && p._engineKey];
    return e && e.optionsEqual ? e.optionsEqual(a, b) : a === b;
  }

  window.MR = window.MR || {};
  window.MR.Engines = window.MR.Engines || {};
  window.MR.Engines.mixed = { generate, renderPrompt, renderVisual, hintFor, formatOption, optionsEqual };
})();
