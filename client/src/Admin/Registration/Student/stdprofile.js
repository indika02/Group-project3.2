import {React,useState} from "react";
import { Row,Col,Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import './stdprofile.css';
import swal from "sweetalert";
import axios from "axios";
import { useSelector,useDispatch } from 'react-redux';



export default function StdProfile(){
    const user = useSelector(state => state.auth.user);
    const [userProfiledata, setUserProfiledata] = useState(null);
    const [index, setIndex] = useState('');
    const userEmail=user.email;

    const handleFetchuserProfile = async (userEmail) => {
        try {
          const response = await axios.get(`http://localhost:5000/account/userdetails/${userEmail}`);
          setUserProfiledata(response.data);
          console.log(response.data)
        } catch (error) {
            swal("Error", "Invalid Registration Number!", "error");
          console.error(error);
        }
      };

    return(
        <div className="stdprofile">
        <Row className="profile">
        <h4>Personnal Dettails</h4>
        <Col>
        <input
        type="text"
        className="form-control"
        placeholder="Enrollment No."
        value={index}
        onChange={(e) => setIndex(e.target.value)}
        />
        </Col>
        <Col>
        <Button variant="success" className='searchprofile'  onClick={handleFetchuserProfile}>
        <FaSearch/> Search
      </Button>
        </Col>
        </Row>
        <Row className="profiledetails">
        <Col>
        <Row>
        <Col>
        <p>Enrollement No: {userProfiledata?.index}</p> 
        </Col>
        <Col sm={6}>
        <p>Full Name: {userProfiledata?.name}</p>
        </Col>
        </Row>
        <Row>
        <Col sm={6}>
        <p>Date of Birth: {userProfiledata?.dob}</p>
        </Col>
        <Col sm={6}>
        <p>Age: {userProfiledata?.age}</p>
        </Col>
        </Row>
        <Row>
        <Col>
        <p>Gender: {userProfiledata?.gender}</p>
        </Col>
        </Row>
        <Row>
        <Col sm={6}>
        <p>Contact No(Personal): {userProfiledata?.contactpersonal}</p>
        </Col>
        <Col sm={6}>
        <p>Contact No(Home): {userProfiledata?.contacthome}</p>
        </Col>
        </Row>
        <Row>
        <Col sm={6}>
        <p>Address: {userProfiledata?.address}</p>
        </Col>
        <Col sm={6}>
        <p>Email Address: {userProfiledata?.email}</p>
        </Col>
        </Row>
       <Row>
       <Col sm={6}>
       <p>Class Type: {userProfiledata?.classtype}</p>
       </Col>
       <Col sm={6}>
       <p>Batch Year: {userProfiledata?.batchyear}</p>
       </Col>
       </Row>
      
       
       
       <Row>
       <Col>
       <p>Subjects:  <ul>
       <li>{userProfiledata?.Lname1} - {userProfiledata?.subject1}</li>
       <li>{userProfiledata?.Lname2} - {userProfiledata?.subject2}</li>
       <li>{userProfiledata?.Lname3} - {userProfiledata?.subject3}</li>
       <li>{userProfiledata?.Lname4} - {userProfiledata?.subject4}</li>
       </ul></p>
       </Col>
       </Row>
      
        </Col>
        
        </Row>
        </div>
    );
}