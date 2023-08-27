const express = require('express');
const router = express.Router();
const Poll = require('../models/Poll');

router.post('/create', async (req, res) => {
  try {
    const { question, options } = req.body;
    const poll = new Poll({
      question,
      options,
    });
    await poll.save();
    res.status(201).json(poll);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create poll' });
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
    const poll = await Poll.findById(pollId);
    if (!poll) {
      return res.status(404).json({ error: 'Poll not found' });
    }
    poll.votes.set(selectedOption, (poll.votes.get(selectedOption) || 0) + 1);
    await poll.save();
    res.json(poll);
  } catch (error) {
    res.status(400).json({ error: 'Failed to vote' });
  }
});

module.exports = router;
