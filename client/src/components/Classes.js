      import React from 'react';
      import Row from 'react-bootstrap/esm/Row';
      import Col from 'react-bootstrap/esm/Col';
      import './Classes.css';
      import Container from 'react-bootstrap/esm/Container';
    import ScrollRevealContainer from './ScrollRevealComponent';

      const Classes = () => {
        return (
          <Container>
            
          <Row className='classes'>
            <ScrollRevealContainer>
          <h3>Our Classes</h3>
          </ScrollRevealContainer>
          <Col className='col-md-3'>
          <ScrollRevealContainer>
      <div class="card">
    <img src="https://i.etsystatic.com/30857751/r/il/56d58a/4004835856/il_fullxfull.4004835856_k4ei.jpg" alt="Card Image"/>
    {/* <div class="card-content">
      <h2>කලා</h2>
      <p>Card description goes here.</p>
    </div> */}
    <div class="overlay">
    <div class="text"><h2>කලා</h2></div>
  </div>
  </div>
  </ScrollRevealContainer>
          </Col>
          <Col className='col-md-3'>
          <ScrollRevealContainer>
      <div class="card">
    <img src="https://www.stepbystepmontessori.com/wp-content/uploads/2018/11/Depositphotos_7649976_l-2015-1030x687.jpg" alt="Card Image"/>
    {/* <div class="card-content">
      <h2>විද්‍යා/ගණිත</h2>
      <p>Card description goes here.</p>
    </div> */}
     <div class="overlay">
    <div class="text"><h2>විද්‍යා/ගණිත</h2></div>
  </div>
  </div>
  </ScrollRevealContainer>
          </Col>
          <Col className='col-md-3'>
          <ScrollRevealContainer>
      <div class="card">
    <img src="https://static.panthi.lk/addImages/commerce-12-12-1671037128.jpg" alt="Card Image"/>
    {/* <div class="card-content">
      <h2>වාණිජ</h2>
      <p>Card description goes here.</p>
    </div> */}
     <div class="overlay">
    <div class="text"><h2>වාණිජ</h2></div>
  </div>
  </div>
  </ScrollRevealContainer>
          </Col>
          <Col className='col-md-3'>
          <ScrollRevealContainer>
          <div class="card">
      <img src="https://bluesoft.com/wp-content/uploads/2022/05/MicrosoftTeams-image.jpg" alt="Card Image"/>
      {/* <div class="card-content">
        <h2>තාක්ෂණවේදය</h2>
        <p>Card description goes here.</p>
      </div> */}
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
