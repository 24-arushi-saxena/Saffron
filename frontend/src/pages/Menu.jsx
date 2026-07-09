import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function Menu() {
  const { theme } = useTheme();
  const [activeCategory, setActiveCategory] = useState('the-beginning');

  // Menu categories definitions
  const CATEGORIES = [
    { id: 'the-beginning', name: 'The Beginning', subtitle: 'Starters, soups & small plates', watermark: 'BEGINNING' },
    { id: 'from-the-subcontinent', name: 'From the Subcontinent', subtitle: 'North & South Indian signatures', watermark: 'SUBCONTINENT' },
    { id: 'the-italian-table', name: 'The Italian Table', subtitle: 'Pasta, risotto & wood-fired pizza', watermark: 'ITALIAN' },
    { id: 'garden-greens', name: 'Garden & Greens', subtitle: 'Fresh salads & light plates', watermark: 'GREENS' },
    { id: 'the-bread-basket', name: 'The Bread Basket', subtitle: 'Artisan breads, naan & rice', watermark: 'BREADS' },
    { id: 'something-sweet', name: 'Something Sweet', subtitle: 'Indian & Western desserts', watermark: 'SWEETS' },
    { id: 'the-glass', name: 'The Glass', subtitle: 'Mocktails, lassi, teas & fresh juices', watermark: 'GLASS' },
    { id: 'chefs-table', name: "Chef\u2019s Table", subtitle: "Today\u2019s specials & seasonal dishes", watermark: 'EXCLUSIVES' }
  ];

  // Detailed mock dishes
  const DISHES_DATA = {
    'the-beginning': [
      { id: 1, name: 'Crispy Truffle Samosa', desc: 'Handmade pastry stuffed with spiced potato mash and premium black truffle oil.', price: 290, spice: 1, chefsSpecial: true, image: '/images/menu/the beggening/crispy truffule samosa.png' },
      { id: 2, name: 'Charcoal Grilled Broccoli', desc: 'Smoked broccoli florets marinated in cardamom cream, cheese, and mace.', price: 340, spice: 0, chefsSpecial: false, image: '/images/menu/the beggening/charcoal grilled brocoli.png' },
      { id: 3, name: 'Saffron Tomato Shorba', desc: 'A rich roasted tomato soup infused with organic saffron strands and fresh mint.', price: 260, spice: 1, chefsSpecial: false, image: '/images/menu/the beggening/saffron tomatp shorba.png' }
    ],
    'from-the-subcontinent': [
      { id: 4, name: 'Dal Bukhara', desc: 'Our legendary black lentils, slow-cooked for 24 hours with butter and cream.', price: 420, spice: 1, chefsSpecial: true, image: '/images/menu/from the subcontinent/dal bukhara.png' },
      { id: 5, name: 'Royal Paneer Makhani', desc: 'Soft cottage cheese cubes cooked in a rich, velvety cashew nut and tomato gravy.', price: 480, spice: 2, chefsSpecial: false, image: '/images/menu/from the subcontinent/royal paneer makhani.png' },
      { id: 6, name: 'Avadh Jackfruit Biryani', desc: 'Fragrant basmati rice dum-cooked with layered spices and tender jackfruit.', price: 520, spice: 2, chefsSpecial: false, image: '/images/menu/from the subcontinent/avadh jackfruit biryani.png' }
    ],
    'the-italian-table': [
      { id: 7, name: 'Pesto Wood-Fired Pizza', desc: 'House pesto sauce, fresh buffalo mozzarella, cherry tomatoes, toasted pine nuts.', price: 580, spice: 0, chefsSpecial: true, image: '/images/menu/the italian table/pesto-wood-fired-pasta.png' },
      { id: 8, name: 'Wild Mushroom Penne', desc: 'Sauteed cremini and oyster mushrooms in a rich parmesan truffle cream sauce.', price: 540, spice: 1, chefsSpecial: false, image: '/images/menu/the italian table/wild mashroom penne.png' },
      { id: 9, name: 'Heirloom Tomato Gnocchi', desc: 'Delicate hand-rolled potato dumplings in fresh basil and crushed tomato reduction.', price: 520, spice: 1, chefsSpecial: false, image: '/images/menu/the italian table/heirloom tomato gnocchi.png' }
    ],
    'garden-greens': [
      { id: 10, name: 'Burrata Fig Salad', desc: 'Creamy burrata cheese served with fresh seasonal figs, wild rocket, and balsamic glaze.', price: 460, spice: 0, chefsSpecial: true, image: '/images/menu/garden and greens/burrata fig salad.png' },
      { id: 11, name: 'Saffron Quinoa Bowl', desc: 'Toasted white quinoa, organic cucumbers, red radish, roasted chickpeas, tahini.', price: 390, spice: 1, chefsSpecial: false, image: '/images/menu/garden and greens/saffron quinoa bowl.png' },
      { id: 12, name: 'Avocado Garden Crunch', desc: 'Hand-mashed Hass avocado, green apple slices, sunflower seeds, lime leaf dressing.', price: 440, spice: 0, chefsSpecial: false, image: '/images/menu/garden and greens/avocardo garden crunch.png' }
    ],
    'the-bread-basket': [
      { id: 13, name: 'Truffle Butter Naan', desc: 'Fresh clay-oven leavened flatbread brushed generously with black truffle butter.', price: 160, spice: 0, chefsSpecial: true, image: '/images/menu/the bread basket/truffle butter naan.png' },
      { id: 14, name: 'Garlic Coriander Roti', desc: 'Whole wheat tandoori flatbread topped with toasted garlic flakes and fresh cilantro.', price: 110, spice: 0, chefsSpecial: false, image: '/images/menu/the bread basket/garlic coriander roti.png' },
      { id: 15, name: 'Saffron Pulao', desc: 'Aromatic basmati rice steamed with saffron threads, roasted almonds, and raisins.', price: 290, spice: 0, chefsSpecial: false, image: '/images/menu/the bread basket/saffron pulao.png' }
    ],
    'something-sweet': [
      { id: 16, name: 'Deconstructed Rasmalai', desc: 'Cottage cheese sponge disks soaked in saffron-infused milk, pistachio dust.', price: 320, spice: 0, chefsSpecial: true, image: '/images/menu/something sweet/deconstructed rasmalai.png' },
      { id: 17, name: 'Warm Chocolate Fondant', desc: 'Molten center dark chocolate cake served with single-origin cardamom ice cream.', price: 360, spice: 0, chefsSpecial: false, image: '/images/menu/something sweet/warm chocolate foundant.png' },
      { id: 18, name: 'Rose Petal Kulfi', desc: 'Traditional slow-churned Indian ice cream infused with organic rose petals.', price: 240, spice: 0, chefsSpecial: false, image: '/images/menu/something sweet/rose petal kulfi.png' }
    ],
    'the-glass': [
      { id: 19, name: 'Saffron Cardamom Lassi', desc: 'Creamy sweet yogurt drink blended with saffron strands and green cardamom.', price: 220, spice: 0, chefsSpecial: true, image: '/images/menu/the glass/saffron cardamom lassi.png' },
      { id: 20, name: 'Hibiscus Mint Mocktail', desc: 'Cold-pressed hibiscus infusion, fresh lime juice, mint leaves, sparkling soda.', price: 260, spice: 0, chefsSpecial: false, image: '/images/menu/the glass/hibiscus mint mocktail.png' },
      { id: 21, name: 'Kashmiri Kahwa Tea', desc: 'Green tea leaves brewed with cinnamon, green cardamom, saffron, sliced almonds.', price: 180, spice: 0, chefsSpecial: false, image: '/images/menu/the glass/kashmiri khawa tea.png' }
    ],
    'chefs-table': [
      { id: 22, name: 'Truffle Mushroom Risotto', desc: 'A slow-cooked premium arborio rice with hand-picked wild forest mushrooms, finished with aged parmesan cheese shavings and white truffle oil drizzle.', price: 950, availability: 'Seasonal \u00b7 Limited availability', image: '/images/menu/the italian table/wild mashroom penne.png' },
      { id: 23, name: 'Smoked Tandoori Avocado', desc: 'Whole Haas avocado light-charred in clay oven, stuffed with spicy cottage cheese crumbles and served over warm cashew cream gravy.', price: 890, availability: 'Exclusive \u00b7 Daily signature', image: '/images/smoked tandoori avacardo.png' }
    ]
  };

  // Color Tokens based on theme context
  const colors = {
    bg: theme === 'night' ? '#120A04' : '#F7F0E3', // Deep ebony / Warm parchment
    cardBg: theme === 'night' ? '#1E1008' : '#FFFFFF', // Dark mahogany / Pure white
    border: theme === 'night' ? '#3A2210' : '#E8DFC0',
    borderHover: theme === 'night' ? '#E0BC5A' : '#C8A951',
    dishName: theme === 'night' ? '#F2DEB0' : '#1A0F00', // Warm ivory / Espresso
    desc: theme === 'night' ? '#A08060' : '#6B5240', // Muted amber / Warm grey
    price: theme === 'night' ? '#FFAB40' : '#C8701A', // Flame amber / Saffron
    watermark: theme === 'night' ? 'rgba(200, 169, 81, 0.08)' : 'rgba(200, 169, 81, 0.06)',
    navActive: '#C8A951',
    navInactive: theme === 'night' ? '#6B4A30' : '#8B6A50'
  };

  // ScrollSpy to track active section
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-25% 0px -55% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveCategory(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    CATEGORIES.forEach((cat) => {
      const el = document.getElementById(cat.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Dish Card Component with Local Hover State
  function DishCard({ dish }) {
    const [hovered, setHovered] = useState(false);

    return (
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          backgroundColor: colors.cardBg,
          borderColor: hovered ? colors.borderHover : colors.border,
          borderWidth: '1px',
          borderStyle: 'solid',
          borderRadius: '12px',
          overflow: 'hidden',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
          boxShadow: hovered ? '0 12px 24px rgba(28, 16, 8, 0.15)' : '0 2px 8px rgba(0, 0, 0, 0.02)',
          zIndex: 10,
          position: 'relative'
        }}
        className="flex flex-col h-full"
      >
        {/* Dish Photo */}
        <div className="h-44 overflow-hidden relative">
          <img
            src={dish.image}
            alt={dish.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.5s ease',
              transform: hovered ? 'scale(1.05)' : 'scale(1)'
            }}
          />
        </div>

        {/* Details Content */}
        <div className="p-6 flex flex-col justify-between flex-grow">
          <div className="flex flex-col gap-2">
            {/* Chef's special badge */}
            {dish.chefsSpecial && (
              <span
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '10px',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.2em',
                  color: colors.borderHover,
                  marginBottom: '4px'
                }}
              >
                &mdash;&mdash; CHEF'S SPECIAL &mdash;&mdash;
              </span>
            )}

            {/* Dish Name (Playfair Display 22px) */}
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '22px',
                fontWeight: 500,
                color: hovered ? '#C8701A' : colors.dishName, // Shifts to saffron orange on hover
                transition: 'color 0.3s ease'
              }}
            >
              {dish.name}
            </h3>

            {/* Description (Inter 14px muted) */}
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                fontWeight: 400,
                color: colors.desc,
                lineHeight: '1.5'
              }}
            >
              {dish.desc}
            </p>
          </div>

          {/* Spice & Price */}
          <div className="flex justify-between items-center pt-4 mt-4 border-t border-stone-200/50 dark:border-stone-850">
            {/* Spice levels (chili icons) */}
            <div className="flex gap-0.5">
              {Array.from({ length: dish.spice }).map((_, idx) => (
                <span key={idx} className="text-xs">&#127798;&#65039;</span>
              ))}
            </div>
            {/* Price (Inter 16px) */}
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '16px',
                fontWeight: 500,
                color: colors.price
              }}
            >
              &#8377; {dish.price}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: colors.bg,
        transition: 'background-color 1s ease-in-out',
        minHeight: '100vh'
      }}
      className="w-full pt-28"
    >
      {/* ========================================================================= */}
      {/* 0. PAGE OPENING (Menu Book Styled Intro) */}
      {/* ========================================================================= */}
      <div className="text-center py-16 px-6 max-w-2xl mx-auto flex flex-col items-center select-none">
        <p className="text-[12px] uppercase tracking-[0.25em] font-semibold text-gold-500 mb-2">
          &mdash; SAFFRON &mdash;
        </p>
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '52px',
            fontWeight: 400,
            fontStyle: 'italic',
            color: colors.dishName
          }}
          className="mb-6"
        >
          Our Menu
        </h1>

        {/* Thin gold rule above */}
        <div style={{ width: '120px', height: '1px', backgroundColor: '#C8A951', margin: '8px auto 16px' }} />

        <p
          className="font-serif italic text-base leading-relaxed text-center"
          style={{ color: colors.desc }}
        >
          Crafted fresh. Served with intention.<br />
          Every dish tells a story of two worlds.
        </p>

        {/* Thin gold rule below */}
        <div style={{ width: '120px', height: '1px', backgroundColor: '#C8A951', margin: '16px auto 8px' }} />
      </div>

      {/* ========================================================================= */}
      {/* 1. CATEGORY NAVIGATION - MOBILE (Horizontal scroll pill row) */}
      {/* ========================================================================= */}
      <div 
        className="md:hidden sticky top-16 z-30 py-3 overflow-x-auto whitespace-nowrap px-4 border-b transition-colors duration-500"
        style={{ backgroundColor: colors.bg, borderColor: colors.border }}
      >
        <div className="flex gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => scrollToSection(cat.id)}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '11px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: activeCategory === cat.id ? '#FFFFFF' : colors.navInactive,
                backgroundColor: activeCategory === cat.id ? colors.navActive : 'transparent',
                padding: '6px 14px',
                borderRadius: '9999px',
                border: activeCategory === cat.id ? 'none' : `1px solid ${colors.border}`,
                transition: 'all 0.3s ease'
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. MENU CONTENT WRAPPER */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex gap-12 pt-6 pb-24">
        
        {/* LEFT SIDEBAR - DESKTOP ONLY (Fixed vertical navigation list) */}
        <aside className="hidden md:block w-64 flex-shrink-0">
          <div className="sticky top-28 flex flex-col gap-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => scrollToSection(cat.id)}
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  color: activeCategory === cat.id ? colors.navActive : colors.navInactive,
                  textAlign: 'left',
                  padding: '6px 0',
                  transition: 'all 0.3s ease',
                  borderBottom: activeCategory === cat.id ? '1px solid #C8A951' : '1px solid transparent',
                  width: 'fit-content'
                }}
                className="hover:opacity-90"
              >
                {cat.name}
              </button>
            ))}
          </div>
        </aside>

        {/* RIGHT CONTENT AREA (Scrollable dish category sections) */}
        <div className="flex-grow flex flex-col gap-16">
          {CATEGORIES.map((cat) => {
            const dishes = DISHES_DATA[cat.id] || [];
            const isChefsTable = cat.id === 'chefs-table';

            return (
              <section
                key={cat.id}
                id={cat.id}
                style={{
                  scrollMarginTop: '120px',
                  position: 'relative'
                }}
                className="w-full"
              >
                {/* --- CHAPTER HEADER --- */}
                <div className="mb-10 text-left border-l-2 border-gold-500 pl-4 z-10 relative">
                  <h2
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: '32px',
                      fontWeight: 500,
                      color: colors.dishName
                    }}
                  >
                    {cat.name}
                  </h2>
                  <p
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '14px',
                      color: colors.desc
                    }}
                    className="italic font-light"
                  >
                    {cat.subtitle}
                  </p>
                </div>

                {/* --- GHOST WATERMARK --- */}
                <div
                  style={{
                    position: 'absolute',
                    top: isChefsTable ? '10%' : '35%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 'clamp(50px, 9.5vw, 120px)',
                    fontWeight: 400,
                    textTransform: 'uppercase',
                    letterSpacing: '0.25em',
                    color: colors.watermark,
                    userSelect: 'none',
                    pointerEvents: 'none',
                    zIndex: 0,
                    whiteSpace: 'nowrap',
                    transition: 'opacity 0.8s ease'
                  }}
                >
                  {cat.watermark}
                </div>

                {/* --- SECTION ITEMS CONTENT --- */}
                {isChefsTable ? (
                  /* Editorial Magazine Spread Layout for Chef's Table */
                  <div className="flex flex-col gap-12 z-10 relative">
                    {dishes.map((dish, index) => (
                      <div
                        key={dish.id}
                        className={`flex flex-col ${
                          index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                        } gap-8 items-center py-6 border-b border-stone-200/40 dark:border-stone-850/40`}
                      >
                        {/* Large Editorial Image */}
                        <div className="w-full md:w-1/2 h-72 rounded-xl overflow-hidden shadow-xl bg-stone-900/10">
                          <img
                            src={dish.image}
                            alt={dish.name}
                            className="w-full h-full object-cover hover:scale-102 transition-transform duration-700"
                          />
                        </div>

                        {/* Editorial Details */}
                        <div className="w-full md:w-1/2 flex flex-col justify-center text-left md:px-6">
                          <span
                            style={{
                              fontFamily: 'Inter, sans-serif',
                              fontSize: '10px',
                              fontWeight: 500,
                              textTransform: 'uppercase',
                              letterSpacing: '0.2em',
                              color: colors.borderHover
                            }}
                            className="mb-2 block"
                          >
                            {dish.availability}
                          </span>

                          <h3
                            style={{
                              fontFamily: "'Playfair Display', serif",
                              fontSize: '32px',
                              fontWeight: 500,
                              color: colors.dishName
                            }}
                            className="mb-2"
                          >
                            {dish.name}
                          </h3>

                          {/* Decorative gold rule */}
                          <div style={{ width: '80px', height: '1px', backgroundColor: '#C8A951', marginBottom: '16px' }} />

                          <p
                            style={{
                              fontFamily: 'Inter, sans-serif',
                              fontSize: '15px',
                              fontWeight: 400,
                              color: colors.desc,
                              lineHeight: '1.6'
                            }}
                            className="mb-4"
                          >
                            {dish.desc}
                          </p>

                          <span
                            style={{
                              fontFamily: 'Inter, sans-serif',
                              fontSize: '20px',
                              fontWeight: 500,
                              color: colors.price
                            }}
                          >
                            &#8377; {dish.price}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* Standard 3-Column Luxury Menu Card Grid */
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 z-10 relative">
                    {dishes.map((dish) => (
                      <DishCard key={dish.id} dish={dish} />
                    ))}
                  </div>
                )}

                {/* --- DECORATIVE DIVIDER BETWEEN CATEGORIES --- */}
                <div className="flex items-center justify-center gap-4 pt-16 pb-4 text-gold-500 opacity-60">
                  <div style={{ width: '80px', height: '1px', backgroundColor: '#C8A951' }} />
                  <span className="text-xs">&#10022;</span>
                  <div style={{ width: '80px', height: '1px', backgroundColor: '#C8A951' }} />
                </div>

              </section>
            );
          })}
        </div>

      </div>
    </div>
  );
}
