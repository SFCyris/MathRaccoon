/*! critters/svg/hedgehog.js — Baby Hedgehog SVG. */
(function () {
  window.MR = window.MR || {};
  window.MR.CritterSvg = window.MR.CritterSvg || {};
  window.MR.CritterSvg["baby-hedgehog"] = () => `
<svg viewBox="0 0 120 120" width="110" height="110" aria-hidden="true">
  <path d="M20 84 Q34 40 78 52 Q102 60 100 90 Q60 100 20 84 Z" fill="#8a6b52"/>
  <g stroke="#3a2e5f" stroke-width="1.6" fill="none" stroke-linecap="round">
    <path d="M34 74 L30 66"/>
    <path d="M44 68 L42 58"/>
    <path d="M54 64 L54 54"/>
    <path d="M64 62 L66 52"/>
    <path d="M74 62 L78 54"/>
    <path d="M84 66 L90 60"/>
    <path d="M92 74 L100 72"/>
  </g>
  <ellipse cx="26" cy="82" rx="16" ry="14" fill="#f7d3bd"/>
  <circle cx="22" cy="80" r="2.2" fill="#3a2e5f"/>
  <circle cx="16" cy="84" r="2" fill="#3a2e5f"/>
  <path d="M14 88 Q18 92 22 88" stroke="#3a2e5f" stroke-width="1.6" fill="none" stroke-linecap="round"/>
</svg>`;
})();
