// StudentDetail.js
import React from "react";

const StudentDetail = ({ student }) => {
  return (
    <div>
      {/* Display the detailed information of the student */}
      <h2>{student.name}</h2>
      <p>Age: {student.age}</p>
      {/* Add other details here */}
    </div>
  );
};

export default StudentDetail;
