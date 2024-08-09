import React, { useState, useEffect, useCallback} from 'react'
import axios from '../../api/api'
import { useParams } from 'react-router-dom';
import { MdOutlineBlock } from 'react-icons/md';
import Loader from '../Loader';
import Pagination from '../Pagination';

const ViewDocAppointments = () => {

  const [appointments, setAppointments] = useState('')
  const [recordsPerPage, setRecordsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [searchAppointment, setSearchAppointment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)
  const { id } = useParams();


  // Fetch All appointment by doctor id
  const getAppointmentsById = useCallback(async (offset, limit) => {
    try {
      const response = await axios.get(`/appointments/?doctorId=${id}&offset=${offset}&limit=${limit}`);
      setAppointments(response.data.items);
      setTotal(response.data.total);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error);
      setLoading(false);
    }
  },[id]);

  // Search appointment
  const handleSearchChange = (e) => {
    setSearchAppointment(e.target.value);
    setCurrentPage(1);
  };

  // debounce for search query
  useEffect(() => {
    const timerId = setTimeout(() => {
      setLoading(true);
      getAppointmentsById((currentPage - 1) * recordsPerPage, recordsPerPage, searchAppointment);
    }, 500);
    return () => clearTimeout(timerId);
  }, [currentPage, recordsPerPage, searchAppointment, getAppointmentsById]);

  return (
    <div>
      <div className="mx-auto p-4">
        <h3 className='text-[#007CFF] text-center'><u>Doctors Appointments</u></h3>
        <div className='bg-white rounded-lg p-4'>
          <div className='flex flex-wrap items-center justify-between py-3'>
            <h5 className='text-[#007CFF]'>Showing {appointments.length} out of {total} appointment</h5>
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
              <div className='flex items-center justify-center bg-[#f1f4f6] h-[70vh]'>
                <Loader />
              </div>
              )
            : error
              ? (
                <div className='bg-[#f1f4f6] grid place-items-center h-[70vh]'>
                  <div className='grid place-items-center'>
                    <h2><MdOutlineBlock /></h2>
                    <h4>Error occurred while fetching data</h4>
                  </div>
                </div>
                )
              : (
                <div className='overflow-x-auto h-[70vh]'>
                  {appointments.length > 0
                    ? (
                      <table className='w-full text-left table-auto'>
                        <thead>
                          <tr className='border-b border-slate-500'>
                            <th className='p-2'>ID</th>
                            <th className='p-2'>Appointment Date</th>
                            <th className='p-2'>Reason</th>
                            <th className='p-2'>Status</th>
                            <th className='p-2'>Patient Name</th>
                            <th className='p-2'>Doctors Name</th>
                            <th className='p-2'>Created At</th>
                          </tr>
                        </thead>
                        <tbody>
                          {appointments.map((appointments) => (
                            <tr key={appointments.appointmentId}>
                              <td className='p-2 '>{appointments.appointmentId}</td>
                              <td className='p-2 '>{appointments.appointmentDate}</td>
                              <td className='p-2'>{appointments.reason}</td>
                              <td className='p-2'>{appointments.status}</td>
                              <td className='p-2'>{appointments.patientId}</td>
                              <td className='p-2'>{appointments.doctorId}</td>
                              <td className='p-2'>{new Date(appointments.createdAt).toISOString().replace('T', ' ').slice(0, 19)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      )
                    : (
                      <div className='bg-[#f1f4f6] grid place-items-center h-[50vh]'>
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
    </div>
  )
}

export default ViewDocAppointments 