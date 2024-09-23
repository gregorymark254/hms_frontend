import React, { useState } from 'react';
import axios from '../api/api';
import { Toaster, toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';


const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error('Passwords do not match!')
    }
    setLoading(true);
    try {
      await axios.post('/auth/register',
        { firstName, lastName, email, password }
      );
      toast.success('Registration Sucessful');
      navigate('/login');
    } catch (error) {
      if (!error?.response) {
        toast.error('Network error! Check your connection')
      } else {
        toast.error('Registration Failed');
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='bg-white'>
      <Toaster position='top-center' richColors />
      <div className='flex flex-wrap items-center justify-center gap-4 h-full md:h-screen lg:h-[100vh]'>
        <div className='p-4 rounded-lg w-full flex items-center justify-center lg:w-1/3 xl:w-1/4'>
          <img width={400} height={400} src='https://img.freepik.com/free-vector/hospital-building-concept-illustration_114360-8440.jpg' alt='' />
        </div>
        <div className='p-4 rounded-lg w-full lg:w-1/3 xl:w-1/4'>
          <form onSubmit={handleSubmit}>
            <div className='text-center p-4'>
              <h3><b>Medix <span className='text-[#007CFF]'>Solutions</span></b></h3>
              <span className='text-lg font-light'>Please register to create an account.</span>
            </div>
            <div className='my-4'>
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
            <div className='my-4'>
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
            <div className='my-4'>
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
            <div className='my-4'>
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
            <div className='my-4'>
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
            <div className='my-4'>
              <button disabled={loading} className='bg-[#007CFF] text-white px-5 py-2 rounded-lg text-md w-full hover:bg-[#525cce]'>{loading ? 'Please Wait...' : 'Register'}</button>
            </div>
          </form>
          <div>
            <span>Already have an account? <u className='text-[#007CFF] hover:text-blue-700'><Link to='/login'>Login</Link></u></span>
          </div>

          <div>
            Lorem ipsum dolor, sit amet consectetu
            r adipisicing elit. Perspiciatis at sit voluptatibus dolorum nisi nulla quaerat? Sunt libero dicta ratione, iusto debitis quo dolor consequuntur quibusdam corrupti illum, optio voluptate?
          </div>
        </div>
      </div>
    </main>
  );
};

export default Register;