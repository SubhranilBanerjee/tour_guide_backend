const Screenshot = require("../models/Screenshot");

exports.list = async (_req, res) => {
  try {
    const shots = await Screenshot.find().sort({ createdAt: -1 });
    // Return only base64 strings as array for your Flutter code
    res.json(shots.map(s => s.dataBase64));
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { image } = req.body; // base64 string
    if (!image) return res.status(400).json({ success: false, message: "image (base64) required" });

    await Screenshot.create({ dataBase64: image });
    res.json({ success: true, message: "Screenshot saved" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
