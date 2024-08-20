import React, { useState, useEffect, useCallback } from 'react'
import axios from '../../api/api';
import { MdOutlineBlock, MdCheck, MdClose } from 'react-icons/md';
import { toast } from 'sonner'
import Loader from '../Loader';
import Pagination from '../Pagination';


const Appointment = () => {

  const [appointment,setAppointment] = useState('')
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(20);
  const [total, setTotal] = useState(0);
  const [searchAppointment, setSearchAppointment] = useState('');

  
  // Fetch All appointment
  const getAppointments = useCallback(async (offset, limit, search) => {
    try {
      const response = await axios.get(`/appointments/?offset=${offset}&limit=${limit}&search=${search}`);
      setAppointment(response.data.items);
      setTotal(response.data.total);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error);
      setLoading(false);
    }
  },[]);

  // Search appointment
  const handleSearchChange = (e) => {
    setSearchAppointment(e.target.value);
    setCurrentPage(1);
  };

  // debounce for search query
  useEffect(() => {
    const timerId = setTimeout(() => {
      setLoading(true);
      getAppointments((currentPage - 1) * recordsPerPage, recordsPerPage, searchAppointment);
    }, 500);
    return () => clearTimeout(timerId);
  }, [currentPage, recordsPerPage, searchAppointment, getAppointments]);

  // confirm appointments
  const approveAppointment = async (patientId) => {
    try {
      const response = await axios.put(`/appointments/${patientId}/approve`)
      toast.success(response.data.message);
      getAppointments((currentPage - 1) * recordsPerPage, recordsPerPage, searchAppointment);
    } catch (error) {
      console.log(error)
      toast.error('Failed to confim appointment')
    }
  }

  // cancel appointments
  const cancelAppointment = async (patientId) => {
    const confirmed = window.confirm('Are you sure you want to cancel this appointment');
    if (confirmed) {
      try {
        const response = await axios.put(`/appointments/${patientId}/cancel`)
        toast.success(response.data.message);
        getAppointments((currentPage - 1) * recordsPerPage, recordsPerPage, searchAppointment);
      } catch (error) {
        console.log(error)
        toast.error('Failed to cancel appointment')
      }
    }
  }

  return (
    <div className='mx-auto p-4'>
      <div className='bg-white rounded-lg p-4'>
        <div className='flex flex-wrap items-center justify-between py-3'>
          <h5 className='text-[#007CFF]'>Showing {appointment.length} out of {total} appointment</h5>
          <div className='py-2'>
            <form>
              <label htmlFor='search'><span className='hidden'>Search</span>
                <input
                  type='search'
                  id='search'
                  className='px-3 py-1.5 border bg-[#f2f9ff] border-slate-300 placeholder-slate-400 rounded-md focus:outline-none focus:border-[#007CFF] focus:ring-[#007CFF] focus:ring-1'
                  required
                  placeholder='Search appointments'
                  value={searchAppointment}
                  onChange={handleSearchChange}
                />
              </label>
            </form>
          </div>
        </div>
        {loading
          ? (
            <div className='flex items-center justify-center bg-[#f1f4f6] h-screen md:h-[56em] lg:h-[25em] xl:h-[35em] 2xl:lg:h-[48em]'>
              <Loader />
            </div>
            )
          : error
            ? (
              <div className='bg-[#f1f4f6] grid place-items-center h-screen md:h-[56em] lg:h-[25em] xl:h-[35em] 2xl:lg:h-[48em]'>
                <div className='grid place-items-center'>
                  <h2><MdOutlineBlock /></h2>
                  <h4>Error occurred while fetching data</h4>
                </div>
              </div>
              )
            : (
              <div className='overflow-x-auto h-[73vh]'>
                {appointment.length > 0
                  ? (
                    <table className='w-full text-left table-auto'>
                      <thead>
                        <tr className='border-b border-slate-500'>
                          <th className='p-2'>ID</th>
                          <th className='p-2'>Patient Names</th>
                          <th className='p-2'>Appointment Date</th>
                          <th className='p-2'>Reason</th>
                          <th className='p-2'>Doctors Name</th>
                          <th className='p-2'>Status</th>
                          <th className='p-2'>Created At</th>
                          <th className='p-2'>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {appointment.map((appointments) => (
                          <tr key={appointments.appointmentId}>
                            <td className='p-2 '>{appointments.appointmentId}</td>
                            <td className='p-2'>{appointments.patient_name}</td>
                            <td className='p-2 '>{appointments.appointmentDate}</td>
                            <td className='p-2'>{appointments.reason}</td>
                            <td className='p-2'>{appointments.doctor_name}</td>
                            <td className='p-2'>
                              {appointments.status === 'pending' ? (
                                <span className='bg-blue-100 text-blue-700 font-bold px-4 py-1 rounded-full'>Pending</span>
                              ) : appointments.status === 'confirmed' ? (
                                <span className='bg-green-100 text-green-700 font-bold px-4 py-1 rounded-full'>Confirmed</span>
                              ) : (
                                <span className='bg-red-100 text-red-700 font-bold px-4 py-1 rounded-full'>Canceled</span>
                              )}
                            </td>
                            <td className='p-2'>{new Date(appointments.createdAt).toISOString().replace('T', ' ').slice(0, 19)}</td>
                            <td className='p-2'>
                              {appointments.status === 'pending' || appointments.status === 'canceled' ? (
                                <button onClick={() => approveAppointment(appointments.patientId)} className='flex items-center space-x-2 bg-purple-800 text-white px-4 py-0.5 rounded-full hover:bg-purple-600'><span><MdCheck /></span> Confirm</button>
                              ) : (
                                <button onClick={() => cancelAppointment(appointments.patientId)} className='flex items-center space-x-2 bg-red-600 text-white px-4 py-0.5 rounded-full hover:bg-red-500'><span><MdClose /></span> Cancel</button>
                              )}
                              
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    )
                  : (
                    <div className='bg-[#f1f4f6] grid place-items-center h-screen md:h-[56em] lg:h-[25em] xl:h-[35em] 2xl:lg:h-[48em]'>
                      <div className='grid place-items-center'>
                        <h2><MdOutlineBlock /></h2>
                        <h4>No Data</h4>
                      </div>
                    </div>
                    )}
              </div>
              )}
          <div className='flex flex-wrap items-center justify-between mt-4 gap-4'>
          <div>
            <span className='mr-2'>Records per page:</span>
            <select
              className='px-3 py-1 border bg-[#f2f9ff] border-slate-300 rounded-md focus:outline-none focus:border-[#007CFF] focus:ring-[#007CFF]'
              value={recordsPerPage}
              onChange={(e) => {
                setRecordsPerPage(parseInt(e.target.value, 10));
                setCurrentPage(1);
              }}
            >
              <option value='20'>20</option>
              <option value='50'>50</option>
              <option value='75'>75</option>
              <option value='100'>100</option>
            </select>
          </div>
          <Pagination
            nPages={Math.ceil(total / recordsPerPage)}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  )
}

export default Appointment
