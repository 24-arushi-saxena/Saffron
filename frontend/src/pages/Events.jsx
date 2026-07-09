import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const DEFAULT_EVENTS = [
  {
    _id: "6a4f3ed67bc697d0cd09fdcb",
    title: "The Chef's Table",
    subtitle: "An 8-Course Culinary Journey",
    badge: "Tasting Menu",
    description: "An exclusive gathering where master chefs reveal forgotten recipes of the subcontinent, prepared with custom spice blends and contemporary techniques.",
    date: "2026-07-23T00:00:00.000Z",
    time: "7:30 PM",
    pricePerGuest: 4500,
    totalSeats: 30,
    seatsRemaining: 6,
    type: "public",
    isActive: true,
  },
  {
    _id: "6a4f3ed67bc697d0cd09fdcc",
    title: "Sufi & Spice",
    subtitle: "A Night of Melodies & Royal Plates",
    badge: "Live Performance",
    description: "Immerse yourself in live acoustic Sufi music under soft candlelight, paired with a custom royal Awadhi banquet menu curated for the night.",
    date: "2026-08-08T00:00:00.000Z",
    time: "8:00 PM",
    pricePerGuest: 5000,
    totalSeats: 24,
    seatsRemaining: 4,
    type: "public",
    isActive: true,
  },
  {
    _id: "6a4f3ed67bc697d0cd09fdcd",
    title: "The Saffron Harvest",
    subtitle: "Celebrating Seasonal Abundance",
    badge: "Seasonal Feast",
    description: "A celebration of fresh monsoon harvest ingredients. A fully organic farm-to-table menu paired with premium mocktails and custom artisanal desserts.",
    date: "2026-08-23T00:00:00.000Z",
    time: "1:00 PM",
    pricePerGuest: 3500,
    totalSeats: 40,
    seatsRemaining: 40,
    type: "public",
    isActive: true,
  },
];

const PRIVATE_SPACES = [
  {
    name: "The Royal Alcove",
    capacity: "Up to 14 guests",
    description: "A secluded corner draped in handcrafted silk wall coverings, featuring a single imperial walnut dining table. Perfect for close family events or business gatherings.",
    highlights: ["Dedicated butler service", "Customized menu printing", "Private music acoustics"],
    images: [
      "/images/spaces/royal_alcove_1.png",
      "/images/spaces/royal_alcove_2.png",
      "/images/spaces/royal_alcove_3.png"
    ],
  },
  {
    name: "The Grand Dining Hall",
    capacity: "Up to 75 guests",
    description: "Rent the entire Saffron space. Perfect for milestone celebrations, intimate wedding banquets, or corporate dinners with customized ambient lighting.",
    highlights: ["Full bar & mocktail counter access", "Valet parking service", "Custom floral setup options"],
    images: [
      "/images/experience.jpg",
      "/images/hero/table.jpg",
      "/images/insta2.jpg"
    ],
  },
];

