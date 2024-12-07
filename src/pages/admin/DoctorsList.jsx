import React, { useCallback, useEffect } from 'react'
import { UseAdminContext } from '../../context/AdminContext'

function DoctorsList() {

  const {doctors,getAllDoctors,aToken,changeAvailability}=UseAdminContext()

  useEffect(()=>{
    if(aToken){
      getAllDoctors()
    }

  },[aToken])
  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>

      <h1 className='text-lg font-medium'> All Doctors</h1>
      <div className='flex w-full flex-wrap gap-4 pt-5 gap-y-6 '>
        {
          doctors?.map((item,index)=>(
            <div className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group  ' key={index}>

                   <img className='bg-indigo-100 group-hover:bg-primary transition-all duration-200:' src={item.image} alt="" />

                   <div className='p-4 '>
                    <h2 className='text-neutral-800 text-lg font-medium'>{item.name}</h2>
                    <h3 className='text-zinc-600 text-sm'>{item.speciality}</h3>



                
                   <div className='flex mt-2 item-center gap-1 text-sm'>
                    <input type="checkbox" onChange={()=>{changeAvailability(item._id);
                     
                    }} checked={item.available} />
                    <h3>Available</h3>
                   </div>
                   </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default DoctorsList