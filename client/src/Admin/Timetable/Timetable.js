import {React,useState} from "react";
import {Form,Col,Row,Table} from "react-bootstrap";

export default function Timetable(){
    return(
        <div>
            <Form>
                    <Row>
                      <Col>
                      <Form.Group controlId="lecturerName" >
              <Form.Label>Lecturer Name</Form.Label>
              <Form.Control type="text" placeholder="Enter lecturer name" />
            </Form.Group>
                      </Col>
                      <Col>
                      <Form.Group controlId="subject">
              <Form.Label>Subject</Form.Label>
              <Form.Control type="text" placeholder="Enter subject" />
            </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                      <Form.Group controlId="dateAndTime" className="mb-3">
              <Form.Label>Date and Time</Form.Label>
              <Form.Control type="datetime-local" />
            </Form.Group>
                      </Col>
                      <Col>
                      <Form.Group controlId="venue" className="mb-3">
              <Form.Label>Venue</Form.Label>
              <Form.Control type="text" placeholder="Enter venue" />
            </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                      <Form.Group controlId="class" className="mb-3">
              <Form.Label>Class Type</Form.Label>
              <Form.Select defaultValue="ol">
                <option value="ol">O/L</option>
                <option value="al">A/L</option>
              </Form.Select>
              </Form.Group>
                      </Col>
                      <Col>
                      <Form.Group controlId="type" className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Select defaultValue="theory">
                <option value="theory">Theory</option>
                <option value="revision">Revision</option>
              </Form.Select>
            </Form.Group>
                      </Col>
                    </Row>
            
        
            <button className='savebtn'>Save</button>
          </Form>
          <Table striped bordered hover>
              <thead>
                <tr>
                <th>Lecturer's Name</th>
                <th>Subject</th>
                <th>Time</th>
                <th>Venue</th>
                <th>Theory/Revision</th>
                </tr>
              </thead>
              <tbody>
                
                  <tr>
                    <td>Mr Perera</td>
                    <td>Sinhala</td>
                    <td>19/04/2023 10-12 AM</td>
                    <td>A Hall</td>
                    <td>Theroy</td>
                  </tr>
                
              </tbody>
            </Table>
        </div>
    )
}