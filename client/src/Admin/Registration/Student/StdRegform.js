
import React, { useState } from 'react';
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
    const[subject1,setSubject1]=useState("");
    const[subject2,setSubject2]=useState("");
    const[subject3,setSubject3]=useState("");
    const[subject4,setSubject4]=useState("");
    const[usertype,setUsertype]=useState("student");
    const [printVisible, setPrintVisible] = useState(false);
    
   

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
            subject1,
            subject2,
            subject3,
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

    const qrCodeData = `${index}\n${name}\n${email}\n${subject1}\n${subject2}\n${subject3}\n${batchyear}`;
return (
    <div>
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
                        <option value="O/L">O/L</option>
                        <option value="A/L">A/L</option>
                    </select>
                </div>
                </Col>
                <Col>
                <div className='form-group'>
                    <label for="batch" className='batch'>Batch Year</label>
                    <select className="form-select form-control" aria-label="Default select example"
                    onChange={(e)=>{
                        setbatchYear(e.target.value);
                    }}
                    >
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>
                    </select>
                </div>
                </Col>
            </Row>
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
                <Col>
                <input type='text' className='form-control' id='sub4' placeholder="Subject4"
                 onChange={(e)=>{
                    setSubject4(e.target.value);
                }}
                />
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
    import React, { useState } from 'react';
    import axios from 'axios';
    import { Col,Row } from 'react-bootstrap';
    import './stdreg.css';
    import swal from 'sweetalert';

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
        const[Subject1,setSubject1]=useState("");
        const[Subject2,setSubject2]=useState("");
        const[Subject3,setSubject3]=useState("");
        const[Subject4,setSubject4]=useState("");
        const[usertype,setUsertype]=useState("");

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
                Subject1,
                Subject2,
                Subject3,
                Subject4,
                usertype
            }
            
            axios.post("http://localhost:5000/user/add",newStudent).then(()=>{
               swal("Success", "Registration Successful!", "success");
            }).catch((err)=>{
                swal("Error", "Invalid Data Input!", "error");
            })
        }
    return (
        <div>
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
                    <Col>
                    <input type='text' className='form-control' id='sub4' placeholder="Subject4"
                     onChange={(e)=>{
                        setSubject4(e.target.value);
                    }}
                    />
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
    
    );
