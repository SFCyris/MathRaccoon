/*!
 * Math Raccoon Arcade — © 2026 S. F. Cyris
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Math Raccoon™, Reading Raccoon™, Art Raccoon™, Painter Raccoon™,
 * and Ava's Hidden Valley™ are unregistered common-law trademarks
 * of the author. See NOTICE.md — these marks are NOT licensed under Apache 2.0.
 *
 * Source: https://github.com/SFCyris/MathRaccoon
 */

/**
 * app.js — orchestrates the app.
 *
 * Routes:
 *  - "home"       : tabs (Arcade | Story) + game cards / story map
 *  - "game"       : run a selected game via its create() (or GameRunner)
 *  - "admin"      : parent controls (hash route #admin)
 *
 * Provides each game a clean api for progress/score/round bookkeeping.
 */
(function () {
  const { Storage, Achievements, Music, Raccoon, Animations, Games, Voice, Critters } = window.MR;

  const screenEl = document.getElementById("screen");
  const modalEl  = document.getElementById("modal");
  const modalBodyEl = document.getElementById("modal-body");

  let activeController = null;  // current game controller (if any)
  let activeGameId = null;      // current game id (used by help button)
  let activeTab = "arcade";     // "arcade" | "story"

  // ---------- friends roster (16 collectible critters) ----------
  const FRIENDS = [
    { id: "math-raccoon",   name: "Math Raccoon",    emoji: "🦝", color: "#c4b5fd" },
    { id: "rocky",          name: "Rocky",           emoji: "🪨", color: "#7dd3fc" },
    { id: "ricky",          name: "Ricky",           emoji: "🫐", color: "#ff7a93" },
    { id: "mice",           name: "Market Mice",     emoji: "🐭", color: "#ffd93d" },
    { id: "reading-raccoon",name: "Reading Raccoon", emoji: "📚", color: "#ffb077" },
    { id: "beavers",        name: "Beaver Bakers",   emoji: "🥧", color: "#c4b5fd" },
    { id: "owl",            name: "Professor Owl",   emoji: "🦉", color: "#a78bfa" },
    { id: "hedgehog",       name: "Tuck the Hedgehog",emoji:"🦔", color: "#7dd3fc" },
    { id: "fireflies",      name: "Firefly Troupe",  emoji: "✨", color: "#ff7a93" },
    { id: "puppies",        name: "Picnic Puppies",  emoji: "🐶", color: "#ffd93d" },
    { id: "kittens",        name: "Quilt Kittens",   emoji: "🐱", color: "#c4b5fd" },
    { id: "fox",            name: "Fair Fox",        emoji: "🦊", color: "#ffb077" },
    { id: "deer",            name: "Deer Clan",       emoji: "🦌", color: "#6ee7b7" },
    { id: "bear",           name: "Grandpa Bear",    emoji: "🐻", color: "#ffd93d" },
    { id: "star-sprite",    name: "Star Sprite",     emoji: "🌌", color: "#a78bfa" },
    { id: "valley-citizen", name: "Valley Citizen",  emoji: "🏅", color: "#ff7a93" },
  ];

  // ---------- small helper: substitute {NAME} in narrative text ----------
  function withName(text) {
    const settings = Storage.getSettings();
    const name = (settings.playerName || "Ava").trim() || "Ava";
    return String(text || "").replace(/\{NAME\}/g, name);
  }

  // ---------- time of day greeting ----------
  function timeOfDayGreeting() {
    const h = new Date().getHours();
    if (h < 12)  return { word: "Good morning",   emoji: "🌅" };
    if (h < 17)  return { word: "Good afternoon", emoji: "☀️" };
    if (h < 21)  return { word: "Good evening",   emoji: "🌆" };
    return        { word: "Sweet dreams soon",    emoji: "🌙" };
  }

  // ---------- helpers ----------

  function h(tag, attrs = {}, children = []) {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === "class") el.className = v;
      else if (k === "style") el.setAttribute("style", v);
      else if (k.startsWith("on") && typeof v === "function") el.addEventListener(k.slice(2), v);
      else if (k === "html") el.innerHTML = v;
      else if (v !== false && v != null) el.setAttribute(k, v);
    }
    for (const c of [].concat(children)) {
      if (c == null) continue;
      el.append(typeof c === "string" ? document.createTextNode(c) : c);
    }
    return el;
  }

  function clearScreen() {
    if (activeController && typeof activeController.destroy === "function") {
      try { activeController.destroy(); } catch (e) { console.warn(e); }
    }
    activeController = null;
    activeGameId = null;
    screenEl.innerHTML = "";
  }

  function openModal(node) {
    modalBodyEl.innerHTML = "";
    modalBodyEl.append(node);
    modalEl.hidden = false;
  }
  function closeModal() {
    modalEl.hidden = true;
    modalBodyEl.innerHTML = "";
  }

  // ---------- home ----------

  function renderHome() {
    clearScreen();

    const settings = Storage.getSettings();
    const totals = Storage.getTotals();
    const accuracy = totals.total ? Math.round((totals.correct / totals.total) * 100) : 0;
    const tod = timeOfDayGreeting();
    const name = settings.playerName || "friend";

    const greeting = h("section", { class: "raccoon-greeting" }, [
      h("div", { class: "raccoon-host", id: "host-raccoon" }),
      h("div", { class: "speech" }, [
        h("span", {}, `${tod.emoji} ${tod.word}, `),
        h("span", { class: "kid-name" }, name),
        h("span", {}, "! I'm "),
        h("strong", {}, "Math Raccoon"),
        h("span", {}, ". Pick a game and let's have fun learning together! 💜"),
      ]),
    ]);

    const friends = Storage.getFriends();
    const journalPages = Storage.getJournal();
    const statsRow = h("section", { class: "stats-strip" }, [
      statTile(totals.correct, "Correct answers"),
      statTile(accuracy + "%", "Accuracy"),
      statTile(totals.runs, "Games played"),
      statTile(totals.trophies, "Trophies"),
      statTile(`${friends.length}/${FRIENDS.length}`, "Valley friends"),
      statTile(`${journalPages.length}/16`, "Journal pages"),
    ]);

    const tabs = h("div", { class: "tab-bar", role: "tablist" }, [
      tabButton("arcade", "🎮 Arcade", activeTab === "arcade"),
      tabButton("story",  "📖 Story Mode", activeTab === "story"),
    ]);

    const paneHolder = h("div", { id: "tab-pane" });

    const children = [greeting];

    // Daily raccoon visit (only show if not done today)
    if (!Storage.isDailyDone()) {
      children.push(renderDailyCard());
    }

    children.push(tabs, paneHolder,
      h("h2", { class: "section-title" }, "📊 Your progress"),
      statsRow,
      renderAttribution(),
    );

    const section = h("section", { class: "arcade-home" }, children);

    screenEl.append(section);

    Raccoon.mount("#host-raccoon", "wave", { size: 140 });
    renderTabPane(paneHolder);

    // Speak the greeting if voice is on
    if (Voice && Voice.isOn()) {
      Voice.speak(`${tod.word}, ${name}! Pick a game and let's have fun learning together.`, { replace: true });
    }
  }

  // ---------- daily raccoon visit card ----------
  function renderDailyCard() {
    const d = Storage.getDaily();
    const streak = d.streak || 0;
    return h("section", { class: "daily-card" }, [
      h("div", { class: "daily-emoji" }, "🦝"),
      h("div", { class: "daily-body" }, [
        h("h3", { class: "daily-title" }, "Daily Raccoon Visit"),
        h("p", { class: "daily-text" },
          "Math Raccoon brought 3 quick questions for you today. Keep the streak going!"),
        streak > 0 ? h("div", { class: "daily-streak" }, `🔥 ${streak}-day streak`) : null,
      ]),
      h("button", {
        class: "btn btn-primary",
        onclick: startDailyVisit,
      }, "Start →"),
    ]);
  }

  function startDailyVisit() {
    clearScreen();
    const pool = window.MR.Engines;
    const engines = ["addition", "subtraction", "multiplication"];
    const questions = [];
    for (let i = 0; i < 3; i++) {
      const eng = pool[engines[i]];
      const p = eng.generate({ digits: 2, maxFactor: 6, allowRegroup: false, problemsPerRound: 3 }, i);
      p._engineName = engines[i];
      questions.push(p);
    }

    let idx = 0, correct = 0;
    const wrap = h("section", { class: "daily-run narrative-card" }, []);
    screenEl.append(wrap);

    function renderQ() {
      const p = questions[idx];
      const eng = pool[p._engineName];
      wrap.innerHTML = "";
      const title = h("h2", { class: "narrative-chapter" }, `Daily visit · ${idx + 1} of 3`);
      const hint  = h("p", { class: "narrative-body" }, eng.hintFor(p));
      const eqHtml = document.createElement("div");
      eqHtml.innerHTML = `<div class="problem-equation">
        <span class="num">${p.a}</span>
        <span class="op">${eng.op || "?"}</span>
        <span class="num">${p.b}</span>
        <span class="eq">=</span>
        <span class="blank">?</span>
      </div>`;
      const opts = h("div", { class: "answer-options" },
        (p.options || []).map((opt) =>
          h("button", {
            class: "answer-btn",
            onclick: () => pickAnswer(opt),
          }, String(opt)),
        ),
      );
      wrap.append(title, hint, eqHtml, opts);
      if (Voice && Voice.isOn()) Voice.speak(eng.hintFor(p), { replace: true });
    }

    function pickAnswer(opt) {
      const p = questions[idx];
      const isRight = opt === p.answer;
      if (isRight) correct += 1;
      Storage.recordDailyAnswer(isRight);
      Music.playCorrectSfx && (isRight ? Music.playCorrectSfx() : Music.playWrongSfx());
      if (isRight) {
        Storage.recordAnswer("daily-visit", true, 0);
        maybeUnlockCritter();
      }
      // Note: we intentionally record daily answers under a synthetic "daily-visit"
      // game id so they count toward totals.correct (and thus critter unlocks)
      // without creating a visible game card (no registry entry exists).
      idx += 1;
      if (idx < questions.length) {
        setTimeout(renderQ, 600);
      } else {
        Storage.completeDaily();
        Animations.confetti(60);
        wrap.innerHTML = "";
        wrap.append(
          h("div", { class: "narrative-emoji" }, "⭐"),
          h("h2", { class: "narrative-chapter" }, "Daily done!"),
          h("p", { class: "narrative-body" }, `You got ${correct} of 3 right. Math Raccoon will visit again tomorrow!`),
          h("div", { class: "modal-actions", style: "justify-content:center;margin-top:24px" }, [
            h("button", { class: "btn btn-primary", onclick: renderHome }, "Back Home"),
          ]),
        );
        if (Voice && Voice.isOn()) Voice.speak(`Daily done! You got ${correct} of 3 right.`, { replace: true });
      }
    }

    renderQ();
  }

  function statTile(num, label) {
    return h("div", { class: "stat-tile" }, [
      h("div", { class: "stat-num" }, String(num)),
      h("div", { class: "stat-label" }, label),
    ]);
  }

  function tabButton(id, label, active) {
    return h("button", {
      class: "tab-btn" + (active ? " active" : ""),
      role: "tab",
      "aria-selected": active ? "true" : "false",
      onclick: () => { activeTab = id; renderHome(); },
    }, label);
  }

  function renderTabPane(host) {
    host.innerHTML = "";
    if (activeTab === "arcade") host.append(renderArcadePane());
    else host.append(renderStoryPane());
  }

  // ----- Arcade pane -----

  function renderArcadePane() {
    const arcade = Games.arcade();
    const cards = arcade.map((g) => renderGameCard(g, "arcade"));
    return h("div", {}, [
      h("h2", { class: "section-title" }, "🎮 Warm-up arcade"),
      h("p", { class: "pane-hint" },
        "Play these to learn the games! Each one unlocks the next at 75% accuracy."),
      h("section", { class: "game-grid" }, cards),
    ]);
  }

  // ----- Story pane -----

  function renderStoryPane() {
    const chapters = Games.story();
    const nodes = chapters.map((g, i) => renderStoryChapter(g, i, chapters));
    return h("div", {}, [
      h("h2", { class: "section-title" }, "📖 Hidden Valley Adventure"),
      h("p", { class: "pane-hint" },
        "A 16-chapter story. Each chapter unlocks the next when you reach 75% accuracy."),
      h("section", { class: "story-map" }, nodes),
    ]);
  }

  function renderStoryChapter(g, i, all) {
    const unlocked = Games.isUnlocked(g.id);
    const done = Storage.isChapterComplete(g.id);
    const prog = Storage.getProgress(g.id);
    const acc = prog.bestRoundPct ? Math.round(prog.bestRoundPct * 100) : 0;

    const badge = done ? "✨ Done" : unlocked ? "Play!" : "🔒 Locked";
    const statusCls = done ? "done" : unlocked ? "open" : "locked";

    return h("button", {
      class: `story-node ${statusCls}`,
      style: `--card-accent:${g.accent};`,
      "aria-disabled": unlocked ? "false" : "true",
      onclick: () => unlocked ? openGame(g.id) : showLockedReason(g),
    }, [
      h("div", { class: "story-chip" }, `Ch. ${g.chapter}`),
      h("span", { class: "story-emoji" }, g.emoji),
      h("div", { class: "story-title" }, g.title.replace(/^Ch\.\s*\d+:\s*/, "")),
      h("div", { class: "story-desc" }, withName(g.description)),
      h("div", { class: "story-meta" }, [
        h("span", { class: "story-badge" }, badge),
        acc ? h("span", { class: "story-pct" }, `Best ${acc}%`) : null,
      ]),
    ]);
  }

  // ----- Shared card renderer -----

  function renderGameCard(g) {
    const unlocked = Games.isUnlocked(g.id);
    const prog = Storage.getProgress(g.id);
    const acc = prog.total ? Math.round((prog.correct / prog.total) * 100) : 0;
    const passed = Storage.hasPassed(g.id);

    const metaRight = !prog.total
      ? "Not played yet"
      : `⭐ ${acc}% · ${prog.runs} ${prog.runs === 1 ? "run" : "runs"}` + (passed ? " · ✅" : "");

    const locked = !unlocked;

    return h("button", {
      class: "game-card" + (locked ? " locked" : ""),
      style: `--card-accent: ${g.accent};`,
      "aria-disabled": locked ? "true" : "false",
      "data-id": g.id,
      onclick: () => {
        if (locked) return showLockedReason(g);
        openGame(g.id);
      },
    }, [
      locked ? h("span", { class: "lock-overlay" }, "🔒") : null,
      h("span", { class: "card-emoji" }, g.emoji),
      h("h3", { class: "card-title" }, g.title),
      h("p", { class: "card-desc" }, withName(g.description)),
      h("div", { class: "card-meta" }, [
        h("span", { class: "card-badge" }, g.grade || "Play"),
        h("span", { class: "card-progress" }, metaRight),
      ]),
    ]);
  }

  function showLockedReason(g) {
    const prev = Games.get(g.requiresPass);
    const prevLabel = prev ? `“${prev.title}”` : "the previous game";
    const node = h("div", {}, [
      h("h2", { class: "modal-title" }, "🔒 Locked"),
      h("p", { style: "color:var(--c-ink-soft);line-height:1.4" },
        `Reach 75% accuracy in ${prevLabel} to unlock this one. You've got this!`),
      h("div", { class: "modal-actions" }, [
        h("button", { class: "btn btn-primary", onclick: closeModal }, "Okay"),
      ]),
    ]);
    openModal(node);
  }

  // ---------- game screen ----------

  function openGame(id) {
    const def = Games.get(id);
    if (!def) return;
    if (!Games.isUnlocked(id)) return;

    clearScreen();
    activeGameId = id;

    // Story games: show narrative intro first, then game.
    if (def.mode === "story" && def.narrative && def.narrative.intro) {
      renderNarrativeIntro(def, () => startGameRound(def));
    } else {
      startGameRound(def);
    }
  }

  function renderNarrativeIntro(def, onContinue) {
    const introText = withName(def.narrative.intro);
    const intro = h("section", { class: "narrative-card" }, [
      h("div", { class: "narrative-emoji" }, def.emoji),
      h("h2", { class: "narrative-chapter" }, `Chapter ${def.chapter}`),
      h("h3", { class: "narrative-title" }, def.title.replace(/^Ch\.\s*\d+:\s*/, "")),
      h("p", { class: "narrative-body" }, introText),
      h("div", { class: "modal-actions", style: "justify-content:center;margin-top:24px" }, [
        h("button", { class: "btn btn-ghost", onclick: renderHome }, "⬅ Back"),
        h("button", { class: "btn btn-primary", onclick: onContinue }, "Begin! →"),
      ]),
    ]);
    screenEl.append(intro);
    if (Voice && Voice.isOn()) Voice.speak(introText, { replace: true });
  }

  function renderNarrativeOutro(def) {
    clearScreen();
    const outroText = withName(def.narrative.outro || "Wonderful work!");

    // Pick a friend reward if defined
    const friend = def.friendId ? FRIENDS.find((f) => f.id === def.friendId) : null;
    const newFriend = friend ? Storage.earnFriend(friend.id) : false;
    const newPage = def.journal ? Storage.unlockJournalEntry(def.id) : false;

    const rewardBlock = [];
    if (newFriend && friend) {
      rewardBlock.push(
        h("div", { class: "reward-chip" }, [
          h("span", { class: "reward-emoji" }, friend.emoji),
          h("div", {}, [
            h("div", { class: "reward-title" }, "New friend unlocked!"),
            h("div", { class: "reward-name" }, friend.name),
          ]),
        ]),
      );
    }
    if (newPage && def.journal) {
      rewardBlock.push(
        h("div", { class: "reward-chip" }, [
          h("span", { class: "reward-emoji" }, "📔"),
          h("div", {}, [
            h("div", { class: "reward-title" }, "Journal page unlocked!"),
            h("div", { class: "reward-name" }, def.journal.title),
          ]),
        ]),
      );
    }

    const outro = h("section", { class: "narrative-card" }, [
      h("div", { class: "narrative-emoji" }, "🌟"),
      h("h2", { class: "narrative-chapter" }, `Chapter ${def.chapter} complete!`),
      h("p", { class: "narrative-body" }, outroText),
      rewardBlock.length ? h("div", { class: "reward-grid" }, rewardBlock) : null,
      h("div", { class: "modal-actions", style: "justify-content:center;margin-top:24px;flex-wrap:wrap" }, [
        h("button", { class: "btn btn-ghost", onclick: renderHome }, "Back Home"),
        def.journal ? h("button", {
          class: "btn btn-ghost",
          onclick: () => renderJournalEntry(def),
        }, "📔 Read journal") : null,
        h("button", {
          class: "btn btn-primary",
          onclick: () => {
            // Between-chapter mini-game before moving on
            const nextChapter = Games.story().find((s) => s.chapter === (def.chapter || 0) + 1);
            if (nextChapter && Games.isUnlocked(nextChapter.id)) startAcornMiniGame(() => openGame(nextChapter.id));
            else renderHome();
          },
        }, "Next chapter →"),
      ]),
    ]);
    screenEl.append(outro);
    if (Voice && Voice.isOn()) Voice.speak(outroText, { replace: true });
  }

  // ---------- journal entry reader ----------
  function renderJournalEntry(def) {
    clearScreen();
    const j = def.journal;
    const text = withName(j.body || "");
    const card = h("section", { class: "journal-page" }, [
      h("div", { class: "journal-emoji" }, def.emoji),
      h("h2", { class: "journal-title" }, j.title),
      h("p", { class: "journal-body" }, text),
      h("div", { class: "modal-actions", style: "justify-content:center;margin-top:24px" }, [
        h("button", { class: "btn btn-ghost", onclick: renderHome }, "Back Home"),
        h("button", {
          class: "btn btn-primary",
          onclick: () => {
            if (Voice && Voice.isOn()) Voice.cancel();
            const nextChapter = Games.story().find((s) => s.chapter === (def.chapter || 0) + 1);
            if (nextChapter && Games.isUnlocked(nextChapter.id)) startAcornMiniGame(() => openGame(nextChapter.id));
            else renderHome();
          },
        }, "Continue →"),
      ]),
    ]);
    screenEl.append(card);
    if (Voice && Voice.isOn()) Voice.speak(text, { replace: true });
  }

  // ---------- between-chapter mini-game: count the acorns ----------
  function startAcornMiniGame(onDone) {
    clearScreen();
    const target = 4 + Math.floor(Math.random() * 6); // 4..9
    const options = [target - 1, target, target + 1, target + 2]
      .filter((v) => v > 0)
      .sort(() => Math.random() - 0.5);

    const acorns = [];
    for (let i = 0; i < target; i++) acorns.push("🌰");

    const wrap = h("section", { class: "narrative-card mini-card" }, [
      h("div", { class: "narrative-emoji" }, "🌰"),
      h("h2", { class: "narrative-chapter" }, "Quick count"),
      h("p", { class: "narrative-body" }, "How many acorns fell from the tree?"),
      h("div", { class: "acorn-shower" }, acorns.map((a, i) =>
        h("span", { class: "acorn", style: `animation-delay:${i * 0.08}s` }, a),
      )),
      h("div", { class: "answer-options", style: "justify-content:center" },
        options.map((n) =>
          h("button", {
            class: "answer-btn",
            onclick: (e) => {
              const btn = e.currentTarget;
              if (n === target) {
                btn.classList.add("correct");
                Music.playCorrectSfx && Music.playCorrectSfx();
                Animations.confetti(30);
                if (Voice && Voice.isOn()) Voice.speak("Exactly! Great counting.", { replace: true });
                setTimeout(() => onDone && onDone(), 1100);
              } else {
                btn.classList.add("wrong");
                Music.playWrongSfx && Music.playWrongSfx();
                if (Voice && Voice.isOn()) Voice.speak("Close! Try again.", { replace: true });
              }
            },
          }, String(n)),
        ),
      ),
      h("div", { class: "modal-actions", style: "justify-content:center;margin-top:16px" }, [
        h("button", { class: "btn btn-ghost", onclick: () => onDone && onDone() }, "Skip →"),
      ]),
    ]);
    screenEl.append(wrap);
    if (Voice && Voice.isOn()) Voice.speak("How many acorns fell from the tree?", { replace: true });
  }

  function startGameRound(def) {
    clearScreen();
    activeGameId = def.id;

    const state = { score: 0, streak: 0, questionIndex: 0, totalQuestions: 8, paused: false };

    const titleEl   = h("h2", { class: "g-title" }, [h("span", {}, def.emoji + " "), def.title]);
    const scoreEl   = h("span", { class: "score-chip" }, ["⭐ ", h("strong", { id: "g-score" }, "0")]);
    const progFill  = h("div", { class: "fill" });
    const progLabel = h("div", { class: "label" }, "Q 0 / 0");
    const progBar   = h("div", { class: "progress-bar" }, [progFill, progLabel]);

    const pauseBtn   = h("button", { class: "g-icon-btn" }, "⏸ Pause");
    const restartBtn = h("button", { class: "g-icon-btn" }, "🔄 Restart");
    const homeBtn    = h("button", { class: "g-icon-btn danger" }, "⏹ Home");

    pauseBtn.addEventListener("click", () => { state.paused ? resume() : pause(); });
    restartBtn.addEventListener("click", () => activeController && activeController.restart && activeController.restart());
    homeBtn.addEventListener("click", renderHome);

    const header = h("div", { class: "game-header" }, [
      titleEl, progBar, scoreEl,
      h("div", { class: "g-controls" }, [pauseBtn, restartBtn, homeBtn]),
    ]);

    const body = h("div", { class: "game-body", id: "game-body" });
    const screen = h("div", { class: "game-screen" }, [header, body]);
    screenEl.append(screen);

    Storage.recordRun(def.id);

    const api = {
      gameId: def.id,

      setProgress(current, total) {
        state.questionIndex = current;
        state.totalQuestions = total;
        const pct = total ? Math.min(100, Math.round((current / total) * 100)) : 0;
        progFill.style.width = pct + "%";
        progLabel.textContent = `Q ${current} / ${total}`;
      },

      setScore(score) {
        state.score = score;
        const el = document.getElementById("g-score");
        if (el) el.textContent = String(score);
      },

      recordAnswer(correct) {
        if (correct) state.streak += 1; else state.streak = 0;
        Storage.recordAnswer(def.id, !!correct, state.streak);
        if (correct) Music.playCorrectSfx(); else Music.playWrongSfx();
        if (correct) maybeUnlockCritter();

        const totals = Storage.getTotals();
        const gamesPlayedCount = Object.values(Storage.getAllProgress()).filter((g) => g.runs > 0).length;
        const earned = Achievements.check({
          event: "answer", gameId: def.id, streak: state.streak, totals, gamesPlayedCount,
        });
        earned.forEach(celebrateTrophy);
        return { streak: state.streak };
      },

      completeRound({ correct, total, perfect }) {
        Storage.recordRoundResult(def.id, correct, total);

        const passed = (correct / total) >= Storage.unlockThreshold();
        if (def.mode === "story" && passed) Storage.markChapterComplete(def.id);

        const totals = Storage.getTotals();
        const gamesPlayedCount = Object.values(Storage.getAllProgress()).filter((g) => g.runs > 0).length;
        const earned = Achievements.check({
          event: "round_complete", gameId: def.id, streak: state.streak, roundPerfect: !!perfect,
          totals, gamesPlayedCount,
        });
        if (!Storage.getSettings().calmMode) Animations.confetti(80);
        Music.playTrophySfx();
        earned.forEach(celebrateTrophy);

        // Story: on pass, after a brief delay show outro card.
        if (def.mode === "story" && passed && def.narrative && def.narrative.outro) {
          setTimeout(() => renderNarrativeOutro(def), 2200);
        }

        return earned;
      },

      exit() { renderHome(); },
      getRaccoonSvg: (expr, opts) => Raccoon.render(expr, opts),
    };

    if (typeof def.create === "function") {
      activeController = def.create(body, api) || {};
    } else if (def.engine) {
      activeController = window.MR.GameRunner.create(def.engine, def, body, api) || {};
    } else {
      throw new Error("game has no create() or engine: " + def.id);
    }

    function pause() {
      state.paused = true; body.classList.add("paused");
      pauseBtn.textContent = "▶ Resume";
      if (activeController && activeController.pause) activeController.pause();
    }
    function resume() {
      state.paused = false; body.classList.remove("paused");
      pauseBtn.textContent = "⏸ Pause";
      if (activeController && activeController.resume) activeController.resume();
    }
  }

  // ---------- help modal ----------

  function renderHelpModal() {
    let steps, title, emoji;
    if (activeGameId) {
      const def = Games.get(activeGameId);
      const engine = def && def.engine ? window.MR.Engines[def.engine] : null;
      steps = (def && def.howTo) || (engine && engine.howTo && engine.howTo()) || defaultHelp();
      title = def ? def.title : "How to play";
      emoji = def ? def.emoji : "🦝";
    } else {
      steps = defaultHelp();
      title = "How Math Raccoon works";
      emoji = "🦝";
    }

    const list = h("ol", { class: "howto-list" }, steps.map((s) =>
      h("li", { class: "howto-item" }, [
        h("span", { class: "howto-emoji" }, s.emoji || "•"),
        h("span", { class: "howto-line" }, s.line),
      ]),
    ));

    const node = h("div", {}, [
      h("h2", { class: "modal-title" }, [h("span", {}, emoji + " "), h("span", {}, title)]),
      list,
      h("div", { class: "modal-actions" }, [
        h("button", { class: "btn btn-primary", onclick: closeModal }, "Got it!"),
      ]),
    ]);
    openModal(node);
  }

  function defaultHelp() {
    return [
      { emoji: "🎮", line: "Pick a warm-up game or a story chapter to start." },
      { emoji: "💡", line: "Read the hint from Math Raccoon. Look at the picture for help!" },
      { emoji: "🎯", line: "Tap the answer you think is right. You can take your time." },
      { emoji: "🏆", line: "Get 75% or better to unlock the next game or chapter." },
      { emoji: "💜", line: "There's no rush. Mistakes help you learn. You're awesome!" },
    ];
  }

  // ---------- trophies ----------

  function renderTrophiesModal() {
    const all = Achievements.all();
    const earnedCount = all.filter((a) => a.earned).length;
    const list = h("div", { class: "trophy-list" }, all.map((a) =>
      h("div", { class: "trophy-row " + (a.earned ? "earned" : "locked") }, [
        h("div", { class: "t-icon" }, a.icon),
        h("div", {}, [
          h("div", { class: "t-name" }, a.name),
          h("div", { class: "t-desc" }, a.desc),
        ]),
      ]),
    ));
    const node = h("div", {}, [
      h("h2", { class: "modal-title" }, [
        h("span", {}, "🏆 Trophies"),
        h("small", { style: "font-size:0.95rem;color:var(--c-ink-soft)" }, ` ${earnedCount} / ${all.length}`),
      ]),
      list,
      h("div", { class: "modal-actions" }, [
        h("button", {
          class: "btn btn-ghost",
          onclick: () => { closeModal(); printCertificate(earnedCount, all.length); },
        }, "🖨 Print certificate"),
        h("button", { class: "btn btn-primary", onclick: closeModal }, "Close"),
      ]),
    ]);
    openModal(node);
  }

  // ---------- friends modal ----------
  function renderFriendsModal() {
    const earned = Storage.getFriends();
    const total = FRIENDS.length;
    const grid = h("div", { class: "friend-grid" }, FRIENDS.map((f) => {
      const have = earned.includes(f.id);
      return h("div", {
        class: "friend-tile " + (have ? "earned" : "locked"),
        style: `--card-accent:${f.color};`,
      }, [
        h("div", { class: "friend-sticker" }, have ? f.emoji : "❓"),
        h("div", { class: "friend-name" }, have ? f.name : "???"),
      ]);
    }));
    const node = h("div", {}, [
      h("h2", { class: "modal-title" }, [
        h("span", {}, "🤗 Valley Friends"),
        h("small", { style: "font-size:0.95rem;color:var(--c-ink-soft)" }, ` ${earned.length} / ${total}`),
      ]),
      h("p", { style: "color:var(--c-ink-soft);margin:0 0 16px;font-weight:600" },
        "Meet a new friend every chapter you pass!"),
      grid,
      h("div", { class: "modal-actions" }, [
        h("button", { class: "btn btn-primary", onclick: closeModal }, "Close"),
      ]),
    ]);
    openModal(node);
  }

  // ---------- journal modal ----------
  function renderJournalModal() {
    const unlocked = Storage.getJournal();
    const chapters = Games.story();
    const entries = chapters.filter((c) => c.journal).map((c) => {
      const have = unlocked.includes(c.id);
      return h("button", {
        class: "journal-row " + (have ? "earned" : "locked"),
        style: `--card-accent:${c.accent};`,
        onclick: () => {
          if (!have) return;
          closeModal();
          renderJournalEntry(c);
        },
      }, [
        h("div", { class: "j-emoji" }, have ? c.emoji : "🔒"),
        h("div", { class: "j-text" }, [
          h("div", { class: "j-chapter" }, `Ch. ${c.chapter}`),
          h("div", { class: "j-title" }, have ? c.journal.title : "Not yet unlocked"),
        ]),
      ]);
    });
    const node = h("div", {}, [
      h("h2", { class: "modal-title" }, [
        h("span", {}, "📔 Reading Raccoon's Journal"),
        h("small", { style: "font-size:0.95rem;color:var(--c-ink-soft)" }, ` ${unlocked.length} / ${entries.length}`),
      ]),
      h("p", { style: "color:var(--c-ink-soft);margin:0 0 16px;font-weight:600" },
        "Pass a chapter to unlock its journal page — a short illustrated read."),
      h("div", { class: "journal-list" }, entries),
      h("div", { class: "modal-actions" }, [
        h("button", { class: "btn btn-primary", onclick: closeModal }, "Close"),
      ]),
    ]);
    openModal(node);
  }

  // ---------- critter cam gallery ----------
  function renderCrittersModal() {
    const all = Critters ? Critters.all() : [];
    const owned = Storage.getCritters();
    const total = all.length;
    const nextCount = owned.length < total ? 5 - (Storage.getTotals().correct % 5) : 0;

    const grid = h("div", { class: "critter-grid" }, all.map((c, i) => {
      const have = owned.includes(c.id);
      return h("div", { class: "critter-tile " + (have ? "earned" : "locked") }, [
        h("div", { class: "critter-art", html: have ? c.svg() : "" }),
        !have ? h("div", { class: "critter-silhouette" }, i === owned.length ? "✨" : "🔒") : null,
        h("div", { class: "critter-name" }, have ? c.name : "???"),
        h("div", { class: "critter-caption" }, have ? c.caption : ""),
      ]);
    }));

    const hint = owned.length < total
      ? `Next critter in ${nextCount} more correct ${nextCount === 1 ? "answer" : "answers"}.`
      : "You've found every critter! Superstar!";

    const node = h("div", {}, [
      h("h2", { class: "modal-title" }, [
        h("span", {}, "📷 Critter Cam"),
        h("small", { style: "font-size:0.95rem;color:var(--c-ink-soft)" }, ` ${owned.length} / ${total}`),
      ]),
      h("p", { style: "color:var(--c-ink-soft);margin:0 0 16px;font-weight:600" }, hint),
      grid,
      h("div", { class: "modal-actions" }, [
        h("button", { class: "btn btn-primary", onclick: closeModal }, "Close"),
      ]),
    ]);
    openModal(node);
  }

  // Called whenever a correct answer lands. Unlocks the next critter if due
  // and shows a cute celebratory toast.
  function maybeUnlockCritter() {
    if (!Critters) return;
    const totals = Storage.getTotals();
    const id = Critters.earnNextIfDue(totals.correct);
    if (!id) return;
    const c = Critters.byId(id);
    if (!c) return;
    celebrateCritter(c);
  }

  function celebrateCritter(c) {
    if (!Storage.getSettings().calmMode) Animations.confetti(30);
    const toast = h("div", { class: "critter-toast" }, [
      h("div", { class: "critter-toast-art", html: c.svg() }),
      h("div", {}, [
        h("div", { class: "critter-toast-title" }, "New critter!"),
        h("div", { class: "critter-toast-name" }, c.name),
        h("div", { class: "critter-toast-caption" }, c.caption),
      ]),
    ]);
    document.body.appendChild(toast);
    if (Voice && Voice.isOn()) Voice.speak(`New critter! ${c.name}.`, { replace: false });
    setTimeout(() => { toast.style.transition = "opacity 0.4s, transform 0.4s"; toast.style.opacity = "0"; toast.style.transform = "translate(-50%, 20px)"; }, 2800);
    setTimeout(() => toast.remove(), 3400);
  }

  // ---------- printable certificate ----------
  function printCertificate(earnedCount, total) {
    const settings = Storage.getSettings();
    const name = (settings.playerName || "Ava");
    const totals = Storage.getTotals();
    const friends = Storage.getFriends().length;
    const journal = Storage.getJournal().length;
    const date = new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });

    const html = `
      <!DOCTYPE html><html><head><title>Math Raccoon Certificate</title>
      <style>
        @page { size: landscape; margin: 12mm; }
        body { font-family: "Fredoka", "Comic Sans MS", sans-serif; margin:0; padding:0; color:#3a2e5f;
               background: linear-gradient(135deg, #fff6d6 0%, #ffe1ec 45%, #e9e3ff 100%); }
        .cert { max-width: 960px; margin: 24px auto; padding: 40px 48px; border: 10px double #a78bfa;
                border-radius: 24px; background: #fff8ed; box-shadow: 0 12px 30px rgba(58,46,95,0.15); text-align:center; }
        h1 { font-size: 3rem; margin: 8px 0 4px; color: #a78bfa; letter-spacing: 1px; }
        .sub { color: #6b5b95; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; font-size: 0.9rem; }
        .name { font-size: 3.6rem; margin: 20px 0 10px; color: #ff7a93; }
        .desc { font-size: 1.2rem; color: #3a2e5f; margin: 6px 0 20px; font-weight:600; }
        .stats { display:flex; gap: 24px; justify-content:center; flex-wrap:wrap; margin: 16px 0 24px; }
        .stat { background: white; border-radius: 16px; padding: 14px 22px; box-shadow: 0 4px 12px rgba(58,46,95,0.08); min-width: 120px; }
        .stat .n { font-size: 1.8rem; color: #a78bfa; font-weight: 800; }
        .stat .l { font-size: 0.8rem; color: #6b5b95; text-transform: uppercase; letter-spacing: 0.5px; }
        .seal { font-size: 4rem; margin-top: 10px; }
        .foot { margin-top: 18px; color: #6b5b95; font-size: 0.95rem; }
        @media print { body { background: none; } .cert { box-shadow: none; } .noprint { display:none !important; } }
        .noprint { margin: 24px auto; text-align:center; }
        .noprint button { font: inherit; padding: 10px 22px; border-radius: 12px; background: #a78bfa; color: white; border: none; font-weight: 800; cursor:pointer; margin: 0 6px; }
      </style></head><body>
      <div class="cert">
        <div class="sub">Math Raccoon Arcade</div>
        <h1>Certificate of Awesomeness</h1>
        <div class="desc">Presented with valley-wide applause to</div>
        <div class="name">${escapeHtml(name)}</div>
        <div class="desc">for bravery, curiosity, and superstar math in Hidden Valley.</div>
        <div class="stats">
          <div class="stat"><div class="n">${totals.correct}</div><div class="l">Correct</div></div>
          <div class="stat"><div class="n">${earnedCount}/${total}</div><div class="l">Trophies</div></div>
          <div class="stat"><div class="n">${friends}/${FRIENDS.length}</div><div class="l">Friends</div></div>
          <div class="stat"><div class="n">${journal}/16</div><div class="l">Journal</div></div>
        </div>
        <div class="seal">🦝🏆✨</div>
        <div class="foot">Awarded ${date} · signed, Math Raccoon</div>
      </div>
      <div class="noprint">
        <button onclick="window.print()">🖨 Print</button>
        <button onclick="window.close()">Close</button>
      </div>
      </body></html>`;
    const win = window.open("", "_blank", "width=1000,height=700");
    if (!win) {
      alert("Pop-up was blocked. Please allow pop-ups and try again.");
      return;
    }
    win.document.open();
    win.document.write(html);
    win.document.close();
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    }[c]));
  }

  function celebrateTrophy(def) {
    if (!Storage.getSettings().calmMode) Animations.confetti(40);
    const toast = h("div", {
      style: "position:fixed;top:20px;left:50%;transform:translateX(-50%);background:white;border:3px solid var(--c-sun);border-radius:20px;padding:14px 20px;box-shadow:0 12px 30px rgba(58,46,95,0.25);z-index:20;font-weight:700;display:flex;align-items:center;gap:10px;animation:pop-in 0.4s cubic-bezier(0.34,1.56,0.64,1);",
    }, [
      h("span", { style: "font-size:1.6rem" }, def.icon),
      h("div", {}, [
        h("div", { style: "font-family:var(--font-display);color:var(--c-berry);font-size:1.05rem" }, "New trophy!"),
        h("div", { style: "font-size:0.88rem;color:var(--c-ink-soft)" }, def.name),
      ]),
    ]);
    document.body.appendChild(toast);
    setTimeout(() => { toast.style.transition = "opacity 0.4s"; toast.style.opacity = "0"; }, 2600);
    setTimeout(() => toast.remove(), 3200);
  }

  // ---------- reset ----------

  function renderResetModal() {
    const node = h("div", {}, [
      h("h2", { class: "modal-title" }, "🔄 Start Over?"),
      h("p", { style: "color:var(--c-ink-soft);line-height:1.4" },
        "This will clear your progress and trophies so you can start fresh. Are you sure?"),
      h("div", { class: "modal-actions" }, [
        h("button", { class: "btn btn-ghost", onclick: closeModal }, "Cancel"),
        h("button", {
          class: "btn btn-danger",
          onclick: () => { Storage.resetAll(); closeModal(); renderHome(); },
        }, "Yes, reset"),
      ]),
    ]);
    openModal(node);
  }

  // ---------- admin ----------

  function renderAdmin() {
    clearScreen();

    const all = Games.all();

    const rows = all.map((g) => {
      const enabled = Storage.isGameEnabled(g.id);
      const forced  = Storage.isForceUnlocked(g.id);
      const prog = Storage.getProgress(g.id);
      const best = prog.bestRoundPct ? Math.round(prog.bestRoundPct * 100) + "%" : "—";

      const enableBtn = h("button", {
        class: "admin-pill " + (enabled ? "on" : "off"),
        onclick: (e) => { Storage.setGameEnabled(g.id, !enabled); renderAdmin(); },
      }, enabled ? "Enabled" : "Disabled");

      const forceBtn = h("button", {
        class: "admin-pill " + (forced ? "on" : "off"),
        onclick: (e) => { Storage.forceUnlock(g.id, !forced); renderAdmin(); },
      }, forced ? "Unlocked" : "Gated");

      const resetBtn = h("button", {
        class: "admin-pill warn",
        onclick: () => {
          if (confirm(`Reset progress for "${g.title}"?`)) { Storage.resetGame(g.id); renderAdmin(); }
        },
      }, "Reset");

      return h("tr", { class: "admin-row" }, [
        h("td", {}, g.mode === "story" ? `Ch.${g.chapter}` : "Arc"),
        h("td", { class: "admin-title" }, [h("span", {}, g.emoji + " "), h("strong", {}, g.title)]),
        h("td", {}, best),
        h("td", {}, String(prog.runs || 0)),
        h("td", {}, enableBtn),
        h("td", {}, forceBtn),
        h("td", {}, resetBtn),
      ]);
    });

    const table = h("table", { class: "admin-table" }, [
      h("thead", {}, h("tr", {}, [
        h("th", {}, "Mode"),
        h("th", {}, "Game"),
        h("th", {}, "Best %"),
        h("th", {}, "Runs"),
        h("th", {}, "Enabled"),
        h("th", {}, "Gate"),
        h("th", {}, "Reset"),
      ])),
      h("tbody", {}, rows),
    ]);

    const settings = Storage.getSettings();
    const nameInput = h("input", {
      type: "text",
      id: "admin-name-input",
      value: settings.playerName || "Ava",
      maxlength: "24",
      placeholder: "Ava",
      class: "admin-name-input",
    });
    const saveNameBtn = h("button", {
      class: "btn btn-primary",
      onclick: () => {
        const v = (nameInput.value || "").trim().slice(0, 24) || "Ava";
        Storage.setSettings({ playerName: v });
        renderAdmin();
      },
    }, "Save name");

    const nameSection = h("div", { class: "admin-name-row" }, [
      h("label", { for: "admin-name-input", class: "admin-name-label" }, "Child's name"),
      nameInput,
      saveNameBtn,
      h("span", { class: "admin-name-hint" }, "Shown on the home page and in greetings. Default is Ava."),
    ]);

    const section = h("section", { class: "admin-page" }, [
      h("header", { class: "admin-header" }, [
        h("h1", { class: "admin-h1" }, "🛠 Parent Admin"),
        h("p", { class: "admin-sub" },
          "Toggle games on/off, force-unlock, or reset individual progress. Changes save instantly."),
        h("div", { class: "admin-actions" }, [
          h("button", { class: "btn btn-ghost", onclick: () => { location.hash = ""; renderHome(); } }, "← Back to Arcade"),
          h("button", {
            class: "btn btn-danger",
            onclick: () => {
              if (confirm("Reset ALL progress, trophies, and story chapters?")) {
                Storage.resetAll();
                renderAdmin();
              }
            },
          }, "Reset everything"),
        ]),
      ]),
      nameSection,
      table,
      renderAttribution(),
    ]);

    screenEl.append(section);
  }

  // ---------- global controls ----------

  function wireControls() {
    const musicBtn = document.getElementById("music-toggle");
    const voiceBtn = document.getElementById("voice-toggle");
    const calmBtn  = document.getElementById("calm-toggle");
    const friendsBtn = document.getElementById("friends-btn");
    const journalBtn = document.getElementById("journal-btn");
    const crittersBtn = document.getElementById("critters-btn");
    const trophyBtn = document.getElementById("trophies-btn");
    const resetBtn = document.getElementById("reset-btn");
    const helpBtn = document.getElementById("help-btn");

    const settings = Storage.getSettings();
    if (settings.musicOn) musicBtn.classList.add("active");
    if (settings.voiceOn) {
      voiceBtn && voiceBtn.classList.add("active");
      Voice && Voice.setEnabled(true);
    }
    if (settings.calmMode) {
      calmBtn && calmBtn.classList.add("active");
      document.body.classList.add("calm-mode");
    }

    musicBtn.addEventListener("click", async () => {
      if (Music.isPlaying()) {
        Music.stop();
        musicBtn.classList.remove("active");
        Storage.setSettings({ musicOn: false });
      } else {
        const ok = await Music.start();
        if (ok) {
          musicBtn.classList.add("active");
          Storage.setSettings({ musicOn: true });
        }
      }
    });

    if (voiceBtn) {
      voiceBtn.addEventListener("click", () => {
        const nowOn = !voiceBtn.classList.contains("active");
        voiceBtn.classList.toggle("active", nowOn);
        if (Voice) Voice.setEnabled(nowOn);
        Storage.setSettings({ voiceOn: nowOn });
        if (nowOn && Voice) {
          const name = (Storage.getSettings().playerName || "friend");
          Voice.speak(`Reading aloud is on, ${name}.`, { replace: true });
        }
      });
    }

    if (calmBtn) {
      calmBtn.addEventListener("click", () => {
        const nowOn = !calmBtn.classList.contains("active");
        calmBtn.classList.toggle("active", nowOn);
        document.body.classList.toggle("calm-mode", nowOn);
        Storage.setSettings({ calmMode: nowOn });
      });
    }

    if (friendsBtn) friendsBtn.addEventListener("click", renderFriendsModal);
    if (journalBtn) journalBtn.addEventListener("click", renderJournalModal);
    if (crittersBtn) crittersBtn.addEventListener("click", renderCrittersModal);

    trophyBtn.addEventListener("click", renderTrophiesModal);
    resetBtn.addEventListener("click", renderResetModal);
    if (helpBtn) helpBtn.addEventListener("click", renderHelpModal);

    modalEl.addEventListener("click", (e) => { if (e.target === modalEl) closeModal(); });
    const closeBtn = modalEl.querySelector(".modal-close");
    if (closeBtn) closeBtn.addEventListener("click", closeModal);

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !modalEl.hidden) closeModal();
    });

    window.addEventListener("hashchange", routeFromHash);
  }

  // ---------- routing ----------

  function routeFromHash() {
    const hash = (location.hash || "").replace(/^#/, "").toLowerCase();
    if (hash === "admin") renderAdmin();
    else renderHome();
  }

  // ---------- low-profile attribution footer ----------
  function renderAttribution() {
    return h("footer", { class: "attribution-footer", "aria-label": "Trademark and copyright" }, [
      h("span", { class: "attr-marks" },
        "Math Raccoon™ · Reading Raccoon™ · Art Raccoon™ · Painter Raccoon™ · Ava's Hidden Valley™"),
      h("span", { class: "attr-sep" }, " · "),
      h("span", { class: "attr-copy" }, "© 2026 — All rights reserved."),
    ]);
  }

  // ---------- first-time welcome ----------

  function renderWelcomeOverlay(onDone) {
    const overlay = h("div", { class: "welcome-overlay", id: "welcome-overlay" }, [
      h("div", { class: "welcome-hearts", "aria-hidden": "true" },
        ["💜", "✨", "🌸", "⭐", "💫", "🌟", "💜", "✨", "🌸", "⭐", "💫", "🌟"].map((e, i) =>
          h("span", { class: "welcome-heart", style: `--i:${i}` }, e),
        ),
      ),
      h("div", { class: "welcome-card" }, [
        h("div", { class: "welcome-sparkle-ring", "aria-hidden": "true" },
          ["✦", "✧", "✦", "✧", "✦", "✧", "✦", "✧"].map((s, i) =>
            h("span", { class: "welcome-sparkle", style: `--i:${i}` }, s),
          ),
        ),
        h("div", { class: "welcome-raccoon", id: "welcome-raccoon" }),
        h("h2", { class: "welcome-title", "aria-label": "Hi there!" },
          "Hi there!".split("").map((ch, i) =>
            h("span", { class: "welcome-letter", style: `--i:${i}` }, ch === " " ? "\u00A0" : ch),
          ),
        ),
        h("p", { class: "welcome-bubble" }, [
          h("span", {}, "I'm "),
          h("strong", {}, "Math Raccoon"),
          h("span", {}, "! I can't wait to do math with you. "),
          h("span", { class: "welcome-wink" }, "💜"),
          h("br", {}),
          h("span", {}, "What's your name, friend?"),
        ]),
        (function () {
          const input = h("input", {
            class: "welcome-input",
            id: "welcome-name-input",
            type: "text",
            maxlength: "24",
            placeholder: "Type your name…",
            autocomplete: "off",
            spellcheck: "false",
            "aria-label": "Your name",
          });
          const submit = h("button", {
            class: "btn btn-primary welcome-submit",
            type: "button",
          }, "Nice to meet you! 🎉");
          function finish() {
            const raw = (input.value || "").trim().slice(0, 24);
            if (!raw) {
              input.classList.add("shake");
              input.focus();
              setTimeout(() => input.classList.remove("shake"), 500);
              return;
            }
            Storage.setSettings({ playerName: raw, hasOnboarded: true });
            overlay.classList.add("leaving");
            if (!Storage.getSettings().calmMode) Animations.confetti(60);
            setTimeout(() => { overlay.remove(); onDone && onDone(); }, 650);
          }
          submit.addEventListener("click", finish);
          input.addEventListener("keydown", (e) => { if (e.key === "Enter") finish(); });
          setTimeout(() => input.focus(), 700);
          return h("div", { class: "welcome-form" }, [input, submit]);
        })(),
      ]),
    ]);
    document.body.appendChild(overlay);
    Raccoon.mount("#welcome-raccoon", "wave", { size: 180 });
  }

  // ---------- boot ----------

  function boot() {
    Animations.mountBackground();
    wireControls();

    const settings = Storage.getSettings();
    if (!settings.hasOnboarded) {
      renderWelcomeOverlay(() => routeFromHash());
    } else {
      routeFromHash();
    }

    if (settings.musicOn) {
      const resume = async () => {
        const ok = await Music.start();
        if (ok) document.getElementById("music-toggle").classList.add("active");
        document.removeEventListener("click", resume);
        document.removeEventListener("keydown", resume);
      };
      document.addEventListener("click", resume, { once: true });
      document.addEventListener("keydown", resume, { once: true });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

  window.MR.App = { renderHome, openGame, renderAdmin };
})();
