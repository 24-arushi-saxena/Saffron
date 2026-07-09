import React, { useRef } from "react";
import { toPng } from "html-to-image";

export default function Confirmed({ data, theme }) {
  const isDay = theme === "day";

  const formattedDate = new Date(data.date).toLocaleDateString("en-IN", {
    weekday: "long", year: "numeric",
    month: "long",  day: "numeric",
  });

  const receiptRef = useRef(null);

  const handleDownloadImage = () => {
    if (receiptRef.current === null) {
      return;
    }

    toPng(receiptRef.current, { 
      cacheBust: true,
      backgroundColor: isDay ? "#FFFDF9" : "#160C04",
      style: {
        boxShadow: "none",
      }
    })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `Saffron_Receipt_${data.confirmationCode}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error("Failed to generate receipt image:", err);
      });
  };

  const handleDownload = () => {
    let eventLine = "";
    if (data.eventId && typeof data.eventId === "object") {
      eventLine = `  Special Event     : ${data.eventId.title}\n`;
    }

    let addOnsText = "";
    if (data.addOns) {
      const activeAddOns = [];
      if (data.addOns.birthdayCake) activeAddOns.push("Birthday cake arranged by us");
      if (data.addOns.flowerArrangement) activeAddOns.push("Flower arrangement on table");
      if (data.addOns.candleSetup) activeAddOns.push("Candle setup for the evening");
      if (data.addOns.messageCard) activeAddOns.push("Custom message card");

      if (activeAddOns.length > 0) {
        addOnsText = `\n----------------------------------------------\n  Add-ons:\n` + activeAddOns.map(item => `  - ${item}`).join("\n") + "\n";
      }
    }

    let preOrdersText = "";
    if (data.preOrderedDishes && data.preOrderedDishes.length > 0) {
      preOrdersText = `\n----------------------------------------------\n  Pre-ordered Meals:\n`;
      let totalAmount = 0;
      data.preOrderedDishes.forEach(dish => {
        const lineTotal = dish.price * dish.quantity;
        totalAmount += lineTotal;
        preOrdersText += `  - ${dish.name} (x${dish.quantity}) - \u20B9${lineTotal}\n`;
      });
      preOrdersText += `  Total Pre-order Amount: \u20B9${totalAmount}\n`;
    }

    const receiptText = `
==============================================
                  SAFFRON
     Pure Vegetarian - Indian & Western
==============================================
           RESERVATION RECEIPT
           
  Confirmation Code : #${data.confirmationCode}
  Name              : ${data.name}
${eventLine}  Date              : ${formattedDate}
  Time              : ${data.time}
  Guests            : ${data.guests}
  Occasion          : ${data.occasion}
${addOnsText}${preOrdersText}
----------------------------------------------
  Venue Details:
  12 Heritage Lane, Lucknow,
  Uttar Pradesh \u2014 226001
  Phone : +91 98765 43210
  Email : hello@saffronrestaurant.com
==============================================
  Thank you for choosing Saffron. We look
  forward to hosting you for a splendid dining
  experience.
==============================================
`;

    const element = document.createElement("a");
    const file = new Blob([receiptText], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `Saffron_Receipt_${data.confirmationCode}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const rows = [
    { label: "Confirmation", value: `#${data.confirmationCode}`, gold: true },
    { label: "Name",         value: data.name },
  ];

  if (data.eventId && typeof data.eventId === "object") {
    rows.push({ label: "Special Event", value: data.eventId.title, gold: true });
  }

  rows.push(
    { label: "Date",         value: formattedDate },
    { label: "Time",         value: data.time },
    { label: "Guests",       value: data.guests },
    { label: "Occasion",     value: data.occasion }
  );

  const activeAddOns = [];
  if (data.addOns) {
    if (data.addOns.birthdayCake) activeAddOns.push("Birthday Cake");
    if (data.addOns.flowerArrangement) activeAddOns.push("Flower Arrangement");
    if (data.addOns.candleSetup) activeAddOns.push("Candle Setup");
    if (data.addOns.messageCard) activeAddOns.push("Custom Message Card");
  }

  if (activeAddOns.length > 0) {
    rows.push({ label: "Add-ons", value: activeAddOns.join(", ") });
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: isDay ? "#F7F0E3" : "#120A04",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "60px 20px",
      transition: "background-color 1.2s ease",
    }}>
      <div style={{
        maxWidth: "540px", width: "100%",
        background: isDay ? "#FFFFFF" : "#1E1008",
        border: `1px solid ${isDay ? "#E8DFC0" : "#3A2210"}`,
        borderRadius: "20px", padding: "48px 36px",
        boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
        display: "flex", flexDirection: "column", alignItems: "center",
      }}>
        {/* Top Ornament */}
        <div style={{ fontSize: "28px", color: "#C8A951", marginBottom: "16px", letterSpacing: "0.15em" }}>✦ &nbsp; ✦ &nbsp; ✦</div>

        <h2 style={{
          fontFamily: "Playfair Display, serif",
          fontSize: "34px", fontWeight: 400,
          color: isDay ? "#1A0F00" : "#F2DEB0",
          marginBottom: "8px",
          fontStyle: "italic",
          textAlign: "center",
        }}>
          Table Reserved
        </h2>
        <p style={{ 
          fontSize: "14px", 
          opacity: 0.7, 
          marginBottom: "40px", 
          fontFamily: "Inter, sans-serif", 
          color: isDay ? "#6B5240" : "#A08060",
          textAlign: "center",
          letterSpacing: "0.03em"
        }}>
          An elegant culinary experience is prepared for you.
        </p>

        {/* The Luxury Receipt Slip */}
        <div 
          ref={receiptRef}
          style={{
            width: "100%",
            background: isDay ? "#FFFDF9" : "#160C04",
            border: `1px solid ${isDay ? "#D8CDB0" : "#4A2F13"}`,
            borderRadius: "12px",
            padding: "32px 28px",
            marginBottom: "36px",
            position: "relative",
            boxShadow: isDay ? "0 4px 15px rgba(107,82,64,0.06)" : "0 4px 20px rgba(0,0,0,0.3)",
          }}
        >
          {/* Slip Header */}
          <div style={{ textAlign: "center", marginBottom: "28px" }}>
            <span style={{ 
              fontFamily: "Playfair Display, serif", 
              fontSize: "24px", 
              letterSpacing: "0.25em", 
              color: "#C8A951", 
              fontWeight: 600,
              display: "block"
            }}>
              SAFFRON
            </span>
            <span style={{ 
              display: "block", 
              fontSize: "9px", 
              letterSpacing: "0.2em", 
              opacity: 0.6, 
              marginTop: "6px", 
              color: isDay ? "#6B5240" : "#A08060",
              fontWeight: 600
            }}>
              EST. 2024 &bull; LUCKNOW
            </span>
            
            {/* Dashed Line */}
            <div style={{ 
              borderBottom: `1.5px dashed ${isDay ? "#E2D7C0" : "#4A2F13"}`, 
              margin: "20px 0 0",
              width: "100%" 
            }} />
          </div>

          {/* Details List */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {rows.map((row) => (
              <div key={row.label} style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                fontSize: "14px",
                fontFamily: "Inter, sans-serif",
              }}>
                {/* Label (Small, uppercase, spaced) */}
                <span style={{ 
                  fontSize: "10px", 
                  letterSpacing: "0.15em", 
                  color: "#C8A951", 
                  fontWeight: 700,
                  textTransform: "uppercase"
                }}>
                  {row.label}
                </span>

                {/* Dots connector for luxury paper look */}
                <div style={{
                  flex: 1,
                  borderBottom: `1px dotted ${isDay ? "#E8DFC0" : "#3A2210"}`,
                  margin: "0 10px",
                  height: "1px",
                  opacity: 0.5
                }} />

                {/* Value */}
                <span style={{ 
                  color: row.gold ? "#C8A951" : isDay ? "#1A0F00" : "#FFF8ED", 
                  fontWeight: row.gold ? 700 : 500,
                  fontFamily: row.gold ? "Playfair Display, serif" : "Inter, sans-serif",
                  fontSize: row.gold ? "15px" : "14px",
                }}>
                  {row.value}
                </span>
              </div>
            ))}
          </div>

          {/* Pre-ordered Dishes Section inside the same slip */}
          {data.preOrderedDishes && data.preOrderedDishes.length > 0 && (
            <div style={{ marginTop: "28px" }}>
              {/* Dashed Line Separator */}
              <div style={{ 
                borderBottom: `1.5px dashed ${isDay ? "#E2D7C0" : "#4A2F13"}`, 
                margin: "0 0 24px",
                width: "100%" 
              }} />

              <h4 style={{
                fontSize: "10px",
                color: "#C8A951",
                fontWeight: 700,
                letterSpacing: "0.15em",
                marginBottom: "16px",
                textTransform: "uppercase",
              }}>
                PRE-ORDERED DISHES
              </h4>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {data.preOrderedDishes.map((dish) => (
                  <div key={dish.id} style={{
                    display: "flex", 
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    fontSize: "13px",
                    fontFamily: "Inter, sans-serif",
                  }}>
                    <span style={{ color: isDay ? "#3D2B1A" : "#D2C1AA", fontWeight: 500 }}>
                      {dish.name} 
                      <span style={{ 
                        marginLeft: "8px", 
                        fontSize: "11px", 
                        fontWeight: 700,
                        color: "#C8A951",
                        background: isDay ? "#FFF3DD" : "#2E1D0C",
                        padding: "2px 6px",
                        borderRadius: "4px"
                      }}>
                        x{dish.quantity}
                      </span>
                    </span>

                    {/* Dots connector */}
                    <div style={{
                      flex: 1,
                      borderBottom: `1px dotted ${isDay ? "#E8DFC0" : "#3A2210"}`,
                      margin: "0 10px",
                      height: "1px",
                      opacity: 0.5
                    }} />

                    <span style={{ fontWeight: 600, color: isDay ? "#1A0F00" : "#FFF8ED" }}>₹{dish.price * dish.quantity}</span>
                  </div>
                ))}
              </div>

              {/* Total Line */}
              <div style={{
                display: "flex", 
                justifyContent: "space-between",
                alignItems: "baseline",
                paddingTop: "16px", 
                marginTop: "16px",
                borderTop: `1px dashed ${isDay ? "#E8DFC0" : "#3A2210"}`,
                fontSize: "14px",
                fontWeight: 700,
                fontFamily: "Inter, sans-serif",
              }}>
                <span style={{ fontSize: "11px", letterSpacing: "0.15em", color: "#C8A951", textTransform: "uppercase" }}>Pre-order Total</span>
                <span style={{ color: "#C8A951", fontSize: "16px", fontFamily: "Playfair Display, serif" }}>
                  ₹{data.preOrderedDishes.reduce((sum, item) => sum + (item.price * item.quantity), 0)}
                </span>
              </div>
            </div>
          )}

          {/* Slip Footer Message */}
          <div style={{ textAlign: "center", marginTop: "32px", fontSize: "11px", opacity: 0.5, fontFamily: "Inter, sans-serif", fontStyle: "italic", color: isDay ? "#6B5240" : "#A08060" }}>
            A confirmation voucher has been sent to {data.email || "your email"}.
          </div>
        </div>

        {/* CTA Buttons */}
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap", width: "100%" }}>
          <button
            onClick={handleDownloadImage}
            style={{
              flex: 1,
              minWidth: "160px",
              padding: "14px 24px",
              background: "#C8701A",
              border: "none",
              color: "#FFF5E0",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 700,
              fontFamily: "Inter, sans-serif",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "all 0.3s",
            }}
            className="hover:opacity-90"
          >
            Download Image
          </button>

          <button
            onClick={handleDownload}
            style={{
              flex: 1,
              minWidth: "160px",
              padding: "14px 24px",
              background: "transparent",
              border: `1.5px solid ${isDay ? "#C8701A" : "#C8A951"}`,
              color: isDay ? "#C8701A" : "#C8A951",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 700,
              fontFamily: "Inter, sans-serif",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "all 0.3s",
            }}
            className="hover:bg-gold-500 hover:text-dark-950"
          >
            Download Text
          </button>
          
          <a href="/" style={{
            flex: "1 1 100%",
            textAlign: "center",
            padding: "14px 24px",
            background: "transparent", 
            border: `1px solid ${isDay ? "#E8DFC0" : "#3A2210"}`,
            color: isDay ? "#6B5240" : "#A08060",
            borderRadius: "8px", textDecoration: "none",
            fontSize: "13px", fontWeight: 700,
            fontFamily: "Inter, sans-serif",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            transition: "all 0.3s",
          }}
          className="hover:opacity-85"
          >
            Return to Home
          </a>
        </div>
      </div>
    </div>
  );
}
