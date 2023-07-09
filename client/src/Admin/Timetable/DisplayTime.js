import React from "react";
import { useEffect,useState } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";

export default function DisplayTime(){
    const [Timetable,SetTimetable]=useState([]);

    useEffect(()=>{
        function DisplayTimetable(){
            axios.get("http://localhost:5000/timetable").then((res)=>{
                SetTimetable(res.data);
            }).catch((err)=>{
                alert(err.message);
            })
        }
        DisplayTimetable();
    },[])

    return(
<div>
<Table striped bordered hover>
              <thead>
                <tr>
                <th>Lecturer's Name</th>
                <th>Subject</th>
                <th>Time</th>
                <th>Venue</th>
                <th>Theory/Revision</th>
                </tr>
              </thead>
              <tbody>
                
                  <tr>
                    <td>Mr Perera</td>
                    <td>Sinhala</td>
                    <td>19/04/2023 10-12 AM</td>
                    <td>A Hall</td>
                    <td>Theroy</td>
                  </tr>
                
              </tbody>
            </Table>
</div>
    )
}