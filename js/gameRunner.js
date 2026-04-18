/**
 * gameRunner.js — generic round runner for engine-driven games.
 *
 * MR.GameRunner.create(engineName, gameDef, container, api) mirrors the
 * interface of a hand-written game's create() — it returns a controller
 * with { restart, pause, resume, destroy }. Games just register their
 * configuration; this drives the round.
 */
(function () {
  const { pick } = window.MR.Engines.Util;
  const PRAISES = [
    "Yes! You got it! 🎉", "Beautiful work! 💜", "Woohoo! That's right!",
    "Superstar! ⭐", "You're on fire! 🔥", "Amazing, {NAME}!", "High-five! 🙌",
  ];
  function playerName() {
    const s = (window.MR.Storage && window.MR.Storage.getSettings()) || {};
    return (s.playerName || "friend").trim() || "friend";
  }
  function subName(text) {
    return String(text || "").replace(/\{NAME\}/g, playerName());
  }

  function optionMatches(engine, a, b) {
    if (engine.optionsEqual) return engine.optionsEqual(a, b);
    return a === b;
  }
  function formatOption(engine, opt) {
    if (engine.formatOption) return engine.formatOption(opt);
    return String(opt);
  }
  function formatProblemValue(engine, v) {
    return engine.formatOption ? engine.formatOption(v) : String(v);
  }
  function formatEquationAnswer(engine, answer) {
    if (engine.isFraction) return engine.formatOption(answer);
    return String(answer);
  }
  function formatEquation(engine, problem) {
    // For mixed rounds, defer to the inner engine's op.
    const inner = problem._engine ? window.MR.Engines[problem._engine] : null;
    const op = (inner && inner.op) || engine.op;
    if (op && problem.a != null && problem.b != null) {
      return `
        <div class="problem-equation">
          <span class="num">${problem.a}</span>
          <span class="op">${op}</span>
          <span class="num">${problem.b}</span>
          <span class="eq">=</span>
          <span class="blank">?</span>
        </div>`;
    }
    // place-value / fractions / others → just the blank with a label
    return `<div class="problem-equation"><span class="num">?</span></div>`;
  }

  // Bump difficulty up if the learner has been cruising; dial back after a rough round.
  function adaptConfig(def, cfg) {
    const prog = (window.MR.Storage && window.MR.Storage.getProgress(def.id)) || {};
    const best = prog.bestRoundPct || 0;
    const last = (prog.lastRound && prog.lastRound.pct) || 0;
    const out = { ...cfg };

    if (best >= 0.9 && last >= 0.75) {
      // Bump up gently
      if (typeof out.digits === "number")    out.digits    = Math.min(out.digits + 1, 4);
      if (typeof out.maxFactor === "number") out.maxFactor = Math.min(out.maxFactor + 2, 12);
      if (typeof out.maxDivisor === "number")out.maxDivisor= Math.min(out.maxDivisor + 2, 12);
      if (typeof out.maxDenom === "number")  out.maxDenom  = Math.min(out.maxDenom + 2, 10);
    } else if (last > 0 && last < 0.5) {
      // Dial back
      if (typeof out.digits === "number")    out.digits    = Math.max(out.digits - 1, 1);
      if (typeof out.maxFactor === "number") out.maxFactor = Math.max(out.maxFactor - 2, 3);
      if (typeof out.maxDivisor === "number")out.maxDivisor= Math.max(out.maxDivisor - 2, 3);
      if (typeof out.maxDenom === "number")  out.maxDenom  = Math.max(out.maxDenom - 2, 3);
    }
    return out;
  }

  function speakIfOn(text) {
    const V = window.MR && window.MR.Voice;
    if (V && V.isOn()) V.speak(text, { replace: true });
  }

  function create(engineName, def, container, api) {
    const engine = window.MR.Engines[engineName];
    if (!engine) throw new Error("unknown engine: " + engineName);

    const cfg = adaptConfig(def, def.config || {});
    const problemsPerRound = cfg.problemsPerRound || 8;

    const state = {
      qIndex: 0, score: 0, correct: 0,
      current: null, answered: false, paused: false,
    };

    api.setProgress(0, problemsPerRound);
    api.setScore(0);

    function render() {
      const p = state.current;
      container.innerHTML = "";

      const hintText = engine.hintFor(p);
      const hint = document.createElement("div");
      hint.className = "raccoon-hint";
      hint.innerHTML = `
        <div class="raccoon-small">${api.getRaccoonSvg("think", { size: 72 })}</div>
        <div class="hint-text">${hintText}</div>`;
      speakIfOn(hintText);

      const card = document.createElement("div");
      card.className = "problem-card";
      card.innerHTML = `
        ${formatEquation(engine, p)}
        ${engine.renderVisual(p)}`;

      const opts = document.createElement("div");
      opts.className = "answer-options";
      (p.options || []).forEach((opt) => {
        const btn = document.createElement("button");
        btn.className = "answer-btn";
        btn.innerHTML = formatOption(engine, opt);
        btn.addEventListener("click", () => handleAnswer(btn, opt));
        opts.append(btn);
      });

      const feedback = document.createElement("div");
      feedback.className = "feedback-banner idle";
      feedback.id = "run-feedback";
      feedback.textContent = `Question ${state.qIndex + 1} of ${problemsPerRound}`;

      container.append(hint, card, opts, feedback);
    }

    function handleAnswer(btn, chosen) {
      if (state.answered || state.paused) return;
      state.answered = true;

      const p = state.current;
      const correct = optionMatches(engine, chosen, p.answer);
      const feedback = container.querySelector("#run-feedback");

      container.querySelectorAll(".answer-btn").forEach((b) => b.classList.add("disabled"));

      if (correct) {
        btn.classList.add("correct");
        state.score += 10;
        state.correct += 1;
        api.setScore(state.score);
        feedback.className = "feedback-banner happy";
        const praise = subName(pick(PRAISES));
        feedback.textContent = praise;
        speakIfOn(praise);
      } else {
        btn.classList.add("wrong");
        container.querySelectorAll(".answer-btn").forEach((b) => {
          // Find button whose option equals the correct answer
          const opt = b.__opt;
          if (opt != null && optionMatches(engine, opt, p.answer)) b.classList.add("correct");
          // Fallback: compare rendered text
          if (!b.classList.contains("correct") && b.innerHTML === formatOption(engine, p.answer)) {
            b.classList.add("correct");
          }
        });
        feedback.className = "feedback-banner oops";
        const ans = engine.isFraction
          ? `${p.answer.n}/${p.answer.d}`
          : String(p.answer);
        const msg = `Almost! The answer is ${ans}.`;
        feedback.textContent = msg;
        speakIfOn(msg);
      }

      api.recordAnswer(correct);

      setTimeout(() => {
        state.qIndex += 1;
        if (state.qIndex >= problemsPerRound) finishRound();
        else nextQuestion();
      }, 1450);
    }

    function nextQuestion() {
      state.answered = false;
      state.current = engine.generate(cfg, state.qIndex);
      api.setProgress(state.qIndex, problemsPerRound);
      render();
      // Attach the raw option to each button for robust equality checks.
      const btns = container.querySelectorAll(".answer-btn");
      (state.current.options || []).forEach((opt, i) => { if (btns[i]) btns[i].__opt = opt; });
    }

    function finishRound() {
      api.setProgress(problemsPerRound, problemsPerRound);
      const perfect = state.correct === problemsPerRound;
      const earned = api.completeRound({ correct: state.correct, total: problemsPerRound, perfect });
      const passed = state.correct / problemsPerRound >= 0.75;

      container.innerHTML = "";
      const card = document.createElement("div");
      card.className = "round-complete";
      const msg = perfect
        ? "Every answer right! You're a superstar!"
        : passed
          ? "Great job — you passed! The next game is unlocked."
          : "Keep practicing — you're learning so much!";
      card.innerHTML = `
        <div style="font-size:3rem">${perfect ? "🏆" : passed ? "🎉" : "💜"}</div>
        <h2 style="font-family:var(--font-display);color:var(--c-berry);margin:8px 0">
          ${perfect ? "PERFECT ROUND!" : passed ? "YOU PASSED!" : "Nice try!"}
        </h2>
        <div class="big-num">${state.correct} / ${problemsPerRound}</div>
        <p style="color:var(--c-ink-soft);font-weight:600">${msg}</p>
        ${earned && earned.length ? `
          <div class="earned-trophies">
            ${earned.map((e) => `<div class="earned-trophy">${e.icon} ${e.name}</div>`).join("")}
          </div>` : ""}
      `;
      const actions = document.createElement("div");
      actions.style.cssText = "display:flex;gap:12px;justify-content:center;margin-top:20px;flex-wrap:wrap";
      const againBtn = document.createElement("button");
      againBtn.className = "btn btn-primary";
      againBtn.textContent = "Play Again";
      againBtn.addEventListener("click", () => controller.restart());
      const homeBtn = document.createElement("button");
      homeBtn.className = "btn btn-ghost";
      homeBtn.textContent = "Back Home";
      homeBtn.addEventListener("click", () => api.exit());
      actions.append(againBtn, homeBtn);
      container.append(card, actions);
    }

    const controller = {
      restart() {
        state.qIndex = 0; state.score = 0; state.correct = 0; state.answered = false;
        api.setScore(0);
        nextQuestion();
      },
      pause()  { state.paused = true; },
      resume() { state.paused = false; },
      destroy() {},
    };
    controller.restart();
    return controller;
  }

  window.MR = window.MR || {};
  window.MR.GameRunner = { create };
})();
