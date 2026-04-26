/*!
 * Reading — module manifest.
 * "Reading Raccoon's Visit" — an older scholarly raccoon comes to Hidden Valley
 * to help solve the Mystery of the Scrambled Library.
 */
(function () {
  MR.Content.registerModule({
    id: "reading",
    title: "Reading Raccoon's Visit",
    subtitle: "Words, stories & meaning",
    emoji: "📚",
    accent: "#b78af0",
    grade: "Gr. 3–4",
    order: 5,
    status: "live",
    section: "reading",
    chapters: [
      "ch-rd-01-arrival",
      "ch-rd-02-grammar-gate",
      "ch-rd-03-phonics-forest",
      "ch-rd-04-figurative-falls",
      "ch-rd-05-final-chapter",
      "ch-rd-06-word-workshop",
    ],
    arcadeGames: [
      "arc-word-watch",
      "arc-simile-sprint",
      "arc-library-lookup",
      "arc-word-builder",
      "arc-word-sort",
    ],
    teachingOps: [
      "rd-op-vocabulary",
      "rd-op-grammar",
      "rd-op-phonics",
      "rd-op-figurative",
      "rd-op-comprehension",
    ],
    critterPool: [
      "baby-bookworm", "baby-quill-mouse", "baby-lantern-bug", "baby-paper-crane",
      "baby-owl", "baby-mouse", "baby-bunny", "baby-squirrel",
      "baby-fox", "baby-hedgehog", "baby-bear-cub",
    ],
  });
})();
