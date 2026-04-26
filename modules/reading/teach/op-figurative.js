/*!
 * Teaching op — Figurative Language (reading).
 * Strategies: similes, metaphors, idioms.
 */
(function () {
  MR.Content.registerOp({
    id: "rd-op-figurative",
    moduleId: "reading",
    label: "Figurative Language",
    emoji: "🎨",
    tagline: "When words say one thing and mean another.",
    accent: "#ffb37a",
    strategies: [
      {
        id: "simile",
        title: "Similes",
        subtitle: "Comparing with 'like' or 'as'.",
        emoji: "🌈",
        idea: {
          hook: "A <strong>simile</strong> compares two things using the words <strong>'like'</strong> or <strong>'as'</strong>. It makes writing vivid.",
          viz: {
            type: "exampleList",
            params: {
              definition: "simile — a comparison using 'like' or 'as'.",
              examples: [
                { text: "fast as a cheetah",       note: "very fast" },
                { text: "quiet like a mouse",      note: "very quiet" },
                { text: "bright as the sun",       note: "very bright" },
                { text: "brave like a lion",       note: "very brave" },
              ],
            },
          },
          caption: "Spot the 'like' or 'as' — that's your signal.",
        },
        watchMe: [
          { text: "'Her smile was <strong>as</strong> bright <strong>as</strong> the sun.' See the 'as … as' pair?" },
          { text: "That's a simile. It means her smile was VERY bright — bright like sunshine." },
          { text: "'The runner moved <strong>like</strong> a cheetah.' 'Like' + an animal famous for speed = VERY fast." },
          { text: "When you read a simile, ask: what quality of the second thing is being matched?" },
        ],
        practice: [
          {
            prompt: "<em>The library was as quiet as a mouse.</em><br>What does this simile mean?",
            options: ["The library was very quiet.", "The library had mice.", "The library was small."],
            answer: "The library was very quiet.",
            hint: "Mice are known for being quiet.",
          },
          {
            prompt: "<em>The blanket felt as soft as a cloud.</em><br>What does this simile mean?",
            options: ["The blanket was very soft.", "The blanket was white.", "The blanket was in the sky."],
            answer: "The blanket was very soft.",
            hint: "Clouds are famous for being soft.",
          },
        ],
      },
      {
        id: "metaphor",
        title: "Metaphors",
        subtitle: "Calling one thing another.",
        emoji: "🌟",
        idea: {
          hook: "A <strong>metaphor</strong> says one thing IS another — without 'like' or 'as'. It's a bolder comparison than a simile.",
          viz: {
            type: "exampleList",
            params: {
              definition: "metaphor — a direct comparison; one thing IS another.",
              examples: [
                { text: "Pip is a shining star on stage.", note: "Pip performs wonderfully — she shines" },
                { text: "The classroom was a zoo.",         note: "The classroom was noisy and wild" },
                { text: "The snow was a white blanket.",    note: "The snow covered everything gently" },
                { text: "His words were music to her ears.", note: "His words sounded pleasant" },
              ],
            },
          },
          caption: "No 'like' or 'as' — just IS.",
        },
        watchMe: [
          { text: "'Pip <strong>is</strong> a shining star on stage.' Is Pip really a star? No — she just performs brightly." },
          { text: "That's a metaphor: it calls her a star to say she's excellent at performing." },
          { text: "'The classroom was a zoo.' The room isn't actually full of animals — but it was wild and noisy, like a zoo." },
          { text: "Difference from simile: a simile SAYS LIKE/AS. A metaphor just says IS." },
        ],
        practice: [
          {
            prompt: "<em>The snow was a soft white blanket.</em><br>What does this metaphor mean?",
            options: ["The snow was a real blanket.", "The snow covered everything gently.", "The snow was in bed."],
            answer: "The snow covered everything gently.",
            hint: "Blankets cover gently and softly.",
          },
          {
            prompt: "<em>Grandpa's voice is music to my ears.</em><br>What does this metaphor mean?",
            options: ["Grandpa sings all day.", "Grandpa is very loud.", "Grandpa's voice is very pleasant."],
            answer: "Grandpa's voice is very pleasant.",
            hint: "Music is pleasant to hear.",
          },
        ],
      },
      {
        id: "idiom",
        title: "Idioms",
        subtitle: "Sayings that don't mean what they say.",
        emoji: "🎭",
        idea: {
          hook: "An <strong>idiom</strong> is a common phrase whose meaning is totally different from its words. They're playful shortcuts language lovers use.",
          viz: {
            type: "exampleList",
            params: {
              definition: "idiom — a phrase whose meaning isn't literal.",
              examples: [
                { text: "Break a leg!",              note: "Good luck! (NOT 'hurt your leg')" },
                { text: "It's raining cats and dogs.", note: "It's raining very hard" },
                { text: "Hit the books.",            note: "Start studying hard" },
                { text: "Piece of cake.",            note: "Something very easy" },
                { text: "Spill the beans.",          note: "Tell a secret" },
              ],
            },
          },
          caption: "Memorize idioms like new vocabulary words.",
        },
        watchMe: [
          { text: "'<strong>Break a leg!</strong>' — sounds harsh, right? But theater people say it to mean GOOD LUCK." },
          { text: "'<strong>Piece of cake.</strong>' — no cake involved. It just means 'super easy.'" },
          { text: "'<strong>Spill the beans.</strong>' — nothing to do with beans. It means to tell a secret." },
          { text: "When a phrase seems to make no sense literally, it's probably an idiom. Look for the hidden meaning." },
        ],
        practice: [
          {
            prompt: "What does this idiom mean?<br><strong>\"Under the weather\"</strong>",
            options: ["Outside in the rain.", "Feeling sick.", "In a storm."],
            answer: "Feeling sick.",
            hint: "It's about how you feel, not about actual weather.",
          },
          {
            prompt: "What does this idiom mean?<br><strong>\"Hit the books\"</strong>",
            options: ["Punch a book.", "Start studying hard.", "Close the library."],
            answer: "Start studying hard.",
            hint: "Nothing actually gets hit.",
          },
        ],
      },
    ],
  });
})();
