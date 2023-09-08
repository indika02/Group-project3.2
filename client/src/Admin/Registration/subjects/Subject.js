import React, { useState, useEffect } from "react";
import { Container, Table ,Row,Col,Image,Button} from "react-bootstrap";
import { FaEdit, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Subject() {
  const [loading, setLoading] = useState(false);
  const [Subjects, setSubjects] = useState([]);
  const [selectedClassType, setSelectedClassType] = useState('');

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

  return (
    <div className="filter">
      <Container>
        <Link to="/Addsub" className="reg">
          <button className=" btn btn-success savesubbtn"><FaEdit /> New Classes</button>
        </Link>
        <Row>
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
        <option value="O/L">O/L</option>
        <option value="A/L">A/L</option>         
      </select>
        </Col>
        </Row>
      
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
                  {Subjects.filter(subject =>
                    selectedClassType === '' || subject.classtype === selectedClassType
                  ).map((subjectdetail) => (
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
  );
}
