import React from "react";
import { useTheme } from "../context/ThemeContext";
import Footer from "../components/Footer";

export default function About() {
  const { theme } = useTheme();
  const isDay = theme === "day";

  const colors = {
    bg: isDay ? "#F7F0E3" : "#120A04",
    cardBg: isDay ? "#FFFFFF" : "#1E1008",
    border: isDay ? "#E8DFC0" : "#3A2210",
    text: isDay ? "#1A0F00" : "#F2DEB0",
    desc: isDay ? "#3D2B1A" : "#A08060",
    gold: "#C8A951",
    saffron: "#C8701A",
  };

  const pillars = [
    {
      title: "Mindful Sourcing",
      desc: "We partner directly with regional organic farmers who honor the soil. Every seed is sown with respect, and every vegetable is harvested at the peak of its seasonal flavor.",
    },
    {
      title: "Ancient Intentions",
      desc: "Our kitchens operate as sanctuaries of focus. We draw inspiration from Ayurvedic principles, preserving natural minerals and maximizing digestability through copperware cooking.",
    },
    {
      title: "Gracious Hospitality",
      desc: "Drawing from the age-old philosophy of 'Atithi Devo Bhava', Saffron's dining experience is designed to feel like an invite to a royal home\u2014unhurried, warm, and personal.",
    },
  ];

  const press = [
    {
      quote: "Saffron has successfully stripped vegetarian dining of its casual tag, elevating it into a true theatrical art form.",
      source: "The Culinary Chronicle",
    },
    {
      quote: "A sanctuary of clean, high-contrast flavors that lingers in your memory long after the dinner candles are put out.",
      source: "Elite Dining Guide",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: colors.bg,
        color: colors.text,
        transition: "all 1.2s ease",
        paddingTop: "120px",
      }}
      className="w-full font-sans select-none"
    >
      <div className="max-w-5xl mx-auto px-6 pb-24">
        
        {/* Editorial Header */}
        <div className="text-center mb-16">
          <span 
            style={{ color: colors.gold, fontWeight: 650 }}
            className="text-xs uppercase tracking-[0.25em] block mb-3"
          >
            &mdash; OUR NARRATIVE &mdash;
          </span>
          <h1 
            style={{ fontFamily: "Playfair Display, serif" }}
            className="text-4xl md:text-5xl font-medium italic mb-6"
          >
            Where Spice Meets Soul
          </h1>
          <div 
            style={{ backgroundColor: colors.gold }}
            className="w-16 h-[1.5px] mx-auto mb-8"
          />
        </div>

        {/* Narrative Text */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-28">
          <div>
            <h3 
              style={{ fontFamily: "Playfair Display, serif" }}
              className="text-2xl md:text-[30px] font-light mb-6 leading-relaxed"
            >
              A vegetarian kitchen rooted in Indian heritage, open to the world.
            </h3>
            <p 
              style={{ color: colors.desc }}
              className="text-sm font-light leading-relaxed mb-6"
            >
              Founded in 2021, Saffron was born from a singular vision: to challenge the perception of vegetarian dining. We sought to replace common, heavy restaurant staples with dishes crafted from fresh, intention-cooked ingredients.
            </p>
            <p 
              style={{ color: colors.desc }}
              className="text-sm font-light leading-relaxed"
            >
              By fusing classical North and South Indian cooking techniques with Western plate presentation styles, Saffron strikes a dialogue between tradition and modernity. Here, the humblest lentils and seasonal roots are treated with the respect reserved for fine delicacies.
            </p>
          </div>
          
          <div className="relative group">
            <div 
              style={{ borderColor: colors.border }}
              className="rounded-2xl border overflow-hidden shadow-2xl relative"
            >
              <img 
                src="/images/about_experience.png" 
                alt="Saffron Luxury Dining Experience" 
                className="w-full h-[380px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div 
                style={{ 
                  background: isDay 
                    ? "linear-gradient(to top, rgba(255,255,255,0.98), rgba(255,255,255,0.85) 60%, rgba(255,255,255,0.1))" 
                    : "linear-gradient(to top, rgba(30,16,8,0.98), rgba(30,16,8,0.85) 60%, rgba(30,16,8,0.1))" 
                }}
                className="absolute inset-0 flex flex-col justify-end p-8"
              >
                <h4 style={{ color: colors.gold }} className="text-xs uppercase tracking-[0.2em] font-bold mb-4">
                  THE SAFFRON PROMISE
                </h4>
                
                <div className="flex flex-col gap-4 text-xs md:text-sm">
                  <div className="flex items-center gap-3">
                    <span className="text-lg" aria-hidden="true">&#127807;</span>
                    <span className="font-semibold">100% Pure Vegetarian Kitchen</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg" aria-hidden="true">&#128105;&#8205;&#127859;</span>
                    <span className="font-semibold">Handmade Small-Batch Spices</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg" aria-hidden="true">&#127806;</span>
                    <span className="font-semibold">Zero Artificial Preservatives</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Pillars */}
        <div className="mb-24">
          <h3 
            style={{ fontFamily: "Playfair Display, serif", textAlign: "center" }}
            className="text-3xl font-light italic mb-12"
          >
            Our Core Philosophy
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((p, idx) => (
              <div 
                key={p.title}
                style={{ 
                  backgroundColor: colors.cardBg,
                  borderColor: colors.border,
                }}
                className="p-6 md:p-8 rounded-xl border flex flex-col gap-4 text-left shadow-sm hover:shadow-md transition-shadow"
              >
                <div style={{ color: colors.gold }} className="text-lg font-serif">
                  0{idx + 1}
                </div>
                <h4 style={{ fontFamily: "Playfair Display, serif" }} className="text-xl font-medium">
                  {p.title}
                </h4>
                <p 
                  style={{ color: colors.desc }}
                  className="text-xs font-light leading-relaxed"
                >
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* The Chef Section */}
        <div 
          style={{ 
            borderColor: colors.border,
            backgroundColor: colors.cardBg,
          }}
          className="p-8 md:p-12 rounded-2xl border mb-24 text-left flex flex-col md:flex-row gap-12 items-center shadow-lg overflow-hidden"
        >
          {/* Chef Image Column */}
          <div className="w-full md:w-2/5 flex-shrink-0">
            <div 
              style={{ borderColor: colors.border }}
              className="rounded-xl border overflow-hidden shadow-md"
            >
              <img 
                src="/images/chef_devendra.png" 
                alt="Chef Devendra Singh" 
                className="w-full h-[320px] object-cover hover:scale-102 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Chef Details Column */}
          <div className="flex-grow">
            <span style={{ color: colors.gold }} className="text-xs uppercase tracking-[0.2em] font-semibold block mb-2">
              THE VISIONARY
            </span>
            <h3 style={{ fontFamily: "Playfair Display, serif" }} className="text-3xl font-medium mb-4">
              Chef Devendra Singh
            </h3>
            
            <p 
              style={{ 
                color: colors.desc, 
                fontStyle: "italic", 
                borderLeft: `2.5px solid ${colors.gold}`,
                paddingLeft: "16px",
              }}
              className="text-sm font-light leading-relaxed mb-6 my-4"
            >
              "Spices are not intended to burn or mask ingredients. A master cook uses them like color pigments on a canvas, layering notes of earthy cumin, sweet cardamom, and warm saffron to awaken the natural qualities of the plant."
            </p>
            
            <p style={{ color: colors.desc }} className="text-sm font-light leading-relaxed">
              With over two decades spent in heritage Lucknow and Awadhi kitchens, Chef Devendra curates Saffron's signature plates, balancing traditional copper-pot recipes with clean, minimalist plate styling.
            </p>
          </div>
        </div>

        {/* Accolades / Quotes */}
        <div>
          <div 
            style={{ backgroundColor: colors.border }}
            className="w-full h-[1px] mb-16"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {press.map((item) => (
              <div key={item.source} className="text-center md:text-left">
                <p 
                  style={{ fontFamily: "Playfair Display, serif" }}
                  className="text-lg italic font-light leading-relaxed mb-4"
                >
                  "{item.quote}"
                </p>
                <span 
                  style={{ color: colors.gold }}
                  className="text-xs uppercase tracking-wider font-semibold"
                >
                  &mdash; {item.source}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}
