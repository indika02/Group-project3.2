const express = require("express");
const router = express.Router();
const ExamResult = require("../models/ExamResults");

// POST route to save results data to the database
router.post("/add", async (req, res) => {
  const dataToSend = req.body;

  try {
    const results = await ExamResult.insertMany(dataToSend);

    res.status(201).json({ message: "Results data saved successfully", data: results });
  } catch (error) {
    res.status(500).json({ message: "Failed to save results data", error });
  }
});

module.exports = router;
