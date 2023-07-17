import React from "react";
import { Container, Table } from "react-bootstrap";
import './teareg.css';
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";

export default function TeacherDetails(){

    const [teacherdetails, setTeacherdetails] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchTeacherDetails();
  }, []);

  const fetchTeacherDetails = async () => {
    try {
      const response = await axios.get("http://localhost:5000/user/");
      const filteredTeachers = response.data.filter(
        (teacherdetail) => teacherdetail.usertype === "teacher"
      );
      setTeacherdetails(filteredTeachers);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch Teacher Details:", error);
    }
  };
    return(
        <div>
            <Container>
            <Link to="/TeaRegForm" className="reg">
             <button className="savebtn"><FaPlus/></button>
             </Link>
             <div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              <Table striped bordered hover className="table table-sm">
                <thead>
                  <tr>
                    <th>Lecturer Name</th>
                    <th>Contact No</th>
                    <th>Email Address</th>
                    <th>Education</th>
                    <th>Class</th>
                    
                  </tr>
                </thead>
                <tbody>
                  {teacherdetails.map((teacherdetail) => (
                    <tr key={teacherdetail._id}>
                      <td>{teacherdetail.name}</td>
                      <td>{teacherdetail.contactpersonal}</td>
                      <td>{teacherdetail.email}</td>
                      <td>{teacherdetail.qualifications}</td>
                      <td>{teacherdetail.classtype}</td>
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