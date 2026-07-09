import React from "react";
import { motion } from "framer-motion";

export default function PreOrderSummary({ selectedDishes = [], onEdit, theme }) {
  const isDay = theme === "day";

  if (selectedDishes.length === 0) return null;

  const totalQuantity = selectedDishes.reduce((acc, curr) => acc + curr.quantity, 0);
  const totalAmount = selectedDishes.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

  const colors = {
    bg: isDay ? "#FAF7F0" : "#1E1008",
    border: isDay ? "#E8DFC0" : "#3A2210",
    text: isDay ? "#1A0F00" : "#F2DEB0",
    desc: isDay ? "#6B5240" : "#A08060",
    gold: "#C8A951",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        marginTop: "20px",
        backgroundColor: colors.bg,
        border: `1px solid ${colors.border}`,
        borderRadius: "12px",
        padding: "20px 24px",
        width: "100%",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Summary Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "12px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "16px" }}>&#127869;&#65039;</span>
          <span
            style={{
              fontSize: "14px",
              fontWeight: 650,
              letterSpacing: "0.05em",
              color: colors.text,
            }}
          >
            Pre-ordered Meals
          </span>
        </div>
        <span
          style={{
            fontSize: "12px",
            color: colors.gold,
            fontWeight: 500,
          }}
        >
          &#10022; {totalQuantity} {totalQuantity === 1 ? "item" : "items"}
        </span>
      </div>

      <div
        style={{
          width: "100%",
          height: "1px",
          backgroundColor: colors.border,
          margin: "8px 0 14px",
        }}
      />

      {/* Dish Lines */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {selectedDishes.map((dish) => (
          <div
            key={dish.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "13.5px",
              color: colors.desc,
            }}
          >
            <span>
              {dish.name} <strong style={{ color: colors.gold }}>&times; {dish.quantity}</strong>
            </span>
            <span>&#8377;{dish.price * dish.quantity}</span>
          </div>
        ))}
      </div>

      <div
        style={{
          width: "100%",
          height: "1px",
          borderTop: `1px dashed ${colors.border}`,
          margin: "14px 0 12px",
        }}
      />

      {/* Total row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "14px",
          fontWeight: 650,
          color: colors.text,
          marginBottom: "18px",
        }}
      >
        <span>Total Pre-order</span>
        <span style={{ color: colors.gold, fontSize: "16px" }}>&#8377;{totalAmount}</span>
      </div>

      {/* Edit Order button */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={onEdit}
          style={{
            background: "transparent",
            border: "none",
            color: colors.gold,
            fontSize: "13px",
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "4px",
            padding: "4px 8px",
          }}
          className="hover:opacity-80 transition-opacity"
        >
          Edit Order &rarr;
        </button>
      </div>
    </motion.div>
  );
}
