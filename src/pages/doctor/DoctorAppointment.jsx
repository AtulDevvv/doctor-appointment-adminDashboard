import React, { useEffect } from 'react'
import { UseDoctorContext } from '../../context/DoctorContext'
import { UseContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

function DoctorAppointment() {

  const {dToken,appointments,getAppointments,appointmentCancellation,appointmentCompleted}=UseDoctorContext();
  const {calculateAge,slotDateFormate,currency}=UseContext();
  // console.log(dToken)

  useEffect(()=>{
    getAppointments();

  },[dToken])

 
  return (
    <div>
      {
        appointments?<div>
        <h3 className='text-lg text-gray-700 font-semibold text-clip text-center'>All Appointments</h3>
      
        <div>
      
          <div className='max-sm:hidden ml-6 grid grid-cols-[0.5fr_2fr_2fr_2fr_3fr_1fr_0.5fr] gap-1 py-3 px-6 border-b'>
            <h5>#</h5>
            <h5>Patient</h5>
            <h5>Payment</h5>
            <h5>Age</h5>
            <h5>Date & Time</h5>
            <h5>Fees</h5>
            <h5>Action</h5>
          </div>
          {
            appointments.reverse().map((item,index)=>(
              <div className='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base max-sm:grid grid-cols-[0.5fr_2fr_2fr_2fr_3fr_1fr_0.4fr] gap-1 items-center text-gray-500 py-3 px-6 border-b' key={index}>
                <h5 className='hidden md:block'>{index+1}</h5>
                <div>
                  <img className='w-10 rounded-full ' src={item.userData.image} alt="" />
                <h5>{item.userData.name}</h5>
                </div>
                <div>
                  <h5>{item.payment?'Online':'CASH'}</h5>
                </div>
                <h5>{calculateAge(item.userData.dob)}</h5>
                <h5>{slotDateFormate(item.slotDate)},{item.slotTime}</h5>
                <div className='flex items-center justify-between '>
                  <h5>{currency}{item.amount}</h5>
                 {!item.isCompleted && !item.payment && !item.cancelled && <img onClick={()=>appointmentCancellation(item._id)} className='ml-3 cursor-pointer' src={assets.cancel_icon}/>}
                 {
                  item.cancelled&&!item.payment && !item.isCompleted&& <h3 className='text-sm text-red-500 ml-3'> Cancelled</h3>
                 }
                 {item.payment && item.isCompleted && <h5 className='text-green-600 px-1 rounded-full text-sm  '>Completed</h5>}
                 {
                  item.payment && !item.isCompleted &&
                  <img onClick={()=>appointmentCompleted(item._id)} className='ml-5 cursor-pointer' src={assets.tick_icon} alt="" />
                 }
                  
                </div>
              </div>
      
            ))
          }
        </div>
      </div>
        
        :<h2 className='text-xl text-gray-800 font-bold'> No Appointments yet</h2>
      }
    </div>
    
  )
}

export default DoctorAppointment