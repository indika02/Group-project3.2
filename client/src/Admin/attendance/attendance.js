import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import './attendance.css';
import { Table,Row,Col } from "react-bootstrap";
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import { format } from 'date-fns';


export default function Attendance(){

    const [attendance,setAttendance] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedClassType, setSelectedClassType] = useState('');
    const [selectedBatchYear, setSelectedBatchYear] = useState('');
    const [selectedDate,setSelectedDate]=useState('');
    const[selectedLname,setSelectedLname]=useState('');
    const[stdcount,setStdcount]=useState("");
    const[attendees,setAttendees]=useState("");
    const [Lname,setLName]=useState([]);
    const data = [
      { name: 'Total', value: stdcount },
      { name: 'Today', value: attendees }, 
    ];
  
   
    const COLORS = ['#0088FE', 'Red'];
  
    useEffect(() => {
      setLoading(true);
      fetchAttendanceDetails();
    }, []);
  
    useEffect(()=>{
        axios.get('http://localhost:5000/subject/').then((response)=>{
            setLName(response.data);
        }).catch((error)=>{
            console.log('Error fetching data.',error);
        });
    },[]);
    const fetchAttendanceDetails = async () => {
      try {
        const response = await axios.get("http://localhost:5000/attendance/");
        
        setAttendance(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch TAttendance Details:", error);
      }
    };

    useEffect(() => {
      fetch("http://localhost:5000/user/total/count")
          .then(response => response.json())
          .then(json => setStdcount(json.count)) 
          .catch(error => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/attendance/total/count")
        .then(response => response.json())
        .then(json => setAttendees(json.count)) 
        .catch(error => console.error("Error fetching data:", error));
}, []);
  
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
        <Col sm={3}>
        <div className='form-group'>
        <select id="country" className="form-select form-control" value={selectedLname}
        onChange={(e)=>{
            setSelectedLname(e.target.value);
        }}
        >
            <option value="">Lectuer</option>
            {Lname.map((item) => (
                <option key={item._id} value={item.Lname}>{item.Lname}</option>
            ))}
        </select>
        </div>
        </Col>
        </Row>
        <Row>
        <Col>
        <div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <Table striped bordered hover className="table table-sm">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Class</th>
                  <th>Batchyear</th>
                  <th>Lecturer Name</th>
                  <th>Subject</th>
                  <th>Index</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {attendance.filter(attendancedetail => 
                    (selectedClassType === '' || attendancedetail.classType === selectedClassType) &&
                    (selectedBatchYear === '' || attendancedetail.batchYear === selectedBatchYear) &&
                    (selectedDate === '' || attendancedetail.date === selectedDate) &&
                    (selectedLname === '' || attendancedetail.lecturerName === selectedLname)
                  ).map((attendancedetails) => (
                  <tr key={attendancedetails._id}>
                    <td>{attendancedetails.date}</td>
                    <td>{attendancedetails.classType}</td>
                    <td>{attendancedetails.batchYear}</td>
                    <td>{attendancedetails.lecturerName}</td>
                    <td>{attendancedetails.subject}</td>
                    <td>{attendancedetails.index}</td>
                    <td>{attendancedetails.name}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
     </div>
     </Col>
     </Row>   
        </div>
    );
}