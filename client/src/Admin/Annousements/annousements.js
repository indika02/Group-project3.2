import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import './annousements.css';
import swal from 'sweetalert';
import { useSelector,useDispatch } from 'react-redux';
import { setUserProfileData } from '../../features/actions';
import { FaTrash } from 'react-icons/fa';

export default function Announcements() {
const user = useSelector(state => state.auth.user);
  const [classtype, setClassType] = useState('');
  const [batchyear, setBatchYear] = useState('');
  const [subject, setSubject] = useState('');
  const [allSubjects, setAllSubjects] = useState([]);
  const [message, setMessage] = useState('');
  const [Lname,setLName]=useState('');
  const [sentMessages, setSentMessages] = useState([]);
  const [loading, setLoading] = useState(false); 

  useEffect(() => {



    axios.get('http://localhost:5000/subject/').then((response) => {
      setAllSubjects(response.data);
    }).catch((error) => {
      console.log('Error fetching data.', error);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get("http://localhost:5000/annoucement/");
      
      setSentMessages(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch Student Details:", error);
    }
  };

  function sendData(e){
    e.preventDefault();

    
    const newAnnoucement={
       classtype,
       batchyear,
       subject,
       message,
       Lname:user.name,
    }
    
    console.log(newAnnoucement);
    axios.post("http://localhost:5000/annoucement/add",newAnnoucement).then(()=>{
       swal("Success", "Sending Successful!", "success");
       fetchMessages();
       
    }).catch((err)=>{
        swal("Error", "Invalid Data Input!", "error");
    })


}

const handleDelete = async (id) => {
    try {
      const result = await swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this user!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      });
  
      if (result) {
        await axios.delete(`http://localhost:5000/annoucement/delete/${id}`);
        swal("Success", "User Removed!", "success");
      fetchMessages(result);
      } else {
        swal("Cancelled", "User not deleted.", "info");
      }
    } catch (error) {
      swal("Error!", "Failed to delete User!", "error");
    }
  };
  return (
    <div>
      <Row className="announcements">
        <Col sm={4}>
          <select
            className="form-select form-control"
            onChange={(e) => {
              setClassType(e.target.value);
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
        <Col sm={4}>
          <select
            className="form-select form-control"
            onChange={(e) => {
              setBatchYear(e.target.value);
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
        <Col sm={4}>
          <div className="form-group">
            <select id="subject" className="form-select form-control" onChange={(e) => setSubject(e.target.value)}>
              <option value="">Select your Subject</option>
              {allSubjects.map((item) => (
                <option key={item._id} value={item.subject}>{item.subject}</option>
              ))}
            </select>
          </div>
        </Col>
        <Col sm={12}>
        <ReactQuill value={message} onChange={setMessage} theme="snow" className='message'/>
        </Col>
      </Row>
      <button className="btn btn-primary send" onClick={sendData}>Send</button>
      <div className='sendmsg'>
      <ul>
      {sentMessages && sentMessages.length > 0 ? (
        sentMessages.map((sentMessage, index) => (
          <div key={index} className="sent-message">
            <p>{sentMessage.message}</p>
            <p>{sentMessage.batchyear}</p>
            <p>{sentMessage.classtype}</p>
            <p><b>{sentMessage.date}</b></p>
            <button className='btn btn-danger delmsg' onClick={() => handleDelete(sentMessage._id)}><FaTrash/></button>
            <hr></hr>
          </div>
        ))
      ) : (
        <p>No messages available.</p>
      )}
    </ul>
    </div>
      </div>
  );
}
