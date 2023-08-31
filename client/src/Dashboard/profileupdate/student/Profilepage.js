  import React from "react";


  import { Container,Navbar,Nav,Row,Col,Form,Image,Button } from "react-bootstrap";
  import './profilepage.css';
  import { useState,useEffect } from "react";
  import swal from "sweetalert";
  import { useSelector,useDispatch } from 'react-redux';
  import { setUserProfileData } from '../../../features/actions';
import { FaDownload, FaTrash, FaUpload } from "react-icons/fa";

import { useRef } from "react";



  export default function Profilepage(){
    const user = useSelector(state => state.auth.user);
  
    const dispatch = useDispatch();
    const [userProfile,setUserProfile]=useState(null);
    const [Userprofile,setUserprofile]=useState(null);
    const [updatedProfile, setUpdatedProfile] = useState(null);
    const [profilePicture, setProfilePicture] = useState(null);
    const fileInputRef = useRef(null);

    
    useEffect(() => {
      fetchUserProfile(user.email);
      fetchUser(user.email);
    }, [user.email, user?.index]);
    

    const fetchUserProfile = (email)=>{
      fetch(`http://localhost:5000/account/userdetail/${email}`).then((response)=>response.json()).then((data)=>{
        setUserProfile(data);
        console.log(data)
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

      fetch(`http://localhost:5000/account/update/${user.email}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userProfile),
      })
        .then((response) => response.json())
        .then((data) => {
          setUserProfile(data.Account);
          swal("Success", "Profile Updating is Successfully completed", "success");
          console.log(data.Account)
        })
        .catch((error) => {
          console.log("Error updating user profile", error);
          swal("Error", "An error occured!", "error");
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

    const handleResetPicture = () => {
      setProfilePicture(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
    };
    return(
      <>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#home">Siyathra Learning Management System</Navbar.Brand>
              <Nav className="me-auto">
              </Nav>
          </Container>
        </Navbar>
    <div class="container-fluid">
          <div class="row">
            <div class="col">
              
            </div>
          </div>
        </div>
        <Row>
        <Col><Image src={profilePicture} className="profilepic" roundedCircle fluid style={{ width: '200px', height: '200px' }} /></Col>
        </Row>
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
                  <div className='form-group'>
                  <label for="email">Upload Your Profile Picture</label>
                  <Form.Control type="file" accept="image/*" ref={fileInputRef} onChange={handlePictureChange} />

                  </div>
                  </Col>
                  <Col sm={4}>
                  <Button className="btn btn-success btnprofilepic" onClick={handleResetPicture} disabled={!profilePicture}>
              <FaTrash/>
            </Button>
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