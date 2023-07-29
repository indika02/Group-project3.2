  import React from 'react';
  import NavBar from '../components/navBar';
  import Footer from '../components/Footer';
  import './Lecturer.css';
  import Container from 'react-bootstrap/esm/Container';
  import Row from 'react-bootstrap/esm/Row';
  import Col from 'react-bootstrap/esm/Col';
  import profilepic from '../images/profile.jpg';
import ScrollRevealContainer from '../components/ScrollRevealComponent';

  const Lecturer = () => {
    return (
      <div className='Lecturers'>
        <NavBar/>
        <Container>
          <h1>Meet Our Proffessional Lecturers</h1>
        </Container>
        <Footer/>
      </div>
    );
  }

  export default Lecturer;
