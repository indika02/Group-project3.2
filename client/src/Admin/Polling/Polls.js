import React, { useState, useContext } from 'react';
import { Form, Button, ProgressBar, Container } from 'react-bootstrap';
import './Polls.css';

// Create an AuthContext for authentication
const AuthContext = React.createContext();

const PollingSystem = () => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([]);
  const [authenticated, setAuthenticated] = useState(false); // Track authentication state

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
    if (authenticated) {
      setOptions((prevOptions) =>
        prevOptions.map((option, index) =>
          index === optionId ? { ...option, votes: option.votes + 1 } : option
        )
      );
    } else {
      alert('You are not authorized to vote.');
    }
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

  const handleLogin = () => {
    // Simulating a successful login
    setAuthenticated(true);
  };

  const handleLogout = () => {
    // Simulating a logout
    setAuthenticated(false);
  };

  return (
    <div className="container">
      <AuthContext.Provider value={authenticated}>
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
              <AuthButton onLogin={handleLogin} onLogout={handleLogout} />
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
      </AuthContext.Provider>
    </div>
  );
};

// AuthButton component to handle login and logout
const AuthButton = ({ onLogin, onLogout }) => {
  const authenticated = useContext(AuthContext);

  return (
    <div>
      {authenticated ? (
        <Button variant="warning" onClick={onLogout} className="btn">
          Logout
        </Button>
      ) : (
        <Button variant="success" onClick={onLogin} className="btn">
          Login
        </Button>
      )}
    </div>
  );
};

export default PollingSystem;
