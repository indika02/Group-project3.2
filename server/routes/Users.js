const router = require("express").Router();
let User = require("../models/Users");
const QrCode = require('qrcode');
const fs = require("fs");
const path = require('path');

router.route("/add").post(async (req, res) => {
  const {
    index,
    name,
    dob,
    age,
    gender,
    contactpersonal,
    contacthome,
    address,
    email,
    qualifications,
    classtype,
    batchyear,
    Lname1,
    subject1,
    Lname2,
    subject2,
    Lname3,
    subject3,
    Lname4,
    subject4,
    usertype,
    dpwd,
    accountstate,
  } = req.body;

  try {
    const existingUser = await User.findOne({ index });
    if (existingUser) {
      return res.status(400).json({ error: 'Index number already exists' });
    }

    const newUser = new User({
      index,
      name,
      dob,
      age,
      gender,
      contactpersonal,
      contacthome,
      address,
      email,
      qualifications,
      classtype,
      batchyear,
      Lname1,
      subject1,
      Lname2,
      subject2,
      Lname3,
      subject3,
      Lname4,
      subject4,
      usertype,
      dpwd,
      accountstate,
    });

    if (usertype === "student") {
      const qrCodeData = `${index}\n${name}\n${classtype}\n${subject1}\n${subject2}\n${subject3}\n${subject4}\n${Lname1}\n${Lname2}\n${Lname3}\n${Lname4}\n${batchyear}`;
      
      // Generate the QR code as a Base64 encoded string
      const qrCodeBase64 = await QrCode.toDataURL(qrCodeData);
      newUser.qrCode = qrCodeBase64;
    }

    await newUser.save();
    res.status(200).json({ message: 'User added successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while adding the user' });
  }
});

router.route("/").get((req, res) => {
  User.find({}, '-_id -__v') // Exclude _id and __v fields from the response
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'An error occurred while retrieving users' });
    });
});

router.route("/:name").get((req, res) => {
  const username = req.params.name;

  User.find({
    $or: [
      { Lname1: username },
      { Lname2: username },
      { Lname3: username },
      { Lname4: username },
    ],
  })
    .then((users) => {
      if (users.length === 0) {
        return res.status(404).json({ error: "No users found" });
      }

      const userProfiles = users.map((user) => ({
        index: user.index,
        name: user.name,
        gender: user.gender,
        contactpersonal: user.contactpersonal,
        email: user.email,
        classtype: user.classtype,
        batchyear: user.batchyear,
      }));

      res.json(userProfiles);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Error fetching user profiles" });
    });
});


module.exports = router;
