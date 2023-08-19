const express=require("express");
const router=express.Router();
const Attendance=require('../models/Attendance');

router.post('/add',async(req,res)=>{
    try{
        const{date,time,classType,batchYear,lecturerName,subject,attendedStudents}=req.body;

        const newAttendance=new Attendance({
            date,
            time,
            classType,
            batchYear,
            lecturerName,
            subject,
            attendedStudents:attendedStudents.map(student=>({
                index:student.index,
                name:student.name
            })),
        });

        const savedAttendance=await newAttendance.save();
        res.json(savedAttendance);
    }catch(error){
        console.log('Error adding attendance:',error);
        res.status(500).json({error:'An error occured while adding attendance'});
    }
});

module.exports=router;