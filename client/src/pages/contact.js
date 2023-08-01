    import React from 'react';
    import Row from 'react-bootstrap/esm/Row';
    import Col from 'react-bootstrap/esm/Col';
    import './contact.css';
import Footer from '../components/Footer';
import NavBar from '../components/navBar';
import ScrollRevealContainer from '../components/ScrollRevealComponent';
import { useState } from 'react';
import swal from 'sweetalert';
import axios from 'axios';


    const Contact = () => {
      const [name,setName]=useState("");
      const[email,setEmail]=useState("");
      const[contactno,setContactNo]=useState("");
      const[message,setMessage]=useState("");

      
    function sendData(e){
      e.preventDefault();

      if (
          !name ||
          !email ||
          !message
        ) {
          swal("Error!", "Please fill in all the fields!", "error");
          return;
        }

        
      const newContactus={
          name,
         email,
         contactno,
         message,
      }
      
      console.log(newContactus);
      axios.post("http://localhost:5000/contactus/add",newContactus).then(()=>{
         swal("Success", "Your message sent!", "success");
      }).catch((err)=>{
          swal("Error", "Invalid input!", "error");
      })
  }
      return (
        <div>
          <NavBar/>
          <Row className='row-contactus'>
          <Col>
          <form onSubmit={sendData}>
          <h3>Send your Suggestions,inquiries and Feedback</h3>
          <p>Your email address will not be published.</p>
          
            <input type='text' name='Name' id='' placeholder='Enter Your Name'  
            onChange={(e)=>{
                        setName(e.target.value);
                    }}/>
            <input type='email' name='Email' id='' placeholder='example@gmail.com' 
            onChange={(e)=>{
                        setEmail(e.target.value);
                    }}/>
            <input type='phone' name='Contact No' id='' placeholder='+94'
            onChange={(e)=>{
              setContactNo(e.target.value);
          }}
            />
          <textarea name='message' id='' cols="30" rows="4" placeholder='Type Here.......'
          onChange={(e)=>{
            setMessage(e.target.value);
        }}
          />
          <button type='submit' className='sendm'>Send</button>
          </form> 
          </Col>
          </Row>
         
          <Footer/>
        </div>
      );
    }

    export default Contact;