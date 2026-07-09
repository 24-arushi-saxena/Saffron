import React from "react";

const TIME_SLOTS = {
  lunch:  ["12:00 PM","12:30 PM","1:00 PM","1:30 PM","2:00 PM","2:30 PM","3:00 PM"],
  dinner: ["7:00 PM","7:30 PM","8:00 PM","8:30 PM","9:00 PM","9:30 PM","10:00 PM"],
};

const SEATING = [
  "Indoor \u2014 Main Dining Room",
  "Indoor \u2014 Private Corner Table",
  "Window Seat",
];

export default function StepTwo({ formData, update, next, back, theme }) {
  const isDay = theme === "day";

  const inputStyle = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: `1px solid ${isDay ? "#C4A882" : "#4A2E14"}`,
    padding: "10px 0",
    fontSize: "15px",
    color: isDay ? "#1A0F00" : "#F2DEB0",
    outline: "none",
    fontFamily: "Inter, sans-serif",
    marginBottom: "28px",
  };

  const labelStyle = {
    fontSize: "11px",
    letterSpacing: "0.15em",
    color: "#C8A951",
    display: "block",
    marginBottom: "6px",
    fontWeight: 600,
  };

  const isValid =
    formData.name && formData.email && formData.phone &&
    formData.date && formData.time && formData.seatingPreference;

  return (
    <div className="text-left">
      <h2 style={{
        fontFamily: "Playfair Display, serif",
        fontSize: "32px", fontWeight: 400,
        marginBottom: "8px",
        color: isDay ? "#1A0F00" : "#F2DEB0",
      }}>
        Your Details
      </h2>
      <p style={{ fontSize: "15px", opacity: 0.6, marginBottom: "36px", fontFamily: "Inter, sans-serif" }}>
        Tell us a little about your visit.
      </p>

      <label style={labelStyle}>FULL NAME</label>
      <input
        style={inputStyle}
        placeholder="Your full name"
        value={formData.name}
        onChange={(e) => update({ name: e.target.value })}
      />

      <label style={labelStyle}>EMAIL ADDRESS</label>
      <input
        style={inputStyle}
        placeholder="your@email.com"
        value={formData.email}
        onChange={(e) => update({ email: e.target.value })}
      />

      <label style={labelStyle}>PHONE NUMBER</label>
      <input
        style={inputStyle}
        placeholder="+91 98765 43210"
        value={formData.phone}
        onChange={(e) => update({ phone: e.target.value })}
      />

      <label style={labelStyle}>DATE</label>
      <input
        type="date"
        style={{ ...inputStyle, colorScheme: isDay ? "light" : "dark" }}
        value={formData.date}
        min={new Date().toISOString().split("T")[0]}
        onChange={(e) => update({ date: e.target.value })}
      />

      <label style={labelStyle}>TIME</label>
      <div style={{ marginBottom: "28px" }}>
        <div style={{ fontSize: "12px", opacity: 0.5, marginBottom: "10px", fontWeight: 600, letterSpacing: "0.05em" }}>
          LUNCH
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px" }}>
          {TIME_SLOTS.lunch.map((t) => (
            <button
              key={t}
              onClick={() => update({ time: t })}
              style={{
                padding: "7px 14px",
                borderRadius: "999px",
                border: `1px solid ${formData.time === t ? "#C8A951" : isDay ? "#E8DFC0" : "#3A2210"}`,
                background: formData.time === t ? "#C8A951" : "transparent",
                color: formData.time === t ? "#1A0F00" : isDay ? "#3D2B1A" : "#F2DEB0",
                fontSize: "13px",
                cursor: "pointer",
                transition: "all 0.2s",
                fontWeight: 500,
              }}
            >
              {t}
            </button>
          ))}
        </div>
        <div style={{ fontSize: "12px", opacity: 0.5, marginBottom: "10px", fontWeight: 600, letterSpacing: "0.05em" }}>
          DINNER
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {TIME_SLOTS.dinner.map((t) => (
            <button
              key={t}
              onClick={() => update({ time: t })}
              style={{
                padding: "7px 14px",
                borderRadius: "999px",
                border: `1px solid ${formData.time === t ? "#C8A951" : isDay ? "#E8DFC0" : "#3A2210"}`,
                background: formData.time === t ? "#C8A951" : "transparent",
                color: formData.time === t ? "#1A0F00" : isDay ? "#3D2B1A" : "#F2DEB0",
                fontSize: "13px",
                cursor: "pointer",
                transition: "all 0.2s",
                fontWeight: 500,
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <label style={labelStyle}>NUMBER OF GUESTS</label>
      <div style={{
        display: "flex", alignItems: "center",
        gap: "20px", marginBottom: "28px",
      }}>
        <button
          onClick={() => update({ guests: Math.max(1, formData.guests - 1) })}
          style={{
            width: "36px", height: "36px", borderRadius: "50%",
            border: `1px solid ${isDay ? "#C4A882" : "#4A2E14"}`,
            background: "transparent", fontSize: "18px",
            cursor: "pointer", color: isDay ? "#1A0F00" : "#F2DEB0",
          }}
        >&minus;</button>
        <span style={{ fontSize: "22px", fontWeight: 500, minWidth: "30px", textAlign: "center" }}>
          {formData.guests}
        </span>
        <button
          onClick={() => update({ guests: Math.min(12, formData.guests + 1) })}
          style={{
            width: "36px", height: "36px", borderRadius: "50%",
            border: `1px solid ${isDay ? "#C4A882" : "#4A2E14"}`,
            background: "transparent", fontSize: "18px",
            cursor: "pointer", color: isDay ? "#1A0F00" : "#F2DEB0",
          }}
        >+</button>
        <span style={{ fontSize: "13px", opacity: 0.5, fontFamily: "Inter, sans-serif" }}>max 12 guests</span>
      </div>

      <label style={labelStyle}>SEATING PREFERENCE</label>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "36px" }}>
        {SEATING.map((s) => (
          <div
            key={s}
            onClick={() => update({ seatingPreference: s })}
            style={{
              padding: "12px 18px", borderRadius: "8px", cursor: "pointer",
              border: `1px solid ${formData.seatingPreference === s ? "#C8A951" : isDay ? "#E8DFC0" : "#3A2210"}`,
              background: formData.seatingPreference === s
                ? isDay ? "#FFF8EC" : "#2E1A0A"
                : "transparent",
              fontSize: "14px",
              color: formData.seatingPreference === s ? "#C8A951" : isDay ? "#1A0F00" : "#F2DEB0",
              transition: "all 0.3s",
              fontFamily: "Inter, sans-serif",
            }}
          >
            {s}
          </div>
        ))}
      </div>

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
          onClick={next}
          disabled={!isValid}
          style={{
            padding: "14px 40px",
            background: isValid ? "#C8701A" : "#8B6A40",
            color: "#FFF5E0", border: "none",
            borderRadius: "8px", fontSize: "15px",
            fontWeight: 500, cursor: isValid ? "pointer" : "not-allowed",
            transition: "all 0.3s",
          }}
        >
          Continue &rarr;
        </button>
      </div>
    </div>
  );
}
