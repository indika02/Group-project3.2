const router=require("express").Router();
let User=require("../models/Users");

router.route("/add").post((req,res)=>{
   
    const name=req.body.name;
    const age=Number(req.body.age);
    const gender=req.body.gender;
    

    const newUser=new User({
        
        name,
        age,
        gender,
      
    })

    newUser.save().then(()=>{
        res.json("User Added")
    }).catch((err)=>{
        console.log(err);
    })
})

module.exports=router;