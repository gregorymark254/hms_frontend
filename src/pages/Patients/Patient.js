import React, { useState, useEffect, useCallback } from 'react'
import axios from '../../api/api';
import { Link } from 'react-router-dom';
import { MdOutlineBlock, MdEdit, MdRemoveRedEye, } from 'react-icons/md';
import Loader from '../Loader';
import Pagination from '../Pagination';

const Patient = () => {

  const [patient,setPatient] = useState('')
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(20);
  const [total, setTotal] = useState(0);
  const [searchPatient, setSearchPatient] = useState('');

  
  // Fetch All patient
  const getPatients = useCallback(async (offset, limit, search) => {
    try {
      const response = await axios.get(`/patients/?offset=${offset}&limit=${limit}&search=${search}`);
      setPatient(response.data.items);
      setTotal(response.data.total);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error);
      setLoading(false);
    }
  },[]);

  // Search patient
  const handleSearchChange = (e) => {
    setSearchPatient(e.target.value);
    setCurrentPage(1);
  };

  // debounce for search query
  useEffect(() => {
    const timerId = setTimeout(() => {
      setLoading(true);
      getPatients((currentPage - 1) * recordsPerPage, recordsPerPage, searchPatient);
    }, 500);
    return () => clearTimeout(timerId);
  }, [currentPage, recordsPerPage, searchPatient, getPatients]);


  return (
    <div className='mx-auto p-4'>
      <div className='bg-white rounded-lg p-4 lg:w-[78vw] xl:w-[81vw] 2xl:w-full'>
        <div className='flex flex-wrap items-center justify-between py-3'>
          <Link to='/app/addpatient' className='bg-[#007CFF] hover:bg-[#7c86f9] text-white px-5 py-2 rounded-lg'>Add Patient</Link>
          <h5 className='text-[#007CFF]'>Showing {patient.length} out of {total} patient</h5>
          <div className='py-2'>
            <form>
              <label htmlFor='search'><span className='hidden'>Search</span>
                <input
                  type='search'
                  id='search'
                  className='px-3 py-1.5 border bg-[#f2f9ff] border-slate-300 placeholder-slate-400 rounded-md focus:outline-none focus:border-[#007CFF] focus:ring-[#007CFF] focus:ring-1'
                  required
                  placeholder='Search patients'
                  value={searchPatient}
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
                {patient.length > 0
                  ? (
                    <table className='w-full text-left table-auto'>
                      <thead>
                        <tr className='border-b border-slate-500'>
                          <th className='p-2'>ID</th>
                          <th className='p-2'>First Name</th>
                          <th className='p-2'>Last Name</th>
                          <th className='p-2'>Email</th>
                          <th className='p-2'>Date of Birth</th>
                          <th className='p-2'>Gender</th>
                          <th className='p-2'>Address</th>
                          <th className='p-2'>Phone Number</th>
                          <th className='p-2'>Emergency Number</th>
                          <th className='p-2'>Insurance Number</th>
                          <th className='p-2'>Insurance Name</th>
                          <th className='p-2'>Created At</th>
                          <th className='p-2'>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {patient.map((patients) => (
                          <tr key={patients.patientId}>
                            <td className='p-2 '>{patients.patientId}</td>
                            <td className='p-2 '>{patients.firstName}</td>
                            <td className='p-2'>{patients.lastName}</td>
                            <td className='p-2'>{patients.email}</td>
                            <td className='p-2'>{patients.dateOfBirth}</td>
                            <td className='p-2'>{patients.gender}</td>
                            <td className='p-2'>{patients.address}</td>
                            <td className='p-2'>{patients.phoneNumber}</td>
                            <td className='p-2'>{patients.emergencyNumber}</td>
                            <td className='p-2'>{patients.insuranceNumber}</td>
                            <td className='p-2'>{patients.insuranceName}</td>
                            <td className='p-2'>{new Date(patients.createdAt).toISOString().replace('T', ' ').slice(0, 19)}</td>
                            <td className='p-2'>
                              <div className='flex'>
                                <span className='text-blue-600 text-xl'><Link to={`/app/viewpatient/${patients.patientId}`}><MdRemoveRedEye /></Link></span>
                                <span className='text-green-600 text-xl'><Link to={`/app/updatepatient/${patients.patientId}`}><MdEdit /></Link></span>
                              </div>
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

export default Patient
