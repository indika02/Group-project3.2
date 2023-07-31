import React from "react";
import{ Row,Col} from 'react-bootstrap';
import './Account.css';
import { useState,useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import bcrypt from 'bcryptjs';
import { Container, Table } from "react-bootstrap";

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
    }

    

    return(
        <div className="Account">
                <form onSubmit={sendData}>
                <div className='form-group'>
                    <label for="Index">Registration Number</label>
                    <input type='text' className='form-control' id='Index' placeholder="Enter the Registration Number" 
                     onChange={(e)=>{
                        setIndex(e.target.value);
                    }}
                    />
                </div>
                
                <div className='form-group'>
                    <label for="Index">Email Address</label>
                    <input type='text' className='form-control' id='email' placeholder="Enter the email Address" 
                     onChange={(e)=>{
                        setEmail(e.target.value);
                    }}
                    />
                </div>
                <button type="submit"  className="savebtn">Create</button>
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
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Accountdetails.map((account) => (
                      <tr key={account._id}>
                        <td>{account.index}</td>
                        <td>{account.email}</td>
                        <td>{account.accountstate}</td>
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