/*! critters/svg/turtle.js — Baby Turtle SVG. */
(function () {
  window.MR = window.MR || {};
  window.MR.CritterSvg = window.MR.CritterSvg || {};
  window.MR.CritterSvg["baby-turtle"] = () => `
<svg viewBox="0 0 120 120" width="110" height="110" aria-hidden="true">
  <ellipse cx="60" cy="102" rx="36" ry="5" fill="#3a2e5f" opacity="0.12"/>
  <!-- shell -->
  <path d="M28 78 Q30 46 60 44 Q90 46 92 78 Q90 92 60 94 Q30 92 28 78 Z" fill="#7bbf8d"/>
  <path d="M34 76 Q36 54 60 52 Q84 54 86 76 Q84 86 60 88 Q36 86 34 76 Z" fill="#5ea874"/>
  <!-- shell hex panels -->
  <g fill="#4a9461" opacity="0.55">
    <path d="M60 58 L68 62 L68 70 L60 74 L52 70 L52 62 Z"/>
    <path d="M44 66 L50 68 L50 74 L44 76 L40 74 L40 68 Z"/>
    <path d="M76 66 L80 68 L80 74 L76 76 L70 74 L70 68 Z"/>
  </g>
  <!-- head -->
  <ellipse cx="60" cy="36" rx="14" ry="12" fill="#f0d9a8"/>
  <circle cx="54" cy="34" r="2.2" fill="#3a2e5f"/>
  <circle cx="66" cy="34" r="2.2" fill="#3a2e5f"/>
  <circle cx="54" cy="33.4" r="0.8" fill="#fff"/>
  <circle cx="66" cy="33.4" r="0.8" fill="#fff"/>
  <path d="M56 42 Q60 45 64 42" stroke="#3a2e5f" stroke-width="1.6" fill="none" stroke-linecap="round"/>
  <!-- feet -->
  <ellipse cx="30" cy="88" rx="7" ry="5" fill="#f0d9a8"/>
  <ellipse cx="90" cy="88" rx="7" ry="5" fill="#f0d9a8"/>
  <!-- tail -->
  <path d="M92 78 Q100 78 102 82" stroke="#f0d9a8" stroke-width="4" fill="none" stroke-linecap="round"/>
</svg>`;
})();
