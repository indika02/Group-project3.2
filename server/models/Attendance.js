const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  date: {
    type: Date,
    
  },
  time:{
     type:String,
  },
  classType: {
    type: String,
    
  },
  batchYear: {
    type: Number,
   
  },
  lecturerName: {
    type: String,
    
  },
  subject: {
    type: String,
    
  },
  attendedStudents: [
    {
      index: {
        type: String,
       
      },
      name: {
        type: String,
        
      },
    },
  ],
});


const Attendance = mongoose.model('Attendance', AttendanceSchema);

module.exports = Attendance;
