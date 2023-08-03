
import React from 'react';
import { Navbar, Nav, Container, Tab, NavDropdown } from 'react-bootstrap';
import { useParams } from 'react-router';
import './Admin.css';
import { FaCalculator, FaCalendar, FaChartBar, FaCompass,FaPoll,FaSignOutAlt, FaUserEdit, FaUserPlus } from "react-icons/fa";
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
import { useState } from 'react';

export default function Admin ()  {
    const { user } = useUser();
  const {email}=useParams();
  const [activeTab, setActiveTab] = useState('tab1');

  const userEmail = user?.email;

  const handleTabSelect = (key) => {
    setActiveTab(key);
  };
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
    <Container fluid>
      <Row>
          <Col xs={12} sm={1} className="sidebar">
            <Tab.Container activeKey={activeTab}>
            <Nav variant="pills" className="flex-column">
            <Nav.Item className='navitem'>
              <Nav.Link eventKey="tab1" active={activeTab === 'tab1'} onClick={() => handleTabSelect('tab1')} className='navlink'><FaCompass/> Dashboard</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="tab2" active={activeTab === 'tab2'} onClick={() => handleTabSelect('tab2')} className='navlink'><FaUserEdit/> User Accounts</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="tab3" active={activeTab === 'tab3'} onClick={() => handleTabSelect('tab3')} className='navlink'><FaCalendar/> Timetable</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="tab4" active={activeTab === 'tab4'} onClick={() => handleTabSelect('tab4')} className='navlink'><FaChartBar/> Exam Results</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="tab5" active={activeTab === 'tab5'} onClick={() => handleTabSelect('tab5')} className='navlink'><FaPoll/>Making Polls</Nav.Link>
            </Nav.Item>
            </Nav>
            </Tab.Container>
          </Col>
          <Col sm={10} className="tab-content">
            <Tab.Container activeKey={activeTab}>
            <Tab.Content>
            <Tab.Pane eventKey="tab1" className='tab'>
              <h4>Student Details</h4>
              <StdDetails/>
              
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
              <h4>Making Polls</h4>
              <PollingSystem/>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
        </Col>
        </Row>
</Container>
    </div>
  );
}
