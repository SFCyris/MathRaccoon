/*!
 * critters/catalog.js — registers all seed critters with MR.Content.
 * Each entry references an SVG provider registered on MR.CritterSvg.
 */
(function () {
  const C = MR.Content;
  const CATALOG = [
    { id: "baby-raccoon",  name: "Baby Raccoon",  caption: "Bandit in training",    moduleHint: "arithmetic", svg: "baby-raccoon"  },
    { id: "baby-otter",    name: "Baby Otter",    caption: "Floating snack time",   moduleHint: "arithmetic", svg: "baby-otter"    },
    { id: "baby-squirrel", name: "Baby Squirrel", caption: "Acorn hoarder",         moduleHint: "arithmetic", svg: "baby-squirrel" },
    { id: "baby-mouse",    name: "Baby Mouse",    caption: "Teeny squeaker",        moduleHint: "arithmetic", svg: "baby-mouse"    },
    { id: "baby-koala",    name: "Baby Koala",    caption: "Sleepy tree hug",       moduleHint: "arithmetic", svg: "baby-koala"    },
    { id: "baby-bunny",    name: "Baby Bunny",    caption: "Hop-along pal",         moduleHint: "arithmetic", svg: "baby-bunny"    },
    { id: "baby-owl",      name: "Baby Owl",      caption: "Who? Me!",              moduleHint: "arithmetic", svg: "baby-owl"      },
    { id: "baby-hedgehog", name: "Baby Hedgehog", caption: "Prickly napper",        moduleHint: "arithmetic", svg: "baby-hedgehog" },
    { id: "baby-skunk",    name: "Baby Skunk",    caption: "Stripe sensation",      moduleHint: "arithmetic", svg: "baby-skunk"    },
    { id: "baby-puppy",    name: "Baby Puppy",    caption: "Zoomie unlocked",       moduleHint: "arithmetic", svg: "baby-puppy"    },
    { id: "baby-kitten",   name: "Baby Kitten",   caption: "Purr machine",          moduleHint: "arithmetic", svg: "baby-kitten"   },
    { id: "baby-fox",      name: "Baby Fox",      caption: "Sleepy fox pup",        moduleHint: "arithmetic", svg: "baby-fox"      },
    { id: "baby-fawn",     name: "Baby Fawn",     caption: "Speckled stargazer",    moduleHint: "arithmetic", svg: "baby-fawn"     },
    { id: "baby-bear-cub", name: "Bear Cub",      caption: "Tummy roly-poly",       moduleHint: "arithmetic", svg: "baby-bear-cub" },
    { id: "baby-duckling", name: "Baby Duckling", caption: "First-pond paddle",     moduleHint: "arithmetic", svg: "baby-duckling" },
    { id: "baby-panda",    name: "Baby Panda",    caption: "Bamboo chunk fan",      moduleHint: "arithmetic", svg: "baby-panda"    },
    // Reading Raccoon companions
    { id: "baby-bookworm",    name: "Baby Bookworm",    caption: "Reader of the margins",  moduleHint: "reading", svg: "baby-bookworm"    },
    { id: "baby-quill-mouse", name: "Baby Quill Mouse", caption: "Ink-stained tiny scribe", moduleHint: "reading", svg: "baby-quill-mouse" },
    { id: "baby-lantern-bug", name: "Baby Lantern Bug", caption: "Night-reading glow-pal",  moduleHint: "reading", svg: "baby-lantern-bug" },
    { id: "baby-paper-crane", name: "Baby Paper Crane", caption: "Folded from a poem",     moduleHint: "reading", svg: "baby-paper-crane" },
    // Measurement companions
    { id: "baby-turtle",      name: "Baby Turtle",      caption: "Slow, steady clock-shell", moduleHint: "measurement", svg: "baby-turtle"  },
    { id: "baby-beaver",      name: "Baby Beaver",      caption: "Tiny architect",           moduleHint: "measurement", svg: "baby-beaver"  },
    { id: "baby-hamster",     name: "Baby Hamster",     caption: "Pocket-sized measurer",    moduleHint: "measurement", svg: "baby-hamster" },
    // Geometry companions
    { id: "baby-ladybug",     name: "Baby Ladybug",     caption: "Spot-pattern pro",         moduleHint: "geometry",    svg: "baby-ladybug" },
    { id: "baby-bee",         name: "Baby Bee",         caption: "Hexagon enthusiast",       moduleHint: "geometry",    svg: "baby-bee"     },
    { id: "baby-butterfly",   name: "Baby Butterfly",   caption: "Mirror-wing friend",       moduleHint: "geometry",    svg: "baby-butterfly" },
    // Data companions
    { id: "baby-penguin",     name: "Baby Penguin",     caption: "Lines up in neat rows",    moduleHint: "data",        svg: "baby-penguin" },
    { id: "baby-pigeon",      name: "Baby Pigeon",      caption: "Counts the flock",         moduleHint: "data",        svg: "baby-pigeon"  },
    { id: "baby-frog",        name: "Baby Frog",        caption: "Lily-pad plotter",         moduleHint: "data",        svg: "baby-frog"    },
  ];
  CATALOG.forEach((c) => C.registerCritter(c));
})();
