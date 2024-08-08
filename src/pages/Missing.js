import React from 'react';
import { Link } from 'react-router-dom';

const Missing = () => {
  return (
    <main>
      <div className='flex items-center justify-center h-[90vh]'>
        <div>
          <h1>404 Error</h1>
          <p>...Oops looks like this page is Missing</p>
          <br />
          <Link to='/' className='py-2 px-5 bg-blue-700 text-white text-center'>Go Back</Link>
        </div>
      </div>
    </main>
  );
};

export default Missing;
