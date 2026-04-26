/*!
 * journal.js — unlockable journal pages. Each chapter has a matching entry
 * that appears in the Journal gallery once the chapter is cleared.
 *
 * Body is an array of short paragraphs written in the player's voice — a
 * "what I learned" keepsake rather than a lesson summary.
 */
(function () {
  const C = MR.Content;

  const ENTRIES = [
    // ---- Arithmetic (16) ----
    { id: "ari-ch-01", moduleId: "arithmetic", chapterId: "ch-ari-01-forest",          title: "Into the Forest",         emoji: "🌲", accent: "#c4b5fd",
      body: ["Math Raccoon met me at the edge of the forest.", "We counted acorns together and I learned how adding feels like gathering — one pile, plus another, makes more."] },
    { id: "ari-ch-02", moduleId: "arithmetic", chapterId: "ch-ari-02-brook",           title: "At the Brook",            emoji: "🪨", accent: "#7dd3fc",
      body: ["The brook babbled while Ollie Otter showed me taking-away.", "When some acorns floated off downstream, I practiced subtracting what was missing."] },
    { id: "ari-ch-03", moduleId: "arithmetic", chapterId: "ch-ari-03-berries",         title: "Berry Bush Hop",          emoji: "🫐", accent: "#ff7a93",
      body: ["Sammy Squirrel taught me how to count by 3s, 4s, and 5s.", "Skip-counting is just fast adding — and it makes multiplying so much quicker."] },
    { id: "ari-ch-04", moduleId: "arithmetic", chapterId: "ch-ari-04-mouse-market",    title: "The Mouse Market",        emoji: "🐭", accent: "#ffd93d",
      body: ["Minty Mouse runs the smallest, busiest stall.", "I bagged items in equal groups — and that's the heart of multiplication."] },
    { id: "ari-ch-05", moduleId: "arithmetic", chapterId: "ch-ari-05-library",         title: "Quiet Library",           emoji: "📚", accent: "#ffb077",
      body: ["Kiki Koala showed me where the number-fact books live.", "Dividing is just sharing equally — and it undoes multiplication."] },
    { id: "ari-ch-06", moduleId: "arithmetic", chapterId: "ch-ari-06-bakery",          title: "Bakery Morning",          emoji: "🥧", accent: "#c4b5fd",
      body: ["The oven was warm and Biscuit Bunny rolled out the dough.", "I learned mul and div go together — every times-fact has a sharing twin."] },
    { id: "ari-ch-07", moduleId: "arithmetic", chapterId: "ch-ari-07-night-sky",       title: "Under the Night Sky",     emoji: "🌙", accent: "#a78bfa",
      body: ["Hootie Owl named each constellation by its place value.", "Ones, tens, hundreds — each column tells a different size story."] },
    { id: "ari-ch-08", moduleId: "arithmetic", chapterId: "ch-ari-08-hedgehog-heist",  title: "The Hedgehog Heist",      emoji: "🦔", accent: "#7dd3fc",
      body: ["Hazel tried to sneak the whole pie — but we caught her.", "Halves and fourths showed up everywhere on the pie tin."] },
    { id: "ari-ch-09", moduleId: "arithmetic", chapterId: "ch-ari-09-fireflies",       title: "Firefly Meadow",          emoji: "✨", accent: "#ff7a93",
      body: ["Flicker led a dance of fractions in the dusk.", "I compared ½ to ⅓ and learned bigger bottoms can mean smaller slices."] },
    { id: "ari-ch-10", moduleId: "arithmetic", chapterId: "ch-ari-10-puppy-picnic",    title: "Puppy Picnic",            emoji: "🐶", accent: "#ffd93d",
      body: ["Scout sniffed out the perfect picnic spot.", "We placed fractions on a number line like guests around a blanket."] },
    { id: "ari-ch-11", moduleId: "arithmetic", chapterId: "ch-ari-11-kitten-quilt",    title: "Kitten Quilt",            emoji: "🐱", accent: "#c4b5fd",
      body: ["Clover Kitten stitched equal pieces into a cozy quilt.", "Equivalent fractions are different cuts of the same patch."] },
    { id: "ari-ch-12", moduleId: "arithmetic", chapterId: "ch-ari-12-fox-fair",        title: "Fair Day",                emoji: "🎡", accent: "#ffb077",
      body: ["Fable Fox spun the storybook tent at the fair.", "Word problems are just math with a costume — read, picture, solve."] },
    { id: "ari-ch-13", moduleId: "arithmetic", chapterId: "ch-ari-13-deer-dale",       title: "Deer Dale",               emoji: "🦌", accent: "#6ee7b7",
      body: ["Willow Fawn taught me to count by tens into the thousands.", "Big numbers aren't scary — each place just counts a bigger bundle."] },
    { id: "ari-ch-14", moduleId: "arithmetic", chapterId: "ch-ari-14-honey-hunt",      title: "Honey Hunt",              emoji: "🍯", accent: "#ffd93d",
      body: ["Mochi Bear and I split every honeycomb cell cleanly.", "Sharing evenly is just division in disguise."] },
    { id: "ari-ch-15", moduleId: "arithmetic", chapterId: "ch-ari-15-thousand-stars",  title: "A Thousand Stars",        emoji: "🌟", accent: "#a78bfa",
      body: ["Pip Duckling taught me to read four-digit numbers like stories.", "Thousands, hundreds, tens, ones — each place has a voice."] },
    { id: "ari-ch-16", moduleId: "arithmetic", chapterId: "ch-ari-16-grand-revue",     title: "The Grand Revue",         emoji: "🎭", accent: "#ffd6a5",
      body: ["Bamboo Panda hosted a revue of every skill I learned.", "I took a bow with Math Raccoon — the whole arithmetic book, done."] },

    // ---- Measurement (5) ----
    { id: "mea-ch-01", moduleId: "measurement", chapterId: "ch-mea-01-ruler",          title: "The First Ruler",         emoji: "📏", accent: "#7dd3fc",
      body: ["Ruler Mouse showed me the notches that mean centimeters and inches.", "I measured ribbon, twigs, pawprints — length is just counting steps."] },
    { id: "mea-ch-02", moduleId: "measurement", chapterId: "ch-mea-02-clock",          title: "Clock Face Secrets",      emoji: "🕰️", accent: "#a78bfa",
      body: ["Chime Owl's clock has little hands and big hands.", "Each number is five minutes — and the hour hand moves sneaky-slow."] },
    { id: "mea-ch-03", moduleId: "measurement", chapterId: "ch-mea-03-hour-hike",      title: "Hour Hike",               emoji: "🥾", accent: "#6ee7b7",
      body: ["Hiker Hedgehog and I left at 9:15 and got back at 10:45.", "Elapsed time is just counting the minutes between two moments."] },
    { id: "mea-ch-04", moduleId: "measurement", chapterId: "ch-mea-04-ribbon-market",  title: "Ribbon Market",           emoji: "🎀", accent: "#ff7a93",
      body: ["Ribbon Rabbit taught me to measure with centimeters and count cents.", "Money math and length math both fit on a number line."] },
    { id: "mea-ch-05", moduleId: "measurement", chapterId: "ch-mea-05-pond-picnic",    title: "Pond Picnic",             emoji: "🥤", accent: "#7dd3fc",
      body: ["Jug Otter poured 250 mL into every cup at the picnic.", "Capacity is how much a container can hold — bigger jugs, bigger numbers."] },
    { id: "mea-ch-06", moduleId: "measurement", chapterId: "ch-mea-06-swap-shop",      title: "The Swap Shop",           emoji: "🔄", accent: "#6ee7b7",
      body: ["Swap the Chipmunk taught me to flip units without changing the amount.", "Big to small: multiply. Small to big: divide. Same stuff, new number."] },

    // ---- Geometry (4) ----
    { id: "geo-ch-01", moduleId: "geometry", chapterId: "ch-geo-01-shape-scout",       title: "Shape Scout",             emoji: "🔷", accent: "#6ee7b7",
      body: ["Scout Fox pointed out every angle and side in the meadow.", "Triangles have 3 sides. Quadrilaterals have 4. Pentagons have 5."] },
    { id: "geo-ch-02", moduleId: "geometry", chapterId: "ch-geo-02-tile-town",         title: "Tile Town",               emoji: "🧱", accent: "#f4c77a",
      body: ["Tile Beaver laid out grids and showed me how rows × columns = area.", "Tiling turns multiplication into something I can see."] },
    { id: "geo-ch-03", moduleId: "geometry", chapterId: "ch-geo-03-garden-gala",       title: "Garden Gala",             emoji: "🌼", accent: "#ffd93d",
      body: ["Garden Gopher laid out beds for perimeter and plots for area.", "Perimeter is the fence around. Area is the dirt inside."] },
    { id: "geo-ch-04", moduleId: "geometry", chapterId: "ch-geo-04-quilt-fair",        title: "Quilt Fair",              emoji: "🪡", accent: "#c4b5fd",
      body: ["Quilt Koala fit shapes into a patchwork prize.", "Every square and rectangle tells you both its perimeter and its area."] },
    { id: "geo-ch-05", moduleId: "geometry", chapterId: "ch-geo-05-quadrilateral-quest", title: "Quadrilateral Quest",   emoji: "🔷", accent: "#a78bfa",
      body: ["King Quilly the Hedgehog showed me how shapes share families.", "A square is also a rectangle AND a rhombus — the fanciest member of its whole family tree."] },

    // ---- Data (4) ----
    { id: "dat-ch-01", moduleId: "data", chapterId: "ch-dat-01-tally-twinkle",         title: "Tally Twinkle",           emoji: "✨", accent: "#c4b5fd",
      body: ["Tally Twin taught me the four-and-a-slash counting trick.", "Every five tallies get a diagonal — now I can count by 5s forever."] },
    { id: "dat-ch-02", moduleId: "data", chapterId: "ch-dat-02-graph-grove",           title: "Graph Grove",             emoji: "📊", accent: "#f4c77a",
      body: ["Graph Grove Squirrel showed me bars that grow with numbers.", "Reading a bar graph is just reading the tallest side."] },
    { id: "dat-ch-03", moduleId: "data", chapterId: "ch-dat-03-picnic-pictograph",     title: "Picnic Pictograph",       emoji: "🖼️", accent: "#a78bfa",
      body: ["Picnic Panda made each icon stand for two friends.", "Pictographs are bar graphs with cuter bars."] },
    { id: "dat-ch-04", moduleId: "data", chapterId: "ch-dat-04-survey-summit",         title: "Survey Summit",           emoji: "📋", accent: "#6ee7b7",
      body: ["Survey Owl asked everyone their favorite snack and we counted.", "A survey turns questions into data — data turns into graphs."] },
    { id: "dat-ch-05", moduleId: "data", chapterId: "ch-dat-05-plot-lab",              title: "The Plot Lab",            emoji: "📈", accent: "#ff7a93",
      body: ["Lark the Song-Lark measured every acorn that fell and stacked them on a line plot.", "The tallest stack is the most common length — and I can read it at a glance."] },

    // ---- Reading (5) ----
    { id: "rd-ch-01", moduleId: "reading", chapterId: "ch-rd-01-arrival",              title: "Uncle Reader Arrives",     emoji: "📖", accent: "#b78af0",
      body: ["Reading Raccoon showed up at the hollow with a torn page in his paw.", "He told us his library had scattered — and that we'd help him put the words back in their books."] },
    { id: "rd-ch-02", moduleId: "reading", chapterId: "ch-rd-02-grammar-gate",         title: "The Grammar Gate",         emoji: "🚪", accent: "#fbcfe8",
      body: ["At the gate the words were jumbled — nouns in verb slots, verbs where adverbs belonged.", "I learned every word has a job, and the sentence clicks open once each word is doing its own."] },
    { id: "rd-ch-03", moduleId: "reading", chapterId: "ch-rd-03-phonics-forest",       title: "Phonics Forest",           emoji: "🌲", accent: "#86efac",
      body: ["The trees whispered letters you don't hear — the silent K, the hidden B, the quiet W.", "Words look one way and sound another, and learning the patterns turns spelling into a game."] },
    { id: "rd-ch-04", moduleId: "reading", chapterId: "ch-rd-04-figurative-falls",     title: "Figurative Falls",         emoji: "🌈", accent: "#7dd3fc",
      body: ["The waterfall spoke in similes — 'soft as a cloud', 'bright as the sun'.", "Metaphors and idioms followed, reminding me that words can mean much more than what they literally say."] },
    { id: "rd-ch-05", moduleId: "reading", chapterId: "ch-rd-05-final-chapter",        title: "The Last Chapter",         emoji: "🏛️", accent: "#ffd6a5",
      body: ["Back at the library every page was home.", "Reading Raccoon opened the secret story and I read it beside him — the whole Scrambled Library, mended."] },
    { id: "rd-ch-06", moduleId: "reading", chapterId: "ch-rd-06-word-workshop",        title: "The Word Workshop",        emoji: "🧩", accent: "#7dd3fc",
      body: ["Cricket Quill handed me a feather and a pile of scrambled words.", "I learned that every sentence has a shape — subject, action, period — and once you see the shape, the words fall into place."] },

    // ---- Module finales (unlock when all chapters of that module are cleared) ----
    { id: "ari-finale", moduleId: "arithmetic", finale: true, title: "Number Forest Complete", emoji: "🌟", accent: "#ffd6a5",
      body: [
        "I walked the whole Number Forest — every brook, every bakery, every starlit meadow.",
        "Adding, subtracting, multiplying, dividing, fractions, place value, rounding: the forest is mine now, and numbers feel like friends instead of strangers."
      ] },
    { id: "mea-finale", moduleId: "measurement", finale: true, title: "Measured Every Corner", emoji: "📐", accent: "#7dd3fc",
      body: [
        "Ruler, clock, scale, ribbon, jug — I tried every tool in the Measure Meadow.",
        "Length, time, money, capacity, and unit swaps all make sense now. I can read the world in centimeters, minutes, and cups."
      ] },
    { id: "geo-finale", moduleId: "geometry", finale: true, title: "Shapes of the Valley", emoji: "🔷", accent: "#6ee7b7",
      body: [
        "Every quadrilateral has a home — square, rectangle, rhombus, trapezoid, all found their spot.",
        "Perimeter walks the edge, area fills the inside, and a fraction is just a shape fairly sliced. The valley has all its shapes back."
      ] },
    { id: "dat-finale", moduleId: "data", finale: true, title: "Every Graph Home", emoji: "📊", accent: "#c4b5fd",
      body: [
        "Tally marks, bar graphs, pictographs, line plots — I filled the whole Graph Grove with clear stories.",
        "Data is just friends showing up and standing in lines. Reading the tallest column tells me what matters most."
      ] },
    { id: "rd-finale", moduleId: "reading", finale: true, title: "The Scrambled Library, Mended", emoji: "📚", accent: "#ffd6a5",
      body: [
        "Every book is back on its shelf — vocabulary, grammar, phonics, figurative, comprehension.",
        "Reading Raccoon tipped his hat and said the library is open again, thanks to me. I know how words work, and I know how stories breathe."
      ] },
  ];

  ENTRIES.forEach((e) => C.registerJournalEntry(e));
})();
