import React from "react";
import{ Row,Col} from 'react-bootstrap';
import './other.css';
import { useState,useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import bcrypt from 'bcryptjs';
import { Container, Table } from "react-bootstrap";
import { FaEdit, FaRecycle, FaRemoveFormat, FaTrash } from "react-icons/fa";
import { useSelector } from 'react-redux';

export default function OtherAccount() {
  const user = useSelector(state => state.auth.user);
    const[name,setName]=useState("");
    const[email,setEmail]=useState("");
    const[dpwd,setDpwd]=useState("1234");
    const[accountstate,setAccountStatus]=useState("active");
    const[usertype,setUsertype]=useState("");
    const [Accountdetails, setAccountdetails] = useState([]);
    const [loading, setLoading] = useState(false);
    const [Lname,setLName]=useState([]);


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

        if (user.usertype !== "generaladmin") {
          swal("Error", "You do not have permission to create accounts.", "error");
          return;
        }

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
            console.log(err)
        })

        e.target.reset();
    }

    const handleDelete = async (id) => {
      try {
        if (user.usertype !== "generaladmin") {
          swal("Error", "You do not have permission to delete accounts.", "error");
          return;
        }
        const result = await swal({
          title: "Are you sure?",
          text: "Once deleted, you will not be able to recover this account!",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        });
    
        if (result) {
          await axios.delete(`http://localhost:5000/account/delete/${id}`);
          swal("Success", "Account Deleted!", "success");
          fetchAccountDetails();
        } else {
          swal("Cancelled", "Account was not deleted.", "info");
        }
      } catch (error) {
        swal("Error!", "Failed to delete Account!", "error");
      }
    };
    
    useEffect(()=>{
      axios.get('http://localhost:5000/subject/').then((response)=>{
          
          setLName(response.data);
      }).catch((error)=>{
          console.log('Error fetching data.',error);
      });
  },[]);

    return(
        <div className="Account">
                <form onSubmit={sendData}>
                  <Row>
                    <Col>
                    <div className='form-group'>
                    <label for="Index">Name</label>
                    <select id="" className="form-select form-control sname" 
                    onChange={(e)=>{
                        setName(e.target.value);
                    }}
                    >
                        <option value="">Lectuer</option>
                        {Lname.map((item) => (
                            <option key={item._id} value={item.Lname}>{item.Lname}</option>
                        ))}
                    </select>
                    </div>
                    </Col>
                    <Col>
                    <div className='form-group'>
                    <label for="Index">Email Address</label>
                    <input type='email' className='form-control' id='email' placeholder="Email Address" 
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
                      <th>Type</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Accountdetails.map((account) => (
                      <tr key={account._id}>
                        <td>{account.name}</td>
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