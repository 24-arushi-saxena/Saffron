const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "The Beginning",
        "From the Subcontinent",
        "The Italian Table",
        "Garden & Greens",
        "The Bread Basket",
        "Something Sweet",
        "The Glass",
        "Chef's Table",
      ],
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    spiceLevel: {
      type: Number,
      enum: [0, 1, 2, 3],
      default: 0,
    },
    image: {
      type: String,
      required: true,
    },
    badge: {
      type: String,
      enum: ["Chef's Special", "Bestseller", "New", "Seasonal", null, "null", ""],
      default: null,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("MenuItem", menuItemSchema);
