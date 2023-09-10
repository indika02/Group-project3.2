import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import "./Login.css";
import axios from 'axios';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import { useDispatch } from 'react-redux';
import { loginUser } from '../features/actions';
import { Col,Row,Alert } from "react-bootstrap";
import { FaKey, FaSignInAlt} from "react-icons/fa";

const Login = () => {
  const [emailOrIndex, setEmailOrIndex] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false);

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  const onLogin = async () => {
    const credentials = {
      emailOrIndex,
      password,
    };

    try {
      const response = await axios.post("http://localhost:5000/account/login", credentials);
      
dispatch(loginUser(response.data));
localStorage.setItem('user', JSON.stringify(response.data));

      
      console.log(loginUser(response.data))
      if (response.data.usertype === "teacher") {
        navigate(`/teacher`);
      } else if (response.data.usertype === "student") {
        navigate(`/student`);
      } else if (response.data.usertype === "admin") {
        navigate(`/admin`);
      }else if(response.data.usertype==="attendancemarker"){
        navigate(`/qrcodescanner`);
      }else if(response.data.usertype==="generaladmin"){
        navigate(`/admin`);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        swal("Error!", "Incorrect Username or Password!", "error");
      } else {
        swal("Error!", "Please use correct username and Password!", "error");
      }
    }
  };

  return (
    <div className="login">
    
      <Container>
      <Row>
     
    <Col sm={12}>
    <Form className="formlogin">
          <h1 className="sign"><FaKey/> Login to Account</h1>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter email or Index Number"
              className="input"
              onChange={(e) => setEmailOrIndex(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              className="input"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <p>
          <Link to="" onClick={() => setShowAlert(true)}>Forgotten your username or password?</Link>
        </p>
        {showAlert && (
          <Alert variant="danger" onClose={handleAlertClose} dismissible>
            Please Contact your system administrator!
          </Alert>
        )}
          <button
            type="button"
            className="btn btn-primary btnlogin"
            onClick={onLogin}
          >
           <FaSignInAlt/> Login
          </button>
         
        </Form>
     
    </Col>
    
    </Row>
        
      </Container>
    </div>
  );
};

export default Login;
