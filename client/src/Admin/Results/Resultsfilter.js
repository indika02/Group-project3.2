import React from "react";
import { useSelector } from 'react-redux';
import { useState,useEffect } from "react";
import axios from "axios";
import { Container,Table ,Row,Col,Button} from "react-bootstrap";
import './results.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function Resultfilter(){
    const user = useSelector(state => state.auth.user);
    const [loading, setLoading] = useState(false);
    const[results,setResults]=useState([]);
    const [selectedClassType, setSelectedClassType] = useState('');
    const [selectedBatchYear, setSelectedBatchYear] = useState('');
    const [selectedEnrollmentNo, setSelectedEnrollmentNo] = useState('');
  

    useEffect(()=>{
        setLoading(true);
        fetchResults(user.name);
        
    },[user.name]);

    const fetchResults=async(Lname)=>{
        try{
            const response=await axios.get(`http://localhost:5000/results/by-lecturer/${Lname}`);
            setResults(response.data);
            console.log(response.data)
            setLoading(false);
        }catch(error){
            console.error("Error",error);
        }
    }
    const filteredResults = results.filter(
        (result) =>
          (selectedClassType === "" || result.classType === selectedClassType) &&
          (selectedBatchYear === "" || result.batchYear === selectedBatchYear) &&
          (selectedEnrollmentNo === "" || result.studentIndex === selectedEnrollmentNo)
      );
    const getGradeCounts = (filteredResults) => {
        const gradeCounts = {};
        filteredResults.forEach((result) => {
          if (!gradeCounts[result.grade]) {
            gradeCounts[result.grade] = 0;
          }
          gradeCounts[result.grade]++;
        });
        return Object.keys(gradeCounts).map((grade) => ({ grade, count: gradeCounts[grade] }));
      };
      
      
      
     
    return(
        <div className="filterresults">
        <Container>
        <Row>
        <Row>
        <Col sm={2}>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Enrollment No."
          value={selectedEnrollmentNo}
          onChange={(e) => setSelectedEnrollmentNo(e.target.value)}
        />
      </Col>
        <Col sm={2}>
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
        <Col sm={2}>
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
        
        <Col md={8}>
        <div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              <Table striped bordered hover className="table table-sm resultstable">
                <thead>
                  <tr>
                  <th>Class</th>
                  <th>Batch year</th>
                  <th>Date</th>
                  <th>Exam No</th>
                    <th>Index No</th>
                    <th>Marks</th>
                    <th>Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {results.filter(results=>
                    (selectedClassType===''||results.classType===selectedClassType)&&
                    (selectedBatchYear === '' || results.batchYear === selectedBatchYear)&&
                    (selectedEnrollmentNo === '' || results.studentIndex === selectedEnrollmentNo)
                    ).map((results) => (
                    <tr key={results._id}>
                    <td>{results.classType}</td>
                    <td>{results.batchYear}</td>
                    <td>{results.Doe}</td>
                    <td>{results.Examno}</td>
                      <td>{results.studentIndex}</td>
                      <td>{results.marks}</td>
                      <td>{results.grade}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
        </div>
        </Col>
        <Col md={4}>
        <div className="chart">
  <BarChart width={400} height={400} data={getGradeCounts(filteredResults)}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="grade" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar dataKey="count" fill="darkblue" />
  </BarChart>
</div>
        </Col>
        </Row>

        </Container>
            
        </div>
    );
}