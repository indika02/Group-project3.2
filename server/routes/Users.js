const router=require("express").Router();
let User=require("../models/Users");

router.route("/add").post((req,res)=>{
   
    const index=Number(req.body.index);
    const name=req.body.name;
    const dob=req.body.dob;
    const age=Number(req.body.age);
    const gender=req.body.gender;
    const contactpersonal=req.body.contactpersonal;
    const contacthome=req.body.contacthome;
    const address=req.body.address;
    const email=req.body.email;
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
      
    })

    newUser.save().then(()=>{
        res.json("User Added")
    }).catch((err)=>{
        console.log(err);
    })
})

module.exports=router;