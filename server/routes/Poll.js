const express = require('express');
const router = express.Router();
const Poll = require('../models/Poll');

router.post('/add', async (req, res) => {
  try {
    const { question, options, batchYear, classType, Lname,subject } = req.body;

   
    const optionDocs = options.map((optionText) => ({
      text: optionText,
      votes: 0,
    }));

   
    const newPoll = new Poll({
      question,
      options: optionDocs,
      batchYear,
      classType,
      Lname,
      subject
    });

    
    await newPoll.save();

    res.status(201).json({ success: true, message: 'Poll added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

router.get('/list', async (req, res) => {
  try {
    const polls = await Poll.find();
    res.json(polls);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch polls' });
  }
});

router.post('/vote', async (req, res) => {
  try {
    const { pollId, selectedOption } = req.body;

    // Find the poll by ID
    const poll = await Poll.findById(pollId);

    if (!poll) {
      return res.status(404).json({ error: 'Poll not found' });
    }

    // Ensure the selected option is one of the available options
    const optionExists = poll.options.some((option) => option.text === selectedOption);
    if (!optionExists) {
      return res.status(400).json({ error: 'Invalid selected option' });
    }

    // Update the votes count for the selected option
    poll.options.forEach((option) => {
      if (option.text === selectedOption) {
        option.votes = (option.votes || 0) + 1;
      }
    });

    // Save the updated poll
    const updatedPoll = await poll.save();

    res.json(updatedPoll);
  } catch (error) {
    res.status(400).json({ error: 'Failed to vote' });
  }
});

module.exports = router;
