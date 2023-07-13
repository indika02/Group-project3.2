const router=require("express").Router();
let Subject=require("../models/Subject");

router.route("/add").post((req,res)=>{
   
    
    const Lname=req.body.Lname;
    const classtype=req.body.classtype;
    const subject1=req.body.subject1;
    const subject2=req.body.subject2;
    const subject3=req.body.subject3;
    
    

    const newSubject=new Subject({
        
        
        Lname,
        classtype,
        subject1,
        subject2,
        subject3,
    })

    newSubject.save().then(()=>{
        res.json("Subject Added")
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/").get((req,res)=>{
    Subject.find().then((Subject)=>{
        res.json(Subject)
    }).catch((err)=>{
        console.log(err);
    })
})

module.exports=router;