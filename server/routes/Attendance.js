const express=require("express");
const router=express.Router();
const Attendance=require('../models/Attendance');

router.post('/add',async(req,res)=>{
    try{
        const{date,time,classType,batchYear,lecturerName,subject,index,name}=req.body;

        const newAttendance=new Attendance({
            date,
            time,
            classType,
            batchYear,
            lecturerName,
            subject,
            index,
            name
        });

        const savedAttendance=await newAttendance.save();
        res.json(savedAttendance);
    }catch(error){
        console.log('Error adding attendance:',error);
        res.status(500).json({error:'An error occured while adding attendance'});
    }
});

router.route("/").get((req, res) => {
    Attendance.find()
      .then((attendance) => {
        res.json(attendance);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'Error fetching attendance' });
      });
  });


  router.route("/attendancedetails/:lecturerName").get((req, res) => {
    const lecturerName = req.params.lecturerName;
  
    Attendance.find({ lecturerName })
      .then((results) => {
        if (results.length === 0) {
          return res.status(404).json({ error: "Results not found for the given lecturer" });
        }
  
        const attendanceresults = results.map((result) => ({
          date:result.date,
          classType: result.classType,
          index: result.index,
          name:result.name,
          batchyear: result.batchYear,
        }));
  
        res.json(attendanceresults);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'Error!' });
      });
  });
module.exports=router;