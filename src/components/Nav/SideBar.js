import React from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineCancel, MdSpaceDashboard, MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { FaUsers, FaShoppingCart,FaMoneyCheck,FaUserMinus,FaCartPlus } from 'react-icons/fa';
import { useStateContext } from '../Context/ContextProvider';
import 'tw-elements';

const SideBar = () => {
  const { activeMenu, setActiveMenu } = useStateContext();

    // getting current user
    const currentUser = window.localStorage.getItem('token');
    const user = JSON.parse(currentUser).data.user_data;

  return (
    <main className='bg-[#0c1427] text-white h-screen md:overflow-hidden relative overflow-auto md:hover:overflow-auto pb-10'>
      {activeMenu && (
        <>
          <div className='flex justify-between items-center p-3.5 font-sans font-bold border-b border-b-[#7987a1]'>
            <h3>Medix <span className='text-[#007CFF]'>Solutions</span></h3>
            <div className='text-xl rounded-full hover:bg-light-gray block md:hidden'>
              <button onClick={() => setActiveMenu(!activeMenu)}><MdOutlineCancel /></button>
            </div>
          </div>
          <nav>
            <div className='overflow-y-auto'>
              <div id='sidenavSecExample'>
                <ul className='relative px-1'>
                  <li className='relative'>
                    <Link to='/app/dashboard' className='flex items-center text-sm py-4 px-6 h-12 overflow-hidden whitespace-nowrap text-[#7987a1] hover:text-[#007CFF] focus:text-[#007CFF] focus:border-l-2 focus:border-l-[#007CFF] transition duration-300 ease-in-out' data-mdb-ripple='true' data-mdb-ripple-color='primary'>
                      <span className='w-4 h-4 mr-3'><MdSpaceDashboard /></span>
                      <span>DashBoard</span>
                    </Link>
                  </li>
                  {user.role === 'patient' && (
                    <li className='relative' id='sidenavXxEx1'>
                      <span className='flex items-center text-sm py-4 px-6 h-12 overflow-hidden whitespace-nowrap text-[#7987a1] hover:text-[#007CFF] transition duration-300 ease-in-out cursor-pointer' data-mdb-ripple='true' data-mdb-ripple-color='primary' data-bs-toggle='collapse' data-bs-target='#collapseSidenavXxEx1' aria-expanded='false' aria-controls='collapseSidenavXxEx1'>
                        <span className='w-4 h-4 mr-3'><FaUsers /></span>
                        <span>Users</span>
                        <span className='w-4 h-4 ml-auto text-xl'><MdOutlineKeyboardArrowDown /></span>
                      </span>
                      <ul className='relative accordion-collapse collapse' id='collapseSidenavXxEx1' aria-labelledby='sidenavXxEx1' data-bs-parent='#sidenavSecExample'>
                        <li className='relative'>
                          <Link to='/app/users' className='flex items-center text-xs py-4 pl-12 pr-6 h-6 overflow-hidden whitespace-nowrap text-[#7987a1] hover:text-[#007CFF] focus:text-[#007CFF] focus:border-l-2 focus:border-l-[#007CFF] transition duration-300 ease-in-out' data-mdb-ripple='true' data-mdb-ripple-color='primary'>All Users</Link>
                        </li>
                        <li className='relative'>
                          <Link to='/app/adduser' className='flex items-center text-xs py-4 pl-12 pr-6 h-6 overflow-hidden whitespace-nowrap text-[#7987a1] hover:text-[#007CFF] focus:text-[#007CFF] focus:border-l-2 focus:border-l-[#007CFF] transition duration-300 ease-in-out' data-mdb-ripple='true' data-mdb-ripple-color='primary'>Add User</Link>
                        </li>
                      </ul>
                    </li>
                  )}
                  {(user.role === 'patient' || user.role === 'supplier') && (
                    <li className='relative' id='sidenavXxEx2'>
                      <span className='flex items-center text-sm py-4 px-6 h-12 overflow-hidden whitespace-nowrap text-[#7987a1] hover:text-[#007CFF] transition duration-300 ease-in-out cursor-pointer' data-mdb-ripple='true' data-mdb-ripple-color='primary' data-bs-toggle='collapse' data-bs-target='#collapseSidenavXxEx2' aria-expanded='false' aria-controls='collapseSidenavXxEx2'>
                        <span className='w-4 h-4 mr-3'><FaUserMinus /></span>
                        <span>Appointments</span>
                        <span className='w-4 h-4 ml-auto text-xl'><MdOutlineKeyboardArrowDown /></span>
                      </span>
                      <ul className='relative accordion-collapse collapse' id='collapseSidenavXxEx2' aria-labelledby='sidenavXxEx2' data-bs-parent='#sidenavSecExample'>
                        <li className='relative'>
                          <Link to='/app/appointments' className='flex items-center text-xs py-4 pl-12 pr-6 h-6 overflow-hidden whitespace-nowrap text-[#7987a1] hover:text-[#007CFF] focus:text-[#007CFF] focus:border-l-2 focus:border-l-[#007CFF] transition duration-300 ease-in-out' data-mdb-ripple='true' data-mdb-ripple-color='primary'>Appointment</Link>
                        </li>
                        <li className='relative'>
                          <Link to='/app/createsupplier' className='flex items-center text-xs py-4 pl-12 pr-6 h-6 overflow-hidden whitespace-nowrap text-[#7987a1] hover:text-[#007CFF] focus:text-[#007CFF] focus:border-l-2 focus:border-l-[#007CFF] transition duration-300 ease-in-out' data-mdb-ripple='true' data-mdb-ripple-color='primary'>Add Supplier</Link>
                        </li>
                      </ul>
                    </li>
                  )}
                  <li className='relative' id='sidenavXxEx4'>
                    <span className='flex items-center text-sm py-4 px-6 h-12 overflow-hidden whitespace-nowrap text-[#7987a1] hover:text-[#007CFF] transition duration-300 ease-in-out cursor-pointer' data-mdb-ripple='true' data-mdb-ripple-color='primary' data-bs-toggle='collapse' data-bs-target='#collapseSidenavXxEx4' aria-expanded='false' aria-controls='collapseSidenavXxEx4'>
                      <span className='w-4 h-4 mr-3'><FaCartPlus /></span>
                      <span>Patients</span>
                      <span className='w-4 h-4 ml-auto text-xl'><MdOutlineKeyboardArrowDown /></span>
                    </span>
                    <ul className='relative accordion-collapse collapse' id='collapseSidenavXxEx4' aria-labelledby='sidenavXxEx4' data-bs-parent='#sidenavSecExample'>
                      {(user.role === 'patient' || user.role === 'supplier') && (
                        <li className='relative'>
                          <Link to='/app/patients' className='flex items-center text-xs py-4 pl-12 pr-6 h-6 overflow-hidden whitespace-nowrap text-[#7987a1] hover:text-[#007CFF] focus:text-[#007CFF] focus:border-l-2 focus:border-l-[#007CFF] transition duration-300 ease-in-out' data-mdb-ripple='true' data-mdb-ripple-color='primary'>All Patients</Link>
                        </li>
                      )}
                      <li className='relative'>
                        <Link to='/app/addpatient' className='flex items-center text-xs py-4 pl-12 pr-6 h-6 overflow-hidden whitespace-nowrap text-[#7987a1] hover:text-[#007CFF] focus:text-[#007CFF] focus:border-l-2 focus:border-l-[#007CFF] transition duration-300 ease-in-out' data-mdb-ripple='true' data-mdb-ripple-color='primary'>Add Patient</Link>
                      </li>
                    </ul>
                  </li>
                  <li className='relative' id='sidenavXxEx5'>
                    <span className='flex items-center text-sm py-4 px-6 h-12 overflow-hidden whitespace-nowrap text-[#7987a1] hover:text-[#007CFF] transition duration-300 ease-in-out cursor-pointer' data-mdb-ripple='true' data-mdb-ripple-color='primary' data-bs-toggle='collapse' data-bs-target='#collapseSidenavXxEx5' aria-expanded='false' aria-controls='collapseSidenavXxEx5'>
                      <span className='w-4 h-4 mr-3'><FaCartPlus /></span>
                      <span>Doctors</span>
                      <span className='w-4 h-4 ml-auto text-xl'><MdOutlineKeyboardArrowDown /></span>
                    </span>
                    <ul className='relative accordion-collapse collapse' id='collapseSidenavXxEx5' aria-labelledby='sidenavXxEx5' data-bs-parent='#sidenavSecExample'>
                      {(user.role === 'patient' || user.role === 'supplier') && (
                        <li className='relative'>
                          <Link to='/app/doctors' className='flex items-center text-xs py-4 pl-12 pr-6 h-6 overflow-hidden whitespace-nowrap text-[#7987a1] hover:text-[#007CFF] focus:text-[#007CFF] focus:border-l-2 focus:border-l-[#007CFF] transition duration-300 ease-in-out' data-mdb-ripple='true' data-mdb-ripple-color='primary'>All Doctors</Link>
                        </li>
                      )}
                      <li className='relative'>
                        <Link to='/app/adddoctor' className='flex items-center text-xs py-4 pl-12 pr-6 h-6 overflow-hidden whitespace-nowrap text-[#7987a1] hover:text-[#007CFF] focus:text-[#007CFF] focus:border-l-2 focus:border-l-[#007CFF] transition duration-300 ease-in-out' data-mdb-ripple='true' data-mdb-ripple-color='primary'>Add Doctor</Link>
                      </li>
                    </ul>
                  </li>
                  {(user.role === 'patient' || user.role === 'supplier') && (
                    <li className='relative'>
                      <Link to='/app/payments' className='flex items-center text-sm py-4 px-6 h-12 overflow-hidden whitespace-nowrap text-[#7987a1] hover:text-[#007CFF] focus:text-[#007CFF] focus:border-l-2 focus:border-l-[#007CFF] transition duration-300 ease-in-out' data-mdb-ripple='true' data-mdb-ripple-color='primary'>
                        <span className='w-4 h-4 mr-3'><FaMoneyCheck /></span>
                        <span>Payments</span>
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </nav>
        </>
      )}
    </main>
  );
};

export default SideBar;
