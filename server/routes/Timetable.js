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

router.route("/update/:id").put(async (req,res)=>{
    let Tid=req.params.id;
    const {date,teacher_name,subject,time,venue,classtype,type}=req.body;
    const updateTimetable ={
        date,
        teacher_name,
        subject,
        time,
        venue,
        classtype,
        type
    }

    const update=await Student.findByIdAndUpdate(Tid,updateTimetable).then(()=>{
        res.status(200).send({status:"Timetable updated",user:update});
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data"});
    })
})

router.route("/delete/:id").delete(async (req, res) => {
    const Tid = req.params.id;
    try {
      const timetable = await Timetable.findByIdAndRemove(Tid);
      if (timetable) {
        res.status(200).send({ status: "Timetable Deleted" });
      } else {
        res.status(404).send({ status: "Timetable Not Found" });
      }
    } catch (err) {
      console.log(err.message);
      res.status(500).send({
        status: "Error with delete Timetable",
        error: err.message,
      });
    }
  });

router.route
module.exports=router;