export default function Events() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState("public"); // "public" or "private"
  const [filter, setFilter] = useState("All");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [submittedInquiryDetails, setSubmittedInquiryDetails] = useState(null);
  const [inquirySent, setInquirySent] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    guests: 10,
    space: "The Royal Alcove",
    occasion: "Birthday Celebration",
    notes: "",
  });

  useEffect(() => {
    const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
    fetch(`${baseUrl}/events`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data && data.data.length > 0) {
          setEvents(data.data);
        } else {
          setEvents(DEFAULT_EVENTS);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch events from API:", err);
        setEvents(DEFAULT_EVENTS);
        setLoading(false);
      });
  }, []);

  const isDay = theme === "day";

  const styles = {
    page: {
      minHeight: "100vh",
      background: isDay ? "#F7F0E3" : "#120A04",
      color: isDay ? "#1A0F00" : "#F2DEB0",
      transition: "all 1.2s ease",
      paddingTop: "120px",
      paddingBottom: "80px",
    },
    banner: {
      textAlign: "center",
      marginBottom: "52px",
    },
    label: {
      fontSize: "12px",
      letterSpacing: "0.25em",
      color: "#C8A951",
      marginBottom: "12px",
      display: "block",
      fontWeight: 650,
    },
    title: {
      fontFamily: "Playfair Display, serif",
      fontSize: "clamp(36px, 5vw, 52px)",
      fontWeight: 400,
      fontStyle: "italic",
      margin: "0 0 16px",
    },
    sub: {
      fontSize: "15px",
      opacity: 0.65,
      fontFamily: "Inter, sans-serif",
      maxWidth: "640px",
      margin: "0 auto",
      lineHeight: 1.6,
    },
    tabsContainer: {
      display: "flex",
      justifyContent: "center",
      gap: "24px",
      marginBottom: "60px",
    },
    tabButton: (isActive) => ({
      background: "transparent",
      border: "none",
      borderBottom: `2.5px solid ${isActive ? "#C8A951" : "transparent"}`,
      color: isActive ? "#C8A951" : isDay ? "#6B5240" : "#A08060",
      fontSize: "14px",
      fontWeight: 600,
      letterSpacing: "0.15em",
      padding: "8px 16px",
      cursor: "pointer",
      textTransform: "uppercase",
      transition: "all 0.3s ease",
    }),
    grid: {
      maxWidth: "1150px",
      margin: "0 auto",
      padding: "0 24px",
    },
    card: {
      background: isDay ? "#FFFFFF" : "#1E1008",
      border: `1px solid ${isDay ? "#E8DFC0" : "#3A2210"}`,
      borderRadius: "16px",
      padding: "36px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      transition: "all 0.3s ease",
      boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
    },
  };

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    try {
      const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const response = await fetch(`${baseUrl}/events/inquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: inquiryForm.name,
          email: inquiryForm.email,
          phone: inquiryForm.phone,
          space: inquiryForm.space,
          preferredDate: inquiryForm.eventDate,
          guestCount: inquiryForm.guests,
          occasion: inquiryForm.occasion,
          message: inquiryForm.notes,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setSubmittedInquiryDetails({
          name: inquiryForm.name,
          space: inquiryForm.space,
          date: new Date(inquiryForm.eventDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          email: inquiryForm.email,
        });
        setInquirySent(true);
        setTimeout(() => {
          setInquirySent(false);
          setSubmittedInquiryDetails(null);
          setInquiryForm({
            name: "",
            email: "",
            phone: "",
            eventDate: "",
            guests: 10,
            space: "The Royal Alcove",
            occasion: "Birthday Celebration",
            notes: "",
          });
        }, 8000); // show the beautiful custom receipt for 8 seconds
      }
    } catch (err) {
      console.error("Failed to submit inquiry to API:", err);
    }
  };

  const getCountdown = (eventDateStr, timeStr) => {
    const eventDate = new Date(eventDateStr);
    let hours = 0;
    let minutes = 0;
    if (timeStr) {
      const match = timeStr.match(/^(\d+):(\d+)\s*(AM|PM)$/i);
      if (match) {
        let h = parseInt(match[1]);
        const m = parseInt(match[2]);
        const ampm = match[3].toUpperCase();
        if (ampm === "PM" && h < 12) h += 12;
        if (ampm === "AM" && h === 12) h = 0;
        hours = h;
        minutes = m;
      }
    }
    eventDate.setHours(hours, minutes, 0, 0);

    const diffMs = eventDate.getTime() - Date.now();
    if (diffMs <= 0) {
      return "Event has started";
    }

    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    const displayHours = diffHours % 24;
    const displayMins = diffMins % 60;

    if (diffDays > 0) {
      return `${diffDays} days ${displayHours} hours ${displayMins} mins until this event`;
    } else if (displayHours > 0) {
      return `${displayHours} hours ${displayMins} mins until this event`;
    } else {
      return `${displayMins} mins until this event`;
    }
  };

  const filteredEvents = events.filter((event) => {
    if (filter === "All") return true;
    const eventDate = new Date(event.date);
    const today = new Date();

    if (filter === "This Month") {
      return (
        eventDate.getMonth() === today.getMonth() &&
        eventDate.getFullYear() === today.getFullYear()
      );
    }

    if (filter === "Next Month") {
      const nextMonth = (today.getMonth() + 1) % 12;
      const nextMonthYear = today.getFullYear() + (today.getMonth() === 11 ? 1 : 0);
      return (
        eventDate.getMonth() === nextMonth &&
        eventDate.getFullYear() === nextMonthYear
      );
    }

    if (filter === "Special") {
      return (
        event.badge === "Tasting Menu" ||
        event.pricePerGuest >= 4000
      );
    }

    return true;
  });

  return (
    <div style={styles.page}>
      {/* Editorial Header */}
      <div style={styles.banner} className="select-none px-6">
        <span style={styles.label}>&mdash; SAFFRON EVENTS &mdash;</span>
        <h1 style={styles.title}>Evenings Designed to be Remembered</h1>
        <p style={styles.sub}>
          From intimate chef's table dinners to grand private celebrations &mdash; every Saffron event is crafted with the same intention as our food. Unhurried. Personal. Unforgettable.
        </p>
      </div>

      {/* Tab Selectors */}
      <div style={styles.tabsContainer} className="select-none">
        <button
          onClick={() => setActiveTab("public")}
          style={styles.tabButton(activeTab === "public")}
        >
          Curated Public Events
        </button>
        <button
          onClick={() => setActiveTab("private")}
          style={styles.tabButton(activeTab === "private")}
        >
          Private Celebrations
        </button>
      </div>

      {/* Filter Row */}
      {activeTab === "public" && (
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "12px",
          marginBottom: "36px",
          flexWrap: "wrap",
        }}>
          {["All", "This Month", "Next Month", "Special"].map((f) => {
            const isFilterActive = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  background: isFilterActive ? "#C8A951" : "transparent",
                  border: `1.5px solid ${isFilterActive ? "#C8A951" : isDay ? "#E8DFC0" : "#4A2E14"}`,
                  color: isFilterActive ? "#1A0F00" : isDay ? "#1A0F00" : "#F2DEB0",
                  padding: "6px 18px",
                  borderRadius: "99px",
                  fontSize: "12px",
                  fontWeight: 650,
                  letterSpacing: "0.05em",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >
                {f}
              </button>
            );
          })}
        </div>
      )}

      {/* Main Grid */}
      <div style={styles.grid}>
        {activeTab === "public" ? (
          loading ? (
            <div style={{ textAlign: "center", padding: "40px", color: "#C8A951", fontSize: "16px" }}>
              Loading curated events...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredEvents.map((event) => {
                const percentFull = Math.round(((event.totalSeats - event.seatsRemaining) / event.totalSeats) * 100);
                const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                });
                const dateQuery = event.date.split("T")[0];
                const timeQuery = encodeURIComponent(event.time);
                const bookingUrl = `/reservations?date=${dateQuery}&time=${timeQuery}&occasion=Special Occasion&eventId=${event._id}`;
                const countdown = getCountdown(event.date, event.time);
                const showCountdown = event.seatsRemaining <= 10 && countdown !== "Event has started";

                return (
                  <div
                    key={event._id || event.title}
                    style={styles.card}
                    className="hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="text-left">
                      <span
                        style={{
                          fontSize: "10px",
                          fontWeight: 650,
                          letterSpacing: "0.15em",
                          color: "#C8A951",
                          border: `1.2px solid ${isDay ? "#E8DFC0" : "#4A2E14"}`,
                          padding: "4px 10px",
                          borderRadius: "99px",
                          display: "inline-block",
                          marginBottom: "20px",
                        }}
                      >
                        {(event.badge || "EVENT").toUpperCase()}
                      </span>

                      {showCountdown && (
                        <div
                          style={{
                            fontSize: "11px",
                            color: "#C8A951",
                            marginBottom: "12px",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            fontWeight: 500,
                          }}
                        >
                          &#9203; {countdown}
                        </div>
                      )}

                      <h3
                        style={{
                          fontFamily: "Playfair Display, serif",
                          fontSize: "26px",
                          fontWeight: 400,
                          marginBottom: "6px",
                        }}
                      >
                        {event.title}
                      </h3>
                      <h4
                        style={{
                          fontSize: "14px",
                          opacity: 0.8,
                          fontStyle: "italic",
                          marginBottom: "20px",
                          color: "#C8A951",
                        }}
                      >
                        {event.subtitle}
                      </h4>
                      <p
                        style={{
                          fontSize: "14px",
                          opacity: 0.65,
                          lineHeight: 1.6,
                          marginBottom: "24px",
                          fontFamily: "Inter, sans-serif",
                        }}
                      >
                        {event.description}
                      </p>
                    </div>

                    <div
                      style={{
                        borderTop: `1px solid ${isDay ? "#E8DFC0" : "#3A2210"}`,
                        paddingTop: "20px",
                        textAlign: "left",
                      }}
                    >
                      <div style={{ fontSize: "13px", marginBottom: "6px", fontFamily: "Inter, sans-serif" }}>
                        &#128197; <strong className="font-semibold">{formattedDate}</strong>
                      </div>
                      <div style={{ fontSize: "13px", marginBottom: "6px", fontFamily: "Inter, sans-serif" }}>
                        &#128338; {event.time}
                      </div>
                      <div style={{ fontSize: "13px", marginBottom: "12px", color: "#C8A951", fontWeight: 500 }}>
                        &#128142; &#8377; {event.pricePerGuest.toLocaleString("en-IN")} per guest
                      </div>

                      {/* Capacity Bar */}
                      <div style={{ marginTop: "12px", marginBottom: "20px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", opacity: 0.85, color: "#C8A951", marginBottom: "6px" }}>
                          <span>{event.seatsRemaining === 0 ? "Fully Booked" : `Only ${event.seatsRemaining} seats remaining`}</span>
                          <span>{percentFull}% full</span>
                        </div>
                        <div style={{ height: "6px", width: "100%", background: isDay ? "#E8DFC0" : "#3A2210", borderRadius: "3px", overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${percentFull}%`, background: "#C8A951", transition: "width 0.5s ease" }} />
                        </div>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          alignItems: "center",
                        }}
                      >
                        <Link
                          to={bookingUrl}
                          style={{
                            color: "#C8701A",
                            fontWeight: 650,
                            textDecoration: "none",
                            fontSize: "12px",
                          }}
                          className="hover:underline"
                        >
                          Book Table &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 text-left">
            {/* Spaces Info */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              {PRIVATE_SPACES.map((space) => (
                <div
                  key={space.name}
                  style={{
                    background: isDay ? "#FFFFFF" : "#1E1008",
                    border: `1px solid ${isDay ? "#E8DFC0" : "#3A2210"}`,
                    borderRadius: "16px",
                    padding: "36px",
                  }}
                >
                  <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
                    <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: "28px", fontWeight: 400 }}>
                      {space.name}
                    </h3>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 600,
                        letterSpacing: "0.1em",
                        color: "#C8A951",
                        background: isDay ? "#FFF8EC" : "#2E1A0A",
                        padding: "4px 12px",
                        borderRadius: "99px",
                      }}
                    >
                      &#128101; {space.capacity.toUpperCase()}
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "14px",
                      opacity: 0.7,
                      lineHeight: 1.6,
                      marginBottom: "24px",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    {space.description}
                  </p>
                  
                  {/* Gallery Strip */}
                  {space.images && (
                    <div style={{ display: "flex", gap: "12px", marginBottom: "28px" }}>
                      {space.images.map((imgUrl, idx) => (
                        <div
                          key={idx}
                          onClick={() => setLightboxImage(imgUrl)}
                          style={{
                            flex: 1,
                            height: "90px",
                            borderRadius: "8px",
                            overflow: "hidden",
                            cursor: "pointer",
                            border: `1.5px solid ${isDay ? "#E8DFC0" : "#3A2210"}`,
                            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                            transition: "all 0.3s ease",
                          }}
                          className="hover:scale-105 hover:border-amber-500 transition-all duration-350"
                        >
                          <img
                            src={imgUrl}
                            alt={`${space.name} thumbnail ${idx + 1}`}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                    {space.highlights.map((h) => (
                      <span
                        key={h}
                        style={{
                          fontSize: "12px",
                          background: isDay ? "#F0E8D5" : "#0E0703",
                          padding: "6px 12px",
                          borderRadius: "6px",
                          opacity: 0.8,
                          fontFamily: "Inter, sans-serif",
                        }}
                      >
                        &#10022; {h}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Inquiry Form */}
            <div
              style={{
                background: isDay ? "#FAF7F0" : "#1E1008",
                border: `1px solid ${isDay ? "#E8DFC0" : "#3A2210"}`,
                borderRadius: "16px",
                padding: "32px",
                height: "fit-content",
              }}
              className="lg:col-span-1 shadow-lg"
            >
              <h3
                style={{
                  fontFamily: "Playfair Display, serif",
                  fontSize: "22px",
                  color: "#C8A951",
                  marginBottom: "10px",
                  fontStyle: "italic",
                }}
              >
                Inquire About Space Hire
              </h3>
              <p style={{ fontSize: "13px", opacity: 0.6, marginBottom: "24px", fontFamily: "Inter, sans-serif" }}>
                Send us details of your soir&eacute;e, and our team will get in touch within 24 hours.
              </p>

              {inquirySent && submittedInquiryDetails ? (
                <div
                  style={{
                    padding: "24px",
                    background: "rgba(200, 169, 81, 0.08)",
                    border: "1px solid #C8A951",
                    borderRadius: "12px",
                    textAlign: "center",
                    fontSize: "14px",
                    lineHeight: 1.7,
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  <span style={{ fontSize: "28px", display: "block", marginBottom: "12px", color: "#C8A951" }}>&#10022;</span>
                  <strong style={{ color: "#C8A951", fontSize: "16px", display: "block", marginBottom: "16px" }}>
                    Thank you, {submittedInquiryDetails.name}.
                  </strong>
                  <p style={{ opacity: 0.9, marginBottom: "12px" }}>
                    We have received your inquiry for<br />
                    <span style={{ color: "#C8A951", fontWeight: 650 }}>{submittedInquiryDetails.space}</span> on <span style={{ color: "#C8A951", fontWeight: 650 }}>{submittedInquiryDetails.date}</span>.
                  </p>
                  <p style={{ opacity: 0.9, marginBottom: "16px" }}>
                    Our events team will contact you<br />
                    within 24 hours at <span style={{ textDecoration: "underline" }}>{submittedInquiryDetails.email}</span>.
                  </p>
                  <p style={{ fontStyle: "italic", opacity: 0.7 }}>
                    We look forward to hosting you.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="flex flex-col gap-4">
                  <div>
                    <label style={{ fontSize: "11px", letterSpacing: "0.1em", color: "#C8A951", display: "block", marginBottom: "4px" }}>
                      YOUR NAME
                    </label>
                    <input
                      required
                      type="text"
                      value={inquiryForm.name}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                      style={{
                        width: "100%",
                        background: "transparent",
                        border: "none",
                        borderBottom: `1px solid ${isDay ? "#C4A882" : "#4A2E14"}`,
                        padding: "6px 0",
                        fontSize: "14px",
                        color: isDay ? "#1A0F00" : "#F2DEB0",
                        outline: "none",
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: "11px", letterSpacing: "0.1em", color: "#C8A951", display: "block", marginBottom: "4px" }}>
                      EMAIL ADDRESS
                    </label>
                    <input
                      required
                      type="email"
                      value={inquiryForm.email}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                      style={{
                        width: "100%",
                        background: "transparent",
                        border: "none",
                        borderBottom: `1px solid ${isDay ? "#C4A882" : "#4A2E14"}`,
                        padding: "6px 0",
                        fontSize: "14px",
                        color: isDay ? "#1A0F00" : "#F2DEB0",
                        outline: "none",
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: "11px", letterSpacing: "0.1em", color: "#C8A951", display: "block", marginBottom: "4px" }}>
                      PHONE NUMBER
                    </label>
                    <input
                      required
                      type="tel"
                      value={inquiryForm.phone}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                      style={{
                        width: "100%",
                        background: "transparent",
                        border: "none",
                        borderBottom: `1px solid ${isDay ? "#C4A882" : "#4A2E14"}`,
                        padding: "6px 0",
                        fontSize: "14px",
                        color: isDay ? "#1A0F00" : "#F2DEB0",
                        outline: "none",
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: "11px", letterSpacing: "0.1em", color: "#C8A951", display: "block", marginBottom: "4px" }}>
                      CHOOSE SPACE
                    </label>
                    <select
                      value={inquiryForm.space}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, space: e.target.value })}
                      style={{
                        width: "100%",
                        background: "transparent",
                        border: "none",
                        borderBottom: `1px solid ${isDay ? "#C4A882" : "#4A2E14"}`,
                        padding: "6px 0",
                        fontSize: "14px",
                        color: isDay ? "#1A0F00" : "#F2DEB0",
                        outline: "none",
                        colorScheme: isDay ? "light" : "dark",
                      }}
                    >
                      <option value="The Royal Alcove" style={{ background: isDay ? "#FFFFFF" : "#1E1008" }}>The Royal Alcove</option>
                      <option value="The Grand Dining Hall" style={{ background: isDay ? "#FFFFFF" : "#1E1008" }}>The Grand Dining Hall</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: "11px", letterSpacing: "0.1em", color: "#C8A951", display: "block", marginBottom: "4px" }}>
                      OCCASION TYPE
                    </label>
                    <select
                      value={inquiryForm.occasion}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, occasion: e.target.value })}
                      style={{
                        width: "100%",
                        background: "transparent",
                        border: "none",
                        borderBottom: `1px solid ${isDay ? "#C4A882" : "#4A2E14"}`,
                        padding: "6px 0",
                        fontSize: "14px",
                        color: isDay ? "#1A0F00" : "#F2DEB0",
                        outline: "none",
                        colorScheme: isDay ? "light" : "dark",
                      }}
                    >
                      <option value="Birthday Celebration" style={{ background: isDay ? "#FFFFFF" : "#1E1008" }}>Birthday Celebration</option>
                      <option value="Anniversary" style={{ background: isDay ? "#FFFFFF" : "#1E1008" }}>Anniversary</option>
                      <option value="Corporate Dinner" style={{ background: isDay ? "#FFFFFF" : "#1E1008" }}>Corporate Dinner</option>
                      <option value="Wedding Reception" style={{ background: isDay ? "#FFFFFF" : "#1E1008" }}>Wedding Reception</option>
                      <option value="Engagement" style={{ background: isDay ? "#FFFFFF" : "#1E1008" }}>Engagement</option>
                      <option value="Other" style={{ background: isDay ? "#FFFFFF" : "#1E1008" }}>Other</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: "11px", letterSpacing: "0.1em", color: "#C8A951", display: "block", marginBottom: "4px" }}>
                      PREFERRED DATE
                    </label>
                    <input
                      required
                      type="date"
                      value={inquiryForm.eventDate}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, eventDate: e.target.value })}
                      style={{
                        width: "100%",
                        background: "transparent",
                        border: "none",
                        borderBottom: `1px solid ${isDay ? "#C4A882" : "#4A2E14"}`,
                        padding: "6px 0",
                        fontSize: "14px",
                        color: isDay ? "#1A0F00" : "#F2DEB0",
                        outline: "none",
                        colorScheme: isDay ? "light" : "dark",
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: "11px", letterSpacing: "0.1em", color: "#C8A951", display: "block", marginBottom: "4px" }}>
                      GUEST COUNT
                    </label>
                    <input
                      required
                      type="number"
                      min={4}
                      max={120}
                      value={inquiryForm.guests}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, guests: Number(e.target.value) })}
                      style={{
                        width: "100%",
                        background: "transparent",
                        border: "none",
                        borderBottom: `1px solid ${isDay ? "#C4A882" : "#4A2E14"}`,
                        padding: "6px 0",
                        fontSize: "14px",
                        color: isDay ? "#1A0F00" : "#F2DEB0",
                        outline: "none",
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: "11px", letterSpacing: "0.1em", color: "#C8A951", display: "block", marginBottom: "4px" }}>
                      TELL US ABOUT YOUR EVENT (OPTIONAL)
                    </label>
                    <textarea
                      rows={3}
                      value={inquiryForm.notes}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, notes: e.target.value })}
                      placeholder="Share any special preferences, dietary requests, or layout desires..."
                      style={{
                        width: "100%",
                        background: "transparent",
                        border: "none",
                        borderBottom: `1px solid ${isDay ? "#C4A882" : "#4A2E14"}`,
                        padding: "6px 0",
                        fontSize: "14px",
                        color: isDay ? "#1A0F00" : "#F2DEB0",
                        outline: "none",
                        resize: "none",
                        fontFamily: "Inter, sans-serif",
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      background: "#C8701A",
                      color: "#FFF5E0",
                      padding: "12px",
                      borderRadius: "8px",
                      fontSize: "13px",
                      fontWeight: 600,
                      border: "none",
                      cursor: "pointer",
                      letterSpacing: "0.05em",
                      marginTop: "12px",
                      transition: "opacity 0.2s",
                    }}
                    className="hover:opacity-90 uppercase"
                  >
                    Request a Consultation
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Overlay */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.85)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            cursor: "pointer",
            backdropFilter: "blur(4px)",
          }}
        >
          <div style={{ position: "relative", maxWidth: "90%", maxHeight: "90%" }}>
            <img
              src={lightboxImage}
              alt="Venue space expanded"
              style={{
                maxWidth: "100%",
                maxHeight: "85vh",
                borderRadius: "8px",
                border: "2px solid #C8A951",
                boxShadow: "0 12px 36px rgba(0,0,0,0.5)",
              }}
            />
            <button
              onClick={() => setLightboxImage(null)}
              style={{
                position: "absolute",
                top: "-40px",
                right: 0,
                background: "transparent",
                border: "none",
                color: "#FFFFFF",
                fontSize: "24px",
                cursor: "pointer",
              }}
            >
              &times; Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
