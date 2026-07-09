import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PreOrderDishCard({ dish, quantity = 0, onAdd, onRemove, theme }) {
  const isDay = theme === "day";
  
  // Style config based on theme
  const colors = {
    text: isDay ? "#1A0F00" : "#F2DEB0",
    desc: isDay ? "#6B5240" : "#A08060",
    border: isDay ? "#E8DFC0" : "#3A2210",
    gold: "#C8A951",
    cardBg: isDay ? "#FAF7F0" : "#1E1008",
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        padding: "16px",
        borderRadius: "12px",
        border: `1px solid ${colors.border}`,
        backgroundColor: colors.cardBg,
        marginBottom: "12px",
        position: "relative",
      }}
      className="select-none"
    >
      {/* Left: Image */}
      <img
        src={dish.image}
        alt={dish.name}
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "8px",
          objectFit: "cover",
          border: `1px solid ${colors.border}`,
        }}
      />

      {/* Middle: Details */}
      <div style={{ flexGrow: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {dish.badge && (
          <span
            style={{
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              color: colors.gold,
              textTransform: "uppercase",
              marginBottom: "3px",
            }}
          >
            {dish.badge}
          </span>
        )}
        <h4
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: "16px",
            fontWeight: 500,
            color: colors.text,
            margin: 0,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {dish.name}
        </h4>
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "12px",
            color: colors.desc,
            margin: "2px 0 4px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            lineHeight: 1.3,
          }}
        >
          {dish.description}
        </p>

        {/* Spice Level (Chilies) */}
        {dish.spiceLevel > 0 && (
          <div style={{ display: "flex", gap: "2px" }}>
            {Array.from({ length: dish.spiceLevel }).map((_, i) => (
              <span key={i} style={{ fontSize: "11px" }}>&#127798;&#65039;</span>
            ))}
          </div>
        )}
      </div>

      {/* Right: Price & Add Button */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          justifyContent: "space-between",
          height: "60px",
          flexShrink: 0,
          width: "100px",
        }}
      >
        {/* Price */}
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "14px",
            fontWeight: 650,
            color: colors.gold,
          }}
        >
          &#8377;{dish.price}
        </span>

        {/* Add Button Area with Layout Animation */}
        <div style={{ height: "30px", display: "flex", alignItems: "center" }}>
          <AnimatePresence mode="wait">
            {quantity === 0 ? (
              <motion.button
                key="add-btn"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                onClick={onAdd}
                style={{
                  padding: "4px 12px",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: colors.gold,
                  border: `1px solid ${colors.gold}`,
                  background: "transparent",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontFamily: "Inter, sans-serif",
                  whiteSpace: "nowrap",
                }}
                className="hover:bg-gold-500/10 transition-colors"
              >
                + Add
              </motion.button>
            ) : (
              <motion.div
                key="qty-ctrl"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  border: `1px solid ${colors.gold}`,
                  borderRadius: "6px",
                  padding: "2px 6px",
                  backgroundColor: "transparent",
                }}
              >
                <button
                  onClick={onRemove}
                  style={{
                    border: "none",
                    background: "transparent",
                    color: colors.gold,
                    fontSize: "14px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    padding: "0 4px",
                    lineHeight: 1,
                  }}
                >
                  &minus;
                </button>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    color: colors.text,
                    minWidth: "14px",
                    textAlign: "center",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {quantity}
                </span>
                <button
                  onClick={onAdd}
                  style={{
                    border: "none",
                    background: "transparent",
                    color: colors.gold,
                    fontSize: "14px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    padding: "0 4px",
                    lineHeight: 1,
                  }}
                >
                  +
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
