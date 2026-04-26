/*!
 * critters/svg/bookworm.js — Baby Bookworm. A bespectacled worm peeking from pages.
 */
(function () {
  window.MR = window.MR || {};
  window.MR.CritterSvg = window.MR.CritterSvg || {};
  window.MR.CritterSvg["baby-bookworm"] = () => `
<svg viewBox="0 0 120 120" width="110" height="110" aria-hidden="true">
  <rect x="14" y="68" width="92" height="40" rx="4" fill="#c4b5fd"/>
  <rect x="14" y="68" width="92" height="40" rx="4" fill="none" stroke="#6d28d9" stroke-width="2"/>
  <line x1="60" y1="68" x2="60" y2="108" stroke="#6d28d9" stroke-width="2"/>
  <path d="M22 78 h30 M22 86 h30 M22 94 h30 M68 78 h30 M68 86 h30 M68 94 h30" stroke="#ffffff" stroke-width="1.6" opacity="0.9"/>
  <ellipse cx="60" cy="60" rx="18" ry="18" fill="#86efac"/>
  <ellipse cx="60" cy="40" rx="14" ry="14" fill="#86efac"/>
  <circle cx="54" cy="38" r="6" fill="#fff"/>
  <circle cx="66" cy="38" r="6" fill="#fff"/>
  <circle cx="54" cy="38" r="2.5" fill="#1f2937"/>
  <circle cx="66" cy="38" r="2.5" fill="#1f2937"/>
  <circle cx="54" cy="38" r="6" fill="none" stroke="#1f2937" stroke-width="1.6"/>
  <circle cx="66" cy="38" r="6" fill="none" stroke="#1f2937" stroke-width="1.6"/>
  <line x1="60" y1="38" x2="60" y2="38" stroke="#1f2937" stroke-width="1.6"/>
  <path d="M56 46 Q60 50 64 46" stroke="#1f2937" stroke-width="1.6" fill="none" stroke-linecap="round"/>
</svg>`;
})();
