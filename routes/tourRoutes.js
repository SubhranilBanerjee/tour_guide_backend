const express = require("express");
const router = express.Router();
const { list, create, seed } = require("../controllers/tourController");

// List tours (optionally filter by ?category=marine/culture/food/trending)
router.get("/", list);

// Create a tour (for admin use)
router.post("/", create);

// Seed sample tours (for testing)
router.post("/seed", seed);

module.exports = router;
