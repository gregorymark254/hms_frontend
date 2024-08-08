import React, { useState, useEffect, useCallback } from 'react'
import axios from '../../api/api';
import { Link } from 'react-router-dom';
import { MdOutlineBlock, MdRemoveRedEye } from 'react-icons/md';
import Loader from '../Loader';
import Pagination from '../Pagination';

const Doctor = () => {

  const [doctor,setDoctor] = useState('')
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(20);
  const [total, setTotal] = useState(0);
  const [searchDoctor, setSearchDoctor] = useState('');

  
  // Fetch All doctor
  const getDoctors = useCallback(async (offset, limit, search) => {
    try {
      const response = await axios.get(`/doctors/?offset=${offset}&limit=${limit}&search=${search}`);
      setDoctor(response.data.items);
      setTotal(response.data.total);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error);
      setLoading(false);
    }
  },[]);

  // Search doctor
  const handleSearchChange = (e) => {
    setSearchDoctor(e.target.value);
    setCurrentPage(1);
  };

  // debounce for search query
  useEffect(() => {
    const timerId = setTimeout(() => {
      setLoading(true);
      getDoctors((currentPage - 1) * recordsPerPage, recordsPerPage, searchDoctor);
    }, 500);
    return () => clearTimeout(timerId);
  }, [currentPage, recordsPerPage, searchDoctor, getDoctors]);


  return (
    <div className='mx-auto p-4'>
      <div className='bg-white rounded-lg p-4 lg:w-[78vw] xl:w-[81vw] 2xl:w-full'>
        <div className='flex flex-wrap items-center justify-between py-3'>
          <Link to='/app/adddoctor' className='bg-[#007CFF] hover:bg-[#7c86f9] text-white px-5 py-2 rounded-lg'>Add Docor</Link>
          <h5 className='text-[#007CFF]'>Showing {doctor.length} out of {total} doctor</h5>
          <div className='py-2'>
            <form>
              <label htmlFor='search'><span className='hidden'>Search</span>
                <input
                  type='search'
                  id='search'
                  className='px-3 py-1.5 border bg-[#f2f9ff] border-slate-300 placeholder-slate-400 rounded-md focus:outline-none focus:border-[#007CFF] focus:ring-[#007CFF] focus:ring-1'
                  required
                  placeholder='Search doctor'
                  value={searchDoctor}
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
                {doctor.length > 0
                  ? (
                    <table className='w-full text-left table-auto'>
                      <thead>
                        <tr className='border-b border-slate-500'>
                          <th className='p-2'>ID</th>
                          <th className='p-2'>First Name</th>
                          <th className='p-2'>Last Names</th>
                          <th className='p-2'>Email</th>
                          <th className='p-2'>Speciality</th>
                          <th className='p-2'>Phone Number</th>
                          <th className='p-2'>Created At</th>
                          <th className='p-2'>View</th>
                        </tr>
                      </thead>
                      <tbody>
                        {doctor.map((doc) => (
                          <tr key={doc.doctorId}>
                            <td className='p-2 '>{doc.doctorId}</td>
                            <td className='p-2 '>{doc.firstName}</td>
                            <td className='p-2'>{doc.lastName}</td>
                            <td className='p-2'>{doc.email}</td>
                            <td className='p-2'>{doc.speciality}</td>
                            <td className='p-2'>{doc.phoneNumber}</td>
                            <td className='p-2'>{new Date(doc.createdAt).toISOString().replace('T', ' ').slice(0, 19)}</td>
                            <td>
                              <span className='text-blue-600 text-xl'><Link to={`/app/viewappointments/${doc.doctorId}`}><MdRemoveRedEye /></Link></span>
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

export default Doctor
