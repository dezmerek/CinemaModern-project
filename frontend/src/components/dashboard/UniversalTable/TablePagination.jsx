import React from 'react';
import '../../../main.scss';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

const TablePagination = ({ totalPages, onPageChange, currentPage }) => {
  const pageNumbers = [];

  let startPage = currentPage - 2;
  let endPage = currentPage + 1;

  if (startPage < 1) {
    startPage = 1;
    endPage = 4;
  }

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, totalPages - 3);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      <div className="pagination__info">
        {currentPage} z {totalPages}
      </div>
      <div className="pagination__controls">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <BsChevronLeft />
        </button>
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={pageNumber === currentPage ? 'selected' : ''}
          >
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
    </div>
  );
};

export default TablePagination;
