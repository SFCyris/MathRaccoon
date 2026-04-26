/*! critters/svg/fawn.js — Baby Fawn SVG. */
(function () {
  window.MR = window.MR || {};
  window.MR.CritterSvg = window.MR.CritterSvg || {};
  window.MR.CritterSvg["baby-fawn"] = () => `
<svg viewBox="0 0 120 120" width="110" height="110" aria-hidden="true">
  <ellipse cx="60" cy="80" rx="36" ry="22" fill="#c98f55"/>
  <rect x="32" y="94" width="5" height="18" rx="2" fill="#a8784a"/>
  <rect x="44" y="94" width="5" height="18" rx="2" fill="#a8784a"/>
  <rect x="72" y="94" width="5" height="18" rx="2" fill="#a8784a"/>
  <rect x="84" y="94" width="5" height="18" rx="2" fill="#a8784a"/>
  <circle cx="30" cy="58" r="20" fill="#c98f55"/>
  <ellipse cx="22" cy="40" rx="5" ry="10" fill="#c98f55" transform="rotate(-20 22 40)"/>
  <ellipse cx="40" cy="38" rx="5" ry="10" fill="#c98f55" transform="rotate(15 40 38)"/>
  <circle cx="24" cy="58" r="3" fill="#3a2e5f"/>
  <ellipse cx="22" cy="68" rx="3" ry="2" fill="#3a2e5f"/>
  <path d="M18 72 Q22 76 26 72" stroke="#3a2e5f" stroke-width="1.6" fill="none" stroke-linecap="round"/>
  <g fill="#fff" opacity="0.8">
    <circle cx="58" cy="76" r="2.2"/>
    <circle cx="68" cy="82" r="2"/>
    <circle cx="78" cy="74" r="2.4"/>
    <circle cx="86" cy="84" r="2"/>
    <circle cx="52" cy="88" r="2"/>
  </g>
</svg>`;
})();
