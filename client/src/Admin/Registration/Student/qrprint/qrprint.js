import React, { useState } from 'react';
import axios from 'axios';
import { Row, Col, Image, Button } from 'react-bootstrap';
import swal from 'sweetalert';
import { FaPrint, FaQrcode, FaSearch } from 'react-icons/fa';
import './qr.css'

export default function Qrprint() {
  const [userProfiledata, setUserProfiledata] = useState(null);
  const [index, setIndex] = useState('');

  const handleFetchQRCode = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/user/userdetails/${index}`);
      setUserProfiledata(response.data);
      console.log(response.data)
    } catch (error) {
        swal("Error", "Invalid Registration Number!", "error");
      console.error('Error fetching QR code:', error);
    }
  };

  const handlePrintQRCode = () => {
    const downloadLink = document.createElement('a');
      downloadLink.href =   userProfiledata?.qrCode;
      downloadLink.download = `${userProfiledata?.index}_qr_code.png`;
      downloadLink.style.display = 'none';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
  
  }
  return (
    <div>
      <Row className='qrc'>
        <Col>
        <Row className='qrc2'>
        <Col sm={8}>
        <input
        type="text"
        className="form-control"
        placeholder="Enrollment No."
        value={index}
        onChange={(e) => setIndex(e.target.value)}/>
        </Col>
        <Col sm={4}>
        <Button variant="success" className='searchqr' onClick={handleFetchQRCode}>
            <FaSearch/> Search
          </Button>
        </Col>
        <Row>
        <Col>
        <div className='qrcodead'>
        <Image src={userProfiledata?.qrCode} fluid style={{ width: '300px', height: '300px' }} className='qrimg' />
        <Button variant="primary" className="printqr" onClick={handlePrintQRCode}>
          <FaPrint/> Print
        </Button>
      </div>
        </Col>
        </Row>
        </Row>
        
         
          
        </Col>
      </Row>
    </div>
  );
}
