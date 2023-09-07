import React from "react";
import { Row,Col } from "react-bootstrap";
import { useState,useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import './sub.css'

export default function Addsub(){

    const [Lname,setLName]=useState("");
    const [classtype,setClasstype]=useState("");
    const[subject,setSubject]=useState("");
    const[email,setEmail]=useState("");

    function sendData(e){
        e.preventDefault();

        const newSubject={
            Lname,
            classtype,
            subject,
            email
        }

        console.log(newSubject);
        axios.post("http://localhost:5000/subject/add",newSubject).then(()=>{
           swal("Success", "Adding Successful!", "success");
        }).catch((err)=>{
            swal("Error", "Invalid Data Input!", "error");
        })

        e.target.reset();
    }
    return(
        <div className="subjects">
            <h4>Subjects</h4>
            <form onSubmit={sendData}>
                <Row>
                    <Col>
                    <div className='form-group'>
                    <label for="lecturer">Lecturer name</label>
                    <input type='text' className='form-control' id='index'
                    onChange={(e)=>{
                        setLName(e.target.value);
                    }}
                    />
                </div>
                    </Col>
                </Row>
                <Col>
                <div className='form-group'>
                <label for="lecturer">Email Address</label>
                <input type='email' className='form-control' id='index'
                onChange={(e)=>{
                    setEmail(e.target.value);
                }}
                />
            </div>
                </Col>
                <Row>
                    <Col>
                    <div className='form-group'>
                    <label for="type" className='type'>Type</label>
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
                </Row>
                <Row>
                    <Col>
                    <div className='form-group'>
                    <label for="type" className='type'>Subject</label>
                    <input type='text' className='form-control' id='sub1' placeholder="Subject"
                    onChange={(e)=>{
                        setSubject(e.target.value);
                    }}
                    />
                    </div>
                    </Col>
                    </Row>
                    <button type='submit' className='savebtn'>Save</button>
            </form>
        </div>
    )
}