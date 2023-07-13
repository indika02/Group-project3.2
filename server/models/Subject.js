const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const SubjectSchema=new Schema({

  
    Lname : {
        type:String,
    },
    classtype : {
        type:String,
    },
    subject1 :{
        type:String,
    },
    subject2 :{
        type:String,
    },
    subject3 :{
        type:String,
    }
})

const Subject=mongoose.model("Subject",SubjectSchema);

module.exports=Subject;