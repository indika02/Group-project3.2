const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const AnnoucementSchema=new Schema({
message:{
    type:String,
},
    Lname : {
        type:String,
    },
    subject : {
        type:String,
    },
    classtype:{
        type:String,
    },
    batchyear:{
        type:String,
    },
    date: {
        type: String, 
        default: new Date().toISOString()
      },
})

const Annoucement=mongoose.model("Annoucement",AnnoucementSchema);

module.exports=Annoucement;