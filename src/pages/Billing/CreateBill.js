import React, { useState } from 'react';
import axios from '../../api/api';
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router-dom';

const CreateBill = () => {

  const { id } = useParams()
  const [amount, setAmount] = useState('');
  const [billingDate, setBillingDate] = useState('');
  const [patientId, setPatientId] = useState(id);
  const navigate = useNavigate()

  
  // adding billing for a patient based on patient id
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      await axios.post('/billing/',
        {  amount, billingDate, patientId }
      )
      toast.success('Billing added sucessfully')
      navigate(`/app/viewpatient/${id}`)
    } catch (error) {
      console.log(error)
      toast.error('Failed to add medication')
    }
  }

  return (
    <div className='mx-auto p-4 flex justify-center'>
      <div className='p-4 bg-white rounded-lg w-full lg:w-full xl:w-1/2'>
        <h3 className='text-xl text-center font-bold text-[#007CFF]'>Add Billing.</h3>
        <form onSubmit={handleSubmit}>
          <div className='my-2'>
            <label htmlFor='amount'><span>Amount</span>
              <input
                type='number'
                required
                placeholder='Amount'
                className='px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#007CFF] focus:ring-[#007CFF] block w-full rounded-md sm:text-sm focus:ring-1'
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </label>
          </div>
          <div className='my-2'>
            <label htmlFor='date'><span>Billing Date</span>
              <input
                type='date'
                required
                placeholder='Date'
                className='px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#007CFF] focus:ring-[#007CFF] block w-full rounded-md sm:text-sm focus:ring-1'
                value={billingDate}
                onChange={(e) => setBillingDate(e.target.value)}
              />
            </label>
          </div>
          <div className='my-2 hidden'>
            <label htmlFor='id'><span>patientid</span>
              <input
                type='number'
                required
                placeholder='id'
                className='px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#007CFF] focus:ring-[#007CFF] block w-full rounded-md sm:text-sm focus:ring-1'
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
              />
            </label>
          </div>
          <div className='py-3'>
            <button type='submit' className='bg-[#007CFF] text-white px-5 py-1 w-full hover:bg-[#7c86f9]'>Add Bill</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateBill
