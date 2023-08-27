import React from "react";
import './reset.css';
import { setUserProfileData } from "../../features/actions";
import { useSelector } from "react-redux";

export default function Reset(){

    const user=useSelector(state=>state.auth.user);

    return(
        <div className="reset">
        <h4 className="reseth">Reset Password</h4>
        <h1>{user.email}</h1>
        </div>
    );
}