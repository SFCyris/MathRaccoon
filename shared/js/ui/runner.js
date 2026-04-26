/*!
 * ui/runner.js — generic round runner. Pulls problems from a registered engine,
 * asks multiple-choice questions, reports result, persists progress.
 *
 * Supports:
 *   - runChapter({moduleId, id})  — intro → round → outro → back
 *   - runArcade({moduleId, id})   — bare round → result → back
 *
 * Engine extension points:
 *   - engine.generate(cfg, qIndex) → problem {options, answer, ...}
 *   - engine.renderPrompt(problem)
 *   - engine.renderVisual(problem)
 *   - engine.formatOption(opt, problem?) → HTML string (optional)
 *   - engine.optionsEqual(a, b, problem?) → boolean (optional)
 */
(function () {
  const { h } = window.MR.Viz;
  const S = window.MR.Storage;
  const C = window.MR.Content;
  const R = window.MR.Router;
  const T = (k, v) => window.MR.Strings.t(k, v);
  const StoryReader = window.MR.StoryReader;
  const Engines = window.MR.Engines;

  function mountTo(node) {
    const screen = document.getElementById("screen");
    screen.innerHTML = "";
    screen.appendChild(node);
  }

  const PRAISES = [
    "Yes! You got it! 🎉", "Beautiful work! 💜", "Woohoo! That's right!",
    "Superstar! ⭐", "You're on fire! 🔥", "Amazing, {NAME}!", "High-five! 🙌",
  ];
  function playerName() {
    const s = (S && S.getSettings && S.getSettings()) || {};
    return (s.playerName || "friend").trim() || "friend";
  }
  function subName(text) {
    return String(text || "").replace(/\{NAME\}/g, playerName());
  }
  // HTML-safe variant: escapes the player name when interpolating into a
  // string that will be assigned via innerHTML. The template itself is
  // trusted (engine output / static strings); only the substituted name
  // could in theory contain stray characters.
  function escapeHtml(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }
  function subNameHtml(template) {
    return String(template || "").replace(/\{NAME\}/g, escapeHtml(playerName()));
  }
  function pickPraise() {
    return subName(PRAISES[Math.floor(Math.random() * PRAISES.length)]);
  }

  function formatEquation(engine, p) {
    const op = (p && p.op) || engine.op;
    if (op && p.a != null && p.b != null) {
      return `
        <div class="problem-equation">
          <span class="num">${p.a}</span>
          <span class="op">${op}</span>
          <span class="num">${p.b}</span>
          <span class="eq">=</span>
          <span class="blank">?</span>
        </div>`;
    }
    if (engine.renderPrompt) {
      return `<div class="problem-equation">${engine.renderPrompt(p)}</div>`;
    }
    return `<div class="problem-equation"><span class="blank">?</span></div>`;
  }

  function formatAnswerText(engine, answer, problem) {
    if (engine.formatOption) return engine.formatOption(answer, problem);
    return String(answer);
  }

  // Map a (module, engine, config, problem) to the best-matching Teaching
  // Corner op id. Chapters/arcades can opt in explicitly via `learnOp`; when
  // they don't, we try to infer from engine + op / modes / topics. Returns
  // `null` if no confident match (in which case the "Learn more" button hides).
  function resolveTeachOp(moduleId, engineKey, engineConfig, problem, explicit) {
    if (explicit) return explicit;
    const cfg = engineConfig || {};
    const op  = (problem && problem.op) || cfg.op;
    const mode = (cfg.modes && cfg.modes[0]) || (cfg.topics && cfg.topics[0]);

    if (moduleId === "arithmetic") {
      if (engineKey === "arithmetic" || engineKey === "mixed") {
        if (op === "+") return "ari-op-addition";
        if (op === "-") return "ari-op-subtraction";
        if (op === "×" || op === "*" || op === "x") return "ari-op-multiplication";
        if (op === "÷" || op === "/") return "ari-op-division";
      }
      if (engineKey === "fraction") {
        if (mode === "equivalent")  return "ari-op-equivalent-fractions";
        if (mode === "compare")     return "ari-op-compare-fractions";
        if (mode === "numberline")  return "ari-op-fractions-numberline";
        return "ari-op-fractions";
      }
      if (engineKey === "placeValue")  return "ari-op-place-value";
      if (engineKey === "wordProblem") return "ari-op-word-problems";
    }

    if (moduleId === "measurement") {
      if (mode === "length")   return "mea-op-length";
      if (mode === "time")     return "mea-op-time";
      if (mode === "elapsed")  return "mea-op-elapsed-time";
      if (mode === "money")    return "mea-op-money";
      if (mode === "capacity") return "mea-op-capacity";
      if (mode === "convert" || mode === "units") return "mea-op-unit-convert";
    }

    if (moduleId === "geometry") {
      if (mode === "shapes")         return "geo-op-shapes";
      if (mode === "perimeter")      return "geo-op-perimeter";
      if (mode === "area")           return "geo-op-area";
      if (mode === "quadrilaterals") return "geo-op-quadrilaterals";
      if (mode === "partition" || mode === "fractions") return "geo-op-partition";
    }

    if (moduleId === "data") {
      if (mode === "pictograph" || mode === "picto") return "dat-op-pictograph";
      if (mode === "line-plot" || mode === "lineplot" || mode === "plot") return "dat-op-line-plot";
      if (mode === "graphs" || mode === "bar") return "dat-op-graphs";
    }

    if (moduleId === "reading") {
      if (mode === "vocabulary")    return "rd-op-vocabulary";
      if (mode === "grammar")       return "rd-op-grammar";
      if (mode === "phonics")       return "rd-op-phonics";
      if (mode === "figurative")    return "rd-op-figurative";
      if (mode === "comprehension") return "rd-op-comprehension";
    }

    return null;
  }

  function runRound({ id, moduleId, kind, title, emoji, engineKey, engineConfig, learnOp, total, onPass, onFail, onFinish }) {
    const engine = Engines[engineKey];
    if (!engine || !engine.generate) {
      mountTo(h("div", { class: "card" }, [
        h("p", {}, `Engine "${engineKey}" not found.`),
        h("button", { class: "btn", onclick: () => R.go(R.moduleHash(moduleId)) }, "Back"),
      ]));
      return;
    }

    // Let engines pre-plan a round (pool-backed arcade) so questions don't repeat.
    let planned = null;
    if (engine.planRound) {
      try { planned = engine.planRound(engineConfig || {}, total); } catch (e) { planned = null; }
      if (planned && planned.length) total = planned.length;
    }

    const state = {
      qIndex: 0, correct: 0, score: 0, streak: 0,
      paused: false, answered: false, current: null,
      // Track wrong-answered problems for optional end-of-round revisit.
      misses: [], seenProblems: [],
      revisiting: false, revisitQueue: [], revisitIdx: 0,
    };

    // Build persistent shell (header stays mounted across questions)
    const titleEl = h("h2", { class: "g-title" }, [
      h("span", {}, `${emoji || "🎮"} `),
      title || "Practice",
    ]);
    const progFill  = h("div", { class: "fill" });
    const progLabel = h("div", { class: "label" }, `Q 0 / ${total}`);
    const progBar   = h("div", { class: "progress-bar" }, [progFill, progLabel]);
    const scoreNum  = h("strong", {}, "0");
    const scoreEl   = h("span", { class: "score-chip" }, [h("span", {}, "⭐ "), scoreNum]);

    const pauseBtn   = h("button", { class: "g-icon-btn" }, "⏸ Pause");
    const restartBtn = h("button", { class: "g-icon-btn" }, "🔄 Restart");
    const homeBtn    = h("button", { class: "g-icon-btn danger" }, "⏹ Home");

    pauseBtn.onclick = () => {
      state.paused = !state.paused;
      pauseBtn.textContent = state.paused ? "▶ Resume" : "⏸ Pause";
    };
    restartBtn.onclick = () => {
      state.qIndex = 0; state.correct = 0; state.score = 0; state.streak = 0;
      scoreNum.textContent = "0";
      step();
    };
    homeBtn.onclick = () => R.go(R.moduleHash(moduleId));

    const header = h("div", { class: "game-header" }, [
      titleEl, progBar, scoreEl,
      h("div", { class: "g-controls" }, [pauseBtn, restartBtn, homeBtn]),
    ]);

    const body = h("div", { class: "game-body" });
    const shell = h("div", { class: "screen" }, [
      h("div", { class: "game-shell" }, [header, body]),
    ]);

    function setProgress() {
      const pct = total ? Math.min(100, Math.round((state.qIndex / total) * 100)) : 0;
      progFill.style.width = pct + "%";
      progLabel.textContent = `Q ${state.qIndex} / ${total}`;
    }

    function renderQuestion() {
      if (state.revisiting) {
        state.current = state.revisitQueue[state.revisitIdx];
      } else if (planned && planned[state.qIndex]) {
        state.current = planned[state.qIndex];
        state.seenProblems.push(state.current);
      } else {
        state.current = engine.generate(engineConfig, state.qIndex);
        state.seenProblems.push(state.current);
      }
      state.answered = false;
      setProgress();

      body.innerHTML = "";

      const hintText = engine.hintFor ? engine.hintFor(state.current) : "";
      const raccoonSvg = (window.MR.Raccoon && window.MR.Raccoon.render)
        ? window.MR.Raccoon.render("think", { size: 72 })
        : "🦝";
      const hint = h("div", { class: "raccoon-hint" });

      // "Learn more" — links out to the relevant Teaching Corner op for the
      // current question. Hidden if we can't confidently pick a topic.
      const teachOpId = resolveTeachOp(moduleId, engineKey, engineConfig, state.current, learnOp);
      let learnBtnHtml = "";
      if (teachOpId) {
        const teachOp = C.getOp ? C.getOp(teachOpId) : null;
        const title = teachOp ? `Learn more about ${teachOp.label || teachOp.title || "this"}` : "Learn more";
        learnBtnHtml = `<button type="button" class="raccoon-hint-learn" data-teach-op="${teachOpId}" title="${title}">
          <span class="learn-emoji">🎓</span>
          <span class="learn-label">Learn more</span>
        </button>`;
      }

      hint.innerHTML = `
        ${learnBtnHtml}
        <div class="raccoon-small">${raccoonSvg}</div>
        <div class="hint-text">${subName(hintText)}</div>`;

      if (teachOpId) {
        const learnBtn = hint.querySelector(".raccoon-hint-learn");
        if (learnBtn) {
          learnBtn.addEventListener("click", () => {
            R.go(R.teachHash(moduleId, teachOpId));
          });
        }
      }

      const card = h("div", { class: "problem-card" });
      const vizHtml = engine.renderVisual ? engine.renderVisual(state.current) : "";
      card.innerHTML = `
        ${formatEquation(engine, state.current)}
        ${typeof vizHtml === "string" ? vizHtml : (vizHtml && vizHtml.outerHTML) || ""}`;

      const opts = h("div", { class: "answer-options" });
      if (state.current.interactive) {
        // Interactive problems render their widget inside the card; we only
        // need one big "Check my answer" button here.
        opts.classList.add("answer-options-check");
        const btn = h("button", { class: "answer-btn answer-btn-check" });
        btn.innerHTML = "✓ Check my answer";
        btn.__opt = state.current.options && state.current.options[0];
        btn.onclick = () => handleAnswer(btn, btn.__opt);
        opts.appendChild(btn);
      } else {
        (state.current.options || []).forEach((opt) => {
          const btn = h("button", { class: "answer-btn" });
          btn.innerHTML = engine.formatOption ? engine.formatOption(opt, state.current) : String(opt);
          btn.__opt = opt;
          btn.onclick = () => handleAnswer(btn, opt);
          opts.appendChild(btn);
        });
      }

      const feedback = h("div", { class: "feedback-banner idle" }, `Question ${state.qIndex + 1} of ${total}`);
      feedback.id = "run-feedback";

      body.appendChild(hint);
      body.appendChild(card);
      body.appendChild(opts);
      body.appendChild(feedback);

      // Post-mount wiring hook — interactive engines attach drag handlers etc.
      if (engine.wireInteractive && state.current.interactive) {
        try { engine.wireInteractive(state.current, body); } catch (e) { console.warn("wireInteractive failed", e); }
      }
    }

    function handleAnswer(btn, chosen) {
      if (state.answered || state.paused) return;
      state.answered = true;

      const p = state.current;
      const isEq = engine.optionsEqual
        ? engine.optionsEqual(chosen, p.answer, p)
        : chosen === p.answer;

      body.querySelectorAll(".answer-btn").forEach((b) => b.classList.add("disabled"));

      const feedback = body.querySelector("#run-feedback");

      // Advances to the next problem. Used both by the auto-advance on a
      // correct answer and by the Continue button on a wrong answer — so
      // the flow is identical either way.
      const advance = () => {
        if (state.revisiting) {
          state.revisitIdx += 1;
          step();
        } else {
          state.qIndex += 1;
          step();
        }
      };

      if (isEq) {
        btn.classList.add("correct");
        if (state.revisiting) {
          // Credit the do-over: bump correct count and score, remove from misses.
          state.correct += 1;
          state.score += 10;
          scoreNum.textContent = String(state.score);
        } else {
          state.correct += 1;
          state.streak += 1;
          state.score += 10;
          scoreNum.textContent = String(state.score);
        }
        if (feedback) {
          feedback.className = "feedback-banner happy";
          // Praise text is plain — no HTML — but go through innerHTML for
          // consistency with the wrong-answer path. subNameHtml escapes the
          // player name so a stray char in the name can't break the markup.
          feedback.innerHTML = subNameHtml(state.revisiting ? "Yes! Nice comeback. 💜" : pickPraise());
        }
      } else {
        btn.classList.add("wrong");
        state.streak = 0;
        if (!state.revisiting) {
          state.misses.push(p);
        }
        if (!p.interactive) {
          body.querySelectorAll(".answer-btn").forEach((b) => {
            const opt = b.__opt;
            const match = opt != null && (engine.optionsEqual
              ? engine.optionsEqual(opt, p.answer, p)
              : opt === p.answer);
            if (match) b.classList.add("correct");
          });
        }
        if (feedback) {
          feedback.className = "feedback-banner oops";
          // Use innerHTML — the answer can include markup (fractions, place-
          // value spans, equations) that would otherwise show up as raw
          // <span class="..."> text. The template itself is trusted; only
          // the player name needs escaping (handled by subNameHtml).
          const messageHtml = p.interactive
            ? "Not quite — the right answer is shown below. Keep going, {NAME}!"
            : `Almost! The answer is ${formatAnswerText(engine, p.answer, p)}.`;
          feedback.innerHTML = `
            <div class="feedback-message">${subNameHtml(messageHtml)}</div>
            <button type="button" class="feedback-continue">Got it →</button>
          `;
          // Wait for explicit acknowledgement — kids with reading or
          // processing differences need time to read and absorb the
          // feedback before the next problem appears.
          const continueBtn = feedback.querySelector(".feedback-continue");
          if (continueBtn) {
            continueBtn.addEventListener("click", () => {
              advance();
            });
            // Move keyboard focus onto the Continue button so it can be
            // dismissed with Enter/Space, and so screen readers announce
            // the feedback when it appears.
            requestAnimationFrame(() => continueBtn.focus());
          }
        }
        if (p.interactive && engine.revealAnswer) {
          try { engine.revealAnswer(p, body); } catch (e) { /* ignore */ }
        }
      }

      S.recordAnswer(id, isEq, state.streak);

      // Trophy + critter-drip hooks.
      const Rewards = window.MR.Rewards;
      if (Rewards) {
        Rewards.checkAchievements({
          event: "answer",
          gameId: id,
          moduleId,
          correct: isEq,
          streak: state.streak,
        });
        if (isEq) Rewards.maybeDripAfterAnswer();
      }

      // Correct → auto-advance after a short pause for the praise to land.
      // Wrong  → wait for the kid to click "Got it →".
      if (isEq) {
        setTimeout(advance, 1200);
      }
    }

    function step() {
      if (state.revisiting) {
        if (state.revisitIdx >= state.revisitQueue.length) return finishRevisit();
        renderQuestion();
        return;
      }
      if (state.qIndex >= total) return finish();
      renderQuestion();
    }

    function startRevisit(queue) {
      state.revisiting = true;
      state.revisitQueue = queue;
      state.revisitIdx = 0;
      state.answered = false;
      // Reset misses — as they get answered correctly they drop off.
      state.misses = queue.slice();
      // Swap progress label to revisit mode.
      total = queue.length;
      state.qIndex = 0;
      titleEl.textContent = "";
      titleEl.appendChild(document.createTextNode("🔁 "));
      titleEl.appendChild(document.createTextNode("Revisit — " + (title || "Practice")));
      // Result card replaced the shell on screen; remount before rendering.
      mountTo(shell);
      step();
    }

    function finishRevisit() {
      // Re-show the overall result using the updated correct count.
      const origTotal = (planned && planned.length) || total;
      const pct = state.correct / origTotal;
      const passed = pct >= S.UNLOCK_THRESHOLD;
      S.recordRoundResult(id, state.correct, origTotal);
      if (passed && onPass) onPass({ correct: state.correct, total: origTotal });

      const Rewards = window.MR.Rewards;
      if (Rewards) {
        Rewards.checkAchievements({
          event: "round_complete",
          gameId: id,
          moduleId,
          kind: kind || null,
          passed,
          roundPct: pct,
          roundPerfect: state.correct === origTotal && origTotal > 0,
          revisited: true,
        });
      }

      // Daily Challenge — bump streak if revisit brought the round to a pass.
      if (window.MR.DailyChallenge) {
        window.MR.DailyChallenge.markCompleted(id, passed);
      }

      if (onFinish) onFinish({ correct: state.correct, total: origTotal, passed, revisited: true });
    }

    function finish() {
      setProgress();
      S.recordRoundResult(id, state.correct, total);
      const pct = state.correct / total;
      const passed = pct >= S.UNLOCK_THRESHOLD;
      if (passed && onPass) onPass({ correct: state.correct, total });
      else if (!passed && onFail) onFail({ correct: state.correct, total });

      // Trophy check for round-complete events.
      const Rewards = window.MR.Rewards;
      if (Rewards) {
        Rewards.checkAchievements({
          event: "round_complete",
          gameId: id,
          moduleId,
          kind: kind || null,
          passed,
          roundPct: pct,
          roundPerfect: state.correct === total && total > 0,
        });
      }

      // Daily Challenge — if this was today's pick and the round passed,
      // bump the challenge streak.
      if (window.MR.DailyChallenge) {
        window.MR.DailyChallenge.markCompleted(id, passed);
      }

      // Offer revisit only when: config enables it, at least one miss exists,
      // and we're not already in revisit mode.
      const canRevisit = !!(engineConfig && engineConfig.revisit) && state.misses.length > 0;
      if (onFinish) onFinish({
        correct: state.correct,
        total,
        passed,
        canRevisit,
        missCount: state.misses.length,
        startRevisit: canRevisit ? () => startRevisit(state.misses.slice()) : null,
      });
    }

    mountTo(shell);
    step();
  }

  function runChapter({ moduleId, id }) {
    const ch = C.getChapter(id);
    if (!ch) { R.go(R.moduleHash(moduleId)); return; }

    let phase = "intro";
    S.recordRun(id);

    function startRound() {
      runRound({
        id,
        moduleId,
        kind: "chapter",
        title: ch.title,
        emoji: ch.emoji,
        engineKey: ch.engine,
        engineConfig: ch.engineConfig || {},
        learnOp: ch.learnOp || null,
        total: (ch.engineConfig && ch.engineConfig.problemsPerRound) || 6,
        onPass: () => {
          const firstPass = S.markChapterComplete(id);
          const Rewards = window.MR.Rewards;
          // Chapter-declared rewards (critter + journal entry).
          if (ch.rewards && ch.rewards.critterOnPass) {
            const critter = C.getCritter(ch.rewards.critterOnPass);
            if (Rewards) Rewards.earnCritter(critter);
            else S.earnCritter(ch.rewards.critterOnPass);
          }
          if (ch.rewards && ch.rewards.journalEntry) {
            const entry = C.getJournalEntry(ch.rewards.journalEntry);
            if (Rewards) Rewards.unlockJournal(entry);
            else S.unlockJournalEntry(ch.rewards.journalEntry);
          }
          // Module finale: if every chapter in this module is now done, unlock
          // the module's "finale" journal entry (if one is declared).
          (function checkModuleFinale() {
            const mod = C.getModule(moduleId);
            if (!mod || !Array.isArray(mod.chapters)) return;
            const doneSet = new Set(S.getChapters());
            const allDone = mod.chapters.every((cid) => doneSet.has(cid));
            if (!allDone) return;
            const finale = C.allJournalEntries().find(
              (e) => e.moduleId === moduleId && e.finale === true
            );
            if (!finale) return;
            if (Rewards) Rewards.unlockJournal(finale);
            else S.unlockJournalEntry(finale.id);
          })();
          // Friend + module mascot (only on first pass; safe to re-call — dup-guarded).
          if (Rewards) Rewards.onChapterPassed(id);
        },
        onFinish: ({ correct, total, passed }) => {
          showChapterResult({ ch, moduleId, correct, total, passed });
        },
      });
    }

    function showChapterResult({ ch, moduleId, correct, total, passed }) {
      const buttons = [];
      if (passed) {
        buttons.push(h("button", {
          class: "btn btn-primary",
          onclick: () => {
            StoryReader.render({
              chapter: ch,
              lines: ch.narrative.outro || [],
              mount: mountTo,
              isOutro: true,
              onDone: () => R.go(R.moduleHash(moduleId)),
            });
          },
        }, T("runner.continue")));
      } else {
        buttons.push(h("button", {
          class: "btn btn-primary",
          onclick: () => startRound(),
        }, "Try again"));
      }
      buttons.push(h("button", {
        class: "btn btn-ghost",
        onclick: () => R.go(R.moduleHash(moduleId)),
      }, T("runner.home")));

      mountTo(h("div", { class: "screen" }, [
        h("div", { class: "card" }, [
          h("h2", {}, passed ? T("runner.pass") : T("runner.retry")),
          h("p", {}, T("runner.result", { correct, total })),
          h("div", { style: "display:flex;gap:10px;margin-top:12px;justify-content:center;flex-wrap:wrap" }, buttons),
        ]),
      ]));
    }

    if (phase === "intro") {
      StoryReader.render({
        chapter: ch,
        lines: ch.narrative.intro || [],
        mount: mountTo,
        onDone: () => { phase = "round"; startRound(); },
      });
    }
  }

  function runArcade({ moduleId, id }) {
    const g = C.getGame(id);
    if (!g) { R.go(R.moduleHash(moduleId)); return; }
    S.recordRun(id);

    function start() {
      runRound({
        id,
        moduleId,
        kind: "arcade",
        title: g.title,
        emoji: g.emoji,
        engineKey: g.engine,
        engineConfig: g.engineConfig || {},
        learnOp: g.learnOp || null,
        total: (g.engineConfig && g.engineConfig.problemsPerRound) || 8,
        onFinish: (res) => showResult(res),
      });
    }

    function showResult({ correct, total, passed, canRevisit, missCount, startRevisit, revisited }) {
      const buttons = [];
      if (canRevisit && !revisited) {
        buttons.push(h("button", {
          class: "btn btn-primary",
          onclick: () => startRevisit(),
        }, `🔁 Retry ${missCount} missed`));
      }
      buttons.push(h("button", {
        class: canRevisit && !revisited ? "btn btn-ghost" : "btn btn-primary",
        onclick: () => start(),
      }, "Play again"));
      buttons.push(h("button", {
        class: "btn btn-ghost",
        onclick: () => R.go(R.moduleHash(moduleId)),
      }, T("runner.home")));

      mountTo(h("div", { class: "screen" }, [
        h("div", { class: "card" }, [
          h("h2", {}, passed ? T("runner.pass") : T("runner.retry")),
          h("p", {}, T("runner.result", { correct, total })),
          revisited
            ? h("p", { class: "hint-text" }, "Nice comeback on the missed ones!")
            : (canRevisit ? h("p", { class: "hint-text" }, "Want to take another swing at the ones you missed?") : null),
          h("div", { style: "display:flex;gap:10px;margin-top:12px;justify-content:center;flex-wrap:wrap" }, buttons),
        ]),
      ]));
    }

    start();
  }

  window.MR = window.MR || {};
  window.MR.Runner = { runChapter, runArcade };
})();
