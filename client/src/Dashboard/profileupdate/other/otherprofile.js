import React from "react";
import { useParams } from "react-router";

import { Container,Navbar,Nav,NavDropdown,Row,Col,Form } from "react-bootstrap";
import './otherprofile.css';
import { useState,useEffect } from "react";
import swal from "sweetalert";
import { useSelector,useDispatch } from 'react-redux';
import { setUserProfileData } from '../../../features/actions';





export default function OtherProfile(){
  const user = useSelector(state => state.auth.user);

  const dispatch = useDispatch();
  const [userProfile,setUserProfile]=useState(null);
  const [Userprofile,setUserprofile]=useState(null);
  const [updatedProfile, setUpdatedProfile] = useState(null);
  
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
        
      <form className="form" onSubmit={handleFormSubmit}>
      <h4 className="profileh">Personal Details</h4>
      <Row>
     
      <Col>
      <div className='form-group'>
                <label for="name">Full Name</label>
                <input type='text' className='form-control' id='name' value={userProfile?.name}  onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
              
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
                <input type='email' className='form-control' id='email' value={userProfile?.email} readOnly
              
                />
            </div>
                    </Col>
                </Row>
                <h4 className="profileh">Educational Details</h4>
                <Row>
                <Col>
                <div className='form-group'>
                    <label for="type" className='type'>About Your Educational Qualifications</label>
                    <input type='textarea' className='form-control textarea' id='Classtype' value={userProfile?.qualifications} onChange={(e) => setUserProfile({ ...userProfile, qualifications: e.target.value })}
              
                />
            </div>
                </Col>
             
            </Row>
                   
            
                    
       
                  
                   
            
              
        
            <button type='submit' className='savebtn'>Save</button>
        </form>
        
      </Row>

      
      
  
      </>
    )
}