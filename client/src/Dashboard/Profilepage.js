  import React from "react";
  import { useParams } from "react-router";
  import { useUser } from '../UserContext';
  import { Container,Navbar,Nav,NavDropdown,Row,Col,Form } from "react-bootstrap";
  import './profilepage.css';
  import { useState,useEffect } from "react";
  import swal from "sweetalert";
  import { useSelector,useDispatch } from 'react-redux';
  import { setUserProfileData } from '../features/actions';





  export default function Profilepage(){
    const user = useSelector(state => state.auth.user);
  
    const dispatch = useDispatch();
    const [userProfile,setUserProfile]=useState(null);
    const [updatedProfile, setUpdatedProfile] = useState(null);
    
    useEffect(() => {
      fetchUserProfile(user.email);
    }, [user.email, user?.index]);
    

    const fetchUserProfile = (email)=>{
      fetch(`http://localhost:5000/user/userdetail/${email}`).then((response)=>response.json()).then((data)=>{
        setUserProfile(data);
        console.log(data)
      }).catch((error)=>{
        console.log("Error fetching user data",error);
      });
    };



    const handleFormSubmit = (e) => {
      e.preventDefault();

      fetch(`http://localhost:5000/user/update/${user.email}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userProfile),
      })
        .then((response) => response.json())
        .then((data) => {
          setUserProfile(data.User);
          swal("Success", "Profile Updating is Successfully completed", "success");
          console.log(data.User)
        })
        .catch((error) => {
          console.log("Error updating user profile", error);
          swal("Error", "An error occured!", "error");
        });
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
              <div class="custom-div">
                <h1> User profile</h1>
              </div>
            </div>
          </div>
        </div>
        <Row>
          
        <form className="form" onSubmit={handleFormSubmit}>
          <div className='form-group'>
                  <label for="index">Student's Enrollement No</label>
                  <input type='text' className='form-control' id='index' value={userProfile?.index}readOnly
                
                  />
              </div>
              <div className='form-group'>
                  <label for="name">Student's Full Name</label>
                  <input type='text' className='form-control' id='name' value={userProfile?.name} readOnly
                
                  />
        </div>
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
                      <label for="gender" className='gender'>Gender</label>
                      <input type='text' className='form-control' id='gender'  value={userProfile?.gender}readOnly 
                
                  />
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
                  <input type='email' className='form-control' id='email' value={userProfile?.email} onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
                
                  />
              </div>
                      </Col>
                  </Row>
                  <Row>
                  <Col>
                  <div className='form-group'>
                      <label for="type" className='type'>Class Type</label>
                      <input type='text' className='form-control' id='Classtype' value={userProfile?.classtype} readOnly
                
                  />
              </div>
                  </Col>
                  <Col>
                  <div className='form-group'>
                      <label for="batch" className='batch'>Batch Year</label>
                      <input type='text' className='form-control' id='batchyear' value={userProfile?.batchyear} readOnly
                
                  />
              </div>
                  </Col>
              </Row>
                      <div className='form-group'>
                  <label for="subjects">Subjects</label>
                  <Row>
                  <Col>
                  <div className='form-group'>
                  <input type='text' className='form-control' id='Lecturer1' value={userProfile?.Lname1} readOnly
                  
                  />
              </div>
                      </Col>
                      <Col>
                      <div className='form-group'>
                      <input type='text' className='form-control' id='Subject1' value={userProfile?.subject1} readOnly
                  
                  />
              </div>
                  </Col>
                  <Col>
                  <div className='form-group'>
                  <input type='text' className='form-control' id='Lecturer2' value={userProfile?.Lname2} readOnly
                
                  />
              </div>
                      </Col>
                      <Col>
                      <div className='form-group'>
                      <input type='text' className='form-control' id='Subject2'  value={userProfile?.subject2} readOnly
                
                  />
              </div>
                      </Col>
                  </Row>
                  <Row className='sub'>
                  <Col>
                  <div className='form-group'>
                  <input type='text' className='form-control' id='Lecturer3' value={userProfile?.Lname3} readOnly
                
                  />
              </div>
                      </Col>
                      <Col>
                      <div className='form-group'>
                      <input type='text' className='form-control' id='Subject3'   value={userProfile?.subject3} readOnly
                
                  />
              </div>
                  </Col>
                  <Col>
                  <div className='form-group'>
                  <input type='text' className='form-control' id='Lecturer4' value={userProfile?.Lname4} readOnly
                
                  />
              </div>
                    
                      </Col>
                      <Col>
                      <div className='form-group'>

                      <input type='text' className='form-control' id='Subject4'  value={userProfile?.subject4} readOnly
                  />
      
                      </div>
                      </Col>
                  </Row>
              </div>      
          
              <button type='submit' className='savebtn'>Save</button>
          </form>
          
        </Row>
        
        
    
        </>
      )
  }