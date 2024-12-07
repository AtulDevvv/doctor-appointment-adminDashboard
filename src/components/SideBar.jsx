import React from 'react'
import { UseAdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { UseDoctorContext } from '../context/DoctorContext'

function SideBar() {

  const {aToken}=UseAdminContext()
  const {dToken}=UseDoctorContext();


  return (
    <div  >
      {
        aToken && <ul className=' flex  gap-4 flex-col '>
          <NavLink to={'/admin-dashboard'} className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-[#f2f3ff] border-r-4 border-primary':''}  `}>
            <img src={assets.home_icon} alt="" />
           <h5 className='hidden md:block'> dashboard</h5>
          </NavLink>
          <NavLink to={'/all-appointments'} className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-[#f2f3ff] border-r-4 border-primary':''}  `}>
            <img src={assets.appointment_icon} alt="" />
            <h5 className='hidden md:block'>Appointment</h5>
          </NavLink>
          <NavLink to={'/add-doctor'}  className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-[#f2f3ff] border-r-4 border-primary':''}  `}>
            <img src={assets.add_icon} alt="" />
            <h5 className='hidden md:block'>Add doctor</h5>
          </NavLink>
          <NavLink to={'doctor-lists'} className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-[#f2f3ff] border-r-4 border-primary':''}  `}>
            <img src={assets.people_icon} alt="" />
            <h5 className='hidden md:block'>Doctors List</h5>
          </NavLink>
        </ul>
      }
      {
         dToken && <ul className=' flex  gap-4 flex-col '>
         <NavLink to={'/doctor-dashboard'} className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-[#f2f3ff] border-r-4 border-primary':''}  `}>
           <img src={assets.home_icon} alt="" />
           <h5 className='hidden md:block'>dashboard</h5>
         </NavLink>
         <NavLink to={'/doctor-appointment'} className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-[#f2f3ff] border-r-4 border-primary':''}  `}>
           <img src={assets.appointment_icon} alt="" />
           <h5 className='hidden md:block'>Appointment</h5>
         </NavLink>
        
         <NavLink to={'doctor-profile'} className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-[#f2f3ff] border-r-4 border-primary':''}  `}>
           <img src={assets.people_icon} alt="" />
           <h5 className='hidden md:block'>Profile</h5>
         </NavLink>
       </ul>

      }
    </div>
  )
}

export default SideBar