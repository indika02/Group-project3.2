import React from "react";
import { useParams } from "react-router";
import { useUser } from '../UserContext';
import { Container } from "react-bootstrap";
import './profilepage.css';


export default function Profilepage(){

    const {email}=useParams();
    const { user } = useUser();
    
    return(
        <div className="profilepage">
            <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
            </ul>
          </div>
        </div>
      </nav>
    </header>
            <Container>
                <div className="profile"></div>
                <h4>User Profile</h4>
            </Container>
        </div>
    )
}