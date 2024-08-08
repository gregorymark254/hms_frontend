import React, { useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { useStateContext } from '../Context/ContextProvider';
import { MdOutlineKeyboardArrowDown, MdLogout } from 'react-icons/md';
import icon from '../Images/logo.jpg'

const Navbar = () => {
  const { activeMenu, setActiveMenu, setScreenSize, screenSize } = useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [setScreenSize]);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize, setActiveMenu]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  // logout
  const signOut = () => {
    window.localStorage.removeItem('token');
    window.location.reload();
  };

  // getting current user
  const currentUser = window.localStorage.getItem('token');
  const user = JSON.parse(currentUser).data.user_data;

  return (
    <div className='flex justify-between items-center p-1 bg-white shadow-md'>
      <div className='text-xl rounded-full p-3'>
        <button className='text-[#007CFF]' onClick={handleActiveMenu}><AiOutlineMenu /></button>
      </div>
      <div>
        <div className='flex items-center space-x-2 px-3 divide-x-2 divide-[#007CFF]'>
          <img className='rounded-full w-12 h-12' src={icon} alt='user-profile' />
          <div className='dropdown'>
            <a className='dropdown-toggle px-4 py-1  text-black font-medium transition duration-150 ease-in-out flex items -center whitespace-nowrap ' href='/#' type='button' id='dropdownMenuButton2' data-bs-toggle='dropdown' aria-expanded='false'>
              <div className='grid'>
                <span className='font-bold text-[#007CFF]'>{user.firstName} {user.lastName}</span>
                <span className='text-[#007CFF]'>{user.role}</span>
              </div>
              <span className='w-4 h-4 ml-auto mb-6 text-xl text-[#007CFF]'><MdOutlineKeyboardArrowDown /></span>
            </a>
            <ul className='dropdown-menu w-48 absolute  bg-white text-base z-50 float-left  py-2 list-nonetext-left  rounded-lg  shadow-lg  mt-1 hidden m-0 bg-clip-padding border-none' aria-labelledby='dropdownMenuButton2'>
              <div className='flex items-center justify-center'>
                <img className='rounded-full w-14 h-14' src={icon} alt='user-profile' />
              </div>
              <div className='grid text-center my-2'>
                <span className='font-bold'>{user.firstName} {user.lastName}</span>
                <p>{user.role}</p>
              </div>
              <hr />
              <li>
                <a onClick={signOut} className='dropdown-item text-sm py-2 px-4 font-normal w-full whitespace-nowrap bg-transparent text-[#fb0000]  hover:bg-gray-100 flex items-center' href='/#'><MdLogout />&nbsp;Sign Out</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
