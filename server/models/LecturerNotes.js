const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const LecturerNotesSchema=new Schema({

    originalFileName: String,
    data: Buffer,        // Store the file data as a Buffer
    contentType: String, // MIME type of the file
    classtype: String,
    batchyear: String,
    Lname: String
    
})

const Lecturernotes=mongoose.model("LecturerNotes",LecturerNotesSchema);

module.exports=Lecturernotes;