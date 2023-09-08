import React, { useState, useEffect } from "react";
import './reset.css';
import { setUserProfileData } from "../../features/actions";
import { useSelector } from "react-redux";
import { Form, Row, Col, Container, ProgressBar } from "react-bootstrap";
import { FaKey, FaSave } from "react-icons/fa";
import { Alert } from "react-bootstrap";

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
        return "danger"; // Default color for unknown strength
    }
  };

  const checkPasswordMatch = (password, reEnterPassword) => {
    if (password !== reEnterPassword) {
      setPasswordMatchError(true);
    } else {
      setPasswordMatchError(false);
    }
  };

  return (
    <div className="reset">
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
                  
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Enter your new Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                />
                {passwordMatchError && (
                    <Alert variant="danger">Passwords do not match!</Alert>
                  )}
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
