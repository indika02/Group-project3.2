import React, { useState, useRef, useEffect } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';
import './Scanner.css'; // Import custom CSS for styling
import swal from 'sweetalert'; // Import SweetAlert library
import { Col, Row } from 'react-bootstrap';
import { Navbar, Nav, Container,Image,Button,NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
 import { useSelector,useDispatch } from 'react-redux';
 import { setUserProfileData } from '../../features/actions';
 

const QRCodeScanner = () => {
  const user = useSelector(state => state.auth.user);
  const [result, setResult] = useState('');
  const [index, setIndex] = useState('');
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');
  const [batchYear, setbatchYear] = useState('');
  const [lecturerName, setLecturerName] = useState("");
  const [subject, setSubject] = useState("");
  const codeReaderRef = useRef(null);
  const [Allsubjects, setAllsubjects] = useState([]);
    const [AllLecturers, setAllLecturers] = useState([]);
  const userName = user.name;

  const handleScan = (result) => {
    if (result) {
      setResult(result.text);
      parseQRCodeText(result.text); 
      showQRCodeDetectedAlert(result.text);
    }
  };

  const parseQRCodeText = (qrCodeText) => {
    const parsedValues = qrCodeText.split(';'); // Assuming values are separated by a semicolon
    if (parsedValues.length >= 2) {
      setIndex(parsedValues[0]);
      setName(parsedValues[1]);
      setGrade(parsedValues[2]);
      setbatchYear(parsedValues[3]);
    }
  };

  const handleError = (error) => {
    console.error(error);
  };

  const showQRCodeDetectedAlert = (qrCodeText) => {
    swal('QR Code Detected', 'success');
  };

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    codeReaderRef.current = codeReader;

    const videoElement = document.getElementById('videoElement');
    if (videoElement) {
      codeReader.decodeFromVideoElement(videoElement, handleScan, handleError);
      codeReader.decodeOnceFromVideoDevice(undefined, 'videoElement')
        .then(handleScan)
        .catch(handleError);
    }

    return () => {
      if (codeReaderRef.current) {
        codeReaderRef.current.reset();
      }
    };
  }, []);
  useEffect(() => {
    axios.get('http://localhost:5000/subject/').then((response) => {
      setAllsubjects(response.data);
      setAllLecturers(response.data);
    }).catch((error) => {
      console.log('Error fetching data.', error);
    });
  }, []);
  return (
    <div>
      <Row>
        <Col>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className='nav'>
        <Container>
          
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
            
            </Nav>
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
        </Col>
      </Row>

    <div className='select'>
    <Row>
    <Col sm={3}>
    <div className='form-group'>
                <label htmlFor="class" className='class'>Class Type</label>
                <select className="form-select form-control inputbox" aria-label="Default select example">
                <option selected>Class type</option>
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
    <select className="form-select form-control" aria-label="Default select example">
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
    <div className='form-group'>
                <label htmlFor="Lname">Lectuer Name</label>
                <select id="country" className="form-select form-control" onChange={(e) => setLecturerName(e.target.value)}>
                  <option value="">Select the Lecturer</option>
                  {AllLecturers.map((item) => (
                    <option key={item._id} value={item.Lname}>{item.Lname}</option>
                  ))}
                </select>
              </div>
    </Col>
    <Col sm={3}>
    <div className='form-group'>
    <label htmlFor="Lname">Select the Subject</label>
    <select id="country" className="form-select form-control" onChange={(e) => setSubject(e.target.value)}>
      <option value="">Select the Subject</option>
      {Allsubjects.map((item) => (
        <option key={item._id} value={item.subject}>{item.subject}</option>
      ))}
    </select>
  </div>
    </Col>
    </Row>
    </div>
    <Row className='justify-content-center'>
    <Col sm={12} md={8}>
      <div className="scanner-container">
       
        <video id="videoElement" className="video-element" autoPlay></video>
        <p>{result}</p>
        <p>Index: {index}</p>
        <p>Name: {name}</p>
        <p>Grade: {grade}</p>
        <p>batchYear: {batchYear}</p>
      </div>
      </Col>
      </Row>
</div>

  );
};

export default QRCodeScanner;
