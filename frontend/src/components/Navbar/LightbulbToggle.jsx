import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useTheme } from '../../context/ThemeContext';

export default function LightbulbToggle() {
  const { theme, toggleTheme } = useTheme();
  const pullChainRef = useRef(null);
  const bulbGlowRef = useRef(null);
  const filamentRef = useRef(null);

  const handleToggle = () => {
    // 1. GSAP Pull Chain Spring Animation
    gsap.timeline()
      .to(pullChainRef.current, {
        y: 16,
        duration: 0.12,
        ease: "power1.inOut"
      })
      .to(pullChainRef.current, {
        y: 0,
        duration: 0.45,
        ease: "elastic.out(1, 0.4)"
      });

    // 2. Bulb Toggle flash animation
    if (theme === 'night') {
      // Turning OFF
      gsap.to(bulbGlowRef.current, { opacity: 0, scale: 0.8, duration: 0.25, ease: "power2.out" });
      gsap.to(filamentRef.current, { stroke: "#777", duration: 0.2 });
    } else {
      // Turning ON
      gsap.timeline()
        .to(bulbGlowRef.current, { opacity: 1, scale: 1.15, duration: 0.08, ease: "power1.out" })
        .to(bulbGlowRef.current, { scale: 1.0, duration: 0.3, ease: "sine.out" });
      gsap.to(filamentRef.current, { stroke: "#FFE985", duration: 0.1 });
    }

    // 3. Toggle context state
    toggleTheme();
  };

  // Sync initial render states
  useEffect(() => {
    if (theme === 'night') {
      gsap.set(bulbGlowRef.current, { opacity: 1 });
      gsap.set(filamentRef.current, { stroke: "#FFE985" });
    } else {
      gsap.set(bulbGlowRef.current, { opacity: 0 });
      gsap.set(filamentRef.current, { stroke: "#777" });
    }
  }, [theme]);

  return (
    <div 
      className="relative flex flex-col items-center justify-start pointer-events-auto select-none"
      style={{ width: "90px", height: "180px", cursor: "pointer" }}
      onClick={handleToggle}
      title="Pull to toggle theme"
    >
      <svg
        width="90"
        height="180"
        viewBox="0 0 100 200"
        style={{ overflow: "visible" }}
      >
        {/* Glow Filters */}
        <defs>
          <filter id="bulbGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <radialGradient id="radialGlow" cx="50%" cy="55%" r="45%">
            <stop offset="0%" stopColor="#FFF2A3" stopOpacity="0.8" />
            <stop offset="40%" stopColor="#FFAA00" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#FF7700" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 1. Bulb Glow Halo (Behind everything, only visible in night/ON mode) */}
        <ellipse
          ref={bulbGlowRef}
          cx="50"
          cy="115"
          rx="52"
          ry="52"
          fill="url(#radialGlow)"
          filter="url(#bulbGlow)"
          style={{ 
            transformOrigin: "50px 115px",
            mixBlendMode: "screen",
            pointerEvents: "none"
          }}
        />

        {/* 2. Thin Electrical Cord */}
        <line 
          x1="50" 
          y1="0" 
          x2="50" 
          y2="50" 
          stroke={theme === 'night' ? "#555" : "#777"} 
          strokeWidth="2" 
        />

        {/* 3. Socket / Fixture Body */}
        {/* Upper cylindrical housing */}
        <path
          d="M 44 50 C 44 42, 56 42, 56 50 Z"
          fill={theme === 'night' ? "#2d2d2d" : "#e5e5e5"}
          stroke={theme === 'night' ? "#151515" : "#999"}
          strokeWidth="1.5"
        />
        <rect
          x="42"
          y="50"
          width="16"
          height="28"
          fill={theme === 'night' ? "#3a3a3a" : "#fafafa"}
          stroke={theme === 'night' ? "#151515" : "#999"}
          strokeWidth="1.5"
        />
        {/* Socket Thread Details */}
        <line 
          x1="42" 
          y1="64" 
          x2="58" 
          y2="64" 
          stroke={theme === 'night' ? "#222" : "#ccc"} 
          strokeWidth="1.5" 
        />
        {/* Screw Key details */}
        <circle 
          cx="58" 
          cy="58" 
          r="2.5" 
          fill={theme === 'night' ? "#1c1c1c" : "#b5b5b5"} 
          stroke={theme === 'night' ? "#111" : "#888"} 
          strokeWidth="1" 
        />
        {/* Golden Screw/Thread Collar */}
        <path
          d="M 43 78 L 57 78 L 58 84 L 42 84 Z"
          fill={theme === 'night' ? "#9a781b" : "#d4af37"}
          stroke={theme === 'night' ? "#6a4f0b" : "#a3821a"}
          strokeWidth="1.5"
        />

        {/* 4. Filament Inside the Bulb */}
        {/* Support Wires */}
        <line x1="46" y1="84" x2="46" y2="105" stroke={theme === 'night' ? "#555" : "#aaa"} strokeWidth="1" />
        <line x1="54" y1="84" x2="54" y2="105" stroke={theme === 'night' ? "#555" : "#aaa"} strokeWidth="1" />
        {/* Filament loop */}
        <path
          ref={filamentRef}
          d="M 46 105 Q 50 94, 54 105"
          fill="none"
          strokeWidth="2.2"
          strokeLinecap="round"
        />

        {/* 5. Clear Glass Bulb Body */}
        <path
          d="M 42 84 C 28 94, 20 110, 20 126 C 20 152, 50 168, 50 168 C 50 168, 80 152, 80 126 C 80 110, 72 94, 58 84 Z"
          fill={theme === 'night' ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.01)"}
          stroke={theme === 'night' ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.55)"}
          strokeWidth="1.8"
        />
        {/* Highlight reflections on the glass bulb */}
        <path
          d="M 26 122 C 26 108, 32 98, 38 92"
          fill="none"
          stroke={theme === 'night' ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.15)"}
          strokeWidth="1"
          strokeLinecap="round"
        />

        {/* 6. Beaded Pull Chain (Triggered Group) */}
        <g ref={pullChainRef}>
          {/* Beaded chain */}
          <line
            x1="56"
            y1="78"
            x2="56"
            y2="152"
            stroke={theme === 'night' ? "#aaa" : "#555"}
            strokeWidth="3.2"
            strokeDasharray="1,4"
            strokeLinecap="round"
          />
          {/* Pull bell connector */}
          <circle
            cx="56"
            y1="152"
            cy="152"
            r="2"
            fill={theme === 'night' ? "#444" : "#ccc"}
            stroke={theme === 'night' ? "#111" : "#777"}
            strokeWidth="1"
          />
          {/* Pull Bell-shaped Knob */}
          <path
            d="M 52 152 L 60 152 L 62 165 L 50 165 Z"
            fill={theme === 'night' ? "#444" : "#e5e5e5"}
            stroke={theme === 'night' ? "#151515" : "#777"}
            strokeWidth="1.5"
          />
        </g>
      </svg>
    </div>
  );
}
