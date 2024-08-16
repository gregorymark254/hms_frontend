import React from 'react';
import { FaUsers, FaMoneyCheck, FaBook } from "react-icons/fa";

const Home = () => {

  // getting current user
  const currentUser = window.localStorage.getItem('token');
  const user = JSON.parse(currentUser).data.user_data;

  return (
    <main>
      <div className='mx-auto p-4'>
        {user.role === 'admin' ? (
          <div>
            <h3 className='text-[#007CFF]'><b>Admin DashBoard</b></h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4">
              <div className='flex items-center gap-4 bg-white p-4 rounded-md'>
                <div className='bg-blue-700 text-white p-4 rounded-lg'>
                  <span className='text-4xl'><FaUsers /></span>
                </div>
                <div>
                  <h4><b>All Users</b></h4>
                  <p className='text-blue-700 font-bold'>2,230</p>
                </div>
              </div>
              <div className='flex items-center gap-4 bg-white p-4 rounded-md'>
                <div className='bg-green-700 text-white p-4 rounded-lg'>
                  <span className='text-4xl'><FaBook /></span>
                </div>
                <div>
                  <h4><b>Appointments</b></h4>
                  <p className='text-green-700 font-bold'>9,242</p>
                </div>
              </div>
              <div className='flex items-center gap-4 bg-white p-4 rounded-md'>
                <div className='bg-orange-700 text-white p-4 rounded-lg'>
                  <span className='text-4xl'><FaMoneyCheck /></span>
                </div>
                <div>
                  <h4><b>Total Payments</b></h4>
                  <p className='text-orange-700 font-bold'>Ksh 234,230</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className='bg-[#007CFF] text-white p-4 rounded-lg'>
              <h3><b>Welcome to our DashBoard</b></h3>
              <p>To get started use the links on your left.</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;
