/*! critters/svg/mouse.js — Baby Mouse SVG. */
(function () {
  window.MR = window.MR || {};
  window.MR.CritterSvg = window.MR.CritterSvg || {};
  window.MR.CritterSvg["baby-mouse"] = () => `
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
</svg>`;
})();
