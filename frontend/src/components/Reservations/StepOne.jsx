import React from "react";

const OCCASIONS = [
  { value: "Casual Dining",        desc: "A relaxed meal for any occasion" },
  { value: "Date Night",           desc: "Intimate candlelit setting" },
  { value: "Family Gathering",     desc: "Comfortable seating for families" },
  { value: "Birthday Celebration", desc: "We will make it special" },
  { value: "Business Lunch",       desc: "Quiet professional atmosphere" },
  { value: "Special Occasion",     desc: "Anniversary, proposal, milestone" },
];

export default function StepOne({ formData, update, next, theme }) {
  const isDay = theme === "day";

  return (
    <div>
      <h2 style={{
        fontFamily: "Playfair Display, serif",
        fontSize: "32px", fontWeight: 400,
        marginBottom: "8px",
        color: isDay ? "#1A0F00" : "#F2DEB0",
      }}>
        What brings you to Saffron?
      </h2>
      <p style={{
        fontSize: "15px", opacity: 0.6,
        marginBottom: "36px",
        fontFamily: "Inter, sans-serif",
      }}>
        This helps us prepare the perfect table for you.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {OCCASIONS.map((o) => {
          const isSelected = formData.occasion === o.value;
          return (
            <div
              key={o.value}
              onClick={() => update({ occasion: o.value })}
              style={{
                padding: "18px 22px",
                borderRadius: "8px",
                border: `1.5px solid ${isSelected ? "#C8A951" : isDay ? "#E8DFC0" : "#3A2210"}`,
                background: isSelected
                  ? isDay ? "#FFF8EC" : "#2E1A0A"
                  : "transparent",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                transition: "all 0.3s",
              }}
            >
              <div>
                <div style={{
                  fontSize: "15px", fontWeight: 500,
                  color: isSelected ? "#C8A951" : isDay ? "#1A0F00" : "#F2DEB0",
                  marginBottom: "3px",
                }}>
                  {o.value}
                </div>
                <div style={{ fontSize: "13px", opacity: 0.6 }}>
                  {o.desc}
                </div>
              </div>
              <div style={{
                width: "20px", height: "20px",
                borderRadius: "50%",
                border: `2px solid ${isSelected ? "#C8A951" : isDay ? "#C4A882" : "#4A2E14"}`,
                background: isSelected ? "#C8A951" : "transparent",
                flexShrink: 0,
                transition: "all 0.3s",
              }} />
            </div>
          );
        })}
      </div>

      <button
        onClick={next}
        disabled={!formData.occasion}
        style={{
          marginTop: "36px",
          padding: "14px 40px",
          background: formData.occasion ? "#C8701A" : "#8B6A40",
          color: "#FFF5E0",
          border: "none",
          borderRadius: "8px",
          fontSize: "15px",
          fontWeight: 500,
          cursor: formData.occasion ? "pointer" : "not-allowed",
          letterSpacing: "0.05em",
          transition: "all 0.3s",
        }}
      >
        Continue &rarr;
      </button>
    </div>
  );
}
