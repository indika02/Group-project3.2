// VotingOption.js

import React from 'react';
import { Button } from 'react-bootstrap';

const VotingOption = ({ options, handleVote }) => {
  return (
    <div>
      <h4>Vote:</h4>
      <ul>
        {options.map((option, index) => (
          <li key={index}>
            <Button variant="success" onClick={() => handleVote(index)} className="btn">
              {option.text}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VotingOption;
