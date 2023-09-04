import React, { useState,useEffect } from 'react';
import { Form, Button, Container, Row, Col ,Card,ListGroup,ListGroupItem,ProgressBar} from 'react-bootstrap';
import { FaMarker, FaPlus, FaTrash } from 'react-icons/fa';
import './Polls.css';
import PollDisplay from './pollDisplay';
import axios from 'axios';
import swal from 'sweetalert';


function PollMaker() {
  const [newQuestion, setNewQuestion] = useState('');
  const [newOptions, setNewOptions] = useState([]);
  const[Lname,setLname]=useState("");
  const [classType,setClassType]=useState("");
  const[batchYear,setBatchyear]=useState("");
  const [lecturerName, setLecturerName] = useState("");
  const [subject, setSubject] = useState("");
  const [AllLecturers, setAllLecturers] = useState([]);
  const [Allsubjects, setAllsubjects] = useState([]);
  const [polls, setPolls] = useState([]);


  useEffect(() => {
    axios.get('http://localhost:5000/subject/').then((response) => {
      setAllsubjects(response.data);
      setAllLecturers(response.data);
    }).catch((error) => {
      console.log('Error fetching data.', error);
    });
  }, []);

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
      batchYear: batchYear,
      classType: classType,
      Lname: Lname,
      subject:subject,
    };
  
    console.log(newPoll);
  
    axios
      .post("http://localhost:5000/polls/add", newPoll) // Send the newPoll object in the POST request
      .then(() => {
        
        swal("Success", "Adding Successful!", "success");
        setNewQuestion('');
        setNewOptions([]);
        setBatchyear(''); // Reset batchYear
        setClassType(''); // Reset classType
        setLname(''); // Reset Lname
      })
      .catch((err) => {
        swal("Error", "Invalid Data Input!", "error");
      });
  };
  

  return (
    <Container>
    <Row>
    <Col sm={3}>
        <select
          className="form-select form-control"
          onChange={(e) => {
            setClassType(e.target.value);
          }}
        >
          <option value="">All Class Types</option>
          <option value="grade06">Grade 06</option>
          <option value="grade07">Grade 07</option>
          <option value="grade08">Grade 08</option>
          <option value="grade09">Grade 09</option>
          <option value="grade10">Grade 10</option>
          <option value="grade11">Grade 11</option>
          <option value="A/L">A/L</option>
         
        </select>
        </Col>
        <Col sm={3}>
        <select
          className="form-select form-control"
          onChange={(e) => {
            setBatchyear(e.target.value);
          }}
        >
          <option value="">All Batch Years</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
          <option value="2026">2026</option>
          <option value="2027">2027</option>
          <option value="2028">2028</option>
          <option value="2029">2029</option>
        </select>
        </Col>
        <Col sm={3}>
        <div className='form-group'>
          
          <select id="country" className="form-select form-control" onChange={(e) => setLname(e.target.value)}>
            <option value="">Select the Lecturer</option>
            {AllLecturers.map((item) => (
              <option key={item._id} value={item.Lname}>{item.Lname}</option>
            ))}
          </select>
        </div>
      </Col>
      <Col sm={3}>
      <div className='form-group'>
      
      <select id="country" className="form-select form-control" onChange={(e) => setSubject(e.target.value)}>
        <option value="">Select the Subject</option>
        {Allsubjects.map((item) => (
          <option key={item._id} value={item.subject}>{item.subject}</option>
        ))}
      </select>
    </div>
      </Col>
    </Row>
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
    </Container>
  );
}

export default PollMaker;
