import React, { useState } from 'react';
import axios from 'axios';
import { Col,Row } from 'react-bootstrap';
import './teareg.css';

export default function TeaReg() {
    

    return(
        <div>
            <form>
                <div className='form-group'>
                    <label for="Lname">Lecturer Name</label>
                    <input type='text' className='form-control' id='Lname' placeholder="Enter Lecturer's Name"/>
                </div>
                <div className='form-group'>
                    <label for="Laddress">Lecturer's Address</label>
                    <input type='text' className='form-control' id='Laddress' placeholder="Enter Lecturer's Address"/>
                </div>
                <Row>
                    <Col>
                    <div className='form-group'>
                    <label for="Lcontactno">Lecturer's Contact No</label>
                    <input type='text' className='form-control' id='Lcontactno' placeholder="Enter Lecturer's Contact No"/>
                </div>
                    </Col>
                    <Col>
                    <div className='form-group'>
                    <label for="Lemail">Lecturer's Email Address</label>
                    <input type='text' className='form-control' id='Lemail' placeholder="Enter Lecturer's Email Address"/>
                    </div>
                    </Col>
                </Row>
                <div className='form-group'>
                    <label for="Lqua">Lecturer's Educational Qualifications</label>
                    <input type='text' className='form-control' id='Lqua' placeholder="Enter Lecturer's Educational Qualifications"/>
                    </div>
                    <div className='form-group'>
                        <label for="type" className='type'>Class Type</label>
                        <select className="form-select form-control" aria-label="Default select example">
                            <option selected>Class type</option>
                            <option value="O/L">O/L</option>
                            <option value="A/L">A/L</option>
                            <option value="Both">Both</option>
                        </select>
                    </div>
                    <div className='form-group'>
                    <label for="subjects">Subjects</label>
                    <Row>
                    <Col>
                    <input type='text' className='form-control' id='sub1' placeholder="Subject1"/>
                    </Col>
                    <Col>
                    <input type='text' className='form-control' id='sub2' placeholder="Subject2"/>
                    </Col>
                    <Col>
                    <input type='text' className='form-control' id='sub3' placeholder="Subject3"/>
                    </Col>
                    </Row>
                </div>
                <button type='submit' className='btn btn-primary'>Save</button>
                </form>
        </div>
    )
}