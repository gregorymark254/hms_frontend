import React, { useState, useEffect } from 'react';
import axios from '../../api/api';
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router-dom';

const AddAppointment = () => {

  const { id } = useParams()
  const [appointmentDate, setAppointmentDate] = useState('');
  const [reason, setReason] = useState('');
  const [patientId, setPatientId] = useState(id);
  const [doctorId,setDoctorId] = useState('')
  const navigate = useNavigate()
  const [doctor,setDoctor] = useState([])

  // Fetch All doctor
  useEffect(() => {
    const getDoctors = async () => {
      try {
        const response = await axios.get(`/doctors/`);
        setDoctor(response.data.items);
      } catch (error) {
        console.log(error);
      }
    };
    getDoctors();
  },[])
  
  // adding appointment for a patient based on patient id
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      await axios.post('/appointments/',
        {  appointmentDate, reason, patientId, doctorId }
      )
      toast.success('Appointment added sucessfully')
      navigate(`/app/viewpatient/${id}`)
    } catch (error) {
      console.log(error)
      toast.error('Failed to add appointment')
    }
  }

  return (
    <div className='mx-auto p-4 flex justify-center'>
      <div className='p-4 bg-white rounded-lg w-full lg:w-full xl:w-1/2'>
        <h3 className='text-xl text-center font-bold text-[#007CFF]'>Add New Appointment.</h3>
        <form onSubmit={handleSubmit}>
          <div className='my-2'>
            <label htmlFor='date'><span>Appointment Date</span>
              <input
                type='date'
                required
                placeholder='Date'
                className='px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#007CFF] focus:ring-[#007CFF] block w-full rounded-md sm:text-sm focus:ring-1'
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
              />
            </label>
          </div>
          <div className='my-2'>
            <label htmlFor='reason'><span>Reason</span>
              <input
                type='text'
                required
                placeholder='Reason'
                className='px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#007CFF] focus:ring-[#007CFF] block w-full rounded-md sm:text-sm focus:ring-1'
                value={reason}
                onChange={(e) => setReason(e.target.value)}
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
            <label htmlFor='doctor'>Doctor Speciality
              <select
                name='' id=''
                required
                className='px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#007CFF] focus:ring-[#007CFF] block w-full rounded-md sm:text-sm focus:ring-1'
                value={doctorId}
                onChange={(e) => setDoctorId(e.target.value)}
              >
                <option value=''>Doctor Speciality</option>
                {doctor.map((doctors) => (
                  <option key={doctors.doctorId} value={doctors.doctorId}>{doctors.speciality}</option>
                ))}
              </select>
            </label>
          </div>
          <div className='py-3'>
            <button type='submit' className='bg-[#007CFF] text-white px-5 py-1 w-full hover:bg-[#7c86f9]'>Add Appointment</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddAppointment
