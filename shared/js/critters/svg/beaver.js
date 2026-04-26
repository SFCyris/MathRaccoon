/*! critters/svg/beaver.js — Baby Beaver SVG. */
(function () {
  window.MR = window.MR || {};
  window.MR.CritterSvg = window.MR.CritterSvg || {};
  window.MR.CritterSvg["baby-beaver"] = () => `
<svg viewBox="0 0 120 120" width="110" height="110" aria-hidden="true">
  <ellipse cx="60" cy="102" rx="36" ry="5" fill="#3a2e5f" opacity="0.12"/>
  <!-- tail (flat paddle) -->
  <path d="M86 86 L106 92 L106 100 L88 96 Z" fill="#6b4a30"/>
  <g stroke="#4a3018" stroke-width="0.8" opacity="0.5" fill="none">
    <path d="M90 90 L104 94"/>
    <path d="M90 94 L104 98"/>
  </g>
  <!-- body -->
  <ellipse cx="58" cy="80" rx="30" ry="22" fill="#8a6142"/>
  <!-- head -->
  <circle cx="58" cy="54" r="24" fill="#9c6f4d"/>
  <!-- ears -->
  <circle cx="42" cy="40" r="5" fill="#6b4a30"/>
  <circle cx="74" cy="40" r="5" fill="#6b4a30"/>
  <!-- muzzle -->
  <ellipse cx="58" cy="62" rx="10" ry="7" fill="#f0d5b8"/>
  <!-- teeth (two front teeth) -->
  <rect x="55" y="64" width="3" height="6" fill="#fff" rx="0.5"/>
  <rect x="59" y="64" width="3" height="6" fill="#fff" rx="0.5"/>
  <!-- eyes -->
  <circle cx="50" cy="50" r="2.4" fill="#3a2e5f"/>
  <circle cx="66" cy="50" r="2.4" fill="#3a2e5f"/>
  <circle cx="50.5" cy="49.2" r="0.9" fill="#fff"/>
  <circle cx="66.5" cy="49.2" r="0.9" fill="#fff"/>
  <!-- nose -->
  <ellipse cx="58" cy="58" rx="2" ry="1.5" fill="#3a2e5f"/>
</svg>`;
})();
