import React from "react";
import './reset.css';
import { setUserProfileData } from "../../features/actions";
import { useSelector } from "react-redux";
import { Form,Row,Col,Container } from "react-bootstrap";
import { FaKey, FaSave } from "react-icons/fa";
import { useEffect,useState } from "react";

export default function Reset(){

    const user=useSelector(state=>state.auth.user);
    const [userProfile,setUserProfile]=useState(null);

    useEffect(() => {
        fetchUserProfile(user.email);
       
      }, [user.email]);
      
  
      const fetchUserProfile = (email)=>{
        fetch(`http://localhost:5000/account/userdetail/${email}`).then((response)=>response.json()).then((data)=>{
          setUserProfile(data);
          console.log(data)
        }).catch((error)=>{
          console.log("Error fetching user data",error);
        });
      };

    return(
        <div className="reset">
      <Container>
      <Row>
     
    <Col sm={12}>
    <Form className="formreset">
          {/* <img src={logo} alt="Logo" fluid /> */}
          <h1 className="sign"><FaKey/> Reset Your Password</h1>
         
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your Email address"
              className="input"
              value={userProfile?.email}readOnly

            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
        <Form.Label>Enter your Default Password</Form.Label>
        <Form.Control type="password" placeholder="Enter your Default password" />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
      <Form.Label>Enter your new Password</Form.Label>
        <Form.Control type="password" placeholder="Enter your password" />
        <Form.Text className="text-muted">
          Your password should be at least 8 characters long.
        </Form.Text>
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
      <Form.Label>Re-Enter your Password</Form.Label>
        <Form.Control type="password" placeholder="Enter your password again" />
        
      </Form.Group>
          <button
            type="button"
            className="btn btn-primary btnreset"
            
          >
            Send
          </button>
          
        </Form>
    </Col>
    
    </Row>
        
      </Container>
    </div>
    );
}