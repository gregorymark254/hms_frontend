import React, { useState, useEffect } from 'react';
import { FaUsers, FaMoneyCheck, FaBook } from "react-icons/fa";
import axios from '../api/api'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const Home = () => {

  // getting current user
  const currentUser = window.localStorage.getItem('token');
  const user = JSON.parse(currentUser).data.user_data;

  const [stats,setStats] = useState([])
  const [start_day, setStart_day] = useState('')
  const [end_day, setEnd_day] = useState('')

  useEffect(() => {
    const getDayStats = async () => {
      try {
        let query = `?`
        if (start_day && end_day) {
          query += `start_date=${start_day}&end_day=${end_day}`
        }
        const response = await axios.get(`/reports/stats${query}`)
        setStats(response.data.items)
      } catch (error) {
        console.log(error)
      }
    }
    getDayStats()
  },[start_day, end_day])

  return (
    <main>
      <div className='mx-auto p-4'>
        {user.role === 'admin' ? (
          <div>
            <div className='flex flex-wrap justify-between'>
              <h3 className='text-[#007CFF]'><b>Admin DashBoard</b></h3>
              <form className='flex gap-2 w-full md:w-1/2 xl:w-1/3'>
                <div className='w-full'>
                  <label htmlFor='startdate'>Start Date
                    <input
                      type='date'
                      required
                      className='px-3 py-1.5 bg-inherit border-2 shadow-sm border-[#007CFF] placeholder-slate-400 focus:outline-none focus:border-[#007CFF] focus:ring-[#007CFF] block w-full rounded-md sm:text-sm focus:ring-1'
                      value={start_day}
                      onChange={(e) => setStart_day(e.target.value)}
                    />
                  </label>
                </div>
                <div className='w-full'>
                  <label htmlFor='enddate'>End Date
                    <input
                      type='date'
                      required
                      className='px-3 py-1.5 bg-inherit border-2 shadow-sm border-[#007CFF] placeholder-slate-400 focus:outline-none focus:border-[#007CFF] focus:ring-[#007CFF] block w-full rounded-md sm:text-sm focus:ring-1'
                      value={end_day}
                      onChange={(e) => setEnd_day(e.target.value)}
                    />
                  </label>
                </div>
              </form>
            </div>
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
