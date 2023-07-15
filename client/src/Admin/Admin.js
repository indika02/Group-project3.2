import React from 'react';
import { Navbar, Nav, Container, Tab, NavDropdown } from 'react-bootstrap';
import './Admin.css';
import { FaCalculator, FaCalendar, FaChartBar, FaCompass,FaSignOutAlt, FaUserEdit, FaUserPlus } from "react-icons/fa";
import {Row,Col} from 'react-bootstrap';
import { Table,Form} from 'react-bootstrap';
import Timetable from './Timetable/Timetable';
import StdDetails from './Registration/Student/stddetails';
import TeacherDetails from './Registration/Teacher/teacherDetails';
import Account from './Account Creation/Account';
import Subject from './Registration/subjects/Subject';
import Results from './Results/Results';

function Admin() {
  return (
    <div className="AdminPanal">
       <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Container>
        <Navbar.Brand href="#home" className='header'>Siyathra Higher Education Institue</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* Add your navigation links here */}
          </Nav>
          <Nav>
            <NavDropdown title="Login" id="login-dropdown">
            <NavDropdown.Item href="#profile">Profile</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#logout">Logout</NavDropdown.Item>
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
              <Nav.Link eventKey="tab5"><FaCalculator/> Payments</Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="tab1" className='tab'>
              <h4>Student Details</h4>
              <StdDetails/>
              <h4>Teacher Details</h4>
              <TeacherDetails/>
              <h4>Subjects</h4>
              <Subject/>
            </Tab.Pane>
            <Tab.Pane eventKey="tab2" className='tab'>
              <h4>User Account Management</h4>
              <Account/>
            </Tab.Pane>
            <Tab.Pane eventKey="tab3" className='tab'>
              <h4>Timetable Management</h4>
              <Timetable/>
            </Tab.Pane>
            <Tab.Pane eventKey="tab4" className='tab'>
              <h4>Exam Results</h4>
              <Results/>
            </Tab.Pane>
            <Tab.Pane eventKey="tab5" className='tab'>
              <h1>Tab 3 Content</h1>
              <p>This is the content of Tab 3.</p>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>

    </div>
  );
}

export default Admin;
