import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from '../UserContext';
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import logo from "../images/logo.png";
import "./Login.css";
import axios from 'axios';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../features/actions';
import { Col,Row } from "react-bootstrap";
import { FaKey, FaSign, FaSignInAlt } from "react-icons/fa";

const Login = () => {
  const [emailOrIndex, setEmailOrIndex] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
        Swal.fire({
          icon: 'error',
          title: 'Incorrect password',
          text: 'Please enter the correct password.',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Login error',
          text: 'An error occurred while logging in.',
        });
      }
    }
  };

  return (
    <div className="login">
      <Container>
      <Row>
     
    <Col sm={12}>
    <Form className="formlogin">
          {/* <img src={logo} alt="Logo" fluid /> */}
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

          <button
            type="button"
            className="btn btn-primary btnlogin"
            onClick={onLogin}
          >
            Login
          </button>
          
        </Form>
    </Col>
    
    </Row>
        
      </Container>
    </div>
  );
};

export default Login;
