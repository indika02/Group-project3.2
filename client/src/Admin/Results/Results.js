import React from "react";
import './results.css';
import { Container,Row,Col } from "react-bootstrap";

export default function Results(){
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
                    </select>
                </div>
                </Col>
            </Row>
            <Row>
                <Col>
                <div className='form-group'>
                <label for="Lname">Lectuer Name</label>
                <input type='text' className='form-control' id='Lname' placeholder="Enter Lecturer Name"/>
                </div>
                <div className='form-group'>
                <label for="subject">Subject</label>
                <input type='text' className='form-control' id='subject' placeholder="Enter Subject"/>
                </div>
                </Col>
            </Row>
        
        </div>
        </Container>
    );
}