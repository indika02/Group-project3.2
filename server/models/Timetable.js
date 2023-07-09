const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const TimetableSchema=new Schema({
    date : {
        type : String,
    },
    teacher_name: {
        type:String,
    },
    subject : {
        type:String,
    },
    time : {
        type:String,
    },
    venue : {
        type:String,
    },
    classtype : {
        type : String,
    },
    type : {
        type : String,
    }
})

const Timetable=mongoose.model("Timetable",TimetableSchema);

module.exports=Timetable;