import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Button, NavDropdown, Form, FormControl } from 'react-bootstrap';
import './Teacher.css';
import Footer from '../../components/Footer';
import { Tab } from 'react-bootstrap';
import { Row, Col, Table } from 'react-bootstrap';
import cart from '../../images/cart.jpg';
import { useParams } from 'react-router';
import { useUser } from '../../UserContext';
import { FaChartBar, FaFile, FaFileAlt, FaPoll, FaUser } from 'react-icons/fa';
import Results from '../../Admin/Results/Results';
import { Link } from 'react-router-dom';
import axios from 'axios';


export default function Teacher() {
  const { email } = useParams();
  const { user } = useUser();
  const [userProfile, setUserProfile] = useState(null);
  const [stdDetails, setStdDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [batchYearFilter, setBatchYearFilter] = useState('');
  const [classTypeFilter, setClassTypeFilter] = useState('');
  const [classtype, setClasstype] = useState("");
  const [batchyear, setBatchYear] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);


  const userEmail = user?.email;
  const userName = user?.name;

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

  const handleBatchYearFilterChange = (e) => {
    setBatchYearFilter(e.target.value);
  };

  const handleClassTypeFilterChange = (e) => {
    setClassTypeFilter(e.target.value);
  };

  const filteredStdDetails = stdDetails.filter((stdData) => {
    const fullName = stdData.name.toLowerCase();
    const index = stdData.index.toLowerCase();
    const searchValue = searchText.toLowerCase();
    const batchYear = stdData.batchyear.toLowerCase();
    const classType = stdData.classtype.toLowerCase();

    const isNameOrIndexMatch = fullName.includes(searchValue) || index.includes(searchValue);
    const isBatchYearMatch = batchYear.includes(batchYearFilter.toLowerCase());
    const isClassTypeMatch = classType.includes(classTypeFilter.toLowerCase());

    return isNameOrIndexMatch && isBatchYearMatch && isClassTypeMatch;
  });

  const handleUploadAndSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
  
      // Upload the file and save the fileId
      const uploadResponse = await axios.post('http://localhost:5000/lecturernotes/upload', formData);
      const fileId = uploadResponse.data.fileId;
      console.log('File uploaded successfully. File ID:', fileId);
  
      const dataToSave = {
        classtype,
        batchyear,
        fileId: fileId,
      };
  
      // Save the data
      await axios.post('http://localhost:5000/lecturernotes/add', dataToSave);
      console.log('Data saved successfully!');
    } catch (error) {
      console.log('Error uploading file or saving data:', error);
    }
  };
  

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">Siyathra Learning management system</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <NavDropdown title={userEmail} id="login-dropdown">
                <NavDropdown.Item as={Link} to="/profilepage">Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/login">Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Tab.Container defaultActiveKey="tab1">
        <Nav variant="tabs">
        <Nav.Item>
            <Nav.Link eventKey="tab1">
              <FaFileAlt/>Notes
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="tab2">
              <FaUser /> Student Details
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="tab3">
              <FaPoll /> Making polls
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="tab4">
              <FaChartBar /> Exam Results
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="tab5">Forum</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Pane eventKey="tab1" className="tab">
            <h1>file upload</h1>
            <Container>
            <Row>
            <Col sm={4}>
              <div className='form-group'>
                <label htmlFor="class" className='class'>Class Type</label>
                <select className="form-select form-control inputbox" aria-label="Default select example" onChange={(e) => setClasstype(e.target.value)}>
                  <option value="O/L">O/L</option>
                  <option value="A/L">A/L</option>
                </select>
              </div>
            </Col>
            <Col sm={4}>
              <div className='form-group'>
                <label htmlFor="batch" className='batch'>Batch Year</label>
                <select className="form-select form-control" aria-label="Default select example" onChange={(e) => setBatchYear(e.target.value)}>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                  <option value="2029">2029</option>
                  <option value="2030">2030</option>
                </select>
              </div>
            </Col>
            <Col sm={4}>
            <Form.Group controlId="formFileMultiple" className="mb-3">
                <Form.Label>Upload the Note</Form.Label>
                <Form.Control type="file" multiple onChange={handleUploadAndSubmit}/>
            </Form.Group>
            
            </Col>
            <Button type='submit' className='btn btn-success' onClick={handleUploadAndSubmit}>Upload</Button>
            </Row>
            </Container>
          </Tab.Pane>
        <Tab.Content>
          <Tab.Pane eventKey="tab2" className="tab">
            <h1>Student Details</h1>
            <Container>
              <div className="search-bar">
                <Form>
                  <Row>
                    <Col>
                    <FormControl
                    type="text"
                    placeholder="Search by Name or Index No"
                    value={searchText}
                    onChange={handleSearchChange}
                    className='search'
                  />
                    </Col>
                    <Col>
                    <FormControl
                    type="text"
                    placeholder="Filter by Batch Year"
                    value={batchYearFilter}
                    onChange={handleBatchYearFilterChange}
                    className='search'
                  />
                    </Col>
                    <Col>
                     
                  <FormControl
                    type="text"
                    placeholder="Filter by Class Type"
                    value={classTypeFilter}
                    onChange={handleClassTypeFilterChange}
                    className='search'
                  />
                    </Col>
                  </Row>
                  
                 
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
          <Tab.Pane eventKey="tab3" className="tab"></Tab.Pane>
          <Tab.Pane eventKey="tab4" className="tab">
            <h1>Exam Results</h1>
            <Container>
              <Results />
              <hr></hr>
            </Container>
          </Tab.Pane>
          <Tab.Pane eventKey="tab5" className="tab">
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
