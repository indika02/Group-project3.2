import React from "react";
import { Row,Col, Container } from "react-bootstrap";
import Iframe from 'react-iframe';
import './map.css';
import { FaFacebook, FaInstagram, FaTelegram, FaYoutube } from "react-icons/fa";
export default function Map(){
    return(
        <div className="map">
        <Container>
        <Row className='map'>
        <Col md={6}>
        <p>We Always<br/> Ready to Hear<br/> From You</p>
        
        </Col>
        <Col md={6}>
        <Iframe
        url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.196316816196!2d80.3274750747405!3d7.874516305991469!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afcc527b28feeb7%3A0x65375ad7e4c5bfdc!2sSiyathra%20Education%20Institute!5e0!3m2!1sen!2slk!4v1686557613874!5m2!1sen!2slk"
        width="100%"
        height="350px"
        frameborder="0"
        style={{ border: 0 }}
        allowfullscreen=""
        aria-hidden="false"
        tabindex="0"
      />
        </Col>
       
      </Row>
      </Container>
        </div>
    )
}