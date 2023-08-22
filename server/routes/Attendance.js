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

module.exports=router;