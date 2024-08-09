import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../api/api';
import { toast } from 'sonner';

const UpdatePrescription = () => {

  const [prescriptionName, setPrescriptionName] = useState('');
  const [dosage, setDosage] = useState('');
  const [instructions, setInstructions] = useState('');
  const [duration, setDuration] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getUserById = async () => {
      try {
        const response = await axios.get(`/prescription/${id}`);
        setPrescriptionName(response.data.prescriptionName);
        setDosage(response.data.dosage);
        setInstructions(response.data.instructions);
        setDuration(response.data.duration);
      } catch (error) {
        console.error(error);
      }
    };
    getUserById();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/prescription/${id}`, 
        { prescriptionName, dosage, instructions, duration }
      );
      toast.success('Prescription Updated');
      navigate('/app/prescriptions');
    } catch (error) {
      toast.error('Failed to update prescription');
      console.log(error);
    }
  };

  return (
    <div className='mx-auto p-4 flex justify-center'>
      <div className='p-4 bg-white rounded-lg w-full lg:w-full xl:w-1/2'>
        <h3 className='text-xl text-center font-bold text-[#007CFF]'>Update Prescription.</h3>
        <form onSubmit={handleSubmit}>
          <div className='my-2'>
            <label htmlFor='prescription'><span>Prescription Name</span>
              <input
                type='text'
                required
                placeholder='Prescription Name'
                className='px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#007CFF] focus:ring-[#007CFF] block w-full rounded-md sm:text-sm focus:ring-1'
                value={prescriptionName}
                onChange={(e) => setPrescriptionName(e.target.value)}
              />
            </label>
          </div>
          <div className='my-2'>
            <label htmlFor='dosage'><span>Dosage</span>
              <input
                type='text'
                required
                placeholder='Dosage'
                className='px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#007CFF] focus:ring-[#007CFF] block w-full rounded-md sm:text-sm focus:ring-1'
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
              />
            </label>
          </div>
          <div className='my-2'>
            <label htmlFor='instructions'><span>Instructions</span>
              <input
                type='text'
                required
                placeholder='Instructions'
                className='px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#007CFF] focus:ring-[#007CFF] block w-full rounded-md sm:text-sm focus:ring-1'
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
              />
            </label>
          </div>
          <div className='my-2'>
            <label htmlFor='duration'><span>Duration</span>
              <input
                type='text'
                required
                placeholder='Duration'
                className='px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#007CFF] focus:ring-[#007CFF] block w-full rounded-md sm:text-sm focus:ring-1'
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </label>
          </div>
          <div className='py-3'>
            <button type='submit' className='bg-[#007CFF] text-white px-5 py-1 w-full hover:bg-[#7c86f9]'>Update Prescription</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdatePrescription
