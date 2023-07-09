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

  const Login = () => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    let navigate=useNavigate();

    const onLogin=async()=>{
      const credentials={
        email,
        password,
      };

      await axios.post("http://localhost:5000/user/login",credentials).then((response)=>{
        if(response.data.accountType==="admin"){
          navigate("/admin");
        }else if(response.data.accountType==="student"){
          navigate("/student");
        }
      }).catch((error)=>{
        alert(error.response.data.message);
      });
    };
    return (
      <div className="login">
        <Container>
          <Form>
            {/* <img src={logo} fluid></img> */}
            <h4>Login to Our LMS</h4>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                className="input"
                onChange={(e)=>setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                className="input" 
                onChange={(e)=>setPassword(e.target.value)}
              />
            </Form.Group>

            <button
              type="button"
              className="btn btn-primary  btnlogin"
              onClick={onLogin}
            >
              Login
            </button>
            <a href="">Reset Your Password</a>
          </Form>
        </Container>
      </div>
    );
  };

  export default Login;
