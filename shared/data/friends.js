/*!
 * friends.js — Valley friends roster.
 *
 * Each friend is unlocked by passing a specific chapter, and each module has
 * a bonus mascot unlocked when every chapter in the module has been cleared.
 */
(function () {
  const C = MR.Content;

  const FRIENDS = [
    // ---- Arithmetic chapter friends (16) ----
    { id: "rocky-raccoon",    name: "Rocky Raccoon",    emoji: "🦝", accent: "#c4b5fd", moduleId: "arithmetic", caption: "Counts acorns with you",      earnedBy: { chapter: "ch-ari-01-forest" } },
    { id: "ollie-otter",      name: "Ollie Otter",      emoji: "🦦", accent: "#7dd3fc", moduleId: "arithmetic", caption: "Splashes through sums",       earnedBy: { chapter: "ch-ari-02-brook" } },
    { id: "sammy-squirrel",   name: "Sammy Squirrel",   emoji: "🐿️", accent: "#f4c77a", moduleId: "arithmetic", caption: "Berry-bush champion",         earnedBy: { chapter: "ch-ari-03-berries" } },
    { id: "minty-mouse",      name: "Minty Mouse",      emoji: "🐭", accent: "#ffd93d", moduleId: "arithmetic", caption: "Tiny market manager",         earnedBy: { chapter: "ch-ari-04-mouse-market" } },
    { id: "kiki-koala",       name: "Kiki Koala",       emoji: "🐨", accent: "#ffb077", moduleId: "arithmetic", caption: "Library sleepy-reader",       earnedBy: { chapter: "ch-ari-05-library" } },
    { id: "biscuit-bunny",    name: "Biscuit Bunny",    emoji: "🐰", accent: "#ff7a93", moduleId: "arithmetic", caption: "Best baker in the brook",     earnedBy: { chapter: "ch-ari-06-bakery" } },
    { id: "hootie-owl",       name: "Hootie Owl",       emoji: "🦉", accent: "#a78bfa", moduleId: "arithmetic", caption: "Stargazer of the dusk",       earnedBy: { chapter: "ch-ari-07-night-sky" } },
    { id: "hazel-hedgehog",   name: "Hazel Hedgehog",   emoji: "🦔", accent: "#6ee7b7", moduleId: "arithmetic", caption: "Sneaky pie heister",          earnedBy: { chapter: "ch-ari-08-hedgehog-heist" } },
    { id: "flicker-firefly",  name: "Flicker Firefly",  emoji: "✨", accent: "#ffd93d", moduleId: "arithmetic", caption: "Lanterns of the meadow",      earnedBy: { chapter: "ch-ari-09-fireflies" } },
    { id: "scout-puppy",      name: "Scout Puppy",      emoji: "🐶", accent: "#ffb077", moduleId: "arithmetic", caption: "Picnic blanket captain",      earnedBy: { chapter: "ch-ari-10-puppy-picnic" } },
    { id: "clover-kitten",    name: "Clover Kitten",    emoji: "🐱", accent: "#c4b5fd", moduleId: "arithmetic", caption: "Quiltsmith of the meadow",    earnedBy: { chapter: "ch-ari-11-kitten-quilt" } },
    { id: "fable-fox",        name: "Fable Fox",        emoji: "🦊", accent: "#ffb077", moduleId: "arithmetic", caption: "Storyteller of the fair",     earnedBy: { chapter: "ch-ari-12-fox-fair" } },
    { id: "willow-fawn",      name: "Willow Fawn",      emoji: "🦌", accent: "#6ee7b7", moduleId: "arithmetic", caption: "Graceful dale explorer",      earnedBy: { chapter: "ch-ari-13-deer-dale" } },
    { id: "mochi-bear-cub",   name: "Mochi Bear Cub",   emoji: "🐻", accent: "#ffd93d", moduleId: "arithmetic", caption: "Honey-hunter supreme",        earnedBy: { chapter: "ch-ari-14-honey-hunt" } },
    { id: "pip-duckling",     name: "Pip Duckling",     emoji: "🦆", accent: "#7dd3fc", moduleId: "arithmetic", caption: "First pond adventurer",       earnedBy: { chapter: "ch-ari-15-thousand-stars" } },
    { id: "bamboo-panda",     name: "Bamboo Panda",     emoji: "🐼", accent: "#a78bfa", moduleId: "arithmetic", caption: "Grand revue headliner",       earnedBy: { chapter: "ch-ari-16-grand-revue" } },
    // ---- Arithmetic module mascot ----
    { id: "math-raccoon-mascot", name: "Math Raccoon",  emoji: "🦝", accent: "#c4b5fd", moduleId: "arithmetic", caption: "Your arithmetic guide",       earnedBy: { module: "arithmetic" } },

    // ---- Measurement chapter friends (5) ----
    { id: "ruler-mouse",      name: "Ruler Mouse",      emoji: "📏", accent: "#7dd3fc", moduleId: "measurement", caption: "Never off by a millimeter", earnedBy: { chapter: "ch-mea-01-ruler" } },
    { id: "chime-owl",        name: "Chime the Owl",    emoji: "🕰️", accent: "#a78bfa", moduleId: "measurement", caption: "Reads clocks by moonlight", earnedBy: { chapter: "ch-mea-02-clock" } },
    { id: "hiker-hedgehog",   name: "Hiker Hedgehog",   emoji: "🥾", accent: "#6ee7b7", moduleId: "measurement", caption: "Tracks every hour on trail", earnedBy: { chapter: "ch-mea-03-hour-hike" } },
    { id: "ribbon-rabbit",    name: "Ribbon Rabbit",    emoji: "🎀", accent: "#ff7a93", moduleId: "measurement", caption: "Market math whiz",            earnedBy: { chapter: "ch-mea-04-ribbon-market" } },
    { id: "jug-otter",        name: "Jug Otter",        emoji: "🥤", accent: "#7dd3fc", moduleId: "measurement", caption: "Milliliter maestro",          earnedBy: { chapter: "ch-mea-05-pond-picnic" } },
    // ---- Measurement module mascot ----
    { id: "measure-maven",    name: "Measure Maven",    emoji: "📐", accent: "#7dd3fc", moduleId: "measurement", caption: "Keeper of the ruler",         earnedBy: { module: "measurement" } },

    // ---- Geometry chapter friends (4) ----
    { id: "shape-scout-fox",  name: "Shape Scout Fox",  emoji: "🔷", accent: "#6ee7b7", moduleId: "geometry", caption: "Spots every corner",              earnedBy: { chapter: "ch-geo-01-shape-scout" } },
    { id: "tile-beaver",      name: "Tile Beaver",      emoji: "🧱", accent: "#f4c77a", moduleId: "geometry", caption: "Master of tile town",              earnedBy: { chapter: "ch-geo-02-tile-town" } },
    { id: "garden-gopher",    name: "Garden Gopher",    emoji: "🌼", accent: "#ffd93d", moduleId: "geometry", caption: "Area-and-edge artist",             earnedBy: { chapter: "ch-geo-03-garden-gala" } },
    { id: "quilt-koala",      name: "Quilt Koala",      emoji: "🪡", accent: "#c4b5fd", moduleId: "geometry", caption: "Patchwork prodigy",                earnedBy: { chapter: "ch-geo-04-quilt-fair" } },
    // ---- Geometry module mascot ----
    { id: "geo-raccoon",      name: "Geometer Raccoon", emoji: "📐", accent: "#6ee7b7", moduleId: "geometry", caption: "Shapes & sides expert",            earnedBy: { module: "geometry" } },

    // ---- Data chapter friends (4) ----
    { id: "tally-twin",       name: "Tally Twin",       emoji: "✨", accent: "#c4b5fd", moduleId: "data", caption: "Double the dot, double the fun",        earnedBy: { chapter: "ch-dat-01-tally-twinkle" } },
    { id: "graph-grove-squirrel", name: "Graph Grove Squirrel", emoji: "📊", accent: "#f4c77a", moduleId: "data", caption: "Bar-chart bookkeeper",         earnedBy: { chapter: "ch-dat-02-graph-grove" } },
    { id: "picnic-panda",     name: "Picnic Panda",     emoji: "🖼️", accent: "#a78bfa", moduleId: "data", caption: "Each icon means a friend",              earnedBy: { chapter: "ch-dat-03-picnic-pictograph" } },
    { id: "survey-owl",       name: "Survey Owl",       emoji: "📋", accent: "#6ee7b7", moduleId: "data", caption: "Counts everyone's favorite",             earnedBy: { chapter: "ch-dat-04-survey-summit" } },
    // ---- Data module mascot ----
    { id: "data-detective",   name: "Data Detective",   emoji: "🔎", accent: "#c4b5fd", moduleId: "data", caption: "Sniffs out the pattern",                earnedBy: { module: "data" } },

    // ---- Reading chapter friends (5) ----
    { id: "paige-sparrow",     name: "Paige Sparrow",     emoji: "🪶", accent: "#b78af0", moduleId: "reading", caption: "Turns pages with her wings",       earnedBy: { chapter: "ch-rd-01-arrival" } },
    { id: "grammy-gate-goat",  name: "Grammy the Goat",   emoji: "🐐", accent: "#fbcfe8", moduleId: "reading", caption: "Keeper of the Grammar Gate",        earnedBy: { chapter: "ch-rd-02-grammar-gate" } },
    { id: "whisper-tree-deer", name: "Whisper Deer",      emoji: "🌳", accent: "#86efac", moduleId: "reading", caption: "Hears every silent letter",         earnedBy: { chapter: "ch-rd-03-phonics-forest" } },
    { id: "mist-otter-bard",   name: "Mist Otter",        emoji: "🌊", accent: "#7dd3fc", moduleId: "reading", caption: "Simile & metaphor songsmith",       earnedBy: { chapter: "ch-rd-04-figurative-falls" } },
    { id: "chapters-the-cat",  name: "Chapters the Cat",  emoji: "😺", accent: "#ffd6a5", moduleId: "reading", caption: "Curls up with every story",         earnedBy: { chapter: "ch-rd-05-final-chapter" } },
    // ---- Reading module mascot ----
    { id: "reading-raccoon-mascot", name: "Reading Raccoon", emoji: "📚", accent: "#b78af0", moduleId: "reading", caption: "Uncle Reader himself",       earnedBy: { module: "reading" } },
  ];

  FRIENDS.forEach((f) => C.registerFriend(f));
})();
