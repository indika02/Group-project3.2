import {React,useState} from "react";
import {Form,Col,Row,Table, Container} from "react-bootstrap";
import axios from "axios";
import swal from 'sweetalert';
import DisplayTime from "./DisplayTime";

export default function Timetable(){

  const [date,setDate]=useState("");
  const[lecName,setlecName]=useState("");
  const[subject,setSubject]=useState("");
  const[time,setTime]=useState("");
  const[venue,setVenue]=useState("");
  const[classType,setclassType]=useState("");
  const[type,setType]=useState("");

  function sendData(e){
    e.preventDefault();

    const newSchedule={
      date,
      lecName,
      subject,
      time,
      venue,
      classType,
      type
    }
console.log(newSchedule);
    axios.post("http://localhost:5000/timetable/add",newSchedule).then(()=>{
      swal("Success", "Scheduled a New Class!", "success");
    }).catch((err)=>{
      swal("Error!", "Invaid Input,Please Try again!", "error");
    })
  }
    return(
        <div>
            <Form onSubmit={sendData}>
                    <Row>
                      <Col>
                      <Form.Group controlId="date" className="mb-3">
              <Form.Label>date</Form.Label>
              <Form.Control type="date" 
              onChange={(e)=>{
                setDate(e.target.value);
            }}
              />
            </Form.Group>
            </Col>
            <Col>
                      <Form.Group controlId="lecturerName" >
              <Form.Label>Lecturer Name</Form.Label>
              <Form.Control type="text" placeholder="Enter lecturer name" 
              onChange={(e)=>{
                setlecName(e.target.value);
            }}
              />
            </Form.Group>
                      </Col>
                      <Col>
                      <Form.Group controlId="subject">
              <Form.Label>Subject</Form.Label>
              <Form.Control type="text" placeholder="Enter subject" 
              onChange={(e)=>{
                setSubject(e.target.value);
            }}
              />
            </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                      <Form.Group controlId="Time" className="mb-3">
              <Form.Label>Time</Form.Label>
              <Form.Control type="time" 
              onChange={(e)=>{
                setTime(e.target.value);
            }}
              />
            </Form.Group>
                      </Col>
                      <Col>
                      <Form.Group controlId="venue" className="mb-3">
              <Form.Label>Venue</Form.Label>
              <Form.Control type="text" placeholder="Enter venue" 
              onChange={(e)=>{
                setVenue(e.target.value);
            }}
              />
            </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                      <Form.Group controlId="class" className="mb-3">
              <Form.Label>Class Type</Form.Label>
              <Form.Select defaultValue="ol"
              onChange={(e)=>{
                setclassType(e.target.value);
            }}
              >
                <option value="ol">O/L</option>
                <option value="al">A/L</option>
              </Form.Select>
              </Form.Group>
                      </Col>
                      <Col>
                      <Form.Group controlId="type" className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Select defaultValue="theory"
              onChange={(e)=>{
                setType(e.target.value);
            }}
              >
                <option value="theory">Theory</option>
                <option value="revision">Revision</option>
              </Form.Select>
            </Form.Group>
                      </Col>
                    </Row>
            
        
            <button className='savebtn'>Save</button>
          </Form>
          <Container>
          <DisplayTime/>
            </Container>
        </div>
    )
}