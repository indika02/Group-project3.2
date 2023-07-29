import React from "react";
import { useParams } from "react-router";
import { useUser } from '../UserContext';
import { Container,Navbar,Nav,NavDropdown,Row,Col,Form } from "react-bootstrap";
import './profilepage.css';


export default function Profilepage(){
  const {email}=useParams();
  const { user } = useUser();

  const userEmail = user?.email;
  return(
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Siyathra Learning Management System</Navbar.Brand>
            <Nav className="me-auto">
            </Nav>
        </Container>
      </Navbar>
   <div class="container-fluid">
        <div class="row">
          <div class="col">
            <div class="custom-div">
              <h1>user profile</h1>
            </div>
          </div>
        </div>
      </div>
      <Row>
        
      <form className="form">
        <div className='form-group'>
                <label for="index">Student's Enrollement No</label>
                <input type='text' className='form-control' id='index' placeholder="Enter Student's Enrollement No"
               
                />
            </div>
            <div className='form-group'>
                <label for="name">Student's Full Name</label>
                <input type='text' className='form-control' id='name' placeholder="Enter Student's Name" readOnly
               
                />
       </div>
            <Row>
                <Col>
                <div className='form-group'>
                <label for="dob">Date of Birth</label>
                <input type='date' className='form-control' id='dob' placeholder='Enter the Date of Birth'
                
                />
            </div>
                </Col>
                <Col>
                <div className='form-group'>
                    <label for="age" className='age'>Age</label>
                    <select className="form-select form-control" aria-label="Default select example" 
                 >
                        <option selected>Select The Age</option>
                        <option value="22">22</option>
                        <option value="21">21</option>
                        <option value="20">20</option>
                        <option value="19">19</option>
                        <option value="18">18</option>
                        <option value="17">17</option>
                        <option value="16">16</option>
                        <option value="15">15</option>
                    </select>
                </div>
            
                </Col>
                <Col>
                <div className='form-group'>
                    <label for="gender" className='gender'>Gender</label>
                    <select className="form-select form-control" aria-label="Default select example">
               
                        <option selected>Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                </Col>
            </Row>
            
        

                <Row>
                    <Col>
                    <div className='form-group'>
                <label for="Contactno">Contact No(Personal)</label>
                <input type='text' className='form-control' id='contact' placeholder="Contact Number(Personal)"
                // onChange={(e)=>{
                //     setContactpersonal(e.target.value);
                // }}
                />
            </div>
                    </Col>
                    <Col>
                    <div className='form-group'>
                <label for="Contactno">Contact No(Home)</label>
                <input type='text' className='form-control' id='contacthome' placeholder="Contact Number(Home)"
                // onChange={(e)=>{
                //     setContactHome(e.target.value);
                // }}
                />
            </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <div className='form-group'>
                <label for="address">Address</label>
                <input type='text' className='form-control' id='address' placeholder="address"
                // onChange={(e)=>{
                //     setAddress(e.target.value);
                // }}
                />
            </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <div className='form-group'>
                <label for="email">Email Address</label>
                <input type='email' className='form-control' id='email' placeholder="Email Address"
                // onChange={(e)=>{
                //     setEmail(e.target.value);
                // }}
                />
            </div>
                    </Col>
                </Row>
                <Row>
                <Col>
                <div className='form-group'>
                    <label for="type" className='type'>Class Type</label>
                    <select className="form-select form-control" aria-label="Default select example"
                    //  onChange={(e)=>{
                    //     setClasstype(e.target.value);
                    // }}
                    >
                        <option selected>Class type</option>
                        <option value="O/L">O/L</option>
                        <option value="A/L">A/L</option>
                    </select>
                </div>
                </Col>
                <Col>
                <div className='form-group'>
                    <label for="batch" className='batch'>Batch Year</label>
                    <select className="form-select form-control" aria-label="Default select example"
                    // onChange={(e)=>{
                    //     setbatchYear(e.target.value);
                    // }}
                    >
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>
                    </select>
                </div>
                </Col>
            </Row>
                    <div className='form-group'>
                <label for="subjects">Subjects</label>
                <Row>
                <Col>
                <div className='form-group'>
                    <select id="country" className="form-select form-control" 
                    // onChange={(e)=>{
                    //     setLName1(e.target.value);
                    // }}
                    >
                        <option value="">Lectuer</option>
                        {/* {Lname.map((item) => (
                            <option key={item._id} value={item.Lname}>{item.Lname}</option>
                        ))} */}
                    </select>
                    </div>
                    </Col>
                    <Col>
                    <div className='form-group'>
                    <select id="country" className="form-select form-control"
                    // onChange={(e)=>{
                    //     setSubject1(e.target.value);
                    // }}
                    >
                        <option value="">Subject 1</option>
                        {/* {subject.map((item) => (
                            <option key={item._id} value={item.subject}>{item.subject}</option>
                        ))} */}
                    </select>
                    </div>
                </Col>
                <Col>
                <div className='form-group'>
                    <select id="country" className="form-select form-control"
                    // onChange={(e)=>{
                    //     setLName2(e.target.value);
                    // }}
                    >
                        <option value="">Lectuer</option>
                        {/* {Lname.map((item) => (
                            <option key={item._id} value={item.Lname}>{item.Lname}</option>
                        ))} */}
                    </select>
                    </div>
                    </Col>
                    <Col>
                    <div className='form-group'>
                    <select id="country" className="form-select form-control" 
                    // onChange={(e)=>{
                    //     setSubject2(e.target.value);
                    // }}
                    >
                        <option value="">Subject 2</option>
                        {/* {subject.map((item) => (
                            <option key={item._id} value={item.subject}>{item.subject}</option>
                        ))} */}
                    </select>
                    </div>
                    </Col>
                </Row>
                <Row className='sub'>
                <Col>
                <div className='form-group'>
                    <select id="country" className="form-select form-control"
                    // onChange={(e)=>{
                    //     setLName3(e.target.value);
                    // }}
                    >
                        <option value="">Lectuer</option>
                        {/* {Lname.map((item) => (
                            <option key={item._id} value={item.Lname}>{item.Lname}</option>
                        ))} */}
                    </select>
                    </div>
                    </Col>
                    <Col>
                    <div className='form-group'>
                    <select id="country" className="form-select form-control"
                    // onChange={(e)=>{
                    //     setSubject3(e.target.value);
                    // }}
                    >
                        <option value="">Subject 3</option>
                        {/* {subject.map((item) => (
                            <option key={item._id} value={item.subject}>{item.subject}</option>
                        ))} */}
                    </select>
                    </div>
                </Col>
                <Col>
                <div className='form-group'>
                    <select id="country" className="form-select form-control"
                    // onChange={(e)=>{
                    //     setLName4(e.target.value);
                    // }}
                    >
                        <option value="">Lectuer</option>
                        {/* {Lname.map((item) => (
                            <option key={item._id} value={item.Lname}>{item.Lname}</option>
                        ))} */}
                    </select>
                    </div>
                    </Col>
                    <Col>
                    <div className='form-group'>
                    <select id="country" className="form-select form-control"
                    // onChange={(e)=>{
                    //     setSubject4(e.target.value);
                    // }}
                    >
                        <option value="">Subject 4</option>
                        {/* {subject.map((item) => (
                            <option key={item._id} value={item.subject}>{item.subject}</option>
                        ))} */}
                    </select>
                    </div>
                    </Col>
                </Row>
            </div>      
        
            <button type='submit' className='savebtn'>Save</button>
        </form>
        
      </Row>
      
      
  
      </>
    )
}