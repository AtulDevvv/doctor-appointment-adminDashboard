import React from 'react'
import Login from './pages/doctor/Login'
import { ToastContainer,toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { UseAdminContext } from './context/AdminContext'
import Navbar from './components/Navbar'
import SideBar from './components/SideBar'
import {Routes,Route} from 'react-router-dom'
import DashBoard from './pages/admin/DashBoard'
import AllAppointments from './pages/admin/AllAppointments'
import AddDoctor from './pages/admin/AddDoctor'
import DoctorsList from './pages/admin/DoctorsList'
import { UseDoctorContext } from './context/DoctorContext'
import DoctorsDashBoard from './pages/doctor/DoctorsDashBoard'
import DoctorAppointment from './pages/doctor/DoctorAppointment'
import DoctorProfile from './pages/doctor/DoctorProfile'


function App() {
  const{aToken}=UseAdminContext();
  const{dToken}=UseDoctorContext();



  return aToken ||dToken? (

    <div>
      <ToastContainer/>
      <Navbar/>
      <div className='flex items-start'>
        <SideBar/>
        <Routes>
          {/* ADMIN ROUTES */}
          <Route path='/' element={<></>}/>
          <Route path='/admin-dashboard' element={<DashBoard/>}/>
          <Route path='/all-appointments' element={<AllAppointments/>}/>
          <Route path='/add-doctor' element={<AddDoctor/>}/>
          <Route path='/doctor-lists' element={<DoctorsList/>}/>

          {/* DOCTORS ROUTES */}
          <Route path='/doctor-dashboard' element={<DoctorsDashBoard/>}/>
          <Route path='/doctor-appointment' element={<DoctorAppointment/>}/>
          <Route path='/doctor-profile' element={<DoctorProfile/>}/>
          

        </Routes>
      </div>
    </div>

  ):(<div>
    <Login/>
    <ToastContainer/>
  </div>)
}  

export default App
