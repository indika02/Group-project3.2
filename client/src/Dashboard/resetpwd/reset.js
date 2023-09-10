import React, { useState, useEffect } from "react";
import './reset.css';
import { setUserProfileData } from "../../features/actions";
import { useSelector } from "react-redux";
import { Form, Row, Col, Container, ProgressBar,Nav,NavDropdown,Navbar } from "react-bootstrap";
import { FaKey, FaSave } from "react-icons/fa";
import { Alert } from "react-bootstrap";
import bcrypt from 'bcryptjs';
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FaUser,FaSignOutAlt } from "react-icons/fa";

export default function Reset() {
  const user = useSelector((state) => state.auth.user);
  const [userProfile, setUserProfile] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState(false);

  useEffect(() => {
    fetchUserProfile(user.email);
  }, [user.email]);

  const fetchUserProfile = (email) => {
    fetch(`http://localhost:5000/account/userdetail/${email}`)
      .then((response) => response.json())
      .then((data) => {
        setUserProfile(data);
      })
      .catch((error) => {
        console.log("Error fetching user data", error);
      });
  };

  useEffect(() => {
    passwordStrengthChecker(password);
  }, [password]);

  useEffect(() => {
    checkPasswordMatch(password, reEnterPassword);
  }, [password, reEnterPassword]);

  const passwordStrengthChecker = (password) => {
    const lengthRegex = /.{8,}/;
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const numberRegex = /[0-9]/;
    const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;

    let score = 0;
    if (lengthRegex.test(password)) score += 1;
    if (uppercaseRegex.test(password)) score += 1;
    if (lowercaseRegex.test(password)) score += 1;
    if (numberRegex.test(password)) score += 1;
    if (specialCharRegex.test(password)) score += 1;

    let strength;
    if (score === 0) {
      strength = "Very Weak";
    } else if (score <= 2) {
      strength = "Weak";
    } else if (score <= 3) {
      strength = "Moderate";
    } else {
      strength = "Strong";
    }

    setPasswordStrength(strength);
  };

  const getProgressColor = () => {
    switch (passwordStrength) {
      case "Very Weak":
        return "danger";
      case "Weak":
        return "warning";
      case "Moderate":
        return "info";
      case "Strong":
        return "success";
      default:
        return "danger";
    }
  };

  const checkPasswordMatch = (password, reEnterPassword) => {
    if (password !== reEnterPassword) {
      setPasswordMatchError(true);
    } else {
      setPasswordMatchError(false);
    }
  };

  async function encryptPassword(password){
    try{
      const encryptedPassword=await bcrypt.hash(password,10);
      return encryptedPassword;
    }catch(error){
      throw new Error('Password encryption failed');
    }
  }

  const resetPassword = async (e) => {
    e.preventDefault();
  
    Swal.fire({
      title: 'Confirm Password Reset',
      text: 'Are you sure you want to reset your password?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const encryptedPassword = await encryptPassword(password);
  
          // Include only the encrypted password in the request data
          const userData = {
            dpwd: encryptedPassword,
          };
  
          // Get the user's email from userProfile
          const userEmail = userProfile?.email;
  
          // Check if userEmail is defined
          if (!userEmail) {
            Swal.fire({
              title: 'User Email Missing',
              text: 'User email is missing. Please try again later.',
              icon: 'error',
            });
            return;
          }
  
          console.log(userData);
  
          // Update the URL to include userEmail
          const resetURL = `http://localhost:5000/account/reset/${userEmail}`;
  
          // Send the PUT request using the updated URL
          const response = await axios.put(resetURL, userData);
            Swal.fire({
              title: 'Password Reset Successful',
              text: 'Your password has been successfully updated.',
              icon: 'success',
            });
        
        } catch (error) {
          console.error('Error resetting password:', error);
          Swal.fire({
            title: 'Password Reset Failed',
            text: 'An error occurred while resetting your password. Please try again later.',
            icon: 'error',
          });
        }
      }
    });
  };
  
  
  
  


  return (
    <div className="reset">
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
      <Container>
        <Row>
          <Col sm={12}>
            <Form className="formreset">
              <h1 className="sign">
                <FaKey /> Reset Your Password
              </h1>

              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your Email address"
                  className="input"
                  value={userProfile?.email}
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Enter your Default Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your Default password"
                  required 
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Enter your new Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
                <Form.Text className="text-muted">
                  Your password should be at least 8 characters long.
                </Form.Text>
                <ProgressBar
                  now={passwordStrength === "Very Weak" ? 25 : passwordStrength === "Weak" ? 50 : passwordStrength === "Moderate" ? 75 : 100}
                  label={passwordStrength}
                  variant={getProgressColor()}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Re-Enter your Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password again"
                  value={reEnterPassword}
                  onChange={(e) => setReEnterPassword(e.target.value)}
                  required 
                />
                {passwordMatchError && (
                    <Alert variant="danger">Passwords do not match!</Alert>
                  )}
              </Form.Group>
              <button
                type="button"
                className="btn btn-primary btnreset"
                onClick={resetPassword}
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
