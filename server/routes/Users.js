const router=require("express").Router();
let User=require("../models/Users");

router.route("/add").post((req,res)=>{
   
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
    const subject1=req.body.subject1;
    const subject2=req.body.subject2;
    const subject3=req.body.subject3;
    const subject4=req.body.subject4;
    const usertype=req.body.usertype;
    const dpwd=req.body.dpwd;
    const accountstate=req.body.accountstate;
    

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
      
    })

    newUser.save().then(()=>{
        res.json("User Added")
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/").get((req,res)=>{
    User.find().then((User)=>{
        res.json(User)
    }).catch((err)=>{
        console.log(err);
    })
})

module.exports=router;