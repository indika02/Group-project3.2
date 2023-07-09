  import React from 'react';
  import Row from 'react-bootstrap/esm/Row';
  import Col from 'react-bootstrap/esm/Col';
  import './Home.css';
  import homeimg from '../images/home.jpg';
  import { Link } from 'react-router-dom';

  const Home = () => {
    return (
      <div>
        <Row className='homerow'>
          <Col className='col-md-7'>
          <div class="home-content">
          
          <h1>Siyathra E-Learning Management System</h1>
          <h3>Siyathra Higher Education Institute <br></br>Polpithigama, Kurunegala</h3>
          <Link to="/admin">
            <button className='lmsbtn'>Student Portal</button>
            </Link>
      </div>
          </Col>
        <Col>
        <img src='https://www.indeepa.lk//frontend/assets/images/dl.beatsnoop.com-1660026745NAUu-p-500.png' className='homeimg' fluid/>
        </Col>
        </Row>
      </div>
    );
  }

  export default Home;
