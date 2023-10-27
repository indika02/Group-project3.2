import React from 'react';
import NavBar from '../components/navBar';
import Container from 'react-bootstrap/esm/Container';
import Footer from '../components/Footer';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import './Aboutus.css';
import bg from '../images/bg1.jpg';
import ScrollRevealContainer from '../components/ScrollRevealComponent';
import poster from '../images/bg2.jpg';
import class1 from '../images/class1.jpg';

const Aboutus = () => {
  return (
    <div className='bgabout'>
    
    <NavBar/>
    <div class="containers">
  <img src={poster} alt="Nature"/>
  <div class="text-block">
    <ScrollRevealContainer>
    <h1>About us</h1>
    </ScrollRevealContainer>
  </div>
</div>

      <Container>
        <Row className='abouth'>
          <Col>
          <ScrollRevealContainer>
            <h3>Mission</h3>
            <p className='aboutp'>''To spearhead the transformation of the nation’s sons and daughters as competent and virtuous citizens via holistic education.''</p>
            </ScrollRevealContainer>
          </Col>
        </Row>
        <Row>
          <Col>
          <ScrollRevealContainer>
          <h3>Vision</h3>
        <p  className='aboutp'>''To be the foremost educational institute in Sri Lanka To produce high calibre students.''</p>
        </ScrollRevealContainer>
          </Col>
        </Row>
        <Row className='about'>
        <h3>Why should you choose us?</h3>
        <Col sm={4}>
        <img src={class1} alt="Class" fluid className='classimg1'/>
        </Col>
          <Col sm={8}>
          <ScrollRevealContainer>
          
        <p  className='aboutpf'>Proudly Present for the first time in Siyane city, "Siyathra Higher Education Institute ", Sri Lanka's only one state of the art auditorium built with luxury oh high technology and modern technology for the children of the future. The Siyathra Higher Education Institute has designed to be aesthetically pleasing, both indoors and outdoors with modern amenities like Air-Conditioned auditorium, Sophisticated loudspeakers, widescreen mounted to make the lecturer and the lecture clear, comfortable seating that allows you to sit in one sitting for an extended period without any difficulties and the restaurant. In the short period since its founding, we have been able to become the heir to the great results of Kurunegala under the guidance of an outstanding staff.</p>
        </ScrollRevealContainer>
          </Col>
        </Row>
    </Container>
    <Footer/>
    </div>
  );
}

export default Aboutus;