import React from 'react';
import { Row, Col } from 'react-bootstrap';
import './Home.css';
import homeimg from '../images/home.jpg';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <Row className="homerow">
        <Col xs={12} md={7} className="col-md-7">
          <div className="home-content">
            <h1>Siyathra E-Learning Management System</h1>
            <h3>Siyathra Higher Education Institute</h3>
            <h3>Polpithigama, Kurunegala</h3>
            <Link to="/student">
              <button className="lmsbtn">Student Portal</button>
            </Link>
          </div>
        </Col>
        <Col xs={12} md={5}>
          <img
            src="https://www.indeepa.lk//frontend/assets/images/dl.beatsnoop.com-1660026745NAUu-p-500.png"
            className="img-fluid" id='homeimg'
            alt="Home Image"
          />
        </Col>
      </Row>
    </div>
  );
}

export default Home;
