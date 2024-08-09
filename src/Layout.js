import Topnav from './components/Nav/TopBar';
import Sidebar from './components/Nav/SideBar';
import { useStateContext } from './components/Context/ContextProvider';
import AuthToken from './components/Context/AuthToken';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';


import Login from './pages/Login';
import Unauthorised from './pages/Unauthorised';
import Missing from './pages/Missing';

import Home from './pages/Home';
import Users from './pages/Users/Users'
import AddUser from './pages/Users/AddUser'
import UpdateUser from './pages/Users/UpdateUser'
import Appointment from './pages/Appointments/Appointment'
import AddAppointment from './pages/Appointments/AddAppointment'
import Patient from './pages/Patients/Patient'
import AddPatient from './pages/Patients/AddPatient'
import ViewPatient from './pages/Patients/ViewPatient'
import UpdatePatient from './pages/Patients/UpdatePatient'
import Doctor from './pages/Doctors/Doctor'
import AddDoctor from './pages/Doctors/AddDoctor'
import ViewDocAppointments from './pages/Doctors/ViewDocAppointments'
import Prescription from './pages/Prescriptions/Prescription'
import AddPrescription from './pages/Prescriptions/AddPrescription'
import UpdatePrescription from './pages/Prescriptions/UpdatePrescription'
import Medication from './pages/Medications/Medication'
import PatientMedication from './pages/Medications/PatientMediacation'


const Layout = () => {
  const { activeMenu } = useStateContext();
  const { accessToken, setAccessToken } = AuthToken();
  if (!accessToken) {
    return <Login setAccessToken={setAccessToken} />;
  }

  return (
    <main>
      <div className='flex relative'>
        {activeMenu
          ? (
            <div className='w-60 fixed'>
              <Sidebar />
            </div>
            )
          : (
            <div>
              <Sidebar />
            </div>
            )}
        <div
          className={
              activeMenu
                ? 'min-h-screen md:ml-60 w-full'
                : 'w-full min-h-screen flex-2'
            }
        >
          <div>
            <Topnav />
          </div>
          <div>
            <Toaster position='top-center' richColors />
            <Routes>
              <Route path='/dashboard' element={<Home />} />
              <Route path='/users' element={<Users />} />
              <Route path='/adduser' element={<AddUser />} />
              <Route path='/updateuser/:id' element={<UpdateUser />} />
              <Route path='/appointments' element={<Appointment />} />
              <Route path='/addappointment/:id' element={<AddAppointment />} />
              <Route path='/patients' element={<Patient />} />
              <Route path='/addpatient' element={<AddPatient />} />
              <Route path='/viewpatient/:id' element={<ViewPatient />} />
              <Route path='/updatepatient/:id' element={<UpdatePatient />} />
              <Route path='/doctors' element={<Doctor />} />
              <Route path='/adddoctor' element={<AddDoctor />} />
              <Route path='/viewappointments/:id' element={<ViewDocAppointments />} />
              <Route path='/prescriptions' element={<Prescription />} />
              <Route path='/addprescription' element={<AddPrescription />} />
              <Route path='/updateprescription/:id' element={<UpdatePrescription />} />
              <Route path='/medications' element={<Medication />} />
              <Route path='/addmedication/:id' element={<PatientMedication />} />
              <Route path='/unauthorised' element={<Unauthorised />} />
              <Route path='*' element={<Missing />} />
            </Routes>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Layout;
