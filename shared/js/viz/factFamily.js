/*!
 * viz/factFamily.js — renders the 4-ray "fact family" sun.
 * params: { a, b, product, op: "×" | "+", revealCount?: 0..4 }
 */
(function () {
  const { h } = window.MR.Viz;

  window.MR.Viz.register("factFamily", function ({ a, b, product, op = "×", revealCount = null }) {
    const isAdd = op === "+";
    const fwd = isAdd ? "+" : "×";
    const inv = isAdd ? "−" : "÷";
    const texts = [
      `${a} ${fwd} ${b} = ${product}`,
      `${b} ${fwd} ${a} = ${product}`,
      `${product} ${inv} ${a} = ${b}`,
      `${product} ${inv} ${b} = ${a}`,
    ];
    const rays = texts.map((t, i) => {
      let cls = "teach-ff-ray";
      if (revealCount != null) {
        if (i < revealCount - 1) cls += " teach-ff-ray-lit";
        else if (i === revealCount - 1) cls += " teach-ff-ray-lit teach-ff-ray-new";
        else cls += " teach-ff-ray-dim";
      }
      return h("div", { class: cls }, t);
    });
    return h("div", { class: "teach-viz teach-factfamily" }, [
      h("div", { class: "teach-ff-sun" }, String(product)),
      h("div", { class: "teach-ff-rays" }, rays),
    ]);
  });
})();
