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
<ScrollRevealContainer>
          <Row>
          <h2>Art</h2>
          
            <Col sm={3}>
            <ScrollRevealContainer>
            <div class="card">
              <img src={profilepic} alt="Card Image"/>
              <div class="content">
              <h1 className='name'>Bandula Ekanayaka</h1>
              <p>SINHALA</p>
                <p className='degree'>Graduated from University of Colombo(1st class honours) </p>
                <p><FaEnvelope/> bandula@gmail.com</p>
                <p><FaPhone/>+94 77 34 23356</p>
              </div>
            </div>
            </ScrollRevealContainer>
            </Col>
            <Col sm={3}>
            <ScrollRevealContainer>
            <div class="card">
              <img src={profilepic} alt="Card Image"/>
              <div class="content">
              <h1 className='name'>Bandula Ekanayaka</h1>
              <p>SINHALA</p>
                <p className='degree'>Graduated from University of Colombo(1st class honours) </p>
                <p><FaEnvelope/> bandula@gmail.com</p>
                <p><FaPhone/>+94 77 34 23356</p>
              </div>
            </div>
            </ScrollRevealContainer>
            </Col>
            <Col sm={3}>
            <ScrollRevealContainer>
            <div class="card">
              <img src={profilepic} alt="Card Image"/>
              <div class="content">
              <h1 className='name'>Bandula Ekanayaka</h1>
              <p>SINHALA</p>
                <p className='degree'>Graduated from University of Colombo(1st class honours) </p>
                <p><FaEnvelope/> bandula@gmail.com</p>
                <p><FaPhone/>+94 77 34 23356</p>
              </div>
            </div>
            </ScrollRevealContainer>
            </Col>
            <Col sm={3}>
            <ScrollRevealContainer>
            <div class="card">
              <img src={profilepic} alt="Card Image"/>
              <div class="content">
              <h1 className='name'>Bandula Ekanayaka</h1>
              <p>SINHALA</p>
                <p className='degree'>Graduated from University of Colombo(1st class honours) </p>
                <p><FaEnvelope/> bandula@gmail.com</p>
                <p><FaPhone/>+94 77 34 23356</p>
              </div>
            </div>
            </ScrollRevealContainer>
            </Col>
            
          </Row>
          </ScrollRevealContainer>
          <ScrollRevealContainer>
          <Row>
          <h2>Commerce</h2>

          <Col sm={3}>
          <ScrollRevealContainer>
          <div class="card">
            <img src={profilepic} alt="Card Image"/>
            <div class="content">
            <h1 className='name'>Bandula Ekanayaka</h1>
            <p>SINHALA</p>
              <p className='degree'>Graduated from University of Colombo(1st class honours) </p>
              <p><FaEnvelope/> bandula@gmail.com</p>
              <p><FaPhone/>+94 77 34 23356</p>
            </div>
          </div>
          </ScrollRevealContainer>
          </Col>
          <Col sm={3}>
          <ScrollRevealContainer>
          <div class="card">
            <img src={profilepic} alt="Card Image"/>
            <div class="content">
            <h1 className='name'>Bandula Ekanayaka</h1>
            <p>SINHALA</p>
              <p className='degree'>Graduated from University of Colombo(1st class honours) </p>
              <p><FaEnvelope/> bandula@gmail.com</p>
              <p><FaPhone/>+94 77 34 23356</p>
            </div>
          </div>
          </ScrollRevealContainer>
          </Col>
          <Col sm={3}>
          <ScrollRevealContainer>
          <div class="card">
            <img src={profilepic} alt="Card Image"/>
            <div class="content">
            <h1 className='name'>Bandula Ekanayaka</h1>
            <p>SINHALA</p>
              <p className='degree'>Graduated from University of Colombo(1st class honours) </p>
              <p><FaEnvelope/> bandula@gmail.com</p>
              <p><FaPhone/>+94 77 34 23356</p>
            </div>
          </div>
          </ScrollRevealContainer>
          </Col>
          <Col sm={3}>
          <ScrollRevealContainer>
          <div class="card">
            <img src={profilepic} alt="Card Image"/>
            <div class="content">
            <h1 className='name'>Bandula Ekanayaka</h1>
            <p>SINHALA</p>
              <p className='degree'>Graduated from University of Colombo(1st class honours) </p>
              <p><FaEnvelope/> bandula@gmail.com</p>
              <p><FaPhone/>+94 77 34 23356</p>
            </div>
          </div>
          </ScrollRevealContainer>
          </Col>
          </Row>
          </ScrollRevealContainer>
        </Container>
        <Footer/>
      </div>
    );
  }

  export default Lecturer;
