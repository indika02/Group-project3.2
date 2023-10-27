import React from "react";
import { useSelector } from 'react-redux';
import { useState,useEffect } from "react";
import axios from "axios";
import { Table ,Row,Col} from "react-bootstrap";
import { format } from 'date-fns';

 export default function AttendanceTeacher(){
    const user = useSelector(state => state.auth.user);
    const [attendance,setAttendance] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedClassType, setSelectedClassType] = useState('');
    const [selectedBatchYear, setSelectedBatchYear] = useState('');
    const [selectedDate,setSelectedDate]=useState('');

    useEffect(() => {
        setLoading(true);
        fetchAttendanceDetails(user.name);
      }, [user.name]);

      const fetchAttendanceDetails = async (Lname) => {
        try {
          const response = await axios.get(`http://localhost:5000/attendance/attendancedetails/${Lname}`);
          
          setAttendance(response.data);
          setLoading(false);
        } catch (error) {
          console.error("Failed to fetch Attendance Details:", error);
        }
      };
    return(
        
        <div>
        <Row className="attendance">
        <Col sm={3}>
        <div className='form-group'>
        <input
  type="date"
  className="form-control"
  id="date"
  value={selectedDate}
  onChange={(e) => {
    // Format the selected date to match your database format (e.g., 'DD-MM-YYYY')
    const formattedDate = format(new Date(e.target.value), 'dd-MM-yyyy');
    setSelectedDate(formattedDate);
  }}
/>

    </div>
        </Col>
        <Col sm={3}>
        <select
          className="form-select form-control" value={selectedClassType}
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
          className="form-select form-control" value={selectedBatchYear}
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
            <Table striped bordered hover className="table table-sm resultstable">
              <thead>
                <tr>
                <th>Date</th>
                <th>Class</th>
                <th>Batch year</th>
                <th>Index No</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {attendance.filter(attendancedetail => 
                    (selectedClassType === '' || attendancedetail.classType === selectedClassType) &&
                    (selectedBatchYear === '' || attendancedetail.batchYear === selectedBatchYear) &&
                    (selectedDate === '' || attendancedetail.date === selectedDate)).map((attendees) => (
                  <tr key={attendees._id}>
                  <td>{attendees.date}</td>
                  <td>{attendees.classType}</td>
                  <td>{attendees.batchyear}</td>
                  <td>{attendees.index}</td>
                    <td>{attendees.name}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
      </div>
        </div>
    );
 }