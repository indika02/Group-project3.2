import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, ListGroup, ListGroupItem, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';
import { setUserProfileData } from '../../features/actions';
import "./Polls.css";
import { FaVoteYea } from 'react-icons/fa';

export default function Voting() {
  const user = useSelector(state => state.auth.user);
  const userProfiledata = useSelector(state => state.userProfile.userProfiledata);
  const [polls, setPolls] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [hasVoted, setHasVoted] = useState({});

  useEffect(() => {
    fetchPollDetails();
  }, []);

  const fetchPollDetails = async () => {
    try {
      const response = await axios.get("http://localhost:5000/polls/list");
     
      const filteredPolls = response.data.filter((poll) => {
        const matchesLname =
          userProfiledata.Lname1.includes(poll.Lname) ||
          userProfiledata.Lname2.includes(poll.Lname) ||
          userProfiledata.Lname3.includes(poll.Lname) ||
          userProfiledata.Lname4.includes(poll.Lname);
  
        const matchesSubject =
          userProfiledata.subject1.includes(poll.subject) ||
          userProfiledata.subject2.includes(poll.subject) ||
          userProfiledata.subject3.includes(poll.subject) ||
          userProfiledata.subject4.includes(poll.subject);
  
        const matchesBatchYear = poll.batchYear === userProfiledata.batchyear;
        const matchesClassType = poll.classType === userProfiledata.classtype;
  
        return matchesLname && matchesSubject && matchesBatchYear && matchesClassType;
      });
      setPolls(filteredPolls);
      console.log("Filtered Polls:", filteredPolls);
    } catch (error) {
      console.error("Failed to fetch Poll Details:", error);
    }
  };
  


  const handleOptionChange = (pollId, option) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [pollId]: option,
    }));
  };

  const handleVote = async (pollId) => {
    const selectedOption = selectedOptions[pollId];
    if (selectedOption) {
      try {
        await axios.post("http://localhost:5000/polls/vote", { pollId, selectedOption });
        fetchPollDetails();
        setHasVoted((prevHasVoted) => ({
          ...prevHasVoted,
          [pollId]: true,
        }));
      } catch (error) {
        console.error("Failed to vote:", error);
      }
    }
  };

  return (
    <Container>
      <div>
        <Row>
          {polls.map((poll, pollIndex) => (
            <Col key={pollIndex}>
              <Card>
                <Card.Body>
                  <Card.Title className='poll-qu'>{poll.question}</Card.Title>
                  <p>Class Type: {poll.classType}</p>
                  <p>Batch Year: {poll.batchYear}</p>
                  <p>Lecturer Name: {poll.Lname}</p>
                  <p>Subject: {poll.subject}</p>
                  <ListGroup>
                    {poll.options.map((option, index) => (
                      <ListGroupItem key={index}>
                        <Form.Check
                          type="radio"
                          name={`pollOption-${poll._id}`}
                          label={option.text}
                          value={option.text}
                          checked={selectedOptions[poll._id] === option.text}
                          onChange={() => handleOptionChange(poll._id, option.text)}
                          disabled={hasVoted[poll._id]}
                        />
                      </ListGroupItem>
                    ))}
                  </ListGroup>
                  <Button variant="primary" className="vote" onClick={() => handleVote(poll._id)} disabled={hasVoted[poll._id]}>
                    <FaVoteYea/> Vote
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
}
