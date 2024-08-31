import React, { useState, useEffect, useCallback} from 'react'
import axios from '../../api/api'
import { useParams, Link } from 'react-router-dom';
import { MdOutlineBlock, MdEdit, } from 'react-icons/md';
import Loader from '../Loader';
import Pagination from '../Pagination';

const PatientBill = () => {
    
  const [bills, setBills] = useState('')
  const [recordsPerPage, setRecordsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [searchBill, setSearchBill] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)
  const { id } = useParams();

  // Fetch All bills by patient id
  const getBillById = useCallback(async (offset, limit) => {
    try {
      const response = await axios.get(`/billing/?patientId=${id}&offset=${offset}&limit=${limit}`);
      setBills(response.data.items);
      setTotal(response.data.total);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error);
      setLoading(false);
    }
  },[id]);

  // Search bills
  const handleSearchChange = (e) => {
    setSearchBill(e.target.value);
    setCurrentPage(1);
  };

  // debounce for search query
  useEffect(() => {
    const timerId = setTimeout(() => {
      setLoading(true);
      getBillById((currentPage - 1) * recordsPerPage, recordsPerPage, searchBill);
    }, 500);
    return () => clearTimeout(timerId);
  }, [currentPage, recordsPerPage, searchBill, getBillById]);

  return (
    <div className='bg-white rounded-lg p-4'>
      <div className='flex flex-wrap items-center justify-between py-3'>
        <Link to={`/app/createbill/${id}`} className='bg-[#007CFF] hover:bg-[#7c86f9] text-white px-5 py-2 rounded-lg'>Create Bill</Link>
        <h5 className='text-[#007CFF]'>Showing {bills.length} out of {total} bills</h5>
        <div className='py-2'>
          <form>
            <label htmlFor='search'><span className='hidden'>Search</span>
              <input
                type='search'
                id='search'
                className='px-3 py-1.5 border bg-[#f2f9ff] border-slate-300 placeholder-slate-400 rounded-md focus:outline-none focus:border-[#007CFF] focus:ring-[#007CFF] focus:ring-1'
                required
                placeholder='Search bills'
                value={searchBill}
                onChange={handleSearchChange}
              />
            </label>
          </form>
        </div>
      </div>
      {loading
        ? (
          <div className='flex items-center justify-center bg-[#f1f4f6] h-[50vh]'>
            <Loader />
          </div>
          )
        : error
          ? (
            <div className='bg-[#f1f4f6] grid place-items-center h-[50vh]'>
              <div className='grid place-items-center'>
                <h2><MdOutlineBlock /></h2>
                <h4>Error occurred while fetching data</h4>
              </div>
            </div>
            )
          : (
            <div className='overflow-x-auto h-[50vh]'>
              {bills.length > 0
                ? (
                  <table className='w-full text-left table-auto'>
                    <thead>
                      <tr className='border-b border-slate-500'>
                      <th className='p-2'>ID</th>
                        <th className='p-2'>Billing Date</th>
                        <th className='p-2'>Amount</th>
                        <th className='p-2'>Status</th>
                        <th className='p-2'>Patient Name</th>
                        <th className='p-2'>Created At</th>
                        <th className='p-2'>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bills.map((bill) => (
                        <tr key={bill.billingId}>
                          <td className='p-2 '>{bill.billingId}</td>
                          <td className='p-2 '>{bill.billingDate}</td>
                          <td className='p-2 '>{bill.amount}</td>
                          <td className='p-2'>
                            {bill.status === 'pending' 
                            ? (<span className='bg-blue-100 text-blue-700 font-bold px-3 py-1 rounded-full'>Pending</span>) 
                            : (<span className='bg-green-100 text-green-700 font-bold px-3 py-1 rounded-full'>Paid</span>)}
                          </td>
                          <td className='p-2'>{bill.patientId}</td>
                          <td className='p-2'>{new Date(bill.createdAt).toISOString().replace('T', ' ').slice(0, 19)}</td>
                          <td className='p-2'>
                            <div className='flex'>
                              <span className='text-blue-600 text-xl'><Link to={`/app/updatebill/${bill.billingId}`}><MdEdit /></Link></span>
                            </div>
                          </td>
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
  )
}

export default PatientBill
