import React, { useState, useEffect } from "react";
import { Container, Table,Col,Row } from "react-bootstrap";
import { FaEdit, FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

export default function StdDetails() {
  const [studentdetails, setStudentdetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedClassType, setSelectedClassType] = useState('');
  const [selectedBatchYear, setSelectedBatchYear] = useState('');
  const [selectedEnrollmentNo, setSelectedEnrollmentNo] = useState('');
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

  return (
    <div className="stdfilter">
      <Container>
        <Link to="/stdRegForm" className="reg">
          <button className="btn btn-success stdregbtn"><FaUserPlus/> Student Enrollment</button>
        </Link>
        <Row>
        <Col sm={3}>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Enrollment No."
          value={selectedEnrollmentNo}
          onChange={(e) => setSelectedEnrollmentNo(e.target.value)}
        />
      </Col>
        <Col sm={3}>
        <select
          className="form-select form-control"
          onChange={(e) => {
            setSelectedClassType(e.target.value);
          }}
        >
          <option value="">All Class Types</option>
          <option value="grade06">Grade 06</option>
          <option value="grade07">Grade 07</option>
          <option value="grade08">Grade 08</option>
          <option value="grade09">Grade 09</option>
          <option value="grade10">Grade 10</option>
          <option value="grade11">Grade 11</option>
          <option value="A/L">A/L</option>
         
        </select>
        </Col>
        <Col sm={3}>
        <select
          className="form-select form-control"
          onChange={(e) => {
            setSelectedBatchYear(e.target.value);
          }}
        >
          <option value="">All Batch Years</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
          <option value="2026">2026</option>
          <option value="2027">2027</option>
          <option value="2028">2028</option>
          <option value="2029">2029</option>
        </select>
        </Col>
        </Row>
        
        
        <div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              <Table striped bordered hover className="table table-sm table">
                <thead>
                  <tr>
                    <th>Enrollment No.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Class</th>
                    <th>Batch</th>
                    <th colSpan={4}>Subjects</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {studentdetails.filter(studentdetail => 
                    (selectedClassType === '' || studentdetail.classtype === selectedClassType) &&
                    (selectedBatchYear === '' || studentdetail.batchyear === selectedBatchYear) &&
                    (selectedEnrollmentNo === '' || studentdetail.index === selectedEnrollmentNo)
                  ).map((studentdetail) => (
                    <tr key={studentdetail._id}>
                      <td>{studentdetail.index}</td>
                      <td>{studentdetail.name}</td>
                      <td>{studentdetail.email}</td>
                      <td>{studentdetail.classtype}</td>
                      <td>{studentdetail.batchyear}</td>
                      <td>{studentdetail.subject1}</td>
                      <td>{studentdetail.subject2}</td>
                      <td>{studentdetail.subject3}</td>
                      <td>{studentdetail.subject4}</td>
                      <td><FaEdit/></td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
        </div>
      </Container>
    </div>
  );
}
