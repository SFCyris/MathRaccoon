/*! critters/svg/frog.js — Baby Frog SVG. */
(function () {
  window.MR = window.MR || {};
  window.MR.CritterSvg = window.MR.CritterSvg || {};
  window.MR.CritterSvg["baby-frog"] = () => `
<svg viewBox="0 0 120 120" width="110" height="110" aria-hidden="true">
  <ellipse cx="60" cy="106" rx="30" ry="4" fill="#3a2e5f" opacity="0.12"/>
  <!-- back legs -->
  <ellipse cx="26" cy="88" rx="14" ry="10" fill="#7bbf8d" transform="rotate(-15 26 88)"/>
  <ellipse cx="94" cy="88" rx="14" ry="10" fill="#7bbf8d" transform="rotate(15 94 88)"/>
  <!-- body -->
  <ellipse cx="60" cy="76" rx="32" ry="22" fill="#9cd4a8"/>
  <!-- belly -->
  <ellipse cx="60" cy="82" rx="22" ry="14" fill="#d6ecc8"/>
  <!-- eye bumps (on top) -->
  <circle cx="44" cy="46" r="10" fill="#9cd4a8"/>
  <circle cx="76" cy="46" r="10" fill="#9cd4a8"/>
  <!-- eyes -->
  <circle cx="44" cy="48" r="6" fill="#fff"/>
  <circle cx="76" cy="48" r="6" fill="#fff"/>
  <circle cx="44" cy="50" r="3" fill="#3a2e5f"/>
  <circle cx="76" cy="50" r="3" fill="#3a2e5f"/>
  <circle cx="44.8" cy="48.8" r="1.2" fill="#fff"/>
  <circle cx="76.8" cy="48.8" r="1.2" fill="#fff"/>
  <!-- mouth (wide smile) -->
  <path d="M40 72 Q60 86 80 72" stroke="#3a2e5f" stroke-width="2" fill="none" stroke-linecap="round"/>
  <!-- nostril dots -->
  <circle cx="56" cy="62" r="0.9" fill="#3a2e5f"/>
  <circle cx="64" cy="62" r="0.9" fill="#3a2e5f"/>
  <!-- front toes -->
  <g fill="#7bbf8d">
    <circle cx="36" cy="96" r="3"/>
    <circle cx="42" cy="98" r="3"/>
    <circle cx="48" cy="96" r="3"/>
    <circle cx="72" cy="96" r="3"/>
    <circle cx="78" cy="98" r="3"/>
    <circle cx="84" cy="96" r="3"/>
  </g>
</svg>`;
})();
