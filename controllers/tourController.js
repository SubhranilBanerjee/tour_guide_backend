const Tour = require("../models/Tour");

exports.list = async (req, res) => {
  try {
    const { category } = req.query; // optional ?category=marine
    const filter = category ? { category } : {};
    const tours = await Tour.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, data: tours });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const tour = await Tour.create(req.body);
    res.json({ success: true, data: tour });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// (Optional) quick seed handler
exports.seed = async (_req, res) => {
  try {
    const count = await Tour.countDocuments();
    if (count > 0) return res.json({ success: true, message: "Tours already seeded" });

    await Tour.insertMany([
      // TRENDING (use city images like rome.jpg, paris.jpg, france.jpg)
      { title: "Rome", category: "trending", location: "Rome", country: "Italy", rating: 4.7, price: 0, imageUrl: "rome.jpg" },
      { title: "Paris", category: "trending", location: "Paris", country: "France", rating: 4.8, price: 0, imageUrl: "paris.jpg" },
      { title: "France Highlights", category: "trending", location: "France", country: "France", rating: 4.6, price: 0, imageUrl: "france.jpg" },

      // MARINE (use 1.jpg, 2.jpg, 3.jpg… if you prefer filenames)
      { title: "Yacht Ride", category: "marine", location: "Goa", country: "India", rating: 4.5, price: 2500, imageUrl: "1.jpg" },
      { title: "Scuba Diving", category: "marine", location: "Maldives", country: "Maldives", rating: 4.8, price: 6000, imageUrl: "2.jpg" },
      { title: "Cruise Tour", category: "marine", location: "Miami", country: "USA", rating: 4.3, price: 12000, imageUrl: "3.jpg" },

      // CULTURE
      { title: "Pyramids Tour", category: "culture", location: "Giza", country: "Egypt", rating: 4.9, price: 7000, imageUrl: "4.jpg" },
      { title: "Taj Mahal Visit", category: "culture", location: "Agra", country: "India", rating: 4.7, price: 1500, imageUrl: "5.jpg" },
      { title: "Machu Picchu", category: "culture", location: "Cusco", country: "Peru", rating: 4.8, price: 9000, imageUrl: "6.jpg" },

      // FOOD
      { title: "Italian Feast", category: "food", location: "Rome", country: "Italy", rating: 4.6, price: 2200, imageUrl: "7.jpg" },
      { title: "Street Food Tour", category: "food", location: "Bangkok", country: "Thailand", rating: 4.5, price: 1000, imageUrl: "8.jpg" },
      { title: "Wine Tasting", category: "food", location: "Paris", country: "France", rating: 4.7, price: 3500, imageUrl: "9.jpg" }
    ]);

    res.json({ success: true, message: "Seeded sample tours" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
