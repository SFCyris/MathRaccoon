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
    const { min = 0, max = 10, at = null, hops = [], visited = [], label = null, dir = "up" } = params;
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
    const hopArcs = hops.map((hopTo) => {
      const from = dir === "up" ? hopTo - hopStep : hopTo + hopStep;
      const fx = pad + (from - min) * step;
      const tx = pad + (hopTo - min) * step;
      const mx = (fx + tx) / 2;
      return `<path d="M${fx} 44 Q ${mx} 4 ${tx} 44" stroke="#ff7a93" stroke-width="2.5"
               fill="none" stroke-dasharray="4 4" stroke-linecap="round"/>
             <polygon points="${tx - 4},44 ${tx + 4},44 ${tx},52" fill="#ff7a93"/>`;
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
  register("fractionBar", function (params = {}) {
    const { denom = 4, color = "#ff7a93", label = null } = params;
    const num = params.num != null ? params.num
              : params.numer != null ? params.numer
              : 1;
    const width = 360, height = 60, pad = 2;
    const segW = (width - pad * 2) / denom;
    const segs = [];
    for (let i = 0; i < denom; i++) {
      segs.push(`<rect x="${pad + i * segW}" y="0" width="${segW}" height="${height}"
        fill="${i < num ? color : "#fff"}" stroke="#6b5b95" stroke-width="1.5"/>`);
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
    return `<svg viewBox="0 0 180 ${label ? 200 : 180}" role="img" aria-label="Clock showing ${hour}:${String(minute).padStart(2,"0")}">
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="#fff8ed" stroke="#6b5b95" stroke-width="3"/>
      ${ticks.join("")}
      <line x1="${cx}" y1="${cy}" x2="${hx}" y2="${hy}" stroke="#3a2e5f" stroke-width="5" stroke-linecap="round"/>
      <line x1="${cx}" y1="${cy}" x2="${mx}" y2="${my}" stroke="${accent}" stroke-width="3.5" stroke-linecap="round"/>
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
    const width = 440, height = 180, pad = 28;
    const max = yMax || Math.max(...bars.map((b) => b.value || 0), 1);
    const colors = ["#a78bfa", "#ff7a93", "#6ee7b7", "#ffd93d", "#7dd3fc", "#ffb077"];
    const slotW = (width - pad * 2) / bars.length;
    const barW = Math.min(48, slotW * 0.65);
    const segs = bars.map((b, i) => {
      const h_ = Math.round((b.value / max) * (height - pad * 2));
      const x = pad + i * slotW + (slotW - barW) / 2;
      const y = height - pad - h_;
      const c = b.color || colors[i % colors.length];
      return `<g>
        <rect x="${x}" y="${y}" width="${barW}" height="${h_}" rx="6" fill="${c}" stroke="#6b5b95" stroke-width="1.5"/>
        <text x="${x + barW/2}" y="${y - 4}" text-anchor="middle" font-family="Fredoka, sans-serif"
              font-size="13" font-weight="800" fill="#6b5b95">${b.value}</text>
        <text x="${x + barW/2}" y="${height - pad + 16}" text-anchor="middle"
              font-family="Nunito, sans-serif" font-size="13" fill="#6b5b95">${b.label || ""}</text>
      </g>`;
    });
    const wrap = h("div", { class: "teach-viz teach-barchart" });
    wrap.innerHTML = `<svg viewBox="0 0 ${width} ${height + 20}" role="img" aria-label="Bar chart">
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
  register("tally", function ({ count = 5, label = null }) {
    const bundles = Math.floor(count / 5);
    const rem = count % 5;
    const items = [];
    for (let b = 0; b < bundles; b++) items.push(h("span", { class: "teach-tally-bundle" }, "卌"));
    if (rem > 0) items.push(h("span", { class: "teach-tally-bundle" }, "|".repeat(rem)));
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
  register("fractionNumline", function ({ denom = 4, markAt = null, labelEvery = true, label = null }) {
    const width = 500, pad = 34, y = 44;
    const step = (width - pad * 2) / denom;
    const ticks = [];
    for (let i = 0; i <= denom; i++) {
      const x = pad + i * step;
      const isEnd = i === 0 || i === denom;
      ticks.push(`<line x1="${x}" y1="${y - 8}" x2="${x}" y2="${y + 8}"
                   stroke="#6b5b95" stroke-width="${isEnd ? 3 : 2}"/>`);
      if (labelEvery || isEnd) {
        const txt = i === 0 ? "0" : i === denom ? "1" : `${i}/${denom}`;
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
    const wrap = h("div", { class: "teach-viz teach-numline" });
    wrap.innerHTML = `<svg viewBox="0 0 ${width} 72" role="img" aria-label="Fraction number line">
      <line x1="${pad}" y1="${y}" x2="${width - pad}" y2="${y}" stroke="#c4b5fd" stroke-width="2"/>
      ${ticks.join("")}
      ${marker}
      ${label ? `<text x="${width/2}" y="68" text-anchor="middle" font-family="Fredoka, sans-serif"
                   font-size="13" font-weight="700" fill="#6b5b95">${label}</text>` : ""}
    </svg>`;
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
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const idx = r * cols + c;
        const x = c * cell, y = r * cell;
        const fill = isFilled(idx) ? "#ffd93d" : "#fff";
        squares.push(`<rect x="${x}" y="${y}" width="${cell}" height="${cell}"
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

    const colParts = ticks.map((v, i) => {
      const x = pad + i * colW + colW / 2;
      const n = counts[v] || 0;
      const xs = [];
      for (let k = 0; k < n; k++) {
        const y = railY - 12 - k * rowH;
        xs.push(`<text x="${x}" y="${y}" text-anchor="middle" font-family="Fredoka, sans-serif"
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
})();
