import React from 'react'
import { UseAdminContext } from '../../context/AdminContext'
import { useEffect } from 'react'
import { UseContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

function AllAppointments() {

  const {aToken,appointments,getAllAppointments,cancelAppointment}=UseAdminContext()
  const {calculateAge,slotDateFormate,currency}=UseContext()
  console.log(appointments)

  


  useEffect(()=>{
    getAllAppointments()
  },[aToken])
  return (
    <div className='w-full max-w-6xl m-5'>
      <h2 className='mb-3 text-lg font-medium'>All Appointments</h2>
      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>

        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
          <h4>#</h4>
          <h4>Patient</h4>
          <h4>Age</h4>
          <h4>Date & Time</h4>
          <h4>Doctor</h4>
          <h4>Fees</h4>
          <h4>Actions</h4>


        </div>
        {
          appointments.map((item,index)=>(
            <div className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-4'>
              <small className='msx-sm:hidden'>{index+1}</small>
              <div className='flex items-center gap-2'>
                <img className='w-10 rounded-full ' src={item.userData.image} alt="" />
                <h5>{item.userData.name}</h5>
                
              </div>
              <h5>{calculateAge(item.userData.dob)}</h5>
              <h5>{slotDateFormate(item.slotDate)},{item.slotTime}</h5>
              
              <div className='flex items-center gap-2 '>
                <img  className='w-10 rounded-full ' src={item.docData.image} alt="" />
                <h5>{item.docData.name}</h5>

              </div>
              <h5>{currency}{item.amount}</h5>
              {
                item.cancelled?<h5 className='text-red-400 text-md'>Cancelled</h5>:<img onClick={()=>cancelAppointment(item._id)} src={assets.cancel_icon} className='w-10 cursor-pointer' alt="" />
              }

            </div>
          ))
        }
      </div>
    </div>
  )
}

export default AllAppointments