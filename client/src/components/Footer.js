import React from 'react';
import './Footer.css';
import 'boxicons';



const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer-content'>
    <ul className='footer-links'>
      <h4><a href='#'>www.siyathra.lk</a></h4>
      <li><a href='#'>Home</a></li>
      <li><a href='#'>Classes</a></li>
      <li><a href='#'>Aboutus</a></li>
      <li><a href='#'>Feedback</a></li>
      <li><a href='#'>Contactus</a></li>
    </ul>
    <ul className='footer-links'>
      <h4>Important Links</h4>
      <li><a href='#'>University of Sri Jayawardhanapura</a></li>
      <li><a href='#'>CA Sri Lanka</a></li>
      <li><a href='#'>IBSL Sri Lanka</a></li>
      <li><a href='#'>University of Kelaniya</a></li>
      <li><a href='#'>University of Peradeniya</a></li>
    </ul>
    <ul className='footer-links'>
      <h4>Social Media</h4>
      <a href='#'><i class='bx bxl-facebook-circle bx-sm'></i></a>
      <a href='#'><i class='bx bxl-youtube bx-sm' ></i></a>
      <a href='#'><i class='bx bxl-whatsapp bx-sm' ></i></a>
    </ul>
    </div>
    <hr></hr>
    <p>2023 <i class='bx bx-copyright'></i> All rights reserved by Siyathra Higher Eduacation Institute Polpithigama, Kurunegala</p>
  </div>
  );
}

export default Footer;
