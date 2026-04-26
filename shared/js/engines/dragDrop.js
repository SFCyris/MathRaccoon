/*!
 * engines/dragDrop.js — interactive drag-and-drop questions.
 *
 * Supports 10 interaction shapes (decided per-question via `kind`):
 *   "arrange"      — order tokens in ONE target row
 *   "categorize"   — drop tokens into N labeled buckets
 *   "linePlot"     — stack X's over a numeric scale (3.MD.B.4)
 *   "numberLine"   — drop a marker at a target position (3.NBT.1, 3.NF.3, 4.NF)
 *   "partition"    — click cells to shade a pre-partitioned shape (3.G.2)
 *   "balance"      — drag number tiles to balance an equation (3.OA.5, 3.OA.4)
 *   "digitTiles"   — drag digits into place-value columns (3.NBT.1, 3.NBT.3)
 *   "ruler"        — drag a marker to the end of a segment (3.MD.A.2)
 *   "shapeCompose" — tile a row×col grid with unit squares (3.MD.C.7)
 *   "barGraph"     — click categories to build bar graph (3.MD.B.3)
 *
 * Pool question shapes:
 *
 *   ARRANGE:
 *   {
 *     "kind":   "arrange",
 *     "prompt": "Drag the words into order to make a sentence.",
 *     "tokens": ["fox", "quick", "The", "jumps"],  // shuffled on render
 *     "answer": ["The", "quick", "fox", "jumps"],   // exact target order
 *     "hint":   "Start with the capital letter."
 *   }
 *
 *   CATEGORIZE:
 *   {
 *     "kind":   "categorize",
 *     "prompt": "Sort the words by part of speech.",
 *     "buckets": [
 *       { "id": "noun", "label": "Noun"  },
 *       { "id": "verb", "label": "Verb"  },
 *       { "id": "adj",  "label": "Adjective" }
 *     ],
 *     "tokens": [
 *       { "text": "raccoon", "bucket": "noun" },
 *       { "text": "runs",    "bucket": "verb" },
 *       { "text": "furry",   "bucket": "adj"  },
 *       { "text": "red",     "bucket": "noun,adj" }  // multiple valid homes
 *     ],
 *     "hint": "A noun names; a verb acts; an adjective describes."
 *   }
 *
 *   LINE PLOT:
 *   {
 *     "kind":   "linePlot",
 *     "prompt": "Place an X for each measurement.",
 *     "scale":  { "min": 1, "max": 8, "step": 1, "unit": "in" },
 *     "marks":  [3, 5, 5, 6, 3, 4, 5, 7],      // what the child must plot
 *     "hint":   "Tap a value on the line to add an X there."
 *   }
 *
 * This engine uses the shared `interactive: true` flag so the runner
 * renders its own "Check my answer" button instead of options buttons.
 */
