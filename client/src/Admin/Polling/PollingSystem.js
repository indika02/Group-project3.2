import React, { useState } from 'react';
import { Card, Form, Button, Container, Row, Col, ProgressBar } from 'react-bootstrap';

function PollingSystem() {
  const [polls, setPolls] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [newOptions, setNewOptions] = useState(['', '']);
  const [userVotes, setUserVotes] = useState({});

  const handleAddOption = () => {
    setNewOptions([...newOptions, '']);
  };

  const handleRemoveOption = (index) => {
    const updatedOptions = newOptions.filter((_, i) => i !== index);
    setNewOptions(updatedOptions);
  };

  const handleVote = (question, selectedOption) => {
    setUserVotes({ ...userVotes, [question]: selectedOption });
  };

  const handleSubmit = () => {
    const newPoll = {
      question: newQuestion,
      options: newOptions.filter((option) => option.trim() !== ''),
      votes: {},
    };

    setPolls([...polls, newPoll]);
    setNewQuestion('');
    setNewOptions(['', '']);
  };

  return (
    <Container>
      <h1>Polling and Voting System</h1>
      <Form>
        <Form.Group controlId="newQuestion">
          <Form.Label>New Question:</Form.Label>
          <Form.Control
            type="text"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
          />
        </Form.Group>
        {newOptions.map((option, index) => (
          <Form.Group key={index} controlId={`newOption${index}`}>
            <Form.Label>Option {index + 1}:</Form.Label>
            <Row>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  value={option}
                  onChange={(e) => {
                    const updatedOptions = [...newOptions];
                    updatedOptions[index] = e.target.value;
                    setNewOptions(updatedOptions);
                  }}
                />
              </Col>
              <Col sm={2}>
                {index > 1 && (
                  <Button
                    variant="danger"
                    onClick={() => handleRemoveOption(index)}
                  >
                    Remove
                  </Button>
                )}
              </Col>
            </Row>
          </Form.Group>
        ))}
        <Button variant="secondary" onClick={handleAddOption}>
          Add Option
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Add Poll
        </Button>
      </Form>
      {polls.map((poll, pollIndex) => (
        <Card key={pollIndex} className="mt-4">
          <Card.Body>
            <Card.Title>{poll.question}</Card.Title>
            <Form>
              {poll.options.map((option, optionIndex) => (
                <Form.Check
                  key={optionIndex}
                  type="radio"
                  label={option}
                  checked={userVotes[poll.question] === option}
                  onChange={() => handleVote(poll.question, option)}
                />
              ))}
            </Form>
            {userVotes[poll.question] && (
              <div>
                <h5>Your Vote: {userVotes[poll.question]}</h5>
                <ProgressBar
                  now={
                    (poll.votes[userVotes[poll.question]] || 0) /
                    Object.values(poll.votes).reduce((sum, voteCount) => sum + voteCount, 0) *
                    100
                  }
                  label={`${Math.round(
                    ((poll.votes[userVotes[poll.question]] || 0) /
                      Object.values(poll.votes).reduce((sum, voteCount) => sum + voteCount, 0)) *
                      100
                  )}%`}
                />
              </div>
            )}
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}

export default PollingSystem;
