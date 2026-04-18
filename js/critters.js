/*!
 * Math Raccoon Arcade — © 2026 S. F. Cyris
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * The character likenesses and SVG designs in this file are original
 * creative works. See NOTICE.md for the trademark notice.
 *
 * Source: https://github.com/SFCyris/MathRaccoon
 */

/**
 * critters.js — "Critter Cam" gallery: 16 cute baby-critter SVGs.
 *
 * Earned one at a time for every 5 correct answers. Same warm, round,
 * soft-palette style as the existing raccoon and background art so the
 * gallery feels continuous with the rest of the valley.
 *
 * Each critter has { id, name, caption, svg() } — the app just grids them.
 */
(function () {
  const CRITTERS = [
    {
      id: "baby-raccoon",
      name: "Baby Raccoon",
      caption: "Bandit in training",
      svg: () => `
<svg viewBox="0 0 120 120" width="110" height="110" aria-hidden="true">
  <ellipse cx="60" cy="88" rx="36" ry="24" fill="#a7b3c9"/>
  <circle cx="60" cy="58" r="32" fill="#c7d1e1"/>
  <path d="M22 40 Q28 24 40 36 Z" fill="#a7b3c9"/>
  <path d="M98 40 Q92 24 80 36 Z" fill="#a7b3c9"/>
  <ellipse cx="48" cy="58" rx="12" ry="9" fill="#3a2e5f"/>
  <ellipse cx="72" cy="58" rx="12" ry="9" fill="#3a2e5f"/>
  <circle cx="46" cy="58" r="4" fill="#fff"/>
  <circle cx="70" cy="58" r="4" fill="#fff"/>
  <circle cx="46" cy="59" r="2.2" fill="#3a2e5f"/>
  <circle cx="70" cy="59" r="2.2" fill="#3a2e5f"/>
  <ellipse cx="60" cy="72" rx="4" ry="3" fill="#3a2e5f"/>
  <path d="M54 78 Q60 84 66 78" stroke="#3a2e5f" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M20 94 Q60 112 100 94" stroke="#3a2e5f" stroke-width="3" fill="none" opacity="0.15"/>
</svg>`,
    },
    {
      id: "baby-fox",
      name: "Baby Fox",
      caption: "Sleepy fox pup",
      svg: () => `
<svg viewBox="0 0 120 120" width="110" height="110" aria-hidden="true">
  <path d="M20 92 Q10 72 22 64 Q34 66 32 86 Z" fill="#ff9a55"/>
  <ellipse cx="60" cy="82" rx="34" ry="22" fill="#ff9a55"/>
  <ellipse cx="60" cy="82" rx="22" ry="12" fill="#fff4e3"/>
  <circle cx="60" cy="50" r="28" fill="#ff9a55"/>
  <path d="M32 28 L42 20 L46 40 Z" fill="#ff9a55"/>
  <path d="M88 28 L78 20 L74 40 Z" fill="#ff9a55"/>
  <path d="M34 30 L40 26 L42 38 Z" fill="#3a2e5f"/>
  <path d="M86 30 L80 26 L78 38 Z" fill="#3a2e5f"/>
  <ellipse cx="60" cy="60" rx="16" ry="12" fill="#fff4e3"/>
  <circle cx="50" cy="52" r="3" fill="#3a2e5f"/>
  <circle cx="70" cy="52" r="3" fill="#3a2e5f"/>
  <ellipse cx="60" cy="64" rx="3" ry="2" fill="#3a2e5f"/>
  <path d="M56 69 Q60 74 64 69" stroke="#3a2e5f" stroke-width="1.8" fill="none" stroke-linecap="round"/>
</svg>`,
    },
    {
      id: "baby-bunny",
      name: "Baby Bunny",
      caption: "Hop-along pal",
      svg: () => `
<svg viewBox="0 0 120 120" width="110" height="110" aria-hidden="true">
  <ellipse cx="46" cy="28" rx="9" ry="24" fill="#fff4f7"/>
  <ellipse cx="74" cy="28" rx="9" ry="24" fill="#fff4f7"/>
  <ellipse cx="46" cy="30" rx="4" ry="16" fill="#ff9ab3"/>
  <ellipse cx="74" cy="30" rx="4" ry="16" fill="#ff9ab3"/>
  <ellipse cx="60" cy="96" rx="34" ry="18" fill="#fff4f7"/>
  <circle cx="60" cy="68" r="30" fill="#fff4f7"/>
  <circle cx="48" cy="64" r="4" fill="#3a2e5f"/>
  <circle cx="72" cy="64" r="4" fill="#3a2e5f"/>
  <circle cx="47" cy="63" r="1.2" fill="#fff"/>
  <circle cx="71" cy="63" r="1.2" fill="#fff"/>
  <ellipse cx="60" cy="76" rx="4" ry="3" fill="#ff9ab3"/>
  <path d="M54 82 Q60 88 66 82" stroke="#3a2e5f" stroke-width="2" fill="none" stroke-linecap="round"/>
  <circle cx="94" cy="98" r="10" fill="#fff4f7"/>
</svg>`,
    },
    {
      id: "baby-otter",
      name: "Baby Otter",
      caption: "Floating snack time",
      svg: () => `
<svg viewBox="0 0 120 120" width="110" height="110" aria-hidden="true">
  <rect x="0" y="86" width="120" height="30" fill="#9be0ff" opacity="0.6"/>
  <path d="M8 88 Q20 84 30 88 Q40 92 50 88 Q60 84 70 88 Q80 92 90 88 Q100 84 112 88"
        stroke="#7dd3fc" stroke-width="2" fill="none"/>
  <ellipse cx="60" cy="80" rx="38" ry="18" fill="#8b5a3c"/>
  <ellipse cx="60" cy="80" rx="24" ry="8" fill="#d1a07a"/>
  <circle cx="60" cy="54" r="24" fill="#8b5a3c"/>
  <circle cx="42" cy="46" r="8" fill="#8b5a3c"/>
  <circle cx="78" cy="46" r="8" fill="#8b5a3c"/>
  <circle cx="52" cy="54" r="3" fill="#3a2e5f"/>
  <circle cx="68" cy="54" r="3" fill="#3a2e5f"/>
  <ellipse cx="60" cy="62" rx="8" ry="6" fill="#f7d3bd"/>
  <ellipse cx="60" cy="60" rx="3" ry="2" fill="#3a2e5f"/>
  <path d="M56 66 Q60 70 64 66" stroke="#3a2e5f" stroke-width="1.8" fill="none" stroke-linecap="round"/>
  <circle cx="60" cy="78" r="6" fill="#ffd9a3"/>
  <circle cx="60" cy="78" r="3" fill="#ffb266"/>
</svg>`,
    },
    {
      id: "baby-hedgehog",
      name: "Baby Hedgehog",
      caption: "Prickly napper",
      svg: () => `
<svg viewBox="0 0 120 120" width="110" height="110" aria-hidden="true">
  <path d="M20 84 Q34 40 78 52 Q102 60 100 90 Q60 100 20 84 Z" fill="#8a6b52"/>
  <g stroke="#3a2e5f" stroke-width="1.6" fill="none" stroke-linecap="round">
    <path d="M34 74 L30 66"/>
    <path d="M44 68 L42 58"/>
    <path d="M54 64 L54 54"/>
    <path d="M64 62 L66 52"/>
    <path d="M74 62 L78 54"/>
    <path d="M84 66 L90 60"/>
    <path d="M92 74 L100 72"/>
  </g>
  <ellipse cx="26" cy="82" rx="16" ry="14" fill="#f7d3bd"/>
  <circle cx="22" cy="80" r="2.2" fill="#3a2e5f"/>
  <circle cx="16" cy="84" r="2" fill="#3a2e5f"/>
  <path d="M14 88 Q18 92 22 88" stroke="#3a2e5f" stroke-width="1.6" fill="none" stroke-linecap="round"/>
</svg>`,
    },
    {
      id: "baby-squirrel",
      name: "Baby Squirrel",
      caption: "Acorn hoarder",
      svg: () => `
<svg viewBox="0 0 120 120" width="110" height="110" aria-hidden="true">
  <path d="M88 100 Q120 70 102 40 Q88 34 82 58 Q86 80 88 100 Z" fill="#c48a5e"/>
  <ellipse cx="58" cy="84" rx="28" ry="22" fill="#c48a5e"/>
  <ellipse cx="58" cy="86" rx="18" ry="12" fill="#f7d3bd"/>
  <circle cx="48" cy="52" r="22" fill="#c48a5e"/>
  <path d="M30 36 L38 28 L42 44 Z" fill="#c48a5e"/>
  <path d="M60 38 L54 28 L52 44 Z" fill="#c48a5e"/>
  <circle cx="40" cy="52" r="3" fill="#3a2e5f"/>
  <circle cx="54" cy="52" r="3" fill="#3a2e5f"/>
  <ellipse cx="47" cy="60" rx="3" ry="2" fill="#3a2e5f"/>
  <path d="M43 65 Q47 69 51 65" stroke="#3a2e5f" stroke-width="1.6" fill="none" stroke-linecap="round"/>
  <ellipse cx="76" cy="76" rx="10" ry="13" fill="#b07a3e"/>
  <ellipse cx="76" cy="64" rx="11" ry="5" fill="#7a4e2b"/>
  <path d="M74 59 Q76 55 80 58" stroke="#4a2e1a" stroke-width="2" fill="none" stroke-linecap="round"/>
</svg>`,
    },
    {
      id: "baby-owl",
      name: "Baby Owl",
      caption: "Who? Me!",
      svg: () => `
<svg viewBox="0 0 120 120" width="110" height="110" aria-hidden="true">
  <ellipse cx="60" cy="74" rx="38" ry="38" fill="#b38557"/>
  <ellipse cx="60" cy="86" rx="28" ry="22" fill="#f0dcb0"/>
  <path d="M30 36 Q32 22 48 28 Z" fill="#b38557"/>
  <path d="M90 36 Q88 22 72 28 Z" fill="#b38557"/>
  <circle cx="46" cy="58" r="14" fill="#fff"/>
  <circle cx="74" cy="58" r="14" fill="#fff"/>
  <circle cx="46" cy="58" r="7" fill="#3a2e5f"/>
  <circle cx="74" cy="58" r="7" fill="#3a2e5f"/>
  <circle cx="48" cy="56" r="2" fill="#fff"/>
  <circle cx="76" cy="56" r="2" fill="#fff"/>
  <polygon points="60,66 56,74 64,74" fill="#ffb05a"/>
  <path d="M34 88 Q38 100 44 96" stroke="#7a5834" stroke-width="2" fill="none"/>
  <path d="M86 88 Q82 100 76 96" stroke="#7a5834" stroke-width="2" fill="none"/>
</svg>`,
    },
    {
      id: "baby-fawn",
      name: "Baby Fawn",
      caption: "Speckled stargazer",
      svg: () => `
<svg viewBox="0 0 120 120" width="110" height="110" aria-hidden="true">
  <ellipse cx="60" cy="80" rx="36" ry="22" fill="#c98f55"/>
  <rect x="32" y="94" width="5" height="18" rx="2" fill="#a8784a"/>
  <rect x="44" y="94" width="5" height="18" rx="2" fill="#a8784a"/>
  <rect x="72" y="94" width="5" height="18" rx="2" fill="#a8784a"/>
  <rect x="84" y="94" width="5" height="18" rx="2" fill="#a8784a"/>
  <circle cx="30" cy="58" r="20" fill="#c98f55"/>
  <ellipse cx="22" cy="40" rx="5" ry="10" fill="#c98f55" transform="rotate(-20 22 40)"/>
  <ellipse cx="40" cy="38" rx="5" ry="10" fill="#c98f55" transform="rotate(15 40 38)"/>
  <circle cx="24" cy="58" r="3" fill="#3a2e5f"/>
  <ellipse cx="22" cy="68" rx="3" ry="2" fill="#3a2e5f"/>
  <path d="M18 72 Q22 76 26 72" stroke="#3a2e5f" stroke-width="1.6" fill="none" stroke-linecap="round"/>
  <g fill="#fff" opacity="0.8">
    <circle cx="58" cy="76" r="2.2"/>
    <circle cx="68" cy="82" r="2"/>
    <circle cx="78" cy="74" r="2.4"/>
    <circle cx="86" cy="84" r="2"/>
    <circle cx="52" cy="88" r="2"/>
  </g>
</svg>`,
    },
    {
      id: "baby-skunk",
      name: "Baby Skunk",
      caption: "Stripe sensation",
      svg: () => `
<svg viewBox="0 0 120 120" width="110" height="110" aria-hidden="true">
  <path d="M86 108 Q118 72 98 42 Q86 36 82 66 Q84 90 86 108 Z" fill="#2c2441"/>
  <path d="M92 98 Q108 74 96 54 Q90 54 90 80 Q90 90 92 98 Z" fill="#fff4f7"/>
  <ellipse cx="54" cy="86" rx="32" ry="22" fill="#2c2441"/>
  <path d="M38 64 Q54 52 70 64 Q64 90 54 92 Q44 90 38 64 Z" fill="#fff4f7"/>
  <circle cx="40" cy="60" r="18" fill="#2c2441"/>
  <circle cx="36" cy="60" r="3" fill="#fff"/>
  <circle cx="36" cy="60" r="1.6" fill="#3a2e5f"/>
  <ellipse cx="28" cy="66" rx="3" ry="2" fill="#ff9ab3"/>
  <path d="M26 70 Q30 74 34 70" stroke="#fff4f7" stroke-width="1.6" fill="none" stroke-linecap="round"/>
</svg>`,
    },
    {
      id: "baby-mouse",
      name: "Baby Mouse",
      caption: "Teeny squeaker",
      svg: () => `
<svg viewBox="0 0 120 120" width="110" height="110" aria-hidden="true">
  <ellipse cx="58" cy="82" rx="30" ry="20" fill="#c4b5fd"/>
  <circle cx="38" cy="56" r="22" fill="#c4b5fd"/>
  <circle cx="22" cy="40" r="14" fill="#c4b5fd"/>
  <circle cx="22" cy="40" r="8" fill="#ff9ab3"/>
  <circle cx="54" cy="38" r="14" fill="#c4b5fd"/>
  <circle cx="54" cy="38" r="8" fill="#ff9ab3"/>
  <circle cx="34" cy="58" r="2.6" fill="#3a2e5f"/>
  <circle cx="46" cy="58" r="2.6" fill="#3a2e5f"/>
  <ellipse cx="26" cy="64" rx="3" ry="2" fill="#ff9ab3"/>
  <path d="M22 68 Q26 72 30 68" stroke="#3a2e5f" stroke-width="1.4" fill="none" stroke-linecap="round"/>
  <path d="M84 92 Q108 82 108 64" stroke="#c4b5fd" stroke-width="4" fill="none" stroke-linecap="round"/>
</svg>`,
    },
    {
      id: "baby-bear-cub",
      name: "Bear Cub",
      caption: "Tummy roly-poly",
      svg: () => `
<svg viewBox="0 0 120 120" width="110" height="110" aria-hidden="true">
  <ellipse cx="60" cy="80" rx="38" ry="28" fill="#8b5a3c"/>
  <ellipse cx="60" cy="88" rx="22" ry="14" fill="#d1a07a"/>
  <circle cx="60" cy="46" r="28" fill="#8b5a3c"/>
  <circle cx="34" cy="26" r="12" fill="#8b5a3c"/>
  <circle cx="86" cy="26" r="12" fill="#8b5a3c"/>
  <circle cx="34" cy="26" r="6" fill="#d1a07a"/>
  <circle cx="86" cy="26" r="6" fill="#d1a07a"/>
  <circle cx="50" cy="46" r="3" fill="#3a2e5f"/>
  <circle cx="70" cy="46" r="3" fill="#3a2e5f"/>
  <ellipse cx="60" cy="54" rx="10" ry="8" fill="#f7d3bd"/>
  <ellipse cx="60" cy="52" rx="3" ry="2.2" fill="#3a2e5f"/>
  <path d="M54 58 Q60 64 66 58" stroke="#3a2e5f" stroke-width="2" fill="none" stroke-linecap="round"/>
</svg>`,
    },
    {
      id: "baby-duckling",
      name: "Baby Duckling",
      caption: "First-pond paddle",
      svg: () => `
<svg viewBox="0 0 120 120" width="110" height="110" aria-hidden="true">
  <rect x="0" y="92" width="120" height="30" fill="#9be0ff" opacity="0.6"/>
  <path d="M6 94 Q18 90 28 94 Q40 98 52 94 Q64 90 76 94 Q88 98 100 94 Q108 92 116 94"
        stroke="#7dd3fc" stroke-width="2" fill="none"/>
  <ellipse cx="58" cy="80" rx="34" ry="22" fill="#ffd93d"/>
  <path d="M32 72 Q24 64 34 60 Q42 66 38 74 Z" fill="#ffd93d"/>
  <circle cx="76" cy="52" r="22" fill="#ffd93d"/>
  <polygon points="92,54 106,56 92,60" fill="#ff9a55"/>
  <circle cx="78" cy="48" r="3" fill="#3a2e5f"/>
  <circle cx="79" cy="47" r="1" fill="#fff"/>
  <path d="M36 96 L36 104" stroke="#ff9a55" stroke-width="4" stroke-linecap="round"/>
  <path d="M48 96 L48 104" stroke="#ff9a55" stroke-width="4" stroke-linecap="round"/>
</svg>`,
    },
    {
      id: "baby-kitten",
      name: "Baby Kitten",
      caption: "Purr machine",
      svg: () => `
<svg viewBox="0 0 120 120" width="110" height="110" aria-hidden="true">
  <ellipse cx="60" cy="86" rx="34" ry="22" fill="#ffb077"/>
  <ellipse cx="60" cy="92" rx="20" ry="10" fill="#fff4e3"/>
  <circle cx="60" cy="52" r="30" fill="#ffb077"/>
  <path d="M32 28 L44 18 L42 42 Z" fill="#ffb077"/>
  <path d="M88 28 L76 18 L78 42 Z" fill="#ffb077"/>
  <path d="M36 28 L42 22 L42 38 Z" fill="#ff9ab3"/>
  <path d="M84 28 L78 22 L78 38 Z" fill="#ff9ab3"/>
  <g stroke="#d97745" stroke-width="2" stroke-linecap="round">
    <path d="M36 42 L40 46"/>
    <path d="M80 46 L84 42"/>
    <path d="M50 36 L50 44"/>
  </g>
  <circle cx="50" cy="54" r="3.5" fill="#3a2e5f"/>
  <circle cx="70" cy="54" r="3.5" fill="#3a2e5f"/>
  <circle cx="51" cy="53" r="1.2" fill="#fff"/>
  <circle cx="71" cy="53" r="1.2" fill="#fff"/>
  <polygon points="60,62 56,66 64,66" fill="#ff9ab3"/>
  <path d="M60 66 Q56 72 50 70" stroke="#3a2e5f" stroke-width="1.6" fill="none" stroke-linecap="round"/>
  <path d="M60 66 Q64 72 70 70" stroke="#3a2e5f" stroke-width="1.6" fill="none" stroke-linecap="round"/>
</svg>`,
    },
    {
      id: "baby-puppy",
      name: "Baby Puppy",
      caption: "Zoomie unlocked",
      svg: () => `
<svg viewBox="0 0 120 120" width="110" height="110" aria-hidden="true">
  <ellipse cx="60" cy="88" rx="36" ry="22" fill="#d8a87a"/>
  <ellipse cx="60" cy="92" rx="22" ry="10" fill="#fff4e3"/>
  <circle cx="60" cy="54" r="30" fill="#d8a87a"/>
  <ellipse cx="32" cy="50" rx="10" ry="18" fill="#8b5a3c"/>
  <ellipse cx="88" cy="50" rx="10" ry="18" fill="#8b5a3c"/>
  <circle cx="48" cy="52" r="3.5" fill="#3a2e5f"/>
  <circle cx="72" cy="52" r="3.5" fill="#3a2e5f"/>
  <circle cx="49" cy="51" r="1.2" fill="#fff"/>
  <circle cx="73" cy="51" r="1.2" fill="#fff"/>
  <ellipse cx="60" cy="64" rx="5" ry="4" fill="#3a2e5f"/>
  <path d="M60 68 Q54 76 50 72" stroke="#3a2e5f" stroke-width="1.8" fill="none" stroke-linecap="round"/>
  <path d="M60 68 Q66 76 70 72" stroke="#3a2e5f" stroke-width="1.8" fill="none" stroke-linecap="round"/>
  <path d="M60 70 Q58 80 62 84 Q66 84 64 74" fill="#ff9ab3"/>
</svg>`,
    },
    {
      id: "baby-panda",
      name: "Baby Panda",
      caption: "Bamboo chunk fan",
      svg: () => `
<svg viewBox="0 0 120 120" width="110" height="110" aria-hidden="true">
  <ellipse cx="60" cy="86" rx="34" ry="22" fill="#fff"/>
  <circle cx="60" cy="50" r="30" fill="#fff"/>
  <circle cx="30" cy="26" r="12" fill="#2c2441"/>
  <circle cx="90" cy="26" r="12" fill="#2c2441"/>
  <ellipse cx="48" cy="50" rx="9" ry="11" fill="#2c2441"/>
  <ellipse cx="72" cy="50" rx="9" ry="11" fill="#2c2441"/>
  <circle cx="48" cy="50" r="3" fill="#fff"/>
  <circle cx="72" cy="50" r="3" fill="#fff"/>
  <circle cx="48" cy="50" r="1.6" fill="#2c2441"/>
  <circle cx="72" cy="50" r="1.6" fill="#2c2441"/>
  <ellipse cx="60" cy="62" rx="4" ry="3" fill="#2c2441"/>
  <path d="M54 68 Q60 74 66 68" stroke="#2c2441" stroke-width="2" fill="none" stroke-linecap="round"/>
  <rect x="22" y="90" width="18" height="5" rx="2" fill="#86efac"/>
  <rect x="20" y="84" width="4" height="8" rx="1" fill="#5eb97a"/>
  <rect x="38" y="84" width="4" height="8" rx="1" fill="#5eb97a"/>
</svg>`,
    },
    {
      id: "baby-koala",
      name: "Baby Koala",
      caption: "Sleepy tree hug",
      svg: () => `
<svg viewBox="0 0 120 120" width="110" height="110" aria-hidden="true">
  <rect x="54" y="30" width="14" height="82" rx="4" fill="#8b5a3c"/>
  <ellipse cx="61" cy="70" rx="28" ry="18" fill="#a7b3c9"/>
  <circle cx="42" cy="54" r="22" fill="#a7b3c9"/>
  <circle cx="24" cy="44" r="10" fill="#a7b3c9"/>
  <circle cx="24" cy="44" r="6" fill="#fff4f7"/>
  <circle cx="58" cy="42" r="10" fill="#a7b3c9"/>
  <circle cx="58" cy="42" r="6" fill="#fff4f7"/>
  <circle cx="36" cy="56" r="3" fill="#3a2e5f"/>
  <circle cx="48" cy="56" r="3" fill="#3a2e5f"/>
  <ellipse cx="42" cy="64" rx="5" ry="4" fill="#3a2e5f"/>
  <path d="M38 70 Q42 74 46 70" stroke="#3a2e5f" stroke-width="1.6" fill="none" stroke-linecap="round"/>
  <path d="M74 84 Q82 82 82 72 Q76 70 72 78 Z" fill="#a7b3c9"/>
</svg>`,
    },
  ];

  const Critters = {
    all() { return CRITTERS.slice(); },
    byId(id) { return CRITTERS.find((c) => c.id === id) || null; },
    total() { return CRITTERS.length; },
    // Every 5 correct answers unlocks the next critter (in list order).
    // Returns the id if newly earned, else null.
    earnNextIfDue(totalsCorrect) {
      const Storage = window.MR.Storage;
      const owned = Storage.getCritters();
      // How many should be unlocked at this total?
      const should = Math.min(Math.floor(totalsCorrect / 5), CRITTERS.length);
      if (owned.length >= should) return null;
      const next = CRITTERS[owned.length];
      if (!next) return null;
      Storage.earnCritter(next.id);
      return next.id;
    },
  };

  window.MR = window.MR || {};
  window.MR.Critters = Critters;
})();
