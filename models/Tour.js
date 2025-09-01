const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, enum: ["trending", "marine", "culture", "food"], required: true },
    location: String,      // e.g., "Goa"
    country: String,       // e.g., "India"
    rating: Number,        // e.g., 4.6
    price: Number,         // e.g., 2500 (₹)
    imageUrl: String       // if you use URLs
    // OR if using local assets naming scheme like "1.jpg", keep that in imageUrl
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tour", tourSchema);
