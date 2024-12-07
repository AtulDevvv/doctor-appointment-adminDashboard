import React, { useEffect } from 'react'
import { UseDoctorContext } from '../../context/DoctorContext'
import {assets} from '../../assets/assets'
import { UseContext } from '../../context/AppContext'

function DoctorsDashBoard() {

  const{dToken,dashData,getDoctorDashBoard}=UseDoctorContext()
  const {currency,slotDataFormat}=UseContext();

  useEffect(()=>{
    if(dToken){
      getDoctorDashBoard()
    }
  },[dToken])
  console.log(dashData)

  return  dashData && (
    <div className='m-5'>
      <div className='flex flex-wrap gap-4'>

    

  
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all  '>
          <img className='w-14' src={assets.earning_icon} alt="" />
  
        <div>
        <h4> {currency} {dashData.earnings}</h4>
      
        </div>
        </div>

   

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all  '>
          <img  className='w-14'  src={assets.appointment_icon} alt="" />
       
        <div className='flex  gap-2'>
        <h4>{dashData.appointments}</h4>
        <h4>Appointments</h4>
        </div>
        </div>

    
     
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all  '>
          <img  className='w-14'  src={assets.patients_icon} alt="" />
     
        <div className='flex gap-2'>
        <h4 className='text-md text-semibold text-gray-800'>{dashData.patients}</h4>
        <h4>Patients</h4>
        </div>
        </div>

      </div>

      <div className='bg-white'>
        <div className='flex items-center gap-2 px-4 py-4 mt-10 rounded-t border'>
          <img src={assets.list_icon} alt="" />
          <strong>Latest Bookings</strong>
        </div>

        <div className='pt-4 mt-4 border border-t-0'>
          {
            dashData.latestAppointments.map((item,index)=>(
              <div key={index} className='flex gap-8 justify-between px-3 mt-3'>
                 <img className='w-10 rounded-full' src={item.userData.image} alt="" />
                 <div className=' flex-1 text-sm '>
                  <h5 className='text-gray-800 font-medium '>{item.userData.name}</h5>

                  <h5  className='text-gray-600'>{item.slotDate}</h5>
                  
                 </div>
                 
                  
                 {
                  item.cancelled?<p className='text-red-300 text-sm'>cancelled</p>: <img onClick={()=>appointmentCancellation(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
                }
                 

              </div>
            ))
          }

        </div>

      </div>
      </div>

  
  )
}

export default DoctorsDashBoard