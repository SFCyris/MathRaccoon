/*! critters/svg/ladybug.js — Baby Ladybug SVG. */
(function () {
  window.MR = window.MR || {};
  window.MR.CritterSvg = window.MR.CritterSvg || {};
  window.MR.CritterSvg["baby-ladybug"] = () => `
<svg viewBox="0 0 120 120" width="110" height="110" aria-hidden="true">
  <ellipse cx="60" cy="102" rx="34" ry="5" fill="#3a2e5f" opacity="0.12"/>
  <!-- head -->
  <ellipse cx="60" cy="42" rx="20" ry="14" fill="#2d2441"/>
  <!-- body (dome) -->
  <path d="M22 82 Q22 46 60 42 Q98 46 98 82 Q98 96 60 98 Q22 96 22 82 Z" fill="#d94560"/>
  <!-- center stripe (divides wings) -->
  <line x1="60" y1="42" x2="60" y2="96" stroke="#2d2441" stroke-width="2.5"/>
  <!-- symmetric spots (arrays!) -->
  <g fill="#2d2441">
    <circle cx="42" cy="62" r="5"/>
    <circle cx="78" cy="62" r="5"/>
    <circle cx="36" cy="80" r="4.5"/>
    <circle cx="84" cy="80" r="4.5"/>
    <circle cx="50" cy="86" r="4"/>
    <circle cx="70" cy="86" r="4"/>
  </g>
  <!-- eyes on head -->
  <circle cx="52" cy="40" r="2.6" fill="#fff"/>
  <circle cx="68" cy="40" r="2.6" fill="#fff"/>
  <circle cx="52" cy="40.6" r="1.3" fill="#3a2e5f"/>
  <circle cx="68" cy="40.6" r="1.3" fill="#3a2e5f"/>
  <!-- antennae -->
  <path d="M52 30 Q48 22 44 20" stroke="#2d2441" stroke-width="1.8" fill="none" stroke-linecap="round"/>
  <path d="M68 30 Q72 22 76 20" stroke="#2d2441" stroke-width="1.8" fill="none" stroke-linecap="round"/>
  <circle cx="44" cy="20" r="2" fill="#2d2441"/>
  <circle cx="76" cy="20" r="2" fill="#2d2441"/>
  <!-- smile -->
  <path d="M54 48 Q60 52 66 48" stroke="#fff" stroke-width="1.6" fill="none" stroke-linecap="round"/>
</svg>`;
})();
