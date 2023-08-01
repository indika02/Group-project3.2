const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const ContactusSchema=new Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    contactno:{
        type:String,
    },
    message:{
        type:String,
    }
})

const Contactus=mongoose.model("Contactus",ContactusSchema);

module.exports=Contactus;