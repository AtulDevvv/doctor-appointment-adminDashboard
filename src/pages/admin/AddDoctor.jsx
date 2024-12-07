import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import { UseAdminContext } from '../../context/AdminContext'
import {toast} from 'react-toastify'
import axios from 'axios'

function AddDoctor() {
  const [docImg, setDocImg] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [experience, setExperience] = useState('')
  const [fees, setFees] = useState('')
  const [speciality, setSpeciality] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')
  const [education, setEducation] = useState('')
  const [about, setAbout] = useState('')



  const {backendUrl,aToken}=UseAdminContext()



   async function onSubmitHandler(e){
     e.preventDefault()
    

     try{

      if(!docImg){
        return toast.error('Image Not Selected')
      }

      const formData=new FormData()
      formData.append('image',docImg)
      formData.append('name',name)
      formData.append('email',email)
      formData.append('password',password)
      
      formData.append('fees',fees)
      formData.append('about',about)
      formData.append('speciality',speciality)
      formData.append('degree',education)
      formData.append('address',JSON.stringify({line1:address1,line2:address2}))
      formData.append('experience',experience)

      console.log(formData)

      formData.forEach((value,key)=>{
        console.log(`${key} & ${value}`)
      })

      const {data}=await axios.post(`${backendUrl}/api/admin/add-doctor`,formData,{headers:{aToken}})

      if(data.success){
        toast.success(data.message)
        setDocImg(false)
        setName('')
        setPassword('')
        setEducation('')
        setEmail('')
        setAbout('')
        setAddress1('')
        setAddress2('')
        setExperience('')
        setFees('')
        setSpeciality('')
      }else{
        toast.error(data.message)
      }

    

     }
     catch(err){
      console.log(err)

     }

  }

  return (
    <form className='m-5 w-full' onSubmit={onSubmitHandler}>
      <h1 className='mb-3 text-lg font-medium'> Add Doctor</h1>

      <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
        <div className='flex items-center gap-4 mb-8 text-gray-500'>
          <label htmlFor="doc-img">
            <img className='w-16 bg-gray-100 rounded-full cursor-pointer' src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="" />
          </label>

          <input type="file" id='doc-img' hidden onChange={(e) => setDocImg(e.target.files[0])} />
          <h3>Upload doctor <br /> picture</h3>
        </div>

        <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <div className='flex-1 flex flex-col gap-1'>
              <strong>Your name</strong>
              <input
                className='border rounded px-3 py-2'
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Name'
                required
              />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <strong>Doctor Email</strong>
              <input
                className='border rounded px-3 py-2'
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Email'
                required
              />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <strong>Doctor Password</strong>
              <input
                className='border rounded px-3 py-2'
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'
                required
              />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <strong>Experience</strong>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              >
                <option value="">Select Experience</option>
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
              </select>
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <strong>Fees</strong>
              <input
                className='border rounded px-3 py-2'
                type="number"
                value={fees}
                onChange={(e) => setFees(e.target.value)}
                placeholder='Fees'
              />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <strong>Speciality</strong>
              <select
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
              >
                <option value="">Select Speciality</option>
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <strong>Education</strong>
              <input
                className='border rounded px-3 py-2'
                type="text"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                placeholder='Education'
              />
            </div>

            <div className='flex gap-7'>
              <strong>Address</strong>
              <input
                className='border rounded px-3 py-2'
                type="text"
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                placeholder='Address 1'
              />
              <input
                className='border rounded px-3 py-2'
                type="text"
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
                placeholder='Address 2'
              />
            </div>
          </div>
        </div>

        <div className='flex text-gray-600 flex-col'>
          <strong>About Doctor</strong>
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder='Write about the doctor'
            rows={5}
          ></textarea>
        </div>

        <div className='w-full'>
          <button className='mt-5 bg-primary py-2 px-4 rounded-full'> Add doctor</button>
        </div>
      </div>
    </form>
  )
}

export default AddDoctor
