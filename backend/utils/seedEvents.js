const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const Event = require("../models/Event");

// Load env vars
dotenv.config({ path: path.join(__dirname, "../.env") });

const initialEvents = [
  {
    title: "The Chef's Table",
    subtitle: "An 8-Course Culinary Journey",
    badge: "Tasting Menu",
    description: "An exclusive gathering where master chefs reveal forgotten recipes of the subcontinent, prepared with custom spice blends and contemporary techniques.",
    date: new Date("2026-07-23"),
    time: "7:30 PM",
    pricePerGuest: 4500,
    totalSeats: 30,
    seatsRemaining: 6,
    type: "public",
    isActive: true,
  },
  {
    title: "Sufi & Spice",
    subtitle: "A Night of Melodies & Royal Plates",
    badge: "Live Performance",
    description: "Immerse yourself in live acoustic Sufi music under soft candlelight, paired with a custom royal Awadhi banquet menu curated for the night.",
    date: new Date("2026-08-08"),
    time: "8:00 PM",
    pricePerGuest: 5000,
    totalSeats: 24,
    seatsRemaining: 4,
    type: "public",
    isActive: true,
  },
  {
    title: "The Saffron Harvest",
    subtitle: "Celebrating Seasonal Abundance",
    badge: "Seasonal Feast",
    description: "A celebration of fresh monsoon harvest ingredients. A fully organic farm-to-table menu paired with premium mocktails and custom artisanal desserts.",
    date: new Date("2026-08-23"),
    time: "1:00 PM",
    pricePerGuest: 3500,
    totalSeats: 40,
    seatsRemaining: 40,
    type: "public",
    isActive: true,
  },
];

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/saffron";
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB for event seeding...");

    // Clear existing events
    await Event.deleteMany({});
    console.log("Cleared existing Events.");

    // Insert new events
    await Event.insertMany(initialEvents);
    console.log("Successfully seeded 3 Saffron events!");

    mongoose.connection.close();
    console.log("DB connection closed.");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDB();
