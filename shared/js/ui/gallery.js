/*!
 * ui/gallery.js — tabbed rewards gallery (Trophies / Journal / Critters / Friends).
 *
 * Routes handled:
 *   #/rewards               → last-opened tab
 *   #/rewards/<tab>         → specific tab: trophies | journal | critters | friends
 */
(function () {
  const { h } = window.MR.Viz;
  const S = window.MR.Storage;
  const C = window.MR.Content;
  const R = window.MR.Router;
  const A = window.MR.Achievements;

  function mountTo(node) {
    const screen = document.getElementById("screen");
    screen.innerHTML = "";
    screen.appendChild(node);
  }

  // ---------- tab panes ----------
  function renderTrophiesPane() {
    const defs = A.all();
    const earned = new Set(S.getAchievements());
    const grid = h("div", { class: "trophy-grid" },
      defs.map((d) => {
        const have = earned.has(d.id);
        // Mirror + grow the raccoon emoji on the earned Critter Keeper
        // trophy. Other trophy icons (and the 🔒 locked state) render
        // normally — see .mr-raccoon in components.css.
        const emojiCls = "trophy-emoji" + (have && d.icon === "🦝" ? " mr-raccoon" : "");
        return h("div", {
          class: "trophy-tile " + (have ? "earned" : "locked"),
          title: d.hint,
        }, [
          h("div", { class: emojiCls }, have ? d.icon : "🔒"),
          h("div", { class: "trophy-name" }, have ? d.name : "???"),
          h("div", { class: "trophy-hint" }, d.hint),
        ]);
      })
    );
    return h("div", {}, [
      h("p", { class: "gallery-lead" },
        `You've earned ${earned.size} of ${defs.length} trophies.`),
      grid,
    ]);
  }

  function renderJournalPane() {
    const entries = C.allJournalEntries()
      .slice()
      .sort((a, b) => (a.chapterId || "").localeCompare(b.chapterId || ""));
    const liveIds = new Set(entries.map((e) => e.id));
    const unlocked = new Set(S.getJournal().filter((id) => liveIds.has(id)));

    // Group by module so the grid mirrors the Friends tab's visual rhythm.
    const modules = C.allModules();
    const groups = modules.map((m) => {
      const list = entries.filter((e) => e.moduleId === m.id);
      if (!list.length) return null;
      return h("section", { class: "journal-group" }, [
        h("h3", { class: "journal-group-title" }, [
          h("span", { class: "group-emoji" }, m.emoji || "📚"),
          h("span", {}, m.title),
        ]),
        h("div", { class: "journal-grid" }, list.map((e) => {
          const have = unlocked.has(e.id);
          return h("button", {
            class: "journal-tile " + (have ? "earned" : "locked"),
            style: `--card-accent:${e.accent};`,
            onclick: () => { if (have) openJournalPage(e); },
            title: have ? e.title : "Not yet unlocked",
          }, [
            h("div", { class: "journal-emoji-top" }, have ? e.emoji : "🔒"),
            h("div", { class: "journal-tile-label" }, moduleLabel(e.moduleId)),
            h("div", { class: "journal-tile-title" }, have ? e.title : "???"),
          ]);
        })),
      ]);
    }).filter(Boolean);

    return h("div", {}, [
      h("p", { class: "gallery-lead" },
        `You've unlocked ${unlocked.size} of ${entries.length} journal pages.`),
      h("div", { class: "journal-groups" }, groups),
    ]);
  }

  function openJournalPage(entry) {
    const back = h("button", {
      class: "btn btn-ghost",
      onclick: () => renderRewards("journal"),
    }, "← Back to journal");
    const body = (entry.body || []).map((para) =>
      h("p", { class: "journal-para" }, para));
    const page = h("div", { class: "journal-page", style: `--card-accent:${entry.accent};` }, [
      h("div", { class: "journal-emoji" }, entry.emoji),
      h("div", { class: "journal-title" }, entry.title),
      h("div", { class: "journal-body" }, body),
    ]);
    mountTo(h("div", { class: "screen" }, [
      h("div", { class: "gallery-header card" }, [back]),
      page,
    ]));
  }

  function renderCrittersPane() {
    const all = C.allCritters();
    const liveIds = new Set(all.map((c) => c.id));
    const earned = new Set(S.getCritters().filter((id) => liveIds.has(id)));
    const grid = h("div", { class: "critter-grid" },
      all.map((c) => {
        const have = earned.has(c.id);
        let art;
        if (have && window.MR.CritterSvg && window.MR.CritterSvg[c.svg]) {
          art = document.createElement("div");
          art.className = "critter-art";
          art.innerHTML = window.MR.CritterSvg[c.svg]();
        } else {
          art = h("div", { class: "critter-silhouette" }, "❓");
        }
        return h("div", { class: "critter-tile " + (have ? "earned" : "locked") }, [
          art,
          h("div", { class: "critter-name" }, have ? c.name : "???"),
          h("div", { class: "critter-caption" }, have ? c.caption : "Keep practicing!"),
        ]);
      })
    );
    return h("div", {}, [
      h("p", { class: "gallery-lead" },
        `You've met ${earned.size} of ${all.length} critters. One more appears every five correct answers.`),
      grid,
    ]);
  }

  function renderFriendsPane() {
    const all = C.allFriends();
    const liveIds = new Set(all.map((f) => f.id));
    const earned = new Set(S.getFriends().filter((id) => liveIds.has(id)));
    // Group by module
    const modules = C.allModules();
    const groups = modules.map((m) => {
      const list = all.filter((f) => f.moduleId === m.id);
      if (!list.length) return null;
      return h("section", { class: "friend-group" }, [
        h("h3", { class: "friend-group-title" },
          [h("span", { class: "group-emoji" }, m.emoji || "📚"),
           h("span", {}, m.title)]),
        h("div", { class: "friend-grid" }, list.map((f) => {
          const have = earned.has(f.id);
          return h("div", {
            class: "friend-tile " + (have ? "earned" : "locked"),
            style: `--card-accent:${f.accent};`,
            title: have ? f.caption : "",
          }, [
            h("div", { class: "friend-sticker" }, have ? f.emoji : "❓"),
            h("div", { class: "friend-name" }, have ? f.name : "???"),
            h("div", { class: "friend-caption" }, have ? f.caption : ""),
          ]);
        })),
      ]);
    }).filter(Boolean);
    return h("div", {}, [
      h("p", { class: "gallery-lead" },
        `You've made ${earned.size} of ${all.length} valley friends. Pass a chapter to meet a new one.`),
      h("div", { class: "friend-groups" }, groups),
    ]);
  }

  function moduleLabel(id) {
    const m = id && C.getModule(id);
    return m ? m.title : "Journal";
  }

  // ---------- shell ----------
  const TABS = [
    { key: "trophies", emoji: "🏆", label: "Trophies", render: renderTrophiesPane },
    { key: "journal",  emoji: "📝", label: "Journal",  render: renderJournalPane },
    { key: "critters", emoji: "🐾", label: "Critters", render: renderCrittersPane },
    { key: "friends",  emoji: "🤗", label: "Friends",  render: renderFriendsPane },
  ];

  function renderRewards(tab) {
    const active = TABS.find((t) => t.key === tab) || TABS[0];

    const back = h("button", { class: "btn btn-ghost", onclick: () => R.go(R.hubHash()) },
      "← Back to books");

    const totals = S.getTotals();
    const summary = h("div", { class: "rewards-summary" }, [
      chip("🏆", totals.achievements, "Trophies"),
      chip("📝", totals.journal,      "Journal"),
      chip("🐾", totals.critters,     "Critters"),
      chip("🤗", totals.friends,      "Friends"),
    ]);

    const paneMount = h("div", { class: "rewards-pane" });
    paneMount.appendChild(active.render());

    const header = h("div", { class: "gallery-header card" }, [
      back,
      h("h1", { style: "margin:10px 0 0" }, `${active.emoji} ${active.label}`),
      h("p", { class: "hint", style: "margin:6px 0 14px" },
        "Trophies you've earned, pages you've unlocked, critters you've met, and friends you've made."),
      summary,
    ]);

    mountTo(h("div", { class: "screen" }, [header, paneMount]));
  }

  function chip(emoji, count, label) {
    return h("div", { class: "summary-chip" }, [
      h("span", { class: "summary-emoji" }, emoji),
      h("span", { class: "summary-count" }, String(count)),
      h("span", { class: "summary-label" }, label),
    ]);
  }

  window.MR = window.MR || {};
  window.MR.Gallery = { render: renderRewards };
})();
