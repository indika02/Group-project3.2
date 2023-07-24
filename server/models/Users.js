const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const UsersSchema=new Schema({

    index : {
        type:String,
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
    batchyear : {
        type:String,
    },
    Lname1 :{
        type : String,
    },
    subject1 :{
        type:String,
    },
    Lname2 :{
        type : String,
    },
    subject2 :{
        type:String,
    },
    Lname3 :{
        type : String,
    },
    subject3 :{
        type:String,
    },
    Lname4 :{
        type : String,
    },
    subject4 :{
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

    },
    qrCode: { 
        type: String 
    }
})

const User=mongoose.model("User",UsersSchema);

module.exports=User;