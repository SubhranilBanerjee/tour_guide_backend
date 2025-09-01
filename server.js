const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const User = require("./models/User");
const bcrypt = require("bcryptjs");

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Optional: seed default user
(async () => {
  try {
    if (process.env.SEED_DEFAULT_USER === "true") {
      const exists = await User.findOne({ username: process.env.DEFAULT_USER_USERNAME });
      if (!exists) {
        const hash = await bcrypt.hash(process.env.DEFAULT_USER_PASSWORD || "1234", 10);
        await User.create({
          name: process.env.DEFAULT_USER_NAME || "Default User",
          email: process.env.DEFAULT_USER_EMAIL || "default@example.com",
          username: process.env.DEFAULT_USER_USERNAME || "default",
          password: hash,
          role: "Tourist",
        });
        console.log("✅ Default user seeded");
      }
    }
  } catch (err) {
    console.warn("Seed user failed:", err.message);
  }
})();

// Health check
app.get("/", (_req, res) => res.send("Backend is running..."));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tours", require("./routes/tourRoutes"));
app.use("/api/screenshots", require("./routes/screenshotRoutes"));

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`✅ Server listening on port ${PORT}`));
