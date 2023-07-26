import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Button, NavDropdown,Form,FormControl } from 'react-bootstrap';
import './Teacher.css';
import Footer from '../../components/Footer';
import { Tab } from 'react-bootstrap';
import { Row, Col, Table } from 'react-bootstrap';
import cart from '../../images/cart.jpg';
import { useParams } from 'react-router';
import { useUser } from '../../UserContext';
import { FaChartBar, FaPoll, FaUser } from 'react-icons/fa';
import Results from '../../Admin/Results/Results';

export default function Teacher() {
  const { email } = useParams();
  const { user } = useUser();
  const [userProfile, setUserProfile] = useState(null);
  const [stdDetails, setStdDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  const userEmail = user?.email;
  const userName = user?.name;

  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchUserProfile(email);
    if (user?.name) {
    fetchStdDetails(user.name);
    }
  }, [email, user.name]);



  
  const fetchUserProfile = (email) => {
    fetch(`http://localhost:5000/account/${email}`)
      .then((response) => response.json())
      .then((data) => {
        setUserProfile(data);
      })
      .catch((error) => {
        console.log('Error fetching user data', error);
      });
  };

  const fetchStdDetails = (name) => {
    fetch(`http://localhost:5000/user/${name}`)
      .then((response) => response.json())
      .then((data) => {
        setStdDetails(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log('Error fetching Exam Results', error);
        setLoading(false);
      });
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const filteredStdDetails = stdDetails.filter((stdData) => {
    const fullName = stdData.name.toLowerCase();
    const index = stdData.index.toLowerCase();
    const searchValue = searchText.toLowerCase();
    return fullName.includes(searchValue) || index.includes(searchValue);
  });

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">Siyathra LMS</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <NavDropdown title={userEmail} id="login-dropdown">
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
            <Nav.Link eventKey="tab1">
              <FaUser /> Student Details
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="tab2">
              <FaPoll /> Making polls
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="tab3">
              <FaChartBar /> Exam Results
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="tab4">Forum</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="tab1" className="tab">
            <h1>Student Details</h1>
            <Container>
            <div className="search-bar">
        <Form>
          <FormControl
            type="text"
            placeholder="Search by Name or Index No"
            value={searchText}
            onChange={handleSearchChange}
          className='search'
          />
        </Form>
      </div>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <>
                <Table striped bordered hover className="table table-sm">
                  <thead>
                    <tr>
                      <th>Index</th>
                      <th>Name</th>
                      <th>Gender</th>
                      <th>Contact Personal</th>
                      <th>Email</th>
                      <th>Class Type</th>
                      <th>Batch Year</th>
                    </tr>
                  </thead>
                  <tbody>
            {filteredStdDetails.map((stdData) => (
              <tr key={stdData.index}>
                <td>{stdData.index}</td>
                <td>{stdData.name}</td>
                <td>{stdData.gender}</td>
                <td>{stdData.contactpersonal}</td>
                <td>{stdData.email}</td>
                <td>{stdData.classtype}</td>
                <td>{stdData.batchyear}</td>
              </tr>
            ))}
          </tbody>
                </Table>
              </>
            )}
            </Container>
          </Tab.Pane>
          <Tab.Pane eventKey="tab2" className="tab"></Tab.Pane>
          <Tab.Pane eventKey="tab3" className="tab">
            <h1>Exam Results</h1>
            <Container>
            <Results />
            <hr></hr>
            </Container>
            
          </Tab.Pane>
          <Tab.Pane eventKey="tab4" className="tab">
            {userProfile && (
              <div>
                <p>Email: {userName}</p>
              </div>
            )}
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
}
