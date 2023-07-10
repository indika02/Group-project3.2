      import React from 'react';
      import { Navbar, Nav, Container, Tab,NavDropdown } from 'react-bootstrap';
      import './Admin.css';
      import { FaCalculator, FaCalendar, FaChartBar, FaCompass,FaSignOutAlt, FaUserEdit, FaUserPlus } from "react-icons/fa";
      import {Row,Col} from 'react-bootstrap';
      import { Table,Form} from 'react-bootstrap';
      import Timetable from './Timetable/Timetable';
import StdDetails from './Registration/Student/stddetails';

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
                <Nav.Link eventKey="tab2"><FaUserEdit/> User Accounts</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="tab3"><FaCalendar/> Timetable</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="tab4"><FaChartBar/> Exam Results</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="tab5"><FaCalculator/>Payments</Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="tab1" className='tab'>
                <h4>User Details</h4>
                <StdDetails/>
              </Tab.Pane>
              <Tab.Pane eventKey="tab2"  className='tab'>
                <h4>User Account Management</h4>
              </Tab.Pane>
              <Tab.Pane eventKey="tab3"  className='tab'>
                <h1>Timetable Management</h1>
                <Timetable/>
              </Tab.Pane>
              <Tab.Pane eventKey="tab4"  className='tab'>
                <h1>Tab 3 Content</h1>
                <Container>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
              </Container>
              </Tab.Pane>
              <Tab.Pane eventKey="tab5"  className='tab'>
                <h1>Tab 3 Content</h1>
                <p>This is the content of Tab 3.</p>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
          </div>
        );
      }

      export default Admin;
