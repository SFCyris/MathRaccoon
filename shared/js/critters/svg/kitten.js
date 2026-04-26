/*! critters/svg/kitten.js — Baby Kitten SVG. */
(function () {
  window.MR = window.MR || {};
  window.MR.CritterSvg = window.MR.CritterSvg || {};
  window.MR.CritterSvg["baby-kitten"] = () => `
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
</svg>`;
})();
