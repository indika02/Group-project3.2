import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import logo from "../images/logo.png";
import "./Login.css";
import axios from 'axios';
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  const onLogin = async () => {
    const credentials = {
      email,
      password,
    };

    console.log(credentials);
    await axios
      .post("http://localhost:5000/account/login", credentials)
      .then((response) => {
        if (response.data.usertype === "teacher") {
          navigate("/teacher");
        } else if (response.data.usertype === "student") {
          navigate("/student");
        }else if (response.data.usertype==="admin"){
          navigate("/admin");
        }
      })
      .catch((error) => {
        alert(error.response.data.message);
        console.log(error)
      });
  };
  return (
    <div className="login">
      <Container>
        <Form>
          <img src={logo} alt="Logo" fluid />
          <h4>Login to Our LMS</h4>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              className="input"
              onChange={(e) => setEmail(e.target.value)}
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
          <Link to="/reset-password">Reset Your Password</Link>
        </Form>
      </Container>
    </div>
  );
};

export default Login;
