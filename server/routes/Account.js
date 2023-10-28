const bcrypt = require("bcrypt");
const router = require("express").Router();
const Account = require("../models/Account");
const multer = require("multer");
const fs = require('fs');
const path = require('path');
const fileUpload = require('express-fileupload');
router.route("/add").post(async (req, res) => {
  const { index, name, email, usertype, dpwd, accountstate } = req.body;

  try {
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
  const { emailOrIndex, password } = req.body;


  const isEmail = emailOrIndex.includes("@");
  const query = isEmail ? { email: emailOrIndex } : { index: emailOrIndex };

  Account.findOne(query)
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

        
        const { index, ...accountData } = account.toObject();

        res.json({ index, ...accountData }); 
      });
    })
    .catch((err) => res.status(400).json({ message: "Could not login user", err }));
});

module.exports = router;


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


router.route("/userdetail/:email").get((req, res) => {
  const userEmail = req.params.email;

  Account.findOne({ email: userEmail })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

     
      const userProfile = {
      index:user.index,
      name:user.name,
      dob:user.dob,
      age:user.age,
      gender:user.gender,
      contactpersonal:user.contactpersonal,
      contacthome:user.contacthome,
      address:user.address,
      email:user.email,
     qualifications:user.qualifications,
     usertype:user.usertype,
     dpwd:user.dpwd,
     accountstate:user.accountstate,
      };

      res.json(userProfile);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Error!' });
    });
});
router.route("/update/:email").put(async(req,res)=>{
  let email=req.params.email;
  const{
    index,
    name,
    dob,
    age,
    gender,
    contactpersonal,
    contacthome,
    address,
    qualifications,
    dpwd,
    accountstate,
    profilepic
  }=req.body;

  const updateProfile={
    index,
    name,
    dob,
    age,
    gender,
    contactpersonal,
    contacthome,
    email,
    address,
    qualifications,
    dpwd,
    accountstate,
    profilepic
  }

  try {
    const updatedUser = await Account.findOneAndUpdate({ email: email }, updateProfile, {
      new: true,
    });

    if (updatedUser) {
      res.status(200).send({ status: "Users updated", User: updatedUser });
      console.log(updatedUser)
    } else {
      res.status(404).send({ status: "User not found" });
    }
  } catch (err) {
    res.status(500).send({ status: "Error with updating data" });
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

router.route("/total/count").get((req, res) => {
  Account.countDocuments({})
    .then((count) => {
     
      res.json({ count: count });
      
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'An error occurred while counting documents' });
    });
});

router.route("/reset/:email").put(async (req, res) => {
  const resetEmail = req.params.email; 
  const { dpwd } = req.body; 

  const updatepwd = {
    dpwd, 
  };

  try {
    const updatedpwd = await Account.findOneAndUpdate(
      { email: resetEmail },
      updatepwd,
      {
        new: true,
      }
    );

    if (updatedpwd) {
      res.status(200).send({ status: "User updated", User: updatedpwd });
    } else {
      res.status(404).send({ status: "User not found" });
    }
  } catch (err) {
    res.status(500).send({ status: "Error with updating data" });
  }
});


router.use(fileUpload());

router.post('/upload-profile-pic', async (req, res) => {
  if (!req.files || !req.files.file || !req.body.index) {
    return res.status(400).json({ msg: 'Invalid request' });
  }

  const file = req.files.file;
  const userIndex = req.body.index; // Extract user's index from the request body
  const fileExtension = file.name.split('.').pop(); // Get the file extension
  const newFileName = `${userIndex}.${fileExtension}`; // Construct the new file name

  const folderPath = path.join(__dirname, './uploads/profilepic');
  const originalFilePath = path.join(folderPath, file.name);
  const newFilePath = path.join(folderPath, newFileName);

  file.mv(newFilePath, async (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    
    try {
      const user = await Account.findOne({ index: userIndex });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

    
      user.originalFileName = newFileName;
      await user.save();

      res.status(200).json({ originalFileName: newFileName, message: 'Profile picture uploaded and user updated' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error updating user document' });
    }
  });
});

router.get('/profile-pic/:index', async (req, res) => {
  const userIndex = req.params.index;

  try {
    const user = await Account.findOne({ index: userIndex });

    if (!user || !user.originalFileName) {
      return res.status(404).json({ error: 'Profile picture not found for this user' });
    }

    const folderPath = path.join(__dirname, './uploads/profilepic');
    const filePath = path.join(folderPath, user.originalFileName);

    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Profile picture file not found' });
    }

    
    res.sendFile(filePath);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving profile picture' });
  }
});


module.exports = router;
