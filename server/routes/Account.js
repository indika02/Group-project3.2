const bcrypt = require("bcrypt");
const router = require("express").Router();
const Account = require("../models/Account");

router.route("/add").post(async (req, res) => {
  const { index, name,email, usertype, dpwd, accountstate } = req.body;

  try {
    const existingAccount = await Account.findOne({ index });
    if (existingAccount) {
      return res.status(400).json({ error: 'Index number already exists' });
    }

    const newAccount = new Account({
      index,
      name,
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

router.route("/:email").get((req, res) => {
  const userEmail = req.params.email;

  Account.findOne({ email: userEmail })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

     
      const userProfile = {
        name:user.name
      };

      res.json(userProfile);
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

router.route("/").get((req, res) => {
  Account.find()
    .then((account) => {
      res.json(account);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Error fetching timetables' });
    });
});

router.route("/update/:email").put(async(req,res)=>{
  let email=req.params.email;
  const{
  accountstate
  }=req.body;

  const updateState={
    accountstate,
  }

  try {
    const updatedstate = await Account.findOneAndUpdate({ email: email }, updateState, {
      new: true,
    });

    if (updatedstate) {
      res.status(200).send({ status: "User updated" });
    } else {
      res.status(404).send({ status: "User not found" });
    }
  } catch (err) {
    res.status(500).send({ status: "Error with updating data" ,err});
  }
});

router.route("/delete/:id").delete(async (req, res) => {
  const id = req.params.id;
  try {
    const account = await Account.findByIdAndRemove(id);
    if (account) {
      res.status(200).send({ status: 'Account deleted' });
    } else {
      res.status(404).send({ status: 'Account not found' });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ status: 'Error with deleting account', error: err.message });
  }
});
module.exports = router;
