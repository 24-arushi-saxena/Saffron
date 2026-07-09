import React from 'react';

export default function AdminDashboard() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-serif text-gold-500 mb-4">Admin Dashboard</h1>
      <p className="text-white/60 font-light text-center max-w-md">
        Management panel for Saffron reservations, menu items, and seasonal events.
      </p>
    </div>
  );
}
