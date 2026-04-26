/*!
 * ui/dailyVisit.js — once-per-day raccoon hello on hub load.
 * Shows a streak chip and offers ONE quick question pulled from a random engine.
 * Skipped when Calm mode is on, or when today's visit is already stamped.
 *
 * Usage:
 *   MR.DailyVisit.maybeShow()    // call after hub renders
 *   MR.DailyVisit.forceShow()    // debug: bypass the once-a-day guard
 */
(function () {
  const S = window.MR.Storage;
  const Engines = window.MR.Engines;

  function playerName() {
    const s = (S && S.getSettings && S.getSettings()) || {};
    return (s.playerName || "friend").trim() || "friend";
  }

  // Pick a friendly, easy one-shot problem. Falls through to arithmetic add
  // if a chosen engine throws, so the popup never crashes the hub.
  function pickProblem() {
    const choices = [
      () => Engines.arithmetic.generate({ op: "+", digits: 1 }, 0),
      () => Engines.arithmetic.generate({ op: "-", digits: 1 }, 0),
      () => Engines.arithmetic.generate({ op: "×", minFactor: 1, maxFactor: 5 }, 0),
      () => Engines.placeValue && Engines.placeValue.generate({ digits: 2, modes: ["read"] }, 0),
      () => Engines.fraction && Engines.fraction.generate({ modes: ["name"] }, 0),
    ].filter(Boolean);
    for (let i = 0; i < 4; i++) {
      const fn = choices[Math.floor(Math.random() * choices.length)];
      try {
        const p = fn();
        if (p && Array.isArray(p.options) && p.options.length) {
          return { engine: engineForProblem(p), problem: p };
        }
      } catch (e) { /* try again */ }
    }
    return {
      engine: Engines.arithmetic,
      problem: Engines.arithmetic.generate({ op: "+", digits: 1 }, 0),
    };
  }

  function engineForProblem(p) {
    if (p && p.op) return Engines.arithmetic;
    if (p && p.mode && (p.n != null || p.placeName)) return Engines.placeValue;
    if (p && p.f) return Engines.fraction;
    return Engines.arithmetic;
  }

  function formatEquation(engine, p) {
    if (engine === Engines.arithmetic && p.a != null && p.b != null) {
      return `
        <div class="problem-equation">
          <span class="num">${p.a}</span>
          <span class="op">${engine.op || p.op || "+"}</span>
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

  function dismiss(el, onClose) {
    el.classList.add("leaving");
    setTimeout(() => {
      el.remove();
      if (typeof onClose === "function") onClose();
    }, 280);
  }

  function buildModal({ onAnswered, onClose }) {
    const d = S.getDaily();
    const streak = d.streak || 0;
    const name = playerName();

    const raccoonSvg = (window.MR.Raccoon && window.MR.Raccoon.render)
      ? window.MR.Raccoon.render("cheer", { size: 110 })
      : "🦝";

    const greet = streak > 1
      ? `${streak}-day streak, ${name}! 🔥`
      : `Hi, ${name}! Nice to see you.`;

    const overlay = document.createElement("div");
    overlay.className = "daily-overlay";
    overlay.innerHTML = `
      <div class="daily-card">
        <button class="daily-close" aria-label="Close">×</button>
        <div class="daily-raccoon">${raccoonSvg}</div>
        <div class="daily-streak-chip">🔥 <strong>${streak || 1}</strong>${streak === 1 ? " day" : " days"}</div>
        <h2 class="daily-title">${greet}</h2>
        <p class="daily-sub">Want to try one quick question?</p>
        <div class="daily-actions">
          <button class="btn btn-primary" data-act="yes">Yes, one question!</button>
          <button class="btn btn-ghost"   data-act="later">Maybe later</button>
        </div>
        <div class="daily-slot"></div>
      </div>`;

    const closeBtn = overlay.querySelector(".daily-close");
    const yesBtn   = overlay.querySelector('[data-act="yes"]');
    const laterBtn = overlay.querySelector('[data-act="later"]');
    const slot     = overlay.querySelector(".daily-slot");
    const actions  = overlay.querySelector(".daily-actions");

    // Close (×) consumes today's visit — banner goes away until tomorrow.
    closeBtn.onclick = () => { S.markDailyVisit(); dismiss(overlay, onClose); };
    // Maybe later leaves the visit open — banner stays, no re-render needed.
    laterBtn.onclick = () => dismiss(overlay);

    yesBtn.onclick = () => {
      const pick = pickProblem();
      const engine = pick.engine, p = pick.problem;
      actions.style.display = "none";

      const visual = engine.renderVisual ? engine.renderVisual(p) : "";
      const visualHtml = typeof visual === "string"
        ? visual
        : (visual && visual.outerHTML) || "";

      slot.innerHTML = `
        ${formatEquation(engine, p)}
        ${visualHtml}
        <div class="daily-options"></div>
        <div class="daily-feedback"></div>`;

      const opts = slot.querySelector(".daily-options");
      const fb = slot.querySelector(".daily-feedback");

      (p.options || []).forEach((opt) => {
        const btn = document.createElement("button");
        btn.className = "answer-btn";
        btn.innerHTML = engine.formatOption ? engine.formatOption(opt, p) : String(opt);
        btn.__opt = opt;
        btn.onclick = () => {
          const chosen = btn.__opt;
          const isEq = engine.optionsEqual
            ? engine.optionsEqual(chosen, p.answer, p)
            : chosen === p.answer;
          opts.querySelectorAll(".answer-btn").forEach((b) => b.classList.add("disabled"));
          if (isEq) {
            btn.classList.add("correct");
            fb.className = "daily-feedback happy";
            fb.textContent = "Yes! 🎉 See you tomorrow!";
          } else {
            btn.classList.add("wrong");
            opts.querySelectorAll(".answer-btn").forEach((b) => {
              if (b.__opt === p.answer) b.classList.add("correct");
            });
            fb.className = "daily-feedback oops";
            const ans = engine.formatOption ? engine.formatOption(p.answer, p) : String(p.answer);
            fb.textContent = `Almost — the answer is ${ans}. See you tomorrow!`;
          }
          S.markDailyVisit();
          S.recordDailyAnswer(isEq);
          if (onAnswered) onAnswered(isEq);
          setTimeout(() => dismiss(overlay, onClose), 1800);
        };
        opts.appendChild(btn);
      });
    };

    return overlay;
  }

  function maybeShow(onClose) {
    try {
      if (!S || S.hasSeenDailyToday()) return;
      const s = S.getSettings();
      if (s && s.calmMode) return; // respect Calm mode — stays opt-in
      show(onClose);
    } catch (e) { /* never crash the hub */ }
  }

  function show(onClose) {
    const modal = buildModal({ onAnswered: () => {}, onClose });
    document.body.appendChild(modal);
  }

  // Debug helper — bypasses once-a-day guard + Calm mode.
  function forceShow(onClose) {
    const modal = buildModal({ onAnswered: () => {}, onClose });
    document.body.appendChild(modal);
  }

  window.MR = window.MR || {};
  window.MR.DailyVisit = { maybeShow, show, forceShow };
})();
