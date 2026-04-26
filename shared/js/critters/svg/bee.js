/*! critters/svg/bee.js — Baby Bee SVG. */
(function () {
  window.MR = window.MR || {};
  window.MR.CritterSvg = window.MR.CritterSvg || {};
  window.MR.CritterSvg["baby-bee"] = () => `
<svg viewBox="0 0 120 120" width="110" height="110" aria-hidden="true">
  <ellipse cx="60" cy="102" rx="32" ry="5" fill="#3a2e5f" opacity="0.12"/>
  <!-- wings (behind body) -->
  <ellipse cx="40" cy="50" rx="16" ry="22" fill="#e6eaf2" opacity="0.75"/>
  <ellipse cx="80" cy="50" rx="16" ry="22" fill="#e6eaf2" opacity="0.75"/>
  <ellipse cx="40" cy="50" rx="16" ry="22" fill="none" stroke="#c4b5fd" stroke-width="1.4"/>
  <ellipse cx="80" cy="50" rx="16" ry="22" fill="none" stroke="#c4b5fd" stroke-width="1.4"/>
  <!-- body -->
  <ellipse cx="60" cy="72" rx="28" ry="22" fill="#f4c85a"/>
  <!-- stripes -->
  <path d="M36 62 Q60 56 84 62 L84 70 Q60 64 36 70 Z" fill="#3a2e5f"/>
  <path d="M38 82 Q60 88 82 82 L80 88 Q60 94 40 88 Z" fill="#3a2e5f"/>
  <!-- face -->
  <circle cx="60" cy="54" r="14" fill="#f4c85a"/>
  <circle cx="54" cy="52" r="2.8" fill="#3a2e5f"/>
  <circle cx="66" cy="52" r="2.8" fill="#3a2e5f"/>
  <circle cx="54.6" cy="51" r="1" fill="#fff"/>
  <circle cx="66.6" cy="51" r="1" fill="#fff"/>
  <path d="M56 60 Q60 63 64 60" stroke="#3a2e5f" stroke-width="1.6" fill="none" stroke-linecap="round"/>
  <!-- antennae -->
  <path d="M54 40 Q52 32 48 30" stroke="#3a2e5f" stroke-width="1.6" fill="none" stroke-linecap="round"/>
  <path d="M66 40 Q68 32 72 30" stroke="#3a2e5f" stroke-width="1.6" fill="none" stroke-linecap="round"/>
  <circle cx="48" cy="30" r="2" fill="#3a2e5f"/>
  <circle cx="72" cy="30" r="2" fill="#3a2e5f"/>
  <!-- cheek blush -->
  <circle cx="46" cy="58" r="3" fill="#ff9fb6" opacity="0.6"/>
  <circle cx="74" cy="58" r="3" fill="#ff9fb6" opacity="0.6"/>
</svg>`;
})();
