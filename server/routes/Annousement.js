const express=require("express");
const router=express.Router();
const Annoucement=require('../models/Annousement');

router.post('/add',async(req,res)=>{
    try{
        const{Lname,subject,classtype,batchyear,message}=req.body;

        const currentDate = new Date();
        const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;

        const newAnnoucement=new Annoucement({
            date:formattedDate,
            message,
            Lname,
            subject,
            classtype,
            batchyear
        });

        const savedAnnoucement=await newAnnoucement.save();
        res.json(savedAnnoucement);
    }catch(error){
        console.log('Error Saving Message:',error);
        res.status(500).json({error:'An error occured while saving!'});
    }
});

router.route("/").get((req, res) => {
    Annoucement.find()
      .then((annoucement) => {
        res.json(annoucement);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'Error fetching message' });
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

  router.route("/delete/:id").delete(async (req, res) => {
    const id = req.params.id;
    try {
      const user = await Annoucement.findByIdAndDelete(id);
      if (user) {
        res.status(200).send({ status: ' Removed' });
      } else {
        res.status(404).send({ status: ' not found' });
      }
    } catch (err) {
      console.log(err.message);
      res.status(500).send({ status: 'Error with deleting Message', error: err.message });
    }
  });




  
module.exports=router;