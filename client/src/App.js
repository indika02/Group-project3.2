import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ScaleLoader } from 'react-spinners';
import Landing from './pages/Landing';
import Aboutus from './pages/Aboutus';
import Contact from './pages/contact';
import Lecturer from './pages/Lecturer';
import Timetable from './pages/Timetable';
import Login from './pages/Login';
import Student from './Dashboard/Student/Student';
import Admin from './Admin/Admin';
import StdRegform from './Admin/Registration/Student/StdRegform';
import TeaReg from './Admin/Registration/Teacher/TeaReg';
import Addsub from './Admin/Registration/subjects/AddSub';
import Teacher from './Dashboard/Teacher/Teacher';
import Profilepage from './Dashboard/profileupdate/student/Profilepage';
import QRCodeScanner from './Dashboard/Qrcodescanner/Scanner';
import OtherProfile from './Dashboard/profileupdate/other/otherprofile';
import Reset from './Dashboard/resetpwd/reset';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
   
    <div>
      {isLoading ? (
        <div className="loading-spinner">
          <ScaleLoader color="#460691" height={70} width={7} radius={2} margin={2} />
        </div>
      ) : (
        <BrowserRouter>
        
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/aboutus" element={<Aboutus />} />
            <Route path="/lecturer" element={<Lecturer />} />
            <Route path="/timetable" element={<Timetable />} />
            <Route path="/contactus" element={<Contact />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/student" element={<Student />} />
            <Route path="/teacher" element={<Teacher />} />
            <Route path="/stdRegForm" element={<StdRegform />} />
            <Route path="/TeaRegForm" element={<TeaReg />} />
            <Route path="/Addsub" element={<Addsub />} />
            <Route path='/profilepage' element={<Profilepage/>}/>
            <Route path='/otherprofile' element={<OtherProfile/>}/>
            <Route path='/pwdreset' element={<Reset/>}/>
            <Route path='/qrcodescanner' element={<QRCodeScanner/>}/>
            
            
         
            
            
            </Routes>
           

        </BrowserRouter>
      )}
    </div>
    
  );
}

export default App;