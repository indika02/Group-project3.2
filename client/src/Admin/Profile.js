import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import profile from '../images/profile.jpg';

const ProfilePage = () => {
  // Replace the following data with actual user data or fetch it from an API
  const user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    profilePicture: '../images/profile.jpg', // Replace with the URL of the user's profile picture
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col xs={12} md={4} className="text-center">
          <Image src={profile} roundedCircle fluid style={{ width: '200px', height: '200px' }} />
          <h3 className="mt-3">{user.name}</h3>
        </Col>
        <Col xs={12} md={8}>
          <h5>Email: {user.email}</h5>
          {/* Add more user information here as needed */}
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
