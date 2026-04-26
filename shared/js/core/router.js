/*!
 * router.js — hash-based routing that works on file://.
 *
 * Routes:
 *   (empty) | #/          → hub
 *   #/admin               → parent admin
 *   #/<module>            → module home
 *   #/<module>/chapter/<id>  → chapter narrative + runner
 *   #/<module>/arcade/<id>   → arcade game
 *   #/<module>/teach/<id>    → teaching corner
 */
(function () {
  const handlers = {
    hub:     null,
    admin:   null,
    module:  null,
    chapter: null,
    arcade:  null,
    teach:   null,
    rewards: null,
  };

  function parse() {
    const raw = (location.hash || "").replace(/^#\/?/, "");
    if (!raw) return { view: "hub" };
    const parts = raw.split("/").filter(Boolean);
    if (parts[0] === "admin") return { view: "admin" };
    if (parts[0] === "rewards") {
      const tab = parts[1] || "trophies";
      return { view: "rewards", tab };
    }
    const moduleId = parts[0];
    if (!parts[1]) return { view: "module", moduleId };
    const kind = parts[1];
    const id   = parts.slice(2).join("/");
    if (kind === "chapter" && id) return { view: "chapter", moduleId, id };
    if (kind === "arcade"  && id) return { view: "arcade",  moduleId, id };
    if (kind === "teach"   && id) return { view: "teach",   moduleId, id };
    return { view: "module", moduleId };
  }

  function dispatch() {
    const r = parse();
    const fn = handlers[r.view];
    if (fn) fn(r);
    else if (handlers.hub) handlers.hub();
  }

  function on(view, fn) { handlers[view] = fn; }

  function go(hash) {
    if (location.hash === hash) dispatch();
    else location.hash = hash;
  }

  window.addEventListener("hashchange", dispatch);

  const Router = {
    on, go, dispatch, parse,
    hubHash:     ()                  => "#/",
    adminHash:   ()                  => "#/admin",
    moduleHash:  (m)                 => `#/${m}`,
    chapterHash: (m, id)             => `#/${m}/chapter/${id}`,
    arcadeHash:  (m, id)             => `#/${m}/arcade/${id}`,
    teachHash:   (m, id)             => `#/${m}/teach/${id}`,
    rewardsHash: (tab)               => tab ? `#/rewards/${tab}` : "#/rewards",
  };

  window.MR = window.MR || {};
  window.MR.Router = Router;
})();
