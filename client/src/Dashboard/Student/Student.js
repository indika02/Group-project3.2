          import React, { useEffect } from 'react';
          import { Navbar, Nav, Container,Image,Button,NavDropdown } from 'react-bootstrap';
          import './Student.css';
          import { Tab } from 'react-bootstrap';
          import {Row,Col} from 'react-bootstrap';
          import { useState } from 'react';
          import { Table } from 'react-bootstrap';
          import { FaChartBar,FaVoteYea } from 'react-icons/fa';
          import { Link } from 'react-router-dom';
          import axios from 'axios';
          import { useSelector,useDispatch } from 'react-redux';
          import { setUserProfileData } from '../../features/actions';

          function Student() {
            const user = useSelector(state => state.auth.user);
            const userProfiledata = useSelector(state => state.userProfile.userProfiledata);
            console.log('userProfiledata:', userProfiledata);
    
            const dispatch = useDispatch();
              const [userProfile,setUserProfile]=useState(null);
              const [examResults, setExamResults] = useState([]);
              const [uploadedFiles, setUploadedFiles] = useState([]);


              
              
              useEffect(() => {
                if (user?.email && user?.index) {
                  fetchUserProfile(user.email);
                  fetchUserProfiledata(user.email);
                  fetchExamResults(user.index);
                  fetchUploadedFiles();
                }
              }, [user.email, user.index]);
              

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
                
                }).catch((error)=>{
                  console.log('Error fetching Exam Results',error);
                });
              };

              const fetchUserProfiledata = (email) => {
                fetch(`http://localhost:5000/user/userdetail/${email}`)
                  .then((response) => response.json())
                  .then((data) => {
                    // Assuming your action creator setUserProfileData is defined and imported correctly
                    dispatch(setUserProfileData(data));
                    console.log("User Profile Data:", data);
                  })
                  .catch((error) => {
                    console.log("Error fetching user data", error);
                  });
              };
              
              
       
              const handleDownloadQRCode = () => {
      
                const downloadLink = document.createElement('a');
                downloadLink.href = userProfiledata?.qrCode;
                downloadLink.download = `${user.index}_qr_code.png`;
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
              };
              const fetchUploadedFiles = async () => {
                try {
                  const response = await axios.get('http://localhost:5000/lecturernotes/uploadedfile');
                  const allUploadedFiles = response.data;
              
                  const matchingFiles = allUploadedFiles.filter((file) => {
                    const hasMatchingLname = [
                      userProfiledata?.Lname1,
                      userProfiledata?.Lname2,
                      userProfiledata?.Lname3,
                      userProfiledata?.Lname4,
                    ].includes(file.Lname);
              
                    const hasMatchingClassType = userProfiledata?.classtype === file.classtype;
                    const hasMatchingBatchYear = userProfiledata?.batchyear === file.batchyear;
              
                    return hasMatchingLname && hasMatchingClassType && hasMatchingBatchYear;
                  });
              
                  setUploadedFiles(matchingFiles);
                  console.log(matchingFiles);
                } catch (error) {
                  console.error('Error fetching uploaded files:', error);
                }
              };
              
            return (
              <div>
              <Row>
              <Col>
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
             
              <Row>
                <Col md={9}>
                
                
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

                      {userProfiledata && (
                        <>{userProfiledata && userProfiledata.subject1 && (
                          <div className='subjects'>
                            <p>{userProfiledata?.subject1}- {userProfiledata?.Lname1}</p>
                            <h5>Notes</h5>
                            <div className='uploaded-files'>
    {uploadedFiles.map((file) => {
      console.log('Checking:', file.originalFileName, userProfiledata);
      const fileLname = file.Lname;
      if (userProfiledata.Lname1=== fileLname) {
        console.log('Match found:', file.originalFileName);
        return (
          <div key={file.originalFileName}>
            <a
              href={`http://localhost:5000/lecturernotes/download/${file.originalFileName}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {file.originalFileName}
            </a>
            <hr />
          </div>
        );
      }
      return null;
    })}
  </div>

                          </div>
                        )}
                        {userProfiledata && userProfiledata.subject2 && (
                          <div className='subjects'>
                            <p>{userProfiledata?.subject2} {userProfiledata?.Lname2}</p>
                            <h5>Notes</h5>
                            <div className='uploaded-files'>
    {uploadedFiles.map((file) => {
      console.log('Checking:', file.originalFileName, userProfiledata);
      const fileLname = file.Lname;
      if (userProfiledata.Lname2=== fileLname) {
        console.log('Match found:', file.originalFileName);
        return (
          <div key={file.originalFileName}>
            <a
              href={`http://localhost:5000/lecturernotes/download/${file.originalFileName}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {file.originalFileName}
            </a>
          
          </div>
        );
      }
      return null;
    })}
  </div>
                          </div>
                        )}
                        {userProfiledata && userProfiledata.subject3 && (
                          <div className='subjects'>
                            <p>{userProfiledata?.subject3} {userProfiledata?.Lname3}</p>
                            <h5>Notes</h5>
                            <div className='uploaded-files'>
    {uploadedFiles.map((file) => {
      console.log('Checking:', file.originalFileName, userProfiledata);
      const fileLname = file.Lname;
      if (userProfiledata.Lname3=== fileLname) {
        console.log('Match found:', file.originalFileName);
        return (
          <div key={file.originalFileName}>
            <a
              href={`http://localhost:5000/lecturernotes/download/${file.originalFileName}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {file.originalFileName}
            </a>
            
          </div>
        );
      }
      return null;
    })}
  </div>
                          </div>
                        )}
                        {userProfiledata && userProfiledata.subject4 && (
                          <div className='subjects'>
                            <p>{userProfiledata?.subject4} {userProfiledata?.Lname4}</p>
                            <h5>Notes</h5>
                            <div className='uploaded-files'>
    {uploadedFiles.map((file) => {
      console.log('Checking:', file.originalFileName, userProfiledata);
      const fileLname = file.Lname;
      if (userProfiledata.Lname4=== fileLname) {
        console.log('Match found:', file.originalFileName);
        return (
          <div key={file.originalFileName}>
            <a
              href={`http://localhost:5000/lecturernotes/download/${file.originalFileName}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {file.originalFileName}
            </a>
            <hr />
          </div>
        );
      }
      return null;
    })}
  </div>
                          </div>
                        )}
                        

                          </>
                      
                      )

                      }
                      </Container>
                    <Container>
                    <Row>
                
                    <Col className='col-md-3'>
        
                    </Col>
                    <Col className='col-md-3'>
                    
                    </Col>
                    </Row>
                    </Container>
                  </Tab.Pane>
                  <Tab.Pane eventKey="tab2" className='tab'>
                    <h1>Exam Results</h1>
                  <Container>
                  {userProfile && (
                        <div>
                      
                          <h5>Index No: {user.index}</h5>
                      
                        </div>
                      )}

                  {examResults.length > 0 ? (
        <Table striped bordered hover  className="table table-sm resultstable">
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
          {examResults
            .slice() // Create a copy of the examResults array before sorting
            .sort((a, b) => new Date(b.Doe) - new Date(a.Doe)) // Sort by date in descending order
            .map((result, index) => (
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


                  </Tab.Pane>
                  <Tab.Pane eventKey="tab4" className='tab'>
                    <h1>Polls</h1>
                
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
                  </Col>
                  <Col className='qrcol' md={3}>
                    <div className='qrcode'>
                  <Image src={userProfiledata?.qrCode} fluid style={{ width: '300px', height: '300px' }} className='qrimg' />
                  <Button variant="primary" className="btnqrcode"onClick={handleDownloadQRCode}>
                Download
              </Button>
              </div>
                  </Col>
    </Row>
            
      
              </div>
            );
          }

          export default Student;