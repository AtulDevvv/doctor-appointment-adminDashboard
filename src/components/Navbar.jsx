import React from 'react'
import { UseAdminContext } from '../context/AdminContext'
import { assets } from '../../../ourDoctors/src/assets/asset'
import {useNavigate} from 'react-router-dom'
import { UseDoctorContext } from '../context/DoctorContext'

function Navbar() {

    const {aToken,setAToken}=UseAdminContext()
    const navigate=useNavigate()
    const {dToken,setDToken}=UseDoctorContext();

    const logout=()=>{
      console.log('heloo')
        navigate('/')
        if(Boolean(aToken)){
          aToken && setAToken('')
        aToken && localStorage.removeItem('aToken')
        }
        if(Boolean(dToken)){
          dToken && setDToken('')
          dToken && localStorage.removeItem('dToken')

        }
    }

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
        <div className='flex items-center gap-2 text-xs' >
            <img className='w-36 sm:w-40 cursor-pointer  ' src={assets.logo} alt="" />
            <h2 className='border w-fit px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>{aToken?'Admin':'Doctor '}</h2>
        </div>
        <button onClick={logout} className='bg-primary text-white text-sm px-10 rounded-full py-2 font-semibold'>Logout</button>
    </div>   
  )
}

export default Navbar