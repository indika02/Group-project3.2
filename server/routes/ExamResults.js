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


router.route("/:studentIndex").get((req, res) => {
  const userindex = req.params.studentIndex;

ExamResult.findOne({ studentIndex: userindex })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

     
      const userResults = {
        classType:user.classType,
        studentIndex:user.studentIndex,
        batchYear:user.batchYear,
        subject:user.subject,
        Examno:user.Examno,
        Doe:user.Doe,
        marks:user.marks,
      };

      res.json(userResults);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Error!' });
    });
});
module.exports = router;
