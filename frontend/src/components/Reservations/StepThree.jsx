import React, { useState } from "react";
import PreOrderPanel from "./PreOrderPanel";
import PreOrderSummary from "./PreOrderSummary";

const ADD_ONS = [
  { key: "birthdayCake",      label: "Birthday cake arranged by us" },
  { key: "flowerArrangement", label: "Flower arrangement on table" },
  { key: "candleSetup",       label: "Candle setup for the evening" },
  { key: "messageCard",       label: "Custom message card" },
];

const HEARD_FROM = ["Google", "Instagram", "Friend", "Walked by", "Other"];

export default function StepThree({ formData, update, back, onSubmit, loading, error, theme }) {
  const isDay = theme === "day";
  const [preOrderOpen, setPreOrderOpen] = useState(false);

  const toggleAddOn = (key) => {
    update({
      addOns: { ...formData.addOns, [key]: !formData.addOns[key] },
    });
  };

  const handleSavePreOrder = (selectedItems) => {
    update({ preOrderedDishes: selectedItems });
  };

  return (
    <div className="text-left">
      <h2 style={{
        fontFamily: "Playfair Display, serif",
        fontSize: "32px", fontWeight: 400,
        marginBottom: "8px",
        color: isDay ? "#1A0F00" : "#F2DEB0",
      }}>
        Anything special?
      </h2>
      <p style={{ fontSize: "15px", opacity: 0.6, marginBottom: "36px", fontFamily: "Inter, sans-serif" }}>
        Optional &mdash; but we love to go the extra mile.
      </p>

      {/* Dietary requirements */}
      <label style={{
        fontSize: "11px", letterSpacing: "0.15em",
        color: "#C8A951", display: "block", marginBottom: "8px",
        fontWeight: 600,
      }}>
        DIETARY REQUIREMENTS OR ALLERGIES
      </label>
      <textarea
        placeholder="e.g. No onion no garlic, gluten free..."
        value={formData.dietaryRequirements}
        onChange={(e) => update({ dietaryRequirements: e.target.value })}
        rows={3}
        style={{
          width: "100%", background: "transparent",
          border: `1px solid ${isDay ? "#E8DFC0" : "#3A2210"}`,
          borderRadius: "8px", padding: "12px 16px",
          fontSize: "14px", color: isDay ? "#1A0F00" : "#F2DEB0",
          outline: "none", resize: "none",
          fontFamily: "Inter, sans-serif",
          marginBottom: "28px",
        }}
      />

      {/* Add Ons */}
      <label style={{
        fontSize: "11px", letterSpacing: "0.15em",
        color: "#C8A951", display: "block", marginBottom: "14px",
        fontWeight: 600,
      }}>
        ADD SOMETHING SPECIAL
      </label>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "28px" }}>
        {ADD_ONS.map((a) => (
          <div
            key={a.key}
            onClick={() => toggleAddOn(a.key)}
            style={{
              display: "flex", alignItems: "center",
              gap: "14px", cursor: "pointer",
              padding: "12px 16px", borderRadius: "8px",
              border: `1px solid ${formData.addOns[a.key] ? "#C8A951" : isDay ? "#E8DFC0" : "#3A2210"}`,
              background: formData.addOns[a.key]
                ? isDay ? "#FFF8EC" : "#2E1A0A"
                : "transparent",
              transition: "all 0.3s",
              fontFamily: "Inter, sans-serif",
            }}
          >
            <div style={{
              width: "20px", height: "20px", borderRadius: "4px", flexShrink: 0,
              border: `2px solid ${formData.addOns[a.key] ? "#C8A951" : isDay ? "#C4A882" : "#4A2E14"}`,
              background: formData.addOns[a.key] ? "#C8A951" : "transparent",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "12px", color: "#1A0F00",
              transition: "all 0.3s",
            }}>
              {formData.addOns[a.key] ? "\u2713" : ""}
            </div>
            <span style={{ fontSize: "14px" }}>{a.label}</span>
          </div>
        ))}

        {/* Pre-order meals row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 20px",
            borderRadius: "8px",
            border: `1px dashed ${isDay ? "#C4A882" : "#4A2E14"}`,
            background: isDay ? "#FAF7F0" : "#1E1008",
            marginTop: "6px",
            fontFamily: "Inter, sans-serif",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <span style={{ fontSize: "20px" }}>&#127869;&#65039;</span>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "14px", fontWeight: 600, color: isDay ? "#1A0F00" : "#F2DEB0" }}>
                Pre-order your meals
              </span>
              <span style={{ fontSize: "12px", color: isDay ? "#6B5240" : "#A08060" }}>
                Choose dishes before you arrive
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setPreOrderOpen(true)}
            style={{
              padding: "8px 16px",
              backgroundColor: "transparent",
              border: "1px solid #C8A951",
              color: "#C8A951",
              borderRadius: "6px",
              fontSize: "12px",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "Inter, sans-serif",
            }}
            className="hover:bg-gold-500/10 transition-colors"
          >
            Browse Menu &rarr;
          </button>
        </div>

        {/* Pre-order Summary */}
        {formData.preOrderedDishes && formData.preOrderedDishes.length > 0 && (
          <PreOrderSummary
            selectedDishes={formData.preOrderedDishes}
            onEdit={() => setPreOrderOpen(true)}
            theme={theme}
          />
        )}
      </div>

      {/* How did you hear about us */}
      <label style={{
        fontSize: "11px", letterSpacing: "0.15em",
        color: "#C8A951", display: "block", marginBottom: "12px",
        fontWeight: 600,
      }}>
        HOW DID YOU HEAR ABOUT US
      </label>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "36px" }}>
        {HEARD_FROM.map((h) => (
          <button
            key={h}
            onClick={() => update({ heardFrom: h })}
            style={{
              padding: "8px 18px", borderRadius: "999px",
              border: `1px solid ${formData.heardFrom === h ? "#C8A951" : isDay ? "#E8DFC0" : "#3A2210"}`,
              background: formData.heardFrom === h ? "#C8A951" : "transparent",
              color: formData.heardFrom === h ? "#1A0F00" : isDay ? "#3D2B1A" : "#F2DEB0",
              fontSize: "13px", cursor: "pointer", transition: "all 0.2s",
              fontWeight: 500,
            }}
          >
            {h}
          </button>
        ))}
      </div>

      {error && (
        <div style={{
          padding: "14px 18px", borderRadius: "8px", marginBottom: "20px",
          background: "rgba(200,50,50,0.1)", border: "1px solid rgba(200,50,50,0.3)",
          color: "#E05050", fontSize: "14px",
        }}>
          {error}
        </div>
      )}

      {/* Navigation Buttons */}
      <div style={{ display: "flex", gap: "12px" }}>
        <button
          onClick={back}
          style={{
            padding: "14px 28px", background: "transparent",
            border: `1px solid ${isDay ? "#C4A882" : "#4A2E14"}`,
            color: isDay ? "#3D2B1A" : "#F2DEB0",
            borderRadius: "8px", fontSize: "15px", cursor: "pointer",
          }}
        >
          &larr; Back
        </button>
        <button
          onClick={onSubmit}
          disabled={loading}
          style={{
            padding: "14px 40px",
            background: loading ? "#8B6A40" : "#C8701A",
            color: "#FFF5E0", border: "none",
            borderRadius: "8px", fontSize: "15px",
            fontWeight: 500, cursor: loading ? "not-allowed" : "pointer",
            letterSpacing: "0.05em", transition: "all 0.3s",
          }}
        >
          {loading ? "Confirming..." : "Confirm Reservation"}
        </button>
      </div>

      {/* Slide-in Pre-order drawer */}
      <PreOrderPanel
        isOpen={preOrderOpen}
        onClose={() => setPreOrderOpen(false)}
        onSave={handleSavePreOrder}
        initialSelection={formData.preOrderedDishes || []}
        theme={theme}
      />
    </div>
  );
}
