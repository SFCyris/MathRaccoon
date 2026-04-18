/*!
 * Math Raccoon Arcade — © 2026 S. F. Cyris
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * The narrative text, character names (Math Raccoon™, Reading Raccoon™,
 * Art Raccoon™, Painter Raccoon™), and the story world "Ava's Hidden Valley™"
 * are unregistered common-law trademarks and original creative works of the
 * author. See NOTICE.md — these marks are NOT licensed under Apache 2.0.
 *
 * Source: https://github.com/SFCyris/MathRaccoon
 */

/**
 * story.js — 16-chapter story mode set in Hidden Valley.
 *
 * Each chapter uses an engine (via GameRunner) wrapped in a short story beat,
 * awards a collectible friend sticker, and unlocks a Reading Raccoon journal
 * page (short illustrated read).
 */
(function () {
  const R = window.MR.Games;

  function chapter(n, over) {
    const base = {
      mode: "story",
      chapter: n,
      grade: n <= 8 ? "Gr. 3" : "Gr. 3–4",
    };
    return { ...base, ...over };
  }

  R.register(chapter(1, {
    id: "story-1",
    title: "Ch. 1: Into Hidden Valley",
    description: "{NAME} follows a trail of acorns into a valley glowing with adventure.",
    emoji: "🌲",
    accent: "#6ee7b7",
    engine: "addition",
    config: { problemsPerRound: 6, digits: 2, allowRegroup: false },
    narrative: {
      intro: "{NAME} ducks under a curtain of ivy and — poof! — sunshine splashes across Hidden Valley. A little raccoon waves from a mossy stump. 'I'm Math Raccoon! Help me count the acorns on the path?'",
      outro: "The acorns sparkle as {NAME} adds them up. Math Raccoon beams: 'You're a natural! Come meet the rest of the valley.'",
    },
    friendId: "math-raccoon",
    journal: {
      title: "The Acorn Path",
      body: "The valley was tucked behind a waterfall of leaves. {NAME} had never seen grass so green, or sky so warm-pink. Math Raccoon wore a tiny red scarf and asked for help right away — acorns, everywhere, rolling down the hill. {NAME} didn't feel shy. Adding was the first friendship handshake.",
    },
  }));

  R.register(chapter(2, {
    id: "story-2",
    title: "Ch. 2: The Bubbling Brook",
    description: "Count stones across the stream with Rocky Raccoon.",
    emoji: "🪨",
    accent: "#7dd3fc",
    engine: "subtraction",
    config: { problemsPerRound: 6, digits: 2, allowRegroup: false },
    requiresPass: "story-1",
    narrative: {
      intro: "At the brook, Rocky Raccoon is stacking stones. 'Some tumble into the water each time a frog hops by. Can you tell me how many stones are left?'",
      outro: "Rocky high-fives {NAME} with a mossy paw. 'Great hopping! Want to meet my brother Ricky?'",
    },
    friendId: "rocky",
    journal: {
      title: "Rocky's Brook",
      body: "Rocky Raccoon had paws the color of riverbed pebbles. He stacked stones like his whole day depended on getting them just right. When a frog cannonballed in, the stones wobbled, some fell. Rocky just laughed. 'Math helps me start over,' he said. {NAME} learned that subtracting isn't losing — it's knowing what's left.",
    },
  }));

  R.register(chapter(3, {
    id: "story-3",
    title: "Ch. 3: Ricky's Berry Baskets",
    description: "Ricky Raccoon sorts blueberries into equal baskets.",
    emoji: "🫐",
    accent: "#ff7a93",
    engine: "multiplication",
    config: { problemsPerRound: 6, maxFactor: 6 },
    requiresPass: "story-2",
    narrative: {
      intro: "Ricky Raccoon bounces up with tiny woven baskets. 'We fill each basket with the same number of berries. Can you multiply to see how many we picked today?'",
      outro: "Ricky scatters berries in a rainbow. 'You're a berry math star! Let's keep going!'",
    },
    friendId: "ricky",
    journal: {
      title: "Ricky and the Baskets",
      body: "Ricky Raccoon always hummed. Three berries in one basket, three in another, three in another — that meant three times as many, he said. {NAME} liked how multiplying felt like copy-pasting. Quick and neat. Her purple-stained fingers proved she'd helped.",
    },
  }));

  R.register(chapter(4, {
    id: "story-4",
    title: "Ch. 4: Mouse Market",
    description: "Divide cheese wedges fairly at the mouse market.",
    emoji: "🧀",
    accent: "#ffd93d",
    engine: "division",
    config: { problemsPerRound: 6, maxDivisor: 6 },
    requiresPass: "story-3",
    narrative: {
      intro: "Three little mice tumble out of a pumpkin cart. 'We have cheese to share. Every mouse must get the same amount — divide for us!'",
      outro: "The mice squeak with joy, each holding a perfectly equal wedge. 'Fair and square, thank you!'",
    },
    friendId: "mice",
    journal: {
      title: "The Mouse Market",
      body: "The mice ran a market from a pumpkin cart. They had one rule: every mouse gets the same. {NAME} helped slice cheese into equal wedges. Dividing, she realized, is what fairness looks like with a ruler.",
    },
  }));

  R.register(chapter(5, {
    id: "story-5",
    title: "Ch. 5: Reading Raccoon's Library",
    description: "Help Reading Raccoon shelve books by place value.",
    emoji: "📚",
    accent: "#ffb077",
    engine: "placeValue",
    config: { problemsPerRound: 6, digits: 3, modes: ["read", "expanded"] },
    requiresPass: "story-4",
    narrative: {
      intro: "Inside a hollow tree, Reading Raccoon pushes up tiny spectacles. 'Books have numbers — can you tell me which digit goes where?'",
      outro: "The library hums with happy pages. 'You're welcome back anytime, my friend.'",
    },
    friendId: "reading-raccoon",
    journal: {
      title: "The Hollow Library",
      body: "Reading Raccoon's library lived inside an old oak. Every book had a number on its spine, and every number had a place. 'Ones go home to ones,' she said, sliding a skinny book. 'Tens beside tens. Hundreds up high.' {NAME} wondered if her bookshelf at home worked the same way.",
    },
  }));

  R.register(chapter(6, {
    id: "story-6",
    title: "Ch. 6: Beaver Bakery",
    description: "Slice pies into fractions for the beaver family.",
    emoji: "🥧",
    accent: "#c4b5fd",
    engine: "fraction",
    config: { problemsPerRound: 6, maxDenom: 6, modes: ["name"] },
    requiresPass: "story-5",
    narrative: {
      intro: "Mama Beaver slides a warm berry pie from the oven. 'Every beaver gets a fair slice. Can you name the fraction we served?'",
      outro: "Each beaver wags their tail happily, crumbs on their whiskers. 'Delicious and just right!'",
    },
    friendId: "beavers",
    journal: {
      title: "Beaver Bakery",
      body: "The Beaver Bakery smelled like warm butter. Mama Beaver cut a pie into six. 'You took two pieces,' she told {NAME}. 'That's two out of six — two-sixths.' {NAME} thought a fraction was just a nice way to say 'this part of the whole.'",
    },
  }));

  R.register(chapter(7, {
    id: "story-7",
    title: "Ch. 7: Owl's Night Sky",
    description: "Count stars in big three-digit numbers with Professor Owl.",
    emoji: "🦉",
    accent: "#a78bfa",
    engine: "addition",
    config: { problemsPerRound: 6, digits: 3, allowRegroup: true },
    requiresPass: "story-6",
    narrative: {
      intro: "Professor Owl glides down with a scroll of stars. 'The sky is too big to count alone. Help me add the stars in each constellation!'",
      outro: "The stars twinkle in time with {NAME}'s answers. 'Splendid! Knowledge soars when shared.'",
    },
    friendId: "owl",
    journal: {
      title: "Professor Owl's Sky",
      body: "Professor Owl stayed up past bedtime — because his work was the stars. He handed {NAME} a scroll of glittering constellations. Adding three-digit counts felt big, but big numbers started to feel friendly when broken into hundreds, tens, and ones.",
    },
  }));

  R.register(chapter(8, {
    id: "story-8",
    title: "Ch. 8: The Hedgehog Hollow Heist",
    description: "Subtract to solve a twist at Hedgehog Hollow.",
    emoji: "🦔",
    accent: "#7dd3fc",
    engine: "subtraction",
    config: { problemsPerRound: 6, digits: 3, allowRegroup: true },
    requiresPass: "story-7",
    narrative: {
      intro: "A hedgehog scampers up, prickles wiggling. 'Someone swiped some of my acorn coins! Subtract to find what's missing!'",
      outro: "A cheeky squirrel returns the coins with a wink. Mystery solved — thanks to subtraction!",
    },
    friendId: "hedgehog",
    journal: {
      title: "The Hedgehog Heist",
      body: "Tuck the hedgehog carried a lockbox of acorn coins. One morning, some were gone! {NAME} learned the word 'deficit' without meaning to. They found the squirrel napping on the loot. Even tricksters, it turns out, are forgivable when everyone gets their count right.",
    },
  }));

  R.register(chapter(9, {
    id: "story-9",
    title: "Ch. 9: Firefly Formation",
    description: "Arrange fireflies into arrays for the summer dance.",
    emoji: "✨",
    accent: "#ff7a93",
    engine: "multiplication",
    config: { problemsPerRound: 6, maxFactor: 10 },
    requiresPass: "story-8",
    narrative: {
      intro: "Fireflies blink into rows and columns. 'We want to dance in a perfect array! Multiply to see how many of us are in the show.'",
      outro: "The meadow glows like a starfield. 'Encore! Encore!'",
    },
    friendId: "fireflies",
    journal: {
      title: "Firefly Formation",
      body: "The fireflies practiced in rows. Six across, seven deep. {NAME} had never seen math so shiny. An array, she realized, is just a pattern you can count two ways — and both give the same answer.",
    },
  }));

  R.register(chapter(10, {
    id: "story-10",
    title: "Ch. 10: Puppy Picnic",
    description: "Share sandwiches among puppies with division.",
    emoji: "🐶",
    accent: "#ffd93d",
    engine: "division",
    config: { problemsPerRound: 6, maxDivisor: 10 },
    requiresPass: "story-9",
    narrative: {
      intro: "A pile of wriggly puppies spots you with a picnic basket. 'Share the sandwiches evenly so everyone wags equally!'",
      outro: "Tails wag in unison. Puppy approved!",
    },
    friendId: "puppies",
    journal: {
      title: "The Puppy Picnic",
      body: "Eight puppies, a basket of sandwiches, zero patience. {NAME} divided by eight, handed them out, and the whole picnic tumbled into a wag party. The rule of division at the Puppy Picnic: everyone gets the same, or no one eats yet.",
    },
  }));

  R.register(chapter(11, {
    id: "story-11",
    title: "Ch. 11: Kitten Quilt",
    description: "Match equivalent fractions on a cozy quilt.",
    emoji: "🐱",
    accent: "#c4b5fd",
    engine: "fraction",
    config: { problemsPerRound: 6, maxDenom: 8, modes: ["equivalent"] },
    requiresPass: "story-10",
    narrative: {
      intro: "Three kittens tumble on a patchwork quilt. 'Help us find patches that are the same size — even if they look different!'",
      outro: "The quilt warms the whole valley. Purrs all around.",
    },
    friendId: "kittens",
    journal: {
      title: "The Kitten Quilt",
      body: "The kittens had a quilt of patches: halves, fourths, eighths. 'Look,' mewed the smallest. 'Two-fourths is the same as one-half.' {NAME} liked this: different clothes, same body. Equivalent fractions.",
    },
  }));

  R.register(chapter(12, {
    id: "story-12",
    title: "Ch. 12: Fox Fair",
    description: "Round prices at the fox fairground stalls.",
    emoji: "🦊",
    accent: "#ffb077",
    engine: "placeValue",
    config: { problemsPerRound: 6, digits: 3, modes: ["round"], roundTo: 10 },
    requiresPass: "story-11",
    narrative: {
      intro: "A clever fox grins at the fair. 'Our prices are wiggly! Round to the nearest 10 so shoppers know what to expect.'",
      outro: "The fox tips its hat. 'A sharp estimator — welcome back anytime!'",
    },
    friendId: "fox",
    journal: {
      title: "The Fox Fair",
      body: "The fox's prices ran wild — 47, 82, 119. 'Round them,' he said, 'so the critters don't faint.' Rounding wasn't lying, {NAME} decided. It was kindness in numeric form: close enough is often good enough.",
    },
  }));

  R.register(chapter(13, {
    id: "story-13",
    title: "Ch. 13: Deer Dale",
    description: "Add four-digit totals with the deer clan.",
    emoji: "🦌",
    accent: "#6ee7b7",
    engine: "addition",
    config: { problemsPerRound: 6, digits: 4, allowRegroup: true },
    requiresPass: "story-12",
    narrative: {
      intro: "Tall deer stand at the edge of Deer Dale. 'Our numbers are getting bigger! Add the four-digit herds for us.'",
      outro: "The deer bow their heads. 'Your math is as mighty as our antlers!'",
    },
    friendId: "deer",
    journal: {
      title: "Deer Dale",
      body: "The deer clan counted antlers in four-digit herds. {NAME} used to think four-digit numbers were scary. But after adding them column by column — ones, tens, hundreds, thousands — they were just longer sentences of the same familiar words.",
    },
  }));

  R.register(chapter(14, {
    id: "story-14",
    title: "Ch. 14: Bear's Honey Hunt",
    description: "Compare fractions of honeycombs with Grandpa Bear.",
    emoji: "🐻",
    accent: "#ffd93d",
    engine: "fraction",
    config: { problemsPerRound: 6, maxDenom: 8, modes: ["compare"] },
    requiresPass: "story-13",
    narrative: {
      intro: "Grandpa Bear hums, paws sticky with honey. 'Which honeycomb piece is bigger? Compare the fractions for me!'",
      outro: "Grandpa Bear shares the biggest slice with {NAME}. 'Fair is sweet.'",
    },
    friendId: "bear",
    journal: {
      title: "Grandpa Bear's Honeycomb",
      body: "Grandpa Bear never hurried. He laid two honeycomb pieces side by side. 'Three-fourths or two-thirds?' he asked. {NAME} sized them up like grandma picked apples: slow, thoughtful, sweet on the tongue.",
    },
  }));

  R.register(chapter(15, {
    id: "story-15",
    title: "Ch. 15: Thousand-Star Sky",
    description: "Read, expand, and round four-digit skies.",
    emoji: "🌌",
    accent: "#a78bfa",
    engine: "placeValue",
    config: { problemsPerRound: 6, digits: 4, modes: ["read", "expanded", "round"], roundTo: 100 },
    requiresPass: "story-14",
    narrative: {
      intro: "The whole valley gazes up. 'The sky has thousands of stars tonight. Read their place values and round to the nearest 100.'",
      outro: "The sky shimmers with {NAME}'s answers. The valley erupts in applause.",
    },
    friendId: "star-sprite",
    journal: {
      title: "Thousand-Star Sky",
      body: "On the last warm night, every critter lay on their back and watched the sky. There were more stars than a number could hold — unless you rounded. Then the sky was 3,200, give or take a few. {NAME} was okay with 'give or take.' It still felt like a whole sky.",
    },
  }));

  R.register(chapter(16, {
    id: "story-16",
    title: "Ch. 16: Grand Raccoon Revue",
    description: "Final celebration! Mixed math with all your raccoon friends.",
    emoji: "🎪",
    accent: "#ff7a93",
    engine: "mixed",
    config: {
      problemsPerRound: 10,
      engines: ["addition", "subtraction", "multiplication", "division"],
      engineConfigs: {
        addition: { digits: 3, allowRegroup: true },
        subtraction: { digits: 3, allowRegroup: true },
        multiplication: { maxFactor: 10 },
        division: { maxDivisor: 10 },
      },
    },
    requiresPass: "story-15",
    narrative: {
      intro: "Every critter has come out for the Grand Revue! Math Raccoon takes the stage. 'One last show — any kind of math, all mixed together. You've got this, {NAME}!'",
      outro: "Fireflies spell '{NAME}' across the valley sky. You're an honorary citizen of Hidden Valley!",
    },
    friendId: "valley-citizen",
    journal: {
      title: "Grand Raccoon Revue",
      body: "At the final show, every friend {NAME} had met came back. Math Raccoon with his scarf. Rocky and Ricky. The mice, the beavers, the owl, the hedgehog. Fireflies spelled her name in the sky — and she laughed so hard it echoed. The valley wasn't hidden anymore. It was home.",
    },
  }));
})();
