/*!
 * Reading · Chapter 6 — The Word Workshop.
 * An epilogue chapter: readers build sentences from loose word blocks.
 * Uses the dragDrop engine (arrange kind) — no typing.
 *
 * Features Cricket Quill, the tiny editor who fixes scrambled sentences.
 */
(function () {
  MR.Content.registerChapter({
    id: "ch-rd-06-word-workshop",
    moduleId: "reading",
    order: 6,
    title: "Ch. 6 — The Word Workshop",
    description: "Cricket Quill's sentences have fallen apart. Reassemble them, word by word.",
    emoji: "🧩",
    accent: "#7dd3fc",
    requires: "ch-rd-05-final-chapter",
    narrative: {
      intro: [
        { speaker: "narrator", text: "Deep in the library's workshop room, a tiny cricket sharpens a quill pen." },
        { speaker: "cricket",  text: "Oh! You startled me, {NAME}. I'm Cricket Quill — I help editors put sentences back together." },
        { speaker: "reading",  text: "Cricket Quill is the best in the valley. He even edited the dictionary." },
        { speaker: "cricket",  text: "A gust of wind scattered my sentences across the workbench. Every word is here, but the order is lost!" },
        { speaker: "raccoon",  text: "Drag each word into the right slot, {NAME}. Capital first, period last." },
      ],
      outro: [
        { speaker: "cricket",  text: "Every sentence stitched! I couldn't have done it without you, {NAME}." },
        { speaker: "reading",  text: "You've mastered grammar, phonics, meaning — and now the shape of a sentence itself." },
        { speaker: "cricket",  text: "Take this little feather, {NAME}. A writer's first tool." },
        { speaker: "narrator", text: "The workshop settles into quiet. On the bench, every sentence now stands tall and whole." },
      ],
    },
    engine: "dragDrop",
    engineConfig: {
      poolId: "reading-arcade-word-builder",
      problemsPerRound: 6,
      revisit: true,
    },
    rewards: { critterOnPass: null, journalEntry: "rd-ch-06" },
  });
})();
