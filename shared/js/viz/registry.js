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
      if (!fn) { console.warn("unknown viz type", spec.type); return null; }
      return fn(spec.params || {});
    },
    has(type) { return !!registry[type]; },
  };

  window.MR = window.MR || {};
  window.MR.Viz = Viz;
})();
