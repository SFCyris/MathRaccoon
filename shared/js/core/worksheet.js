/*!
 * worksheet.js — generate printable parent/teacher worksheets for any
 * registered arcade game. Opens a new browser window with print-ready
 * HTML: header, N problems with blank answer lines, and a flippable
 * answer key at the bottom.
 *
 * Usage:
 *   MR.Worksheet.open("arc-fact-frenzy", { count: 12 });
 *
 * The builder picks questions from the game's pool (if any) and
 * formats each one into a paper-friendly row. Kinds that don't
 * translate perfectly to paper (e.g. bar-graph clicking) still get a
 * text prompt + answer — the parent fills it in on a separate sheet.
 */
(function () {
  function C()     { return window.MR && window.MR.Content; }
  function Pools() { return window.MR && window.MR.Pools; }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  function pickQuestions(game, count) {
    if (!game) return [];
    const cfg = game.engineConfig || {};
    const pools = Pools();
    if (cfg.poolId && pools && pools.has(cfg.poolId)) {
      return pools.sample(cfg.poolId, count);
    }
    // No pool → try the engine's generate() count times.
    const engine = window.MR.Engines && window.MR.Engines[game.engine];
    if (engine && typeof engine.generate === "function") {
      const out = [];
      for (let i = 0; i < count; i++) {
        try { out.push(engine.generate(cfg, i)); } catch (e) {}
      }
      return out;
    }
    return [];
  }

  // Render ONE question into a worksheet row. Returns {problem, answer}.
  function formatQuestion(q, index, game) {
    const cfg = game.engineConfig || {};
    const pools = Pools();
    const pool = (pools && cfg.poolId) ? pools.get(cfg.poolId) : null;
    const poolOp = (pool && pool.op) || cfg.op || null;
    // Arithmetic-engine pool items: { a, b, hint } with pool op
    if (q && q.a != null && q.b != null && !q.kind) {
      const op = q.op || poolOp || "+";
      let ans;
      if (op === "+") ans = q.a + q.b;
      else if (op === "-") ans = q.a - q.b;
      else if (op === "×" || op === "*") ans = q.a * q.b;
      else if (op === "÷" || op === "/") ans = q.a / q.b;
      else ans = "?";
      return {
        problem: `${q.a} ${op === "*" ? "×" : op === "/" ? "÷" : op} ${q.b} = ______`,
        answer:  String(ans),
      };
    }
    // Engine-generated arithmetic problem (post-generate): has .op, .a, .b, .answer
    if (q && q.op && q.a != null && q.b != null && q.answer != null) {
      return {
        problem: `${q.a} ${q.op} ${q.b} = ______`,
        answer:  String(q.answer),
      };
    }
    // dragDrop kinds
    if (q && q.kind) {
      switch (q.kind) {
        case "arrange": {
          const ans = Array.isArray(q.answer) ? q.answer.join(" ") : String(q.answer || "");
          const shown = (q.template || q.prompt || "").replace(/__/g, "______");
          return {
            problem: `${esc(q.prompt || "")}\n   ${esc(shown)}`,
            answer:  ans,
          };
        }
        case "categorize": {
          const lines = (q.tokens || []).map((t) => {
            const bucket = (q.buckets || []).find((b) => b.id === t.bucket);
            return `${t.text} → ${bucket ? bucket.label : t.bucket}`;
          });
          const promptWithTokens = `${q.prompt || ""}\n   Tokens: ${(q.tokens || []).map((t) => t.text).join(", ")}`;
          return {
            problem: promptWithTokens,
            answer:  lines.join(" · "),
          };
        }
        case "numberLine": {
          const markers = Array.isArray(q.markers) ? q.markers : [];
          const header = `${q.prompt || "Plot on the number line."} (scale ${q.scale && q.scale.min}–${q.scale && q.scale.max})`;
          if (markers.length) {
            const list = markers.map((m) => `${m.label || m.id}`).join(", ");
            return {
              problem: `${header}\n   Numbers: ${list}`,
              answer:  markers.map((m) => `${m.label || m.id} → ${m.target}`).join("  ·  "),
            };
          }
          return {
            problem: header,
            answer:  String(q.answer == null ? "?" : q.answer),
          };
        }
        case "linePlot": {
          const data = q.data || [];
          return {
            problem: `${q.prompt || "Plot these values."} Data: ${data.join(", ")}`,
            answer:  data.join(", "),
          };
        }
        case "partition": {
          return {
            problem: `${q.prompt || "Shade the fraction."} (cut ${q.cuts}, shade ${q.shade})`,
            answer:  `${q.shade}/${q.cuts}`,
          };
        }
        case "balance": {
          const tpl = (q.rightTemplate || "").split("__");
          const ans = q.answer || [];
          let filled = tpl[0] || "";
          for (let i = 0; i < ans.length; i++) filled += ans[i] + (tpl[i + 1] || "");
          return {
            problem: `${q.prompt || ""}  ${q.leftLabel || ""} = ${q.rightTemplate || ""}`.replace(/__/g, "____"),
            answer:  `${q.leftLabel || ""} = ${filled}`,
          };
        }
        case "digitTiles": {
          return {
            problem: `${q.prompt || ""} Digits to use: ${(q.bank || []).join(", ")}`,
            answer:  Array.isArray(q.answer) ? q.answer.join("") : String(q.answer || ""),
          };
        }
        case "ruler": {
          return {
            problem: `${q.prompt || "Measure."} Segment starts at ${q.segment && q.segment.start}.`,
            answer:  `${q.answer} ${(q.scale && q.scale.unit) || ""}`.trim(),
          };
        }
        case "shapeCompose": {
          return {
            problem: `${q.prompt || "Count the tiles."} (${q.rows} × ${q.cols})`,
            answer:  String(q.answer),
          };
        }
        case "barGraph": {
          const cats = q.categories || [];
          const ans = q.answer || {};
          return {
            problem: `${q.prompt || "Build the bar graph."} Categories: ${cats.join(", ")}`,
            answer:  cats.map((c) => `${c}=${ans[c] == null ? "?" : ans[c]}`).join("  "),
          };
        }
        default:
          return {
            problem: q.prompt || "(interactive question)",
            answer:  Array.isArray(q.answer) ? q.answer.join(", ") : String(q.answer || ""),
          };
      }
    }
    // Fallback: show prompt + answer fields if present.
    return {
      problem: q && (q.prompt || q.text) ? (q.prompt || q.text) : "(see arcade)",
      answer:  q && q.answer != null ? String(q.answer) : "",
    };
  }

  function buildHtml(game, questions, opts) {
    const title = game.title || "Math Raccoon Worksheet";
    const content = C();
    const mod   = content ? content.getModule(game.moduleId) : null;
    const subtitle = mod ? `${mod.title} · ${game.description || ""}` : (game.description || "");
    const today = new Date().toLocaleDateString();
    const rows = questions.map((q, i) => {
      const f = formatQuestion(q, i, game);
      return { idx: i + 1, problem: f.problem, answer: f.answer };
    });
    const problemsHtml = rows.map((r) => `
      <li class="ws-item">
        <div class="ws-num">${r.idx}.</div>
        <div class="ws-prompt">${esc(r.problem).replace(/\n/g, "<br>")}</div>
      </li>`).join("");
    const keyHtml = rows.map((r) =>
      `<li><span class="ws-k-num">${r.idx}.</span> ${esc(r.answer || "—")}</li>`
    ).join("");

    return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${esc(title)} — Worksheet</title>
<style>
  * { box-sizing: border-box; }
  body {
    font-family: "Poppins", "Quicksand", system-ui, sans-serif;
    color: #2b2144;
    margin: 0;
    padding: 28px 36px 60px;
    background: #fff;
  }
  header { border-bottom: 3px solid #ff7a93; padding-bottom: 12px; margin-bottom: 18px; }
  header h1 { margin: 0; font-size: 1.7rem; color: #ff7a93; letter-spacing: 0.02em; }
  header .subtitle { margin-top: 6px; font-size: 0.95rem; color: #6f6493; }
  header .meta {
    display: flex; gap: 18px; margin-top: 10px; font-size: 0.88rem; color: #6f6493;
  }
  header .meta .fillin { border-bottom: 1.5px solid #ccc; min-width: 140px; display: inline-block; }
  .ws-list {
    list-style: none; padding: 0; margin: 0;
    display: grid; grid-template-columns: 1fr 1fr; gap: 14px 28px;
  }
  .ws-item {
    display: flex; gap: 10px;
    padding: 14px 14px 34px;
    border: 1.5px dashed #e2d7ff;
    border-radius: 10px;
    page-break-inside: avoid;
  }
  .ws-num { font-weight: 800; color: #ff7a93; min-width: 22px; }
  .ws-prompt { flex: 1; font-size: 1.05rem; line-height: 1.4; }
  .toolbar {
    position: fixed; top: 18px; right: 22px;
    display: flex; gap: 10px; z-index: 100;
  }
  .toolbar button {
    background: #ff7a93; color: white; border: none;
    font: inherit; font-weight: 700;
    padding: 10px 18px; border-radius: 10px;
    cursor: pointer;
    box-shadow: 0 4px 14px -6px rgba(255, 122, 147, 0.6);
  }
  .toolbar button.ghost {
    background: white; color: #3a2e5f; border: 1.5px solid #ccc;
  }
  .answer-key {
    margin-top: 42px;
    padding-top: 14px;
    border-top: 2px dashed #ccc;
    page-break-before: always;
  }
  .answer-key h2 { color: #7c9cff; margin: 0 0 10px; font-size: 1.15rem; }
  .answer-key ol {
    list-style: none; padding: 0; margin: 0;
    display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px 28px;
    font-size: 0.95rem;
  }
  .answer-key .ws-k-num { font-weight: 800; color: #7c9cff; margin-right: 6px; }
  @media print {
    .toolbar { display: none; }
    body { padding: 18px 20px; }
    .ws-item { border-color: #ddd; }
  }
</style>
</head>
<body>
  <div class="toolbar">
    <button type="button" class="ghost" onclick="window.close()">← Close</button>
    <button type="button" onclick="window.print()">🖨 Print</button>
  </div>
  <header>
    <h1>${esc(title)}</h1>
    <div class="subtitle">${esc(subtitle)}</div>
    <div class="meta">
      <span>Name: <span class="fillin"></span></span>
      <span>Date: <span class="fillin">${esc(today)}</span></span>
      <span>Score: ______ / ${rows.length}</span>
    </div>
  </header>
  <ol class="ws-list">
    ${problemsHtml}
  </ol>
  <section class="answer-key">
    <h2>Answer Key (for parents)</h2>
    <ol>${keyHtml}</ol>
  </section>
</body>
</html>`;
  }

  function open(gameId, opts) {
    opts = opts || {};
    const content = C();
    const game = content ? content.getGame(gameId) : null;
    if (!game) { alert(`No game registered with id "${gameId}".`); return; }
    const count = Math.max(4, Math.min(40, opts.count || 12));
    const qs = pickQuestions(game, count);
    if (!qs.length) {
      alert(`No printable questions available for "${game.title}". (Try a different game.)`);
      return;
    }
    const html = buildHtml(game, qs, opts);
    const w = window.open("", "_blank", "noopener,noreferrer");
    if (!w) {
      alert("Pop-up was blocked. Please allow pop-ups for this site and try again.");
      return;
    }
    w.document.open();
    w.document.write(html);
    w.document.close();
  }

  window.MR = window.MR || {};
  window.MR.Worksheet = { open };
})();
