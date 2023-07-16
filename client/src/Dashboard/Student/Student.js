import React from 'react';
import { Navbar, Nav, Container, Button,NavDropdown } from 'react-bootstrap';
import './Student.css';
import Footer from '../../components/Footer';
import { Tab } from 'react-bootstrap';
import {Row,Col} from 'react-bootstrap';
import cart from '../../images/cart.jpg';
import { useState } from 'react';
import { Table, Form, FormControl } from 'react-bootstrap';
import { useParams } from "react-router";

function Student() {
  const {email}=useParams();
    const [searchId, setSearchId] = useState('');

  const handleSearchChange = (e) => {
    setSearchId(e.target.value);
  };

  const data = [
    { id: 1, name: 'John', age: 25 },
    { id: 2, name: 'Jane', age: 30 },
    { id: 3, name: 'Bob', age: 35 },
   
  ];

  const filteredData = data.filter((row) => {
    return row.id.toString().includes(searchId);
  });
  return (
    <div>
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Container>
        <Navbar.Brand href="#home">Siyathra LMS</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* Add your navigation links here */}
          </Nav>
          <Nav>
            <NavDropdown title={email} id="login-dropdown">
            <NavDropdown.Item href="#profile">Profile</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#logout">Logout</NavDropdown.Item>
          </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Tab.Container defaultActiveKey="tab1">
      <Nav variant="tabs">
        <Nav.Item>
          <Nav.Link eventKey="tab1">Courses</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="tab2">Exam Results</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="tab3">Forum</Nav.Link>
        </Nav.Item>
      </Nav>
      <Tab.Content>
        <Tab.Pane eventKey="tab1" className='tab'>
          <h1>My Subjects</h1>
          <Container>
          <Row>
          <Col className='col-md-3'>
                <div class="card">
      <img src={cart} alt="Card Image"/>
      <div class="card-content">
        <h2>Sinhala</h2>
        <p>Card description goes here.</p>
      </div>
    </div>
              </Col>
              <Col className='col-md-3'>
                <div class="card">
      <img src={cart} alt="Card Image"/>
      <div class="card-content">
        <h2>Sinhala</h2>
        <p>Card description goes here.</p>
      </div>
    </div>
              </Col>
              <Col className='col-md-3'>
                <div class="card">
      <img src={cart} alt="Card Image"/>
      <div class="card-content">
        <h2>Sinhala</h2>
        <p>Card description goes here.</p>
      </div>
    </div>
              </Col>
              <Col className='col-md-3'>
                <div class="card">
      <img src={cart} alt="Card Image"/>
      <div class="card-content">
        <h2>Sinhala</h2>
        <p>Card description goes here.</p>
      </div>
    </div>
              </Col>
          </Row>
          </Container>
        </Tab.Pane>
        <Tab.Pane eventKey="tab2" className='tab'>
          <h1>Exam Results</h1>
          <Container>
         <Row>
            <Col>
            <Form>
        <FormControl
          type="text"
          placeholder="Enter Your Index Number"
          value={searchId}
          onChange={handleSearchChange}
        />
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Index No.</th>
            <th>Name</th>
            <th>Subject</th>
            <th>Result</th>
            <th>Place</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.age}</td>
              <td>{row.age}</td>
              <td>{row.age}</td>
            </tr>
          ))}
        </tbody>
      </Table>
            </Col>
         </Row>
         </Container>
        </Tab.Pane>
        <Tab.Pane eventKey="tab3" className='tab'>
          <h1>Open Forum</h1>
          <p>This is the content of Tab 3.</p>
        </Tab.Pane>
      </Tab.Content>
    </Tab.Container>
    <Footer>
    <Footer/>
    </Footer>
    
    </div>
  );
}

export default Student;
