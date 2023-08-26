
import React from 'react';
import { Navbar, Nav, Container, Tab, NavDropdown ,Col,Row} from 'react-bootstrap';
import './Admin.css';
import { FaCalendar, FaChartBar, FaCompass,FaPoll,FaShieldAlt,FaUserEdit, FaUserPlus } from "react-icons/fa";
import Timetable from './Timetable/Timetable';
import StdDetails from './Registration/Student/stddetails';
import Account from './Account Creation/Account';
import Subject from './Registration/subjects/Subject';
import Results from './Results/Results';
import PollingSystem from './Polling/PollingSystem';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import OtherAccount from './Account Creation/otherusers/other';
import Qrprint from './Registration/Student/qrprint/qrprint';
import StdProfile from './Registration/Student/stdprofile';
import PollMaker from './Polling/PollingSystem';
import Attendance from './attendance/attendance';
import Adminhome from './home/adminhome';

export default function Admin ()  {
  const user = useSelector(state => state.auth.user); 


  return (
    <div className="AdminPanal">
       <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed='top'>
      <Container>
        <Navbar.Brand href="#home" className='header'>Siyathra Higher Education Institute</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          <Nav>
            <NavDropdown title={user.email}id="login-dropdown">
            <NavDropdown.Item as={Link} to="">Profile</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="/login">Logout</NavDropdown.Item>
          </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        <Tab.Container defaultActiveKey="tab1">
          <Nav variant="tabs" className="mb-3 tabadmin">
            <Nav.Item>
              <Nav.Link eventKey="tab1" ><FaCompass/> Dashboard</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="tab2"><FaUserPlus/>Students Details</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="tab3"><FaUserEdit/> User Accounts</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="tab4"><FaCalendar/> Timetable</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="tab5"><FaPoll/>Making Polls</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="tab6"><FaShieldAlt/>Team </Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
          <Tab.Pane eventKey="tab1" className='tab'>
          <Container>
          <Adminhome/>
          <h4>Subject and Lecturer Details</h4>
          <Subject/>
          <Row>
          <Col sm={12}>
          <h4>Details of Class Attendance</h4>
          <Attendance/>
          </Col>
          </Row>
          
         
          </Container>
        </Tab.Pane>
            <Tab.Pane eventKey="tab2" className='tab'>
              <Container>
              <h4>Student Details</h4>
             <StdDetails/>
          <Row>
          <Col>
          <h4>Student's Profile Details</h4>
          <StdProfile/>
          </Col>
        
          </Row>
          <Row>
          <Col sm={4}>
          <h4>QR Code Details</h4>
          <Qrprint/>
          </Col>
          <Col sm={8}>
          </Col>
          </Row>
              
              </Container>
            </Tab.Pane>
            <Tab.Pane eventKey="tab3" className='tab'>
              <Container>
              <h4>Students  User Account Management</h4>
              </Container>
              <Account/>
              
              
            </Tab.Pane>
            <Tab.Content>
            <Tab.Pane eventKey="tab4" className='tab'>
              <Container>
              <h4>Timetable Management</h4>
              <Timetable/>
</Container>
              
            </Tab.Pane>
            </Tab.Content>
            
            <Tab.Pane eventKey="tab5" className='tab'>
              <Container>
              <h4>Making Polls</h4></Container>
              <PollMaker/>
            </Tab.Pane>
            <Tab.Pane eventKey="tab6" className='tab'>
              <Container>
              <h4>TEAM</h4>
              <OtherAccount/>
              
              </Container>
              
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>

    </div>
  );
}
