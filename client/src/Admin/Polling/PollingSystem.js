import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

function PollMaker() {
  const [newQuestion, setNewQuestion] = useState('');
  const [newOptions, setNewOptions] = useState([]);

  const handleAddOption = () => {
    setNewOptions([...newOptions, '']);
  };

  const handleRemoveOption = (index) => {
    const updatedOptions = newOptions.filter((_, i) => i !== index);
    setNewOptions(updatedOptions);
  };

  const handleSubmit = () => {
    // You can save the new poll data to your backend or store it locally
    const newPoll = {
      question: newQuestion,
      options: newOptions.filter((option) => option.trim() !== ''),
    };

    console.log(newPoll); // For testing purposes
    // TODO: Send new poll data to your backend or update state/store

    // Clear input fields after submitting
    setNewQuestion('');
    setNewOptions([]);
  };

  return (
    <Container>
      <h1>Poll Maker</h1>
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
              <Col sm={1}>
                <Button
                  variant="danger"
                  onClick={() => handleRemoveOption(index)}
                >
                  Delete
                </Button>
              </Col>
            </Row>
          </Form.Group>
        ))}
        <Button variant="secondary" onClick={handleAddOption}>
          Add Option
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Create Poll
        </Button>
      </Form>
    </Container>
  );
}

export default PollMaker;
