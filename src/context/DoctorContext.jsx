import { createContext, useContext, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";
 
 const DoctorContext=createContext()

   export const DoctorContextProvider=({children})=>{

    const backendUrl=import.meta.env.VITE_BACKEND_URL
    const [dToken,setDToken]=useState(localStorage.getItem('dToken')?localStorage.getItem('dToken'):'');

    const [appointments,setAppointments]= useState([])
    const [dashData,setDashData]=useState(false)
    const [profileData,setProfileData]=useState(false)

    const getAppointments=async()=>{
    
     try{
      const {data}= await axios.get(`${backendUrl}/api/doctor/appointments`,{headers:{token:dToken}})

      if(data.success){
        setAppointments(data.appointments)
       

      }
      else{
        toast.error(data.message)
      }
     }
     catch(error){
      toast.error(error.message)
     }
    }

    const appointmentCancellation=async(appointmentId)=>{
      try{
        const {data}=await axios.post(`${backendUrl}/api/doctor/appointment-cancel`,{appointmentId},{headers:{token:dToken}})

        if(data.success){
          toast.success(data.message)
          getAppointments()

        }
        else{
          toast.error(data.message)
          getAppointments()

        }

      }
      catch(error){
        toast.error(error.message)

      }
    }
    const appointmentCompleted=async(appointmentId)=>{
      try{
        const {data}=await axios.post(`${backendUrl}/api/doctor/appointment-completed`,{appointmentId},{headers:{token:dToken}})

        if(data.success){
          toast.success(data.message)
          getAppointments();

        }
        else{
          toast.error(data.message)

        }

      }
      catch(error){
        toast.error(error.message)

      }
    }

    const getDoctorDashBoard= async()=>{
      try{

        const {data}= await axios.get(`${backendUrl}/api/doctor/doctor-dashBoard`,{headers:{token:dToken}})

        if(data.success){
          setDashData(data.dashData)
        }else{
          toast.error(data.message)
        }

      }
      catch(error){
        toast.error(error.message)
        
      }
    }
    
    const getProfileData= async ()=>{
      try{
        const {data}=await axios.get(`${backendUrl}/api/doctor/doctor-profile`,{headers:{token:dToken}})

        if(data.success){
          setProfileData(data.docData)

        }else{
          toast.error(data.message)
        }

      }
      catch(error){
        toast.error(error.message)

      }
    }


    const value={
        dToken,setDToken,backendUrl,getAppointments,appointments,appointmentCancellation,appointmentCompleted,getDoctorDashBoard,dashData,getProfileData,profileData,setProfileData
    }
    return (
        <DoctorContext.Provider value={value}>
          {children}

        </DoctorContext.Provider>
    )
  }

  export function UseDoctorContext(){
    return useContext(DoctorContext);
  }