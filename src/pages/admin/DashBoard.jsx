import React, { useEffect } from 'react'
import { UseAdminContext } from '../../context/AdminContext'
import {assets} from '../../assets/assets'

function DashBoard() {

  const{aToken,getDashdata,dashData}=UseAdminContext();


  useEffect(()=>{
    if(aToken){
      getDashdata();

    }

  },[aToken])

  return dashData && (
    <div className='m-5'>
      <div className='flex flex-wrap gap-4'>

    

  
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all  '>
          <img className='w-14' src={assets.doctor_icon} alt="" />
  
        <div>
        <h4>{dashData.doctors}</h4>
        <h4>Doctors</h4>
        </div>
        </div>

   

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all  '>
          <img  className='w-14'  src={assets.appointment_icon} alt="" />
       
        <div>
        <h4>{dashData.appointments}</h4>
        <h4>Appointments</h4>
        </div>
        </div>

    
     
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all  '>
          <img  className='w-14'  src={assets.patients_icon} alt="" />
     
        <div>
        <h4>{dashData.users}</h4>
        <h4>Patients</h4>
        </div>
        </div>

      </div>

      <div className='bg-white'>
        <div className='flex items-center gap-2 px-4 py-4 mt-10 rounded-t border'>
          <img src={assets.list_icon} alt="" />
          <strong>Latest Bookings</strong>
        </div>

        <div className='pt-4 border border-t-0'>
          {
            dashData.latestAppointments.map((item,index)=>(
              <div key={index} className='flex gap-4 justify-between px-3'>
                 <img className='w-10 rounded-full' src={item.docData.image} alt="" />
                 <div className=' flex-1 text-sm '>
                  <h5 className='text-gray-800 font-medium '>{item.docData.name}</h5>

                  <h5  className='text-gray-600'>{item.slotDate}</h5>
                  
                 </div>
                 
                  
                   {
                     item.cancelled?<h5 className='text-red-400 text-md'>Cancelled</h5>:<img onClick={()=>cancelAppointment(item._id)} src={assets.cancel_icon} className='w-10 cursor-pointer' alt="" />
                   }
                 

              </div>
            ))
          }

        </div>

      </div>
      </div>

  
  )
}

export default DashBoard