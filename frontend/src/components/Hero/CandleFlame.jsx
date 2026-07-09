import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CandleFlame({ x, y, size = "large" }) {
  const flameRef = useRef();
  const glowRef = useRef();
  const haloRef = useRef();

  const isLarge = size === "large";
  const isMedium = size === "medium";

  // Determine flame & glow dimensions
  let fw = 7;   // Flame width
  let fh = 14;  // Flame height
  let gr = 28;  // Glow radius
  let haloOpacity = 0.22;

  if (isLarge) {
    fw = 13;
    fh = 28;
    gr = 60;
    haloOpacity = 0.25;
  } else if (isMedium) {
    fw = 9;
    fh = 20;
    gr = 42;
    haloOpacity = 0.24;
  }

  useEffect(() => {
    // 1. Organic, randomized flame flicker and sway
    const flickerTimeline = gsap.timeline({ repeat: -1 });
    
    const animateFlicker = () => {
      gsap.to(flameRef.current, {
        scaleX: gsap.utils.random(0.82, 1.12),
        scaleY: gsap.utils.random(0.88, 1.15),
        x: gsap.utils.random(-1.5, 1.5),
        y: gsap.utils.random(-0.5, 0.5),
        skewX: gsap.utils.random(-6, 6),
        duration: gsap.utils.random(0.06, 0.12),
        ease: "none",
        onComplete: animateFlicker,
      });
    };
    animateFlicker();

    // 2. Slow, breathing pulse for the warm ambient glow on the table/wick
    gsap.to(glowRef.current, {
      opacity: gsap.utils.random(0.45, 0.85),
      scale: gsap.utils.random(0.95, 1.12),
      duration: gsap.utils.random(0.8, 1.5),
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // 3. Ambient halo pulse
    gsap.to(haloRef.current, {
      r: gr * gsap.utils.random(1.08, 1.25),
      opacity: haloOpacity * gsap.utils.random(0.7, 1.1),
      duration: gsap.utils.random(1.2, 2.2),
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    return () => {
      gsap.killTweensOf(flameRef.current);
      gsap.killTweensOf(glowRef.current);
      gsap.killTweensOf(haloRef.current);
    };
  }, [gr, haloOpacity]);

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: "translate(-50%, -100%)",
        pointerEvents: "none",
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      <svg
        width={gr * 2}
        height={gr * 2 + fh}
        style={{ overflow: "visible", transform: "translateY(15%)" }}
      >
        {/* Glow Halo (large semi-transparent warm light circle) */}
        <circle
          ref={haloRef}
          cx={gr}
          cy={gr}
          r={gr}
          fill="url(#warmGlow)"
          opacity={haloOpacity}
          style={{ transformOrigin: "center", mixBlendMode: "screen" }}
        />

        {/* Flame Graphic */}
        <g
          ref={flameRef}
          style={{
            transformOrigin: `${gr}px ${gr + fh * 0.9}px`,
          }}
        >
          {/* Outer flame (deep orange glow) */}
          <path
            d={`M ${gr - fw} ${gr + fh * 0.8} 
                Q ${gr - fw * 1.2} ${gr + fh * 0.3}, ${gr} ${gr} 
                Q ${gr + fw * 1.2} ${gr + fh * 0.3}, ${gr + fw} ${gr + fh * 0.8} 
                Q ${gr} ${gr + fh * 1.05}, ${gr - fw} ${gr + fh * 0.8} Z`}
            fill="url(#outerFlameGradient)"
            style={{ mixBlendMode: "screen" }}
          />

          {/* Inner flame core (bright golden yellow) */}
          <path
            d={`M ${gr - fw * 0.65} ${gr + fh * 0.8} 
                Q ${gr - fw * 0.75} ${gr + fh * 0.45}, ${gr} ${gr + fh * 0.25} 
                Q ${gr + fw * 0.75} ${gr + fh * 0.45}, ${gr + fw * 0.65} ${gr + fh * 0.8} 
                Q ${gr} ${gr + fh * 0.95}, ${gr - fw * 0.65} ${gr + fh * 0.8} Z`}
            fill="url(#innerFlameGradient)"
          />

          {/* Bright center wick core (near white-hot) */}
          <ellipse
            ref={glowRef}
            cx={gr}
            cy={gr + fh * 0.72}
            rx={fw * 0.28}
            ry={fh * 0.22}
            fill="#FFFFE0"
            style={{ transformOrigin: "center" }}
          />
        </g>

        {/* Definitions for Gradients */}
        <defs>
          <radialGradient id="warmGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFA033" stopOpacity="1" />
            <stop offset="50%" stopColor="#FF7A00" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#FF5C00" stopOpacity="0" />
          </radialGradient>
          
          <linearGradient id="outerFlameGradient" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#FF3C00" stopOpacity="0" />
            <stop offset="25%" stopColor="#FF6200" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#FF9C00" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#FFD000" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="innerFlameGradient" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#FF8800" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#FFE600" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#FFFFCC" stopOpacity="0.9" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
