import React, { useEffect, useState } from 'react'
import { UseDoctorContext } from '../../context/DoctorContext'
import { assets } from '../../assets/assets'
import { UseContext } from '../../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

function DoctorProfile() {
  const{dToken,getProfileData,profileData,setProfileData,backendUrl}=UseDoctorContext()
  const{currency}=UseContext()

  const [isEdit,setEdit]=useState(false)

  const updateProfile=async()=>{
    try{
      const updateData={
        address:profileData.address,
        fees:profileData.fees,
        available:profileData.available

      }

      const {data}=await axios.post(`${backendUrl}/api/doctor/update-profile`,updateData,{headers:{token:dToken}})

      if(data.success){
        toast.success(data.message)
        setEdit(false)
      }
      else{
        toast.error(data.message)
      }
    }
    catch(error){
      toast.error(error.message)

    }
  }

  useEffect(()=>{
    if(dToken){
      getProfileData()
    }
  },[dToken])

  return profileData && (
    <div className='px-6'>

      <div  className='flex flex-col gap-4 m-5'>

        <div>
          <img className='bg-primary/80 w-1/3 sm:max-64 rounded-lg' src={profileData.image} alt="" />
        </div>
        <div className='flex-1 border-1 border-stone-100 rounded-lg p-8 py-7 bg-white'>
          <p className='flex items-center gap-2 text-3xl font-medium text-gray-700 '>{profileData.name}</p>

       
        <div className='flex items-center mt-1 gap-2 text-xl font-medium text-gray-600 '>
          <p>{profileData.degree}-{profileData.speciality}</p>
          <button className=' py-0.5 px-2 border text-xs rounded-xl'>{profileData.experience}</button>
        </div>
        {/* about doctor */}
        <div>
          <p className='flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3'>About:</p>
          <p className='text-sm text-gray-600 max-w-[70%] mt-1'>{profileData.about}</p>
        </div>
        <p className='text-gray-600 font-medium mt-4'>Appointment fee: <span className='text-gray-800'>{currency}{isEdit?<input text="number" onChange={(e)=>setProfileData(prev=>({...prev,fees:e.target.value}))} value={profileData.fees}/>:profileData.fees}</span></p>

      <div className='flex gap-2 py-3'>
        <p>Address:</p>
        <span className='text-sm '>{isEdit?<input type="text" value={profileData.address.line1} onChange={(e)=>setProfileData(prev=>({...prev,address:{...prev.address,line1:e.target.value}}))} />:profileData.address.line1}</span>
        <br />
        <span>{isEdit?<input type="text" value={profileData.address.line2} onChange={(e)=>setProfileData(prev=>({...prev,address:{...prev.address,line2:e.target.value}}))} />:profileData.address.line2}</span>
      </div>
      <div className='flex gap-1 pt-2'>
        {
          isEdit?<input type="checkbox" checked={profileData.available} onChange={(e)=>setProfileData(prev=>({...prev,available:!prev.available}))} />:<input checked={profileData.available} type="checkbox" name="" />
        }
        
        <label htmlFor="">Available</label>
      </div>
     {
      isEdit? <button onClick={()=>updateProfile()} className='px-4 border border-primary/80 text-sm rounded-full mt-5 hover:bg-primary transition-all duration-200 hover:text-white'> Save</button>: <button onClick={()=>setEdit(prev=>!prev)} className='px-4 border border-primary/80 text-sm rounded-full mt-5 hover:bg-primary transition-all duration-200 hover:text-white'> Edit</button>
     }

      </div>
      </div>

    </div>
  )
}

export default DoctorProfile