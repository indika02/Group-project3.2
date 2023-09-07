const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const SubjectSchema=new Schema({

  
    Lname : {
        type:String,
    },
    classtype : {
        type:String,
    },
    subject :{
        type:String,
    },
    email:{
        type:String,
    }
})

const Subject=mongoose.model("Subject",SubjectSchema);

module.exports=Subject;