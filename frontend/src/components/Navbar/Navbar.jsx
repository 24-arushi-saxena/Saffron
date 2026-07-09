import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import LightbulbToggle from './LightbulbToggle';

export default function Navbar() {
  const location = useLocation();
  const activePath = location.pathname;
  const { theme } = useTheme();

  const linkStyle = (path) => {
    const isActive = activePath === path;
    if (theme === 'night') {
      return `text-xs uppercase tracking-widest transition-colors duration-300 ${
        isActive ? "text-gold-500 font-medium" : "text-white/70 hover:text-gold-400 font-light"
      }`;
    } else {
      return `text-xs uppercase tracking-widest transition-colors duration-300 ${
        isActive ? "text-gold-600 font-semibold" : "text-stone-700/80 hover:text-gold-600 font-normal"
      }`;
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 py-5 pl-6 pr-28 md:pl-16 md:pr-36 flex justify-between items-center transition-all duration-500 ${
        theme === 'night' 
          ? "bg-dark-950/35 backdrop-blur-md border-b border-white/5" 
          : "bg-white/45 backdrop-blur-md border-b border-black/5"
      }`}
      style={{ pointerEvents: "auto" }}
    >
      {/* Brand Logo */}
      <Link 
        to="/" 
        className={`text-2xl font-serif tracking-[0.2em] font-semibold hover:opacity-90 transition-opacity ${
          theme === 'night' ? "text-gold-500" : "text-gold-600"
        }`}
      >
        SAFFRON
      </Link>

      {/* Nav Links */}
      <div className="hidden md:flex items-center gap-10">
        <Link to="/" className={linkStyle("/")}>Home</Link>
        <Link to="/menu" className={linkStyle("/menu")}>Menu</Link>
        <Link to="/reservations" className={linkStyle("/reservations")}>Reservations</Link>
        <Link to="/events" className={linkStyle("/events")}>Events</Link>
        <Link to="/about" className={linkStyle("/about")}>About</Link>
      </div>

      {/* Action Button */}
      <div className="hidden md:block">
        <Link
          to="/reservations"
          className={`text-xs uppercase tracking-widest border px-5 py-2.5 rounded transition-all duration-300 ${
            theme === 'night'
              ? "border-gold-500/50 text-gold-500 hover:bg-gold-500 hover:text-dark-950"
              : "border-gold-600/50 text-gold-600 hover:bg-gold-600 hover:text-stone-900"
          }`}
        >
          Book a Table
        </Link>
      </div>

      {/* Hanging Lightbulb Theme Switch */}
      <div className="absolute top-0 right-4 md:right-10 z-50">
        <LightbulbToggle />
      </div>
    </nav>
  );
}

