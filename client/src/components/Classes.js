      import React from 'react';
      import Row from 'react-bootstrap/esm/Row';
      import Col from 'react-bootstrap/esm/Col';
      import './Classes.css';
      import Container from 'react-bootstrap/esm/Container';
    import ScrollRevealContainer from './ScrollRevealComponent';
    import art from '../images/Art.jpg';
    import science from '../images/Science.jpg';
    import commerce from '../images/Commerce.jpg';
    import technology from '../images/Technology.jpeg';

      const Classes = () => {
        return (
          <Container>
            
          <Row className='classes'>
            <ScrollRevealContainer>
          <h3>Our Classes</h3>
          </ScrollRevealContainer>
          <Col className='col-md-3'>
          <ScrollRevealContainer>
      <div class="cards">
    <img src={art} alt="Cards Image"/>
  
    <div class="overlay">
    <div class="text"><h2>කලා</h2></div>
  </div>
  </div>
  </ScrollRevealContainer>
          </Col>
          <Col className='col-md-3'>
          <ScrollRevealContainer>
      <div class="cards">
      <img src={science} alt="Cards Image"/>
  
     <div class="overlay">
    <div class="text"><h2>විද්‍යා/ගණිත</h2></div>
  </div>
  </div>
  </ScrollRevealContainer>
          </Col>
          <Col className='col-md-3'>
          <ScrollRevealContainer>
      <div class="cards">
      <img src={commerce} alt="Cards Image"/>
     <div class="overlay">
    <div class="text"><h2>වාණිජ</h2></div>
  </div>
  </div>
  </ScrollRevealContainer>
          </Col>
          <Col className='col-md-3'>
          <ScrollRevealContainer>
          <div class="cards">
          <img src={technology} alt="Cards Image"/>
        <div class="overlay">
    <div class="text"><h2>තාක්ෂණවේදය</h2></div>
  </div>
    </div>
    </ScrollRevealContainer>
          </Col>
        </Row>


        

        </Container>
        );
      }

      export default Classes;
