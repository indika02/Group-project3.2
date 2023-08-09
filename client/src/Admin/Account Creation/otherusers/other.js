import React from "react";
import{ Row,Col} from 'react-bootstrap';
import './other.css';
import { useState,useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import bcrypt from 'bcryptjs';
import { Container, Table } from "react-bootstrap";
import { FaEdit, FaRecycle, FaRemoveFormat, FaTrash } from "react-icons/fa";

export default function OtherAccount() {

    const[name,setName]=useState("");
    const[email,setEmail]=useState("");
    const[dpwd,setDpwd]=useState("1234");
    const[accountstate,setAccountStatus]=useState("active");
    const[usertype,setUsertype]=useState("");
    const [Accountdetails, setAccountdetails] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setLoading(true);
        fetchAccountDetails();
      }, []);

      const fetchAccountDetails = async () => {
        try {
          const response = await axios.get("http://localhost:5000/account");
          const filteredAccounts = response.data.filter(
            (accountdetail) => ["teacher", "admin", "generaladmin", "attendancemarker"].includes(accountdetail.usertype)
          );
        
          setAccountdetails(filteredAccounts);
          setLoading(false);
          console.log(response.data);
        } catch (error) {
          console.error("Failed to fetch Accounts:", error);
        }
      };
    async function encryptPassword(password) {
        try {
          const encryptedPassword = await bcrypt.hash(password, 10);
          return encryptedPassword;
        } catch (error) {
          throw new Error('Password encryption failed');
        }
      }

    async function sendData(e){
        e.preventDefault();

        const encryptedPassword = await encryptPassword(dpwd);

        const newAccount={
            name,
            email,
            usertype,
            accountstate,
            dpwd: encryptedPassword,    
            
        }
        
        console.log(newAccount);
        axios.post("http://localhost:5000/account/add",newAccount).then(()=>{
           swal("Success", "Successfully created User Account!", "success");
           fetchAccountDetails();
        }).catch((err)=>{
            swal("Error", "Invalid Data Input!", "error");
        })

        e.target.reset();
    }

    const handleDelete = async (id) => {
      try {
        await axios.delete(`http://localhost:5000/account/delete/${id}`);
        swal("Success", "Account Deleted!", "success");
        fetchAccountDetails();
      } catch (error) {
        swal("Error!", "Failed to delete Account!", "error");
      }
    };
    

    return(
        <div className="Account">
                <form onSubmit={sendData}>
                  <Row>
                    <Col>
                    <div className='form-group'>
                    <label for="Index">Name</label>
                    <input type='text' className='form-control' id='Name' placeholder="Enter the Name" 
                     onChange={(e)=>{
                        setName(e.target.value);
                    }}
                    />
                </div>
                    </Col>
                    <Col>
                    <div className='form-group'>
                    <label for="Index">Email Address</label>
                    <input type='text' className='form-control' id='email' placeholder="Enter the email Address" 
                     onChange={(e)=>{
                        setEmail(e.target.value);
                    }}
                    />
                </div>
               
                    </Col>
                    <Col>
                    <div className='form-group'>
                    <label for="type" className='accounttype'>Type</label>
                    <select className="form-select form-control" aria-label="Default select example"
                    onChange={(e)=>{
                        setUsertype(e.target.value);
                    }}
                    >
                        <option value="teacher">Teacher</option>
                        <option value="admin">Admin</option>
                        <option value="generaladmin">General Admin</option>
                        <option value="attendancemarker">Attendance Marker</option>
                    </select>
                </div>
                    </Col>
                  
                    <button type="submit"  className="btn btn-primary acccreate">Create</button>
                  </Row>
                
                
                
                
                </form>

                <div>

                </div>
                <Container>
                {loading ? (
              <div>Loading...</div>
            ) : (
              <>
                <Table striped bordered hover className="table table-sm account-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Type</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Accountdetails.map((account) => (
                      <tr key={account._id}>
                        <td>{account.name}</td>
                        <td>{account.email}</td>
                        <td>{account.usertype}</td>
                        <button className="deluser" onClick={() => handleDelete(account._id)}><FaTrash/></button>
                      </tr>
                    ))}
                  </tbody>
                </Table>
</>
            )}
            </Container>
        </div>
        
    );
}