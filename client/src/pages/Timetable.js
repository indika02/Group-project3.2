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
import { useState,useEffect } from 'react';

const Timetable = () => {
  const [date,setDate]=useState(new Date());
  const [Timetables,SetTimetables]=useState([]);
  const[loading,setLoading] = useState(false)

  useEffect(()=>{
      setLoading(true)
      fetch("http://localhost:5000/timetable").then(response=>response.json()).then(json=>SetTimetables(json)).finally(()=>{
          setLoading(false)
      })
  },[])

  useEffect(()=>{
    const timer=setInterval(()=>{
      setDate(new Date());
    },1000*60*60*24);
    return()=>{
      clearInterval(timer);
    };
  },[]);

  const formatDateToString = (date) => {
    const options = {year: 'numeric', month: 'long', day: 'numeric' ,weekday: 'long' };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div className='timetable'>
      <NavBar/>
      <Container>
      <h1>Time Tables</h1>
      <h3>Date: {formatDateToString(date)}</h3>
      {loading ? (
        <div>Loading...</div>
    ):(
        <>
        <Table striped bordered size="sm">
              <thead>
                <tr>
                <th>Date</th>
                <th>Lecturer's Name</th>
                <th>Subject</th>
                <th>Time</th>
                <th>Venue</th>
                <th>O/L or A/L</th>
                <th>Theory/Revision</th>
                </tr>
              </thead>
              <tbody>
                {Timetables.map(Timetable=>(
                        <tr key={Timetable.id}>
                        <td>{Timetable.date}</td>
                        <td>{Timetable.teacher_name}</td>
                        <td>{Timetable.subject}</td>
                        <td>{Timetable.time}</td>
                        <td>{Timetable.venue}</td>
                        <td>{Timetable.classtype}</td>
                        <td>{Timetable.type}</td>
                      </tr>
                ))}
                    
                  
                
              </tbody>
            </Table>
        </>
    )}
        
        </Container>
        <Footer/>
    </div>
  );
}

export default Timetable;
