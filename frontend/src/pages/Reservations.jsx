import React, { useState } from "react";
import { useReservation } from "../hooks/useReservation";
import { useTheme } from "../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

// step components
import StepOne   from "../components/Reservations/StepOne";
import StepTwo   from "../components/Reservations/StepTwo";
import StepThree from "../components/Reservations/StepThree";
import Confirmed from "../components/Reservations/Confirmed";

const INITIAL_FORM = {
  // step 1
  occasion: "",
  // step 2
  name: "", email: "", phone: "",
  date: "", time: "", guests: 2,
  seatingPreference: "",
  // step 3
  dietaryRequirements: "",
  addOns: {
    birthdayCake: false, flowerArrangement: false,
    candleSetup: false,  messageCard: false,
  },
  heardFrom: "Other",
  preOrderedDishes: [],
};

export default function Reservations() {
  const { theme }   = useTheme();
  const [step, setStep]       = useState(1);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const { loading, error, confirmed, submitReservation } = useReservation();

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const dateParam = params.get("date");
    const timeParam = params.get("time");
    const occasionParam = params.get("occasion");
    const eventIdParam = params.get("eventId");

    if (dateParam || timeParam || occasionParam || eventIdParam) {
      const updates = {};
      if (dateParam) updates.date = dateParam;
      if (timeParam) updates.time = timeParam;
      if (occasionParam) updates.occasion = occasionParam;
      if (eventIdParam) updates.eventId = eventIdParam;

      setFormData((prev) => ({ ...prev, ...updates }));
      if (occasionParam) {
        setStep(2);
      }
    }
  }, []);

  const isDay = theme === "day";

  const update = (fields) =>
    setFormData((prev) => ({ ...prev, ...fields }));

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  const handleSubmit = async () => {
    await submitReservation(formData);
  };

  const styles = {
    page: {
      minHeight: "100vh",
      background: isDay ? "#F7F0E3" : "#120A04",
      color: isDay ? "#1A0F00" : "#F2DEB0",
      transition: "all 1.2s ease",
      paddingTop: "100px",
    },
    banner: {
      textAlign: "center",
      padding: "60px 20px 40px",
      borderBottom: `1px solid ${isDay ? "#E8DFC0" : "#3A2210"}`,
    },
    label: {
      fontSize: "12px",
      letterSpacing: "0.25em",
      color: "#C8A951",
      marginBottom: "12px",
      display: "block",
      fontWeight: 600,
    },
    title: {
      fontFamily: "Playfair Display, serif",
      fontSize: "clamp(36px, 5vw, 52px)",
      fontWeight: 400,
      fontStyle: "italic",
      margin: "0 0 12px",
    },
    sub: {
      fontSize: "15px",
      opacity: 0.6,
      fontFamily: "Inter, sans-serif",
    },
    progressRow: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0",
      padding: "40px 20px",
    },
    body: {
      maxWidth: "1100px",
      margin: "0 auto",
      padding: "0 24px 80px",
    },
  };

  const steps = ["Experience", "Details", "Requests"];

  if (confirmed) {
    return <Confirmed data={confirmed} theme={theme} />;
  }

  return (
    <div style={styles.page} className="w-full">

      {/* banner */}
      <div style={styles.banner} className="select-none">
        <span style={styles.label}>&mdash; SAFFRON &mdash;</span>
        <h1 style={styles.title}>Reserve Your Table</h1>
        <p style={styles.sub}>A quiet evening awaits you</p>
      </div>

      {/* step progress */}
      <div style={styles.progressRow} className="select-none">
        {steps.map((s, i) => {
          const num       = i + 1;
          const isActive  = step === num;
          const isDone    = step > num;
          return (
            <div key={s} style={{ display: "flex", alignItems: "center" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{
                  width: "36px", height: "36px",
                  borderRadius: "50%",
                  border: `2px solid ${isDone || isActive ? "#C8A951" : isDay ? "#E8DFC0" : "#3A2210"}`,
                  background: isDone || isActive ? "#C8A951" : "transparent",
                  color: isDone || isActive ? "#1A0F00" : isDay ? "#8B6A50" : "#6B4A30",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "14px", fontWeight: 600,
                  margin: "0 auto 8px",
                  transition: "all 0.4s",
                }}>
                  {isDone ? "\u2713" : num}
                </div>
                <div style={{
                  fontSize: "10px",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  color: isActive ? "#C8A951" : isDay ? "#8B6A50" : "#6B4A30",
                }}>
                  {s.toUpperCase()}
                </div>
              </div>
              {i < steps.length - 1 && (
                <div style={{
                  width: "60px", height: "1px",
                  background: step > num ? "#C8A951" : isDay ? "#E8DFC0" : "#3A2210",
                  margin: "0 12px 24px",
                  transition: "background 0.4s",
                }} />
              )}
            </div>
          );
        })}
      </div>

      {/* main body */}
      <div style={styles.body} className="grid grid-cols-1 lg:grid-cols-3 gap-12">

        {/* left form steps */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              {step === 1 && (
                <StepOne
                  formData={formData}
                  update={update}
                  next={next}
                  theme={theme}
                />
              )}
              {step === 2 && (
                <StepTwo
                  formData={formData}
                  update={update}
                  next={next}
                  back={back}
                  theme={theme}
                />
              )}
              {step === 3 && (
                <StepThree
                  formData={formData}
                  update={update}
                  back={back}
                  onSubmit={handleSubmit}
                  loading={loading}
                  error={error}
                  theme={theme}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* right info panel */}
        <div style={{
          background: isDay ? "#FAF7F0" : "#1E1008",
          borderRadius: "16px",
          padding: "32px",
          border: `1px solid ${isDay ? "#E8DFC0" : "#3A2210"}`,
          height: "fit-content",
        }} className="lg:col-span-1 select-none shadow-xl sticky top-28">
          <h3 style={{
            fontFamily: "Playfair Display, serif",
            fontSize: "22px",
            fontWeight: 500,
            marginBottom: "24px",
            color: "#C8A951",
            fontStyle: "italic",
          }}>
            Good to Know
          </h3>

          {[
            { label: "Lunch Hours", value: "Tue \u2013 Sun \u00b7 12:00 PM \u2013 3:30 PM" },
            { label: "Dinner Hours", value: "Tue \u2013 Sun \u00b7 7:00 PM \u2013 11:00 PM" },
            { label: "Weekly Day Off", value: "Every Monday" },
            { label: "Hold Duration", value: "15 mins past booking slot" },
            { label: "Cancellation Policy", value: "Up to 4 hours before slot" },
            { label: "Large Parties", value: "8+ guests please call us directly" },
          ].map((item) => (
            <div key={item.label} style={{
              borderBottom: `1px solid ${isDay ? "#E8DFC0/50" : "#3A2210/50"}`,
              padding: "12px 0",
            }} className="border-b border-stone-200/50 dark:border-stone-850/50">
              <div style={{ fontSize: "10px", fontWeight: 600, color: "#C8A951", letterSpacing: "0.15em", marginBottom: "4px" }}>
                {item.label.toUpperCase()}
              </div>
              <div style={{ fontSize: "14px", opacity: 0.8, fontWeight: 300 }}>
                {item.value}
              </div>
            </div>
          ))}

          <div style={{ marginTop: "28px" }}>
            <div style={{ fontSize: "10px", fontWeight: 600, color: "#C8A951", letterSpacing: "0.15em", marginBottom: "10px" }}>
              CONTACT INFORMATION
            </div>
            <p style={{ fontSize: "14px", opacity: 0.8, marginBottom: "6px", fontWeight: 300 }}>
              &#128222; +91 98765 43210
            </p>
            <p style={{ fontSize: "14px", opacity: 0.8, fontWeight: 300 }}>
              &#9993;&#65039; hello@saffronrestaurant.com
            </p>
          </div>

          <div style={{ marginTop: "28px" }}>
            <div style={{ fontSize: "10px", fontWeight: 600, color: "#C8A951", letterSpacing: "0.15em", marginBottom: "10px" }}>
              LOCATION ADDRESS
            </div>
            <p style={{ fontSize: "14px", opacity: 0.8, lineHeight: 1.6, fontWeight: 300 }}>
              &#128205; 12 Heritage Lane, Lucknow<br />
              Uttar Pradesh &mdash; 226001
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
