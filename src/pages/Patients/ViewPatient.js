import React, { useState, useEffect, useCallback} from 'react'
import axios from '../../api/api'
import { useParams, Link } from 'react-router-dom';
import { MdOutlineBlock, } from 'react-icons/md';
import Loader from '../Loader';
import Pagination from '../Pagination';
import PatientMedication from './PatientMedication'
import PatientBill from './PatientBill'

const ViewPatient = () => {

  const [viewPatient,setViewPatient] = useState([])
  const [appointments, setAppointments] = useState('')
  const [recordsPerPage, setRecordsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [searchAppointment, setSearchAppointment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)
  const { id } = useParams();

  // getting patient by id
  const getPatientById = useCallback(async () => {
    try {
      const response = await axios.get(`/patients/${id}`);
      setViewPatient(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false)
    }
  }, [id]);

  useEffect(() => {
    getPatientById();
  }, [getPatientById]);

  // Fetch All appointment by patient id
  const getAppointmentsById = useCallback(async (offset, limit) => {
    try {
      const response = await axios.get(`/appointments/?patientId=${id}&offset=${offset}&limit=${limit}`);
      setAppointments(response.data.items);
      setTotal(response.data.total);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error);
      setLoading(false);
    }
  },[id]);

  // Search appointment
  const handleSearchChange = (e) => {
    setSearchAppointment(e.target.value);
    setCurrentPage(1);
  };

  // debounce for search query
  useEffect(() => {
    const timerId = setTimeout(() => {
      setLoading(true);
      getAppointmentsById((currentPage - 1) * recordsPerPage, recordsPerPage, searchAppointment);
    }, 500);
    return () => clearTimeout(timerId);
  }, [currentPage, recordsPerPage, searchAppointment, getAppointmentsById]);

  return (
    <div>
      <div className="mx-auto p-4">
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
          <div className='bg-white p-4 rounded-lg'>
            <h2 className="text-lg font-bold mb-2 text-[#007CFF] underline">Patient Information</h2>
            <h6>First Name : {viewPatient.firstName}</h6>
            <h6>Last Name : {viewPatient.lastName}</h6>
            <h6>Email : {viewPatient.email}</h6>
            <h6>Date of Birth : {viewPatient.dateOfBirth}</h6>
            <h6>Gender : {viewPatient.gender}</h6>
          </div>
          <div className='bg-white p-4 rounded-lg'>
            <h2 className="text-lg font-bold mb-2 text-[#007CFF] underline">Contact Information</h2>
            <h6>Address : {viewPatient.address}</h6>
            <h6>Phone Number : {viewPatient.phoneNumber}</h6>
            <h6>Emergency Number : {viewPatient.emergencyNumber}</h6>
            <h6>Insurance Number : {viewPatient.insuranceNumber}</h6>
            <h6>Insurance Name : {viewPatient.insuranceName}</h6>
          </div>
        </section>
    
        {/* tabs */}
        <section className='my-4'>
          <div role="tablist" className="tabs tabs-bordered">
            {/* appointment tab */}
            <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Appointments" defaultChecked />
            <div role="tabpanel" className="tab-content py-2">
              <div className='bg-white rounded-lg p-4'>
                <div className='flex flex-wrap items-center justify-between py-3'>
                  <Link to={`/app/addappointment/${id}`} className='bg-[#007CFF] hover:bg-[#7c86f9] text-white px-5 py-2 rounded-lg'>Add Appointment</Link>
                  <h5 className='text-[#007CFF]'>Showing {appointments.length} out of {total} appointment</h5>
                  <div className='py-2'>
                    <form>
                      <label htmlFor='search'><span className='hidden'>Search</span>
                        <input
                          type='search'
                          id='search'
                          className='px-3 py-1.5 border bg-[#f2f9ff] border-slate-300 placeholder-slate-400 rounded-md focus:outline-none focus:border-[#007CFF] focus:ring-[#007CFF] focus:ring-1'
                          required
                          placeholder='Search appointments'
                          value={searchAppointment}
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
                        {appointments.length > 0
                          ? (
                            <table className='w-full text-left table-auto'>
                              <thead>
                                <tr className='border-b border-slate-500'>
                                  <th className='p-2'>ID</th>
                                  <th className='p-2'>Patient Names</th>
                                  <th className='p-2'>Appointment Date</th>
                                  <th className='p-2'>Reason</th>
                                  <th className='p-2'>Doctors Name</th>
                                  <th className='p-2'>Status</th>
                                  <th className='p-2'>Created At</th>
                                </tr>
                              </thead>
                              <tbody>
                                {appointments.map((appointments) => (
                                  <tr key={appointments.appointmentId}>
                                    <td className='p-2 '>{appointments.appointmentId}</td>
                                    <td className='p-2'>{appointments.patient_name}</td>
                                    <td className='p-2 '>{appointments.appointmentDate}</td>
                                    <td className='p-2'>{appointments.reason}</td>
                                    <td className='p-2'>{appointments.doctor_name}</td>
                                    <td className='p-2'>
                                      {appointments.status === 'pending' 
                                      ? (<span className='bg-blue-100 text-blue-700 font-bold px-3 py-1 rounded-full'>Pending</span>) 
                                      : (<span className='bg-green-100 text-green-700 font-bold px-3 py-1 rounded-full'>Attended</span>)}
                                    </td>
                                    <td className='p-2'>{new Date(appointments.createdAt).toISOString().replace('T', ' ').slice(0, 19)}</td>
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
            </div>

            {/* medication tab */}
            <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Medications" />
            <div role="tabpanel" className="tab-content py-2">
              <PatientMedication/>
            </div>

            {/* billing tab */}
            <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Bills" />
            <div role="tabpanel" className="tab-content py-2">
              <PatientBill/>
            </div>
          </div>
        </section>
        </div>
    </div>
  )
}

export default ViewPatient
