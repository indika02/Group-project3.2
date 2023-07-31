  import React, { useState, useEffect } from "react";
  import './results.css';
  import { Container, Row, Col, Table, Form } from "react-bootstrap";
  import axios from "axios";
  import { FaPlus } from "react-icons/fa";
  import swal from 'sweetalert';
  import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
  import { useRef } from "react";


  export default function Results  () {
    const [classtype, setClasstype] = useState("");
    const [batchyear, setBatchYear] = useState("");
    const [lecturerName, setLecturerName] = useState("");
    const [subject, setSubject] = useState("");
    const [Examno, setExamno] = useState("");
    const [Doe, setDoe] = useState("");
    const [students, setStudents] = useState([]);
    const [marks, setMarks] = useState([]);
    const [Allsubjects, setAllsubjects] = useState([]);
    const [AllLecturers, setAllLecturers] = useState([]);
    const [chartData, setChartData] = useState([]);


    const chartRef = useRef(null);
  
    
    const gradingSystem = [
      { range: [80, 100], grade: 'A' },
      { range: [65, 79], grade: 'B' },
      { range: [45, 64], grade: 'C' },
      { range: [30, 44], grade: 'S' },
      {range: [0,29], grade:'F'}
    ];

    
    const getGradeForMark = (mark) => {
      for (const item of gradingSystem) {
        const [min, max] = item.range;
        if (mark >= min && mark <= max) {
          return item.grade;
        }
      }
      return 'N/A'; 
    };

    const handleAddStudent = () => {
      setStudents((prevStudents) => [...prevStudents, { studentIndex: "", marks: "" }]);
      setMarks((prevMarks) => [...prevMarks, ""]);
    };

    const handleStudentIndexChange = (index, value) => {
      setStudents((prevStudents) => {
        const updatedStudents = [...prevStudents];
        updatedStudents[index].studentIndex = value;
        return updatedStudents;
      });
    };

    const handleMarkChange = (index, value) => {
      setMarks((prevMarks) => {
        const updatedMarks = [...prevMarks];
        updatedMarks[index] = value;
        return updatedMarks;
      });
    };

    const handleSubmit = async () => {
      const dataToSend = students.map((student, index) => {
        const mark = parseFloat(marks[index]);
        return {
          classType: classtype,
          batchYear: batchyear,
          lecturerName,
          subject,
          Examno,
          Doe,
          studentIndex: student.studentIndex,
          marks: mark, // Store the numeric mark in the database
          grade: getGradeForMark(mark), // Calculate and store the grade in the database
        };
      });

      console.log(dataToSend);
      try {
        const response = await axios.post("http://localhost:5000/results/add", dataToSend);
        swal("Success", "Adding Successful!", "success");
        const newChartData = getChartData();
        setChartData(newChartData);
        handleClear();
      } catch (error) {
        swal("Error", "Invalid Data Input!", "error");
      }
    };

    const handleClear = () => {
      setStudents([]);
      setMarks([]);
      setExamno("");
      setDoe("");
      setClasstype("");
      setBatchYear("");
      setLecturerName("");
      setSubject("");
    };

    useEffect(() => {
      axios.get('http://localhost:5000/subject/').then((response) => {
        setAllsubjects(response.data);
        setAllLecturers(response.data);
      }).catch((error) => {
        console.log('Error fetching data.', error);
      });
    }, []);
    
    const getChartData = () => {
      // Count the number of students with each grade
      const gradeCounts = {
        A: 0,
        B: 0,
        C: 0,
        S: 0,
        F: 0,
      };

      students.forEach((student, index) => {
        const mark = parseFloat(marks[index]);
        const grade = getGradeForMark(mark);
        gradeCounts[grade]++;
      });

      // Convert the grade counts into an array of objects for the bar chart
      const chartData = Object.entries(gradeCounts).map(([grade, count]) => ({
        grade,
        count,
      }));

      return chartData;
    };


    
    return (
      <Container>
        <div className="Resutls">
          <Row>
            <Col>
              <div className='form-group'>
                <label htmlFor="class" className='class'>Class Type</label>
                <select className="form-select form-control inputbox" aria-label="Default select example" onChange={(e) => setClasstype(e.target.value)}>
                  <option value="O/L">O/L</option>
                  <option value="A/L">A/L</option>
                  <option value="Both">Both</option>
                </select>
              </div>
            </Col>
            <Col>
              <div className='form-group'>
                <label htmlFor="batch" className='batch'>Batch Year</label>
                <select className="form-select form-control" aria-label="Default select example" onChange={(e) => setBatchYear(e.target.value)}>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                  <option value="2029">2029</option>
                  <option value="2030">2030</option>
                </select>
              </div>
            </Col>
            <Col>
              <div className='form-group'>
                <label htmlFor="Lname">Lectuer Name</label>
                <select id="country" className="form-select form-control" onChange={(e) => setLecturerName(e.target.value)}>
                  <option value="">Select the Lecturer</option>
                  {AllLecturers.map((item) => (
                    <option key={item._id} value={item.Lname}>{item.Lname}</option>
                  ))}
                </select>
              </div>
            </Col>
            <Col>
              <div className='form-group'>
                <label htmlFor="Lname">Select the Subject</label>
                <select id="country" className="form-select form-control" onChange={(e) => setSubject(e.target.value)}>
                  <option value="">Select the Subject</option>
                  {Allsubjects.map((item) => (
                    <option key={item._id} value={item.subject}>{item.subject}</option>
                  ))}
                </select>
              </div>
            </Col>
            <Col>
            <div className='form-group'>
                      <label for="Examno">Exam No</label>
                      <input type='text' className='form-control' id='Examno' placeholder="Exam No"
                      onChange={(e)=>{
                          setExamno(e.target.value);
                      }}
                      />
                  </div>
            </Col>
            <Col>
            <Form.Group controlId="date" className="mb-3">
                  <Form.Label>Date of Exam</Form.Label>
                  <Form.Control
                    type="date"
                    onChange={(e) => setDoe(e.target.value)}
                    required
                  />
                </Form.Group>
            </Col>
          </Row>
        </div>

        <Row>
          <Col>
        <div className="marks">
          <button className="btn btn-info add" onClick={handleAddStudent}><FaPlus /></button>

          {students.length > 0 && (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Student Index</th>
                  <th>Marks</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={index}>
                    <td>
                      <input className="form-control"
                        type="text"
                        value={student.studentIndex}
                        onChange={(e) => handleStudentIndexChange(index, e.target.value)}
                      />
                    </td>
                    <td>
                      <input className="form-control"
                        type="text"
                        value={marks[index]}
                        onChange={(e) => handleMarkChange(index, e.target.value)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}

          <button onClick={handleSubmit} className="btn btn-success marks-submit">save</button> 
          <button onClick={handleClear} className="btn btn-danger marks-clear">Clear</button>
          </div>
          </Col>
          
            <Col>
            <ResponsiveContainer width="100%" height={250}>
            <BarChart  id="chart-container" data={getChartData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="grade" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
          {/* <button className="btn btn-success chart">
            Download Chart
          </button> */}
          </Col>
          </Row>
      </Container>
    );
  }