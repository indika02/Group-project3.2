const router = require("express").Router();
let Timetable = require("../models/Timetable");

router.route("/add").post(async (req, res) => {
  const { date, teacher_name, subject, time, venue, classtype, batchyear, type } = req.body;

  try {
    const existingTimetable = await Timetable.findOne({ date });
    if (existingTimetable) {
      return res.status(400).json({ error: 'Timetable already exists' });
    }

    const newtimetable = new Timetable({
      date,
      teacher_name,
      subject,
      time,
      venue,
      classtype,
      batchyear,
      type
    });

    await newtimetable.save();
    res.status(200).json({ message: 'Timetable added successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while scheduling the timetable' });
  }
});

router.route("/").get((req, res) => {
  Timetable.find()
    .then((timetable) => {
      res.json(timetable);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Error fetching timetables' });
    });
});

router.route("/delete/:id").delete(async (req, res) => {
  const Tid = req.params.id;
  try {
    const timetable = await Timetable.findByIdAndRemove(Tid);
    if (timetable) {
      res.status(200).send({ status: 'Timetable deleted' });
    } else {
      res.status(404).send({ status: 'Timetable not found' });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ status: 'Error with deleting timetable', error: err.message });
  }
});

module.exports = router;
