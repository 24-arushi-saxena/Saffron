import React from "react";
import { useTheme } from "../context/ThemeContext";

export default function Footer() {
  const { theme } = useTheme();
  const isDay = theme === "day";

  const colors = {
    text: isDay ? "#1A0F00" : "#F2DEB0",
    desc: isDay ? "#6B5240" : "#A08060",
    border: isDay ? "#E8DFC0" : "#3A2210",
    bg: isDay ? "#FAF7F0" : "#1A0F08",
    gold: "#C8A951",
  };

  return (
    <footer
      style={{
        backgroundColor: colors.bg,
        borderTop: `1px solid ${colors.border}`,
        color: colors.text,
        transition: "all 1.2s ease",
      }}
      className="py-16 px-6 select-none font-sans"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-left">
        
        {/* Brand */}
        <div className="md:col-span-2">
          <h2
            style={{
              fontFamily: "Playfair Display, serif",
              letterSpacing: "0.2em",
              fontSize: "26px",
              marginBottom: "12px",
            }}
          >
            SAFFRON
          </h2>
          <p
            style={{ color: colors.desc, fontFamily: "Inter, sans-serif" }}
            className="text-sm font-light leading-relaxed max-w-sm"
          >
            A pure vegetarian kitchen rooted in Indian heritage, open to the world. We craft clean, seasonal culinary experiences with intention and respect.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4
            style={{
              fontSize: "11px",
              fontWeight: 650,
              letterSpacing: "0.15em",
              color: colors.gold,
              marginBottom: "18px",
            }}
            className="uppercase"
          >
            Navigation
          </h4>
          <ul className="flex flex-col gap-3 text-sm font-light">
            {["Home", "Menu", "Reservations", "Events", "About"].map((link) => (
              <li key={link}>
                <a
                  href={link === "Home" ? "/" : `/${link.toLowerCase()}`}
                  style={{ color: colors.text }}
                  className="opacity-75 hover:opacity-100 hover:text-gold-500 transition-all"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Info */}
        <div>
          <h4
            style={{
              fontSize: "11px",
              fontWeight: 650,
              letterSpacing: "0.15em",
              color: colors.gold,
              marginBottom: "18px",
            }}
            className="uppercase"
          >
            Hours & Location
          </h4>
          <p style={{ color: colors.desc }} className="text-sm font-light leading-relaxed mb-4">
            12 Heritage Lane, Lucknow<br />
            Uttar Pradesh &mdash; 226001
          </p>
          <p style={{ color: colors.desc }} className="text-sm font-light leading-relaxed">
            Lunch: 12:00 PM &ndash; 3:30 PM<br />
            Dinner: 7:00 PM &ndash; 11:00 PM
          </p>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-stone-200/30 dark:border-stone-800/30 flex flex-col md:flex-row justify-between items-center gap-4 text-xs opacity-50">
        <span>&copy; {new Date().getFullYear()} Saffron Restaurant. All rights reserved.</span>
        <span>Designed with Intention.</span>
      </div>
    </footer>
  );
}
