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

    function sendData(e){
        e.preventDefault();

        const newSubject={
            Lname,
            classtype,
            subject
        }

        console.log(newSubject);
        axios.post("http://localhost:5000/subject/add",newSubject).then(()=>{
           swal("Success", "Adding Successful!", "success");
        }).catch((err)=>{
            swal("Error", "Invalid Data Input!", "error");
        })
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
                <Row>
                    <Col>
                    <div className='form-group'>
                    <label for="type" className='type'>Type</label>
                    <select className="form-select form-control" aria-label="Default select example"
                    onChange={(e)=>{
                        setClasstype(e.target.value);
                    }}
                    >
                        <option value="A/L">A/L</option>
                        <option value="O/L">O/L</option>
                        <option value="Both">All</option>
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