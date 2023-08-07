import React from "react";
import { useSelector } from 'react-redux';

const LoggedAccount = () => {
  const user = useSelector(state => state.auth.user); // Get user from Redux store

  return (
    <div className="logged-account">
      <h2>Welcome, {user ? user.username : 'Guest'}</h2>
      {user && (
        <div>
          <p>Email: {user.email}</p>
          <p>User Type: {user.usertype}</p>
          <p>index: {user.index}</p>
        </div>
      )}
    </div>
  );
};

export default LoggedAccount;
