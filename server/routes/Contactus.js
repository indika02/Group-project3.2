const router = require("express").Router();
let Contactus = require("../models/Contactus");

router.route("/add").post(async (req, res) => {
  const { name,email,contactno,message } = req.body;

  try {
    const newContactus = new Contactus({
        name,
        email,
        contactno,
        message
    });

    await newContactus.save();
    res.status(200).json({ message: 'Message send successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while sending message' });
  }
});

router.route("/").get((req, res) => {
  Contactus.find()
    .then((contactus) => {
      res.json(contactus);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Error fetching' });
    });
});

router.route("/delete/:email").delete(async (req, res) => {
  const email = req.params.email;
  try {
    const contactus = await Contactus.findOneAndRemove(email);
    if (contactus) {
      res.status(200).send({ status: 'deleted' });
    } else {
      res.status(404).send({ status: 'not found' });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ status: 'Error with deleting', error: err.message });
  }
});

module.exports = router;
