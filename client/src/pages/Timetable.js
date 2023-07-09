import React from 'react';
import NavBar from '../components/navBar';
import Container from 'react-bootstrap/esm/Container';
import Footer from '../components/Footer';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Table from 'react-bootstrap/Table';
import './Timetable.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';

const Timetable = () => {
  return (
    <div className='timetable'>
      <NavBar/>
      <Container>
      <h1>Time Tables</h1>
      <h3>Date: 21st of August 2023</h3>
      <Table striped>
      <thead>
        <tr>
          <th>Lecturer's Name</th>
          <th>Subject</th>
          <th>Time</th>
          <th>Venue</th>
          <th>Theory/Re vision</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Subject</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Subject</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
        <td>3</td>
        <td>Subject</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
      </tbody>
    </Table>
        
        </Container>
        <Footer/>
    </div>
  );
}

export default Timetable;
