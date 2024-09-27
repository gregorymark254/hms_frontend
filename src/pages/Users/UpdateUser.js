import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../api/api';
import { toast } from 'sonner';

const UpdateUser = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getUserById = async () => {
      try {
        const response = await axios.get(`/users/${id}`);
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setRole(response.data.role);
      } catch (error) {
        console.error(error);
      }
    };
    getUserById();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/users/${id}`, 
        { firstName, lastName, role }
      );
      toast.success('User Updated');
      navigate('/app/users');
    } catch (error) {
      if (!error?.response) {
        toast.error('Network error! Check your connection')
      } else {
        toast.error('Failed to update user');
      }
      console.log(error);
    }
  };

  return (
    <div>
      <div className="mx-auto p-4 flex justify-center">
        <div className="bg-white p-4 rounded-lg w-full lg:w-full xl:w-1/2">
          <h3 className='text-xl text-center font-bold text-[#007CFF]'>Update User.</h3>
          <form onSubmit={handleSubmit}>
            <div className='my-4'>
              <label htmlFor='firstname'><span>First Name</span>
                <input
                  type='text'
                  placeholder='First Name'
                  className='px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#007CFF] focus:ring-[#007CFF] block w-full rounded-md sm:text-sm focus:ring-1'
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>
            </div>
            <div className='my-4'>
              <label htmlFor='LASTname'><span>Last Name</span>
                <input
                  type='text'
                  placeholder='Last Name'
                  className='px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#007CFF] focus:ring-[#007CFF] block w-full rounded-md sm:text-sm focus:ring-1'
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
            </div>
            <div className='mt-2'>
              <label htmlFor='role'>Role
                <select 
                  name="" id=""
                  className='px-3 py-2 bg-white border border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#007CFF] focus:ring-[#007CFF] w-full rounded-md focus:ring-1'
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="">Role</option>
                  <option value="admin">Admin</option>
                  <option value="doctor">Doctor</option>
                  <option value="reception">Reception</option>
                  <option value="pharmacy">Pharmacy</option>
                </select>
              </label>
            </div>
            <div className='my-4'>
              <button  className='bg-[#007CFF] text-white px-5 py-2 rounded-lg text-md w-full hover:bg-[#525cce]'>Update User</button>
            </div>
          </form>
          </div>
      </div>
    </div>
  )
}

export default UpdateUser
