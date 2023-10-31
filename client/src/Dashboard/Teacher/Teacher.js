import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Button, NavDropdown, Form, FormControl } from 'react-bootstrap';
import './Teacher.css';
import { Tab } from 'react-bootstrap';
import { Row, Col, Table } from 'react-bootstrap';
import { useParams } from 'react-router';
import { useUser } from '../../UserContext';
import { FaChartBar,FaCut,FaEvernote,FaFile,FaFileAlt, FaFileDownload, FaKey, FaPenAlt, FaPoll, FaRecycle, FaRemoveFormat, FaSignOutAlt, FaTrashAlt, FaUpload, FaUser } from 'react-icons/fa';
import Results from '../../Admin/Results/Results';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import swal from 'sweetalert';
import Resultfilter from '../../Admin/Results/Resultsfilter';
import AttendanceTeacher from '../../Admin/attendance/attedanceteacher';
import PollMaker from '../../Admin/Polling/PollingSystem';
import Annousements from '../../Admin/Annousements/annousements';

export default function Teacher() {
  const user = useSelector(state => state.auth.user);
  const [userProfile, setUserProfile] = useState(null);
  const [stdDetails, setStdDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [classtype, setClasstype] = useState("");
  const [batchyear, setBatchYear] = useState(""); 
  const [selectedClassType, setSelectedClassType] = useState('');
  const [selectedBatchYear, setSelectedBatchYear] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedEnrollmentNo, setSelectedEnrollmentNo] = useState('');
 
  
  
  



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
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark" fixed='top'>
        <Container>
          <Navbar.Brand href="#home">Siyathra Learning management system</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <NavDropdown title={user.email} id="login-dropdown">
              <NavDropdown.Item as={Link} to="/otherprofile"><FaUser/> Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/pwdreset"><FaKey/> Change Password</NavDropdown.Item>
              <NavDropdown.Divider/>
              <NavDropdown.Item as={Link} to="/login"><FaSignOutAlt/> Logout</NavDropdown.Item>
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
        <Nav.Item>
          <Nav.Link eventKey="tab5">
            <FaFile /> Annoucements
          </Nav.Link>
        </Nav.Item>
        </Nav>
        <Tab.Content>
        <Tab.Pane eventKey="tab1" className="tab">
        <Container>
            <h4>Lecture Notes</h4>
           
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

            <Container>
            <h4>Student details</h4>
              <Row className="attendance">
              <Col sm={3}>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Enrollment No."
          value={selectedEnrollmentNo}
          onChange={(e) => setSelectedEnrollmentNo(e.target.value)}
        />
      </Col>
              <Col sm={3}>
        <select
          className="form-select form-control" value={selectedClassType}
          onChange={(e) => {
            setSelectedClassType(e.target.value);
          }}
        >
          <option value="">All Class Types</option>
          <option value="grade06">Grade 06</option>
          <option value="grade07">Grade 07</option>
          <option value="grade08">Grade 08</option>
          <option value="grade09">Grade 09</option>
          <option value="grade10">Grade 10</option>
          <option value="grade11">Grade 11</option>
          <option value="A/L">A/L</option>
         
        </select>
        </Col>
        <Col sm={3}>
        <select
          className="form-select form-control" value={selectedBatchYear}
          onChange={(e) => {
            setSelectedBatchYear(e.target.value);
          }}
        >
          <option value="">All Batch Years</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
          <option value="2026">2026</option>
          <option value="2027">2027</option>
          <option value="2028">2028</option>
          <option value="2029">2029</option>
        </select>
        </Col>
              </Row>
               

            
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
                      {stdDetails.filter(stdData=>
                        (selectedEnrollmentNo === '' || stdData.index === selectedEnrollmentNo) &&
                      (selectedClassType === '' || stdData.classtype === selectedClassType) &&
                      (selectedBatchYear === '' || stdData.batchyear === selectedBatchYear) ).map((stdData) => (
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
            
            <Row>
            <h4>Attendance Details</h4>
            <AttendanceTeacher/>
            </Row>
            </Container>
          </Tab.Pane>
          </Tab.Content>
          <Tab.Content>
          <Tab.Pane eventKey="tab3" className="tab">
            
            <Container>
            <h4>Exam Results</h4>
              <Results />
              <hr></hr>
              <h4>Overall Results</h4>
              <Resultfilter/>
             
            </Container>
            
          </Tab.Pane>
        </Tab.Content>
        <Tab.Content>
        <Tab.Pane eventKey="tab4" className="tab">
        <Container>
        <h4>Poll making</h4>

      <PollMaker/>
        </Container>
       
        </Tab.Pane></Tab.Content>
        <Tab.Content>
        <Tab.Pane eventKey="tab5" className="tab">
        <Container>
        <h4>Annoucements</h4>
<Annousements/>
    
        </Container>
       
        </Tab.Pane></Tab.Content>
      </Tab.Container>
      
    </div>
  );
}