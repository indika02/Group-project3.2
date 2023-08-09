import React from "react";
import { Container,Table } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";

export default function Subject(){
    const [loading, setLoading] = useState(false);
    const [Subjects, setSubjects] = useState([]);
  
    useEffect(() => {
      setLoading(true);
      fetchSubjectDetails();
    }, []);
  
    const fetchSubjectDetails = async () => {
      try {
        const response = await axios.get("http://localhost:5000/subject/");
        setSubjects(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch Subject Details:", error);
      }
    };

    return(
        <div>
              <Container>
            <Link to="/Addsub" className="reg">
             <button className=" btn btn-success savesubbtn"><FaPlus/></button>
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
                    <th>Class</th>
                    <th>Subject</th>
                    
                  </tr>
                </thead>
                <tbody>
                  {Subjects.map((subjectdetail) => (
                    <tr key={subjectdetail._id}>
                      <td>{subjectdetail.Lname}</td>
                      <td>{subjectdetail.classtype}</td>
                      <td>{subjectdetail.subject}</td>
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