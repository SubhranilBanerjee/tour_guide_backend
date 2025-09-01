const mongoose = require("mongoose");

// Store as base64 string; alternatively, store a URL to S3/Cloudinary.
const screenshotSchema = new mongoose.Schema(
  {
    dataBase64: { type: String, required: true } // "iVBORw0K..." etc.
  },
  { timestamps: true }
);

module.exports = mongoose.model("Screenshot", screenshotSchema);
