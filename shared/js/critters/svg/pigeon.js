/*! critters/svg/pigeon.js — Baby Pigeon SVG. */
(function () {
  window.MR = window.MR || {};
  window.MR.CritterSvg = window.MR.CritterSvg || {};
  window.MR.CritterSvg["baby-pigeon"] = () => `
<svg viewBox="0 0 120 120" width="110" height="110" aria-hidden="true">
  <ellipse cx="60" cy="106" rx="28" ry="4" fill="#3a2e5f" opacity="0.12"/>
  <!-- body -->
  <ellipse cx="60" cy="74" rx="32" ry="24" fill="#a7b3c9"/>
  <!-- neck collar (iridescent blue-green) -->
  <ellipse cx="60" cy="52" rx="18" ry="6" fill="#7b9dbc"/>
  <!-- head -->
  <circle cx="60" cy="40" r="18" fill="#c3cddd"/>
  <!-- eyes -->
  <circle cx="52" cy="38" r="2.6" fill="#f4a13a"/>
  <circle cx="68" cy="38" r="2.6" fill="#f4a13a"/>
  <circle cx="52" cy="38" r="1.3" fill="#3a2e5f"/>
  <circle cx="68" cy="38" r="1.3" fill="#3a2e5f"/>
  <!-- beak -->
  <path d="M56 44 L60 50 L64 44 Z" fill="#d97a82"/>
  <!-- wing -->
  <path d="M38 64 Q48 56 68 62 Q76 70 68 80 Q50 82 38 78 Z" fill="#8a99b4"/>
  <g stroke="#6a7a98" stroke-width="1" fill="none" opacity="0.5">
    <path d="M50 66 Q58 68 64 66"/>
    <path d="M48 72 Q58 74 66 72"/>
  </g>
  <!-- feet -->
  <path d="M50 96 L50 104" stroke="#d97a82" stroke-width="2.4" stroke-linecap="round"/>
  <path d="M70 96 L70 104" stroke="#d97a82" stroke-width="2.4" stroke-linecap="round"/>
</svg>`;
})();
