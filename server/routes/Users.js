const router=require("express").Router();
let User=require("../models/Users");

router.route("/add").post(async(req,res)=>{

    const index=req.body.index;
    const index=Number(req.body.index);

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
    const subject1=req.body.subject1;
    const subject2=req.body.subject2;
    const subject3=req.body.subject3;
    const subject4=req.body.subject4;
    const usertype=req.body.usertype;
    const dpwd=req.body.dpwd;
    const accountstate=req.body.accountstate;
    
    try {
        const { index, name, dob, age, gender, contactpersonal, contacthome, address, email, qualifications, classtype, subject1, subject2, subject3, subject4, usertype, dpwd, accountstate } = req.body;
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
        subject1,
        subject2,
        subject3,
        subject4,
        usertype,
        dpwd,
        accountstate
    const classtype=req.body.classtype;
    const Subject1=req.body.Subject1;
    const Subject2=req.body.Subject2;
    const Subject3=req.body.Subject3;
    const Subject4=req.body.Subject4;
    const usertype=req.body.usertype;

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
                classtype,
                Subject1,
                Subject2,
                Subject3,
                Subject4,
                usertype
    });

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