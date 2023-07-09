      import React from 'react';
      import { Navbar, Nav, Container, Tab,NavDropdown } from 'react-bootstrap';
      import './Admin.css';
      import { FaCalculator, FaCalendar, FaChartBar, FaCompass,FaSignOutAlt, FaUserEdit, FaUserPlus } from "react-icons/fa";
      import {Row,Col} from 'react-bootstrap';
      import { Table,Form} from 'react-bootstrap';
      import StdReg from './Registration/Student/StdReg';
import TeaReg from './Registration/Teacher/TeaReg';

      function Admin ()  {

       

        return (
          <div className='AdminPanal'>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className='Adminnav'>
              <Navbar.Brand href="#home">Siyathra Higher Education Institute</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                  {/* Add your navigation links here */}
                </Nav>
                <Nav>
                  <NavDropdown title="Login" id="login-dropdown">
                  <NavDropdown.Item href="#profile">Profile</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#logout">Logout <FaSignOutAlt/></NavDropdown.Item>
                </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            
          </Navbar>
          <Tab.Container defaultActiveKey="tab1">
            <Nav variant="tabs">
              <Nav.Item>
                <Nav.Link eventKey="tab1"><FaCompass/> Dashboard</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="tab2"><FaUserPlus/> Registration</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="tab3"><FaUserEdit/> User Accounts</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="tab4"><FaCalendar/> Timetable</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="tab5"><FaChartBar/> Exam Results</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="tab6"><FaCalculator/>Payments</Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="tab1" className='tab'>
                <h1>Tab 1 Content</h1>
                <p>This is the content of Tab 1.</p>
                
              </Tab.Pane>
              <Tab.Pane eventKey="tab2"  className='tab'>
                <h4>Teacher Registration</h4>
                <TeaReg/>
              <h4>Student Registration</h4>
              <StdReg/>
              </Tab.Pane>
              <Tab.Pane eventKey="tab3"  className='tab'>
                <h4>User Account Management</h4>
              </Tab.Pane>
              <Tab.Pane eventKey="tab4"  className='tab'>
                <h1>Timetable Management</h1>
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
<Container>
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
            </Container>
              </Tab.Pane>
              <Tab.Pane eventKey="tab5"  className='tab'>
                <h1>Tab 3 Content</h1>
                <Container>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
              </Container>
              </Tab.Pane>
              <Tab.Pane eventKey="tab6"  className='tab'>
                <h1>Tab 3 Content</h1>
                <p>This is the content of Tab 3.</p>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
          </div>
        );
      }

      export default Admin;
