import React, { useState, useEffect, useCallback } from 'react'
import axios from '../../api/api';
import { Link } from 'react-router-dom';
import { MdOutlineBlock, MdEdit, MdDelete, } from 'react-icons/md';
import Loader from '../Loader';
import Pagination from '../Pagination';
import { toast } from 'sonner'

const Users = () => {

  const [users,setUsers] = useState('')
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(20);
  const [total, setTotal] = useState(0);
  const [searchUser, setSearchUser] = useState('');

  
  // Fetch All users
  const getUsers = useCallback(async (offset, limit, search) => {
    try {
      const response = await axios.get(`/users?offset=${offset}&limit=${limit}&search=${search}`);
      setUsers(response.data.items);
      setTotal(response.data.total);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error);
      setLoading(false);
    }
  },[]);

  // Search user
  const handleSearchChange = (e) => {
    setSearchUser(e.target.value);
    setCurrentPage(1);
  };

  // debounce for search query
  useEffect(() => {
    const timerId = setTimeout(() => {
      setLoading(true);
      getUsers((currentPage - 1) * recordsPerPage, recordsPerPage, searchUser);
    }, 500);
    return () => clearTimeout(timerId);
  }, [currentPage, recordsPerPage, searchUser, getUsers]);


  // delete a User
  const deleteUser = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this User?');
    if (confirmed) {
      try {
        await axios.delete(`/api/deleteuser/${id}`);
        toast.success('User Deleted');
        getUsers((currentPage - 1) * recordsPerPage, recordsPerPage, searchUser);
      } catch (error) {
        toast.error('Delete failed');
        console.log(error);
      }
    }
  };

  return (
    <div className='mx-auto p-4'>
      <div className='bg-white rounded-lg p-4 lg:w-[78vw] xl:w-[81vw] 2xl:w-full'>
        <div className='flex flex-wrap items-center justify-between py-3'>
          <Link to='/app/adduser' className='bg-[#007CFF] hover:bg-[#7c86f9] text-white px-5 py-2 rounded-lg'>Add User</Link>
          <h5 className='text-[#007CFF]'>Showing {users.length} out of {total} users</h5>
          <div className='py-2'>
            <form>
              <label htmlFor='search'><span className='hidden'>Search</span>
                <input
                  type='search'
                  id='search'
                  className='px-3 py-1.5 border bg-[#f2f9ff] border-slate-300 placeholder-slate-400 rounded-md focus:outline-none focus:border-[#007CFF] focus:ring-[#007CFF] focus:ring-1'
                  required
                  placeholder='Search user'
                  value={searchUser}
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
                {users.length > 0
                  ? (
                    <table className='w-full text-left table-auto'>
                      <thead>
                        <tr className='border-b border-slate-500'>
                          <th className='p-2'>ID</th>
                          <th className='p-2'>First Name</th>
                          <th className='p-2'>Last Names</th>
                          <th className='p-2'>Email</th>
                          <th className='p-2'>Role</th>
                          <th className='p-2'>Created At</th>
                          <th className='p-2'>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => (
                          <tr key={user.userId}>
                            <td className='p-2 '>{user.userId}</td>
                            <td className='p-2 '>{user.firstName}</td>
                            <td className='p-2'>{user.lastName}</td>
                            <td className='p-2'>{user.email}</td>
                            <td className='p-2'>{user.role}</td>
                            <td className='p-2'>{new Date(user.createdAt).toISOString().replace('T', ' ').slice(0, 19)}</td>
                            <td className='p-2'>
                              <div className='flex'>
                                <span className='text-blue-600 text-xl'><Link to={`/app/updateuser/${user.userId}`}><MdEdit /></Link></span>
                                  <button onClick={() => deleteUser(user.userId)} className='text-red-500 text-xl'><MdDelete /></button>
                              </div>
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

export default Users
