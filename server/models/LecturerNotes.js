const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const LecturerNotesSchema=new Schema({

  
    classtype : {
        type:String,
    },
    batchyear : {
        type:String,
    },
    fileId :{
        type:String,
    },
    originalFileName:{
        type:String,
    }
})

const Lecturernotes=mongoose.model("LecturerNotes",LecturerNotesSchema);

module.exports=Lecturernotes;