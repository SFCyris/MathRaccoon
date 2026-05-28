/*!
 * viz/registry.js — JSON-to-DOM visualization lookup.
 *
 *   MR.Viz.register("factFamily", (params) => HTMLElement)
 *   MR.Viz.render({ type: "factFamily", params: {...} }) → HTMLElement or null
 */
(function () {
  const registry = {};

  function h(tag, attrs = {}, children = []) {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === "class") el.className = v;
      else if (k === "onclick") el.addEventListener("click", v);
      else if (k.startsWith("data-")) el.setAttribute(k, v);
      else el[k] = v;
    }
    for (const c of (Array.isArray(children) ? children : [children])) {
      if (c == null) continue;
      el.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    }
    return el;
  }

  const Viz = {
    h,
    register(type, fn) {
      if (registry[type]) console.warn("overwriting viz type", type);
      registry[type] = fn;
    },
    render(spec) {
      if (!spec || !spec.type) return null;
      const fn = registry[spec.type];
      if (!fn) {
        // Surface unknown viz types VISIBLY so the lesson author can see
        // they typo'd. Silent return-null hides the typo and ships broken
        // lessons. The error box has a distinct red look so it can't be
        // confused with intentional content.
        console.error("unknown viz type:", spec.type, spec);
        const err = document.createElement("div");
        err.className = "teach-viz teach-viz-error";
        err.setAttribute("role", "alert");
        err.style.cssText =
          "background:#ff7a93;color:#fff;padding:10px 14px;margin:8px 0;" +
          "border-radius:8px;font-family:Fredoka,sans-serif;font-weight:700;";
        err.textContent = `⚠ Unknown viz type: "${spec.type}"`;
        return err;
      }
      try {
        return fn(spec.params || {});
      } catch (e) {
        // Don't let a bad viz crash the whole lesson — surface it as an
        // error box and keep going.
        console.error("viz render failed:", spec.type, e);
        const err = document.createElement("div");
        err.className = "teach-viz teach-viz-error";
        err.setAttribute("role", "alert");
        err.style.cssText =
          "background:#ff7a93;color:#fff;padding:10px 14px;margin:8px 0;" +
          "border-radius:8px;font-family:Fredoka,sans-serif;font-weight:700;";
        err.textContent = `⚠ Viz "${spec.type}" crashed: ${e.message}`;
        return err;
      }
    },
    has(type) { return !!registry[type]; },
  };

  window.MR = window.MR || {};
  window.MR.Viz = Viz;
})();
