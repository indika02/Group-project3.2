  import React from 'react';
  import NavBar from '../components/navBar';
  import Footer from '../components/Footer';
  import './Lecturer.css';
  import Container from 'react-bootstrap/esm/Container';
  import Row from 'react-bootstrap/esm/Row';
  import Col from 'react-bootstrap/esm/Col';
  import profilepic from '../images/profile.jpg';
import ScrollRevealContainer from '../components/ScrollRevealComponent';
import { FaEnvelope, FaPhone } from 'react-icons/fa';

  const Lecturer = () => {
    return (
      <div className='Lecturers'>
        <NavBar/>
        <Container>
          <h1>Meet Our Proffessional Lecturers</h1>

          <Row>
            <Col sm={3}>
            <div class="card">
              <img src={profilepic} alt="Card Image"/>
              <div class="card-content">
                <h2>Mr. Bandula Ekanayaka</h2>
                <p>Sinhala</p>
                <p>Graduated from University of Colombo(1st class honours) </p>
                <p><FaEnvelope/> bandula@gmail.com</p>
                <p><FaPhone/>+94 77 34 23356</p>
              </div>
            </div>
            </Col>
            <Col sm={3}>
            <div class="card">
              <img src={profilepic} alt="Card Image"/>
              <div class="card-content">
              <h2>Mr. Bandula Ekanayaka</h2>
                <p>Sinhala</p>
                <p>Graduated from University of Colombo(1st class honours) </p>
                <p><FaEnvelope/> bandula@gmail.com</p>
                <p><FaPhone/>+94 77 34 23356</p>
              </div>
            </div>
            </Col>
            <Col sm={3}>
            <div class="card">
              <img src={profilepic} alt="Card Image"/>
              <div class="card-content">
              <h2>Mr. Bandula Ekanayaka</h2>
                <p>Sinhala</p>
                <p>Graduated from University of Colombo(1st class honours) </p>
                <p><FaEnvelope/> bandula@gmail.com</p>
                <p><FaPhone/>+94 77 34 23356</p>
              </div>
            </div>
            </Col>
            <Col sm={3}>
            <div class="card">
              <img src={profilepic} alt="Card Image"/>
              <div class="card-content">
              <h2>Mr. Bandula Ekanayaka</h2>
                <p>Sinhala</p>
                <p>Graduated from University of Colombo(1st class honours) </p>
                <p><FaEnvelope/> bandula@gmail.com</p>
                <p><FaPhone/>+94 77 34 23356</p>
              </div>
            </div>
            </Col>
          </Row>
        </Container>
        <Footer/>
      </div>
    );
  }

  export default Lecturer;
