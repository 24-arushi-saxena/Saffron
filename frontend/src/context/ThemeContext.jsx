import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Default to night theme
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('saffron-theme');
    return saved || 'night';
  });

  useEffect(() => {
    localStorage.setItem('saffron-theme', theme);
    const root = document.documentElement;
    if (theme === 'day') {
      root.classList.add('day-theme');
      root.classList.remove('night-theme');
    } else {
      root.classList.add('night-theme');
      root.classList.remove('day-theme');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'night' ? 'day' : 'night'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
