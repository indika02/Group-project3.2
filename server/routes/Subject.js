  const router=require("express").Router();
  let Subject=require("../models/Subject");

  router.route("/add").post(async(req,res)=>{
    
      
      const Lname=req.body.Lname;
      const classtype=req.body.classtype;
      const subject=req.body.subject;
      
      
      try {
          const {Lname,classtype,subject1,subject2,subject3 } = req.body;
          const existingSubject = await Subject.findOne({ Lname});
          if (existingSubject) {
            return res.status(400).json({ error: 'Index number already exists' });
          }
      const newSubject=new Subject({
          Lname,
          classtype,
          subject
      })

      await newSubject.save();

      res.status(200).json({ message: 'Subject added successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'An error occurred while adding the Subject' });
    }
  });

  router.route("/").get((req,res)=>{
      Subject.find().then((Subject)=>{
          res.json(Subject)
      }).catch((err)=>{
          console.log(err);
      })
  })



  module.exports=router;