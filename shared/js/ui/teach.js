/*!
 * ui/teach.js — Teaching Corner runner.
 *
 * Route: #/<module>/teach/<opId>
 *
 * Flow:
 *   1. Strategy picker — grid of strategy cards for the op
 *   2. Strategy runner — three card-screens per strategy:
 *        Idea    → story hook + central viz
 *        Watch Me → step-paced worked example (Next / Prev / Replay)
 *        Your Turn → 1–2 scaffolded multiple-choice practice problems
 *
 * No timer, no failure penalty. Completion is tracked per strategy.
 */
(function () {
  const { h } = window.MR.Viz;
  const S = window.MR.Storage;
  const C = window.MR.Content;
  const R = window.MR.Router;
  const V = window.MR.Viz;
  const T = (k, v) => window.MR.Strings.t(k, v);

  const TEACH_KEY = "mathRaccoon::v2:teach";

  function readState() {
    try { return JSON.parse(localStorage.getItem(TEACH_KEY)) || { completed: [], lastKey: null }; }
    catch (e) { return { completed: [], lastKey: null }; }
  }
  function writeState(patch) {
    const next = { ...readState(), ...patch };
    try { localStorage.setItem(TEACH_KEY, JSON.stringify(next)); } catch (e) {}
    return next;
  }
  function markStrategyDone(opId, stratId) {
    const key = `${opId}::${stratId}`;
    const s = readState();
    if (!s.completed.includes(key)) s.completed.push(key);
    writeState({ completed: s.completed, lastKey: key });
  }
  function isStrategyDone(opId, stratId) {
    return readState().completed.includes(`${opId}::${stratId}`);
  }

  function mountTo(node) {
    const screen = document.getElementById("screen");
    screen.innerHTML = "";
    screen.appendChild(node);
  }

  function interp(text) {
    const name = (S.getSettings().playerName || "friend").trim() || "friend";
    return String(text || "").replace(/\{(\w+)\}/g, (m, k) =>
      k === "NAME" || k === "name" ? name : m
    );
  }

  // Lesson authors embed <strong>/<em> in hook/text/prompt/hint strings.
  // These are trusted (author-controlled, not user input) so innerHTML is safe.
  function richP(cls, raw) {
    const p = document.createElement("p");
    p.className = cls;
    p.innerHTML = interp(raw);
    return p;
  }

  function renderViz(spec) {
    if (!spec) return h("div");
    const node = V.render(spec);
    return node || h("div");
  }

  // ==========================================================================
  // STRATEGY PICKER
  // ==========================================================================
  function renderPicker({ moduleId, op }) {
    const m = C.getModule(moduleId);
    const accent = m ? m.accent : "#a78bfa";

    const back = h("button", { class: "hero-back", onclick: () => R.go(R.moduleHash(moduleId)) }, [
      h("span", { class: "hero-back-arrow", "aria-hidden": "true" }, "←"),
      h("span", {}, "Back to book"),
    ]);

    const header = h("div", {
      class: "module-hero teach-hero",
      style: `--hero-accent:${accent};`,
    }, [
      h("div", { class: "hero-slot hero-left" }, [back]),
      h("div", { class: "hero-slot hero-center" }, [
        h("div", { class: "hero-badge", "aria-hidden": "true" }, [
          h("span", { class: "hero-badge-glow" }),
          h("span", { class: "hero-emoji" }, op.emoji || "🎓"),
        ]),
        h("h1", { class: "hero-title" }, op.label),
        h("p", { class: "hero-subtitle" }, "Pick a strategy to explore"),
      ]),
      h("div", { class: "hero-slot hero-right" }, [
        h("div", { class: "hero-ring-placeholder", "aria-hidden": "true" }),
      ]),
    ]);

    const cards = (op.strategies || []).map((strat) => {
      const done = isStrategyDone(op.id, strat.id);
      return h("button", {
        class: "teach-strat-card" + (done ? " done" : ""),
        style: `--card-accent:${accent};`,
        onclick: () => renderStrategy({ moduleId, op, strategy: strat }),
      }, [
        h("span", { class: "teach-strat-emoji" }, strat.emoji || "💡"),
        h("div", { class: "teach-strat-title" }, strat.title),
        strat.subtitle ? h("div", { class: "teach-strat-sub" }, strat.subtitle) : null,
        h("div", { class: "teach-strat-meta" }, done ? "✨ Explored" : "Let's go →"),
      ]);
    });

    const grid = h("div", { class: "teach-strat-grid" }, cards);
    mountTo(h("div", { class: "screen" }, [header, grid]));
  }

  // ==========================================================================
  // STRATEGY RUNNER (3-screen stepper)
  // ==========================================================================
  function renderStrategy({ moduleId, op, strategy }) {
    const m = C.getModule(moduleId);
    const accent = m ? m.accent : "#a78bfa";

    const state = {
      screen: 0,          // 0=idea, 1=watch, 2=practice
      watchStep: 0,
      practiceIdx: 0,
      practiceAnswered: false,
    };

    const back = h("button", { class: "hero-back", onclick: () => renderPicker({ moduleId, op }) }, [
      h("span", { class: "hero-back-arrow", "aria-hidden": "true" }, "←"),
      h("span", {}, "All strategies"),
    ]);

    const header = h("div", {
      class: "module-hero teach-hero",
      style: `--hero-accent:${accent};`,
    }, [
      h("div", { class: "hero-slot hero-left" }, [back]),
      h("div", { class: "hero-slot hero-center" }, [
        h("h1", { class: "hero-title hero-title-compact" }, `${strategy.emoji || "💡"} ${strategy.title}`),
        h("p", { class: "hero-subtitle" }, op.label),
      ]),
      h("div", { class: "hero-slot hero-right" }, [
        h("div", { class: "hero-ring-placeholder", "aria-hidden": "true" }),
      ]),
    ]);

    // Step indicator
    const screenLabels = ["The Idea", "Watch Me", "Your Turn"];
    const dots = screenLabels.map((_, i) =>
      h("span", { class: "teach-step-dot" + (i === state.screen ? " active" : "") + (i < state.screen ? " done" : "") })
    );
    const dotsRow = h("div", { class: "teach-step-dots" }, dots);
    const stepLabel = h("div", { class: "teach-step-label" }, screenLabels[state.screen]);
    const stepBar = h("div", { class: "teach-step-bar" }, [stepLabel, dotsRow]);

    const card = h("div", { class: "teach-card", style: `--card-accent:${accent};` });

    function updateStepBar() {
      stepLabel.textContent = screenLabels[state.screen];
      dots.forEach((d, i) => {
        d.classList.toggle("active", i === state.screen);
        d.classList.toggle("done", i < state.screen);
      });
    }

    function renderIdea() {
      card.innerHTML = "";
      const idea = strategy.idea || {};
      card.appendChild(h("h2", { class: "teach-card-title" }, "💭 The Idea"));
      if (idea.hook) {
        card.appendChild(richP("teach-card-lede", idea.hook));
      }
      if (idea.viz) {
        card.appendChild(renderViz(idea.viz));
      }
      if (idea.caption) {
        card.appendChild(richP("teach-card-caption", idea.caption));
      }

      const nav = h("div", { class: "teach-card-nav" }, [
        h("button", { class: "btn btn-ghost", onclick: () => renderPicker({ moduleId, op }) }, "← All strategies"),
        h("button", { class: "btn btn-primary", onclick: () => go(1) }, "Watch me →"),
      ]);
      card.appendChild(nav);
    }

    function renderWatch() {
      card.innerHTML = "";
      const frames = strategy.watchMe || [];
      const idx = Math.min(state.watchStep, Math.max(0, frames.length - 1));
      const frame = frames[idx] || {};

      card.appendChild(h("h2", { class: "teach-card-title" }, "👀 Watch Me"));
      card.appendChild(h("div", { class: "teach-watch-counter" }, `Step ${idx + 1} of ${frames.length}`));

      if (frame.viz) card.appendChild(renderViz(frame.viz));
      if (frame.text) card.appendChild(richP("teach-card-lede", frame.text));
      if (frame.equation) {
        const eq = h("div", { class: "teach-watch-eq" });
        eq.innerHTML = frame.equation;
        card.appendChild(eq);
      }

      const prev = h("button", {
        class: "btn btn-ghost",
        onclick: () => { if (state.watchStep > 0) { state.watchStep--; renderWatch(); } },
      }, "← Prev");
      const replay = h("button", {
        class: "btn btn-ghost",
        onclick: () => { state.watchStep = 0; renderWatch(); },
      }, "↻ Replay");
      const next = idx < frames.length - 1
        ? h("button", { class: "btn btn-primary", onclick: () => { state.watchStep++; renderWatch(); } }, "Next step →")
        : h("button", { class: "btn btn-primary", onclick: () => go(2) }, "Your turn →");

      prev.disabled = idx === 0;
      if (idx === 0) prev.classList.add("disabled");

      const nav = h("div", { class: "teach-card-nav" }, [prev, replay, next]);
      card.appendChild(nav);
    }

    function renderPractice() {
      card.innerHTML = "";
      const problems = strategy.practice || [];
      const idx = Math.min(state.practiceIdx, Math.max(0, problems.length - 1));
      const prob = problems[idx];

      card.appendChild(h("h2", { class: "teach-card-title" }, "🌟 Your Turn"));

      if (!prob) {
        card.appendChild(h("p", { class: "teach-card-lede" }, "Nothing to practice here yet. Great exploring!"));
        card.appendChild(h("div", { class: "teach-card-nav" }, [
          h("button", { class: "btn btn-ghost", onclick: () => go(1) }, "← Back to Watch Me"),
          h("button", { class: "btn btn-primary", onclick: () => finish() }, "Done ✓"),
        ]));
        return;
      }

      card.appendChild(h("div", { class: "teach-practice-counter" },
        `Problem ${idx + 1} of ${problems.length}`));

      if (prob.prompt) card.appendChild(richP("teach-card-lede", prob.prompt));
      if (prob.viz) card.appendChild(renderViz(prob.viz));

      const feedback = h("div", { class: "feedback-banner idle" }, "Pick an answer.");

      const opts = h("div", { class: "answer-options teach-answer-options" });
      (prob.options || []).forEach((opt) => {
        const btn = h("button", { class: "answer-btn" });
        btn.textContent = String(opt);
        btn.onclick = () => {
          if (state.practiceAnswered) return;
          state.practiceAnswered = true;
          const correct = opt === prob.answer;
          btn.classList.add(correct ? "correct" : "wrong");
          opts.querySelectorAll(".answer-btn").forEach((b) => b.classList.add("disabled"));
          if (!correct) {
            opts.querySelectorAll(".answer-btn").forEach((b) => {
              if (b.textContent === String(prob.answer)) b.classList.add("correct");
            });
          }
          feedback.className = "feedback-banner " + (correct ? "happy" : "oops");
          feedback.textContent = correct
            ? "Yes! Beautiful. 💜"
            : `Almost — the answer is ${prob.answer}.`;

          // Swap next button in
          nextBtn.classList.remove("disabled");
          nextBtn.disabled = false;
          nextBtn.textContent = (idx < problems.length - 1) ? "Next problem →" : "Done ✓";
        };
        opts.appendChild(btn);
      });
      card.appendChild(opts);
      card.appendChild(feedback);

      const hintBtn = h("button", {
        class: "btn btn-ghost",
        onclick: () => {
          const text = prob.hint || "Take a breath — try walking through the Watch Me again if you need a peek.";
          feedback.className = "feedback-banner idle";
          feedback.innerHTML = interp(text);
        },
      }, "💡 Hint");

      const nextBtn = h("button", {
        class: "btn btn-primary disabled",
        onclick: () => {
          if (!state.practiceAnswered) return;
          if (idx < problems.length - 1) {
            state.practiceIdx++;
            state.practiceAnswered = false;
            renderPractice();
          } else {
            finish();
          }
        },
      }, "Pick an answer first");
      nextBtn.disabled = true;

      const nav = h("div", { class: "teach-card-nav" }, [
        h("button", { class: "btn btn-ghost", onclick: () => go(1) }, "← Watch Me"),
        hintBtn,
        nextBtn,
      ]);
      card.appendChild(nav);
    }

    function go(screen) {
      state.screen = screen;
      state.practiceAnswered = false;
      updateStepBar();
      if (screen === 0) renderIdea();
      else if (screen === 1) { state.watchStep = 0; renderWatch(); }
      else renderPractice();
    }

    function finish() {
      markStrategyDone(op.id, strategy.id);
      card.innerHTML = "";
      card.appendChild(h("div", { class: "teach-done" }, [
        h("div", { class: "teach-done-badge" }, "✨"),
        h("h2", { class: "teach-card-title" }, "You explored it!"),
        h("p", { class: "teach-card-lede" },
          interp(`Nice work, {NAME}. You just worked through "${strategy.title}".`)),
        h("div", { class: "teach-card-nav" }, [
          h("button", { class: "btn btn-primary", onclick: () => renderPicker({ moduleId, op }) }, "Pick another strategy"),
          h("button", { class: "btn btn-ghost", onclick: () => R.go(R.moduleHash(moduleId)) }, "Back to book"),
        ]),
      ]));
    }

    mountTo(h("div", { class: "screen" }, [header, stepBar, card]));
    renderIdea();
  }

  // ==========================================================================
  // ENTRY
  // ==========================================================================
  function runTeach({ moduleId, id }) {
    const op = C.getOp(id);
    if (!op) { R.go(R.moduleHash(moduleId)); return; }
    renderPicker({ moduleId, op });
  }

  window.MR = window.MR || {};
  window.MR.Teach = { runTeach };
})();
