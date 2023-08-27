import React, { useState } from 'react';
import { Card, Form, Button, ProgressBar } from 'react-bootstrap';

function VotingComponent({ poll }) {
  const [selectedOption, setSelectedOption] = useState('');

  const handleVote = () => {

    poll.votes[selectedOption] = (poll.votes[selectedOption] || 0) + 1;
    setSelectedOption('');
    
  };

  return (
    <Card className="mt-4">
      <Card.Body>
        <Card.Title>{poll.question}</Card.Title>
        <Form>
          {poll.options.map((option, optionIndex) => (
            <Form.Check
              key={optionIndex}
              type="radio"
              label={option}
              checked={selectedOption === option}
              onChange={() => setSelectedOption(option)}
            />
          ))}
        </Form>
        {selectedOption && (
          <div>
            <Button variant="primary" onClick={handleVote}>
              Vote
            </Button>
          </div>
        )}
        {selectedOption && poll.votes[selectedOption] !== undefined && (
          <div>
            <h5>Your Vote: {selectedOption}</h5>
            <ProgressBar
              now={
                (poll.votes[selectedOption] || 0) /
                Object.values(poll.votes).reduce((sum, voteCount) => sum + voteCount, 0) *
                100
              }
              label={`${Math.round(
                ((poll.votes[selectedOption] || 0) /
                  Object.values(poll.votes).reduce((sum, voteCount) => sum + voteCount, 0)) *
                  100
              )}%`}
            />
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

export default VotingComponent;
