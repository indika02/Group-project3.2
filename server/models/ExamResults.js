const mongoose = require("mongoose");

const { Schema } = mongoose;

const ExamResultSchema = new Schema({
  classType: {
    type: String,
    
  },
  batchYear: {
    type: String,
    
  },
  lecturerName: {
    type: String,
   
  },
  subject: {
    type: String,
  
  },
  Examno:{
    type:String,
  },
  Doe : {
    type:String,
  },
      studentIndex: {
        type: String,
      
      },
      marks: {
        type: String, 
     
      },
      grade:{
        type:String,
      }
});

const ExamResult = mongoose.model("ExamResult", ExamResultSchema);

module.exports = ExamResult;
