    import React,{ useRef } from 'react';
    import Row from 'react-bootstrap/esm/Row';
    import Col from 'react-bootstrap/esm/Col';
    import './contact.css';
    import Footer from '../components/Footer';
    import NavBar from '../components/navBar';
    import swal from 'sweetalert';
    

import emailjs from '@emailjs/browser';
import { Form } from 'react-bootstrap';

export const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_y0rq4al', 'template_6zv0hmr', form.current, 'fmC-MjlKeVkS9u0HH')
      .then((result) => {
        swal("Success", "Your message sent!", "success");
          console.log(result.text);
          
      }, (error) => {
        swal("Error", "Invalid input!", "error");
          console.log(error.text);
        
      });

      e.target.reset();
  };
        
      return (
        <div>
          <NavBar/>
          <Row className='row-contactus'>
          <Col>
          <form ref={form} onSubmit={sendEmail}>
          <h3>Send your Suggestions,inquiries and Feedback</h3>
          <p>Your email address will not be published.</p>
          <Form.Group className="mb-3" controlId="formGroupEmail">
           
            <Form.Control
              type="text"
              placeholder="Enter Your Name here"
              className="input"
              name='Name'
            />
          </Form.Group>
          
           
          <Row>
          <Col>
          <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Control
            type="Email"
            placeholder="Enter Your Email Address Here"
            className="input"
            name='Email'
          />
        </Form.Group>
          </Col>
          <Col>
          <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Control
          type="text"
          placeholder="Enter Your Contact No. here"
          className="input"
          name='Contactno'
        />
      </Form.Group>
          </Col>
          </Row>
          
        
          <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Control
            as="textarea"  
            rows={4}     
            placeholder="Enter Your Message here..."
            className="input"
            name="Message"
          />
        </Form.Group>
        
          <button type='submit' value='Send' className='sendm'>Send</button>
          </form> 
          </Col>
          </Row>
         
          <Footer/>
        </div>
      );
    }

    export default ContactUs;