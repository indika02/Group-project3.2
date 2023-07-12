import Aboutus from './pages/Aboutus';
import Landing from './pages/Landing';
import { BrowserRouter,Routes, Route } from "react-router-dom";
import Contact from './pages/contact';
import Lecturer from './pages/Lecturer';
import Timetable from './pages/Timetable';
import Login from './pages/Login';
import Student from './Dashboard/Student';
import Admin from './Admin/Admin';
import StdRegform from './Admin/Registration/Student/StdRegform';
import TeaReg from './Admin/Registration/Teacher/TeaReg';




function App() {
  return (
    <div>
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Landing />}  />
        <Route path="/aboutus" element={<Aboutus />} /> 
        <Route path='/lecturer' element={<Lecturer/>}/>
        <Route path='/timetable' element={<Timetable/>}/>
        <Route path="/contactus" element={<Contact/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/student' element={<Student/>}/>
        <Route path='/stdRegForm' element={<StdRegform/>}/>
        <Route path='/TeaRegForm' element={<TeaReg/>}/>
        
        </Routes>
    </BrowserRouter> 
    </div>
  );
}

export default App;