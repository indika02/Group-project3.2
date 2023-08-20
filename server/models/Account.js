const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const AccountSchema=new Schema({

    index : {
        type:String,
    },
    name : {
        type:String,
    },
    dob:{
        type:String,
    },
    age:{
        type:String,
    },
    gender:{
        type:String,
    },
    contactpersonal:{
        type:String,
    },
    contacthome:{
        type:String,
    },
    email : {
        type:String,
    },
    address:{
        type:String,
    },
    qualifications:{
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

const Account=mongoose.model("Account",AccountSchema);

module.exports=Account;