    import React, { useState } from 'react';
    import axios from 'axios';
    import { Col,Row } from 'react-bootstrap';
    import './stdreg.css';

    export default function StdReg() {

        const [name,setName]=useState("");
        const [dob,setDob]=useState("");
        const [age,setAge]=useState("");
        const [gender,setGender]=useState("");

        function sendData(e){
            e.preventDefault();

            const newStudent={
                name,
                dob,setDob,
                age,
                gender
            }
            
            axios.post("http://localhost:5000/user/add",newStudent).then(()=>{
                alert("Student Added")
            }).catch((err)=>{
                alert(err)
            })
        }
    return (
        <div>
        
            <form onSubmit={sendData}>
                <div className='form-group'>
                    <label for="name">Student's Full Name</label>
                    <input type='text' className='form-control' id='name' placeholder="Enter Student's Name"
                    onChange={(e)=>{
                        setName(e.target.value);
                    }}
                    />
                </div>
                <Row>
                    <Col>
                    <div className='form-group'>
                    <label for="dob">Date of Birth</label>
                    <input type='date' className='form-control' id='dob' placeholder='Enter the Date of Birth'
                    onChange={(e)=>{
                        setDob(e.target.value);
                    }}
                    />
                </div>
                    </Col>
                    <Col>
                    <div className='form-group'>
                        <label for="age" className='age'>Age</label>
                        <select className="form-select form-control" aria-label="Default select example" 
                        onChange={(e)=>{
                        setAge(e.target.value);
                    }}>
                            <option selected>Select The Age</option>
                            <option value="22">22</option>
                            <option value="21">21</option>
                            <option value="20">20</option>
                            <option value="19">19</option>
                            <option value="18">18</option>
                            <option value="17">17</option>
                            <option value="16">16</option>
                            <option value="15">15</option>
                        </select>
                    </div>
                
                    </Col>
                </Row>
                
                <Row>
                    <Col>
                    <div className='form-group'>
                        <label for="gender" className='gender'>Gender</label>
                        <select className="form-select form-control" aria-label="Default select example" 
                        onChange={(e)=>{
                        setGender(e.target.value);
                    }}>
                            <option selected>Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    </Col>
                </Row>
            

                    <Row>
                        <Col>
                        <div className='form-group'>
                    <label for="Contactno">Contact No(Personal)</label>
                    <input type='text' className='form-control' id='contact' placeholder="Contact Number(Personal)"
                    onChange={(e)=>{
                        setName(e.target.value);
                    }}
                    />
                </div>
                        </Col>
                        <Col>
                        <div className='form-group'>
                    <label for="Contactno">Contact No(Home)</label>
                    <input type='text' className='form-control' id='contacthome' placeholder="Contact Number(Home)"
                    onChange={(e)=>{
                        setName(e.target.value);
                    }}
                    />
                </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <div className='form-group'>
                    <label for="address">Address</label>
                    <input type='text' className='form-control' id='address' placeholder="address"
                    onChange={(e)=>{
                        setName(e.target.value);
                    }}
                    />
                </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <div className='form-group'>
                    <label for="email">Email Address</label>
                    <input type='email' className='form-control' id='email' placeholder="Email Address"
                    onChange={(e)=>{
                        setName(e.target.value);
                    }}
                    />
                </div>
                        </Col>
                    </Row>
                    <Row>
                    <Col>
                    <div className='form-group'>
                        <label for="type" className='type'>Class Type</label>
                        <select className="form-select form-control" aria-label="Default select example">
                            <option selected>Class type</option>
                            <option value="O/L">O/L</option>
                            <option value="A/L">A/L</option>
                        </select>
                    </div>
                    </Col>
                </Row>
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
                    <Col>
                    <input type='text' className='form-control' id='sub4' placeholder="Subject4"/>
                    </Col>
                    </Row>
                    
                </div>
                        
            
                <button type='submit' className='btn btn-primary'>Save</button>
            </form>
        </div>
    
    );
    }

