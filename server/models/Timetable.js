const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const TimetableSchema=new Schema({
    teacher_name: {
        type:String,
    },
    subject : {
        type:String,
    },
    datetime : {
        type:datetime,
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