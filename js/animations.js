/**
 * animations.js — playful abstract creatures drifting across the background.
 *
 * Each creature is an SVG "blob" with a face, sized and timed so the scene
 * feels alive but not busy or overstimulating. Motion is smooth and loops.
 */
(function () {
  // ---------- Static scenery: rooted at the bottom, sway gently. ----------
  const SCENERY = [
    {
      name: "tree-left",
      svg: () => `
        <svg viewBox="0 0 140 220" width="140" height="220" aria-hidden="true">
          <rect x="62" y="130" width="16" height="85" rx="4" fill="#8b5a3c"/>
          <ellipse cx="50" cy="92" rx="44" ry="40" fill="#6ee7b7"/>
          <ellipse cx="92" cy="80" rx="46" ry="42" fill="#5eead4"/>
          <ellipse cx="72" cy="60" rx="38" ry="34" fill="#86efac"/>
          <circle cx="56" cy="70" r="4" fill="#ff7a93" opacity="0.7"/>
          <circle cx="92" cy="72" r="4" fill="#ffd93d" opacity="0.7"/>
          <circle cx="78" cy="48" r="4" fill="#c4b5fd" opacity="0.7"/>
        </svg>`,
      style: "bottom: 0; left: -2%; width: 140px; height: 220px;",
      anim: "tree-sway 6s ease-in-out infinite",
    },
    {
      name: "tree-right",
      svg: () => `
        <svg viewBox="0 0 140 220" width="140" height="220" aria-hidden="true">
          <rect x="62" y="130" width="16" height="85" rx="4" fill="#7a4e33"/>
          <ellipse cx="48" cy="84" rx="42" ry="38" fill="#86efac"/>
          <ellipse cx="90" cy="90" rx="46" ry="40" fill="#6ee7b7"/>
          <ellipse cx="68" cy="54" rx="36" ry="30" fill="#a7f3d0"/>
          <circle cx="44" cy="70" r="4" fill="#ff7a93" opacity="0.7"/>
          <circle cx="98" cy="78" r="4" fill="#ffd93d" opacity="0.7"/>
        </svg>`,
      style: "bottom: 0; right: -2%; width: 140px; height: 220px;",
      anim: "tree-sway 7s ease-in-out infinite reverse",
    },
    {
      name: "flower-cluster-1",
      svg: () => `
        <svg viewBox="0 0 160 80" width="160" height="80" aria-hidden="true">
          <rect x="30" y="50" width="3" height="26" fill="#10b981"/>
          <rect x="70" y="40" width="3" height="36" fill="#10b981"/>
          <rect x="110" y="52" width="3" height="24" fill="#10b981"/>
          <g transform="translate(31,50)"><circle cx="0" cy="0" r="10" fill="#ff7a93"/><circle cx="0" cy="0" r="3" fill="#ffd93d"/></g>
          <g transform="translate(71,40)"><circle cx="0" cy="0" r="12" fill="#c4b5fd"/><circle cx="0" cy="0" r="4" fill="#ffd93d"/></g>
          <g transform="translate(111,52)"><circle cx="0" cy="0" r="9" fill="#ffb077"/><circle cx="0" cy="0" r="3" fill="#ffd93d"/></g>
        </svg>`,
      style: "bottom: 0; left: 18%; width: 160px; height: 80px;",
      anim: "flower-wiggle 4.5s ease-in-out infinite",
    },
    {
      name: "flower-cluster-2",
      svg: () => `
        <svg viewBox="0 0 160 80" width="160" height="80" aria-hidden="true">
          <rect x="20" y="45" width="3" height="30" fill="#10b981"/>
          <rect x="55" y="52" width="3" height="24" fill="#10b981"/>
          <rect x="95" y="40" width="3" height="36" fill="#10b981"/>
          <rect x="130" y="50" width="3" height="26" fill="#10b981"/>
          <g transform="translate(21,45)"><circle cx="0" cy="0" r="11" fill="#7dd3fc"/><circle cx="0" cy="0" r="4" fill="#fff"/></g>
          <g transform="translate(56,52)"><circle cx="0" cy="0" r="9" fill="#ff7a93"/><circle cx="0" cy="0" r="3" fill="#ffd93d"/></g>
          <g transform="translate(96,40)"><circle cx="0" cy="0" r="12" fill="#ffd93d"/><circle cx="0" cy="0" r="4" fill="#ff7a93"/></g>
          <g transform="translate(131,50)"><circle cx="0" cy="0" r="10" fill="#c4b5fd"/><circle cx="0" cy="0" r="3" fill="#fff"/></g>
        </svg>`,
      style: "bottom: 0; right: 16%; width: 160px; height: 80px;",
      anim: "flower-wiggle 5.2s ease-in-out infinite reverse",
    },
  ];

  // ---------- Plain white clouds: drift slowly across the sky ----------
  const CLOUDS = [
    { top: "6%",  size: 160, speed: 80, delay: 0,   opacity: 0.92 },
    { top: "12%", size: 110, speed: 110, delay: -40, opacity: 0.82 },
    { top: "22%", size: 200, speed: 95, delay: -65, opacity: 0.88 },
    { top: "32%", size: 130, speed: 120, delay: -15, opacity: 0.78 },
  ];
  function cloudSvg(size) {
    // plain rounded cloud, no face
    return `
      <svg viewBox="0 0 180 80" width="${size}" height="${Math.round(size * 0.45)}" aria-hidden="true">
        <ellipse cx="40" cy="52" rx="32" ry="22" fill="#ffffff"/>
        <ellipse cx="82" cy="40" rx="42" ry="30" fill="#ffffff"/>
        <ellipse cx="130" cy="48" rx="34" ry="26" fill="#ffffff"/>
        <ellipse cx="160" cy="56" rx="20" ry="16" fill="#ffffff"/>
      </svg>`;
  }

  const CREATURES = [
    {
      name: "bunny",
      svg: (id) => `
        <svg viewBox="0 0 120 120" width="80" height="80" aria-hidden="true">
          <ellipse cx="45" cy="30" rx="8" ry="22" fill="#ffd6e0"/>
          <ellipse cx="75" cy="30" rx="8" ry="22" fill="#ffd6e0"/>
          <ellipse cx="45" cy="30" rx="4" ry="14" fill="#ff9ab3"/>
          <ellipse cx="75" cy="30" rx="4" ry="14" fill="#ff9ab3"/>
          <circle cx="60" cy="70" r="36" fill="#fff4f7"/>
          <circle cx="48" cy="65" r="4" fill="#3a2e5f"/>
          <circle cx="72" cy="65" r="4" fill="#3a2e5f"/>
          <ellipse cx="60" cy="80" rx="4" ry="3" fill="#ff7a93"/>
          <path d="M54 85 Q60 92 66 85" stroke="#3a2e5f" stroke-width="2" fill="none" stroke-linecap="round"/>
        </svg>`,
      style: "bottom: 8%; left: -10%;",
      anim: "drift-right 42s linear infinite, hop 1.4s ease-in-out infinite",
    },
    {
      name: "cloud",
      svg: () => `
        <svg viewBox="0 0 140 80" width="140" height="80" aria-hidden="true">
          <ellipse cx="40" cy="50" rx="30" ry="22" fill="#fff"/>
          <ellipse cx="75" cy="40" rx="35" ry="28" fill="#fff"/>
          <ellipse cx="110" cy="52" rx="25" ry="20" fill="#fff"/>
          <circle cx="60" cy="45" r="3" fill="#3a2e5f"/>
          <circle cx="85" cy="45" r="3" fill="#3a2e5f"/>
          <path d="M65 55 Q73 60 80 55" stroke="#3a2e5f" stroke-width="2" fill="none" stroke-linecap="round"/>
          <ellipse cx="55" cy="52" rx="4" ry="2" fill="#ff9ab3" opacity="0.6"/>
          <ellipse cx="90" cy="52" rx="4" ry="2" fill="#ff9ab3" opacity="0.6"/>
        </svg>`,
      style: "top: 8%; left: -15%;",
      anim: "drift-right 65s linear infinite, sway 6s ease-in-out infinite",
    },
    {
      name: "bird",
      svg: () => `
        <svg viewBox="0 0 100 80" width="70" height="56" aria-hidden="true">
          <ellipse cx="50" cy="50" rx="28" ry="20" fill="#7dd3fc"/>
          <circle cx="72" cy="42" r="14" fill="#7dd3fc"/>
          <circle cx="76" cy="40" r="3" fill="#3a2e5f"/>
          <polygon points="86,42 95,44 86,46" fill="#ffd93d"/>
          <path class="wing" d="M30 45 Q40 20 55 40 Q40 48 30 45 Z" fill="#60a5fa"/>
        </svg>`,
      style: "top: 22%; left: -10%;",
      anim: "drift-right 38s linear infinite, flap 0.35s ease-in-out infinite",
    },
    {
      name: "butterfly",
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
      name: "star",
      svg: () => `
        <svg viewBox="0 0 60 60" width="50" height="50" aria-hidden="true">
          <polygon points="30,4 36,22 55,22 40,34 46,54 30,42 14,54 20,34 5,22 24,22"
                   fill="#ffd93d" stroke="#f59e0b" stroke-width="2"/>
          <circle cx="25" cy="28" r="2" fill="#3a2e5f"/>
          <circle cx="35" cy="28" r="2" fill="#3a2e5f"/>
          <path d="M26 34 Q30 38 34 34" stroke="#3a2e5f" stroke-width="1.5" fill="none" stroke-linecap="round"/>
        </svg>`,
      style: "top: 42%; left: -6%;",
      anim: "drift-right 50s linear infinite, spin 10s linear infinite",
    },
    {
      name: "fish-apple",
      svg: () => `
        <svg viewBox="0 0 100 100" width="60" height="60" aria-hidden="true">
          <circle cx="50" cy="55" r="34" fill="#ff7a93"/>
          <path d="M50 24 Q55 14 65 20" stroke="#10b981" stroke-width="4" fill="none" stroke-linecap="round"/>
          <ellipse cx="60" cy="20" rx="8" ry="4" fill="#10b981"/>
          <circle cx="42" cy="50" r="3.5" fill="#fff"/>
          <circle cx="42" cy="51" r="2" fill="#3a2e5f"/>
          <circle cx="58" cy="50" r="3.5" fill="#fff"/>
          <circle cx="58" cy="51" r="2" fill="#3a2e5f"/>
          <path d="M44 62 Q50 68 56 62" stroke="#3a2e5f" stroke-width="2" fill="none" stroke-linecap="round"/>
        </svg>`,
      style: "bottom: 25%; left: -10%;",
      anim: "drift-right 46s linear infinite, bob 2.4s ease-in-out infinite",
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
      0%, 100% { transform: translateY(0) translateX(var(--tx, 0)); }
      50%      { transform: translateY(-20px) translateX(var(--tx, 0)); }
    }
    @keyframes flap {
      0%, 100% { transform: rotate(-10deg); }
      50%      { transform: rotate(15deg); }
    }
    @keyframes flutter {
      0%, 100% { transform: rotate(-8deg) scale(1); }
      50%      { transform: rotate(8deg) scale(1.05); }
    }
    @keyframes spin {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }
    @keyframes bob {
      0%, 100% { transform: translateY(0); }
      50%      { transform: translateY(-8px); }
    }
    @keyframes sway {
      0%, 100% { transform: translateY(0); }
      50%      { transform: translateY(14px); }
    }
    @keyframes wander {
      0%   { transform: translate(-10vw, 0); }
      25%  { transform: translate(30vw, -30px); }
      50%  { transform: translate(60vw, 20px); }
      75%  { transform: translate(90vw, -20px); }
      100% { transform: translate(120vw, 0); }
    }
    .bg-creature .wing { transform-origin: 35% 50%; }
    .bg-creature .bwing { transform-origin: 50% 40%; }
    /* Blink the raccoon eyes periodically */
    .raccoon-svg .rc-eye {
      transform-origin: center;
      animation: blink 5.5s ease-in-out infinite;
    }
    .raccoon-svg .rc-ear { animation: ear-twitch 7s ease-in-out infinite; }
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
    .raccoon-svg .rc-paw { transform-origin: 165px 88px; animation: wave-paw 1.2s ease-in-out infinite; }
    @keyframes wave-paw {
      0%, 100% { transform: rotate(-10deg); }
      50%      { transform: rotate(25deg); }
    }
  `;

  function ensureStyle() {
    if (document.getElementById("mr-anim-style")) return;
    const s = document.createElement("style");
    s.id = "mr-anim-style";
    s.textContent = ANIM_CSS;
    document.head.appendChild(s);
  }

  const Animations = {
    mountBackground(container) {
      if (!container) container = document.getElementById("background-scene");
      if (!container) return;
      ensureStyle();
      container.innerHTML = "";

      // 1) Drifting plain white clouds (back layer)
      CLOUDS.forEach((c, i) => {
        const wrap = document.createElement("div");
        wrap.className = "bg-creature bg-cloud";
        wrap.style.cssText = `top:${c.top}; left:-30vw; opacity:${c.opacity}; animation: cloud-drift ${c.speed}s linear infinite; animation-delay:${c.delay}s; transform-origin:center; filter: drop-shadow(0 6px 12px rgba(120,110,160,0.12));`;
        wrap.innerHTML = cloudSvg(c.size);
        container.appendChild(wrap);
      });

      // 2) Rooted scenery (trees, flowers) — sway in place
      SCENERY.forEach((s) => {
        const wrap = document.createElement("div");
        wrap.className = "bg-creature bg-scenery";
        wrap.style.cssText = s.style + `;animation: ${s.anim}; transform-origin: 50% 100%;`;
        wrap.innerHTML = s.svg();
        container.appendChild(wrap);
      });

      // 3) Drifting creatures (front layer, existing)
      CREATURES.forEach((c, i) => {
        const wrap = document.createElement("div");
        wrap.className = "bg-creature";
        wrap.style.cssText = c.style + `animation: ${c.anim}; animation-delay: ${-i * 3}s;`;
        wrap.innerHTML = c.svg(i);
        container.appendChild(wrap);
      });
    },

    confetti(count = 60) {
      ensureStyle();
      const overlay = document.createElement("div");
      overlay.className = "celebration-overlay";
      const colors = ["#ff7a93", "#ffd93d", "#6ee7b7", "#7dd3fc", "#c4b5fd", "#ffb077"];
      for (let i = 0; i < count; i++) {
        const p = document.createElement("div");
        p.className = "confetti-piece";
        p.style.left = Math.random() * 100 + "vw";
        p.style.background = colors[i % colors.length];
        p.style.animationDelay = (Math.random() * 0.5) + "s";
        p.style.animationDuration = (1.4 + Math.random() * 1.4) + "s";
        p.style.transform = `rotate(${Math.random() * 360}deg)`;
        overlay.appendChild(p);
      }
      document.body.appendChild(overlay);
      setTimeout(() => overlay.remove(), 3000);
    },
  };

  window.MR = window.MR || {};
  window.MR.Animations = Animations;
})();
