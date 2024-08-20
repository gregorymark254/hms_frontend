import React, { useState, useEffect, useCallback } from 'react'
import axios from '../../api/api';
import { MdOutlineBlock, } from 'react-icons/md';
import Loader from '../Loader';
import Pagination from '../Pagination';

const Billing = () => {

  const [billing,setBilling] = useState('')
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(20);
  const [total, setTotal] = useState(0);
  const [searchBilling, setSearchBilling] = useState('');

  
  // Fetch All billing
  const getAppointments = useCallback(async (offset, limit, search) => {
    try {
      const response = await axios.get(`/billing/?offset=${offset}&limit=${limit}&search=${search}`);
      setBilling(response.data.items);
      setTotal(response.data.total);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error);
      setLoading(false);
    }
  },[]);

  // Search billing
  const handleSearchChange = (e) => {
    setSearchBilling(e.target.value);
    setCurrentPage(1);
  };

  // debounce for search query
  useEffect(() => {
    const timerId = setTimeout(() => {
      setLoading(true);
      getAppointments((currentPage - 1) * recordsPerPage, recordsPerPage, searchBilling);
    }, 500);
    return () => clearTimeout(timerId);
  }, [currentPage, recordsPerPage, searchBilling, getAppointments]);

  return (
    <div className='mx-auto p-4'>
      <div className='bg-white rounded-lg p-4'>
        <div className='flex flex-wrap items-center justify-between py-3'>
          <h5 className='text-[#007CFF]'>Showing {billing.length} out of {total} bills</h5>
          <div className='py-2'>
            <form>
              <label htmlFor='search'><span className='hidden'>Search</span>
                <input
                  type='search'
                  id='search'
                  className='px-3 py-1.5 border bg-[#f2f9ff] border-slate-300 placeholder-slate-400 rounded-md focus:outline-none focus:border-[#007CFF] focus:ring-[#007CFF] focus:ring-1'
                  required
                  placeholder='Search bill'
                  value={searchBilling}
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
                {billing.length > 0
                  ? (
                    <table className='w-full text-left table-auto'>
                      <thead>
                        <tr className='border-b border-slate-500'>
                          <th className='p-2'>ID</th>
                          <th className='p-2'>Patient Name</th>
                          <th className='p-2'>Amount</th>
                          <th className='p-2'>Status</th>
                          <th className='p-2'>Billing Date</th>
                          <th className='p-2'>Created At</th>
                        </tr>
                      </thead>
                      <tbody>
                        {billing.map((bill) => (
                          <tr key={bill.billingId}>
                            <td className='p-2'>{bill.billingId}</td>
                            <td className='p-2'>{bill.patient_name}</td>
                            <td className='p-2'>{bill.amount}</td>
                            <td className='p-2'>
                              {bill.status === 'pending' 
                              ? (<span className='bg-blue-100 text-blue-700 font-bold px-3 py-1 rounded-full'>Pending</span>) 
                              : (<span className='bg-green-100 text-greeb-700 font-bold px-3 py-1 rounded-full'>Paid</span>)}
                            </td>
                            <td className='p-2'>{new Date(bill.billingDate).toISOString().replace('T', ' ').slice(0, 19)}</td>
                            <td className='p-2'>{new Date(bill.createdAt).toISOString().replace('T', ' ').slice(0, 19)}</td>
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

export default Billing
