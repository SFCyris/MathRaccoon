/*!
 * Geometry — module manifest. Stub content pending dedicated engines.
 */
(function () {
  MR.Content.registerModule({
    id: "geometry",
    title: "Geometry",
    subtitle: "Shapes, symmetry, area",
    emoji: "📐",
    accent: "#6ee7b7",
    grade: "Gr. 3–4",
    order: 3,
    status: "live",
    chapters: [
      "ch-geo-01-shape-scout",
      "ch-geo-02-tile-town",
      "ch-geo-03-garden-gala",
      "ch-geo-04-quilt-fair",
      "ch-geo-05-quadrilateral-quest",
    ],
    arcadeGames: [
      "arc-tile-tally",
      "arc-shape-sleuth",
      "arc-fence-frenzy",
      "arc-quad-quest",
      "arc-slice-shade",
    ],
    teachingOps: [
      "geo-op-shapes",
      "geo-op-perimeter",
      "geo-op-area",
      "geo-op-quadrilaterals",
      "geo-op-partition",
    ],
    critterPool: [
      "baby-ladybug",
      "baby-bee",
      "baby-butterfly",
      "baby-hedgehog",
      "baby-fawn",
      "baby-panda",
    ],
  });
})();
