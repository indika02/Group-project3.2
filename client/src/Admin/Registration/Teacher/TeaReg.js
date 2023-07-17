import React, { useState } from 'react';
import axios from 'axios';
import { Col,Row } from 'react-bootstrap';
import './teareg.css';
import swal from 'sweetalert';
import bcrypt from 'bcryptjs';

export default function TeaReg() {
    
  
    const [name,setName]=useState("");
    const[address,setAddress]=useState("");
    const[contactpersonal,setContactpersonal]=useState("");
    const[email,setEmail]=useState("");
    const[qualifications,setQualifications]=useState("");
    const[usertype,setUsertype]=useState("teacher");
    const[dpwd,setDpwd]=useState("1234");

    function sendData(e){
        e.preventDefault();

        if (
            !name ||
            !address ||
            !contactpersonal ||
            !email ||
            !qualifications
          ) {
            swal("Error!", "Please fill in all the fields!", "error");
            return;
          }

          
        const newTeacher={
            name,
            address,
            contactpersonal,
            email,
            qualifications,
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

                   
                        <Col>
                        {/* <div class="mb-3">
                            <label for="formFileMultiple" class="form-label">Upload the Profile Photo</label>
                            <input class="form-control" type="file" id="formFileMultiple" multiple/>
                        </div> */}
                        </Col>
                
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
                <div className='form-group'>
                        <label for="usertype" className='usertype'>User Type</label>
                        <select className="form-select form-control" aria-label="Default select example">
                            <option selected>User Type</option>
                            <option value="teacher">Teacher</option>
                            <option value="student">Student</option>
                        </select>
                    </div>
                    <button type='submit' className='savebtn'>Save</button>
                </form>
        </div>
    )
}