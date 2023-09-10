  import React from "react";
  import { Container,Navbar,Nav,Row,Col,Form,Image,Button ,NavDropdown} from "react-bootstrap";
  import './profilepage.css';
  import { useState,useEffect } from "react";
  import swal from "sweetalert";
  import { useSelector,useDispatch } from 'react-redux';
  import { setUserProfileData } from '../../../features/actions';
import { FaDownload, FaUser,FaKey,FaSignOutAlt } from "react-icons/fa";
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";



  export default function Profilepage(){
    const user = useSelector(state => state.auth.user);
  
    const dispatch = useDispatch();
    const [userProfile,setUserProfile]=useState(null);
    const [Userprofile,setUserprofile]=useState(null);
    const [updatedProfile, setUpdatedProfile] = useState(null);
    const [profilePicture, setProfilePicture] = useState(null);


    
    useEffect(() => {
      fetchUserProfile(user.email);
      fetchUser(user.email);
    }, [user.email, user?.index]);
    

    const fetchUserProfile = (email)=>{
      fetch(`http://localhost:5000/account/userdetail/${email}`).then((response)=>response.json()).then((data)=>{
        setUserProfile(data);
        
      }).catch((error)=>{
        console.log("Error fetching user data",error);
      });
    };

    const fetchUser = (email)=>{
      fetch(`http://localhost:5000/user/userdetail/${email}`).then((response)=>response.json()).then((data)=>{
        setUserprofile(data);
        console.log(data)
      }).catch((error)=>{
        console.log("Error fetching user data",error);
      });
    };
    const handleFormSubmit = (e) => {
      e.preventDefault();
    
      Swal.fire({
        title: 'Confirm Update',
        text: 'Are you sure you want to update your profile?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.isConfirmed) {
          fetch(`http://localhost:5000/account/update/${user.email}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userProfile),
          })
            .then((response) => response.json())
            .then((data) => {
              setUserProfile(data.Account);
              Swal.fire('Success', 'Profile Updating is Successfully completed', 'success');
              console.log(data.Account);
            })
            .catch((error) => {
              console.log('Error updating user profile', error);
              Swal.fire('Error', 'An error occurred!', 'error');
            });
        }
      });
    };

    const handleDownloadQRCode = () => {
      const downloadLink = document.createElement('a');
      downloadLink.href = Userprofile?.qrCode;
      downloadLink.download = `${user.index}_qr_code.png`;
      downloadLink.style.display = 'none';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    };

    const handlePictureChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setProfilePicture(reader.result);
        
        };
        reader.readAsDataURL(file);
      }
    };

 
    return(
      <>
      <Row>
      <Col>
       <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed='top'>
        <Container>
          <Navbar.Brand as={Link} to="/student">Siyathra Learning Management System</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
            </Nav>
            <Nav>
             <NavDropdown title={user.email} id="login-dropdown">
              <NavDropdown.Item as={Link} to="/profilepage"><FaUser/> Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/pwdreset"><FaKey/> Change Password</NavDropdown.Item>
              <NavDropdown.Divider/>
              <NavDropdown.Item as={Link} to="/login"><FaSignOutAlt/> Logout</NavDropdown.Item>
            </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      </Col>
      </Row>
    <div class="container-fluid">
          <div class="row">
            <div class="col">
              
            </div>
          </div>
        </div>
        
        <Row>
          
        <form className="form" onSubmit={handleFormSubmit}>
        <h4 className="profileh">Personal Details</h4>
        <Row>
        <Col>
        <div className='form-group'>
                  <label for="index">Student's Enrollement No</label>
                  <input type='text' className='form-control' id='index' value={userProfile?.index}readOnly
                
                  />
              </div>
        </Col>
        <Col>
        <div className='form-group'>
                  <label for="name">Student's Full Name</label>
                  <input type='text' className='form-control' id='name' value={userProfile?.name}  onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                
                  />
        </div>
        </Col>
        </Row>
        
          
              
              <Row>
                  <Col>
                  <div className='form-group'>
                  <label for="dob">Date of Birth</label>
                  <input type='date' className='form-control' id='dob'  value={userProfile?.dob} onChange={(e) => setUserProfile({ ...userProfile, dob: e.target.value })}
                  
                  />
              </div>
                  </Col>
                  <Col>
                  <div className='form-group'>
                      <label for="age" className='age'>Age</label>
                      <input type='text' className='form-control' id='age'  value={userProfile?.age} onChange={(e) => setUserProfile({ ...userProfile, age: e.target.value })}/>
                  </div>
              
                  </Col>
                  <Col>
                  <div className='form-group'>
                <label htmlFor="class" className='class'>Gender</label>
                <select className="form-select form-control inputbox" aria-label="Default select example"  value={userProfile?.gender} onChange={(e) => setUserProfile({ ...userProfile, gender: e.target.value })}>
                
                        <option value="">select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        
                        
                </select>
              </div>
                  </Col>
              </Row>
              
          

                  <Row>
                      <Col>
                      <div className='form-group'>
                  <label for="Contactno">Contact No(Personal)</label>
                  <input type='text' className='form-control' id='contact' value={userProfile?.contactpersonal} onChange={(e) => setUserProfile({ ...userProfile, contactpersonal: e.target.value })}
                
                  />
              </div>
                      </Col>
                      <Col>
                      <div className='form-group'>
                  <label for="Contactno">Contact No(Home)</label>
                  <input type='text' className='form-control' id='contacthome' value={userProfile?.contacthome} onChange={(e) => setUserProfile({ ...userProfile, contacthome: e.target.value })}
                
                  />
              </div>
                      </Col>
                  </Row>
                  <Row>
                      <Col>
                      <div className='form-group'>
                  <label for="address">Address</label>
                  <input type='text' className='form-control' id='address' value={userProfile?.address} onChange={(e) => setUserProfile({ ...userProfile, address: e.target.value })}
                  
                  />
              </div>
                      </Col>
                  </Row>
                  <Row>
                      <Col>
                      <div className='form-group'>
                  <label for="email">Email Address</label>
                  <input type='email' className='form-control' id='email' value={userProfile?.email} readOnly
                
                  />
              </div>
                      </Col>
                  </Row>
                  <Row>
                  <Col sm={8}>
                 
                  </Col>
                 
                  
                  <h4 className="profileh">Qr code</h4>

        <Col>
        
        
                    <div className='qrcode'>
                  <Image src={Userprofile?.qrCode} fluid style={{ width: '300px', height: '300px' }} className='qrimg' />
                  <Button variant="primary" className="btnqrcode"onClick={handleDownloadQRCode}>
                <FaDownload/>
              </Button>
              </div>
                
        </Col>
        </Row>
                  <h4 className="profileh">Educational Details</h4>
                  <Row>
                  <Col>
                  <div className='form-group'>
                      <label for="type" className='type'>Qualifications</label>
                      <input type='textarea' className='form-control' id='Classtype' value={userProfile?.qualifications} onChange={(e) => setUserProfile({ ...userProfile, qualifications: e.target.value })}
                
                  />
              </div>
                  </Col>
                  
              </Row>
              <Row>
              <Col className="profilesub">
              <div className='form-group'>
              <label for="type" className='type'>Batch Year</label>

              <p>{Userprofile?.batchyear}</p>

      </div>
      </Col>
      <Col className="profilesub">
              <div className='form-group'>
              <label for="type" className='type'>Class</label>

              <p>{Userprofile?.classtype}</p>
              
      </div>
      </Col>
              </Row>
                      <div className='form-group'>
                  <label for="subjects">Subjects</label>
                  <Row>
                  <Col className="profilesub">
                  <p>{Userprofile?.Lname1}  {Userprofile?.subject1}</p>
                  <p>{Userprofile?.Lname2}  {Userprofile?.subject2}</p>
                  <p>{Userprofile?.Lname3}  {Userprofile?.subject3}</p>
                  <p>{Userprofile?.Lname4}  {Userprofile?.subject4}</p>
                      </Col>
                      </Row>
              </div>      
          
              <button type='submit' className='savebtn'>Save</button>
          </form>
          
        </Row>

        
        
    
        </>
      )
  }