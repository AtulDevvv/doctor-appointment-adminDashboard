import axios from "axios";
import {  createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext=createContext()
 const AdminContextProvider=({children})=>{

    const [aToken,setAToken]=useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):'')

    const [appointments,setAppointments]=useState([])

    const backendUrl=import.meta.env.VITE_BACKEND_URL;

    const [doctors,setDoctors]=useState([])
    const [dashData,setDashData]=useState()

     const getAllDoctors=async ()=>{
      try{
         const {data}=await axios.post
         (`${backendUrl}/api/admin/all-doctors`,{},{headers:{aToken}});
        
     if(data.success){
      setDoctors(data.doctors)

     }
     else{
      toast.error(data.message)
     }
      }
      catch(err){
         console.log(err)
         toast.error(err.message)

      }
     }

     const changeAvailability= async(docId)=>{
      let data;
      
      try{
         const {data}= await axios.post(`${backendUrl}/api/admin/change-availability`,{docId},{headers:{aToken}})
      
       
        
    
 
       
         if(data.success){
            toast.success(data.message)
            getAllDoctors()
         }else{
            toast.error(data.message)
         }

      }
      catch(err){
         console.log(err.message)
         toast.error(err.message)

      }
     }

     const getAllAppointments=async()=>{
      try{
         const {data}= await axios.get(`${backendUrl}/api/admin/appointments`,{headers:{aToken}})
         if(data.success){
            setAppointments(data.appointments)
         }else{
            toast.error(data.message)
         }

      }
      catch(error){
         toast.error(error.message)
      }
     }
      const cancelAppointment=async(appointmentId)=>{
         try{
            const {data}= await axios.post(`${backendUrl}/api/admin/cancel-appointment`,{appointmentId},{headers:{aToken}})
            console.log(data)

            if(data.success){
               toast.success(data.message)

            }
            else{
               // console.log(data.message)
               toast.error(data.message)

            }

         }
         catch(error){
            toast.error(error.message);
         }
      }
      const getDashdata= async()=>{
         try{

            const {data}=await axios.get(`${backendUrl}/api/admin/dashboard`,{headers:{aToken}})
            if(data.success){
               console.log(data)
               setDashData(data.dashData)
            }else{
               toast.error(data.message)

            }
         }
         catch(error){
            toast.error(error.message)

         }
      }
     

    const value={
        aToken,setAToken,backendUrl,getAllDoctors,doctors,changeAvailability,getAllAppointments,appointments,cancelAppointment,getDashdata,dashData

    }

     return  (
        <AdminContext.Provider value={value}>
        {children}
        </AdminContext.Provider>
     ) 

 }

 export default AdminContextProvider;

 export  function UseAdminContext(){
    return useContext(AdminContext)
 }