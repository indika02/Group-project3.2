import React from "react";
import { Row,Col } from "react-bootstrap";
import { useState,useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";

export default function Addsub(){

    const [Lname,setLName]=useState("");
    const [classtype,setClasstype]=useState("");
    const[subject1,setSubject1]=useState("");
    const[subject2,setSubject2]=useState("");
    const[subject3,setSubject3]=useState("");

    function sendData(e){
        e.preventDefault();

        const newSubject={
            Lname,
            classtype,
            subject1,
            subject2,
            subject3
        }

        console.log(newSubject);
        axios.post("http://localhost:5000/subject/add",newSubject).then(()=>{
           swal("Success", "Adding Successful!", "success");
        }).catch((err)=>{
            swal("Error", "Invalid Data Input!", "error");
        })
    }
    return(
        <div>
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
                    <label for="type" className='type'>Subject 1</label>
                    <input type='text' className='form-control' id='sub1' placeholder="Subject1"
                    onChange={(e)=>{
                        setSubject1(e.target.value);
                    }}
                    />
                    </div>
                    </Col>
                    <Col>
                    <div className='form-group'>
                    <label for="type" className='type'>Subject 2</label>
                    <input type='text' className='form-control' id='sub2' placeholder="Subject2"
                     onChange={(e)=>{
                        setSubject2(e.target.value);
                    }}
                    />
                    </div>
                    </Col>
                    <Col>
                    <div className='form-group'>
                    <label for="type" className='type'>Subject 2</label>
                    <input type='text' className='form-control' id='sub3' placeholder="Subject3"
                     onChange={(e)=>{
                        setSubject3(e.target.value);
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