  import React from 'react';
  import NavBar from '../components/navBar';
  import './Landing.css';
  import Container from 'react-bootstrap/esm/Container';
  import Row from 'react-bootstrap/Row';
  import Col from 'react-bootstrap/Col';
  import Footer from '../components/Footer';
  import Classes from '../components/Classes';
  import FeedBack from '../components/Feedback';
  import { Link } from 'react-router-dom';
  import ScrollRevealContainer from '../components/ScrollRevealComponent';
  import Home from '../components/Home';
  import Map from '../components/map';
import Results from '../components/results';



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
          
          <p>Established in 1999, as a secondary educational institute catering to the young individuals waiting to contribute to the growth of the country, “Siyathra” is perhaps the most common name that comes to the minds of both parents and students in search of assistance in studies. Established in 1999, as a secondary educational institute catering to the young individuals waiting to contribute to the growth of the country, “Siyathra” is perhaps the most common name that comes to the minds of both parents and students in search of assistance in studies. </p>
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
        <Row className='results'>
        <Col>
        
        <Results/>
        
        </Col>
        </Row>

        <Row className='feedback'>
      <Col>
      <ScrollRevealContainer>
        <FeedBack/>
      </ScrollRevealContainer>
      </Col>
    </Row>
  
   
        </Container>
        <Map/>
      <Footer/>
      </div>
    );
  }

  export default Landing;
