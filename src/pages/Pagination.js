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
      <ul className='flex gap-1 items-center'>
        <li>
          <button className='px-3 py-1 border rounded-md bg-[#f2f9ff] border-slate-300 hover:bg-[#e2e8f0]' onClick={goToPrevPage} disabled={currentPage === 1}>
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
              className={`px-3 py-1 border rounded-md ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-[#f2f9ff] border-slate-300'}`}
            >
              {page}
            </button>
          </li>
        ))}
        <li>
          <button className='px-3 py-1 border rounded-md bg-[#f2f9ff] border-slate-300 hover:bg-[#e2e8f0]' onClick={goToNextPage} disabled={currentPage === nPages}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
