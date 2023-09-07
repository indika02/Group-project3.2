import React, { useState,useEffect } from 'react';
import { Form, Button, Container, Row, Col ,Card,ListGroup,ListGroupItem,ProgressBar} from 'react-bootstrap';
import { FaMarker, FaPlus, FaTrash } from 'react-icons/fa';
import './Polls.css';
import PollDisplay from './pollDisplay';
import axios from 'axios';
import swal from 'sweetalert';
import { useSelector,useDispatch } from 'react-redux';
import { setUserProfileData } from '../../features/actions';



function PollMaker() {
  const user = useSelector(state => state.auth.user);
  const [newQuestion, setNewQuestion] = useState('');
  const [newOptions, setNewOptions] = useState([]);
  const[Lname,setLname]=useState("");
  const [classType,setClassType]=useState("");
  const[batchYear,setBatchyear]=useState("");
 
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
      const pollsData = response.data; 
      const pollLnames = pollsData.map((poll) => poll.Lname);
      console.log(pollLnames);

      const filteredPolls = pollsData.filter((poll) => poll.Lname === user.name);
      setPolls(filteredPolls);
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
      Lname: user.name,
      subject:subject,
    };
  
    console.log(newPoll);
  
    axios
      .post("http://localhost:5000/polls/add", newPoll)
      .then(() => {
        
        swal("Success", "Adding Successful!", "success");
        setNewQuestion('');
        setNewOptions([]);
        setBatchyear(''); 
        setClassType(''); 
        setLname('');
        fetchPollDetails();
      })
      .catch((err) => {
        swal("Error", "Invalid Data Input!", "error");
      });
  };
  
  const handleDelete = async (id) => {
    try {
      const result = await swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this poll!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      });
  
      if (result) {
        await axios.delete(`http://localhost:5000/polls/delete/${id}`);
        swal("Success", "Poll Deleted successfull!", "success");
        fetchPollDetails();
      } else {
        swal("Cancelled", "Account was not deleted.", "info");
      }
    } catch (error) {
      swal("Error!", "Failed to delete Account!", "error");
      console.log(error);
    }
  };

  return (
    <Container>
    <Row className='polld'>
    <Col sm={4}>
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
        <Col sm={4}>
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
        
      <Col sm={4}>
      <div className='form-group'>
      
      <select id="country" className="form-select form-control" onChange={(e) => setSubject(e.target.value)}>
        <option value="">Select your Subject</option>
        {Allsubjects.map((item) => (
          <option key={item._id} value={item.subject}>{item.subject}</option>
        ))}
      </select>
    </div>
      </Col>
    </Row>
      <Row className='pollc'>
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
      
      
      </Row>
      
      <Row>
      
        {polls.map((poll, pollIndex) => (
          <Col key={pollIndex} sm={4}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title className='poll-qu'>{poll.question}</Card.Title>
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

              <Button class="btn btn-danger polldel" onClick={() => handleDelete(poll._id)}><FaTrash/></Button>
            </Card>
          </Col>
        ))}
        
      </Row>
    
    </Container>
  );
}

export default PollMaker;
