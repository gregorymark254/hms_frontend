import React, { useState, useEffect } from 'react';
import { FaUsers, FaMoneyCheck, FaBook } from "react-icons/fa";
import axios from '../api/api'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const Home = () => {

  // getting current user
  const currentUser = window.localStorage.getItem('token');
  const user = JSON.parse(currentUser).data.user_data;

  const [stats,setStats] = useState([])

  useEffect(() => {
    const getDayStats = async () => {
      try {
        const response = await axios.get('/reports/stats')
        setStats(response.data.items)
      } catch (error) {
        console.log(error)
      }
    }
    getDayStats()
  },[])

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

            {/* graph stats */}
            <div className='mt-4'>
              <div className='bg-white p-4 rounded-md' >
                <span><u><b>Number of registered users per day</b></u></span>
                <ResponsiveContainer width="100%" height={400}>
                <BarChart width={730} height={250} data={stats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
                </ResponsiveContainer>
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
