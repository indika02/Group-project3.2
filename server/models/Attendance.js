const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  date: {
    type: String, 
    default: new Date().toISOString()
    
  },
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
  index: {
        type: String,    
},
  name: {
        type: String,
      },
    },
);


const Attendance = mongoose.model('Attendance', AttendanceSchema);

module.exports = Attendance;
