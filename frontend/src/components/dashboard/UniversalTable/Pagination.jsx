import React from 'react';

const Pagination = ({ totalPages, onPageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      {pageNumbers.map((pageNumber) => (
        <button key={pageNumber} onClick={() => onPageChange(pageNumber)}>
          {pageNumber}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
