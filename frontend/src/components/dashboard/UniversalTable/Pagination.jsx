import React from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

const Pagination = ({ totalPages, onPageChange, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <p>
        {currentPage} z {totalPages}
      </p>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <BsChevronLeft />
      </button>
      {pageNumbers.map((pageNumber) => (
        <button key={pageNumber} onClick={() => onPageChange(pageNumber)}>
          {pageNumber}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <BsChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
