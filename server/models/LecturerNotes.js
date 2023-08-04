const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const LecturerNotesSchema=new Schema({

    originalFileName:{
        type:String,
    },
    classtype : {
        type:String,
    },
    batchyear : {
        type:String,
    },
   Lname:{
        type:String,
    }
    
})

const Lecturernotes=mongoose.model("LecturerNotes",LecturerNotesSchema);

module.exports=Lecturernotes;