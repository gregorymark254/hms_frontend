import React, { useState } from 'react';
import axios from '../../api/api';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const AddDoctor = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [phoneNumber,setPhoneNumber] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      await axios.post('/doctors/',
        {  firstName, lastName, email, speciality, phoneNumber }
      )
      toast.success('Doctor added sucessfully')
      navigate('/app/doctors')
    } catch (error) {
      console.log(error)
      toast.error('Failed to add doctor')
    }
  }

  return (
    <div className='mx-auto p-4 flex justify-center'>
      <div className='p-4 bg-white rounded-lg w-full lg:w-full xl:w-1/2'>
        <h3 className='text-xl text-center font-bold text-[#007CFF]'>Add New Doctor.</h3>
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
            <label htmlFor='speciality'><span>Speciality</span>
              <input
                type='text'
                required
                placeholder='Speciality'
                className='px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#007CFF] focus:ring-[#007CFF] block w-full rounded-md sm:text-sm focus:ring-1'
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
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
          <div className='py-3'>
            <button type='submit' className='bg-[#007CFF] text-white px-5 py-1 w-full hover:bg-[#7c86f9]'>Add Doctor</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddDoctor
