import React, { useState, useEffect, useCallback } from 'react'
import axios from '../../api/api';
import { MdOutlineBlock } from 'react-icons/md';
import Loader from '../Loader';
import Pagination from '../Pagination';

const Medication = () => {

  const [medications,setMedications] = useState('')
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(20);
  const [total, setTotal] = useState(0);
  const [searchMedication, setSearchMedication] = useState('');

  
  // Fetch All medications
  const getPrescriptions = useCallback(async (offset, limit, search) => {
    try {
      const response = await axios.get(`/medication/?offset=${offset}&limit=${limit}&search=${search}`);
      setMedications(response.data.items);
      setTotal(response.data.total);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error);
      setLoading(false);
    }
  },[]);

  // Search medications
  const handleSearchChange = (e) => {
    setSearchMedication(e.target.value);
    setCurrentPage(1);
  };

  // debounce for search query
  useEffect(() => {
    const timerId = setTimeout(() => {
      setLoading(true);
      getPrescriptions((currentPage - 1) * recordsPerPage, recordsPerPage, searchMedication);
    }, 500);
    return () => clearTimeout(timerId);
  }, [currentPage, recordsPerPage, searchMedication, getPrescriptions]);


  return (
    <div className='mx-auto p-4'>
      <div className='bg-white rounded-lg p-4 lg:w-[78vw] xl:w-[81vw] 2xl:w-full'>
        <div className='flex flex-wrap items-center justify-between py-3'>
          <h5 className='text-[#007CFF]'>Showing {medications.length} out of {total} medications</h5>
          <div className='py-2'>
            <form>
              <label htmlFor='search'><span className='hidden'>Search</span>
                <input
                  type='search'
                  id='search'
                  className='px-3 py-1.5 border bg-[#f2f9ff] border-slate-300 placeholder-slate-400 rounded-md focus:outline-none focus:border-[#007CFF] focus:ring-[#007CFF] focus:ring-1'
                  required
                  placeholder='Search medications'
                  value={searchMedication}
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
                {medications.length > 0
                  ? (
                    <table className='w-full text-left table-auto'>
                      <thead>
                        <tr className='border-b border-slate-500'>
                          <th className='p-2'>ID</th>
                          <th className='p-2'>Diagnosis</th>
                          <th className='p-2'>Treatment</th>
                          <th className='p-2'>Notes</th>
                          <th className='p-2'>Patient ID</th>
                          <th className='p-2'>Prescription ID</th>
                          <th className='p-2'>Created At</th>
                        </tr>
                      </thead>
                      <tbody>
                        {medications.map((medication) => (
                          <tr key={medication.medicationId}>
                            <td className='p-2 '>{medication.medicationId}</td>
                            <td className='p-2 '>{medication.diagnosis}</td>
                            <td className='p-2'>{medication.treatment}</td>
                            <td className='p-2'>{medication.notes}</td>
                            <td className='p-2'>{medication.patientId}</td>
                            <td className='p-2'>{medication.prescriptionId}</td>
                            <td className='p-2'>{new Date(medication.createdAt).toISOString().replace('T', ' ').slice(0, 19)}</td>
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

export default Medication
