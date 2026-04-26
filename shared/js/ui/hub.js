/*!
 * ui/hub.js — renders the hub (4 module tiles) and module home screens.
 */
(function () {
  const { h } = window.MR.Viz;
  const C = window.MR.Content;
  const S = window.MR.Storage;
  const P = window.MR.Progress;
  const R = window.MR.Router;
  const T = (k, v) => window.MR.Strings.t(k, v);

  function mount(node) {
    const app = document.getElementById("app");
    const screen = document.getElementById("screen");
    screen.innerHTML = "";
    screen.appendChild(node);
  }

  function timeGreeting() {
    const hr = new Date().getHours();
    if (hr < 12) return { emoji: "🌤", phrase: "Good morning" };
    if (hr < 18) return { emoji: "☀️", phrase: "Good afternoon" };
    return { emoji: "🌙", phrase: "Good evening" };
  }

  // ---- Hub ----
  function renderHub() {
    const name = S.getSettings().playerName || "friend";
    const modules = C.allModules();

    const greet = timeGreeting();
    const raccoonSvg = (window.MR.Raccoon && window.MR.Raccoon.render)
      ? window.MR.Raccoon.render("wave", { size: 110 })
      : "🦝";
    const greetCard = h("div", { class: "hub-greet card" });
    greetCard.innerHTML = `
      <div class="greet-raccoon">${raccoonSvg}</div>
      <div class="greet-bubble">
        ${greet.emoji} <strong>${greet.phrase}, <span class="greet-name">${name}</span>!</strong>
        I'm Math Raccoon. Pick a book and let's have fun learning together! 💜
      </div>`;

    const children = [greetCard];

    if (!S.hasSeenDailyToday() && !S.getSettings().calmMode) {
      const d = S.getDaily();
      const streak = d.streak || 0;
      const banner = h("div", { class: "daily-banner" });
      banner.innerHTML = `
        <div class="db-left">
          <span class="db-icon mr-raccoon">🦝</span>
          <div>
            <div class="db-title">Daily Raccoon Visit</div>
            <div class="db-sub">${streak >= 1
              ? `You're on a 🔥 ${streak}-day streak — one quick question to keep it going!`
              : `Math Raccoon has one quick question for you today.`}</div>
          </div>
        </div>
        <button class="btn btn-primary db-start" type="button">Start →</button>`;
      banner.querySelector(".db-start").onclick = () => {
        if (window.MR.DailyVisit && window.MR.DailyVisit.show) {
          window.MR.DailyVisit.show(() => renderHub());
        }
      };
      children.push(banner);
    }

    // ---- Daily Challenge card ----
    const DC = window.MR.DailyChallenge;
    if (DC) {
      const game = DC.todaysGame();
      if (game) {
        const cStreak = DC.streak();
        const done    = DC.isTodayDone();
        const mod     = C.getModule(game.moduleId);
        const modTitle = mod ? mod.title : "Practice";
        const accent = game.accent || (mod && mod.accent) || "#ff7a93";
        const card = h("div", {
          class: "daily-challenge-card card" + (done ? " is-done" : ""),
          style: `--dc-accent:${accent};`,
        });
        const actionLabel = done ? "✓ Done today" : "Start →";
        const actionCls   = done ? "btn btn-ghost dc-go" : "btn btn-primary dc-go";
        const streakLine  = cStreak >= 1
          ? `🔥 ${cStreak}-day streak${done ? " — see you tomorrow!" : " — keep it going!"}`
          : (done ? "First day on the board!" : "Start your streak today.");
        card.innerHTML = `
          <div class="dc-head">
            <span class="dc-icon">🎯</span>
            <div class="dc-title">Daily Challenge</div>
            <span class="dc-streak" title="Consecutive days">🔥 ${cStreak}</span>
          </div>
          <div class="dc-body">
            <span class="dc-emoji">${game.emoji || "🎮"}</span>
            <div>
              <div class="dc-game">${game.title}</div>
              <div class="dc-sub">${modTitle} · ${game.description || "Quick 5-question round"}</div>
              <div class="dc-streak-line">${streakLine}</div>
            </div>
            <button type="button" class="${actionCls}">${actionLabel}</button>
          </div>`;
        const btn = card.querySelector(".dc-go");
        btn.onclick = () => {
          if (done) return;
          R.go(R.arcadeHash(game.moduleId, game.id));
        };
        children.push(card);
      }
    }

    const header = h("div", { class: "hub-header card" }, [
      h("h1", {}, T("hub.title")),
      h("p", { style: "margin:6px 0 0;color:var(--c-ink-soft)" },
        T("hub.subtitle", { name })),
    ]);
    children.push(header);

    function makeTile(m) {
      const prog = P.moduleProgress(m.id);
      const pct = Math.round(prog.pct * 100);
      const isStub = m.status === "stub";
      return h("button", {
        class: "tile",
        style: `--tile-accent: ${m.accent}; --progress-color: ${m.accent};`,
        onclick: () => R.go(R.moduleHash(m.id)),
      }, [
        h("div", { class: "tile-emoji" }, m.emoji),
        h("div", { class: "tile-title" }, m.title),
        h("div", { class: "tile-sub" }, m.subtitle || m.grade),
        isStub
          ? h("div", { class: "tile-sub", style: "margin-top:10px;font-style:italic" }, T("hub.tile.stub"))
          : h("div", { class: "tile-bar" }, [
              h("div", { class: "progress" }, [
                h("span", { style: `width:${pct}%` }),
              ]),
              h("div", { class: "tile-sub", style: "margin-top:6px" },
                T("hub.tile.progress", { done: prog.completed, total: prog.total })),
            ]),
      ]);
    }

    const SECTION_META = {
      math:    { title: "Math Raccoon",            emoji: "🦝", sub: "Numbers, shapes & measurement" },
      reading: { title: "Reading Raccoon's Visit", emoji: "📚", sub: "Words, stories & meaning" },
    };
    const ORDER = ["math", "reading"];

    const bySection = {};
    modules.forEach((m) => {
      const key = m.section || "math";
      (bySection[key] = bySection[key] || []).push(m);
    });

    ORDER.forEach((key) => {
      const list = bySection[key];
      if (!list || !list.length) return;
      const meta = SECTION_META[key] || { title: key, emoji: "", sub: "" };
      // Mirror + grow the raccoon when this is the math section header.
      // Other section emojis (📚 etc.) render normally.
      const sectionEmojiClass = "hub-section-emoji" + (meta.emoji === "🦝" ? " mr-raccoon" : "");
      const heading = h("div", { class: "hub-section-heading" }, [
        h("span", { class: sectionEmojiClass }, meta.emoji),
        h("div", { class: "hub-section-text" }, [
          h("h2", { class: "hub-section-title" }, meta.title),
          h("p",  { class: "hub-section-sub" },  meta.sub),
        ]),
      ]);
      const grid = h("div", { class: "hub-grid" }, list.map(makeTile));
      children.push(heading);
      children.push(grid);
    });
    // Any leftover sections not in ORDER
    Object.keys(bySection).forEach((key) => {
      if (ORDER.includes(key)) return;
      const list = bySection[key];
      const grid = h("div", { class: "hub-grid" }, list.map(makeTile));
      children.push(grid);
    });
    const wrap = h("div", { class: "screen" }, children);
    mount(wrap);
  }

  // ---- Module home ----
  function cleanChapterTitle(t) {
    if (!t) return "";
    return String(t).replace(/^Ch\.\s*\d+\s*[—\-:]\s*/i, "").trim();
  }

  function interp(text) {
    const name = S.getSettings().playerName || "friend";
    return String(text || "").replace(/\{(\w+)\}/g, (m, k) =>
      k === "NAME" || k === "name" ? name : m
    );
  }

  function firstDialogue(lines) {
    if (!lines || !lines.length) return "";
    const dialog = lines.find((l) => l.speaker && l.speaker !== "narrator");
    const pick = dialog || lines[0];
    return interp(pick.text || "");
  }

  function renderStoryNode({ moduleId, item, kind, fallbackAccent }) {
    const unlocked = kind === "arcade"
      ? P.gameUnlocked(item.id)
      : P.chapterUnlocked(item.id);
    const done = kind === "arcade"
      ? S.hasPassed(item.id)
      : S.isChapterComplete(item.id);
    const prog = S.getProgress(item.id);
    const acc  = prog.bestRoundPct ? Math.round(prog.bestRoundPct * 100) : 0;
    const accent = item.accent || fallbackAccent;

    const badge = done ? "✨ Done" : (unlocked ? "Play!" : "🔒 Locked");
    const statusCls = done ? "done" : (unlocked ? "open" : "locked");
    const chipLabel = kind === "arcade"
      ? "Arcade"
      : (item.order != null ? `Ch. ${item.order}` : "Chapter");
    const displayTitle = kind === "arcade" ? item.title : cleanChapterTitle(item.title);
    const desc = interp(item.description
      || (kind === "chapter" && item.narrative ? firstDialogue(item.narrative.intro) : ""));

    const hash = kind === "arcade"
      ? R.arcadeHash(moduleId, item.id)
      : R.chapterHash(moduleId, item.id);

    const children = [
      h("div", { class: "story-chip" }, chipLabel),
      h("span", { class: "story-emoji" }, item.emoji || (kind === "arcade" ? "🎮" : "📖")),
      h("div", { class: "story-title" }, displayTitle),
      desc ? h("div", { class: "story-desc" }, desc) : h("div", { class: "story-desc" }, ""),
      h("div", { class: "story-meta" }, [
        h("span", { class: "story-badge" }, badge),
        acc ? h("span", { class: "story-pct" }, `Best ${acc}%`) : null,
      ]),
    ];

    return h("button", {
      class: `story-node ${statusCls}`,
      style: `--card-accent:${accent};`,
      "aria-disabled": unlocked ? "false" : "true",
      onclick: () => { if (unlocked) R.go(hash); },
    }, children);
  }

  function renderModule({ moduleId }) {
    const m = C.getModule(moduleId);
    if (!m) { R.go(R.hubHash()); return; }

    const back = h("button", { class: "hero-back", onclick: () => R.go(R.hubHash()) }, [
      h("span", { class: "hero-back-arrow", "aria-hidden": "true" }, "←"),
      h("span", {}, "Back"),
    ]);

    const badge = h("div", { class: "hero-badge", "aria-hidden": "true" }, [
      h("span", { class: "hero-badge-glow" }),
      h("span", { class: "hero-emoji" }, m.emoji),
      h("span", { class: "hero-spark spark-1" }, "✦"),
      h("span", { class: "hero-spark spark-2" }, "✧"),
      h("span", { class: "hero-spark spark-3" }, "✦"),
    ]);

    const prog = P.moduleProgress(moduleId);
    const pct = Math.round(prog.pct * 100);
    const ring = prog.total > 0
      ? h("div", {
          class: "hero-ring",
          title: `${prog.completed} of ${prog.total} chapters complete`,
        }, [
          h("div", { class: "hero-ring-dial", style: `--ring-pct:${pct}` }, [
            h("span", { class: "hero-ring-num" }, `${prog.completed}/${prog.total}`),
          ]),
          h("div", { class: "hero-ring-label" }, pct >= 100 ? "Complete" : "Progress"),
        ])
      : h("div", { class: "hero-ring-placeholder", "aria-hidden": "true" });

    const header = h("div", {
      class: "module-hero",
      style: `--hero-accent:${m.accent};`,
    }, [
      h("div", { class: "hero-slot hero-left" }, [back]),
      h("div", { class: "hero-slot hero-center" }, [
        badge,
        h("h1", { class: "hero-title" }, m.title),
        m.subtitle ? h("p", { class: "hero-subtitle" }, m.subtitle) : null,
      ]),
      h("div", { class: "hero-slot hero-right" }, [ring]),
    ]);

    // ---- Build tab panes ----
    const games = C.gamesForModule(moduleId);
    const chapters = C.chaptersForModule(moduleId);
    const ops = C.opsForModule(moduleId);

    function renderArcadePane() {
      if (!games.length) {
        return h("div", { class: "learn-empty" }, [
          h("div", { class: "learn-emoji" }, "🎮"),
          h("h2", { class: "learn-title" }, "Arcade coming soon"),
          h("p", { class: "learn-sub" }, "Quick warm-up rounds will land here."),
        ]);
      }
      const nodes = games.map((g) =>
        renderStoryNode({ moduleId, item: g, kind: "arcade", fallbackAccent: m.accent })
      );
      return h("div", { class: "pane-section" }, [
        h("p", { class: "pane-hint" },
          "Warm up with quick rounds — no story, just math."),
        h("section", { class: "story-map" }, nodes),
      ]);
    }

    function renderAdventurePane() {
      if (!chapters.length) {
        return h("div", { class: "learn-empty" }, [
          h("div", { class: "learn-emoji" }, "📖"),
          h("h2", { class: "learn-title" }, "Adventure coming soon"),
          h("p", { class: "learn-sub" }, "Story chapters will be added as the book grows."),
        ]);
      }
      const nodes = chapters.map((c) =>
        renderStoryNode({ moduleId, item: c, kind: "chapter", fallbackAccent: m.accent })
      );
      return h("div", { class: "pane-section" }, [
        h("p", { class: "pane-hint" },
          "Step into the story — each chapter unlocks at 75% accuracy."),
        h("section", { class: "story-map" }, nodes),
      ]);
    }

    function renderLearnPane() {
      if (!ops.length) {
        return h("div", { class: "learn-empty" }, [
          h("div", { class: "learn-emoji" }, "📚"),
          h("h2", { class: "learn-title" }, T("module.learn.title")),
          h("p", { class: "learn-sub" }, T("module.learn.soon")),
        ]);
      }

      let completed = [];
      try {
        const raw = localStorage.getItem("mathRaccoon::v2:teach");
        completed = raw ? (JSON.parse(raw).completed || []) : [];
      } catch (e) { completed = []; }

      const cards = ops.map((op) => {
        const accent = op.accent || m.accent;
        const total = op.strategies.length;
        const done = op.strategies.filter((s) =>
          completed.includes(`${op.id}::${s.id}`)
        ).length;
        const status = done === 0
          ? "Not started"
          : done === total
            ? "✨ All done"
            : `${done}/${total} tried`;
        const ways = `${total} way${total === 1 ? "" : "s"}`;
        return h("button", {
          class: "teach-op-card",
          style: `--card-accent:${accent};`,
          onclick: () => R.go(R.teachHash(moduleId, op.id)),
        }, [
          h("span", { class: "teach-op-emoji" }, op.emoji || "🎓"),
          h("h3", { class: "teach-op-title" }, op.label),
          h("p", { class: "teach-op-tagline" }, op.tagline || ""),
          h("div", { class: "teach-op-meta" }, [
            h("span", { class: "teach-op-count" }, ways),
            h("span", { class: "teach-op-progress" }, status),
          ]),
        ]);
      });

      return h("div", { class: "pane-section teach-home-pane" }, [
        h("p", { class: "pane-hint" },
          "No scores, no timer — just Math Raccoon walking you through different ways to think about math. Pick a topic to explore."),
        h("div", { class: "teach-op-grid" }, cards),
        h("p", { class: "teach-footnote" },
          "💜 Every path is the right path. Try any way — the one that clicks is the right one for you."),
      ]);
    }

    const tabDefs = [
      { key: "arcade",    emoji: "🎮", label: T("module.tab.arcade"), render: renderArcadePane    },
      { key: "adventure", emoji: "📖", label: T("module.tab.story"),  render: renderAdventurePane },
      { key: "learn",     emoji: "📚", label: T("module.tab.learn"),  render: renderLearnPane     },
    ];

    // Default tab: arcade if present, otherwise adventure, otherwise learn
    let activeKey = games.length ? "arcade" : (chapters.length ? "adventure" : "learn");

    const paneMount = h("div", { class: "module-pane" });

    function tabBtn(def) {
      return h("button", {
        class: "module-tab" + (def.key === activeKey ? " active" : ""),
        onclick: () => {
          if (activeKey === def.key) return;
          activeKey = def.key;
          paneMount.innerHTML = "";
          paneMount.appendChild(def.render());
          Array.from(tabsRow.children).forEach((b, i) => {
            b.classList.toggle("active", tabDefs[i].key === activeKey);
          });
        },
      }, [
        h("span", { class: "tab-emoji", "aria-hidden": "true" }, def.emoji),
        h("span", {}, def.label),
      ]);
    }

    const tabsRow = h("div", { class: "module-tabs", role: "tablist" },
      tabDefs.map(tabBtn));
    const tabsWrap = h("div", {
      class: "module-tabs-wrap",
      style: `--hero-accent:${m.accent};`,
    }, [tabsRow]);

    paneMount.appendChild(tabDefs.find((d) => d.key === activeKey).render());

    if (m.status === "stub" && !games.length && !chapters.length && !ops.length) {
      mount(h("div", { class: "screen" }, [
        header,
        h("div", { class: "card" }, [h("p", {}, T("hub.tile.stub"))]),
      ]));
      return;
    }

    mount(h("div", { class: "screen" }, [header, tabsWrap, paneMount]));
  }

  window.MR = window.MR || {};
  window.MR.Hub = { renderHub, renderModule, mount };
})();
