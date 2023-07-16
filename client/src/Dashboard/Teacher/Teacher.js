import React from "react";
import './Teacher.css';
import { useParams ,useHistory} from "react-router";

export default function Teacher(){

    const {email}=useParams();
    return(
        <div>
            <h1>Teacher Account</h1>
            <p>email:{email}</p>
        </div>
    );
}