(function () {
  const { shuffle } = window.MR.Engines.Util;

  // ------------------------------------------------------------------
  // planRound — draw from a pool, pass through as interactive problems.
  // ------------------------------------------------------------------
  function planRound(cfg = {}, total = 0) {
    if (!cfg.poolId || !window.MR.Pools || !window.MR.Pools.has(cfg.poolId)) return null;
    const drawn = window.MR.Pools.sample(cfg.poolId, total);
    return drawn.map((q) => buildFromPool(q));
  }

  function buildFromPool(q) {
    // Give every problem a unique node-id so validation can find its UI.
    const _dragId = "dd-" + Math.random().toString(36).slice(2, 9);
    // IMPORTANT: keep q.answer intact — renderArrange uses its .length to
    // build slots, and revealAnswer prints it back to the child. Our own
    // optionsEqual() ignores the `answer` argument and reads DOM state.
    return {
      ...q,
      _dragId,
      interactive: true,
      options: ["✓ Check my answer"],
    };
  }

  function generate(cfg, qIndex) {
    // Fallback — if no pool, produce a tiny sentence-arrange problem.
    const fallback = {
      kind:   "arrange",
      prompt: "Drag the words into order:",
      tokens: ["eats", "The", "bread", "raccoon"],
      answer: ["The", "raccoon", "eats", "bread"],
      hint:   "Start with the capital letter.",
    };
    return buildFromPool(fallback);
  }

  // ------------------------------------------------------------------
  // Render
  // ------------------------------------------------------------------
  function renderPrompt(p) {
    return `<div class="dd-prompt">${p.prompt || ""}</div>`;
  }

  function renderVisual(p) {
    if (!p || !p.kind) return "";
    if (p.kind === "arrange")      return renderArrange(p);
    if (p.kind === "categorize")   return renderCategorize(p);
    if (p.kind === "linePlot")     return renderLinePlot(p);
    if (p.kind === "numberLine")   return renderNumberLine(p);
    if (p.kind === "partition")    return renderPartition(p);
    if (p.kind === "balance")      return renderBalance(p);
    if (p.kind === "digitTiles")   return renderDigitTiles(p);
    if (p.kind === "ruler")        return renderRuler(p);
    if (p.kind === "shapeCompose") return renderShapeCompose(p);
    if (p.kind === "barGraph")     return renderBarGraph(p);
    return "";
  }

  function renderArrange(p) {
    const shuffledTokens = shuffle((p.tokens || []).slice());
    const tokensHtml = shuffledTokens.map((t, i) =>
      `<button type="button" class="dd-token" draggable="true"
               data-token="${encodeAttr(t)}" data-home="bank">
         ${escapeHtml(t)}
       </button>`
    ).join("");
    const slotCount = (p.answer || []).length;
    const slotsHtml = Array.from({ length: slotCount }).map((_, i) =>
      `<div class="dd-slot dd-slot-arrange" data-slot-index="${i}"
            aria-label="Slot ${i + 1}"></div>`
    ).join("");
    return `
      <div class="dd-widget dd-arrange" id="${p._dragId}" data-kind="arrange">
        <div class="dd-slots-row">${slotsHtml}</div>
        <div class="dd-bank-label">Word bank</div>
        <div class="dd-bank" data-bank="true">${tokensHtml}</div>
      </div>`;
  }

  function renderCategorize(p) {
    const buckets = p.buckets || [];
    const bucketsHtml = buckets.map((b) =>
      `<div class="dd-bucket" data-bucket-id="${encodeAttr(b.id)}">
         <div class="dd-bucket-label">${escapeHtml(b.label)}</div>
         <div class="dd-bucket-drop" data-bucket-drop="${encodeAttr(b.id)}"
              aria-label="Drop zone for ${escapeHtml(b.label)}"></div>
       </div>`
    ).join("");
    const tokens = shuffle((p.tokens || []).slice());
    const tokensHtml = tokens.map((t) =>
      `<button type="button" class="dd-token" draggable="true"
               data-token="${encodeAttr(t.text)}"
               data-bucket="${encodeAttr(t.bucket)}"
               data-home="bank">
         ${escapeHtml(t.text)}
       </button>`
    ).join("");
    return `
      <div class="dd-widget dd-categorize" id="${p._dragId}" data-kind="categorize">
        <div class="dd-buckets">${bucketsHtml}</div>
        <div class="dd-bank-label">Drag each word into its bucket</div>
        <div class="dd-bank" data-bank="true">${tokensHtml}</div>
      </div>`;
  }

  function renderLinePlot(p) {
    const scale = p.scale || { min: 1, max: 10, step: 1, unit: "" };
    const ticks = [];
    for (let v = scale.min; v <= scale.max; v += (scale.step || 1)) ticks.push(v);
    const colW = 40;
    const pad = 24;
    const ticksHtml = ticks.map((v, i) => `
      <button type="button" class="dd-lp-col" data-value="${v}"
              aria-label="Plot X at ${v}"
              style="left:${pad + i * colW}px; width:${colW}px;">
        <span class="dd-lp-stack" data-stack="${v}"></span>
        <span class="dd-lp-tick"></span>
        <span class="dd-lp-num">${v}</span>
      </button>`).join("");
    const total = ticks.length * colW + pad * 2;
    const marksHint = (p.marks || []).length
      ? `<div class="dd-lp-count">Plot <strong>${p.marks.length}</strong> X's total.</div>`
      : "";
    return `
      <div class="dd-widget dd-lineplot" id="${p._dragId}" data-kind="linePlot"
           data-unit="${encodeAttr(scale.unit || "")}">
        ${marksHint}
        <div class="dd-lp-board" style="width:${total}px;">${ticksHtml}</div>
        <div class="dd-lp-axis">${escapeHtml(scale.unit || "")}</div>
        <div class="dd-lp-controls">
          <button type="button" class="dd-lp-undo">↶ Undo last</button>
          <button type="button" class="dd-lp-clear">🧹 Clear all</button>
        </div>
      </div>`;
  }

  // ------------------------------------------------------------------
  // New kinds: renderers
  // ------------------------------------------------------------------

  // NUMBER LINE — drop markers at target positions on a scale.
  //   { kind: "numberLine", prompt, scale: {min, max, step, majorEvery?},
  //     markers: [{ id, label, target }], hint }
  function renderNumberLine(p) {
    const s = p.scale || { min: 0, max: 100, step: 10 };
    const ticks = [];
    for (let v = s.min; v <= s.max; v += (s.step || 1)) ticks.push(v);
    const pct = (v) => ((v - s.min) / (s.max - s.min)) * 100;
    const majorEvery = s.majorEvery || s.step || 1;
    const ticksHtml = ticks.map((v) => {
      const isMajor = ((v - s.min) % majorEvery) === 0;
      const label = isMajor ? `<span class="dd-nl-label">${v}</span>` : "";
      return `<button type="button" class="dd-nl-tick ${isMajor ? "is-major" : ""}"
                data-value="${v}" style="left:${pct(v)}%;"
                aria-label="Tick at ${v}">
                <span class="dd-nl-mark"></span>${label}
              </button>`;
    }).join("");
    const markers = p.markers || [];
    const chipsHtml = markers.map((m) =>
      `<button type="button" class="dd-nl-chip" draggable="true"
               data-marker-id="${encodeAttr(m.id)}"
               data-home="bank">
         ${escapeHtml(m.label != null ? m.label : m.id)}
       </button>`
    ).join("");
    const unit = s.unit ? `<div class="dd-nl-unit">${escapeHtml(s.unit)}</div>` : "";
    return `
      <div class="dd-widget dd-numberline" id="${p._dragId}" data-kind="numberLine">
        <div class="dd-nl-rail">
          <div class="dd-nl-line"></div>
          ${ticksHtml}
        </div>
        ${unit}
        <div class="dd-bank-label">Drag each card to its spot</div>
        <div class="dd-bank" data-bank="true">${chipsHtml}</div>
      </div>`;
  }

  // PARTITION — shade N equal parts of a pre-cut shape.
  //   { kind: "partition", prompt, shape: "rect"|"circle",
  //     cuts: 4, shade: 3, hint }
  function renderPartition(p) {
    const cuts = Math.max(2, p.cuts || 4);
    const shape = p.shape || "rect";
    let partsHtml = "";
    if (shape === "rect") {
      const parts = Array.from({ length: cuts }).map((_, i) => {
        const x = (i / cuts) * 100;
        const w = 100 / cuts;
        return `<button type="button" class="dd-pt-part"
                  data-index="${i}"
                  style="left:${x}%;width:${w}%;"
                  aria-label="Piece ${i + 1}"></button>`;
      }).join("");
      partsHtml = `<div class="dd-pt-shape dd-pt-rect">${parts}</div>`;
    } else if (shape === "circle") {
      const R = 80, cx = 90, cy = 90;
      const wedges = Array.from({ length: cuts }).map((_, i) => {
        const a0 = (i / cuts) * Math.PI * 2 - Math.PI / 2;
        const a1 = ((i + 1) / cuts) * Math.PI * 2 - Math.PI / 2;
        const x0 = cx + Math.cos(a0) * R, y0 = cy + Math.sin(a0) * R;
        const x1 = cx + Math.cos(a1) * R, y1 = cy + Math.sin(a1) * R;
        const large = (a1 - a0) > Math.PI ? 1 : 0;
        const d = `M${cx},${cy} L${x0.toFixed(2)},${y0.toFixed(2)} A${R},${R} 0 ${large} 1 ${x1.toFixed(2)},${y1.toFixed(2)} Z`;
        return `<path class="dd-pt-part dd-pt-wedge" data-index="${i}" d="${d}" tabindex="0"
                       aria-label="Piece ${i + 1}"></path>`;
      }).join("");
      partsHtml = `
        <svg class="dd-pt-shape dd-pt-circle" viewBox="0 0 180 180"
             preserveAspectRatio="xMidYMid meet">
          ${wedges}
        </svg>`;
    }
    const counter = `<div class="dd-pt-counter"><span class="dd-pt-n">0</span> / ${p.shade || 0} shaded</div>`;
    const clear = `<button type="button" class="dd-pt-clear">🧹 Clear</button>`;
    return `
      <div class="dd-widget dd-partition" id="${p._dragId}"
           data-kind="partition" data-shade="${p.shade || 0}">
        ${partsHtml}
        <div class="dd-pt-bar">${counter}${clear}</div>
      </div>`;
  }

  // BALANCE — drag number tiles into equation slots; both sides must equal.
  //   { kind: "balance", prompt, leftLabel: "7 × 6", leftValue: 42,
  //     rightTemplate: "(7 × __) + (7 × __)", slots: 2, answer: [3, 3],
  //     bank: [1,2,3,4,5,6], hint }
  //   rightTemplate uses __ as slot placeholders, filled in order.
  function renderBalance(p) {
    const parts = (p.rightTemplate || "__").split("__");
    const slots = Math.max(0, parts.length - 1);
    let rightHtml = "";
    for (let i = 0; i < parts.length; i++) {
      rightHtml += `<span class="dd-bal-txt">${escapeHtml(parts[i])}</span>`;
      if (i < slots) {
        rightHtml += `<div class="dd-slot dd-slot-bal" data-slot-index="${i}"
                           aria-label="Equation slot ${i + 1}"></div>`;
      }
    }
    const bank = (p.bank || []);
    // Bank tokens are REUSABLE templates — dragging one into a slot creates a
    // copy and leaves the original in the bank. That way equations like
    // "(6 × __) + (6 × __)" with answer (4, 4) are actually solvable.
    const tokensHtml = bank.map((v) =>
      `<button type="button" class="dd-token dd-bal-num dd-token-template" draggable="true"
               data-token="${encodeAttr(v)}" data-home="bank">${escapeHtml(v)}</button>`
    ).join("");
    const leftTxt = p.leftLabel != null ? p.leftLabel : (p.left || "");
    return `
      <div class="dd-widget dd-balance" id="${p._dragId}" data-kind="balance">
        <div class="dd-bal-eq">
          <span class="dd-bal-side dd-bal-left">${escapeHtml(leftTxt)}</span>
          <span class="dd-bal-equals">=</span>
          <span class="dd-bal-side dd-bal-right">${rightHtml}</span>
        </div>
        <div class="dd-bank-label">Drag a number into each blank (reuse as needed)</div>
        <div class="dd-bank" data-bank="true" data-reusable="true">${tokensHtml}</div>
      </div>`;
  }

  // DIGIT TILES — drag single-digit tokens into place-value columns.
  //   { kind: "digitTiles", prompt, columns: ["thousands","hundreds","tens","ones"],
  //     answer: [3, 4, 2, 1], bank: [0..9], hint,
  //     reusable?: boolean  // default true — same digit can fill multiple columns
  //                         // (e.g. "333"); set false for inventory-mode puzzles
  //                         // like "use 2, 5, 7 to make the biggest 3-digit number"
  //   }
  function renderDigitTiles(p) {
    const cols = p.columns || ["hundreds", "tens", "ones"];
    const colsHtml = cols.map((label, i) =>
      `<div class="dd-dt-col">
         <div class="dd-dt-col-label">${escapeHtml(label)}</div>
         <div class="dd-slot dd-slot-digit" data-slot-index="${i}"
              aria-label="${escapeHtml(label)} digit"></div>
       </div>`
    ).join("");
    const bank = p.bank && p.bank.length ? p.bank : [0,1,2,3,4,5,6,7,8,9];
    const reusable = p.reusable !== false; // default: reusable
    const tokClass = "dd-token dd-dt-digit" + (reusable ? " dd-token-template" : "");
    const tokensHtml = bank.map((v) =>
      `<button type="button" class="${tokClass}" draggable="true"
               data-token="${encodeAttr(v)}" data-home="bank">${escapeHtml(v)}</button>`
    ).join("");
    const label = reusable
      ? "Drag a digit into each column (reuse as needed)"
      : "Drag a digit into each column";
    return `
      <div class="dd-widget dd-digittiles" id="${p._dragId}" data-kind="digitTiles">
        <div class="dd-dt-row">${colsHtml}</div>
        <div class="dd-bank-label">${label}</div>
        <div class="dd-bank" data-bank="true"${reusable ? ' data-reusable="true"' : ""}>${tokensHtml}</div>
      </div>`;
  }

  // RULER — drag the end marker to the end of a colored segment.
  //   { kind: "ruler", prompt, scale: { min:0, max:20, step:1, unit:"cm" },
  //     segment: { start: 3, end: 11 }, answer: 8, hint }
  function renderRuler(p) {
    const s = p.scale || { min: 0, max: 20, step: 1, unit: "cm" };
    const seg = p.segment || { start: 0, end: 5 };
    const pct = (v) => ((v - s.min) / (s.max - s.min)) * 100;
    const ticks = [];
    for (let v = s.min; v <= s.max; v += (s.step || 1)) ticks.push(v);
    const ticksHtml = ticks.map((v) =>
      `<div class="dd-ru-tick ${v % 5 === 0 ? "is-major" : ""}"
            style="left:${pct(v)}%;"
            data-value="${v}">
         ${v % 5 === 0 ? `<span class="dd-ru-num">${v}</span>` : ""}
       </div>`
    ).join("");
    const segLeft = pct(seg.start);
    const segWidth = pct(seg.end) - pct(seg.start);
    return `
      <div class="dd-widget dd-ruler" id="${p._dragId}" data-kind="ruler"
           data-scale-min="${s.min}" data-scale-max="${s.max}" data-scale-step="${s.step || 1}">
        <div class="dd-ru-object">
          <div class="dd-ru-bar" style="left:${segLeft}%;width:${segWidth}%;"></div>
        </div>
        <div class="dd-ru-ruler">
          ${ticksHtml}
          <div class="dd-ru-marker-start" style="left:${pct(seg.start)}%;"
               aria-label="Start mark (fixed)">↑</div>
          <div class="dd-ru-marker dd-ru-marker-end"
               data-value="${seg.start}" style="left:${pct(seg.start)}%;"
               role="slider"
               aria-label="End mark (drag me)"
               tabindex="0">✋</div>
        </div>
        <div class="dd-ru-readout">End mark at:
          <strong class="dd-ru-readval">${seg.start}</strong>
          <span>${escapeHtml(s.unit || "")}</span>
        </div>
      </div>`;
  }

  // SHAPE COMPOSE — tile a rows×cols grid by clicking cells.
  //   { kind: "shapeCompose", prompt, rows: 3, cols: 4, answer: 12, hint }
  function renderShapeCompose(p) {
    const rows = p.rows || 3;
    const cols = p.cols || 4;
    const cells = Array.from({ length: rows * cols }).map((_, i) =>
      `<button type="button" class="dd-sc-cell" data-index="${i}"
               aria-label="Cell ${i + 1}"></button>`
    ).join("");
    return `
      <div class="dd-widget dd-shapecompose" id="${p._dragId}" data-kind="shapeCompose"
           data-rows="${rows}" data-cols="${cols}">
        <div class="dd-sc-grid" style="grid-template-columns:repeat(${cols}, 1fr);">
          ${cells}
        </div>
        <div class="dd-sc-bar">
          <div class="dd-sc-counter"><span class="dd-sc-n">0</span> tiles</div>
          <button type="button" class="dd-sc-clear">🧹 Clear</button>
        </div>
      </div>`;
  }

  // BAR GRAPH — click categories to build bar heights.
  //   { kind: "barGraph", prompt, categories: ["apples","pears","grapes"],
  //     scale: { max: 10, step: 1 }, answer: {apples: 4, pears: 6, grapes: 3}, hint }
  function renderBarGraph(p) {
    const cats = p.categories || [];
    const max = (p.scale && p.scale.max) || 10;
    const step = (p.scale && p.scale.step) || 1;
    const unit = (p.scale && p.scale.unit) || "";
    const catsHtml = cats.map((c, i) =>
      `<button type="button" class="dd-bg-col" data-cat="${encodeAttr(c)}"
               aria-label="Add 1 to ${escapeHtml(c)}">
         <div class="dd-bg-stack"></div>
         <div class="dd-bg-label">${escapeHtml(c)}</div>
       </button>`
    ).join("");
    const ticks = [];
    for (let v = 0; v <= max; v += step) ticks.push(v);
    const gridHtml = ticks.map((v) =>
      `<div class="dd-bg-gridline" style="bottom:${(v / max) * 100}%">
         <span>${v}</span>
       </div>`
    ).join("");
    const unitHtml = unit ? `<div class="dd-bg-unit">${escapeHtml(unit)}</div>` : "";
    return `
      <div class="dd-widget dd-bargraph" id="${p._dragId}" data-kind="barGraph"
           data-max="${max}">
        ${unitHtml}
        <div class="dd-bg-board">
          <div class="dd-bg-grid">${gridHtml}</div>
          <div class="dd-bg-cols">${catsHtml}</div>
        </div>
        <div class="dd-bg-controls">
          <button type="button" class="dd-bg-undo">↶ Undo last</button>
          <button type="button" class="dd-bg-clear">🧹 Clear all</button>
        </div>
      </div>`;
  }

  // ------------------------------------------------------------------
  // Wire interactivity — called by runner AFTER DOM mount.
  // ------------------------------------------------------------------
  function wireInteractive(p, rootEl) {
    const host = rootEl.querySelector(`#${p._dragId}`);
    if (!host) return;
    const kind = p.kind;
    if (kind === "arrange" || kind === "categorize" || kind === "balance" || kind === "digitTiles") {
      wirePointerDrag(host);
    }
    if (kind === "numberLine")   wireNumberLine(host);
    if (kind === "linePlot")     wireLinePlot(host);
    if (kind === "partition")    wirePartition(host);
    if (kind === "ruler")        wireRuler(host);
    if (kind === "shapeCompose") wireShapeCompose(host);
    if (kind === "barGraph")     wireBarGraph(host);
  }

  // Pointer-based drag (mouse + touch via PointerEvents). Tokens move by
  // appending them into drop zones; positions are tracked via DOM parent.
  function wirePointerDrag(host) {
    const bank = host.querySelector("[data-bank]");
    const slots = Array.from(host.querySelectorAll(".dd-slot, [data-bucket-drop]"));

    // Click-to-cycle fallback (keyboard + taps that skip native DnD).
    host.addEventListener("click", (e) => {
      const tok = e.target.closest(".dd-token");
      if (!tok || e.defaultPrevented) return;
      cycleTokenHome(tok, host);
    });

    // HTML5 DnD (mouse) — works everywhere desktop.
    host.addEventListener("dragstart", (e) => {
      const tok = e.target.closest(".dd-token");
      if (!tok) return;
      tok.classList.add("dd-dragging");
      e.dataTransfer.setData("text/plain", tok.dataset.token || "");
      // If the token is a REUSABLE template (e.g. balance kind), the "active"
      // token is a clone — the original stays in the bank.
      if (tok.classList.contains("dd-token-template")) {
        const clone = tok.cloneNode(true);
        clone.classList.remove("dd-token-template", "dd-dragging");
        host.__activeTok = clone;
      } else {
        host.__activeTok = tok;
      }
    });
    host.addEventListener("dragend", (e) => {
      const tok = e.target.closest(".dd-token");
      if (tok) tok.classList.remove("dd-dragging");
      host.__activeTok = null;
      host.querySelectorAll(".dd-droptarget").forEach((n) => n.classList.remove("dd-droptarget"));
    });
    const dropZones = [...slots, bank];
    dropZones.forEach((z) => {
      if (!z) return;
      z.addEventListener("dragover", (e) => {
        e.preventDefault();
        z.classList.add("dd-droptarget");
      });
      z.addEventListener("dragleave", () => z.classList.remove("dd-droptarget"));
      z.addEventListener("drop", (e) => {
        e.preventDefault();
        z.classList.remove("dd-droptarget");
        const tok = host.__activeTok;
        if (!tok) return;
        placeTokenIn(z, tok);
      });
    });

    // Pointer-based drag (mobile touch + pen). Uses absolute-position clone.
    let touchActive = null;
    host.addEventListener("pointerdown", (e) => {
      if (e.pointerType === "mouse") return; // let native DnD handle mouse
      const tok = e.target.closest(".dd-token");
      if (!tok) return;
      tok.setPointerCapture && tok.setPointerCapture(e.pointerId);
      const rect = tok.getBoundingClientRect();
      touchActive = {
        tok,
        offsetX: e.clientX - rect.left,
        offsetY: e.clientY - rect.top,
        startX: e.clientX,
        startY: e.clientY,
        moved: false,
      };
      tok.classList.add("dd-dragging");
      tok.style.position = "relative";
      tok.style.zIndex = "30";
    });
    host.addEventListener("pointermove", (e) => {
      if (!touchActive) return;
      const dx = e.clientX - touchActive.startX;
      const dy = e.clientY - touchActive.startY;
      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) touchActive.moved = true;
      touchActive.tok.style.transform = `translate(${dx}px, ${dy}px)`;
      // Highlight zone under the pointer.
      dropZones.forEach((z) => z && z.classList.remove("dd-droptarget"));
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const zone = el && el.closest(".dd-slot, [data-bucket-drop], [data-bank]");
      if (zone && dropZones.includes(zone)) zone.classList.add("dd-droptarget");
    });
    host.addEventListener("pointerup", (e) => {
      if (!touchActive) return;
      const t = touchActive;
      touchActive = null;
      t.tok.style.transform = "";
      t.tok.style.position = "";
      t.tok.style.zIndex = "";
      t.tok.classList.remove("dd-dragging");
      dropZones.forEach((z) => z && z.classList.remove("dd-droptarget"));
      if (!t.moved) {
        cycleTokenHome(t.tok, host);
        return;
      }
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const zone = el && el.closest(".dd-slot, [data-bucket-drop], [data-bank]");
      if (zone && dropZones.includes(zone)) {
        // Template tokens: place a clone so the template stays in the bank.
        let placeTok = t.tok;
        if (t.tok.classList.contains("dd-token-template")) {
          placeTok = t.tok.cloneNode(true);
          placeTok.classList.remove("dd-token-template");
        }
        placeTokenIn(zone, placeTok);
      }
    });
    host.addEventListener("pointercancel", () => {
      if (!touchActive) return;
      touchActive.tok.style.transform = "";
      touchActive.tok.style.position = "";
      touchActive.tok.classList.remove("dd-dragging");
      touchActive = null;
    });
  }

  // Click-to-cycle: tap a token in bank → goes to first empty single-token slot;
  // tap a placed token → goes home (next matching bucket or back to bank).
  const SINGLE_TOKEN_SLOT = ".dd-slot-arrange, .dd-slot-bal, .dd-slot-digit";
  function cycleTokenHome(tok, host) {
    const kind = host.dataset.kind;
    const parent = tok.parentElement;
    if (parent && parent.hasAttribute("data-bank")) {
      let target = null;
      if (kind === "arrange" || kind === "balance" || kind === "digitTiles") {
        target = Array.from(host.querySelectorAll(SINGLE_TOKEN_SLOT))
          .find((s) => !s.querySelector(".dd-token")) || null;
      }
      if (!target) {
        tok.classList.add("dd-shake");
        setTimeout(() => tok.classList.remove("dd-shake"), 400);
        return;
      }
      // Template tokens: place a clone so the template stays in the bank.
      let placeTok = tok;
      if (tok.classList.contains("dd-token-template")) {
        placeTok = tok.cloneNode(true);
        placeTok.classList.remove("dd-token-template");
      }
      placeTokenIn(target, placeTok);
    } else {
      const bank = host.querySelector("[data-bank]");
      placeTokenIn(bank, tok);
    }
  }

  function placeTokenIn(zone, tok) {
    if (!zone || !tok) return;
    // Single-token slots swap: move any existing occupant back to the bank, or
    // discard it entirely when the bank is reusable (occupant is a throwaway
    // clone of a template).
    if (zone.matches && zone.matches(SINGLE_TOKEN_SLOT)) {
      const occupant = zone.querySelector(".dd-token");
      if (occupant && occupant !== tok) {
        const widget = zone.closest(".dd-widget");
        const bank = widget && widget.querySelector("[data-bank]");
        if (bank && bank.getAttribute("data-reusable") === "true") {
          occupant.remove();
        } else if (bank) {
          bank.appendChild(occupant);
        }
      }
    }
    // Dropping a placed-clone back onto a reusable bank → discard, don't stack.
    if (zone.hasAttribute && zone.hasAttribute("data-bank") &&
        zone.getAttribute("data-reusable") === "true" &&
        !tok.classList.contains("dd-token-template")) {
      tok.remove();
      return;
    }
    zone.appendChild(tok);
  }

  // ------------------------------------------------------------------
  // Line-plot wiring
  // ------------------------------------------------------------------
  function wireLinePlot(host) {
    const history = [];
    host.__lpHistory = history;
    host.querySelectorAll(".dd-lp-col").forEach((col) => {
      col.addEventListener("click", () => {
        const stack = col.querySelector(".dd-lp-stack");
        const mark = document.createElement("span");
        mark.className = "dd-lp-x";
        mark.textContent = "✕";
        stack.appendChild(mark);
        history.push({ value: col.dataset.value, node: mark });
      });
    });
    host.querySelector(".dd-lp-undo").addEventListener("click", () => {
      const last = history.pop();
      if (last && last.node && last.node.parentNode) last.node.parentNode.removeChild(last.node);
    });
    host.querySelector(".dd-lp-clear").addEventListener("click", () => {
      host.querySelectorAll(".dd-lp-stack").forEach((s) => (s.innerHTML = ""));
      history.length = 0;
    });
  }

  // ------------------------------------------------------------------
  // Number-line wiring — markers snap to ticks (via click OR drag).
  // ------------------------------------------------------------------
  function wireNumberLine(host) {
    const bank = host.querySelector("[data-bank]");
    const rail = host.querySelector(".dd-nl-rail");
    host.__nlPlacements = {}; // markerId → value

    // Click a tick to pin the first unplaced chip from bank onto it.
    host.querySelectorAll(".dd-nl-tick").forEach((tick) => {
      tick.addEventListener("click", () => {
        const unplaced = bank.querySelector(".dd-nl-chip");
        if (!unplaced) return;
        placeChipOnTick(host, tick, unplaced);
      });
    });

    // Click a placed chip to return it to bank.
    host.addEventListener("click", (e) => {
      const chip = e.target.closest(".dd-nl-chip");
      if (!chip) return;
      if (!chip.classList.contains("dd-nl-placed")) return;
      returnChipToBank(host, chip);
    });

    // Pointer drag: chip follows finger/mouse, drops on nearest tick.
    let active = null;
    host.addEventListener("pointerdown", (e) => {
      const chip = e.target.closest(".dd-nl-chip");
      if (!chip) return;
      chip.setPointerCapture && chip.setPointerCapture(e.pointerId);
      const rect = chip.getBoundingClientRect();
      active = { chip, startX: e.clientX, startY: e.clientY, moved: false,
                 originX: rect.left, originY: rect.top };
      chip.classList.add("dd-dragging");
      chip.style.position = "fixed";
      chip.style.left = rect.left + "px";
      chip.style.top = rect.top + "px";
      chip.style.zIndex = "40";
    });
    host.addEventListener("pointermove", (e) => {
      if (!active) return;
      const dx = e.clientX - active.startX, dy = e.clientY - active.startY;
      if (Math.abs(dx) + Math.abs(dy) > 4) active.moved = true;
      active.chip.style.left = (active.originX + dx) + "px";
      active.chip.style.top  = (active.originY + dy) + "px";
    });
    host.addEventListener("pointerup", (e) => {
      if (!active) return;
      const chip = active.chip;
      chip.classList.remove("dd-dragging");
      chip.style.position = ""; chip.style.left = ""; chip.style.top = ""; chip.style.zIndex = "";
      const moved = active.moved;
      active = null;
      if (!moved) return;
      const tick = nearestTick(host, e.clientX);
      if (tick) placeChipOnTick(host, tick, chip);
    });

    function placeChipOnTick(host, tick, chip) {
      const v = tick.dataset.value;
      const mid = chip.dataset.markerId;
      // Remove any chip already on this tick.
      const existing = tick.querySelector(".dd-nl-placed");
      if (existing && existing !== chip) {
        bank.appendChild(existing);
        existing.classList.remove("dd-nl-placed");
        existing.style.left = "";
        delete host.__nlPlacements[existing.dataset.markerId];
      }
      tick.appendChild(chip);
      chip.classList.add("dd-nl-placed");
      chip.style.left = "50%";
      host.__nlPlacements[mid] = v;
    }

    function returnChipToBank(host, chip) {
      bank.appendChild(chip);
      chip.classList.remove("dd-nl-placed");
      chip.style.left = "";
      delete host.__nlPlacements[chip.dataset.markerId];
    }

    function nearestTick(host, clientX) {
      const ticks = Array.from(host.querySelectorAll(".dd-nl-tick"));
      let best = null, bestD = Infinity;
      for (const t of ticks) {
        const r = t.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const d = Math.abs(cx - clientX);
        if (d < bestD) { bestD = d; best = t; }
      }
      return best;
    }
  }

  // ------------------------------------------------------------------
  // Partition wiring — click a wedge/part to toggle shade.
  // ------------------------------------------------------------------
  function wirePartition(host) {
    const counter = host.querySelector(".dd-pt-n");
    function update() {
      const shaded = host.querySelectorAll(".dd-pt-part.dd-pt-shaded").length;
      if (counter) counter.textContent = String(shaded);
    }
    host.querySelectorAll(".dd-pt-part").forEach((part) => {
      const toggle = () => { part.classList.toggle("dd-pt-shaded"); update(); };
      part.addEventListener("click", toggle);
      part.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); }
      });
    });
    const clear = host.querySelector(".dd-pt-clear");
    if (clear) clear.addEventListener("click", () => {
      host.querySelectorAll(".dd-pt-part").forEach((p) => p.classList.remove("dd-pt-shaded"));
      update();
    });
  }

  // ------------------------------------------------------------------
  // Ruler wiring — drag the end marker along the scale, snap to ticks.
  // ------------------------------------------------------------------
  function wireRuler(host) {
    const marker = host.querySelector(".dd-ru-marker-end");
    const readout = host.querySelector(".dd-ru-readval");
    const ruler = host.querySelector(".dd-ru-ruler");
    const min = Number(host.dataset.scaleMin), max = Number(host.dataset.scaleMax);
    const step = Number(host.dataset.scaleStep) || 1;
    function pct(v) { return ((v - min) / (max - min)) * 100; }
    function snapVal(x, rect) {
      const pctX = Math.max(0, Math.min(1, (x - rect.left) / rect.width));
      const raw = min + pctX * (max - min);
      const snapped = Math.round(raw / step) * step;
      return Math.max(min, Math.min(max, snapped));
    }
    function setMarker(v) {
      marker.dataset.value = String(v);
      marker.style.left = pct(v) + "%";
      if (readout) readout.textContent = String(v);
    }
    let active = null;
    marker.addEventListener("pointerdown", (e) => {
      marker.setPointerCapture && marker.setPointerCapture(e.pointerId);
      active = true;
      marker.classList.add("dd-dragging");
    });
    host.addEventListener("pointermove", (e) => {
      if (!active) return;
      const rect = ruler.getBoundingClientRect();
      setMarker(snapVal(e.clientX, rect));
    });
    host.addEventListener("pointerup", () => { active = false; marker.classList.remove("dd-dragging"); });
    host.addEventListener("pointercancel", () => { active = false; marker.classList.remove("dd-dragging"); });
    // Keyboard support
    marker.addEventListener("keydown", (e) => {
      const v = Number(marker.dataset.value);
      if (e.key === "ArrowRight" || e.key === "ArrowUp")   { setMarker(Math.min(max, v + step)); e.preventDefault(); }
      if (e.key === "ArrowLeft"  || e.key === "ArrowDown") { setMarker(Math.max(min, v - step)); e.preventDefault(); }
    });
  }

  // ------------------------------------------------------------------
  // Shape-compose wiring — click cells to toggle tile.
  // ------------------------------------------------------------------
  function wireShapeCompose(host) {
    const counter = host.querySelector(".dd-sc-n");
    function update() {
      const n = host.querySelectorAll(".dd-sc-cell.is-filled").length;
      if (counter) counter.textContent = String(n);
    }
    host.querySelectorAll(".dd-sc-cell").forEach((cell) => {
      cell.addEventListener("click", () => { cell.classList.toggle("is-filled"); update(); });
    });
    const clear = host.querySelector(".dd-sc-clear");
    if (clear) clear.addEventListener("click", () => {
      host.querySelectorAll(".dd-sc-cell").forEach((c) => c.classList.remove("is-filled"));
      update();
    });
  }

  // ------------------------------------------------------------------
  // Bar-graph wiring — click a column to add/remove a bar unit.
  // ------------------------------------------------------------------
  function wireBarGraph(host) {
    const max = Number(host.dataset.max) || 10;
    const history = [];
    host.__bgHistory = history;
    host.querySelectorAll(".dd-bg-col").forEach((col) => {
      col.addEventListener("click", () => {
        const stack = col.querySelector(".dd-bg-stack");
        const current = stack.children.length;
        if (current >= max) return;
        const unit = document.createElement("span");
        unit.className = "dd-bg-unit-brick";
        stack.appendChild(unit);
        // Set height relative to max
        const pct = ((current + 1) / max) * 100;
        stack.style.height = pct + "%";
        history.push({ cat: col.dataset.cat, node: unit, col });
      });
    });
    host.querySelector(".dd-bg-undo").addEventListener("click", () => {
      const last = history.pop();
      if (!last) return;
      if (last.node && last.node.parentNode) last.node.parentNode.removeChild(last.node);
      const stack = last.col.querySelector(".dd-bg-stack");
      stack.style.height = ((stack.children.length) / max) * 100 + "%";
    });
    host.querySelector(".dd-bg-clear").addEventListener("click", () => {
      host.querySelectorAll(".dd-bg-stack").forEach((s) => { s.innerHTML = ""; s.style.height = "0%"; });
      history.length = 0;
    });
  }

  // ------------------------------------------------------------------
  // Validation — runner calls optionsEqual on submit.
  // ------------------------------------------------------------------
  function optionsEqual(chosen, answer, p) {
    const host = document.getElementById(p._dragId);
    if (!host) return false;
    if (p.kind === "arrange")      return validateArrange(p, host);
    if (p.kind === "categorize")   return validateCategorize(p, host);
    if (p.kind === "linePlot")     return validateLinePlot(p, host);
    if (p.kind === "numberLine")   return validateNumberLine(p, host);
    if (p.kind === "partition")    return validatePartition(p, host);
    if (p.kind === "balance")      return validateBalance(p, host);
    if (p.kind === "digitTiles")   return validateDigitTiles(p, host);
    if (p.kind === "ruler")        return validateRuler(p, host);
    if (p.kind === "shapeCompose") return validateShapeCompose(p, host);
    if (p.kind === "barGraph")     return validateBarGraph(p, host);
    return false;
  }

  function validateArrange(p, host) {
    const slots = Array.from(host.querySelectorAll(".dd-slot"));
    const placed = slots.map((s) => {
      const t = s.querySelector(".dd-token");
      return t ? t.dataset.token : null;
    });
    const target = p.answer || [];
    if (placed.length !== target.length) return false;
    for (let i = 0; i < target.length; i++) {
      if (placed[i] !== target[i]) return false;
    }
    return true;
  }

  function validateCategorize(p, host) {
    const drops = Array.from(host.querySelectorAll("[data-bucket-drop]"));
    for (const zone of drops) {
      const wantId = zone.getAttribute("data-bucket-drop");
      const toks = zone.querySelectorAll(".dd-token");
      for (const t of toks) {
        // A token's `data-bucket` may be a single id ("noun") or a comma-
        // separated list of valid ids ("noun,verb") for genuinely ambiguous
        // tokens (e.g. "red" could be adjective or noun).
        const valid = String(t.dataset.bucket || "")
          .split(",").map((s) => s.trim()).filter(Boolean);
        if (!valid.includes(wantId)) return false;
      }
    }
    // Also require EVERY token to be placed (none left in the bank).
    const bank = host.querySelector("[data-bank]");
    if (bank && bank.querySelector(".dd-token")) return false;
    return true;
  }

  function validateLinePlot(p, host) {
    const want = (p.marks || []).slice().sort((a, b) => a - b).map(String);
    const got = [];
    host.querySelectorAll(".dd-lp-col").forEach((col) => {
      const v = col.dataset.value;
      const n = col.querySelectorAll(".dd-lp-x").length;
      for (let i = 0; i < n; i++) got.push(v);
    });
    got.sort((a, b) => Number(a) - Number(b));
    if (got.length !== want.length) return false;
    for (let i = 0; i < want.length; i++) if (got[i] !== want[i]) return false;
    return true;
  }

  function validateNumberLine(p, host) {
    const placements = host.__nlPlacements || {};
    const markers = p.markers || [];
    if (Object.keys(placements).length !== markers.length) return false;
    for (const m of markers) {
      const got = placements[m.id];
      if (got == null) return false;
      if (Number(got) !== Number(m.target)) return false;
    }
    return true;
  }

  function validatePartition(p, host) {
    const shadedIdx = Array.from(host.querySelectorAll(".dd-pt-part.dd-pt-shaded"))
      .map((el) => Number(el.dataset.index));
    const want = p.shade || 0;
    if (p.answer && Array.isArray(p.answer)) {
      // exact indices required (rare)
      const set = new Set(shadedIdx);
      return p.answer.length === shadedIdx.length && p.answer.every((i) => set.has(Number(i)));
    }
    return shadedIdx.length === want;
  }

  // Safely evaluate a simple arithmetic expression — digits, whitespace,
  // parens, and + - × ÷ (or * /). Strings come from trusted pool content or
  // numeric user tokens, so a whitelist + Function() is safe here.
  function evalBalanceExpr(expr) {
    const norm = String(expr).replace(/×/g, "*").replace(/÷/g, "/");
    if (!/^[\s\d+\-*/().]+$/.test(norm)) return null;
    try { return Function('"use strict"; return (' + norm + ');')(); }
    catch (e) { return null; }
  }

  function validateBalance(p, host) {
    const slots = Array.from(host.querySelectorAll(".dd-slot-bal"));
    // Every slot must be filled.
    const values = [];
    for (const s of slots) {
      const t = s.querySelector(".dd-token");
      if (!t) return false;
      values.push(t.dataset.token);
    }
    // Evaluate the equation mathematically — any fill that balances is
    // correct, not just the canonical `answer` stored on the question.
    const leftVal = (p.leftValue != null)
      ? Number(p.leftValue)
      : evalBalanceExpr(p.leftLabel || p.left || "");
    let idx = 0;
    const rightExpr = String(p.rightTemplate || "").replace(/__/g, () => {
      const v = values[idx++];
      return v == null ? "0" : v;
    });
    const rightVal = evalBalanceExpr(rightExpr);
    if (!Number.isFinite(leftVal) || !Number.isFinite(rightVal)) return false;
    return leftVal === rightVal;
  }

  function validateDigitTiles(p, host) {
    const slots = Array.from(host.querySelectorAll(".dd-slot-digit"));
    const answer = p.answer || [];
    if (slots.length !== answer.length) return false;
    for (let i = 0; i < slots.length; i++) {
      const t = slots[i].querySelector(".dd-token");
      if (!t) return false;
      if (String(t.dataset.token) !== String(answer[i])) return false;
    }
    return true;
  }

  function validateRuler(p, host) {
    const marker = host.querySelector(".dd-ru-marker-end");
    if (!marker) return false;
    const got = Number(marker.dataset.value);
    const seg = p.segment || {};
    const answer = p.answer != null ? Number(p.answer) : Number(seg.end);
    return got === answer;
  }

  function validateShapeCompose(p, host) {
    const filled = host.querySelectorAll(".dd-sc-cell.is-filled").length;
    return filled === Number(p.answer || 0);
  }

  function validateBarGraph(p, host) {
    const got = {};
    host.querySelectorAll(".dd-bg-col").forEach((col) => {
      got[col.dataset.cat] = col.querySelectorAll(".dd-bg-unit-brick").length;
    });
    const answer = p.answer || {};
    const keys = Object.keys(answer);
    for (const k of keys) {
      if (Number(got[k]) !== Number(answer[k])) return false;
    }
    return true;
  }

  // ------------------------------------------------------------------
  // Reveal answer — called by runner on a wrong submit.
  // ------------------------------------------------------------------
  function revealAnswer(p, rootEl) {
    const host = rootEl.querySelector(`#${p._dragId}`) || rootEl;
    if (!host) return;
    const panel = document.createElement("div");
    panel.className = "dd-reveal";
    if (p.kind === "arrange") {
      panel.innerHTML = `<strong>Correct order:</strong> ${(p.answer || []).map(escapeHtml).join(" ")}`;
    } else if (p.kind === "categorize") {
      const by = {};
      (p.tokens || []).forEach((t) => { (by[t.bucket] = by[t.bucket] || []).push(t.text); });
      const lines = (p.buckets || []).map((b) =>
        `<div><strong>${escapeHtml(b.label)}:</strong> ${(by[b.id] || []).map(escapeHtml).join(", ") || "—"}</div>`
      ).join("");
      panel.innerHTML = `<strong>Correct groups:</strong>${lines}`;
    } else if (p.kind === "linePlot") {
      const counts = {};
      (p.marks || []).forEach((v) => { counts[v] = (counts[v] || 0) + 1; });
      const summary = Object.keys(counts).sort((a, b) => Number(a) - Number(b))
        .map((v) => `${v}: ${counts[v]}×`).join(" · ");
      panel.innerHTML = `<strong>Correct marks:</strong> ${summary}`;
    } else if (p.kind === "numberLine") {
      const lines = (p.markers || []).map((m) =>
        `<div><strong>${escapeHtml(m.label || m.id)}</strong> → ${escapeHtml(m.target)}</div>`
      ).join("");
      panel.innerHTML = `<strong>Correct placements:</strong>${lines}`;
    } else if (p.kind === "partition") {
      const txt = p.answer && Array.isArray(p.answer)
        ? `Shade parts ${p.answer.map((n) => Number(n) + 1).join(", ")}`
        : `Shade ${p.shade || 0} of ${p.cuts || 0} equal parts`;
      panel.innerHTML = `<strong>Correct answer:</strong> ${escapeHtml(txt)}`;
    } else if (p.kind === "balance") {
      const ans = (p.answer || []).map(escapeHtml).join(", ");
      panel.innerHTML = `<strong>One correct fill:</strong> ${ans} <em>(any fill that balances works)</em>`;
    } else if (p.kind === "digitTiles") {
      const ans = (p.columns || []).map((c, i) => `${c}: ${(p.answer || [])[i]}`).join(" · ");
      panel.innerHTML = `<strong>Correct digits:</strong> ${escapeHtml(ans)}`;
    } else if (p.kind === "ruler") {
      panel.innerHTML = `<strong>Correct length:</strong> ${escapeHtml(p.answer)} ${escapeHtml((p.scale && p.scale.unit) || "")}`;
    } else if (p.kind === "shapeCompose") {
      panel.innerHTML = `<strong>Tiles needed:</strong> ${escapeHtml(p.answer)} (${p.rows || 0} × ${p.cols || 0})`;
    } else if (p.kind === "barGraph") {
      const lines = Object.keys(p.answer || {}).map((k) =>
        `<div><strong>${escapeHtml(k)}:</strong> ${escapeHtml(p.answer[k])}</div>`
      ).join("");
      panel.innerHTML = `<strong>Correct bars:</strong>${lines}`;
    }
    host.appendChild(panel);
  }

  // ------------------------------------------------------------------
  // Hint + formatting
  // ------------------------------------------------------------------
  function hintFor(p) {
    return p && p.hint ? p.hint : "Drag each piece into place, then tap Check.";
  }

  function formatOption(opt /*, p */) {
    return opt || "Check";
  }

  // ------------------------------------------------------------------
  // Helpers
  // ------------------------------------------------------------------
  function encodeAttr(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function escapeHtml(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  window.MR = window.MR || {};
  window.MR.Engines = window.MR.Engines || {};
  window.MR.Engines.dragDrop = {
    generate, planRound, renderPrompt, renderVisual,
    hintFor, formatOption, optionsEqual, wireInteractive, revealAnswer,
  };
})();
