/*! critters/svg/hamster.js — Baby Hamster SVG. */
(function () {
  window.MR = window.MR || {};
  window.MR.CritterSvg = window.MR.CritterSvg || {};
  window.MR.CritterSvg["baby-hamster"] = () => `
<svg viewBox="0 0 120 120" width="110" height="110" aria-hidden="true">
  <ellipse cx="60" cy="102" rx="32" ry="5" fill="#3a2e5f" opacity="0.12"/>
  <!-- body -->
  <ellipse cx="60" cy="76" rx="36" ry="26" fill="#f2c68d"/>
  <ellipse cx="60" cy="80" rx="26" ry="18" fill="#fff2de"/>
  <!-- ears -->
  <ellipse cx="38" cy="48" rx="6" ry="7" fill="#f2c68d"/>
  <ellipse cx="82" cy="48" rx="6" ry="7" fill="#f2c68d"/>
  <ellipse cx="38" cy="49" rx="3" ry="4" fill="#f7b0a8"/>
  <ellipse cx="82" cy="49" rx="3" ry="4" fill="#f7b0a8"/>
  <!-- cheek pouches -->
  <circle cx="34" cy="76" r="9" fill="#f4d5a8"/>
  <circle cx="86" cy="76" r="9" fill="#f4d5a8"/>
  <!-- eyes -->
  <circle cx="48" cy="66" r="3" fill="#3a2e5f"/>
  <circle cx="72" cy="66" r="3" fill="#3a2e5f"/>
  <circle cx="48.8" cy="65" r="1.1" fill="#fff"/>
  <circle cx="72.8" cy="65" r="1.1" fill="#fff"/>
  <!-- nose -->
  <ellipse cx="60" cy="76" rx="2" ry="1.3" fill="#d97a82"/>
  <!-- mouth -->
  <path d="M56 80 Q60 83 64 80" stroke="#3a2e5f" stroke-width="1.4" fill="none" stroke-linecap="round"/>
  <!-- tiny paws -->
  <circle cx="42" cy="96" r="5" fill="#f2c68d"/>
  <circle cx="78" cy="96" r="5" fill="#f2c68d"/>
</svg>`;
})();
