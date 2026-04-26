/*! critters/svg/penguin.js — Baby Penguin SVG. */
(function () {
  window.MR = window.MR || {};
  window.MR.CritterSvg = window.MR.CritterSvg || {};
  window.MR.CritterSvg["baby-penguin"] = () => `
<svg viewBox="0 0 120 120" width="110" height="110" aria-hidden="true">
  <ellipse cx="60" cy="106" rx="28" ry="4" fill="#3a2e5f" opacity="0.12"/>
  <!-- body (dark) -->
  <ellipse cx="60" cy="64" rx="30" ry="38" fill="#2d3a5f"/>
  <!-- belly (light) -->
  <ellipse cx="60" cy="72" rx="21" ry="28" fill="#f4f6fb"/>
  <!-- face patch -->
  <path d="M36 40 Q60 24 84 40 Q84 56 60 58 Q36 56 36 40 Z" fill="#f4f6fb"/>
  <!-- eyes -->
  <circle cx="50" cy="44" r="3" fill="#3a2e5f"/>
  <circle cx="70" cy="44" r="3" fill="#3a2e5f"/>
  <circle cx="50.7" cy="43" r="1.1" fill="#fff"/>
  <circle cx="70.7" cy="43" r="1.1" fill="#fff"/>
  <!-- beak -->
  <path d="M56 52 L64 52 L60 60 Z" fill="#f4a13a"/>
  <!-- flippers -->
  <ellipse cx="30" cy="72" rx="6" ry="18" fill="#2d3a5f" transform="rotate(-12 30 72)"/>
  <ellipse cx="90" cy="72" rx="6" ry="18" fill="#2d3a5f" transform="rotate(12 90 72)"/>
  <!-- feet -->
  <ellipse cx="48" cy="100" rx="7" ry="4" fill="#f4a13a"/>
  <ellipse cx="72" cy="100" rx="7" ry="4" fill="#f4a13a"/>
</svg>`;
})();
