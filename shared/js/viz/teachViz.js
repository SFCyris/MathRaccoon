/*!
 * viz/teachViz.js — visual widgets used by Teaching Corner lessons.
 * Each is registered on MR.Viz and referenced from op JSON by `type`.
 *
 * Registered types:
 *   beads         — row of emoji items, optional split/highlight
 *   numberLine    — horizontal line min..max with raccoon marker + hop arcs
 *   tenFrame      — 5×2 grid of cells, N filled
 *   twoTenFrames  — paired ten-frames with "+" between (make-a-ten)
 *   placeValue    — tens rods + ones cubes
 *   array         — m×n grid of dots (multiplication / area)
 *   barModel      — strip diagram with parts / whole
 *   fractionBar   — rectangle split into N equal parts, K shaded
 *   equalGroups   — N groups of M emoji (for ÷ and × grouping)
 */
(function () {
  const { h, register } = window.MR.Viz;

  // ---- beads ----
  register("beads", function ({ count = 5, split = null, highlightIdx = -1, emoji = "🌰" }) {
    const cells = [];
    for (let i = 0; i < count; i++) {
      let cls = "teach-bead";
      if (split != null) cls += i < split ? " teach-bead-a" : " teach-bead-b";
      if (highlightIdx === i) cls += " teach-bead-pop";
      const span = h("span", { class: cls }, emoji);
      // Stagger the pop-in: each bead lands ~50 ms after the previous,
      // so the kid visually counts along with the appearance.
      span.style.animationDelay = (200 + i * 50) + "ms";
      cells.push(span);
    }
    return h("div", { class: "teach-viz teach-beads" }, cells);
  });

  // ---- numberLine ----
  register("numberLine", function (params = {}) {
    const { min = 0, max = 10, at = null, hops = [], marks = [], visited = [], label = null, dir = "up" } = params;
    // `marks` semantic differs from `hops`:
    //   - `hops`: each value gets a chained ARC drawn from (value − step) → value.
    //     Right for skip-counting where each hop represents a STEP.
    //   - `marks`: each value gets a standalone DOWN-ARROW from above. Right
    //     for "highlight this range of values" semantics (e.g. all numbers
    //     that round to 50). Doesn't imply chaining or motion between values.
    //   When the caller passes `marks: [45..54]` we render each as an
    //   independent arrow — no spurious chain dragging the leftmost arc
    //   back to the (value − 1) origin.
    // `step` is the size of each hop (e.g. 5 for skip-count by 5s). If the
    // caller doesn't pass it, infer from the gap between consecutive hops
    // when there are ≥2 with a consistent spacing — that covers every
    // multi-hop skip-count case automatically. Default to 1 otherwise so
    // count-on/count-back visualizations (addition, subtraction) still work.
    let hopStep = params.step;
    if (hopStep == null) {
      if (hops.length >= 2) {
        const first = Math.abs(hops[1] - hops[0]);
        const consistent = hops.every((v, i) => i === 0 || Math.abs(v - hops[i - 1]) === first);
        hopStep = consistent && first > 0 ? first : 1;
      } else {
        hopStep = 1;
      }
    }
    const width = 520, pad = 28;
    const step = (width - pad * 2) / (max - min);
    const ticks = [];
    for (let v = min; v <= max; v++) {
      const x = pad + (v - min) * step;
      const isCur = v === at;
      const isVisited = visited.includes(v);
      const color = isCur ? "#a78bfa" : isVisited ? "#6b5b95" : "#9a8bbf";
      ticks.push(`<g transform="translate(${x} 0)">
        <line x1="0" y1="44" x2="0" y2="58" stroke="${isCur ? "#a78bfa" : "#c4b5fd"}" stroke-width="${isCur ? 3 : 2}"/>
        <text x="0" y="76" text-anchor="middle" font-family="Fredoka, sans-serif"
              font-size="14" font-weight="700" fill="${color}">${v}</text>
      </g>`);
    }
    // Each hop is grouped + given an animation-delay so they appear in order
    // — matching how a teacher would point at them ("first hop, then this one,
    // then this one"). The CSS `tv-hop-draw` keyframe in animations.css fades
    // the arc in with a small grow; calm-mode disables it globally.
    const hopArcs = hops.map((hopTo, hopIdx) => {
      const from = dir === "up" ? hopTo - hopStep : hopTo + hopStep;
      const fx = pad + (from - min) * step;
      const tx = pad + (hopTo - min) * step;
      const mx = (fx + tx) / 2;
      const delay = 200 + hopIdx * 280;
      return `<g class="nl-hop" style="animation-delay:${delay}ms">
        <path d="M${fx} 44 Q ${mx} 4 ${tx} 44" stroke="#ff7a93" stroke-width="2.5"
               fill="none" stroke-dasharray="4 4" stroke-linecap="round"/>
        <polygon points="${tx - 4},44 ${tx + 4},44 ${tx},52" fill="#ff7a93"/>
      </g>`;
    }).join("");
    // marks: standalone down-arrows at each value. Each arrow is animated
    // in left-to-right via the same nl-hop class + delay so the eye traces
    // the range as the teacher would "point and count."
    const markArrows = marks.map((markAt, markIdx) => {
      const x = pad + (markAt - min) * step;
      const delay = 200 + markIdx * 120;
      return `<g class="nl-hop" style="animation-delay:${delay}ms">
        <line x1="${x}" y1="22" x2="${x}" y2="48" stroke="#ff7a93" stroke-width="2.5"
              stroke-dasharray="3 3" stroke-linecap="round"/>
        <polygon points="${x - 4},44 ${x + 4},44 ${x},52" fill="#ff7a93"/>
      </g>`;
    }).join("");
    const marker = at != null
      ? `<g transform="translate(${pad + (at - min) * step} 22)">
           <circle r="16" fill="#fff" stroke="#a78bfa" stroke-width="3"/>
           <!-- raccoon faces right (direction of motion), 30% bigger -->
           <text y="7" text-anchor="middle" font-size="23"
                 transform="scale(-1 1)">🦝</text>
         </g>`
      : "";
    const wrap = h("div", { class: "teach-viz teach-numline" });
    wrap.innerHTML = `<svg viewBox="0 0 ${width} 92" role="img" aria-label="Number line">
      <line x1="${pad}" y1="44" x2="${width - pad}" y2="44" stroke="#c4b5fd" stroke-width="2"/>
      ${ticks.join("")}
      ${hopArcs}
      ${markArrows}
      ${marker}
      ${label ? `<text x="${width / 2}" y="92" text-anchor="middle" font-family="Nunito, sans-serif"
                   font-size="13" fill="#6b5b95" font-weight="700">${label}</text>` : ""}
    </svg>`;
    return wrap;
  });

  // ---- tenFrame ----
  function tenFrameSvg({ filled = 0, color = "#a78bfa", overflow = 0, label = null }) {
    const cell = 38, gap = 4;
    const cells = [];
    for (let r = 0; r < 2; r++) {
      for (let c = 0; c < 5; c++) {
        const idx = r * 5 + c;
        const x = c * (cell + gap), y = r * (cell + gap);
        const on = idx < filled;
        cells.push(`<rect x="${x}" y="${y}" width="${cell}" height="${cell}" rx="6"
          fill="${on ? color : "#fff"}" stroke="#c4b5fd" stroke-width="2"/>`);
        if (on) cells.push(`<circle cx="${x + cell / 2}" cy="${y + cell / 2}" r="7" fill="#fff" opacity="0.45"/>`);
      }
    }
    const extras = [];
    for (let i = 0; i < overflow; i++) {
      extras.push(`<circle cx="${5 * (cell + gap) + 22 + i * 22}" cy="${cell}" r="9" fill="#ff7a93"/>`);
    }
    const w = 5 * (cell + gap) + (overflow ? 22 + overflow * 22 : 0) + 4;
    const hgt = 2 * (cell + gap) + (label ? 22 : 4);
    return `<svg viewBox="0 0 ${w} ${hgt}" role="img" aria-label="Ten frame with ${filled} filled">
      ${cells.join("")}
      ${extras.join("")}
      ${label ? `<text x="${w / 2}" y="${2 * (cell + gap) + 16}" text-anchor="middle"
                   font-family="Fredoka, sans-serif" font-size="14" font-weight="700"
                   fill="#6b5b95">${label}</text>` : ""}
    </svg>`;
  }

  register("tenFrame", function (params) {
    const wrap = h("div", { class: "teach-viz teach-tenframe" });
    wrap.innerHTML = tenFrameSvg(params);
    return wrap;
  });

  register("twoTenFrames", function ({ a = 0, b = 0, aLabel = "", bLabel = "" }) {
    const wrap = h("div", { class: "teach-viz teach-tenframes-pair" });
    wrap.innerHTML =
      `<div class="teach-tf-slot">${tenFrameSvg({ filled: a, color: "#a78bfa", label: aLabel })}</div>
       <span class="teach-plus">+</span>
       <div class="teach-tf-slot">${tenFrameSvg({ filled: b, color: "#ff7a93", label: bLabel })}</div>`;
    return wrap;
  });

  // ---- placeValue blocks (hundreds flats + tens rods + ones cubes) ----
  register("placeValue", function (params = {}) {
    let { hundreds = 0, tens = 0, ones = 0, label = null, highlight = null } = params;
    // Several callers pass `{ value: N }` instead of decomposing — accept that
    // and split it out. Without this, the renderer silently drops the value
    // and produces an empty SVG (same defect class as the original numer/num
    // and skip-count step bugs).
    if (params.value != null) {
      const v = Math.max(0, Math.floor(params.value));
      hundreds = Math.floor(v / 100);
      tens = Math.floor((v % 100) / 10);
      ones = v % 10;
    }
    const parts = [];
    // hundreds: 10x10 flat
    for (let i = 0; i < hundreds; i++) {
      const gx = i * 70;
      parts.push(`<g transform="translate(${gx} 0)">
        <rect width="60" height="60" rx="3" fill="#ffd93d" stroke="#6b5b95" stroke-width="1.5"/>
        <g stroke="#6b5b95" stroke-width="0.5" opacity="0.5">
          ${[1,2,3,4,5,6,7,8,9].map(n => `<line x1="${n*6}" y1="0" x2="${n*6}" y2="60"/>`).join("")}
          ${[1,2,3,4,5,6,7,8,9].map(n => `<line x1="0" y1="${n*6}" x2="60" y2="${n*6}"/>`).join("")}
        </g>
      </g>`);
    }
    const hx = hundreds * 70;
    // tens: tall rods
    for (let i = 0; i < tens; i++) {
      const gx = hx + i * 18;
      parts.push(`<g transform="translate(${gx} 0)">
        <rect width="12" height="60" rx="2" fill="#a78bfa" stroke="#6b5b95" stroke-width="1"/>
        <g stroke="#6b5b95" stroke-width="0.5" opacity="0.5">
          ${[1,2,3,4,5,6,7,8,9].map(n => `<line x1="0" y1="${n*6}" x2="12" y2="${n*6}"/>`).join("")}
        </g>
      </g>`);
    }
    const tx = hx + tens * 18 + (tens ? 8 : 0);
    // ones: small cubes in 5-col grid
    for (let i = 0; i < ones; i++) {
      const col = i % 5, row = Math.floor(i / 5);
      parts.push(`<g transform="translate(${tx + col * 12} ${row * 12})">
        <rect width="10" height="10" rx="2" fill="#ff7a93" stroke="#6b5b95" stroke-width="0.8"/>
      </g>`);
    }
    const oneCols = ones > 0 ? Math.min(5, ones) : 0;
    const w = Math.max(hx + tens * 18 + oneCols * 12 + 8, 80);
    const hgt = 60 + (label ? 22 : 4);
    const wrap = h("div", { class: "teach-viz teach-pv" });
    wrap.innerHTML = `<svg viewBox="0 0 ${w} ${hgt}" role="img" aria-label="Place value blocks">
      ${parts.join("")}
      ${label ? `<text x="${w/2}" y="${60 + 16}" text-anchor="middle"
                   font-family="Fredoka, sans-serif" font-size="14" font-weight="700"
                   fill="#6b5b95">${label}</text>` : ""}
    </svg>`;
    return wrap;
  });

  // ---- breakApartArray (interactive: kid splits an N×M array along a row line) ----
  //
  // Why this exists
  // ---------------
  // The distributive property is fundamentally visual: kids learn
  // 6 × 8 = (5 × 8) + (1 × 8) by SEEING the 6×8 array cut into two pieces.
  // The static "array" viz shows 48 dots in a wall — the partition is left
  // to the kid's imagination, which fails for autism-spectrum and challenged
  // learners who need the cut to be CONCRETE and KINESTHETIC.
  //
  // This viz lets the kid TAP a gap between any two rows to set the split.
  // The two regions color-code (top = IN-blue, bottom = OUT-mint), a side
  // readout shows each piece's product and the sum below shows the
  // distributive recombination. The "splitTarget" param marks the intended
  // split for the question — but mirror splits (top↔bottom flipped) are
  // accepted as equivalent because 5+1 and 1+5 partition the same total.
  //
  // Params
  // ------
  //   rows, cols:     array dimensions
  //   splitTarget:    where the question wants the split (1..rows-1).
  //                   The viz starts there. Tapping moves the line.
  //   showSum:        when true, the bottom card shows "a + b = N×M".
  //                   Default true.
  //   label:          caption shown below the readout
  //   colorTop:       fill for the top region (default IN-blue #7dd3fc)
  //   colorBottom:    fill for the bottom region (default OUT-mint #6ee7b7)
  register("breakApartArray", function ({
    rows = 6, cols = 8, splitTarget = null, splitAxis = "row",
    showSum = true, label = null,
    colorTop = "#7dd3fc", colorBottom = "#6ee7b7",
  }) {
    // splitAxis "row": cut horizontally → top/bottom regions, max split = rows
    // splitAxis "col": cut vertically   → left/right regions, max split = cols
    const isRow = splitAxis !== "col";
    const axisCount = isRow ? rows : cols;
    const target = (Number.isInteger(splitTarget) && splitTarget >= 1 && splitTarget < axisCount)
      ? splitTarget
      : Math.floor(axisCount / 2);
    const cell = 34;
    const padX = 6, padY = 6;
    const gridW = cols * cell + padX * 2;
    const gridH = rows * cell + padY * 2;
    // Split lines live BETWEEN rows (or columns). With N items there are N-1
    // gap positions. We render each as an invisible click-target band so the
    // kid can tap between any two rows/cols to move the split there.
    function buildSvg(currentSplit) {
      const dots = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cx = padX + c * cell + cell / 2;
          const cy = padY + r * cell + cell / 2;
          // For row-axis split: dots in rows < split are "top" color.
          // For col-axis split: dots in cols < split are "left" color.
          const inFirst = isRow ? (r < currentSplit) : (c < currentSplit);
          const fill = inFirst ? colorTop : colorBottom;
          dots.push(`<circle cx="${cx}" cy="${cy}" r="12"
            fill="${fill}" stroke="#6b5b95" stroke-width="1.5"/>`);
          dots.push(`<circle cx="${cx - 3}" cy="${cy - 3}" r="4"
            fill="#fff" opacity="0.45"/>`);
        }
      }
      // The visible split line — thick dashed divider, oriented per axis
      let splitLine;
      if (isRow) {
        const lineY = padY + currentSplit * cell;
        splitLine = `<line class="ba-split-line"
          x1="${padX - 2}" y1="${lineY}" x2="${gridW - padX + 2}" y2="${lineY}"
          stroke="#3a2e5f" stroke-width="3.5" stroke-dasharray="6 4"/>`;
      } else {
        const lineX = padX + currentSplit * cell;
        splitLine = `<line class="ba-split-line"
          x1="${lineX}" y1="${padY - 2}" x2="${lineX}" y2="${gridH - padY + 2}"
          stroke="#3a2e5f" stroke-width="3.5" stroke-dasharray="6 4"/>`;
      }
      // Invisible click bands between each adjacent row/col pair
      const bands = [];
      for (let g = 1; g < axisCount; g++) {
        if (isRow) {
          const y = padY + g * cell - cell / 2;
          bands.push(`<rect class="ba-gap-band" data-split="${g}"
            x="0" y="${y}" width="${gridW}" height="${cell}"
            fill="transparent" style="cursor: pointer"/>`);
        } else {
          const x = padX + g * cell - cell / 2;
          bands.push(`<rect class="ba-gap-band" data-split="${g}"
            x="${x}" y="0" width="${cell}" height="${gridH}"
            fill="transparent" style="cursor: pointer"/>`);
        }
      }
      const ariaAxis = isRow ? "row" : "column";
      return `<svg viewBox="0 0 ${gridW} ${gridH}" role="img"
        aria-label="${rows} by ${cols} array, split at ${ariaAxis} ${currentSplit}">
        ${dots.join("")}
        ${splitLine}
        ${bands.join("")}
      </svg>`;
    }
    function buildReadout(currentSplit) {
      // For row-axis: "Top" / "Bottom" are the visual orientation labels.
      //                Each piece is (split × cols) and ((rows-split) × cols).
      // For col-axis: "Left" / "Right" labels. Each piece is (rows × split)
      //                and (rows × (cols-split)).
      let firstLabel, secondLabel, firstEq, secondEq, firstProd, secondProd;
      if (isRow) {
        firstLabel  = "Top";
        secondLabel = "Bottom";
        firstProd  = currentSplit * cols;
        secondProd = (rows - currentSplit) * cols;
        firstEq    = `${currentSplit} × ${cols} = ${firstProd}`;
        secondEq   = `${rows - currentSplit} × ${cols} = ${secondProd}`;
      } else {
        firstLabel  = "Left";
        secondLabel = "Right";
        firstProd  = rows * currentSplit;
        secondProd = rows * (cols - currentSplit);
        firstEq    = `${rows} × ${currentSplit} = ${firstProd}`;
        secondEq   = `${rows} × ${cols - currentSplit} = ${secondProd}`;
      }
      const total = rows * cols;
      const sumCard = showSum
        ? `<div class="ba-sum">${firstProd} + ${secondProd} = ${total}</div>`
        : "";
      return `
        <div class="ba-readout">
          <div class="ba-piece ba-piece-top">
            <span class="ba-piece-label">${firstLabel}:</span>
            <span class="ba-piece-eq">${firstEq}</span>
          </div>
          <div class="ba-piece ba-piece-bottom">
            <span class="ba-piece-label">${secondLabel}:</span>
            <span class="ba-piece-eq">${secondEq}</span>
          </div>
          ${sumCard}
        </div>`;
    }
    const wrap = h("div", { class: "teach-viz teach-break-apart" });
    wrap.dataset.split = String(target);
    wrap.dataset.target = String(target);
    function render(split) {
      wrap.dataset.split = String(split);
      wrap.innerHTML = `
        <div class="ba-grid" style="--top-color:${colorTop}; --bottom-color:${colorBottom};">
          ${buildSvg(split)}
        </div>
        ${buildReadout(split)}
        ${label ? `<div class="ba-label">${label}</div>` : ""}
      `;
      // Wire interactivity AFTER DOM is in place
      wrap.querySelectorAll(".ba-gap-band").forEach((band) => {
        band.addEventListener("click", (e) => {
          const newSplit = parseInt(band.getAttribute("data-split"), 10);
          if (Number.isInteger(newSplit)) render(newSplit);
        });
        // Touch support — same handler is fine since click fires on tap.
        band.addEventListener("touchstart", (e) => { e.preventDefault(); band.click(); }, { passive: false });
      });
    }
    render(target);
    return wrap;
  });

  // ---- array (m rows × n cols of dots) ----
  register("array", function ({ rows = 3, cols = 4, color = "#a78bfa", label = null }) {
    const cell = 34;
    const dots = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Stagger each cell's animation by row-major index so dots pop
        // in left-to-right, top-to-bottom — matching the reading order
        // of the array and the way kids are taught to count it.
        const idx = r * cols + c;
        const delay = 200 + idx * 55;
        dots.push(`<circle cx="${c * cell + cell / 2}" cy="${r * cell + cell / 2}" r="12"
          fill="${color}" stroke="#6b5b95" stroke-width="1.5"
          style="animation-delay:${delay}ms"/>`);
        dots.push(`<circle cx="${c * cell + cell / 2 - 3}" cy="${r * cell + cell / 2 - 3}" r="4"
          fill="#fff" opacity="0.5"
          style="animation-delay:${delay}ms"/>`);
      }
    }
    const w = cols * cell + 6;
    const hgt = rows * cell + (label ? 22 : 6);
    const wrap = h("div", { class: "teach-viz teach-array" });
    wrap.innerHTML = `<svg viewBox="0 0 ${w} ${hgt}" role="img" aria-label="${rows} by ${cols} array">
      ${dots.join("")}
      ${label ? `<text x="${w/2}" y="${rows * cell + 16}" text-anchor="middle"
                   font-family="Fredoka, sans-serif" font-size="14" font-weight="700"
                   fill="#6b5b95">${label}</text>` : ""}
    </svg>`;
    return wrap;
  });

  // ---- barModel (whole / parts) ----
  register("barModel", function ({ whole = null, parts = [], label = null }) {
    const width = 480, height = 60, pad = 4;
    const total = parts.reduce((s, p) => s + (p.value || 0), 0) || 1;
    const colors = ["#a78bfa", "#ff7a93", "#6ee7b7", "#ffd93d", "#7dd3fc", "#ffb077"];
    let x = pad;
    const segs = parts.map((p, i) => {
      const w = Math.max(24, Math.round((p.value / total) * (width - pad * 2)));
      const c = p.color || colors[i % colors.length];
      const seg = `<g transform="translate(${x} 0)">
        <rect width="${w}" height="${height}" rx="8" fill="${c}" stroke="#6b5b95" stroke-width="1.5"/>
        <text x="${w/2}" y="${height/2 + 6}" text-anchor="middle"
              font-family="Fredoka, sans-serif" font-size="18" font-weight="800" fill="#fff">${p.label || p.value}</text>
      </g>`;
      x += w + 2;
      return seg;
    });
    const wholeTxt = whole != null
      ? `<g>
           <line x1="${pad}" y1="${height + 12}" x2="${x - 2}" y2="${height + 12}" stroke="#6b5b95" stroke-width="1.5"/>
           <line x1="${pad}" y1="${height + 8}" x2="${pad}" y2="${height + 16}" stroke="#6b5b95" stroke-width="1.5"/>
           <line x1="${x - 2}" y1="${height + 8}" x2="${x - 2}" y2="${height + 16}" stroke="#6b5b95" stroke-width="1.5"/>
           <text x="${(x - 2 + pad)/2}" y="${height + 30}" text-anchor="middle"
                 font-family="Fredoka, sans-serif" font-size="15" font-weight="800"
                 fill="#6b5b95">Total: ${whole}</text>
         </g>`
      : "";
    const hgt = height + (whole != null ? 38 : 6) + (label ? 22 : 0);
    const wrap = h("div", { class: "teach-viz teach-barmodel" });
    wrap.innerHTML = `<svg viewBox="0 0 ${x + pad} ${hgt}" role="img" aria-label="Bar model">
      ${segs.join("")}
      ${wholeTxt}
      ${label ? `<text x="${(x + pad)/2}" y="${hgt - 4}" text-anchor="middle"
                   font-family="Fredoka, sans-serif" font-size="13" font-weight="700"
                   fill="#6b5b95">${label}</text>` : ""}
    </svg>`;
    return wrap;
  });

  // ---- fractionBar ----
  // Accepts either `num` or `numer` for the numerator — older op files use
  // both spellings, and silently defaulting to 1 used to hide the mismatch
  // (1/2 rendered correctly but 2/4, 4/8, etc. still only shaded 1 cell).
  //
  // Multi-whole mode
  // ----------------
  // When `wholes: N` (N >= 2) is passed, the viz renders N FULL bars side-by-
  // side (each uncut, denom=1, fully shaded). This is the right rendering for
  // teaching "whole numbers are fractions too" — the kid needs to SEE N whole
  // bars to understand that 5 wholes = 5/1, not infer it from one bar with a
  // misleading "another 1" label.
  register("fractionBar", function (params = {}) {
    const { denom = 4, color = "#ff7a93", label = null, wholes = null } = params;
    const num = params.num != null ? params.num
              : params.numer != null ? params.numer
              : 1;

    // Multi-whole rendering: N uncut bars side-by-side.
    if (Number.isInteger(wholes) && wholes >= 2) {
      const totalW = 360, gap = 6, padX = 2;
      const barH = 60;
      const barW = (totalW - padX * 2 - gap * (wholes - 1)) / wholes;
      const bars = [];
      for (let i = 0; i < wholes; i++) {
        const x = padX + i * (barW + gap);
        // Stagger so the kid SEES each whole bar appear in turn — same
        // animation language as the single-bar shading.
        const delay = 200 + i * 220;
        bars.push(`<rect class="fb-shade" style="animation-delay:${delay}ms"
          x="${x}" y="0" width="${barW}" height="${barH}"
          fill="${color}" stroke="#6b5b95" stroke-width="1.5" rx="4"/>`);
      }
      const hgt = barH + (label ? 24 : 4);
      const wrap = h("div", { class: "teach-viz teach-fraction" });
      wrap.innerHTML = `<svg viewBox="0 0 ${totalW} ${hgt}" role="img" aria-label="${wholes} whole bars">
        ${bars.join("")}
        ${label ? `<text x="${totalW/2}" y="${barH + 18}" text-anchor="middle"
                     font-family="Fredoka, sans-serif" font-size="15" font-weight="800"
                     fill="#6b5b95">${label}</text>` : ""}
      </svg>`;
      return wrap;
    }

    const width = 360, height = 60, pad = 2;
    const segW = (width - pad * 2) / denom;
    // Shaded segments fade in left-to-right with a staggered delay, so the
    // visual reads as "we're coloring 3 of 5 pieces" — an action, not a static
    // diagram. Unshaded segments appear immediately (the bar's structure).
    const segs = [];
    for (let i = 0; i < denom; i++) {
      const shaded = i < num;
      const cls = shaded ? "fb-shade" : "fb-empty";
      const delay = shaded ? 200 + i * 220 : 0;
      const styleAttr = shaded ? ` style="animation-delay:${delay}ms"` : "";
      segs.push(`<rect class="${cls}"${styleAttr} x="${pad + i * segW}" y="0" width="${segW}" height="${height}"
        fill="${shaded ? color : "#fff"}" stroke="#6b5b95" stroke-width="1.5"/>`);
    }
    const hgt = height + (label ? 24 : 4);
    const wrap = h("div", { class: "teach-viz teach-fraction" });
    wrap.innerHTML = `<svg viewBox="0 0 ${width} ${hgt}" role="img" aria-label="Fraction ${num} of ${denom}">
      ${segs.join("")}
      ${label ? `<text x="${width/2}" y="${height + 18}" text-anchor="middle"
                   font-family="Fredoka, sans-serif" font-size="15" font-weight="800"
                   fill="#6b5b95">${label}</text>` : ""}
    </svg>`;
    return wrap;
  });

  // ---- equalGroups (N groups of M) ----
  register("equalGroups", function (params = {}) {
    const { groups = 3, emoji = "🍓", label = null } = params;
    // Accept both `size` (newer files) and `per` (older files) for the
    // count of items per group. Without this fallback, callers passing `per`
    // silently render the default `size: 4` instead — same defect class as
    // the fractionBar numer/num bug.
    const size = params.size != null ? params.size
              : params.per  != null ? params.per
              : 4;
    const slots = [];
    for (let g = 0; g < groups; g++) {
      const items = [];
      for (let i = 0; i < size; i++) {
        const span = h("span", { class: "teach-eg-item" }, emoji);
        // Stagger items left-to-right within a group, then group-by-group
        // — matches how a teacher would point and count: "1, 2, 3 in this
        // group… 1, 2, 3 in this group…"
        span.style.animationDelay = (200 + (g * size + i) * 60) + "ms";
        items.push(span);
      }
      slots.push(h("div", { class: "teach-eg-group" }, items));
    }
    const children = [h("div", { class: "teach-eg-row" }, slots)];
    if (label) children.push(h("div", { class: "teach-eg-label" }, label));
    return h("div", { class: "teach-viz teach-equalgroups" }, children);
  });

  // ---- functionTable (Function Machine + IN/OUT table for stages A–E) ----
  //
  // The whole point of this viz is that one consistent picture carries the
  // instruction across every stage of a function-table lesson. The machine
  // externalises the *rule* (literal, mechanical); the table externalises the
  // *pattern* across rows. Colour is used as language: IN is one colour, OUT
  // is another, the rule is a third, and any unknown slot is the coral "?".
  //
  // Params:
  //   rule:    { op: "+"|"−"|"×"|"÷", n: 3 }   — null/omit ⇒ rule unknown (Stage D)
  //   rows:    [{ in: 1, out: 4 }, ...]        — null cell ⇒ "?" (Stages B, C, E)
  //   activeRowIdx: number                     — which row gets the highlight band
  //   machine: { in: 3, out: 6, showOut: bool } — what's in the machine slots
  //                                              (showOut:false ⇒ OUT slot blank)
  //   autoPlay: bool                           — Stage A: cycle through rows on a timer
  //   caption: string
  register("functionTable", function (params = {}) {
    const {
      rule = null,
      rows = [],
      activeRowIdx = null,
      machine = null,
      autoPlay = false,
      caption = null,
    } = params;

    // Colour language — these MUST stay consistent across every appearance
    // in the app so children learn to read the colour, not just the label.
    const C_IN   = "#7dd3fc";  // sky blue   — input
    const C_OUT  = "#6ee7b7";  // mint       — output
    const C_RULE = "#ffd93d";  // sun yellow — rule
    const C_UNK  = "#ff7a93";  // coral      — unknown / missing
    const C_INK  = "#6b5b95";

    const ruleText = rule
      ? `${rule.op} ${rule.n}`
      : "?";
    const ruleColor = rule ? C_RULE : C_UNK;

    // A slot is "unknown" when its value is explicitly null/"?" (Stages C/E).
    // Unknown slots paint coral so the colour language stays consistent with
    // unknown cells in the table — coral always = "this is what we're solving for".
    const machineInRaw  = machine ? machine.in  : null;
    const machineOutRaw = machine ? machine.out : null;
    const inIsKnown  = machine && machineInRaw !== null && machineInRaw !== undefined && machineInRaw !== "?";
    const outIsShownAndKnown = machine && machine.showOut && machineOutRaw !== null && machineOutRaw !== undefined && machineOutRaw !== "?";
    const machineIn  = inIsKnown ? machineInRaw : (machine ? "?" : "");
    const machineOut = outIsShownAndKnown ? machineOutRaw
                       : (machine && machine.showOut ? "?" : "");
    const inFill  = machine ? (inIsKnown ? C_IN : C_UNK) : "#fff";
    const outFill = machine && machine.showOut ? (outIsShownAndKnown ? C_OUT : C_UNK) : "#fff";

    // ---- Machine SVG (left) -------------------------------------------------
    // 320×200 viewBox. IN slot left, rule box centre, OUT slot right.
    const machineSvg = `
      <svg viewBox="0 0 320 200" role="img" aria-label="Function machine"
           class="ft-machine-svg">
        <!-- Conveyor base -->
        <rect x="10" y="120" width="300" height="14" rx="6"
              fill="#efeafd" stroke="${C_INK}" stroke-width="1.5"/>
        <!-- IN slot -->
        <g class="ft-in-tile">
          <rect x="18" y="56" width="64" height="64" rx="10"
                fill="${inFill}" stroke="${C_INK}" stroke-width="2.5"/>
          <text x="50" y="98" text-anchor="middle"
                font-family="Fredoka, sans-serif" font-size="32"
                font-weight="800" fill="${C_INK}">${machineIn}</text>
          <text x="50" y="40" text-anchor="middle"
                font-family="Fredoka, sans-serif" font-size="13"
                font-weight="800" fill="${C_INK}">IN</text>
        </g>
        <!-- Arrow into machine -->
        <g>
          <line x1="88" y1="88" x2="118" y2="88" stroke="${C_INK}" stroke-width="3"/>
          <polygon points="118,82 128,88 118,94" fill="${C_INK}"/>
        </g>
        <!-- Rule box (the machine itself) -->
        <g class="ft-rule-box ${rule ? "" : "ft-rule-unknown"}">
          <rect x="130" y="38" width="80" height="100" rx="14"
                fill="${ruleColor}" stroke="${C_INK}" stroke-width="3"/>
          <!-- little gears on top to read as "machine" -->
          <circle cx="148" cy="32" r="6" fill="${C_INK}"/>
          <circle cx="170" cy="28" r="7" fill="${C_INK}"/>
          <circle cx="192" cy="32" r="6" fill="${C_INK}"/>
          <text x="170" y="98" text-anchor="middle"
                font-family="Fredoka, sans-serif" font-size="26"
                font-weight="900" fill="${C_INK}">${ruleText}</text>
          <text x="170" y="156" text-anchor="middle"
                font-family="Fredoka, sans-serif" font-size="13"
                font-weight="800" fill="${C_INK}">RULE</text>
        </g>
        <!-- Arrow out of machine -->
        <g>
          <line x1="216" y1="88" x2="246" y2="88" stroke="${C_INK}" stroke-width="3"/>
          <polygon points="246,82 256,88 246,94" fill="${C_INK}"/>
        </g>
        <!-- OUT slot -->
        <g class="ft-out-tile">
          <rect x="248" y="56" width="64" height="64" rx="10"
                fill="${outFill}" stroke="${C_INK}" stroke-width="2.5"/>
          <text x="280" y="98" text-anchor="middle"
                font-family="Fredoka, sans-serif" font-size="32"
                font-weight="800" fill="${C_INK}">${machineOut}</text>
          <text x="280" y="40" text-anchor="middle"
                font-family="Fredoka, sans-serif" font-size="13"
                font-weight="800" fill="${C_INK}">OUT</text>
        </g>
      </svg>`;

    // ---- Table SVG (right) --------------------------------------------------
    // Two columns IN | OUT. Rows render with cell value or "?" if null.
    // Active row gets a soft yellow band behind it.
    const rowH = 36;
    const tablePadTop = 38;
    const tableW = 200;
    const tableH = tablePadTop + Math.max(1, rows.length) * rowH + 8;
    const colX = [50, 150]; // centres of IN and OUT columns

    const headerRow = `
      <rect x="4" y="6" width="${tableW - 8}" height="26" rx="6"
            fill="#fff" stroke="${C_INK}" stroke-width="2"/>
      <text x="${colX[0]}" y="24" text-anchor="middle"
            font-family="Fredoka, sans-serif" font-size="14"
            font-weight="800" fill="${C_INK}">IN</text>
      <text x="${colX[1]}" y="24" text-anchor="middle"
            font-family="Fredoka, sans-serif" font-size="14"
            font-weight="800" fill="${C_INK}">OUT</text>
      <line x1="100" y1="6" x2="100" y2="${tableH - 4}"
            stroke="${C_INK}" stroke-width="1.5" opacity="0.4"/>`;

    const rowParts = rows.map((r, i) => {
      const y = tablePadTop + i * rowH;
      const isActive = activeRowIdx === i;
      const band = isActive
        ? `<rect x="4" y="${y - 2}" width="${tableW - 8}" height="${rowH}" rx="6"
                 fill="#fff4d6" opacity="0.9"/>`
        : "";
      const rowDim = (activeRowIdx != null && !isActive) ? ' opacity="0.55"' : "";

      const inIsUnknown = r.in === null || r.in === undefined;
      const outIsUnknown = r.out === null || r.out === undefined;
      const inFill = inIsUnknown ? C_UNK : C_IN;
      const outFill = outIsUnknown ? C_UNK : C_OUT;

      return `
        ${band}
        <g${rowDim}>
          <rect x="14" y="${y}" width="72" height="${rowH - 8}" rx="6"
                fill="${inFill}" stroke="${C_INK}" stroke-width="1.5"
                opacity="${inIsUnknown ? 0.85 : 0.85}"/>
          <text x="${colX[0]}" y="${y + rowH/2 + 1}" text-anchor="middle"
                font-family="Fredoka, sans-serif" font-size="18"
                font-weight="800" fill="${C_INK}">${inIsUnknown ? "?" : r.in}</text>
          <rect x="114" y="${y}" width="72" height="${rowH - 8}" rx="6"
                fill="${outFill}" stroke="${C_INK}" stroke-width="1.5"
                opacity="${outIsUnknown ? 0.85 : 0.85}"/>
          <text x="${colX[1]}" y="${y + rowH/2 + 1}" text-anchor="middle"
                font-family="Fredoka, sans-serif" font-size="18"
                font-weight="800" fill="${C_INK}">${outIsUnknown ? "?" : r.out}</text>
        </g>`;
    }).join("");

    const tableSvg = `
      <svg viewBox="0 0 ${tableW} ${tableH}" role="img"
           aria-label="Function table" class="ft-table-svg">
        <rect x="2" y="2" width="${tableW - 4}" height="${tableH - 4}" rx="10"
              fill="#fff" stroke="${C_INK}" stroke-width="2.5"/>
        ${headerRow}
        ${rowParts}
      </svg>`;

    // ---- Compose ------------------------------------------------------------
    const wrap = h("div", { class: "teach-viz teach-functiontable" });
    wrap.innerHTML = `
      <div class="ft-stage">
        <div class="ft-machine">${machineSvg}</div>
        <div class="ft-table">${tableSvg}</div>
      </div>
      ${caption ? `<div class="ft-caption">${caption}</div>` : ""}
    `;

    // ---- Auto-play (Stage A: machine runs autonomously) --------------------
    // Cycles activeRowIdx through the rows on a fixed cadence. Same duration
    // every step — predictability is the instruction here, not flair.
    if (autoPlay && rows.length > 0) {
      const machineEl = wrap.querySelector(".ft-machine");
      const tableEl = wrap.querySelector(".ft-table");
      const stepMs = 1400;
      let cur = 0;
      const tick = () => {
        if (!wrap.isConnected) return; // viz was unmounted; stop cycling
        const r = rows[cur];
        // Re-render with the active row + machine in/out reflecting it.
        // We do this by re-invoking the renderer — cheapest and avoids drift.
        const next = window.MR.Viz.render({
          type: "functionTable",
          params: {
            rule, rows, activeRowIdx: cur,
            machine: { in: r.in, out: r.out, showOut: true },
            autoPlay: false, // child render must not loop
            caption: null,
          },
        });
        // Swap just the stage contents to avoid losing the caption underneath.
        const newStage = next.querySelector(".ft-stage");
        const oldStage = wrap.querySelector(".ft-stage");
        if (newStage && oldStage) oldStage.replaceWith(newStage);
        cur = (cur + 1) % rows.length;
      };
      // Kick off shortly after mount so the initial frame is visible first.
      setTimeout(() => {
        tick();
        wrap._ftTimer = setInterval(tick, stepMs);
      }, 600);
    }

    return wrap;
  });

  // ---- shapeGrid (display polygons) ----
  register("shapeGrid", function ({ shapes = [], label = null }) {
    const tiles = shapes.map((s) => {
      const name = s.name || s.kind || "?";
      const svg = shapeSvg(s);
      const tile = h("div", { class: "teach-shape-tile" });
      tile.innerHTML = `${svg}<div class="teach-shape-name">${name}</div>`;
      return tile;
    });
    const children = [h("div", { class: "teach-shape-row" }, tiles)];
    if (label) children.push(h("div", { class: "teach-eg-label" }, label));
    return h("div", { class: "teach-viz teach-shapegrid" }, children);
  });

  function shapeSvg(s) {
    const fill = s.fill || "#a78bfa";
    const stroke = "#6b5b95";
    const size = 80;
    let inner = "";
    switch (s.kind) {
      case "triangle":
        inner = `<polygon points="40,8 72,68 8,68" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;
        break;
      case "square":
        inner = `<rect x="12" y="12" width="56" height="56" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;
        break;
      case "rectangle":
        inner = `<rect x="6" y="20" width="68" height="40" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;
        break;
      case "circle":
        inner = `<circle cx="40" cy="40" r="30" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;
        break;
      case "pentagon":
        inner = `<polygon points="40,8 72,32 60,68 20,68 8,32" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;
        break;
      case "hexagon":
        inner = `<polygon points="40,6 70,24 70,56 40,74 10,56 10,24" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;
        break;
      case "rhombus":
        inner = `<polygon points="40,8 72,40 40,72 8,40" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;
        break;
      case "trapezoid":
        inner = `<polygon points="16,20 64,20 74,60 6,60" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;
        break;
      default:
        inner = `<rect x="10" y="10" width="60" height="60" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;
    }
    return `<svg viewBox="0 0 ${size} ${size}" role="img" aria-label="${s.kind}">${inner}</svg>`;
  }

  // ---- ruler (length measurement) ----
  register("ruler", function ({ length = 6, unit = "cm", item = "🖍️", itemLen = 4 }) {
    const width = 480, pxPerUnit = 48;
    const rulerW = length * pxPerUnit;
    const ticks = [];
    for (let i = 0; i <= length; i++) {
      const x = i * pxPerUnit;
      ticks.push(`<line x1="${x}" y1="30" x2="${x}" y2="${i % 5 === 0 ? 52 : 44}" stroke="#6b5b95" stroke-width="${i % 5 === 0 ? 2 : 1}"/>`);
      ticks.push(`<text x="${x}" y="68" text-anchor="middle" font-family="Fredoka, sans-serif"
        font-size="12" font-weight="700" fill="#6b5b95">${i}</text>`);
    }
    const itemX = 0;
    const itemPx = itemLen * pxPerUnit;
    const wrap = h("div", { class: "teach-viz teach-ruler" });
    wrap.innerHTML = `<svg viewBox="-4 -4 ${Math.max(rulerW + 8, width)} 96" role="img" aria-label="Ruler">
      <rect x="${itemX}" y="4" width="${itemPx}" height="20" rx="4" fill="#ffd93d" stroke="#6b5b95" stroke-width="1.5"/>
      <text x="${itemX + itemPx/2}" y="18" text-anchor="middle" font-size="16">${item}</text>
      <rect x="0" y="30" width="${rulerW}" height="24" fill="#fff" stroke="#6b5b95" stroke-width="2"/>
      ${ticks.join("")}
      <text x="${rulerW/2}" y="88" text-anchor="middle" font-family="Fredoka, sans-serif"
            font-size="14" font-weight="800" fill="#6b5b95">${itemLen} ${unit}</text>
    </svg>`;
    return wrap;
  });

  // ---- clock (analog clock face) ----
  function analogClockSvg({ hour = 3, minute = 0, label = null, accent = "#a78bfa" }) {
    const cx = 90, cy = 90, r = 80;
    const ticks = [];
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
      const x1 = cx + Math.cos(a) * (r - 8);
      const y1 = cy + Math.sin(a) * (r - 8);
      const x2 = cx + Math.cos(a) * (r - 2);
      const y2 = cy + Math.sin(a) * (r - 2);
      ticks.push(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#6b5b95" stroke-width="2.5"/>`);
      const tx = cx + Math.cos(a) * (r - 22);
      const ty = cy + Math.sin(a) * (r - 22) + 6;
      const num = i === 0 ? 12 : i;
      ticks.push(`<text x="${tx}" y="${ty}" text-anchor="middle" font-family="Fredoka, sans-serif"
        font-size="16" font-weight="800" fill="#6b5b95">${num}</text>`);
    }
    const hourA = ((hour % 12) / 12) * Math.PI * 2 + (minute / 60) * (Math.PI / 6) - Math.PI / 2;
    const minA = (minute / 60) * Math.PI * 2 - Math.PI / 2;
    const hx = cx + Math.cos(hourA) * (r * 0.55);
    const hy = cy + Math.sin(hourA) * (r * 0.55);
    const mx = cx + Math.cos(minA) * (r * 0.78);
    const my = cy + Math.sin(minA) * (r * 0.78);
    // Hands sweep from 12 to their target position via CSS rotation. The
    // hourDeg / minuteDeg vars tell the keyframe where to land. The kid sees
    // time *progressing* into place, not just appearing — matches the mental
    // model of a clock ticking forward.
    const hourDeg = (hour % 12) * 30 + (minute / 60) * 30;
    const minDeg = minute * 6;
    return `<svg viewBox="0 0 180 ${label ? 200 : 180}" role="img" aria-label="Clock showing ${hour}:${String(minute).padStart(2,"0")}">
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="#fff8ed" stroke="#6b5b95" stroke-width="3"/>
      ${ticks.join("")}
      <g class="clock-hour-hand" style="--hand-deg:${hourDeg}deg; transform-origin:${cx}px ${cy}px;">
        <line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy - r * 0.55}" stroke="#3a2e5f" stroke-width="5" stroke-linecap="round"/>
      </g>
      <g class="clock-min-hand" style="--hand-deg:${minDeg}deg; transform-origin:${cx}px ${cy}px;">
        <line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy - r * 0.78}" stroke="${accent}" stroke-width="3.5" stroke-linecap="round"/>
      </g>
      <circle cx="${cx}" cy="${cy}" r="5" fill="#3a2e5f"/>
      ${label ? `<text x="${cx}" y="196" text-anchor="middle" font-family="Fredoka, sans-serif"
                   font-size="15" font-weight="800" fill="#6b5b95">${label}</text>` : ""}
    </svg>`;
  }

  register("clock", function (params) {
    const wrap = h("div", { class: "teach-viz teach-clock" });
    wrap.innerHTML = analogClockSvg(params);
    return wrap;
  });

  // ---- digitalClock (styled LCD-style readout) ----
  // Params: hour (1-12 or 0-23), minute (0-59), ampm ("AM"|"PM"|null),
  //         label (caption below), accent (digit colour).
  function digitalClockSvg({ hour = 3, minute = 0, ampm = null, label = null, accent = "#3a2e5f" }) {
    const h_ = Number(hour), m_ = Number(minute);
    const hh = String(h_).padStart(2, " ");       // leading space for single-digit hour
    const mm = String(m_).padStart(2, "0");
    const face = `${hh}:${mm}`;
    const w = ampm ? 240 : 210;
    const hgt = label ? 120 : 100;
    return `<svg viewBox="0 0 ${w} ${hgt}" role="img" aria-label="Digital clock showing ${h_}:${mm}${ampm ? " " + ampm : ""}">
      <rect x="6" y="6" width="${w - 12}" height="88" rx="14"
            fill="#1f1436" stroke="#6b5b95" stroke-width="3"/>
      <rect x="12" y="12" width="${w - 24}" height="76" rx="10"
            fill="#0f0a1f" opacity="0.85"/>
      <text x="${ampm ? 110 : w / 2}" y="70" text-anchor="middle"
            font-family="'Courier New', Menlo, monospace" font-size="56"
            font-weight="800" letter-spacing="2" fill="${accent}"
            style="text-shadow:0 0 6px ${accent};">${face}</text>
      ${ampm ? `<text x="${w - 32}" y="44" text-anchor="middle"
                     font-family="Fredoka, sans-serif" font-size="18" font-weight="800"
                     fill="#ffd93d">${ampm}</text>
                <text x="${w - 32}" y="76" text-anchor="middle"
                     font-family="Fredoka, sans-serif" font-size="11" font-weight="700"
                     fill="#c4b5fd">time</text>` : ""}
      ${label ? `<text x="${w / 2}" y="${hgt - 4}" text-anchor="middle"
                   font-family="Fredoka, sans-serif" font-size="15" font-weight="800"
                   fill="#6b5b95">${label}</text>` : ""}
    </svg>`;
  }

  register("digitalClock", function (params) {
    const wrap = h("div", { class: "teach-viz teach-digital-clock" });
    wrap.innerHTML = digitalClockSvg(params);
    return wrap;
  });

  // ---- clockPair (two clocks side-by-side for start/end elapsed time) ----
  // Params:
  //   mode: "analog" (default) | "digital" | "mixed" (start analog, end digital)
  //   start: { hour, minute }, end: { hour, minute }
  //   startLabel, endLabel, arrowText, label
  register("clockPair", function ({
    mode = "analog",
    start = { hour: 2, minute: 0 },
    end = { hour: 5, minute: 0 },
    startLabel = "Start",
    endLabel = "End",
    arrowText = "",
    label = null,
  }) {
    const leftMode  = mode === "digital" ? "digital" : "analog";
    const rightMode = (mode === "digital" || mode === "mixed") ? "digital" : "analog";
    const leftSvg  = leftMode === "analog"
      ? analogClockSvg({ hour: start.hour, minute: start.minute || 0, accent: "#6ee7b7" })
      : digitalClockSvg({ hour: start.hour, minute: start.minute || 0, accent: "#6ee7b7" });
    const rightSvg = rightMode === "analog"
      ? analogClockSvg({ hour: end.hour, minute: end.minute || 0, accent: "#ff7a93" })
      : digitalClockSvg({ hour: end.hour, minute: end.minute || 0, accent: "#ff7a93" });
    const wrap = h("div", { class: "teach-viz teach-clock-pair" });
    wrap.innerHTML = `
      <div class="teach-clock-pair-row">
        <div class="teach-clock-pair-side">
          <div class="teach-clock-pair-cap">${startLabel}</div>
          ${leftSvg}
        </div>
        <div class="teach-clock-pair-arrow">
          <div class="teach-clock-pair-arrow-icon">→</div>
          ${arrowText ? `<div class="teach-clock-pair-arrow-text">${arrowText}</div>` : ""}
        </div>
        <div class="teach-clock-pair-side">
          <div class="teach-clock-pair-cap">${endLabel}</div>
          ${rightSvg}
        </div>
      </div>
      ${label ? `<div class="teach-eg-label">${label}</div>` : ""}
    `;
    return wrap;
  });

  // ---- barChart (simple data bars) ----
  register("barChart", function ({ bars = [], yMax = null, label = null }) {
    // pad bumped from 28 → 36 so 2-digit y-axis labels fit comfortably
    // ("10", "20") without crowding the y-axis line.
    const width = 440, height = 180, pad = 36;
    const max = yMax || Math.max(...bars.map((b) => b.value || 0), 1);
    const colors = ["#a78bfa", "#ff7a93", "#6ee7b7", "#ffd93d", "#7dd3fc", "#ffb077"];
    const slotW = (width - pad * 2) / bars.length;
    const barW = Math.min(48, slotW * 0.65);
    const chartH = height - pad * 2;

    // Decide y-axis step so the grid doesn't get cluttered. For 3rd-grade
    // content max is usually small (≤ 20), so step=1 is the typical case —
    // every integer gets a grid line and a number label, which is exactly
    // what the audit asked for: kids can read bar heights directly off the
    // axis instead of comparing the bar top against a tiny floating number.
    let yStep = 1;
    if (max > 50) yStep = 10;
    else if (max > 20) yStep = 5;
    else if (max > 10) yStep = 2;

    // Build horizontal grid lines + y-axis labels. Grid lines are drawn FIRST
    // (= behind the bars) and use a very light lilac so the bars stay visually
    // dominant. The y=0 line is omitted because the x-axis itself marks it.
    const gridParts = [];
    for (let v = 0; v <= max; v += yStep) {
      const y = height - pad - (v / max) * chartH;
      if (v > 0) {
        gridParts.push(
          `<line x1="${pad}" y1="${y}" x2="${width - pad}" y2="${y}"
                 stroke="#e9defc" stroke-width="1"/>`
        );
      }
      gridParts.push(
        `<text x="${pad - 6}" y="${y + 4}" text-anchor="end"
               font-family="Fredoka, sans-serif" font-size="11"
               font-weight="700" fill="#6b5b95">${v}</text>`
      );
    }

    // Each bar grows up from the baseline (CSS animation: tv-bar-rise scales
    // the rect from 0→1 with transform-origin: bottom). We add per-bar delay
    // inline so bars rise left-to-right, building the chart visibly.
    const segs = bars.map((b, i) => {
      const h_ = Math.round((b.value / max) * chartH);
      const x = pad + i * slotW + (slotW - barW) / 2;
      const y = height - pad - h_;
      const c = b.color || colors[i % colors.length];
      const delay = 200 + i * 160;
      return `<g>
        <rect style="animation-delay:${delay}ms" x="${x}" y="${y}" width="${barW}" height="${h_}" rx="6" fill="${c}" stroke="#6b5b95" stroke-width="1.5"/>
        <text x="${x + barW/2}" y="${y - 4}" text-anchor="middle" font-family="Fredoka, sans-serif"
              font-size="13" font-weight="800" fill="#6b5b95">${b.value}</text>
        <text x="${x + barW/2}" y="${height - pad + 16}" text-anchor="middle"
              font-family="Nunito, sans-serif" font-size="13" fill="#6b5b95">${b.label || ""}</text>
      </g>`;
    });
    const wrap = h("div", { class: "teach-viz teach-barchart" });
    // Render order: grid (lightest, behind) → axes (slightly darker) → bars
    // (most prominent, animated). Y-axis labels sit to the left of the axis
    // so they don't interfere with bar contents.
    wrap.innerHTML = `<svg viewBox="0 0 ${width} ${height + 20}" role="img" aria-label="Bar chart">
      ${gridParts.join("")}
      <line x1="${pad}" y1="${pad}" x2="${pad}" y2="${height - pad}" stroke="#6b5b95" stroke-width="2"/>
      <line x1="${pad}" y1="${height - pad}" x2="${width - pad}" y2="${height - pad}" stroke="#6b5b95" stroke-width="2"/>
      ${segs.join("")}
      ${label ? `<text x="${width/2}" y="${height + 14}" text-anchor="middle"
                   font-family="Fredoka, sans-serif" font-size="14" font-weight="800"
                   fill="#6b5b95">${label}</text>` : ""}
    </svg>`;
    return wrap;
  });

  // ---- tally marks ----
  // Each bundle staggers in left-to-right via the existing teach-eg-item pop
  // animation pattern — simulates "tallying" rather than appearing static.
  register("tally", function ({ count = 5, label = null }) {
    const bundles = Math.floor(count / 5);
    const rem = count % 5;
    const items = [];
    let idx = 0;
    for (let b = 0; b < bundles; b++) {
      const span = h("span", { class: "teach-tally-bundle" }, "卌");
      span.style.animationDelay = (200 + idx++ * 180) + "ms";
      items.push(span);
    }
    if (rem > 0) {
      const span = h("span", { class: "teach-tally-bundle" }, "|".repeat(rem));
      span.style.animationDelay = (200 + idx++ * 180) + "ms";
      items.push(span);
    }
    const children = [h("div", { class: "teach-tally-row" }, items)];
    if (label) children.push(h("div", { class: "teach-eg-label" }, label));
    return h("div", { class: "teach-viz teach-tally" }, children);
  });

  // ---- timeline (elapsed-time hops between events) ----
  register("timeline", function ({ start = "9:00", end = "11:30", hops = [], label = null }) {
    // hops: [{ from: "9:00", to: "10:00", text: "+1h" }, …]
    // Render a horizontal ribbon with start/end tick + arched hop arrows.
    const width = 520, pad = 40, railY = 52;
    const toMin = (t) => {
      const [h_, m_] = String(t).split(":").map(Number);
      return h_ * 60 + (m_ || 0);
    };
    const s = toMin(start), e = toMin(end);
    const span = Math.max(1, e - s);
    const xFor = (t) => pad + ((toMin(t) - s) / span) * (width - pad * 2);
    const hopArcs = hops.map((hp, i) => {
      const fx = xFor(hp.from), tx = xFor(hp.to);
      const mx = (fx + tx) / 2;
      return `<path d="M${fx} ${railY} Q ${mx} ${railY - 34} ${tx} ${railY}" stroke="#ff7a93"
               stroke-width="2.5" fill="none" stroke-linecap="round"/>
             <polygon points="${tx - 5},${railY} ${tx + 5},${railY} ${tx},${railY + 7}" fill="#ff7a93"/>
             <text x="${mx}" y="${railY - 18}" text-anchor="middle" font-family="Fredoka, sans-serif"
                   font-size="13" font-weight="800" fill="#ff7a93">${hp.text || ""}</text>`;
    }).join("");
    // Event ticks: always show start, end, and any hop endpoints
    const events = [start, ...hops.map((h) => h.to)];
    const eventTicks = events.map((t) => {
      const x = xFor(t);
      return `<line x1="${x}" y1="${railY - 6}" x2="${x}" y2="${railY + 12}" stroke="#6b5b95" stroke-width="2"/>
              <text x="${x}" y="${railY + 28}" text-anchor="middle" font-family="Fredoka, sans-serif"
                    font-size="13" font-weight="700" fill="#6b5b95">${t}</text>`;
    }).join("");
    const wrap = h("div", { class: "teach-viz teach-timeline" });
    wrap.innerHTML = `<svg viewBox="0 0 ${width} 82" role="img" aria-label="Timeline from ${start} to ${end}">
      <line x1="${pad}" y1="${railY}" x2="${width - pad}" y2="${railY}" stroke="#c4b5fd" stroke-width="3"/>
      ${hopArcs}
      ${eventTicks}
      ${label ? `<text x="${width/2}" y="76" text-anchor="middle" font-family="Fredoka, sans-serif"
                   font-size="13" font-weight="700" fill="#6b5b95">${label}</text>` : ""}
    </svg>`;
    return wrap;
  });

  // ---- fractionNumline (fractions on a number line 0..1 with tick marks) ----
  register("fractionNumline", function ({
    denom = 4, markAt = null, labelEvery = true, label = null, max = 1,
  }) {
    // `max` extends the line past 1 (e.g., max=2 shows 0…1…2 with fraction
    // ticks throughout). Each whole gets its own labeled endpoint (0, 1, 2)
    // and the fraction ticks between them carry their fraction names
    // (1/4, 2/4, 3/4 within 0–1; then 5/4, 6/4, 7/4 within 1–2). This lets
    // a teach lesson actually SHOW a fraction past 1 instead of asking the
    // kid to "imagine ticks."
    const wholes = Math.max(1, max | 0);
    const totalTicks = denom * wholes;
    const width = 500, pad = 34, y = 44;
    const step = (width - pad * 2) / totalTicks;
    const ticks = [];
    for (let i = 0; i <= totalTicks; i++) {
      const x = pad + i * step;
      const isWholeMultiple = (i % denom === 0);
      ticks.push(`<line x1="${x}" y1="${y - 8}" x2="${x}" y2="${y + 8}"
                   stroke="#6b5b95" stroke-width="${isWholeMultiple ? 3 : 2}"/>`);
      if (labelEvery || isWholeMultiple) {
        let txt;
        if (isWholeMultiple) {
          // Label whole-number positions as 0, 1, 2, ...
          txt = String(i / denom);
        } else {
          // Fractional tick — its name is `i/denom`
          txt = `${i}/${denom}`;
        }
        ticks.push(`<text x="${x}" y="${y + 26}" text-anchor="middle"
                     font-family="Fredoka, sans-serif" font-size="13" font-weight="700"
                     fill="#6b5b95">${txt}</text>`);
      }
    }
    let marker = "";
    if (markAt != null) {
      const mx = pad + markAt * step;
      marker = `<g transform="translate(${mx} ${y - 26})">
        <circle r="14" fill="#fff" stroke="#ff7a93" stroke-width="3"/>
        <!-- raccoon faces right (direction of motion), 30% bigger -->
        <text y="6" text-anchor="middle" font-size="21"
              transform="scale(-1 1)">🦝</text>
      </g>`;
    }
    // SVG height grows to 92 when a label is present so the bottom caption
    // doesn't overlap the tick labels (which sit at y+26 = 70).
    const svgH = label ? 92 : 72;
    const wrap = h("div", { class: "teach-viz teach-numline" });
    wrap.innerHTML = `<svg viewBox="0 0 ${width} ${svgH}" role="img" aria-label="Fraction number line">
      <line x1="${pad}" y1="${y}" x2="${width - pad}" y2="${y}" stroke="#c4b5fd" stroke-width="2"/>
      ${ticks.join("")}
      ${marker}
      ${label ? `<text x="${width/2}" y="88" text-anchor="middle" font-family="Fredoka, sans-serif"
                   font-size="13" font-weight="700" fill="#6b5b95">${label}</text>` : ""}
    </svg>`;
    return wrap;
  });

  // ---- fractionBarPair (two fractions stacked for comparison) -----------
  // For "Line Them Up" pedagogy: render TWO same-length bars, each shaded
  // to a different fraction, stacked vertically so the kid can compare
  // shaded lengths by eye. The longer-shaded bar is the bigger fraction.
  //
  // Without this primitive, the "compare two fractions" pedagogy collapses
  // because the existing fractionBar can only show one fraction at a time —
  // forcing the lesson to ask the kid to "imagine" the second bar.
  register("fractionBarPair", function ({
    top = { numer: 1, denom: 2 }, bottom = { numer: 1, denom: 3 },
    topLabel = null, bottomLabel = null, label = null,
    topColor = "#ff7a93", bottomColor = "#7dd3fc",
  }) {
    const width = 360, barH = 50, pad = 2, gap = 26;
    const labelW = 60; // left gutter for fraction labels
    const barW = width - pad * 2 - labelW;
    function buildBar(spec, color, y, lbl) {
      const denom = Math.max(1, spec.denom | 0);
      const numer = Math.max(0, Math.min(denom, spec.numer | 0));
      const segW = barW / denom;
      const segs = [];
      for (let i = 0; i < denom; i++) {
        const shaded = i < numer;
        segs.push(`<rect x="${pad + labelW + i * segW}" y="${y}" width="${segW}" height="${barH}"
          fill="${shaded ? color : "#fff"}" stroke="#6b5b95" stroke-width="1.5"/>`);
      }
      const labelText = lbl != null ? lbl : `${numer}/${denom}`;
      const labelSvg = `<text x="${pad + labelW - 8}" y="${y + barH / 2 + 6}" text-anchor="end"
        font-family="Fredoka, sans-serif" font-size="18" font-weight="800"
        fill="#3a2e5f">${labelText}</text>`;
      return labelSvg + segs.join("");
    }
    const topSvg = buildBar(top, topColor, pad, topLabel);
    const bottomSvg = buildBar(bottom, bottomColor, pad + barH + gap, bottomLabel);
    const totalH = pad * 2 + barH * 2 + gap + (label ? 22 : 0);
    const wrap = h("div", { class: "teach-viz teach-fraction teach-fraction-pair" });
    wrap.innerHTML = `<svg viewBox="0 0 ${width} ${totalH}" role="img"
        aria-label="Compare ${top.numer}/${top.denom} and ${bottom.numer}/${bottom.denom}">
      ${topSvg}
      ${bottomSvg}
      ${label ? `<text x="${width/2}" y="${totalH - 4}" text-anchor="middle"
                   font-family="Fredoka, sans-serif" font-size="14" font-weight="700"
                   fill="#6b5b95">${label}</text>` : ""}
    </svg>`;
    return wrap;
  });

  // ---- skipCountPicto (icons with cumulative skip-count beneath) ----
  //
  // Pedagogy: for any "each icon = N, row has K icons, how many?" question,
  // this viz shows the row of K icons with the cumulative count beneath each
  // (N, 2N, 3N, …, KN). The kid SEES the skip-count pattern that maps to the
  // multiplication answer. Reinforces CCSS 3.MD.B.3 (pictograph reading) +
  // 3.OA.9 (arithmetic patterns) in one picture.
  //
  // Params:
  //   icon:   the emoji to repeat (e.g. "🐝")
  //   scale:  what each icon represents (e.g. 3 bees per icon)
  //   count:  how many icons in the row (e.g. 6)
  //   label:  optional caption below the row
  register("skipCountPicto", function ({ icon = "🐝", scale = 3, count = 6, label = null, showTally = true }) {
    const wrap = h("div", { class: "teach-viz teach-skipcountpicto" });
    // Each cell has the icon stacked above its cumulative tally. Tallies
    // appear left-to-right with a small stagger so the SKIP-COUNT reads as
    // a temporal pattern (3, then 6, then 9, …) — same staggered cadence as
    // pictograph icon pop-in, which kids already recognise.
    //
    // For TEACH lessons, tallies are scaffolding (showTally: true, default).
    // For ARCADE questions where the kid must compute the total, callers
    // pass showTally: false so the cumulative numbers don't leak the answer.
    const cells = [];
    for (let i = 0; i < count; i++) {
      const cumulative = (i + 1) * scale;
      cells.push(
        `<div class="scp-cell" style="animation-delay:${200 + i * 90}ms">
           <span class="scp-icon">${icon}</span>
           ${showTally ? `<span class="scp-tally">${cumulative}</span>` : ''}
         </div>`
      );
    }
    wrap.innerHTML = `
      <div class="scp-row">${cells.join("")}</div>
      ${label
        ? `<div class="scp-label">${label}</div>`
        : `<div class="scp-label">Each ${icon}: ${scale}  ·  count by ${scale}s</div>`
      }
    `;
    return wrap;
  });

  // ---- pictograph (rows of icons, optional scale) ----
  register("pictograph", function ({ rows = [], icon = "🐞", scale = 1, label = null }) {
    // rows: [{ label: "Monday", count: 3 }, …] — count is icons to draw
    let globalIdx = 0;
    const out = rows.map((r) => {
      const icons = [];
      for (let i = 0; i < r.count; i++) {
        const span = h("span", { class: "teach-pg-icon" }, r.icon || icon);
        // Stagger row-major across the whole pictograph so the kid can
        // visually count along: row 1 fills, then row 2, then row 3.
        span.style.animationDelay = (200 + globalIdx * 70) + "ms";
        globalIdx++;
        icons.push(span);
      }
      return h("div", { class: "teach-pg-row" }, [
        h("span", { class: "teach-pg-row-label" }, r.label),
        h("span", { class: "teach-pg-row-icons" }, icons),
      ]);
    });
    const key = scale !== 1
      ? h("div", { class: "teach-pg-key" }, `${icon} = ${scale}`)
      : null;
    const children = [h("div", { class: "teach-pg-rows" }, out)];
    if (key) children.push(key);
    if (label) children.push(h("div", { class: "teach-eg-label" }, label));
    return h("div", { class: "teach-viz teach-pictograph" }, children);
  });

  // ---- areaGrid (rectangle filled with unit squares) ----
  register("areaGrid", function ({ rows = 3, cols = 4, filled = null, label = null, unit = "sq" }) {
    // filled can be null (all), a number (first N), or [indexes]
    const cell = 30;
    const squares = [];
    const total = rows * cols;
    const isFilled = (idx) => {
      if (filled == null) return true;
      if (Array.isArray(filled)) return filled.includes(idx);
      return idx < filled;
    };
    // Tiles fill in row-by-row, then column-by-column within each row — same
    // visual scan order a kid uses to count "1, 2, 3 ... 4, 5, 6 ..."
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const idx = r * cols + c;
        const x = c * cell, y = r * cell;
        const filledHere = isFilled(idx);
        const fill = filledHere ? "#ffd93d" : "#fff";
        // Only animate FILLED tiles (empty tiles are scaffold; they shouldn't
        // pop in dramatically). The unfilled grid appears immediately so the
        // child sees the boundary first, then watches it fill.
        const cls = filledHere ? ' class="ag-tile"' : "";
        const styleAttr = filledHere
          ? ` style="animation-delay:${200 + idx * 60}ms"`
          : "";
        squares.push(`<rect${cls}${styleAttr} x="${x}" y="${y}" width="${cell}" height="${cell}"
          fill="${fill}" stroke="#6b5b95" stroke-width="1.5"/>`);
      }
    }
    const w = cols * cell + 4;
    const hgt = rows * cell + (label ? 24 : 4);
    const wrap = h("div", { class: "teach-viz teach-areagrid" });
    wrap.innerHTML = `<svg viewBox="0 0 ${w} ${hgt}" role="img" aria-label="${rows} by ${cols} area grid">
      ${squares.join("")}
      ${label ? `<text x="${w/2}" y="${rows * cell + 18}" text-anchor="middle"
                   font-family="Fredoka, sans-serif" font-size="13" font-weight="800"
                   fill="#6b5b95">${label}</text>` : ""}
    </svg>`;
    return wrap;
  });

  // ---- perimeterShape (rectangle with edge lengths labeled) ----
  register("perimeterShape", function ({ w = 5, h: hh = 3, traceEdge = null, label = null }) {
    // traceEdge: null, or 0..3 (top, right, bottom, left) to highlight
    const scale = 28;
    const pxW = w * scale, pxH = hh * scale;
    const pad = 28;
    const x = pad, y = pad;
    const edges = [
      { x1: x, y1: y, x2: x + pxW, y2: y, label: `${w}` },                    // top
      { x1: x + pxW, y1: y, x2: x + pxW, y2: y + pxH, label: `${hh}` },        // right
      { x1: x + pxW, y1: y + pxH, x2: x, y2: y + pxH, label: `${w}` },        // bottom
      { x1: x, y1: y + pxH, x2: x, y2: y, label: `${hh}` },                    // left
    ];
    const edgeMarks = edges.map((e, i) => {
      const lit = traceEdge === i;
      const col = lit ? "#ff7a93" : "#6b5b95";
      const sw = lit ? 5 : 2.5;
      const mx = (e.x1 + e.x2) / 2, my = (e.y1 + e.y2) / 2;
      // position label outward from the rect centre
      const cx = x + pxW / 2, cy = y + pxH / 2;
      const dx = mx - cx, dy = my - cy;
      const len = Math.hypot(dx, dy) || 1;
      const ox = mx + (dx / len) * 16, oy = my + (dy / len) * 16 + 4;
      return `<line x1="${e.x1}" y1="${e.y1}" x2="${e.x2}" y2="${e.y2}" stroke="${col}" stroke-width="${sw}" stroke-linecap="round"/>
              <text x="${ox}" y="${oy}" text-anchor="middle" font-family="Fredoka, sans-serif"
                    font-size="14" font-weight="800" fill="#6b5b95">${e.label}</text>`;
    }).join("");
    const svgW = pxW + pad * 2;
    const svgH = pxH + pad * 2 + (label ? 16 : 0);
    const wrap = h("div", { class: "teach-viz teach-perimeter" });
    wrap.innerHTML = `<svg viewBox="0 0 ${svgW} ${svgH}" role="img" aria-label="Rectangle ${w} by ${hh}">
      <rect x="${x}" y="${y}" width="${pxW}" height="${pxH}" fill="#c4b5fd" opacity="0.22"/>
      ${edgeMarks}
      ${label ? `<text x="${svgW/2}" y="${svgH - 2}" text-anchor="middle" font-family="Fredoka, sans-serif"
                   font-size="13" font-weight="700" fill="#6b5b95">${label}</text>` : ""}
    </svg>`;
    return wrap;
  });

  // ---- coinSet (row of coins/bills for money work) ----
  register("coinSet", function ({ coins = [], label = null }) {
    // coins: ["quarter", "dime", "nickel", "penny", "1", "5"]
    const glyph = {
      quarter: { emoji: "🪙", text: "25¢", fill: "#d4a373" },
      dime:    { emoji: "🪙", text: "10¢", fill: "#c4b5fd" },
      nickel:  { emoji: "🪙", text: " 5¢", fill: "#9a8bbf" },
      penny:   { emoji: "🪙", text: " 1¢", fill: "#ff7a93" },
      "1":     { emoji: "💵", text: "$1", fill: "#6ee7b7" },
      "5":     { emoji: "💵", text: "$5", fill: "#a78bfa" },
      "10":    { emoji: "💵", text: "$10", fill: "#7dd3fc" },
    };
    const items = coins.map((k) => {
      const g = glyph[k] || glyph.penny;
      const isBill = k === "1" || k === "5" || k === "10";
      const cls = "teach-coin" + (isBill ? " teach-coin-bill" : "");
      const node = h("div", { class: cls, style: `--coin-fill:${g.fill};` });
      node.innerHTML = `<span class="teach-coin-emoji">${g.emoji}</span>
                       <span class="teach-coin-text">${g.text}</span>`;
      return node;
    });
    const children = [h("div", { class: "teach-coin-row" }, items)];
    if (label) children.push(h("div", { class: "teach-eg-label" }, label));
    return h("div", { class: "teach-viz teach-coinset" }, children);
  });

  // ---- capacityJug (liquid fill visualization) ----
  register("capacityJug", function ({ capacity = 1, fill = 0.5, unit = "L", label = null }) {
    const w = 120, h_ = 180, pad = 14;
    const fillPct = Math.max(0, Math.min(1, fill));
    const fillH = (h_ - pad * 2) * fillPct;
    const fillY = h_ - pad - fillH;
    const wrap = h("div", { class: "teach-viz teach-jug" });
    wrap.innerHTML = `<svg viewBox="0 0 ${w + 60} ${h_ + 30}" role="img" aria-label="Jug filled ${Math.round(fillPct*100)} percent">
      <rect x="${pad}" y="${pad}" width="${w - pad*2}" height="${h_ - pad*2}"
            rx="10" fill="#fff" stroke="#6b5b95" stroke-width="3"/>
      <rect x="${pad + 2}" y="${fillY}" width="${w - pad*2 - 4}" height="${fillH}"
            rx="6" fill="#7dd3fc" opacity="0.75"/>
      <line x1="${w - pad}" y1="${pad}" x2="${w + 10}" y2="${pad}" stroke="#6b5b95" stroke-width="2"/>
      <text x="${w + 14}" y="${pad + 4}" font-family="Fredoka, sans-serif" font-size="13" font-weight="800" fill="#6b5b95">${capacity} ${unit}</text>
      <line x1="${w - pad}" y1="${h_ - pad}" x2="${w + 10}" y2="${h_ - pad}" stroke="#6b5b95" stroke-width="2"/>
      <text x="${w + 14}" y="${h_ - pad + 4}" font-family="Fredoka, sans-serif" font-size="13" font-weight="800" fill="#6b5b95">0</text>
      ${label ? `<text x="${(w+60)/2}" y="${h_ + 22}" text-anchor="middle" font-family="Fredoka, sans-serif"
                   font-size="13" font-weight="700" fill="#6b5b95">${label}</text>` : ""}
    </svg>`;
    return wrap;
  });

  // ---- capacityJugPair (two jugs side-by-side for comparison) ------------
  // Used when a lesson asks the kid to compare two jugs' contents. The
  // existing single-jug viz only renders ONE, forcing comparison practice
  // to ask the kid to "imagine the other jug" — the same anti-pattern we
  // flagged in fraction comparison. This primitive renders both jugs at the
  // same physical scale (same pixel height = same logical max) so the kid
  // can match fill levels by eye.
  //
  // Params:
  //   left, right: { capacity, fill, unit, label }
  //   maxCapacity: optional shared y-axis max (defaults to max of left/right
  //                capacities so both jugs scale to the same physical height)
  //   label:       caption below both jugs
  register("capacityJugPair", function ({
    left = { capacity: 1, fill: 0.5, unit: "L", label: "" },
    right = { capacity: 1, fill: 0.5, unit: "L", label: "" },
    maxCapacity = null,
    label = null,
  }) {
    const w = 110, h_ = 180, pad = 14;
    const maxCap = maxCapacity != null
      ? maxCapacity
      : Math.max(left.capacity || 1, right.capacity || 1);
    function jugSvg(spec, xOffset) {
      const cap = spec.capacity || 1;
      const fillPct = Math.max(0, Math.min(1, spec.fill || 0));
      // Scale this jug's drawn height proportionally to maxCap so the two
      // jugs share a y-axis. A 1-L jug next to a 2-L jug renders at half
      // the height — visually correct for the comparison.
      const drawnH = (h_ - pad * 2) * (cap / maxCap);
      const drawnTop = pad + (h_ - pad * 2 - drawnH);
      const fillH = drawnH * fillPct;
      const fillY = drawnTop + (drawnH - fillH);
      const innerX = pad + 2 + xOffset;
      return `
        <rect x="${pad + xOffset}" y="${drawnTop}" width="${w - pad*2}" height="${drawnH}"
              rx="10" fill="#fff" stroke="#6b5b95" stroke-width="3"/>
        <rect x="${innerX}" y="${fillY}" width="${w - pad*2 - 4}" height="${fillH}"
              rx="6" fill="#7dd3fc" opacity="0.75"/>
        <line x1="${w - pad + xOffset}" y1="${drawnTop}" x2="${w - 2 + xOffset}" y2="${drawnTop}" stroke="#6b5b95" stroke-width="2"/>
        <text x="${w + 2 + xOffset}" y="${drawnTop + 4}" font-family="Fredoka, sans-serif" font-size="12" font-weight="800" fill="#6b5b95">${cap} ${spec.unit || "L"}</text>
        ${spec.label ? `<text x="${pad + xOffset + (w - pad*2)/2}" y="${h_ + 18}" text-anchor="middle"
                          font-family="Fredoka, sans-serif" font-size="13" font-weight="800"
                          fill="#3a2e5f">${spec.label}</text>` : ""}
      `;
    }
    const totalW = w * 2 + 80;
    const totalH = h_ + (left.label || right.label ? 28 : 0) + (label ? 24 : 0);
    const wrap = h("div", { class: "teach-viz teach-jug teach-jug-pair" });
    wrap.innerHTML = `<svg viewBox="0 0 ${totalW} ${totalH}" role="img"
        aria-label="Compare two jugs">
      ${jugSvg(left, 0)}
      ${jugSvg(right, w + 60)}
      ${label ? `<text x="${totalW/2}" y="${totalH - 4}" text-anchor="middle"
                   font-family="Fredoka, sans-serif" font-size="13" font-weight="700"
                   fill="#6b5b95">${label}</text>` : ""}
    </svg>`;
    return wrap;
  });

  // ---- linePlot (static display: numeric scale with stacked X marks) ----
  // Used in teaching ops to show an example line plot.
  //   { type: "linePlot", params: { min: 1, max: 8, step: 1, unit: "in",
  //     marks: [3, 5, 5, 6, 3, 4, 5, 7], label: "Pencil lengths" } }
  register("linePlot", function ({ min = 1, max = 8, step = 1, marks = [], unit = "", label = null, highlight = null }) {
    const ticks = [];
    for (let v = min; v <= max; v += step) ticks.push(v);
    const pad = 36;
    const colW = 42;
    const width = pad * 2 + ticks.length * colW;
    const rowH = 18;
    const counts = {};
    marks.forEach((m) => { counts[m] = (counts[m] || 0) + 1; });
    const maxStack = Math.max(3, ...Object.values(counts), 0);
    const stackH = maxStack * rowH + 12;
    const railY = stackH + 8;
    const height = railY + 56;

    // X marks pop in one at a time so the kid sees data being "plotted" — each
    // measurement is a separate event. Global order is left-to-right by value,
    // then bottom-to-top within a stack (matches how you'd add Xs by hand).
    let xIdx = 0;
    const colParts = ticks.map((v, i) => {
      const x = pad + i * colW + colW / 2;
      const n = counts[v] || 0;
      const xs = [];
      for (let k = 0; k < n; k++) {
        const y = railY - 12 - k * rowH;
        const delay = 200 + xIdx++ * 80;
        xs.push(`<text class="lp-mark" style="animation-delay:${delay}ms" x="${x}" y="${y}" text-anchor="middle" font-family="Fredoka, sans-serif"
                   font-size="18" font-weight="900" fill="#ff7a93">✕</text>`);
      }
      const lit = highlight != null && Number(highlight) === Number(v);
      const tickStroke = lit ? "#ff7a93" : "#6b5b95";
      const labelFill  = lit ? "#ff7a93" : "#6b5b95";
      const band = lit ? `<rect x="${x - colW/2 + 4}" y="4" width="${colW - 8}" height="${railY - 4}"
                          fill="#fff4d6" rx="6"/>` : "";
      return `${band}
        ${xs.join("")}
        <line x1="${x}" y1="${railY - 6}" x2="${x}" y2="${railY + 6}" stroke="${tickStroke}" stroke-width="${lit ? 3 : 2}"/>
        <text x="${x}" y="${railY + 22}" text-anchor="middle" font-family="Fredoka, sans-serif"
              font-size="14" font-weight="800" fill="${labelFill}">${v}</text>`;
    }).join("");

    const wrap = h("div", { class: "teach-viz teach-lineplot" });
    wrap.innerHTML = `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Line plot">
      <line x1="${pad - 6}" y1="${railY}" x2="${width - pad + 6}" y2="${railY}"
            stroke="#6b5b95" stroke-width="2.5"/>
      ${colParts}
      ${unit ? `<text x="${width / 2}" y="${railY + 42}" text-anchor="middle"
                   font-family="Fredoka, sans-serif" font-size="13" font-weight="700"
                   fill="#6b5b95">${unit}</text>` : ""}
      ${label ? `<text x="${width / 2}" y="${height - 4}" text-anchor="middle"
                   font-family="Fredoka, sans-serif" font-size="13" font-weight="800"
                   fill="#6b5b95">${label}</text>` : ""}
    </svg>`;
    return wrap;
  });

  // ---- quadShape (labeled quadrilateral preview, used in geometry teach) ----
  //   { type: "quadShape", params: { kind: "square" | "rectangle" | "rhombus"
  //       | "parallelogram" | "trapezoid" | "kite" | "quad",
  //     label: "Square", highlight: "sides" | "angles" | null } }
  register("quadShape", function ({ kind = "square", label = null, highlight = null }) {
    const w = 200, hh = 140, cx = w / 2, cy = hh / 2 + 4;
    let poly = "";
    if (kind === "square") {
      const s = 90;
      poly = `${cx - s/2},${cy - s/2} ${cx + s/2},${cy - s/2} ${cx + s/2},${cy + s/2} ${cx - s/2},${cy + s/2}`;
    } else if (kind === "rectangle") {
      const ww = 120, hs = 64;
      poly = `${cx - ww/2},${cy - hs/2} ${cx + ww/2},${cy - hs/2} ${cx + ww/2},${cy + hs/2} ${cx - ww/2},${cy + hs/2}`;
    } else if (kind === "rhombus") {
      const s = 52;
      poly = `${cx},${cy - s} ${cx + s},${cy} ${cx},${cy + s} ${cx - s},${cy}`;
    } else if (kind === "parallelogram") {
      poly = `${cx - 70},${cy + 32} ${cx - 30},${cy - 32} ${cx + 70},${cy - 32} ${cx + 30},${cy + 32}`;
    } else if (kind === "trapezoid") {
      poly = `${cx - 72},${cy + 34} ${cx - 40},${cy - 34} ${cx + 40},${cy - 34} ${cx + 72},${cy + 34}`;
    } else if (kind === "kite") {
      poly = `${cx},${cy - 50} ${cx + 42},${cy - 4} ${cx},${cy + 60} ${cx - 42},${cy - 4}`;
    } else {
      poly = `${cx - 60},${cy + 34} ${cx - 34},${cy - 40} ${cx + 56},${cy - 30} ${cx + 40},${cy + 38}`;
    }
    const stroke = highlight === "sides" ? "#ff7a93" : "#6b5b95";
    const sw = highlight === "sides" ? 4 : 3;
    const dots = highlight === "angles"
      ? poly.split(" ").map((pt) => {
          const [px, py] = pt.split(",");
          return `<circle cx="${px}" cy="${py}" r="8" fill="#ffd93d" stroke="#6b5b95" stroke-width="2"/>`;
        }).join("")
      : "";
    const wrap = h("div", { class: "teach-viz teach-quadshape" });
    wrap.innerHTML = `<svg viewBox="0 0 ${w} ${hh + 22}" role="img" aria-label="${label || kind}">
      <polygon points="${poly}" fill="#fff" stroke="${stroke}" stroke-width="${sw}" stroke-linejoin="round"/>
      ${dots}
      ${label ? `<text x="${cx}" y="${hh + 16}" text-anchor="middle"
                   font-family="Fredoka, sans-serif" font-size="14" font-weight="800"
                   fill="#6b5b95">${label}</text>` : ""}
    </svg>`;
    return wrap;
  });

  // ---- unitScale (two-pan "unit size" comparison, used in measurement teach) ----
  //   { type: "unitScale", params: {
  //       unitA: { label: "kg", size: 90, count: 1 },
  //       unitB: { label: "g",  size: 10, count: 1000 },
  //       caption: "1 kg = 1000 g" } }
  register("unitScale", function ({ unitA = { label: "big", size: 80, count: 1 },
                                     unitB = { label: "small", size: 10, count: 10 },
                                     caption = "", note = null }) {
    const w = 440, hh = 160;
    const paneX1 = 30, paneX2 = 240;
    const paneY = 20, paneW = 170, paneH = 100;
    const block = (x, y, s, c, fill) => `<rect x="${x}" y="${y}" width="${s}" height="${s}" rx="4"
      fill="${fill}" stroke="#6b5b95" stroke-width="1.5"/>`;
    const drawStack = (pane, unit, fill) => {
      const bx = pane === "a" ? paneX1 : paneX2;
      const items = [];
      const s = Math.min(unit.size, 48);
      const maxPerRow = Math.floor(paneW / (s + 3));
      for (let i = 0; i < Math.min(unit.count, 24); i++) {
        const col = i % maxPerRow;
        const row = Math.floor(i / maxPerRow);
        const x = bx + 10 + col * (s + 3);
        const y = paneY + paneH - 14 - (row + 1) * (s + 3);
        items.push(block(x, y, s, i, fill));
      }
      return items.join("");
    };
    const wrap = h("div", { class: "teach-viz teach-unitscale" });
    wrap.innerHTML = `<svg viewBox="0 0 ${w} ${hh}" role="img" aria-label="Unit comparison">
      <rect x="${paneX1}" y="${paneY}" width="${paneW}" height="${paneH}" rx="10" fill="#fff4d6" stroke="#6b5b95" stroke-width="2"/>
      <rect x="${paneX2}" y="${paneY}" width="${paneW}" height="${paneH}" rx="10" fill="#ffe5ec" stroke="#6b5b95" stroke-width="2"/>
      ${drawStack("a", unitA, "#a78bfa")}
      ${drawStack("b", unitB, "#ff7a93")}
      <text x="${paneX1 + paneW / 2}" y="${paneY + paneH + 20}" text-anchor="middle"
            font-family="Fredoka, sans-serif" font-size="13" font-weight="800"
            fill="#6b5b95">${unitA.count} ${unitA.label}</text>
      <text x="${paneX2 + paneW / 2}" y="${paneY + paneH + 20}" text-anchor="middle"
            font-family="Fredoka, sans-serif" font-size="13" font-weight="800"
            fill="#6b5b95">${unitB.count} ${unitB.label}</text>
      <text x="${w / 2}" y="${paneY + paneH + 40}" text-anchor="middle"
            font-family="Fredoka, sans-serif" font-size="15" font-weight="800"
            fill="#ff7a93">${caption || ""}</text>
      ${note ? `<text x="${w / 2}" y="${paneY + paneH + 56}" text-anchor="middle"
                   font-family="Nunito, sans-serif" font-size="12"
                   fill="#6b5b95">${note}</text>` : ""}
    </svg>`;
    return wrap;
  });

  // ---- storyProblem (a little panel with an emoji + story text + operation chips) ----
  register("storyProblem", function ({ scene = "🐿️", story = "", chips = [], highlight = null, label = null }) {
    const chipNodes = chips.map((c) => h("span", {
      class: "teach-op-chip" + (c === highlight ? " lit" : "")
    }, c));
    // Mirror + grow the raccoon when it's the scene mascot — see
    // .mr-raccoon in components.css. Other animal scenes render normally.
    const sceneCls = "teach-story-emoji" + (scene === "🦝" ? " mr-raccoon" : "");
    const bubble = h("div", { class: "teach-story-panel" }, [
      h("span", { class: sceneCls }, scene),
      h("p", { class: "teach-story-text" }, story),
      chipNodes.length ? h("div", { class: "teach-story-chips" }, chipNodes) : null,
    ]);
    const children = [bubble];
    if (label) children.push(h("div", { class: "teach-eg-label" }, label));
    return h("div", { class: "teach-viz teach-storyproblem" }, children);
  });

  // =====================================================================
  // INTERACTIVE VIZ TYPES
  // ---------------------------------------------------------------------
  // These vizes let the kid DRIVE the manipulation. The static counterpart
  // displays a finished representation; the interactive version requires
  // the kid to do the action that builds it. Pedagogy from the PhD review:
  //
  //   1. Concrete-Pictorial-Abstract: kid physically partitions/builds
  //   2. Kinesthetic engagement: tap/drag → immediate visual feedback
  //   3. Working memory offload: the viz holds intermediate state
  //   4. Autism-spectrum fit: predictable tap targets, color-coded regions,
  //      consistent color language across the app (IN-blue, OUT-mint,
  //      RULE-yellow, UNKNOWN-coral)
  //   5. The viz IS the insight: doing the action delivers the lesson
  //
  // All five accept an optional `targetValue` param. When set, the readout
  // shows a "Target: X" hint and the viz pulses green when the kid hits
  // the target. Without it, the viz acts as a free-play exploration tool.
  // =====================================================================

  // ---- interactiveFractionBar -----------------------------------------
  // Tap segments to shade. Live readout shows the resulting fraction.
  // Use when the lesson asks the kid to BUILD a fraction (shade 3/4) or
  // to COMPARE (drag two bars side by side).
  register("interactiveFractionBar", function ({
    denominator = 4, startNumer = 0, targetNumer = null, label = null,
    color = "#ff7a93",
  }) {
    const denom = Math.max(1, Math.min(20, denominator | 0));
    const wrap = h("div", { class: "teach-viz teach-ifb" });
    let numer = Math.max(0, Math.min(denom, startNumer | 0));
    function render() {
      const segs = [];
      for (let i = 0; i < denom; i++) {
        const shaded = i < numer;
        segs.push(
          `<div class="ifb-seg ${shaded ? 'ifb-shaded' : ''}"
                data-i="${i}"
                role="button" tabindex="0"
                aria-label="Segment ${i + 1} of ${denom}, ${shaded ? 'shaded' : 'empty'}"
                style="--ifb-color:${color}"></div>`
        );
      }
      const hit = (targetNumer != null && numer === targetNumer);
      const status = (targetNumer != null)
        ? `<div class="ifb-status ${hit ? 'ifb-hit' : ''}">
             ${hit ? "✓ Got it!" : `Target: ${targetNumer}/${denom}`}
           </div>`
        : "";
      wrap.innerHTML = `
        <div class="ifb-bar">${segs.join("")}</div>
        <div class="ifb-readout">Shaded: <strong>${numer}/${denom}</strong></div>
        ${status}
        ${label ? `<div class="ifb-label">${label}</div>` : ""}
      `;
      wrap.querySelectorAll(".ifb-seg").forEach((s) => {
        const i = parseInt(s.getAttribute("data-i"), 10);
        const flip = () => {
          // Toggle "fill up to here": tap segment i sets numer to i+1 if
          // that segment was previously empty, else to i (un-shade).
          if (i + 1 <= numer) { numer = i; } else { numer = i + 1; }
          render();
        };
        s.addEventListener("click", flip);
        s.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") { e.preventDefault(); flip(); }
        });
      });
    }
    render();
    return wrap;
  });

  // ---- interactiveNumberLine ------------------------------------------
  // Tap on the line to place the marker. Snap to whole-number ticks (or
  // to `step` if provided). Readout shows the chosen value; optional
  // `targetValue` validates the kid's selection.
  register("interactiveNumberLine", function ({
    min = 0, max = 10, step = 1, startAt = null, targetValue = null,
    showZones = false, label = null,
  }) {
    const range = max - min;
    const wrap = h("div", { class: "teach-viz teach-inl" });
    let at = (startAt != null) ? startAt : null;
    function render() {
      const W = 480, H = 90, pad = 30;
      const ticks = [];
      for (let v = min; v <= max; v += step) {
        const x = pad + ((v - min) / range) * (W - 2 * pad);
        ticks.push(`<line x1="${x}" y1="35" x2="${x}" y2="50" stroke="#6b5b95" stroke-width="1.5"/>`);
        ticks.push(`<text x="${x}" y="68" text-anchor="middle" font-family="Fredoka, sans-serif" font-size="12" font-weight="700" fill="#6b5b95">${v}</text>`);
      }
      let markerSvg = "";
      let markerLabel = "Tap the line to place the marker.";
      if (at != null) {
        const x = pad + ((at - min) / range) * (W - 2 * pad);
        markerSvg = `<g transform="translate(${x} 35)">
          <circle r="11" fill="#ff7a93" stroke="#6b5b95" stroke-width="2"/>
          <circle r="4" cx="-2" cy="-2" fill="#fff" opacity="0.5"/>
        </g>`;
        markerLabel = `You picked: <strong>${at}</strong>`;
      }
      // Optional rounding zones: split the line at the halfway between
      // multiples of `step×10` (e.g., for round-to-nearest-10).
      let zones = "";
      if (showZones && range >= step * 5) {
        // For now: simply render an IN-blue lower half and OUT-mint upper half
        // around the midpoint. Concrete enough without bespoke "rounding"
        // logic that would diverge from generic use.
        const midX = pad + 0.5 * (W - 2 * pad);
        zones = `
          <rect x="${pad}" y="32" width="${midX - pad}" height="6" fill="#7dd3fc" opacity="0.35"/>
          <rect x="${midX}" y="32" width="${W - pad - midX}" height="6" fill="#6ee7b7" opacity="0.35"/>
        `;
      }
      const hit = (targetValue != null && at === targetValue);
      const status = (targetValue != null)
        ? `<div class="inl-status ${hit ? 'inl-hit' : ''}">
             ${hit ? "✓ Yes!" : `Target: ${targetValue}`}
           </div>`
        : "";
      wrap.innerHTML = `
        <svg class="inl-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Number line from ${min} to ${max}">
          ${zones}
          <line x1="${pad}" y1="35" x2="${W - pad}" y2="35" stroke="#3a2e5f" stroke-width="2.5"/>
          ${ticks.join("")}
          ${markerSvg}
          <rect class="inl-hit" x="0" y="0" width="${W}" height="${H}" fill="transparent" style="cursor: pointer"/>
        </svg>
        <div class="inl-readout">${markerLabel}</div>
        ${status}
        ${label ? `<div class="inl-label">${label}</div>` : ""}
      `;
      const svg = wrap.querySelector(".inl-svg");
      const hit_ = wrap.querySelector(".inl-hit");
      hit_.addEventListener("click", (e) => {
        const rect = svg.getBoundingClientRect();
        const ratio = (e.clientX - rect.left) / rect.width;
        const value = min + ratio * range;
        // Snap to nearest step
        const snapped = min + Math.round((value - min) / step) * step;
        at = Math.max(min, Math.min(max, snapped));
        render();
      });
    }
    render();
    return wrap;
  });

  // ---- interactiveClock -----------------------------------------------
  // Drag the minute hand around the dial; the hour hand interpolates.
  // Digital readout shows the current time. Snap to 5-min increments.
  register("interactiveClock", function ({
    startHour = 12, startMinute = 0, targetHour = null, targetMinute = null,
    label = null,
  }) {
    const wrap = h("div", { class: "teach-viz teach-iclock" });
    let H = startHour, M = startMinute;
    function render() {
      const cx = 90, cy = 90, r = 76;
      const hourDeg = ((H % 12) * 30) + (M / 60) * 30;
      const minDeg = M * 6;
      const hourLen = 38, minLen = 60;
      const hx = cx + hourLen * Math.sin(hourDeg * Math.PI / 180);
      const hy = cy - hourLen * Math.cos(hourDeg * Math.PI / 180);
      const mx = cx + minLen * Math.sin(minDeg * Math.PI / 180);
      const my = cy - minLen * Math.cos(minDeg * Math.PI / 180);
      // Hour numbers
      const nums = [];
      for (let n = 1; n <= 12; n++) {
        const a = n * 30 * Math.PI / 180;
        const nx = cx + (r - 14) * Math.sin(a);
        const ny = cy - (r - 14) * Math.cos(a) + 5;
        nums.push(`<text x="${nx}" y="${ny}" text-anchor="middle" font-family="Fredoka, sans-serif" font-size="14" font-weight="800" fill="#6b5b95">${n}</text>`);
      }
      const padded = String(M).padStart(2, "0");
      const targetHit = (targetHour != null && targetMinute != null &&
                        H === targetHour && M === targetMinute);
      const status = (targetHour != null)
        ? `<div class="iclk-status ${targetHit ? 'iclk-hit' : ''}">
             ${targetHit ? "✓ Got it!" : `Target: ${targetHour}:${String(targetMinute || 0).padStart(2, "0")}`}
           </div>`
        : "";
      wrap.innerHTML = `
        <svg class="iclk-svg" viewBox="0 0 180 180" role="img" aria-label="Clock at ${H}:${padded}">
          <circle cx="${cx}" cy="${cy}" r="${r}" fill="#fff8ed" stroke="#6b5b95" stroke-width="3"/>
          ${nums.join("")}
          <line x1="${cx}" y1="${cy}" x2="${hx.toFixed(2)}" y2="${hy.toFixed(2)}" stroke="#3a2e5f" stroke-width="5" stroke-linecap="round"/>
          <line x1="${cx}" y1="${cy}" x2="${mx.toFixed(2)}" y2="${my.toFixed(2)}" stroke="#a78bfa" stroke-width="3.5" stroke-linecap="round"/>
          <circle cx="${cx}" cy="${cy}" r="3" fill="#3a2e5f"/>
          <rect class="iclk-hit" x="0" y="0" width="180" height="180" fill="transparent" style="cursor: pointer"/>
        </svg>
        <div class="iclk-digital">${H}:${padded}</div>
        ${status}
        ${label ? `<div class="iclk-label">${label}</div>` : ""}
      `;
      const svg = wrap.querySelector(".iclk-svg");
      const hit_ = wrap.querySelector(".iclk-hit");
      function setFromXY(e) {
        const rect = svg.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width * 180 - cx;
        const y = (e.clientY - rect.top) / rect.height * 180 - cy;
        // Compute angle from center, where 0deg = 12 o'clock (north).
        let a = Math.atan2(x, -y) * 180 / Math.PI;
        if (a < 0) a += 360;
        // Snap to 5-min ticks (= 30deg each, since 60/5 = 12 ticks)
        const minute = Math.round(a / 6) % 60;
        M = minute;
        render();
      }
      hit_.addEventListener("click", setFromXY);
      // For drag: track pointer move within the SVG bounds
      let dragging = false;
      hit_.addEventListener("pointerdown", (e) => { dragging = true; setFromXY(e); hit_.setPointerCapture(e.pointerId); });
      hit_.addEventListener("pointermove", (e) => { if (dragging) setFromXY(e); });
      hit_.addEventListener("pointerup",   (e) => { dragging = false; hit_.releasePointerCapture(e.pointerId); });
    }
    render();
    return wrap;
  });

  // ---- interactiveAreaGrid (tap-to-fill) ------------------------------
  // Start with an empty rows×cols grid. Kid taps tiles to fill them.
  // Counter updates live. Use for "what's the area?" by filling all,
  // or "fill 6 tiles" with a target.
  register("interactiveAreaGrid", function ({
    rows = 3, cols = 4, targetCount = null, label = null,
  }) {
    const wrap = h("div", { class: "teach-viz teach-iag" });
    const total = rows * cols;
    const filled = new Set();
    function render() {
      const cell = 36;
      const W = cols * cell + 4;
      const H = rows * cell + 4;
      const tiles = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c;
          const x = c * cell + 2, y = r * cell + 2;
          const isFilled = filled.has(idx);
          tiles.push(`<rect class="iag-tile ${isFilled ? 'iag-filled' : ''}"
            data-idx="${idx}"
            x="${x}" y="${y}" width="${cell - 2}" height="${cell - 2}"
            fill="${isFilled ? '#ffd93d' : '#fff'}" stroke="#6b5b95" stroke-width="1.5"
            style="cursor: pointer" tabindex="0"/>`);
        }
      }
      const count = filled.size;
      const hit = (targetCount != null && count === targetCount);
      const status = (targetCount != null)
        ? `<div class="iag-status ${hit ? 'iag-hit' : ''}">
             ${hit ? "✓ Got it!" : `Target: ${targetCount} tiles`}
           </div>`
        : "";
      wrap.innerHTML = `
        <svg class="iag-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="${rows} by ${cols} grid">
          ${tiles.join("")}
        </svg>
        <div class="iag-readout">Filled: <strong>${count}</strong> of ${total}</div>
        ${status}
        ${label ? `<div class="iag-label">${label}</div>` : ""}
      `;
      wrap.querySelectorAll(".iag-tile").forEach((t) => {
        t.addEventListener("click", () => {
          const i = parseInt(t.getAttribute("data-idx"), 10);
          if (filled.has(i)) filled.delete(i); else filled.add(i);
          render();
        });
      });
    }
    render();
    return wrap;
  });

  // ---- interactiveCoinPile --------------------------------------------
  // A "coin bank" of denominations. Kid taps a coin to add to their
  // "pile" (which appears below). Running total updates. Tap a piled
  // coin to remove it.
  register("interactiveCoinPile", function ({
    targetCents = null, bank = ["quarter", "dime", "nickel", "penny"],
    label = null,
  }) {
    const VALUE = { quarter: 25, dime: 10, nickel: 5, penny: 1 };
    const COLOR = { quarter: "#d4a373", dime: "#c4b5fd", nickel: "#9a8bbf", penny: "#ff7a93" };
    const wrap = h("div", { class: "teach-viz teach-icp" });
    const pile = [];
    function render() {
      const bankChips = bank.map((k) =>
        `<button class="icp-bank-coin" data-coin="${k}" style="background:${COLOR[k]}; color: #fff">
           ${VALUE[k]}¢
         </button>`).join("");
      const pileChips = pile.length
        ? pile.map((k, i) =>
            `<button class="icp-pile-coin" data-i="${i}" style="background:${COLOR[k]}; color: #fff" title="Tap to remove">
               ${VALUE[k]}¢
             </button>`).join("")
        : `<span class="icp-empty">Tap a coin above to add it to your pile.</span>`;
      const total = pile.reduce((s, k) => s + VALUE[k], 0);
      const hit = (targetCents != null && total === targetCents);
      const status = (targetCents != null)
        ? `<div class="icp-status ${hit ? 'icp-hit' : ''}">
             ${hit ? "✓ Got it!" : `Target: ${targetCents}¢`}
           </div>`
        : "";
      wrap.innerHTML = `
        <div class="icp-bank">${bankChips}</div>
        <div class="icp-pile">${pileChips}</div>
        <div class="icp-readout">Total: <strong>${total}¢</strong></div>
        ${status}
        ${label ? `<div class="icp-label">${label}</div>` : ""}
      `;
      wrap.querySelectorAll(".icp-bank-coin").forEach((b) => {
        b.addEventListener("click", () => {
          pile.push(b.getAttribute("data-coin"));
          render();
        });
      });
      wrap.querySelectorAll(".icp-pile-coin").forEach((p) => {
        p.addEventListener("click", () => {
          const i = parseInt(p.getAttribute("data-i"), 10);
          pile.splice(i, 1);
          render();
        });
      });
    }
    render();
    return wrap;
  });
})();
