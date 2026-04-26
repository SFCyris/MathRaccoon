/*!
 * viz/readingViz.js — visual widgets for Reading Raccoon lessons.
 *
 * Registered types:
 *   wordBreak   — shows a word broken into morpheme parts, each color-labeled
 *   exampleList — a definition plus a list of worked examples
 *   richText    — escape hatch: renders an HTML string inside a soft card
 */
(function () {
  const { h, register } = window.MR.Viz;

  // ---- wordBreak ----
  //   params: {
  //     parts: [{ text: "un", role: "prefix" }, { text: "happy", role: "root" }],
  //     word: "unhappy",              // optional — shown above the parts
  //     gloss: "not happy"            // optional — shown below
  //   }
  register("wordBreak", function ({ parts = [], word = "", gloss = "" }) {
    const wrap = h("div", { class: "teach-viz reading-wordbreak" });
    if (word) wrap.appendChild(h("div", { class: "rwb-word" }, word));
    const row = h("div", { class: "rwb-parts" });
    parts.forEach((p, i) => {
      if (i > 0) row.appendChild(h("span", { class: "rwb-plus" }, "+"));
      const col = h("div", { class: `rwb-part rwb-${p.role || "part"}` }, [
        h("span", { class: "rwb-part-text" }, p.text),
        h("span", { class: "rwb-part-label" }, p.role || ""),
      ]);
      row.appendChild(col);
    });
    wrap.appendChild(row);
    if (gloss) {
      wrap.appendChild(h("div", { class: "rwb-gloss" }, [
        h("span", { class: "rwb-gloss-arrow" }, "→ "),
        h("span", {}, gloss),
      ]));
    }
    return wrap;
  });

  // ---- exampleList ----
  //   params: {
  //     definition: "A simile compares two things using 'like' or 'as'.",
  //     examples: [
  //       { text: "fast as a cheetah",     note: "very fast" },
  //       { text: "quiet like a mouse",    note: "very quiet" },
  //     ]
  //   }
  register("exampleList", function ({ definition = "", examples = [] }) {
    const wrap = h("div", { class: "teach-viz reading-example-list" });
    if (definition) {
      const def = h("div", { class: "rex-def" });
      def.innerHTML = `<strong>Definition:</strong> ${definition}`;
      wrap.appendChild(def);
    }
    if (examples.length) {
      wrap.appendChild(h("div", { class: "rex-label" }, "Examples"));
      const list = h("ul", { class: "rex-list" });
      examples.forEach((ex) => {
        const li = h("li", { class: "rex-item" });
        li.innerHTML = `<span class="rex-text">"${ex.text}"</span>${
          ex.note ? `<span class="rex-arrow">→</span><span class="rex-note">${ex.note}</span>` : ""
        }`;
        list.appendChild(li);
      });
      wrap.appendChild(list);
    }
    return wrap;
  });

  // ---- richText ----
  //   params: { html: "..." }
  register("richText", function ({ html = "" }) {
    const wrap = h("div", { class: "teach-viz reading-rich" });
    wrap.innerHTML = html;
    return wrap;
  });
})();
