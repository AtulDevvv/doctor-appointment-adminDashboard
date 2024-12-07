import {  createContext, useContext } from "react";

export const AppContext=createContext()
 const AppContextProvider=({children})=>{
   const currency='Rs.'

   const calculateAge=(dob)=>{
      const today= new Date();
      const birthDate= new Date(dob);
       let age= today.getFullYear()- birthDate.getFullYear()
       return age;

   }
   const months=[" ",'Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov',"Dec"]

   const slotDateFormate=(slotdate)=>{
     const dateArray=slotdate.split("_")
      return dateArray[0]+""+ months[Number(dateArray[1])]+""+dateArray[2]
   }

    const value={
      calculateAge,
      slotDateFormate,
      currency

    }

     return  (
        <AppContext.Provider value={value}>
          {children}
        </AppContext.Provider>
     ) 

 }

 export default AppContextProvider;

 export  function UseContext(){
    return useContext(AppContext)
 }