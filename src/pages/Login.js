import React, { useState } from 'react';
import axios from '../api/api';
import { Toaster, toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const Login = ({ setAccessToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = await axios.post('/auth/',
        { email, password }
      );
      setAccessToken(token);
      toast.success('Login Sucessful');
      navigate('/app/dashboard');
    } catch (error) {
      if (!error?.response) {
        toast.error('Network error! Check your connection')
      } else {
        toast.error('Login Failed!')
      }
      console.log(error);
      setLoading(false);
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
            <div className='text-center p-3'>
              <h3><b>Medix <span className='text-[#007CFF]'>Solutions</span></b></h3>
              <span className='text-lg font-light'>Please login to your account.</span>
            </div>
            <div className='my-3'>
              <label htmlFor='email'><span>Email Address</span>
                <input
                  type='text'
                  required
                  placeholder='user@example.com'
                  className='px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#007CFF] focus:ring-[#007CFF] block w-full rounded-md sm:text-sm focus:ring-1'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
            </div>
            <div className='my-3'>
              <label htmlFor='password'><span>Password</span>
                <input
                  type='password'
                  required
                  placeholder='********'
                  className='px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#007CFF] focus:ring-[#007CFF] block w-full rounded-md sm:text-sm focus:ring-1'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </div>
            <div className='my-3'>
              <button disabled={loading} className='bg-[#007CFF] text-white px-5 py-2 rounded-lg text-md w-full hover:bg-[#525cce]'>{loading ? 'Please Wait...' : 'Login'}</button>
            </div>
          </form>
          <div>
            <span>Don't have an account? <u className='text-[#007CFF] hover:text-blue-700'><Link to='/register'>Register</Link></u></span>
          </div>
          <div className='mt-4'>
            <span>Admin:  greg@gmail.com</span>
            <p>password:  qwerty123</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;

Login.propTypes = {
  setAccessToken: PropTypes.func
};
