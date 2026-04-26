/*! critters/svg/duckling.js — Baby Duckling SVG. */
(function () {
  window.MR = window.MR || {};
  window.MR.CritterSvg = window.MR.CritterSvg || {};
  window.MR.CritterSvg["baby-duckling"] = () => `
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
</svg>`;
})();
