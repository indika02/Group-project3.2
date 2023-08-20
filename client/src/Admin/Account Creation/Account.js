import React from "react";
import{ Row,Col} from 'react-bootstrap';
import './Account.css';
import { useState,useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import bcrypt from 'bcryptjs';
import { Container, Table } from "react-bootstrap";
import { FaAccusoft, FaEdit, FaRecycle, FaRemoveFormat, FaTrash, FaUserAlt } from "react-icons/fa";

export default function Account() {

    const[index,setIndex]=useState("");
    const[name,setName]=useState("");
    const[email,setEmail]=useState("");
    const[dpwd,setDpwd]=useState("1234");
    const[accountstate,setAccountStatus]=useState("active");
    const[usertype,setUsertype]=useState("student");
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
            (studentdetail) => studentdetail.usertype === "student"
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

        if (!index || !email) {
          swal("Error", "Please fill in all the fields!", "error");
          return;
      }

        const encryptedPassword = await encryptPassword(dpwd);

        const newAccount={
            index,
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
    
    

    return(
        <div className="Account">
                <form onSubmit={sendData}>
                  <Row>
                    <Col sm={4}>
                    <div className='form-group'>
                    <label for="Index">Registration Number</label>
                    <input type='text' className='form-control' id='Index' placeholder="Enrollment No" 
                     onChange={(e)=>{
                        setIndex(e.target.value);
                    }}
                    />
                </div>
                    </Col>
                    <Col sm={4}>
                    <div className='form-group'>
                    <label for="Index">Email Address</label>
                    <input type='email' className='form-control' id='email' placeholder="Email Address" 
                     onChange={(e)=>{
                        setEmail(e.target.value);
                    }}
                    />
                </div>
                
                    </Col>
                    <Col sm={4}>
                    <button type="submit"  className="btn btn-primary create"><FaUserAlt/> Create</button>
                    </Col>
                  
                   
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
                      <th>Enrollement No</th>
                      <th>Email</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Accountdetails.map((account) => (
                      <tr key={account._id}>
                        <td>{account.index}</td>
                        <td>{account.email}</td>
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