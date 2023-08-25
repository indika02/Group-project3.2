import React, { useState,useEffect } from "react";
import { Row,Col } from "react-bootstrap";
import './adminhome.css';
import { FaBook, FaCalendar, FaUser, FaUserPlus, FaUsers } from "react-icons/fa";

export default function Adminhome(){

    const[stdcount,setStdcount]=useState("");
    const [subcount,setSubcount]=useState("");
    const[accounts,setAccounts]=useState("");

    useEffect(() => {
        fetch("http://localhost:5000/user/total/count")
            .then(response => response.json())
            .then(json => setStdcount(json.count)) 
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    useEffect(() => {
        fetch("http://localhost:5000/subject/total/count")
            .then(response => response.json())
            .then(json => setSubcount(json.count)) 
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    useEffect(() => {
        fetch("http://localhost:5000/account/total/count")
            .then(response => response.json())
            .then(json => setAccounts(json.count)) 
            .catch(error => console.error("Error fetching data:", error));
    }, []);
    return(
        <div>
        <Row>
        <Col>
        <div className="stdcount">
        <p><FaUsers/> Total Students <br></br>{stdcount}</p>
        </div>
        </Col>
        <Col>
        <div className="classcount">
        <p><FaBook/>   Total Classes <br></br>{subcount}</p>
        </div>
        </Col>
        <Col>
        <div className="lecturercount">
        <p><FaUser/> Total Lecturers <br></br>{subcount}</p>
        </div>
        </Col>
        <Col>
        <div className="account">
        <p><FaUserPlus/> User Accounts <br></br>{accounts}</p>
        </div>
        </Col>
        </Row>
        </div>
    );
}