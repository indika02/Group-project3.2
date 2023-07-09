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
          <ScrollRevealContainer>
        <Row>
        <h3>කලා විෂයධාරාව</h3>
              <Col className='col-md-3'>
                <div class="card">
      <img src={profilepic} alt="Card Image"/>
      <div class="card-content">
        <h2>කළා</h2>
        <p>Card description goes here.</p>
      </div>
    </div>
              </Col>
              <Col className='col-md-3'>
                <div class="card">
      <img src={profilepic} alt="Card Image"/>
      <div class="card-content">
        <h2>කළා</h2>
        <p>Card description goes here.</p>
      </div>
    </div>
              </Col>
              <Col className='col-md-3'>
                <div class="card">
      <img src={profilepic} alt="Card Image"/>
      <div class="card-content">
        <h2>කළා</h2>
        <p>Card description goes here.</p>
      </div>
    </div>
              </Col>
              <Col className='col-md-3'>
                <div class="card">
      <img src={profilepic} alt="Card Image"/>
      <div class="card-content">
        <h2>කළා</h2>
        <p>Card description goes here.</p>
      </div>
    </div>
              </Col>
        </Row>
        </ScrollRevealContainer>
        <ScrollRevealContainer>
        <Row>
        <h3>විද්‍යා/ගණිත විෂයධාරා</h3>
        <Col className='col-md-3'>
                <div class="card">
      <img src={profilepic} alt="Card Image"/>
      <div class="card-content">
        <h2>කළා</h2>
        <p>Card description goes here.</p>
      </div>
    </div>
              </Col>
        <Col className='col-md-3'>
                <div class="card">
      <img src={profilepic} alt="Card Image"/>
      <div class="card-content">
        <h2>කළා</h2>
        <p>Card description goes here.</p>
      </div>
    </div>
              </Col>
              <Col className='col-md-3'>
                <div class="card">
      <img src={profilepic} alt="Card Image"/>
      <div class="card-content">
        <h2>කළා</h2>
        <p>Card description goes here.</p>
      </div>
    </div>
              </Col>
              <Col className='col-md-3'>
                <div class="card">
      <img src={profilepic} alt="Card Image"/>
      <div class="card-content">
        <h2>කළා</h2>
        <p>Card description goes here.</p>
      </div>
    </div>
              </Col>
        </Row>
        </ScrollRevealContainer>
        <ScrollRevealContainer>
        <Row>
        <h3>වාණිජ විෂයධාරාව</h3>
        <Col className='col-md-3'>
                <div class="card">
      <img src={profilepic} alt="Card Image"/>
      <div class="card-content">
        <h2>කළා</h2>
        <p>Card description goes here.</p>
      </div>
    </div>
              </Col>
        <Col className='col-md-3'>
                <div class="card">
      <img src={profilepic} alt="Card Image"/>
      <div class="card-content">
        <h2>කළා</h2>
        <p>Card description goes here.</p>
      </div>
    </div>
              </Col>
              <Col className='col-md-3'>
                <div class="card">
      <img src={profilepic} alt="Card Image"/>
      <div class="card-content">
        <h2>කළා</h2>
        <p>Card description goes here.</p>
      </div>
    </div>
              </Col>
              <Col className='col-md-3'>
                <div class="card">
      <img src={profilepic} alt="Card Image"/>
      <div class="card-content">
        <h2>කළා</h2>
        <p>Card description goes here.</p>
      </div>
    </div>
              </Col>
        </Row>
        </ScrollRevealContainer>
        <ScrollRevealContainer>
        <Row>
        <h3>තාක්ෂණවේදය විෂයධාරාව</h3>
        </Row>
        </ScrollRevealContainer>
        </Container>
        <Footer/>
      </div>
    );
  }

  export default Lecturer;
