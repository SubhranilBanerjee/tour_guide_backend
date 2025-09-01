const express = require("express");
const router = express.Router();
const { list, create } = require("../controllers/screenshotController");

router.get("/", list);   // returns [base64, base64, ...]
router.post("/", create);

module.exports = router;
