    import React from 'react';
    import Row from 'react-bootstrap/esm/Row';
    import Col from 'react-bootstrap/esm/Col';
    import './contact.css';
import Footer from '../components/Footer';
import NavBar from '../components/navBar';
import ScrollRevealContainer from '../components/ScrollRevealComponent';

    const Contact = () => {
      return (
        <div>
          <NavBar/>
          <Row className='row-contactus'>
          <Col>
          <form>
          <h3>Get In Touch</h3>
          <p>Your email address will not be published.</p>
            <input type='text' name='Name' id='' placeholder='Enter Your Name' required/>
            <input type='email' name='Email' id='' placeholder='example@gmail.com' />
            <input type='phone' name='Contact No' id='' placeholder='+94'required/>
          <textarea name='message' id='' cols="30" rows="4" placeholder='Type Here.......' required/>
          <button type='submit'>Send</button>
          </form> 
          </Col>
          </Row>
         
          <Footer/>
        </div>
      );
    }

    export default Contact;