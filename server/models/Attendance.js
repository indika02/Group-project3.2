const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const AttendanceSchema=new Schema({

    index: {
        type:String,
    },
   classtype:{
        type:String,
   },
   batchyear:{
        type:String,
   },
   Lname:{
        type:String,
   },
   subject : {
    type:String,
   },
   date:{
        type:date,
   }
})

const Attendance=mongoose.model("Attendance",AttendanceSchema);

module.exports=Attendance;