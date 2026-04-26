/*!
 * ui/readingRaccoon.js — Reading Raccoon mascot, inline SVG.
 * Older scholarly raccoon with round glasses, always holding a book.
 *
 * Expressions: "happy" (default), "read", "cheer", "wave"
 * Usage:
 *   MR.ReadingRaccoon.render("read", { size: 160 })  → SVG string
 *   MR.ReadingRaccoon.mount(target, "happy")         → inject & return root <svg>
 */
(function () {
  function render(expr = "happy", opts = {}) {
    const id = "rr" + Math.random().toString(36).slice(2, 8);
    const size = opts.size || 160;

    const mouths = {
      happy: `<path d="M90 132 Q100 142 110 132" stroke="#3a2e5f" stroke-width="3.5" fill="none" stroke-linecap="round"/>`,
      read:  `<path d="M94 134 Q100 138 106 134" stroke="#3a2e5f" stroke-width="3" fill="none" stroke-linecap="round"/>`,
      cheer: `<path d="M88 130 Q100 150 112 130 Q100 140 88 130 Z" fill="#3a2e5f"/>`,
      wave:  `<path d="M88 132 Q100 142 112 132" stroke="#3a2e5f" stroke-width="3.5" fill="none" stroke-linecap="round"/>`,
    };

    const eyeWhisker = `
      <path d="M58 116 L40 112" stroke="#d6cfe3" stroke-width="1.3" stroke-linecap="round"/>
      <path d="M58 120 L40 122" stroke="#d6cfe3" stroke-width="1.3" stroke-linecap="round"/>
      <path d="M142 116 L160 112" stroke="#d6cfe3" stroke-width="1.3" stroke-linecap="round"/>
      <path d="M142 120 L160 122" stroke="#d6cfe3" stroke-width="1.3" stroke-linecap="round"/>`;

    const eyes = (() => {
      if (expr === "cheer") {
        return `
          <path d="M72 103 Q80 96 88 103" stroke="#fff" stroke-width="4.5" fill="none" stroke-linecap="round"/>
          <path d="M112 103 Q120 96 128 103" stroke="#fff" stroke-width="4.5" fill="none" stroke-linecap="round"/>`;
      }
      if (expr === "read") {
        return `
          <g class="rr-eye">
            <circle cx="80" cy="105" r="7" fill="#fff"/>
            <circle cx="80" cy="107" r="3.5" fill="#3a2e5f"/>
          </g>
          <g class="rr-eye">
            <circle cx="120" cy="105" r="7" fill="#fff"/>
            <circle cx="120" cy="107" r="3.5" fill="#3a2e5f"/>
          </g>`;
      }
      return `
        <g class="rr-eye">
          <circle cx="80" cy="104" r="8" fill="#fff"/>
          <circle cx="80" cy="106" r="4.5" fill="#3a2e5f"/>
          <circle cx="82" cy="104" r="1.6" fill="#fff"/>
        </g>
        <g class="rr-eye">
          <circle cx="120" cy="104" r="8" fill="#fff"/>
          <circle cx="120" cy="106" r="4.5" fill="#3a2e5f"/>
          <circle cx="122" cy="104" r="1.6" fill="#fff"/>
        </g>`;
    })();

    // Round scholarly glasses that sit over the eyes
    const glasses = `
      <g class="rr-glasses">
        <circle cx="80" cy="106" r="14" fill="none" stroke="#3a2e5f" stroke-width="2.8"/>
        <circle cx="120" cy="106" r="14" fill="none" stroke="#3a2e5f" stroke-width="2.8"/>
        <line x1="94" y1="106" x2="106" y2="106" stroke="#3a2e5f" stroke-width="2.6" stroke-linecap="round"/>
        <line x1="66" y1="102" x2="58" y2="98" stroke="#3a2e5f" stroke-width="2.4" stroke-linecap="round"/>
        <line x1="134" y1="102" x2="142" y2="98" stroke="#3a2e5f" stroke-width="2.4" stroke-linecap="round"/>
        <path d="M72 100 Q76 96 82 98" stroke="#fff" stroke-width="1.4" fill="none" stroke-linecap="round" opacity="0.7"/>
        <path d="M112 100 Q116 96 122 98" stroke="#fff" stroke-width="1.4" fill="none" stroke-linecap="round" opacity="0.7"/>
      </g>`;

    // Tiny gray "wisdom streaks" on the brow (older character cue)
    const brows = `
      <path d="M66 88 Q74 84 84 88" stroke="#ebe5f3" stroke-width="2.2" fill="none" stroke-linecap="round"/>
      <path d="M116 88 Q126 84 134 88" stroke="#ebe5f3" stroke-width="2.2" fill="none" stroke-linecap="round"/>`;

    // Bow tie — a scholarly flourish
    const bowTie = `
      <g transform="translate(100, 170)">
        <path d="M0 0 L-14 -7 L-14 7 Z" fill="#6e5bd1"/>
        <path d="M0 0 L14 -7 L14 7 Z" fill="#6e5bd1"/>
        <circle cx="0" cy="0" r="3" fill="#ffd93d"/>
      </g>`;

    // The ever-present book — tilted slightly, a soft gradient cover and visible pages
    const book = (() => {
      if (expr === "wave") {
        // Book tucked under arm; simpler silhouette
        return `
          <g transform="translate(34, 150) rotate(-12)" class="rr-book">
            <rect x="0" y="0" width="40" height="28" rx="2" fill="#6e5bd1"/>
            <rect x="3" y="3" width="34" height="22" rx="1.5" fill="#fff8ed"/>
            <line x1="20" y1="3" x2="20" y2="25" stroke="#c9bfe2" stroke-width="1"/>
          </g>`;
      }
      // Open book held in paws — center-bottom
      return `
        <g transform="translate(100, 168)" class="rr-book">
          <g transform="translate(-42, 0)">
            <path d="M0 0 Q42 -6 84 0 L84 34 Q42 40 0 34 Z" fill="#6e5bd1"/>
            <path d="M2 2 Q42 -3 82 2 L82 32 Q42 37 2 32 Z" fill="#fff8ed"/>
            <line x1="42" y1="-2" x2="42" y2="36" stroke="#d6cfe3" stroke-width="1.2"/>
            <g fill="#3a2e5f" opacity="0.55">
              <rect x="8"  y="8"  width="24" height="2" rx="1"/>
              <rect x="8"  y="13" width="28" height="2" rx="1"/>
              <rect x="8"  y="18" width="20" height="2" rx="1"/>
              <rect x="8"  y="23" width="26" height="2" rx="1"/>
              <rect x="50" y="8"  width="24" height="2" rx="1"/>
              <rect x="50" y="13" width="20" height="2" rx="1"/>
              <rect x="50" y="18" width="28" height="2" rx="1"/>
              <rect x="50" y="23" width="22" height="2" rx="1"/>
            </g>
          </g>
          <g class="rr-paw-l">
            <ellipse cx="-40" cy="18" rx="8" ry="10" fill="#8a7ca8"/>
            <ellipse cx="-40" cy="18" rx="5" ry="7" fill="#a69cc2"/>
          </g>
          <g class="rr-paw-r">
            <ellipse cx="40" cy="18" rx="8" ry="10" fill="#8a7ca8"/>
            <ellipse cx="40" cy="18" rx="5" ry="7" fill="#a69cc2"/>
          </g>
        </g>`;
    })();

    const wavePaw = expr === "wave"
      ? `<g class="rr-wave">
           <ellipse cx="168" cy="78" rx="12" ry="15" fill="#8a7ca8"/>
           <ellipse cx="168" cy="78" rx="7" ry="10" fill="#a69cc2"/>
         </g>`
      : "";

    return `
<svg viewBox="0 0 200 210" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"
     class="reading-raccoon-svg" aria-hidden="true" data-id="${id}">
  <defs>
    <linearGradient id="${id}-fur" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#c3b8d4"/>
      <stop offset="1" stop-color="#8a7ca8"/>
    </linearGradient>
    <radialGradient id="${id}-cheek" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="#ffb3c6" stop-opacity="0.8"/>
      <stop offset="1" stop-color="#ffb3c6" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <g class="rr-ear">
    <ellipse cx="55" cy="60" rx="18" ry="24" fill="url(#${id}-fur)"/>
    <ellipse cx="55" cy="62" rx="10" ry="14" fill="#ff9ab3"/>
    <path d="M50 45 Q54 40 60 45" stroke="#ebe5f3" stroke-width="1.6" fill="none" stroke-linecap="round"/>
  </g>
  <g class="rr-ear">
    <ellipse cx="145" cy="60" rx="18" ry="24" fill="url(#${id}-fur)"/>
    <ellipse cx="145" cy="62" rx="10" ry="14" fill="#ff9ab3"/>
    <path d="M140 45 Q144 40 150 45" stroke="#ebe5f3" stroke-width="1.6" fill="none" stroke-linecap="round"/>
  </g>

  <ellipse cx="100" cy="110" rx="62" ry="58" fill="url(#${id}-fur)"/>

  <path d="M40 102 Q100 70 160 102 Q155 125 140 120 Q120 112 100 112 Q80 112 60 120 Q45 125 40 102 Z"
        fill="#3a2e5f"/>

  ${brows}
  ${eyeWhisker}

  <ellipse cx="100" cy="126" rx="32" ry="22" fill="#fff8ed"/>

  <ellipse cx="66" cy="128" rx="14" ry="10" fill="url(#${id}-cheek)"/>
  <ellipse cx="134" cy="128" rx="14" ry="10" fill="url(#${id}-cheek)"/>

  ${eyes}
  ${glasses}

  <ellipse cx="100" cy="121" rx="5.5" ry="4" fill="#3a2e5f"/>
  <ellipse cx="98" cy="119.5" rx="1.4" ry="1" fill="#fff"/>

  ${mouths[expr] || mouths.happy}

  ${bowTie}
  ${book}
  ${wavePaw}
</svg>`;
  }

  function mount(target, expr, opts) {
    const el = typeof target === "string" ? document.querySelector(target) : target;
    if (!el) return null;
    el.innerHTML = render(expr, opts);
    return el.firstElementChild;
  }

  window.MR = window.MR || {};
  window.MR.ReadingRaccoon = { render, mount };
})();
