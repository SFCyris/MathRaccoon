/*!
 * ui/admin.js — Parent Admin page (#/admin and admin.html).
 *
 * Layout:
 *   [Sticky header]  title · Back · Save · Load
 *   [Tab nav]        Overview · Settings · Games · Chapters · Worksheets · Advanced
 *   [Tab content]    sections scoped to the active tab
 *
 * State (tab + module filter) lives in sessionStorage so it survives the
 * re-renders triggered by toggle clicks, but resets when the browser tab
 * closes — we don't want stale filters next time.
 */
(function () {
  const { h } = window.MR.Viz;
  const S = window.MR.Storage;
  const C = window.MR.Content;
  const R = window.MR.Router;
  const Settings = window.MR.Settings;
  const T = (k, v) => window.MR.Strings.t(k, v);

  // ---- UI state (persisted per session only) ----
  const SS_KEY = "mr-admin-ui";
  const STATE = { tab: "overview", moduleFilter: "all" };
  try {
    const saved = sessionStorage.getItem(SS_KEY);
    if (saved) Object.assign(STATE, JSON.parse(saved));
  } catch (e) {}
  function saveUIState() {
    try { sessionStorage.setItem(SS_KEY, JSON.stringify(STATE)); } catch (e) {}
  }

  function mountTo(node) {
    const screen = document.getElementById("screen");
    screen.innerHTML = "";
    screen.appendChild(node);
  }

  // Where the "Back" button should go. On admin.html we return to the app
  // entry point; inside the SPA hash route we return to the hub.
  function backTarget() {
    const path = (location.pathname || "").toLowerCase();
    if (path.endsWith("/admin.html") || path.endsWith("admin.html")) {
      return { href: "index.html" };
    }
    return { onclick: () => R.go(R.hubHash()) };
  }

  function showNote(msg, tone) {
    const el = document.getElementById("save-load-note");
    if (!el) return;
    el.textContent = msg || "";
    el.style.color = tone === "err" ? "#c0264b" : tone === "ok" ? "#2a8f4f" : "";
  }

  // ---------- Header (sticky, always visible) ----------
  function renderHeader(SL) {
    const back = backTarget();
    const backBtn = back.href
      ? h("a", { class: "btn btn-ghost", href: back.href }, T("admin.back"))
      : h("button", { class: "btn btn-ghost", onclick: back.onclick }, T("admin.back"));

    const saveBtn = SL ? h("button", {
      class: "btn btn-primary",
      title: "Download a backup of this profile",
      onclick: () => {
        try {
          const r = SL.exportToFile();
          if (r) showNote(`Saved ${r.filename}`, "ok");
        } catch (e) {
          showNote(`Save failed: ${e.message || e}`, "err");
        }
      },
    }, "💾 Save") : null;

    const fileInput = h("input", {
      type: "file",
      accept: "application/json,.json",
      style: "display:none",
      onchange: (e) => {
        const f = e.target.files && e.target.files[0];
        if (!f) return;
        if (!confirm(
          "Load a saved profile?\n\n" +
          "This will REPLACE the current progress, achievements, " +
          "journal, critters, friends, and settings in this browser. " +
          "Use Save first if you want to keep a copy."
        )) { e.target.value = ""; return; }
        SL.importFromFile(f).then((res) => {
          showNote(
            `Loaded ${res.written} entries${res.playerName ? ` for ${res.playerName}` : ""}. Reloading…`,
            "ok"
          );
          setTimeout(() => { location.reload(); }, 600);
        }).catch((err) => {
          showNote(`Load failed: ${err.message || err}`, "err");
          e.target.value = "";
        });
      },
    });
    const loadBtn = SL ? h("button", {
      class: "btn btn-ghost",
      title: "Restore a profile from a backup file",
      onclick: () => fileInput.click(),
    }, "📂 Load") : null;

    return h("div", { class: "admin-sticky-header" }, [
      h("div", { class: "admin-header-row" }, [
        h("div", {}, [
          h("h1", { class: "admin-title" }, `🛠 ${T("admin.title")}`),
          h("p", { class: "admin-subtitle" }, T("admin.subtitle")),
        ]),
        h("div", { class: "admin-header-actions" },
          [backBtn, saveBtn, loadBtn, fileInput].filter(Boolean)),
      ]),
      h("div", { id: "save-load-note", class: "admin-note" }, ""),
    ]);
  }

  // ---------- Tab nav ----------
  const TABS = [
    { id: "overview",   label: "Overview",    icon: "🏠" },
    { id: "settings",   label: "Settings",    icon: "⚙️" },
    { id: "games",      label: "Games",       icon: "🎮" },
    { id: "chapters",   label: "Chapters",    icon: "📚" },
    { id: "worksheets", label: "Worksheets",  icon: "🖨" },
    { id: "advanced",   label: "Advanced",    icon: "⚠️" },
  ];
  function renderTabs() {
    return h("div", { class: "admin-nav", role: "tablist" },
      TABS.map((t) => h("button", {
        class: "admin-nav-btn" + (STATE.tab === t.id ? " active" : ""),
        role: "tab",
        "aria-selected": STATE.tab === t.id ? "true" : "false",
        onclick: () => {
          STATE.tab = t.id;
          saveUIState();
          render();
          // Scroll content into view so the user sees the new tab's body.
          try { window.scrollTo({ top: 0, behavior: "smooth" }); } catch (e) {}
        },
      }, [
        h("span", { "aria-hidden": "true" }, t.icon),
        h("span", {}, t.label),
      ]))
    );
  }

  // ---------- Module filter chips (shared across Games / Chapters / Worksheets) ----------
  function renderModuleFilter() {
    const modules = C.allModules();
    const chips = [
      h("button", {
        class: "module-filter-btn" + (STATE.moduleFilter === "all" ? " active" : ""),
        onclick: () => { STATE.moduleFilter = "all"; saveUIState(); render(); },
      }, "All"),
    ];
    modules.forEach((m) => {
      chips.push(h("button", {
        class: "module-filter-btn" + (STATE.moduleFilter === m.id ? " active" : ""),
        onclick: () => { STATE.moduleFilter = m.id; saveUIState(); render(); },
      }, `${m.emoji || "📘"} ${m.title}`));
    });
    return h("div", { class: "module-filter", role: "group", "aria-label": "Filter by module" }, chips);
  }
  function filteredModules() {
    const all = C.allModules();
    if (STATE.moduleFilter === "all") return all;
    return all.filter((m) => m.id === STATE.moduleFilter);
  }

  // ---------- Overview tab ----------
  function renderOverview() {
    const cur = S.getSettings();
    const totals = S.getTotals();
    const pct = totals.total > 0 ? Math.round((totals.correct / totals.total) * 100) : 0;

    const moduleStats = C.allModules().map((m) => {
      const chs = C.chaptersForModule(m.id) || [];
      const done = chs.filter((c) => S.isChapterComplete(c.id)).length;
      return { ...m, totalChapters: chs.length, doneChapters: done };
    });

    const stats = [
      { value: totals.correct, label: "Correct answers" },
      { value: pct + "%",      label: `of ${totals.total} tried` },
      { value: totals.runs,    label: "Rounds played" },
      { value: totals.chapters,     label: "Chapters done" },
      { value: totals.achievements, label: "🏆 Trophies" },
      { value: totals.critters,     label: "🐾 Critters" },
      { value: totals.friends,      label: "🤗 Friends" },
      { value: totals.journal,      label: "📝 Journal" },
    ];

    const hello = cur.playerName ? `👋 Welcome, ${cur.playerName}` : "👋 Welcome";

    return h("div", { role: "tabpanel" }, [
      h("section", { class: "card admin-section" }, [
        h("h2", {}, hello),
        h("p", { class: "hint" },
          "Snapshot of your child's progress. Use the tabs above for detailed controls."),
        h("div", { class: "stat-grid" }, stats.map((s) => h("div", { class: "stat-card" }, [
          h("div", { class: "stat-value" }, String(s.value)),
          h("div", { class: "stat-label" }, s.label),
        ]))),
      ]),

      h("section", { class: "card admin-section" }, [
        h("h2", {}, "📚 Module progress"),
        h("div", { class: "module-progress-grid" }, moduleStats.map((m) => {
          const p = m.totalChapters > 0 ? m.doneChapters / m.totalChapters : 0;
          return h("div", { class: "module-progress-card" }, [
            h("div", { class: "module-pc-title" }, `${m.emoji || "📘"} ${m.title}`),
            h("div", { class: "module-pc-bar" }, [
              h("div", {
                class: "module-pc-fill",
                style: `width:${Math.round(p * 100)}%;background:${m.accent || "#ff7a93"}`,
              }),
            ]),
            h("div", { class: "module-pc-stat" },
              m.totalChapters ? `${m.doneChapters} / ${m.totalChapters} chapters` : "No chapters yet"),
          ]);
        })),
      ]),

      h("section", { class: "card admin-section" }, [
        h("h2", {}, "⚡ Quick toggles"),
        h("p", { class: "hint" }, "Most-used switches. Full controls live in Settings."),
        h("div", { class: "toggle-row" }, [
          h("div", {}, [
            h("label", {}, T("admin.calm.label")),
            h("div", { class: "hint" }, T("admin.calm.hint")),
          ]),
          h("button", {
            class: "admin-pill " + (cur.calmMode ? "on" : "off"),
            onclick: () => { Settings.toggleCalm(); render(); },
          }, cur.calmMode ? "ON" : "OFF"),
        ]),
        h("div", { class: "toggle-row" }, [
          h("div", {}, [
            h("label", {}, T("admin.music.label")),
            h("div", { class: "hint" }, "Background music in games."),
          ]),
          h("button", {
            class: "admin-pill " + (cur.musicOn ? "on" : "off"),
            onclick: () => { Settings.set({ musicOn: !cur.musicOn }); render(); },
          }, cur.musicOn ? "ON" : "OFF"),
        ]),
        h("div", { class: "toggle-row" }, [
          h("div", {}, [
            h("label", {}, T("admin.voice.label")),
            h("div", { class: "hint" }, "Read prompts and feedback aloud."),
          ]),
          h("button", {
            class: "admin-pill " + (cur.voiceOn ? "on" : "off"),
            onclick: () => { Settings.set({ voiceOn: !cur.voiceOn }); render(); },
          }, cur.voiceOn ? "ON" : "OFF"),
        ]),
      ]),
    ]);
  }

  // ---------- Settings tab ----------
  function renderSettings() {
    const cur = S.getSettings();

    const nameInput = h("input", {
      type: "text", value: cur.playerName || "",
      maxlength: 24,
      class: "admin-input",
      "aria-label": T("admin.name.label"),
    });
    const saveName = h("button", {
      class: "btn btn-primary",
      onclick: () => {
        const v = (nameInput.value || "").trim();
        if (v) { Settings.set({ playerName: v }); render(); }
      },
    }, T("admin.name.save"));

    const volRange = h("input", {
      type: "range", min: "0", max: "1", step: "0.05",
      value: String(cur.volume || 0.4),
      oninput: (e) => {
        Settings.set({ volume: parseFloat(e.target.value) });
        const out = document.getElementById("volume-readout");
        if (out) out.textContent = Math.round(e.target.value * 100) + "%";
      },
      "aria-label": T("admin.volume"),
    });

    return h("div", { role: "tabpanel" }, [
      // Name
      h("section", { class: "card admin-section" }, [
        h("h2", {}, "👤 " + T("admin.name.label")),
        h("p", { class: "hint" }, T("admin.name.hint")),
        h("div", { class: "row-inline" }, [nameInput, saveName]),
      ]),

      // Accessibility
      h("section", { class: "card admin-section" }, [
        h("h2", {}, "♿ " + T("admin.a11y.title")),
        h("div", { class: "toggle-row" }, [
          h("div", {}, [
            h("label", {}, T("admin.calm.label")),
            h("div", { class: "hint" }, T("admin.calm.hint")),
          ]),
          h("button", {
            class: "admin-pill " + (cur.calmMode ? "on" : "off"),
            onclick: () => { Settings.toggleCalm(); render(); },
          }, cur.calmMode ? "ON" : "OFF"),
        ]),
        h("div", { class: "toggle-row" }, [
          h("div", {}, [
            h("label", {}, T("admin.hc.label")),
            h("div", { class: "hint" }, T("admin.hc.hint")),
          ]),
          h("button", {
            class: "admin-pill " + (cur.highContrast ? "on" : "off"),
            onclick: () => { Settings.toggleHighContrast(); render(); },
          }, cur.highContrast ? "ON" : "OFF"),
        ]),
      ]),

      // Audio
      h("section", { class: "card admin-section" }, [
        h("h2", {}, "🔊 " + T("admin.audio.title")),
        h("div", { class: "toggle-row" }, [
          h("label", {}, T("admin.music.label")),
          h("button", {
            class: "admin-pill " + (cur.musicOn ? "on" : "off"),
            onclick: () => { Settings.set({ musicOn: !cur.musicOn }); render(); },
          }, cur.musicOn ? "ON" : "OFF"),
        ]),
        h("div", { class: "toggle-row" }, [
          h("label", {}, T("admin.voice.label")),
          h("button", {
            class: "admin-pill " + (cur.voiceOn ? "on" : "off"),
            onclick: () => { Settings.set({ voiceOn: !cur.voiceOn }); render(); },
          }, cur.voiceOn ? "ON" : "OFF"),
        ]),
        h("div", { class: "toggle-row" }, [
          h("label", {}, T("admin.volume")),
          h("div", { class: "volume-slider-wrap" }, [
            volRange,
            h("span", { id: "volume-readout", class: "admin-pill on" },
              Math.round((cur.volume || 0.4) * 100) + "%"),
          ]),
        ]),
      ]),
    ]);
  }

  // ---------- Games tab ----------
  function renderGames() {
    const modules = filteredModules();
    const sections = [];

    modules.forEach((m) => {
      const games = C.gamesForModule(m.id) || [];
      if (!games.length) return;
      const rows = games.map((g) => {
        const enabled = S.isGameEnabled(g.id);
        const forced  = S.isForceUnlocked(g.id);
        const prog    = S.getProgress(g.id);
        const passed  = S.hasPassed(g.id);
        const statusHint = passed
          ? "✓ Passed"
          : prog.runs
            ? `${prog.runs} run${prog.runs === 1 ? "" : "s"}`
            : "Not played";
        return h("tr", {}, [
          h("td", {}, [
            h("strong", {}, `${g.emoji || "🎮"} ${g.title}`),
            h("div", { class: "hint" }, statusHint),
          ]),
          h("td", {}, [
            h("button", {
              class: "admin-pill " + (enabled ? "on" : "off"),
              title: enabled ? "Click to hide this game from the hub" : "Click to show this game",
              onclick: () => { S.setGameEnabled(g.id, !enabled); render(); },
            }, enabled ? "Enabled" : "Disabled"),
          ]),
          h("td", {}, [
            h("button", {
              class: "admin-pill " + (forced ? "on" : "off"),
              title: forced ? "Click to require normal unlock" : "Click to force-unlock (for testing)",
              onclick: () => { S.forceUnlock(g.id, !forced); render(); },
            }, forced ? "Force-unlocked" : "Normal gate"),
          ]),
          h("td", {}, [
            h("button", {
              class: "admin-pill warn",
              onclick: () => { if (confirm(`Reset progress for "${g.title}"?`)) { S.resetGame(g.id); render(); } },
            }, "Reset"),
          ]),
        ]);
      });
      sections.push(h("section", { class: "card admin-section" }, [
        h("h2", {}, `${m.emoji || "📘"} ${m.title}`),
        h("table", { class: "admin-table" }, [
          h("thead", {}, [h("tr", {}, [
            h("th", {}, "Game"),
            h("th", {}, "On/off"),
            h("th", {}, "Unlock"),
            h("th", {}, "Reset"),
          ])]),
          h("tbody", {}, rows),
        ]),
      ]));
    });

    return h("div", { role: "tabpanel" }, [
      h("p", { class: "admin-tab-hint" },
        "Enable or disable games in the hub, force-unlock for testing, or reset an individual game's stats."),
      renderModuleFilter(),
      ...(sections.length ? sections : [h("div", { class: "admin-empty" }, "No games in this module.")]),
    ]);
  }

  // ---------- Chapters tab ----------
  function renderChapters() {
    const modules = filteredModules();
    const sections = [];

    modules.forEach((m) => {
      const chs = C.chaptersForModule(m.id) || [];
      if (!chs.length) return;
      const rows = chs.map((c) => {
        const forced = S.isChapterForceUnlocked(c.id);
        const done   = S.isChapterComplete(c.id);
        return h("tr", {}, [
          h("td", {}, [h("strong", {}, `${c.emoji || "📖"} ${c.title}`)]),
          h("td", {},
            done
              ? h("span", { class: "admin-pill on" }, "✓ Done")
              : h("span", { class: "hint" }, "—")),
          h("td", {}, [
            h("button", {
              class: "admin-pill " + (forced ? "on" : "off"),
              onclick: () => { S.forceChapter(c.id, !forced); render(); },
            }, forced ? "Force-unlocked" : "Normal"),
          ]),
          h("td", {}, [
            h("button", {
              class: "admin-pill warn",
              onclick: () => { if (confirm(`Reset chapter "${c.title}"?`)) {
                S.resetGame(c.id);
                // Also drop it from the completed-chapters list.
                const list = S.getChapters().filter((x) => x !== c.id);
                localStorage.setItem("mathRaccoon::v2:chapters", JSON.stringify(list));
                render();
              } },
            }, "Reset"),
          ]),
        ]);
      });
      sections.push(h("section", { class: "card admin-section" }, [
        h("h2", {}, `${m.emoji || "📘"} ${m.title}`),
        h("table", { class: "admin-table" }, [
          h("thead", {}, [h("tr", {}, [
            h("th", {}, "Chapter"),
            h("th", {}, "Status"),
            h("th", {}, "Unlock"),
            h("th", {}, "Reset"),
          ])]),
          h("tbody", {}, rows),
        ]),
      ]));
    });

    return h("div", { role: "tabpanel" }, [
      h("p", { class: "admin-tab-hint" },
        "See which story chapters are done, force-unlock a chapter, or reset its progress."),
      renderModuleFilter(),
      ...(sections.length ? sections : [h("div", { class: "admin-empty" }, "No chapters in this module.")]),
    ]);
  }

  // ---------- Worksheets tab ----------
  function renderWorksheets() {
    const modules = filteredModules();
    const sections = [];

    modules.forEach((m) => {
      const games = C.gamesForModule(m.id) || [];
      if (!games.length) return;
      const rows = games.map((g) => {
        const countInput = h("input", {
          type: "number", min: "4", max: "40", step: "2", value: "12",
          class: "ws-count-input",
          "aria-label": `Number of questions for ${g.title}`,
        });
        const printBtn = h("button", {
          class: "btn btn-primary btn-small",
          onclick: () => {
            const n = parseInt(countInput.value, 10) || 12;
            if (window.MR.Worksheet) window.MR.Worksheet.open(g.id, { count: n });
          },
        }, "🖨 Print");
        return h("tr", {}, [
          h("td", {}, [h("strong", {}, `${g.emoji || "🎮"} ${g.title}`)]),
          h("td", {}, [countInput]),
          h("td", {}, [printBtn]),
        ]);
      });
      sections.push(h("section", { class: "card admin-section" }, [
        h("h2", {}, `${m.emoji || "📘"} ${m.title}`),
        h("table", { class: "admin-table" }, [
          h("thead", {}, [h("tr", {}, [
            h("th", {}, "Game"),
            h("th", {}, "# Questions"),
            h("th", {}, "Print"),
          ])]),
          h("tbody", {}, rows),
        ]),
      ]));
    });

    return h("div", { role: "tabpanel" }, [
      h("p", { class: "admin-tab-hint" },
        "Generate a paper worksheet for any game. Opens a print-ready window with an answer key at the bottom."),
      renderModuleFilter(),
      ...(sections.length ? sections : [h("div", { class: "admin-empty" }, "No games in this module.")]),
    ]);
  }

  // ---------- Advanced tab ----------
  function renderAdvanced() {
    return h("div", { role: "tabpanel" }, [
      h("section", { class: "card admin-section admin-danger-card" }, [
        h("h2", {}, "⚠️ " + T("admin.reset.title")),
        h("p", { class: "hint" },
          "Erase progress, achievements, chapters, journal, critters, and friends. " +
          "Settings (name, audio, accessibility) are kept. This cannot be undone — " +
          "use Save in the header first if you might want to restore later."),
        h("button", {
          class: "btn btn-danger",
          onclick: () => { if (confirm(T("admin.reset.confirm"))) { S.resetAll(); render(); } },
        }, T("admin.reset.all")),
      ]),
    ]);
  }

  // ---------- Main render ----------
  const TAB_RENDERERS = {
    overview:   renderOverview,
    settings:   renderSettings,
    games:      renderGames,
    chapters:   renderChapters,
    worksheets: renderWorksheets,
    advanced:   renderAdvanced,
  };

  function render() {
    const SL = window.MR.SaveLoad;
    const body = (TAB_RENDERERS[STATE.tab] || renderOverview)();
    mountTo(h("div", { class: "screen" }, [
      renderHeader(SL),
      renderTabs(),
      body,
    ]));
  }

  window.MR = window.MR || {};
  window.MR.Admin = { render };
})();
