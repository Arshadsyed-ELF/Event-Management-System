import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Componenets/Home';
import AddEvent from './Host/addEvent';
import MyEvents from './Host/MyEvent';
import Hlogin from './Host/Hlogin';
import Hsignup from './Host/Hsignup';
import Login from './User/Login';
import Signup from './User/Signup';
import Uhome from './User/Uhome';
import Events from './User/Events';
import Unavbar from './User/Unavbar';
import Uevent from './User/Uevent';
import Mybookings from './User/Mybookings';
import Bookticket from './User/Bookticket';
import Hhome from './Host/Hhome';
import Bookings from './Host/Bookings';
import Alogin from './Admin/Alogin';
import Asignup from './Admin/Asignup';
import Ahome from './Admin/Ahome';
import Users from './Admin/Users';
import Hosts from './Admin/Hosts';

const App = () => {
  return (
    <div>
      
      <BrowserRouter>
       <Routes>
       <Route path='/' element={<Home/>} />


      {/* Admin  */}
      <Route path='/alogin' element={<Alogin/>} />
        <Route path='/asignup' element={<Asignup/>} />
      <Route path='/ahome' element={<Ahome/>} />
      <Route path='/users' element={<Users/>} />
      <Route path='/hosts' element={<Hosts/>} />



           {/* seller */}
      <Route path='/hlogin' element={<Hlogin/>} />
      <Route path='/hsignup' element={<Hsignup/>} />
      <Route path='/hhome' element={<Hhome/>} />
       <Route path='/addevent' element={<AddEvent/>} />
       <Route path='/myevents' element={<MyEvents/>} />
       <Route path='/bookings' element={<Bookings/>} /> 


      {/* user */}
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>} />
        <Route path='/nav' element={<Unavbar/>}/>
         <Route path='/uhome' element={<Uhome/>} />
         <Route path='/events' element={<Events/>} />
       <Route path='/uevent/:id' element={<Uevent/>} />
     <Route path="/bookticket/:id" element={<Bookticket/>} />
       <Route path="/mybookings" element={<Mybookings />} />
       {/* <Route path="/wishlist" element={<Wishlist />} />  */}

      
      

       </Routes>
       </BrowserRouter>
    </div>
  )
}

export default App