    import React,{ useRef } from 'react';
    import Row from 'react-bootstrap/esm/Row';
    import Col from 'react-bootstrap/esm/Col';
    import './contact.css';
    import Footer from '../components/Footer';
    import NavBar from '../components/navBar';
    import swal from 'sweetalert';

import emailjs from '@emailjs/browser';

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
          
            <input type='text' name='Name' id='' placeholder='Enter Your Name'  
          />
            <input type='email' name='Email' id='' placeholder='example@gmail.com' 
           />
            <input type='phone' name='Contactno' id='' placeholder='+94'
            
            />
          <textarea name='Message' id='' cols="30" rows="4" placeholder='Type Here.......'
        
          />
          <button type='submit' value='Send' className='sendm'>Send</button>
          </form> 
          </Col>
          </Row>
         
          <Footer/>
        </div>
      );
    }

    export default ContactUs;