const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const UsersSchema=new Schema({
    name : {
        type:String,
    },
    age : {
        type:String,
    },
    gender : {
        type:String,
    }
})

const User=mongoose.model("User",UsersSchema);

module.exports=User;