const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    // Step 1 data
    occasion: {
      type: String,
      enum: [
        "Casual Dining",
        "Date Night",
        "Family Gathering",
        "Birthday Celebration",
        "Business Lunch",
        "Special Occasion",
      ],
      required: true,
    },

    // Step 2 data
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    guests: {
      type: Number,
      required: true,
      min: 1,
      max: 12,
    },
    seatingPreference: {
      type: String,
      enum: [
        "Indoor \u2014 Main Dining Room",
        "Indoor \u2014 Private Corner Table",
        "Window Seat",
      ],
      required: true,
    },

    // Step 3 data
    dietaryRequirements: {
      type: String,
      default: "",
    },
    addOns: {
      birthdayCake:      { type: Boolean, default: false },
      flowerArrangement: { type: Boolean, default: false },
      candleSetup:       { type: Boolean, default: false },
      messageCard:       { type: Boolean, default: false },
    },
    heardFrom: {
      type: String,
      enum: ["Google", "Instagram", "Friend", "Walked by", "Other"],
      default: "Other",
    },
    preOrderedDishes: [
      {
        id: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
      }
    ],
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      default: null,
    },

    // System fields
    status: {
      type: String,
      enum: ["confirmed", "cancelled", "completed", "no-show"],
      default: "confirmed",
    },
    confirmationCode: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reservation", reservationSchema);
