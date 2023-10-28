import React from 'react';
import { Row, Col } from 'react-bootstrap';
import './Home.css';
import homeimg from '../images/home.jpg';
import { Link } from 'react-router-dom';
import mainpic from '../images/main.png';

const Home = () => {
  return (
    <div>
      <Row className="homerow">
        <Col>
          <div className="home-content">
          <h2 className='heading'>Siyathra Higher Education Institute</h2>
           
            <h3>Polpithigama, Kurunegala</h3>
            <Link to="/login">
              <button className="lmsbtn">Student Portal</button>
            </Link>
            
          </div>
          
        </Col>
      
      </Row>
    </div>
  );
}

export default Home;
