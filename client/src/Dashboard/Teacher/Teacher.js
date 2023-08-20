import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Button, NavDropdown, Form, FormControl } from 'react-bootstrap';
import './Teacher.css';
import { Tab } from 'react-bootstrap';
import { Row, Col, Table } from 'react-bootstrap';
import { useParams } from 'react-router';
import { useUser } from '../../UserContext';
import { FaChartBar,FaCut,FaFileAlt, FaFileDownload, FaPenAlt, FaPoll, FaRecycle, FaRemoveFormat, FaTrashAlt, FaUpload, FaUser } from 'react-icons/fa';
import Results from '../../Admin/Results/Results';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import swal from 'sweetalert';

export default function Teacher() {
  const user = useSelector(state => state.auth.user);
  const [userProfile, setUserProfile] = useState(null);
  const [stdDetails, setStdDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [batchYearFilter, setBatchYearFilter] = useState('');
  const [classTypeFilter, setClassTypeFilter] = useState('');
  const [classtype, setClasstype] = useState("");
  const [batchyear, setBatchYear] = useState("");
  const[originalFileName,setoriginalFileName]=useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

 
  
  
  



  const userName = user.name;

  useEffect(() => {
    fetchUserProfile(user.email);
    fetchUploadedFiles(user.email);
    if (user?.name) {
      fetchStdDetails(user.name);
    }
  }, [user.email, user.name]);

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

  const handleFileUpload = async (e) => {
    try {
      const file = e.target.files[0];
      setUploadedFile(file);
    } catch (error) {
      console.log('Error uploading file:', error);
    }
  };
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (!uploadedFile) {
      console.log('No file selected.');
      return;
    }

    const formData = new FormData();
    formData.append('file', uploadedFile);
    formData.append('classtype', classtype);
    formData.append('batchyear', batchyear);

    const uploadResponse = await axios.post('http://localhost:5000/lecturernotes/upload', formData);
    console.log('File uploaded successfully. Response:', uploadResponse.data);
    swal("Success", "Uploading Successful!", "success");

    const dataToSave = {
      originalFileName: uploadedFile.name,
      classtype,
      batchyear,
      Lname: userName,
    };

    await axios.post('http://localhost:5000/lecturernotes/add', dataToSave);
    console.log('Data saved successfully!', dataToSave);

    

    setUploadedFiles(prevUploadedFiles => [...prevUploadedFiles, uploadResponse.data]);

    setUploadedFile(null);
    setClasstype('');
    setBatchYear('');
  } catch (error) {
    console.log('Error uploading file or saving data:', error);
    swal("Error", "An Error Occured!", "error");
  }
};

const fetchUploadedFiles = () => {
  axios.get(`http://localhost:5000/lecturernotes/uploadedfiles/${user.name}`)
    .then(response => {
      setUploadedFiles(response.data);

      console.log(user.name);
      console.log(response.data)
    })
    .catch(error => {
      console.error('Error fetching uploaded files:', error);
    });
};
const handleCheckboxChange = (fileId) => {
  if (selectedFiles.includes(fileId)) {
    setSelectedFiles(selectedFiles.filter((id) => id !== fileId));
    console.log(`Deselected file ID: ${fileId}`);
  } else {
    setSelectedFiles([...selectedFiles, fileId]);
    console.log(`Selected file ID: ${fileId}`);
  }
};



