    import React, { useState,useEffect } from "react";
    import './results.css';
    import { Container,Row,Col } from "react-bootstrap";
    import axios from "axios";


    export default function Results(){
        const [subject,setSubject]=useState([]);
        const [Lname,setLName]=useState([]);

        useEffect(()=>{
            axios.get('http://localhost:5000/subject/').then((response)=>{
                setSubject(response.data);
                setLName(response.data);
            }).catch((error)=>{
                console.log('Error fetching data.',error);
            });
        },[]);
        return(
            <Container>
            <div className="Resutls">
                <Row>
                    <Col>
                    <div className='form-group'>
                        <label for="class" className='class'>Class Type</label>
                        <select className="form-select form-control inputbox" aria-label="Default select example">
                            <option value="O/L">O/L</option>
                            <option value="A/L">A/L</option>
                            <option value="Both">Both</option>
                        </select>
                    </div>
                    </Col>
                    <Col>
                    <div className='form-group'>
                        <label for="batch" className='batch'>Batch Year</label>
                        <select className="form-select form-control" aria-label="Default select example">
                            <option value="2023">2023</option>
                            <option value="2024">2024</option>
                            <option value="2025">2025</option>
                            <option value="2026">2026</option>
                            <option value="2027">2027</option>
                            <option value="2028">2028</option>
                            <option value="2029">2029</option>
                            <option value="2030">2030</option>
                        </select>
                    </div>
                    </Col>
                    <Col>
                    <div className='form-group'>
                    <label for="Lname">Lectuer Name</label>
                    <select id="country" className="form-select form-control">
                        <option value="">Select the Lectuer</option>
                        {Lname.map((item) => (
                            <option key={item._id} value={item.Lname}>{item.Lname}</option>
                        ))}
                    </select>
                    </div>
                    </Col>
                    <Col>
                    <div className='form-group'>
                    <label for="Lname">Select the Subject</label>
                    <select id="country" className="form-select form-control">
                        <option value="">Select the Subject</option>
                        {subject.map((item) => (
                            <option key={item._id} value={item.subject}>{item.subject}</option>
                        ))}
                    </select>
                    </div>
                    </Col>
                </Row>
            </div>
            </Container>
        );
    }