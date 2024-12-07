
import React, { useState } from 'react'
import { UseAdminContext } from '../../context/AdminContext'
import axios from 'axios'
import {toast } from 'react-toastify'
import { UseDoctorContext } from '../../context/DoctorContext'
import { useNavigation } from 'react-router-dom'

function Login() {

    const[state,setState]=useState('Admin')

    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')


    const {setAToken,backendUrl}=UseAdminContext()
    const{dToken,setDToken}=UseDoctorContext()
    const onSubmitHandler=async(e)=>{
        e.preventDefault()
        try{
            if(state==='Admin'){
                const {data}=await axios.post(backendUrl+'/api/admin/login',{email,password});

                if(data.success){
                    console.log(data.token)
                    localStorage.setItem('aToken',data.token)

                    setAToken(data.token)
                    setState('Admin')
                    toast.success(data.message)
                    
                }else{
                    console.log(data.message)
                    toast.error(data.message)
                    
    
                }
                 

            }else{ 
                const {data}=await axios.post(`${backendUrl}/api/doctor/login`,{email,password})
                if(data.success){
                    localStorage.setItem('dToken',data.token)
                    setDToken(data.token)
                }else{
                    toast.error(data.message)
                }

            }

        }
        catch(err){
            console.log(err)

        }
    }



  return (
    <form onSubmit={onSubmitHandler} action="" className='min-h-[80vh] flex items-center justify-center '>
        <div className=' flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96  border rounded-xl  text-gray-600 text-sm shadow-lg '>
        <h2 className='text-3xl bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent font-semibold m-auto'> <span>{state}</span> Login</h2>
        <div>
           <h3 className='text-xl font-semibold m-auto '>Email</h3>
           <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" className=' outline-2 outline-gray-50' />
        </div>
        <div>
            <h3 className='text-xl font-semibold m-auto'>Password</h3>
            <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" />
        </div>
        <button className='rounded-full p-2 px-4 bg-primary text-white m-auto '>
            Login
        </button>
        {
                state==='Admin'?<h3 className='hover:text-gray-500 '> <span>Doctor Login?</span> <span onClick={()=>{
                    setState('Doctor')
               
                }}  className='underline cursor-pointer'>Click here</span></h3>:<h3><span>Admin Login?</span><span onClick={()=>{
                    setState('Admin')
          
                }}  className='underline cursor-pointer' >Click here</span></h3>
            }
        </div>
    </form>
  )
}

export default Login