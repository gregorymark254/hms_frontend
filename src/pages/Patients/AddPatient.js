import React, { useState } from 'react';
import axios from '../../api/api';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const AddPatient = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber,setPhoneNumber] = useState('')
  const [emergencyNumber,setEmergencyNumber] = useState('')
  const [insuranceNumber,setInsuranceNumber] = useState('')
  const [insuranceName,setInsuranceName] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      await axios.post('/patients/',
        {  firstName, lastName, email, dateOfBirth, gender, address, phoneNumber, emergencyNumber, insuranceNumber, insuranceName }
      )
      toast.success('Patient added sucessfully')
      navigate('/app/patients')
    } catch (error) {
      console.log(error)
      toast.error('Failed to add patient')
    }
  }

  return (
    <div className='mx-auto p-4 flex justify-center'>
      <div className='p-4 bg-white rounded-lg w-full lg:w-full xl:w-1/2'>
        <h3 className='text-xl text-center font-bold text-[#007CFF]'>Add New Patient.</h3>
        <form onSubmit={handleSubmit}>
          <div className='my-2'>
            <label htmlFor='firstname'><span>First Name</span>
              <input
                type='text'
                required
                placeholder='First Name'
                className='px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#007CFF] focus:ring-[#007CFF] block w-full rounded-md sm:text-sm focus:ring-1'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>
          </div>
          <div className='my-2'>
            <label htmlFor='LASTname'><span>Last Name</span>
              <input
                type='text'
                required
                placeholder='Last Name'
                className='px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#007CFF] focus:ring-[#007CFF] block w-full rounded-md sm:text-sm focus:ring-1'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>
          </div>
          <div className='my-2'>
            <label htmlFor='email'><span>Email</span>
              <input
                type='email'
                required
                placeholder='patient@gmail.com'
                className='px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#007CFF] focus:ring-[#007CFF] block w-full rounded-md sm:text-sm focus:ring-1'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>
          <div className='my-2'>
            <label htmlFor='date'><span>Date of Birth</span>
              <input
                type='date'
                required
                placeholder='D.O.B'
                className='px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#007CFF] focus:ring-[#007CFF] block w-full rounded-md sm:text-sm focus:ring-1'
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
            </label>
          </div>
          <div className='mt-2'>
            <label htmlFor='GENDER'>Gender
              <select 
                name="" id=""
                required
                className='px-3 py-2 bg-white border border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#007CFF] focus:ring-[#007CFF] w-full rounded-md focus:ring-1'
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </label>
          </div>
          <div className='my-2'>
            <label htmlFor='address'><span>Address</span>
              <input
                type='text'
                required
                placeholder='Address'
                className='px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#007CFF] focus:ring-[#007CFF] block w-full rounded-md sm:text-sm focus:ring-1'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </label>
          </div>
          <div className='my-2'>
            <label htmlFor='phone'><span>Phone Number</span>
              <input
                type='number'
                required
                placeholder='070000000'
                className='px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#007CFF] focus:ring-[#007CFF] block w-full rounded-md sm:text-sm focus:ring-1'
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </label>
          </div>
          <div className='my-2'>
            <label htmlFor='emergency'><span>Emergency Number</span>
              <input
                type='number'
                required
                placeholder='070000000'
                className='px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#007CFF] focus:ring-[#007CFF] block w-full rounded-md sm:text-sm focus:ring-1'
                value={emergencyNumber}
                onChange={(e) => setEmergencyNumber(e.target.value)}
              />
            </label>
          </div>
          <div className='my-2'>
            <label htmlFor='insurance'><span>Insurance Number</span>
              <input
                type='number'
                required
                placeholder='Insurance Number'
                className='px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#007CFF] focus:ring-[#007CFF] block w-full rounded-md sm:text-sm focus:ring-1'
                value={insuranceNumber}
                onChange={(e) => setInsuranceNumber(e.target.value)}
              />
            </label>
          </div>
          <div className='my-2'>
            <label htmlFor='name'><span>Insurance Name</span>
              <input
                type='text'
                required
                placeholder='Insurance Name'
                className='px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#007CFF] focus:ring-[#007CFF] block w-full rounded-md sm:text-sm focus:ring-1'
                value={insuranceName}
                onChange={(e) => setInsuranceName(e.target.value)}
              />
            </label>
          </div>
          <div className='py-3'>
            <button type='submit' className='bg-[#007CFF] text-white px-5 py-1 w-full hover:bg-[#7c86f9]'>Add Patient</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddPatient
