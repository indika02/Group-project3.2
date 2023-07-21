const router=require("express").Router();
let User=require("../models/Users");
const QrCode=require('qrcode');
const fs=require("fs");
const path = require('path');


router.route("/add").post(async(req,res)=>{

    const index=req.body.index;
    const name=req.body.name;
    const dob=req.body.dob;
    const age=Number(req.body.age);
    const gender=req.body.gender;
    const contactpersonal=req.body.contactpersonal;
    const contacthome=req.body.contacthome;
    const address=req.body.address;
    const email=req.body.email;
    const qualifications=req.body.qualifications;
    const classtype=req.body.classtype;
    const batchyear=req.body.batchyear;
    const Lname1=req.body.Lname1;
    const subject1=req.body.subject1;
    const Lname2=req.body.Lname2;
    const subject2=req.body.subject2;
    const Lname3=req.body.Lname3;
    const subject3=req.body.subject3;
    const Lname4=req.body.Lname4;
    const subject4=req.body.subject4;
    const usertype=req.body.usertype;
    const dpwd=req.body.dpwd;
    const accountstate=req.body.accountstate;
    
    try {
        const { index, name, dob, age, gender, contactpersonal, contacthome, address, email, qualifications, classtype, batchyear,subject1, subject2, subject3, subject4, usertype, dpwd, accountstate } = req.body;
        const existingUser = await User.findOne({ index });
        if (existingUser) {
          return res.status(400).json({ error: 'Index number already exists' });
        }

    const newUser=new User({
        
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
        accountstate
    });

    if(usertype==="student"){

    const qrCodeData = `${index}\n${name}\n${classtype}\n${subject1}\n${subject2}\n${subject3}\n${subject4}\n${Lname1}\n${Lname2}\n${Lname3}\n${Lname4}\n${batchyear}`;

    const qrCodeFilePath = path.join('routes', 'qr_codes', `${index}.jpg`);

    await QrCode.toFile(qrCodeFilePath, qrCodeData);
    newUser.qrCode = qrCodeFilePath;

    }

    await newUser.save();


    res.status(200).json({ message: 'User added successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while adding the user' });
  }
});

router.route("/").get((req,res)=>{
    User.find().then((User)=>{
        res.json(User)
    }).catch((err)=>{
        console.log(err);
    })
})

module.exports=router;