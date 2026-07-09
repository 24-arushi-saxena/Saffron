import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import HeroSection from '../components/Hero/HeroSection';

const DEFAULT_UPCOMING_EVENTS = [
  {
    _id: "default-1",
    title: "Diwali Special Thali Night",
    description: "A carefully curated festive thali highlighting historical royal vegetarian delicacies.",
    date: "2026-10-20T19:00:00.000Z",
    time: "7:00 PM",
    dateLabel: "Oct 20, 7:00 PM",
  },
  {
    _id: "default-2",
    title: "Sunday Brunch Buffet",
    description: "An endless table of farm-fresh signature Indian breads, regional curries, and desserts.",
    date: "2026-10-27T11:00:00.000Z",
    time: "11:00 AM",
    dateLabel: "Every Sunday, 11:00 AM",
  }
];

export default function Home() {
  const { theme } = useTheme();
  const [upcomingEvents, setUpcomingEvents] = useState(DEFAULT_UPCOMING_EVENTS);

  useEffect(() => {
    fetch('/api/events/upcoming')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data && data.data.length > 0) {
          setUpcomingEvents(data.data);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch upcoming events:", err);
      });
  }, []);

  const formatEventDate = (event) => {
    if (event.dateLabel) return event.dateLabel;
    try {
      const d = new Date(event.date);
      const formatted = d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      return `${formatted}, ${event.time}`;
    } catch (err) {
      return `${event.date}, ${event.time}`;
    }
  };

  // Signature Dishes Mock Data
  const SIGNATURE_DISHES = [
    {
      id: 1,
      name: "Wild Mushroom Penne",
      desc: "Sauteed cremini and oyster mushrooms in a rich parmesan truffle cream sauce.",
      price: "₹360",
      spice: 0,
      image: "/images/menu/the italian table/wild mashroom penne.png"
    },
    {
      id: 2,
      name: "Dal Bukhara",
      desc: "Our legendary black lentils, slow-cooked for 24 hours with butter and cream.",
      price: "₹320",
      spice: 2,
      image: "/images/menu/from the subcontinent/dal bukhara.png"
    },
    {
      id: 3,
      name: "Royal Paneer Makhani",
      desc: "Soft cottage cheese cubes cooked in a rich, velvety cashew nut and tomato gravy.",
      price: "₹380",
      spice: 2,
      image: "/images/menu/from the subcontinent/royal paneer makhani.png"
    },
    {
      id: 4,
      name: "Avocado Garden Crunch",
      desc: "Hand-mashed Hass avocado, green apple slices, sunflower seeds, lime leaf dressing.",
      price: "₹320",
      spice: 0,
      image: "/images/menu/garden and greens/avocardo garden crunch.png"
    }
  ];

  // Reviews Mock Data
  const GUEST_REVIEWS = [
    {
      id: 1,
      name: "Aarav Sharma",
      stars: 5,
      quote: "The candlelit ambiance and the Dal Bukhara were absolutely stellar. Saffron feels like a warm home."
    },
    {
      id: 2,
      name: "Sarah Jenkins",
      stars: 5,
      quote: "Stunning views of the Tokyo tower, incredibly fast service, and the best truffle penne I've ever had!"
    },
    {
      id: 3,
      name: "Kabir Mehta",
      stars: 5,
      quote: "A pure vegetarian heaven. The attention to detail in their slow-cooked recipes is truly inspiring."
    }
  ];

  // Helper to render spice levels (chili icons)
  const renderSpiceLevel = (level) => {
    return (
      <div className="flex gap-0.5 items-center" title={`Spice Level: ${level}/3`}>
        {[1, 2, 3].map((s) => (
          <span 
            key={s} 
            className={`text-xs ${s <= level ? 'text-red-500' : 'text-gray-300 dark:text-stone-700'}`}
          >
            &#127798;&#65039;
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className={`w-full min-h-screen transition-colors duration-500 ${
      theme === 'night' ? 'bg-dark-950 text-white' : 'bg-[#fdfbf7] text-stone-900'
    }`}>
      {/* ========================================================================= */}
      {/* 0. HERO SECTION (With taglines and uncropped video backdrop) */}
      {/* ========================================================================= */}
      <div className="relative w-full h-screen overflow-hidden">
        {/* Background video crossfade container */}
        <HeroSection />

        {/* 1. Soft gradient behind the text area only (bottom 40%) */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "40%",
            background: theme === 'night'
              ? "linear-gradient(to top, rgba(5, 5, 5, 0.92) 0%, rgba(5, 5, 5, 0.4) 60%, transparent 100%)"
              : "linear-gradient(to top, rgba(253, 251, 247, 0.92) 0%, rgba(253, 251, 247, 0.4) 60%, transparent 100%)",
            zIndex: 15,
            pointerEvents: "none",
            transition: "background 1.2s ease-in-out",
          }}
        />

        {/* 2. Elegant Tagline Overlaid (positioned at bottom 8% within the gradient) */}
        <div 
          className="absolute left-0 right-0 z-20 flex flex-col items-center justify-center text-center pointer-events-none px-6"
          style={{
            bottom: "8%",
          }}
        >
          {/* SAFFRON label - always gold */}
          <p 
            className="text-2xl font-serif font-semibold tracking-[0.25em] mb-3 text-gold-500"
            style={{
              textShadow: theme === 'night'
                ? "0 2px 10px rgba(0, 0, 0, 0.9)"
                : "0 2px 8px rgba(212, 171, 58, 0.25)",
            }}
          >
            SAFFRON
          </p>

          {/* Slogan */}
          <h1 
            className="font-serif italic font-medium leading-tight select-none transition-all duration-500"
            style={{
              fontSize: "clamp(28px, 4.5vw, 56px)",
              color: theme === 'night' ? "#F2DEB0" : "#2C1A0A", // Warm ivory / Deep espresso brown
              textShadow: theme === 'night'
                ? "0 3px 12px rgba(0, 0, 0, 0.95), 0 6px 24px rgba(0, 0, 0, 0.9)" // Deep dark shadow
                : "0 2px 10px rgba(212, 171, 58, 0.45), 0 4px 20px rgba(212, 171, 58, 0.25)", // Soft warm golden glow shadow
            }}
          >
            {theme === 'night' ? '"An Evening Worth Savouring"' : '"Where Spice Meets Soul"'}
          </h1>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. WELCOME STRIP */}
      {/* ========================================================================= */}
      <section 
        className={`py-[60px] px-6 md:px-12 text-center transition-colors duration-500 ${
          theme === 'night' ? 'bg-[#1e0b07] text-amber-50' : 'bg-[#fdfbf7]'
        }`}
      >
        <div className="max-w-4xl mx-auto">
          {/* Label (12px, 0.2em spacing) */}
          <span 
            className="text-[12px] uppercase tracking-[0.2em] font-semibold block mb-4 text-gold-500"
          >
            Welcome
          </span>

          {/* Heading (minimum 48px on desktop) */}
          <h2 
            className="font-serif text-3xl md:text-[48px] font-medium tracking-wide mb-6 leading-tight"
            style={{ color: theme === 'night' ? '' : '#1A0F00' }}
          >
            Welcome to Saffron
          </h2>

          {/* Body Paragraph (minimum 17px on desktop) */}
          <p 
            className="font-sans text-base md:text-[17px] font-light leading-relaxed max-w-2xl mx-auto mb-12"
            style={{ color: theme === 'night' ? '' : '#3D2B1A' }}
          >
            A vegetarian kitchen rooted in Indian tradition, open to the world. Every dish at Saffron is made from fresh ingredients, cooked with intention.
          </p>
          
          {/* 3 Icons Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-current/10">
            <div className="flex flex-col items-center gap-2">
              <span className="text-3xl" aria-hidden="true">&#127807;</span>
              {/* Subheading (minimum 28px on desktop) */}
              <h3 
                className="font-serif text-xl md:text-[28px] font-medium"
                style={{ color: theme === 'night' ? '' : '#1A0F00' }}
              >
                100% Vegetarian
              </h3>
              <p 
                className="text-sm md:text-[17px] font-light opacity-75"
                style={{ color: theme === 'night' ? '' : '#3D2B1A' }}
              >
                Pure, clean, plant-based gastronomy
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-3xl" aria-hidden="true">&#127869;&#65039;</span>
              <h3 
                className="font-serif text-xl md:text-[28px] font-medium"
                style={{ color: theme === 'night' ? '' : '#1A0F00' }}
              >
                Indian & Western
              </h3>
              <p 
                className="text-sm md:text-[17px] font-light opacity-75"
                style={{ color: theme === 'night' ? '' : '#3D2B1A' }}
              >
                Fusion of cultures and styles
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-3xl" aria-hidden="true">&#128367;&#65039;</span>
              <h3 
                className="font-serif text-xl md:text-[28px] font-medium"
                style={{ color: theme === 'night' ? '' : '#1A0F00' }}
              >
                Dine-in Experience
              </h3>
              <p 
                className="text-sm md:text-[17px] font-light opacity-75"
                style={{ color: theme === 'night' ? '' : '#3D2B1A' }}
              >
                Atmospheric, candlelit dining table
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. SIGNATURE DISHES (Menu Preview) */}
      {/* ========================================================================= */}
      <section className="py-[60px] px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          {/* Section heading (minimum 48px on desktop) */}
          <h2 
            className="font-serif text-3xl md:text-[48px] font-medium tracking-wide mb-3 leading-tight"
            style={{ color: theme === 'night' ? '' : '#1A0F00' }}
          >
            Our Signature Dishes
          </h2>
          {/* Section subtitle (minimum 17px on desktop) */}
          <p 
            className="font-sans text-base md:text-[17px] font-light"
            style={{ color: theme === 'night' ? '' : '#3D2B1A' }}
          >
            A selective teaser of our house favorites.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {SIGNATURE_DISHES.map((dish) => (
            <div 
              key={dish.id} 
              className={`rounded-xl overflow-hidden transition-all duration-500 border ${
                theme === 'night' 
                  ? 'bg-dark-900 border-gold-500/20 hover:border-gold-500/50 shadow-xl' 
                  : 'bg-white border-stone-200/60 hover:shadow-lg shadow-sm'
              }`}
            >
              {/* Dish Photo */}
              <div className="h-48 overflow-hidden bg-stone-100">
                <img 
                  src={dish.image} 
                  alt={dish.name} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              {/* Details */}
              <div className="p-6 flex flex-col justify-between h-64">
                <div>
                  <div className="flex justify-between items-start gap-2 mb-2">
                    {/* Dish title (minimum 28px on desktop) */}
                    <h3 
                      className="font-serif text-xl md:text-[28px] font-medium leading-tight"
                      style={{ color: theme === 'night' ? '' : '#1A0F00' }}
                    >
                      {dish.name}
                    </h3>
                    <span className={`font-semibold text-lg ${theme === 'night' ? 'text-gold-500' : 'text-gold-600'}`}>
                      {dish.price}
                    </span>
                  </div>
                  {/* Dish description (minimum 17px on desktop) */}
                  <p 
                    className="font-sans text-sm md:text-[17px] font-light leading-relaxed"
                    style={{ color: theme === 'night' ? '' : '#3D2B1A' }}
                  >
                    {dish.desc}
                  </p>
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t border-stone-100 dark:border-stone-800">
                  <span 
                    className="text-[12px] uppercase tracking-[0.2em] font-semibold"
                    style={{ color: theme === 'night' ? '' : '#3D2B1A' }}
                  >
                    Spice
                  </span>
                  {renderSpiceLevel(dish.spice)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View Full Menu CTA */}
        <div className="text-center">
          <Link 
            to="/menu" 
            className={`inline-block font-sans text-sm font-semibold uppercase tracking-wider border px-8 py-3.5 rounded transition-all duration-300 ${
              theme === 'night' 
                ? 'border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-dark-950' 
                : 'border-stone-800 text-stone-900 hover:bg-stone-900 hover:text-white'
            }`}
          >
            View Full Menu &rarr;
          </Link>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. THE SAFFRON EXPERIENCE (Split Screen Block) */}
      {/* ========================================================================= */}
      <section className={`py-[60px] px-6 md:px-12 transition-colors duration-500 ${
        theme === 'night' ? 'bg-[#0f0f0f] border-y border-stone-900' : 'bg-stone-100/50 border-y border-stone-200/50'
      }`}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Text */}
          <div className="pr-0 md:pr-8">
            {/* Label (12px, 0.2em spacing) */}
            <span 
              className="text-[12px] uppercase tracking-[0.2em] font-semibold block mb-4 text-gold-500"
            >
              Our philosophy
            </span>
            {/* Heading (minimum 48px on desktop) */}
            <h2 
              className="font-serif text-3xl md:text-[48px] font-medium tracking-wide leading-tight mb-6"
              style={{ color: theme === 'night' ? '' : '#1A0F00' }}
            >
              Fresh. Seasonal. Intentional.
            </h2>
            {/* Body (minimum 17px on desktop) */}
            <p 
              className="font-sans text-base md:text-[17px] leading-relaxed font-light"
              style={{ color: theme === 'night' ? '' : '#3D2B1A' }}
            >
              We source our ingredients locally every morning. Our kitchen follows no shortcuts &mdash; every dal is slow cooked, every bread is made fresh.
            </p>
          </div>

          {/* Right Image */}
          <div className="rounded-xl overflow-hidden shadow-2xl h-80 bg-stone-200">
            <img 
              src="/images/experience.jpg" 
              alt="Plating fine dining dishes" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. RESERVE A TABLE (Call to Action) */}
      {/* ========================================================================= */}
      <section className="py-[60px] px-6 md:px-12 text-center">
        <div className={`max-w-4xl mx-auto p-12 md:p-16 rounded-2xl transition-all duration-500 border ${
          theme === 'night' 
            ? 'bg-[#050505] border-amber-500/25 shadow-2xl shadow-amber-500/5' 
            : 'bg-gold-500 text-stone-950 border-gold-600/30 shadow-lg'
        }`}>
          {/* Heading (minimum 48px on desktop) */}
          <h2 
            className="font-serif text-3xl md:text-[48px] font-medium leading-tight mb-4"
            style={{ color: theme === 'night' ? '' : '#1A0F00' }}
          >
            Join us for an unforgettable evening
          </h2>
          {/* Body (minimum 17px on desktop) */}
          <p 
            className="font-sans text-base md:text-[17px] font-light max-w-lg mx-auto mb-10 opacity-90"
            style={{ color: theme === 'night' ? '' : '#3D2B1A' }}
          >
            Experience our refined candlelight vegetarian dining overlook, designed for memories that linger.
          </p>

          {/* Opening Hours Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-md mx-auto mb-12 py-6 border-y border-current/15">
            <div>
              {/* Hours title (minimum 28px on desktop) */}
              <h4 
                className="font-serif text-xl md:text-[28px] font-medium mb-1"
                style={{ color: theme === 'night' ? '' : '#1A0F00' }}
              >
                Tuesday &ndash; Sunday
              </h4>
              <p 
                className="text-[12px] uppercase tracking-[0.2em] font-semibold"
                style={{ color: theme === 'night' ? '' : '#3D2B1A' }}
              >
                Weekly Dining Hours
              </p>
            </div>
            {/* Hours timings (minimum 17px on desktop) */}
            <div 
              className="flex flex-col gap-1 text-center justify-center font-sans text-base md:text-[17px]"
              style={{ color: theme === 'night' ? '' : '#3D2B1A' }}
            >
              <div><span className="font-semibold">Lunch</span> 12:00 PM &ndash; 3:30 PM</div>
              <div><span className="font-semibold">Dinner</span> 7:00 PM &ndash; 11:00 PM</div>
            </div>
          </div>

          {/* Large CTA Button */}
          <Link 
            to="/reservations" 
            className={`inline-block font-sans text-sm font-semibold uppercase tracking-wider px-10 py-4 rounded-lg transition-all duration-300 ${
              theme === 'night'
                ? 'bg-gold-500 text-stone-950 hover:bg-gold-600 shadow-lg hover:shadow-gold-500/30'
                : 'bg-stone-950 text-white hover:bg-stone-900 shadow-md hover:shadow-stone-950/20'
            }`}
          >
            Book a Table
          </Link>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. UPCOMING EVENTS */}
      {/* ========================================================================= */}
      <section className={`py-[60px] px-6 md:px-12 transition-colors duration-500 ${
        theme === 'night' ? 'bg-[#0a0a0a]' : 'bg-[#fdfbf7]'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            {/* Section heading (minimum 48px on desktop) */}
            <h2 
              className="font-serif text-3xl md:text-[48px] font-medium tracking-wide mb-3 leading-tight"
              style={{ color: theme === 'night' ? '' : '#1A0F00' }}
            >
              Upcoming Events
            </h2>
            <p 
              className="font-sans text-base md:text-[17px] font-light"
              style={{ color: theme === 'night' ? '' : '#3D2B1A' }}
            >
              Limited seats. Infinite experiences.
            </p>
          </div>

          {/* 2 Events Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            {upcomingEvents.map((event) => {
              const eventDateQuery = event.date ? event.date.split("T")[0] : "";
              const eventTimeQuery = encodeURIComponent(event.time || "");
              const bookingUrl = `/reservations?date=${eventDateQuery}&time=${eventTimeQuery}&occasion=Special Occasion&eventId=${event._id}`;

              return (
                <div 
                  key={event._id}
                  className={`p-8 rounded-xl border transition-all duration-500 flex flex-col justify-between ${
                    theme === 'night' 
                      ? 'bg-[#151515] border-stone-800' 
                      : 'bg-white border-stone-200/60 shadow-sm'
                  }`}
                >
                  <div>
                    {/* Event date label (12px, 0.2em spacing) */}
                    <div 
                      className="text-[12px] uppercase tracking-[0.2em] font-semibold mb-2"
                      style={{ color: '#d4ab3a' }}
                    >
                      {formatEventDate(event)}
                    </div>
                    {/* Event title (minimum 28px on desktop) */}
                    <h3 
                      className="font-serif text-xl md:text-[28px] font-medium mb-3"
                      style={{ color: theme === 'night' ? '' : '#1A0F00' }}
                    >
                      {event.title}
                    </h3>
                    {/* Event body description (minimum 17px on desktop) */}
                    <p 
                      className="font-sans text-base md:text-[17px] font-light leading-relaxed mb-6"
                      style={{ color: theme === 'night' ? '' : '#3D2B1A' }}
                    >
                      {event.description}
                    </p>
                  </div>

                  <div className="mt-auto pt-6 border-t border-stone-200/40 dark:border-stone-800/40 flex justify-between items-center">
                    <span className="text-[13px] font-medium" style={{ color: '#d4ab3a' }}>
                      {event.time || "7:30 PM"} &bull; ₹{(event.pricePerGuest || event.price || 3500).toLocaleString("en-IN")} / guest
                    </span>
                    <Link 
                      to={bookingUrl}
                      className="inline-flex items-center text-xs font-semibold uppercase tracking-widest text-[#C8701A] dark:text-[#C8A951] hover:opacity-80 transition-opacity"
                    >
                      Book Table &rarr;
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* View All CTA */}
          <div className="text-center">
            <Link 
              to="/events" 
              className={`inline-block font-sans text-xs font-semibold uppercase tracking-widest transition-colors duration-300 ${
                theme === 'night' ? 'text-gold-500 hover:text-gold-400' : 'text-gold-600 hover:text-gold-700'
              }`}
            >
              View All Events &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. WHAT OUR GUESTS SAY (Reviews) */}
      {/* ========================================================================= */}
      <section className="py-[60px] px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          {/* Section heading (minimum 48px on desktop) */}
          <h2 
            className="font-serif text-3xl md:text-[48px] font-medium tracking-wide mb-3 leading-tight"
            style={{ color: theme === 'night' ? '' : '#1A0F00' }}
          >
            What Our Guests Say
          </h2>
          {/* Section description (minimum 17px on desktop) */}
          <p 
            className="font-sans text-base md:text-[17px] font-light"
            style={{ color: theme === 'night' ? '' : '#3D2B1A' }}
          >
            Real feedback from our fine diners.
          </p>
        </div>

        {/* 3 Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {GUEST_REVIEWS.map((rev) => (
            <div 
              key={rev.id} 
              className={`p-8 rounded-xl border transition-all duration-500 ${
                theme === 'night' 
                  ? 'bg-dark-900 border-gold-500/10 text-amber-50' 
                  : 'bg-white border-stone-200/60 shadow-sm'
              }`}
            >
              {/* Stars */}
              <div className="flex gap-0.5 text-gold-500 mb-4">
                {Array.from({ length: rev.stars }).map((_, idx) => (
                  <span key={idx} className="text-xs">&#9733;</span>
                ))}
              </div>
              
              {/* Review quote body (minimum 17px on desktop) */}
              <p 
                className="font-sans font-light italic text-base md:text-[17px] leading-relaxed mb-6"
                style={{ color: theme === 'night' ? '' : '#3D2B1A' }}
              >
                "{rev.quote}"
              </p>

              {/* Reviewer Name (label 12px, 0.2em spacing) */}
              <h4 
                className="font-sans font-semibold text-[12px] uppercase tracking-[0.2em]"
                style={{ color: theme === 'night' ? '' : '#1A0F00' }}
              >
                &mdash; {rev.name}
              </h4>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. FOOTER */}
      {/* ========================================================================= */}
      <footer className={`py-[60px] px-6 md:px-16 border-t transition-colors duration-500 ${
        theme === 'night' 
          ? 'bg-[#080808] border-stone-900 text-stone-400' 
          : 'bg-[#24170a] border-stone-850 text-stone-300' // Dark walnut for Day theme
      }`}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Col 1: Logo + Tagline */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-serif tracking-[0.2em] text-gold-500 font-bold">SAFFRON</h3>
            <p className="font-sans text-sm font-light leading-relaxed max-w-xs text-stone-300">
              A premium dining experience blending modern gastronomy with ancient Indian culinary wisdom.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="flex flex-col gap-4">
            {/* Label (12px, 0.2em spacing) */}
            <h4 className="text-[12px] uppercase tracking-[0.2em] font-semibold text-white">Quick Links</h4>
            <div className="flex flex-col gap-2 font-sans text-sm font-light text-stone-300">
              <Link to="/menu" className="hover:text-gold-500 transition-colors">Menu</Link>
              <Link to="/reservations" className="hover:text-gold-500 transition-colors">Reservations</Link>
              <Link to="/events" className="hover:text-gold-500 transition-colors">Special Events</Link>
              <Link to="/about" className="hover:text-gold-500 transition-colors">Our Story</Link>
            </div>
          </div>

          {/* Col 3: Address & Hours */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[12px] uppercase tracking-[0.2em] font-semibold text-white">Contact & Hours</h4>
            <div className="font-sans text-sm font-light leading-relaxed flex flex-col gap-2 text-stone-300">
              <p>&#128205; 24 High-Rise Blvd, Tokyo Skyline View</p>
              <p>&#128222; +81 3 5555 0192</p>
              <p>&#128338; Tue &ndash; Sun: 12:00 PM &ndash; 11:00 PM</p>
            </div>
          </div>

          {/* Col 4: Instagram Grid Preview */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[12px] uppercase tracking-[0.2em] font-semibold text-white">Instagram Feed</h4>
            <div className="grid grid-cols-3 gap-2">
              <div className="h-16 rounded overflow-hidden bg-stone-850">
                <img src="/images/insta1.jpg" alt="Insta 1" className="w-full h-full object-cover hover:scale-105 transition-transform" />
              </div>
              <div className="h-16 rounded overflow-hidden bg-stone-850">
                <img src="/images/insta2.jpg" alt="Insta 2" className="w-full h-full object-cover hover:scale-105 transition-transform" />
              </div>
              <div className="h-16 rounded overflow-hidden bg-stone-850">
                <img src="/images/insta3.jpg" alt="Insta 3" className="w-full h-full object-cover hover:scale-105 transition-transform" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="max-w-7xl mx-auto pt-8 border-t border-stone-850/60 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
          <p className="font-sans text-xs font-light opacity-65 text-stone-300">
            &copy; {new Date().getFullYear()} Saffron Restaurant. All Rights Reserved.
          </p>
          <div className="flex gap-6 font-sans text-xs font-light opacity-65 text-stone-300">
            <a href="#" className="hover:text-gold-500">Privacy Policy</a>
            <a href="#" className="hover:text-gold-500">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