const handleDeleteSelectedFiles = async () => {
  try {
    if (selectedFiles.length === 0) {
      console.log('No files selected for deletion.');
      return;
    }

    await Promise.all(selectedFiles.map(async (_id) => {
      await axios.delete(`http://localhost:5000/lecturernotes/delete/${_id}`);
    }));

    setUploadedFiles((prevUploadedFiles) =>
      prevUploadedFiles.filter((file) => !selectedFiles.includes(file._id))
    );

    setSelectedFiles([]);
  } catch (error) {
    console.log('Error deleting files:', error);
    swal('Error', 'An Error Occurred while deleting files!', 'error');
  }
};



  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed='top'>
        <Container>
          <Navbar.Brand href="#home">Siyathra Learning management system</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <NavDropdown title={user.email} id="login-dropdown">
                <NavDropdown.Item as={Link} to="/profilepage">Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/login">Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Tab.Container defaultActiveKey="tab1">
        <Nav variant="tabs" className='tabadmin'>
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
              <FaChartBar /> Exam Results
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
          <Nav.Link eventKey="tab4">
            <FaPoll /> Making polls
          </Nav.Link>
        </Nav.Item>
        </Nav>
        <Tab.Content>
        <Tab.Pane eventKey="tab1" className="tab">
            <h1 className='topiclec'>Lecture Notes</h1>
            <Container>
            <Row className='uploadsec'>
            <Col sm={3}>
              <div className='form-group'>
                <label htmlFor="class" className='class'>Class Type</label>
                <select className="form-select form-control  uploadfile" aria-label="Default select example" onChange={(e) => setClasstype(e.target.value)}>
                        <option value="grade06">Grade 06</option>
                        <option value="grade07">Grade 07</option>
                        <option value="grade08">Grade 08</option>
                        <option value="grade09">Grade 09</option>
                        <option value="grade10">Grade 10</option>
                        <option value="grade11">Grade 11</option>
                        <option value="A/L">A/L</option>
                </select>
              </div>
            </Col>
            <Col sm={3}>
              <div className='form-group'>
                <label htmlFor="batch" className='batch'>Batch Year</label>
                <select className="form-select form-control uploadfile" aria-label="Default select example" onChange={(e) => setBatchYear(e.target.value)}>
                <option value="">None</option>
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
            <Col sm={3}>
            <Form.Group controlId="formFileMultiple" className="mb-3">
                <Form.Label>Files:</Form.Label>
                <Form.Control type="file" multiple onChange={handleFileUpload} />
            </Form.Group>
            
            </Col>
            <Col sm={3}>
            <Button type='submit' className='btn btn-success upload' onClick={handleSubmit}><FaUpload/> upload</Button> <Button
            className="btn btn-danger deletefiles"
            onClick={handleDeleteSelectedFiles}
            
          >
            <FaTrashAlt/> Delete
          </Button>
          
            </Col>
            </Row>
            <Row>
            <div className='uploaded-files'>
  {Object.entries(
    uploadedFiles.reduce((groups, file) => {
      const key = `${file.classtype}-${file.batchyear}`;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(file);
      return groups;
    }, {})
  ).map(([groupKey, group]) => (
    <div key={groupKey}>
      <h5 className='uploadtitle'>{group[0].batchyear} {group[0].classtype}</h5>
      {group.map((lecturernotes) => (
        <div key={lecturernotes._id}>
          <a
            className='lecnote'
            href={`http://localhost:5000/lecturernotes/download/${lecturernotes.originalFileName}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className='notelink'>
              <FaPenAlt /> {lecturernotes.originalFileName}  </p><Form.Check
                type="checkbox"
                value={lecturernotes._id}
                onChange={() => handleCheckboxChange(lecturernotes._id)} 
                checked={selectedFiles.includes(lecturernotes._id)} 
                className='deletecheck'
                
              />
           
          </a>
        </div>
      ))}
    </div>
  ))}
</div>

            </Row>
      
    
            </Container>
          </Tab.Pane>
          </Tab.Content>
        <Tab.Content>
          <Tab.Pane eventKey="tab2" className="tab">
<h1 className='topiclec'>Student details</h1>
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
                
            <div>
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
                </div>
            </div>
            </Container>
          </Tab.Pane>
          </Tab.Content>
         
          <Tab.Content>
          <Tab.Pane eventKey="tab3" className="tab">
            <h1 className='topiclec'>Exam Results</h1>
            <Container>
              <Results />
              <hr></hr>
            </Container>
          </Tab.Pane>
        </Tab.Content>
        <Tab.Content>
        <Tab.Pane eventKey="tab4" className="tab"></Tab.Pane></Tab.Content>
      </Tab.Container>
      
    </div>
  );
}