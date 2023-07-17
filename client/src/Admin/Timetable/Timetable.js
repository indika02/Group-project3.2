
  import React, { useState, useEffect } from "react";
  import { Form, Col, Row, Table, Container } from "react-bootstrap";
  import axios from "axios";
  import swal from 'sweetalert';
  import './timetable.css'
  import { FaTrash } from "react-icons/fa";

  export default function Timetable() {
    const [date, setDate] = useState("");
    const [teacher_name, setLecName] = useState("");
    const [subject, setSubject] = useState("");
    const [time, setTime] = useState("");
    const [venue, setVenue] = useState("");
    const [classtype, setClassType] = useState("");
    const [batchyear,setbatchYear]=useState("");
    const [type, setType] = useState("");
    const [timetables, setTimetables] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      setLoading(true);
      fetchTimetables();
    }, []);

    const fetchTimetables = async () => {
      try {
        const response = await axios.get("http://localhost:5000/timetable");
        setTimetables(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch timetables:", error);
      }
    };


    const handleSubmit = async (e) => {
      e.preventDefault();

      if (!date || !teacher_name || !subject || !time || !venue || !classtype || !batchyear || !type) {
        swal("Error!", "Please fill in all the fields!", "error");
        return;
      }

      const newSchedule = {
        date,
        teacher_name,
        subject,
        time,
        venue,
        classtype,
        batchyear,
        type
      };


    console.log(newSchedule);
      
      try {
        await axios.post("http://localhost:5000/timetable/add", newSchedule);
        swal("Success", "Scheduled a New Class!", "success");
        fetchTimetables();
        resetForm();
      } catch (error) {
        swal("Error!", "Invalid Input, Please Try again!", "error");
      }
    };

    const resetForm = () => {
      setDate("");
      setLecName("");
      setSubject("");
      setTime("");
      setVenue("");
      setClassType("");
      setbatchYear("");
      setType("");
    };
    const handleDelete = async (id) => {
      try {
        await axios.delete(`http://localhost:5000/timetable/delete/${id}`);
        swal("Success", "Data Deleted!", "success");
        fetchTimetables();
      } catch (error) {
        swal("Error!", "Failed to delete data!", "error");
      }
    };
    return (
      <div>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Group controlId="date" className="mb-3">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="lecturerName">
                <Form.Label>Lecturer Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter lecturer name"
                  onChange={(e) => setLecName(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="subject">
                <Form.Label>Subject</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter subject"
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="Time" className="mb-3">
                <Form.Label>Time</Form.Label>
                <Form.Control
                  type="time"
                  onChange={(e) => setTime(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="venue" className="mb-3">
                <Form.Label>Venue</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter venue"
                  onChange={(e) => setVenue(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="class" className="mb-3">
                <Form.Label>Class Type</Form.Label>
                <Form.Select
                  onChange={(e) => setClassType(e.target.value)}
                  required
                >
                  <option value="O/L">O/L</option>
                  <option value="A/L">A/L</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="type" className="mb-3">
                <Form.Label>Type</Form.Label>
                <Form.Select
                  onChange={(e) => setType(e.target.value)}
                  required
                >
                  <option value="Theory">Theory</option>
                  <option value="Revision">Revision</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
            <Form.Group controlId="batch" className="mb-3">
                <Form.Label>Batch Year</Form.Label>
                <Form.Select
                  onChange={(e) => setbatchYear(e.target.value)}
                  required
                >
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <button className="savebtn" type="submit">Save</button>
        </Form>

        <Container>
          <div className="timtables">
            {loading ? (
              <div>Loading...</div>
            ) : (
              <>
                <Table striped bordered hover className="table table-sm">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Lecturer's Name</th>
                      <th>Subject</th>
                      <th>Time</th>
                      <th>Venue</th>
                      <th>O/L or A/L</th>
                      <th>Batch Year</th>
                      <th>Theory/Revision</th>
                      <th>Modify/delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {timetables.map((timetable) => (
                      <tr key={timetable._id}>
                        <td>{timetable.date}</td>
                        <td>{timetable.teacher_name}</td>
                        <td>{timetable.subject}</td>
                        <td>{timetable.time}</td>
                        <td>{timetable.venue}</td>
                        <td>{timetable.classtype}</td>
                        <td>{timetable.batchyear}</td>
                        <td>{timetable.type}</td>
                        <td>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(timetable._id)}
                          >
                            <FaTrash/>
                          </button>
                        </td>
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