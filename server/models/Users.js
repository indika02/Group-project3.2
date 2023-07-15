const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const UsersSchema=new Schema({

    index : {
        type:String,

    index : {
        type : String

    },
    name : {
        type:String,
    },
    dob : {
        type:String,
    },
    age : {
        type:String,
    },
    gender : {
        type:String,
    },
    contactpersonal : {
        type:String,
    },
    contacthome : {
        type:String,
    },
    address : {
        type:String,
    },
    email : {
        type:String,
    },
    qualifications : {
        type : String,
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
    },
    subject4 :{
        type:String,
    },
    subject2 : {
        type:String,
    },
    subject3 : {
        type:String,
    },
    subject4 : {
        type:String,
    },
    usertype : {
        type:String,
    },
    dpwd : {
        type:String,
    },
    accountstate : {
        type:String,

    }
})

const User=mongoose.model("User",UsersSchema);

module.exports=User;