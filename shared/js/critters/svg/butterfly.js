/*! critters/svg/butterfly.js — Baby Butterfly SVG. */
(function () {
  window.MR = window.MR || {};
  window.MR.CritterSvg = window.MR.CritterSvg || {};
  window.MR.CritterSvg["baby-butterfly"] = () => `
<svg viewBox="0 0 120 120" width="110" height="110" aria-hidden="true">
  <ellipse cx="60" cy="104" rx="14" ry="3" fill="#3a2e5f" opacity="0.12"/>
  <!-- upper wings -->
  <path d="M60 58 Q26 36 22 62 Q22 80 48 72 Z" fill="#c4b5fd"/>
  <path d="M60 58 Q94 36 98 62 Q98 80 72 72 Z" fill="#c4b5fd"/>
  <!-- lower wings -->
  <path d="M60 66 Q38 78 40 96 Q50 100 60 86 Z" fill="#f7a8c4"/>
  <path d="M60 66 Q82 78 80 96 Q70 100 60 86 Z" fill="#f7a8c4"/>
  <!-- wing dots (symmetric pattern) -->
  <g fill="#fff">
    <circle cx="36" cy="56" r="3"/>
    <circle cx="84" cy="56" r="3"/>
    <circle cx="48" cy="86" r="2.4"/>
    <circle cx="72" cy="86" r="2.4"/>
  </g>
  <g fill="#7b6bc4" opacity="0.75">
    <circle cx="36" cy="56" r="1.3"/>
    <circle cx="84" cy="56" r="1.3"/>
  </g>
  <!-- body -->
  <ellipse cx="60" cy="72" rx="4" ry="22" fill="#3a2e5f"/>
  <!-- head -->
  <circle cx="60" cy="46" r="6" fill="#3a2e5f"/>
  <!-- eyes (on head) -->
  <circle cx="57" cy="44.5" r="1.4" fill="#fff"/>
  <circle cx="63" cy="44.5" r="1.4" fill="#fff"/>
  <!-- antennae -->
  <path d="M56 40 Q50 30 46 26" stroke="#3a2e5f" stroke-width="1.4" fill="none" stroke-linecap="round"/>
  <path d="M64 40 Q70 30 74 26" stroke="#3a2e5f" stroke-width="1.4" fill="none" stroke-linecap="round"/>
  <circle cx="46" cy="26" r="1.6" fill="#3a2e5f"/>
  <circle cx="74" cy="26" r="1.6" fill="#3a2e5f"/>
  <!-- smile -->
  <path d="M57 50 Q60 52 63 50" stroke="#fff" stroke-width="1.2" fill="none" stroke-linecap="round"/>
</svg>`;
})();
