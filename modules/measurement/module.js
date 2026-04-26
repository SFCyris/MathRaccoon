/*!
 * Measurement — module manifest. Stub content pending dedicated engines.
 */
(function () {
  MR.Content.registerModule({
    id: "measurement",
    title: "Measurement",
    subtitle: "Length, time, money",
    emoji: "📏",
    accent: "#7dd3fc",
    grade: "Gr. 3–4",
    order: 2,
    status: "live",
    chapters: [
      "ch-mea-01-ruler",
      "ch-mea-02-clock",
      "ch-mea-03-hour-hike",
      "ch-mea-04-ribbon-market",
      "ch-mea-05-pond-picnic",
      "ch-mea-06-swap-shop",
    ],
    arcadeGames: [
      "arc-length-dash",
      "arc-clock-quest",
      "arc-hour-hop",
      "arc-coin-cart",
      "arc-jug-judge",
      "arc-unit-match",
    ],
    teachingOps: [
      "mea-op-length",
      "mea-op-time",
      "mea-op-elapsed-time",
      "mea-op-money",
      "mea-op-capacity",
      "mea-op-unit-convert",
    ],
    critterPool: [
      "baby-turtle",
      "baby-beaver",
      "baby-hamster",
      "baby-duckling",
      "baby-otter",
      "baby-mouse",
    ],
  });
})();
