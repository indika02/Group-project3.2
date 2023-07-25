// VotingResults.js

import React from 'react';
import { ProgressBar } from 'react-bootstrap';

const VotingResults = ({ options, calculatePercentage }) => {
  return (
    <div>
      <h4>Voting Percentages:</h4>
      {options.map((option, index) => (
        <div key={index}>
          <p>
            {option.text}: {calculatePercentage(option.votes)}%
          </p>
          <ProgressBar
            now={calculatePercentage(option.votes)}
            label={`${calculatePercentage(option.votes)}%`}
          />
        </div>
      ))}
    </div>
  );
};

export default VotingResults;
