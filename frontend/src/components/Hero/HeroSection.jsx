import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export default function HeroSection() {
  const { theme } = useTheme();

  return (
    <section
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        backgroundColor: theme === 'night' ? "#050505" : "#fdfbf7",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background-color 1s ease-in-out",
      }}
    >
      {/* --- AMBIENT BLURRED BACKDROP VIDEOS --- */}
      {/* Night Background Blur */}
      <video
        src="/hero_night.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "blur(90px) brightness(0.35)", // Increased blur and dimmed slightly for better blending
          transform: "scale(1.25)", // scaled up more to eliminate edge bleed from heavy blur
          opacity: theme === 'night' ? 0.8 : 0,
          transition: "opacity 1s ease-in-out",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Day Background Blur */}
      <video
        src="/hero_day.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "blur(90px) brightness(0.7)", // Increased blur for smooth abstraction
          transform: "scale(1.25)",
          opacity: theme === 'day' ? 0.8 : 0,
          transition: "opacity 1s ease-in-out",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Radial vignette overlay to darken edges and focus attention on the center video */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: theme === 'night' 
            ? "radial-gradient(circle, transparent 35%, rgba(5, 5, 5, 0.75) 85%)" 
            : "radial-gradient(circle, transparent 35%, rgba(253, 251, 247, 0.6) 85%)",
          zIndex: 2,
          transition: "background-color 1s ease-in-out, background 1s ease-in-out",
          pointerEvents: "none",
        }}
      />

      {/* --- SHARP MAIN CONTENT VIDEOS --- */}
      {/* Night Theme Video */}
      <video
        src="/hero_night.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "contain",
          display: "block",
          opacity: theme === 'night' ? 1 : 0,
          transition: "opacity 1s ease-in-out",
          zIndex: theme === 'night' ? 10 : 5,
          pointerEvents: "none",
        }}
      />

      {/* Day Theme Video */}
      <video
        src="/hero_day.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "contain",
          display: "block",
          opacity: theme === 'day' ? 1 : 0,
          transition: "opacity 1s ease-in-out",
          zIndex: theme === 'day' ? 10 : 5,
          pointerEvents: "none",
        }}
      />
    </section>
  );
}



