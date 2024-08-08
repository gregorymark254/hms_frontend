import React from 'react';

const Pagination = ({ nPages, currentPage, setCurrentPage }) => {
  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    setCurrentPage(Math.max(1, currentPage - 1));
  };

  // Function to generate an array of page numbers around the current page
  const generatePageNumbers = () => {
    const pagesToShow = 10; // Number of page numbers to show
    const halfPagesToShow = Math.floor(pagesToShow / 2);
    
    let startPage = Math.max(1, currentPage - halfPagesToShow);
    let endPage = Math.min(nPages, startPage + pagesToShow - 1);

    // If we're at the end of pages, adjust startPage and endPage
    if (currentPage + halfPagesToShow > nPages) {
      endPage = nPages;
      startPage = Math.max(1, endPage - pagesToShow + 1);
    }

    // If we're at the beginning of pages, adjust startPage and endPage
    if (currentPage - halfPagesToShow < 1) {
      startPage = 1;
      endPage = Math.min(nPages, startPage + pagesToShow - 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  return (
    <nav>
      <ul className='border border-slate-300 rounded-md flex gap-4 items-center'>
        <li className='px-3 py-1.5'>
          <button className='text-[#007CFF]' onClick={goToPrevPage} disabled={currentPage === 1}>
            Previous
          </button>
        </li>
        {generatePageNumbers().map((page) => (
          <li
            key={page}
            className={`${currentPage === page ? 'active' : ''}`}
          >
            <button
              onClick={() => setCurrentPage(page)}
              className={`${currentPage === page ? 'current-page bg-[#007CFF] px-3 py-1.5 text-white' : 'text-[#007CFF]'}`}
            >
              {page}
            </button>
          </li>
        ))}
        <li className='px-3 py-1.5'>
          <button className='text-[#007CFF]' onClick={goToNextPage} disabled={currentPage === nPages}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
