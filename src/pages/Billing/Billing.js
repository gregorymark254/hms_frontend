import React, { useState, useEffect, useCallback } from 'react'
import axios from '../../api/api';
import { MdOutlineBlock, } from 'react-icons/md';
import Loader from '../Loader';
import { toast } from 'sonner'
import Swal from 'sweetalert2'
import Pagination from '../Pagination';
import { useNavigate } from "react-router-dom";

const Billing = () => {

  const [billing,setBilling] = useState('')
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(20);
  const [total, setTotal] = useState(0);
  const [searchBilling, setSearchBilling] = useState('');
  const [selectedRequestId, setSelectedRequestId] = useState('');
  const [transactionId,setTransactionId] = useState('')
  const [amount,setAmount] = useState('')
  const [phoneNumber,setPhoneNumber] = useState('')
  const [patientId,setPatientId] = useState('')
  const [billingId,setBillingId] = useState('')
  const [paymentMethod,setPaymentMethod] = useState('')
  const [paymentLoading,setPaymentLoading] = useState(new Map())
  const navigate = useNavigate()

  
  // Fetch All billing
  const getBills = useCallback(async (offset, limit, search) => {
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
      getBills((currentPage - 1) * recordsPerPage, recordsPerPage, searchBilling);
    }, 500);
    return () => clearTimeout(timerId);
  }, [currentPage, recordsPerPage, searchBilling, getBills]);
  

  // modal
  const openModal = (billingId) => {
    setSelectedRequestId(billingId);
    const dialog = document.getElementById('my_modal_3');
    if (dialog !== null) {
      dialog.showModal();
    }
  };

  // getting bill by id
  const getBillById = useCallback(async () => {
    if (selectedRequestId) {
      try {
        const response = await axios.get(`/billing/${selectedRequestId}`);
        setAmount(response.data.amount || '');
        setPhoneNumber(response.data.phoneNumber || '');
        setPatientId(response.data.patientId || '');
        setBillingId(response.data.billingId || '');
      } catch (error) {
        console.log(error);
      }
    }
  },[selectedRequestId])

  useEffect(() => {
    getBillById();
  }, [getBillById]);


  // Generate unique transactionId for cash payments
  const generateTransactionId = () => {
    return `TXN-${Math.floor(Math.random() * 1000)}`;
  };


  // pay bill
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      if (paymentMethod === 'cash') {
        setTransactionId(generateTransactionId());
        await axios.post('/payments/', {
          transactionId, amount, phoneNumber, paymentMethod, patientId, billingId
        });
        toast.success('Payment Added Successfully');
      } else {
        await axios.post('/payments/mpesa', {
          amount, phoneNumber, paymentMethod, patientId, billingId
        });
        toast.info('STK Push sent to phone');
      }
      navigate('/app/billings')
    } catch (error) {
      if (error.response.status === 400) {
        toast.error(error.response.data.detail);
      } else {
        toast.error('Failed to add Payment');
      }
      console.log(error);
    } finally {
      setLoading(false)
    }
  }

  // checking payment if not automatically updated
  const checkPayment = async (billingId) => {
    setPaymentLoading(new Map(paymentLoading.set(billingId, true))) // set loading for specific billing button
    try {
      const response = await axios.post(`/payments/payment_status/${billingId}`)
      Swal.fire({title: response.data[0].message, text: response.data[0].ResultDesc, icon: "success"});
    } catch (error) {
      if (error.response.status === 404) {
        Swal.fire({title: "Payment Status", text: error.response.data.detail, icon: "error"});
      } else if (error.response.status === 400) {
        Swal.fire({title: error.response.data.detail.message, text: error.response.data.detail.ResultDesc, icon: "error"});
      } else {
        Swal("Payment Status", "Failed to check transaction status", "error" );
      }
      console.log(error)
    } finally{
      setPaymentLoading(new Map(paymentLoading.set(billingId, false)))
    }
  }

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
                          <th className='p-2'>Phone Number</th>
                          <th className='p-2'>Status</th>
                          <th className='p-2'>Billing Date</th>
                          <th className='p-2'>Created At</th>
                          <th className='p-2'>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {billing.map((bill) => (
                          <tr key={bill.billingId}>
                            <td className='p-2'>{bill.billingId}</td>
                            <td className='p-2 whitespace-nowrap'>{bill.patient_name}</td>
                            <td className='p-2 whitespace-nowrap'>{bill.amount}</td>
                            <td className='p-2'>{bill.phoneNumber}</td>
                            <td className='p-2'>
                              {bill.status === 'pending' 
                              ? (<span className='bg-blue-100 text-blue-700 font-bold px-3 py-1 rounded-full'>Pending</span>) 
                              : (<span className='bg-green-100 text-green-700 font-bold px-3 py-1 rounded-full'>Paid</span>)}
                            </td>
                            <td className='p-2'>{new Date(bill.billingDate).toISOString().replace('T', ' ').slice(0, 19)}</td>
                            <td className='p-2'>{new Date(bill.createdAt).toISOString().replace('T', ' ').slice(0, 19)}</td>
                            <td className='p-2'>
                              <div className='flex space-x-2'>
                                {bill.status === 'pending' ? (
                                  <button onClick={() => openModal(bill.billingId)} className='px-4 py-0.5 rounded-full bg-purple-800 text-white whitespace-nowrap hover:bg-purple-600'>Make Payment</button>
                                ) : (
                                  <button className='px-4 py-0.5 rounded-full bg-neutral-300 text-white disabled whitespace-nowrap cursor-not-allowed'>Payment Done</button>
                                )}
                                <button 
                                  disabled={paymentLoading.get(bill.billingId) || false} 
                                  onClick={() => checkPayment(bill.billingId)} 
                                  className='px-4 py-0.5 rounded-full bg-purple-800 whitespace-nowrap text-white hover:bg-purple-600 disabled:cursor-not-allowed'
                                >
                                  {paymentLoading.get(bill.billingId) ? 'Checking...' : 'Check Payment'}
                                </button>
                              </div>
                              <dialog id="my_modal_3" className="modal">
                              <div className="modal-box">
                                <form method="dialog">
                                  {/* if there is a button in form, it will close the modal */}
                                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                </form>
                                <form onSubmit={handleSubmit}>
                                  <div className='mt-2'>
                                    <label htmlFor=""><span>Amount</span>
                                      <input 
                                        type="number"
                                        placeholder="Amount"
                                        className='px-3 py-2 bg-white border border-slate-300 disabled:bg-neutral-100 placeholder-slate-400 focus:outline-none focus:border-yellow-500 focus:ring-yellow-500 w-full rounded-md focus:ring-1'
                                        value={amount}
                                        disabled
                                        onChange={(e) => setAmount(e.target.value)}
                                      />
                                    </label>
                                  </div>
                                  <div className='mt-2'>
                                    <label htmlFor=""><span>Phone Number</span>
                                      <input 
                                        type="text"
                                        placeholder="Phone Number"
                                        className='px-3 py-2 bg-white border border-slate-300 disabled:bg-neutral-100 placeholder-slate-400 focus:outline-none focus:border-yellow-500 focus:ring-yellow-500 w-full rounded-md focus:ring-1'
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                      />
                                    </label>
                                  </div>
                                  <div className='mt-2'>
                                    <label htmlFor='role'>Payment Method
                                      <select 
                                        name="" id=""
                                        required
                                        className='px-3 py-2 bg-white border border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#007CFF] focus:ring-[#007CFF] w-full rounded-md focus:ring-1'
                                        value={paymentMethod}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                      >
                                        <option value="">Payment Method</option>
                                        <option value="cash">Cash</option>
                                        <option value="mpesa">Mpesa</option>
                                      </select>
                                    </label>
                                  </div>
                                  <div className='mt-2 hidden'>
                                    <label htmlFor=""><span>Billing Id</span>
                                    <input 
                                      type="number"
                                      disabled
                                      placeholder="Billing Id"
                                      className='px-3 py-2 bg-white border border-slate-300 placeholder-slate-400 focus:outline-none focus:border-yellow-500 focus:ring-yellow-500 w-full rounded-md focus:ring-1'
                                      value={billingId}
                                      onChange={(e) => setBillingId(e.target.value)}
                                    />
                                    </label>
                                  </div>
                                  <div className='mt-2 hidden'>
                                    <label htmlFor=""><span>Patientid</span>
                                    <input 
                                      type="number"
                                      disabled
                                      placeholder="PatientId"
                                      className='px-3 py-2 bg-white border border-slate-300 disabled:bg-neutral-100 placeholder-slate-400 focus:outline-none focus:border-yellow-500 focus:ring-yellow-500 w-full rounded-md focus:ring-1'
                                      value={patientId}
                                      onChange={(e) => setPatientId(e.target.value)}
                                    />
                                    </label>
                                  </div>
                                  <div className='mt-3'>
                                    <button className='bg-blue-600 text-white px-6 py-0.5 hover:bg-blue-500 rounded-full'>{loading ? 'Sending...' : 'Pay'}</button>
                                  </div>
                                </form>
                              </div>
                            </dialog>
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

export default Billing
