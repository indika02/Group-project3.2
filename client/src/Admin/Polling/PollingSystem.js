import React, { useState } from 'react';

function PollingSystem() {
  const [polls, setPolls] = useState([]);
  const [selectedPoll, setSelectedPoll] = useState(null);

  // Function to create a new poll
  const createPoll = (question, options) => {
    const newPoll = {
      question,
      options: options.map((option) => ({ text: option, votes: 0 })),
    };
    setPolls([...polls, newPoll]);
  };

  // Function to handle voting
  const handleVote = (pollIndex, optionIndex) => {
    if (selectedPoll === null) {
      setSelectedPoll(pollIndex);
      const updatedPolls = polls.map((poll, index) => {
        if (index === pollIndex) {
          return {
            ...poll,
            options: poll.options.map((option, i) => {
              if (i === optionIndex) {
                return { ...option, votes: option.votes + 1 };
              }
              return option;
            }),
          };
        }
        return poll;
      });
      setPolls(updatedPolls);
    }
  };

  // Function to add a new voting option to a poll
  const addOption = (pollIndex, newOption) => {
    const updatedPolls = polls.map((poll, index) => {
      if (index === pollIndex) {
        return {
          ...poll,
          options: [...poll.options, { text: newOption, votes: 0 }],
        };
      }
      return poll;
    });
    setPolls(updatedPolls);
  };

  // Function to remove a voting option from a poll
  const removeOption = (pollIndex, optionIndex) => {
    const updatedPolls = polls.map((poll, index) => {
      if (index === pollIndex) {
        return {
          ...poll,
          options: poll.options.filter((option, i) => i !== optionIndex),
        };
      }
      return poll;
    });
    setPolls(updatedPolls);
  };

  return (
    <div>
      {/* Poll Creation Section */}
      <div>
        <h2>Create a New Poll</h2>
        <input type="text" placeholder="Poll Question" />
        {polls.map((poll, index) => (
          <div key={index}>
            <input type="text" placeholder={`Option ${index + 1}`} />
            <button onClick={() => addOption(index, `Option ${poll.options.length + 1}`)}>Add Option</button>
            {poll.options.map((option, optionIndex) => (
              <div key={optionIndex}>
                <label>
                  <input
                    type="radio"
                    name={`poll-${index}`}
                    onClick={() => handleVote(index, optionIndex)}
                    disabled={selectedPoll !== null}
                  />
                  {option.text}
                  {/* Add a button to remove this option */}
                  <button onClick={() => removeOption(index, optionIndex)}>Remove Option</button>
                </label>
              </div>
            ))}
          </div>
        ))}
        {/* Add more input fields for additional polls */}
        <button onClick={() => createPoll('Your Question', ['Option 1', 'Option 2'])}>Create Poll</button>
      </div>

      {/* Poll Voting Section */}
      <div>
        {polls.map((poll, index) => (
          <div key={index}>
            <h3>{poll.question}</h3>
            {poll.options.map((option, optionIndex) => (
              <div key={optionIndex}>
                <label>
                  <input
                    type="radio"
                    name={`poll-${index}`}
                    onClick={() => handleVote(index, optionIndex)}
                    disabled={selectedPoll !== null}
                  />
                  {option.text}
                </label>
              </div>
            ))}
            {selectedPoll === index && (
              <div>
                <p>Votes:</p>
                {poll.options.map((option, optionIndex) => (
                  <div key={optionIndex}>
                    <p>{option.text}</p>
                    <progress value={option.votes} max={poll.options.length}></progress>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PollingSystem;
