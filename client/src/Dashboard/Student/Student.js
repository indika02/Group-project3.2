    import React, { useEffect } from 'react';
    import { Navbar, Nav, Container, Button,NavDropdown } from 'react-bootstrap';
    import './Student.css';
    import Footer from '../../components/Footer';
    import { Tab } from 'react-bootstrap';
    import {Row,Col} from 'react-bootstrap';
    import cart from '../../images/cart.jpg';
    import { useState } from 'react';
    import { Table, Form, FormControl } from 'react-bootstrap';
    import { useParams } from "react-router";
    import { useUser } from '../../UserContext';
    import { FaChartBar, FaChartLine, FaContao, FaFileExcel, FaForumbee, FaVoteYea } from 'react-icons/fa';

    function Student() {
        const {email}=useParams();
        const { user } = useUser();
        const [userProfile,setUserProfile]=useState(null);
        const [examResults, setExamResults] = useState([]);

        

        useEffect(()=>{
          fetchUserProfile(email);
          fetchExamResults(user.index);
        },[email,user.index]);

        const fetchUserProfile = (email)=>{
          fetch(`http://localhost:5000/account/${email}`).then((response)=>response.json()).then((data)=>{
            setUserProfile(data);
          }).catch((error)=>{
            console.log("Error fetching user data",error);
          });
        };

        const fetchExamResults=(index)=>{
          fetch(`http://localhost:5000/results/${index}`).then((response)=>response.json()).then((data)=>{
            setExamResults(data);
            console.log(data)
          }).catch((error)=>{
            console.log('Error fetching Exam Results',error);
          });
        };
      return (
        <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#home">Siyathra Learning Management System</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                {/* Add your navigation links here */}
              </Nav>
              <Nav>
                <NavDropdown title={user.email} id="login-dropdown">
                <NavDropdown.Item href="">Profile</NavDropdown.Item>
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
              <Nav.Link eventKey="tab2"><FaChartBar/>Exam Results</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="tab3">Forum</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="tab4"><FaVoteYea/>Polls</Nav.Link>
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
            <p>{email}</p>

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
            {userProfile && (
                  <div>
                
                    <h4>Index No: {user.index}</h4>
                
                  </div>
                )}

            {examResults.length > 0 ? (
  <Table striped bordered hover  className="table table-sm">
    <thead>
      <tr>
        <th>Date of Exam</th>
        <th>Exam No</th>
        <th>Class</th>
        <th>Subject</th>
        <th>Marks</th>
        <th>Grade</th>
      </tr>
    </thead>
    <tbody>
      {examResults.map((result, index) => (
        <tr key={index}>
          <td>{result.Doe}</td>
          <td>{result.Examno}</td>
          <td>{result.batchYear} {result.classType}</td>
          <td>{result.subject}</td>
          <td style={{ color: 'White', fontWeight: 'bold', backgroundColor: 'green' }}>
            {result.marks}
          </td>
          <td>{result.grade}</td>
        </tr>
      ))}
    </tbody>
  </Table>
) : (
  <p>No exam results found.</p>
)}
            </Container>
            
              
            </Tab.Pane>
            <Tab.Pane eventKey="tab3" className='tab'>
              <h1>Open Forum</h1>
              <p>This is the content of Tab 3.</p>

              {userProfile && (
                  <div>
                
                    <p>Email: {user.index}</p>
                
                  </div>
                )}


            </Tab.Pane>
            <Tab.Pane eventKey="tab4" className='tab'>
              <h1>Polls</h1>
          
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      
        
        </div>
      );
    }

    export default Student;