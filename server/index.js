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
const timetableRouter=require("./routes/Timetable");
const SubjectRouter=require("./routes/Subject");
const AccountRouter=require("./routes/Account");
const Results=require("./routes/ExamResults");
const LecturerNotes=require("./routes/LecturerNotes");
const fileUpload = require("express-fileupload");

app.use("/user",userRouter)
app.use("/timetable",timetableRouter);
app.use("/subject",SubjectRouter);
app.use("/account",AccountRouter);
app.use("/results",Results);
app.use("/lecturernotes",LecturerNotes);


app.listen(PORT,()=>{
    console.log(`Server is up and running on port number: ${PORT}`);
})