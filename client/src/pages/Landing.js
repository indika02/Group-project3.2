  import React from 'react';
  import NavBar from '../components/navBar';
  import Image from 'react-bootstrap/Image';
  import Aboutus from './Aboutus';
  import './Landing.css';
  import Container from 'react-bootstrap/esm/Container';
  import Row from 'react-bootstrap/Row';
  import Col from 'react-bootstrap/Col';
  import Iframe from 'react-iframe';
  import Form from 'react-bootstrap/Form';
  import Button from 'react-bootstrap/esm/Button';
  import Footer from '../components/Footer';
  import Classes from '../components/Classes';
  import FeedBack from '../components/Feedback';
  import Contact from './contact';
  import { Link } from 'react-router-dom';
import ScrollRevealContainer from '../components/ScrollRevealComponent';
import Home from '../components/Home';



  const Landing = () => {
    return (
      <div>
        <header>
        <NavBar/>
        </header>
        <section className='home'>
        <Home/>
        </section>
      <Container>
        
        
    <ScrollRevealContainer>
      <Row className='row-aboutus'>
          <Col className='col-md-4'>
          <div class="circular-image"></div>
        
          </Col>
    
          <Col>
          <ScrollRevealContainer>
          <section className='aboutussec'>
          <h3>About us</h3>
          
          <p>Established in 1999, as a secondary educational institute catering to the young individuals waiting to contribute to the growth of the country, “Siyathra” is perhaps the most common name that comes to the minds of both parents and students in search of assistance in studies. </p>
          <Link to="/aboutus">
          <button className='aboutbtn'>Read More</button>
          </Link>
          
          </section>
          </ScrollRevealContainer>
          </Col>
        </Row>
        </ScrollRevealContainer>
        <section className='classes'>
        <Classes/>
        </section>
        <ScrollRevealContainer>
        
        </ScrollRevealContainer>
        <Row className='feedback'>
      <Col>
      <ScrollRevealContainer>
        <FeedBack/>
      </ScrollRevealContainer>
      </Col>
    </Row>
  
        </Container>
        <Row className='map'>
          <Col>
          <Iframe
          url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.196316816196!2d80.3274750747405!3d7.874516305991469!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afcc527b28feeb7%3A0x65375ad7e4c5bfdc!2sSiyathra%20Education%20Institute!5e0!3m2!1sen!2slk!4v1686557613874!5m2!1sen!2slk"
          width="100%"
          height="450px"
          frameborder="0"
          style={{ border: 0 }}
          allowfullscreen=""
          aria-hidden="false"
          tabindex="0"
        />
          </Col>
        </Row>
      <Footer/>
      </div>
    );
  }

  export default Landing;
