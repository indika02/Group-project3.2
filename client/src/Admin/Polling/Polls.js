import React, { useState } from 'react';
import { Form, Button, ProgressBar, Container } from 'react-bootstrap';
import './Polls.css';

const PollingSystem = () => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([]);

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleOptionChange = (e, index) => {
    const newOptions = [...options];
    newOptions[index] = { ...newOptions[index], text: e.target.value };
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    setOptions([...options, { text: '', votes: 0 }]);
  };

  const handleVote = (optionId) => {
    setOptions((prevOptions) =>
      prevOptions.map((option, index) =>
        index === optionId ? { ...option, votes: option.votes + 1 } : option
      )
    );
  };

  const handleDeleteOption = (index) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  const calculateTotalVotes = () => {
    return options.reduce((total, option) => total + option.votes, 0);
  };

  const calculatePercentage = (votes) => {
    const totalVotes = calculateTotalVotes();
    return totalVotes > 0 ? ((votes / totalVotes) * 100).toFixed(2) : 0;
  };

  const handleReset = () => {
    setQuestion('');
    setOptions([]);
  };

  return (
    <div className="container">
      <Container>
        <Form.Group>
          <Form.Label>Add Your Question</Form.Label>
          <Form.Control type="text" value={question} onChange={handleQuestionChange} />
        </Form.Group>
        <h4>Options:</h4>
        {options.map((option, index) => (
          <div key={index} className="option-container">
            <Form.Control
              type="text"
              value={option.text}
              onChange={(e) => handleOptionChange(e, index)}
              className="option"
            />
            <Button variant="danger" onClick={() => handleDeleteOption(index)} className="delete-btn">
              Delete
            </Button>
          </div>
        ))}
        <Button variant="primary" onClick={handleAddOption} className="btn">
          Add Option
        </Button>

        {options.length > 0 && (
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
        )}

        <Button variant="danger" onClick={handleReset} className="btn">
          Reset
        </Button>
      </Container>
    </div>
  );
};

export default PollingSystem;
