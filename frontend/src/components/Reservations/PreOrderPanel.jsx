import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PreOrderDishCard from "./PreOrderDishCard";

const CATEGORIES = [
  "All",
  "The Beginning",
  "From the Subcontinent",
  "The Italian Table",
  "Garden & Greens",
  "The Bread Basket",
  "Something Sweet",
  "The Glass",
  "Chef's Table",
];

export default function PreOrderPanel({ isOpen, onClose, onSave, initialSelection = [], theme }) {
  const isDay = theme === "day";
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedDishes, setSelectedDishes] = useState({});

  // Color tokens
  const colors = {
    bg: isDay ? "#F7F0E3" : "#120A04",
    cardBg: isDay ? "#FFFFFF" : "#1E1008",
    border: isDay ? "#E8DFC0" : "#3A2210",
    text: isDay ? "#1A0F00" : "#F2DEB0",
    desc: isDay ? "#3D2B1A" : "#A08060",
    gold: "#C8A951",
    saffron: "#C8701A",
    overlay: "rgba(0, 0, 0, 0.4)",
  };

  // Sync initial selection
  useEffect(() => {
    if (isOpen) {
      const selectionMap = {};
      initialSelection.forEach((item) => {
        selectionMap[item.id] = { ...item };
      });
      setSelectedDishes(selectionMap);
    }
  }, [isOpen, initialSelection]);

  // Fetch menu dishes
  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      setError(null);
      const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      fetch(`${baseUrl}/menu`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to load menu dishes.");
          return res.json();
        })
        .then((data) => {
          if (data.success) {
            setDishes(data.data);
          } else {
            throw new Error(data.message || "Failed to load dishes.");
          }
        })
        .catch((err) => {
          console.error("Error loading menu:", err);
          setError(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [isOpen]);

  // Add/Remove handlers
  const handleAdd = (dish) => {
    setSelectedDishes((prev) => {
      const current = prev[dish._id] || {
        id: dish._id,
        name: dish.name,
        price: dish.price,
        image: dish.image,
        quantity: 0,
      };
      return {
        ...prev,
        [dish._id]: {
          ...current,
          quantity: current.quantity + 1,
        },
      };
    });
  };

  const handleRemove = (dish) => {
    setSelectedDishes((prev) => {
      const current = prev[dish._id];
      if (!current) return prev;

      if (current.quantity <= 1) {
        const next = { ...prev };
        delete next[dish._id];
        return next;
      }

      return {
        ...prev,
        [dish._id]: {
          ...current,
          quantity: current.quantity - 1,
        },
      };
    });
  };

  // Calculate counts & totals
  const selectedList = Object.values(selectedDishes);
  const totalQuantity = selectedList.reduce((acc, curr) => acc + curr.quantity, 0);
  const subtotal = selectedList.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

  // Generate bottom bar summary text
  const getBottomSummaryText = () => {
    if (selectedList.length === 0) return "No dishes selected yet";
    const firstTwo = selectedList.slice(0, 2);
    const namesText = firstTwo
      .map((item) => `${item.name} \u00d7 ${item.quantity}`)
      .join(", ");
    const remaining = selectedList.length - 2;
    return remaining > 0 ? `${namesText} + ${remaining} more` : namesText;
  };

  // Filtered dishes
  const filteredDishes =
    activeCategory === "All"
      ? dishes
      : dishes.filter((d) => d.category === activeCategory);

  const handleSaveClick = () => {
    onSave(selectedList);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark Overlay (40% dimmed backdrop) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: colors.overlay,
              zIndex: 999,
            }}
          />

          {/* Slide-in Panel (60% width on desktop, full width on mobile) */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4, ease: "easeOut" }}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              height: "100%",
              backgroundColor: colors.bg,
              color: colors.text,
              zIndex: 1000,
              boxShadow: "-8px 0 24px rgba(0, 0, 0, 0.25)",
              display: "flex",
              flexDirection: "column",
              borderLeft: `1px solid ${colors.border}`,
            }}
            className="w-full md:w-[60%] lg:w-[50%] xl:w-[45%] max-w-[650px]"
          >
            {/* 1. PANEL HEADER */}
            <div
              style={{
                padding: "24px 28px 18px",
                borderBottom: `1px solid ${colors.border}`,
              }}
            >
              {/* Top Row: Close and Title */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >
                <button
                  onClick={onClose}
                  style={{
                    border: "none",
                    background: "transparent",
                    color: colors.text,
                    fontSize: "24px",
                    cursor: "pointer",
                    padding: 0,
                  }}
                  className="hover:opacity-75 transition-opacity"
                >
                  &times;
                </button>
                <h3
                  style={{
                    fontFamily: "Playfair Display, serif",
                    fontSize: "24px",
                    fontWeight: 400,
                    margin: 0,
                  }}
                >
                  Pre-order Your Meals
                </h3>
                <div style={{ width: "24px" }} /> {/* Spacer */}
              </div>

              {/* Subtext */}
              <p
                style={{
                  fontSize: "13px",
                  color: colors.desc,
                  margin: "0 0 16px",
                  fontFamily: "Inter, sans-serif",
                  textAlign: "center",
                }}
              >
                Select dishes before you arrive &mdash; helps our kitchen prepare for you
              </p>

              {/* Real-time Counter / Save Bar */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: isDay ? "#FFF8EC" : "#2E1A0A",
                  padding: "10px 16px",
                  borderRadius: "8px",
                  border: `1px solid ${colors.border}`,
                }}
              >
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    fontWeight: 500,
                  }}
                >
                  {totalQuantity} dishes added &middot; Total &#8377;{subtotal}
                </span>
                <button
                  onClick={handleSaveClick}
                  style={{
                    backgroundColor: colors.gold,
                    color: "#1A0F00",
                    border: "none",
                    borderRadius: "6px",
                    padding: "6px 14px",
                    fontSize: "12px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                  className="hover:opacity-90 transition-opacity"
                >
                  &#10003; Save
                </button>
              </div>
            </div>

            {/* 2. CATEGORY TABS */}
            <div
              style={{
                overflowX: "auto",
                whiteSpace: "nowrap",
                padding: "12px 28px",
                borderBottom: `1px solid ${colors.border}`,
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
              className="no-scrollbar"
            >
              <div style={{ display: "flex", gap: "8px" }}>
                {CATEGORIES.map((cat) => {
                  const isActive = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      style={{
                        padding: "6px 14px",
                        borderRadius: "9999px",
                        fontSize: "11px",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        fontFamily: "Inter, sans-serif",
                        cursor: "pointer",
                        border: `1px solid ${colors.gold}`,
                        background: isActive ? colors.gold : "transparent",
                        color: isActive ? "#1A0F00" : colors.gold,
                        transition: "all 0.25s ease",
                      }}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. SCROLLABLE DISH LIST */}
            <div
              style={{
                flexGrow: 1,
                overflowY: "auto",
                padding: "20px 28px",
              }}
            >
              {loading ? (
                <div style={{ textAlign: "center", padding: "40px", color: colors.desc }}>
                  Loading Saffron specialities...
                </div>
              ) : error ? (
                <div style={{ textAlign: "center", padding: "40px", color: "#E05050" }}>
                  {error}
                </div>
              ) : filteredDishes.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px", color: colors.desc }}>
                  No dishes found in this category.
                </div>
              ) : (
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {filteredDishes.map((dish) => (
                    <PreOrderDishCard
                      key={dish._id}
                      dish={dish}
                      quantity={selectedDishes[dish._id]?.quantity || 0}
                      onAdd={() => handleAdd(dish)}
                      onRemove={() => handleRemove(dish)}
                      theme={theme}
                    />
                  ))}
                </motion.div>
              )}
            </div>

            {/* 4. FIXED BOTTOM BAR */}
            <div
              style={{
                padding: "24px 28px",
                borderTop: `1px solid ${colors.border}`,
                backgroundColor: isDay ? "#FAF7F0" : "#1C0F07",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: 500,
                      color: totalQuantity > 0 ? colors.text : colors.desc,
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    {getBottomSummaryText()}
                  </span>
                  {totalQuantity === 0 && (
                    <span style={{ fontSize: "11px", color: colors.desc, marginTop: "2px" }}>
                      Add dishes from the menu above
                    </span>
                  )}
                  {totalQuantity > 0 && (
                    <span style={{ fontSize: "11px", color: colors.gold, marginTop: "2px", fontWeight: 500 }}>
                      Payable at the restaurant
                    </span>
                  )}
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                  <span style={{ fontSize: "12px", color: colors.desc }}>Subtotal</span>
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "18px",
                      fontWeight: 700,
                      color: colors.gold,
                    }}
                  >
                    &#8377;{subtotal}
                  </span>
                </div>
              </div>

              <button
                disabled={totalQuantity === 0}
                onClick={handleSaveClick}
                style={{
                  width: "100%",
                  padding: "14px",
                  fontSize: "14px",
                  fontWeight: 600,
                  borderRadius: "8px",
                  border: "none",
                  cursor: totalQuantity === 0 ? "not-allowed" : "pointer",
                  backgroundColor: totalQuantity === 0 ? (isDay ? "#E0D8C8" : "#2E1A0F") : colors.saffron,
                  color: totalQuantity === 0 ? (isDay ? "#8B7B6A" : "#6B5040") : "#FFF5E0",
                  transition: "all 0.3s ease",
                  textAlign: "center",
                }}
              >
                Done &mdash; Save to Reservation
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
