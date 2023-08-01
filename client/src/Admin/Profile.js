import React from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import profile from '../images/profile.jpg';

const Profile = () => {
  const user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    qrCode: 'data:image/png;base64,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'
  };

  const handleDownloadQRCode = () => {
  
    const downloadLink = document.createElement('a');
    downloadLink.href = user.qrCode;
    downloadLink.download = `${user.name}_qr_code.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col xs={12} md={4} className="text-center">
          <Image src={profile} roundedCircle fluid style={{ width: '200px', height: '200px' }} />
          <h3 className="mt-3">{user.name}</h3>
          <Button variant="primary" onClick={handleDownloadQRCode}>
            Download QR Code
          </Button>
        </Col>
        <Col xs={12} md={8}>
          <h5>Email: {user.email}</h5>
          {/* Add more user information here as needed */}
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Image src={user.qrCode} fluid style={{ width: '300px', height: '300px' }} />
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
