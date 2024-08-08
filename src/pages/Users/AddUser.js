import React, { useState } from 'react';
import axios from '../../api/api';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role,setRole] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      await axios.post('/users/',
        {  firstName, lastName, email, password, role }
      )
      toast.success('User added sucessfully')
      navigate('/app/users')
    } catch (error) {
      console.log(error)
      toast.error('Failed to add user')
    }
  }

  return (
    <div className='mx-auto p-4 flex justify-center'>
      <div className='p-4 bg-white rounded-lg w-full lg:w-full xl:w-1/2'>
        <h3 className='text-xl text-center font-bold text-[#007CFF]'>Add New User.</h3>
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
            <label htmlFor='email'><span>Email Address</span>
              <input
                type='email'
                required
                placeholder='user@exampe.com'
                className='px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#007CFF] focus:ring-[#007CFF] block w-full rounded-md sm:text-sm focus:ring-1'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>
          <div className='mt-2'>
            <label htmlFor='role'>Role
              <select 
                name="" id=""
                required
                className='px-3 py-2 bg-white border border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#007CFF] focus:ring-[#007CFF] w-full rounded-md focus:ring-1'
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Role</option>
                <option value="admin">Admin</option>
                <option value="doctor">Doctor</option>
                <option value="patient">Patient</option>
                <option value="pharmacy">Pharmacy</option>
              </select>
            </label>
          </div>
          <div className='my-2'>
            <label htmlFor='password'><span>Password</span>
              <input
                type='password'
                required
                placeholder='Password'
                className='px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#007CFF] focus:ring-[#007CFF] block w-full rounded-md sm:text-sm focus:ring-1'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <div className='my-2'>
            <label htmlFor='password'><span>Confirm Password</span>
              <input
                type='password'
                required
                placeholder='Confirm Password'
                className='px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#007CFF] focus:ring-[#007CFF] block w-full rounded-md sm:text-sm focus:ring-1'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </label>
          </div>
          <div className='py-3'>
            <button type='submit' className='bg-[#007CFF] text-white px-5 py-1 w-full hover:bg-[#7c86f9]'>Create User</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddUser
