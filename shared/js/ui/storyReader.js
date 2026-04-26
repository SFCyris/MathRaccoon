/*!
 * ui/storyReader.js — chapter narrative (intro / outro) with speaker-tagged lines.
 * Visual layout mirrors the v1 "Hidden Valley" narrative card: gradient
 * storybook panel with big emoji, CHAPTER N label, title, and body paragraphs.
 */
(function () {
  const { h } = window.MR.Viz;
  const T = (k, v) => window.MR.Strings.t(k, v);
  const S = window.MR.Storage;
  const A = window.MR.Audio;

  function interpolate(text, vars) {
    if (!vars) return text;
    return text.replace(/\{(\w+)\}/g, (_, k) => (vars[k] != null ? vars[k] : `{${k}}`));
  }

  function cleanTitle(title) {
    if (!title) return "";
    return String(title).replace(/^Ch\.\s*\d+\s*[—\-:]\s*/i, "").trim();
  }

  function render({ chapter, lines, mount, onDone, isOutro }) {
    const name = S.getSettings().playerName || "friend";
    const vars = { NAME: name, name };

    const emoji = (isOutro ? "🌟" : (chapter && chapter.emoji)) || (isOutro ? "🌟" : "📖");
    const chapterLabel = chapter && chapter.order != null
      ? (isOutro ? `Chapter ${chapter.order} complete!` : `Chapter ${chapter.order}`)
      : (isOutro ? "Chapter complete!" : "Chapter");
    const title = cleanTitle(chapter && chapter.title);

    const body = (lines || []).map((ln) => {
      const speaker = (ln.speaker || "narrator").toLowerCase();
      const text = interpolate(ln.text || "", vars);
      if (ln.audio) A.playLine({ audio: ln.audio });
      if (speaker === "narrator") {
        return h("p", { class: "narrative-body narrator" }, text);
      }
      return h("p", { class: `narrative-body speaker speaker-${speaker}` }, [
        h("span", { class: "speaker-chip" }, speaker.replace(/-/g, " ")),
        h("span", { class: "speaker-text" }, text),
      ]);
    });

    const btn = h("button", { class: "btn btn-primary", onclick: onDone },
      isOutro ? T("narrative.outro") : T("narrative.intro"));

    const card = h("section", { class: "narrative-card" }, [
      h("div", { class: "narrative-emoji" }, emoji),
      h("div", { class: "narrative-chapter" }, chapterLabel),
      title ? h("h2", { class: "narrative-title" }, title) : null,
      h("div", { class: "narrative-bodies" }, body),
      h("div", { class: "narrative-actions" }, [btn]),
    ]);

    mount(h("div", { class: "screen" }, [card]));
  }

  window.MR = window.MR || {};
  window.MR.StoryReader = { render };
})();
