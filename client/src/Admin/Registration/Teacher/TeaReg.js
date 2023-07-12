import React, { useState } from 'react';
import axios from 'axios';
import { Col,Row } from 'react-bootstrap';
import './teareg.css';
import swal from 'sweetalert';

export default function TeaReg() {
    
  
    const [name,setName]=useState("");
    const[address,setAddress]=useState("");
    const[contactpersonal,setContactpersonal]=useState("");
    const[email,setEmail]=useState("");
    const[qualifications,setQualifications]=useState("");
    const[classtype,setClasstype]=useState("");
    const[subject1,setSubject1]=useState("");
    const[subject2,setSubject2]=useState("");
    const[subject3,setSubject3]=useState("");
    const[usertype,setUsertype]=useState("");

    function sendData(e){
        e.preventDefault();

        const newTeacher={
            name,
            address,
            contactpersonal,
            email,
            classtype,
            qualifications,
            subject1,
            subject2,
            subject3,
            usertype
        }
        
        console.log(newTeacher);
        axios.post("http://localhost:5000/user/add",newTeacher).then(()=>{
           swal("Success", "Registration Successful!", "success");
        }).catch((err)=>{
            swal("Error", "Invalid Data Input!", "error");
        })
    }
    return(
        <div className='TeaReg'>
            <h4>Teacher Registration From</h4>
            <form onSubmit={sendData}>
                <div className='form-group'>
                    <label for="Lname">Lecturer Name</label>
                    <input type='text' className='form-control' id='Lname' placeholder="Enter Lecturer's Name"
                     onChange={(e)=>{
                        setName(e.target.value);
                    }}
                    />
                </div>
                <div className='form-group'>
                    <label for="Laddress">Lecturer's Address</label>
                    <input type='text' className='form-control' id='Laddress' placeholder="Enter Lecturer's Address"
                     onChange={(e)=>{
                        setAddress(e.target.value);
                    }}
                    />
                </div>
                <Row>
                    <Col>
                    <div className='form-group'>
                    <label for="Lcontactno">Lecturer's Contact No</label>
                    <input type='text' className='form-control' id='Lcontactno' placeholder="Enter Lecturer's Contact No"
                     onChange={(e)=>{
                        setContactpersonal(e.target.value);
                    }}
                    />
                </div>
                    </Col>
                    <Col>
                    <div className='form-group'>
                    <label for="Lemail">Lecturer's Email Address</label>
                    <input type='text' className='form-control' id='Lemail' placeholder="Enter Lecturer's Email Address"
                     onChange={(e)=>{
                        setEmail(e.target.value);
                    }}
                    />
                    </div>
                    </Col>
                </Row>
                <div className='form-group'>
                    <label for="Lqua">Lecturer's Educational Qualifications</label>
                    <input type='text' className='form-control' id='Lqua' placeholder="Enter Lecturer's Educational Qualifications"
                     onChange={(e)=>{
                        setQualifications(e.target.value);
                    }}
                    />
                    </div>
                    <div className='form-group'>
                        <label for="type" className='type'>Class Type</label>
                        <select className="form-select form-control" aria-label="Default select example"
                         onChange={(e)=>{
                            setClasstype(e.target.value);
                        }}
                        >
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
                    <input type='text' className='form-control' id='sub1' placeholder="Subject1"
                     onChange={(e)=>{
                        setSubject1(e.target.value);
                    }}
                    />
                    </Col>
                    <Col>
                    <input type='text' className='form-control' id='sub2' placeholder="Subject2"
                    onChange={(e)=>{
                        setSubject2(e.target.value);
                    }}
                    />
                    </Col>
                    <Col>
                    <input type='text' className='form-control' id='sub3' placeholder="Subject3"
                    onChange={(e)=>{
                        setSubject3(e.target.value);
                    }}
                    />
                    </Col>
                    </Row>
                    <Row>
                        <Col>
                        {/* <div class="mb-3">
                            <label for="formFileMultiple" class="form-label">Upload the Profile Photo</label>
                            <input class="form-control" type="file" id="formFileMultiple" multiple/>
                        </div> */}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <div className='form-group'>
                    <label for="usertype" className='usertype'>User Type</label>
                    <select className="form-select form-control" aria-label="Default select example"
                    onChange={(e)=>{
                        setUsertype(e.target.value);
                    }}
                    >
                        <option selected>User Type</option>
                        <option value="teacher">Teacher</option>
                        <option value="student">Student</option>
                    </select>
                </div>
                        </Col>
                    </Row>
                </div>
                <button type='submit' className='savebtn'>Save</button>
                </form>
        </div>
    )
}