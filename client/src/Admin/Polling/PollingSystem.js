import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { FaMarker, FaPlus, FaTrash } from 'react-icons/fa';
import './Polls.css';

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
    
    const newPoll = {
      question: newQuestion,
      options: newOptions.filter((option) => option.trim() !== ''),
    };

    console.log(newPoll); 

   
    setNewQuestion('');
    setNewOptions([]);
  };

  return (
    <Container>
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
                <Button
                  variant="danger" className='pollbtn-del'
                  onClick={() => handleRemoveOption(index)}
                >
                  <FaTrash/>
                </Button>
              </Col>
            </Row>
          </Form.Group>
        ))}
        <Button variant="secondary" onClick={handleAddOption}  className='pollbtn'>
          <FaPlus/>
        </Button>
        <Button variant="primary" onClick={handleSubmit}  className='pollbtn'>
          <FaMarker/>
        </Button>
      </Form>
      
    </Container>
  );
}

export default PollMaker;
