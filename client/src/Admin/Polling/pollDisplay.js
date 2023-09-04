import React, { useState, useEffect } from 'react';
import { Card, ListGroup, ListGroupItem, ProgressBar, Row, Col } from 'react-bootstrap';
import axios from 'axios';

function PollDisplay() {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    fetchPollDetails();
  }, []);

  const fetchPollDetails = async () => {
    try {
      const response = await axios.get("http://localhost:5000/polls/list");
      setPolls(response.data);
    } catch (error) {
      console.error("Failed to fetch Poll Details:", error);
    }
  };

  return (
    <div>
      <Row>
      
        {polls.map((poll, pollIndex) => (
          <Col key={pollIndex} sm={4}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>{poll.question}</Card.Title>
                <p>Class Type: {poll.classType}</p>
                <p>Batch Year: {poll.batchYear}</p>
                <p>Lecturer Name: {poll.Lname}</p>
                <ListGroup>
                  {poll.options.map((option, index) => (
                    <ListGroupItem key={index}>
                      <div>
                        {option.text}
                        <ProgressBar
                          variant="info"
                          now={option.votes}
                          label={`${option.votes} Votes`}
                        />
                      </div>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        ))}
        
      </Row>
    </div>
  );
}

export default PollDisplay;
