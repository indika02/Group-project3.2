import React from "react";
import { Container, Table } from "react-bootstrap";
import './stdreg.css';
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";

export default function StdDetails(){

    const [studentdetails, setStudentdetails] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchStudentDetails();
  }, []);

  const fetchStudentDetails = async () => {
    try {
      const response = await axios.get("http://localhost:5000/user/");
      const filteredStudents = response.data.filter(
        (studentdetail) => studentdetail.usertype === "student"
      );
      setStudentdetails(filteredStudents);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch Student Details:", error);
    }
  };
    return(
        <div>
            <Container>
            <Link to="/stdRegForm" className="reg">
             <button className="savebtn"><FaPlus/></button>
             </Link>
             <div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Enrollment No.</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Class</th>
                    <th colSpan={4}>Subjects</th>
                    
                  </tr>
                </thead>
                <tbody>
                  {studentdetails.map((studentdetail) => (
                    <tr key={studentdetail._id}>
                      <td>{studentdetail.index}</td>
                      <td>{studentdetail.name}</td>
                      <td>{studentdetail.age}</td>
                      <td>{studentdetail.classtype}</td>
                      <td>{studentdetail.subject1}</td>
                    <td> {studentdetail.subject2}</td>
                      <td>{studentdetail.subject3}</td>
                     <td> {studentdetail.subject4}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
       </div>
            </Container>
        </div>
    )
}