
import React from 'react';
import { Navbar, Nav, Container, Tab, NavDropdown } from 'react-bootstrap';
import { useParams } from 'react-router';
import './Admin.css';
import { FaCalculator, FaCalendar, FaChartBar, FaCompass,FaPoll,FaShieldAlt,FaSignOutAlt, FaUserEdit, FaUserPlus } from "react-icons/fa";
import {Row,Col} from 'react-bootstrap';
import { Table,Form} from 'react-bootstrap';
import Timetable from './Timetable/Timetable';
import StdDetails from './Registration/Student/stddetails';
import TeacherDetails from './Registration/Teacher/teacherDetails';
import Account from './Account Creation/Account';
import Subject from './Registration/subjects/Subject';
import Results from './Results/Results';
import PollingSystem from './Polling/PollingSystem';
import { useUser } from '../UserContext';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import OtherAccount from './Account Creation/otherusers/other';

export default function Admin ()  {
  const user = useSelector(state => state.auth.user); 


  return (
    <div className="AdminPanal">
       <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Container>
        <Navbar.Brand href="#home" className='header'>Siyathra Higher Education Institue</Navbar.Brand>
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
          <Nav variant="tabs" className="mb-3">
            <Nav.Item>
              <Nav.Link eventKey="tab1"><FaCompass/> Dashboard</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="tab2"><FaUserEdit/> User Accounts</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="tab3"><FaCalendar/> Timetable</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="tab4"><FaChartBar/> Exam Results</Nav.Link>
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
              <h4>Student Details</h4>
             
              <StdDetails/>
              
              </Container>
            </Tab.Pane>
            <Tab.Pane eventKey="tab2" className='tab'>
              <Container>
              <h4>User Account Management</h4>
              </Container>
              <Account/>
            </Tab.Pane>
            <Tab.Pane eventKey="tab3" className='tab'>
              <Container>
              <h4>Timetable Management</h4>
</Container>
              <Timetable/>
            </Tab.Pane>
            <Tab.Pane eventKey="tab4" className='tab'>
              <Container>
              <h4>Exam Results</h4></Container>
              <Results/>
            </Tab.Pane>
            <Tab.Pane eventKey="tab5" className='tab'>
              <Container>
              <h4>Making Polls</h4></Container>
              <PollingSystem/>
            </Tab.Pane>
            <Tab.Pane eventKey="tab6" className='tab'>
              <Container>
              <h4>TEAM</h4>
              <h5>User Accounts</h5>
              <OtherAccount/>
              <h5>Subject Details</h5>
              <Subject/>
              </Container>
              
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>

    </div>
  );
}
