const express = require("express");
const router = express.Router();
const ExamResult = require("../models/ExamResults");



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

  ExamResult.find({ studentIndex: userindex })
    .then((results) => {
      if (results.length === 0) {
        return res.status(404).json({ error: "Results not found" });
      }

      const userResults = results.map((result) => ({
        classType: result.classType,
        studentIndex: result.studentIndex,
        batchYear: result.batchYear,
        subject: result.subject,
        Examno: result.Examno,
        Doe: result.Doe,
        marks: result.marks,
        grade:result.grade,
        lecturername:result.lecturerName
      }));

      res.json(userResults);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Error!' });
    });
});


router.route("/by-lecturer/:lecturerName").get((req, res) => {
  const lecturerName = req.params.lecturerName;

  ExamResult.find({ lecturerName })
    .then((results) => {
      if (results.length === 0) {
        return res.status(404).json({ error: "Results not found for the given lecturer" });
      }

      const lecturerResults = results.map((result) => ({
        classType: result.classType,
        studentIndex: result.studentIndex,
        batchYear: result.batchYear,
        subject: result.subject,
        Examno: result.Examno,
        Doe: result.Doe,
        marks: result.marks,
        grade: result.grade,
        lecturername: result.lecturerName
      }));

      res.json(lecturerResults);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Error!' });
    });
});


router.route("/offerings/by-lecturer/:lecturerName").get((req, res) => {
  const lecturerName = req.params.lecturerName;

  ExamResult.find({ lecturerName, grade: 'A' })
    .then((results) => {
      if (results.length === 0) {
        return res.status(404).json({ error: "Results not found for the given lecturer" });
      }

      const lecturerResults = results.map((result) => ({
        classType: result.classType,
        studentIndex: result.studentIndex,
        batchYear: result.batchYear,
        subject: result.subject,
        Examno: result.Examno,
        Doe: result.Doe,
        marks: result.marks,
        grade: result.grade,
        lecturername: result.lecturerName
      }));

      res.json(lecturerResults);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Error!' });
    });
});


module.exports = router;