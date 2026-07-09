import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-serif text-gold-500 mb-4">404</h1>
      <h2 className="text-xl font-light text-white mb-6">Page Not Found</h2>
      <p className="text-white/50 font-light mb-8 max-w-md">
        The table you are looking for has been moved or is no longer available.
      </p>
      <Link to="/" className="border border-gold-500 text-gold-500 px-6 py-3 rounded hover:bg-gold-500 hover:text-dark-950 transition-all duration-300 uppercase tracking-widest text-xs">
        Return Home
      </Link>
    </div>
  );
}
