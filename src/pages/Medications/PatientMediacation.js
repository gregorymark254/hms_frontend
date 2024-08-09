import React, { useState, useEffect } from 'react';
import axios from '../../api/api';
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router-dom';

const PatientMediacation = () => {

  const { id } = useParams()
  const [diagnosis, setDiagnosis] = useState('');
  const [treatment, setTreatment] = useState('');
  const [notes, setNotes] = useState('');
  const [patientId, setPatientId] = useState(id);
  const [prescriptionId,setPrescriptionId] = useState('')
  const navigate = useNavigate()
  const [prescription,setPrescription] = useState([])

  // Fetch All prescriptions
  useEffect(() => {
    const getDoctors = async () => {
      try {
        const response = await axios.get(`/prescription/`);
        setPrescription(response.data.items);
      } catch (error) {
        console.log(error);
      }
    };
    getDoctors();
  },[])
  
  // adding medication for a patient based on patient id
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      await axios.post('/medication/',
        {  diagnosis, treatment, notes, patientId, prescriptionId }
      )
      toast.success('Medication added sucessfully')
      navigate(`/app/viewpatient/${id}`)
    } catch (error) {
      console.log(error)
      toast.error('Failed to add medication')
    }
  }

  return (
    <div className='mx-auto p-4 flex justify-center'>
      <div className='p-4 bg-white rounded-lg w-full lg:w-full xl:w-1/2'>
        <h3 className='text-xl text-center font-bold text-[#007CFF]'>Add Patient Medication.</h3>
        <form onSubmit={handleSubmit}>
          <div className='my-2'>
            <label htmlFor='diagnosis'><span>Diagnosis</span>
              <input
                type='text'
                required
                placeholder='Diagnosis'
                className='px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#007CFF] focus:ring-[#007CFF] block w-full rounded-md sm:text-sm focus:ring-1'
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
              />
            </label>
          </div>
          <div className='my-2'>
            <label htmlFor='treatment'><span>Treatment</span>
              <input
                type='text'
                required
                placeholder='Treatment'
                className='px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#007CFF] focus:ring-[#007CFF] block w-full rounded-md sm:text-sm focus:ring-1'
                value={treatment}
                onChange={(e) => setTreatment(e.target.value)}
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
          <div className='my-2'>
            <label htmlFor='prescription'><span>Prescription Name</span>
              <select
                name='' id=''
                required
                className='px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#007CFF] focus:ring-[#007CFF] block w-full rounded-md sm:text-sm focus:ring-1'
                value={prescriptionId}
                onChange={(e) => setPrescriptionId(e.target.value)}
              >
                <option value=''>Prescription Name</option>
                {prescription.map((prescriptions) => (
                  <option key={prescriptions.prescriptionId} value={prescriptions.prescriptionId}>{prescriptions.prescriptionName}</option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <label htmlFor="notes"><span>Notes</span>
              <textarea 
                name="" id=""
                required
                placeholder='Notes'
                className='px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#007CFF] focus:ring-[#007CFF] block w-full rounded-md sm:text-sm focus:ring-1'
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              ></textarea>
            </label>
          </div>
          <div className='py-3'>
            <button type='submit' className='bg-[#007CFF] text-white px-5 py-1 w-full hover:bg-[#7c86f9]'>Add Medication</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PatientMediacation
