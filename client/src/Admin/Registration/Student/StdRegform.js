
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { Col,Row } from 'react-bootstrap';
import './stdreg.css';
import swal from 'sweetalert';
import QRCode from 'qrcode.react';

export default function StdRegform() {

    const [index,setIndex]=useState("");
    const [name,setName]=useState("");
    const [dob,setDob]=useState("");
    const [age,setAge]=useState("");
    const [gender,setGender]=useState("");
    const[contactpersonal,setContactpersonal]=useState("");
    const[contacthome,setContactHome]=useState("");
    const[address,setAddress]=useState("");
    const[email,setEmail]=useState("");
    const[classtype,setClasstype]=useState("");
    const[batchyear,setbatchYear]=useState("");
    const [Lname1,setLName1]=useState("");
    const[subject1,setSubject1]=useState("");
    const [Lname2,setLName2]=useState("");
    const[subject2,setSubject2]=useState("");
    const [Lname3,setLName3]=useState("");
    const[subject3,setSubject3]=useState("");
    const [Lname4,setLName4]=useState("");
    const[subject4,setSubject4]=useState("");
    const [subject,setSubject]=useState([]);
    const [Lname,setLName]=useState([]);
    const[usertype,setUsertype]=useState("student");
    
   

    function sendData(e){
        e.preventDefault();

        const newStudent={
            index,
            name,
            dob,
            age,
            gender,
            contactpersonal,
            contacthome,
            address,
            email,
            classtype,
            batchyear,
            Lname1,
            subject1,
            Lname2,
            subject2,
            Lname3,
            subject3,
            Lname4,
            subject4,
            usertype,
        }
        
        console.log(newStudent);
        axios.post("http://localhost:5000/user/add",newStudent).then(()=>{
           swal("Success", "Registration Successful!", "success");
           
        }).catch((err)=>{
            swal("Error", "Invalid Data Input!", "error");
        })
    }

    useEffect(()=>{
        axios.get('http://localhost:5000/subject/').then((response)=>{
            setSubject(response.data);
            setLName(response.data);
        }).catch((error)=>{
            console.log('Error fetching data.',error);
        });
    },[]);
    const qrCodeData =  `${index}\n${name}\n${classtype}\n${subject1}\n${subject2}\n${subject3}\n${subject4}\n${batchyear}`;
return (
    <div className='stdreg'>
    <h4>Student Registration Form</h4>
        <form onSubmit={sendData}>
        <div className='form-group'>
                <label for="index">Student's Enrollement No</label>
                <input type='text' className='form-control' id='index' placeholder="Enter Student's Enrollement No"
                onChange={(e)=>{
                    setIndex(e.target.value);
                }}
                />
            </div>
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
                    setContactpersonal(e.target.value);
                }}
                />
            </div>
                    </Col>
                    <Col>
                    <div className='form-group'>
                <label for="Contactno">Contact No(Home)</label>
                <input type='text' className='form-control' id='contacthome' placeholder="Contact Number(Home)"
                onChange={(e)=>{
                    setContactHome(e.target.value);
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
                    setAddress(e.target.value);
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
                    setEmail(e.target.value);
                }}
                />
            </div>
                    </Col>
                </Row>
                <Row>
                <Col>
                <div className='form-group'>
                    <label for="type" className='type'>Class Type</label>
                    <select className="form-select form-control" aria-label="Default select example"
                     onChange={(e)=>{
                        setClasstype(e.target.value);
                    }}
                    >
                        <option selected>Class type</option>
                        <option value="grade06">Grade 06</option>
                        <option value="grade07">Grade 07</option>
                        <option value="grade08">Grade 08</option>
                        <option value="grade09">Grade 09</option>
                        <option value="grade10">Grade 10</option>
                        <option value="grade11">Grade 11</option>
                        <option value="A/L">A/L</option>
                    </select>
                </div>
                </Col>
                <Col>
                <div className='form-group'>
                    <label for="batch" className='batch'>A/L Batch Year</label>
                    <select className="form-select form-control" aria-label="Default select example"
                    onChange={(e)=>{
                        setbatchYear(e.target.value);
                    }}
                    >
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>
                        <option value="2027">2027</option>
                        <option value="2028">2028</option>
                        <option value="2029">2029</option>
                    </select>
                </div>
                </Col>
            </Row>
                    <div className='form-group'>
                <label for="subjects">Subjects</label>
                <Row>
                <Col>
                <div className='form-group'>
                    <select id="country" className="form-select form-control" 
                    onChange={(e)=>{
                        setLName1(e.target.value);
                    }}
                    >
                        <option value="">Lectuer</option>
                        {Lname.map((item) => (
                            <option key={item._id} value={item.Lname}>{item.Lname}</option>
                        ))}
                    </select>
                    </div>
                    </Col>
                    <Col>
                    <div className='form-group'>
                    <select id="country" className="form-select form-control"
                    onChange={(e)=>{
                        setSubject1(e.target.value);
                    }}
                    >
                        <option value="">Subject 1</option>
                        {subject.map((item) => (
                            <option key={item._id} value={item.subject}>{item.subject}</option>
                        ))}
                    </select>
                    </div>
                </Col>
                <Col>
                <div className='form-group'>
                    <select id="country" className="form-select form-control"
                    onChange={(e)=>{
                        setLName2(e.target.value);
                    }}
                    >
                        <option value="">Lectuer</option>
                        {Lname.map((item) => (
                            <option key={item._id} value={item.Lname}>{item.Lname}</option>
                        ))}
                    </select>
                    </div>
                    </Col>
                    <Col>
                    <div className='form-group'>
                    <select id="country" className="form-select form-control" 
                    onChange={(e)=>{
                        setSubject2(e.target.value);
                    }}
                    >
                        <option value="">Subject 2</option>
                        {subject.map((item) => (
                            <option key={item._id} value={item.subject}>{item.subject}</option>
                        ))}
                    </select>
                    </div>
                    </Col>
                </Row>
                <Row className='sub'>
                <Col>
                <div className='form-group'>
                    <select id="country" className="form-select form-control"
                    onChange={(e)=>{
                        setLName3(e.target.value);
                    }}
                    >
                        <option value="">Lectuer</option>
                        {Lname.map((item) => (
                            <option key={item._id} value={item.Lname}>{item.Lname}</option>
                        ))}
                    </select>
                    </div>
                    </Col>
                    <Col>
                    <div className='form-group'>
                    <select id="country" className="form-select form-control"
                    onChange={(e)=>{
                        setSubject3(e.target.value);
                    }}
                    >
                        <option value="">Subject 3</option>
                        {subject.map((item) => (
                            <option key={item._id} value={item.subject}>{item.subject}</option>
                        ))}
                    </select>
                    </div>
                </Col>
                <Col>
                <div className='form-group'>
                    <select id="country" className="form-select form-control"
                    onChange={(e)=>{
                        setLName4(e.target.value);
                    }}
                    >
                        <option value="">Lectuer</option>
                        {Lname.map((item) => (
                            <option key={item._id} value={item.Lname}>{item.Lname}</option>
                        ))}
                    </select>
                    </div>
                    </Col>
                    <Col>
                    <div className='form-group'>
                    <select id="country" className="form-select form-control"
                    onChange={(e)=>{
                        setSubject4(e.target.value);
                    }}
                    >
                        <option value="">Subject 4</option>
                        {subject.map((item) => (
                            <option key={item._id} value={item.subject}>{item.subject}</option>
                        ))}
                    </select>
                    </div>
                    </Col>
                </Row>
            </div>      
            <div className='qr-code-container'>
                <hr></hr>
        <QRCode value={qrCodeData} size={200} />
      </div>
        
            <button type='submit' className='savebtn'>Save</button>
        </form>
    </div>

);
}
    