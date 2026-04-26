/*!
 * ui/scenery.js — playful background scene (trees, flowers, clouds, creatures).
 * Ported from v1 animations.js. Calm mode (body.calm-mode) hides .bg-creature
 * via base.css, so this module is safe to mount unconditionally.
 *
 * Usage:
 *   MR.Scenery.mount()  → inject into #background-scene
 */
(function () {
  const SCENERY = [
    {
      svg: () => `
        <svg viewBox="0 0 140 220" width="140" height="220" aria-hidden="true">
          <rect x="62" y="130" width="16" height="85" rx="4" fill="#8b5a3c"/>
          <ellipse cx="50" cy="92"  rx="44" ry="40" fill="#6ee7b7"/>
          <ellipse cx="92" cy="80"  rx="46" ry="42" fill="#5eead4"/>
          <ellipse cx="72" cy="60"  rx="38" ry="34" fill="#86efac"/>
          <circle  cx="56" cy="70"  r="4" fill="#ff7a93" opacity="0.7"/>
          <circle  cx="92" cy="72"  r="4" fill="#ffd93d" opacity="0.7"/>
          <circle  cx="78" cy="48"  r="4" fill="#c4b5fd" opacity="0.7"/>
        </svg>`,
      style: "bottom: 0; left: -2%; width: 140px; height: 220px;",
      anim: "tree-sway 6s ease-in-out infinite",
    },
    {
      svg: () => `
        <svg viewBox="0 0 140 220" width="140" height="220" aria-hidden="true">
          <rect x="62" y="130" width="16" height="85" rx="4" fill="#7a4e33"/>
          <ellipse cx="48" cy="84"  rx="42" ry="38" fill="#86efac"/>
          <ellipse cx="90" cy="90"  rx="46" ry="40" fill="#6ee7b7"/>
          <ellipse cx="68" cy="54"  rx="36" ry="30" fill="#a7f3d0"/>
          <circle  cx="44" cy="70"  r="4" fill="#ff7a93" opacity="0.7"/>
          <circle  cx="98" cy="78"  r="4" fill="#ffd93d" opacity="0.7"/>
        </svg>`,
      style: "bottom: 0; right: -2%; width: 140px; height: 220px;",
      anim: "tree-sway 7s ease-in-out infinite reverse",
    },
    {
      svg: () => `
        <svg viewBox="0 0 160 80" width="160" height="80" aria-hidden="true">
          <rect x="30"  y="50" width="3" height="26" fill="#10b981"/>
          <rect x="70"  y="40" width="3" height="36" fill="#10b981"/>
          <rect x="110" y="52" width="3" height="24" fill="#10b981"/>
          <g transform="translate(31,50)"><circle cx="0" cy="0" r="10" fill="#ff7a93"/><circle cx="0" cy="0" r="3" fill="#ffd93d"/></g>
          <g transform="translate(71,40)"><circle cx="0" cy="0" r="12" fill="#c4b5fd"/><circle cx="0" cy="0" r="4" fill="#ffd93d"/></g>
          <g transform="translate(111,52)"><circle cx="0" cy="0" r="9"  fill="#ffb077"/><circle cx="0" cy="0" r="3" fill="#ffd93d"/></g>
        </svg>`,
      style: "bottom: 0; left: 18%; width: 160px; height: 80px;",
      anim: "flower-wiggle 4.5s ease-in-out infinite",
    },
    {
      svg: () => `
        <svg viewBox="0 0 160 80" width="160" height="80" aria-hidden="true">
          <rect x="20"  y="45" width="3" height="30" fill="#10b981"/>
          <rect x="55"  y="52" width="3" height="24" fill="#10b981"/>
          <rect x="95"  y="40" width="3" height="36" fill="#10b981"/>
          <rect x="130" y="50" width="3" height="26" fill="#10b981"/>
          <g transform="translate(21,45)"><circle cx="0" cy="0" r="11" fill="#7dd3fc"/><circle cx="0" cy="0" r="4" fill="#fff"/></g>
          <g transform="translate(56,52)"><circle cx="0" cy="0" r="9"  fill="#ff7a93"/><circle cx="0" cy="0" r="3" fill="#ffd93d"/></g>
          <g transform="translate(96,40)"><circle cx="0" cy="0" r="12" fill="#ffd93d"/><circle cx="0" cy="0" r="4" fill="#ff7a93"/></g>
          <g transform="translate(131,50)"><circle cx="0" cy="0" r="10" fill="#c4b5fd"/><circle cx="0" cy="0" r="3" fill="#fff"/></g>
        </svg>`,
      style: "bottom: 0; right: 16%; width: 160px; height: 80px;",
      anim: "flower-wiggle 5.2s ease-in-out infinite reverse",
    },
  ];

  const CLOUDS = [
    { top: "6%",  size: 160, speed: 80,  delay: 0,   opacity: 0.92 },
    { top: "12%", size: 110, speed: 110, delay: -40, opacity: 0.82 },
    { top: "22%", size: 200, speed: 95,  delay: -65, opacity: 0.88 },
    { top: "32%", size: 130, speed: 120, delay: -15, opacity: 0.78 },
  ];
  function cloudSvg(size) {
    return `
      <svg viewBox="0 0 180 80" width="${size}" height="${Math.round(size * 0.45)}" aria-hidden="true">
        <ellipse cx="40"  cy="52" rx="32" ry="22" fill="#ffffff"/>
        <ellipse cx="82"  cy="40" rx="42" ry="30" fill="#ffffff"/>
        <ellipse cx="130" cy="48" rx="34" ry="26" fill="#ffffff"/>
        <ellipse cx="160" cy="56" rx="20" ry="16" fill="#ffffff"/>
      </svg>`;
  }

  const CREATURES = [
    {
      svg: () => `
        <svg viewBox="0 0 120 120" width="80" height="80" aria-hidden="true">
          <ellipse cx="45" cy="30" rx="8" ry="22" fill="#ffd6e0"/>
          <ellipse cx="75" cy="30" rx="8" ry="22" fill="#ffd6e0"/>
          <ellipse cx="45" cy="30" rx="4" ry="14" fill="#ff9ab3"/>
          <ellipse cx="75" cy="30" rx="4" ry="14" fill="#ff9ab3"/>
          <circle  cx="60" cy="70" r="36" fill="#fff4f7"/>
          <circle  cx="48" cy="65" r="4"  fill="#3a2e5f"/>
          <circle  cx="72" cy="65" r="4"  fill="#3a2e5f"/>
          <ellipse cx="60" cy="80" rx="4" ry="3" fill="#ff7a93"/>
          <path d="M54 85 Q60 92 66 85" stroke="#3a2e5f" stroke-width="2" fill="none" stroke-linecap="round"/>
        </svg>`,
      style: "bottom: 8%; left: -10%;",
      anim: "drift-right 42s linear infinite, hop 1.4s ease-in-out infinite",
    },
    {
      svg: () => `
        <svg viewBox="0 0 100 80" width="64" height="50" aria-hidden="true">
          <ellipse cx="50" cy="40" rx="3" ry="18" fill="#3a2e5f"/>
          <path class="bwing" d="M50 40 Q20 10 25 45 Q35 55 50 40 Z" fill="#c4b5fd"/>
          <path class="bwing" d="M50 40 Q80 10 75 45 Q65 55 50 40 Z" fill="#c4b5fd"/>
          <path d="M50 40 Q25 55 32 70 Q45 68 50 45 Z" fill="#ff7a93"/>
          <path d="M50 40 Q75 55 68 70 Q55 68 50 45 Z" fill="#ff7a93"/>
          <circle cx="47" cy="20" r="2" fill="#3a2e5f"/>
          <circle cx="53" cy="20" r="2" fill="#3a2e5f"/>
        </svg>`,
      style: "top: 55%; left: -8%;",
      anim: "wander 28s linear infinite, flutter 0.4s ease-in-out infinite",
    },
    {
      svg: () => `
        <svg viewBox="0 0 100 80" width="70" height="56" aria-hidden="true">
          <ellipse cx="50" cy="50" rx="28" ry="20" fill="#7dd3fc"/>
          <circle  cx="72" cy="42" r="14" fill="#7dd3fc"/>
          <circle  cx="76" cy="40" r="3"  fill="#3a2e5f"/>
          <polygon points="86,42 95,44 86,46" fill="#ffd93d"/>
          <path class="wing" d="M30 45 Q40 20 55 40 Q40 48 30 45 Z" fill="#60a5fa"/>
        </svg>`,
      style: "top: 22%; left: -10%;",
      anim: "drift-right 38s linear infinite, flap 0.35s ease-in-out infinite",
    },
  ];

  const ANIM_CSS = `
    @keyframes drift-right {
      0%   { transform: translateX(-20vw); }
      100% { transform: translateX(120vw); }
    }
    @keyframes cloud-drift {
      0%   { transform: translateX(-30vw); }
      100% { transform: translateX(130vw); }
    }
    @keyframes tree-sway {
      0%, 100% { transform: rotate(-1.2deg); }
      50%      { transform: rotate(1.2deg); }
    }
    @keyframes flower-wiggle {
      0%, 100% { transform: translateY(0) rotate(-1deg); }
      50%      { transform: translateY(-3px) rotate(1deg); }
    }
    @keyframes hop {
      0%, 100% { transform: translateY(0); }
      50%      { transform: translateY(-20px); }
    }
    @keyframes flap {
      0%, 100% { transform: rotate(-10deg); }
      50%      { transform: rotate(15deg); }
    }
    @keyframes flutter {
      0%, 100% { transform: rotate(-8deg) scale(1); }
      50%      { transform: rotate(8deg)  scale(1.05); }
    }
    @keyframes wander {
      0%   { transform: translate(-10vw, 0); }
      25%  { transform: translate(30vw, -30px); }
      50%  { transform: translate(60vw, 20px); }
      75%  { transform: translate(90vw, -20px); }
      100% { transform: translate(120vw, 0); }
    }
    @keyframes sparkle-twinkle {
      0%, 100% { opacity: 0.3; transform: scale(0.8) rotate(0deg); }
      50%      { opacity: 1;   transform: scale(1.3) rotate(180deg); }
    }
    .bg-creature .wing  { transform-origin: 35% 50%; }
    .bg-creature .bwing { transform-origin: 50% 40%; }
    .raccoon-svg .rc-eye { transform-origin: center; animation: blink 5.5s ease-in-out infinite; }
    .raccoon-svg .rc-ear { animation: ear-twitch 7s ease-in-out infinite; }
    .raccoon-svg .rc-paw { transform-origin: 165px 88px; animation: wave-paw 1.2s ease-in-out infinite; }
    @keyframes blink {
      0%, 92%, 100% { transform: scaleY(1); }
      95%           { transform: scaleY(0.15); }
    }
    @keyframes ear-twitch {
      0%, 100% { transform: rotate(0deg); }
      70%      { transform: rotate(-4deg); }
      80%      { transform: rotate(2deg); }
      90%      { transform: rotate(-1deg); }
    }
    @keyframes wave-paw {
      0%, 100% { transform: rotate(-10deg); }
      50%      { transform: rotate(25deg); }
    }
  `;

  function ensureStyle() {
    if (document.getElementById("mr-scenery-style")) return;
    const s = document.createElement("style");
    s.id = "mr-scenery-style";
    s.textContent = ANIM_CSS;
    document.head.appendChild(s);
  }

  function mount(container) {
    if (!container) container = document.getElementById("background-scene");
    if (!container) return;
    ensureStyle();
    container.innerHTML = "";

    CLOUDS.forEach((c) => {
      const wrap = document.createElement("div");
      wrap.className = "bg-creature bg-cloud";
      wrap.style.cssText =
        `top:${c.top}; left:-30vw; opacity:${c.opacity};` +
        `animation: cloud-drift ${c.speed}s linear infinite;` +
        `animation-delay:${c.delay}s; transform-origin:center;` +
        `filter: drop-shadow(0 6px 12px rgba(120,110,160,0.12));`;
      wrap.innerHTML = cloudSvg(c.size);
      container.appendChild(wrap);
    });

    SCENERY.forEach((s) => {
      const wrap = document.createElement("div");
      wrap.className = "bg-creature bg-scenery";
      wrap.style.cssText = s.style + `;animation: ${s.anim}; transform-origin: 50% 100%;`;
      wrap.innerHTML = s.svg();
      container.appendChild(wrap);
    });

    CREATURES.forEach((c, i) => {
      const wrap = document.createElement("div");
      wrap.className = "bg-creature";
      wrap.style.cssText = c.style + `animation: ${c.anim}; animation-delay: ${-i * 3}s;`;
      wrap.innerHTML = c.svg();
      container.appendChild(wrap);
    });

    const sparkles = document.createElement("div");
    sparkles.className = "bg-sparkles";
    sparkles.setAttribute("aria-hidden", "true");
    sparkles.innerHTML = `
      <span class="bg-sparkle" style="top:12%;left:8%;animation-delay:0s;">✦</span>
      <span class="bg-sparkle" style="top:18%;left:88%;animation-delay:.6s;color:var(--c-coral);">✧</span>
      <span class="bg-sparkle" style="top:70%;left:6%;animation-delay:1.1s;color:var(--c-mint);">✦</span>
      <span class="bg-sparkle" style="top:58%;left:92%;animation-delay:1.6s;color:var(--c-berry);">✧</span>
    `;
    container.appendChild(sparkles);
  }

  window.MR = window.MR || {};
  window.MR.Scenery = { mount };
})();
