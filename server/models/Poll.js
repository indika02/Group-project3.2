const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  votes: {
    type: Number,
    default: 0,
  },
});

const pollSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: [optionSchema],
  batchYear: {
    type: String,
    required: true,
  },
  classType: {
    type: String,
    required: true,
  },
  Lname: {
    type: String,
    required: true,
  },
  subject:{
    type:String,
    required:true,
  }
});

const Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll;
