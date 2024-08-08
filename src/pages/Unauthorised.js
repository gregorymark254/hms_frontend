import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorised = () => {
  return (
    <main>
      <div className='flex items-center justify-center h-[90vh]'>
        <div>
          <h1>403 Unauthorised</h1>
          <p>...Oops you are not authorised to view this page</p>
          <br />
          <Link to='/' className='py-2 px-5 bg-blue-700 text-white text-center'>Go Back</Link>
        </div>
      </div>
    </main>
  );
};

export default Unauthorised;
