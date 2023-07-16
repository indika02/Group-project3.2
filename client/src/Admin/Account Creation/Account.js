import React, { useState, useEffect } from "react";
import { Row, Col } from 'react-bootstrap';
import './Account.css';
import axios from "axios";
import swal from "sweetalert";
import bcrypt from 'bcryptjs';
import { Container, Table } from "react-bootstrap";

export default function Account() {
  const [index, setIndex] = useState("");
  const [email, setEmail] = useState("");
  const [dpwd, setDpwd] = useState("1234");
  const [accountstate, setAccountState] = useState("active");
  const [usertype, setUsertype] = useState("");
  const [accountDetails, setAccountDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    fetchAccountDetails();
  }, [formSubmitted]);

  const fetchAccountDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/account");
      setAccountDetails(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch Accounts:", error);
    }
  };

  async function encryptPassword(password) {
    try {
      const encryptedPassword = await bcrypt.hash(password, 10);
      return encryptedPassword;
    } catch (error) {
      throw new Error('Password encryption failed');
    }
  }

  async function sendData(e) {
    e.preventDefault();

    const encryptedPassword = await encryptPassword(dpwd);

    const newAccount = {
      index,
      email,
      usertype,
      accountstate,
      dpwd: encryptedPassword,
    };

    axios.post("http://localhost:5000/account/add", newAccount)
      .then(() => {
        swal("Success", "Successfully created User Account!", "success");
        setFormSubmitted(true);
        setIndex("");
        setEmail("");
        setUsertype("");
        setAccountState("active");
        setDpwd("1234");
      })
      .catch((err) => {
        swal("Error", "Invalid Data Input!", "error");
      });
  }

  return (
    <div className="Account">
      <form onSubmit={sendData}>
        <div className='form-group'>
          <label htmlFor="Index">Registration Number</label>
          <input
            type='text'
            className='form-control'
            id='Index'
            placeholder="Enter the Registration Number"
            value={index}
            onChange={(e) => setIndex(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor="email">Email Address</label>
          <input
            type='text'
            className='form-control'
            id='email'
            placeholder="Enter the email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="type" className='type'>User Type</label>
          <select
            className="form-select form-control"
            aria-label="Default select example"
            value={usertype}
            onChange={(e) => setUsertype(e.target.value)}
          >
            <option value="">User Type</option>
            <option value="teacher">Student</option>
            <option value="student">Teacher</option>
          </select>
        </div>
        <button type="submit" className="savebtn">Create</button>
      </form>

      <Container>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Table striped bordered hover className="account-table">
            <thead>
              <tr>
                <th>Enrollment No</th>
                <th>Email</th>
                <th>User Type</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {accountDetails.map((account) => (
                <tr key={account._id}>
                  <td>{account.index}</td>
                  <td>{account.email}</td>
                  <td>{account.usertype}</td>
                  <td>{account.accountstate}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </div>
  );
}
