const express=require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const cors=require("cors");
const dotenv=require("dotenv");
const app=express();
require("dotenv").config();

const PORT=process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const URL=process.env.MONGO_URI;

mongoose.connect(URL,{
    // userCreateIndex:true,
    useNewUrlParser:true,
    // useUnifiedTopologyL:true,
    // useFindAndModify:false
});

const connection=mongoose.connection;
connection.once("open",()=>{
    console.log("MongoDB Connection Success!");
})

const userRouter=require("./routes/Users");



app.use("/user",userRouter)

app.listen(PORT,()=>{
    console.log(`Server is up and running on port number: ${PORT}`);
})