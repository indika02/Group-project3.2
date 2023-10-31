import React, { useState, useRef, useEffect } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';
import './Scanner.css'; // Import custom CSS for styling
import swal from 'sweetalert'; // Import SweetAlert library
import { Col, Row } from 'react-bootstrap';
import { Navbar, Nav, Container, Button, NavDropdown, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { FaKey, FaSignOutAlt, FaUser } from 'react-icons/fa';

const QRCodeScanner = () => {
  const user = useSelector(state => state.auth.user);
  const [result, setResult] = useState('');
  const [studentIndex, setStudentIndex] = useState('');
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');
  const [stdbatchYear, setstdbatchYear] = useState('');
  const [selectedlecturerName, setSelectedLecturerName] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedClassType, setSelectedClassType] = useState('');
  const [selectedBatchYear, setSelectedBatchYear] = useState('');
  const [selectedclassTime, setSelectedclassTime] = useState('');
  const codeReaderRef = useRef(null);
  const [Allsubjects, setAllsubjects] = useState([]);
  const [AllLecturers, setAllLecturers] = useState([]);

  useEffect(() => {
    if (studentIndex) {
      fetchUserProfiledata(studentIndex);
    }
  }, [studentIndex]);

  const handleScan = (result) => {
    if (result) {
      setResult(result.text);
      parseQRCodeText(result.text);
    }
  };

  const parseQRCodeText = (qrCodeText) => {
    const parsedValues = qrCodeText.split(';');
    if (parsedValues.length >= 2) {
      setStudentIndex(parsedValues[0]);
      setName(parsedValues[1]);
      setGrade(parsedValues[2]);
      setstdbatchYear(parsedValues[3]);
    }
  };

  const handleError = (error) => {
    console.error(error);
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

  const fetchUserProfiledata = (index) => {
    fetch(`http://localhost:5000/user/userdetails/${index}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("User Profile Data:", data);

        if (data.classtype === selectedClassType && data.batchyear === selectedBatchYear &&
          (data.Lname1 === selectedlecturerName || data.Lname2 === selectedlecturerName ||
            data.Lname3 === selectedlecturerName || data.Lname4 === selectedlecturerName) &&
          (data.subject1 === selectedSubject || data.subject2 === selectedSubject ||
            data.subject3 === selectedSubject || data.subject4 === selectedSubject)) {

          const attendanceData = {
            date: new Date(),
            time: selectedclassTime,
            classType: selectedClassType,
            batchYear: selectedBatchYear,
            lecturerName: selectedlecturerName,
            subject: selectedSubject,
            index: data.index,
            name: data.name,
          };
          axios.post('http://localhost:5000/attendance/add', attendanceData)
            .then(response => {
              console.log("Attendance data stored:", response.data);
              swal("Success", "Attendance data stored successfully!", "success");
            })
            .catch(error => {
              console.log("Error storing attendance data", error);
              swal("Error", "An Error Occurred!", "error");
            });
        } else {
          console.log("User profile data does not match selected values");
          swal("Error", "You have not registered for this!", "error");
        }
      })
      .catch((error) => {
        console.log("Error fetching user data", error);
      });
  };

  const manuallyTriggerScan = () => {
    const videoElement = document.getElementById('videoElement');
    if (videoElement) {
      codeReaderRef.current.decodeFromVideoDevice(undefined, 'videoElement', handleScan);
    }
  };

  return (
    <div>
      <Row>
        <Col>
          <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark" className='nav' fixed='top'>
            <Container>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                </Nav>
                <Nav>
                  <NavDropdown title={user.email} id="login-dropdown">
                    <NavDropdown.Item as={Link} to="/otherprofile"><FaUser /> Profile</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Link} to="/pwdreset"><FaKey /> Change Password</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Link} to="/login"><FaSignOutAlt /> Logout</NavDropdown.Item>
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
              <select className="form-select form-control inputbox" aria-label="Default select example" onChange={(e) => {
                setSelectedClassType(e.target.value);
              }}>
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
              <select className="form-select form-control" aria-label="Default select example" onChange={(e) => {
                setSelectedBatchYear(e.target.value);
              }}>
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
              <label htmlFor="Lname">Lecturer Name</label>
              <select id="country" className="form-select form-control" onChange={(e) => {
                setSelectedLecturerName(e.target.value);
              }} >
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
              <select id="country" className="form-select form-control" onChange={(e) => {
                setSelectedSubject(e.target.value);
              }}>
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
            <p>Index: {studentIndex}</p>
            <p>Name: {name}</p>
            <p>Grade: {grade}</p>
            <p>Batch Year: {stdbatchYear}</p>
          </div>
          <div className='text-center'>
          <Button
            variant="primary"
            onClick={manuallyTriggerScan}
          >
           start
          </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default QRCodeScanner;
