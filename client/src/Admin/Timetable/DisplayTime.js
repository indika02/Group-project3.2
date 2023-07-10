import React from "react";
import { useEffect,useState } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";

export default function DisplayTime(){
    const [Timetables,SetTimetables]=useState([]);
    const[loading,setLoading] = useState(false)

    useEffect(()=>{
        setLoading(true)
        fetch("http://localhost:5000/timetable").then(response=>response.json()).then(json=>SetTimetables(json)).finally(()=>{
            setLoading(false)
        })
    },[])

    return(
<div>
    {loading ? (
        <div>Loading...</div>
    ):(
        <>
        <Table striped bordered hover>
              <thead>
                <tr>
                <th>Date</th>
                <th>Lecturer's Name</th>
                <th>Subject</th>
                <th>Time</th>
                <th>Venue</th>
                <th>O/L or A/L</th>
                <th>Theory/Revision</th>
                </tr>
              </thead>
              <tbody>
                {Timetables.map(Timetable=>(
                        <tr key={Timetable.id}>
                        <td>{Timetable.date}</td>
                        <td>{Timetable.teacher_name}</td>
                        <td>{Timetable.subject}</td>
                        <td>{Timetable.time}</td>
                        <td>{Timetable.venue}</td>
                        <td>{Timetable.classtype}</td>
                        <td>{Timetable.type}</td>
                      </tr>
                ))}
                    
                  
                
              </tbody>
            </Table>
        </>
    )}

</div>
    )
}