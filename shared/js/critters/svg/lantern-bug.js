/*!
 * critters/svg/lantern-bug.js — Baby Lantern Bug. A firefly that reads by night.
 */
(function () {
  window.MR = window.MR || {};
  window.MR.CritterSvg = window.MR.CritterSvg || {};
  window.MR.CritterSvg["baby-lantern-bug"] = () => `
<svg viewBox="0 0 120 120" width="110" height="110" aria-hidden="true">
  <circle cx="60" cy="72" r="32" fill="#fde68a" opacity="0.55"/>
  <ellipse cx="60" cy="64" rx="26" ry="30" fill="#4c1d95"/>
  <ellipse cx="42" cy="48" rx="18" ry="14" fill="#a78bfa" opacity="0.8"/>
  <ellipse cx="78" cy="48" rx="18" ry="14" fill="#a78bfa" opacity="0.8"/>
  <circle cx="52" cy="54" r="4" fill="#fff"/>
  <circle cx="68" cy="54" r="4" fill="#fff"/>
  <circle cx="52" cy="54" r="2" fill="#1f2937"/>
  <circle cx="68" cy="54" r="2" fill="#1f2937"/>
  <path d="M52 66 Q60 70 68 66" stroke="#fde68a" stroke-width="1.8" fill="none" stroke-linecap="round"/>
  <path d="M56 40 Q50 28 52 22" stroke="#4c1d95" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M64 40 Q70 28 68 22" stroke="#4c1d95" stroke-width="2" fill="none" stroke-linecap="round"/>
  <ellipse cx="60" cy="92" rx="14" ry="8" fill="#fde68a"/>
  <ellipse cx="60" cy="92" rx="8" ry="5" fill="#fef3c7"/>
</svg>`;
})();
