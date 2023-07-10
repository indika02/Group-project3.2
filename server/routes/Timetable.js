const router=require("express").Router();
let Timetable = require("../models/Timetable");

router.route("/add").post((req,res)=>{
   
    const date=req.body.date;
    const teacher_name=req.body.teacher_name;
    const subject =req.body.subject;
    const time=req.body.time;
    const venue=req.body.venue;
    const classtype=req.body.classtype;
    const type=req.body.type;
    

    const newtimetable=new Timetable({
        
        date,
       teacher_name,
       subject,
       time,
       venue,
       classtype,
       type
      
    })

    newtimetable.save().then(()=>{
        res.json("Timetable Added")
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/").get((req,res)=>{
    Timetable.find().then((Timetable)=>{
        res.json(Timetable)
    }).catch((err)=>{
        console.log(err);
    })
})

module.exports=router;