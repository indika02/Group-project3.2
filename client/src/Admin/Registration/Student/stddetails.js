import React from "react";
import { Container, Table } from "react-bootstrap";
import './stdreg.css';
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function StdDetails(){
    return(
        <div>
            <Container>
            <Link to="/stdRegForm">
             <button className="savebtn"><FaPlus/></button>
             </Link>
            <Table striped bordered hover>
               
              <thead>
                <tr>
                <th>Enrollement No</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Contact No.</th>
                <th>Email</th>
                <th>Class Type</th>
                <th>Subjects</th>
                <th>Theory/Revision</th>
                </tr>
              </thead>
              <tbody>
                    <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  
                
              </tbody>
            </Table>
            </Container>
        </div>
    )
}