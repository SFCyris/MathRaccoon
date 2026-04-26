/*!
 * ui/raccoon.js — Math Raccoon mascot, inline SVG.
 * Ported from v1 (raccoon.js) — trademark: Math Raccoon™. See NOTICE.md.
 *
 * Expressions: "happy" (default), "cheer", "think", "wave"
 * Usage:
 *   MR.Raccoon.render("think", { size: 72 })  → SVG string
 *   MR.Raccoon.mount(target, "happy")         → inject & return root <svg>
 */
(function () {
  function render(expr = "happy", opts = {}) {
    const id = "rc" + Math.random().toString(36).slice(2, 8);
    const size = opts.size || 160;

    const mouths = {
      happy: `<path d="M90 130 Q100 142 110 130" stroke="#3a2e5f" stroke-width="4" fill="none" stroke-linecap="round"/>`,
      cheer: `<path d="M88 128 Q100 148 112 128 Q100 138 88 128 Z" fill="#3a2e5f"/>
              <path d="M95 140 Q100 144 105 140" stroke="#ff7a93" stroke-width="2" fill="none" stroke-linecap="round"/>`,
      think: `<path d="M92 134 Q100 130 108 134" stroke="#3a2e5f" stroke-width="4" fill="none" stroke-linecap="round"/>`,
      wave:  `<path d="M88 130 Q100 140 112 130" stroke="#3a2e5f" stroke-width="4" fill="none" stroke-linecap="round"/>`,
    };

    const eyes = (() => {
      if (expr === "cheer") {
        return `
          <path d="M72 103 Q80 96 88 103" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/>
          <path d="M112 103 Q120 96 128 103" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/>`;
      }
      if (expr === "think") {
        return `
          <g class="rc-eye">
            <circle cx="80" cy="104" r="9" fill="#fff"/>
            <circle cx="82" cy="106" r="4.5" fill="#3a2e5f"/>
            <circle cx="83.5" cy="104.5" r="1.6" fill="#fff"/>
          </g>
          <g class="rc-eye">
            <circle cx="120" cy="104" r="9" fill="#fff"/>
            <circle cx="122" cy="106" r="4.5" fill="#3a2e5f"/>
            <circle cx="123.5" cy="104.5" r="1.6" fill="#fff"/>
          </g>`;
      }
      return `
        <g class="rc-eye">
          <circle cx="80" cy="104" r="9" fill="#fff"/>
          <circle cx="80" cy="106" r="5" fill="#3a2e5f"/>
          <circle cx="82" cy="104" r="1.8" fill="#fff"/>
        </g>
        <g class="rc-eye">
          <circle cx="120" cy="104" r="9" fill="#fff"/>
          <circle cx="120" cy="106" r="5" fill="#3a2e5f"/>
          <circle cx="122" cy="104" r="1.8" fill="#fff"/>
        </g>`;
    })();

    const paw = expr === "wave"
      ? `<g class="rc-paw">
           <ellipse cx="165" cy="70" rx="14" ry="18" fill="#8a7ca8"/>
           <ellipse cx="165" cy="70" rx="9" ry="12" fill="#a69cc2"/>
         </g>`
      : "";

    const prop = expr === "think"
      ? `<g transform="translate(130, 140) rotate(-10)">
           <rect x="0" y="0" width="40" height="28" rx="3" fill="#ff7a93"/>
           <rect x="2" y="2" width="36" height="24" rx="2" fill="#fff8ed"/>
           <line x1="20" y1="2" x2="20" y2="26" stroke="#ff7a93" stroke-width="1"/>
           <text x="10" y="16" font-family="sans-serif" font-size="8" fill="#3a2e5f">1+1</text>
           <text x="25" y="16" font-family="sans-serif" font-size="8" fill="#3a2e5f">2</text>
         </g>`
      : "";

    return `
<svg viewBox="0 0 200 200" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"
     class="raccoon-svg" aria-hidden="true" data-id="${id}">
  <defs>
    <linearGradient id="${id}-fur" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#b8adcc"/>
      <stop offset="1" stop-color="#8a7ca8"/>
    </linearGradient>
    <radialGradient id="${id}-cheek" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="#ffb3c6" stop-opacity="0.9"/>
      <stop offset="1" stop-color="#ffb3c6" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <g class="rc-ear">
    <ellipse cx="55" cy="60" rx="18" ry="24" fill="url(#${id}-fur)"/>
    <ellipse cx="55" cy="62" rx="10" ry="14" fill="#ff9ab3"/>
  </g>
  <g class="rc-ear">
    <ellipse cx="145" cy="60" rx="18" ry="24" fill="url(#${id}-fur)"/>
    <ellipse cx="145" cy="62" rx="10" ry="14" fill="#ff9ab3"/>
  </g>

  <ellipse cx="100" cy="110" rx="62" ry="58" fill="url(#${id}-fur)"/>

  <path d="M40 102 Q100 70 160 102 Q155 125 140 120 Q120 112 100 112 Q80 112 60 120 Q45 125 40 102 Z"
        fill="#3a2e5f"/>

  <ellipse cx="100" cy="125" rx="32" ry="22" fill="#fff8ed"/>

  <ellipse cx="66" cy="128" rx="14" ry="10" fill="url(#${id}-cheek)"/>
  <ellipse cx="134" cy="128" rx="14" ry="10" fill="url(#${id}-cheek)"/>

  ${eyes}

  <ellipse cx="100" cy="120" rx="6" ry="4.5" fill="#3a2e5f"/>
  <ellipse cx="98" cy="118.5" rx="1.5" ry="1" fill="#fff"/>

  ${mouths[expr] || mouths.happy}

  <g transform="translate(140, 80)">
    <path d="M0 0 L8 -6 L8 6 Z" fill="#ff7a93"/>
    <path d="M0 0 L-8 -6 L-8 6 Z" fill="#ff7a93"/>
    <circle cx="0" cy="0" r="3" fill="#ffd93d"/>
  </g>

  ${paw}
  ${prop}
</svg>`;
  }

  function mount(target, expr, opts) {
    const el = typeof target === "string" ? document.querySelector(target) : target;
    if (!el) return null;
    el.innerHTML = render(expr, opts);
    return el.firstElementChild;
  }

  window.MR = window.MR || {};
  window.MR.Raccoon = { render, mount };
})();
