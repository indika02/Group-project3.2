const bcrypt = require("bcrypt");
const router = require("express").Router();
const Account = require("../models/Account");

router.route("/add").post(async (req, res) => {
  const { index, email, usertype, dpwd, accountstate } = req.body;

  try {
    const existingAccount = await Account.findOne({ index });
    if (existingAccount) {
      return res.status(400).json({ error: 'Index number already exists' });
    }

    const newAccount = new Account({
      index,
      email,
      usertype,
      dpwd,
      accountstate,
    });

    await newAccount.save();

    res.status(200).json({ message: 'Account Created' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error!' });
  }
});

router.route("/").get((req, res) => {
  Account.find()
    .then((accounts) => {
      res.json(accounts);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Error!' });
    });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  Account.findOne({ email })
    .then((account) => {
      if (!account) {
        return res.status(404).json({ message: "User not found" });
      }

      bcrypt.compare(password, account.dpwd, (err, result) => {
        if (err) {
          return res.status(500).json({ message: "Server error" });
        }

        if (!result) {
          return res.status(401).json({ message: "Incorrect password" });
        }

        res.json(account); // return the account object or desired data as JSON
      });
    })
    .catch((err) => res.status(400).json({ message: "Could not login user", err }));
});

module.exports = router;
