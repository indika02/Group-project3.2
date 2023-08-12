const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const LecturerNotesSchema=new Schema({

    originalFileName: String,
    classtype: String,
    batchyear: String,
    Lname: String
    
})

const Lecturernotes=mongoose.model("LecturerNotes",LecturerNotesSchema);

module.exports=Lecturernotes;