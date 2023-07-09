import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/esm/Image";
import Form from "react-bootstrap/Form";
import logo from "../images/logo.png";
import "./Login.css";
import axios from 'axios';
import { Link } from "react-router-dom";

const StudentReg = () => {
 
  return (
    <div className="login">
      <Container>
        <Form>
         
          <h4>Register for Our LMS</h4>
          <p>*If you are a student who is already attending classes at the institute and has not yet registered with the online education unit*</p>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              className="input"
             
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              className="input" 
              
            />
          </Form.Group>

          <button
            type="button"
            className="btn btn-primary  btnlogin"
            
          >
            Register
          </button>
          <a href="">Reset Your Password</a>
        </Form>
      </Container>
    </div>
  );
};

export default StudentReg;
